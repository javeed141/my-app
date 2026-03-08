// ═══════════════════════════════════════════════════════════
//  STEP 4 — links.js (Build Final Page List)
//
//  IMPORTS FROM: types.js (Step 1), sidebar.js (Step 3)
//  USED BY:      route.js (Step 8)
//
//  This file answers: "What pages exist on this site?"
//
//  STRATEGY:
//    We know the tabs from Step 2 (guides, reference, recipes, etc.)
//    Each tab has its own sidebar. We fetch each tab's landing page
//    and parse the sidebar to get all pages with real titles + order.
//
//  DIFFERENT SITE TYPES:
//    Type A   — multiple tabs, fetch each tab's page for its sidebar
//    Type B   — single section, sidebar already in current page
//    Type C   — same as A/B but with version prefix in URLs
//    Type D   — fetch each project's docs + reference pages
//
//  EXPORTS:
//    extractAllLinks(...)  → { sections: [{ name, pages[] }] }
// ═══════════════════════════════════════════════════════════

import { load } from "cheerio";
import {
  fetchPage,
  fetchPageWithUrl,
  normalizePrefix,
  stripVersionPrefix,
  slugToTitle,
  PREFIX_TO_SECTION,
} from "./types.js";
import {
  parseSidebarLookups,
  parseHtmlFallback,
  parseAllPageLinks,
} from "./sidebar.js";

// ════════════════════════════════════════════════════════════
//  BUILD SECTIONS — Type A, B & C
//
//  Current page's HTML has the sidebar for ONE tab.
//  For other tabs, fetch their landing page → parse sidebar.
//
//  INPUT:
//    sidebarLookups — Map from parseSidebarLookups(currentHtml)
//    tabs           — [{ name, path }] from detectTabs()
//    baseUrl        — origin string
//    currentUrl     — the URL user gave us
//    currentHtml    — HTML we already fetched
//
//  OUTPUT:
//    [{ name: "Guides", pages: [{ title, slug, path, fullUrl, level, group }] }]
// ════════════════════════════════════════════════════════════

async function buildStandardSections(
  sidebarLookups,
  tabs,
  baseUrl,
  currentUrl,
  currentHtml,
  versionPrefix = ""
) {
  const sections = [];

  // Figure out which prefixes to process
  // If tabs found → use tab paths. Otherwise → use current page's prefix.
  let prefixes;
  if (tabs.length > 0) {
    prefixes = tabs.map((t) => t.path.replace(/^\//, ""));
  } else {
    const segments = new URL(currentUrl).pathname.split("/").filter(Boolean);
    const stripped = stripVersionPrefix("/" + segments.join("/"))
      .split("/")
      .filter(Boolean);
    prefixes = [stripped[0] || "docs"];
  }

  // Deduplicate prefixes (refs and reference are the same)
  const seen = new Set();
  const allPrefixes = [];
  for (const p of prefixes) {
    const norm = normalizePrefix(p);
    if (!seen.has(norm)) {
      seen.add(norm);
      allPrefixes.push(p);
    }
  }

  // ── Fetch sidebar data for tabs we don't have yet ──────
  // Current page HTML only has sidebar JSON for ONE tab.
  // For other tabs, fetch their landing page to get their sidebar.
  const tabHtmlMap = new Map();
  const fetchPromises = [];

  for (const prefix of allPrefixes) {
    const normalized = normalizePrefix(prefix);
    const hasLookup =
      sidebarLookups.has(prefix) || sidebarLookups.has(normalized);

    if (!hasLookup) {
      const tabUrl = `${baseUrl}${versionPrefix}/${prefix}`;
      if (tabUrl !== currentUrl && !tabHtmlMap.has(prefix)) {
        fetchPromises.push(
          fetchPage(tabUrl)
            .catch(() => null)
            .then((html) => tabHtmlMap.set(prefix, html))
        );
      }
    }
  }

  if (fetchPromises.length > 0) {
    await Promise.all(fetchPromises);
  }

  // ── Build one section per prefix ──────────────────────
  const processedPrefixes = new Set();

  for (const prefix of allPrefixes) {
    const normalized = normalizePrefix(prefix);
    if (processedPrefixes.has(normalized)) continue;
    processedPrefixes.add(normalized);

    // Get sidebar lookup — try current page first, then fetched tab
    let lookup =
      sidebarLookups.get(prefix) ||
      sidebarLookups.get(normalized) ||
      new Map();

    // If no lookup yet, parse the fetched tab HTML
    if (lookup.size === 0) {
      for (const key of [prefix, normalized]) {
        const tabHtml = tabHtmlMap.get(key);
        if (tabHtml && lookup.size === 0) {
          const tabLookups = parseSidebarLookups(tabHtml);
          lookup =
            tabLookups.get(prefix) ||
            tabLookups.get(normalized) ||
            lookup;
        }
      }
    }

    const pathPrefix = `/${prefix}`;
    let pages = [];

    if (lookup.size > 0) {
      const sorted = [...lookup.entries()].sort(
        (a, b) => a[1].order - b[1].order
      );
      for (const [slug, meta] of sorted) {
        pages.push({
          title: meta.title,
          slug,
          path: `${versionPrefix}${pathPrefix}/${slug}`,
          fullUrl: `${baseUrl}${versionPrefix}${pathPrefix}/${slug}`,
          level: meta.level,
          group: meta.group,
        });
      }
    }

    // If sidebar parsing found nothing for this tab, fall back to
    // scanning <a> tags on the tab's HTML page
    if (pages.length === 0) {
      const tabHtml = tabHtmlMap.get(prefix) || tabHtmlMap.get(normalized) || currentHtml;
      if (tabHtml) {
        // Try sidebar-aware fallback first, then scan ALL page links
        pages = parseHtmlFallback(tabHtml, baseUrl);
        if (pages.length === 0) {
          pages = parseAllPageLinks(tabHtml, baseUrl);
        }
        // Add versionPrefix to fallback pages if they don't already have it
        if (versionPrefix) {
          pages = pages.map((p) => ({
            ...p,
            path: p.path.startsWith(versionPrefix) ? p.path : `${versionPrefix}${p.path}`,
            fullUrl: p.fullUrl.includes(versionPrefix) ? p.fullUrl : `${baseUrl}${versionPrefix}${p.path}`,
          }));
        }
      }
    }

    if (pages.length > 0) {
      sections.push({
        name:
          PREFIX_TO_SECTION[prefix] ||
          PREFIX_TO_SECTION[normalized] ||
          prefix,
        pages,
      });
    }
  }

  return sections;
}

// ════════════════════════════════════════════════════════════
//  BUILD SECTIONS — Type D (Multi Project)
//
//  For sites like Modern Treasury: /{project}/docs/
//  Fetches each project's doc and reference pages in parallel,
//  parses sidebar from each.
//
//  INPUT:
//    projects    — ["payments", "reconciliation", "ledgers"]
//    baseUrl     — origin string
//    currentUrl  — URL user gave us
//    currentHtml — HTML we already fetched
//
//  OUTPUT:
//    [{ name: "payments/Guides", pages: [...] },
//     { name: "payments/API Reference", pages: [...] }]
// ════════════════════════════════════════════════════════════

async function buildProjectSections(
  projects,
  baseUrl,
  currentUrl,
  currentHtml
) {
  const sections = [];

  // Build fetch list: each project × (docs + reference)
  const fetches = [];
  for (const p of projects) {
    for (const type of ["docs", "reference"]) {
      fetches.push({
        project: p,
        type,
        name: `${p}/${PREFIX_TO_SECTION[type] || type}`,
        url: `${baseUrl}/${p}/${type}`,
      });
    }
  }

  // Fetch all in parallel, tracking redirects
  const htmlResults = await Promise.all(
    fetches.map(async (f) => {
      try {
        if (f.url === currentUrl) {
          return { ...f, html: currentHtml, finalUrl: currentUrl };
        }
        const { html, finalUrl } = await fetchPageWithUrl(f.url);
        return { ...f, html, finalUrl };
      } catch {
        return { ...f, html: null, finalUrl: f.url };
      }
    })
  );

  // Filter out cross-project redirects:
  // If /reconciliation/docs redirected to /payments/docs/overview,
  // the content belongs to "payments", not "reconciliation" — skip it.
  const filteredResults = htmlResults.filter((r) => {
    if (!r.html || !r.finalUrl) return true;
    try {
      const finalPath = new URL(r.finalUrl).pathname;
      const segments = finalPath.split("/").filter(Boolean);
      // First segment of final URL should match the intended project
      if (segments[0] && segments[0] !== r.project) {
        console.log(`[scraper] Skipping ${r.project}/${r.type} → redirected to /${segments[0]}/ (different project)`);
        return false;
      }
      // Also check if the type segment changed (e.g. /payments/reference → /platform/reference)
      // This catches cases where the project stays but the content is shared
      if (segments[1] && segments[1] !== r.type && segments[0] !== r.project) {
        console.log(`[scraper] Skipping ${r.project}/${r.type} → content at /${segments[0]}/${segments[1]}/`);
        return false;
      }
    } catch {}
    return true;
  });

  // Parse sidebar from each fetched page
  for (const { name, project, type, html } of filteredResults) {
    if (!html) continue;

    const lookups = parseSidebarLookups(html);

    // Sidebar keys: JSON parser → "docs"/"reference", DOM parser → project name
    const lookup =
      lookups.get(type) ||
      lookups.get(normalizePrefix(type)) ||
      lookups.get(project) ||
      null;

    const isProjectKeyed = !lookups.has(type) && !lookups.has(normalizePrefix(type)) && lookups.has(project);

    if (lookup && lookup.size > 0) {
      const sorted = [...lookup.entries()].sort(
        (a, b) => a[1].order - b[1].order
      );
      const pages = sorted.map(([slug, meta]) => {
        let pagePath, pageUrl;
        if (isProjectKeyed) {
          // DOM parser: slug = "docs/platform-overview"
          pagePath = `/${project}/${slug}`;
          pageUrl = `${baseUrl}/${project}/${slug}`;
        } else {
          // JSON parser: slug = "platform-overview"
          // Path = /{project}/{type}/{slug}
          pagePath = `/${project}/${type}/${slug}`;
          pageUrl = `${baseUrl}/${project}/${type}/${slug}`;
        }
        const bareSlug = slug.split("/").pop() || slug;
        return {
          title: meta.title,
          slug: bareSlug,
          path: pagePath,
          fullUrl: pageUrl,
          level: meta.level,
          group: meta.group,
        };
      });

      // Validate: all page paths should match /{project}/{type}/slug pattern
      // If paths contain a DIFFERENT project (e.g. /payments/platform/reference/...)
      // it means this tab serves another project's content — skip it
      if (pages.length > 0) {
        const expectedPrefix = `/${project}/${type}/`;
        const wrongProject = pages[0].path && !pages[0].path.startsWith(expectedPrefix) && !isProjectKeyed;
        if (wrongProject) {
          console.log(`[scraper] Skipping ${name} — content belongs to different project (path: ${pages[0].path})`);
          continue;
        }
        sections.push({ name, pages });
        continue;
      }
    }

    // Fallback: scrape <a> links from HTML — only keep pages belonging to this project
    const fallback = parseHtmlFallback(html, baseUrl);
    const ownPages = fallback.filter((p) => {
      const seg = p.path.split("/").filter(Boolean)[0];
      return !seg || seg === project;
    });
    if (ownPages.length > 0) sections.push({ name, pages: ownPages });
  }

  // ── Deduplicate sections with identical content ──
  // Cross-project redirects can cause two sections to have the same pages.
  // e.g. /reconciliation/docs serves same sidebar as /payments/docs
  // Both produce identical slug sets → drop the duplicate.
  const deduped = [];
  const seenSlugSets = new Set();

  for (const section of sections) {
    const sectionType = section.name.split("/").pop(); // "Guides" or "API Reference"
    const slugKey = sectionType + ":" + section.pages.map((p) => p.slug).sort().join(",");

    if (seenSlugSets.has(slugKey)) {
      console.log(`[scraper] Skipping duplicate section: ${section.name}`);
      continue;
    }
    seenSlugSets.add(slugKey);
    deduped.push(section);
  }

  return deduped;
}

// ════════════════════════════════════════════════════════════
//  BUILD SECTIONS — Child Branches (e.g. /ent/docs, /rdmd/docs)
//
//  For sites like docs.readme.com that have child project branches.
//  Each branch has its own docs/reference content.
//
//  INPUT:
//    branches    — ["ent", "rdmd"]
//    baseUrl     — origin string
//    currentUrl  — URL user gave us
//    currentHtml — HTML we already fetched
//
//  OUTPUT:
//    [{ name: "ent/Guides", pages: [...] },
//     { name: "rdmd/Guides", pages: [...] }]
// ════════════════════════════════════════════════════════════

async function buildBranchSections(branches, baseUrl, currentUrl, currentHtml) {
  const sections = [];

  // Build fetch list: each branch × (docs + reference)
  const fetches = [];
  for (const branch of branches) {
    for (const type of ["docs", "reference"]) {
      fetches.push({
        branch,
        type,
        name: `${branch}/${PREFIX_TO_SECTION[type] || type}`,
        url: `${baseUrl}/${branch}/${type}`,
      });
    }
  }

  // Fetch all in parallel
  const htmlResults = await Promise.all(
    fetches.map(async (f) => {
      try {
        if (f.url === currentUrl) {
          return { ...f, html: currentHtml };
        }
        const html = await fetchPage(f.url);
        return { ...f, html };
      } catch {
        return { ...f, html: null };
      }
    })
  );

  // Parse sidebar from each fetched page
  for (const { name, branch, type, html } of htmlResults) {
    if (!html) continue;

    const lookups = parseSidebarLookups(html);
    const lookup =
      lookups.get(type) ||
      lookups.get(normalizePrefix(type)) ||
      lookups.get(branch) ||
      null;

    const branchPrefix = `/${branch}`;

    if (lookup && lookup.size > 0) {
      const sorted = [...lookup.entries()].sort(
        (a, b) => a[1].order - b[1].order
      );
      const pages = sorted.map(([slug, meta]) => {
        // Remove any type prefix from slug if present (DOM parser may include it)
        const bareSlug = slug.includes("/") ? slug.split("/").pop() : slug;
        return {
          title: meta.title,
          slug: bareSlug,
          path: `${branchPrefix}/${type}/${bareSlug}`,
          fullUrl: `${baseUrl}${branchPrefix}/${type}/${bareSlug}`,
          level: meta.level,
          group: meta.group,
        };
      });
      if (pages.length > 0) {
        sections.push({ name, pages });
        continue;
      }
    }

    // Fallback: scrape <a> links from HTML
    const fallbackPages = parseHtmlFallback(html, baseUrl);
    // Add branch prefix to fallback URLs
    const pages = fallbackPages.map((p) => ({
      ...p,
      path: p.path.startsWith(branchPrefix) ? p.path : `${branchPrefix}${p.path}`,
      fullUrl: p.fullUrl.includes(branchPrefix)
        ? p.fullUrl
        : `${baseUrl}${branchPrefix}${p.path}`,
    }));
    if (pages.length > 0) sections.push({ name, pages });
  }

  return sections;
}

// ════════════════════════════════════════════════════════════
//  BUILD SECTIONS — Non-default versions (e.g. /v3/ when v4 is default)
//
//  For versioned sites, the default version is scraped without prefix.
//  Non-default versions need their version prefix in URLs.
//  Each version's /docs page is fetched and sidebar parsed.
//
//  INPUT:
//    versions — ["/v3", "/v2"] — version prefixes to scrape
//    baseUrl  — origin string
//
//  OUTPUT:
//    [{ name: "v3/Guides", pages: [...] },
//     { name: "v3/API Reference", pages: [...] }]
// ════════════════════════════════════════════════════════════

async function buildVersionSections(versions, baseUrl) {
  const sections = [];

  // Fetch each version's /docs page in parallel
  const results = await Promise.all(
    versions.map(async (verPrefix) => {
      const url = `${baseUrl}${verPrefix}/docs`;
      try {
        const html = await fetchPage(url);
        return { verPrefix, html };
      } catch {
        return { verPrefix, html: null };
      }
    })
  );

  for (const { verPrefix, html } of results) {
    if (!html) continue;

    const verName = verPrefix.replace(/^\//, ""); // "/v3" → "v3"
    const lookups = parseSidebarLookups(html);

    // Process each section found in sidebar
    let foundPages = false;
    for (const [sectionKey, lookup] of lookups) {
      if (!lookup || lookup.size === 0) continue;

      const sectionName = `${verName}/${PREFIX_TO_SECTION[sectionKey] || PREFIX_TO_SECTION[normalizePrefix(sectionKey)] || sectionKey}`;
      const sorted = [...lookup.entries()].sort(
        (a, b) => a[1].order - b[1].order
      );
      const pages = sorted.map(([slug, meta]) => {
        const bareSlug = slug.includes("/") ? slug.split("/").pop() : slug;
        return {
          title: meta.title,
          slug: bareSlug,
          path: `${verPrefix}/${sectionKey}/${bareSlug}`,
          fullUrl: `${baseUrl}${verPrefix}/${sectionKey}/${bareSlug}`,
          level: meta.level,
          group: meta.group,
        };
      });
      if (pages.length > 0) {
        sections.push({ name: sectionName, pages });
        foundPages = true;
      }
    }

    // Fallback: scan <a> links
    if (!foundPages) {
      let pages = parseHtmlFallback(html, baseUrl);
      if (pages.length === 0) {
        pages = parseAllPageLinks(html, baseUrl);
      }
      pages = pages.map((p) => ({
        ...p,
        path: p.path.startsWith(verPrefix) ? p.path : `${verPrefix}${p.path}`,
        fullUrl: p.fullUrl.includes(verPrefix)
          ? p.fullUrl
          : `${baseUrl}${verPrefix}${p.path}`,
      }));
      if (pages.length > 0) {
        sections.push({ name: `${verName}/Guides`, pages });
      }
    }
  }

  return sections;
}

// ════════════════════════════════════════════════════════════
//  SITEMAP MERGE — find pages missing from sidebar
//
//  Fetches /sitemap.xml, compares against existing sections,
//  and adds any missing URLs into the matching section.
//  New prefixes get their own section.
//
//  INPUT:
//    sections       — existing sections array (MUTATED in place)
//    baseUrl        — origin string
//    versionPrefix  — e.g. "/main" or ""
//
//  OUTPUT:
//    number — count of pages added from sitemap
// ════════════════════════════════════════════════════════════

function mergeSitemapInto(sections, xml, baseUrl, versionPrefix) {
  if (!xml) return 0;

  const $ = load(xml, { xml: true });
  const sitemapUrls = [];
  $("url > loc").each((_, el) => {
    const loc = $(el).text().trim();
    if (loc) sitemapUrls.push(loc);
  });

  if (sitemapUrls.length === 0) return 0;

  // Build set of all fullUrls already in sections (for fast lookup)
  const existingUrls = new Set();
  // Also track by path (without version prefix) for more flexible matching
  const existingPaths = new Set();
  for (const section of sections) {
    for (const page of section.pages) {
      existingUrls.add(page.fullUrl);
      existingPaths.add(page.path);
    }
  }

  // Build map: prefix → section (for appending sitemap pages)
  // For standard sites: "docs" → Guides section, "reference" → API Reference section
  // For multi-project (Type D): "payments/docs" → payments/Guides section
  const sectionByPrefix = new Map();
  for (const section of sections) {
    for (const [prefix, sectionLabel] of Object.entries(PREFIX_TO_SECTION)) {
      if (section.name === sectionLabel || section.name.endsWith(`/${sectionLabel}`)) {
        sectionByPrefix.set(prefix, section);
      }
      // Type D: section name like "payments/Guides" → map "payments/docs" → section
      const parts = section.name.split("/");
      if (parts.length >= 2 && parts[parts.length - 1] === sectionLabel) {
        const projectName = parts.slice(0, -1).join("/");
        sectionByPrefix.set(`${projectName}/${prefix}`, section);
      }
    }
  }

  // Build a map of section → most common groups (for assigning sitemap pages)
  // e.g. Guides section has groups ["Datafiniti API", "Web Portal"] — sitemap
  // pages added to Guides should get assigned to the closest group, not "Sitemap"
  const sectionGroups = new Map();
  for (const section of sections) {
    const groupCounts = new Map();
    for (const page of section.pages) {
      if (page.group) {
        groupCounts.set(page.group, (groupCounts.get(page.group) || 0) + 1);
      }
    }
    // Sort groups by count descending — first = most common = default
    const sorted = [...groupCounts.entries()].sort((a, b) => b[1] - a[1]);
    sectionGroups.set(section, sorted.map(([g]) => g));
  }

  // Build a map of slug → group from existing pages for exact matching
  // This lets us match sitemap pages to the group where similar pages exist
  const slugPrefixToGroup = new Map();
  for (const section of sections) {
    for (const page of section.pages) {
      if (!page.group) continue;
      // Use first word of slug as a grouping key
      // e.g. "api-introduction" → "api", "how-credits-work-api" → "how"
      const slugFirst = (page.slug || "").split("-")[0];
      if (slugFirst) {
        const key = `${section.name}:${slugFirst}`;
        if (!slugPrefixToGroup.has(key)) {
          slugPrefixToGroup.set(key, page.group);
        }
      }
    }
  }

  // Parse each sitemap URL and check if it's missing
  let added = 0;
  const newSections = new Map(); // prefix → pages[] for new sections

  for (const loc of sitemapUrls) {
    if (existingUrls.has(loc)) continue;

    let pathname;
    try {
      const u = new URL(loc);
      if (u.origin !== baseUrl) continue;
      pathname = u.pathname;
    } catch { continue; }

    // Strip version/branch prefix to get the doc prefix
    let stripped = pathname;
    if (versionPrefix && stripped.startsWith(versionPrefix)) {
      stripped = stripped.slice(versionPrefix.length);
    }

    const segments = stripped.split("/").filter(Boolean);
    if (segments.length < 2) continue; // skip root-level pages

    // Detect structure: could be /{type}/{slug} or /{project}/{type}/{slug}
    // Try compound key first (Type D): "payments/docs" → matches "payments/Guides"
    // Then simple key: "docs" → matches "Guides"
    let prefix, slug, existingSection;

    if (segments.length >= 3) {
      const compoundKey = `${segments[0]}/${segments[1]}`;
      const compoundSection = sectionByPrefix.get(compoundKey) || sectionByPrefix.get(`${segments[0]}/${normalizePrefix(segments[1])}`);
      if (compoundSection) {
        prefix = compoundKey;
        slug = segments.slice(2).join("/");
        existingSection = compoundSection;
      }
    }

    if (!existingSection) {
      prefix = segments[0];
      slug = segments.slice(1).join("/");
      existingSection = sectionByPrefix.get(prefix) || sectionByPrefix.get(normalizePrefix(prefix)) || null;
    }

    // Skip forum/discuss pages
    if (segments[0] === "discuss" || segments[1] === "discuss") continue;

    // Check if path already exists (handles version prefix differences)
    const pathWithPrefix = versionPrefix ? `${versionPrefix}/${prefix}/${slug}` : `/${prefix}/${slug}`;
    const pathWithout = `/${prefix}/${slug}`;
    if (existingPaths.has(pathWithPrefix) || existingPaths.has(pathWithout) || existingPaths.has(pathname)) continue;

    // Determine group: try slug-prefix match first, then fall back to most common group
    let group = "";
    if (existingSection) {
      const slugFirst = (slug.split("/").pop() || slug).split("-")[0];
      const key = `${existingSection.name}:${slugFirst}`;
      if (slugPrefixToGroup.has(key)) {
        group = slugPrefixToGroup.get(key);
      } else {
        // Use the most common group in this section
        const groups = sectionGroups.get(existingSection);
        if (groups && groups.length > 0) {
          group = groups[0];
        }
      }
    }

    const page = {
      title: slugToTitle(slug.split("/").pop() || slug),
      slug: slug.split("/").pop() || slug,
      path: pathWithPrefix,
      fullUrl: loc,
      level: 1,
      group,
    };

    if (existingSection) {
      existingSection.pages.push(page);
      existingPaths.add(pathWithPrefix);
      added++;
    } else {
      // New prefix — create a new section
      if (!newSections.has(prefix)) newSections.set(prefix, []);
      newSections.get(prefix).push(page);
      existingPaths.add(pathWithPrefix);
      added++;
    }
  }

  // Add any new sections
  for (const [prefix, pages] of newSections) {
    sections.push({
      name: PREFIX_TO_SECTION[prefix] || PREFIX_TO_SECTION[normalizePrefix(prefix)] || prefix,
      pages,
    });
  }

  if (added > 0) {
    console.log(`[scraper] Sitemap: added ${added} pages missing from sidebar`);
  }

  return added;
}

// ════════════════════════════════════════════════════════════
//  MAIN ENTRY POINT: extractAllLinks()
//
//  INPUT:
//    siteType    — from detectSiteType() (Step 2)
//    html        — raw HTML string
//    baseUrl     — origin string
//    currentUrl  — URL user gave us
//
//  OUTPUT:
//    {
//      sections: [{ name, pages: [{ title, slug, path, fullUrl, level, group }] }],
//      totalPages: 147
//    }
// ════════════════════════════════════════════════════════════

export async function extractAllLinks(siteType, html, baseUrl, currentUrl) {
  // Parse sidebar from current page (we already have this HTML)
  const sidebarLookups = parseSidebarLookups(html);
  const versionPrefix = siteType.versionPrefix || "";
  const childBranches = siteType.childBranches || [];
  const otherVersions = siteType.otherVersions || [];

  // ── Start sitemap fetch NOW (runs in parallel with section building) ──
  const sitemapPromise = fetchPage(`${baseUrl}/sitemap.xml`);

  // ── Build main sections + child branches + other versions in parallel ──
  const [mainResult, branchSections, versionSections] = await Promise.all([
    // Main sections (default version, no prefix needed)
    siteType.type === "D"
      ? buildProjectSections(siteType.projects, baseUrl, currentUrl, html)
      : buildStandardSections(sidebarLookups, siteType.tabs, baseUrl, currentUrl, html, versionPrefix),
    // Child branches (parallel with main sections)
    // Skip for Type D — projects already handled by buildProjectSections
    childBranches.length > 0 && siteType.type !== "D"
      ? buildBranchSections(childBranches, baseUrl, currentUrl, html)
      : Promise.resolve([]),
    // Non-default versions (e.g. v3 when v4 is default)
    otherVersions.length > 0
      ? buildVersionSections(otherVersions, baseUrl)
      : Promise.resolve([]),
  ]);

  const sections = mainResult;

  sections.push(...branchSections);
  sections.push(...versionSections);

  // ── Merge missing sitemap URLs (sitemap already fetched in parallel) ──
  const sitemapXml = await sitemapPromise;
  const sitemapMissing = mergeSitemapInto(sections, sitemapXml, baseUrl, versionPrefix);

  // ── Deduplicate: remove sections with identical slug sets ──
  // Sitemap merge or cross-project redirects can create duplicates.
  const dedupedSections = [];
  const seenSlugSets = new Set();
  for (const section of sections) {
    const slugKey = section.pages.map((p) => p.fullUrl).sort().join("\n");
    if (seenSlugSets.has(slugKey)) {
      console.log(`[scraper] Removing duplicate section: ${section.name} (${section.pages.length} pages)`);
      continue;
    }
    seenSlugSets.add(slugKey);

    // Also deduplicate pages within each section (by fullUrl)
    const seenUrls = new Set();
    section.pages = section.pages.filter((p) => {
      if (seenUrls.has(p.fullUrl)) return false;
      seenUrls.add(p.fullUrl);
      return true;
    });

    dedupedSections.push(section);
  }

  // Replace sections array content in place (other refs may point here)
  sections.length = 0;
  sections.push(...dedupedSections);

  let totalPages = sections.reduce((sum, s) => sum + s.pages.length, 0);

  // Final fallback: if sidebar parsing + tab fetching found NOTHING,
  // scan <a> tags on the current page for doc-like links
  if (totalPages === 0) {
    const fallbackPages = parseHtmlFallback(html, baseUrl);
    if (fallbackPages.length > 0) {
      sections.push({
        name: "Pages",
        pages: fallbackPages,
      });
      totalPages = fallbackPages.length;
    }
  }

  return {
    sections,
    totalPages,
    sitemapExtra: sitemapMissing,
    sidebarPrefixes: [...sidebarLookups.keys()],
  };
}

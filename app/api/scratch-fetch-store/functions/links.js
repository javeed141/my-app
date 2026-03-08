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

  // Fetch all in parallel, tracking redirects to detect cross-project redirects
  // e.g. /reconciliation/docs → /payments/docs (same content, skip)
  //      /payments/reference → /platform/reference (shared, skip)
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
    if (!r.html || !r.finalUrl) return true; // keep nulls for fallback handling
    try {
      const finalPath = new URL(r.finalUrl).pathname;
      const segments = finalPath.split("/").filter(Boolean);
      // First segment of final URL should match the intended project
      if (segments[0] && segments[0] !== r.project) {
        console.log(`[scraper] Skipping ${r.project}/${r.type} → redirected to /${segments[0]}/ (different project)`);
        return false;
      }
    } catch {}
    return true;
  });

  // Parse sidebar from each fetched page
  for (const { name, project, type, html } of filteredResults) {
    if (!html) continue;

    // Try sidebar parsing first
    const lookups = parseSidebarLookups(html);
    const prefix = `${project}/${type}`;

    // Sidebar keys could be:
    //   JSON parser → "docs" or "reference" (just the type)
    //   DOM parser  → "platform" (the project name, with slug = "docs/slug-name")
    const lookup =
      lookups.get(type) ||
      lookups.get(normalizePrefix(type)) ||
      lookups.get(project) ||
      null;

    // Detect which parser produced the result:
    //   JSON parser slugs: "platform-overview" (just the slug)
    //   DOM parser slugs:  "docs/platform-overview" (type/slug, since prefix = project)
    const isProjectKeyed = !lookups.has(type) && !lookups.has(normalizePrefix(type)) && lookups.has(project);

    if (lookup && lookup.size > 0) {
      const sorted = [...lookup.entries()].sort(
        (a, b) => a[1].order - b[1].order
      );
      const pages = sorted.map(([slug, meta]) => {
        // If DOM parser keyed by project, slug already has "docs/platform-overview"
        // so path = /{project}/{slug} = /platform/docs/platform-overview
        // If JSON parser keyed by type, slug is just "platform-overview"
        // so path = /{project}/{type}/{slug} = /platform/docs/platform-overview
        let pagePath, pageUrl;
        if (isProjectKeyed) {
          pagePath = `/${project}/${slug}`;
          pageUrl = `${baseUrl}/${project}/${slug}`;
        } else {
          pagePath = `/${prefix}/${slug}`;
          pageUrl = `${baseUrl}/${prefix}/${slug}`;
        }
        // Extract just the last segment as the slug for the filename
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
      if (pages.length > 0) {
        sections.push({ name, pages });
        continue;
      }
    }

    // Fallback: scrape <a> links from HTML
    const pages = parseHtmlFallback(html, baseUrl);
    if (pages.length > 0) sections.push({ name, pages });
  }

  return sections;
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

async function mergeSitemapUrls(sections, baseUrl, versionPrefix) {
  // Fetch sitemap
  const xml = await fetchPage(`${baseUrl}/sitemap.xml`);
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

  // Build map: sectionName → section (for appending)
  const sectionByPrefix = new Map();
  for (const section of sections) {
    // Extract prefix from section name: "Guides" → "docs", "API Reference" → "reference"
    // Also handle branch sections like "ent/Guides"
    for (const [prefix, name] of Object.entries(PREFIX_TO_SECTION)) {
      if (section.name === name || section.name.endsWith(`/${name}`)) {
        sectionByPrefix.set(prefix, section);
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

    const prefix = segments[0]; // "docs", "reference", "changelog", etc.
    const slug = segments.slice(1).join("/");

    // Skip forum/discuss pages
    if (prefix === "discuss") continue;

    // Check if path already exists (handles version prefix differences)
    const pathWithPrefix = versionPrefix ? `${versionPrefix}/${prefix}/${slug}` : `/${prefix}/${slug}`;
    const pathWithout = `/${prefix}/${slug}`;
    if (existingPaths.has(pathWithPrefix) || existingPaths.has(pathWithout) || existingPaths.has(pathname)) continue;

    const page = {
      title: slugToTitle(slug.split("/").pop() || slug),
      slug: slug.split("/").pop() || slug,
      path: pathWithPrefix,
      fullUrl: loc,
      level: 1,
      group: "Sitemap",
    };

    // Try to append to existing section
    const existingSection = sectionByPrefix.get(prefix) || sectionByPrefix.get(normalizePrefix(prefix));
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

  let sections;

  if (siteType.type === "D") {
    sections = await buildProjectSections(
      siteType.projects,
      baseUrl,
      currentUrl,
      html
    );
  } else {
    sections = await buildStandardSections(
      sidebarLookups,
      siteType.tabs,
      baseUrl,
      currentUrl,
      html,
      versionPrefix
    );
  }

  // ── Scrape child branches (e.g. /ent/docs, /rdmd/docs) ──
  // These are separate content sets on the same domain,
  // detected from childrenProjects/projectsMeta in page scripts.
  const childBranches = siteType.childBranches || [];
  if (childBranches.length > 0) {
    const branchSections = await buildBranchSections(
      childBranches,
      baseUrl,
      currentUrl,
      html
    );
    sections.push(...branchSections);
  }

  // ── Merge missing sitemap URLs ────────────────────────────
  // Fetch sitemap.xml and add any pages not already found by sidebar parsing.
  // This catches pages that exist on the site but aren't in any sidebar.
  const sitemapMissing = await mergeSitemapUrls(sections, baseUrl, versionPrefix);

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

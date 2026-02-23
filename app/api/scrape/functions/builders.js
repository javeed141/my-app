import { load } from "cheerio";
import {
  fetchPage,
  normalizePrefix,
  slugToTitle,
  stripVersionPrefix,
  PREFIX_TO_SECTION,
  NAV_SELECTORS,
  TAB_PATTERNS,
} from "./types";
import {
  parseSidebarLookups,
  parseHtmlFallback,
} from "./parsers";

// ════════════════════════════════════════════════════════════
//  NAVIGATION DETECTORS
//
//  These functions analyze the page's header/navbar links to determine
//  what type of site structure we're dealing with:
//
//    "projects" → Multi-project site like /{project}/docs/
//    "tabs"     → Standard site with top-level tabs (Guides, API Reference, etc.)
//    "simple"   → Single-section site with no visible tabs
//
//  This classification determines which section builder function gets called.
// ════════════════════════════════════════════════════════════

/** Scans all navigation links on the page to find known tab patterns.
 *  e.g. a link with href="/docs" → tab named "Guides"
 *  e.g. a link with href="/reference" → tab named "API Reference"
 *  Returns an array of detected tabs with their names and paths. */
export function detectTabs($, baseUrl) {
  const tabs = [];
  const seen = new Set(); // Prevent duplicate tabs (same link in header + mobile nav)

  $(NAV_SELECTORS).each((_, el) => {
    let href = ($(el).attr("href") || "").replace(/\/$/, "");
    try {
      // Convert absolute URLs to relative paths for pattern matching
      if (href.startsWith("http")) {
        const u = new URL(href);
        if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
      }
    } catch {
      // Keep href as-is if URL parsing fails (e.g. "javascript:void(0)")
    }

    // Strip version prefix before matching (e.g. "/v3/docs" → "/docs")
    const stripped = stripVersionPrefix(href);

    for (const [pattern, name] of TAB_PATTERNS) {
      if (pattern.test(stripped) && !seen.has(name)) {
        seen.add(name);
        // Store the STRIPPED path so downstream code works with canonical prefixes
        tabs.push({ name, path: "/" + stripped.replace(/^\//, "") });
      }
    }
  });
  return tabs;
}

/** Detects multi-project sites where docs are organized as /{project}/docs/.
 *  e.g. some API platforms have /connect/docs/, /terminal/docs/, etc.
 *  Returns the set of unique project names found in navigation links.
 *
 *  Handles both relative (/payments/docs) and absolute
 *  (https://docs.example.com/payments/docs) hrefs — same-origin
 *  absolute URLs are normalized to relative paths before matching. */
export function detectProjects($, baseUrl) {
  const projects = new Set();
  // These look like project names but are actually standard path segments
  const ignored = new Set(["docs", "reference", "main", "en", "v1", "v2", "v3", "v4", "v5", "beta"]);

  $("header a, nav a, [class*='Header'] a").each((_, el) => {
    let href = $(el).attr("href") || "";
    // Convert absolute same-origin URLs to relative paths for matching
    // (same normalization that detectTabs already does)
    try {
      if (href.startsWith("http")) {
        const u = new URL(href);
        if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
      }
    } catch {
      // Keep href as-is if URL parsing fails
    }
    // Strip version prefix before matching (e.g. "/v3/connect/docs" → "/connect/docs")
    const stripped = stripVersionPrefix(href);
    const m = stripped.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
    if (m && !ignored.has(m[1])) projects.add(m[1]);
  });
  return projects;
}

// ════════════════════════════════════════════════════════════
//  SECTION BUILDER: Multi-Project Sites
//
//  For sites with URL structure: /{project}/docs/ and /{project}/reference/
//  Fetches each project's doc and reference pages in parallel,
//  then scrapes links from each page using parseHtmlFallback().
// ════════════════════════════════════════════════════════════

export async function buildProjectSections(projects, baseUrl, currentUrl, currentHtml) {
  const sections = [];

  // Build list of all pages to fetch: each project × (docs + reference)
  const fetches = [];
  for (const p of projects) {
    for (const type of ["docs", "reference"]) {
      fetches.push({
        name: `${p}/${PREFIX_TO_SECTION[type] || type}`,
        url: `${baseUrl}/${p}/${type}`,
      });
    }
  }

  // Fetch all project pages in parallel
  const htmlResults = await Promise.all(
    fetches.map(async (f) => {
      try {
        return {
          name: f.name,
          // Reuse current page HTML if it matches — avoids a redundant fetch
          html: f.url === currentUrl ? currentHtml : await fetchPage(f.url),
        };
      } catch {
        // ── CRASH GUARD ──────────────────────────────────────
        // fetchPage() normally returns null on failure instead of throwing.
        // But if something truly unexpected happens (e.g. the fetch()
        // implementation throws synchronously), without this catch,
        // Promise.all would reject immediately and ALL other fetches
        // would be discarded — even the ones that succeeded.
        //
        // By catching here, one failing project doesn't kill the others.
        return { name: f.name, html: null };
      }
    })
  );

  for (const { name, html } of htmlResults) {
    if (!html) continue;
    const pages = parseHtmlFallback(html, baseUrl);
    if (pages.length > 0) sections.push({ name, pages });
  }

  return sections;
}

// ════════════════════════════════════════════════════════════
//  SECTION BUILDER: Sidebar-First + Sitemap Supplement
//
//  This is the PRIMARY path for most ReadMe sites.
//
//  KEY INSIGHT (bug fix):
//    OLD approach: Loop sitemap URLs → try match sidebar → sort by order
//    Problem: slug mismatch → everything got order 999999 → alphabetical
//
//    NEW approach:
//      Step 1: Sidebar pages FIRST (already has correct order + groups)
//      Step 2: Append sitemap-only URLs at the end (hidden/unlisted extras)
//
//    SIDEBAR = primary source (titles, groups, order)
//    SITEMAP = supplement (catches pages sidebar doesn't list)
// ════════════════════════════════════════════════════════════

export async function buildSitemapSections(sitemapGroups, sidebarLookups, tabs, baseUrl, currentUrl) {
  const sections = [];

  // Determine which URL prefixes to include based on detected navigation.
  // If tabs were found (e.g. "Guides" + "API Reference"), only process those.
  // Otherwise, use the current page's first path segment (e.g. "docs").
  let allowedPrefixes;
  if (tabs.length > 0) {
    allowedPrefixes = tabs.map((t) => t.path.replace(/^\//, ""));
  } else {
    const segments = new URL(currentUrl).pathname.split("/").filter(Boolean);
    allowedPrefixes = [segments[0] || "docs"];
  }

  const normalizedAllowed = new Set(allowedPrefixes.map(normalizePrefix));

  // Collect all prefixes to process — union of tab prefixes and sitemap prefixes
  // that match our allowed set. Deduplicates via Set.
  const prefixesToProcess = [...new Set([
    ...allowedPrefixes,
    ...[...sitemapGroups.keys()].filter(
      (p) => p !== "discuss" && normalizedAllowed.has(normalizePrefix(p))
    ),
  ])];

  // ── Pre-fetch tab pages that need sidebar data (in parallel) ──
  // The current page's HTML only contains sidebar JSON for ONE tab.
  // If there are other tabs (e.g. "API Reference" when we're on "Guides"),
  // we need to fetch those pages to extract THEIR sidebar data.
  const tabFetches = new Map();
  for (const prefix of prefixesToProcess) {
    const normalized = normalizePrefix(prefix);
    const hasLookup = sidebarLookups.has(prefix) || sidebarLookups.has(normalized);
    if (!hasLookup && prefix !== "changelog") {
      const tabUrl = `${baseUrl}/${prefix}`;
      if (tabUrl !== currentUrl && !tabFetches.has(prefix)) {
        // ── CRASH GUARD ──────────────────────────────────────
        // .catch(() => null) ensures that if one tab fetch throws
        // (not just returns null, but actually throws an exception),
        // it doesn't reject the entire Promise.all and lose all
        // other successfully fetched tabs.
        tabFetches.set(prefix, fetchPage(tabUrl).catch(() => null));
      }
      if (prefix !== normalized) {
        const altUrl = `${baseUrl}/${normalized}`;
        if (altUrl !== currentUrl && !tabFetches.has(normalized)) {
          tabFetches.set(normalized, fetchPage(altUrl).catch(() => null));
        }
      }
    }
  }

  // Await all tab fetches concurrently
  const tabHtmlMap = new Map();
  const entries = [...tabFetches.entries()];
  const results = await Promise.all(entries.map(([, promise]) => promise));
  entries.forEach(([key], i) => tabHtmlMap.set(key, results[i]));

  // ── Build sections — one per URL prefix ──
  const outputSections = new Set(); // Tracks processed normalized prefixes

  for (const prefix of prefixesToProcess) {
    const normalized = normalizePrefix(prefix);
    // Skip if already processed under a different name
    // (e.g. "refs" and "reference" both normalize to "reference")
    if (outputSections.has(normalized)) continue;
    outputSections.add(normalized);

    // Get sidebar lookup for this prefix — try current page first, then fetched tab
    let lookup = sidebarLookups.get(prefix)
      || sidebarLookups.get(normalized)
      || new Map();

    // If no sidebar data found yet, parse the fetched tab HTML for it
    if (lookup.size === 0 && prefix !== "changelog") {
      for (const key of [prefix, normalized]) {
        const tabHtml = tabHtmlMap.get(key);
        if (tabHtml && lookup.size === 0) {
          const tabLookups = parseSidebarLookups(tabHtml);
          lookup = tabLookups.get(prefix) || tabLookups.get(normalized) || lookup;
        }
      }
    }

    const pathPrefix = `/${prefix}`;
    const pages = [];
    const includedSlugs = new Set();

    // ────────────────────────────────────────────────
    // STEP 1: Sidebar pages FIRST (correct order + groups)
    //
    // The sidebar lookup already has correct order from walkJsonSidebar
    // (counter.n++ assigns sequential numbers as it walks the JSON tree).
    //
    // This gives us real titles: "Search and Downloads", "Business Data"
    // Instead of slug-derived: "Api Status Check", "Authentication"
    // ────────────────────────────────────────────────
    if (lookup.size > 0) {
      const sorted = [...lookup.entries()].sort((a, b) => a[1].order - b[1].order);
      for (const [slug, meta] of sorted) {
        includedSlugs.add(slug);
        pages.push({
          title: meta.title,
          path: `${pathPrefix}/${slug}`,
          fullUrl: `${baseUrl}${pathPrefix}/${slug}`,
          level: meta.level,
          group: meta.group,
        });
      }
    }

    // ────────────────────────────────────────────────
    // STEP 2: Append sitemap-only extras at the end
    //
    // Pages that exist in the sitemap but NOT in the sidebar.
    // These are typically hidden, unlisted, or deprecated pages.
    // They get slugToTitle() fallback since we have no real metadata.
    // ────────────────────────────────────────────────
    const sitemapUrls = sitemapGroups.get(prefix) || [];
    for (const fullUrl of sitemapUrls) {
      try {
        const u = new URL(fullUrl);
        const slug = u.pathname.replace(`${pathPrefix}/`, "").replace(/^\//, "");
        if (!slug || includedSlugs.has(slug)) continue;

        includedSlugs.add(slug);
        pages.push({
          title: slugToTitle(slug),
          path: u.pathname,
          fullUrl,
          level: 0,
          group: "",
        });
      } catch (err) {
        console.warn(`[scraper] Bad sitemap URL: ${fullUrl}`, err instanceof Error ? err.message : "");
      }
    }

    if (pages.length > 0) {
      sections.push({
        name: PREFIX_TO_SECTION[prefix] || PREFIX_TO_SECTION[normalized] || prefix,
        pages,
      });
    }
  }

  return sections;
}

// ════════════════════════════════════════════════════════════
//  SECTION BUILDER: No Sitemap Fallback
//
//  Used when sitemap.xml is missing, empty, or unreachable.
//  Builds sections from:
//    1. Sidebar data (if available) — best quality
//    2. HTML link scraping — last resort
//    3. Fetches remaining uncovered tabs
// ════════════════════════════════════════════════════════════

export async function buildNoSitemapSections(sidebarLookups, tabs, baseUrl, currentHtml) {
  const sections = [];

  // Build from sidebar data (best quality — has real titles, groups, order)
  if (sidebarLookups.size > 0) {
    const seenNormalized = new Set();
    for (const [sectionKey, lookup] of sidebarLookups) {
      const normalized = normalizePrefix(sectionKey);
      // Skip duplicates (e.g. "refs" after we already processed "reference")
      if (seenNormalized.has(normalized)) continue;
      seenNormalized.add(normalized);

      const pathPrefix = `/${sectionKey}`;
      const entries = [...lookup.entries()].sort((a, b) => a[1].order - b[1].order);
      const pages = entries.map(([slug, meta]) => ({
        title: meta.title,
        path: `${pathPrefix}/${slug}`,
        fullUrl: `${baseUrl}${pathPrefix}/${slug}`,
        level: meta.level,
        group: meta.group,
      }));
      if (pages.length > 0) {
        sections.push({ name: PREFIX_TO_SECTION[sectionKey] || sectionKey, pages });
      }
    }
  }

  // Try HTML link scraping if sidebar gave us nothing
  if (sections.length === 0) {
    const pages = parseHtmlFallback(currentHtml, baseUrl);
    if (pages.length > 0) sections.push({ name: "Guides", pages });
  }

  // Figure out which tab prefixes we've already covered
  const coveredPrefixes = new Set();
  for (const s of sections) {
    for (const [prefix, name] of Object.entries(PREFIX_TO_SECTION)) {
      if (s.name === name) coveredPrefixes.add(normalizePrefix(prefix));
    }
  }

  // Fetch remaining uncovered tabs in parallel
  const uncoveredTabs = tabs.filter((tab) => {
    const prefix = tab.path.replace(/^\//, "");
    return !coveredPrefixes.has(normalizePrefix(prefix)) && prefix !== "discuss";
  });

  if (uncoveredTabs.length > 0) {
    const tabResults = await Promise.all(
      uncoveredTabs.map(async (tab) => {
        try {
          return {
            name: tab.name,
            html: await fetchPage(`${baseUrl}${tab.path}`),
          };
        } catch {
          // ── CRASH GUARD ──────────────────────────────────────
          // Same as buildProjectSections: one failing tab fetch
          // should not reject Promise.all and discard all other tabs.
          return { name: tab.name, html: null };
        }
      })
    );
    for (const { name, html } of tabResults) {
      if (!html) continue;
      const pages = parseHtmlFallback(html, baseUrl);
      if (pages.length > 0) sections.push({ name, pages });
    }
  }

  return sections;
}

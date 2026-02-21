import { load, type CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";
import {
  fetchPage,
  normalizePrefix,
  slugToTitle,
  PREFIX_TO_SECTION,
  NAV_SELECTORS,
  TAB_PATTERNS,
  type ScrapePageItem,
  type PageMeta,
} from "./types";
import {
  parseSidebarLookups,
  parseHtmlFallback,
} from "./parsers";

// ════════════════════════════════════════════════════════════
//  NAVIGATION DETECTORS
// ════════════════════════════════════════════════════════════

export function detectTabs($: CheerioAPI, baseUrl: string): { name: string; path: string }[] {
  const tabs: { name: string; path: string }[] = [];
  const seen = new Set<string>();

  $(NAV_SELECTORS).each((_: number, el: AnyNode) => {
    let href = ($(el).attr("href") || "").replace(/\/$/, "");
    try {
      if (href.startsWith("http")) {
        const u = new URL(href);
        if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
      }
    } catch {
      // keep href as-is
    }

    for (const [pattern, name] of TAB_PATTERNS) {
      if (pattern.test(href) && !seen.has(name)) {
        seen.add(name);
        tabs.push({ name, path: "/" + href.replace(/^\//, "") });
      }
    }
  });
  return tabs;
}

export function detectProjects($: CheerioAPI): Set<string> {
  const projects = new Set<string>();
  const ignored = new Set(["docs", "reference", "main", "en", "v1", "v2", "v3", "v4", "v5", "beta"]);

  $("header a, nav a, [class*='Header'] a").each((_: number, el: AnyNode) => {
    const href = $(el).attr("href") || "";
    const m = href.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
    if (m && !ignored.has(m[1])) projects.add(m[1]);
  });
  return projects;
}

// ════════════════════════════════════════════════════════════
//  SECTION BUILDER: Multi-Project Sites
// ════════════════════════════════════════════════════════════

export async function buildProjectSections(
  projects: Set<string>,
  baseUrl: string,
  currentUrl: string,
  currentHtml: string
): Promise<{ name: string; pages: ScrapePageItem[] }[]> {
  const sections: { name: string; pages: ScrapePageItem[] }[] = [];

  const fetches: { name: string; url: string }[] = [];
  for (const p of projects) {
    for (const type of ["docs", "reference"] as const) {
      fetches.push({
        name: `${p}/${PREFIX_TO_SECTION[type] || type}`,
        url: `${baseUrl}/${p}/${type}`,
      });
    }
  }

  const htmlResults = await Promise.all(
    fetches.map(async (f) => ({
      name: f.name,
      html: f.url === currentUrl ? currentHtml : await fetchPage(f.url),
    }))
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
//  OLD (broken):
//    Loop sitemap URLs → try match sidebar → sort by order
//    Problem: slug mismatch → alphabetical + ugly titles
//
//  NEW (fixed):
//    Step 1: Sidebar pages first (already correct order + groups)
//    Step 2: Append sitemap-only URLs at the end (extras sidebar missed)
//
//  SIDEBAR = primary (titles, groups, order, pages)
//  SITEMAP = supplement (catches hidden/unlisted pages)
// ════════════════════════════════════════════════════════════

export async function buildSitemapSections(
  sitemapGroups: Map<string, string[]>,
  sidebarLookups: Map<string, Map<string, PageMeta>>,
  tabs: { name: string; path: string }[],
  baseUrl: string,
  currentUrl: string
): Promise<{ name: string; pages: ScrapePageItem[] }[]> {
  const sections: { name: string; pages: ScrapePageItem[] }[] = [];

  // Only process prefixes matching detected navigation
  let allowedPrefixes: string[];
  if (tabs.length > 0) {
    allowedPrefixes = tabs.map((t) => t.path.replace(/^\//, ""));
  } else {
    const segments = new URL(currentUrl).pathname.split("/").filter(Boolean);
    allowedPrefixes = [segments[0] || "docs"];
  }

  const normalizedAllowed = new Set(allowedPrefixes.map(normalizePrefix));

  // Collect all prefixes we need to process (from both tabs and sitemap)
  const prefixesToProcess = [...new Set([
    ...allowedPrefixes,
    ...[...sitemapGroups.keys()].filter(
      (p) => p !== "discuss" && normalizedAllowed.has(normalizePrefix(p))
    ),
  ])];

  // Pre-fetch all tab pages that need sidebar data (in parallel)
  const tabFetches = new Map<string, Promise<string | null>>();
  for (const prefix of prefixesToProcess) {
    const normalized = normalizePrefix(prefix);
    const hasLookup = sidebarLookups.has(prefix) || sidebarLookups.has(normalized);
    if (!hasLookup && prefix !== "changelog") {
      const tabUrl = `${baseUrl}/${prefix}`;
      if (tabUrl !== currentUrl && !tabFetches.has(prefix)) {
        tabFetches.set(prefix, fetchPage(tabUrl));
      }
      if (prefix !== normalized) {
        const altUrl = `${baseUrl}/${normalized}`;
        if (altUrl !== currentUrl && !tabFetches.has(normalized)) {
          tabFetches.set(normalized, fetchPage(altUrl));
        }
      }
    }
  }

  // Await all tab fetches concurrently
  const tabHtmlMap = new Map<string, string | null>();
  const entries = [...tabFetches.entries()];
  const results = await Promise.all(entries.map(([, promise]) => promise));
  entries.forEach(([key], i) => tabHtmlMap.set(key, results[i]));

  // Build sections
  const outputSections = new Set<string>();

  for (const prefix of prefixesToProcess) {
    const normalized = normalizePrefix(prefix);
    if (outputSections.has(normalized)) continue;
    outputSections.add(normalized);

    // Get sidebar lookup — from current page or fetched tab
    let lookup = sidebarLookups.get(prefix)
      || sidebarLookups.get(normalized)
      || new Map<string, PageMeta>();

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
    const pages: ScrapePageItem[] = [];
    const includedSlugs = new Set<string>();

    // ────────────────────────────────────────────────
    // STEP 1: Sidebar pages FIRST (correct order + groups)
    //
    // Sidebar already has the right order from walkJsonSidebar.
    // No sorting needed — just iterate in order.
    // This gives us: "Search and Downloads", "Business Data"...
    // NOT: "Api Status Check", "Authentication", "Businesses"...
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
    // Pages in sitemap but NOT in sidebar (hidden/unlisted).
    // These get slugToTitle() since we have no real metadata.
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
// ════════════════════════════════════════════════════════════

export async function buildNoSitemapSections(
  sidebarLookups: Map<string, Map<string, PageMeta>>,
  tabs: { name: string; path: string }[],
  baseUrl: string,
  currentHtml: string
): Promise<{ name: string; pages: ScrapePageItem[] }[]> {
  const sections: { name: string; pages: ScrapePageItem[] }[] = [];

  // Build from sidebar data
  if (sidebarLookups.size > 0) {
    const seenNormalized = new Set<string>();
    for (const [sectionKey, lookup] of sidebarLookups) {
      const normalized = normalizePrefix(sectionKey);
      if (seenNormalized.has(normalized)) continue;
      seenNormalized.add(normalized);

      const pathPrefix = `/${sectionKey}`;
      const entries = [...lookup.entries()].sort((a, b) => a[1].order - b[1].order);
      const pages: ScrapePageItem[] = entries.map(([slug, meta]) => ({
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

  // Fetch remaining tabs in parallel
  const coveredPrefixes = new Set<string>();
  for (const s of sections) {
    for (const [prefix, name] of Object.entries(PREFIX_TO_SECTION)) {
      if (s.name === name) coveredPrefixes.add(normalizePrefix(prefix));
    }
  }

  const uncoveredTabs = tabs.filter((tab) => {
    const prefix = tab.path.replace(/^\//, "");
    return !coveredPrefixes.has(normalizePrefix(prefix)) && prefix !== "discuss";
  });

  if (uncoveredTabs.length > 0) {
    const tabResults = await Promise.all(
      uncoveredTabs.map(async (tab) => ({
        name: tab.name,
        html: await fetchPage(`${baseUrl}${tab.path}`),
      }))
    );
    for (const { name, html } of tabResults) {
      if (!html) continue;
      const pages = parseHtmlFallback(html, baseUrl);
      if (pages.length > 0) sections.push({ name, pages });
    }
  }

  return sections;
}

import { NextRequest, NextResponse } from "next/server";
import { load, type CheerioAPI, type Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

// ── Config ─────────────────────────────────────────────────

const SAVE_FILES = process.env.NODE_ENV === "development";
const FETCH_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// ── Types ──────────────────────────────────────────────────

interface ScrapePageItem {
  title: string;
  path: string;
  fullUrl: string;
  level: number;
  group: string;
}

interface ScrapeResult {
  site: string;
  navType: "projects" | "tabs" | "simple" | "fallback";
  tabs: string[];
  sections: { name: string; pages: ScrapePageItem[] }[];
}

interface SidebarJsonPage {
  title?: string;
  slug?: string;
  uri?: string;
  children?: SidebarJsonPage[];
  pages?: SidebarJsonPage[];
}

interface PageMeta {
  title: string;
  level: number;
  group: string;
  order: number;
}

// ── Constants ──────────────────────────────────────────────

const PREFIX_TO_SECTION: Record<string, string> = {
  docs: "Guides",
  reference: "API Reference",
  refs: "API Reference",
  changelog: "Changelog",
  recipes: "Recipes",
  discuss: "Discussions",
  page: "Pages",
};

const PREFIX_ALIASES: Record<string, string> = {
  refs: "reference",
};

const SIDEBAR_SELECTORS = [
  "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
  "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
  "[class*='Sidebar']", "[class*='sidebar']", "aside nav", "aside",
];

const NAV_SELECTORS = [
  "header a", "nav a", "[class*='Header'] a", "[class*='navbar'] a",
  "[class*='Navbar'] a", "[class*='MobileFlyout'] a", "[class*='Flyout'] a",
  "[class*='NavItem'] a", ".rm-Header-bottom a",
].join(", ");

const TAB_PATTERNS: [RegExp, string][] = [
  [/^\/?docs\/?$/, "Guides"],
  [/^\/?reference\/?$/, "API Reference"],
  [/^\/?refs\/?$/, "API Reference"],
  [/^\/?changelog\/?$/, "Changelog"],
  [/^\/?recipes\/?$/, "Recipes"],
  [/^\/?discuss\/?$/, "Discussions"],
];

const DOC_PATH_PATTERN = /\/(docs|reference|refs|recipes|page|changelog)\//;
const DOC_HREF_PATTERN = /^\/(docs|reference|refs|recipes|page|changelog)\/.+/;
const SLUG_STRIP_PATTERN = /^\/?(docs|reference|refs|recipes|changelog)\//;

// ── SSRF Protection ────────────────────────────────────────

const BLOCKED_HOSTS = /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|0\.0\.0\.0|::1|\[::1\])/i;

function isUrlAllowed(urlStr: string): boolean {
  try {
    const u = new URL(urlStr);
    if (!["http:", "https:"].includes(u.protocol)) return false;
    if (BLOCKED_HOSTS.test(u.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

// ── Utilities (module-level, created once) ─────────────────

function normalizePrefix(prefix: string): string {
  return PREFIX_ALIASES[prefix] || prefix;
}

function slugToTitle(slug: string): string {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}

/**
 * Extract a balanced JSON object {...} from text starting at `start`.
 * Simple regex breaks on nested braces — this counts them properly.
 */
function extractBalancedJson(text: string, start: number): string | null {
  if (text[start] !== "{") return null;
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"' && !escape) { inString = !inString; continue; }
    if (!inString) {
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) return text.substring(start, i + 1);
      }
    }
  }
  return null;
}

/**
 * Recursively search an object for a key (max 5 levels deep).
 */
function findNestedKey(obj: unknown, key: string, depth: number): unknown {
  if (depth > 5 || !obj || typeof obj !== "object") return null;
  const record = obj as Record<string, unknown>;
  if (key in record) return record[key];
  for (const val of Object.values(record)) {
    const found = findNestedKey(val, key, depth + 1);
    if (found) return found;
  }
  return null;
}

// ── Fetch with timeout + size limit ────────────────────────

async function fetchPage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) {
      console.warn(`[scraper] HTTP ${res.status} for ${url}`);
      return null;
    }

    // Guard against huge responses
    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_BYTES) {
      console.warn(`[scraper] Response too large (${contentLength} bytes) for ${url}`);
      return null;
    }

    return await res.text();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn(`[scraper] Timeout after ${FETCH_TIMEOUT_MS}ms for ${url}`);
    } else {
      console.warn(`[scraper] Fetch failed for ${url}:`, err instanceof Error ? err.message : err);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ── Sitemap Parser ─────────────────────────────────────────

async function fetchSitemapUrls(baseUrl: string): Promise<Map<string, string[]>> {
  const grouped = new Map<string, string[]>();
  const xml = await fetchPage(`${baseUrl}/sitemap.xml`);
  if (!xml) return grouped;

  const $ = load(xml, { xml: true });
  $("url > loc").each((_: number, el: AnyNode) => {
    const loc = $(el).text().trim();
    if (!loc) return;
    try {
      const u = new URL(loc);
      const segments = u.pathname.split("/").filter(Boolean);
      if (segments.length < 2) return;
      const prefix = segments[0];
      if (prefix === "discuss") return;
      if (!grouped.has(prefix)) grouped.set(prefix, []);
      grouped.get(prefix)!.push(loc);
    } catch (err) {
      console.warn(`[scraper] Bad sitemap URL: ${loc}`, err instanceof Error ? err.message : "");
    }
  });

  // Deduplicate
  for (const [key, urls] of grouped) {
    grouped.set(key, [...new Set(urls)]);
  }
  return grouped;
}

// ── JSON Sidebar Parser ────────────────────────────────────

function walkJsonSidebar(
  nodes: SidebarJsonPage[],
  lookup: Map<string, PageMeta>,
  group: string,
  depth: number,
  counter: { n: number }
): void {
  for (const node of nodes) {
    const title = (node.title || "").trim();
    const slug = node.slug || node.uri || "";
    if (!title || !slug) continue;

    const bareSlug = slug.replace(SLUG_STRIP_PATTERN, "");
    lookup.set(bareSlug, { title, level: depth, group, order: counter.n++ });

    const children = node.children || node.pages || [];
    if (children.length > 0) {
      walkJsonSidebar(children, lookup, group, depth + 1, counter);
    }
  }
}

function processSidebars(
  sidebars: Record<string, unknown>,
  result: Map<string, Map<string, PageMeta>>
): void {
  for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
    if (!Array.isArray(sectionPages)) continue;

    const lookup = new Map<string, PageMeta>();
    const counter = { n: 0 };
    for (const category of sectionPages as SidebarJsonPage[]) {
      const groupName = (category.title || sectionKey || "").trim();
      const children = category.pages || category.children || [];
      if (children.length > 0) {
        walkJsonSidebar(children, lookup, groupName, 0, counter);
      }
    }
    if (lookup.size > 0) result.set(sectionKey, lookup);
  }
}

function parseSidebarJson(html: string): Map<string, Map<string, PageMeta>> {
  const result = new Map<string, Map<string, PageMeta>>();
  const $ = load(html);

  // Collect scripts that mention sidebars
  const scripts: string[] = [];
  $("script").each((_: number, el: AnyNode) => {
    const text = $(el).text();
    if (text.length > 100 && (text.includes("sidebars") || text.includes("sidebar"))) {
      scripts.push(text);
    }
  });

  // Method A: Find "sidebars": {...} with balanced brace extraction
  for (const script of scripts) {
    const markers = [/"sidebars"\s*:\s*/, /sidebars\s*=\s*/];
    for (const marker of markers) {
      const match = marker.exec(script);
      if (!match) continue;

      const braceStart = match.index + match[0].length;
      if (script[braceStart] !== "{") continue;

      const jsonStr = extractBalancedJson(script, braceStart);
      if (!jsonStr) continue;

      try {
        const sidebars = JSON.parse(jsonStr) as Record<string, unknown>;
        processSidebars(sidebars, result);
        if (result.size > 0) return result;
      } catch (err) {
        console.warn("[scraper] Failed to parse sidebar JSON from script:", err instanceof Error ? err.message : "");
      }
    }
  }

  // Method B: Deep search in __NEXT_DATA__ or application/json
  $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
    (_: number, el: AnyNode) => {
      if (result.size > 0) return;
      try {
        const data = JSON.parse($(el).text()) as Record<string, unknown>;
        const sidebars = findNestedKey(data, "sidebars", 0);
        if (sidebars && typeof sidebars === "object") {
          processSidebars(sidebars as Record<string, unknown>, result);
        }
      } catch (err) {
        console.warn("[scraper] Failed to parse __NEXT_DATA__:", err instanceof Error ? err.message : "");
      }
    }
  );

  return result;
}

// ── DOM Sidebar Parser ─────────────────────────────────────

function findSidebarElement($: CheerioAPI): Cheerio<AnyNode> | null {
  for (const sel of SIDEBAR_SELECTORS) {
    const $el = $(sel);
    if ($el.length && $el.find("a").length > 3) return $el;
  }
  return null;
}

function extractSlugAndPrefix(href: string): { prefix: string; slug: string } | null {
  try {
    let path = href;
    if (href.startsWith("http")) path = new URL(href).pathname;
    const segments = path.split("/").filter(Boolean);
    if (segments.length < 2) return null;
    return { prefix: segments[0], slug: segments.slice(1).join("/") };
  } catch {
    return null;
  }
}

function parseDomSidebar(html: string): Map<string, Map<string, PageMeta>> {
  const result = new Map<string, Map<string, PageMeta>>();
  const $ = load(html);

  const $sidebar = findSidebarElement($);
  if (!$sidebar) return result;

  const counter = { n: 0 };

  function walkDom($el: Cheerio<AnyNode>, group: string, depth: number): void {
    $el.children().each((_: number, child: AnyNode) => {
      const $c = $(child);
      const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
      const cls = ($c.attr("class") || "").toLowerCase();

      // Detect group headings
      if (
        /^h[1-6]$/.test(tag) ||
        cls.includes("sidebar-heading") || cls.includes("header") ||
        cls.includes("category") || cls.includes("group-heading")
      ) {
        const text = $c.clone().children("ul,ol,li,nav,a").remove().end().text().trim();
        if (text && text.length < 80) group = text;
      }

      // Links → extract metadata
      if (tag === "a") {
        const href = $c.attr("href") || "";
        const title = $c.text().trim();
        if (title && href) {
          const extracted = extractSlugAndPrefix(href);
          if (extracted) {
            const { prefix, slug } = extracted;
            if (!result.has(prefix)) result.set(prefix, new Map());
            const lookup = result.get(prefix)!;
            if (!lookup.has(slug)) {
              lookup.set(slug, { title, level: depth, group, order: counter.n++ });
            }
          }
        }
      }

      // Recurse
      if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
        walkDom($c, group, (tag === "ul" || tag === "ol") ? depth + 1 : depth);
      }
    });
  }

  walkDom($sidebar, "", 0);
  return result;
}

/** Try JSON sidebar first, fall back to DOM parsing */
function parseSidebarLookups(html: string): Map<string, Map<string, PageMeta>> {
  const lookups = parseSidebarJson(html);
  if (lookups.size > 0) return lookups;
  return parseDomSidebar(html);
}

// ── Navigation Detectors ───────────────────────────────────

function detectTabs($: CheerioAPI, baseUrl: string): { name: string; path: string }[] {
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

function detectProjects($: CheerioAPI): Set<string> {
  const projects = new Set<string>();
  const ignored = new Set(["docs", "reference", "main", "en", "v1", "v2", "v3", "v4", "v5", "beta"]);

  $("header a, nav a, [class*='Header'] a").each((_: number, el: AnyNode) => {
    const href = $(el).attr("href") || "";
    const m = href.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
    if (m && !ignored.has(m[1])) projects.add(m[1]);
  });
  return projects;
}

// ── HTML Link Scraping (last resort fallback) ──────────────

function addLink(
  $: CheerioAPI, el: AnyNode, baseUrl: string,
  pages: ScrapePageItem[], group: string, level: number
): void {
  const href = $(el).attr("href") || "";
  const title = $(el).text().trim();
  if (!title || !href || !DOC_PATH_PATTERN.test(href)) return;
  pages.push({
    title,
    path: href,
    fullUrl: href.startsWith("http") ? href : baseUrl + href,
    level,
    group,
  });
}

function walkSidebarHtml(
  $: CheerioAPI, $el: Cheerio<AnyNode>, baseUrl: string,
  pages: ScrapePageItem[], group: string, depth: number
): void {
  $el.children().each((_: number, child: AnyNode) => {
    const $c = $(child);
    const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
    const cls = ($c.attr("class") || "").toLowerCase();

    if (/^h[1-6]$/.test(tag) || cls.includes("header") || cls.includes("category") || cls.includes("group")) {
      const text = $c.clone().children("ul,ol,li,nav").remove().end().text().trim();
      if (text && text.length < 80) group = text;
    }
    if (tag === "a") addLink($, child, baseUrl, pages, group, depth);
    if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
      walkSidebarHtml($, $c, baseUrl, pages, group, tag === "ul" || tag === "ol" ? depth + 1 : depth);
    }
  });
}

function parseHtmlFallback(html: string, baseUrl: string): ScrapePageItem[] {
  const $ = load(html);
  const pages: ScrapePageItem[] = [];

  const $sidebar = findSidebarElement($);
  if ($sidebar) walkSidebarHtml($, $sidebar, baseUrl, pages, "", 0);

  if (pages.length === 0) {
    $('a[href*="/docs/"], a[href*="/reference/"], a[href*="/refs/"], a[href*="/changelog/"]').each(
      (_: number, a: AnyNode) => addLink($, a, baseUrl, pages, "", 0)
    );
  }

  const unique = new Map<string, ScrapePageItem>();
  for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
  return [...unique.values()];
}

// ── File Saving (async, non-blocking) ──────────────────────

async function saveResultToFile(out: ScrapeResult): Promise<void> {
  if (!SAVE_FILES) return;
  try {
    const docsDir = join(process.cwd(), "docs");
    if (!existsSync(docsDir)) await mkdir(docsDir, { recursive: true });
    const safeName = out.site.replace(/[^a-zA-Z0-9.-]/g, "_");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await writeFile(
      join(docsDir, `${safeName}_${timestamp}.json`),
      JSON.stringify(out, null, 2)
    );
  } catch (err) {
    console.warn("[scraper] Failed to save file:", err instanceof Error ? err.message : err);
  }
}

// ── Section Builders ───────────────────────────────────────

async function buildProjectSections(
  projects: Set<string>, baseUrl: string, currentUrl: string, currentHtml: string
): Promise<{ name: string; pages: ScrapePageItem[] }[]> {
  const sections: { name: string; pages: ScrapePageItem[] }[] = [];

  // Fetch all project pages in parallel
  const fetches: { name: string; url: string }[] = [];
  for (const p of projects) {
    for (const type of ["docs", "reference"] as const) {
      fetches.push({ name: `${p}/${PREFIX_TO_SECTION[type] || type}`, url: `${baseUrl}/${p}/${type}` });
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

async function buildSitemapSections(
  sitemapGroups: Map<string, string[]>,
  sidebarLookups: Map<string, Map<string, PageMeta>>,
  tabs: { name: string; path: string }[],
  baseUrl: string,
  currentUrl: string
): Promise<{ name: string; pages: ScrapePageItem[] }[]> {
  const sections: { name: string; pages: ScrapePageItem[] }[] = [];

  // Determine which prefixes to process based on navigation
  let allowedPrefixes: string[];
  if (tabs.length > 0) {
    allowedPrefixes = tabs.map((t) => t.path.replace(/^\//, ""));
  } else {
    const segments = new URL(currentUrl).pathname.split("/").filter(Boolean);
    allowedPrefixes = [segments[0] || "docs"];
  }

  const normalizedAllowed = new Set(allowedPrefixes.map(normalizePrefix));
  const prefixesToProcess = [...sitemapGroups.keys()].filter(
    (p) => p !== "discuss" && normalizedAllowed.has(normalizePrefix(p))
  );

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

    const urls = sitemapGroups.get(prefix);
    if (!urls || urls.length === 0) continue;

    // Get sidebar lookup — from current page or fetched tab
    let lookup = sidebarLookups.get(prefix)
      || sidebarLookups.get(normalized)
      || new Map<string, PageMeta>();

    if (lookup.size === 0 && prefix !== "changelog") {
      // Try tab HTML we fetched in parallel
      for (const key of [prefix, normalized]) {
        const tabHtml = tabHtmlMap.get(key);
        if (tabHtml && lookup.size === 0) {
          const tabLookups = parseSidebarLookups(tabHtml);
          lookup = tabLookups.get(prefix) || tabLookups.get(normalized) || lookup;
        }
      }
    }

    // Build pages: sitemap URLs enriched with sidebar metadata
    const pathPrefix = `/${prefix}`;
    const pagesWithOrder: (ScrapePageItem & { _order: number })[] = [];

    for (const fullUrl of urls) {
      try {
        const u = new URL(fullUrl);
        const slug = u.pathname.replace(`${pathPrefix}/`, "").replace(/^\//, "");
        if (!slug) continue;

        const meta = lookup.get(slug);
        pagesWithOrder.push({
          title: meta?.title || slugToTitle(slug),
          path: u.pathname,
          fullUrl,
          level: meta?.level || 0,
          group: meta?.group || "",
          _order: meta?.order ?? 999999,
        });
      } catch (err) {
        console.warn(`[scraper] Bad sitemap URL: ${fullUrl}`, err instanceof Error ? err.message : "");
      }
    }

    pagesWithOrder.sort((a, b) => {
      if (a._order !== b._order) return a._order - b._order;
      return a.title.localeCompare(b.title);
    });

    const pages: ScrapePageItem[] = pagesWithOrder.map(({ _order, ...p }) => p);
    if (pages.length > 0) {
      sections.push({ name: PREFIX_TO_SECTION[prefix] || prefix, pages });
    }
  }

  return sections;
}

async function buildNoSitemapSections(
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

// ── Route Handler ──────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Parse and validate input
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  // Validate URL format
  let baseUrl: string;
  try {
    const parsed = new URL(url);
    baseUrl = parsed.origin;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // SSRF protection
  if (!isUrlAllowed(url)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    // Step 1: Fetch page HTML + sitemap in parallel
    const [html, sitemapGroups] = await Promise.all([
      fetchPage(url),
      fetchSitemapUrls(baseUrl),
    ]);

    if (!html) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });
    }

    // Step 2: Detect navigation type
    const $ = load(html);
    const tabs = detectTabs($, baseUrl);
    const projects = detectProjects($);

    const out: ScrapeResult = {
      site: new URL(url).hostname,
      navType: "simple",
      tabs: tabs.map((t) => t.name),
      sections: [],
    };

    // Step 3: Build sections based on navigation type
    if (projects.size > 0) {
      // ── Multi-project sites ──
      out.navType = "projects";
      out.sections = await buildProjectSections(projects, baseUrl, url, html);
    } else {
      // ── Standard site (tabs or simple) ──
      out.navType = tabs.length > 0 ? "tabs" : "simple";
      const sidebarLookups = parseSidebarLookups(html);

      if (sitemapGroups.size > 0) {
        out.sections = await buildSitemapSections(sitemapGroups, sidebarLookups, tabs, baseUrl, url);
      } else {
        out.sections = await buildNoSitemapSections(sidebarLookups, tabs, baseUrl, html);
      }
    }

    // Step 4: Last resort — scan all links on page
    if (out.sections.length === 0) {
      out.navType = "fallback";
      const pages: ScrapePageItem[] = [];
      const seenHrefs = new Set<string>();

      $("a").each((_: number, a: AnyNode) => {
        const href = $(a).attr("href") || "";
        const title = $(a).text().trim();
        if (!title || title.length > 100 || seenHrefs.has(href)) return;
        if (DOC_HREF_PATTERN.test(href)) {
          seenHrefs.add(href);
          pages.push({ title, path: href, fullUrl: baseUrl + href, level: 0, group: "" });
        }
      });

      if (pages.length > 0) out.sections.push({ name: "all", pages });
    }

    // Step 5: Save (non-blocking, async)
    saveResultToFile(out).catch(() => {}); // fire-and-forget

    return NextResponse.json(out);
  } catch (e: unknown) {
    console.error("[scraper] Unhandled error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
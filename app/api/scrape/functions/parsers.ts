import { load, type CheerioAPI, type Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import {
  fetchPage,
  extractBalancedJson,
  findNestedKey,
  slugToTitle,
  normalizePrefix,
  SIDEBAR_SELECTORS,
  SLUG_STRIP_PATTERN,
  DOC_PATH_PATTERN,
  type ScrapePageItem,
  type SidebarJsonPage,
  type PageMeta,
} from "./types";

// ════════════════════════════════════════════════════════════
//  SITEMAP PARSER
//
//  Fetches /sitemap.xml → groups all URLs by first path segment.
//  e.g. { "docs": [url1, url2], "reference": [url3, url4] }
//  This is the source of truth for WHAT pages exist.
// ════════════════════════════════════════════════════════════

export async function fetchSitemapUrls(baseUrl: string): Promise<Map<string, string[]>> {
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

  for (const [key, urls] of grouped) {
    grouped.set(key, [...new Set(urls)]);
  }
  return grouped;
}

// ════════════════════════════════════════════════════════════
//  JSON SIDEBAR PARSER
//
//  Searches <script> tags for a "sidebars" JSON object.
//  Two strategies:
//    A) Regex + balanced brace extraction from inline scripts
//    B) Deep search inside __NEXT_DATA__ or application/json
//
//  Returns Map<prefix, Map<slug, PageMeta>>
//  Used to ENRICH sitemap URLs with titles, groups, order.
// ════════════════════════════════════════════════════════════

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

export function parseSidebarJson(html: string): Map<string, Map<string, PageMeta>> {
  const result = new Map<string, Map<string, PageMeta>>();
  const $ = load(html);

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

// ════════════════════════════════════════════════════════════
//  DOM SIDEBAR PARSER
//
//  Fallback when JSON is not available.
//  Walks the rendered HTML sidebar (<nav>, <ul>, <li>, <a>)
//  to extract slug → metadata mapping.
//
//  Returns same shape as JSON parser: Map<prefix, Map<slug, PageMeta>>
// ════════════════════════════════════════════════════════════

export function findSidebarElement($: CheerioAPI): Cheerio<AnyNode> | null {
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

export function parseDomSidebar(html: string): Map<string, Map<string, PageMeta>> {
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

      if (
        /^h[1-6]$/.test(tag) ||
        cls.includes("sidebar-heading") || cls.includes("header") ||
        cls.includes("category") || cls.includes("group-heading")
      ) {
        const text = $c.clone().children("ul,ol,li,nav,a").remove().end().text().trim();
        if (text && text.length < 80) group = text;
      }

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

      if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
        walkDom($c, group, (tag === "ul" || tag === "ol") ? depth + 1 : depth);
      }
    });
  }

  walkDom($sidebar, "", 0);
  return result;
}

// ════════════════════════════════════════════════════════════
//  COMBINED SIDEBAR PARSER
//
//  Try JSON first (reliable on React/Next.js sites),
//  fall back to DOM parsing.
// ════════════════════════════════════════════════════════════

export function parseSidebarLookups(html: string): Map<string, Map<string, PageMeta>> {
  const lookups = parseSidebarJson(html);
  if (lookups.size > 0) return lookups;
  return parseDomSidebar(html);
}

// ════════════════════════════════════════════════════════════
//  HTML FALLBACK LINK SCRAPER
//
//  Last resort when both sidebar parsers fail.
//  Finds the sidebar element and collects all <a> tags,
//  or scans the whole page for doc-like links.
//
//  Returns ScrapePageItem[] directly (not metadata maps).
// ════════════════════════════════════════════════════════════

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

export function parseHtmlFallback(html: string, baseUrl: string): ScrapePageItem[] {
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
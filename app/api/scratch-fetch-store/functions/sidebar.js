// ═══════════════════════════════════════════════════════════
//  STEP 3 — sidebar.js (Sidebar Extraction)
//
//  IMPORTS FROM: types.js (Step 1)
//  USED BY:      links.js (Step 4), route.js (Step 8)
//
//  Extracts the sidebar navigation structure from a page's HTML.
//  Three strategies tried in priority order:
//
//    1. JSON sidebar  — best quality (real titles, groups, order)
//    2. DOM sidebar   — good fallback (walks rendered HTML tree)
//    3. HTML fallback — last resort (scans all <a> tags)
//
//  EXPORTS:
//    parseSidebarJson(html)         → Map<prefix, Map<slug, meta>>
//    parseDomSidebar(html)          → Map<prefix, Map<slug, meta>>
//    parseSidebarLookups(html)      → Map<prefix, Map<slug, meta>>
//    parseHtmlFallback(html, base)  → [{ title, path, fullUrl, level, group }]
// ═══════════════════════════════════════════════════════════

import { load } from "cheerio";
import {
  extractBalancedJson,
  findNestedKey,
  slugToTitle,
  stripVersionPrefix,
  SIDEBAR_SELECTORS,
  SLUG_STRIP_PATTERN,
  DOC_PATH_PATTERN,
  MIN_SCRIPT_LENGTH,
  MIN_SIDEBAR_LINKS,
  MAX_GROUP_HEADING_LENGTH,
  MAX_DOM_WALK_DEPTH,
} from "./types.js";

// ════════════════════════════════════════════════════════════
//  STRATEGY 1: JSON SIDEBAR PARSER (best quality)
//
//  ReadMe sites embed sidebar data as JSON inside <script> tags.
//  This gives us:
//    - Real page titles (not slug-derived guesses)
//    - Group names ("Getting Started", "Authentication")
//    - Correct display order (not alphabetical)
//    - Nesting depth
//
//  INPUT:  html (string) — raw HTML of the page
//  OUTPUT: Map<prefix, Map<slug, { title, level, group, order }>>
//
//  Example output:
//    Map {
//      "docs" => Map {
//        "overview"       => { title: "Overview",       level: 0, group: "Getting Started", order: 0 },
//        "authentication" => { title: "Authentication", level: 0, group: "Getting Started", order: 1 },
//        "get-users"      => { title: "Get Users",      level: 0, group: "Endpoints",       order: 2 }
//      },
//      "reference" => Map { ... }
//    }
// ════════════════════════════════════════════════════════════

/**
 * Walks the JSON sidebar tree recursively.
 *
 * JSON structure:
 *   { title: "Get Users", slug: "get-users", children: [...] }
 *
 * counter.n++ assigns sequential numbers to preserve sidebar order.
 */
function walkJsonSidebar(nodes, lookup, group, depth, counter) {
  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;

    const title = (node.title || "").trim();
    const slug = node.slug || node.uri || "";
    if (!title || !slug) continue;

    const bareSlug = slug.replace(SLUG_STRIP_PATTERN, "");
    lookup.set(bareSlug, { title, level: depth, group, order: counter.n++ });

    const children = node.children || node.pages || [];
    if (Array.isArray(children) && children.length > 0) {
      walkJsonSidebar(children, lookup, group, depth + 1, counter);
    }
  }
}

/**
 * Processes top-level "sidebars" object.
 *
 * Structure: { "docs": [...categories], "reference": [...categories] }
 * Each category: { title: "Getting Started", pages: [...] }
 */
function processSidebars(sidebars, result) {
  for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
    if (!Array.isArray(sectionPages)) continue;

    const lookup = new Map();
    const counter = { n: 0 };

    for (const category of sectionPages) {
      if (!category || typeof category !== "object") continue;

      const groupName = (category.title || sectionKey || "").trim();
      const children = category.pages || category.children || [];

      if (Array.isArray(children) && children.length > 0) {
        walkJsonSidebar(children, lookup, groupName, 0, counter);
      }
    }

    if (lookup.size > 0) result.set(sectionKey, lookup);
  }
}

export function parseSidebarJson(html) {
  const result = new Map();
  const $ = load(html);

  // Collect <script> tags that might contain sidebar JSON
  const scripts = [];
  $("script").each((_, el) => {
    const text = $(el).text();
    if (
      text.length > MIN_SCRIPT_LENGTH &&
      (text.includes("sidebars") || text.includes("sidebar"))
    ) {
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
        const sidebars = JSON.parse(jsonStr);
        processSidebars(sidebars, result);
        if (result.size > 0) return result;
      } catch {
        // Continue trying other scripts
      }
    }
  }

  // Method B: Deep search in __NEXT_DATA__ or application/json
  $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
    (_, el) => {
      if (result.size > 0) return;
      try {
        const data = JSON.parse($(el).text());
        const sidebars = findNestedKey(data, "sidebars", 0);
        if (sidebars && typeof sidebars === "object") {
          processSidebars(sidebars, result);
        }
      } catch {
        // Continue
      }
    }
  );

  return result;
}

// ════════════════════════════════════════════════════════════
//  STRATEGY 2: DOM SIDEBAR PARSER (fallback)
//
//  Walks the rendered sidebar HTML (<nav>, <ul>, <li>, <a>).
//  Less reliable than JSON but still preserves display order.
//
//  INPUT:  html (string)
//  OUTPUT: Map<prefix, Map<slug, { title, level, group, order }>>
// ════════════════════════════════════════════════════════════

/** Finds the sidebar element by trying CSS selectors. */
export function findSidebarElement($) {
  for (const sel of SIDEBAR_SELECTORS) {
    const $el = $(sel);
    if ($el.length && $el.find("a").length > MIN_SIDEBAR_LINKS) return $el;
  }
  return null;
}

/** Extracts prefix and slug from an href.
 *  "/reference/get-users" → { prefix: "reference", slug: "get-users" } */
function extractSlugAndPrefix(href) {
  try {
    let path = href;
    if (href.startsWith("http")) path = new URL(href).pathname;
    path = stripVersionPrefix(path);
    const segments = path.split("/").filter(Boolean);
    if (segments.length < 2) return null;
    return { prefix: segments[0], slug: segments.slice(1).join("/") };
  } catch {
    return null;
  }
}

export function parseDomSidebar(html) {
  const result = new Map();
  const $ = load(html);

  const $sidebar = findSidebarElement($);
  if (!$sidebar) return result;

  const counter = { n: 0 };

  function walkDom($el, group, depth) {
    if (depth > MAX_DOM_WALK_DEPTH) return;

    $el.children().each((_, child) => {
      const $c = $(child);
      const tag = (child.tagName || "").toLowerCase();
      const cls = ($c.attr("class") || "").toLowerCase();

      // Detect group headings
      if (
        /^h[1-6]$/.test(tag) ||
        cls.includes("sidebar-heading") ||
        cls.includes("header") ||
        cls.includes("category") ||
        cls.includes("group-heading")
      ) {
        const text = $c
          .clone()
          .children("ul,ol,li,nav,a")
          .remove()
          .end()
          .text()
          .trim();
        if (text && text.length < MAX_GROUP_HEADING_LENGTH) group = text;
      }

      // Links → extract page metadata
      if (tag === "a") {
        const href = $c.attr("href") || "";
        const title = $c.text().trim();
        if (title && href) {
          const extracted = extractSlugAndPrefix(href);
          if (extracted) {
            const { prefix, slug } = extracted;
            if (!result.has(prefix)) result.set(prefix, new Map());
            const lookup = result.get(prefix);
            if (!lookup.has(slug)) {
              lookup.set(slug, {
                title,
                level: depth,
                group,
                order: counter.n++,
              });
            }
          }
        }
      }

      // Recurse into containers
      if (
        ["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)
      ) {
        walkDom(
          $c,
          group,
          tag === "ul" || tag === "ol" ? depth + 1 : depth
        );
      }
    });
  }

  walkDom($sidebar, "", 0);
  return result;
}

// ════════════════════════════════════════════════════════════
//  COMBINED: parseSidebarLookups()
//
//  Main entry point. Tries JSON first, falls back to DOM.
//
//  INPUT:  html (string)
//  OUTPUT: Map<prefix, Map<slug, { title, level, group, order }>>
// ════════════════════════════════════════════════════════════

export function parseSidebarLookups(html) {
  const lookups = parseSidebarJson(html);
  if (lookups.size > 0) return lookups;
  return parseDomSidebar(html);
}

// ════════════════════════════════════════════════════════════
//  STRATEGY 3: HTML FALLBACK (last resort)
//
//  Scans all <a> tags matching doc-like URL patterns.
//
//  INPUT:  html (string), baseUrl (string)
//  OUTPUT: [{ title, path, fullUrl, level, group }]
// ════════════════════════════════════════════════════════════

function addLink($, el, baseUrl, pages, group, level) {
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

function walkSidebarHtml($, $el, baseUrl, pages, group, depth) {
  if (depth > MAX_DOM_WALK_DEPTH) return;

  $el.children().each((_, child) => {
    const $c = $(child);
    const tag = (child.tagName || "").toLowerCase();
    const cls = ($c.attr("class") || "").toLowerCase();

    if (
      /^h[1-6]$/.test(tag) ||
      cls.includes("header") ||
      cls.includes("category") ||
      cls.includes("group")
    ) {
      const text = $c
        .clone()
        .children("ul,ol,li,nav")
        .remove()
        .end()
        .text()
        .trim();
      if (text && text.length < MAX_GROUP_HEADING_LENGTH) group = text;
    }
    if (tag === "a") addLink($, child, baseUrl, pages, group, depth);
    if (
      ["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)
    ) {
      walkSidebarHtml(
        $,
        $c,
        baseUrl,
        pages,
        group,
        tag === "ul" || tag === "ol" ? depth + 1 : depth
      );
    }
  });
}

// ════════════════════════════════════════════════════════════
//  STRATEGY 4: ALL PAGE LINKS (for tabs without sidebars)
//
//  When a tab page has NO sidebar at all, scan ALL same-domain
//  <a> links on the page body. No pattern filter — every link
//  on the page is a potential page to scrape.
//
//  Skips: external links, anchors (#), empty hrefs, nav/header/footer
//
//  INPUT:  html (string), baseUrl (string)
//  OUTPUT: [{ title, slug, path, fullUrl, level, group }]
// ════════════════════════════════════════════════════════════

export function parseAllPageLinks(html, baseUrl) {
  const $ = load(html);
  const pages = [];
  const seen = new Set();

  // Skip links inside header, footer, nav (those are site chrome, not content)
  const skipSelectors = "header, footer, [class*='Header'], [class*='Footer'], [class*='navbar'], [class*='Navbar']";

  $("a").each((_, el) => {
    // Skip if inside header/footer/nav
    if ($(el).closest(skipSelectors).length > 0) return;

    const href = $(el).attr("href") || "";
    const title = $(el).text().trim();
    if (!title || title.length > 200 || !href) return;
    // Skip anchors, javascript:, mailto:, tel:
    if (href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    // Normalize to path
    let pagePath = href;
    try {
      if (href.startsWith("http")) {
        const u = new URL(href);
        if (u.origin !== baseUrl) return; // skip external
        pagePath = u.pathname;
      }
    } catch { return; }

    // Must have at least 2 segments: /something/slug
    pagePath = pagePath.replace(/\/$/, "");
    const segments = pagePath.split("/").filter(Boolean);
    if (segments.length < 2) return;

    if (seen.has(pagePath)) return;
    seen.add(pagePath);

    const slug = segments[segments.length - 1];
    pages.push({
      title,
      slug,
      path: pagePath,
      fullUrl: `${baseUrl}${pagePath}`,
      level: 0,
      group: "",
    });
  });

  return pages;
}

export function parseHtmlFallback(html, baseUrl) {
  const $ = load(html);
  const pages = [];

  const $sidebar = findSidebarElement($);
  if ($sidebar) walkSidebarHtml($, $sidebar, baseUrl, pages, "", 0);

  if (pages.length === 0) {
    $(
      'a[href*="/docs/"], a[href*="/reference/"], a[href*="/refs/"], a[href*="/changelog/"]'
    ).each((_, a) => addLink($, a, baseUrl, pages, "", 0));
  }

  // Deduplicate by path
  const unique = new Map();
  for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
  return [...unique.values()];
}

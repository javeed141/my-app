import { load } from "cheerio";
import {
  fetchPage,
  extractBalancedJson,
  findNestedKey,
  slugToTitle,
  normalizePrefix,
  stripVersionPrefix,
  SIDEBAR_SELECTORS,
  SLUG_STRIP_PATTERN,
  DOC_PATH_PATTERN,
  MIN_SCRIPT_LENGTH,
  MIN_SIDEBAR_LINKS,
  MAX_GROUP_HEADING_LENGTH,
  MAX_DOM_WALK_DEPTH,
} from "./types";

// ════════════════════════════════════════════════════════════
//  SITEMAP PARSER
//
//  Fetches /sitemap.xml and groups all <url><loc> entries
//  by their first URL path segment.
//
//  Input:  "https://docs.example.com"
//  Output: Map { "docs" => [url1, url2], "reference" => [url3] }
//
//  This tells us WHAT pages exist on the site.
//  The sidebar parsers (below) tell us HOW to display them
//  (real titles, groups, correct order).
// ════════════════════════════════════════════════════════════

export async function fetchSitemapUrls(baseUrl) {
  const grouped = new Map();
  const xml = await fetchPage(`${baseUrl}/sitemap.xml`);
  if (!xml) return grouped;

  const $ = load(xml, { xml: true });
  $("url > loc").each((_, el) => {
    const loc = $(el).text().trim();
    if (!loc) return;
    try {
      const u = new URL(loc);
      const segments = u.pathname.split("/").filter(Boolean);
      if (segments.length < 2) return; // Skip root-level pages like /about
      const prefix = segments[0];
      if (prefix === "discuss") return; // Forum pages, not docs
      if (!grouped.has(prefix)) grouped.set(prefix, []);
      grouped.get(prefix).push(loc);
    } catch (err) {
      console.warn(`[scraper] Bad sitemap URL: ${loc}`, err instanceof Error ? err.message : "");
    }
  });

  // Deduplicate — some sitemaps list the same URL more than once
  for (const [key, urls] of grouped) {
    grouped.set(key, [...new Set(urls)]);
  }
  return grouped;
}

// ════════════════════════════════════════════════════════════
//  JSON SIDEBAR PARSER
//
//  ReadMe sites embed sidebar navigation as JSON inside <script> tags.
//  This is the BEST data source because it gives us:
//    - Real page titles (not slug-derived guesses)
//    - Group names ("Getting Started", "Authentication")
//    - Correct display order (not alphabetical)
//    - Nesting depth
//
//  Two strategies to find it:
//    A) Regex for "sidebars": {...} in inline scripts
//    B) Deep search inside __NEXT_DATA__ or application/json blocks
//
//  Returns: Map<prefix, Map<slug, PageMeta>>
//  Example: { "reference" => { "get-users" => { title: "Get Users", order: 3, ... } } }
// ════════════════════════════════════════════════════════════

/**
 * Recursively walks the JSON sidebar tree and extracts page metadata.
 *
 * The JSON structure looks like:
 *   { title: "Get Users", slug: "get-users", children: [...] }
 *
 * We flatten this tree into a Map<slug, PageMeta> where "order" is assigned
 * sequentially via counter.n++ to preserve the sidebar's display order.
 * This is what makes pages appear in sidebar order instead of alphabetical.
 */
function walkJsonSidebar(nodes, lookup, group, depth, counter) {
  for (const node of nodes) {
    // ── CRASH GUARD ──────────────────────────────────────────
    // If the sidebar JSON is malformed and contains null entries
    // like [null, { title: "Page" }, null], accessing node.title
    // would throw: "Cannot read properties of null (reading 'title')"
    //
    // This can happen when a site's CMS saves incomplete data.
    // We skip the bad entry and continue with the rest.
    if (!node || typeof node !== "object") continue;

    const title = (node.title || "").trim();
    const slug = node.slug || node.uri || "";
    if (!title || !slug) continue;

    const bareSlug = slug.replace(SLUG_STRIP_PATTERN, "");
    lookup.set(bareSlug, { title, level: depth, group, order: counter.n++ });

    const children = node.children || node.pages || [];

    // ── CRASH GUARD ──────────────────────────────────────────
    // If a site's JSON has "children": "none" or "pages": 5
    // (a string or number instead of an array), then calling
    // walkJsonSidebar(children, ...) would throw:
    //   "5 is not iterable" or "none is not iterable"
    //
    // Array.isArray() catches all non-array types safely.
    // A string like "none" has .length but is not a valid array.
    if (Array.isArray(children) && children.length > 0) {
      walkJsonSidebar(children, lookup, group, depth + 1, counter);
    }
  }
}

/**
 * Processes the top-level "sidebars" object from ReadMe's JSON.
 *
 * Structure: { "docs": [...categories], "reference": [...categories] }
 * Each category: { title: "Getting Started", pages: [...pages] }
 *
 * The category.title becomes the group name shown in the sidebar.
 */
function processSidebars(sidebars, result) {
  for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
    if (!Array.isArray(sectionPages)) continue;

    const lookup = new Map();
    const counter = { n: 0 };
    for (const category of sectionPages) {
      // ── CRASH GUARD ──────────────────────────────────────────
      // Same issue as walkJsonSidebar: the array might contain null
      // entries like [null, { title: "Auth" }]. Accessing category.title
      // on null throws "Cannot read properties of null".
      if (!category || typeof category !== "object") continue;

      const groupName = (category.title || sectionKey || "").trim();
      const children = category.pages || category.children || [];

      // ── CRASH GUARD ──────────────────────────────────────────
      // Same as walkJsonSidebar: children might be a non-array value.
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

  // Collect <script> tags that might contain sidebar JSON.
  // Skip tiny scripts (< MIN_SCRIPT_LENGTH chars) — they're analytics/tracking tags,
  // not sidebar data. Also must mention "sidebar" somewhere in the text.
  const scripts = [];
  $("script").each((_, el) => {
    const text = $(el).text();
    if (text.length > MIN_SCRIPT_LENGTH && (text.includes("sidebars") || text.includes("sidebar"))) {
      scripts.push(text);
    }
  });

  // ── Method A: Find "sidebars": {...} with balanced brace extraction ──
  // This handles inline scripts where ReadMe sets: window.__DATA__ = { sidebars: {...} }
  // extractBalancedJson() has its own MAX_SCRIPT_SCAN_LENGTH guard inside.
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
        if (result.size > 0) return result; // Found valid sidebar data, stop searching
      } catch (err) {
        console.warn("[scraper] Failed to parse sidebar JSON from script:", err instanceof Error ? err.message : "");
      }
    }
  }

  // ── Method B: Deep search in __NEXT_DATA__ or application/json ──
  // ReadMe uses Next.js, which serializes all page props into __NEXT_DATA__.
  // The sidebar data is nested inside at varying depths — findNestedKey() searches for it.
  $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
    (_, el) => {
      if (result.size > 0) return; // Already found sidebar data from Method A
      try {
        const data = JSON.parse($(el).text());
        const sidebars = findNestedKey(data, "sidebars", 0);
        if (sidebars && typeof sidebars === "object") {
          processSidebars(sidebars, result);
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
//  Fallback when JSON sidebar data is not available.
//  (Happens on older ReadMe sites that don't embed sidebar JSON.)
//
//  Walks the rendered HTML sidebar (<nav>, <ul>, <li>, <a>)
//  to extract page metadata from the DOM structure itself.
//
//  Less reliable than JSON parsing because:
//    - Titles may include icon text or badge text
//    - Nesting depends on CSS classes being structured
//    - Mobile/desktop sidebars may duplicate links
//
//  But still gives us correct display order (DOM order = sidebar order).
//
//  Returns same shape as JSON parser: Map<prefix, Map<slug, PageMeta>>
// ════════════════════════════════════════════════════════════

/** Finds the sidebar element by trying selectors from most specific to least.
 *  Returns the first element that has enough links to be a real sidebar
 *  (not just a header nav with 2 links). */
export function findSidebarElement($) {
  for (const sel of SIDEBAR_SELECTORS) {
    const $el = $(sel);
    if ($el.length && $el.find("a").length > MIN_SIDEBAR_LINKS) return $el;
  }
  return null;
}

/** Extracts the URL prefix and slug from an href.
 *  e.g. "/reference/get-users" → { prefix: "reference", slug: "get-users" }
 *  e.g. "/v3/docs/get-started" → { prefix: "docs", slug: "get-started" }
 *  e.g. "https://docs.site.com/docs/auth/setup" → { prefix: "docs", slug: "auth/setup" }
 *  Returns null for hrefs that are too short or invalid. */
function extractSlugAndPrefix(href) {
  try {
    let path = href;
    if (href.startsWith("http")) path = new URL(href).pathname;
    // Strip version prefix so "/v3/docs/page" is treated as "/docs/page"
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
    // ── CRASH GUARD ──────────────────────────────────────────
    // Malformed HTML can create deeply nested DOM trees.
    // Without a depth limit, this recursive function would eventually
    // hit a stack overflow crash (~10K frames on Node.js).
    // Normal sidebars are 3–5 levels deep; 50 is extremely generous.
    if (depth > MAX_DOM_WALK_DEPTH) return;

    $el.children().each((_, child) => {
      const $c = $(child);
      const tag = (child.tagName || "").toLowerCase();
      const cls = ($c.attr("class") || "").toLowerCase();

      // Detect group headings — e.g. <h3>Getting Started</h3> or
      // <div class="sidebar-heading">Authentication</div>
      if (
        /^h[1-6]$/.test(tag) ||
        cls.includes("sidebar-heading") || cls.includes("header") ||
        cls.includes("category") || cls.includes("group-heading")
      ) {
        // Remove child nav elements before reading text, otherwise
        // we'd get all the child link titles concatenated together
        const text = $c.clone().children("ul,ol,li,nav,a").remove().end().text().trim();
        if (text && text.length < MAX_GROUP_HEADING_LENGTH) group = text;
      }

      // Links → extract page metadata (title, slug, prefix)
      if (tag === "a") {
        const href = $c.attr("href") || "";
        const title = $c.text().trim();
        if (title && href) {
          const extracted = extractSlugAndPrefix(href);
          if (extracted) {
            const { prefix, slug } = extracted;
            if (!result.has(prefix)) result.set(prefix, new Map());
            const lookup = result.get(prefix);
            // Only keep the first occurrence — duplicates happen when
            // the same link appears in both desktop and mobile sidebars
            if (!lookup.has(slug)) {
              lookup.set(slug, { title, level: depth, group, order: counter.n++ });
            }
          }
        }
      }

      // Recurse into container elements.
      // <ul>/<ol> increase nesting depth (represents sub-pages).
      // Other containers pass through at the same depth.
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
//  This is the main entry point used by route.js and builders.js.
//  Try JSON first (reliable on modern ReadMe/Next.js sites),
//  fall back to DOM parsing (for older ReadMe sites).
// ════════════════════════════════════════════════════════════

export function parseSidebarLookups(html) {
  const lookups = parseSidebarJson(html);
  if (lookups.size > 0) return lookups;
  return parseDomSidebar(html);
}

// ════════════════════════════════════════════════════════════
//  HTML FALLBACK LINK SCRAPER
//
//  Last resort when BOTH sidebar parsers fail
//  (no JSON sidebar data AND no recognizable sidebar DOM element).
//
//  Two approaches:
//    1. Find sidebar element → walk its links (preserves order)
//    2. Scan ALL <a> tags on the page matching doc-like patterns
//
//  Returns ScrapePageItem[] directly (not metadata maps),
//  because at this point we're just collecting whatever we can find.
// ════════════════════════════════════════════════════════════

/** Adds a link to the pages array if it looks like a doc page.
 *  Checks that the href matches DOC_PATH_PATTERN (/docs/, /reference/, etc). */
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

/** Walks sidebar HTML collecting links.
 *  Similar to walkDom() above but outputs page items directly
 *  instead of Map<slug, PageMeta>. Used by parseHtmlFallback(). */
function walkSidebarHtml($, $el, baseUrl, pages, group, depth) {
  // ── CRASH GUARD ──────────────────────────────────────────
  // Same as walkDom — prevents stack overflow on deeply nested HTML.
  if (depth > MAX_DOM_WALK_DEPTH) return;

  $el.children().each((_, child) => {
    const $c = $(child);
    const tag = (child.tagName || "").toLowerCase();
    const cls = ($c.attr("class") || "").toLowerCase();

    if (/^h[1-6]$/.test(tag) || cls.includes("header") || cls.includes("category") || cls.includes("group")) {
      const text = $c.clone().children("ul,ol,li,nav").remove().end().text().trim();
      if (text && text.length < MAX_GROUP_HEADING_LENGTH) group = text;
    }
    if (tag === "a") addLink($, child, baseUrl, pages, group, depth);
    if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
      walkSidebarHtml($, $c, baseUrl, pages, group, tag === "ul" || tag === "ol" ? depth + 1 : depth);
    }
  });
}

export function parseHtmlFallback(html, baseUrl) {
  const $ = load(html);
  const pages = [];

  // Try structured sidebar first (preserves order and groups)
  const $sidebar = findSidebarElement($);
  if ($sidebar) walkSidebarHtml($, $sidebar, baseUrl, pages, "", 0);

  // If sidebar gave us nothing, scan ALL <a> tags on the page as last resort
  if (pages.length === 0) {
    $('a[href*="/docs/"], a[href*="/reference/"], a[href*="/refs/"], a[href*="/changelog/"]').each(
      (_, a) => addLink($, a, baseUrl, pages, "", 0)
    );
  }

  // Deduplicate by path — the same link can appear in header, sidebar, and footer
  const unique = new Map();
  for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
  return [...unique.values()];
}

import { NextRequest, NextResponse } from "next/server";
import { load, type CheerioAPI, type Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ╔════════════════════════════════════════════════════════════════════╗
// ║  ReadMe Documentation Scraper — API Route                        ║
// ║                                                                   ║
// ║  Strategy:                                                        ║
// ║    1. Fetch sitemap.xml → ALL page URLs (source of truth)         ║
// ║    2. Group URLs by prefix: /docs/, /reference/, /changelog/      ║
// ║    3. Merge with sidebar JSON for hierarchy + group names         ║
// ║    4. Slug → title from sidebar JSON, fallback to slug cleanup    ║
// ╚════════════════════════════════════════════════════════════════════╝

const SAVE_FILES = true;

// ─── Types ───────────────────────────────────────────────────────────

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

const PREFIX_TO_SECTION: Record<string, string> = {
  docs: "Guides",
  reference: "API Reference",
  changelog: "Changelog",
  recipes: "Recipes",
  discuss: "Discussions",
  page: "Pages",
};

// ─── Main Handler ────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  let baseUrl: string;
  try {
    baseUrl = new URL(url).origin;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  };

  async function fetchPage(u: string): Promise<string | null> {
    try {
      const r = await fetch(u, { headers, redirect: "follow" });
      return r.ok ? await r.text() : null;
    } catch {
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  //  STEP 1: Fetch sitemap.xml → ALL URLs grouped by prefix
  // ═══════════════════════════════════════════════════════════════════

  async function fetchSitemapUrls(): Promise<Map<string, string[]>> {
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
        if (segments.length < 2) return; // skip root URLs
        const prefix = segments[0];
        if (prefix === "discuss") return;
        if (!grouped.has(prefix)) grouped.set(prefix, []);
        grouped.get(prefix)!.push(loc);
      } catch { /* skip */ }
    });

    for (const [key, urls] of grouped) {
      grouped.set(key, [...new Set(urls)]);
    }
    return grouped;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  STEP 2: Parse sidebar JSON — with proper brace-matching
  //
  //  CRITICAL FIX: The old regex \{[\s\S]*?\} is non-greedy and
  //  matches to the FIRST } — breaking on nested JSON.
  //  Now we use proper brace counting to extract the full object.
  // ═══════════════════════════════════════════════════════════════════

  interface PageMeta {
    title: string;
    level: number;
    group: string;
    order: number;
  }

  function walkJsonSidebar(
    nodes: SidebarJsonPage[],
    lookup: Map<string, PageMeta>,
    group: string,
    depth: number,
    counter: { n: number }
  ) {
    for (const node of nodes) {
      const title = (node.title || "").trim();
      const slug = node.slug || node.uri || "";
      if (!title || !slug) continue;

      const bareSlug = slug.replace(/^\/?(docs|reference|recipes|changelog)\//, "");
      lookup.set(bareSlug, { title, level: depth, group, order: counter.n++ });

      const children = node.children || node.pages || [];
      if (children.length > 0) {
        walkJsonSidebar(children, lookup, group, depth + 1, counter);
      }
    }
  }

  // Extract a balanced JSON object starting from an opening { at position `start`
  // Returns the full substring including matching braces, or null if invalid
  function extractBalancedBraces(text: string, start: number): string | null {
    if (text[start] !== "{") return null;
    let depth = 0;
    let inString = false;
    let escape = false;

    for (let i = start; i < text.length; i++) {
      const ch = text[i];

      if (escape) { escape = false; continue; }
      if (ch === "\\") { escape = true; continue; }

      if (ch === '"' && !escape) {
        inString = !inString;
        continue;
      }

      if (!inString) {
        if (ch === "{") depth++;
        else if (ch === "}") {
          depth--;
          if (depth === 0) {
            return text.substring(start, i + 1);
          }
        }
      }
    }
    return null; // unbalanced
  }

  function parseSidebarJson(html: string): Map<string, Map<string, PageMeta>> {
    const result = new Map<string, Map<string, PageMeta>>();
    const $ = load(html);

    function processSidebars(sidebars: Record<string, unknown>) {
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

        if (lookup.size > 0) {
          result.set(sectionKey, lookup);
        }
      }
    }

    // ── Method A: Find "sidebars" in <script> tags with balanced brace extraction ──
    const scripts: string[] = [];
    $("script").each((_: number, el: AnyNode) => {
      const text = $(el).text();
      if (text.length > 100 && (text.includes("sidebars") || text.includes("sidebar"))) {
        scripts.push(text);
      }
    });

    for (const script of scripts) {
      // Find "sidebars" : { ... } with balanced braces
      const markers = [/"sidebars"\s*:\s*/, /sidebars\s*=\s*/];
      for (const marker of markers) {
        const match = marker.exec(script);
        if (!match) continue;

        const braceStart = match.index + match[0].length;
        if (script[braceStart] !== "{") continue;

        const jsonStr = extractBalancedBraces(script, braceStart);
        if (!jsonStr) continue;

        try {
          const sidebars = JSON.parse(jsonStr);
          processSidebars(sidebars);
          if (result.size > 0) return result;
        } catch { /* invalid JSON, try next */ }
      }
    }

    // ── Method B: __NEXT_DATA__ and application/json (full parse) ──
    $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
      (_: number, el: AnyNode) => {
        if (result.size > 0) return;
        try {
          const data = JSON.parse($(el).text());
          const findSidebars = (obj: Record<string, unknown>, depth: number): unknown => {
            if (depth > 5) return null;
            if (obj && typeof obj === "object") {
              if ("sidebars" in obj) return obj.sidebars;
              for (const val of Object.values(obj)) {
                const found = findSidebars(val as Record<string, unknown>, depth + 1);
                if (found) return found;
              }
            }
            return null;
          };
          const sidebars = findSidebars(data, 0) as Record<string, unknown> | null;
          if (sidebars && typeof sidebars === "object") processSidebars(sidebars);
        } catch { /* skip */ }
      }
    );

    return result;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  STEP 3: Slug → readable title fallback
  // ═══════════════════════════════════════════════════════════════════

  function slugToTitle(slug: string): string {
    return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
  }

  // ═══════════════════════════════════════════════════════════════════
  //  STEP 4: Detect tabs from HTML nav
  // ═══════════════════════════════════════════════════════════════════

  function detectTabs($: CheerioAPI): { name: string; path: string }[] {
    const tabs: { name: string; path: string }[] = [];
    const seenTabs = new Set<string>();
    const tabPatterns: [RegExp, string][] = [
      [/^\/?docs\/?$/, "Guides"],
      [/^\/?reference\/?$/, "API Reference"],
      [/^\/?changelog\/?$/, "Changelog"],
      [/^\/?recipes\/?$/, "Recipes"],
      [/^\/?discuss\/?$/, "Discussions"],
    ];
    const sel = [
      "header a", "nav a", "[class*='Header'] a", "[class*='navbar'] a",
      "[class*='Navbar'] a", "[class*='MobileFlyout'] a", "[class*='Flyout'] a",
      "[class*='NavItem'] a", ".rm-Header-bottom a",
    ].join(", ");

    $(sel).each((_: number, el: AnyNode) => {
      let href = ($(el).attr("href") || "").replace(/\/$/, "");
      try {
        if (href.startsWith("http")) {
          const u = new URL(href);
          if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
        }
      } catch { /* use as-is */ }
      for (const [pattern, name] of tabPatterns) {
        if (pattern.test(href) && !seenTabs.has(name)) {
          seenTabs.add(name);
          tabs.push({ name, path: "/" + href.replace(/^\//, "") });
        }
      }
    });
    return tabs;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  STEP 5: Detect multi-project sites
  // ═══════════════════════════════════════════════════════════════════

  function detectProjects($: CheerioAPI): Set<string> {
    const projects = new Set<string>();
    $("header a, nav a, [class*='Header'] a").each((_: number, el: AnyNode) => {
      const href = $(el).attr("href") || "";
      const m = href.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
      if (m) {
        const slug = m[1];
        if (!["docs", "reference", "main", "en", "v1", "v2", "v3", "v4", "v5", "beta"].includes(slug))
          projects.add(slug);
      }
    });
    return projects;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  STEP 6: Parse sidebar from HTML DOM
  //  ReadMe sites render sidebar as HTML <section>/<h2>/<ul>/<li>/<a>
  //  This extracts slug→{title, group, level, order} from the DOM
  // ═══════════════════════════════════════════════════════════════════

  function parseDomSidebar(html: string): Map<string, Map<string, PageMeta>> {
    const result = new Map<string, Map<string, PageMeta>>();
    const $ = load(html);

    // Find the sidebar container
    const sidebarSelectors = [
      "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
      "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
      "[class*='Sidebar']", "[class*='sidebar']", "aside nav",
    ];
    let $sidebar: Cheerio<AnyNode> | null = null;
    for (const sel of sidebarSelectors) {
      const $el = $(sel);
      if ($el.length && $el.find("a").length > 3) { $sidebar = $el; break; }
    }
    if (!$sidebar) return result;

    // Walk sections → each <section> or <h2> defines a group
    const counter = { n: 0 };

    function extractSlugAndPrefix(href: string): { prefix: string; slug: string } | null {
      try {
        let path = href;
        if (href.startsWith("http")) {
          const u = new URL(href);
          path = u.pathname;
        }
        const segments = path.split("/").filter(Boolean);
        if (segments.length < 2) return null;
        return { prefix: segments[0], slug: segments.slice(1).join("/") };
      } catch { return null; }
    }

    function walkDomSidebar(
      $el: Cheerio<AnyNode>, group: string, depth: number
    ) {
      $el.children().each((_: number, child: AnyNode) => {
        const $c = $(child);
        const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
        const cls = ($c.attr("class") || "").toLowerCase();

        // Detect group headings: <h2 class="rm-Sidebar-heading">, or any h1-h6/header/category
        if (
          /^h[1-6]$/.test(tag) ||
          cls.includes("sidebar-heading") ||
          cls.includes("header") ||
          cls.includes("category") ||
          cls.includes("group-heading")
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

        // Recurse into nested elements
        if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
          const nextDepth = (tag === "ul" || tag === "ol") ? depth + 1 : depth;
          walkDomSidebar($c, group, nextDepth);
        }
      });
    }

    walkDomSidebar($sidebar, "", 0);
    return result;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  STEP 7: HTML DOM fallback (no sitemap + no sidebar JSON)
  // ═══════════════════════════════════════════════════════════════════

  function addLink(
    $: CheerioAPI, el: AnyNode,
    pages: ScrapePageItem[], group: string, level: number
  ) {
    const href = $(el).attr("href") || "";
    const title = $(el).text().trim();
    if (!title || !href) return;
    if (!href.match(/\/(docs|reference|recipes|page|changelog)\//)) return;
    pages.push({
      title, path: href,
      fullUrl: href.startsWith("http") ? href : baseUrl + href,
      level, group,
    });
  }

  function walkSidebar(
    $: CheerioAPI, $el: Cheerio<AnyNode>,
    pages: ScrapePageItem[], group: string, depth: number
  ) {
    $el.children().each((_: number, child: AnyNode) => {
      const $c = $(child);
      const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
      const cls = ($c.attr("class") || "").toLowerCase();
      if (/^h[1-6]$/.test(tag) || cls.includes("header") || cls.includes("category") || cls.includes("group")) {
        const text = $c.clone().children("ul,ol,li,nav").remove().end().text().trim();
        if (text && text.length < 80) group = text;
      }
      if (tag === "a") addLink($, child, pages, group, depth);
      if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
        walkSidebar($, $c, pages, group, tag === "ul" || tag === "ol" ? depth + 1 : depth);
      }
    });
  }

  function parseHtmlFallback(html: string): ScrapePageItem[] {
    const $ = load(html);
    const pages: ScrapePageItem[] = [];
    const selectors = [
      "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
      "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
      "[class*='Sidebar']", "[class*='sidebar']", "aside nav", "aside",
    ];
    let $sidebar: Cheerio<AnyNode> | null = null;
    for (const sel of selectors) {
      const $el = $(sel);
      if ($el.length && $el.find("a").length > 3) { $sidebar = $el; break; }
    }
    if ($sidebar) walkSidebar($, $sidebar, pages, "", 0);
    if (pages.length === 0) {
      $('a[href*="/docs/"], a[href*="/reference/"], a[href*="/changelog/"]').each(
        (_: number, a: AnyNode) => addLink($, a, pages, "", 0)
      );
    }
    const unique = new Map<string, ScrapePageItem>();
    for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
    return [...unique.values()];
  }

  // ═══════════════════════════════════════════════════════════════════
  //  MAIN LOGIC
  // ═══════════════════════════════════════════════════════════════════

  try {
    const [html, sitemapGroups] = await Promise.all([
      fetchPage(url),
      fetchSitemapUrls(),
    ]);

    if (!html) return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });

    const $ = load(html);
    const tabs = detectTabs($);
    const projects = detectProjects($);

    const out: ScrapeResult = {
      site: new URL(url).hostname,
      navType: "simple",
      tabs: tabs.map(t => t.name),
      sections: [],
    };

    // ── Multi-project ────────────────────────────────────────────

    if (projects.size > 0) {
      out.navType = "projects";
      for (const p of projects) {
        for (const type of ["docs", "reference"] as const) {
          const projUrl = `${baseUrl}/${p}/${type}`;
          const phtml = projUrl === url ? html : await fetchPage(projUrl);
          if (!phtml) continue;
          const pages = parseHtmlFallback(phtml);
          if (pages.length > 0) {
            out.sections.push({ name: `${p}/${PREFIX_TO_SECTION[type] || type}`, pages });
          }
        }
      }
    }

    // ── Standard site ────────────────────────────────────────────

    else {
      out.navType = tabs.length > 0 ? "tabs" : "simple";

      // Try sidebar JSON first, then fall back to DOM sidebar parsing
      const sidebarLookups = parseSidebarJson(html);
      if (sidebarLookups.size === 0) {
        // No JSON sidebar found — parse sidebar from HTML DOM
        const domLookups = parseDomSidebar(html);
        for (const [k, v] of domLookups) sidebarLookups.set(k, v);
      }

      if (sitemapGroups.size > 0) {
        // ── PRIMARY: Sitemap URLs + sidebar enrichment ──
        const sectionOrder = ["docs", "reference", "changelog", "recipes", "page"];
        const allPrefixes = [...new Set([...sectionOrder, ...sitemapGroups.keys()])];

        for (const prefix of allPrefixes) {
          const urls = sitemapGroups.get(prefix);
          if (!urls || urls.length === 0) continue;
          if (prefix === "discuss") continue;

          const lookup = sidebarLookups.get(prefix) || new Map<string, PageMeta>();
          const pathPrefix = `/${prefix}`;

          const pagesUnsorted: (ScrapePageItem & { _order: number })[] = [];

          for (const fullUrl of urls) {
            try {
              const u = new URL(fullUrl);
              const slug = u.pathname.replace(`${pathPrefix}/`, "").replace(/^\//, "");
              if (!slug) continue;

              const meta = lookup.get(slug);
              pagesUnsorted.push({
                title: meta?.title || slugToTitle(slug),
                path: u.pathname,
                fullUrl,
                level: meta?.level || 0,
                group: meta?.group || "",
                _order: meta?.order ?? 999999,
              });
            } catch { /* skip */ }
          }

          pagesUnsorted.sort((a, b) => {
            if (a._order !== b._order) return a._order - b._order;
            return a.title.localeCompare(b.title);
          });

          const pages: ScrapePageItem[] = pagesUnsorted.map(({ _order, ...p }) => p);

          if (pages.length > 0) {
            out.sections.push({ name: PREFIX_TO_SECTION[prefix] || prefix, pages });
          }

          // If this section had no sidebar enrichment from current page HTML,
          // try fetching the tab's page to get its sidebar
          if (lookup.size === 0 && pages.length > 0 && prefix !== "changelog") {
            const tabUrl = `${baseUrl}/${prefix}`;
            if (tabUrl !== url) {
              const tabHtml = await fetchPage(tabUrl);
              if (tabHtml) {
                const tabDomLookups = parseDomSidebar(tabHtml);
                const tabLookup = tabDomLookups.get(prefix);
                if (tabLookup && tabLookup.size > 0) {
                  // Re-enrich pages with tab's sidebar data
                  const sectionIdx = out.sections.length - 1;
                  const enriched = out.sections[sectionIdx].pages.map(p => {
                    const slug = p.path.replace(`/${prefix}/`, "");
                    const meta = tabLookup.get(slug);
                    if (meta) {
                      return { ...p, title: meta.title, level: meta.level, group: meta.group };
                    }
                    return p;
                  });
                  // Re-sort by sidebar order
                  enriched.sort((a, b) => {
                    const slugA = a.path.replace(`/${prefix}/`, "");
                    const slugB = b.path.replace(`/${prefix}/`, "");
                    const orderA = tabLookup.get(slugA)?.order ?? 999999;
                    const orderB = tabLookup.get(slugB)?.order ?? 999999;
                    if (orderA !== orderB) return orderA - orderB;
                    return a.title.localeCompare(b.title);
                  });
                  out.sections[sectionIdx].pages = enriched;
                }
              }
            }
          }
        }
      } else {
        // ── FALLBACK: No sitemap ──
        if (sidebarLookups.size > 0) {
          for (const [sectionKey, lookup] of sidebarLookups) {
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
              out.sections.push({ name: PREFIX_TO_SECTION[sectionKey] || sectionKey, pages });
            }
          }
        }

        if (out.sections.length === 0) {
          const pages = parseHtmlFallback(html);
          if (pages.length > 0) out.sections.push({ name: "Guides", pages });
        }

        // Fetch remaining tabs
        const coveredPrefixes = new Set<string>();
        for (const s of out.sections) {
          for (const [prefix, name] of Object.entries(PREFIX_TO_SECTION)) {
            if (s.name === name) coveredPrefixes.add(prefix);
          }
        }
        for (const tab of tabs) {
          const prefix = tab.path.replace(/^\//, "");
          if (coveredPrefixes.has(prefix) || prefix === "discuss") continue;
          const tabUrl = `${baseUrl}${tab.path}`;
          const tabHtml = await fetchPage(tabUrl);
          if (!tabHtml) continue;
          const tabPages = parseHtmlFallback(tabHtml);
          if (tabPages.length > 0) out.sections.push({ name: tab.name, pages: tabPages });
        }
      }
    }

    // ── Last resort ──────────────────────────────────────────────

    if (out.sections.length === 0) {
      out.navType = "fallback";
      const pages: ScrapePageItem[] = [];
      const seenHrefs = new Set<string>();
      $("a").each((_: number, a: AnyNode) => {
        const href = $(a).attr("href") || "";
        const title = $(a).text().trim();
        if (!title || title.length > 100 || seenHrefs.has(href)) return;
        if (href.match(/^\/(docs|reference|recipes|page|changelog)\/.+/)) {
          seenHrefs.add(href);
          pages.push({ title, path: href, fullUrl: baseUrl + href, level: 0, group: "" });
        }
      });
      if (pages.length > 0) out.sections.push({ name: "all", pages });
    }

    // ── Save locally ─────────────────────────────────────────────

    if (SAVE_FILES) try {
      const docsDir = join(process.cwd(), "docs");
      if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });
      const safeName = out.site.replace(/[^a-zA-Z0-9.-]/g, "_");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      writeFileSync(join(docsDir, `${safeName}_${timestamp}.json`), JSON.stringify(out, null, 2));
    } catch { /* read-only filesystem */ }

    return NextResponse.json(out);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
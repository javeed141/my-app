import { NextRequest, NextResponse } from "next/server";
import { load, type CheerioAPI, type Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

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

  // ── JSON sidebar parser (ReadMe embeds sidebars JSON in script tags) ──

  interface SidebarJsonPage {
    title?: string;
    slug?: string;
    uri?: string;
    children?: SidebarJsonPage[];
    pages?: SidebarJsonPage[];
  }

  function walkJsonSidebar(
    nodes: SidebarJsonPage[],
    pages: ScrapePageItem[],
    group: string,
    depth: number,
    pathPrefix: string
  ) {
    for (const node of nodes) {
      const title = (node.title || "").trim();
      const slug = node.slug || node.uri || "";
      if (!title || !slug) continue;

      const path = slug.startsWith("http") || slug.startsWith("/")
        ? slug
        : `${pathPrefix}/${slug}`;
      const fullUrl = path.startsWith("http") ? path : baseUrl + path;

      pages.push({ title, path, fullUrl, level: depth, group });

      const children = node.children || node.pages || [];
      if (children.length > 0) {
        walkJsonSidebar(children, pages, group, depth + 1, pathPrefix);
      }
    }
  }

  function parseJsonSidebar(html: string): ScrapePageItem[] | null {
    const pages: ScrapePageItem[] = [];

    // Look for sidebars JSON embedded in script tags
    const patterns = [
      /"sidebars"\s*:\s*(\{[\s\S]*?\})\s*[,}]/,
      /sidebars\s*=\s*(\{[\s\S]*?\})\s*;/,
    ];

    const $ = load(html);
    const scripts: string[] = [];
    $("script").each((_: number, el: AnyNode) => {
      const text = $(el).text();
      if (text.length > 100 && (text.includes("sidebars") || text.includes("sidebar"))) {
        scripts.push(text);
      }
    });

    for (const script of scripts) {
      for (const pattern of patterns) {
        const match = script.match(pattern);
        if (!match) continue;
        try {
          const sidebars = JSON.parse(match[1]);
          // sidebars is { docs: [...], reference: [...], ... }
          for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
            if (!Array.isArray(sectionPages)) continue;
            for (const category of sectionPages as SidebarJsonPage[]) {
              const groupName = (category.title || sectionKey || "").trim();
              const children = category.pages || category.children || [];
              if (children.length > 0) {
                const prefix = sectionKey === "reference" ? "/reference" : "/docs";
                walkJsonSidebar(children, pages, groupName, 0, prefix);
              }
            }
          }
          if (pages.length > 0) return pages;
        } catch { /* not valid JSON, try next */ }
      }
    }

    // Also try __NEXT_DATA__ or similar page props
    $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
      (_: number, el: AnyNode) => {
        if (pages.length > 0) return;
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
          const sidebars = findSidebars(data, 0) as Record<string, SidebarJsonPage[]> | null;
          if (sidebars && typeof sidebars === "object") {
            for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
              if (!Array.isArray(sectionPages)) continue;
              for (const category of sectionPages) {
                const groupName = (category.title || sectionKey || "").trim();
                const children = category.pages || category.children || [];
                if (children.length > 0) {
                  const prefix = sectionKey === "reference" ? "/reference" : "/docs";
                  walkJsonSidebar(children, pages, groupName, 0, prefix);
                }
              }
            }
          }
        } catch { /* ignore */ }
      }
    );

    return pages.length > 0 ? pages : null;
  }

  // ── HTML sidebar parser (fallback) ──────────────────────────────────

  function addLink(
    $: CheerioAPI,
    el: AnyNode,
    pages: ScrapePageItem[],
    group: string,
    level: number
  ) {
    const href = $(el).attr("href") || "";
    const title = $(el).text().trim();
    if (!title || !href) return;
    if (!href.match(/\/(docs|reference|recipes|page)\//)) return;
    pages.push({
      title,
      path: href,
      fullUrl: href.startsWith("http") ? href : baseUrl + href,
      level,
      group,
    });
  }

  function walkSidebar(
    $: CheerioAPI,
    $el: Cheerio<AnyNode>,
    pages: ScrapePageItem[],
    group: string,
    depth: number
  ) {
    $el.children().each((_: number, child: AnyNode) => {
      const $c = $(child);
      const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
      const cls = ($c.attr("class") || "").toLowerCase();

      if (
        /^h[1-6]$/.test(tag) ||
        cls.includes("header") ||
        cls.includes("category") ||
        cls.includes("group")
      ) {
        const text = $c.clone().children("ul,ol,li,nav").remove().end().text().trim();
        if (text && text.length < 80) group = text;
      }

      if (tag === "a") addLink($, child, pages, group, depth);

      if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
        const nextDepth = tag === "ul" || tag === "ol" ? depth + 1 : depth;
        walkSidebar($, $c, pages, group, nextDepth);
      }
    });
  }

  function parseSidebar(html: string): ScrapePageItem[] {
    // Try JSON sidebar first (accurate hierarchy from ReadMe embedded data)
    const jsonPages = parseJsonSidebar(html);
    if (jsonPages && jsonPages.length > 0) return jsonPages;

    // Fall back to HTML DOM walking
    const $ = load(html);
    const pages: ScrapePageItem[] = [];

    const selectors = [
      "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
      "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
      "[class*='Sidebar']", "[class*='sidebar']",
      "aside nav", "aside",
    ];

    let $sidebar: Cheerio<AnyNode> | null = null;
    for (const sel of selectors) {
      const $el = $(sel);
      if ($el.length && $el.find("a").length > 3) {
        $sidebar = $el;
        break;
      }
    }

    if ($sidebar) walkSidebar($, $sidebar, pages, "", 0);

    if (pages.length === 0) {
      $("ul").each((_: number, ul: AnyNode) => {
        const links = $(ul).find('a[href*="/docs/"], a[href*="/reference/"]');
        if (links.length > 3 && pages.length === 0) {
          links.each((_2: number, a: AnyNode) => addLink($, a, pages, "", 0));
        }
      });
    }

    if (pages.length === 0) {
      $('a[href*="/docs/"], a[href*="/reference/"]').each((_: number, a: AnyNode) =>
        addLink($, a, pages, "", 0)
      );
    }

    const unique = new Map<string, ScrapePageItem>();
    for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
    return [...unique.values()];
  }

  try {
    const html = await fetchPage(url);
    if (!html) return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });

    const $ = load(html);

    // Detect nav tabs
    const tabs: { name: string; path: string }[] = [];
    const seen = new Set<string>();

    $("header a, nav a, [class*='Header'] a, [class*='navbar'] a, [class*='Navbar'] a").each(
      (_: number, el: AnyNode) => {
        const href = ($(el).attr("href") || "").replace(/\/$/, "");
        for (const [pattern, name] of [
          [/^\/?docs$/, "Guides"],
          [/^\/?reference$/, "API Reference"],
          [/^\/?changelog$/, "Changelog"],
          [/^\/?recipes$/, "Recipes"],
        ] as [RegExp, string][]) {
          if (pattern.test(href) && !seen.has(name)) {
            seen.add(name);
            tabs.push({ name, path: "/" + href.replace(/^\//, "") });
          }
        }
      }
    );

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

    const toFetch: { name: string; url: string }[] = [];
    if (projects.size > 0) {
      for (const p of projects) {
        toFetch.push({ name: `${p}/guides`, url: `${baseUrl}/${p}/docs` });
        toFetch.push({ name: `${p}/reference`, url: `${baseUrl}/${p}/reference` });
      }
    } else if (tabs.length > 0) {
      for (const t of tabs) toFetch.push({ name: t.name, url: `${baseUrl}${t.path}` });
    } else {
      toFetch.push({ name: "docs", url });
    }

    let navType: ScrapeResult["navType"];
    if (projects.size > 0) {
      navType = "projects";
    } else if (tabs.length > 0) {
      navType = "tabs";
    } else {
      navType = "simple";
    }

    const out: ScrapeResult = { site: new URL(url).hostname, navType, sections: [] };

    for (const section of toFetch) {
      const shtml = section.url === url ? html : await fetchPage(section.url);
      if (!shtml) continue;
      const pages = parseSidebar(shtml);
      if (pages.length > 0) out.sections.push({ name: section.name, pages });
    }

    if (out.sections.length === 0) {
      out.navType = "fallback";
      const pages: ScrapePageItem[] = [];
      const seenHrefs = new Set<string>();
      $("a").each((_: number, a: AnyNode) => {
        const href = $(a).attr("href") || "";
        const title = $(a).text().trim();
        if (!title || title.length > 100 || seenHrefs.has(href)) return;
        if (href.match(/^\/(docs|reference|recipes|page)\/.+/)) {
          seenHrefs.add(href);
          pages.push({ title, path: href, fullUrl: baseUrl + href, level: 0, group: "" });
        }
      });
      if (pages.length > 0) out.sections.push({ name: "all", pages });
    }

    // Save JSON to docs/ folder
    const docsDir = join(process.cwd(), "docs");
    if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });
    const safeName = out.site.replace(/[^a-zA-Z0-9.-]/g, "_");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filePath = join(docsDir, `${safeName}_${timestamp}.json`);
    writeFileSync(filePath, JSON.stringify(out, null, 2));

    // Also store the raw sidebar structure if found
    const $raw = load(html);
    const rawScripts: string[] = [];
    $raw("script").each((_: number, el: AnyNode) => {
      const text = $raw(el).text();
      if (text.includes("sidebars") || text.includes("sidebar")) {
        const match = text.match(/"sidebars"\s*:\s*(\{[\s\S]*?\})\s*[,}]/);
        if (match) rawScripts.push(match[1]);
      }
    });
    if (rawScripts.length > 0) {
      try {
        const rawSidebar = JSON.parse(rawScripts[0]);
        const rawPath = join(docsDir, `${safeName}_${timestamp}_sidebar-structure.json`);
        writeFileSync(rawPath, JSON.stringify(rawSidebar, null, 2));
      } catch { /* ignore parse errors */ }
    }

    return NextResponse.json(out);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

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
  sections: { name: string; pages: ScrapePageItem[] }[];
}

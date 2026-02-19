import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

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

  function addLink(
    $: cheerio.CheerioAPI,
    el: cheerio.AnyNode,
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
      level: Math.min(level, 2),
      group,
    });
  }

  function walkSidebar(
    $: cheerio.CheerioAPI,
    $el: cheerio.Cheerio<cheerio.AnyNode>,
    pages: ScrapePageItem[],
    group: string,
    depth: number
  ) {
    $el.children().each((_, child) => {
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
    const $ = cheerio.load(html);
    const pages: ScrapePageItem[] = [];

    const selectors = [
      "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
      "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
      "[class*='Sidebar']", "[class*='sidebar']",
      "aside nav", "aside",
    ];

    let $sidebar: cheerio.Cheerio<cheerio.AnyNode> | null = null;
    for (const sel of selectors) {
      const $el = $(sel);
      if ($el.length && $el.find("a").length > 3) {
        $sidebar = $el;
        break;
      }
    }

    if ($sidebar) walkSidebar($, $sidebar, pages, "", 0);

    if (pages.length === 0) {
      $("ul").each((_, ul) => {
        const links = $(ul).find('a[href*="/docs/"], a[href*="/reference/"]');
        if (links.length > 3 && pages.length === 0) {
          links.each((_, a) => addLink($, a, pages, "", 0));
        }
      });
    }

    if (pages.length === 0) {
      $('a[href*="/docs/"], a[href*="/reference/"]').each((_, a) =>
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

    const $ = cheerio.load(html);

    // Detect nav tabs
    const tabs: { name: string; path: string }[] = [];
    const seen = new Set<string>();

    $("header a, nav a, [class*='Header'] a, [class*='navbar'] a, [class*='Navbar'] a").each(
      (_, el) => {
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
    $("header a, nav a, [class*='Header'] a").each((_, el) => {
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
      $("a").each((_, a) => {
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

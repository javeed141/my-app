import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import type { AnyNode } from "domhandler";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

import {
  fetchPage,
  isUrlAllowed,
  SAVE_FILES,
  DOC_HREF_PATTERN,
  type ScrapeResult,
  type ScrapePageItem,
} from "./functions/types";
import { fetchSitemapUrls, parseSidebarLookups } from "./functions/parsers";
import {
  detectTabs,
  detectProjects,
  buildProjectSections,
  buildSitemapSections,
  buildNoSitemapSections,
} from "./functions/builders";

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

// ── Route Handler ──────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── Input validation ──
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

  let baseUrl: string;
  try {
    baseUrl = new URL(url).origin;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!isUrlAllowed(url)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    // ── Step 1: Fetch page HTML + sitemap in parallel ──
    const [html, sitemapGroups] = await Promise.all([
      fetchPage(url),
      fetchSitemapUrls(baseUrl),
    ]);

    if (!html) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });
    }

    // ── Step 2: Detect navigation type ──
    const $ = load(html);
    const tabs = detectTabs($, baseUrl);
    const projects = detectProjects($);

    const out: ScrapeResult = {
      site: new URL(url).hostname,
      navType: "simple",
      tabs: tabs.map((t) => t.name),
      sections: [],
    };

    // ── Step 3: Build sections based on navigation type ──
    if (projects.size > 0) {
      out.navType = "projects";
      out.sections = await buildProjectSections(projects, baseUrl, url, html);

    } else {
      out.navType = tabs.length > 0 ? "tabs" : "simple";
      const sidebarLookups = parseSidebarLookups(html);

      if (sitemapGroups.size > 0) {
        out.sections = await buildSitemapSections(
          sitemapGroups, sidebarLookups, tabs, baseUrl, url
        );
      } else {
        out.sections = await buildNoSitemapSections(
          sidebarLookups, tabs, baseUrl, html
        );
      }
    }

    // ── Step 4: Last resort — scan all <a> tags ──
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

    // ── Step 5: Save + respond ──
    saveResultToFile(out).catch(() => {});

    return NextResponse.json(out);
  } catch (e: unknown) {
    console.error("[scraper] Unhandled error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
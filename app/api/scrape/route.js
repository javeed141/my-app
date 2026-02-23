import { NextResponse } from "next/server";
import { load } from "cheerio";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

import {
  fetchPage,
  isUrlAllowed,
  extractVersionPrefix,
  SAVE_FILES,
  DOC_HREF_PATTERN,
  MAX_TITLE_LENGTH,
} from "./functions/types";
import { fetchSitemapUrls, parseSidebarLookups } from "./functions/parsers";
import {
  detectTabs,
  detectProjects,
  buildProjectSections,
  buildSitemapSections,
  buildNoSitemapSections,
} from "./functions/builders";

// ════════════════════════════════════════════════════════════
//  FILE SAVING (dev only, async, non-blocking)
//
//  Saves scrape results to /docs/{site}_{timestamp}.json
//  for local debugging. Only runs when NODE_ENV=development.
//  Fire-and-forget — never blocks the API response.
// ════════════════════════════════════════════════════════════

async function saveResultToFile(out) {
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

// ════════════════════════════════════════════════════════════
//  ROUTE HANDLER — POST /api/scrape
//
//  Entry point for the scraper API. Receives a URL, returns
//  a structured JSON response with all doc pages found.
//
//  EXECUTION FLOW:
//    1. Validate input URL + SSRF protection
//    2. Fetch page HTML + sitemap.xml in parallel
//    3. Detect navigation type (projects / tabs / simple)
//    4. Build sections using the appropriate strategy
//    5. Final fallback: scan all <a> tags on the page
//    6. Save result (dev only) + return JSON response
//
//  The outer try/catch ensures we always return a JSON error
//  instead of letting Next.js show a generic 500 page.
// ════════════════════════════════════════════════════════════

export async function POST(req) {
  // ── Input validation ──────────────────────────────────────
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  let baseUrl;
  let siteBase; // origin + version prefix (e.g. "https://docs.example.com/v3")
  try {
    const parsed = new URL(url);
    baseUrl = parsed.origin;
    const versionPrefix = extractVersionPrefix(parsed.pathname);
    siteBase = baseUrl + versionPrefix;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // SSRF protection — block requests to internal/private networks
  if (!isUrlAllowed(url)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    // ── Step 1: Fetch page HTML + sitemap in parallel ────────
    // Both requests run concurrently to minimize total wait time.
    // If either fails, we handle it gracefully (null check below).
    const [html, sitemapGroups] = await Promise.all([
      fetchPage(url),
      fetchSitemapUrls(baseUrl),
    ]);

    if (!html) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });
    }

    // ── Step 2: Detect navigation type ──────────────────────
    // Analyze the page's header/nav links to classify the site:
    //   - "projects" → multi-project site (/{project}/docs/)
    //   - "tabs"     → standard tabs (Guides, API Reference, etc.)
    //   - "simple"   → single-section, no visible tabs
    const $ = load(html);
    const tabs = detectTabs($, baseUrl);
    const projects = detectProjects($, baseUrl);

    const out = {
      site: new URL(url).hostname,
      navType: "simple",
      tabs: tabs.map((t) => t.name),
      sections: [],
    };

    // ── Step 3: Build sections based on navigation type ─────
    // Use siteBase (origin + version prefix) for constructing page URLs.
    // e.g. "https://docs.example.com/v3" instead of "https://docs.example.com"
    if (projects.size > 0) {
      // Multi-project site: fetch each project's docs + reference pages
      out.navType = "projects";
      out.sections = await buildProjectSections(projects, siteBase, url, html);

    } else {
      // Standard site: use sidebar + sitemap data
      out.navType = tabs.length > 0 ? "tabs" : "simple";
      const sidebarLookups = parseSidebarLookups(html);

      if (sitemapGroups.size > 0) {
        // Sitemap available: sidebar-first approach + sitemap supplements
        out.sections = await buildSitemapSections(
          sitemapGroups, sidebarLookups, tabs, siteBase, url
        );
      } else {
        // No sitemap: build from sidebar data + HTML scraping
        out.sections = await buildNoSitemapSections(
          sidebarLookups, tabs, siteBase, html
        );
      }
    }

    // ── Step 4: Last resort — scan all <a> tags on the page ─
    // If none of the above strategies found any pages, scan every
    // link on the page that matches a doc-like URL pattern.
    // This catches sites with unusual navigation structures.
    if (out.sections.length === 0) {
      out.navType = "fallback";
      const pages = [];
      const seenHrefs = new Set();

      $("a").each((_, a) => {
        const href = $(a).attr("href") || "";
        const title = $(a).text().trim();
        // Skip empty titles, overly long text (probably not a page title),
        // and duplicate hrefs (same link in header + footer)
        if (!title || title.length > MAX_TITLE_LENGTH || seenHrefs.has(href)) return;
        if (DOC_HREF_PATTERN.test(href)) {
          seenHrefs.add(href);
          pages.push({ title, path: href, fullUrl: siteBase + href, level: 0, group: "" });
        }
      });

      if (pages.length > 0) out.sections.push({ name: "all", pages });
    }

    // ── Step 5: Save (dev only) + respond ───────────────────
    // saveResultToFile is fire-and-forget: .catch(() => {}) means
    // a file write error never blocks or crashes the API response.
    saveResultToFile(out).catch(() => {});

    return NextResponse.json(out);
  } catch (e) {
    // Catch-all: ensures we always return a JSON error response
    // instead of letting Next.js show a generic 500 error page.
    console.error("[scraper] Unhandled error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

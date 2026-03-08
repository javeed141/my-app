/**
 * POST /api/scratch-fetch-store
 *
 * Test route — tests Step 1 (types.js) + Step 2 (detect.js) functions
 * with a real documentation URL.
 *
 * REQUEST BODY: { "url": "https://docs.lithic.com/docs" }
 * RESPONSE: JSON showing input/output of each step
 */

import { NextResponse } from "next/server";
import {
  validateAndParse,
  fetchPage,
  isUrlAllowed,
  slugToTitle,
  stripVersionPrefix,
  extractVersionPrefix,
  normalizePrefix,
} from "./functions/types";
import { detectSiteType } from "./functions/detect";
import { parseSidebarLookups } from "./functions/sidebar";
import { extractAllLinks } from "./functions/links";
import { fetchAllPages } from "./functions/fetcher";
import { savePages } from "./functions/writer";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url, fetchContent = false } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  const results = {};

  // ── Test 1: isUrlAllowed() ──────────────────────────────
  results["1_isUrlAllowed"] = {
    function: "isUrlAllowed(url)",
    input: url,
    output: isUrlAllowed(url),
    blocked_example: {
      input: "http://127.0.0.1/admin",
      output: isUrlAllowed("http://127.0.0.1/admin"),
    },
  };

  // ── Test 2: validateAndParse() ──────────────────────────
  try {
    const parsed = validateAndParse(url);
    results["2_validateAndParse"] = {
      function: "validateAndParse(url)",
      input: url,
      output: parsed,
    };
  } catch (err) {
    results["2_validateAndParse"] = {
      function: "validateAndParse(url)",
      input: url,
      error: err.message,
    };
  }

  // ── Test 3: Utility functions ───────────────────────────
  const pathname = new URL(url).pathname;
  results["3_utilities"] = {
    stripVersionPrefix: {
      input: pathname,
      output: stripVersionPrefix(pathname),
    },
    extractVersionPrefix: {
      input: pathname,
      output: extractVersionPrefix(pathname),
    },
    normalizePrefix: [
      { input: "refs", output: normalizePrefix("refs") },
      { input: "docs", output: normalizePrefix("docs") },
    ],
    slugToTitle: [
      { input: "get-all-users", output: slugToTitle("get-all-users") },
      { input: "api_status_check", output: slugToTitle("api_status_check") },
    ],
  };

  // ── Test 4: fetchPage() — actual network request ────────
  const fetchStart = Date.now();
  const html = await fetchPage(url);
  const fetchMs = Date.now() - fetchStart;

  results["4_fetchPage"] = {
    function: "fetchPage(url)",
    input: url,
    output: {
      success: html !== null,
      htmlLength: html ? html.length : 0,
      fetchTimeMs: fetchMs,
      first200Chars: html ? html.substring(0, 200) + "..." : null,
      containsSidebar: html ? html.includes("sidebar") || html.includes("Sidebar") : false,
      containsNextData: html ? html.includes("__NEXT_DATA__") : false,
      scriptTagCount: html ? (html.match(/<script/g) || []).length : 0,
    },
  };

  // ── Test 5: detectSiteType() — Step 2 ──────────────────
  if (html) {
    const parsed = new URL(url);
    const siteType = detectSiteType(html, parsed.origin, parsed.pathname);

    results["5_detectSiteType"] = {
      function: "detectSiteType(html, origin, pathname)",
      input: {
        origin: parsed.origin,
        pathname: parsed.pathname,
      },
      output: siteType,
    };
  }

  // ── Test 6: parseSidebarLookups() — Step 3 ─────────────
  if (html) {
    const sidebarLookups = parseSidebarLookups(html);

    // Convert Map<prefix, Map<slug, meta>> to JSON-friendly format
    const sidebarOutput = {};
    for (const [prefix, lookup] of sidebarLookups) {
      const pages = [];
      const sorted = [...lookup.entries()].sort((a, b) => a[1].order - b[1].order);
      for (const [slug, meta] of sorted) {
        pages.push({ slug, ...meta });
      }
      sidebarOutput[prefix] = {
        totalPages: pages.length,
        groups: [...new Set(pages.map((p) => p.group).filter(Boolean))],
        first5Pages: pages.slice(0, 5),
        last3Pages: pages.slice(-3),
      };
    }

    results["6_parseSidebarLookups"] = {
      function: "parseSidebarLookups(html)",
      strategy: sidebarLookups.size > 0 ? "JSON or DOM parsed" : "empty (will use HTML fallback)",
      prefixesFound: [...sidebarLookups.keys()],
      output: sidebarOutput,
    };
  }

  // ── Test 7: extractAllLinks() — Step 4 ─────────────────
  if (html) {
    const parsed = new URL(url);
    const siteType = results["5_detectSiteType"]?.output;

    if (siteType) {
      const linkStart = Date.now();
      const linkResult = await extractAllLinks(
        siteType,
        html,
        parsed.origin,
        url
      );
      const linkMs = Date.now() - linkStart;

      results["7_extractAllLinks"] = {
        fetchTimeMs: linkMs,
        totalPages: linkResult.totalPages,
        sidebarPrefixes: linkResult.sidebarPrefixes,
        sectionCount: linkResult.sections.length,
        sections: linkResult.sections,
      };

      // ── Step 5: fetchAllPages() — fetch {url}.md for every page ──
      // When fetchContent=false, skip markdown fetching — just store page names
      let fetchResult;
      if (fetchContent) {
        fetchResult = await fetchAllPages(linkResult.sections, {
          concurrency: 5,
          delayMs: 200,
        });

        results["8_fetchAllPages"] = {
          stats: fetchResult.stats,
          pages: fetchResult.pages.map((p) => ({
            section: p.section,
            title: p.title,
            slug: p.slug,
            fullUrl: p.fullUrl,
            mdUrl: p.mdUrl,
            group: p.group,
            status: p.status,
            error: p.error,
            fetchMs: p.fetchMs,
            mdLength: p.markdown ? p.markdown.length : 0,
          })),
        };
      } else {
        // Build a minimal fetchResult from linkResult (no markdown fetching)
        const allPages = [];
        for (const section of linkResult.sections) {
          for (const page of section.pages) {
            allPages.push({ ...page, section: section.name, markdown: null, status: "skipped" });
          }
        }
        fetchResult = {
          pages: allPages,
          stats: { total: allPages.length, ok: 0, errors: 0, skipped: allPages.length, totalFetchMs: 0 },
        };
        results["8_fetchAllPages"] = { skipped: true, reason: "fetchContent=false", stats: fetchResult.stats };
      }

      // ── Step 7: savePages() — save manifest JSON (+ .md files only if fetchContent) ──
      const hostname = new URL(url).hostname;
      const typeMap = { A: "tabs", B: "simple", C: "tabs", D: "projects" };
      const navType = typeMap[siteType.type] || "fallback";
      const tabNames = siteType.tabs?.map((t) => t.name) || [];

      const writeResult = await savePages(fetchResult, hostname, navType, tabNames, siteType.versions);

      results["9_savePages"] = {
        outputDir: writeResult.outputDir,
        manifestPath: writeResult.manifestFilename,
        fileCount: writeResult.fileCount,
        errors: writeResult.errors,
        sections: writeResult.sections,
      };
    }
  }

  return NextResponse.json(results, { status: 200 });
}

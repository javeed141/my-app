import { NextResponse } from "next/server";

// POST /api/compare
//
// Body: { sitemapUrl: string, scraperJson: ScrapeResult }
//
// What it does:
//   1. Fetches sitemap.xml from the given URL
//   2. Extracts all <loc> URLs
//   3. Checks which ones are missing from the scraper JSON
//   4. Returns { matched, missing, total }

export async function POST(req) {
  try {
    const { sitemapUrl, scraperJson } = await req.json();

    if (!sitemapUrl || !scraperJson) {
      return NextResponse.json(
        { error: "Both sitemapUrl and scraperJson are required" },
        { status: 400 }
      );
    }

    // ── Step 1: Fetch sitemap XML ──────────────────────────────

    const res = await fetch(sitemapUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/xml, text/xml, */*",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch sitemap: HTTP ${res.status}` },
        { status: 502 }
      );
    }

    const xml = await res.text();

    // ── Step 2: Parse all <loc> URLs from sitemap ──────────────

    const sitemapUrls = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      sitemapUrls.push(normalize(match[1]));
    }

    if (sitemapUrls.length === 0) {
      return NextResponse.json(
        { error: "No URLs found in sitemap" },
        { status: 400 }
      );
    }

    // ── Step 3: Collect all URLs from scraper JSON ─────────────

    const jsonUrls = new Set();

    for (const section of scraperJson.sections || []) {
      for (const page of section.pages || []) {
        jsonUrls.add(normalize(page.fullUrl));
      }
    }

    // ── Step 4: Compare ────────────────────────────────────────
    // Simple rule: in sitemap but not in JSON = missing = bug

    const matched = [];
    const missing = [];

    for (const url of sitemapUrls) {
      if (jsonUrls.has(url)) {
        matched.push(url);
      } else {
        missing.push(url);
      }
    }

    // ── Step 5: Return report ──────────────────────────────────

    return NextResponse.json({
      sitemapTotal: sitemapUrls.length,
      jsonTotal: jsonUrls.size,
      matchedCount: matched.length,
      missingCount: missing.length,
      missing,   // URLs in sitemap but NOT in JSON
      matched,   // URLs found in both
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Normalize URL for comparison:
// - Remove trailing slash
// - Lowercase
// - Remove query params and hash
function normalize(url) {
  try {
    const u = new URL(url.trim());
    return (u.origin + u.pathname).replace(/\/+$/, "").toLowerCase();
  } catch {
    return url.trim().replace(/\/+$/, "").toLowerCase();
  }
}

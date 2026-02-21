# route.ts — Line by Line Explanation

---

## Imports (Lines 1-6)

```typescript
import { NextRequest, NextResponse } from "next/server";
```
Next.js types for handling API requests and sending responses.

```typescript
import { load } from "cheerio";
```
Cheerio is an HTML parser. `load(html)` converts an HTML string into a jQuery-like object so we can search elements with CSS selectors like `$("a")`, `$("nav")`.

```typescript
import type { AnyNode } from "domhandler";
```
TypeScript type for any HTML node (div, a, span, etc.). Needed for type safety when looping through elements.

```typescript
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
```
File system functions — only used for saving debug output during development.

---

## Our Custom Imports (Lines 8-23)

```typescript
import {
  fetchPage,
  isUrlAllowed,
  SAVE_FILES,
  DOC_HREF_PATTERN,
  type ScrapeResult,
  type ScrapePageItem,
} from "./functions/types";
```
- `fetchPage` — fetches any URL, returns HTML string or null (has 10s timeout)
- `isUrlAllowed` — blocks localhost/private IPs (security)
- `SAVE_FILES` — true in development, false in production
- `DOC_HREF_PATTERN` — regex: `/^\/(docs|reference|refs|recipes|page|changelog)\/.+/`
- `ScrapeResult` — shape of our final JSON output
- `ScrapePageItem` — shape of one page entry

```typescript
import { fetchSitemapUrls, parseSidebarLookups } from "./functions/parsers";
```
- `fetchSitemapUrls` — fetches /sitemap.xml, returns URLs grouped by prefix
- `parseSidebarLookups` — parses sidebar from HTML (tries JSON first, then DOM)

```typescript
import {
  detectTabs,
  detectProjects,
  buildProjectSections,
  buildSitemapSections,
  buildNoSitemapSections,
} from "./functions/builders";
```
- `detectTabs` — scans nav links to find tabs like /docs, /reference
- `detectProjects` — checks for multi-project pattern like /android-sdk/docs
- `buildProjectSections` — handles multi-project sites
- `buildSitemapSections` — builds sections using sitemap + sidebar data
- `buildNoSitemapSections` — builds sections using only sidebar data

---

## saveResultToFile (Lines 27-38)

```typescript
async function saveResultToFile(out: ScrapeResult): Promise<void> {
  if (!SAVE_FILES) return;
```
If we're in production, do nothing. Only save files during development.

```typescript
  try {
    const docsDir = join(process.cwd(), "docs");
    if (!existsSync(docsDir)) await mkdir(docsDir, { recursive: true });
```
Create a `docs/` folder in the project root if it doesn't exist.

```typescript
    const safeName = out.site.replace(/[^a-zA-Z0-9.-]/g, "_");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
```
`docs.clover.com` → `docs.clover.com` (safe for filenames)
Timestamp like `2025-02-21T10-30-00-000Z` (colons replaced, can't use in filenames)

```typescript
    await writeFile(
      join(docsDir, `${safeName}_${timestamp}.json`),
      JSON.stringify(out, null, 2)
    );
```
Write the result as formatted JSON file: `docs/docs.clover.com_2025-02-21T10-30-00-000Z.json`

```typescript
  } catch (err) {
    console.warn("[scraper] Failed to save file:", err instanceof Error ? err.message : err);
  }
}
```
If file writing fails (read-only filesystem on Vercel), log warning and move on. Don't crash.

---

## POST Handler — Input Validation (Lines 42-68)

```typescript
export async function POST(req: NextRequest) {
```
Next.js API route. Handles POST requests to this endpoint.

```typescript
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
```
Parse the request body as JSON. If body is not valid JSON (e.g., plain text, empty), return 400.

```typescript
  const { url } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }
```
Extract `url` from body. If missing or not a string, return 400.

```typescript
  let baseUrl: string;
  try {
    baseUrl = new URL(url).origin;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }
```
Parse the URL to get the origin (e.g., `https://docs.clover.com/docs` → `https://docs.clover.com`).
If URL is malformed (no protocol, garbage text), return 400.

```typescript
  if (!isUrlAllowed(url)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }
```
SSRF protection. Blocks:
- `http://localhost/...`
- `http://127.0.0.1/...`
- `http://10.0.0.1/...` (private network)
- `http://192.168.1.1/...` (private network)
- Any non-http/https protocol

If blocked, return 403 Forbidden.

---

## Step 1: Fetch Page + Sitemap (Lines 70-78)

```typescript
  try {
    const [html, sitemapGroups] = await Promise.all([
      fetchPage(url),
      fetchSitemapUrls(baseUrl),
    ]);
```
**Two requests go out at the same time:**
- `fetchPage(url)` → fetches the actual page HTML
- `fetchSitemapUrls(baseUrl)` → fetches /sitemap.xml and groups URLs

`Promise.all` means: start both, wait until both finish. Saves time — instead of 2+2=4 seconds, it takes max(2,2)=2 seconds.

```typescript
    if (!html) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });
    }
```
If the main page didn't load (site is down, timeout, 404), return 502 Bad Gateway. No point continuing without the page.

Note: `sitemapGroups` can be empty — that's fine, we can work without sitemap.

---

## Step 2: Detect Navigation Type (Lines 80-92)

```typescript
    const $ = load(html);
```
Parse the HTML string into a Cheerio object. Now we can query it like jQuery: `$("a")`, `$("nav")`, etc.

```typescript
    const tabs = detectTabs($, baseUrl);
```
Scans `<header>` and `<nav>` links. Looks for known patterns:
- `/docs` → "Guides"
- `/reference` or `/refs` → "API Reference"
- `/changelog` → "Changelog"

Returns array like: `[{ name: "Guides", path: "/docs" }, { name: "API Reference", path: "/reference" }]`

```typescript
    const projects = detectProjects($);
```
Checks if links match `/<project-name>/docs` pattern (e.g., `/android-sdk/docs`).
Returns Set of project names, or empty Set for normal sites.

```typescript
    const out: ScrapeResult = {
      site: new URL(url).hostname,
      navType: "simple",
      tabs: tabs.map((t) => t.name),
      sections: [],
    };
```
Initialize the output object. `navType` starts as "simple", gets updated below.
`sections` starts empty, gets filled by the builders.

---

## Step 3: Build Sections (Lines 94-112)

```typescript
    if (projects.size > 0) {
      out.navType = "projects";
      out.sections = await buildProjectSections(projects, baseUrl, url, html);
```
**If multi-project site:** Fetch each project's docs and reference pages in parallel, parse their sidebars.

```typescript
    } else {
      out.navType = tabs.length > 0 ? "tabs" : "simple";
```
**If normal site:** Set navType based on whether tabs were found.
- Found `/docs` + `/reference` links → "tabs"
- Found nothing → "simple"

```typescript
      const sidebarLookups = parseSidebarLookups(html);
```
**Parse sidebar from current page.** This is the core:
1. Tries JSON in `<script>` tags first (best data)
2. Falls back to HTML `<nav>` DOM walking
3. Returns Map of prefix → Map of slug → metadata

Example result:
```
{
  "docs" → {
    "get-started" → { title: "Get Started", group: "Basics", order: 0 },
    "auth" → { title: "Authentication", group: "Basics", order: 1 }
  }
}
```

```typescript
      if (sitemapGroups.size > 0) {
        out.sections = await buildSitemapSections(
          sitemapGroups, sidebarLookups, tabs, baseUrl, url
        );
```
**Sitemap exists:** Use sitemap URLs as the page list, enrich each URL with sidebar metadata (titles, groups, order). For tabs missing sidebar data, fetches that tab's page.

```typescript
      } else {
        out.sections = await buildNoSitemapSections(
          sidebarLookups, tabs, baseUrl, html
        );
      }
```
**No sitemap:** Build pages purely from sidebar data. For uncovered tabs, fetch each tab's page and parse its sidebar.

---

## Step 4: Last Resort (Lines 115-128)

```typescript
    if (out.sections.length === 0) {
```
If EVERYTHING above produced zero sections — no sidebar, no sitemap, nothing — try one last thing.

```typescript
      out.navType = "fallback";
      const pages: ScrapePageItem[] = [];
      const seenHrefs = new Set<string>();
```
Mark as fallback. Create empty pages array. `seenHrefs` prevents duplicate links.

```typescript
      $("a").each((_: number, a: AnyNode) => {
```
Loop through EVERY `<a>` tag on the entire page.

```typescript
        const href = $(a).attr("href") || "";
        const title = $(a).text().trim();
```
Get each link's URL and visible text.

```typescript
        if (!title || title.length > 100 || seenHrefs.has(href)) return;
```
Skip if: no text, text too long (probably not a real title), or already seen this URL.

```typescript
        if (DOC_HREF_PATTERN.test(href)) {
```
Only keep links that match `/docs/...`, `/reference/...`, `/refs/...`, etc. Skip external links, anchors, and unrelated paths.

```typescript
          seenHrefs.add(href);
          pages.push({ title, path: href, fullUrl: baseUrl + href, level: 0, group: "" });
        }
      });

      if (pages.length > 0) out.sections.push({ name: "all", pages });
    }
```
Add matching links to pages. If we found any, create one big section called "all".
No groups, no ordering, no hierarchy — just a flat list. Better than nothing.

---

## Step 5: Save + Respond (Lines 130-141)

```typescript
    saveResultToFile(out).catch(() => {});
```
Save result to JSON file for debugging. `catch(() => {})` means: if saving fails, ignore it silently. This is **fire-and-forget** — the response doesn't wait for the file to be written.

```typescript
    return NextResponse.json(out);
```
Return the final result as JSON to the client. This is what the frontend receives.

```typescript
  } catch (e: unknown) {
    console.error("[scraper] Unhandled error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```
If anything unexpected crashes (shouldn't happen normally), log the full error and return 500 Internal Server Error. This is the safety net — prevents the API from returning a raw Node.js crash page.

---

## Summary: What Each Line Achieves

```
Lines 1-23:    Import tools and our custom functions
Lines 27-38:   Debug file saving (dev only)
Lines 42-52:   Parse and validate request body
Lines 54-60:   Parse URL, extract base origin
Lines 62-64:   Block private/internal URLs (security)
Lines 70-73:   Fetch page HTML + sitemap at the same time
Lines 75-77:   If page didn't load, stop with 502
Lines 80-81:   Parse HTML, detect tabs
Lines 82-83:   Detect multi-project pattern
Lines 85-91:   Initialize output object
Lines 94-96:   Multi-project → fetch each project's pages
Lines 98-100:  Normal site → set tab/simple type
Lines 101:     Parse sidebar from current page (JSON → HTML → nothing)
Lines 103-106: Sitemap exists → use sitemap + sidebar
Lines 107-110: No sitemap → use sidebar only
Lines 115-128: Everything failed → scan all links as last resort
Lines 131:     Save debug file (non-blocking)
Lines 133:     Return JSON response
Lines 134-140: Catch unexpected crashes → return 500
```

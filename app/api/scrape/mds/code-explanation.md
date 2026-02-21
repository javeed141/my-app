# Documentation Site Scraper — Complete Code Explanation

## What Does This Project Do?

This is a **documentation website scraper**. You give it a URL (like `https://docs.stripe.com`), and it figures out the entire structure of that documentation site — all the pages, their titles, which section they belong to (Guides, API Reference, Changelog, etc.), and how they're organized.

It's built as a **Next.js API route** (a backend endpoint) with helper modules.

---

## File Overview (Read In This Order)

| # | File | Role |
|---|------|------|
| 1 | `types.ts` | **Foundation** — All types, constants, config, and utility functions |
| 2 | `parsers.ts` | **Data Extraction** — Reads sitemaps, sidebars (JSON & DOM) to find pages |
| 3 | `builders.ts` | **Section Assembly** — Combines parsed data into organized sections |
| 4 | `route.ts` | **Entry Point** — The API endpoint that orchestrates everything |

---

## File 1: `types.ts` — The Foundation

This file has no logic of its own. It provides everything the other files need.

### Config Constants

```ts
export const SAVE_FILES = process.env.NODE_ENV === "development";
```
Only save scraped results to disk when running locally (for debugging).

```ts
export const FETCH_TIMEOUT_MS = 10_000;
```
If a page doesn't respond in 10 seconds, give up.

```ts
export const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB
```
Reject responses bigger than 5MB to prevent memory issues.

```ts
export const FETCH_HEADERS = { ... };
```
Pretend to be a normal browser so sites don't block the scraper.

### Types (Data Shapes)

```ts
export interface ScrapePageItem {
  title: string;    // "Authentication"
  path: string;     // "/docs/authentication"
  fullUrl: string;  // "https://example.com/docs/authentication"
  level: number;    // 0 = top level, 1 = nested, 2 = deeply nested
  group: string;    // "Getting Started" (sidebar category)
}
```
This is what ONE documentation page looks like in the output.

```ts
export interface ScrapeResult {
  site: string;           // "docs.stripe.com"
  navType: string;        // How the site organizes navigation
  tabs: string[];         // ["Guides", "API Reference"]
  sections: {             // The actual page listings
    name: string;
    pages: ScrapePageItem[];
  }[];
}
```
This is the **final output** — the complete structure of the documentation site.

```ts
export interface SidebarJsonPage {
  title?: string;
  slug?: string;
  uri?: string;
  children?: SidebarJsonPage[];
  pages?: SidebarJsonPage[];
}
```
Many React/Next.js doc sites embed sidebar data as JSON inside `<script>` tags. This is the shape of that JSON.

```ts
export interface PageMeta {
  title: string;   // Human-readable title
  level: number;   // Nesting depth
  group: string;   // Category name
  order: number;   // Position in the sidebar (0, 1, 2...)
}
```
Metadata about a page extracted from the sidebar.

### Constants — Pattern Matching

```ts
export const PREFIX_TO_SECTION: Record<string, string> = {
  docs: "Guides",
  reference: "API Reference",
  refs: "API Reference",
  changelog: "Changelog",
  ...
};
```
Maps URL path prefixes to human-friendly section names. So `/docs/anything` → "Guides", `/reference/anything` → "API Reference".

```ts
export const PREFIX_ALIASES: Record<string, string> = {
  refs: "reference",
};
```
Some sites use `/refs/` instead of `/reference/`. This normalizes them.

```ts
export const SIDEBAR_SELECTORS = [
  "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar", ...
];
```
CSS selectors to find the sidebar element on a page. It tries multiple selectors because every site structures its HTML differently. (e.g., ReadMe.io uses `.rm-Sidebar`, others use `aside nav`, etc.)

```ts
export const NAV_SELECTORS = "header a, nav a, ...";
```
CSS selectors to find navigation links (tabs like "Guides", "API Reference") in the page header.

```ts
export const TAB_PATTERNS: [RegExp, string][] = [
  [/^\/?docs\/?$/, "Guides"],
  [/^\/?reference\/?$/, "API Reference"],
  ...
];
```
When a header link's `href` matches one of these patterns, it's recognized as a navigation tab.

```ts
export const DOC_PATH_PATTERN = /\/(docs|reference|refs|...)\//;
```
Regex to identify if a URL looks like a documentation page.

### SSRF Protection

```ts
const BLOCKED_HOSTS = /^(localhost|127\.|10\.|...)/i;

export function isUrlAllowed(urlStr: string): boolean { ... }
```
**Security check.** Prevents the scraper from being tricked into fetching internal/private network addresses (Server-Side Request Forgery attack). Blocks `localhost`, `127.0.0.1`, `10.x.x.x`, `192.168.x.x`, etc.

### Utility Functions

```ts
export function normalizePrefix(prefix: string): string {
  return PREFIX_ALIASES[prefix] || prefix;
}
```
Converts `"refs"` → `"reference"`. Everything else stays the same.

```ts
export function slugToTitle(slug: string): string {
  return slug.replace(/[-_]/g, " ")
             .replace(/\b\w/g, (c) => c.toUpperCase())
             .trim();
}
```
Converts URL slugs to readable titles: `"getting-started"` → `"Getting Started"`.

```ts
export function extractBalancedJson(text: string, start: number): string | null { ... }
```
Extracts a complete `{...}` JSON object from a string by counting braces. Simple regex would break on nested objects like `{"a": {"b": 1}}`, so this counts `{` and `}` properly, respecting strings and escape characters.

```ts
export function findNestedKey(obj: unknown, key: string, depth: number): unknown { ... }
```
Recursively searches an object tree for a specific key, up to 5 levels deep. Used to find `"sidebars"` inside deeply nested `__NEXT_DATA__` objects.

### Fetch Function

```ts
export async function fetchPage(url: string): Promise<string | null> { ... }
```
Fetches a URL with:
- **Timeout** (10s abort controller)
- **Size limit** (rejects >5MB responses)
- **Error handling** (returns `null` on failure instead of crashing)

---

## File 2: `parsers.ts` — Data Extraction

This file has **four parsers**, each a different strategy to extract page listings from a site.

### Parser 1: `fetchSitemapUrls()` — Sitemap Parser

```
Input:  baseUrl (e.g. "https://docs.stripe.com")
Output: Map<prefix, urls[]>
        e.g. { "docs" → [url1, url2], "reference" → [url3, url4] }
```

**What it does:**
1. Fetches `{baseUrl}/sitemap.xml`
2. Parses the XML to find all `<url><loc>` entries
3. Groups URLs by their first path segment (`/docs/...` → "docs", `/reference/...` → "reference")
4. Deduplicates URLs within each group
5. Skips URLs with fewer than 2 path segments (like just `/`)
6. Skips the "discuss" prefix entirely

**Why it matters:** The sitemap is the most reliable source of *what pages exist*, but it has NO information about titles, ordering, or grouping.

### Parser 2: `parseSidebarJson()` — JSON Sidebar Parser

```
Input:  HTML string of a page
Output: Map<prefix, Map<slug, PageMeta>>
```

**What it does:**
1. Finds all `<script>` tags containing "sidebar" text
2. **Method A:** Uses regex to find `"sidebars": {` or `sidebars = {`, then uses `extractBalancedJson()` to grab the full JSON object
3. **Method B:** Looks inside `<script id="__NEXT_DATA__">` (Next.js) or `<script type="application/json">` and deep-searches for a `"sidebars"` key
4. Calls `processSidebars()` which calls `walkJsonSidebar()` to recursively walk the sidebar tree

**`walkJsonSidebar()`** recursively processes nodes:
- Extracts `title` and `slug` from each node
- Strips path prefixes from slugs (e.g., `/docs/auth` → `auth`)
- Records the `group` name (category heading), `depth` (nesting level), and `order` (position counter)
- Recurses into `children` or `pages` arrays

**Why it matters:** JSON sidebar data has the *correct titles, grouping, and ordering*. This is the gold standard for metadata.

### Parser 3: `parseDomSidebar()` — DOM Sidebar Parser

```
Input:  HTML string
Output: Map<prefix, Map<slug, PageMeta>>  (same shape as JSON parser)
```

**Fallback when JSON isn't available.** Walks the actual rendered HTML:

1. `findSidebarElement()` tries each CSS selector from `SIDEBAR_SELECTORS` until it finds one with >3 links
2. `walkDom()` recursively processes child elements:
   - **Headings** (`<h1>`–`<h6>`) or elements with classes like `sidebar-heading`, `category` → treated as **group names**
   - **Links** (`<a>`) → extracts `href` and text as a page entry
   - **Containers** (`<ul>`, `<div>`, `<nav>`, etc.) → recurses deeper, incrementing depth for `<ul>`/`<ol>`

### Parser 4: `parseHtmlFallback()` — Last Resort Link Scraper

```
Input:  HTML string, baseUrl
Output: ScrapePageItem[]  (flat list, no metadata maps)
```

**Used when both sidebar parsers fail:**

1. Tries to find the sidebar element and walk it for `<a>` links
2. If that gives nothing, scans the ENTIRE page for links matching doc patterns (`/docs/`, `/reference/`, etc.)
3. Deduplicates by path

### Combined Entry Point

```ts
export function parseSidebarLookups(html: string) {
  const lookups = parseSidebarJson(html);    // Try JSON first
  if (lookups.size > 0) return lookups;
  return parseDomSidebar(html);              // Fall back to DOM
}
```

---

## File 3: `builders.ts` — Section Assembly

This file takes the raw data from parsers and assembles it into the final `sections[]` array. There are **three builders** for three different types of documentation sites.

### `detectTabs()` — Find Navigation Tabs

Scans header/nav links for known patterns (`/docs`, `/reference`, `/changelog`). Returns an array like:
```json
[{ "name": "Guides", "path": "/docs" }, { "name": "API Reference", "path": "/reference" }]
```

### `detectProjects()` — Find Multi-Project Sites

Some sites host multiple products (e.g., `example.com/product-a/docs`, `example.com/product-b/docs`). This detects that pattern by looking for links matching `/{project}/(docs|reference)`.

### Builder 1: `buildProjectSections()` — Multi-Project Sites

For sites with multiple projects. For each project, fetches both `/project/docs` and `/project/reference`, parses them with `parseHtmlFallback()`, and creates sections named like `"product-a/Guides"`.

### Builder 2: `buildSitemapSections()` — Sidebar + Sitemap (Main Strategy)

This is the **primary and most important builder**. It combines sidebar metadata with sitemap URLs.

**The key insight (documented in the comments):**

> **OLD approach (broken):** Loop sitemap URLs → try to match each to sidebar → sort alphabetically. Problem: slug mismatches → ugly auto-generated titles.
>
> **NEW approach (fixed):** Sidebar pages FIRST (correct order + titles), then append sitemap-only extras at the end.

**Step-by-step:**

1. **Determine which prefixes to process** — from detected tabs, or from the current URL's first path segment
2. **Pre-fetch tab pages in parallel** — if we don't have sidebar data for a prefix, fetch that tab's page to get its sidebar
3. **For each prefix, build the page list:**
   - **Step 1 (Sidebar):** Iterate sidebar entries in their original order. These have correct titles, groups, and ordering.
   - **Step 2 (Sitemap extras):** Append any sitemap URLs that weren't in the sidebar. These are "hidden" or unlisted pages. They get auto-generated titles via `slugToTitle()`.
4. **Name each section** using `PREFIX_TO_SECTION` mapping

### Builder 3: `buildNoSitemapSections()` — No Sitemap Available

When the site has no `sitemap.xml`:

1. Build sections from sidebar data (if available)
2. If sidebar gave nothing, try `parseHtmlFallback()` on the current page
3. Fetch any uncovered tabs in parallel and parse them too

---

## File 4: `route.ts` — The Entry Point (API Route)

This is a **Next.js API route** (`POST /api/scrape` or similar). It orchestrates everything.

### Request Flow

```
Client sends POST { url: "https://docs.example.com/docs" }
                          │
                          ▼
              ┌─── Input Validation ───┐
              │  - Valid JSON?          │
              │  - URL present?         │
              │  - URL format ok?       │
              │  - SSRF check passed?   │
              └──────────┬─────────────┘
                         │
                         ▼
         ┌─── Step 1: Parallel Fetch ───┐
         │  fetchPage(url)       ───────►  HTML
         │  fetchSitemapUrls(base) ─────►  Sitemap groups
         └──────────┬───────────────────┘
                    │
                    ▼
         ┌─── Step 2: Detect Nav Type ──┐
         │  detectTabs($)    → tabs[]   │
         │  detectProjects($) → Set     │
         └──────────┬───────────────────┘
                    │
                    ▼
         ┌─── Step 3: Build Sections ───┐
         │                              │
         │  projects found?             │
         │    → buildProjectSections()  │
         │                              │
         │  sitemap found?              │
         │    → buildSitemapSections()  │
         │                              │
         │  neither?                    │
         │    → buildNoSitemapSections()│
         └──────────┬───────────────────┘
                    │
                    ▼
         ┌─── Step 4: Last Resort ──────┐
         │  Still no sections?          │
         │  → Scan ALL <a> tags on page │
         └──────────┬───────────────────┘
                    │
                    ▼
         ┌─── Step 5: Respond ──────────┐
         │  Save to file (dev only)     │
         │  Return JSON response        │
         └──────────────────────────────┘
```

### Step-by-Step Code Walkthrough

**Input Validation:**
```ts
const { url } = body;
// Checks: is it a string? Can we parse it? Does isUrlAllowed() pass?
```

**Step 1 — Parallel Fetch:**
```ts
const [html, sitemapGroups] = await Promise.all([
  fetchPage(url),           // Get the page HTML
  fetchSitemapUrls(baseUrl), // Get sitemap.xml data
]);
```
Both fetches run simultaneously for speed.

**Step 2 — Detect Navigation:**
```ts
const tabs = detectTabs($, baseUrl);     // e.g. [{name:"Guides", path:"/docs"}]
const projects = detectProjects($);      // e.g. Set {"product-a", "product-b"}
```

**Step 3 — Build Sections (branching logic):**

| Condition | navType | Builder Used |
|-----------|---------|-------------|
| Multiple projects detected | `"projects"` | `buildProjectSections()` |
| Tabs detected + sitemap exists | `"tabs"` | `buildSitemapSections()` |
| No tabs + sitemap exists | `"simple"` | `buildSitemapSections()` |
| No sitemap at all | `"tabs"` or `"simple"` | `buildNoSitemapSections()` |

**Step 4 — Fallback:**
If all builders returned empty, scan every `<a>` tag on the page for doc-like links.

**Step 5 — Respond:**
```ts
saveResultToFile(out).catch(() => {});  // Fire-and-forget (don't wait)
return NextResponse.json(out);          // Send result to client
```

---

## Data Flow Summary

```
                    URL Input
                       │
            ┌──────────┼──────────┐
            ▼          ▼          ▼
        sitemap.xml   HTML     HTML
            │          │          │
            ▼          ▼          ▼
      URL Grouping   Sidebar   Tab/Project
      by prefix      Parsing   Detection
            │          │          │
            └──────┬───┘          │
                   ▼              │
              Section Builder ◄───┘
                   │
                   ▼
            Final JSON Output
            {
              site, navType, tabs,
              sections: [
                { name: "Guides", pages: [...] },
                { name: "API Reference", pages: [...] }
              ]
            }
```

## Priority / Fallback Chain

The scraper uses a **cascading fallback strategy** — it tries the best method first, then falls back to less reliable ones:

1. **JSON Sidebar** (best) — exact titles, correct order, proper grouping
2. **DOM Sidebar** (good) — titles from rendered HTML, reasonable order
3. **Sitemap** (supplement) — knows what pages exist, but no titles/order
4. **HTML Link Scraping** (fallback) — scans for any doc-like links
5. **Full Page `<a>` Scan** (last resort) — grabs anything that looks like a doc link

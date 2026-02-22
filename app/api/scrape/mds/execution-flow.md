# Scraper Execution Flow

## Complete function call chain from URL input to JSON output

---

## STEP 0: User enters URL on frontend
**File:** `app/fetch/page.tsx`
**Function:** `handleScrapeClick()`
**What it does:** Takes the URL from the input field, sends POST to `/api/scrape`
```
User types: https://docs.datafiniti.co/docs
        │
        ▼
fetch("/api/scrape", { method: "POST", body: { url: "https://docs.datafiniti.co/docs" } })
        │
        ▼
```

---

## STEP 1: API route receives the request
**File:** `app/api/scrape/route.ts`
**Function:** `POST(req)`
**What it does:** Entry point. Validates URL, orchestrates everything.

```
POST(req)
  │
  ├── 1a. req.json()                          → extracts { url } from request body
  │
  ├── 1b. new URL(url).origin                 → creates baseUrl
  │        "https://docs.datafiniti.co/docs"
  │         ───────────────────────────
  │         baseUrl = "https://docs.datafiniti.co"
  │
  ├── 1c. isUrlAllowed(url)                   → SSRF check (blocks localhost, private IPs)
  │        File: functions/types.ts:188
  │
  ▼
```

---

## STEP 2: Fetch page HTML + sitemap in parallel
**File:** `app/api/scrape/route.ts` (lines 98-101)
**Functions called:** `fetchPage()` + `fetchSitemapUrls()`

```
Promise.all([
  │
  ├── fetchPage(url)                          → fetches the actual page HTML
  │    File: functions/types.ts:297
  │    What: GET https://docs.datafiniti.co/docs
  │    Returns: full HTML string (or null on failure)
  │    Safety: 10s timeout, 5MB size limit, AbortController
  │
  ├── fetchSitemapUrls(baseUrl)               → fetches and parses sitemap.xml
  │    File: functions/parsers.ts:35
  │    What: GET https://docs.datafiniti.co/sitemap.xml
  │    │
  │    ├── fetchPage(baseUrl + "/sitemap.xml") → reuses same fetch function
  │    │    File: functions/types.ts:297
  │    │
  │    ├── load(xml, { xml: true })            → parses XML with Cheerio
  │    │
  │    └── Groups URLs by first path segment:
  │         Map {
  │           "docs"      => ["https://docs.datafiniti.co/docs/api-introduction", ...],
  │           "reference" => ["https://docs.datafiniti.co/reference/businesses", ...],
  │           "changelog" => ["https://docs.datafiniti.co/changelog/202602-...", ...]
  │         }
  │
])
  │
  ▼
```

---

## STEP 3: Parse HTML and detect navigation type
**File:** `app/api/scrape/route.ts` (lines 112-114)
**Functions called:** `load()`, `detectTabs()`, `detectProjects()`

```
const $ = load(html)                          → parses HTML into Cheerio DOM
  │
  ├── detectTabs($, baseUrl)                  → finds tab links in <header>/<nav>
  │    File: functions/builders.ts:35
  │    What: scans all nav links, matches against TAB_PATTERNS
  │    │
  │    │    TAB_PATTERNS (from types.ts:151):
  │    │      /docs/      → "Guides"
  │    │      /reference/  → "API Reference"
  │    │      /changelog/  → "Changelog"
  │    │      /recipes/    → "Recipes"
  │    │
  │    Returns: [{ name: "Guides", path: "/docs" },
  │              { name: "API Reference", path: "/reference" },
  │              { name: "Changelog", path: "/changelog" }]
  │
  ├── detectProjects($, baseUrl)              → checks for multi-project pattern
  │    File: functions/builders.ts:68
  │    What: looks for /{project}/docs/ patterns in nav links
  │    Returns: Set {} (empty for datafiniti — not a multi-project site)
  │
  ▼
  Decision: which path to take?
  │
  ├── projects.size > 0?        → NO  (skip buildProjectSections)
  ├── tabs.length > 0?          → YES → navType = "tabs"
  │
  ▼
```

---

## STEP 4: Parse sidebar data from current page HTML
**File:** `app/api/scrape/route.ts` (line 132)
**Function called:** `parseSidebarLookups(html)`

```
parseSidebarLookups(html)
  │  File: functions/parsers.ts:351
  │  What: tries JSON first, falls back to DOM
  │
  ├── parseSidebarJson(html)                  → TRY JSON SIDEBAR FIRST
  │    File: functions/parsers.ts:169
  │    │
  │    ├── load(html)                          → parse HTML with Cheerio
  │    │
  │    ├── Find <script> tags containing "sidebar"
  │    │   (skip scripts < 100 chars — those are analytics)
  │    │
  │    ├── METHOD A: Regex search for "sidebars": { in scripts
  │    │    │
  │    │    ├── extractBalancedJson(script, braceStart)
  │    │    │    File: functions/types.ts:229
  │    │    │    What: counts { and } char-by-char to find matching close brace
  │    │    │    Safety: skips scripts > 500KB
  │    │    │    Returns: '{"docs":[...],"reference":[...]}' (JSON string)
  │    │    │
  │    │    ├── JSON.parse(jsonStr)             → parse the extracted JSON
  │    │    │
  │    │    ├── processSidebars(sidebars, result)
  │    │    │    File: functions/parsers.ts:140
  │    │    │    What: loops through each section ("docs", "reference")
  │    │    │    │
  │    │    │    └── walkJsonSidebar(nodes, lookup, group, depth, counter)
  │    │    │         File: functions/parsers.ts:92
  │    │    │         What: recursively walks JSON tree, extracts:
  │    │    │           - title (real page name)
  │    │    │           - slug (URL slug)
  │    │    │           - group (category heading)
  │    │    │           - level (nesting depth)
  │    │    │           - order (counter.n++ for sidebar display order)
  │    │    │         Handles children/pages arrays recursively
  │    │    │
  │    │    └── result.size > 0? → return result (STOP, skip Method B)
  │    │
  │    └── METHOD B: (only if Method A found nothing)
  │         │
  │         ├── Find <script id="__NEXT_DATA__"> or <script type="application/json">
  │         │
  │         ├── JSON.parse(scriptText)
  │         │
  │         ├── findNestedKey(data, "sidebars", 0)
  │         │    File: functions/types.ts:269
  │         │    What: recursively searches JSON object for "sidebars" key
  │         │    Max depth: 5 levels
  │         │
  │         └── processSidebars() → walkJsonSidebar()  (same as Method A)
  │
  │    Returns: Map {
  │      "docs"      => Map { "api-introduction" => { title: "Introduction", level: 0, group: "Datafiniti API", order: 0 }, ... },
  │      "reference" => Map { "businesses" => { title: "Businesses", level: 0, group: "", order: 1 }, ... }
  │    }
  │
  ├── (if JSON returned data, skip DOM parsing)
  │
  └── parseDomSidebar(html)                   → FALLBACK: only if JSON found nothing
       File: functions/parsers.ts:276
       │
       ├── findSidebarElement($)
       │    File: functions/parsers.ts:252
       │    What: tries CSS selectors in order:
       │      nav.rm-Sidebar → .rm-Sidebar → #hub-sidebar → aside nav → aside
       │    Returns: first element with > 3 links
       │
       └── walkDom($sidebar, "", 0)
            File: functions/parsers.ts:285
            What: recursively walks HTML DOM tree
            - <a> tags → extract title + href
            - <h1>-<h6> or .sidebar-heading → extract group name
            - <ul>/<ol> → increase nesting depth
            Safety: MAX_DOM_WALK_DEPTH = 50
  │
  ▼
```

---

## STEP 5: Build sections (tabs path — most common)
**File:** `app/api/scrape/route.ts` (lines 134-144)
**Decision:** sitemapGroups.size > 0?

```
  ├── YES: sitemapGroups has data
  │    │
  │    └── buildSitemapSections(sitemapGroups, sidebarLookups, tabs, baseUrl, url)
  │         File: functions/builders.ts:167
  │         │
  │         ├── Determine allowed prefixes from tabs:
  │         │   ["docs", "reference", "changelog", "recipes"]
  │         │
  │         ├── Pre-fetch tab pages that need sidebar data (in parallel):
  │         │   For each prefix without sidebar data:
  │         │    │
  │         │    └── fetchPage(baseUrl + "/" + prefix)
  │         │         File: functions/types.ts:297
  │         │         e.g. GET https://docs.datafiniti.co/reference
  │         │              GET https://docs.datafiniti.co/changelog
  │         │
  │         ├── Parse sidebar from fetched tab pages:
  │         │    │
  │         │    └── parseSidebarLookups(tabHtml)    → same flow as STEP 4
  │         │         File: functions/parsers.ts:351
  │         │
  │         ├── For EACH prefix (docs, reference, changelog...):
  │         │    │
  │         │    ├── PART 1: Sidebar pages FIRST (correct order)
  │         │    │   Sort by order → build pages array:
  │         │    │   {
  │         │    │     title: meta.title,           ← real title from sidebar
  │         │    │     path: "/docs/api-introduction",
  │         │    │     fullUrl: baseUrl + path,
  │         │    │     level: meta.level,
  │         │    │     group: meta.group
  │         │    │   }
  │         │    │
  │         │    └── PART 2: Append sitemap-only pages at end
  │         │        For each sitemap URL not already in sidebar:
  │         │        │
  │         │        └── slugToTitle(slug)           → fallback title
  │         │             File: functions/types.ts:210
  │         │             "api-introduction" → "Api Introduction"
  │         │
  │         └── Returns: [
  │              { name: "Guides", pages: [...] },
  │              { name: "API Reference", pages: [...] },
  │              { name: "Changelog", pages: [...] }
  │            ]
  │
  │
  └── NO: no sitemap found
       │
       └── buildNoSitemapSections(sidebarLookups, tabs, baseUrl, html)
            File: functions/builders.ts:332
            │
            ├── Build from sidebar data (if available)
            │   Sort entries by order → build pages
            │
            ├── If no sidebar either:
            │    │
            │    └── parseHtmlFallback(html, baseUrl)
            │         File: functions/parsers.ts:416
            │         │
            │         ├── findSidebarElement($)      → try to find sidebar DOM
            │         │    └── walkSidebarHtml()      → walk it for links
            │         │
            │         └── If nothing:
            │              Scan ALL <a> tags matching /docs/, /reference/, etc.
            │
            └── Fetch uncovered tabs in parallel:
                 For each tab not yet processed:
                  │
                  ├── fetchPage(baseUrl + tab.path)
                  └── parseHtmlFallback(tabHtml, baseUrl)
  │
  ▼
```

---

## STEP 6: Last resort fallback (only if ZERO pages found)
**File:** `app/api/scrape/route.ts` (lines 151-168)

```
  out.sections.length === 0?
  │
  └── YES: scan every <a> tag on the page
       │
       ├── $("a").each(...)
       │   For each link:
       │     - Skip empty titles
       │     - Skip titles > 100 chars (not a page title)
       │     - Skip duplicate hrefs
       │     - Must match DOC_HREF_PATTERN: /^\/(docs|reference|refs|...)\/.+/
       │
       └── If found pages → push as section "all", navType = "fallback"
  │
  ▼
```

---

## STEP 7: Save + respond
**File:** `app/api/scrape/route.ts` (lines 174-176)

```
  ├── saveResultToFile(out)                   → saves to /docs/{site}_{timestamp}.json
  │    File: app/api/scrape/route.ts:34
  │    Only runs in development (NODE_ENV=development)
  │    Fire-and-forget (.catch(() => {}))
  │
  └── NextResponse.json(out)                  → returns final JSON to frontend
       │
       ▼
```

---

## STEP 8: Frontend receives response
**File:** `app/fetch/page.tsx`
**Function:** `handleScrapeClick()` (continued)

```
  const data = await res.json()
  │
  ├── localStorage.setItem("scrape_result", JSON.stringify(data))
  │
  └── router.push("/results")                → navigates to results page
       │
       ▼
  app/results/page.tsx reads from localStorage and renders the sidebar tree
```

---

## SUMMARY: All functions in execution order

```
 #  | File              | Function                  | Purpose
----+-------------------+---------------------------+--------------------------------
 1  | fetch/page.tsx    | handleScrapeClick()       | Send URL to API
 2  | route.ts          | POST(req)                 | Entry point, validate URL
 3  | types.ts          | isUrlAllowed()            | Block private IPs (SSRF)
 4  | types.ts          | fetchPage(url)            | Fetch page HTML (10s timeout)
 5  | parsers.ts        | fetchSitemapUrls()        | Fetch + parse sitemap.xml
 6  | types.ts          | fetchPage(baseUrl+sitemap)| Fetch sitemap (reuses #4)
 7  | route.ts          | load(html)                | Parse HTML with Cheerio
 8  | builders.ts       | detectTabs()              | Find tab links in nav
 9  | builders.ts       | detectProjects()          | Check for multi-project pattern
10  | parsers.ts        | parseSidebarLookups()     | Main sidebar parser (entry)
11  | parsers.ts        | parseSidebarJson()        | Try JSON sidebar first
12  | types.ts          | extractBalancedJson()     | Extract {...} with brace counting
13  | parsers.ts        | processSidebars()         | Process top-level sidebar object
14  | parsers.ts        | walkJsonSidebar()         | Recursively walk JSON tree
15  | types.ts          | findNestedKey()           | Search __NEXT_DATA__ (if needed)
16  | parsers.ts        | parseDomSidebar()         | DOM fallback (if no JSON)
17  | parsers.ts        | findSidebarElement()      | Find sidebar element by CSS
18  | parsers.ts        | walkDom()                 | Walk DOM tree recursively
19  | builders.ts       | buildSitemapSections()    | Build sections (sitemap path)
    |        OR         |                           |
    | builders.ts       | buildNoSitemapSections()  | Build sections (no sitemap)
    |        OR         |                           |
    | builders.ts       | buildProjectSections()    | Build sections (multi-project)
20  | parsers.ts        | parseHtmlFallback()       | Last resort link scanner
21  | parsers.ts        | walkSidebarHtml()         | Walk sidebar HTML for links
22  | types.ts          | slugToTitle()             | "get-users" → "Get Users"
23  | route.ts          | saveResultToFile()        | Save JSON to /docs/ (dev only)
24  | route.ts          | NextResponse.json(out)    | Return response to frontend
25  | fetch/page.tsx    | localStorage.setItem()    | Store result, navigate to /results
```

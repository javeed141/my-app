# types.ts — Line by Line Explanation

---

## Config

```typescript
export const SAVE_FILES = process.env.NODE_ENV === "development";
```
Only save debug JSON files when running locally (`npm run dev`). On Vercel/production, this is `false` — no files saved.

```typescript
export const FETCH_TIMEOUT_MS = 10_000;
```
10 seconds. If any page takes longer than this to respond, cancel the request and move on. The `_` is just for readability — `10_000` = `10000`.

```typescript
export const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB
```
If a page says it's bigger than 5MB, skip it. Normal doc pages are 200-500KB. 5MB means something is wrong — probably a file download, not an HTML page.

```typescript
export const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};
```
We pretend to be a Chrome browser. Some sites block requests that don't have a `User-Agent` header — they think it's a bot (which it is, but we need the HTML).

---

## Types

```typescript
export interface ScrapePageItem {
  title: string;      // "Get Started"
  path: string;       // "/docs/get-started"
  fullUrl: string;    // "https://docs.clover.com/docs/get-started"
  level: number;      // 0 = top level, 1 = nested under something
  group: string;      // "Basics" — which sidebar category it belongs to
}
```
One page in the output. This is what each entry in `sections.pages[]` looks like.

```typescript
export interface ScrapeResult {
  site: string;       // "docs.clover.com"
  navType: "projects" | "tabs" | "simple" | "fallback";
  tabs: string[];     // ["Guides", "API Reference"]
  sections: { name: string; pages: ScrapePageItem[] }[];
}
```
The final JSON response shape. `sections` is an array — one entry per tab.

```typescript
export interface SidebarJsonPage {
  title?: string;             // "Get Started"
  slug?: string;              // "get-started"
  uri?: string;               // some sites use uri instead of slug
  children?: SidebarJsonPage[];  // nested pages
  pages?: SidebarJsonPage[];     // some sites use pages instead of children
}
```
Shape of ReadMe's sidebar JSON. Every field is optional (`?`) because different ReadMe versions use different field names. Some sites have `slug`, some have `uri`. Some have `children`, some have `pages`. We check all of them.

```typescript
export interface PageMeta {
  title: string;    // "Get Started"
  level: number;    // 0
  group: string;    // "Basics"
  order: number;    // 0 — position in sidebar (0 = first, 1 = second, ...)
}
```
Intermediate type. When we parse a sidebar, we store metadata in a Map: `slug → PageMeta`. Later we use this to enrich sitemap URLs with correct titles and groups.

---

## Constants

```typescript
export const PREFIX_TO_SECTION: Record<string, string> = {
  docs: "Guides",
  reference: "API Reference",
  refs: "API Reference",
  changelog: "Changelog",
  recipes: "Recipes",
  discuss: "Discussions",
  page: "Pages",
};
```
Maps URL prefix to human-readable section name. When we see `/docs/...` URLs, that section is called "Guides". When we see `/reference/...`, it's "API Reference". Note `refs` and `reference` both map to "API Reference" — ReadMe uses both.

```typescript
export const PREFIX_ALIASES: Record<string, string> = {
  refs: "reference",
};
```
Some sites use `/refs/` in their URLs, others use `/reference/`. They're the same thing. This tells the code: treat `refs` as `reference` everywhere.

```typescript
export const SIDEBAR_SELECTORS = [
  "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
  "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
  "[class*='Sidebar']", "[class*='sidebar']", "aside nav", "aside",
];
```
CSS selectors to find the sidebar element in HTML. We try them in order — most specific first (`nav.rm-Sidebar` is ReadMe's exact class name), most generic last (`aside`). We stop at the first one that has more than 3 links inside it.

```typescript
export const NAV_SELECTORS = [
  "header a", "nav a", "[class*='Header'] a", ...
].join(", ");
```
CSS selectors for finding navigation links (tabs). Joined with commas so Cheerio searches all of them at once: `$("header a, nav a, [class*='Header'] a, ...")`.

```typescript
export const TAB_PATTERNS: [RegExp, string][] = [
  [/^\/?docs\/?$/, "Guides"],
  [/^\/?reference\/?$/, "API Reference"],
  [/^\/?refs\/?$/, "API Reference"],
  [/^\/?changelog\/?$/, "Changelog"],
  [/^\/?recipes\/?$/, "Recipes"],
  [/^\/?discuss\/?$/, "Discussions"],
];
```
When we find a nav link, we test its `href` against these patterns. `/docs` or `/docs/` → this is a "Guides" tab. `/reference` → "API Reference" tab. The `?` in the regex means that character is optional — so both `/docs` and `/docs/` match.

```typescript
export const DOC_PATH_PATTERN = /\/(docs|reference|refs|recipes|page|changelog)\//;
```
Matches any URL **containing** `/docs/`, `/reference/`, etc. Used to filter links — only keep documentation links, skip external links and anchors.

```typescript
export const DOC_HREF_PATTERN = /^\/(docs|reference|refs|recipes|page|changelog)\/.+/;
```
Stricter. Must **start with** `/docs/`, `/reference/`, etc. AND have something after it. `/docs/` alone doesn't match — needs `/docs/something`. Used in the last-resort fallback.

```typescript
export const SLUG_STRIP_PATTERN = /^\/?(docs|reference|refs|recipes|changelog)\//;
```
Used to strip the prefix from a slug. `docs/get-started` → `get-started`. The `\/?` handles both `/docs/get-started` and `docs/get-started`.

---

## SSRF Protection

```typescript
const BLOCKED_HOSTS = /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|0\.0\.0\.0|::1|\[::1\])/i;
```
Regex matching private/internal hostnames. Covers:
- `localhost`
- `127.x.x.x` (loopback)
- `10.x.x.x` (private network)
- `172.16-31.x.x` (private network)
- `192.168.x.x` (home network)
- `::1` (IPv6 loopback)

```typescript
export function isUrlAllowed(urlStr: string): boolean {
  try {
    const u = new URL(urlStr);
    if (!["http:", "https:"].includes(u.protocol)) return false;
    if (BLOCKED_HOSTS.test(u.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}
```
Three checks:
1. Can the URL be parsed? If not → blocked
2. Is the protocol `http` or `https`? If `ftp://` or `file://` → blocked
3. Is the hostname private/internal? → blocked

Without this, someone could send `{ "url": "http://127.0.0.1:3000/admin" }` and our server would fetch its own internal pages and return the content. That's called SSRF (Server-Side Request Forgery).

---

## Utility Functions

```typescript
export function normalizePrefix(prefix: string): string {
  return PREFIX_ALIASES[prefix] || prefix;
}
```
`"refs"` → `"reference"`. Anything else passes through unchanged. `"docs"` → `"docs"`.

```typescript
export function slugToTitle(slug: string): string {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}
```
Converts URL slug to readable title when sidebar data is unavailable:
- `"get-started"` → `"Get Started"`
- `"oauth_2_pkce_flow"` → `"Oauth 2 Pkce Flow"`

Not perfect — but better than showing raw slugs.

---

## extractBalancedJson

```typescript
export function extractBalancedJson(text: string, start: number): string | null {
```
This solves a specific problem. ReadMe embeds JSON like:

```
"sidebars": { "docs": [{ "title": "Basics", "pages": [{ ... }] }] }
```

A simple regex like `/"sidebars": (\{.*?\})/` would stop at the FIRST `}` — which is inside a nested object, not the end. So you'd get broken JSON.

This function counts braces manually:

```typescript
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
```
Walk character by character.

```typescript
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
```
Handle escaped characters like `\"` inside strings — don't count a `"` after a backslash.

```typescript
    if (ch === '"' && !escape) { inString = !inString; continue; }
```
Track whether we're inside a string. Braces inside strings like `"value: {not real}"` should be ignored.

```typescript
    if (!inString) {
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) return text.substring(start, i + 1);
      }
    }
```
Outside strings: `{` adds 1, `}` subtracts 1. When depth hits 0, we've found the matching closing brace. Return everything between.

**Example walkthrough:**

```
Text: { "a": { "b": 1 }, "c": 2 }

Position 0:  {   → depth 0→1
Position 7:  {   → depth 1→2
Position 15: }   → depth 2→1  (not 0, so keep going)
Position 17: ,   → skip
Position 25: }   → depth 1→0  ← MATCH! Return everything from 0 to 25
```

---

## findNestedKey

```typescript
export function findNestedKey(obj: unknown, key: string, depth: number): unknown {
  if (depth > 5 || !obj || typeof obj !== "object") return null;
  const record = obj as Record<string, unknown>;
  if (key in record) return record[key];
  for (const val of Object.values(record)) {
    const found = findNestedKey(val, key, depth + 1);
    if (found) return found;
  }
  return null;
}
```
Searches for a key inside deeply nested objects. ReadMe's `__NEXT_DATA__` might bury `sidebars` 3-4 levels deep:

```
{ props: { pageProps: { data: { sidebars: { ... } } } } }
```

This recursively digs through up to 5 levels until it finds `"sidebars"`. The depth limit prevents infinite loops on circular structures.

---

## fetchPage

```typescript
export async function fetchPage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
```
Create a cancellation mechanism. After 10 seconds, `controller.abort()` fires → kills the fetch.

```typescript
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });
```
Fetch the URL. `redirect: "follow"` means if the site sends a 301/302 redirect, follow it automatically. `signal` connects the AbortController so the fetch can be cancelled.

```typescript
    if (!res.ok) {
      console.warn(`[scraper] HTTP ${res.status} for ${url}`);
      return null;
    }
```
`res.ok` means status 200-299. If 404, 500, 403, etc. → log it, return null.

```typescript
    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_BYTES) {
      console.warn(`[scraper] Response too large (${contentLength} bytes) for ${url}`);
      return null;
    }
```
If the server tells us the response is bigger than 5MB before we download it, skip it. Saves bandwidth and memory.

```typescript
    return await res.text();
```
Download the body as a string and return it. This is the HTML.

```typescript
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn(`[scraper] Timeout after ${FETCH_TIMEOUT_MS}ms for ${url}`);
    } else {
      console.warn(`[scraper] Fetch failed for ${url}:`, err instanceof Error ? err.message : err);
    }
    return null;
```
Two types of failures:
- **AbortError** → our 10s timer fired, request was cancelled
- **Any other error** → DNS failure, connection refused, SSL error, etc.

Both log a warning and return null. The calling code checks for null and skips.

```typescript
  } finally {
    clearTimeout(timer);
  }
```
`finally` runs whether fetch succeeded or failed. We clear the timer so it doesn't fire after the fetch already completed. Without this, if the fetch finishes in 2 seconds, the timer would still be running for 8 more seconds doing nothing — a small memory leak.

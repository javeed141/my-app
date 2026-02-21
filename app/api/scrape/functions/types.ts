// ── Config ─────────────────────────────────────────────────

export const SAVE_FILES = process.env.NODE_ENV === "development";
export const FETCH_TIMEOUT_MS = 10_000;
export const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB

export const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// ── Safety Thresholds ──────────────────────────────────────
//
// These named constants replace "magic numbers" scattered across the codebase.
// Each one has a specific reason for its value — explained in the comment above it.
// If you need to tune the scraper's behavior, change these values here
// instead of hunting through individual functions.

/** Scripts shorter than this (in characters) are unlikely to contain sidebar JSON.
 *  Skips tiny inline scripts like analytics/tracking tags (e.g. Google Analytics).
 *  ReadMe sidebar JSON scripts are typically 10KB–50KB. */
export const MIN_SCRIPT_LENGTH = 100;

/** A sidebar element must contain at least this many <a> links to be considered valid.
 *  Prevents false positives: a <nav> with only 2 links is probably the header nav,
 *  not the docs sidebar. Real sidebars have 10–200+ links. */
export const MIN_SIDEBAR_LINKS = 3;

/** Group heading text longer than this is probably page content, not a real heading.
 *  Sidebar group names are short strings like "Getting Started", "Authentication".
 *  If the extracted text is 80+ chars, it's likely a paragraph that got misdetected. */
export const MAX_GROUP_HEADING_LENGTH = 80;

/** In the final fallback <a> scan, skip links with text longer than this.
 *  Real page titles are short: "Get Users", "Authentication Overview".
 *  If an <a> tag wraps a whole paragraph of text, it's not a page title. */
export const MAX_TITLE_LENGTH = 100;

/** Maximum recursion depth for findNestedKey() when searching __NEXT_DATA__.
 *  ReadMe embeds sidebar data 2–3 levels deep in the Next.js page props.
 *  5 levels covers all known cases without risking infinite recursion
 *  on circular or very deeply nested JSON structures. */
export const MAX_NESTED_SEARCH_DEPTH = 5;

/** Maximum script text length (in characters) for extractBalancedJson() to scan.
 *
 *  WHY THIS EXISTS:
 *  extractBalancedJson() loops through the script text character-by-character.
 *  Heavy SPAs (React/Angular apps) can have 2MB+ of minified JS in a single
 *  <script> tag. Scanning 2 million characters char-by-char freezes the event
 *  loop for several seconds → serverless function timeout → request fails.
 *
 *  ReadMe sidebar JSON scripts are typically 10KB–50KB, so 500KB is generous.
 *  Any script larger than this definitely isn't sidebar data. */
export const MAX_SCRIPT_SCAN_LENGTH = 500_000;

/** Maximum recursion depth for walkDom() and walkSidebarHtml().
 *
 *  WHY THIS EXISTS:
 *  These functions recursively walk the DOM tree: <ul> → <li> → <div> → <ul> → ...
 *  Normal sidebars are 3–5 levels deep. But malformed or adversarial HTML could
 *  create hundreds of nested levels. Without a depth limit, this causes a
 *  stack overflow crash (Node.js call stack ~10K frames, each recursion uses ~5).
 *
 *  50 is far more than any real sidebar needs, but catches pathological cases. */
export const MAX_DOM_WALK_DEPTH = 50;

// ── Types ──────────────────────────────────────────────────

/** A single page in the scraper's output. */
export interface ScrapePageItem {
  title: string;   // Page title (from sidebar JSON, DOM text, or slugToTitle fallback)
  path: string;    // Relative URL path, e.g. "/reference/get-users"
  fullUrl: string; // Absolute URL, e.g. "https://docs.example.com/reference/get-users"
  level: number;   // Nesting depth in sidebar (0 = top-level, 1 = child, etc.)
  group: string;   // Sidebar group heading, e.g. "Authentication" (empty if none)
}

/** The complete scraper response returned to the frontend. */
export interface ScrapeResult {
  site: string;
  navType: "projects" | "tabs" | "simple" | "fallback";
  tabs: string[];
  sections: { name: string; pages: ScrapePageItem[] }[];
}

/** Shape of a single page node in ReadMe's sidebar JSON.
 *  The JSON tree looks like: { title, slug, children: [{ title, slug, ... }] }
 *  Some sites use "pages" instead of "children" — we handle both. */
export interface SidebarJsonPage {
  title?: string;
  slug?: string;
  uri?: string;
  children?: SidebarJsonPage[];
  pages?: SidebarJsonPage[];
}

/** Metadata extracted from the sidebar for a single page.
 *  Stored in a Map<slug, PageMeta> lookup table.
 *  "order" preserves the sidebar's display order (assigned sequentially). */
export interface PageMeta {
  title: string;
  level: number;
  group: string;
  order: number;
}

// ── Constants ──────────────────────────────────────────────

/** Maps URL path prefix → human-readable section name.
 *  e.g. URLs starting with /reference/ get grouped under "API Reference".
 *  Used when building the final output sections. */
export const PREFIX_TO_SECTION: Record<string, string> = {
  docs: "Guides",
  reference: "API Reference",
  refs: "API Reference",
  changelog: "Changelog",
  recipes: "Recipes",
  discuss: "Discussions",
  page: "Pages",
};

/** Some ReadMe sites use /refs/ instead of /reference/ for the same content.
 *  This maps alternate prefixes to their canonical form
 *  so we don't accidentally create duplicate sections for the same content. */
export const PREFIX_ALIASES: Record<string, string> = {
  refs: "reference",
};

/** CSS selectors to find the sidebar element, ordered from most specific to least.
 *  Starts with ReadMe-specific classes (rm-Sidebar), then falls back to generic patterns.
 *  The first match that has enough links (> MIN_SIDEBAR_LINKS) wins. */
export const SIDEBAR_SELECTORS = [
  "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
  "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
  "[class*='Sidebar']", "[class*='sidebar']", "aside nav", "aside",
];

/** Combined CSS selector for navigation/header links.
 *  Used by detectTabs() to find top-level tabs like "Guides", "API Reference".
 *  Joined into one string because Cheerio's .each() is called once with it. */
export const NAV_SELECTORS = [
  "header a", "nav a", "[class*='Header'] a", "[class*='navbar'] a",
  "[class*='Navbar'] a", "[class*='MobileFlyout'] a", "[class*='Flyout'] a",
  "[class*='NavItem'] a", ".rm-Header-bottom a",
].join(", ");

/** Regex patterns to classify navigation links as known tab types.
 *  e.g. href="/docs" or href="/docs/" → tab named "Guides".
 *  Used by detectTabs() to figure out what sections the site has. */
export const TAB_PATTERNS: [RegExp, string][] = [
  [/^\/?docs\/?$/, "Guides"],
  [/^\/?reference\/?$/, "API Reference"],
  [/^\/?refs\/?$/, "API Reference"],
  [/^\/?changelog\/?$/, "Changelog"],
  [/^\/?recipes\/?$/, "Recipes"],
  [/^\/?discuss\/?$/, "Discussions"],
];

/** Matches any href containing a doc-like path segment.
 *  Used by parseHtmlFallback() to find doc links anywhere on the page.
 *  Matches both "/foo/docs/bar" and "/docs/bar". */
export const DOC_PATH_PATTERN = /\/(docs|reference|refs|recipes|page|changelog)\//;

/** Matches hrefs that START with a doc-like path — stricter than DOC_PATH_PATTERN.
 *  Used in route.ts final fallback to avoid matching external links
 *  that happen to contain "/docs/" in the middle. */
export const DOC_HREF_PATTERN = /^\/(docs|reference|refs|recipes|page|changelog)\/.+/;

/** Strips the leading prefix from a slug path.
 *  e.g. "/reference/get-users" → "get-users"
 *  Used when the sidebar JSON includes the full path but we only want the slug. */
export const SLUG_STRIP_PATTERN = /^\/?(docs|reference|refs|recipes|changelog)\//;

// ── SSRF Protection ────────────────────────────────────────

/** Regex that matches internal/private network hostnames and IP ranges.
 *
 *  WHY THIS EXISTS:
 *  Server-Side Request Forgery (SSRF) is when an attacker passes a URL like
 *  http://127.0.0.1/admin or http://192.168.1.1/secret to make our server
 *  fetch internal resources it shouldn't access. This regex blocks:
 *    - localhost, 127.x.x.x (loopback)
 *    - 10.x.x.x, 172.16-31.x.x, 192.168.x.x (private networks)
 *    - 0.0.0.0, ::1 (special addresses) */
const BLOCKED_HOSTS = /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|0\.0\.0\.0|::1|\[::1\])/i;

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

// ── Utility Functions ──────────────────────────────────────

/** Converts alternate prefixes to their canonical form.
 *  e.g. "refs" → "reference" so we don't create duplicate sections. */
export function normalizePrefix(prefix: string): string {
  return PREFIX_ALIASES[prefix] || prefix;
}

/** Converts a URL slug to a human-readable title.
 *  e.g. "get-all-users" → "Get All Users"
 *  Used as fallback when we have no sidebar metadata for a page. */
export function slugToTitle(slug: string): string {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}

/**
 * Extract a balanced JSON object {...} from text starting at position `start`.
 *
 * WHY NOT REGEX:
 *   A regex like /"sidebars"\s*:\s*\{.*?\}/ stops at the FIRST closing brace,
 *   which breaks on nested objects like {"a": {"b": 1}}. This function counts
 *   opening/closing braces to find where the object actually ends.
 *
 * CRASH GUARD (MAX_SCRIPT_SCAN_LENGTH):
 *   This function loops character-by-character through the text. Heavy SPAs
 *   can have 2MB+ of minified JavaScript in a single <script> tag. Scanning
 *   all of that would freeze the Node.js event loop for seconds, causing a
 *   serverless timeout. We bail out early if the text is too large — ReadMe
 *   sidebar JSON scripts are typically 10KB–50KB, so 500KB is very generous.
 */
export function extractBalancedJson(text: string, start: number): string | null {
  if (text[start] !== "{") return null;

  // CRASH GUARD: Skip huge scripts that would freeze the event loop.
  // See MAX_SCRIPT_SCAN_LENGTH constant definition for full explanation.
  if (text.length > MAX_SCRIPT_SCAN_LENGTH) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"' && !escape) { inString = !inString; continue; }
    if (!inString) {
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) return text.substring(start, i + 1);
      }
    }
  }
  return null;
}

/**
 * Recursively search an object for a key (max MAX_NESTED_SEARCH_DEPTH levels).
 *
 * WHY THIS EXISTS:
 *   ReadMe uses Next.js, which serializes all page data into a <script id="__NEXT_DATA__">
 *   JSON blob. The sidebar data is buried somewhere inside at varying depths depending
 *   on the site. Instead of hardcoding the exact path (which differs between sites),
 *   we search recursively until we find the "sidebars" key.
 *
 * DEPTH LIMIT:
 *   Prevents stack overflow on deeply nested or circular-ish JSON structures.
 *   5 levels covers all known ReadMe sites (sidebar is typically 2–3 levels deep).
 */
export function findNestedKey(obj: unknown, key: string, depth: number): unknown {
  if (depth > MAX_NESTED_SEARCH_DEPTH || !obj || typeof obj !== "object") return null;
  const record = obj as Record<string, unknown>;
  if (key in record) return record[key];
  for (const val of Object.values(record)) {
    const found = findNestedKey(val, key, depth + 1);
    if (found) return found;
  }
  return null;
}

// ── Fetch with timeout + size limit ────────────────────────

/**
 * Fetches a URL with timeout and response size protection.
 *
 * TIMEOUT (AbortController):
 *   Cancels the request after FETCH_TIMEOUT_MS (10 seconds).
 *   Without this, a hanging/slow site would block until the serverless function
 *   times out (typically 60s on Vercel) — wasting the user's time.
 *
 * SIZE LIMIT (Content-Length check):
 *   Rejects responses larger than MAX_RESPONSE_BYTES (5MB).
 *   Normal doc pages are 200–500KB. A 50MB response would use excessive memory.
 *
 * RETURNS null on any failure instead of throwing, so callers can gracefully
 * skip failed pages without try/catch at every call site.
 */
export async function fetchPage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) {
      console.warn(`[scraper] HTTP ${res.status} for ${url}`);
      return null;
    }

    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_BYTES) {
      console.warn(`[scraper] Response too large (${contentLength} bytes) for ${url}`);
      return null;
    }

    return await res.text();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn(`[scraper] Timeout after ${FETCH_TIMEOUT_MS}ms for ${url}`);
    } else {
      console.warn(`[scraper] Fetch failed for ${url}:`, err instanceof Error ? err.message : err);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}
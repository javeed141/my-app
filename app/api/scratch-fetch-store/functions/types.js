// ═══════════════════════════════════════════════════════════
//  STEP 1 — types.js (Foundation Layer)
//
//  This file is the BASE of the entire scraper module.
//  Every other file imports from here. It provides:
//
//    1. Config constants (timeouts, limits, headers)
//    2. Safety thresholds (magic numbers with explanations)
//    3. URL patterns & selectors (sidebar, tabs, docs)
//    4. SSRF protection (blocks internal/private networks)
//    5. Utility functions (slug→title, prefix normalization)
//    6. validateAndParse() — URL parsing + version detection
//    7. fetchPage() — HTTP fetch with timeout + size guard
//
//  NOTHING in this file makes network requests except fetchPage().
//  Everything else is pure functions and constants.
// ═══════════════════════════════════════════════════════════

// ── 1. Config ─────────────────────────────────────────────

export const FETCH_TIMEOUT_MS = 10_000;
export const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5 MB
export const SAVE_FILES = process.env.NODE_ENV === "development";

export const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// ── 2. Safety Thresholds ──────────────────────────────────
//
//  Named constants replace magic numbers. Each one has a reason.
//  Change these here instead of hunting through functions.

/** Scripts shorter than this are unlikely to contain sidebar JSON.
 *  Skips tiny inline scripts like analytics tags.
 *  ReadMe sidebar JSON scripts are typically 10KB–50KB. */
export const MIN_SCRIPT_LENGTH = 100;

/** A sidebar element must have at least this many <a> links.
 *  Prevents false positives: <nav> with 2 links = header, not sidebar. */
export const MIN_SIDEBAR_LINKS = 3;

/** Group heading text longer than this is page content, not a heading.
 *  Real group names: "Getting Started", "Authentication" (short). */
export const MAX_GROUP_HEADING_LENGTH = 80;

/** In fallback <a> scan, skip links with text longer than this.
 *  Real titles: "Get Users", "Authentication Overview" (short). */
export const MAX_TITLE_LENGTH = 100;

/** Max recursion depth for findNestedKey() in __NEXT_DATA__.
 *  ReadMe sidebar data is 2–3 levels deep. 5 covers all known cases. */
export const MAX_NESTED_SEARCH_DEPTH = 5;

/** Max script text length for extractBalancedJson() to scan.
 *  Prevents freezing on 2MB+ minified JS bundles.
 *  ReadMe sidebar scripts are 10–50KB, so 500KB is generous. */
export const MAX_SCRIPT_SCAN_LENGTH = 500_000;

/** Max recursion depth for DOM walking functions.
 *  Normal sidebars: 3–5 levels. 50 catches pathological HTML. */
export const MAX_DOM_WALK_DEPTH = 50;

// ── 3. URL Patterns & Selectors ───────────────────────────

/** Maps URL path prefix → human-readable section name. */
export const PREFIX_TO_SECTION = {
  docs: "Guides",
  reference: "API Reference",
  refs: "API Reference",
  changelog: "Changelog",
  recipes: "Recipes",
  discuss: "Discussions",
  page: "Pages",
};

/** Alternate prefixes → canonical form.
 *  "refs" and "reference" are the same content. */
export const PREFIX_ALIASES = {
  refs: "reference",
};

/** CSS selectors to find sidebar, ordered most specific → least.
 *  First match with enough links (> MIN_SIDEBAR_LINKS) wins. */
export const SIDEBAR_SELECTORS = [
  "nav.rm-Sidebar",
  ".rm-Sidebar",
  "#hub-sidebar",
  "[class*='Sidebar'] nav",
  "[class*='sidebar'] nav",
  "[class*='Sidebar']",
  "[class*='sidebar']",
  "aside nav",
  "aside",
];

/** CSS selectors for navigation/header links.
 *  Used by detectTabs() to find top-level tabs. */
export const NAV_SELECTORS = [
  "header a",
  "nav a",
  "[class*='Header'] a",
  "[class*='navbar'] a",
  "[class*='Navbar'] a",
  "[class*='MobileFlyout'] a",
  "[class*='Flyout'] a",
  "[class*='NavItem'] a",
  ".rm-Header-bottom a",
].join(", ");

/** Matches versioned URL prefixes: /v3/, /v4/, /v1.0/ */
export const VERSION_PREFIX_PATTERN = /^\/v\d+(\.\d+)*/;

/** Matches branch-name prefixes used by ReadMe: /main/, /ent/, etc.
 *  These behave like version prefixes but aren't numeric.
 *  ReadMe uses them for branches: /main/docs, /ent/docs.
 *  Only stripped when followed by a known doc segment. */
export const BRANCH_PREFIX_PATTERN = /^\/(main|ent|stable|latest|current|next)(?=\/(docs|reference|refs|recipes|page|changelog|discuss))/;

/** Matches hrefs containing a doc-like path segment. */
export const DOC_PATH_PATTERN =
  /\/(docs|reference|refs|recipes|page|changelog)\//;

/** Stricter: matches hrefs STARTING with a doc-like path.
 *  Supports optional version prefix. */
export const DOC_HREF_PATTERN =
  /^\/(v\d+(\.\d+)*\/)?(docs|reference|refs|recipes|page|changelog)\/.+/;

/** Strips leading prefix from a slug path.
 *  "/reference/get-users" → "get-users" */
export const SLUG_STRIP_PATTERN =
  /^\/?(v\d+(\.\d+)*\/)?(docs|reference|refs|recipes|changelog)\//;

/** Regex patterns to classify nav links as known tab types. */
export const TAB_PATTERNS = [
  [/^\/?docs\/?$/, "Guides"],
  [/^\/?reference\/?$/, "API Reference"],
  [/^\/?refs\/?$/, "API Reference"],
  [/^\/?changelog\/?$/, "Changelog"],
  [/^\/?recipes\/?$/, "Recipes"],
  [/^\/?discuss\/?$/, "Discussions"],
];

// ── 4. SSRF Protection ───────────────────────────────────
//
//  Blocks requests to internal/private networks.
//  Without this, an attacker could pass http://127.0.0.1/admin
//  and make our server fetch internal resources.

const BLOCKED_HOSTS =
  /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|0\.0\.0\.0|::1|\[::1\])/i;

/**
 * Checks if a URL is safe to fetch.
 *
 * INPUT:  urlStr (string) — full URL like "https://docs.example.com"
 * OUTPUT: boolean — true if safe, false if blocked
 *
 * BLOCKS:
 *   - Non-HTTP protocols (file://, ftp://)
 *   - localhost, 127.x.x.x, 10.x.x.x, 172.16-31.x.x, 192.168.x.x
 *   - 0.0.0.0, ::1
 */
export function isUrlAllowed(urlStr) {
  try {
    const u = new URL(urlStr);
    if (!["http:", "https:"].includes(u.protocol)) return false;
    if (BLOCKED_HOSTS.test(u.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

// ── 5. Utility Functions ──────────────────────────────────

/** Strips a leading version or branch prefix from a path.
 *  INPUT:  "/v3/docs/get-started"  → "/docs/get-started"
 *  INPUT:  "/main/docs/about"      → "/docs/about" */
export function stripVersionPrefix(path) {
  return path.replace(VERSION_PREFIX_PATTERN, "").replace(BRANCH_PREFIX_PATTERN, "");
}

/** Extracts the version or branch prefix from a URL path.
 *  INPUT:  "/v3/docs/get-started"     →  "/v3"
 *  INPUT:  "/main/docs/about-readme"  →  "/main"
 *  INPUT:  "/docs/get-started"        →  "" */
export function extractVersionPrefix(path) {
  const v = path.match(VERSION_PREFIX_PATTERN);
  if (v) return v[0];
  const b = path.match(BRANCH_PREFIX_PATTERN);
  if (b) return b[0];
  return "";
}

/** Converts alternate prefixes to canonical form.
 *  INPUT:  "refs"  →  "reference"
 *  INPUT:  "docs"  →  "docs" (unchanged) */
export function normalizePrefix(prefix) {
  return PREFIX_ALIASES[prefix] || prefix;
}

/** Converts a URL slug to a human-readable title.
 *  INPUT:  "get-all-users"
 *  OUTPUT: "Get All Users" */
export function slugToTitle(slug) {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** Extracts a balanced JSON object {...} from text starting at `start`.
 *
 *  WHY NOT REGEX: /"sidebars"\s*:\s*\{.*?\}/ stops at FIRST closing brace,
 *  breaks on nested objects. This counts braces to find the real end.
 *
 *  INPUT:  text (string), start (number) — position of opening {
 *  OUTPUT: string (the JSON substring) or null */
export function extractBalancedJson(text, start) {
  if (text[start] !== "{") return null;
  if (text.length > MAX_SCRIPT_SCAN_LENGTH) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (ch === '"' && !escape) {
      inString = !inString;
      continue;
    }
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

/** Recursively searches an object for a key (max depth limited).
 *
 *  WHY: ReadMe buries sidebar data at varying depths inside __NEXT_DATA__.
 *  Instead of hardcoding the path, we search recursively.
 *
 *  INPUT:  obj (any), key (string), depth (number)
 *  OUTPUT: the value at that key, or null */
export function findNestedKey(obj, key, depth) {
  if (depth > MAX_NESTED_SEARCH_DEPTH || !obj || typeof obj !== "object")
    return null;
  if (key in obj) return obj[key];
  for (const val of Object.values(obj)) {
    const found = findNestedKey(val, key, depth + 1);
    if (found) return found;
  }
  return null;
}

// ── 6. validateAndParse() ─────────────────────────────────
//
//  The FIRST function called in the pipeline.
//  Parses the input URL into components the rest of the module needs.

/**
 * Parses and validates a documentation URL.
 *
 * INPUT:  url (string) — e.g. "https://docs.lithic.com/v3/docs/getting-started"
 *
 * OUTPUT: {
 *   origin:        "https://docs.lithic.com",
 *   hostname:      "docs.lithic.com",
 *   pathname:      "/v3/docs/getting-started",
 *   versionPrefix: "/v3"          ← empty string if no version
 * }
 *
 * THROWS: Error if URL is invalid or SSRF-blocked
 */
export function validateAndParse(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }

  if (!isUrlAllowed(url)) {
    throw new Error(`URL blocked by SSRF protection: ${url}`);
  }

  const versionPrefix = extractVersionPrefix(parsed.pathname);

  return {
    origin: parsed.origin,
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    versionPrefix,
  };
}

// ── 7. fetchPage() ────────────────────────────────────────
//
//  The ONLY function in this file that makes network requests.
//  Every other file calls this instead of fetch() directly.

/**
 * Fetches a URL with timeout and response size protection.
 *
 * INPUT:  url (string) — full URL to fetch
 *
 * OUTPUT: string (HTML text) or null (on any failure)
 *
 * NEVER THROWS — returns null on failure so callers can
 * gracefully skip failed pages without try/catch everywhere.
 *
 * PROTECTIONS:
 *   - AbortController cancels after FETCH_TIMEOUT_MS (10s)
 *   - Content-Length check rejects responses > MAX_RESPONSE_BYTES (5MB)
 */
export async function fetchPage(url) {
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
      console.warn(
        `[scraper] Response too large (${contentLength} bytes) for ${url}`
      );
      return null;
    }

    return await res.text();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn(`[scraper] Timeout after ${FETCH_TIMEOUT_MS}ms for ${url}`);
    } else {
      console.warn(
        `[scraper] Fetch failed for ${url}:`,
        err instanceof Error ? err.message : err
      );
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Same as fetchPage but also returns the final URL after redirects. */
export async function fetchPageWithUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) return { html: null, finalUrl: url };

    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_BYTES) {
      return { html: null, finalUrl: url };
    }

    return { html: await res.text(), finalUrl: res.url };
  } catch {
    return { html: null, finalUrl: url };
  } finally {
    clearTimeout(timer);
  }
}

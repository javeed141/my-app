// ── Config ─────────────────────────────────────────────────

export const SAVE_FILES = process.env.NODE_ENV === "development";
export const FETCH_TIMEOUT_MS = 10_000;
export const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB

export const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// ── Types ──────────────────────────────────────────────────

export interface ScrapePageItem {
  title: string;
  path: string;
  fullUrl: string;
  level: number;
  group: string;
}

export interface ScrapeResult {
  site: string;
  navType: "projects" | "tabs" | "simple" | "fallback";
  tabs: string[];
  sections: { name: string; pages: ScrapePageItem[] }[];
}

export interface SidebarJsonPage {
  title?: string;
  slug?: string;
  uri?: string;
  children?: SidebarJsonPage[];
  pages?: SidebarJsonPage[];
}

export interface PageMeta {
  title: string;
  level: number;
  group: string;
  order: number;
}

// ── Constants ──────────────────────────────────────────────

export const PREFIX_TO_SECTION: Record<string, string> = {
  docs: "Guides",
  reference: "API Reference",
  refs: "API Reference",
  changelog: "Changelog",
  recipes: "Recipes",
  discuss: "Discussions",
  page: "Pages",
};

export const PREFIX_ALIASES: Record<string, string> = {
  refs: "reference",
};

export const SIDEBAR_SELECTORS = [
  "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
  "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
  "[class*='Sidebar']", "[class*='sidebar']", "aside nav", "aside",
];

export const NAV_SELECTORS = [
  "header a", "nav a", "[class*='Header'] a", "[class*='navbar'] a",
  "[class*='Navbar'] a", "[class*='MobileFlyout'] a", "[class*='Flyout'] a",
  "[class*='NavItem'] a", ".rm-Header-bottom a",
].join(", ");

export const TAB_PATTERNS: [RegExp, string][] = [
  [/^\/?docs\/?$/, "Guides"],
  [/^\/?reference\/?$/, "API Reference"],
  [/^\/?refs\/?$/, "API Reference"],
  [/^\/?changelog\/?$/, "Changelog"],
  [/^\/?recipes\/?$/, "Recipes"],
  [/^\/?discuss\/?$/, "Discussions"],
];

export const DOC_PATH_PATTERN = /\/(docs|reference|refs|recipes|page|changelog)\//;
export const DOC_HREF_PATTERN = /^\/(docs|reference|refs|recipes|page|changelog)\/.+/;
export const SLUG_STRIP_PATTERN = /^\/?(docs|reference|refs|recipes|changelog)\//;

// ── SSRF Protection ────────────────────────────────────────

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

export function normalizePrefix(prefix: string): string {
  return PREFIX_ALIASES[prefix] || prefix;
}

export function slugToTitle(slug: string): string {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}

/**
 * Extract a balanced JSON object {...} from text starting at `start`.
 * Simple regex breaks on nested braces — this counts them properly.
 */
export function extractBalancedJson(text: string, start: number): string | null {
  if (text[start] !== "{") return null;
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
 * Recursively search an object for a key (max 5 levels deep).
 */
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

// ── Fetch with timeout ─────────────────────────────────────

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
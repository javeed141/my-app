// Config & constants for the MDX converter

export const FETCH_TIMEOUT_MS = 15_000;
export const MAX_RESPONSE_BYTES = 2 * 1024 * 1024; // 2MB

export const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept: "text/plain, text/markdown, text/x-markdown, */*",
};

// --- Emoji → Callout Kind ---
// ReadMe uses emoji prefixes in blockquotes: > 📘 Title → info
// Documentation.AI uses <Callout kind="...">

export const EMOJI_TO_CALLOUT_KIND = {
  "📘": "info",
  "ℹ️": "info",
  "📝": "info",
  "💡": "info",
  "📗": "success",
  "👍": "tip",
  "✅": "success",
  "⚠️": "alert",
  "🚧": "alert",
  "❗": "danger",
  "❗️": "danger",
  "🛑": "danger",
  "❌": "danger",
  "📙": "alert",
  "📕": "danger",
};

export const CALLOUT_EMOJIS = Object.keys(EMOJI_TO_CALLOUT_KIND);

// --- Component Rename Map ---
// ReadMe component → Documentation.AI component

export const COMPONENT_RENAME = {
  Accordion: "Expandable",
  AccordionGroup: "ExpandableGroup",
};

// --- Font Awesome → Lucide Icon Map ---

export const FA_TO_LUCIDE = {
  "fa-rocket": "rocket",
  "fa-check": "check",
  "fa-check-circle": "check-circle",
  "fa-info-circle": "info",
  "fa-info": "info",
  "fa-warning": "triangle-alert",
  "fa-exclamation-triangle": "alert-triangle",
  "fa-exclamation-circle": "alert-circle",
  "fa-exclamation": "alert-triangle",
  "fa-times": "x",
  "fa-times-circle": "x-circle",
  "fa-star": "star",
  "fa-heart": "heart",
  "fa-cog": "settings",
  "fa-cogs": "settings",
  "fa-gear": "settings",
  "fa-search": "search",
  "fa-user": "user",
  "fa-users": "users",
  "fa-lock": "lock",
  "fa-unlock": "unlock",
  "fa-key": "key",
  "fa-code": "code",
  "fa-terminal": "terminal",
  "fa-file": "file",
  "fa-file-text": "file-text",
  "fa-folder": "folder",
  "fa-download": "download",
  "fa-upload": "upload",
  "fa-link": "link",
  "fa-external-link": "external-link",
  "fa-globe": "globe",
  "fa-database": "database",
  "fa-server": "server",
  "fa-cloud": "cloud",
  "fa-bolt": "zap",
  "fa-lightning": "zap",
  "fa-book": "book-open",
  "fa-bookmark": "bookmark",
  "fa-eye": "eye",
  "fa-eye-slash": "eye-off",
  "fa-edit": "pencil",
  "fa-pencil": "pencil",
  "fa-trash": "trash-2",
  "fa-plus": "plus",
  "fa-minus": "minus",
  "fa-arrow-right": "arrow-right",
  "fa-arrow-left": "arrow-left",
  "fa-chevron-right": "chevron-right",
  "fa-chevron-down": "chevron-down",
  "fa-home": "home",
  "fa-shield": "shield",
  "fa-bell": "bell",
  "fa-envelope": "mail",
  "fa-credit-card": "credit-card",
  "fa-calendar": "calendar",
  "fa-clock": "clock",
  "fa-refresh": "refresh-cw",
  "fa-sync": "refresh-cw",
  "fa-play": "play",
  "fa-pause": "pause",
  "fa-stop": "square",
  "fa-copy": "copy",
  "fa-clipboard": "clipboard",
  "fa-list": "list",
  "fa-table": "table",
  "fa-image": "image",
  "fa-camera": "camera",
  "fa-video": "video",
  "fa-map": "map",
  "fa-flag": "flag",
  "fa-tag": "tag",
  "fa-tags": "tags",
  "fa-wrench": "wrench",
  "fa-magic": "sparkles",
  "fa-lightbulb": "lightbulb",
  "fa-plug": "plug",
  "fa-puzzle-piece": "puzzle",
  "fa-cube": "package",
  "fa-desktop": "monitor",
  "fa-mobile": "smartphone",
  "fa-github": "github",
  "fa-apple": "apple",
  "fa-windows": "monitor",
  "fa-linux": "terminal",
};

// --- ReadMe-only frontmatter fields to strip ---

export const README_ONLY_FIELDS = new Set([
  "category",
  "categorySlug",
  "slug",
  "hidden",
  "order",
  "excerpt",
  "type",
  "parentDoc",
  "parentDocSlug",
  "api",
  "next",
  "previous",
  "updatedAt",
  "createdAt",
  "version",
  "id",
  "_id",
  "isReference",
  "link_url",
  "link_external",
  "metadata",
  "childrenPages",
]);

// --- SSRF Protection ---

const BLOCKED_HOSTS =
  /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|0\.0\.0\.0|::1|\[::1\])/i;

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

// --- Fetch with timeout + size limit ---

export async function fetchRaw(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) {
      console.warn(`[converter] HTTP ${res.status} for ${url}`);
      return null;
    }

    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_BYTES) {
      console.warn(`[converter] Response too large for ${url}`);
      return null;
    }

    return await res.text();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn(`[converter] Timeout for ${url}`);
    } else {
      console.warn(
        `[converter] Fetch failed for ${url}:`,
        err instanceof Error ? err.message : err
      );
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}
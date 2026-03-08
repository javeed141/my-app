// ═══════════════════════════════════════════════════════════
//  STEP 2 — detect.js (Site Type Detection)
//
//  IMPORTS FROM: types.js (Step 1)
//  USED BY:      links.js (Step 4), route.js (Step 8)
//
//  Scans the page's header/nav links to classify the site:
//
//    Type A — Multi Tab + Sidebar     (/docs + /reference tabs)
//    Type B — Single Section + Sidebar (just /docs, no tabs)
//    Type C — Tabs + Versions + Sidebar (/v3/docs + /v3/reference)
//    Type D — Multi Project + Sidebar  (/connect/docs, /terminal/docs)
//
//  EXPORTS:
//    detectTabs(cheerio, baseUrl)       → [{ name, path }]
//    detectProjects(cheerio, baseUrl)   → Set<string>
//    detectSiteType(html, origin)       → { type, tabs, projects, versionPrefix }
// ═══════════════════════════════════════════════════════════

import { load } from "cheerio";
import {
  stripVersionPrefix,
  extractVersionPrefix,
  findNestedKey,
  NAV_SELECTORS,
  TAB_PATTERNS,
  VERSION_PREFIX_PATTERN,
} from "./types.js";

// ── extractBalancedArray() ─────────────────────────────────
//
//  Same idea as extractBalancedJson() in types.js, but for arrays.
//  Counts [ and ] brackets to find the real end of a JSON array.
//
//  WHY: "versions":[{"categories":["a","b"]},{"categories":["c"]}]
//  A simple regex [^\]]+ stops at the first ] inside categories.
//  This function counts brackets to find the OUTER closing ].
//
//  INPUT:  text (string), start (number) — position of opening [
//  OUTPUT: string (the JSON array) or null
//
//  MAX 500K chars scanned (same guard as extractBalancedJson).

function extractBalancedArray(text, start) {
  if (text[start] !== "[") return null;
  if (text.length > 500_000) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"' && !escape) { inString = !inString; continue; }
    if (!inString) {
      if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) return text.substring(start, i + 1);
      }
    }
  }
  return null;
}

// ── detectTabs() ──────────────────────────────────────────
//
//  Scans all navigation links on the page for known tab patterns.
//
//  HOW IT WORKS:
//    1. Select all <a> inside header, nav, navbar, etc.
//    2. For each link, get its href
//    3. Strip version prefix (/v3/docs → /docs)
//    4. Match against TAB_PATTERNS (e.g. /docs → "Guides")
//    5. Deduplicate (same link in header + mobile nav)
//
//  INPUT:
//    $ (cheerio instance) — parsed HTML
//    baseUrl (string)     — origin like "https://docs.lithic.com"
//
//  OUTPUT:
//    [{ name: "Guides", path: "/docs" },
//     { name: "API Reference", path: "/reference" }]
//
//  EMPTY ARRAY [] means no tabs found → Type B (single section)

export function detectTabs($, baseUrl) {
  const tabs = [];
  const seen = new Set();

  $(NAV_SELECTORS).each((_, el) => {
    let href = ($(el).attr("href") || "").replace(/\/$/, "");

    // Convert absolute URLs to relative paths for matching
    // e.g. "https://docs.lithic.com/reference" → "/reference"
    try {
      if (href.startsWith("http")) {
        const u = new URL(href);
        if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
      }
    } catch {
      // Keep href as-is if URL parsing fails
    }

    // Strip version prefix: "/v3/docs" → "/docs"
    const stripped = stripVersionPrefix(href);

    for (const [pattern, name] of TAB_PATTERNS) {
      if (pattern.test(stripped) && !seen.has(name)) {
        seen.add(name);
        tabs.push({ name, path: "/" + stripped.replace(/^\//, "") });
      }
    }
  });

  return tabs;
}

// ── detectProjects() ──────────────────────────────────────
//
//  Detects multi-project sites: /{project}/docs/ or /{project}/reference/
//
//  HOW IT WORKS:
//    1. Scan header/nav links
//    2. Match pattern: /{word}/(docs|reference)
//    3. Ignore known non-project prefixes (en, v1, main, etc.)
//
//  INPUT:
//    $ (cheerio instance) — parsed HTML
//    baseUrl (string)     — origin
//
//  OUTPUT:
//    Set { "connect", "terminal", "treasury" }
//
//  EMPTY SET means not a multi-project site

export function detectProjects($, baseUrl) {
  const projects = new Set();
  const ignored = new Set([
    "docs", "reference", "main", "en",
    "v1", "v2", "v3", "v4", "v5", "beta",
  ]);

  // Method 1: Scan header/nav links for /{project}/(docs|reference)
  $("header a, nav a, [class*='Header'] a").each((_, el) => {
    let href = $(el).attr("href") || "";

    try {
      if (href.startsWith("http")) {
        const u = new URL(href);
        if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
      }
    } catch {
      // Keep href as-is
    }

    const stripped = stripVersionPrefix(href);
    const m = stripped.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
    if (m && !ignored.has(m[1])) projects.add(m[1]);
  });

  // Method 2: Extract from "childrenProjects" JSON in <script> tags
  // ReadMe embeds: "childrenProjects":["workspace","platform","ledgers","payments"]
  // Also check "projectsMeta" for subpath names
  //
  // IMPORTANT: Only run when Method 1 already found at least 1 project.
  // If nav links found 0 projects, the site is likely a normal tabbed site
  // (e.g. docs.readme.com/main/docs with Guides/Recipes/API tabs).
  // Script data may list sub-projects (rdmd, ent) that are separate portals,
  // not actual project tabs on this site.
  if (projects.size >= 1) {
    $("script").each((_, el) => {
      const text = $(el).text();

      // Try childrenProjects array
      const cpMatch = text.match(/"childrenProjects"\s*:\s*\[([^\]]+)\]/);
      if (cpMatch) {
        try {
          const arr = JSON.parse("[" + cpMatch[1] + "]");
          for (const p of arr) {
            if (typeof p === "string" && !ignored.has(p)) projects.add(p);
          }
        } catch {}
      }

      // Try projectsMeta array for subpath names
      if (text.includes('"projectsMeta"')) {
        const pmStart = text.indexOf('"projectsMeta"');
        const arrStart = text.indexOf("[", pmStart);
        if (arrStart !== -1) {
          const arrStr = extractBalancedArray(text, arrStart);
          if (arrStr) {
            try {
              const arr = JSON.parse(arrStr);
              for (const p of arr) {
                if (p && p.subpath && !ignored.has(p.subpath)) {
                  projects.add(p.subpath);
                }
              }
            } catch {}
          }
        }
      }
    });
  }

  return projects;
}

// ── detectVersions() ──────────────────────────────────────
//
//  Scans the page HTML to detect if the site uses versioning.
//
//  THE PROBLEM:
//    User gives us: https://docs.datafiniti.co/docs/api-introduction
//    No /v3/ in the URL → old logic thinks "no versions"
//    But the PAGE ITSELF contains version data:
//      - A "versions" JSON array in <script> tags
//      - A VersionDropdown React component
//      - Nav links to /v3/docs/, /v4/docs/
//
//  THREE DETECTION METHODS (tried in order):
//
//    Method 1: "versions" JSON array in <script> tags
//      ReadMe embeds: "versions":[{"version":"3",...},{"version":"4",...}]
//      We parse this to get actual version numbers.
//
//    Method 2: VersionDropdown component in HTML
//      ReadMe renders: <VersionDropdown> or class="VersionDropdown"
//      Confirms versioning exists even if we can't parse the JSON.
//
//    Method 3: Versioned links in <a> tags
//      Scan all links for href="/v3/docs/..." patterns.
//      Extract unique version prefixes.
//
//  INPUT:
//    $ (cheerio instance) — parsed HTML
//    pathname (string)    — URL path the user gave us
//
//  OUTPUT:
//    {
//      hasVersions: true/false,
//      currentVersion: "/v3" or "",
//      allVersions: ["3", "4"],
//      detectedBy: "json" | "dropdown" | "links" | "url" | "none"
//    }

export function detectVersions($, pathname) {
  const fromUrl = extractVersionPrefix(pathname);
  const result = {
    hasVersions: false,
    currentVersion: fromUrl,
    allVersions: [],
    detectedBy: "none",
  };

  // ── Method 1: "versions" JSON array in <script> tags ────
  //
  //  ReadMe embeds version data like:
  //    "versions":[{"version":"3","categories":[...]},{"version":"4",...}]
  //
  //  BUG FIX: The old regex /"versions"\s*:\s*\[([^\]]+)\]/ breaks because
  //  version objects contain NESTED arrays like "categories":["abc","def"].
  //  The [^\]]+ stops at the first ] inside categories, producing broken JSON.
  //
  //  FIX: Use balanced bracket counting (same idea as extractBalancedJson)
  //  to find the real end of the versions array.
  $("script").each((_, el) => {
    if (result.allVersions.length > 0) return; // already found

    const text = $(el).text();
    if (!text.includes('"versions"')) return;

    // Find the start of "versions":[
    const marker = text.match(/"versions"\s*:\s*\[/);
    if (!marker) return;

    // Extract the balanced array [...] using bracket counting
    const arrayStart = marker.index + marker[0].length - 1; // position of [
    const arrayStr = extractBalancedArray(text, arrayStart);
    if (!arrayStr) return;

    try {
      const arr = JSON.parse(arrayStr);
      const versionNumbers = arr
        .filter((v) => v && typeof v === "object" && v.version)
        // Filter out non-numeric version IDs like MongoDB ObjectIds
        // Real versions: "3", "4", "1.0". Not: "65ce4e31ceb42f0060898b57"
        .map((v) => String(v.version))
        .filter((v) => /^\d+(\.\d+)*$/.test(v));

      // KEY INSIGHT: Every ReadMe site has a "versions" array,
      // even sites with NO versioning. Sites like Lithic have
      // versions:["1.0"] — just one version.
      //
      // A site is only TRULY versioned if it has 2+ versions.
      // One version = no version selector shown to users.
      if (versionNumbers.length > 1) {
        result.hasVersions = true;
        result.allVersions = versionNumbers;
        result.detectedBy = "json";

        // If URL didn't have a version, figure out which one we're on
        // ReadMe marks the current/default version as is_stable
        if (!result.currentVersion) {
          const stable = arr.find((v) => v.is_stable);
          const currentVer = stable ? stable.version : versionNumbers[0];
          result.currentVersion = "/v" + currentVer;
        }
      }
    } catch {
      // JSON parse failed, continue to next method
    }
  });

  if (result.hasVersions) return result;

  // ── Method 2: VersionDropdown + scan for "version":"X.Y" ─
  //
  //  ReadMe renders a version selector in the page.
  //  If we find it, also scan the HTML for "version":"X.Y" patterns
  //  to populate allVersions (Method 1 may have failed due to
  //  the versions array being too large or in an unexpected format).
  const htmlStr = $.html();
  if (
    htmlStr.includes("VersionDropdown") ||
    htmlStr.includes("version-picker") ||
    htmlStr.includes("version-selector") ||
    htmlStr.includes("rm-Version")
  ) {
    // Scan all "version":"X.Y" occurrences in the full HTML
    // This catches version numbers even when the JSON array parsing fails
    const versionMatches = htmlStr.matchAll(/"version"\s*:\s*"(\d+(?:\.\d+)*)"/g);
    const foundVersions = [...new Set([...versionMatches].map((m) => m[1]))];

    result.hasVersions = foundVersions.length > 1;
    result.allVersions = foundVersions.sort();
    result.detectedBy = "dropdown";

    // Find the current/stable version
    if (result.hasVersions && !result.currentVersion) {
      // Look for is_stable:true near a version number
      const stableMatch = htmlStr.match(/"version"\s*:\s*"(\d+(?:\.\d+)*)"\s*,\s*"version_clean"[^}]*"is_stable"\s*:\s*true/);
      if (stableMatch) {
        result.currentVersion = "/v" + stableMatch[1];
      } else {
        result.currentVersion = "/v" + foundVersions[0];
      }
    }

    if (result.hasVersions) return result;
  }

  // ── Method 3: Versioned links in <a> tags ───────────────
  //
  //  Scan all links for patterns like /v3/docs/..., /v4/reference/...
  //  Collect unique version numbers.
  const versionSet = new Set();
  $("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    const vMatch = href.match(/^\/(v(\d+))\/(docs|reference)\/?/);
    if (vMatch) {
      versionSet.add(vMatch[2]); // just the number: "3", "4"
    }
  });

  if (versionSet.size > 0) {
    result.hasVersions = true;
    result.allVersions = [...versionSet].sort();
    result.detectedBy = "links";
    return result;
  }

  // ── Method 4: URL already has numeric version ──────────
  //  Only /v3, /v4 etc. count — branch names like /main don't.
  if (fromUrl && /^\/v\d/.test(fromUrl)) {
    result.hasVersions = true;
    result.detectedBy = "url";
    return result;
  }

  return result;
}

// ── detectChildBranches() ──────────────────────────────────
//
//  Detects child project branches from script data.
//  Unlike detectProjects(), this ALWAYS runs — not gated by nav links.
//
//  ReadMe sites like docs.readme.com have child branches:
//    "childrenProjects":["rdmd","ent"]
//    "projectsMeta":[{"subpath":"rdmd",...},{"subpath":"ent",...}]
//
//  These are separate content sets accessed via /{branch}/docs/.
//
//  INPUT:  $ (cheerio instance)
//  OUTPUT: Set<string> of branch names (e.g. {"rdmd", "ent"})

export function detectChildBranches($) {
  const branches = new Set();
  const ignored = new Set([
    "docs", "reference", "main", "en",
    "v1", "v2", "v3", "v4", "v5", "beta",
  ]);

  $("script").each((_, el) => {
    const text = $(el).text();

    // Try childrenProjects array
    const cpMatch = text.match(/"childrenProjects"\s*:\s*\[([^\]]+)\]/);
    if (cpMatch) {
      try {
        const arr = JSON.parse("[" + cpMatch[1] + "]");
        for (const p of arr) {
          if (typeof p === "string" && !ignored.has(p)) branches.add(p);
        }
      } catch {}
    }

    // Try projectsMeta for subpath names
    if (text.includes('"projectsMeta"')) {
      const pmStart = text.indexOf('"projectsMeta"');
      const arrStart = text.indexOf("[", pmStart);
      if (arrStart !== -1) {
        const arrStr = extractBalancedArray(text, arrStart);
        if (arrStr) {
          try {
            const arr = JSON.parse(arrStr);
            for (const p of arr) {
              if (p && p.subpath && !ignored.has(p.subpath)) {
                branches.add(p.subpath);
              }
            }
          } catch {}
        }
      }
    }
  });

  return branches;
}

// ── detectSiteType() ──────────────────────────────────────
//
//  THE MAIN FUNCTION — classifies the entire site.
//
//  DECISION TREE (updated with version scanning):
//
//    Has projects? (/connect/docs, /terminal/docs)
//      → YES → Type D (Multi Project)
//      → NO  → Has versions? (scans page HTML, not just URL)
//                → YES → Has tabs?
//                           → YES → Type C (Tabs + Versions)
//                           → NO  → Type C (Versions, single tab)
//                → NO  → Has tabs?
//                           → YES → Type A (Multi Tab)
//                           → NO  → Type B (Single Section)
//
//  INPUT:
//    html (string)   — raw HTML of the page
//    origin (string) — e.g. "https://docs.lithic.com"
//    pathname (string) — e.g. "/v3/docs/getting-started"
//
//  OUTPUT:
//    {
//      type: "A" | "B" | "C" | "D",
//      typeName: "Multi Tab + Sidebar",
//      tabs: [{ name, path }],
//      projects: ["connect", "terminal"],
//      versionPrefix: "/v3" or "",
//      versions: { hasVersions, currentVersion, allVersions, detectedBy }
//    }

export function detectSiteType(html, origin, pathname = "/") {
  const $ = load(html);
  const tabs = detectTabs($, origin);
  const projects = detectProjects($, origin);
  const versions = detectVersions($, pathname || "/");
  const childBranches = detectChildBranches($);

  // Detect branch prefix from URL: /main/docs → "/main"
  const branchMatch = pathname.match(/^\/(main|ent|stable|latest|current|next|[\w-]+)(?=\/(docs|reference|refs|recipes|page|changelog|discuss))/);
  const branchPrefix = branchMatch ? `/${branchMatch[1]}` : "";

  // ── Decision tree ────────────────────────────────────────

  if (projects.size > 0) {
    return {
      type: "D",
      typeName: "Multi Project + Sidebar",
      tabs,
      projects: [...projects],
      versionPrefix: versions.currentVersion,
      childBranches: [...childBranches],
      versions,
    };
  }

  if (versions.hasVersions) {
    // For versioned sites, the default/stable version works WITHOUT a prefix.
    // e.g. Datafiniti: v4 is default → /docs/intro works without /v4/docs/intro
    // Only non-default versions need the prefix: /v3/docs/intro
    //
    // So we use EMPTY versionPrefix for the default version,
    // and list non-default versions as otherVersions to scrape separately.
    const defaultVer = versions.currentVersion; // e.g. "/v4"
    const otherVersions = versions.allVersions
      .map((v) => "/v" + v)
      .filter((v) => v !== defaultVer);

    return {
      type: "C",
      typeName: tabs.length > 0
        ? "Tabs + Versions + Sidebar"
        : "Versions + Sidebar",
      tabs,
      projects: [],
      versionPrefix: "",  // default version doesn't need prefix
      otherVersions,       // non-default versions to scrape separately
      childBranches: [...childBranches],
      versions,
    };
  }

  // Use branch prefix if detected (e.g. /main/ for ReadMe sites)
  const effectivePrefix = branchPrefix || versions.currentVersion || "";

  // 2+ tabs = Multi Tab (Type A). User can switch between Guides and API Reference.
  // 1 tab = Single Section (Type B). Only one content area, nothing to switch between.
  if (tabs.length > 1) {
    return {
      type: "A",
      typeName: "Multi Tab + Sidebar",
      tabs,
      projects: [],
      versionPrefix: effectivePrefix,
      childBranches: [...childBranches],
      versions,
    };
  }

  return {
    type: "B",
    typeName: "Single Section + Sidebar",
    tabs: [],
    projects: [],
    versionPrefix: effectivePrefix,
    childBranches: [...childBranches],
    versions,
  };
}

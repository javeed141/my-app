// import { NextRequest, NextResponse } from "next/server";
// import { load, type CheerioAPI, type Cheerio } from "cheerio";
// import type { AnyNode } from "domhandler";
// import { writeFileSync, mkdirSync, existsSync } from "fs";
// import { join } from "path";

// // ── Toggle file saving ──────────────────────────────────────────────────────
// // Set to true  → saves JSON to docs/ folder after each scrape
// // Set to false → skips file saving entirely (use this for production/Vercel)
// const SAVE_FILES = true;

// export async function POST(req: NextRequest) {
//   const { url } = await req.json();
//   if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

//   let baseUrl: string;
//   try {
//     baseUrl = new URL(url).origin;
//   } catch {
//     return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
//   }

//   const headers = {
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
//     Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//   };

//   async function fetchPage(u: string): Promise<string | null> {
//     try {
//       const r = await fetch(u, { headers, redirect: "follow" });
//       return r.ok ? await r.text() : null;
//     } catch {
//       return null;
//     }
//   }

//   // ── JSON sidebar parser (ReadMe embeds sidebars JSON in script tags) ──

//   interface SidebarJsonPage {
//     title?: string;
//     slug?: string;
//     uri?: string;
//     children?: SidebarJsonPage[];
//     pages?: SidebarJsonPage[];
//   }

//   function walkJsonSidebar(
//     nodes: SidebarJsonPage[],
//     pages: ScrapePageItem[],
//     group: string,
//     depth: number,
//     pathPrefix: string
//   ) {
//     for (const node of nodes) {
//       const title = (node.title || "").trim();
//       const slug = node.slug || node.uri || "";
//       if (!title || !slug) continue;

//       const path = slug.startsWith("http") || slug.startsWith("/")
//         ? slug
//         : `${pathPrefix}/${slug}`;
//       const fullUrl = path.startsWith("http") ? path : baseUrl + path;

//       pages.push({ title, path, fullUrl, level: depth, group });

//       const children = node.children || node.pages || [];
//       if (children.length > 0) {
//         walkJsonSidebar(children, pages, group, depth + 1, pathPrefix);
//       }
//     }
//   }

//   function parseJsonSidebar(html: string): ScrapePageItem[] | null {
//     const pages: ScrapePageItem[] = [];

//     // Look for sidebars JSON embedded in script tags
//     const patterns = [
//       /"sidebars"\s*:\s*(\{[\s\S]*?\})\s*[,}]/,
//       /sidebars\s*=\s*(\{[\s\S]*?\})\s*;/,
//     ];

//     const $ = load(html);
//     const scripts: string[] = [];
//     $("script").each((_: number, el: AnyNode) => {
//       const text = $(el).text();
//       if (text.length > 100 && (text.includes("sidebars") || text.includes("sidebar"))) {
//         scripts.push(text);
//       }
//     });

//     for (const script of scripts) {
//       for (const pattern of patterns) {
//         const match = script.match(pattern);
//         if (!match) continue;
//         try {
//           const sidebars = JSON.parse(match[1]);
//           // sidebars is { docs: [...], reference: [...], ... }
//           for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
//             if (!Array.isArray(sectionPages)) continue;
//             for (const category of sectionPages as SidebarJsonPage[]) {
//               const groupName = (category.title || sectionKey || "").trim();
//               const children = category.pages || category.children || [];
//               if (children.length > 0) {
//                 const prefix = sectionKey === "reference" ? "/reference" : "/docs";
//                 walkJsonSidebar(children, pages, groupName, 0, prefix);
//               }
//             }
//           }
//           if (pages.length > 0) return pages;
//         } catch { /* not valid JSON, try next */ }
//       }
//     }

//     // Also try __NEXT_DATA__ or similar page props
//     $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
//       (_: number, el: AnyNode) => {
//         if (pages.length > 0) return;
//         try {
//           const data = JSON.parse($(el).text());
//           const findSidebars = (obj: Record<string, unknown>, depth: number): unknown => {
//             if (depth > 5) return null;
//             if (obj && typeof obj === "object") {
//               if ("sidebars" in obj) return obj.sidebars;
//               for (const val of Object.values(obj)) {
//                 const found = findSidebars(val as Record<string, unknown>, depth + 1);
//                 if (found) return found;
//               }
//             }
//             return null;
//           };
//           const sidebars = findSidebars(data, 0) as Record<string, SidebarJsonPage[]> | null;
//           if (sidebars && typeof sidebars === "object") {
//             for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
//               if (!Array.isArray(sectionPages)) continue;
//               for (const category of sectionPages) {
//                 const groupName = (category.title || sectionKey || "").trim();
//                 const children = category.pages || category.children || [];
//                 if (children.length > 0) {
//                   const prefix = sectionKey === "reference" ? "/reference" : "/docs";
//                   walkJsonSidebar(children, pages, groupName, 0, prefix);
//                 }
//               }
//             }
//           }
//         } catch { /* ignore */ }
//       }
//     );

//     return pages.length > 0 ? pages : null;
//   }

//   // ── HTML sidebar parser (fallback) ──────────────────────────────────

//   function addLink(
//     $: CheerioAPI,
//     el: AnyNode,
//     pages: ScrapePageItem[],
//     group: string,
//     level: number
//   ) {
//     const href = $(el).attr("href") || "";
//     const title = $(el).text().trim();
//     if (!title || !href) return;
//     if (!href.match(/\/(docs|reference|recipes|page)\//)) return;
//     pages.push({
//       title,
//       path: href,
//       fullUrl: href.startsWith("http") ? href : baseUrl + href,
//       level,
//       group,
//     });
//   }

//   function walkSidebar(
//     $: CheerioAPI,
//     $el: Cheerio<AnyNode>,
//     pages: ScrapePageItem[],
//     group: string,
//     depth: number
//   ) {
//     $el.children().each((_: number, child: AnyNode) => {
//       const $c = $(child);
//       const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
//       const cls = ($c.attr("class") || "").toLowerCase();

//       if (
//         /^h[1-6]$/.test(tag) ||
//         cls.includes("header") ||
//         cls.includes("category") ||
//         cls.includes("group")
//       ) {
//         const text = $c.clone().children("ul,ol,li,nav").remove().end().text().trim();
//         if (text && text.length < 80) group = text;
//       }

//       if (tag === "a") addLink($, child, pages, group, depth);

//       if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
//         const nextDepth = tag === "ul" || tag === "ol" ? depth + 1 : depth;
//         walkSidebar($, $c, pages, group, nextDepth);
//       }
//     });
//   }

//   function parseSidebar(html: string): ScrapePageItem[] {
//     // Try JSON sidebar first (accurate hierarchy from ReadMe embedded data)
//     const jsonPages = parseJsonSidebar(html);
//     if (jsonPages && jsonPages.length > 0) return jsonPages;

//     // Fall back to HTML DOM walking
//     const $ = load(html);
//     const pages: ScrapePageItem[] = [];

//     const selectors = [
//       "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
//       "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
//       "[class*='Sidebar']", "[class*='sidebar']",
//       "aside nav", "aside",
//     ];

//     let $sidebar: Cheerio<AnyNode> | null = null;
//     for (const sel of selectors) {
//       const $el = $(sel);
//       if ($el.length && $el.find("a").length > 3) {
//         $sidebar = $el;
//         break;
//       }
//     }

//     if ($sidebar) walkSidebar($, $sidebar, pages, "", 0);

//     if (pages.length === 0) {
//       $("ul").each((_: number, ul: AnyNode) => {
//         const links = $(ul).find('a[href*="/docs/"], a[href*="/reference/"]');
//         if (links.length > 3 && pages.length === 0) {
//           links.each((_2: number, a: AnyNode) => addLink($, a, pages, "", 0));
//         }
//       });
//     }

//     if (pages.length === 0) {
//       $('a[href*="/docs/"], a[href*="/reference/"]').each((_: number, a: AnyNode) =>
//         addLink($, a, pages, "", 0)
//       );
//     }

//     const unique = new Map<string, ScrapePageItem>();
//     for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
//     return [...unique.values()];
//   }

//   try {
//     const html = await fetchPage(url);
//     if (!html) return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });

//     const $ = load(html);

//     // Detect nav tabs
//     const tabs: { name: string; path: string }[] = [];
//     const seen = new Set<string>();

//     $("header a, nav a, [class*='Header'] a, [class*='navbar'] a, [class*='Navbar'] a").each(
//       (_: number, el: AnyNode) => {
//         const href = ($(el).attr("href") || "").replace(/\/$/, "");
//         for (const [pattern, name] of [
//           [/^\/?docs$/, "Guides"],
//           [/^\/?reference$/, "API Reference"],
//           [/^\/?changelog$/, "Changelog"],
//           [/^\/?recipes$/, "Recipes"],
//         ] as [RegExp, string][]) {
//           if (pattern.test(href) && !seen.has(name)) {
//             seen.add(name);
//             tabs.push({ name, path: "/" + href.replace(/^\//, "") });
//           }
//         }
//       }
//     );

//     const projects = new Set<string>();
//     $("header a, nav a, [class*='Header'] a").each((_: number, el: AnyNode) => {
//       const href = $(el).attr("href") || "";
//       const m = href.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
//       if (m) {
//         const slug = m[1];
//         if (!["docs", "reference", "main", "en", "v1", "v2", "v3", "v4", "v5", "beta"].includes(slug))
//           projects.add(slug);
//       }
//     });

//     const toFetch: { name: string; url: string }[] = [];
//     if (projects.size > 0) {
//       for (const p of projects) {
//         toFetch.push({ name: `${p}/guides`, url: `${baseUrl}/${p}/docs` });
//         toFetch.push({ name: `${p}/reference`, url: `${baseUrl}/${p}/reference` });
//       }
//     } else if (tabs.length > 0) {
//       for (const t of tabs) toFetch.push({ name: t.name, url: `${baseUrl}${t.path}` });
//     } else {
//       toFetch.push({ name: "docs", url });
//     }

//     let navType: ScrapeResult["navType"];
//     if (projects.size > 0) {
//       navType = "projects";
//     } else if (tabs.length > 0) {
//       navType = "tabs";
//     } else {
//       navType = "simple";
//     }

//     const out: ScrapeResult = { site: new URL(url).hostname, navType, sections: [] };

//     for (const section of toFetch) {
//       const shtml = section.url === url ? html : await fetchPage(section.url);
//       if (!shtml) continue;
//       const pages = parseSidebar(shtml);
//       if (pages.length > 0) out.sections.push({ name: section.name, pages });
//     }

//     if (out.sections.length === 0) {
//       out.navType = "fallback";
//       const pages: ScrapePageItem[] = [];
//       const seenHrefs = new Set<string>();
//       $("a").each((_: number, a: AnyNode) => {
//         const href = $(a).attr("href") || "";
//         const title = $(a).text().trim();
//         if (!title || title.length > 100 || seenHrefs.has(href)) return;
//         if (href.match(/^\/(docs|reference|recipes|page)\/.+/)) {
//           seenHrefs.add(href);
//           pages.push({ title, path: href, fullUrl: baseUrl + href, level: 0, group: "" });
//         }
//       });
//       if (pages.length > 0) out.sections.push({ name: "all", pages });
//     }

//     // Save JSON to docs/ folder (works locally, skips silently on serverless)
//     if (SAVE_FILES) try {
//       const docsDir = join(process.cwd(), "docs");
//       if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });
//       const safeName = out.site.replace(/[^a-zA-Z0-9.-]/g, "_");
//       const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//       const filePath = join(docsDir, `${safeName}_${timestamp}.json`);
//       writeFileSync(filePath, JSON.stringify(out, null, 2));

//       // Also store raw sidebar structure if found
//       const $raw = load(html);
//       const rawScripts: string[] = [];
//       $raw("script").each((_: number, el: AnyNode) => {
//         const text = $raw(el).text();
//         if (text.includes("sidebars") || text.includes("sidebar")) {
//           const match = text.match(/"sidebars"\s*:\s*(\{[\s\S]*?\})\s*[,}]/);
//           if (match) rawScripts.push(match[1]);
//         }
//       });
//       if (rawScripts.length > 0) {
//         const rawSidebar = JSON.parse(rawScripts[0]);
//         const rawPath = join(docsDir, `${safeName}_${timestamp}_sidebar-structure.json`);
//         writeFileSync(rawPath, JSON.stringify(rawSidebar, null, 2));
//       }
//     } catch { /* read-only filesystem on serverless — skip */ }

//     return NextResponse.json(out);
//   } catch (e: unknown) {
//     return NextResponse.json(
//       { error: e instanceof Error ? e.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }

// interface ScrapePageItem {
//   title: string;
//   path: string;
//   fullUrl: string;
//   level: number;
//   group: string;
// }

// interface ScrapeResult {
//   site: string;
//   navType: "projects" | "tabs" | "simple" | "fallback";
//   sections: { name: string; pages: ScrapePageItem[] }[];
// }


// import { NextRequest, NextResponse } from "next/server";
// import { load, type CheerioAPI, type Cheerio } from "cheerio";
// import type { AnyNode } from "domhandler";
// import { writeFileSync, mkdirSync, existsSync } from "fs";
// import { join } from "path";

// // ╔════════════════════════════════════════════════════════════════════╗
// // ║  ReadMe Documentation Scraper — API Route                        ║
// // ║                                                                   ║
// // ║  Strategy:                                                        ║
// // ║    1. Fetch sitemap.xml → ALL page URLs (source of truth)         ║
// // ║    2. Group URLs by prefix: /docs/, /reference/, /changelog/      ║
// // ║    3. Merge with sidebar JSON for hierarchy + group names         ║
// // ║    4. Slug → title from sidebar JSON, fallback to slug cleanup    ║
// // ╚════════════════════════════════════════════════════════════════════╝

// const SAVE_FILES = true;

// // ─── Types ───────────────────────────────────────────────────────────

// interface ScrapePageItem {
//   title: string;
//   path: string;
//   fullUrl: string;
//   level: number;
//   group: string;
// }

// interface ScrapeResult {
//   site: string;
//   navType: "projects" | "tabs" | "simple" | "fallback";
//   tabs: string[];
//   sections: { name: string; pages: ScrapePageItem[] }[];
// }

// interface SidebarJsonPage {
//   title?: string;
//   slug?: string;
//   uri?: string;
//   children?: SidebarJsonPage[];
//   pages?: SidebarJsonPage[];
// }

// const PREFIX_TO_SECTION: Record<string, string> = {
//   docs: "Guides",
//   reference: "API Reference",
//   changelog: "Changelog",
//   recipes: "Recipes",
//   discuss: "Discussions",
//   page: "Pages",
// };

// // ─── Main Handler ────────────────────────────────────────────────────

// export async function POST(req: NextRequest) {
//   const { url } = await req.json();

//   if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

//   let baseUrl: string;
//   try {
//     baseUrl = new URL(url).origin;
//   } catch {
//     return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
//   }

//   const headers = {
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
//     Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//   };

//   async function fetchPage(u: string): Promise<string | null> {
//     try {
//       const r = await fetch(u, { headers, redirect: "follow" });
//       return r.ok ? await r.text() : null;
//     } catch {
//       return null;
//     }
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  STEP 1: Fetch sitemap.xml → ALL URLs grouped by prefix
//   // ═══════════════════════════════════════════════════════════════════

//   async function fetchSitemapUrls(): Promise<Map<string, string[]>> {
//     const grouped = new Map<string, string[]>();
//     const xml = await fetchPage(`${baseUrl}/sitemap.xml`);
//     if (!xml) return grouped;

//     const $ = load(xml, { xml: true });
//     $("url > loc").each((_: number, el: AnyNode) => {
//       const loc = $(el).text().trim();
//       if (!loc) return;
//       try {
//         const u = new URL(loc);
//         const segments = u.pathname.split("/").filter(Boolean);
//         if (segments.length < 2) return; // skip root URLs
//         const prefix = segments[0];
//         if (prefix === "discuss") return;
//         if (!grouped.has(prefix)) grouped.set(prefix, []);
//         grouped.get(prefix)!.push(loc);
//       } catch { /* skip */ }
//     });

//     for (const [key, urls] of grouped) {
//       grouped.set(key, [...new Set(urls)]);
//     }
//     return grouped;
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  STEP 2: Parse sidebar JSON — with proper brace-matching
//   //
//   //  CRITICAL FIX: The old regex \{[\s\S]*?\} is non-greedy and
//   //  matches to the FIRST } — breaking on nested JSON.
//   //  Now we use proper brace counting to extract the full object.
//   // ═══════════════════════════════════════════════════════════════════

//   interface PageMeta {
//     title: string;
//     level: number;
//     group: string;
//     order: number;
//   }

//   function walkJsonSidebar(
//     nodes: SidebarJsonPage[],
//     lookup: Map<string, PageMeta>,
//     group: string,
//     depth: number,
//     counter: { n: number }
//   ) {
//     for (const node of nodes) {
//       const title = (node.title || "").trim();
//       const slug = node.slug || node.uri || "";
//       if (!title || !slug) continue;

//       const bareSlug = slug.replace(/^\/?(docs|reference|recipes|changelog)\//, "");
//       lookup.set(bareSlug, { title, level: depth, group, order: counter.n++ });

//       const children = node.children || node.pages || [];
//       if (children.length > 0) {
//         walkJsonSidebar(children, lookup, group, depth + 1, counter);
//       }
//     }
//   }

//   // Extract a balanced JSON object starting from an opening { at position `start`
//   // Returns the full substring including matching braces, or null if invalid
//   function extractBalancedBraces(text: string, start: number): string | null {
//     if (text[start] !== "{") return null;
//     let depth = 0;
//     let inString = false;
//     let escape = false;

//     for (let i = start; i < text.length; i++) {
//       const ch = text[i];

//       if (escape) { escape = false; continue; }
//       if (ch === "\\") { escape = true; continue; }

//       if (ch === '"' && !escape) {
//         inString = !inString;
//         continue;
//       }

//       if (!inString) {
//         if (ch === "{") depth++;
//         else if (ch === "}") {
//           depth--;
//           if (depth === 0) {
//             return text.substring(start, i + 1);
//           }
//         }
//       }
//     }
//     return null; // unbalanced
//   }

//   function parseSidebarJson(html: string): Map<string, Map<string, PageMeta>> {
//     const result = new Map<string, Map<string, PageMeta>>();
//     const $ = load(html);

//     function processSidebars(sidebars: Record<string, unknown>) {
//       for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
//         if (!Array.isArray(sectionPages)) continue;

//         const lookup = new Map<string, PageMeta>();
//         const counter = { n: 0 };
//         for (const category of sectionPages as SidebarJsonPage[]) {
//           const groupName = (category.title || sectionKey || "").trim();
//           const children = category.pages || category.children || [];
//           if (children.length > 0) {
//             walkJsonSidebar(children, lookup, groupName, 0, counter);
//           }
//         }

//         if (lookup.size > 0) {
//           result.set(sectionKey, lookup);
//         }
//       }
//     }

//     // ── Method A: Find "sidebars" in <script> tags with balanced brace extraction ──
//     const scripts: string[] = [];
//     $("script").each((_: number, el: AnyNode) => {
//       const text = $(el).text();
//       if (text.length > 100 && (text.includes("sidebars") || text.includes("sidebar"))) {
//         scripts.push(text);
//       }
//     });

//     for (const script of scripts) {
//       // Find "sidebars" : { ... } with balanced braces
//       const markers = [/"sidebars"\s*:\s*/, /sidebars\s*=\s*/];
//       for (const marker of markers) {
//         const match = marker.exec(script);
//         if (!match) continue;

//         const braceStart = match.index + match[0].length;
//         if (script[braceStart] !== "{") continue;

//         const jsonStr = extractBalancedBraces(script, braceStart);
//         if (!jsonStr) continue;

//         try {
//           const sidebars = JSON.parse(jsonStr);
//           processSidebars(sidebars);
//           if (result.size > 0) return result;
//         } catch { /* invalid JSON, try next */ }
//       }
//     }

//     // ── Method B: __NEXT_DATA__ and application/json (full parse) ──
//     $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
//       (_: number, el: AnyNode) => {
//         if (result.size > 0) return;
//         try {
//           const data = JSON.parse($(el).text());
//           const findSidebars = (obj: Record<string, unknown>, depth: number): unknown => {
//             if (depth > 5) return null;
//             if (obj && typeof obj === "object") {
//               if ("sidebars" in obj) return obj.sidebars;
//               for (const val of Object.values(obj)) {
//                 const found = findSidebars(val as Record<string, unknown>, depth + 1);
//                 if (found) return found;
//               }
//             }
//             return null;
//           };
//           const sidebars = findSidebars(data, 0) as Record<string, unknown> | null;
//           if (sidebars && typeof sidebars === "object") processSidebars(sidebars);
//         } catch { /* skip */ }
//       }
//     );

//     return result;
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  STEP 3: Slug → readable title fallback
//   // ═══════════════════════════════════════════════════════════════════

//   function slugToTitle(slug: string): string {
//     return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  STEP 4: Detect tabs from HTML nav
//   // ═══════════════════════════════════════════════════════════════════

//   function detectTabs($: CheerioAPI): { name: string; path: string }[] {
//     const tabs: { name: string; path: string }[] = [];
//     const seenTabs = new Set<string>();
//     const tabPatterns: [RegExp, string][] = [
//       [/^\/?docs\/?$/, "Guides"],
//       [/^\/?reference\/?$/, "API Reference"],
//       [/^\/?changelog\/?$/, "Changelog"],
//       [/^\/?recipes\/?$/, "Recipes"],
//       [/^\/?discuss\/?$/, "Discussions"],
//     ];
//     const sel = [
//       "header a", "nav a", "[class*='Header'] a", "[class*='navbar'] a",
//       "[class*='Navbar'] a", "[class*='MobileFlyout'] a", "[class*='Flyout'] a",
//       "[class*='NavItem'] a", ".rm-Header-bottom a",
//     ].join(", ");

//     $(sel).each((_: number, el: AnyNode) => {
//       let href = ($(el).attr("href") || "").replace(/\/$/, "");
//       try {
//         if (href.startsWith("http")) {
//           const u = new URL(href);
//           if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
//         }
//       } catch { /* use as-is */ }
//       for (const [pattern, name] of tabPatterns) {
//         if (pattern.test(href) && !seenTabs.has(name)) {
//           seenTabs.add(name);
//           tabs.push({ name, path: "/" + href.replace(/^\//, "") });
//         }
//       }
//     });
//     return tabs;
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  STEP 5: Detect multi-project sites
//   // ═══════════════════════════════════════════════════════════════════

//   function detectProjects($: CheerioAPI): Set<string> {
//     const projects = new Set<string>();
//     $("header a, nav a, [class*='Header'] a").each((_: number, el: AnyNode) => {
//       const href = $(el).attr("href") || "";
//       const m = href.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
//       if (m) {
//         const slug = m[1];
//         if (!["docs", "reference", "main", "en", "v1", "v2", "v3", "v4", "v5", "beta"].includes(slug))
//           projects.add(slug);
//       }
//     });
//     return projects;
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  STEP 6: Parse sidebar from HTML DOM
//   //  ReadMe sites render sidebar as HTML <section>/<h2>/<ul>/<li>/<a>
//   //  This extracts slug→{title, group, level, order} from the DOM
//   // ═══════════════════════════════════════════════════════════════════

//   function parseDomSidebar(html: string): Map<string, Map<string, PageMeta>> {
//     const result = new Map<string, Map<string, PageMeta>>();
//     const $ = load(html);

//     // Find the sidebar container
//     const sidebarSelectors = [
//       "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
//       "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
//       "[class*='Sidebar']", "[class*='sidebar']", "aside nav",
//     ];
//     let $sidebar: Cheerio<AnyNode> | null = null;
//     for (const sel of sidebarSelectors) {
//       const $el = $(sel);
//       if ($el.length && $el.find("a").length > 3) { $sidebar = $el; break; }
//     }
//     if (!$sidebar) return result;

//     // Walk sections → each <section> or <h2> defines a group
//     const counter = { n: 0 };

//     function extractSlugAndPrefix(href: string): { prefix: string; slug: string } | null {
//       try {
//         let path = href;
//         if (href.startsWith("http")) {
//           const u = new URL(href);
//           path = u.pathname;
//         }
//         const segments = path.split("/").filter(Boolean);
//         if (segments.length < 2) return null;
//         return { prefix: segments[0], slug: segments.slice(1).join("/") };
//       } catch { return null; }
//     }

//     function walkDomSidebar(
//       $el: Cheerio<AnyNode>, group: string, depth: number
//     ) {
//       $el.children().each((_: number, child: AnyNode) => {
//         const $c = $(child);
//         const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
//         const cls = ($c.attr("class") || "").toLowerCase();

//         // Detect group headings: <h2 class="rm-Sidebar-heading">, or any h1-h6/header/category
//         if (
//           /^h[1-6]$/.test(tag) ||
//           cls.includes("sidebar-heading") ||
//           cls.includes("header") ||
//           cls.includes("category") ||
//           cls.includes("group-heading")
//         ) {
//           const text = $c.clone().children("ul,ol,li,nav,a").remove().end().text().trim();
//           if (text && text.length < 80) group = text;
//         }

//         // Links → extract metadata
//         if (tag === "a") {
//           const href = $c.attr("href") || "";
//           const title = $c.text().trim();
//           if (title && href) {
//             const extracted = extractSlugAndPrefix(href);
//             if (extracted) {
//               const { prefix, slug } = extracted;
//               if (!result.has(prefix)) result.set(prefix, new Map());
//               const lookup = result.get(prefix)!;
//               if (!lookup.has(slug)) {
//                 lookup.set(slug, { title, level: depth, group, order: counter.n++ });
//               }
//             }
//           }
//         }

//         // Recurse into nested elements
//         if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
//           const nextDepth = (tag === "ul" || tag === "ol") ? depth + 1 : depth;
//           walkDomSidebar($c, group, nextDepth);
//         }
//       });
//     }

//     walkDomSidebar($sidebar, "", 0);
//     return result;
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  STEP 7: HTML DOM fallback (no sitemap + no sidebar JSON)
//   // ═══════════════════════════════════════════════════════════════════

//   function addLink(
//     $: CheerioAPI, el: AnyNode,
//     pages: ScrapePageItem[], group: string, level: number
//   ) {
//     const href = $(el).attr("href") || "";
//     const title = $(el).text().trim();
//     if (!title || !href) return;
//     if (!href.match(/\/(docs|reference|recipes|page|changelog)\//)) return;
//     pages.push({
//       title, path: href,
//       fullUrl: href.startsWith("http") ? href : baseUrl + href,
//       level, group,
//     });
//   }

//   function walkSidebar(
//     $: CheerioAPI, $el: Cheerio<AnyNode>,
//     pages: ScrapePageItem[], group: string, depth: number
//   ) {
//     $el.children().each((_: number, child: AnyNode) => {
//       const $c = $(child);
//       const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
//       const cls = ($c.attr("class") || "").toLowerCase();
//       if (/^h[1-6]$/.test(tag) || cls.includes("header") || cls.includes("category") || cls.includes("group")) {
//         const text = $c.clone().children("ul,ol,li,nav").remove().end().text().trim();
//         if (text && text.length < 80) group = text;
//       }
//       if (tag === "a") addLink($, child, pages, group, depth);
//       if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
//         walkSidebar($, $c, pages, group, tag === "ul" || tag === "ol" ? depth + 1 : depth);
//       }
//     });
//   }

//   function parseHtmlFallback(html: string): ScrapePageItem[] {
//     const $ = load(html);
//     const pages: ScrapePageItem[] = [];
//     const selectors = [
//       "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
//       "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
//       "[class*='Sidebar']", "[class*='sidebar']", "aside nav", "aside",
//     ];
//     let $sidebar: Cheerio<AnyNode> | null = null;
//     for (const sel of selectors) {
//       const $el = $(sel);
//       if ($el.length && $el.find("a").length > 3) { $sidebar = $el; break; }
//     }
//     if ($sidebar) walkSidebar($, $sidebar, pages, "", 0);
//     if (pages.length === 0) {
//       $('a[href*="/docs/"], a[href*="/reference/"], a[href*="/changelog/"]').each(
//         (_: number, a: AnyNode) => addLink($, a, pages, "", 0)
//       );
//     }
//     const unique = new Map<string, ScrapePageItem>();
//     for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
//     return [...unique.values()];
//   }

//   // ═══════════════════════════════════════════════════════════════════
//   //  MAIN LOGIC
//   // ═══════════════════════════════════════════════════════════════════

//   try {
//     const [html, sitemapGroups] = await Promise.all([
//       fetchPage(url),
//       fetchSitemapUrls(),
//     ]);

//     if (!html) return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });

//     const $ = load(html);
//     const tabs = detectTabs($);
//     const projects = detectProjects($);

//     const out: ScrapeResult = {
//       site: new URL(url).hostname,
//       navType: "simple",
//       tabs: tabs.map(t => t.name),
//       sections: [],
//     };

//     // ── Multi-project ────────────────────────────────────────────

//     if (projects.size > 0) {
//       out.navType = "projects";
//       for (const p of projects) {
//         for (const type of ["docs", "reference"] as const) {
//           const projUrl = `${baseUrl}/${p}/${type}`;
//           const phtml = projUrl === url ? html : await fetchPage(projUrl);
//           if (!phtml) continue;
//           const pages = parseHtmlFallback(phtml);
//           if (pages.length > 0) {
//             out.sections.push({ name: `${p}/${PREFIX_TO_SECTION[type] || type}`, pages });
//           }
//         }
//       }
//     }

//     // ── Standard site ────────────────────────────────────────────

//     else {
//       out.navType = tabs.length > 0 ? "tabs" : "simple";

//       // Try sidebar JSON first, then fall back to DOM sidebar parsing
//       const sidebarLookups = parseSidebarJson(html);
//       if (sidebarLookups.size === 0) {
//         // No JSON sidebar found — parse sidebar from HTML DOM
//         const domLookups = parseDomSidebar(html);
//         for (const [k, v] of domLookups) sidebarLookups.set(k, v);
//       }

//       if (sitemapGroups.size > 0) {
//         // ── PRIMARY: Sitemap URLs + sidebar enrichment ──
//         const sectionOrder = ["docs", "reference", "changelog", "recipes", "page"];
//         const allPrefixes = [...new Set([...sectionOrder, ...sitemapGroups.keys()])];

//         for (const prefix of allPrefixes) {
//           const urls = sitemapGroups.get(prefix);
//           if (!urls || urls.length === 0) continue;
//           if (prefix === "discuss") continue;

//           const lookup = sidebarLookups.get(prefix) || new Map<string, PageMeta>();
//           const pathPrefix = `/${prefix}`;

//           const pagesUnsorted: (ScrapePageItem & { _order: number })[] = [];

//           for (const fullUrl of urls) {
//             try {
//               const u = new URL(fullUrl);
//               const slug = u.pathname.replace(`${pathPrefix}/`, "").replace(/^\//, "");
//               if (!slug) continue;

//               const meta = lookup.get(slug);
//               pagesUnsorted.push({
//                 title: meta?.title || slugToTitle(slug),
//                 path: u.pathname,
//                 fullUrl,
//                 level: meta?.level || 0,
//                 group: meta?.group || "",
//                 _order: meta?.order ?? 999999,
//               });
//             } catch { /* skip */ }
//           }

//           pagesUnsorted.sort((a, b) => {
//             if (a._order !== b._order) return a._order - b._order;
//             return a.title.localeCompare(b.title);
//           });

//           const pages: ScrapePageItem[] = pagesUnsorted.map(({ _order, ...p }) => p);

//           if (pages.length > 0) {
//             out.sections.push({ name: PREFIX_TO_SECTION[prefix] || prefix, pages });
//           }

//           // If this section had no sidebar enrichment from current page HTML,
//           // try fetching the tab's page to get its sidebar
//           if (lookup.size === 0 && pages.length > 0 && prefix !== "changelog") {
//             const tabUrl = `${baseUrl}/${prefix}`;
//             if (tabUrl !== url) {
//               const tabHtml = await fetchPage(tabUrl);
//               if (tabHtml) {
//                 const tabDomLookups = parseDomSidebar(tabHtml);
//                 const tabLookup = tabDomLookups.get(prefix);
//                 if (tabLookup && tabLookup.size > 0) {
//                   // Re-enrich pages with tab's sidebar data
//                   const sectionIdx = out.sections.length - 1;
//                   const enriched = out.sections[sectionIdx].pages.map(p => {
//                     const slug = p.path.replace(`/${prefix}/`, "");
//                     const meta = tabLookup.get(slug);
//                     if (meta) {
//                       return { ...p, title: meta.title, level: meta.level, group: meta.group };
//                     }
//                     return p;
//                   });
//                   // Re-sort by sidebar order
//                   enriched.sort((a, b) => {
//                     const slugA = a.path.replace(`/${prefix}/`, "");
//                     const slugB = b.path.replace(`/${prefix}/`, "");
//                     const orderA = tabLookup.get(slugA)?.order ?? 999999;
//                     const orderB = tabLookup.get(slugB)?.order ?? 999999;
//                     if (orderA !== orderB) return orderA - orderB;
//                     return a.title.localeCompare(b.title);
//                   });
//                   out.sections[sectionIdx].pages = enriched;
//                 }
//               }
//             }
//           }
//         }
//       } else {
//         // ── FALLBACK: No sitemap ──
//         if (sidebarLookups.size > 0) {
//           for (const [sectionKey, lookup] of sidebarLookups) {
//             const pathPrefix = `/${sectionKey}`;
//             const entries = [...lookup.entries()].sort((a, b) => a[1].order - b[1].order);
//             const pages: ScrapePageItem[] = entries.map(([slug, meta]) => ({
//               title: meta.title,
//               path: `${pathPrefix}/${slug}`,
//               fullUrl: `${baseUrl}${pathPrefix}/${slug}`,
//               level: meta.level,
//               group: meta.group,
//             }));
//             if (pages.length > 0) {
//               out.sections.push({ name: PREFIX_TO_SECTION[sectionKey] || sectionKey, pages });
//             }
//           }
//         }

//         if (out.sections.length === 0) {
//           const pages = parseHtmlFallback(html);
//           if (pages.length > 0) out.sections.push({ name: "Guides", pages });
//         }

//         // Fetch remaining tabs
//         const coveredPrefixes = new Set<string>();
//         for (const s of out.sections) {
//           for (const [prefix, name] of Object.entries(PREFIX_TO_SECTION)) {
//             if (s.name === name) coveredPrefixes.add(prefix);
//           }
//         }
//         for (const tab of tabs) {
//           const prefix = tab.path.replace(/^\//, "");
//           if (coveredPrefixes.has(prefix) || prefix === "discuss") continue;
//           const tabUrl = `${baseUrl}${tab.path}`;
//           const tabHtml = await fetchPage(tabUrl);
//           if (!tabHtml) continue;
//           const tabPages = parseHtmlFallback(tabHtml);
//           if (tabPages.length > 0) out.sections.push({ name: tab.name, pages: tabPages });
//         }
//       }
//     }

//     // ── Last resort ──────────────────────────────────────────────

//     if (out.sections.length === 0) {
//       out.navType = "fallback";
//       const pages: ScrapePageItem[] = [];
//       const seenHrefs = new Set<string>();
//       $("a").each((_: number, a: AnyNode) => {
//         const href = $(a).attr("href") || "";
//         const title = $(a).text().trim();
//         if (!title || title.length > 100 || seenHrefs.has(href)) return;
//         if (href.match(/^\/(docs|reference|recipes|page|changelog)\/.+/)) {
//           seenHrefs.add(href);
//           pages.push({ title, path: href, fullUrl: baseUrl + href, level: 0, group: "" });
//         }
//       });
//       if (pages.length > 0) out.sections.push({ name: "all", pages });
//     }

//     // ── Save locally ─────────────────────────────────────────────

//     if (SAVE_FILES) try {
//       const docsDir = join(process.cwd(), "docs");
//       if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });
//       const safeName = out.site.replace(/[^a-zA-Z0-9.-]/g, "_");
//       const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//       writeFileSync(join(docsDir, `${safeName}_${timestamp}.json`), JSON.stringify(out, null, 2));
//     } catch { /* read-only filesystem */ }

//     return NextResponse.json(out);
//   } catch (e: unknown) {
//     return NextResponse.json(
//       { error: e instanceof Error ? e.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { load, type CheerioAPI, type Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ── Toggle file saving (set false for production/Vercel) ──
const SAVE_FILES = true;

// ── Types ──────────────────────────────────────────────────
interface ScrapePageItem {
  title: string;
  path: string;
  fullUrl: string;
  level: number;
  group: string;
}

interface ScrapeResult {
  site: string;
  navType: "projects" | "tabs" | "simple" | "fallback";
  tabs: string[];
  sections: { name: string; pages: ScrapePageItem[] }[];
}

interface SidebarJsonPage {
  title?: string;
  slug?: string;
  uri?: string;
  children?: SidebarJsonPage[];
  pages?: SidebarJsonPage[];
}

const PREFIX_TO_SECTION: Record<string, string> = {
  docs: "Guides",
  reference: "API Reference",
  changelog: "Changelog",
  recipes: "Recipes",
  page: "Pages",
};

// ── Main Handler ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  let baseUrl: string;
  try {
    baseUrl = new URL(url).origin;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  };

  // ════════════════════════════════════════════════════════════
  //  UTILITIES
  // ════════════════════════════════════════════════════════════

  async function fetchPage(u: string): Promise<string | null> {
    try {
      const r = await fetch(u, { headers, redirect: "follow" });
      return r.ok ? await r.text() : null;
    } catch {
      return null;
    }
  }

  function slugToTitle(slug: string): string {
    return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
  }

  // ════════════════════════════════════════════════════════════
  //  STEP 1: Fetch sitemap.xml → discover ALL sections/URLs
  //
  //  WHY: A single page's sidebar only shows pages for THAT tab.
  //       Sitemap tells us every section that exists (docs,
  //       reference, changelog) so we know which tabs to fetch.
  // ════════════════════════════════════════════════════════════

  async function fetchSitemapUrls(): Promise<Map<string, string[]>> {
    const grouped = new Map<string, string[]>();
    const xml = await fetchPage(`${baseUrl}/sitemap.xml`);
    if (!xml) return grouped;

    const $ = load(xml, { xml: true });
    $("url > loc").each((_: number, el: AnyNode) => {
      const loc = $(el).text().trim();
      if (!loc) return;
      try {
        const u = new URL(loc);
        const segments = u.pathname.split("/").filter(Boolean);
        if (segments.length < 2) return;
        const prefix = segments[0];
        if (prefix === "discuss") return;
        if (!grouped.has(prefix)) grouped.set(prefix, []);
        grouped.get(prefix)!.push(loc);
      } catch { /* skip */ }
    });

    // Deduplicate
    for (const [key, urls] of grouped) {
      grouped.set(key, [...new Set(urls)]);
    }
    return grouped;
  }

  // ════════════════════════════════════════════════════════════
  //  STEP 2: Parse sidebar — JSON first, DOM fallback
  //
  //  Returns ScrapePageItem[] directly — no intermediate maps.
  //  JSON comes from <script> tags (ReadMe embeds sidebar data).
  //  DOM comes from walking the rendered <nav> HTML.
  // ════════════════════════════════════════════════════════════

  function walkJsonSidebar(
    nodes: SidebarJsonPage[],
    pages: ScrapePageItem[],
    group: string,
    depth: number,
    pathPrefix: string
  ) {
    for (const node of nodes) {
      const title = (node.title || "").trim();
      const slug = node.slug || node.uri || "";
      if (!title || !slug) continue;

      const path = slug.startsWith("http") || slug.startsWith("/")
        ? slug
        : `${pathPrefix}/${slug}`;
      const fullUrl = path.startsWith("http") ? path : baseUrl + path;

      pages.push({ title, path, fullUrl, level: depth, group });

      const children = node.children || node.pages || [];
      if (children.length > 0) {
        walkJsonSidebar(children, pages, group, depth + 1, pathPrefix);
      }
    }
  }

  function processSidebarData(
    sidebars: Record<string, unknown>,
    pages: ScrapePageItem[]
  ): boolean {
    for (const [sectionKey, sectionPages] of Object.entries(sidebars)) {
      if (!Array.isArray(sectionPages)) continue;
      for (const category of sectionPages as SidebarJsonPage[]) {
        const groupName = (category.title || sectionKey || "").trim();
        const children = category.pages || category.children || [];
        if (children.length > 0) {
          const prefix = `/${sectionKey}`;
          walkJsonSidebar(children, pages, groupName, 0, prefix);
        }
      }
    }
    return pages.length > 0;
  }

  function parseJsonSidebar(html: string): ScrapePageItem[] {
    const pages: ScrapePageItem[] = [];
    const $ = load(html);

    // Collect script tags that mention sidebars
    const scripts: string[] = [];
    $("script").each((_: number, el: AnyNode) => {
      const text = $(el).text();
      if (text.length > 100 && (text.includes("sidebars") || text.includes("sidebar"))) {
        scripts.push(text);
      }
    });

    // Method A: Find "sidebars": {...} or sidebars = {...} in script text
    for (const script of scripts) {
      const patterns = [/"sidebars"\s*:\s*/, /sidebars\s*=\s*/];
      for (const pattern of patterns) {
        const match = pattern.exec(script);
        if (!match) continue;

        const braceStart = match.index + match[0].length;
        if (script[braceStart] !== "{") continue;

        // Extract balanced JSON using brace counting
        const jsonStr = extractBalancedJson(script, braceStart);
        if (!jsonStr) continue;

        try {
          const sidebars = JSON.parse(jsonStr);
          if (processSidebarData(sidebars, pages)) return pages;
        } catch { /* invalid JSON, try next */ }
      }
    }

    // Method B: Search inside __NEXT_DATA__ or application/json scripts
    $('script[id="__NEXT_DATA__"], script[type="application/json"]').each(
      (_: number, el: AnyNode) => {
        if (pages.length > 0) return;
        try {
          const data = JSON.parse($(el).text());
          const sidebars = findNestedKey(data, "sidebars", 0);
          if (sidebars && typeof sidebars === "object") {
            processSidebarData(sidebars as Record<string, unknown>, pages);
          }
        } catch { /* skip */ }
      }
    );

    return pages;
  }

  // Extract balanced {...} from a string starting at `start`
  function extractBalancedJson(text: string, start: number): string | null {
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

  // Recursively search an object for a key (max 5 levels deep)
  function findNestedKey(obj: unknown, key: string, depth: number): unknown {
    if (depth > 5 || !obj || typeof obj !== "object") return null;
    if (key in (obj as Record<string, unknown>)) return (obj as Record<string, unknown>)[key];
    for (const val of Object.values(obj as Record<string, unknown>)) {
      const found = findNestedKey(val, key, depth + 1);
      if (found) return found;
    }
    return null;
  }

  // DOM sidebar fallback — walks the rendered HTML sidebar
  function parseDomSidebar(html: string): ScrapePageItem[] {
    const $ = load(html);
    const pages: ScrapePageItem[] = [];

    // Find sidebar container
    const selectors = [
      "nav.rm-Sidebar", ".rm-Sidebar", "#hub-sidebar",
      "[class*='Sidebar'] nav", "[class*='sidebar'] nav",
      "[class*='Sidebar']", "[class*='sidebar']",
      "aside nav", "aside",
    ];
    let $sidebar: Cheerio<AnyNode> | null = null;
    for (const sel of selectors) {
      const $el = $(sel);
      if ($el.length && $el.find("a").length > 3) { $sidebar = $el; break; }
    }

    if ($sidebar) {
      walkDomSidebar($, $sidebar, pages, "", 0);
    }

    // If sidebar is empty, grab any doc/reference links on the page
    if (pages.length === 0) {
      $('a[href*="/docs/"], a[href*="/reference/"], a[href*="/changelog/"]').each(
        (_: number, a: AnyNode) => {
          const href = $(a).attr("href") || "";
          const title = $(a).text().trim();
          if (title && href && href.match(/\/(docs|reference|recipes|page|changelog)\//)) {
            pages.push({
              title,
              path: href,
              fullUrl: href.startsWith("http") ? href : baseUrl + href,
              level: 0,
              group: "",
            });
          }
        }
      );
    }

    // Deduplicate
    const unique = new Map<string, ScrapePageItem>();
    for (const p of pages) if (!unique.has(p.path)) unique.set(p.path, p);
    return [...unique.values()];
  }

  function walkDomSidebar(
    $: CheerioAPI,
    $el: Cheerio<AnyNode>,
    pages: ScrapePageItem[],
    group: string,
    depth: number
  ) {
    $el.children().each((_: number, child: AnyNode) => {
      const $c = $(child);
      const tag = ((child as { tagName?: string }).tagName || "").toLowerCase();
      const cls = ($c.attr("class") || "").toLowerCase();

      // Detect group headings
      if (
        /^h[1-6]$/.test(tag) ||
        cls.includes("header") || cls.includes("category") ||
        cls.includes("group") || cls.includes("sidebar-heading")
      ) {
        const text = $c.clone().children("ul,ol,li,nav,a").remove().end().text().trim();
        if (text && text.length < 80) group = text;
      }

      // Extract links
      if (tag === "a") {
        const href = $c.attr("href") || "";
        const title = $c.text().trim();
        if (title && href && href.match(/\/(docs|reference|recipes|page|changelog)\//)) {
          pages.push({
            title,
            path: href,
            fullUrl: href.startsWith("http") ? href : baseUrl + href,
            level: depth,
            group,
          });
        }
      }

      // Recurse into child elements
      if (["ul", "ol", "li", "div", "nav", "section", "span"].includes(tag)) {
        const nextDepth = (tag === "ul" || tag === "ol") ? depth + 1 : depth;
        walkDomSidebar($, $c, pages, group, nextDepth);
      }
    });
  }

  // Combined: try JSON first, fall back to DOM
  function parseSidebar(html: string): ScrapePageItem[] {
    const jsonPages = parseJsonSidebar(html);
    if (jsonPages.length > 0) return jsonPages;
    return parseDomSidebar(html);
  }

  // ════════════════════════════════════════════════════════════
  //  STEP 3: Detect navigation type from HTML
  // ════════════════════════════════════════════════════════════

  function detectTabs($: CheerioAPI): { name: string; path: string }[] {
    const tabs: { name: string; path: string }[] = [];
    const seen = new Set<string>();

    const tabPatterns: [RegExp, string][] = [
      [/^\/?docs\/?$/, "Guides"],
      [/^\/?reference\/?$/, "API Reference"],
      [/^\/?changelog\/?$/, "Changelog"],
      [/^\/?recipes\/?$/, "Recipes"],
    ];

    const sel = [
      "header a", "nav a", "[class*='Header'] a", "[class*='navbar'] a",
      "[class*='Navbar'] a", "[class*='MobileFlyout'] a", "[class*='Flyout'] a",
      "[class*='NavItem'] a", ".rm-Header-bottom a",
    ].join(", ");

    $(sel).each((_: number, el: AnyNode) => {
      let href = ($(el).attr("href") || "").replace(/\/$/, "");
      try {
        if (href.startsWith("http")) {
          const u = new URL(href);
          if (u.origin === baseUrl) href = u.pathname.replace(/\/$/, "");
        }
      } catch { /* use as-is */ }

      for (const [pattern, name] of tabPatterns) {
        if (pattern.test(href) && !seen.has(name)) {
          seen.add(name);
          tabs.push({ name, path: "/" + href.replace(/^\//, "") });
        }
      }
    });
    return tabs;
  }

  function detectProjects($: CheerioAPI): Set<string> {
    const projects = new Set<string>();
    const ignored = ["docs", "reference", "main", "en", "v1", "v2", "v3", "v4", "v5", "beta"];

    $("header a, nav a, [class*='Header'] a").each((_: number, el: AnyNode) => {
      const href = $(el).attr("href") || "";
      const m = href.match(/^\/([\w-]+)\/(docs|reference)\/?$/);
      if (m && !ignored.includes(m[1])) projects.add(m[1]);
    });
    return projects;
  }

  // ════════════════════════════════════════════════════════════
  //  MAIN LOGIC
  //
  //  Flow:
  //    1. Fetch page HTML + sitemap in parallel
  //    2. Detect nav type: projects / tabs / simple
  //    3. Based on type:
  //       - projects → fetch each project's docs & reference
  //       - tabs     → fetch each tab page, parse its sidebar
  //                    + use sitemap to find sections tabs missed
  //       - simple   → parse current page sidebar
  //    4. Last resort → scan all <a> tags
  // ════════════════════════════════════════════════════════════

  try {
    const [html, sitemapGroups] = await Promise.all([
      fetchPage(url),
      fetchSitemapUrls(),
    ]);

    if (!html) return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });

    const $ = load(html);
    const tabs = detectTabs($);
    const projects = detectProjects($);

    const out: ScrapeResult = {
      site: new URL(url).hostname,
      navType: "simple",
      tabs: tabs.map((t) => t.name),
      sections: [],
    };

    // ── Multi-project sites ────────────────────────────────
    if (projects.size > 0) {
      out.navType = "projects";
      for (const p of projects) {
        for (const type of ["docs", "reference"] as const) {
          const projUrl = `${baseUrl}/${p}/${type}`;
          const phtml = projUrl === url ? html : await fetchPage(projUrl);
          if (!phtml) continue;
          const pages = parseSidebar(phtml);
          if (pages.length > 0) {
            out.sections.push({
              name: `${p}/${PREFIX_TO_SECTION[type] || type}`,
              pages,
            });
          }
        }
      }
    }

    // ── Tab-based or simple sites ──────────────────────────
    else {
      out.navType = tabs.length > 0 ? "tabs" : "simple";

      // Build list of sections to fetch
      // Start with tabs found in nav
      const toFetch = new Map<string, string>(); // prefix → url

      if (tabs.length > 0) {
        for (const t of tabs) {
          const prefix = t.path.replace(/^\//, "");
          toFetch.set(prefix, `${baseUrl}${t.path}`);
        }
      } else {
        // Simple site — just use the current URL
        const segments = new URL(url).pathname.split("/").filter(Boolean);
        const prefix = segments[0] || "docs";
        toFetch.set(prefix, url);
      }

      // Use sitemap to discover sections that tabs might have missed
      // (e.g., /changelog exists but has no nav tab)
      if (sitemapGroups.size > 0) {
        for (const prefix of sitemapGroups.keys()) {
          if (prefix === "discuss") continue;
          if (!toFetch.has(prefix)) {
            toFetch.set(prefix, `${baseUrl}/${prefix}`);
          }
        }
      }

      // Fetch each section and parse its sidebar
      for (const [prefix, sectionUrl] of toFetch) {
        const shtml = sectionUrl === url ? html : await fetchPage(sectionUrl);
        if (!shtml) continue;

        let pages = parseSidebar(shtml);

        // If sidebar gave us nothing but sitemap has URLs for this section,
        // create pages from sitemap URLs (with slug-based titles)
        if (pages.length === 0 && sitemapGroups.has(prefix)) {
          const sitemapUrls = sitemapGroups.get(prefix)!;
          pages = sitemapUrls.map((fullUrl) => {
            try {
              const u = new URL(fullUrl);
              const slug = u.pathname.replace(`/${prefix}/`, "").replace(/^\//, "");
              if (!slug) return null;
              return {
                title: slugToTitle(slug),
                path: u.pathname,
                fullUrl,
                level: 0,
                group: "",
              };
            } catch {
              return null;
            }
          }).filter(Boolean) as ScrapePageItem[];
        }

        if (pages.length > 0) {
          out.sections.push({
            name: PREFIX_TO_SECTION[prefix] || prefix,
            pages,
          });
        }
      }
    }

    // ── Last resort: scan all links on page ────────────────
    if (out.sections.length === 0) {
      out.navType = "fallback";
      const pages: ScrapePageItem[] = [];
      const seenHrefs = new Set<string>();

      $("a").each((_: number, a: AnyNode) => {
        const href = $(a).attr("href") || "";
        const title = $(a).text().trim();
        if (!title || title.length > 100 || seenHrefs.has(href)) return;
        if (href.match(/^\/(docs|reference|recipes|page|changelog)\/.+/)) {
          seenHrefs.add(href);
          pages.push({ title, path: href, fullUrl: baseUrl + href, level: 0, group: "" });
        }
      });

      if (pages.length > 0) out.sections.push({ name: "all", pages });
    }

    // ── Save locally ───────────────────────────────────────
    if (SAVE_FILES) try {
      const docsDir = join(process.cwd(), "docs");
      if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });
      const safeName = out.site.replace(/[^a-zA-Z0-9.-]/g, "_");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      writeFileSync(
        join(docsDir, `${safeName}_${timestamp}.json`),
        JSON.stringify(out, null, 2)
      );
    } catch { /* read-only filesystem on serverless */ }

    return NextResponse.json(out);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
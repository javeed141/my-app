// ═══════════════════════════════════════════════════════════
//  STEP 5 — fetcher.js (Fetch All Pages as Markdown)
//
//  IMPORTS FROM: types.js (Step 1)
//  RECEIVES FROM: links.js (Step 4) — sections with page URLs
//  USED BY: writer.js (Step 7), route.js (Step 8)
//
//  ReadMe.com serves raw markdown at {pageUrl}.md
//  e.g. https://docs.lithic.com/docs/welcome.md
//
//  This is WAY better than fetching HTML and extracting content
//  because we get the actual source markdown with ReadMe's
//  custom block syntax ([block:image], [block:callout], etc.)
//
//  EXPORTS:
//    fetchAllPages(sections, options?)
//      → { pages: [{ ...page, markdown, status }], stats }
// ═══════════════════════════════════════════════════════════

import { fetchPage } from "./types.js";

// ════════════════════════════════════════════════════════════
//  CONCURRENCY POOL
//
//  Runs async tasks with a max number in flight at once.
//  Without this, 200 pages = 200 simultaneous requests =
//  server blocks us or our process runs out of sockets.
//
//  INPUT:
//    tasks     — [() => Promise<T>]
//    limit     — max concurrent (default 5)
//    onProgress — optional callback(completed, total)
//
//  OUTPUT:
//    T[]  — results in same order as input tasks
// ════════════════════════════════════════════════════════════

async function pool(tasks, limit, onProgress) {
  const results = new Array(tasks.length);
  let next = 0;
  let completed = 0;

  async function worker() {
    while (next < tasks.length) {
      const idx = next++;
      try {
        results[idx] = await tasks[idx]();
      } catch (err) {
        results[idx] = { _error: err?.message || String(err) };
      }
      completed++;
      if (onProgress) onProgress(completed, tasks.length);
    }
  }

  const workers = [];
  for (let i = 0; i < Math.min(limit, tasks.length); i++) {
    workers.push(worker());
  }
  await Promise.all(workers);
  return results;
}

// ════════════════════════════════════════════════════════════
//  FETCH ALL PAGES (as Markdown)
//
//  Appends .md to each fullUrl and fetches raw markdown.
//
//  INPUT:
//    sections — [{ name, pages: [{ title, slug, path, fullUrl, ... }] }]
//    options  — { concurrency: 5, delayMs: 200 }
//
//  OUTPUT:
//    {
//      pages: [
//        {
//          section, title, slug, path, fullUrl, level, group,
//          mdUrl: "https://.../docs/welcome.md",
//          markdown: "# Welcome\n...",  ← raw markdown or null
//          status: "ok" | "error",
//          error: undefined | "fetch_failed",
//          fetchMs: 342,
//        }
//      ],
//      stats: { total, ok, errors, totalFetchMs }
//    }
// ════════════════════════════════════════════════════════════

export async function fetchAllPages(sections, options = {}) {
  const {
    concurrency = 5,
    delayMs = 200,
  } = options;

  // Flatten all pages, tag with section name
  const allPages = [];
  for (const section of sections) {
    for (const page of section.pages) {
      allPages.push({ section: section.name, ...page });
    }
  }

  if (allPages.length === 0) {
    return { pages: [], stats: { total: 0, ok: 0, errors: 0, totalFetchMs: 0 } };
  }

  // Build tasks — each fetches {fullUrl}.md
  let taskIndex = 0;
  const tasks = allPages.map((page) => {
    const myIndex = taskIndex++;
    return async () => {
      // Stagger to avoid burst
      if (delayMs > 0 && myIndex > 0) {
        await new Promise((r) => setTimeout(r, delayMs * (myIndex % concurrency)));
      }

      // ReadMe serves markdown at {url}.md
      const mdUrl = page.fullUrl.replace(/\/$/, "") + ".md";
      const start = Date.now();
      let markdown = await fetchPage(mdUrl);
      const fetchMs = Date.now() - start;

      // Some sites return HTML instead of markdown at .md URLs
      // Detect and reject HTML responses
      if (markdown) {
        const trimmed = markdown.trimStart().substring(0, 50).toLowerCase();
        if (trimmed.startsWith("<!doctype") || trimmed.startsWith("<html")) {
          markdown = null;
        }
      }

      return {
        section: page.section,
        title: page.title,
        slug: page.slug,
        path: page.path,
        fullUrl: page.fullUrl,
        level: page.level,
        group: page.group,
        mdUrl,
        markdown,
        status: markdown ? "ok" : "error",
        error: markdown ? undefined : markdown === null ? "html_not_markdown" : "fetch_failed",
        fetchMs,
      };
    };
  });

  const startTotal = Date.now();
  const results = await pool(tasks, concurrency);
  const totalFetchMs = Date.now() - startTotal;

  // Handle pool-level errors
  const pages = results.map((r, i) => {
    if (r && r._error) {
      return {
        section: allPages[i].section,
        title: allPages[i].title,
        slug: allPages[i].slug,
        path: allPages[i].path,
        fullUrl: allPages[i].fullUrl,
        level: allPages[i].level,
        group: allPages[i].group,
        mdUrl: allPages[i].fullUrl.replace(/\/$/, "") + ".md",
        markdown: null,
        status: "error",
        error: r._error,
        fetchMs: 0,
      };
    }
    return r;
  });

  const ok = pages.filter((p) => p.status === "ok").length;
  const errors = pages.filter((p) => p.status === "error").length;

  return {
    pages,
    stats: { total: pages.length, ok, errors, totalFetchMs },
  };
}

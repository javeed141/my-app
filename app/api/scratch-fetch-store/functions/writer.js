// ═══════════════════════════════════════════════════════════
//  STEP 7 — writer.js (Save Pages to Disk)
//
//  RECEIVES FROM: fetcher.js (Step 5) — pages with markdown
//  USED BY: route.js (Step 8)
//
//  OUTPUTS:
//
//  1. Manifest JSON in separate folder:
//     docs/json-files/{hostname}_{timestamp}.json
//     Format: { site, navType, tabs, sections: [{ name, pages: [{ title, path, fullUrl, level, group }] }] }
//
//  2. Markdown files organized by tab:
//     docs/{hostname}/Guides/getting-started.md
//     docs/{hostname}/API Reference/create-card.md
//
//  EXPORTS:
//    savePages(fetchResult, hostname, siteType, tabs)
// ═══════════════════════════════════════════════════════════

import { promises as fs } from "fs";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "docs");

function sanitize(name) {
  return name
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function slugToFilename(pagePath) {
  const segments = pagePath.split("/").filter(Boolean);
  const slug = segments[segments.length - 1] || "index";
  return sanitize(slug) + ".md";
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export async function savePages(fetchResult, hostname, siteType, tabs, versions = null) {
  const siteDir = path.join(DOCS_DIR, sanitize(hostname));
  const errors = [];
  let fileCount = 0;

  await fs.mkdir(DOCS_DIR, { recursive: true });
  await fs.mkdir(siteDir, { recursive: true });

  // Group pages by section
  const sectionMap = new Map();
  for (const page of fetchResult.pages) {
    if (!sectionMap.has(page.section)) sectionMap.set(page.section, []);
    sectionMap.get(page.section).push(page);
  }

  // Build manifest — EXACT same format as existing JSON files
  // Only: title, path, fullUrl, level, group per page
  const manifest = {
    site: hostname,
    navType: siteType,
    tabs: tabs || [],
    ...(versions && versions.hasVersions ? {
      versions: {
        current: versions.currentVersion,
        all: versions.allVersions,
      },
    } : {}),
    sections: [],
  };

  const sectionSummary = [];

  for (const [sectionName, pages] of sectionMap) {
    // For multi-project sections like "payments/Guides",
    // split on "/" to create nested folders: {site}/payments/Guides/
    const parts = sectionName.split("/").map(sanitize);
    const folderName = parts.join(path.sep);
    const sectionDir = path.join(siteDir, ...parts);
    await fs.mkdir(sectionDir, { recursive: true });

    const sectionPages = [];
    let written = 0;

    for (const page of pages) {
      const filename = slugToFilename(page.path);
      const filePath = path.join(sectionDir, filename);

      // Write .md file (fetched from {url}.md)
      if (page.status === "ok" && page.markdown) {
        try {
          await fs.writeFile(filePath, page.markdown, "utf-8");
          fileCount++;
          written++;
        } catch (err) {
          errors.push(`${page.slug}: ${err.message}`);
        }
      }

      // Manifest entry — only these 5 fields, nothing extra
      sectionPages.push({
        title: page.title,
        path: page.path,
        fullUrl: page.fullUrl,
        level: page.level,
        group: page.group,
      });
    }

    manifest.sections.push({
      name: sectionName,
      pages: sectionPages,
    });

    sectionSummary.push({
      name: sectionName,
      folder: folderName,
      written,
      total: pages.length,
    });
  }

  // Save manifest in separate json-files folder: docs/json-files/{hostname}_{timestamp}.json
  const jsonDir = path.join(DOCS_DIR, "json-files");
  await fs.mkdir(jsonDir, { recursive: true });
  const manifestFilename = `${sanitize(hostname)}_${timestamp()}.json`;
  const manifestPath = path.join(jsonDir, manifestFilename);
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

  return {
    outputDir: siteDir,
    manifestPath,
    manifestFilename,
    fileCount,
    errors,
    sections: sectionSummary,
  };
}

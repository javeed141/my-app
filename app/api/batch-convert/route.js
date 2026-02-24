import { NextResponse } from "next/server";
import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { convert, countPages } from "../../converter/convert.js";

const DOCS_DIR = join(process.cwd(), "docs");
const OUTPUT_DIR = join(process.cwd(), "documentation");

export async function POST() {
  try {
    // 1. Read all JSON files from docs/
    if (!existsSync(DOCS_DIR)) {
      return NextResponse.json(
        { error: "docs/ folder does not exist" },
        { status: 404 }
      );
    }

    const files = (await readdir(DOCS_DIR)).filter(
      (f) => f.endsWith(".json") && !f.startsWith("_")
    );

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No JSON files found in docs/" },
        { status: 404 }
      );
    }

    // 2. Ensure output dir exists
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true });
    }

    // 3. Convert each file
    const results = [];

    for (const file of files) {
      const filePath = join(DOCS_DIR, file);
      try {
        const raw = await readFile(filePath, "utf-8");
        const source = JSON.parse(raw);

        // Skip files that aren't scrape results (no site/sections)
        if (!source.site || !source.sections) {
          results.push({
            file,
            status: "skipped",
            reason: "Not a scrape result (missing site/sections)",
          });
          continue;
        }

        const output = convert(source);
        const pages = countPages(output.navigation);

        // Save to documentation/{name}_docs.json
        const safeName = output.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const outFileName = `${safeName}_docs.json`;
        const outPath = join(OUTPUT_DIR, outFileName);

        await writeFile(outPath, JSON.stringify(output, null, 2), "utf-8");

        results.push({
          file,
          status: "ok",
          outputFile: outFileName,
          name: output.name,
          navType: source.navType,
          pages,
        });
      } catch (err) {
        results.push({
          file,
          status: "error",
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    const ok = results.filter((r) => r.status === "ok");
    const failed = results.filter((r) => r.status === "error");
    const skipped = results.filter((r) => r.status === "skipped");

    return NextResponse.json({
      total: files.length,
      converted: ok.length,
      failed: failed.length,
      skipped: skipped.length,
      results,
    });
  } catch (e) {
    console.error("[batch-convert] Error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

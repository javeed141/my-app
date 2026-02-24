import { NextResponse } from "next/server";

import { isUrlAllowed, fetchRaw } from "./functions/types.js";
import { extractFrontmatter } from "./functions/frontmatter.js";
import {
  convertBlockquoteCallouts,
  convertJsxCallouts,
  convertAccordions,
  convertCards,
  convertColumnsLayout,
  convertCodeGroups,
  convertEmbeds,
  fixImages,
  convertIcons,
  convertBlockSyntax,
} from "./functions/converters.js";
import {
  removeImports,
  removeExports,
  removeReadmeCssClasses,
  fixHeadingHierarchy,
  fixHtmlComments,
  fixVoidElements,
  fixAngleBrackets,
  fixCurlyBraces,
  collapseBlankLines,
  scanUnknownComponents,
} from "./functions/cleanup.js";

// Pipeline order matters — do not reorder
//
// Phase 1: Convert ReadMe components to Documentation.AI equivalents
// Phase 2: Strip ReadMe-specific artifacts (imports, exports, CSS classes)
// Phase 3: Fix MDX syntax issues (must run last)

const CONVERTER_PIPELINE = [
  // Phase 1 — Component conversion
  convertBlockSyntax,
  convertBlockquoteCallouts,
  convertJsxCallouts,
  convertAccordions,
  convertCards,
  convertColumnsLayout,
  convertCodeGroups,
  convertEmbeds,
  convertIcons,
  fixImages,
  // Phase 2 — Cleanup
  removeImports,
  removeExports,
  removeReadmeCssClasses,
  fixHeadingHierarchy,
  // Phase 3 — MDX safety
  fixHtmlComments,
  fixVoidElements,
  fixAngleBrackets,
  fixCurlyBraces,
  collapseBlankLines,
];

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url, mdx: rawMdxInput } = body;

  if (!url && !rawMdxInput) {
    return NextResponse.json(
      { error: 'Either "url" or "mdx" field is required' },
      { status: 400 }
    );
  }

  try {
    let rawMdx;

    if (url) {
      if (typeof url !== "string") {
        return NextResponse.json(
          { error: "URL must be a string" },
          { status: 400 }
        );
      }
      if (!isUrlAllowed(url)) {
        return NextResponse.json(
          { error: "URL not allowed" },
          { status: 403 }
        );
      }
      rawMdx = await fetchRaw(url);
      if (!rawMdx) {
        return NextResponse.json(
          { error: "Failed to fetch URL" },
          { status: 502 }
        );
      }
    } else {
      if (typeof rawMdxInput !== "string") {
        return NextResponse.json(
          { error: "mdx must be a string" },
          { status: 400 }
        );
      }
      rawMdx = rawMdxInput;
    }

    // Step 1: Extract and clean frontmatter
    const {
      frontmatter,
      frontmatterStr,
      body: mdxBody,
      removedFields,
    } = extractFrontmatter(rawMdx);

    // Step 2: Run converter pipeline
    const allChanges = [];
    let content = mdxBody;

    for (const converter of CONVERTER_PIPELINE) {
      const result = converter(content);
      content = result.content;
      allChanges.push(...result.changes);
    }

    // Step 3: Flag unknown components with comments
    const { unknowns, warnings } = scanUnknownComponents(content);

    if (warnings.length > 0) {
      content = warnings.join("\n") + "\n\n" + content;
    }

    // Step 4: Reassemble frontmatter + body
    const converted = frontmatterStr
      ? `${frontmatterStr}\n\n${content.trim()}\n`
      : `${content.trim()}\n`;

    // Step 5: Build change report
    if (removedFields.length > 0) {
      allChanges.unshift({
        type: "frontmatter",
        count: removedFields.length,
        detail: `removed fields: ${removedFields.join(", ")}`,
      });
    }
    console.log(frontmatter + frontmatterStr)
    return NextResponse.json({
      original: rawMdx,
      converted,
      frontmatter: frontmatter || {},
      changes: allChanges,
      warnings,
      stats: {
        originalLength: rawMdx.length,
        convertedLength: converted.length,
        totalChanges: allChanges.reduce((sum, c) => sum + c.count, 0),
        unknownComponents: unknowns.size,
      },
    });
  } catch (e) {
    console.error("[converter] Unhandled error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
// import { NextResponse } from "next/server";

// import { isUrlAllowed, fetchRaw } from "./functions/types.js";
// import { extractFrontmatter } from "./functions/frontmatter.js";
// import { downloadAndReplaceImages } from "./functions/images.js";
// import {
//   convertBlockquoteCallouts,
//   convertJsxCallouts,
//   convertAccordions,
//   convertCodeGroups,
//   convertEmbeds,
//   fixImages,
//   convertIcons,
//   convertCards,
//   convertBlockSyntax,
// } from "./functions/converters.js";
// import {
//   removeImports,
//   removeExports,
//   removeReadmeCssClasses,
//   fixHeadingHierarchy,
//   fixHtmlComments,
//   fixVoidElements,
//   fixAngleBrackets,
//   fixCurlyBraces,
//   collapseBlankLines,
//   scanUnknownComponents,
// } from "./functions/cleanup.js";

// // ════════════════════════════════════════════════════════════
// //  ROUTE HANDLER — POST /api/convert
// // ════════════════════════════════════════════════════════════

// // ── Pipeline order (CRITICAL — do not reorder) ───────────────
// //
// //  Phase 1: Component conversion
// //    convertBlockSyntax         [block:xxx] JSON → MDX components/tables
// //    convertBlockquoteCallouts  > 📘 / > ## 📘 → <Callout>
// //    convertJsxCallouts         <Callout type=...> → kind=...
// //    convertAccordions          <Accordion> → <Expandable>
// //    convertCards               <Cards> → <CardGroup>
// //    convertCodeGroups          consecutive code blocks → <CodeGroup>
// //    convertEmbeds              @embed / [block:embed] → <iframe>
// //    convertIcons               fa-rocket → rocket (Lucide)
// //    fixImages                  add alt text, remove align/border
// //
// //  Phase 2: Cleanup
// //    removeImports              strip import statements
// //    removeExports              strip export declarations
// //    removeReadmeCssClasses     strip rm-* class names
// //    fixHeadingHierarchy        bump headings if needed
// //
// //  Phase 3: MDX safety (MUST run last)
// //    fixHtmlComments          <!-- --> → {/* */}
// //    fixVoidElements          <br> → <br/>  (MDX requires self-close)
// //    fixAngleBrackets         <URL> → `<URL>`, <https://> → [link](link)
// //    fixCurlyBraces           bare { } → \{ \} (MDX treats as JSX)
// //    collapseBlankLines       3+ blank lines → 2

// const CONVERTER_PIPELINE = [
//   // Phase 1
//   convertBlockSyntax,
//   convertBlockquoteCallouts,
//   convertJsxCallouts,
//   convertAccordions,
//   convertCards,
//   convertCodeGroups,
//   convertEmbeds,
//   convertIcons,
//   fixImages,
//   // Phase 2
//   removeImports,
//   removeExports,
//   removeReadmeCssClasses,
//   fixHeadingHierarchy,
//   // Phase 3 — MDX safety (MUST run last)
//   fixHtmlComments,
//   fixVoidElements,
//   fixAngleBrackets,
//   fixCurlyBraces,
//   collapseBlankLines,
// ];

// export async function POST(req) {
//   let body;
//   try {
//     body = await req.json();
//   } catch {
//     return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//   }

//   const { url, mdx: rawMdxInput } = body;

//   if (!url && !rawMdxInput) {
//     return NextResponse.json(
//       { error: 'Either "url" or "mdx" field is required' },
//       { status: 400 }
//     );
//   }

//   try {
//     let rawMdx;

//     if (url) {
//       if (typeof url !== "string") {
//         return NextResponse.json({ error: "URL must be a string" }, { status: 400 });
//       }
//       if (!isUrlAllowed(url)) {
//         return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
//       }
//       rawMdx = await fetchRaw(url);
//       if (!rawMdx) {
//         return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });
//       }
//     } else {
//       if (typeof rawMdxInput !== "string") {
//         return NextResponse.json({ error: "mdx must be a string" }, { status: 400 });
//       }
//       rawMdx = rawMdxInput;
//     }

//     // Step 1: Extract and clean frontmatter
//     const { frontmatter, frontmatterStr, body: mdxBody, removedFields } = extractFrontmatter(rawMdx);

//     // Step 2: Run converter pipeline
//     const allChanges = [];
//     let content = mdxBody;

//     for (const converter of CONVERTER_PIPELINE) {
//       const result = converter(content);
//       content = result.content;
//       allChanges.push(...result.changes);
//     }

//     // Step 3: Scan for unknown components and add comments
//     const { unknowns, warnings } = scanUnknownComponents(content);

//     // Insert comment at top of file for any unknown components
//     if (warnings.length > 0) {
//       const commentBlock = warnings.join("\n");
//       content = commentBlock + "\n\n" + content;
//     }

//     // Step 4: Download images and replace URLs with local paths
//     // ReadMe's CDN (files.readme.io) blocks hotlinking, so images
//     // won't display unless we download them.
//     const imageResult = await downloadAndReplaceImages(content);
//     content = imageResult.content;

//     if (imageResult.failed.length > 0) {
//       allChanges.push({
//         type: "image-download-failed",
//         count: imageResult.failed.length,
//         detail: `failed to download: ${imageResult.failed.join(", ")}`,
//       });
//     }
//     if (imageResult.images.length > 0) {
//       allChanges.push({
//         type: "image-download",
//         count: imageResult.images.length,
//         detail: `downloaded ${imageResult.images.length} images (${imageResult.images.reduce((s, i) => s + i.size, 0)} bytes)`,
//       });
//     }

//     // Step 5: Reassemble
//     const converted = frontmatterStr
//       ? `${frontmatterStr}\n\n${content.trim()}\n`
//       : `${content.trim()}\n`;

//     // Step 6: Build change report
//     if (removedFields.length > 0) {
//       allChanges.unshift({
//         type: "frontmatter",
//         count: removedFields.length,
//         detail: `removed fields: ${removedFields.join(", ")}`,
//       });
//     }

//     return NextResponse.json({
//       original: rawMdx,
//       converted,
//       frontmatter: frontmatter || {},
//       changes: allChanges,
//       warnings,
//       images: imageResult.images.map((img) => ({
//         filename: img.filename,
//         base64: img.base64,
//         mimeType: img.mimeType,
//         originalUrl: img.originalUrl,
//         size: img.size,
//       })),
//       stats: {
//         originalLength: rawMdx.length,
//         convertedLength: converted.length,
//         totalChanges: allChanges.reduce((sum, c) => sum + c.count, 0),
//         unknownComponents: unknowns.size,
//         imagesDownloaded: imageResult.images.length,
//         imagesFailed: imageResult.failed.length,
//       },
//     });
//   } catch (e) {
//     console.error("[converter] Unhandled error:", e);
//     return NextResponse.json(
//       { error: e instanceof Error ? e.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

import { isUrlAllowed, fetchRaw } from "./functions/types.js";
import { extractFrontmatter } from "./functions/frontmatter.js";
import { downloadAndReplaceImages } from "./functions/images.js";
import {
  convertBlockquoteCallouts,
  convertJsxCallouts,
  convertAccordions,
  convertCodeGroups,
  convertEmbeds,
  fixImages,
  convertIcons,
  convertCards,
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

// ════════════════════════════════════════════════════════════
//  ROUTE HANDLER — POST /api/convert
// ════════════════════════════════════════════════════════════

// ── Pipeline order (CRITICAL — do not reorder) ───────────────
//
//  Phase 1: Component conversion
//    convertBlockSyntax         [block:xxx] JSON → MDX components/tables
//    convertBlockquoteCallouts  > 📘 / > ## 📘 → <Callout>
//    convertJsxCallouts         <Callout type=...> → kind=...
//    convertAccordions          <Accordion> → <Expandable>
//    convertCards               <Cards> → <CardGroup>
//    convertCodeGroups          consecutive code blocks → <CodeGroup>
//    convertEmbeds              @embed / [block:embed] → <iframe>
//    convertIcons               fa-rocket → rocket (Lucide)
//    fixImages                  add alt text, remove align/border
//
//  Phase 2: Cleanup
//    removeImports              strip import statements
//    removeExports              strip export declarations
//    removeReadmeCssClasses     strip rm-* class names
//    fixHeadingHierarchy        bump headings if needed
//
//  Phase 3: MDX safety (MUST run last)
//    fixHtmlComments          <!-- --> → {/* */}
//    fixVoidElements          <br> → <br/>  (MDX requires self-close)
//    fixAngleBrackets         <URL> → `<URL>`, <https://> → [link](link)
//    fixCurlyBraces           bare { } → \{ \} (MDX treats as JSX)
//    collapseBlankLines       3+ blank lines → 2

const CONVERTER_PIPELINE = [
  // Phase 1
  convertBlockSyntax,
  convertBlockquoteCallouts,
  convertJsxCallouts,
  convertAccordions,
  convertCards,
  convertCodeGroups,
  convertEmbeds,
  convertIcons,
  fixImages,
  // Phase 2
  removeImports,
  removeExports,
  removeReadmeCssClasses,
  fixHeadingHierarchy,
  // Phase 3 — MDX safety (MUST run last)
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
        return NextResponse.json({ error: "URL must be a string" }, { status: 400 });
      }
      if (!isUrlAllowed(url)) {
        return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
      }
      rawMdx = await fetchRaw(url);
      if (!rawMdx) {
        return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });
      }
    } else {
      if (typeof rawMdxInput !== "string") {
        return NextResponse.json({ error: "mdx must be a string" }, { status: 400 });
      }
      rawMdx = rawMdxInput;
    }

    // Step 1: Extract and clean frontmatter
    const { frontmatter, frontmatterStr, body: mdxBody, removedFields } = extractFrontmatter(rawMdx);

    // Step 2: Run converter pipeline
    const allChanges = [];
    let content = mdxBody;

    for (const converter of CONVERTER_PIPELINE) {
      const result = converter(content);
      content = result.content;
      allChanges.push(...result.changes);
    }

    // Step 3: Scan for unknown components and add comments
    const { unknowns, warnings } = scanUnknownComponents(content);

    // Insert comment at top of file for any unknown components
    if (warnings.length > 0) {
      const commentBlock = warnings.join("\n");
      content = commentBlock + "\n\n" + content;
    }

    // Step 4: Download images and replace URLs with local paths
    // ReadMe's CDN (files.readme.io) blocks hotlinking, so images
    // won't display unless we download them.
    const imageResult = await downloadAndReplaceImages(content);
    content = imageResult.content;

    if (imageResult.failed.length > 0) {
      allChanges.push({
        type: "image-download-failed",
        count: imageResult.failed.length,
        detail: `failed to download: ${imageResult.failed.join(", ")}`,
      });
    }
    if (imageResult.images.length > 0) {
      allChanges.push({
        type: "image-download",
        count: imageResult.images.length,
        detail: `downloaded ${imageResult.images.length} images (${imageResult.images.reduce((s, i) => s + i.size, 0)} bytes)`,
      });
    }

    // Step 5: Reassemble
    const converted = frontmatterStr
      ? `${frontmatterStr}\n\n${content.trim()}\n`
      : `${content.trim()}\n`;

    // Step 6: Build change report
    if (removedFields.length > 0) {
      allChanges.unshift({
        type: "frontmatter",
        count: removedFields.length,
        detail: `removed fields: ${removedFields.join(", ")}`,
      });
    }

    return NextResponse.json({
      original: rawMdx,
      converted,
      frontmatter: frontmatter || {},
      changes: allChanges,
      warnings,
      images: imageResult.images.map((img) => ({
        filename: img.filename,
        mimeType: img.mimeType,
        originalUrl: img.originalUrl,
        size: img.size,
        localPath: img.localPath,
      })),
      imageOutputDir: imageResult.outputDir,
      stats: {
        originalLength: rawMdx.length,
        convertedLength: converted.length,
        totalChanges: allChanges.reduce((sum, c) => sum + c.count, 0),
        unknownComponents: unknowns.size,
        imagesDownloaded: imageResult.images.length,
        imagesFailed: imageResult.failed.length,
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
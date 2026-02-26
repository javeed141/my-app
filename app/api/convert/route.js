// import { NextResponse } from "next/server";
// import { mkdir, writeFile } from "fs/promises";
// import { join } from "path";
// import { isUrlAllowed, fetchRaw } from "./functions/types.js";
// import { extractFrontmatter } from "./functions/frontmatter.js";
// import { convertUnknownWithAI } from "./functions/ai-module.js";

// import {
//   convertBlockquoteCallouts,
//   convertJsxCallouts,
//   convertAccordions,
//   convertCards,
//   convertColumnsLayout,
//   convertCodeGroups,
//   convertEmbeds,
//   fixImages,
//   convertIcons,
//   convertBlockSyntax,
// } from "./functions/converters.js";
// import {
//   removeImports,
//   removeExports,
//   removeReadmeCssClasses,
//   fixHeadingHierarchy,
//   fixTableAlignment,
//   fixHtmlComments,
//   fixVoidElements,
//   fixBackslashEscapes,  // ← ADD
//   fixAngleBrackets,
//   fixCurlyBraces,
//   removeEmptyCodeFences,
//   collapseBlankLines,
//   scanUnknownComponents,
// } from "./functions/cleanup.js";

// async function saveUnknownComponents(componentBlocks) {
//   if (componentBlocks.length === 0) return;

//   const dir = join(process.cwd(), "unknown-components");
//   await mkdir(dir, { recursive: true });

//   for (const block of componentBlocks) {
//     const fileName = `${block.name}.mdx`;
//     const filePath = join(dir, fileName);

//     let fileContent = `{/* Unknown component: <${block.name}> */}\n\n`;
//     fileContent += block.raw + "\n";

//     await writeFile(filePath, fileContent, "utf-8");
//   }
// }

// const CONVERTER_PIPELINE = [
//   convertBlockSyntax,
//   convertBlockquoteCallouts,
//   convertJsxCallouts,
//   convertAccordions,
//   convertCards,
//   convertColumnsLayout,
//   convertCodeGroups,
//   convertEmbeds,
//   convertIcons,
//   fixImages,
//   removeImports,
//   removeExports,
//   removeReadmeCssClasses,
//   fixHeadingHierarchy,
//   fixTableAlignment,
//   fixHtmlComments,
//   fixVoidElements,
//   fixBackslashEscapes,  // ← ADD before fixAngleBrackets
//   fixAngleBrackets,
//   fixCurlyBraces,
//   removeEmptyCodeFences,
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
//         return NextResponse.json(
//           { error: "URL must be a string" },
//           { status: 400 }
//         );
//       }
//       if (!isUrlAllowed(url)) {
//         return NextResponse.json(
//           { error: "URL not allowed" },
//           { status: 403 }
//         );
//       }
//       rawMdx = await fetchRaw(url);
//       if (!rawMdx) {
//         return NextResponse.json(
//           { error: "Failed to fetch URL" },
//           { status: 502 }
//         );
//       }
//     } else {
//       if (typeof rawMdxInput !== "string") {
//         return NextResponse.json(
//           { error: "mdx must be a string" },
//           { status: 400 }
//         );
//       }
//       rawMdx = rawMdxInput;
//     }

//     // Step 1: Extract and clean frontmatter
//     const {
//       frontmatter,
//       frontmatterStr,
//       body: mdxBody,
//       removedFields,
//     } = extractFrontmatter(rawMdx);

//     // Step 2: Scan and remove unknown components BEFORE pipeline
//     let content = mdxBody;
//     const { unknowns, componentBlocks, content: cleanedContent } = scanUnknownComponents(content);
//     await saveUnknownComponents(componentBlocks);
//     content = cleanedContent;

//     // Strip leftover {/* Unknown component: <Name> */} comments (artifacts from saved files)
//     content = content.replace(/\{\/\*\s*Unknown component:\s*<[A-Z][A-Za-z0-9]*>\s*\*\/\}\n*/g, "");

//     // Step 2.5: AI-convert unknown components
//     let aiWarnings = [];
//     if (componentBlocks.length > 0) {
//       const { conversions, warnings } = await convertUnknownWithAI(componentBlocks);
//       aiWarnings = warnings;

//       // Replace each placeholder with AI-converted MDX
//       for (const [placeholderId, convertedMdx] of conversions) {
//   content = content.replace(placeholderId, "\n\n" + convertedMdx + "\n\n");
//       }
//     }

//     console.log(componentBlocks);

//     // Step 3: Run converter pipeline
//     const allChanges = [];

//     for (const converter of CONVERTER_PIPELINE) {
//       const result = converter(content);
//       content = result.content;
//       allChanges.push(...result.changes);
//     }

//     // Step 4: Reassemble frontmatter + body
//     const converted = frontmatterStr
//       ? `${frontmatterStr}\n\n${content.trim()}\n`
//       : `${content.trim()}\n`;

//     // Step 5: Build change report
//     if (removedFields.length > 0) {
//       allChanges.unshift({
//         type: "frontmatter",
//         count: removedFields.length,
//         detail: `removed fields: ${removedFields.join(", ")}`,
//       });
//     }

//   return NextResponse.json({
//       original: rawMdx,
//       converted,
//       frontmatter: frontmatter || {},
//       changes: allChanges,
//       warnings: aiWarnings,
//       componentBlocks,
//       stats: {
//         originalLength: rawMdx.length,
//         convertedLength: converted.length,
//         totalChanges: allChanges.reduce((sum, c) => sum + c.count, 0),
//         unknownComponents: unknowns.size,
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
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { isUrlAllowed, fetchRaw } from "./functions/types.js";
import { extractFrontmatter } from "./functions/frontmatter.js";
import { convertUnknownWithAI } from "./functions/ai-module.js";

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
  fixTableAlignment,
  fixHtmlComments,
  fixVoidElements,
  fixBackslashEscapes,  // ← ADD
  fixAngleBrackets,
  fixCurlyBraces,
  removeEmptyCodeFences,
  collapseBlankLines,
  scanUnknownComponents,
} from "./functions/cleanup.js";

async function saveUnknownComponents(componentBlocks) {
  if (componentBlocks.length === 0) return;

  const dir = join(process.cwd(), "unknown-components");
  await mkdir(dir, { recursive: true });

  for (const block of componentBlocks) {
    const fileName = `${block.name}.mdx`;
    const filePath = join(dir, fileName);

    let fileContent = `{/* Unknown component: <${block.name}> */}\n\n`;
    fileContent += block.raw + "\n";

    await writeFile(filePath, fileContent, "utf-8");
  }
}

const CONVERTER_PIPELINE = [
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
  removeImports,
  removeExports,
  removeReadmeCssClasses,
  fixHeadingHierarchy,
  fixTableAlignment,
  fixHtmlComments,
  fixVoidElements,
  fixBackslashEscapes,  // ← ADD before fixAngleBrackets
  fixAngleBrackets,
  fixCurlyBraces,
  removeEmptyCodeFences,
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

    // Step 2: Scan and remove unknown components BEFORE pipeline
    let content = mdxBody;

    // Strip leftover {/* Unknown component: <Name> */} comments (artifacts from saved files)
    // Must happen BEFORE scanner so these don't interfere with component detection
    content = content.replace(/\{\/\*\s*Unknown component:\s*<[A-Z][A-Za-z0-9]*>\s*\*\/\}\n*/g, "");

    const { unknowns, componentBlocks, content: cleanedContent } = scanUnknownComponents(content);
    await saveUnknownComponents(componentBlocks);
    content = cleanedContent;

    // Step 2.5: AI-convert unknown components
    let aiWarnings = [];
    if (componentBlocks.length > 0) {
      const { conversions, warnings } = await convertUnknownWithAI(componentBlocks);
      aiWarnings = warnings;

      // Replace each placeholder with AI-converted MDX
      for (const [placeholderId, convertedMdx] of conversions) {
  content = content.replace(placeholderId, "\n\n" + convertedMdx + "\n\n");
      }
    }

    console.log(componentBlocks);

    // Step 3: Run converter pipeline
    const allChanges = [];

    for (const converter of CONVERTER_PIPELINE) {
      const result = converter(content);
      content = result.content;
      allChanges.push(...result.changes);
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

  return NextResponse.json({
      original: rawMdx,
      converted,
      frontmatter: frontmatter || {},
      changes: allChanges,
      warnings: aiWarnings,
      componentBlocks,
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
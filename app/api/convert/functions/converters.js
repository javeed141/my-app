// // converters.js
// // Each converter takes a string and returns { content: string, changes: Change[] }

// import {
//   EMOJI_TO_CALLOUT_KIND,
//   CALLOUT_EMOJIS,
//   COMPONENT_RENAME,
//   FA_TO_LUCIDE,
// } from "./types.js";

// // Regex-safe emoji alternation for callout matching
// const emojiPattern = CALLOUT_EMOJIS.map((e) =>
//   e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
// ).join("|");

// // ReadMe kind → Documentation.AI kind
// const KIND_MAP = {
//   info: "info",
//   default: "info",
//   note: "info",
//   success: "success",
//   okay: "success",
//   tip: "tip",
//   warning: "alert",
//   warn: "alert",
//   caution: "alert",
//   danger: "danger",
//   error: "danger",
//   critical: "danger",
// };

// function normalizeKind(value) {
//   if (!value) return "info";
//   return KIND_MAP[value.toLowerCase().trim()] || "info";
// }

// // Escape quotes for JSX attribute values
// function escAttr(str) {
//   return str.replace(/"/g, "&quot;");
// }

// // --- 1. Blockquote Callout Converter ---
// // > 📘 Title  or  > ## 📘 Title  →  <Callout kind="info" title="Title">

// export function convertBlockquoteCallouts(content) {
//   const changes = [];
//   let count = 0;

//   const lines = content.split("\n");
//   const result = [];
//   let i = 0;

//   while (i < lines.length) {
//     const calloutStart = new RegExp(
//       `^([ \\t]*>[ \\t]*)(?:#{1,6}\\s+)?(${emojiPattern})[ \\t]*(.*?)$`
//     );
//     const match = lines[i].match(calloutStart);

//     if (!match) {
//       result.push(lines[i]);
//       i++;
//       continue;
//     }

//     const emoji = match[2];
//     const firstLineText = match[3].trim();
//     const kind = EMOJI_TO_CALLOUT_KIND[emoji] || "info";

//     // Collect continuation lines (lines starting with >)
//     const bodyLines = [];
//     i++;
//     while (i < lines.length && /^[ \t]*>/.test(lines[i])) {
//       bodyLines.push(lines[i].replace(/^[ \t]*>[ \t]?/, ""));
//       i++;
//     }

//     const bodyText = bodyLines.join("\n").trim();
//     const allText = [firstLineText, bodyText].filter(Boolean).join("\n").trim();

//     // Empty callout (just emoji, no text) → leave as blockquote
//     if (!allText) {
//       result.push(match[0]);
//       continue;
//     }

//     count++;

//     // Short first line + more content → use first line as title
//     let title = "";
//     let body = allText;
//     if (firstLineText && bodyText.length > 0 && firstLineText.length < 60) {
//       title = firstLineText;
//       body = bodyText;
//     }

//     const titleAttr = title ? ` title="${escAttr(title)}"` : "";
//     result.push(`<Callout kind="${kind}"${titleAttr}>`);
//     result.push(body);
//     result.push("</Callout>");
//   }

//   if (count > 0) {
//     changes.push({
//       type: "callout",
//       count,
//       detail: `emoji blockquote → <Callout kind="...">`,
//     });
//   }

//   return { content: result.join("\n"), changes };
// }

// // --- 2. JSX Callout Converter ---
// // <Callout type="info"> → <Callout kind="info">

// export function convertJsxCallouts(content) {
//   const changes = [];
//   let count = 0;

//   const result = content.replace(
//     /<Callout(\s[^>]*?)>/gi,
//     (fullMatch, attrsStr) => {
//       // Already has kind= → skip
//       if (/\bkind\s*=/.test(attrsStr)) return fullMatch;

//       const typeMatch = attrsStr.match(/\btype\s*=\s*(["'])([^"']*)\1/);
//       const themeMatch = attrsStr.match(/\btheme\s*=\s*(["'])([^"']*)\1/);
//       const iconMatch = attrsStr.match(/\bicon\s*=\s*(["'])([^"']*)\1/);
//       const emojiMatch = attrsStr.match(/\bemoji\s*=\s*(["'])([^"']*)\1/);

//       if (!typeMatch && !themeMatch && !iconMatch && !emojiMatch) {
//         return fullMatch;
//       }

//       // Priority: type > theme > icon > emoji
//       let kind = "info";
//       if (typeMatch) {
//         kind = normalizeKind(typeMatch[2]);
//       } else if (themeMatch) {
//         kind = normalizeKind(themeMatch[2]);
//       } else if (iconMatch) {
//         kind =
//           EMOJI_TO_CALLOUT_KIND[iconMatch[2].trim()] ||
//           normalizeKind(iconMatch[2]);
//       } else if (emojiMatch) {
//         kind = EMOJI_TO_CALLOUT_KIND[emojiMatch[2].trim()] || "info";
//       }

//       const titleMatch = attrsStr.match(/\btitle\s*=\s*(["'])([^"']*)\1/);
//       const titleAttr = titleMatch ? ` title="${escAttr(titleMatch[2])}"` : "";

//       count++;
//       return `<Callout kind="${kind}"${titleAttr}>`;
//     }
//   );

//   if (count > 0) {
//     changes.push({
//       type: "callout-jsx",
//       count,
//       detail: `<Callout type/theme/icon> → kind="..."`,
//     });
//   }

//   return { content: result, changes };
// }

// // --- 3. Accordion → Expandable ---
// // Also removes unsupported "icon" prop from Accordion

// export function convertAccordions(content) {
//   const changes = [];
//   let count = 0;

//   let result = content;
//   for (const [from, to] of Object.entries(COMPONENT_RENAME)) {
//     const openRegex = new RegExp(`<${from}(\\s|>|\\/)`, "g");
//     const closeRegex = new RegExp(`</${from}>`, "g");

//     const openMatches = result.match(openRegex);
//     if (openMatches) {
//       count += openMatches.length;
//       result = result.replace(openRegex, `<${to}$1`);
//       result = result.replace(closeRegex, `</${to}>`);
//     }
//   }

//   // Remove icon prop from Expandable (not supported in Documentation.AI)
//   if (count > 0) {
//     result = result.replace(
//       /(<Expandable\s[^>]*?)\s+icon\s*=\s*(["'])[^"']*\2/gi,
//       "$1"
//     );

//     changes.push({
//       type: "accordion",
//       count,
//       detail: `<Accordion> → <Expandable> (removed icon prop)`,
//     });
//   }

//   return { content: result, changes };
// }

// // --- 4. Cards → Columns ---
// // <Cards columns={3}> → <Columns cols={3}>
// // Per mapping: Cards→Columns, columns→cols, Card stays Card

// export function convertCards(content) {
//   const changes = [];
//   let count = 0;

//   let result = content;

//   // Rename <Cards> → <Columns>
//   const openMatches = result.match(/<Cards(\s|>)/g);
//   if (openMatches) {
//     count += openMatches.length;
//     result = result.replace(/<Cards(\s|>)/g, "<Columns$1");
//     result = result.replace(/<\/Cards>/g, "</Columns>");

//     // Rename columns={N} → cols={N}
//     result = result.replace(
//       /(<Columns\s[^>]*?)columns\s*=\s*\{(\d+)\}/g,
//       "$1cols={$2}"
//     );
//   }

//   if (count > 0) {
//     changes.push({
//       type: "cards",
//       count,
//       detail: `<Cards columns={N}> → <Columns cols={N}>`,
//     });
//   }

//   return { content: result, changes };
// }

// // --- 5. Columns layout → cols ---
// // <Columns layout="auto"> → <Columns cols={N}> (count Column children)
// // Removes <Column> wrapper tags

// export function convertColumnsLayout(content) {
//   const changes = [];
//   let count = 0;

//   // Match <Columns layout="...">...</Columns> blocks
//   const result = content.replace(
//     /<Columns\s+layout\s*=\s*(["'])[^"']*\1\s*>([\s\S]*?)<\/Columns>/g,
//     (match, _quote, inner) => {
//       // Count <Column> children
//       const columnCount = (inner.match(/<Column[\s>]/g) || []).length || 2;

//       // Remove <Column> and </Column> wrappers
//       let cleaned = inner;
//       cleaned = cleaned.replace(/<Column\s*>/g, "");
//       cleaned = cleaned.replace(/<\/Column>/g, "");

//       count++;
//       return `<Columns cols={${columnCount}}>\n${cleaned.trim()}\n</Columns>`;
//     }
//   );

//   if (count > 0) {
//     changes.push({
//       type: "columns-layout",
//       count,
//       detail: `<Columns layout="auto"> → <Columns cols={N}>, removed <Column> wrappers`,
//     });
//   }

//   return { content: result, changes };
// }

// // --- 6. Code Group Converter ---
// // Wraps 2+ consecutive code blocks in <CodeGroup>
// // Extracts tab labels from code fence meta: ```javascript Tab A → tabs="Tab A,Tab B"

// export function convertCodeGroups(content) {
//   const changes = [];
//   let count = 0;

//   // Match 2+ consecutive fenced code blocks
//   // Each block: ```lang...\ncode\n```  followed by optional blank lines
//   // The last block may not have a trailing newline
//   const consecutiveCodeBlocks =
//     /(?:^```[\w-]*[^\n]*\n[\s\S]*?^```[ \t]*(?:\n[ \t]*\n?|$)){2,}/gm;

//   const result = content.replace(consecutiveCodeBlocks, (match) => {
//     const blocks = [...match.matchAll(/^```([\w-]*)([^\n]*)\n([\s\S]*?)^```/gm)];
//     if (blocks.length < 2) return match;

//     const langs = blocks.map((b) => b[1]).filter(Boolean);
//     const uniqueLangs = new Set(langs);

//     // Only wrap if there are at least 2 different languages
//     if (uniqueLangs.size < 2) return match;

//     count++;

//     // Extract tab labels from the text after the language identifier
//     // e.g. ```javascript Tab A → tab label is "Tab A"
//     const tabLabels = blocks.map((b) => {
//       const meta = b[2].trim(); // text after language name
//       if (meta) return meta;
//       return b[1] || "Code"; // fallback to language name
//     });

//     const tabsAttr = ` tabs="${tabLabels.join(",")}"`;

//     // Rebuild each code block with clean spacing
//     const rebuilt = blocks
//       .map((b) => {
//         const lang = b[1] || "";
//         const code = b[3];
//         return "```" + lang + "\n" + code + "```";
//       })
//       .join("\n\n");

//     return `<CodeGroup${tabsAttr}>\n${rebuilt}\n</CodeGroup>\n`;
//   });

//   if (count > 0) {
//     changes.push({
//       type: "codegroup",
//       count,
//       detail: `consecutive code blocks → <CodeGroup tabs="...">`,
//     });
//   }

//   return { content: result, changes };
// }

// // --- 7. Embed Converter ---
// // [block:embed] JSON and @[title](url) → <iframe>

// export function convertEmbeds(content) {
//   const changes = [];
//   let count = 0;

//   let result = content.replace(
//     /\[block:embed\]\s*\n([\s\S]*?)\n\s*\[\/block\]/g,
//     (match, jsonStr) => {
//       try {
//         const data = JSON.parse(jsonStr);
//         count++;
//         const url = data.url || data.html || "";
//         const title = data.title ? ` title="${escAttr(data.title)}"` : "";

//         // Convert YouTube watch URL to embed URL
//         const embedUrl = toEmbedUrl(url);
//         return `<iframe src="${escAttr(embedUrl)}"${title} width="100%" height="400" />`;
//       } catch {
//         count++;
//         return `{/* [block:embed] could not be parsed */}`;
//       }
//     }
//   );

//   // @[title](url) format
//   result = result.replace(/@\[([^\]]*)\]\(([^)]+)\)/g, (match, title, url) => {
//     count++;
//     const titleAttr = title ? ` title="${escAttr(title)}"` : "";
//     const embedUrl = toEmbedUrl(url);
//     return `<iframe src="${escAttr(embedUrl)}"${titleAttr} width="100%" height="400" />`;
//   });

//   if (count > 0) {
//     changes.push({
//       type: "embed",
//       count,
//       detail: `@embed / [block:embed] → <iframe>`,
//     });
//   }

//   return { content: result, changes };
// }

// // Convert YouTube watch URL to embed URL
// // https://youtube.com/watch?v=abc123 → https://www.youtube.com/embed/abc123
// function toEmbedUrl(url) {
//   try {
//     const parsed = new URL(url);
//     if (
//       parsed.hostname.includes("youtube.com") &&
//       parsed.pathname === "/watch"
//     ) {
//       const videoId = parsed.searchParams.get("v");
//       if (videoId) return `https://www.youtube.com/embed/${videoId}`;
//     }
//     if (parsed.hostname === "youtu.be") {
//       const videoId = parsed.pathname.slice(1);
//       if (videoId) return `https://www.youtube.com/embed/${videoId}`;
//     }
//   } catch {
//     // Not a valid URL, return as-is
//   }
//   return url;
// }

// // --- 8. Image Fixer ---
// // Adds missing alt text, removes ReadMe-specific attributes (align, border)
// // Keeps image URLs as online links

// export function fixImages(content) {
//   const changes = [];
//   let count = 0;

//   // Convert markdown images to <Image> component tags
//   // ![alt](url) → <Image src="url" width="1920" height="1080" alt="alt" />
//   // ![](url "title") → strips the "title" part, keeps just the URL
//   let result = content.replace(
//     /!\[([^\]]*)\]\(([^)]+)\)/g,
//     (match, alt, rawUrl) => {
//       count++;
//       // Strip optional title: url "title" or url 'title'
//       const url = rawUrl.replace(/\s+["'][^"']*["']\s*$/, "").trim();
//       return `<Image src="${url}" width="1920" height="1080" alt="${alt}" />`;
//     }
//   );

//   // Clean up existing <Image> tags: remove align, border props
//   result = result.replace(/<Image(\s[^>]*?)(\s*\/?>)/gi, (match, attrs, close) => {
//     const cleaned = attrs
//       .replace(
//         /\s+(align|border|caption)\s*=\s*(["'][^"']*["']|\{[^}]*\}|\S+)/gi,
//         ""
//       )
//       .trim();
//     if (cleaned !== attrs.trim()) count++;
//     return `<Image ${cleaned}${close}`;
//   });

//   if (count > 0) {
//     changes.push({
//       type: "image",
//       count,
//       detail: `markdown images → <Image> component`,
//     });
//   }

//   return { content: result, changes };
// }

// // --- 9. Font Awesome → Lucide Icon Converter ---

// export function convertIcons(content) {
//   const changes = [];
//   let count = 0;

//   const result = content.replace(
//     /icon\s*=\s*(["'])(fa-[\w-]+)\1/g,
//     (match, quote, faIcon) => {
//       const lucide = FA_TO_LUCIDE[faIcon];
//       if (lucide) {
//         count++;
//         return `icon=${quote}${lucide}${quote}`;
//       }
//       // Unknown FA icon — strip "fa-" prefix as fallback
//       count++;
//       return `icon=${quote}${faIcon.replace(/^fa-/, "")}${quote}`;
//     }
//   );

//   if (count > 0) {
//     changes.push({
//       type: "icon",
//       count,
//       detail: `Font Awesome → Lucide icon names`,
//     });
//   }

//   return { content: result, changes };
// }

// // --- 10. Block Syntax Converter ---
// // ReadMe's [block:TYPE] JSON [/block] → MDX components or tables
// //
// // Never returns raw JSON (bare {} breaks MDX).
// // Always uses {/* JSX comments */} for fallbacks, never <!-- -->.

// export function convertBlockSyntax(content) {
//   const changes = [];
//   let count = 0;

//   const result = content.replace(
//     /\[block:(\w+)\]\s*\n([\s\S]*?)\n\s*\[\/block\]/g,
//     (match, blockType, jsonStr) => {
//       let data;
//       try {
//         data = JSON.parse(jsonStr);
//       } catch {
//         count++;
//         return `{/* [block:${blockType}] could not be parsed */}`;
//       }

//       count++;

//       switch (blockType) {
//         case "callout": {
//           const kind = normalizeKind(data.type);
//           const title = data.title || "";
//           const body = (data.body || "").trim();

//           if (!body && !title) return "";
//           if (!body) return `<Callout kind="${kind}">\n${title}\n</Callout>`;

//           const titleAttr = title ? ` title="${escAttr(title)}"` : "";
//           return `<Callout kind="${kind}"${titleAttr}>\n${body}\n</Callout>`;
//         }

//         case "code": {
//           const codes = data.codes || [];
//           if (codes.length === 0) return "";

//           if (codes.length === 1) {
//             const c = codes[0];
//             const lang = c.language || "";
//             const name = c.name ? ` ${c.name}` : "";
//             return "```" + lang + name + "\n" + (c.code || "") + "\n```";
//           }

//           // Multiple code blocks → CodeGroup with tabs
//           const tabLabels = codes.map(
//             (c) => c.name || c.language || "Code"
//           );
//           const blocks = codes
//             .map((c) => {
//               const lang = c.language || "";
//               return "```" + lang + "\n" + (c.code || "") + "\n```";
//             })
//             .join("\n\n");

//           return `<CodeGroup tabs="${tabLabels.join(",")}">\n${blocks}\n</CodeGroup>`;
//         }

//         case "image": {
//           const images = data.images || [];
//           if (images.length === 0) return "";

//           return images
//             .map((img) => {
//               if (Array.isArray(img.image)) {
//                 const [url, caption] = img.image;
//                 return `![${caption || "Image"}](${url})`;
//               }
//               return `![${img.caption || "Image"}](${img.image || img.url || ""})`;
//             })
//             .join("\n\n");
//         }

//         // Parameters / API Header → Markdown table
//         case "parameters":
//         case "api-header": {
//           const numCols = data.cols || 0;
//           const numRows = data.rows || 0;
//           const cells = data.data || {};
//           if (numCols === 0 || numRows === 0) return "";

//           const headers = [];
//           for (let col = 0; col < numCols; col++) {
//             headers.push(cells[`h-${col}`] || `Column ${col + 1}`);
//           }

//           const rows = [];
//           for (let row = 0; row < numRows; row++) {
//             const rowCells = [];
//             for (let col = 0; col < numCols; col++) {
//               let v = cells[`${row}-${col}`] || "";
//               v = v.replace(/\r?\n/g, " <br/> ");
//               v = v.replace(/\|/g, "\\|");
//               rowCells.push(v);
//             }
//             rows.push(rowCells);
//           }

//           const headerRow = `| ${headers.join(" | ")} |`;
//           const separator = `| ${headers.map(() => "---").join(" | ")} |`;
//           const bodyRows = rows.map((r) => `| ${r.join(" | ")} |`);
//           return [headerRow, separator, ...bodyRows].join("\n");
//         }

//         case "html": {
//           return data.body || data.html || "";
//         }

//         default: {
//           return `{/* [block:${blockType}] needs manual review */}`;
//         }
//       }
//     }
//   );

//   if (count > 0) {
//     changes.push({
//       type: "block-syntax",
//       count,
//       detail: `[block:...] → modern MDX components`,
//     });
//   }

//   return { content: result, changes };
// }

// converters.js
// Each converter takes a string and returns { content: string, changes: Change[] }

import {
  EMOJI_TO_CALLOUT_KIND,
  CALLOUT_EMOJIS,
  COMPONENT_RENAME,
  FA_TO_LUCIDE,
} from "./types.js";

// Regex-safe emoji alternation for callout matching
const emojiPattern = CALLOUT_EMOJIS.map((e) =>
  e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
).join("|");

// ReadMe kind → Documentation.AI kind
const KIND_MAP = {
  info: "info",
  default: "info",
  note: "info",
  success: "success",
  okay: "success",
  tip: "tip",
  warning: "alert",
  warn: "alert",
  caution: "alert",
  danger: "danger",
  error: "danger",
  critical: "danger",
};

function normalizeKind(value) {
  if (!value) return "info";
  return KIND_MAP[value.toLowerCase().trim()] || "info";
}

// Escape quotes for JSX attribute values
function escAttr(str) {
  return str.replace(/"/g, "&quot;");
}

// --- 1. Blockquote Callout Converter ---
// > 📘 Title  or  > ## 📘 Title  →  <Callout kind="info" title="Title">

export function convertBlockquoteCallouts(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const calloutStart = new RegExp(
      `^([ \\t]*>[ \\t]*)(?:#{1,6}\\s+)?(${emojiPattern})[ \\t]*(.*?)$`
    );
    const match = lines[i].match(calloutStart);

    if (!match) {
      result.push(lines[i]);
      i++;
      continue;
    }

    const emoji = match[2];
    const firstLineText = match[3].trim();
    const kind = EMOJI_TO_CALLOUT_KIND[emoji] || "info";

    // Collect continuation lines (lines starting with >)
    const bodyLines = [];
    i++;
    while (i < lines.length && /^[ \t]*>/.test(lines[i])) {
      bodyLines.push(lines[i].replace(/^[ \t]*>[ \t]?/, ""));
      i++;
    }

    const bodyText = bodyLines.join("\n").trim();
    const allText = [firstLineText, bodyText].filter(Boolean).join("\n").trim();

    // Empty callout (just emoji, no text) → leave as blockquote
    if (!allText) {
      result.push(match[0]);
      continue;
    }

    count++;

    // Short first line + more content → use first line as title
    let title = "";
    let body = allText;
    if (firstLineText && bodyText.length > 0 && firstLineText.length < 60) {
      title = firstLineText;
      body = bodyText;
    }

    const titleAttr = title ? ` title="${escAttr(title)}"` : "";
    result.push(`<Callout kind="${kind}"${titleAttr}>`);
    result.push("");
    result.push(body);
    result.push("");
    result.push("</Callout>");
  }

  if (count > 0) {
    changes.push({
      type: "callout",
      count,
      detail: `emoji blockquote → <Callout kind="...">`,
    });
  }

  return { content: result.join("\n"), changes };
}

// --- 2. JSX Callout Converter ---
// <Callout type="info"> → <Callout kind="info">

export function convertJsxCallouts(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /<Callout(\s[^>]*?)>/gi,
    (fullMatch, attrsStr) => {
      // Already has kind= → skip
      if (/\bkind\s*=/.test(attrsStr)) return fullMatch;

      const typeMatch = attrsStr.match(/\btype\s*=\s*(["'])([^"']*)\1/);
      const themeMatch = attrsStr.match(/\btheme\s*=\s*(["'])([^"']*)\1/);
      const iconMatch = attrsStr.match(/\bicon\s*=\s*(["'])([^"']*)\1/);
      const emojiMatch = attrsStr.match(/\bemoji\s*=\s*(["'])([^"']*)\1/);

      if (!typeMatch && !themeMatch && !iconMatch && !emojiMatch) {
        return fullMatch;
      }

      // Priority: type > theme > icon > emoji
      let kind = "info";
      if (typeMatch) {
        kind = normalizeKind(typeMatch[2]);
      } else if (themeMatch) {
        kind = normalizeKind(themeMatch[2]);
      } else if (iconMatch) {
        kind =
          EMOJI_TO_CALLOUT_KIND[iconMatch[2].trim()] ||
          normalizeKind(iconMatch[2]);
      } else if (emojiMatch) {
        kind = EMOJI_TO_CALLOUT_KIND[emojiMatch[2].trim()] || "info";
      }

      const titleMatch = attrsStr.match(/\btitle\s*=\s*(["'])([^"']*)\1/);
      const titleAttr = titleMatch ? ` title="${escAttr(titleMatch[2])}"` : "";

      count++;
      return `<Callout kind="${kind}"${titleAttr}>`;
    }
  );

  if (count > 0) {
    changes.push({
      type: "callout-jsx",
      count,
      detail: `<Callout type/theme/icon> → kind="..."`,
    });
  }

  return { content: result, changes };
}

// --- 3. Accordion → Expandable ---
// Also removes unsupported "icon" prop from Accordion

export function convertAccordions(content) {
  const changes = [];
  let count = 0;

  let result = content;
  for (const [from, to] of Object.entries(COMPONENT_RENAME)) {
    const openRegex = new RegExp(`<${from}(\\s|>|\\/)`, "g");
    const closeRegex = new RegExp(`</${from}>`, "g");

    const openMatches = result.match(openRegex);
    if (openMatches) {
      count += openMatches.length;
      result = result.replace(openRegex, `<${to}$1`);
      result = result.replace(closeRegex, `</${to}>`);
    }
  }

  // Remove icon prop from Expandable (not supported in Documentation.AI)
  if (count > 0) {
    result = result.replace(
      /(<Expandable\s[^>]*?)\s+icon\s*=\s*(["'])[^"']*\2/gi,
      "$1"
    );

    changes.push({
      type: "accordion",
      count,
      detail: `<Accordion> → <Expandable> (removed icon prop)`,
    });
  }

  return { content: result, changes };
}

// --- 4. Cards → Columns ---
// <Cards columns={3}> → <Columns cols={3}>
// Per mapping: Cards→Columns, columns→cols, Card stays Card

export function convertCards(content) {
  const changes = [];
  let count = 0;

  let result = content;

  // Rename <Cards> → <Columns>
  const openMatches = result.match(/<Cards(\s|>)/g);
  if (openMatches) {
    count += openMatches.length;
    result = result.replace(/<Cards(\s|>)/g, "<Columns$1");
    result = result.replace(/<\/Cards>/g, "</Columns>");

    // Rename columns={N} → cols={N}
    result = result.replace(
      /(<Columns\s[^>]*?)columns\s*=\s*\{(\d+)\}/g,
      "$1cols={$2}"
    );
  }

  if (count > 0) {
    changes.push({
      type: "cards",
      count,
      detail: `<Cards columns={N}> → <Columns cols={N}>`,
    });
  }

  return { content: result, changes };
}

// --- 5. Columns layout → cols ---
// <Columns layout="auto"> → <Columns cols={N}> (count Column children)
// Removes <Column> wrapper tags

export function convertColumnsLayout(content) {
  const changes = [];
  let count = 0;

  // Match <Columns layout="...">...</Columns> blocks
  const result = content.replace(
    /<Columns\s+layout\s*=\s*(["'])[^"']*\1\s*>([\s\S]*?)<\/Columns>/g,
    (match, _quote, inner) => {
      // Count <Column> children
      const columnCount = (inner.match(/<Column[\s>]/g) || []).length || 2;

      // Remove <Column> and </Column> wrappers
      let cleaned = inner;
      cleaned = cleaned.replace(/<Column\s*>/g, "");
      cleaned = cleaned.replace(/<\/Column>/g, "");

      count++;
      return `<Columns cols={${columnCount}}>\n${cleaned.trim()}\n</Columns>`;
    }
  );

  if (count > 0) {
    changes.push({
      type: "columns-layout",
      count,
      detail: `<Columns layout="auto"> → <Columns cols={N}>, removed <Column> wrappers`,
    });
  }

  return { content: result, changes };
}

// --- 6. Code Group Converter ---
// Wraps 2+ consecutive code blocks in <CodeGroup>
// Extracts tab labels from code fence meta: ```javascript Tab A → tabs="Tab A,Tab B"

export function convertCodeGroups(content) {
  const changes = [];
  let count = 0;

  // Match 2+ consecutive fenced code blocks
  // Each block: ```lang...\ncode\n```  followed by optional blank lines
  // The last block may not have a trailing newline
  const consecutiveCodeBlocks =
    /(?:^```[\w-]*[^\n]*\n[\s\S]*?^```[ \t]*(?:\n[ \t]*\n?|$)){2,}/gm;

  const result = content.replace(consecutiveCodeBlocks, (match) => {
    const blocks = [...match.matchAll(/^```([\w-]*)([^\n]*)\n([\s\S]*?)^```/gm)];
    if (blocks.length < 2) return match;

    const langs = blocks.map((b) => b[1]).filter(Boolean);
    const uniqueLangs = new Set(langs);

    // Only wrap if there are at least 2 different languages
    if (uniqueLangs.size < 2) return match;

    count++;

    // Extract tab labels from the text after the language identifier
    // e.g. ```javascript Tab A → tab label is "Tab A"
    const tabLabels = blocks.map((b) => {
      const meta = b[2].trim(); // text after language name
      if (meta) return meta;
      return b[1] || "Code"; // fallback to language name
    });

    const tabsAttr = ` tabs="${tabLabels.join(",")}"`;

    // Rebuild each code block with clean spacing
    const rebuilt = blocks
      .map((b) => {
        const lang = b[1] || "";
        const code = b[3];
        return "```" + lang + "\n" + code + "```";
      })
      .join("\n\n");

    return `<CodeGroup${tabsAttr}>\n${rebuilt}\n</CodeGroup>\n`;
  });

  if (count > 0) {
    changes.push({
      type: "codegroup",
      count,
      detail: `consecutive code blocks → <CodeGroup tabs="...">`,
    });
  }

  return { content: result, changes };
}

// --- 7. Embed Converter ---
// [block:embed] JSON and @[title](url) → <iframe>

export function convertEmbeds(content) {
  const changes = [];
  let count = 0;

  let result = content.replace(
    /\[block:embed\]\s*\n([\s\S]*?)\n\s*\[\/block\]/g,
    (match, jsonStr) => {
      try {
        const data = JSON.parse(jsonStr);
        count++;
        const url = data.url || data.html || "";
        const title = data.title ? ` title="${escAttr(data.title)}"` : "";

        // Convert YouTube watch URL to embed URL
        const embedUrl = toEmbedUrl(url);
        return `<iframe src="${escAttr(embedUrl)}"${title} width="100%" height="400" />`;
      } catch {
        count++;
        return `{/* [block:embed] could not be parsed */}`;
      }
    }
  );

  // @[title](url) format
  result = result.replace(/@\[([^\]]*)\]\(([^)]+)\)/g, (match, title, url) => {
    count++;
    const titleAttr = title ? ` title="${escAttr(title)}"` : "";
    const embedUrl = toEmbedUrl(url);
    return `<iframe src="${escAttr(embedUrl)}"${titleAttr} width="100%" height="400" />`;
  });

  if (count > 0) {
    changes.push({
      type: "embed",
      count,
      detail: `@embed / [block:embed] → <iframe>`,
    });
  }

  return { content: result, changes };
}

// Convert YouTube watch URL to embed URL
// https://youtube.com/watch?v=abc123 → https://www.youtube.com/embed/abc123
function toEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname === "/watch"
    ) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {
    // Not a valid URL, return as-is
  }
  return url;
}

// --- 8. Image Fixer ---
// Adds missing alt text, removes ReadMe-specific attributes (align, border)
// Keeps image URLs as online links

export function fixImages(content) {
  const changes = [];
  let count = 0;

  // Convert markdown images to <Image> component tags
  // ![alt](url) → <Image src="url" width="1920" height="1080" alt="alt" />
  // ![](url "title") → strips the "title" part, keeps just the URL
  let result = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, rawUrl) => {
      count++;
      // Strip optional title: url "title" or url 'title'
      const url = rawUrl.replace(/\s+["'][^"']*["']\s*$/, "").trim();
      return `<Image src="${url}" width="1920" height="1080" alt="${alt}" />`;
    }
  );

  // Clean up existing <Image> tags: remove align, border props
  result = result.replace(/<Image(\s[^>]*?)(\s*\/?>)/gi, (match, attrs, close) => {
    const cleaned = attrs
      .replace(
        /\s+(align|border|caption)\s*=\s*(["'][^"']*["']|\{[^}]*\}|\S+)/gi,
        ""
      )
      .trim();
    if (cleaned !== attrs.trim()) count++;
    return `<Image ${cleaned}${close}`;
  });

  if (count > 0) {
    changes.push({
      type: "image",
      count,
      detail: `markdown images → <Image> component`,
    });
  }

  return { content: result, changes };
}

// --- 9. Font Awesome → Lucide Icon Converter ---

export function convertIcons(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /icon\s*=\s*(["'])(fa-[\w-]+)\1/g,
    (match, quote, faIcon) => {
      const lucide = FA_TO_LUCIDE[faIcon];
      if (lucide) {
        count++;
        return `icon=${quote}${lucide}${quote}`;
      }
      // Unknown FA icon — strip "fa-" prefix as fallback
      count++;
      return `icon=${quote}${faIcon.replace(/^fa-/, "")}${quote}`;
    }
  );

  if (count > 0) {
    changes.push({
      type: "icon",
      count,
      detail: `Font Awesome → Lucide icon names`,
    });
  }

  return { content: result, changes };
}

// --- 10. Block Syntax Converter ---
// ReadMe's [block:TYPE] JSON [/block] → MDX components or tables
//
// Never returns raw JSON (bare {} breaks MDX).
// Always uses {/* JSX comments */} for fallbacks, never <!-- -->.

export function convertBlockSyntax(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /\[block:([\w-]+)\]\s*\n([\s\S]*?)\n\s*\[\/block\]/g,
    (match, blockType, jsonStr) => {
      let data;
      try {
        data = JSON.parse(jsonStr);
      } catch {
        count++;
        return `{/* [block:${blockType}] could not be parsed */}`;
      }

      count++;

      switch (blockType) {
        case "callout": {
          const kind = normalizeKind(data.type);
          const title = data.title || "";
          const body = (data.body || "").trim();

          if (!body && !title) return "";
          if (!body) return `<Callout kind="${kind}">\n\n${title}\n\n</Callout>`;

          const titleAttr = title ? ` title="${escAttr(title)}"` : "";
          return `<Callout kind="${kind}"${titleAttr}>\n\n${body}\n\n</Callout>`;
        }

        case "code": {
          const codes = data.codes || [];
          if (codes.length === 0) return "";

          if (codes.length === 1) {
            const c = codes[0];
            const lang = c.language || "";
            const name = c.name ? ` ${c.name}` : "";
            return "```" + lang + name + "\n" + (c.code || "") + "\n```";
          }

          // Multiple code blocks → CodeGroup with tabs
          const tabLabels = codes.map(
            (c) => c.name || c.language || "Code"
          );
          const blocks = codes
            .map((c) => {
              const lang = c.language || "";
              return "```" + lang + "\n" + (c.code || "") + "\n```";
            })
            .join("\n\n");

          return `<CodeGroup tabs="${tabLabels.join(",")}">\n${blocks}\n</CodeGroup>`;
        }

        case "image": {
          const images = data.images || [];
          if (images.length === 0) return "";

          return images
            .map((img) => {
              if (Array.isArray(img.image)) {
                const [url, caption] = img.image;
                return `![${caption || "Image"}](${url})`;
              }
              return `![${img.caption || "Image"}](${img.image || img.url || ""})`;
            })
            .join("\n\n");
        }

        // Parameters / API Header → Markdown table
        case "parameters":
        case "api-header": {
          const numCols = data.cols || 0;
          const numRows = data.rows || 0;
          const cells = data.data || {};
          if (numCols === 0 || numRows === 0) return "";

          const headers = [];
          for (let col = 0; col < numCols; col++) {
            headers.push(cells[`h-${col}`] || `Column ${col + 1}`);
          }

          const rows = [];
          for (let row = 0; row < numRows; row++) {
            const rowCells = [];
            for (let col = 0; col < numCols; col++) {
              let v = cells[`${row}-${col}`] || "";
              v = v.replace(/\r?\n/g, " <br/> ");
              v = v.replace(/\|/g, "\\|");
              rowCells.push(v);
            }
            rows.push(rowCells);
          }

          const headerRow = `| ${headers.join(" | ")} |`;
          const separator = `| ${headers.map(() => "---").join(" | ")} |`;
          const bodyRows = rows.map((r) => `| ${r.join(" | ")} |`);
          return [headerRow, separator, ...bodyRows].join("\n");
        }

        case "tutorial-tile": {
          const title = data.title || "Tutorial";
          const link = data.link || "";
          return `<Card title="${escAttr(title)}" href="${escAttr(link)}" />`;
        }

        case "html": {
          const rawHtml = data.html || data.body || "";
          // Convert HTML tables to markdown tables
          const tableMatch = rawHtml.match(/<table[\s\S]*?<\/table>/i);
          if (tableMatch) {
            return htmlTableToMarkdown(rawHtml);
          }
          return rawHtml;
        }

        default: {
          return `{/* [block:${blockType}] needs manual review */}`;
        }
      }
    }
  );

  if (count > 0) {
    changes.push({
      type: "block-syntax",
      count,
      detail: `[block:...] → modern MDX components`,
    });
  }

  return { content: result, changes };
}

// --- HTML table → Markdown table helper ---
// Parses <table> HTML (from [block:html]) into a markdown table.

function htmlTableToMarkdown(html) {
  // Extract header cells
  const theadMatch = html.match(/<thead[\s\S]*?<\/thead>/i);
  const tbodyMatch = html.match(/<tbody[\s\S]*?<\/tbody>/i);

  const extractCells = (rowHtml) => {
    const cells = [];
    const cellRegex = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi;
    let m;
    while ((m = cellRegex.exec(rowHtml)) !== null) {
      // Strip HTML tags, trim whitespace
      cells.push(m[1].replace(/<[^>]*>/g, "").trim());
    }
    return cells;
  };

  const extractRows = (sectionHtml) => {
    const rows = [];
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let m;
    while ((m = rowRegex.exec(sectionHtml)) !== null) {
      rows.push(extractCells(m[1]));
    }
    return rows;
  };

  let headers = [];
  if (theadMatch) {
    const headRows = extractRows(theadMatch[0]);
    if (headRows.length > 0) headers = headRows[0];
  }

  let bodyRows = [];
  if (tbodyMatch) {
    bodyRows = extractRows(tbodyMatch[0]);
  } else {
    // No explicit thead/tbody — extract all rows
    const allRows = extractRows(html);
    if (allRows.length > 0) {
      headers = allRows[0];
      bodyRows = allRows.slice(1);
    }
  }

  if (headers.length === 0 && bodyRows.length === 0) return html;

  const lines = [];
  lines.push(`| ${headers.join(" | ")} |`);
  lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
  for (const row of bodyRows) {
    // Pad row to match header count
    while (row.length < headers.length) row.push("");
    lines.push(`| ${row.join(" | ")} |`);
  }

  return lines.join("\n");
}
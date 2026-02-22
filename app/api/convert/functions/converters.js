// ════════════════════════════════════════════════════════════
//  COMPONENT CONVERTERS
//
//  Each function handles one ReadMe → Documentation.AI
//  conversion. Applied in order by the pipeline.
//
//  Every function takes a string, returns:
//    { content: string, changes: Change[] }
//
//  IMPORTANT MDX RULES:
//    - No HTML comments <!-- --> (use JSX: {/* */})
//    - No bare { } in text (escape: \{ \})
//    - No <br>, must be <br/>
//    - No <URL> angle brackets (escape or convert)
// ════════════════════════════════════════════════════════════

import {
  EMOJI_TO_CALLOUT_KIND,
  CALLOUT_EMOJIS,
  COMPONENT_RENAME,
  FA_TO_LUCIDE,
} from "./types.js";

// ── Helper: regex-safe emoji alternation ─────────────────────
const emojiPattern = CALLOUT_EMOJIS
  .map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");

// ── Helper: normalize callout kind ───────────────────────────
// ReadMe uses: "info", "warning", "error", "success", "default"
// Doc.AI uses: "info", "alert", "danger", "success", "tip"
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

// ── Helper: escape quotes for JSX attribute values ───────────
// "Use "Single Family Dwelling"" → "Use &quot;Single Family Dwelling&quot;"
function escAttr(str) {
  return str.replace(/"/g, "&quot;");
}

// ════════════════════════════════════════════════════════════
//  1. BLOCKQUOTE CALLOUT CONVERTER
//
//  Handles BOTH ReadMe patterns:
//    > 📘 Title           (standard — v4 pages)
//    > ## 📘 Title         (heading before emoji — v3/older pages)
//    > 📘                  (empty — just emoji, no text)
//
//  Output:
//    <Callout kind="info" title="Title">
//    Body content
//    </Callout>
// ════════════════════════════════════════════════════════════

export function convertBlockquoteCallouts(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  const result = [];
  let i = 0;

  while (i < lines.length) {
    // Match: >  optional-heading-hashes  EMOJI  optional-text
    // The (?:#{1,6}\s+)? handles ReadMe's > ## 📘 pattern
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
    result.push(`<Callout kind="${kind}"${titleAttr}>\n${body}\n</Callout>`);
  }

  if (count > 0) {
    changes.push({ type: "callout", count, detail: `emoji blockquote → <Callout kind="...">` });
  }

  return { content: result.join("\n"), changes };
}

// ════════════════════════════════════════════════════════════
//  2. JSX CALLOUT CONVERTER
//
//  Handles ReadMe's JSX callout attributes:
//    <Callout type="info">              → kind="info"
//    <Callout type="warning">           → kind="alert"
//    <Callout theme="danger">           → kind="danger"
//    <Callout icon="⚠️">               → kind="alert"
//    <Callout emoji="📘">               → kind="info"
// ════════════════════════════════════════════════════════════

export function convertJsxCallouts(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /<Callout(\s[^>]*?)>/gi,
    (fullMatch, attrsStr) => {
      // Already has kind= → skip
      if (/\bkind\s*=/.test(attrsStr)) return fullMatch;

      // Look for ReadMe-specific props
      const typeMatch = attrsStr.match(/\btype\s*=\s*(["'])([^"']*)\1/);
      const themeMatch = attrsStr.match(/\btheme\s*=\s*(["'])([^"']*)\1/);
      const iconMatch = attrsStr.match(/\bicon\s*=\s*(["'])([^"']*)\1/);
      const emojiMatch = attrsStr.match(/\bemoji\s*=\s*(["'])([^"']*)\1/);

      // No ReadMe props found → leave as-is
      if (!typeMatch && !themeMatch && !iconMatch && !emojiMatch) {
        return fullMatch;
      }

      // Determine kind (priority: type > theme > icon > emoji)
      let kind = "info";
      if (typeMatch) {
        kind = normalizeKind(typeMatch[2]);
      } else if (themeMatch) {
        kind = normalizeKind(themeMatch[2]);
      } else if (iconMatch) {
        kind = EMOJI_TO_CALLOUT_KIND[iconMatch[2].trim()] || normalizeKind(iconMatch[2]);
      } else if (emojiMatch) {
        kind = EMOJI_TO_CALLOUT_KIND[emojiMatch[2].trim()] || "info";
      }

      // Preserve title prop if it exists
      const titleMatch = attrsStr.match(/\btitle\s*=\s*(["'])([^"']*)\1/);
      const titleAttr = titleMatch ? ` title="${escAttr(titleMatch[2])}"` : "";

      count++;
      return `<Callout kind="${kind}"${titleAttr}>`;
    }
  );

  if (count > 0) {
    changes.push({ type: "callout-jsx", count, detail: `<Callout type/theme/icon> → kind="..."` });
  }

  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  3. ACCORDION → EXPANDABLE
// ════════════════════════════════════════════════════════════

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

  if (count > 0) {
    changes.push({ type: "accordion", count, detail: `<Accordion> → <Expandable>` });
  }

  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  4. CODE GROUP CONVERTER
// ════════════════════════════════════════════════════════════

export function convertCodeGroups(content) {
  const changes = [];
  let count = 0;

  const consecutiveCodeBlocks = /(?:^```[\w-]*[^\n]*\n[\s\S]*?^```[ \t]*\n[ \t]*\n?){2,}/gm;

  const result = content.replace(consecutiveCodeBlocks, (match) => {
    const langs = [...match.matchAll(/^```([\w-]*)/gm)].map((m) => m[1]);
    const uniqueLangs = new Set(langs.filter(Boolean));

    if (uniqueLangs.size >= 2) {
      count++;
      const trimmed = match.replace(/\n+$/, "\n");
      return `<CodeGroup>\n${trimmed}</CodeGroup>\n`;
    }
    return match;
  });

  if (count > 0) {
    changes.push({ type: "codegroup", count, detail: `consecutive code blocks → <CodeGroup>` });
  }

  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  5. EMBED CONVERTER
// ════════════════════════════════════════════════════════════

export function convertEmbeds(content) {
  const changes = [];
  let count = 0;

  let result = content.replace(
    /\[block:embed\]\s*\n([\s\S]*?)\n\s*\[\/block\]/g,
    (match, jsonStr) => {
      try {
        const data = JSON.parse(jsonStr);
        count++;
        const title = data.title ? ` title="${escAttr(data.title)}"` : "";
        return `<iframe src="${escAttr(data.url || data.html)}"${title} width="100%" height="400" />`;
      } catch {
        count++;
        return `{/* [block:embed] could not be parsed */}`;
      }
    }
  );

  result = result.replace(
    /@\[([^\]]*)\]\(([^)]+)\)/g,
    (match, title, url) => {
      count++;
      const titleAttr = title ? ` title="${escAttr(title)}"` : "";
      return `<iframe src="${escAttr(url)}"${titleAttr} width="100%" height="400" />`;
    }
  );

  if (count > 0) {
    changes.push({ type: "embed", count, detail: `@embed / [block:embed] → <iframe>` });
  }

  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  6. IMAGE FIXER
// ════════════════════════════════════════════════════════════

export function fixImages(content) {
  const changes = [];
  let count = 0;

  let result = content.replace(/!\[\]\(([^)]+)\)/g, (match, url) => {
    count++;
    return `![Image](${url})`;
  });

  result = result.replace(
    /<Image(\s[^>]*?)(\s*\/?>)/gi,
    (match, attrs, close) => {
      const cleaned = attrs
        .replace(/\s+(align|border|caption)\s*=\s*(["'][^"']*["']|\{[^}]*\}|\S+)/gi, "")
        .trim();
      if (cleaned !== attrs.trim()) count++;
      return `<Image ${cleaned}${close}`;
    }
  );

  if (count > 0) {
    changes.push({ type: "image", count, detail: `added alt text / removed align,border` });
  }

  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  7. FONT AWESOME → LUCIDE ICON CONVERTER
// ════════════════════════════════════════════════════════════

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
      // Unknown FA icon — strip "fa-" prefix as best-effort fallback
      count++;
      return `icon=${quote}${faIcon.replace(/^fa-/, "")}${quote}`;
    }
  );

  if (count > 0) {
    changes.push({ type: "icon", count, detail: `Font Awesome → Lucide icon names` });
  }

  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  8. CARDS CONVERTER
// ════════════════════════════════════════════════════════════

export function convertCards(content) {
  const changes = [];
  let count = 0;

  let result = content;
  const openMatches = result.match(/<Cards(\s|>)/g);
  if (openMatches) {
    count += openMatches.length;
    result = result.replace(/<Cards(\s|>)/g, "<CardGroup$1");
    result = result.replace(/<\/Cards>/g, "</CardGroup>");
  }

  if (count > 0) {
    changes.push({ type: "cards", count, detail: `<Cards> → <CardGroup>` });
  }

  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  9. BLOCK SYNTAX CONVERTER
//
//  ReadMe's legacy [block:TYPE] JSON [/block] syntax.
//
//  CRITICAL RULES:
//    1. NEVER return raw match — the JSON { } breaks MDX
//    2. NEVER use <!-- --> comments — MDX can't parse them
//    3. Always use {/* JSX comments */} for fallbacks
//
//  Parameter block JSON format:
//    {
//      "data": { "h-0": "Header", "0-0": "Cell value" },
//      "cols": 2,   ← number, NOT an array
//      "rows": 3    ← number, NOT an array
//    }
// ════════════════════════════════════════════════════════════

export function convertBlockSyntax(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /\[block:(\w+)\]\s*\n([\s\S]*?)\n\s*\[\/block\]/g,
    (match, blockType, jsonStr) => {
      let data;
      try {
        data = JSON.parse(jsonStr);
      } catch {
        // Can't leave raw { } in output — MDX will crash
        count++;
        return `{/* [block:${blockType}] could not be parsed */}`;
      }

      count++;

      switch (blockType) {

        // ── Callout ─────────────────────────────────────
        case "callout": {
          const kind = normalizeKind(data.type);
          const title = data.title || "";
          const body = (data.body || "").trim();

          if (!body && !title) return "";
          if (!body) return `<Callout kind="${kind}">\n${title}\n</Callout>`;

          const titleAttr = title ? ` title="${escAttr(title)}"` : "";
          return `<Callout kind="${kind}"${titleAttr}>\n${body}\n</Callout>`;
        }

        // ── Code ────────────────────────────────────────
        case "code": {
          const codes = data.codes || [];
          if (codes.length === 0) return "";

          if (codes.length === 1) {
            const c = codes[0];
            const lang = c.language || "";
            const name = c.name ? ` ${c.name}` : "";
            return `\`\`\`${lang}${name}\n${c.code || ""}\n\`\`\``;
          }

          const blocks = codes.map((c) => {
            const lang = c.language || "";
            const name = c.name ? ` ${c.name}` : "";
            return `\`\`\`${lang}${name}\n${c.code || ""}\n\`\`\``;
          }).join("\n\n");
          return `<CodeGroup>\n${blocks}\n</CodeGroup>`;
        }

        // ── Image ───────────────────────────────────────
        case "image": {
          const images = data.images || [];
          if (images.length === 0) return "";

          return images.map((img) => {
            if (Array.isArray(img.image)) {
              const [url, caption] = img.image;
              return `![${caption || "Image"}](${url})`;
            }
            return `![${img.caption || "Image"}](${img.image || img.url || ""})`;
          }).join("\n\n");
        }

        // ── Parameters / API Header → Markdown Table ────
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

        // ── HTML ────────────────────────────────────────
        case "html": {
          return data.body || data.html || "";
        }

        // ── Unknown — NEVER return raw JSON ─────────────
        default: {
          return `{/* [block:${blockType}] needs manual review */}`;
        }
      }
    }
  );

  if (count > 0) {
    changes.push({ type: "block-syntax", count, detail: `[block:...] → modern MDX components` });
  }

  return { content: result, changes };
}
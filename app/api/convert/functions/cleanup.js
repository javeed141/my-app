// // cleanup.js
// Cleanup pass — runs AFTER all component converters.
// Strips ReadMe-specific artifacts and fixes MDX syntax issues.

// --- 1. Remove import statements ---

export function removeImports(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /^import\s+.*?(?:from\s+['"].*?['"]|['"].*?['"])\s*;?\s*$/gm,
    () => {
      count++;
      return "";
    }
  );

  if (count > 0) {
    changes.push({
      type: "import",
      count,
      detail: "removed import statements",
    });
  }
  return { content: result, changes };
}

// --- 2. Remove export statements ---

export function removeExports(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /^export\s+(const|let|var)\s+\w+\s*=\s*.*?;\s*$/gm,
    () => {
      count++;
      return "";
    }
  );

  if (count > 0) {
    changes.push({
      type: "export",
      count,
      detail: "removed export declarations",
    });
  }
  return { content: result, changes };
}

// --- 3. Remove ReadMe CSS classes (rm-*, readme-*, callout-, rdmd-) ---

export function removeReadmeCssClasses(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /\s+(class|className)\s*=\s*(["'])((?:rm-|readme-|callout[ -]|rdmd-)[\w\s-]*)\2/gi,
    () => {
      count++;
      return "";
    }
  );

  if (count > 0) {
    changes.push({
      type: "css-class",
      count,
      detail: "removed ReadMe CSS classes",
    });
  }
  return { content: result, changes };
}

// --- 4. Fix heading hierarchy ---

export function fixHeadingHierarchy(content) {
  const changes = [];
  const headings = [...content.matchAll(/^(#{1,6})\s/gm)];
  if (headings.length === 0) return { content, changes };

  const levels = headings.map((m) => m[1].length);
  const minLevel = Math.min(...levels);
  if (minLevel <= 2) return { content, changes };

  const bump = minLevel - 2;
  const result = content.replace(/^(#{1,6})\s/gm, (match, hashes) => {
    const newLevel = Math.max(1, hashes.length - bump);
    return "#".repeat(newLevel) + " ";
  });

  changes.push({
    type: "heading",
    count: headings.length,
    detail: `bumped h${minLevel}→h2 (shifted ${bump} levels up)`,
  });
  return { content: result, changes };
}

// --- 5. Left-align all table columns ---

export function fixTableAlignment(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  for (const line of lines) {
    if (/^[ \t]*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    if (/^\|[\s:.-]+\|$/.test(line.trim()) && line.includes("-")) {
      const cells = line.split("|");
      const fixed = cells.map((cell) => {
        const trimmed = cell.trim();
        if (!trimmed) return cell;
        if (!/^:?-+:?$/.test(trimmed)) return cell;
        if (trimmed.startsWith(":") || trimmed.endsWith(":")) return cell;
        const dashCount = trimmed.length;
        count++;
        return " :" + "-".repeat(Math.max(3, dashCount - 1)) + " ";
      });
      result.push(fixed.join("|"));
    } else {
      result.push(line);
    }
  }

  if (count > 0) {
    changes.push({
      type: "table-alignment",
      count,
      detail: "left-aligned table columns (---- → :----)",
    });
  }
  return { content: result.join("\n"), changes };
}

// --- 6. Collapse excessive blank lines (3+ → 2) ---

export function collapseBlankLines(content) {
  return { content: content.replace(/\n{4,}/g, "\n\n\n"), changes: [] };
}

// --- 6a. Fix HTML comments → JSX comments ---

export function fixHtmlComments(content) {
  const changes = [];
  let count = 0;

  const parts = content.split(/(^[ \t]*```[\s\S]*?^[ \t]*```[ \t]*$)/m);
  const rebuilt = [];

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];

    if (/^[ \t]*```/.test(part)) {
      rebuilt.push(part);
      continue;
    }

    let fixed = part.replace(/<!--([\s\S]*?)-->/g, (match, inner) => {
      const idx = part.indexOf(match);
      let backtickCount = 0;
      for (let c = 0; c < idx; c++) {
        if (part[c] === "`") backtickCount++;
      }
      if (backtickCount % 2 === 1) return match;

      count++;
      return `{/*${inner}*/}`;
    });

    rebuilt.push(fixed);
  }

  if (count > 0) {
    changes.push({
      type: "html-comment",
      count,
      detail: "<!-- --> converted to {/* */} (MDX requires JSX comments)",
    });
  }
  return { content: rebuilt.join(""), changes };
}

// --- 6b. Fix void HTML elements ---

export function fixVoidElements(content) {
  const changes = [];
  let count = 0;

  const parts = content.split(/(^[ \t]*```[\s\S]*?^[ \t]*```[ \t]*$)/m);
  const rebuilt = [];

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];

    if (/^[ \t]*```/.test(part)) {
      rebuilt.push(part);
      continue;
    }

    let fixed = part;
    fixed = fixed.replace(/<br\s*(?!\/)\s*>/gi, () => { count++; return "<br/>"; });
    fixed = fixed.replace(/<hr\s*(?!\/)\s*>/gi, () => { count++; return "<hr/>"; });
    fixed = fixed.replace(/<img(\s[^>]*?)(?<!\/)>/gi, (m, attrs) => { count++; return `<img${attrs} />`; });
    fixed = fixed.replace(/<input(\s[^>]*?)(?<!\/)>/gi, (m, attrs) => { count++; return `<input${attrs} />`; });
    fixed = fixed.replace(/<source(\s[^>]*?)(?<!\/)>/gi, (m, attrs) => { count++; return `<source${attrs} />`; });
    rebuilt.push(fixed);
  }

  if (count > 0) {
    changes.push({
      type: "void-element",
      count,
      detail: "self-closed void HTML elements for MDX",
    });
  }
  return { content: rebuilt.join(""), changes };
}

// --- 7. Fix angle brackets that break MDX ---

const SAFE_TAGS = new Set([
  "br", "hr", "img", "input", "meta", "link", "source", "area", "base",
  "col", "embed", "wbr",
  "div", "span", "p", "a", "table", "thead", "tbody", "tfoot", "tr", "th",
  "td", "ul", "ol", "li", "pre", "code", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "em", "strong", "del", "sub", "sup", "b", "i", "u", "s", "small", "mark",
  "abbr", "cite", "q", "kbd",
  "details", "summary", "section", "article", "aside", "header", "footer",
  "nav", "main", "figure", "figcaption",
  "iframe", "video", "audio", "svg", "path", "circle", "rect", "line",
  "polyline", "polygon", "g", "dl", "dt", "dd",
  "Callout",
  "Card", "Columns",
  "Image",
  "Video", "Iframe",
  "CodeGroup",
  "Expandable", "ExpandableGroup",
  "Steps", "Step",
  "Tabs", "Tab",
  "Update",
  "ParamField", "ResponseField",
  "Request", "Response",
  "Frame", "Icon",
  "Column",
]);
// --- Fix backslash escapes that break MDX ---

export function fixBackslashEscapes(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  for (const line of lines) {
    if (/^[ \t]*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    let fixed = "";
    let inInlineCode = false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === "`") {
        inInlineCode = !inInlineCode;
        fixed += line[i];
        continue;
      }

      if (inInlineCode) {
        fixed += line[i];
        continue;
      }

      if (line[i] === "\\" && i + 1 < line.length) {
        const next = line[i + 1];
        if ("_#|[](){}*~`<>!".includes(next)) {
          count++;
          continue;
        }
      }

      fixed += line[i];
    }

    result.push(fixed);
  }

  if (count > 0) {
    changes.push({
      type: "backslash-escape",
      count,
      detail: "removed unnecessary backslash escapes that break MDX",
    });
  }
  return { content: result.join("\n"), changes };
}
export function fixAngleBrackets(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  for (const line of lines) {
    if (/^[ \t]*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Skip JSX comment lines entirely — don't touch angle brackets inside comments
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("{/*") && trimmedLine.endsWith("*/}")) {
      result.push(line);
      continue;
    }

    let fixed = "";
    let inInlineCode = false;
    let inJsxComment = false;
    let i = 0;

    while (i < line.length) {
      if (line[i] === "`") {
        inInlineCode = !inInlineCode;
        fixed += line[i];
        i++;
        continue;
      }

      if (inInlineCode) {
        fixed += line[i];
        i++;
        continue;
      }

      // Track JSX comment boundaries within a line
      if (line.substring(i, i + 3) === "{/*") {
        inJsxComment = true;
        fixed += line[i];
        i++;
        continue;
      }
      if (inJsxComment && line.substring(i, i + 3) === "*/}") {
        fixed += "*/}";
        i += 3;
        inJsxComment = false;
        continue;
      }
      if (inJsxComment) {
        fixed += line[i];
        i++;
        continue;
      }

      if (line[i] === "<") {
        const closeIdx = line.indexOf(">", i + 1);

        if (closeIdx === -1) {
          fixed += line[i];
          i++;
          continue;
        }

        const inside = line.substring(i + 1, closeIdx);
        const fullTag = line.substring(i, closeIdx + 1);

        if (/^https?:\/\//.test(inside)) {
          fixed += `[${inside}](${inside})`;
          count++;
          i = closeIdx + 1;
          continue;
        }

        if (
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inside)
        ) {
          fixed += `[${inside}](mailto:${inside})`;
          count++;
          i = closeIdx + 1;
          continue;
        }

        const tagNameMatch = inside.match(/^\/?([a-zA-Z][a-zA-Z0-9]*)/);
        if (tagNameMatch && SAFE_TAGS.has(tagNameMatch[1])) {
          fixed += fullTag;
          i = closeIdx + 1;
          continue;
        }

        fixed += "`" + fullTag + "`";
        count++;
        i = closeIdx + 1;
        continue;
      }

      fixed += line[i];
      i++;
    }

    result.push(fixed);
  }

  if (count > 0) {
    changes.push({
      type: "angle-bracket",
      count,
      detail: "escaped angle brackets that break MDX parsing",
    });
  }
  return { content: result.join("\n"), changes };
}

// --- 8. Fix curly braces that break MDX ---

export function fixCurlyBraces(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  for (const line of lines) {
    if (/^[ \t]*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Skip JSX comment lines entirely — don't escape braces inside comments
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("{/*") && trimmedLine.endsWith("*/}")) {
      result.push(line);
      continue;
    }

    const inCode = new Array(line.length).fill(false);
    let inIC = false;
    for (let c = 0; c < line.length; c++) {
      if (line[c] === "`") {
        inIC = !inIC;
        inCode[c] = true;
        continue;
      }
      inCode[c] = inIC;
    }

    let fixed = "";
    let inJsxComment = false;

    for (let i = 0; i < line.length; i++) {
      if (inCode[i]) {
        fixed += line[i];
        continue;
      }

      // Track JSX comment boundaries within a line
      if (line.substring(i, i + 3) === "{/*") {
        inJsxComment = true;
        fixed += line[i];
        continue;
      }
      if (inJsxComment && line.substring(i, i + 3) === "*/}") {
        fixed += "*/}";
        i += 2; // +2 because loop does i++
        inJsxComment = false;
        continue;
      }
      if (inJsxComment) {
        fixed += line[i];
        continue;
      }

      if (line[i] === "{") {
        if (line.substring(i, i + 3) === "{/*") {
          fixed += line[i];
          continue;
        }
        if (i > 0 && line[i - 1] === "=") {
          fixed += line[i];
          continue;
        }
        const beforeStr = line.substring(0, i);
        const lastOpen = beforeStr.lastIndexOf("<");
        const lastClose = beforeStr.lastIndexOf(">");
        if (lastOpen > lastClose) {
          fixed += line[i];
          continue;
        }
        fixed += "\\{";
        count++;
        continue;
      }

      if (line[i] === "}") {
        if (i > 0 && line[i - 1] === "\\") {
          fixed += line[i];
          continue;
        }
        if (i >= 2 && line[i - 2] === "*" && line[i - 1] === "/") {
          fixed += line[i];
          continue;
        }
        const beforeStr = line.substring(0, i);
        const lastBrace = beforeStr.lastIndexOf("{");
        if (lastBrace >= 0 && lastBrace > 0 && line[lastBrace - 1] === "=") {
          fixed += line[i];
          continue;
        }
        const lastOpen = beforeStr.lastIndexOf("<");
        const lastClose = beforeStr.lastIndexOf(">");
        if (lastOpen > lastClose) {
          fixed += line[i];
          continue;
        }
        fixed += "\\}";
        count++;
        continue;
      }

      fixed += line[i];
    }
    result.push(fixed);
  }

  if (count > 0) {
    changes.push({
      type: "curly-brace",
      count,
      detail: "escaped bare { } in text (MDX treats as JSX expressions)",
    });
  }
  return { content: result.join("\n"), changes };
}

// --- 9. Remove orphaned }; ---

export function removeOrphanedClosingBraces(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  for (const line of lines) {
    if (/^[ \t]*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    if (/^[ \t]*\};?\s*$/.test(line)) {
      count++;
      continue;
    }

    result.push(line);
  }

  if (count > 0) {
    changes.push({
      type: "orphaned-brace",
      count,
      detail: "removed orphaned }; left after unknown component extraction",
    });
  }
  return { content: result.join("\n"), changes };
}

// --- Scan for unknown components ---

const KNOWN_COMPONENTS = new Set([
  "div", "span", "p", "a", "img", "br", "hr", "table", "thead", "tbody",
  "tr", "th", "td", "ul", "ol", "li", "pre", "code", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6", "em", "strong", "del", "sub", "sup",
  "details", "summary", "section", "article", "aside", "header", "footer",
  "nav", "main", "figure", "figcaption", "iframe", "video", "audio", "source",
  "svg", "path", "circle", "rect", "line", "polyline", "polygon", "g",
  "kbd", "input", "meta", "link",
  "Callout",
  "Card", "Columns",
  "Image",
  "Video", "Iframe",
  "CodeGroup",
  "Expandable", "ExpandableGroup",
  "Steps", "Step",
  "Tabs", "Tab",
  "Update",
  "ParamField", "ResponseField",
  "Request", "Response",
  "Frame", "Icon",
]);

export function scanUnknownComponents(content) {
  const unknowns = new Map();
  const componentBlocks = [];

  const tagRegex = /<([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)?)\b/g;
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const name = match[1];
    if (!KNOWN_COMPONENTS.has(name)) {
      unknowns.set(name, (unknowns.get(name) || 0) + 1);
    }
  }

  let cleanedContent = content;

  for (const [name] of unknowns) {
    let raw = "";

    const definition = extractComponentDefinition(cleanedContent, name);
    if (definition) {
      raw += definition + "\n\n";
      cleanedContent = cleanedContent.replace(definition, "");
    }

    let usage;
    while ((usage = extractUsage(cleanedContent, name)) !== null) {
      raw += usage + "\n\n";
      cleanedContent = cleanedContent.replace(usage, "");
    }

    cleanedContent = cleanedContent.replace(/^\s*\};\s*$/gm, "");

    const message = `{/* ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ UNKNOWN COMPONENT: <${name}> was removed. This component is not supported by Documentation.AI. Stored in /unknown-components/${name}.mdx — needs manual review or AI conversion. ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ */}`;

    if (!cleanedContent.includes(message)) {
      cleanedContent = message + "\n\n" + cleanedContent;
    }

    componentBlocks.push({ name, raw: raw.trim() });
  }

  cleanedContent = cleanedContent.replace(/\n{3,}/g, "\n\n");

  return { unknowns, componentBlocks, content: cleanedContent };
}

function extractComponentDefinition(content, name) {
  const escaped = escapeRegex(name);

  const startPatterns = [
    new RegExp(`^export\\s+const\\s+${escaped}\\s*=`, "m"),
    new RegExp(`^export\\s+function\\s+${escaped}\\s*\\(`, "m"),
    new RegExp(`^const\\s+${escaped}\\s*=`, "m"),
    new RegExp(`^function\\s+${escaped}\\s*\\(`, "m"),
  ];

  for (const regex of startPatterns) {
    const match = regex.exec(content);
    if (!match) continue;

    const startIdx = match.index;

    let braceDepth = 0;
    let parenDepth = 0;
    let foundFirstBrace = false;
    let inString = false;
    let stringChar = "";
    let inTemplateLiteral = false;
    let i = startIdx;

    while (i < content.length) {
      const ch = content[i];
      const prev = i > 0 ? content[i - 1] : "";

      if (!inTemplateLiteral && (ch === '"' || ch === "'")) {
        if (!inString) {
          inString = true;
          stringChar = ch;
        } else if (ch === stringChar && prev !== "\\") {
          inString = false;
        }
        i++;
        continue;
      }

      if (ch === "`" && !inString) {
        inTemplateLiteral = !inTemplateLiteral;
        i++;
        continue;
      }

      if (inString || inTemplateLiteral) {
        i++;
        continue;
      }

      if (ch === "(") parenDepth++;
      else if (ch === ")") parenDepth--;

      if (ch === "{") {
        if (parenDepth === 0) {
          braceDepth++;
          foundFirstBrace = true;
        }
      } else if (ch === "}") {
        if (parenDepth === 0) {
          braceDepth--;
          if (foundFirstBrace && braceDepth === 0) {
            let endIdx = i + 1;
            while (endIdx < content.length && (content[endIdx] === ";" || content[endIdx] === " " || content[endIdx] === "\t")) {
              endIdx++;
            }
            if (endIdx < content.length && content[endIdx] === "\n") {
              endIdx++;
            }
            return content.slice(startIdx, endIdx).trim();
          }
        }
      }

      if (!foundFirstBrace && ch === ";" && braceDepth === 0 && parenDepth === 0) {
        const slice = content.slice(startIdx, i + 1);
        if (/=>/.test(slice)) {
          return slice.trim();
        }
      }

      i++;
    }

    const fallbackRegex = new RegExp(
      escapeRegex(match[0]) + `[\\s\\S]*?(?=\\n\\n|\\nexport\\s|$)`,
      "m"
    );
    const fallbackMatch = fallbackRegex.exec(content);
    if (fallbackMatch) return fallbackMatch[0].trim();
  }

  return null;
}

function extractUsage(content, name) {
  const escaped = escapeRegex(name);
  const startMatch = new RegExp(`<${escaped}\\b`).exec(content);
  if (!startMatch) return null;

  const remaining = content.slice(startMatch.index);

  const selfClosing = new RegExp(`^<${escaped}\\b[^>]*/>`);
  const selfMatch = selfClosing.exec(remaining);
  if (selfMatch) return selfMatch[0];

  const openTag = new RegExp(`<${escaped}\\b`, "g");
  const closeTag = new RegExp(`</${escaped}\\s*>`, "g");
  let depth = 0;
  let i = 0;

  while (i < remaining.length) {
    openTag.lastIndex = i;
    closeTag.lastIndex = i;

    const openMatch = openTag.exec(remaining);
    const closeMatch = closeTag.exec(remaining);

    if (!openMatch && !closeMatch) break;

    const openIdx = openMatch ? openMatch.index : Infinity;
    const closeIdx = closeMatch ? closeMatch.index : Infinity;

    if (openIdx < closeIdx) {
      depth++;
      i = openIdx + openMatch[0].length;
    } else {
      depth--;
      if (depth === 0) {
        return remaining.slice(0, closeMatch.index + closeMatch[0].length);
      }
      i = closeIdx + closeMatch[0].length;
    }
  }

  return null;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
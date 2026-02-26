// cleanup.js
// Cleanup pass — runs AFTER all component converters.
// Strips ReadMe-specific artifacts and fixes MDX syntax issues.
//
// The component scanner & classifier have been moved to scanner.js.
// They are re-exported here for backward compatibility with route.js.

// Re-export scanner functions so route.js imports don't need to change
export { scanUnknownComponents } from "./scanner.js";

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

// =====================================================================
// FIX: Replace your removeExports function in cleanup.js with this one
// =====================================================================
//
// BUG: The old removeExports only matched single-line exports like:
//        export const foo = 'bar';
//
//      Multi-line exports like this were NEVER removed:
//        export const QuickLink = ({ title }) => {
//          return (<a>...</a>);
//        };
//
//      This left raw JSX in the MDX content, causing:
//        "Could not parse import/exports with acorn (line 1, column 28)"
//
// FIX: Added a second pass that uses brace-depth counting to find
//      and remove multi-line export blocks (arrow functions, function
//      declarations with JSX bodies, etc.)
// =====================================================================

export function removeExports(content) {
  const changes = [];
  let count = 0;
  let result = content;

  // Pass 1: Remove simple single-line exports
  // e.g. export const API_URL = 'https://...';
  result = result.replace(
    /^export\s+(const|let|var)\s+\w+\s*=\s*[^{]*?;\s*$/gm,
    () => {
      count++;
      return "";
    }
  );

  // Pass 2: Remove multi-line export blocks
  // e.g. export const QuickLink = ({ title }) => { return (...); };
  // e.g. export function MyComponent() { return (...); }
  const multiLinePattern =
    /^export\s+(?:(?:const|let|var)\s+\w+\s*=|function\s+\w+\s*\()/m;

  let safetyLimit = 50;
  let match;

  while ((match = multiLinePattern.exec(result)) !== null && safetyLimit-- > 0) {
    const startIdx = match.index;

    // Walk through the code counting braces to find the end of the block
    let braceDepth = 0;
    let parenDepth = 0;
    let foundFirstBrace = false;
    let inString = false;
    let stringChar = "";
    let i = startIdx;

    while (i < result.length) {
      const ch = result[i];
      const prev = i > 0 ? result[i - 1] : "";

      // Skip string contents
      if (!inString && (ch === '"' || ch === "'")) {
        inString = true;
        stringChar = ch;
        i++;
        continue;
      }
      if (inString && ch === stringChar && prev !== "\\") {
        inString = false;
        i++;
        continue;
      }
      if (inString) {
        i++;
        continue;
      }

      // Track parentheses
      if (ch === "(") parenDepth++;
      else if (ch === ")") parenDepth--;

      // Track braces (only when not inside parens)
      if (ch === "{" && parenDepth === 0) {
        braceDepth++;
        foundFirstBrace = true;
      } else if (ch === "}" && parenDepth === 0) {
        braceDepth--;

        // When we're back to depth 0, we found the end
        if (foundFirstBrace && braceDepth === 0) {
          let endIdx = i + 1;

          // Eat trailing semicolons and spaces
          while (
            endIdx < result.length &&
            (result[endIdx] === ";" ||
              result[endIdx] === " " ||
              result[endIdx] === "\t")
          ) {
            endIdx++;
          }

          // Eat the newline after the block
          if (endIdx < result.length && result[endIdx] === "\n") {
            endIdx++;
          }

          // Remove the entire block
          result = result.slice(0, startIdx) + result.slice(endIdx);
          count++;
          break;
        }
      }

      // Fallback for arrow functions with paren body: export const X = () => (...);
      // These have NO braces at parenDepth 0, so foundFirstBrace is never set.
      // Detect the end by finding ; when all parens/braces are closed.
      if (!foundFirstBrace && ch === ";" && braceDepth === 0 && parenDepth === 0) {
        const slice = result.slice(startIdx, i + 1);
        if (/=>/.test(slice)) {
          let endIdx = i + 1;

          // Eat trailing spaces
          while (
            endIdx < result.length &&
            (result[endIdx] === " " || result[endIdx] === "\t")
          ) {
            endIdx++;
          }

          // Eat the newline after the block
          if (endIdx < result.length && result[endIdx] === "\n") {
            endIdx++;
          }

          result = result.slice(0, startIdx) + result.slice(endIdx);
          count++;
          break;
        }
      }

      i++;
    }

    // Safety: couldn't find closing brace — stop
    if (i >= result.length) break;
  }

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

// --- 6. Remove empty code fences ---

export function removeEmptyCodeFences(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /^[ \t]*```\w*\s*\n[ \t]*```[ \t]*$/gm,
    () => { count++; return ""; }
  );

  if (count > 0) {
    changes.push({
      type: "empty-code-fence",
      count,
      detail: "removed empty code fences",
    });
  }
  return { content: result, changes };
}

// --- 6a. Collapse excessive blank lines (3+ → 2) ---

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
//
// Escapes bare { } in plain text (MDX interprets them as JSX expressions).
// Must NOT escape braces inside:
//   - Code blocks / inline code
//   - JSX comments ({/* ... */})
//   - JSX tag attributes and expressions, including MULTI-LINE props
//     e.g. <Component data={[ { key: "val" } ]} />
//
// KEY FIX: State is tracked ACROSS lines (not per-line) so that
// multi-line JSX attribute expressions are handled correctly.

export function fixCurlyBraces(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  // Cross-line state for JSX tracking
  let inJsxTag = false;       // Between <Tag and closing >
  let jsxExprDepth = 0;       // Brace depth inside JSX attribute expressions
  let inJsxComment = false;   // Between {/* and */}
  let inString = false;       // Inside a quoted string (within JSX tag/expression)
  let stringChar = "";

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
      const ch = line[i];

      // --- 1. Inline code (`...`) ---
      if (ch === "`" && !inJsxComment && !inString) {
        inInlineCode = !inInlineCode;
        fixed += ch;
        continue;
      }
      if (inInlineCode) {
        fixed += ch;
        continue;
      }

      // --- 2. JSX comment ({/* ... */}) — cross-line ---
      if (!inJsxComment && !inString && line.substring(i, i + 3) === "{/*") {
        inJsxComment = true;
        fixed += ch;
        continue;
      }
      if (inJsxComment) {
        if (line.substring(i, i + 3) === "*/}") {
          fixed += "*/}";
          i += 2;
          inJsxComment = false;
        } else {
          fixed += ch;
        }
        continue;
      }

      // --- 3. String tracking (inside JSX tags/expressions only) ---
      if ((inJsxTag || jsxExprDepth > 0) && !inString && (ch === '"' || ch === "'")) {
        inString = true;
        stringChar = ch;
        fixed += ch;
        continue;
      }
      if (inString) {
        if (ch === stringChar && (i === 0 || line[i - 1] !== "\\")) {
          inString = false;
        }
        fixed += ch;
        continue;
      }

      // --- 4. Inside a JSX attribute expression ({...}) — cross-line ---
      if (jsxExprDepth > 0) {
        if (ch === "{") {
          jsxExprDepth++;
        } else if (ch === "}") {
          jsxExprDepth--;
          // depth 0 → back in JSX tag attribute area
        }
        fixed += ch;
        continue;
      }

      // --- 5. Inside a JSX tag's attribute area (<Tag ... >) ---
      if (inJsxTag) {
        if (ch === "{") {
          jsxExprDepth = 1;
          fixed += ch;
          continue;
        }
        if (ch === ">") {
          inJsxTag = false;
          fixed += ch;
          continue;
        }
        fixed += ch;
        continue;
      }

      // --- 6. Detect start of JSX/HTML tag ---
      if (ch === "<" && i + 1 < line.length && /^[a-zA-Z\/!]/.test(line.substring(i + 1))) {
        inJsxTag = true;
        fixed += ch;
        continue;
      }

      // --- 7. Plain text — escape bare braces ---
      if (ch === "{") {
        if (line.substring(i, i + 3) === "{/*") {
          inJsxComment = true;
          fixed += ch;
          continue;
        }
        fixed += "\\{";
        count++;
        continue;
      }

      if (ch === "}") {
        if (i >= 2 && line[i - 2] === "*" && line[i - 1] === "/") {
          fixed += ch;
          continue;
        }
        fixed += "\\}";
        count++;
        continue;
      }

      fixed += ch;
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

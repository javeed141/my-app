// cleanup.js
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
// If all headings start at h3+, bump them up so the smallest becomes h2.

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

// --- 5. Collapse excessive blank lines (3+ → 2) ---

export function collapseBlankLines(content) {
  return { content: content.replace(/\n{4,}/g, "\n\n\n"), changes: [] };
}

// --- 6a. Fix HTML comments → JSX comments ---
// MDX doesn't support <!-- -->. Converts to {/* */}.
// Skips content inside fenced code blocks and inline code.

export function fixHtmlComments(content) {
  const changes = [];
  let count = 0;

  // Split by fenced code blocks to protect them
  const parts = content.split(/(^[ \t]*```[\s\S]*?^[ \t]*```[ \t]*$)/m);
  const rebuilt = [];

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];

    // Code blocks — pass through unchanged
    if (/^[ \t]*```/.test(part)) {
      rebuilt.push(part);
      continue;
    }

    // Convert HTML comments to JSX in non-code content
    let fixed = part.replace(/<!--([\s\S]*?)-->/g, (match, inner) => {
      // Skip if inside inline code backticks
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
// MDX requires all void elements to be self-closing: <br> → <br/>

export function fixVoidElements(content) {
  const changes = [];
  let count = 0;

  // Split by fenced code blocks to protect them
  const parts = content.split(/(^[ \t]*```[\s\S]*?^[ \t]*```[ \t]*$)/m);
  const rebuilt = [];

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];

    // Code blocks — pass through unchanged
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
// MDX treats <anything> as a JSX tag. This converts:
//   <https://...>  → [url](url)
//   <user@host>    → [email](mailto:email)
//   <PLACEHOLDER>  → `<PLACEHOLDER>`
// Preserves real HTML/JSX tags and content inside code blocks/inline code.

// Tags that are legitimate HTML or Documentation.AI components
const SAFE_TAGS = new Set([
  // HTML void
  "br", "hr", "img", "input", "meta", "link", "source", "area", "base",
  "col", "embed", "wbr",
  // HTML container
  "div", "span", "p", "a", "table", "thead", "tbody", "tfoot", "tr", "th",
  "td", "ul", "ol", "li", "pre", "code", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "em", "strong", "del", "sub", "sup", "b", "i", "u", "s", "small", "mark",
  "abbr", "cite", "q", "kbd",
  "details", "summary", "section", "article", "aside", "header", "footer",
  "nav", "main", "figure", "figcaption",
  "iframe", "video", "audio", "svg", "path", "circle", "rect", "line",
  "polyline", "polygon", "g", "dl", "dt", "dd",
  // Documentation.AI components (all 16)
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
  // Legacy (kept for compatibility during conversion)
  "Column",
]);

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

    // Process character by character, respecting inline code
    let fixed = "";
    let inInlineCode = false;
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

      if (line[i] === "<") {
        const closeIdx = line.indexOf(">", i + 1);

        if (closeIdx === -1) {
          fixed += line[i];
          i++;
          continue;
        }

        const inside = line.substring(i + 1, closeIdx);
        const fullTag = line.substring(i, closeIdx + 1);

        // Autolink URL: <https://...>
        if (/^https?:\/\//.test(inside)) {
          fixed += `[${inside}](${inside})`;
          count++;
          i = closeIdx + 1;
          continue;
        }

        // Email autolink: <user@example.com>
        if (
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inside)
        ) {
          fixed += `[${inside}](mailto:${inside})`;
          count++;
          i = closeIdx + 1;
          continue;
        }

        // Known HTML/JSX tag → leave alone
        const tagNameMatch = inside.match(/^\/?([a-zA-Z][a-zA-Z0-9]*)/);
        if (tagNameMatch && SAFE_TAGS.has(tagNameMatch[1])) {
          fixed += fullTag;
          i = closeIdx + 1;
          continue;
        }

        // Unknown text in angle brackets → wrap in inline code
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
// MDX treats { } as JSX expressions. Bare braces in text get escaped: { → \{
// Skips: code blocks, inline code, JSX attribute values (={...}), inside JSX tags

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

    // Build a mask of which characters are inside inline code
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
    for (let i = 0; i < line.length; i++) {
      if (inCode[i]) {
        fixed += line[i];
        continue;
      }

      if (line[i] === "{") {
        // JSX comment: {/* ... */} → skip
        if (line.substring(i, i + 3) === "{/*") {
          fixed += line[i];
          continue;
        }
        // JSX attribute value: ={...} → skip
        if (i > 0 && line[i - 1] === "=") {
          fixed += line[i];
          continue;
        }
        // Inside a JSX tag's attributes
        const beforeStr = line.substring(0, i);
        const lastOpen = beforeStr.lastIndexOf("<");
        const lastClose = beforeStr.lastIndexOf(">");
        if (lastOpen > lastClose) {
          fixed += line[i];
          continue;
        }
        // Bare { in text → escape
        fixed += "\\{";
        count++;
        continue;
      }

      if (line[i] === "}") {
        if (i > 0 && line[i - 1] === "\\") {
          fixed += line[i];
          continue;
        }
        // JSX comment closing: */} → skip
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

// --- Scan for unknown components ---
// Flags JSX components that Documentation.AI doesn't recognize.

const KNOWN_COMPONENTS = new Set([
  // HTML
  "div", "span", "p", "a", "img", "br", "hr", "table", "thead", "tbody",
  "tr", "th", "td", "ul", "ol", "li", "pre", "code", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6", "em", "strong", "del", "sub", "sup",
  "details", "summary", "section", "article", "aside", "header", "footer",
  "nav", "main", "figure", "figcaption", "iframe", "video", "audio", "source",
  "svg", "path", "circle", "rect", "line", "polyline", "polygon", "g",
  "kbd", "input", "meta", "link",
  // Documentation.AI components
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

  const tagRegex = /<([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)?)\b/g;
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const name = match[1];
    if (!KNOWN_COMPONENTS.has(name)) {
      unknowns.set(name, (unknowns.get(name) || 0) + 1);
    }
  }

  const warnings = [];
  for (const [name, cnt] of unknowns) {
    warnings.push(
      `{/* NOTE: <${name}> appears ${cnt} time(s). Documentation.AI does not have this component. Manual conversion needed. */}`
    );
  }

  return { unknowns, warnings };
}
// ════════════════════════════════════════════════════════════
//  CLEANUP PASS
//
//  Final pass over the converted MDX to remove artifacts
//  that are ReadMe-specific and have no meaning in
//  Documentation.AI.
//
//  Runs AFTER all component converters.
// ════════════════════════════════════════════════════════════

// ── 1. Remove import statements ──────────────────────────────

export function removeImports(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /^import\s+.*?(?:from\s+['"].*?['"]|['"].*?['"])\s*;?\s*$/gm,
    () => { count++; return ""; }
  );

  if (count > 0) {
    changes.push({ type: "import", count, detail: "removed import statements" });
  }
  return { content: result, changes };
}

// ── 2. Remove export statements ──────────────────────────────

export function removeExports(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /^export\s+(const|let|var)\s+\w+\s*=\s*.*?;\s*$/gm,
    () => { count++; return ""; }
  );

  if (count > 0) {
    changes.push({ type: "export", count, detail: "removed export declarations" });
  }
  return { content: result, changes };
}

// ── 3. Remove ReadMe CSS classes ─────────────────────────────

export function removeReadmeCssClasses(content) {
  const changes = [];
  let count = 0;

  const result = content.replace(
    /\s+(class|className)\s*=\s*(["'])((?:rm-|readme-|callout[ -]|rdmd-)[\w\s-]*)\2/gi,
    () => { count++; return ""; }
  );

  if (count > 0) {
    changes.push({ type: "css-class", count, detail: "removed ReadMe CSS classes" });
  }
  return { content: result, changes };
}

// ── 4. Fix heading hierarchy ─────────────────────────────────

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

// ── 5. Collapse excessive blank lines ────────────────────────

export function collapseBlankLines(content) {
  return { content: content.replace(/\n{4,}/g, "\n\n\n"), changes: [] };
}

// ════════════════════════════════════════════════════════════
//  6a. FIX HTML COMMENTS → JSX COMMENTS  (NEW)
//
//  MDX does NOT support HTML comments. They cause:
//    "Unexpected character `!` (U+0021) before name"
//
//  Converts:
//    <!-- comment -->   →   {/* comment */}
//
//  Skips content inside fenced code blocks and inline code.
// ════════════════════════════════════════════════════════════

export function fixHtmlComments(content) {
  const changes = [];
  let count = 0;

  // Split by fenced code blocks to protect them
  const parts = content.split(/(^[ \t]*```[\s\S]*?^[ \t]*```[ \t]*$)/m);
  const rebuilt = [];

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];

    // Code blocks (odd indices from the split) — pass through untouched
    if (/^[ \t]*```/.test(part)) {
      rebuilt.push(part);
      continue;
    }

    // Non-code content — convert HTML comments to JSX
    let fixed = part.replace(/<!--([\s\S]*?)-->/g, (match, inner) => {
      // Check if inside inline code backticks
      // Find position and count backticks before it
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

// ════════════════════════════════════════════════════════════
//  6b. FIX VOID HTML ELEMENTS
//
//  MDX requires ALL void elements to be self-closing:
//    <br>   →  <br/>
//    <hr>   →  <hr/>
//    <img ...>  →  <img ... />
//
//  Without this, MDX throws:
//    "Expected a closing tag for <br>"
//
//  This is the #1 error on schema pages where table cells
//  contain dozens of <br> tags for field descriptions.
//
//  PAGES AFFECTED (docs.datafiniti.co):
//    - product-data-schema  (50+ <br> in table cells)
//    - property-data-schema (60+ <br> in table cells)
//    - people-data-schema   (30+ <br> in table cells)
//    - business-data-schema (40+ <br> in table cells)
//    - All "field type breakdown" pages
//    - [block:parameters] converted tables (use <br/> in cells)
// ════════════════════════════════════════════════════════════

export function fixVoidElements(content) {
  const changes = [];
  let count = 0;

  let result = content;

  // <br> or <br > → <br/>   (skip already self-closed <br/> or <br />)
  result = result.replace(/<br\s*(?!\/)\s*>/gi, () => { count++; return "<br/>"; });

  // <hr> → <hr/>
  result = result.replace(/<hr\s*(?!\/)\s*>/gi, () => { count++; return "<hr/>"; });

  // <img ...> → <img ... />
  result = result.replace(/<img(\s[^>]*?)(?<!\/)>/gi, (m, attrs) => { count++; return `<img${attrs} />`; });

  // <input ...> → <input ... />
  result = result.replace(/<input(\s[^>]*?)(?<!\/)>/gi, (m, attrs) => { count++; return `<input${attrs} />`; });

  // <source ...> → <source ... />
  result = result.replace(/<source(\s[^>]*?)(?<!\/)>/gi, (m, attrs) => { count++; return `<source${attrs} />`; });

  if (count > 0) {
    changes.push({ type: "void-element", count, detail: "self-closed void HTML elements for MDX" });
  }
  return { content: result, changes };
}

// ════════════════════════════════════════════════════════════
//  7. FIX ANGLE BRACKETS THAT BREAK MDX  (NEW)
//
//  MDX treats ANYTHING inside < > as a JSX/HTML tag.
//  Non-tag content in angle brackets causes parse errors:
//
//  ERROR: "Unexpected character '/' before local name"
//  CAUSE: <https://portal.datafiniti.co/settings/api>
//  FIX:   [https://portal.datafiniti.co/settings/api](https://portal.datafiniti.co/settings/api)
//
//  ERROR: "Expected a closing tag for <URL>"
//  CAUSE: <URL>, <downloadID_#>, <API_TOKEN>, <YOUR_API_KEY>
//  FIX:   `<URL>`, `<downloadID_#>`, `<API_TOKEN>`, `<YOUR_API_KEY>`
//
//  PAGES AFFECTED (docs.datafiniti.co):
//    - property-data-with-curl    (<downloadID_#>, <https://...>)
//    - property-data-with-postman (<downloadID_#>)
//    - people-data-with-postman   (<downloadID_#>)
//    - people-data-with-curl      (<downloadID_#>, <https://...>)
//    - product-data-with-postman  (<downloadID_#>)
//    - product-data-with-curl     (<downloadID_#>, <https://...>)
//    - business-data-with-postman (<downloadID_#>)
//    - business-data-with-curl    (<downloadID_#>, <https://...>)
//    - All "enrichment" pages     (<URL>, <API_TOKEN>)
//    - Any page with autolink URLs in callout bodies
//
//  PRESERVES:
//    - Real HTML tags: <div>, <br/>, <img>, <table> etc.
//    - Documentation.AI components: <Callout>, <Card>, <Tabs> etc.
//    - Content inside fenced code blocks (``` ... ```)
//    - Content inside inline code (` ... `)
// ════════════════════════════════════════════════════════════

// Tags that are legitimate HTML/JSX — never escape these
const SAFE_TAGS = new Set([
  // HTML void
  "br","hr","img","input","meta","link","source","area","base","col","embed","wbr",
  // HTML container
  "div","span","p","a","table","thead","tbody","tfoot","tr","th","td","ul","ol","li",
  "pre","code","blockquote","h1","h2","h3","h4","h5","h6","em","strong","del","sub","sup",
  "b","i","u","s","small","mark","abbr","cite","q","kbd",
  "details","summary","section","article","aside","header","footer","nav","main",
  "figure","figcaption","iframe","video","audio","svg","path","circle","rect",
  "line","polyline","polygon","g","dl","dt","dd",
  // Documentation.AI components
  "Callout","Expandable","ExpandableGroup","CodeGroup","Card","CardGroup",
  "Columns","Column","Tab","Tabs","Image","Icon","Steps","Step","Tooltip","Frame",
  "Update","ParamField","ResponseField",
]);

export function fixAngleBrackets(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  for (const line of lines) {
    // Track fenced code blocks — don't touch anything inside
    if (/^[ \t]*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Process line character by character, respecting inline code
    let fixed = "";
    let inInlineCode = false;
    let i = 0;

    while (i < line.length) {
      // Toggle inline code tracking
      if (line[i] === "`") {
        inInlineCode = !inInlineCode;
        fixed += line[i];
        i++;
        continue;
      }

      // Inside inline code → pass through unchanged
      if (inInlineCode) {
        fixed += line[i];
        i++;
        continue;
      }

      // Found < outside of code → analyze what's inside
      if (line[i] === "<") {
        const closeIdx = line.indexOf(">", i + 1);

        // No closing > on this line → pass through
        if (closeIdx === -1) {
          fixed += line[i];
          i++;
          continue;
        }

        const inside = line.substring(i + 1, closeIdx);
        const fullTag = line.substring(i, closeIdx + 1);

        // ── Autolink URL: <https://...> or <http://...> ──────
        if (/^https?:\/\//.test(inside)) {
          fixed += `[${inside}](${inside})`;
          count++;
          i = closeIdx + 1;
          continue;
        }

        // ── Email autolink: <user@example.com> ──────────────
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inside)) {
          fixed += `[${inside}](mailto:${inside})`;
          count++;
          i = closeIdx + 1;
          continue;
        }

        // ── Known HTML/JSX tag → leave alone ─────────────────
        const tagNameMatch = inside.match(/^\/?([a-zA-Z][a-zA-Z0-9]*)/);
        if (tagNameMatch && SAFE_TAGS.has(tagNameMatch[1])) {
          fixed += fullTag;
          i = closeIdx + 1;
          continue;
        }

        // ── Unknown text in angle brackets → inline code ─────
        // Catches: <URL>, <downloadID_#>, <API_TOKEN>, <YOUR_API_KEY>, <FORMAT>
        fixed += "`" + fullTag + "`";
        count++;
        i = closeIdx + 1;
        continue;
      }

      // Normal character
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

// ── 8. Fix curly braces that break MDX ───────────────────────
//
// MDX treats { } as JSX expressions. Bare curly braces in
// regular text cause parse errors:
//
//   "sub-fields must be in { }"    → JSX parse error
//   contact {support team}          → JSX parse error
//
// This function escapes them:
//   { → \{   } → \}
//
// It skips:
//   - Content inside fenced code blocks (``` ... ```)
//   - Content inside inline code (` ... `)
//   - JSX attribute values: cols={3}, href={url}
//   - Curly braces inside JSX tag attributes: <Tag prop={val}>

export function fixCurlyBraces(content) {
  const changes = [];
  let count = 0;

  const lines = content.split("\n");
  let inCodeBlock = false;
  const result = [];

  for (const line of lines) {
    // Track fenced code blocks — don't touch anything inside
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
      if (line[c] === "`") { inIC = !inIC; inCode[c] = true; continue; }
      inCode[c] = inIC;
    }

    let fixed = "";
    for (let i = 0; i < line.length; i++) {
      // Inside inline code → pass through
      if (inCode[i]) { fixed += line[i]; continue; }

      if (line[i] === "{") {
        // JSX attribute value: ={...} → skip
        if (i > 0 && line[i - 1] === "=") { fixed += line[i]; continue; }
        // Inside a JSX tag's attributes: <Tag ...{...}...>
        const beforeStr = line.substring(0, i);
        const lastOpen = beforeStr.lastIndexOf("<");
        const lastClose = beforeStr.lastIndexOf(">");
        if (lastOpen > lastClose) { fixed += line[i]; continue; }
        // Bare { in text → escape
        fixed += "\\{";
        count++;
        continue;
      }

      if (line[i] === "}") {
        // Already escaped → skip
        if (i > 0 && line[i - 1] === "\\") { fixed += line[i]; continue; }
        // Check if matching { was a JSX attribute value
        const beforeStr = line.substring(0, i);
        const lastBrace = beforeStr.lastIndexOf("{");
        if (lastBrace >= 0 && lastBrace > 0 && line[lastBrace - 1] === "=") {
          fixed += line[i]; continue;
        }
        // Inside a JSX tag
        const lastOpen = beforeStr.lastIndexOf("<");
        const lastClose = beforeStr.lastIndexOf(">");
        if (lastOpen > lastClose) { fixed += line[i]; continue; }
        // Bare } in text → escape
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

// ════════════════════════════════════════════════════════════
//  SCAN FOR UNKNOWN COMPONENTS
// ════════════════════════════════════════════════════════════

const KNOWN_COMPONENTS = new Set([
  "div","span","p","a","img","br","hr","table","thead","tbody",
  "tr","th","td","ul","ol","li","pre","code","blockquote",
  "h1","h2","h3","h4","h5","h6","em","strong","del","sub","sup",
  "details","summary","section","article","aside","header","footer",
  "nav","main","figure","figcaption","iframe","video","audio","source",
  "svg","path","circle","rect","line","polyline","polygon","g",
  "kbd","input","meta","link",
  "Callout","Expandable","ExpandableGroup","CodeGroup","Card","CardGroup",
  "Columns","Column","Tab","Tabs","Image","Icon","Steps","Step",
  "Tooltip","Frame","Update","ParamField","ResponseField",
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

  // ── ADD COMMENTS for unknown ReadMe components ──────────────
  // ReadMe has some components that Documentation.AI doesn't support.
  // Instead of leaving them to cause errors, flag them with comments.
  // IMPORTANT: Use JSX comments {/* */}, NOT HTML comments <!-- -->
  const warnings = [];
  for (const [name, cnt] of unknowns) {
    warnings.push(
      `{/* NOTE: <${name}> appears ${cnt} time(s). Documentation.AI does not have this component. Manual conversion needed. */}`
    );
  }

  return { unknowns, warnings };
}
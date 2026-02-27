const fs = require("fs");
const path = require("path");

// =============================================================================
// MDX Syntax Error Fixer
// Scans converted.mdx files and fixes errors that would crash MDX parsing.
// =============================================================================

// Pass folder as argument: node fix-mdx-errors.js <folder>
// Defaults to datafiniti-converted-version-2
const SOURCE_DIR = path.resolve(__dirname, process.argv[2] || "datafiniti-converted-version-2");

// Valid Doc.AI components (PascalCase tags that are allowed)
const VALID_COMPONENTS = new Set([
  "Callout", "Card", "Columns", "Column", "Expandable", "ExpandableGroup",
  "Steps", "Step", "Tabs", "Tab", "CodeGroup", "Image", "Video", "Iframe",
  "Update", "ParamField", "ResponseField", "Request", "Response", "Frame", "Icon",
]);

// =============================================================================
// Utility: split file into code-block and non-code-block segments
// Returns array of { text, isCode } — only fix non-code segments
// =============================================================================
function splitByCodeBlocks(content) {
  const segments = [];
  const regex = /(```[\s\S]*?```)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: content.slice(lastIndex, match.index), isCode: false });
    }
    segments.push({ text: match[0], isCode: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({ text: content.slice(lastIndex), isCode: false });
  }

  return segments;
}

// =============================================================================
// FIX 1: Raw { } in prose text
// Wraps bare {something} in backticks. Skips valid JSX like ={3}, {/* */}, {true}, {false}, {["...
// =============================================================================
function fixRawBraces(text) {
  // Match { ... } that are NOT:
  //  - preceded by = (JSX attribute like cols={3})
  //  - JSX comments {/* ... */}
  //  - valid JSX expressions: {true}, {false}, {["..."]}, {`...`}
  //  - already inside backticks

  // First handle multi-line JSON-like blocks: lines that are just { or } or "key": "value"
  // These should be wrapped in a code block instead

  // Handle inline {something} patterns in prose
  return text.replace(
    /(?<!`)(?<!=)(\{)(?!\/\*|true|false|"|`|\[)([\s\S]*?)(\})(?!`)/g,
    (match, open, inner, close, offset) => {
      // Skip if already inside backticks — check chars before/after
      const before = text.slice(Math.max(0, offset - 1), offset);
      const after = text.slice(offset + match.length, offset + match.length + 1);
      if (before === "`" || after === "`") return match;

      // Skip if it's a JSX attribute value (preceded by =)
      const preceding = text.slice(Math.max(0, offset - 1), offset);
      if (preceding === "=") return match;

      // Skip if it looks like a JSX comment
      if (inner.trim().startsWith("/*")) return match;

      // Skip if it's a valid JSX expression
      const trimmed = inner.trim();
      if (trimmed === "true" || trimmed === "false") return match;
      if (trimmed.startsWith('"') || trimmed.startsWith("'") || trimmed.startsWith("[") || trimmed.startsWith("`")) return match;

      // It's a raw brace in prose — wrap in backticks
      return "`" + match + "`";
    }
  );
}

// =============================================================================
// FIX 2: Raw > used as breadcrumb/navigation separator in prose
// "Go to Settings > API > Keys" → "Go to Settings, then API, then Keys"
// Only fix > that looks like a navigation breadcrumb (word > word pattern)
// =============================================================================
function fixRawAngleBrackets(text) {
  // Fix "word > word > word" breadcrumb patterns (not inside tags or blockquotes)
  // Match: non-tag context where > is used as separator between words
  return text.replace(
    /([A-Za-z0-9)]) > ([A-Za-z])/g,
    (match, before, after, offset) => {
      // Check if we're inside an HTML/JSX tag (look back for unmatched <)
      const preceding = text.slice(Math.max(0, offset - 200), offset);
      const lastOpen = preceding.lastIndexOf("<");
      const lastClose = preceding.lastIndexOf(">");
      if (lastOpen > lastClose) {
        // We're inside a tag — don't fix
        return match;
      }
      // Check if line starts with > (blockquote) — don't fix those
      const lineStart = text.lastIndexOf("\n", offset);
      const line = text.slice(lineStart + 1, offset + match.length);
      if (line.trimStart().startsWith(">")) {
        // Could be a blockquote — check if the > is at the start
        const trimmedLine = text.slice(lineStart + 1).trimStart();
        if (trimmedLine.startsWith(">")) return match;
      }

      return `${before} \\> ${after}`;
    }
  );
}

// =============================================================================
// FIX 3: HTML comments <!-- --> → JSX comments {/* */}
// =============================================================================
function fixHtmlComments(text) {
  return text.replace(/<!--([\s\S]*?)-->/g, (match, inner) => {
    return `{/*${inner}*/}`;
  });
}

// =============================================================================
// FIX 4: Single-quoted attributes → double-quoted
// title='text' → title="text"
// =============================================================================
function fixSingleQuoteAttrs(text) {
  // Match attribute='value' patterns inside JSX tags
  return text.replace(
    /(<[A-Z][A-Za-z]*(?:\s+[a-zA-Z-]+=(?:"[^"]*"|'[^']*'|\{[^}]*\}))*\s+)([a-zA-Z-]+)='([^']*)'/g,
    (match, prefix, attr, value) => {
      return `${prefix}${attr}="${value}"`;
    }
  );
}

// =============================================================================
// FIX 5: <Mermaid> component → ```mermaid code block
// =============================================================================
function fixMermaidComponent(text) {
  return text.replace(
    /<Mermaid[^>]*>([\s\S]*?)<\/Mermaid>/gi,
    (match, content) => {
      return "```mermaid\n" + content.trim() + "\n```";
    }
  );
}

// =============================================================================
// FIX 6: H1 headings → H2
// =============================================================================
function fixH1Headings(text) {
  // Only match # at start of line (not ## or ###)
  return text.replace(/^# (?!#)/gm, "## ");
}

// =============================================================================
// FIX 7: Invalid PascalCase components → remove tags, keep content
// =============================================================================
function fixInvalidComponents(text) {
  // Find opening PascalCase tags that aren't valid
  const tagRegex = /<([A-Z][A-Za-z]+)(\s[^>]*)?>|<\/([A-Z][A-Za-z]+)>/g;
  let result = text;
  const invalidTags = new Set();

  let m;
  while ((m = tagRegex.exec(text)) !== null) {
    const tagName = m[1] || m[3];
    if (tagName && !VALID_COMPONENTS.has(tagName)) {
      invalidTags.add(tagName);
    }
  }

  for (const tag of invalidTags) {
    // Remove opening tags (with attributes)
    result = result.replace(new RegExp(`<${tag}(\\s[^>]*)?>`, "g"), "");
    // Remove closing tags
    result = result.replace(new RegExp(`</${tag}>`, "g"), "");
  }

  return result;
}

// =============================================================================
// FIX 8: className and style props → remove them
// =============================================================================
function fixClassNameAndStyle(text) {
  // Remove className="..." or className={...} from tags
  text = text.replace(/\s+className=(?:"[^"]*"|'[^']*'|\{[^}]*\})/g, "");
  // Remove style={{...}} from tags
  text = text.replace(/\s+style=\{[^}]*\{[^}]*\}[^}]*\}/g, "");
  // Remove simpler style="..."
  text = text.replace(/\s+style="[^"]*"/g, "");
  return text;
}

// =============================================================================
// FIX 9: HTML entities that slipped through
// =============================================================================
function fixHtmlEntities(text) {
  return text
    .replace(/&#xA;/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"');
}

// =============================================================================
// Apply all fixes to a file's content
// =============================================================================
function fixFile(content) {
  const segments = splitByCodeBlocks(content);
  let fixes = [];

  const fixed = segments.map((seg) => {
    if (seg.isCode) return seg.text;

    let text = seg.text;
    const original = text;

    text = fixHtmlComments(text);
    text = fixMermaidComponent(text);
    text = fixH1Headings(text);
    text = fixSingleQuoteAttrs(text);
    text = fixInvalidComponents(text);
    text = fixClassNameAndStyle(text);
    text = fixHtmlEntities(text);
    text = fixRawAngleBrackets(text);
    text = fixRawBraces(text);

    if (text !== original) {
      fixes.push("applied");
    }

    return text;
  }).join("");

  return { fixed, changed: fixes.length > 0 };
}

// =============================================================================
// Recursively find all .mdx files (handles any folder structure)
// =============================================================================
function findMdxFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }

  return results;
}

// =============================================================================
// MAIN
// =============================================================================
function main() {
  console.log("MDX Syntax Error Fixer");
  console.log("=".repeat(60));
  console.log(`Source: ${SOURCE_DIR}\n`);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Directory not found: ${SOURCE_DIR}`);
    console.error(`Usage: node fix-mdx-errors.js <folder>`);
    process.exit(1);
  }

  const mdxFiles = findMdxFiles(SOURCE_DIR);
  console.log(`Found ${mdxFiles.length} .mdx files\n`);

  let totalFixed = 0;
  const fixedFiles = [];

  for (const filePath of mdxFiles) {
    const content = fs.readFileSync(filePath, "utf-8");
    const { fixed, changed } = fixFile(content);
    const relPath = path.relative(SOURCE_DIR, filePath);

    if (changed) {
      fs.writeFileSync(filePath, fixed, "utf-8");
      totalFixed++;
      fixedFiles.push(relPath);
      console.log(`  FIXED: ${relPath}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`Scanned: ${mdxFiles.length} files`);
  console.log(`Fixed:   ${totalFixed} files`);
  console.log(`Clean:   ${mdxFiles.length - totalFixed} files`);
  console.log("=".repeat(60));

  if (fixedFiles.length > 0) {
    console.log("\nFixed files:");
    fixedFiles.forEach((f) => console.log(`  - ${f}`));
  } else {
    console.log("\nAll files are clean — no errors found.");
  }
}

main();

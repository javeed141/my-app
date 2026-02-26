// scanner.js
// Component scanner & classifier engine.
// Extracted from cleanup.js for single-responsibility.
//
// Scans MDX content for unknown/custom components, extracts their
// definitions and usages, classifies them by name/props/styling,
// and replaces them with placeholders for AI conversion.

// ---------------------------------------------------------------
// KNOWN_COMPONENTS — the COMPLETE list of components that should
// NEVER be sent to AI. This includes:
//
// 1. Standard HTML elements (always valid in MDX)
// 2. Documentation.AI native components (already supported)
// 3. ReadMe components that have EXISTING converters in converters.js
//    (Cards→Columns, Accordion→Expandable, etc.)
//
// RULE: If a component has a converter or is natively supported,
//       it belongs here. Only truly unknown/custom components
//       should pass through to AI.
// ---------------------------------------------------------------

// --- Documentation.AI native components (already work as-is) ---
// Exported so ai-module.js can reuse the same list for validation.
export const DOCAI_NATIVE_COMPONENTS = new Set([
  "Callout",
  "Card",
  "Columns", "Column",
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

const KNOWN_COMPONENTS = new Set([
  // --- Standard HTML elements ---
  "div", "span", "p", "a", "img", "br", "hr", "table", "thead", "tbody",
  "tr", "th", "td", "ul", "ol", "li", "pre", "code", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6", "em", "strong", "del", "sub", "sup",
  "details", "summary", "section", "article", "aside", "header", "footer",
  "nav", "main", "figure", "figcaption", "iframe", "video", "audio", "source",
  "svg", "path", "circle", "rect", "line", "polyline", "polygon", "g",
  "kbd", "input", "meta", "link", "b", "i", "u", "s", "small", "mark",
  "abbr", "cite", "q", "dl", "dt", "dd",

  // --- Documentation.AI native components ---
  ...DOCAI_NATIVE_COMPONENTS,

  // --- ReadMe components with EXISTING converters in converters.js ---
  // convertCards() handles Cards → Columns
  "Cards",
  // convertAccordions() handles Accordion → Expandable
  "Accordion", "AccordionGroup",
]);

// ---------------------------------------------------------------
// KNOWN parent→child relationships.
// Parents must be extracted BEFORE children so children don't get
// ripped out independently and leave the parent with broken content.
// ---------------------------------------------------------------
const PARENT_CHILD_MAP = {
  Recipe: ["RecipeStep"],
  // NOTE: Cards and Tabs are NOT here because they're in KNOWN_COMPONENTS
  // and get handled by existing converters before reaching the scanner.
};

// ---------------------------------------------------------------
// CLASSIFIER ENGINE
// Matches component name against known patterns to produce a
// classification hint for the AI. AI handles all deeper analysis.
// ---------------------------------------------------------------

const NAME_CLASSIFICATION_PATTERNS = [
  { pattern: /banner|alert|warning|deprecat|caution/i, category: "alert", target: '<Callout kind="alert">', confidence: "high" },
  { pattern: /tip|hint|bestpractice|pro.?tip/i, category: "tip", target: '<Callout kind="tip">', confidence: "high" },
  { pattern: /info|note|notice|remind/i, category: "info", target: '<Callout kind="info">', confidence: "high" },
  { pattern: /success|confirm|done|complete/i, category: "success", target: '<Callout kind="success">', confidence: "high" },
  { pattern: /terminal|cli|console|shell|command/i, category: "code", target: "```bash code block", confidence: "high" },
  { pattern: /card|quicklink|navlink|tile/i, category: "card", target: "<Card>", confidence: "high" },
  { pattern: /feature|grid|highlight|showcase/i, category: "grid", target: "<Columns> + <Card>", confidence: "high" },
  { pattern: /step|tutorial|recipe|guide|wizard/i, category: "steps", target: "<Steps>", confidence: "high" },
  { pattern: /tab|switch|compare|toggle|platform/i, category: "tabs", target: "<Tabs>", confidence: "medium" },
  { pattern: /faq|question|quiz|trivia/i, category: "expandable", target: "<Expandable>", confidence: "medium" },
  { pattern: /table|matrix|compat|pricing/i, category: "table", target: "Markdown table", confidence: "medium" },
  { pattern: /progress|status|bar|meter/i, category: "text", target: "Bold text with value", confidence: "medium" },
  { pattern: /slider|carousel|gallery/i, category: "images", target: "Multiple <Image>", confidence: "low" },
  { pattern: /code.?compare|before.?after|diff/i, category: "tabs", target: "<Tabs>", confidence: "medium" },
];

export function classifyComponent(name) {
  const signals = [];
  let category = "unknown";
  let confidence = "low";
  let target = "AI decides";

  // Component name pattern matching — AI handles the rest
  for (const p of NAME_CLASSIFICATION_PATTERNS) {
    if (p.pattern.test(name)) {
      category = p.category;
      target = p.target;
      confidence = p.confidence;
      signals.push(`name:${name}→${p.category}`);
      break;
    }
  }

  if (signals.length === 0) {
    signals.push("no-signals");
  }

  return { category, confidence, target, signals };
}

// ---------------------------------------------------------------
// MAIN SCANNER
// ---------------------------------------------------------------

export function scanUnknownComponents(content) {
  const unknowns = new Map();
  const componentBlocks = [];

  // PRE-PROCESS: close unclosed code fences
  let cleanedContent = closeUnclosedFences(content);

  // Build a fence map for O(1) "inside fence?" lookups
  let fenceMap = buildFenceMap(cleanedContent);

  // Find all unknown component names (skip inside code fences)
  const tagRegex = /<([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)?)\b/g;
  let match;
  while ((match = tagRegex.exec(cleanedContent)) !== null) {
    const name = match[1];
    if (!KNOWN_COMPONENTS.has(name) && !isInsideFence(fenceMap, match.index)) {
      unknowns.set(name, (unknowns.get(name) || 0) + 1);
    }
  }

  // ORDER: parents before children
  const ordered = orderParentsFirst(unknowns);

  let placeholderIndex = 0;

  for (const name of ordered) {
    // Extract the component definition (export const MyComp = ...)
    const definition = extractComponentDefinition(cleanedContent, name, fenceMap);
    if (definition) {
      cleanedContent = cleanedContent.replace(definition, "");
      fenceMap = buildFenceMap(cleanedContent);
    }

    // Extract each usage and replace with a placeholder
    const usages = [];
    const contexts = [];
    const placeholderIds = [];

    let usage;
    while ((usage = extractUsage(cleanedContent, name, fenceMap)) !== null) {
      const usageIndex = cleanedContent.indexOf(usage);
      const context = getContext(cleanedContent, usageIndex, usage.length);

      const pid = `{/* __AI_CONVERT__${name}__${placeholderIndex}__ */}`;
      placeholderIndex++;

      usages.push(usage);
      contexts.push(context);
      placeholderIds.push(pid);

      cleanedContent = cleanedContent.replace(usage, pid);
      fenceMap = buildFenceMap(cleanedContent);
    }

    componentBlocks.push({
      name,
      definition: definition || null,
      raw: [definition, ...usages].filter(Boolean).join("\n\n").trim(),
      usages,
      contexts,
      placeholderIds,
      classification: classifyComponent(name),
    });
  }

  cleanedContent = cleanedContent.replace(/\n{3,}/g, "\n\n");

  // Filter out components with 0 usages (detected in tag scan but
  // all usages were inside code fences — nothing to convert)
  const filteredBlocks = componentBlocks.filter(
    (b) => b.usages.length > 0
  );

  return { unknowns, componentBlocks: filteredBlocks, content: cleanedContent };
}

// ---------------------------------------------------------------
// Order unknowns so parents are processed before their children.
// ---------------------------------------------------------------
function orderParentsFirst(unknowns) {
  const names = [...unknowns.keys()];
  const childSet = new Set();

  for (const parent of Object.keys(PARENT_CHILD_MAP)) {
    for (const child of PARENT_CHILD_MAP[parent]) {
      childSet.add(child);
    }
  }

  names.sort((a, b) => {
    const aIsChild = childSet.has(a) ? 1 : 0;
    const bIsChild = childSet.has(b) ? 1 : 0;
    return aIsChild - bIsChild;
  });

  return names;
}

// ---------------------------------------------------------------
// Build a fence map: sorted array of [openCharIdx, closeCharIdx]
// ranges where content is inside a ``` code fence.
// O(n) to build, O(fenceCount) to query.
// ---------------------------------------------------------------
function buildFenceMap(content) {
  const lines = content.split("\n");
  const fenceLines = []; // { lineIdx, charIdx, isOpener }

  let charIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/^```/.test(trimmed)) {
      const isOpener = /^```\w/.test(trimmed); // ```jsx, ```python etc.
      fenceLines.push({ lineIdx: i, charIdx, isOpener });
    }
    charIdx += lines[i].length + 1;
  }

  // Pair fences using open/close state tracking
  const ranges = [];
  let openStart = null;

  for (const fl of fenceLines) {
    if (openStart === null) {
      if (fl.isOpener) {
        openStart = fl.charIdx;
      }
      // else: orphaned closer, ignore
    } else {
      if (fl.isOpener) {
        // Two openers in a row — previous was unclosed, skip it
        openStart = fl.charIdx;
      } else {
        // Closer — pair it
        ranges.push([openStart, fl.charIdx + lines[fl.lineIdx].length]);
        openStart = null;
      }
    }
  }

  return { ranges };
}

function isInsideFence(fenceMap, charIdx) {
  for (const [open, close] of fenceMap.ranges) {
    if (charIdx > open && charIdx < close) return true;
  }
  return false;
}

// ---------------------------------------------------------------
// Close unclosed code fences.
//
// STRATEGY: Instead of just stripping orphaned openers (which leaks
// the content as raw MDX), we ADD a closing ``` at the appropriate
// place. This keeps code-like content safely inside a fence.
//
// For orphaned closers (``` with no opener), we strip them.
// ---------------------------------------------------------------
function closeUnclosedFences(content) {
  const lines = content.split("\n");
  const fenceLineIndices = [];

  for (let i = 0; i < lines.length; i++) {
    if (/^[ \t]*```/.test(lines[i])) {
      fenceLineIndices.push(i);
    }
  }

  if (fenceLineIndices.length === 0) return content;

  // --- Walk through all fence markers and pair them ---
  // Track: openers that have no matching closer
  const unclosedOpeners = [];  // line indices of openers with no closer
  const orphanedClosers = [];  // line indices of closers with no opener

  let openLineIdx = null; // line index of currently open fence

  for (let fi = 0; fi < fenceLineIndices.length; fi++) {
    const lineIdx = fenceLineIndices[fi];
    const line = lines[lineIdx].trim();

    if (openLineIdx === null) {
      if (/^```\w/.test(line)) {
        // Typed opener (```jsx, ```bash, etc.)
        openLineIdx = lineIdx;
      } else {
        // Bare ``` with no open fence — orphaned closer
        orphanedClosers.push(lineIdx);
      }
    } else {
      if (/^```\w/.test(line)) {
        // New typed opener while previous is still open — previous is unclosed
        unclosedOpeners.push(openLineIdx);
        openLineIdx = lineIdx;
      } else {
        // Bare ``` — this closes the current fence
        openLineIdx = null;
      }
    }
  }

  // If a fence is still open at EOF
  if (openLineIdx !== null) {
    unclosedOpeners.push(openLineIdx);
  }

  // --- Remove orphaned closers ---
  for (const idx of orphanedClosers) {
    lines[idx] = "";
  }

  // --- Smart-close unclosed openers ---
  // Instead of closing at EOF, find where code-like content ends.
  // Insert ``` at the best boundary.

  // Process from bottom to top to preserve line indices
  unclosedOpeners.sort((a, b) => b - a);

  for (const openerLineIdx of unclosedOpeners) {
    const bestClose = findSmartClosePoint(lines, openerLineIdx);
    lines.splice(bestClose + 1, 0, "```");
  }

  return lines.join("\n");
}


// -------------------------------------------------------------------
// findSmartClosePoint(lines, openerLineIdx)
//
// Given an unclosed ``` opener, find the best line to insert a closing ```
// AFTER. The goal is to capture the actual code block content without
// swallowing unrelated components, prose, or markdown.
//
// Strategy:
// 1. Walk line-by-line from the opener
// 2. Track "code-like" content vs "documentation-like" content
// 3. Close the fence when we hit a clear boundary:
//    a) A line that looks like a markdown heading (# ...)
//    b) A line that starts a new export const / export function
//       (this is a separate component definition — close before it)
//    c) A standalone component usage <CompName .../> or <CompName>
//       that isn't HTML inside JSX (i.e. uppercase first letter, preceded
//       by blank line)
//    d) A blank line followed by normal prose (a sentence-like line)
//    e) EOF
//
// We require at least 2 lines of code content before considering
// early termination to avoid closing immediately.
// -------------------------------------------------------------------

function findSmartClosePoint(lines, openerLineIdx) {
  let lastCodeLine = openerLineIdx;  // last line that looks like code
  let codeLineCount = 0;

  for (let i = openerLineIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty lines don't count as code or prose — skip them
    // but peek ahead to see what comes next
    if (trimmed === "") {
      // Look ahead for boundary signals
      if (i + 1 < lines.length) {
        const nextTrimmed = lines[i + 1].trim();

        // Boundary: blank line followed by markdown heading
        if (/^#{1,6}\s/.test(nextTrimmed) && codeLineCount >= 1) {
          return i - 1;  // close before the blank line
        }

        // Boundary: blank line followed by new export (separate definition)
        if (/^export\s+(?:const|function|default)\s/.test(nextTrimmed) && codeLineCount >= 1) {
          return i - 1;
        }

        // Boundary: blank line followed by standalone uppercase component usage
        // like <Banner ... /> or <ProgressBar ...
        if (/^<[A-Z][A-Za-z0-9]*\b/.test(nextTrimmed) && codeLineCount >= 1) {
          // Check it's not a continuation of the code (like <table> inside JSX)
          // Heuristic: if the component name is NOT a standard HTML tag,
          // it's probably a standalone usage
          const tagMatch = nextTrimmed.match(/^<([A-Z][A-Za-z0-9]*)/);
          if (tagMatch) {
            return i - 1;  // close before blank line
          }
        }

        // Boundary: blank line followed by prose (starts with letter,
        // contains spaces, doesn't look like code)
        if (codeLineCount >= 2 && isProselike(nextTrimmed)) {
          return i - 1;
        }
      }
      continue;
    }

    // Another fence opener — close before it
    if (/^[ \t]*```\w/.test(line) && codeLineCount >= 1) {
      return i - 1;
    }

    // Looks like code content — keep going
    codeLineCount++;
    lastCodeLine = i;
  }

  // Reached EOF — close at last code line
  return lastCodeLine;
}


// -------------------------------------------------------------------
// Heuristic: does this line look like documentation prose rather than code?
// -------------------------------------------------------------------

function isProselike(trimmed) {
  if (!trimmed) return false;

  // Starts with markdown syntax
  if (/^#{1,6}\s/.test(trimmed)) return true;
  if (/^\*\*/.test(trimmed)) return true;      // bold text
  if (/^[-*]\s/.test(trimmed)) return true;     // list item
  if (/^\d+\.\s/.test(trimmed)) return true;    // numbered list
  if (/^\|/.test(trimmed)) return true;          // table row
  if (/^>/.test(trimmed)) return true;           // blockquote

  // Starts with a word (lowercase letter), contains spaces, has more
  // than 5 words — probably prose
  if (/^[a-z]/.test(trimmed)) {
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount >= 4) return true;
  }

  // Starts with The, A, An, If, When, This, etc.
  if (/^(?:The|A|An|If|When|This|That|In|On|For|To|You|It|Available|Note)\s/.test(trimmed)) {
    return true;
  }

  return false;
}


// Grab ~3 lines before and after for AI context
function getContext(content, startIndex, length) {
  const before = content.substring(Math.max(0, startIndex - 200), startIndex);
  const after = content.substring(startIndex + length, startIndex + length + 200);

  const beforeLines = before.split("\n").slice(-3).join("\n").trim();
  const afterLines = after.split("\n").slice(0, 3).join("\n").trim();

  return `...${beforeLines}\n[COMPONENT HERE]\n${afterLines}...`;
}

function extractComponentDefinition(content, name, fenceMap) {
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

    // Skip if inside a code fence
    if (isInsideFence(fenceMap, startIdx)) continue;

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

    // Brace counter failed — return null.
    // Do NOT use a fallback regex that grabs partial definitions.
  }

  return null;
}

function extractUsage(content, name, fenceMap) {
  const escaped = escapeRegex(name);
  const startMatch = new RegExp(`<${escaped}\\b`).exec(content);
  if (!startMatch) return null;

  // Skip if inside a code fence
  if (isInsideFence(fenceMap, startMatch.index)) return null;

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

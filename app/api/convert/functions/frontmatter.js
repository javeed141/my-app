// ════════════════════════════════════════════════════════════
//  FRONTMATTER PARSER & CLEANER
//
//  Extracts YAML frontmatter from MDX files, strips
//  ReadMe-only fields, and returns cleaned frontmatter + body.
//
//  Input:  "---\ntitle: Hello\nslug: hello\nhidden: true\n---\n# Content"
//  Output: { frontmatter: { title: "Hello" }, body: "# Content" }
//
//  No external YAML library — uses simple key-value parsing
//  that handles the flat YAML structure ReadMe uses.
// ════════════════════════════════════════════════════════════

import { README_ONLY_FIELDS } from "./types.js";

// ── Frontmatter regex ────────────────────────────────────────
// Matches content between --- delimiters at the start of a file.
// The YAML block must start at line 1 (^ with no preceding content).
// Uses [\s\S] instead of . to match across newlines.

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Parse a simple YAML string into a flat key-value object.
 *
 * WHY NOT A FULL YAML PARSER:
 *   ReadMe frontmatter is always flat (no nested objects, no arrays).
 *   It's just "key: value" pairs. A full YAML parser (js-yaml) would
 *   add a dependency for something we can handle with string splitting.
 *
 * HANDLES:
 *   - Quoted values: title: "Hello World"
 *   - Single-quoted: title: 'Hello World'
 *   - Unquoted values: title: Hello World
 *   - Boolean-like: hidden: true → kept as string (we don't need types)
 *   - Empty values: excerpt: → empty string
 */
function parseSimpleYaml(yamlStr) {
  const result = {};
  const lines = yamlStr.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key) result[key] = value;
  }

  return result;
}

/**
 * Serialize a flat object back to YAML frontmatter string.
 * Values containing special chars get quoted.
 */
function serializeYaml(obj) {
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === "" || value === undefined || value === null) continue;
    // Quote values that contain colons, quotes, or start with special YAML chars
    const needsQuotes = /[:#{}\[\],&*?|>!%@`]/.test(String(value)) ||
                        String(value).startsWith('"') ||
                        String(value).startsWith("'");
    const formatted = needsQuotes ? `"${String(value).replace(/"/g, '\\"')}"` : value;
    lines.push(`${key}: ${formatted}`);
  }
  return lines.join("\n");
}

// ════════════════════════════════════════════════════════════
//  MAIN EXPORT: extractFrontmatter
//
//  Splits MDX into frontmatter + body.
//  Removes ReadMe-only fields from frontmatter.
//  Returns both the cleaned frontmatter string and parsed object.
// ════════════════════════════════════════════════════════════

export function extractFrontmatter(mdxContent) {
  const match = FRONTMATTER_REGEX.exec(mdxContent);

  if (!match) {
    // No frontmatter found — entire content is the body
    return {
      frontmatter: null,
      frontmatterStr: "",
      body: mdxContent,
      removedFields: [],
    };
  }

  const rawYaml = match[1];
  const body = mdxContent.slice(match[0].length).replace(/^\r?\n/, "");
  const parsed = parseSimpleYaml(rawYaml);

  // Remove ReadMe-only fields
  const removedFields = [];
  for (const key of Object.keys(parsed)) {
    if (README_ONLY_FIELDS.has(key)) {
      removedFields.push(key);
      delete parsed[key];
    }
  }

  // Rebuild frontmatter string (only if there are remaining fields)
  const cleanedYaml = serializeYaml(parsed);
  const frontmatterStr = cleanedYaml ? `---\n${cleanedYaml}\n---` : "";

  return {
    frontmatter: Object.keys(parsed).length > 0 ? parsed : null,
    frontmatterStr,
    body,
    removedFields,
  };
}

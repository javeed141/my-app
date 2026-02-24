// frontmatter.js
// Extracts YAML frontmatter from MDX files, strips ReadMe-only fields,
// and returns cleaned frontmatter + body.
//
// Uses simple key-value parsing (no YAML library) since ReadMe
// frontmatter is always flat "key: value" pairs.

import { README_ONLY_FIELDS } from "./types.js";

// Parse flat YAML into a key-value object.
// Handles quoted values, unquoted values, and empty values.
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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key) result[key] = value;
  }

  return result;
}

// Serialize a flat object back to YAML frontmatter string.
function serializeYaml(obj) {
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === "" || value === undefined || value === null) continue;
    const needsQuotes =
      /[:#{}\[\],&*?|>!%@`]/.test(String(value)) ||
      String(value).startsWith('"') ||
      String(value).startsWith("'");
    const formatted = needsQuotes
      ? `"${String(value).replace(/"/g, '\\"')}"`
      : value;
    lines.push(`${key}: ${formatted}`);
  }
  return lines.join("\n");
}

// Splits MDX into frontmatter + body.
// Removes ReadMe-only fields from frontmatter.
export function extractFrontmatter(mdxContent) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(mdxContent);

  if (!match) {
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
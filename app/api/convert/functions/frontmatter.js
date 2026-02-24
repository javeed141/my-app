// frontmatter.js
// Extracts YAML frontmatter from MDX files, strips ReadMe-only fields,
// and returns cleaned frontmatter + body.
//
// Handles ReadMe's nested frontmatter structure:
//   metadata: { title, description, keywords[], robots, image }
//   link: { url, new_tab }
//   api: { file, operationId, webhook }
//   recipe: { color, icon }
//
// Before stripping, extracts useful data:
//   excerpt OR metadata.description → description (if no description exists)
//   # First Heading → title (if no frontmatter at all)

import { README_ONLY_FIELDS } from "./types.js";

// --- YAML Parser (handles nesting, arrays, inline comments) ---

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function stripInlineComment(value) {
  if (value.startsWith('"') || value.startsWith("'")) return value;
  const idx = value.indexOf(" #");
  return idx !== -1 ? value.slice(0, idx).trimEnd() : value;
}

// Parse YAML string into a nested object.
// Supports: key: value, nested objects (indented), arrays (- item),
// quoted values, inline comments (# ...).
function parseYaml(yamlStr) {
  const lines = yamlStr.split(/\r?\n/);
  const cursor = { index: 0 };
  return parseObject(lines, 0, cursor);
}

function parseObject(lines, minIndent, cursor) {
  const result = {};

  while (cursor.index < lines.length) {
    const line = lines[cursor.index];
    const trimmed = line.trim();

    // Skip empty lines and full-line comments
    if (!trimmed || trimmed.startsWith("#")) {
      cursor.index++;
      continue;
    }

    const indent = line.search(/\S/);

    // If dedented, this level is done
    if (indent < minIndent) break;

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) {
      cursor.index++;
      continue;
    }

    const key = trimmed.slice(0, colonIdx).trim();
    let valueStr = trimmed.slice(colonIdx + 1).trim();
    valueStr = stripInlineComment(valueStr);

    if (valueStr) {
      // Inline value: "key: value"
      result[key] = stripQuotes(valueStr);
      cursor.index++;
    } else {
      // No inline value — peek ahead for nested content
      cursor.index++;
      const nextIndent = peekNextIndent(lines, cursor.index);

      if (nextIndent !== null && nextIndent > indent) {
        const nextTrimmed = lines[peekNextLine(lines, cursor.index)].trim();
        if (nextTrimmed.startsWith("- ")) {
          result[key] = parseArray(lines, nextIndent, cursor);
        } else {
          result[key] = parseObject(lines, nextIndent, cursor);
        }
      } else {
        result[key] = "";
      }
    }
  }

  return result;
}

function parseArray(lines, minIndent, cursor) {
  const result = [];

  while (cursor.index < lines.length) {
    const line = lines[cursor.index];
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      cursor.index++;
      continue;
    }

    const indent = line.search(/\S/);
    if (indent < minIndent) break;

    if (trimmed.startsWith("- ")) {
      let value = trimmed.slice(2).trim();
      value = stripInlineComment(value);
      result.push(stripQuotes(value));
      cursor.index++;
    } else {
      break;
    }
  }

  return result;
}

// Find the indentation of the next non-empty, non-comment line
function peekNextIndent(lines, fromIndex) {
  for (let i = fromIndex; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed && !trimmed.startsWith("#")) {
      return lines[i].search(/\S/);
    }
  }
  return null;
}

// Find the index of the next non-empty, non-comment line
function peekNextLine(lines, fromIndex) {
  for (let i = fromIndex; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed && !trimmed.startsWith("#")) return i;
  }
  return fromIndex;
}

// --- YAML Serializer (handles nesting + arrays) ---

function quoteIfNeeded(value) {
  if (/[:#{}\[\],&*?|>!%@`]/.test(value) ||
      value.startsWith('"') || value.startsWith("'")) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}

function serializeYaml(obj, indent = 0) {
  const lines = [];
  const prefix = "  ".repeat(indent);

  for (const [key, value] of Object.entries(obj)) {
    if (value === "" || value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${prefix}${key}:`);
      for (const item of value) {
        lines.push(`${prefix}  - ${quoteIfNeeded(String(item))}`);
      }
    } else if (typeof value === "object") {
      const nested = serializeYaml(value, indent + 1);
      if (nested) {
        lines.push(`${prefix}${key}:`);
        lines.push(nested);
      }
    } else {
      lines.push(`${prefix}${key}: ${quoteIfNeeded(String(value))}`);
    }
  }

  return lines.join("\n");
}

// --- Main: Extract, clean, and return frontmatter + body ---

export function extractFrontmatter(mdxContent) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(mdxContent);

  if (!match) {
    // No frontmatter block — try to extract title from first # heading
    const headingMatch = /^#\s+(.+)$/m.exec(mdxContent);

    if (headingMatch) {
      const title = headingMatch[1].trim();
      const body = mdxContent.replace(/^#\s+.+\r?\n?/, "");
      return {
        frontmatter: { title },
        frontmatterStr: `---\ntitle: ${quoteIfNeeded(title)}\n---`,
        body,
        removedFields: [],
      };
    }

    return {
      frontmatter: null,
      frontmatterStr: "",
      body: mdxContent,
      removedFields: [],
    };
  }

  const rawYaml = match[1];
  const body = mdxContent.slice(match[0].length).replace(/^\r?\n/, "");
  const parsed = parseYaml(rawYaml);

  // Extract useful data before stripping ReadMe fields:
  // Map excerpt or metadata.description → description
  if (!parsed.description) {
    if (parsed.excerpt && typeof parsed.excerpt === "string") {
      parsed.description = parsed.excerpt;
    } else if (
      parsed.metadata &&
      typeof parsed.metadata === "object" &&
      parsed.metadata.description
    ) {
      parsed.description = parsed.metadata.description;
    }
  }

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

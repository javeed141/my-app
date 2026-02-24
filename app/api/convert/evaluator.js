// converter-eval.js
// Test suite for the ReadMe → Documentation.AI MDX converter
// Tests all conversion rules from the mapping documents
//
// Run: node converter-eval.js

import { extractFrontmatter } from "./functions/frontmatter.js";
import {
  convertBlockquoteCallouts, convertJsxCallouts, convertAccordions,
  convertCards, convertColumnsLayout, convertCodeGroups, convertEmbeds,
  fixImages, convertIcons, convertBlockSyntax,
} from "./functions/converters.js";
import {
  removeImports, removeExports, removeReadmeCssClasses, fixHeadingHierarchy,
  fixHtmlComments, fixVoidElements, fixAngleBrackets, fixCurlyBraces,
  collapseBlankLines, scanUnknownComponents,
} from "./functions/cleanup.js";

// --- Full pipeline (same order as route.js) ---
const PIPELINE = [
  convertBlockSyntax, convertBlockquoteCallouts, convertJsxCallouts,
  convertAccordions, convertCards, convertColumnsLayout, convertCodeGroups,
  convertEmbeds, convertIcons, fixImages, removeImports, removeExports,
  removeReadmeCssClasses, fixHeadingHierarchy, fixHtmlComments,
  fixVoidElements, fixAngleBrackets, fixCurlyBraces, collapseBlankLines,
];

function runPipeline(input) {
  const { frontmatter, frontmatterStr, body, removedFields } = extractFrontmatter(input);
  let content = body;
  const allChanges = [];
  for (const fn of PIPELINE) {
    const r = fn(content);
    content = r.content;
    allChanges.push(...r.changes);
  }
  const { unknowns, warnings } = scanUnknownComponents(content);
  const converted = frontmatterStr
    ? `${frontmatterStr}\n\n${content.trim()}\n`
    : `${content.trim()}\n`;
  return { converted, frontmatter, removedFields, allChanges, unknowns, warnings };
}

// --- Test helpers ---
let passed = 0;
let failed = 0;
const failures = [];

function test(name, input, checks) {
  const result = runPipeline(input);
  const errors = [];

  for (const check of checks) {
    try {
      check(result);
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (errors.length === 0) {
    passed++;
    console.log(`  ✅ ${name}`);
  } else {
    failed++;
    failures.push({ name, errors, output: result.converted.slice(0, 300) });
    console.log(`  ❌ ${name}`);
    for (const e of errors) console.log(`     → ${e}`);
  }
}

function contains(r, text) {
  if (!r.converted.includes(text)) throw new Error(`Missing: "${text}"`);
}
function notContains(r, text) {
  if (r.converted.includes(text)) throw new Error(`Should not contain: "${text}"`);
}
function hasChange(r, type) {
  if (!r.allChanges.some(c => c.type === type)) throw new Error(`Missing change type: ${type}`);
}
function fieldRemoved(r, field) {
  if (!r.removedFields.includes(field)) throw new Error(`Field not removed: ${field}`);
}

// ============================================================================
// TEST SUITE
// ============================================================================

console.log("\n🔍 ReadMe → Documentation.AI Converter Eval Suite\n");
console.log("═".repeat(60));

// --- FRONTMATTER ---
console.log("\n📋 Frontmatter");

test("Strips ReadMe-only fields", `---
title: My Page
slug: my-page
category: guides
hidden: false
description: Hello
---
# Content`, [
  r => contains(r, "title: My Page"),
  r => contains(r, "description: Hello"),
  r => fieldRemoved(r, "slug"),
  r => fieldRemoved(r, "category"),
  r => fieldRemoved(r, "hidden"),
]);

test("Keeps image URLs as online links", `---
title: Page
coverImage: https://cdn.readme.io/hero.png
---
# Content`, [
  r => contains(r, "https://cdn.readme.io/hero.png"),
  r => fieldRemoved(r, "coverImage"),
]);

test("No frontmatter — extracts title from # heading", `# Just content\nSome text`, [
  r => contains(r, "title: Just content"),
  r => contains(r, "Some text"),
]);

test("Nested frontmatter — strips metadata, link, api, recipe", `---
title: API Guide
metadata:
  title: SEO Title
  description: SEO description
  keywords:
    - api
    - guide
  robots: index
link:
  url: https://example.com
  new_tab: true
api:
  file: spec.json
  operationId: get_users
recipe:
  color: blue
  icon: rocket
---
# Content`, [
  r => contains(r, "title: API Guide"),
  r => fieldRemoved(r, "metadata"),
  r => fieldRemoved(r, "link"),
  r => fieldRemoved(r, "api"),
  r => fieldRemoved(r, "recipe"),
]);

test("Maps excerpt to description when no description", `---
title: My Page
excerpt: This is a summary
hidden: true
---
# Content`, [
  r => contains(r, "title: My Page"),
  r => contains(r, "description: This is a summary"),
  r => fieldRemoved(r, "excerpt"),
  r => fieldRemoved(r, "hidden"),
]);

test("Maps metadata.description to description when no excerpt", `---
title: My Page
metadata:
  description: SEO description here
---
# Content`, [
  r => contains(r, "title: My Page"),
  r => contains(r, "description: SEO description here"),
  r => fieldRemoved(r, "metadata"),
]);

test("Strips deprecated, icon, fullscreen", `---
title: Old Page
deprecated: true
icon: fad fa-handwave
fullscreen: true
---
# Content`, [
  r => contains(r, "title: Old Page"),
  r => fieldRemoved(r, "deprecated"),
  r => fieldRemoved(r, "icon"),
  r => fieldRemoved(r, "fullscreen"),
]);

// --- CALLOUTS (blockquote) ---
console.log("\n💬 Callouts (blockquote → component)");

test("📘 → kind=info", `> 📘 Info Title\n> Content here`, [
  r => contains(r, '<Callout kind="info"'),
  r => contains(r, "Content here"),
  r => notContains(r, "📘"),
]);

test("✅ → kind=success", `> ✅ Done\n> It worked`, [
  r => contains(r, '<Callout kind="success"'),
]);

test("⚠️ → kind=alert", `> ⚠️ Warning\n> Be careful`, [
  r => contains(r, '<Callout kind="alert"'),
]);

test("❗ → kind=danger", `> ❗ Error\n> Something broke`, [
  r => contains(r, '<Callout kind="danger"'),
]);

test("👍 → kind=tip", `> 👍 Pro tip\n> Do this instead`, [
  r => contains(r, '<Callout kind="tip"'),
]);

test("🚧 → kind=alert", `> 🚧 Under construction\n> Not ready yet`, [
  r => contains(r, '<Callout kind="alert"'),
]);

// --- CALLOUTS (JSX) ---
console.log("\n💬 Callouts (JSX prop conversion)");

test('<Callout type="info"> → kind="info"', `<Callout type="info">Content</Callout>`, [
  r => contains(r, 'kind="info"'),
  r => notContains(r, 'type="info"'),
]);

test('<Callout theme="warning"> → kind="alert"', `<Callout theme="warning">Content</Callout>`, [
  r => contains(r, 'kind="alert"'),
  r => notContains(r, 'theme='),
]);

test('Keeps existing kind= unchanged', `<Callout kind="tip">Content</Callout>`, [
  r => contains(r, 'kind="tip"'),
]);

// --- ACCORDION → EXPANDABLE ---
console.log("\n🔄 Accordion → Expandable");

test("Renames Accordion to Expandable", `<Accordion title="FAQ">\nAnswer\n</Accordion>`, [
  r => contains(r, "<Expandable"),
  r => contains(r, "</Expandable>"),
  r => notContains(r, "<Accordion"),
]);

test("Removes icon prop from Accordion", `<Accordion title="FAQ" icon="fa-info-circle">\nAnswer\n</Accordion>`, [
  r => contains(r, '<Expandable title="FAQ">'),
  r => notContains(r, "icon="),
]);

test("AccordionGroup → ExpandableGroup", `<AccordionGroup>\n<Accordion title="Q1">\nA1\n</Accordion>\n</AccordionGroup>`, [
  r => contains(r, "<ExpandableGroup>"),
  r => contains(r, "</ExpandableGroup>"),
  r => contains(r, "<Expandable"),
]);

// --- CARDS → COLUMNS ---
console.log("\n🃏 Cards → Columns");

test("<Cards> → <Columns>", `<Cards>\n<Card title="T1" href="/a">Desc</Card>\n</Cards>`, [
  r => contains(r, "<Columns"),
  r => contains(r, "</Columns>"),
  r => notContains(r, "<Cards"),
]);

test("columns={3} → cols={3}", `<Cards columns={3}>\n<Card title="T1">D</Card>\n</Cards>`, [
  r => contains(r, "cols={3}"),
  r => notContains(r, "columns={3}"),
]);

// --- COLUMNS LAYOUT ---
console.log("\n📐 Columns layout conversion");

test('layout="auto" → cols={N}, removes <Column>', `<Columns layout="auto">
  <Column>Content 1</Column>
  <Column>Content 2</Column>
</Columns>`, [
  r => contains(r, "cols={2}"),
  r => notContains(r, "<Column>"),
  r => notContains(r, "</Column>"),
  r => notContains(r, 'layout='),
]);

// --- CODE GROUPS ---
console.log("\n📦 Code Groups");

test("Consecutive code blocks → CodeGroup with tabs", "```javascript Tab A\nconsole.log('hi');\n```\n\n```python Tab B\nprint('hi')\n```", [
  r => contains(r, "<CodeGroup"),
  r => contains(r, 'tabs="Tab A,Tab B"'),
  r => contains(r, "</CodeGroup>"),
]);

test("Same-language blocks not wrapped", "```javascript\ncode1\n```\n\n```javascript\ncode2\n```", [
  r => notContains(r, "<CodeGroup"),
]);

// --- EMBEDS ---
console.log("\n🎬 Embeds");

test("@[title](url) → iframe", `@[My Video](https://example.com/video)`, [
  r => contains(r, "<iframe"),
  r => contains(r, 'title="My Video"'),
  r => contains(r, 'src="https://example.com/video"'),
]);

test("YouTube watch URL → embed URL", `@[Demo](https://youtube.com/watch?v=abc123)`, [
  r => contains(r, "https://www.youtube.com/embed/abc123"),
  r => notContains(r, "watch?v="),
]);

// --- IMAGES ---
console.log("\n🖼️  Images");

test("Empty alt text gets filled", `![](https://example.com/img.png)`, [
  r => contains(r, "![Image](https://example.com/img.png)"),
]);

test("Image URLs kept as online links", `![Screenshot](https://cdn.readme.io/uploads/img.png)`, [
  r => contains(r, "https://cdn.readme.io/uploads/img.png"),
]);

test("Removes align and border from <Image>", `<Image src="https://x.com/i.png" alt="test" align="center" border={false} />`, [
  r => contains(r, 'src="https://x.com/i.png"'),
  r => contains(r, 'alt="test"'),
  r => notContains(r, "align="),
  r => notContains(r, "border="),
]);

// --- ICONS ---
console.log("\n🎨 Icons (Font Awesome → Lucide)");

test("fa-rocket → rocket", `<Card icon="fa-rocket">X</Card>`, [
  r => contains(r, 'icon="rocket"'),
  r => notContains(r, "fa-rocket"),
]);

test("fa-cog → settings", `<Step icon="fa-cog">X</Step>`, [
  r => contains(r, 'icon="settings"'),
]);

test("fa-book → book-open", `<Card icon="fa-book">X</Card>`, [
  r => contains(r, 'icon="book-open"'),
]);

test("Unknown fa- icon strips prefix", `<Card icon="fa-custom-thing">X</Card>`, [
  r => contains(r, 'icon="custom-thing"'),
]);

// --- BLOCK SYNTAX ---
console.log("\n📦 Block syntax [block:type]");

test("[block:callout] → <Callout>", `[block:callout]
{"type":"warning","title":"Watch out","body":"Be careful here"}
[/block]`, [
  r => contains(r, '<Callout kind="alert"'),
  r => contains(r, 'title="Watch out"'),
  r => contains(r, "Be careful here"),
]);

test("[block:code] single → code block", `[block:code]
{"codes":[{"language":"javascript","code":"console.log('hi');","name":"Example"}]}
[/block]`, [
  r => contains(r, "```javascript Example"),
  r => contains(r, "console.log('hi');"),
]);

test("[block:code] multi → CodeGroup", `[block:code]
{"codes":[{"language":"javascript","code":"js code","name":"JS"},{"language":"python","code":"py code","name":"PY"}]}
[/block]`, [
  r => contains(r, "<CodeGroup"),
  r => contains(r, 'tabs="JS,PY"'),
]);

test("[block:image] → markdown image", `[block:image]
{"images":[{"image":["https://example.com/img.png","My screenshot"]}]}
[/block]`, [
  r => contains(r, "![My screenshot](https://example.com/img.png)"),
]);

// --- CLEANUP ---
console.log("\n🧹 Cleanup");

test("Removes import statements", `import Thing from './thing';\n# Hello`, [
  r => notContains(r, "import"),
  r => contains(r, "# Hello"),
]);

test("Removes export statements", `export const meta = {};\n# Hello`, [
  r => notContains(r, "export"),
  r => contains(r, "# Hello"),
]);

test("Removes ReadMe CSS classes", `<div className="rm-spacing readme-header">Text</div>`, [
  r => notContains(r, "rm-spacing"),
  r => notContains(r, "readme-header"),
]);

test("Bumps heading hierarchy (h3→h2)", `### Section\n#### Sub`, [
  r => contains(r, "## Section"),
  r => contains(r, "### Sub"),
]);

test("No bump when h2 already exists", `## Section\n### Sub`, [
  r => contains(r, "## Section"),
  r => contains(r, "### Sub"),
]);

// --- MDX SAFETY ---
console.log("\n🛡️  MDX Safety");

test("HTML comments → JSX comments", `<!-- TODO: fix this -->`, [
  r => contains(r, "{/*"),
  r => contains(r, "*/}"),
  r => notContains(r, "<!--"),
]);

test("<br> → <br/>", `Line 1<br>Line 2`, [
  r => contains(r, "<br/>"),
  r => notContains(r, "<br>"),
]);

test("<hr> → <hr/>", `<hr>`, [
  r => contains(r, "<hr/>"),
]);

test("Angle bracket URL → markdown link", `Visit <https://example.com> for info`, [
  r => contains(r, "[https://example.com](https://example.com)"),
  r => notContains(r, "<https://"),
]);

test("Angle bracket email → mailto link", `Contact <user@example.com>`, [
  r => contains(r, "[user@example.com](mailto:user@example.com)"),
]);

test("Unknown angle brackets → inline code", `Use <YOUR_API_KEY> here`, [
  r => contains(r, "`<YOUR_API_KEY>`"),
]);

test("Safe tags not escaped", `<Callout kind="info">Text</Callout>`, [
  r => contains(r, '<Callout kind="info">'),
  r => notContains(r, "`<Callout"),
]);

test("Bare curly braces escaped", `The object {name: value} is used`, [
  r => contains(r, "\\{"),
  r => contains(r, "\\}"),
]);

test("JSX attribute braces not escaped", `<Columns cols={3}>Content</Columns>`, [
  r => contains(r, "cols={3}"),
  r => notContains(r, "cols=\\{"),
]);

test("JSX comments not double-escaped", `<!-- a comment -->`, [
  r => contains(r, "{/* a comment */}"),
  r => notContains(r, "\\{/*"),
]);

test("Code blocks preserved (no escaping inside)", "```\n{test: value}\n<br>\n<!-- comment -->\n```", [
  r => contains(r, "{test: value}"),
  r => contains(r, "<br>"),
  r => contains(r, "<!-- comment -->"),
]);

// --- UNKNOWN COMPONENTS ---
console.log("\n⚠️  Unknown components");

test("Flags unknown JSX components", `<CustomWidget title="x">Content</CustomWidget>`, [
  r => { if (r.unknowns.size === 0) throw new Error("Should flag <CustomWidget>"); },
  r => { if (!r.unknowns.has("CustomWidget")) throw new Error("Should flag CustomWidget"); },
]);

test("Known components not flagged", `<Callout kind="info">OK</Callout>\n<Card title="T">D</Card>`, [
  r => { if (r.unknowns.size > 0) throw new Error(`Unexpected unknowns: ${[...r.unknowns.keys()]}`); },
]);

// --- REAL-WORLD DOCUMENT ---
console.log("\n📄 Real-world document (Lithic API)");

import { readFileSync } from "fs";
let lithicDoc;
try {
  lithicDoc = readFileSync("/mnt/user-data/uploads/document-total.md", "utf-8");
} catch { lithicDoc = null; }

if (lithicDoc) {
  test("Full document converts without error", lithicDoc, [
    r => { if (!r.converted || r.converted.length === 0) throw new Error("Empty output"); },
    r => { if (r.converted.length < lithicDoc.length * 0.5) throw new Error("Output too short"); },
  ]);

  test("Document preserves headings", lithicDoc, [
    r => contains(r, "## "),
  ]);

  test("Document preserves code blocks", lithicDoc, [
    r => contains(r, "```"),
  ]);

  test("Document preserves tables", lithicDoc, [
    r => contains(r, "| "),
  ]);

  test("Document preserves links", lithicDoc, [
    r => contains(r, "]("),
  ]);
}

// ============================================================================
// RESULTS
// ============================================================================

console.log("\n" + "═".repeat(60));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
console.log(`   Pass rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (failures.length > 0) {
  console.log(`\n❌ Failed tests:`);
  for (const f of failures) {
    console.log(`\n   ${f.name}:`);
    for (const e of f.errors) console.log(`     → ${e}`);
    console.log(`     Output preview: ${f.output.replace(/\n/g, "\\n")}`);
  }
}

console.log("");
process.exit(failed > 0 ? 1 : 0);
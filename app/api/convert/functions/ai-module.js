// ai-converter.js
// Sends unknown components to Grok 4.1 (xAI) and gets back
// Documentation.AI compatible MDX. Falls back gracefully if AI is unavailable.
//
// FEATURES:
// - Per-usage parallel calls with Promise.allSettled (not sequential)
// - Classification hints injected into user prompt (from cleanup.js classifier)
// - Rate limiting: max AI_MAX_CONCURRENT concurrent calls
// - 1 retry on failure before falling back to manual review message

import { AI_MODEL, AI_MAX_TOKENS } from "./types.js";

// -------------------------------------------------------------------
// Config
// -------------------------------------------------------------------

const AI_MAX_CONCURRENT = 10;  // Max parallel API calls
const AI_RETRY_COUNT = 1;      // Retries per failed call

// -------------------------------------------------------------------
// System prompt — teaches the AI exactly how Documentation.AI works
// -------------------------------------------------------------------

const SYSTEM_PROMPT = `You are a documentation migration specialist.
You convert custom/unknown ReadMe.com components into Documentation.AI compatible MDX.

IMPORTANT: You must produce clean, natural-looking documentation. The output should look like it was WRITTEN for Documentation.AI from scratch — not like a hacked-together conversion.

## Your Toolbox — ONLY These Components Exist

### Callout — for alerts, tips, warnings, info boxes
<Callout kind="info|tip|success|alert|danger">
  Content here. Supports **bold**, *italic*, \`code\`, links, lists inside.
</Callout>

<Callout kind="info" collapsed="true">
  Content hidden until user clicks to expand.
</Callout>

### Card — for navigation links, feature highlights
<Card title="Title" icon="lucide-icon" href="/link">
  Short description text.
</Card>

### Columns — grid layout wrapper (2, 3, or 4 columns)
<Columns cols={3}>
  <Card title="A" icon="zap" href="/a">Desc</Card>
  <Card title="B" icon="code" href="/b">Desc</Card>
  <Card title="C" icon="shield" href="/c">Desc</Card>
</Columns>

### Expandable — for FAQ, collapsible sections, reveal-on-click
<Expandable title="Question or section title">
  Answer or hidden content. Supports full markdown inside.
</Expandable>

<ExpandableGroup>
  <Expandable title="Q1">Answer 1</Expandable>
  <Expandable title="Q2">Answer 2</Expandable>
</ExpandableGroup>

### Steps — for sequential instructions
<Steps>
  <Step title="Step name" icon="lucide-icon">
    Step content with markdown, code blocks, etc.
  </Step>
</Steps>

### Tabs — for alternative views (platforms, languages, before/after)
<Tabs>
  <Tab title="Tab label" icon="lucide-icon">
    Tab content.
  </Tab>
</Tabs>

### Code blocks and CodeGroup
\`\`\`language
code here
\`\`\`

<CodeGroup tabs="JavaScript,Python">
\`\`\`javascript
code
\`\`\`
\`\`\`python
code
\`\`\`
</CodeGroup>

### Image
<Image src="url" alt="description" width="800" height="600" />

### API fields
<ParamField path="id" param-type="string" required="true">Description</ParamField>
<ResponseField name="id" field-type="string" required="true">Description</ResponseField>

### Update — for changelogs
<Update label="v2.0" date="March 2024">Changes here</Update>

### Plain markdown
Headings (##, ###), **bold**, *italic*, \`inline code\`, [links](url), - lists, | tables |

NOTHING ELSE EXISTS. No custom HTML divs, no className, no style props, no Tailwind.

---

## Conversion Rules

1. PRESERVE ALL TEXT — every word, link, code snippet must appear in output
2. NEVER NEST BADLY — these are WRONG and ugly:
   - ❌ Callout inside a list item
   - ❌ Expandable inside a table cell
   - ❌ Steps inside a Callout
   - ❌ Multiple nested components for something simple
3. KEEP IT CLEAN — output should read like natural documentation
4. SIMPLICITY WINS — a heading + paragraph is better than a forced component
5. ONE COMPONENT PER CONCEPT — don't use 3 components where 1 works

## Pattern Matching — What To Use For What

### Quiz / Trivia / Multiple Choice
→ Use Expandable. Question as title. Answer inside as plain text.

GOOD:
<Expandable title="Quiz: Which HTTP method is idempotent?">
  **Options:** POST, PUT, PATCH

  **Answer:** PUT — making the same PUT request multiple times always produces the same result.
</Expandable>

### Styled Container / Wrapper (div with Tailwind classes)
→ If it highlights info: Callout. If it's just layout: plain markdown. If it's decorative: remove wrapper, keep content.

### Navigation Component (link with title + description + icon)
→ Card

### Feature Grid (multiple items in columns)
→ Columns + Card

### Code Before/After or Multi-platform
→ Tabs with Tab children

### Step-by-step Tutorial
→ Steps with Step children

### Warning / Deprecation Banner
→ Callout kind="alert" or kind="danger"

### Tip / Best Practice Box
→ Callout kind="tip"

### Dynamic / Interactive (useState, useEffect, fetch, onClick)
→ Cannot replicate. Extract the CONTENT it displays and present statically.
  Use Callout kind="info" with the key information, or plain markdown.

### Progress Bar / Status Indicator
→ Bold text with the value: **Migration Progress: 75%**

### Pricing / Real-time Data
→ Callout kind="info" explaining where to find the live data

---

## Response Format

Return ONLY valid JSON (no markdown fences around it, no extra text before or after):
{
  "converted": "<the Documentation.AI MDX string>",
  "confidence": "high|medium|low",
  "reasoning": "one sentence explaining your conversion choice"
}`;


// -------------------------------------------------------------------
// Main export — converts all unknown components
// Same signature: takes componentBlocks, returns { conversions, warnings }
// -------------------------------------------------------------------

export async function convertUnknownWithAI(componentBlocks) {
  const conversions = new Map();
  const warnings = [];

  // No API key? Just show messages — don't try to convert programmatically
  if (!process.env.XAI_API_KEY) {
    warnings.push("AI conversion skipped — no XAI_API_KEY in .env");

    for (const block of componentBlocks) {
      for (let i = 0; i < block.placeholderIds.length; i++) {
        conversions.set(
          block.placeholderIds[i],
          manualReviewMessage(block.name, block.usages[i])
        );
      }
    }
    return { conversions, warnings };
  }

  // Build task list: one task per usage (not per component)
  const tasks = [];
  for (const block of componentBlocks) {
    for (let i = 0; i < block.placeholderIds.length; i++) {
      // TRY KNOWN PATTERN FIRST — no AI needed for common components
      const knownResult = knownPatternConvert(
        block.name,
        block.usages[i],
        block.definition,
        block.classification
      );

      if (knownResult) {
        conversions.set(block.placeholderIds[i], knownResult);
        continue;
      }

      // No known pattern — queue for AI
      tasks.push({
        pid: block.placeholderIds[i],
        name: block.name,
        definition: block.definition,
        usage: block.usages[i],
        context: block.contexts[i],
        classification: block.classification || null,
      });
    }
  }

  // Fire parallel calls in batches of AI_MAX_CONCURRENT
  for (let batchStart = 0; batchStart < tasks.length; batchStart += AI_MAX_CONCURRENT) {
    const batch = tasks.slice(batchStart, batchStart + AI_MAX_CONCURRENT);

    const results = await Promise.allSettled(
      batch.map((task) => callGrokWithRetry(task))
    );

    for (let i = 0; i < results.length; i++) {
      const task = batch[i];
      const result = results[i];

      if (result.status === "fulfilled") {
        conversions.set(task.pid, result.value.converted);

        if (result.value.confidence === "low") {
          warnings.push(`Low confidence: <${task.name}> — ${result.value.reasoning}`);
        }
      } else {
        console.warn(`[ai-converter] Failed for <${task.name}>:`, result.reason?.message || result.reason);
        warnings.push(`AI failed for <${task.name}>: ${result.reason?.message || "Unknown error"}`);

        // AI failed — show manual review message, don't try programmatic conversion
        conversions.set(task.pid, manualReviewMessage(task.name, task.usage));
      }
    }
  }

  return { conversions, warnings };
}


// -------------------------------------------------------------------
// Call Grok with retry
// -------------------------------------------------------------------

async function callGrokWithRetry(task) {
  let lastError;
  for (let attempt = 0; attempt <= AI_RETRY_COUNT; attempt++) {
    try {
      return await callGrok(task);
    } catch (err) {
      lastError = err;
      if (attempt < AI_RETRY_COUNT) {
        // Wait 500ms before retry
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }
  throw lastError;
}


// -------------------------------------------------------------------
// Call Grok 4.1 (xAI) API — OpenAI-compatible chat completions
// -------------------------------------------------------------------

async function callGrok(task) {
  const prompt = buildUserPrompt(task);

  const url = "https://api.x.ai/v1/chat/completions";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      max_completion_tokens: AI_MAX_TOKENS,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Grok API returned ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();

  // OpenAI-compatible response structure
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Empty response from Grok");
  }

  return parseResponse(text, task.name);
}


// -------------------------------------------------------------------
// Known pattern converter — handles common ReadMe components that
// have a clear, deterministic mapping. Runs BEFORE the AI call.
// Returns converted MDX string, or null if no pattern matches.
// -------------------------------------------------------------------

function knownPatternConvert(name, usage, definition, classification) {
  if (!usage) return null;

  // --- Recipe → Steps ---
  if (/^Recipe$/i.test(name)) {
    return convertRecipeToSteps(usage);
  }

  // --- RecipeStep alone (orphaned) → Step content ---
  if (/^RecipeStep$/i.test(name)) {
    return convertRecipeStepToStep(usage);
  }

  // --- ProgressBar → bold text ---
  if (/^ProgressBar$/i.test(name)) {
    return convertProgressBar(usage);
  }

  // --- Data table components (features/items prop with array of objects) ---
  if (classification && classification.category === "table") {
    const tableResult = convertDataTableComponent(name, usage);
    if (tableResult) return tableResult;
  }

  // --- Simple wrapper with just text children + classification is high confidence ---
  if (classification && classification.confidence === "high") {
    // Only handle self-closing or simple wrappers with plain text
    const innerMatch = usage.match(new RegExp(`<${escapeForRegex(name)}[^>]*>([\\s\\S]*?)</${escapeForRegex(name)}>`));
    if (innerMatch) {
      const inner = innerMatch[1].trim();
      // Only convert if inner content is plain text (no nested JSX)
      if (inner && !/<[A-Z]/.test(inner)) {
        return convertByClassification(name, usage, inner, definition, classification);
      }
    }

    // Self-closing with props
    const selfClose = usage.match(new RegExp(`<${escapeForRegex(name)}\\b([^>]*)/>`));
    if (selfClose) {
      return convertByClassification(name, usage, null, definition, classification);
    }
  }

  return null; // No known pattern — let AI handle it
}


// --- Recipe → Steps converter ---
function convertRecipeToSteps(usage) {
  const stepRegex = /<RecipeStep\s+title="([^"]*)"(?:\s+language="([^"]*)")?>([\s\S]*?)<\/RecipeStep>/g;
  const steps = [];
  let match;

  while ((match = stepRegex.exec(usage)) !== null) {
    const title = match[1];
    const language = match[2] || "";
    const content = match[3].trim();

    let stepContent;
    if (language) {
      stepContent = `\`\`\`${language}\n${content}\n\`\`\``;
    } else {
      stepContent = content;
    }

    steps.push(`  <Step title="${title}">\n    ${stepContent}\n  </Step>`);
  }

  if (steps.length === 0) return null;

  return `<Steps>\n${steps.join("\n")}\n</Steps>`;
}


// --- Single RecipeStep → Step ---
function convertRecipeStepToStep(usage) {
  const match = usage.match(/<RecipeStep\s+title="([^"]*)"(?:\s+language="([^"]*)")?>([\s\S]*?)<\/RecipeStep>/);
  if (!match) return null;

  const title = match[1];
  const language = match[2] || "";
  const content = match[3].trim();

  let stepContent;
  if (language) {
    stepContent = `\`\`\`${language}\n${content}\n\`\`\``;
  } else {
    stepContent = content;
  }

  return `<Steps>\n  <Step title="${title}">\n    ${stepContent}\n  </Step>\n</Steps>`;
}


// --- ProgressBar → bold text ---
function convertProgressBar(usage) {
  const labelMatch = usage.match(/label="([^"]*)"/);
  const valueMatch = usage.match(/value=\{?(\d+)\}?/);
  const maxMatch = usage.match(/max=\{?(\d+)\}?/);

  const label = labelMatch ? labelMatch[1] : "Progress";
  const value = valueMatch ? valueMatch[1] : "?";
  const max = maxMatch ? maxMatch[1] : "100";

  return `**${label}:** ${value}/${max} (${Math.round((parseInt(value) / parseInt(max)) * 100)}%)`;
}


// --- Data table components (CompatibilityMatrix, etc.) ---
// Parses a features/items/data prop that contains an array of objects
// and converts to a markdown table.
function convertDataTableComponent(name, usage) {
  // Find the array prop — typically features={[...]}, items={[...]}, data={[...]}
  const arrayMatch = usage.match(/(?:features|items|data|rows)=\{(\[[\s\S]*?\])\s*\}/);
  if (!arrayMatch) return null;

  try {
    // Parse the JS array literal — replace true/false with JSON equivalents
    // The array looks like: [{ name: "API Access", free: true, pro: true, enterprise: true }, ...]
    let arrayStr = arrayMatch[1];
    
    // Convert JS object syntax to valid JSON:
    // 1. Quote unquoted keys: { name: → { "name":
    arrayStr = arrayStr.replace(/(\{|,)\s*([a-zA-Z_]\w*)\s*:/g, '$1 "$2":');
    // 2. Replace single quotes with double quotes (for string values)
    arrayStr = arrayStr.replace(/'/g, '"');
    // 3. Remove trailing commas before ] or } (valid JS, invalid JSON)
    arrayStr = arrayStr.replace(/,\s*([\]}])/g, '$1');

    const items = JSON.parse(arrayStr);
    if (!Array.isArray(items) || items.length === 0) return null;

    // Get all unique keys from the objects
    const allKeys = [];
    const keySet = new Set();
    for (const item of items) {
      for (const key of Object.keys(item)) {
        if (!keySet.has(key)) {
          keySet.add(key);
          allKeys.push(key);
        }
      }
    }

    if (allKeys.length === 0) return null;

    // Build markdown table
    // Header row
    const headerCells = allKeys.map(k => {
      // Capitalize first letter, add spaces before capitals
      return k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1');
    });
    const header = `| ${headerCells.join(" | ")} |`;
    const separator = `| ${allKeys.map(() => "---").join(" | ")} |`;

    // Data rows
    const rows = items.map(item => {
      const cells = allKeys.map(key => {
        const val = item[key];
        if (val === true) return "✅";
        if (val === false) return "❌";
        if (val === null || val === undefined) return "";
        return String(val);
      });
      return `| ${cells.join(" | ")} |`;
    });

    return [header, separator, ...rows].join("\n");
  } catch (e) {
    // JSON parse failed — let AI handle it
    return null;
  }
}


// --- Convert by classification category ---
function convertByClassification(name, usage, innerText, definition, classification) {
  const cat = classification.category;

  // Extract props from usage for context
  const messageMatch = usage.match(/message="([^"]*)"/);
  const typeMatch = usage.match(/type="([^"]*)"/);
  const linkMatch = usage.match(/link="([^"]*)"/);
  const hrefMatch = usage.match(/href="([^"]*)"/);
  const titleMatch = usage.match(/title="([^"]*)"/);

  if (cat === "alert" || cat === "tip" || cat === "info" || cat === "success") {
    // Map category to Callout kind
    const kindMap = { alert: "alert", tip: "tip", info: "info", success: "success" };
    let kind = kindMap[cat] || "info";

    // Check if type prop hints at a different kind
    if (typeMatch) {
      const t = typeMatch[1].toLowerCase();
      if (t === "warning" || t === "alert" || t === "danger" || t === "error") kind = "alert";
      else if (t === "tip" || t === "hint") kind = "tip";
      else if (t === "success" || t === "ok") kind = "success";
      else if (t === "info" || t === "note") kind = "info";
    }

    let content = innerText || "";
    if (messageMatch) {
      content = `**${messageMatch[1]}**`;
      if (linkMatch) {
        content += ` [Learn more →](${linkMatch[1]})`;
      }
    }

    if (!content) return null;
    return `<Callout kind="${kind}">\n  ${content}\n</Callout>`;
  }

  if (cat === "card") {
    const title = titleMatch ? titleMatch[1] : name;
    const href = hrefMatch ? hrefMatch[1] : linkMatch ? linkMatch[1] : "#";
    const desc = innerText || "";
    return `<Card title="${title}" href="${href}">\n  ${desc}\n</Card>`;
  }

  return null; // Can't convert this category deterministically
}


function escapeForRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


// -------------------------------------------------------------------
// Build user prompt — includes classification hint from cleanup.js
// -------------------------------------------------------------------

function buildUserPrompt(task) {
  let prompt = `Convert this unknown ReadMe component to Documentation.AI MDX.\n\n`;
  prompt += `Component name: <${task.name}>\n\n`;

  // CLASSIFICATION HINT — pre-analyzed by classifyComponent() in cleanup.js
  if (task.classification && task.classification.category !== "unknown") {
    prompt += `### Classification (pre-analyzed)\n`;
    prompt += `Category: ${task.classification.category}\n`;
    prompt += `Suggested target: ${task.classification.target}\n`;
    prompt += `Confidence: ${task.classification.confidence}\n`;
    prompt += `Signals: ${task.classification.signals.join(", ")}\n`;
    prompt += `\nUse this classification as a strong hint, but override it if the actual content suggests otherwise.\n\n`;
  }

  if (task.definition) {
    // Sanitize definition: replace backticks that could break the fenced code block
    const safeDef = task.definition.replace(/`/g, "'");
    prompt += `### Component source code:\n\`\`\`jsx\n${safeDef}\n\`\`\`\n\n`;
  }

  if (task.usage) {
    const safeUsage = task.usage.replace(/`/g, "'");
    prompt += `### Usage:\n\`\`\`jsx\n${safeUsage}\n\`\`\`\n`;
  }

  if (task.context) {
    prompt += `\nSurrounding context:\n${task.context}\n\n`;
  }

  prompt += `\nPreserve ALL text content. Make it look clean and natural. Return only JSON.`;

  return prompt;
}


// -------------------------------------------------------------------
// Parse Grok's JSON response
// With response_format: { type: "json_object" }, Grok tries to return
// valid JSON. But we still handle edge cases defensively.
// -------------------------------------------------------------------

function parseResponse(text, componentName) {
  // Strip markdown code fences if Grok wrapped them
  const cleaned = text
    .replace(/^```json\s*/m, "")
    .replace(/^```\s*/m, "")
    .replace(/```\s*$/m, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    if (!parsed.converted || typeof parsed.converted !== "string") {
      throw new Error("Missing 'converted' field");
    }

    return {
      converted: parsed.converted,
      confidence: parsed.confidence || "medium",
      reasoning: parsed.reasoning || "",
    };
  } catch (err) {
    // JSON parse failed — try to extract any MDX component from the text
    console.warn(`[ai-converter] JSON parse failed for <${componentName}>, trying extraction`);

    const mdxMatch = text.match(
      /<(?:Callout|Card|Columns|Steps|Tabs|Expandable|ExpandableGroup|CodeGroup)[\s\S]*?<\/(?:Callout|Card|Columns|Steps|Tabs|Expandable|ExpandableGroup|CodeGroup)>/
    );

    if (mdxMatch) {
      return {
        converted: mdxMatch[0],
        confidence: "low",
        reasoning: "Extracted from non-JSON response",
      };
    }

    throw new Error(`Could not parse AI response: ${err.message}`);
  }
}


// -------------------------------------------------------------------
// Manual review message — when AI is unavailable or fails.
// No programmatic conversion — just a clear message showing the
// original component so the user knows exactly what to fix manually.
// -------------------------------------------------------------------

function manualReviewMessage(componentName, usage) {
  const safeUsage = (usage || "")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .trim();

  const lines = [
    `{/* ⚠️ MANUAL REVIEW NEEDED: <${componentName}> */}`,
    `{/* This component could not be automatically converted. */}`,
    `{/* Original usage: */}`,
    `{/* ${safeUsage.split("\n").join("\n")} */}`,
  ];

  return lines.join("\n");
}
# AI Component Conversion — Step by Step

Do these in order. Each step is one small change.

---

## Step 1: Get your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **Settings → API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-...`)
6. Add it to your `.env.local` file in your project root:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

That's it for setup. Now the code changes:

---

## Step 2: Add AI config to `types.js`

Open `functions/types.js`. At the very bottom, add these 3 lines:

```js
// --- AI Conversion Config ---
export const AI_MODEL = "claude-sonnet-4-20250514";
export const AI_MAX_TOKENS = 4096;
```

**What this does:** Just stores which AI model to use. Nothing else changes in this file.

---

## Step 3: Create `functions/ai-converter.js` (new file)

Create a new file at `functions/ai-converter.js`. This is the module that talks to Claude.

```js
// ai-converter.js
// Takes unknown components and asks Claude to convert them
// into Documentation.AI compatible MDX.

import { AI_MODEL, AI_MAX_TOKENS } from "./types.js";

// What Documentation.AI supports — this is what AI can use
const AVAILABLE_COMPONENTS = `
You can ONLY use these Documentation.AI components:
- Callout: <Callout kind="info|tip|success|alert|danger">content</Callout>
- Card: <Card title="..." icon="..." href="...">description</Card>
- Columns: <Columns cols={2|3|4}>children</Columns>
- Image: <Image src="..." alt="..." width="800" height="600" />
- CodeGroup: <CodeGroup tabs="Label1,Label2">code blocks</CodeGroup>
- Expandable: <Expandable title="...">content</Expandable>
- Steps/Step: <Steps><Step title="...">content</Step></Steps>
- Tabs/Tab: <Tabs><Tab title="...">content</Tab></Tabs>
- ParamField: <ParamField path="..." param-type="string" required="true">desc</ParamField>
- ResponseField: <ResponseField name="..." field-type="string">desc</ResponseField>
- Update: <Update label="v2.0" date="March 2024">changes</Update>
- Plain markdown: headings, bold, italic, lists, tables, code blocks
`;

const SYSTEM_PROMPT = `You are a documentation migration specialist.
You convert custom/unknown ReadMe components into Documentation.AI compatible MDX.

${AVAILABLE_COMPONENTS}

Rules:
1. NEVER lose any text content — every word must appear in output
2. NEVER invent new components — only use the ones listed above
3. Match the semantic intent (warning → Callout alert, grid → Columns+Card, etc.)
4. If a component is just a styled wrapper around text, use <Callout kind="info"> or plain markdown
5. If it has children with code, preserve the code in fenced code blocks
6. Strip all className, style, and CSS props — they don't work in Documentation.AI

Respond with ONLY valid JSON:
{
  "converted": "<the converted MDX string>",
  "confidence": "high|medium|low",
  "reasoning": "one sentence why you chose this conversion"
}

No markdown fences around the JSON. Just raw JSON.`;


/**
 * Main function — converts all unknown components using AI
 *
 * @param {Array} componentBlocks - from scanUnknownComponents()
 *   Each block has: { name, definition, usages, contexts, placeholderIds }
 * @returns {Object} { conversions: Map<placeholderId, mdxString>, warnings: string[] }
 */
export async function convertUnknownWithAI(componentBlocks) {
  const conversions = new Map();
  const warnings = [];

  // No API key? Skip AI, use fallback
  if (!process.env.ANTHROPIC_API_KEY) {
    warnings.push("AI conversion skipped — no ANTHROPIC_API_KEY in env");
    for (const block of componentBlocks) {
      for (let i = 0; i < block.placeholderIds.length; i++) {
        conversions.set(block.placeholderIds[i], fallbackConvert(block.usages[i], block.name));
      }
    }
    return { conversions, warnings };
  }

  // Convert each component
  for (const block of componentBlocks) {
    try {
      const aiResult = await callAI(block);

      // Put the converted MDX at each placeholder position
      for (let i = 0; i < block.placeholderIds.length; i++) {
        // If multiple usages, AI gets them all — use the full result
        // For single usage (most common), it's straightforward
        conversions.set(block.placeholderIds[i], aiResult.converted);
      }

      if (aiResult.confidence === "low") {
        warnings.push(`Low confidence: <${block.name}> — ${aiResult.reasoning}`);
      }

    } catch (err) {
      // AI failed — use fallback instead of crashing
      console.warn(`[ai-converter] Failed for <${block.name}>:`, err.message);
      warnings.push(`AI failed for <${block.name}>: ${err.message}`);

      for (let i = 0; i < block.placeholderIds.length; i++) {
        conversions.set(block.placeholderIds[i], fallbackConvert(block.usages[i], block.name));
      }
    }
  }

  return { conversions, warnings };
}


/**
 * Call Claude API for one component
 */
async function callAI(block) {
  // Build a simple prompt
  let prompt = `Convert this unknown component to Documentation.AI MDX.\n\n`;
  prompt += `Component name: ${block.name}\n\n`;

  if (block.definition) {
    prompt += `Source code:\n\`\`\`jsx\n${block.definition}\n\`\`\`\n\n`;
  }

  for (let i = 0; i < block.usages.length; i++) {
    prompt += `Usage:\n\`\`\`jsx\n${block.usages[i]}\n\`\`\`\n`;
    if (block.contexts[i]) {
      prompt += `Context around it:\n${block.contexts[i]}\n\n`;
    }
  }

  prompt += `\nPreserve ALL text content. Return only JSON.`;

  // Call the API
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: AI_MODEL,
      max_tokens: AI_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  // Get the text from Claude's response
  const text = data.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  return parseResponse(text, block.name);
}


/**
 * Parse Claude's JSON response
 */
function parseResponse(text, componentName) {
  // Clean up — sometimes AI wraps in code fences
  const cleaned = text
    .replace(/^```json\s*/m, "")
    .replace(/^```\s*/m, "")
    .replace(/```\s*$/m, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    if (!parsed.converted || typeof parsed.converted !== "string") {
      throw new Error("No 'converted' field in response");
    }

    return {
      converted: parsed.converted,
      confidence: parsed.confidence || "medium",
      reasoning: parsed.reasoning || "",
    };
  } catch (err) {
    // JSON failed — try to find any MDX-looking content in the response
    console.warn(`[ai-converter] JSON parse failed for <${componentName}>, trying fallback extraction`);

    // Look for something that looks like a Documentation.AI component
    const mdxMatch = text.match(/<(?:Callout|Card|Columns|Steps|Tabs|Expandable|CodeGroup)[\s\S]*?<\/(?:Callout|Card|Columns|Steps|Tabs|Expandable|CodeGroup)>/);
    if (mdxMatch) {
      return {
        converted: mdxMatch[0],
        confidence: "low",
        reasoning: "Extracted from non-JSON AI response",
      };
    }

    throw new Error(`Could not parse AI response: ${err.message}`);
  }
}


/**
 * Fallback when AI is not available — just extract the text content
 * and wrap it in a Callout so nothing is lost
 */
function fallbackConvert(usage, componentName) {
  if (!usage) {
    return `{/* Component <${componentName}> could not be converted */}`;
  }

  // Strip the JSX tags, keep the inner text
  let inner = usage
    .replace(/<[A-Z][A-Za-z0-9]*[^>]*>/g, "")   // opening tags
    .replace(/<\/[A-Z][A-Za-z0-9]*>/g, "")        // closing tags
    .trim();

  if (!inner) {
    return `{/* Component <${componentName}> was empty */}`;
  }

  return `<Callout kind="info">\n${inner}\n</Callout>`;
}
```

**What this does:**
- `convertUnknownWithAI()` — loops through unknown components, calls Claude for each
- `callAI()` — builds a prompt and hits the Anthropic API
- `parseResponse()` — reads Claude's JSON reply
- `fallbackConvert()` — if AI fails or no API key, wraps content in a Callout so nothing is lost

---

## Step 4: Update `scanUnknownComponents()` in `cleanup.js`

This is the only existing function we change. Two things:

1. **Stop inserting warning comments** (remove the `⚠️` message)
2. **Insert placeholders instead** and track more info per component

Replace the `scanUnknownComponents` function (lines ~633-677) with this:

```js
export function scanUnknownComponents(content) {
  const unknowns = new Map();
  const componentBlocks = [];

  // Find all unknown component names
  const tagRegex = /<([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)?)\b/g;
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const name = match[1];
    if (!KNOWN_COMPONENTS.has(name)) {
      unknowns.set(name, (unknowns.get(name) || 0) + 1);
    }
  }

  let cleanedContent = content;
  let placeholderIndex = 0;

  for (const [name] of unknowns) {
    // Extract definition (export const MyComp = ...)
    const definition = extractComponentDefinition(cleanedContent, name);
    if (definition) {
      cleanedContent = cleanedContent.replace(definition, "");
    }

    // Extract all usages and replace with placeholders
    const usages = [];
    const contexts = [];
    const placeholderIds = [];

    let usage;
    while ((usage = extractUsage(cleanedContent, name)) !== null) {
      // Grab a few lines before/after for context
      const usageIndex = cleanedContent.indexOf(usage);
      const context = getContext(cleanedContent, usageIndex, usage.length);

      const pid = `{/* __AI_CONVERT__${name}__${placeholderIndex}__ */}`;
      placeholderIndex++;

      usages.push(usage);
      contexts.push(context);
      placeholderIds.push(pid);

      // Replace the usage with the placeholder
      cleanedContent = cleanedContent.replace(usage, pid);
    }

    // Clean up leftover }; from extracted definitions
    cleanedContent = cleanedContent.replace(/^\s*\};\s*$/gm, "");

    componentBlocks.push({
      name,
      definition: definition || null,
      raw: [definition, ...usages].filter(Boolean).join("\n\n").trim(),
      usages,
      contexts,
      placeholderIds,
    });
  }

  cleanedContent = cleanedContent.replace(/\n{3,}/g, "\n\n");

  return { unknowns, componentBlocks, content: cleanedContent };
}

/**
 * Grab ~3 lines before and after a position for context
 */
function getContext(content, startIndex, length) {
  const before = content.substring(Math.max(0, startIndex - 200), startIndex);
  const after = content.substring(startIndex + length, startIndex + length + 200);

  const beforeLines = before.split("\n").slice(-3).join("\n").trim();
  const afterLines = after.split("\n").slice(0, 3).join("\n").trim();

  return `...${beforeLines}\n[COMPONENT HERE]\n${afterLines}...`;
}
```

**What changed vs before:**
- ❌ Removed: the `⚠️⚠️⚠️` warning message insertion
- ✅ Added: placeholder markers like `{/* __AI_CONVERT__ExampleComponent__0__ */}`
- ✅ Added: `usages[]`, `contexts[]`, `placeholderIds[]` to each block
- ✅ Added: `getContext()` helper to capture surrounding text

**Everything else in cleanup.js stays exactly the same.**

---

## Step 5: Update `route.js`

Two small changes in route.js:

### 5a. Add the import at the top:

```js
import { convertUnknownWithAI } from "./functions/ai-converter.js";
```

### 5b. Add the AI step between Step 2 and Step 3:

Replace this section (around lines 131-146):

```js
    // Step 2: Scan and remove unknown components BEFORE pipeline
    let content = mdxBody;
    const { unknowns, componentBlocks, content: cleanedContent } = scanUnknownComponents(content);
    await saveUnknownComponents(componentBlocks);
    content = cleanedContent;

    console.log(componentBlocks);

    // Step 3: Run converter pipeline
    const allChanges = [];
```

With this:

```js
    // Step 2: Scan and extract unknown components
    let content = mdxBody;
    const { unknowns, componentBlocks, content: cleanedContent } = scanUnknownComponents(content);
    await saveUnknownComponents(componentBlocks);
    content = cleanedContent;

    // Step 2.5: AI-convert unknown components
    let aiWarnings = [];
    if (componentBlocks.length > 0) {
      const { conversions, warnings } = await convertUnknownWithAI(componentBlocks);
      aiWarnings = warnings;

      // Replace each placeholder with the AI-converted MDX
      for (const [placeholderId, convertedMdx] of conversions) {
        content = content.replace(placeholderId, convertedMdx);
      }
    }

    // Step 3: Run converter pipeline
    const allChanges = [];
```

### 5c. Update the response JSON (around line 162):

Replace the `warnings: []` line:

```js
  return NextResponse.json({
      original: rawMdx,
      converted,
      frontmatter: frontmatter || {},
      changes: allChanges,
      warnings: aiWarnings,        // ← was: warnings: []
      componentBlocks,
      stats: {
        originalLength: rawMdx.length,
        convertedLength: converted.length,
        totalChanges: allChanges.reduce((sum, c) => sum + c.count, 0),
        unknownComponents: unknowns.size,
        aiConverted: componentBlocks.length,  // ← NEW
      },
    });
```

---

## That's it. 4 files, done.

### Summary of changes:

| File | Change | Size |
|:-----|:-------|:-----|
| `.env.local` | Add `ANTHROPIC_API_KEY` | 1 line |
| `functions/types.js` | Add 2 constants at bottom | 2 lines |
| `functions/ai-converter.js` | **New file** — AI module | ~170 lines |
| `functions/cleanup.js` | Replace `scanUnknownComponents` | Same size, different logic |
| `route.js` | Add import + 10 lines between Step 2 & 3 | ~12 lines |

### What stays untouched:
- All converters in `converters.js` — no changes
- All other cleanup functions — no changes
- Frontmatter extraction — no changes
- The pipeline order — no changes
- The `saveUnknownComponents` function — still saves raw blocks for reference

### How it works end-to-end:

```
Input:  <ExampleComponent>Hello world</ExampleComponent>

Step 1: scanUnknownComponents finds it, extracts it,
        puts {/* __AI_CONVERT__ExampleComponent__0__ */} in its place

Step 2: convertUnknownWithAI sends to Claude:
        "This is a styled div wrapper with children text"

Step 3: Claude returns:
        <Callout kind="info">Hello world</Callout>

Step 4: Placeholder gets replaced with the Callout

Step 5: Pipeline runs on the full content (including the Callout)

Output: Clean MDX with "Hello world" preserved in a Callout
```

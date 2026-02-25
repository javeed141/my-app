// ai-converter.js
// Sends unknown components to Gemini Flash 2.5 and gets back
// Documentation.AI compatible MDX. Falls back gracefully if AI is unavailable.

import { AI_MODEL, AI_MAX_TOKENS } from "./types.js";

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

BAD (never do this):
<Expandable title="...">
  <ul><li>POST</li><li>PUT <Callout kind="success">Correct</Callout></li></ul>
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
// -------------------------------------------------------------------

export async function convertUnknownWithAI(componentBlocks) {
  const conversions = new Map();
  const warnings = [];

  // No API key? Just show messages — don't try to convert programmatically
  if (!process.env.GEMINI_API_KEY) {
    warnings.push("AI conversion skipped — no GEMINI_API_KEY in .env");

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

  // Convert each usage INDIVIDUALLY so different usages get different results
  for (const block of componentBlocks) {
    for (let i = 0; i < block.placeholderIds.length; i++) {
      try {
        const singleBlock = {
          name: block.name,
          definition: block.definition,
          usages: [block.usages[i]],
          contexts: [block.contexts[i]],
        };

        const result = await callGemini(singleBlock);
        conversions.set(block.placeholderIds[i], result.converted);

        if (result.confidence === "low") {
          warnings.push(`Low confidence: <${block.name}> usage ${i + 1} — ${result.reasoning}`);
        }
      } catch (err) {
        console.warn(`[ai-converter] Failed for <${block.name}> usage ${i + 1}:`, err.message);
        warnings.push(`AI failed for <${block.name}> usage ${i + 1}: ${err.message}`);

        // AI failed — just show message, don't try programmatic conversion
        conversions.set(
          block.placeholderIds[i],
          manualReviewMessage(block.name, block.usages[i])
        );
      }
    }
  }

  return { conversions, warnings };
}


// -------------------------------------------------------------------
// Call Gemini Flash 2.5 API
// -------------------------------------------------------------------

async function callGemini(block) {
  // Build the prompt
  let prompt = `Convert this unknown ReadMe component to Documentation.AI MDX.\n\n`;
  prompt += `Component name: ${block.name}\n\n`;

  if (block.definition) {
    prompt += `### Component source code:\n\`\`\`jsx\n${block.definition}\n\`\`\`\n\n`;
  }

  for (let i = 0; i < block.usages.length; i++) {
    prompt += `### Usage ${i + 1}:\n\`\`\`jsx\n${block.usages[i]}\n\`\`\`\n`;
    if (block.contexts[i]) {
      prompt += `\nSurrounding context:\n${block.contexts[i]}\n\n`;
    }
  }

  prompt += `\nPreserve ALL text content. Make it look clean and natural. Return only JSON.`;

  // Gemini REST API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: AI_MAX_TOKENS,
        temperature: 0.2,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Gemini API returned ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();

  // Gemini response: data.candidates[0].content.parts[0].text
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  return parseResponse(text, block.name);
}


// -------------------------------------------------------------------
// Parse Gemini's JSON response
// -------------------------------------------------------------------

function parseResponse(text, componentName) {
  // Strip markdown code fences if AI wrapped them
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

  // Keep it short: component name + original usage in a comment block
  const lines = [
    `{/* ⚠️ MANUAL REVIEW NEEDED: <${componentName}> */}`,
    `{/* This component could not be automatically converted. */}`,
    `{/* Original usage: */}`,
    `{/* ${safeUsage.split("\n").join("\n")} */}`,
  ];

  return lines.join("\n");
}
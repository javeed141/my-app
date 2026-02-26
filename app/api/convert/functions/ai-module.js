// ai-module.js
// Orchestrates the conversion of unknown components.
// Delegates to specialized modules:
//   - known-patterns.js → deterministic pattern matching
//   - ai-client.js      → xAI API calls, retry, response parsing
//   - system-prompt.js   → AI system prompt template
//
// This file handles: pre-filtering, orchestration, validation, fallback messages.
//
// ARCHITECTURE:
// 1. PRE-FILTER  → Skip components that already have pipeline converters
// 2. KNOWN-PATTERN → Deterministic conversion for common ReadMe components
// 3. AI CALL     → Only for components that can't be handled any other way
// 4. VALIDATION  → Check AI output is valid Doc.AI MDX, fix or reject bad output

import { knownPatternConvert } from "./known-patterns.js";
import { callAIWithRetry } from "./ai-client.js";
import { DOCAI_NATIVE_COMPONENTS } from "./scanner.js";

// -------------------------------------------------------------------
// Config
// -------------------------------------------------------------------

const AI_MAX_CONCURRENT = 10;  // Max parallel API calls

// -------------------------------------------------------------------
// Components that already have converters in converters.js.
// These should NEVER reach AI — they're handled by the pipeline.
// DOCAI_NATIVE_COMPONENTS is imported from scanner.js (single source of truth).
// -------------------------------------------------------------------

const PIPELINE_HANDLED_COMPONENTS = new Set([
  // convertCards() → Columns
  "Cards",
  // convertAccordions() → Expandable
  "Accordion", "AccordionGroup",
  // Already native Doc.AI — no conversion needed at all
  ...DOCAI_NATIVE_COMPONENTS,
]);


// -------------------------------------------------------------------
// Main export — converts all unknown components
// Same signature: takes componentBlocks, returns { conversions, warnings }
// -------------------------------------------------------------------

export async function convertUnknownWithAI(componentBlocks) {
  const conversions = new Map();
  const warnings = [];

  // ===============================================================
  // STEP 1: PRE-FILTER — skip components handled by existing pipeline
  // ===============================================================
  const { needsProcessing, skipped } = filterComponentBlocks(componentBlocks);

  if (skipped.length > 0) {
    const skippedNames = [...new Set(skipped.map(b => b.name))];
    warnings.push(
      `Skipped ${skipped.length} component(s) already handled by pipeline: ${skippedNames.join(", ")}`
    );

    // For skipped components, put back the original usage so the
    // pipeline converters can handle them normally
    for (const block of skipped) {
      for (let i = 0; i < block.placeholderIds.length; i++) {
        conversions.set(block.placeholderIds[i], block.usages[i]);
      }
    }
  }

  // ===============================================================
  // STEP 2: No API key? Use known-patterns or manual review messages
  // ===============================================================
  if (!process.env.XAI_API_KEY) {
    warnings.push("AI conversion skipped — no XAI_API_KEY in .env");

    for (const block of needsProcessing) {
      for (let i = 0; i < block.placeholderIds.length; i++) {
        // Try known pattern first, then fallback
        const knownResult = knownPatternConvert(
          block.name,
          block.usages[i]
        );

        conversions.set(
          block.placeholderIds[i],
          knownResult || manualReviewMessage(block.name, block.usages[i])
        );
      }
    }
    return { conversions, warnings };
  }

  // ===============================================================
  // STEP 3: Build task list — known patterns first, AI for the rest
  // ===============================================================
  const tasks = [];
  for (const block of needsProcessing) {
    for (let i = 0; i < block.placeholderIds.length; i++) {
      // TRY KNOWN PATTERN FIRST — no AI needed for common components
      const knownResult = knownPatternConvert(
        block.name,
        block.usages[i]
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

  if (tasks.length === 0) {
    return { conversions, warnings };
  }

  // ===============================================================
  // STEP 4: Fire parallel AI calls in batches
  // ===============================================================
  for (let batchStart = 0; batchStart < tasks.length; batchStart += AI_MAX_CONCURRENT) {
    const batch = tasks.slice(batchStart, batchStart + AI_MAX_CONCURRENT);

    const results = await Promise.allSettled(
      batch.map((task) => callAIWithRetry(task))
    );

    for (let i = 0; i < results.length; i++) {
      const task = batch[i];
      const result = results[i];

      if (result.status === "fulfilled") {
        // STEP 5: Validate AI output before using it
        const validated = validateAIOutput(result.value.converted, task.name);
        conversions.set(task.pid, validated.mdx);

        if (validated.warnings.length > 0) {
          warnings.push(...validated.warnings);
        }

        if (result.value.confidence === "low") {
          warnings.push(`Low confidence: <${task.name}> — ${result.value.reasoning}`);
        }
      } else {
        console.warn(`[ai-module] Failed for <${task.name}>:`, result.reason?.message || result.reason);
        warnings.push(`AI failed for <${task.name}>: ${result.reason?.message || "Unknown error"}`);

        // AI failed — show manual review message
        conversions.set(task.pid, manualReviewMessage(task.name, task.usage));
      }
    }
  }

  return { conversions, warnings };
}


// -------------------------------------------------------------------
// PRE-FILTER: Separate components into "needs processing" vs "skipped"
// -------------------------------------------------------------------

function filterComponentBlocks(componentBlocks) {
  const needsProcessing = [];
  const skipped = [];

  for (const block of componentBlocks) {
    if (PIPELINE_HANDLED_COMPONENTS.has(block.name)) {
      skipped.push(block);
    } else {
      needsProcessing.push(block);
    }
  }

  return { needsProcessing, skipped };
}


// -------------------------------------------------------------------
// POST-AI VALIDATION: Check that AI output is valid Doc.AI MDX
//
// Catches:
// - AI inventing components that don't exist in Doc.AI
// - Broken/unclosed tags
// - Completely empty output
// -------------------------------------------------------------------

function validateAIOutput(mdx, componentName) {
  const warnings = [];

  if (!mdx || typeof mdx !== "string" || !mdx.trim()) {
    return {
      mdx: `{/* Component <${componentName}> returned empty from AI */}`,
      warnings: [`AI returned empty output for <${componentName}>`],
    };
  }

  let cleaned = mdx.trim();

  // Check for unknown components in AI output
  const tagMatches = cleaned.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g);
  const unknownInOutput = [];

  for (const match of tagMatches) {
    const tagName = match[1];
    if (!DOCAI_NATIVE_COMPONENTS.has(tagName)) {
      unknownInOutput.push(tagName);
    }
  }

  if (unknownInOutput.length > 0) {
    const unique = [...new Set(unknownInOutput)];
    warnings.push(
      `AI used non-Doc.AI components in <${componentName}> output: ${unique.join(", ")}. ` +
      `These may not render correctly.`
    );
  }

  // Check for unclosed tags (simple heuristic)
  for (const nativeComp of DOCAI_NATIVE_COMPONENTS) {
    const openCount = (cleaned.match(new RegExp(`<${nativeComp}[\\s>]`, "g")) || []).length;
    const closeCount = (cleaned.match(new RegExp(`</${nativeComp}>`, "g")) || []).length;
    const selfCloseCount = (cleaned.match(new RegExp(`<${nativeComp}[^>]*/>`, "g")) || []).length;

    if (openCount > closeCount + selfCloseCount) {
      warnings.push(`Possible unclosed <${nativeComp}> in AI output for <${componentName}>`);
    }
  }

  // Strip className/style props that AI might have left in
  cleaned = cleaned.replace(/\s+className\s*=\s*(["'])[^"']*\1/g, "");
  cleaned = cleaned.replace(/\s+style\s*=\s*\{[^}]*\}/g, "");

  // --- MDX SYNTAX FIXES (from documentation rules) ---

  // Fix: Replace <Mermaid>...</Mermaid> with fenced code block
  cleaned = cleaned.replace(
    /<Mermaid>\s*([\s\S]*?)\s*<\/Mermaid>/gi,
    (_, content) => {
      warnings.push(`Replaced <Mermaid> component with fenced code block in <${componentName}>`);
      return "```mermaid\n" + content.trim() + "\n```";
    }
  );

  // Fix: Replace single-quoted attributes with double quotes
  // Matches attr='value' but not inside code blocks
  cleaned = cleaned.replace(
    /(<[A-Z][A-Za-z0-9]*\b[^>]*?\s\w[\w-]*)='([^']*)'/g,
    (_m, before, val) => {
      warnings.push(`Fixed single-quoted attribute in <${componentName}>`);
      return `${before}="${val}"`;
    }
  );

  // Fix: Replace H1 headings with H2 (# Title → ## Title)
  cleaned = cleaned.replace(/^# (?!#)/gm, () => {
    warnings.push(`Replaced H1 with H2 in <${componentName}> — H1 is reserved for page title`);
    return "## ";
  });

  // Fix: Move URLs/paths from icon prop to image prop on Card components
  // Catches icon="https://..." or icon="/images/..." or icon="./something.png"
  cleaned = cleaned.replace(
    /(<Card\b[^>]*?)icon="((?:https?:\/\/|\/|\.\/|\.\.\/)[^"]*)"([^>]*?>)/g,
    (_m, before, url, after) => {
      warnings.push(`Moved URL from icon to image prop in <${componentName}> — icon must be a Lucide name`);
      // If there's already an image prop, don't add duplicate — just remove the bad icon
      if (before.includes('image=') || after.includes('image=')) {
        return `${before}${after}`;
      }
      return `${before}image="${url}"${after}`;
    }
  );

  // Warn: Detect lowercase component names that should be PascalCase
  const CONTAINER_COMPONENTS = [
    "callout", "card", "columns", "expandable", "expandablegroup",
    "steps", "step", "tabs", "tab", "codegroup", "update",
  ];
  for (const lc of CONTAINER_COMPONENTS) {
    const lcPattern = new RegExp(`<${lc}[\\s>]`, "g");
    if (lcPattern.test(cleaned)) {
      warnings.push(
        `Possible lowercase component <${lc}> in <${componentName}> output — should be PascalCase`
      );
    }
  }

  return { mdx: cleaned, warnings };
}


// -------------------------------------------------------------------
// Manual review message — when AI is unavailable or fails.
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

// // ai-client.js
// // Handles all communication with the xAI API (OpenAI-compatible).
// // Extracted from ai-module.js for single-responsibility.
// //
// // Contains: API call, retry logic, prompt building, response parsing.

// import { AI_MODEL, AI_MAX_TOKENS } from "./types.js";
// import { SYSTEM_PROMPT } from "./system-prompt.js";

// const AI_RETRY_COUNT = 1; // Retries per failed call


// // -------------------------------------------------------------------
// // Call AI with retry
// // -------------------------------------------------------------------

// export async function callAIWithRetry(task) {
//   let lastError;
//   for (let attempt = 0; attempt <= AI_RETRY_COUNT; attempt++) {
//     try {
//       return await callAI(task);
//     } catch (err) {
//       lastError = err;
//       if (attempt < AI_RETRY_COUNT) {
//         // Wait 500ms before retry
//         await new Promise((r) => setTimeout(r, 500));
//       }
//     }
//   }
//   throw lastError;
// }


// // -------------------------------------------------------------------
// // Call xAI API — OpenAI-compatible chat completions
// // -------------------------------------------------------------------

// async function callAI(task) {
//   const prompt = buildUserPrompt(task);

//   const url = "https://api.x.ai/v1/chat/completions";

//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: AI_MODEL,
//       max_completion_tokens: AI_MAX_TOKENS,
//       temperature: 0.2,
//       messages: [
//         {
//           role: "system",
//           content: SYSTEM_PROMPT,
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       response_format: {
//         type: "json_object",
//       },
//     }),
//   });

//   console.log(`[ai-client] API response status: ${res.status} for <${task.name}>`);
//   if (!res.ok) {
//     const errText = await res.text().catch(() => "");
//     console.error(`[ai-client] API ERROR for <${task.name}>: ${res.status} — ${errText.slice(0, 300)}`);
//     throw new Error(`AI API returned ${res.status}: ${errText.slice(0, 200)}`);
//   }

//   const data = await res.json();

//   // OpenAI-compatible response structure
//   const text = data?.choices?.[0]?.message?.content;

//   if (!text) {
//     throw new Error("Empty response from AI");
//   }

//   return parseResponse(text, task.name);
// }


// // -------------------------------------------------------------------
// // Build user prompt — includes classification hint from cleanup.js
// // -------------------------------------------------------------------

// function buildUserPrompt(task) {
//   let prompt = `Convert this unknown ReadMe component to Documentation.AI MDX.\n\n`;
//   prompt += `Component name: <${task.name}>\n\n`;

//   // CLASSIFICATION HINT — pre-analyzed by classifyComponent() in cleanup.js
//   if (task.classification && task.classification.category !== "unknown") {
//     prompt += `### Classification (pre-analyzed)\n`;
//     prompt += `Category: ${task.classification.category}\n`;
//     prompt += `Suggested target: ${task.classification.target}\n`;
//     prompt += `Confidence: ${task.classification.confidence}\n`;
//     prompt += `Signals: ${task.classification.signals.join(", ")}\n`;
//     prompt += `\nUse this classification as a strong hint, but override it if the actual content suggests otherwise.\n\n`;
//   }

//   if (task.definition) {
//     // Sanitize definition: replace backticks that could break the fenced code block
//     const safeDef = task.definition.replace(/`/g, "'");
//     prompt += `### Component source code:\n\`\`\`jsx\n${safeDef}\n\`\`\`\n\n`;
//   }

//   if (task.usage) {
//     const safeUsage = task.usage.replace(/`/g, "'");
//     prompt += `### Usage:\n\`\`\`jsx\n${safeUsage}\n\`\`\`\n`;
//   }

//   if (task.context) {
//     prompt += `\nSurrounding context:\n${task.context}\n\n`;
//   }

//   prompt += `\nPreserve ALL text content. Make it look clean and natural. Return only JSON.`;

//   return prompt;
// }


// // -------------------------------------------------------------------
// // Parse AI's JSON response
// // -------------------------------------------------------------------

// function parseResponse(text, componentName) {
//   // Strip markdown code fences if AI wrapped them
//   const cleaned = text
//     .replace(/^```json\s*/m, "")
//     .replace(/^```\s*/m, "")
//     .replace(/```\s*$/m, "")
//     .trim();

//   try {
//     const parsed = JSON.parse(cleaned);

//     if (!parsed.converted || typeof parsed.converted !== "string") {
//       throw new Error("Missing 'converted' field");
//     }

//     return {
//       converted: parsed.converted,
//       confidence: parsed.confidence || "medium",
//       reasoning: parsed.reasoning || "",
//     };
//   } catch (err) {
//     // JSON parse failed — try to extract any MDX component from the text
//     console.warn(`[ai-module] JSON parse failed for <${componentName}>, trying extraction`);

//     const mdxMatch = text.match(
//       /<(?:Callout|Card|Columns|Steps|Tabs|Expandable|ExpandableGroup|CodeGroup)[\s\S]*?<\/(?:Callout|Card|Columns|Steps|Tabs|Expandable|ExpandableGroup|CodeGroup)>/
//     );

//     if (mdxMatch) {
//       return {
//         converted: mdxMatch[0],
//         confidence: "low",
//         reasoning: "Extracted from non-JSON response",
//       };
//     }

//     throw new Error(`Could not parse AI response: ${err.message}`);
//   }
// }

// ai-client.js
// Handles all communication with the xAI API (OpenAI-compatible).
// Extracted from ai-module.js for single-responsibility.
//
// Contains: API call, retry logic, prompt building, response parsing.

import { AI_MODEL, AI_MAX_TOKENS } from "./types.js";
import { SYSTEM_PROMPT } from "./system-prompt.js";

const AI_RETRY_COUNT = 1; // Retries per failed call


// -------------------------------------------------------------------
// Call AI with retry
// -------------------------------------------------------------------

export async function callAIWithRetry(task) {
  let lastError;
  for (let attempt = 0; attempt <= AI_RETRY_COUNT; attempt++) {
    try {
      return await callAI(task);
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
// Call xAI API — OpenAI-compatible chat completions
// -------------------------------------------------------------------

async function callAI(task) {
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
    throw new Error(`AI API returned ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();

  // OpenAI-compatible response structure
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Empty response from AI");
  }

  return parseResponse(text, task.name);
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
// Parse AI's JSON response
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
    console.warn(`[ai-module] JSON parse failed for <${componentName}>, trying extraction`);

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
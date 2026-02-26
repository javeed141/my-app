// // known-patterns.js
// // Exact-name deterministic converters for ReadMe components with
// // known 1:1 mappings. Everything else goes straight to AI.

// // -------------------------------------------------------------------
// // Main entry — returns converted MDX string, or null if no pattern matches.
// // -------------------------------------------------------------------

// export function knownPatternConvert(name, usage) {
//   if (!usage) return null;

//   // --- Recipe → Steps ---
//   if (/^Recipe$/i.test(name)) {
//     return convertRecipeToSteps(usage);
//   }

//   // --- RecipeStep alone (orphaned) → Step content ---
//   if (/^RecipeStep$/i.test(name)) {
//     return convertRecipeStepToStep(usage);
//   }

//   // --- ProgressBar → bold text ---
//   if (/^ProgressBar$/i.test(name)) {
//     return convertProgressBar(usage);
//   }

//   return null; // Let AI handle it
// }


// // -------------------------------------------------------------------
// // Recipe → Steps converter
// // -------------------------------------------------------------------

// function convertRecipeToSteps(usage) {
//   const stepRegex = /<RecipeStep\s+title="([^"]*)"(?:\s+language="([^"]*)")?>([\s\S]*?)<\/RecipeStep>/g;
//   const steps = [];
//   let match;

//   while ((match = stepRegex.exec(usage)) !== null) {
//     const title = match[1];
//     const language = match[2] || "";
//     const content = match[3].trim();

//     let stepContent;
//     if (language) {
//       stepContent = `\`\`\`${language}\n${content}\n\`\`\``;
//     } else {
//       stepContent = content;
//     }

//     steps.push(`  <Step title="${title}">\n    ${stepContent}\n  </Step>`);
//   }

//   if (steps.length === 0) return null;

//   return `<Steps>\n${steps.join("\n")}\n</Steps>`;
// }


// // -------------------------------------------------------------------
// // Single RecipeStep → Step
// // -------------------------------------------------------------------

// function convertRecipeStepToStep(usage) {
//   const match = usage.match(/<RecipeStep\s+title="([^"]*)"(?:\s+language="([^"]*)")?>([\s\S]*?)<\/RecipeStep>/);
//   if (!match) return null;

//   const title = match[1];
//   const language = match[2] || "";
//   const content = match[3].trim();

//   let stepContent;
//   if (language) {
//     stepContent = `\`\`\`${language}\n${content}\n\`\`\``;
//   } else {
//     stepContent = content;
//   }

//   return `<Steps>\n  <Step title="${title}">\n    ${stepContent}\n  </Step>\n</Steps>`;
// }


// // -------------------------------------------------------------------
// // ProgressBar → bold text
// // -------------------------------------------------------------------

// function convertProgressBar(usage) {
//   const label = matchProp(usage, "label") || "Progress";
//   const valueMatch = usage.match(/value=\{?(\d+)\}?/);
//   const maxMatch = usage.match(/max=\{?(\d+)\}?/);

//   const value = valueMatch ? valueMatch[1] : "?";
//   const max = maxMatch ? maxMatch[1] : "100";

//   return `**${label}:** ${value}/${max} (${Math.round((parseInt(value) / parseInt(max)) * 100)}%)`;
// }


// // -------------------------------------------------------------------
// // Utility
// // -------------------------------------------------------------------

// function matchProp(str, propName) {
//   const re = new RegExp(`${propName}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`);
//   const m = str.match(re);
//   if (!m) return null;
//   return m[1] !== undefined ? m[1] : m[2];
// }

// known-patterns.js
// Exact-name deterministic converters for ReadMe components with
// known 1:1 mappings. Everything else goes straight to AI.

// -------------------------------------------------------------------
// Main entry — returns converted MDX string, or null if no pattern matches.
// -------------------------------------------------------------------

export function knownPatternConvert(name, usage) {
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

  return null; // Let AI handle it
}


// -------------------------------------------------------------------
// Recipe → Steps converter
// -------------------------------------------------------------------

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


// -------------------------------------------------------------------
// Single RecipeStep → Step
// -------------------------------------------------------------------

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


// -------------------------------------------------------------------
// ProgressBar → bold text
// -------------------------------------------------------------------

function convertProgressBar(usage) {
  const label = matchProp(usage, "label") || "Progress";
  const valueMatch = usage.match(/value=\{?(\d+)\}?/);
  const maxMatch = usage.match(/max=\{?(\d+)\}?/);

  const value = valueMatch ? valueMatch[1] : "?";
  const max = maxMatch ? maxMatch[1] : "100";

  return `**${label}:** ${value}/${max} (${Math.round((parseInt(value) / parseInt(max)) * 100)}%)`;
}


// -------------------------------------------------------------------
// Utility
// -------------------------------------------------------------------

function matchProp(str, propName) {
  const re = new RegExp(`${propName}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`);
  const m = str.match(re);
  if (!m) return null;
  return m[1] !== undefined ? m[1] : m[2];
}
// Test the full pipeline with simulated AI output to check for corruption

import {
  removeImports,
  removeExports,
  removeReadmeCssClasses,
  fixHeadingHierarchy,
  fixTableAlignment,
  fixHtmlComments,
  fixVoidElements,
  fixBackslashEscapes,
  fixAngleBrackets,
  fixCurlyBraces,
  removeEmptyCodeFences,
  collapseBlankLines,
} from './app/api/convert/functions/cleanup.js';

// Simulate what content looks like AFTER scanner + AI replacement
// The AI has converted the MetricCard placeholders into Card components
const contentAfterAI = `---
title: Performance Dashboard
---

## System Metrics


<Card title="Avg Response Time" icon="clock">
  **42 ms** -- down 12% vs last month
</Card>


<Card title="P99 Latency" icon="gauge">
  **185 ms** -- up 3% vs last month
</Card>


<Card title="Uptime (30d)" icon="check-circle">
  **99.98%** -- down 0.01% vs last month
</Card>


<Card title="Error Rate" icon="alert-triangle">
  **0.02%** -- down 0.005% vs last month
</Card>

## Quick Links


<Card title="API Reference" icon="book" href="/api-reference">
  Complete endpoint documentation with request/response examples
</Card>


<Card title="Webhooks Guide" icon="bell" href="/webhooks">
  Set up real-time event notifications for your integration
</Card>


<Card title="Error Codes" icon="wrench" href="/errors">
  Full list of error codes and troubleshooting steps
</Card>
`;

const CONVERTER_PIPELINE = [
  removeImports,
  removeExports,
  removeReadmeCssClasses,
  fixHeadingHierarchy,
  fixTableAlignment,
  fixHtmlComments,
  fixVoidElements,
  fixBackslashEscapes,
  fixAngleBrackets,
  fixCurlyBraces,
  removeEmptyCodeFences,
  collapseBlankLines,
];

let content = contentAfterAI;
const allChanges = [];

for (const converter of CONVERTER_PIPELINE) {
  const before = content;
  const result = converter(content);
  content = result.content;
  allChanges.push(...result.changes);

  if (content !== before) {
    console.log(`--- ${converter.name} made changes ---`);
    for (const change of result.changes) {
      console.log(`  ${change.type}: ${change.detail}`);
    }
  }
}

console.log('\n=== Final output ===');
console.log(content);

console.log('\n=== All changes ===');
for (const c of allChanges) {
  console.log(`  ${c.type}: ${c.detail}`);
}

// Test the full scanner flow with MetricCard and QuickLink content

import { scanUnknownComponents, classifyComponent } from './app/api/convert/functions/scanner.js';

const testContent = `---
title: Performance Dashboard
---

## System Metrics

export const MetricCard = ({ label, value, unit, trend, trendDirection }) => (
  <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
    <div className="text-sm text-gray-500 uppercase tracking-wider">{label}</div>
    <div className="text-4xl font-bold my-2">
      {value}<span className="text-lg text-gray-400 ml-1">{unit}</span>
    </div>
    <div className={\`text-sm font-medium \${trendDirection === 'up' ? 'text-red-500' : 'text-green-500'}\`}>
      {trendDirection === 'up' ? '↑' : '↓'} {trend} vs last month
    </div>
  </div>
);

<MetricCard label="Avg Response Time" value={42} unit="ms" trend="12%" trendDirection="down" />

<MetricCard label="P99 Latency" value={185} unit="ms" trend="3%" trendDirection="up" />

<MetricCard label="Uptime (30d)" value={99.98} unit="%" trend="0.01%" trendDirection="down" />

<MetricCard label="Error Rate" value={0.02} unit="%" trend="0.005%" trendDirection="down" />

## Quick Links

export const QuickLink = ({ title, description, href, icon }) => (
  <a href={href} className="block border rounded-lg p-4 hover:shadow-lg transition-shadow no-underline">
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="text-lg font-bold m-0">{title}</h3>
        <p className="text-gray-600 m-0 text-sm">{description}</p>
      </div>
    </div>
  </a>
);

<QuickLink
  title="API Reference"
  description="Complete endpoint documentation with request/response examples"
  href="/api-reference"
  icon="📚"
/>

<QuickLink
  title="Webhooks Guide"
  description="Set up real-time event notifications for your integration"
  href="/webhooks"
  icon="🔔"
/>

<QuickLink
  title="Error Codes"
  description="Full list of error codes and troubleshooting steps"
  href="/errors"
  icon="🔧"
/>
`;

console.log('=== Running scanUnknownComponents ===\n');

const result = scanUnknownComponents(testContent);

console.log('Unknowns found:', [...result.unknowns.entries()]);
console.log('\nComponent blocks:');
for (const block of result.componentBlocks) {
  console.log(`\n--- ${block.name} ---`);
  console.log('  Definition found:', block.definition ? 'YES (' + block.definition.length + ' chars)' : 'NO');
  console.log('  Usages found:', block.usages.length);
  for (let i = 0; i < block.usages.length; i++) {
    console.log(`  Usage ${i}:`, JSON.stringify(block.usages[i]).substring(0, 100));
    console.log(`  PlaceholderID:`, block.placeholderIds[i]);
  }
  console.log('  Classification:', JSON.stringify(block.classification));
}

console.log('\n=== Cleaned content (with placeholders) ===');
console.log(result.content);

console.log('\n=== Checking placeholder presence ===');
for (const block of result.componentBlocks) {
  for (const pid of block.placeholderIds) {
    const found = result.content.includes(pid);
    console.log(`  ${pid}: ${found ? 'FOUND in content' : 'MISSING from content!'}`);
  }
}

// Test the selfClosing regex from scanner.js
const name = 'QuickLink';
const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
console.log('Escaped name:', escaped);

const selfClosing = new RegExp(`^<${escaped}\\b[^>]*/>`);
console.log('Regex:', selfClosing.source);

// Test 1: Single-line self-closing
const single = '<QuickLink title="API" href="/api" />';
const m1 = selfClosing.exec(single);
console.log('\nTest 1 (single-line self-closing):');
console.log('  Input:', JSON.stringify(single));
console.log('  Match:', m1 ? 'YES: ' + m1[0] : 'NO');

// Test 2: Multi-line self-closing (like QuickLink in the saved file)
const multi = `<QuickLink
  title="API Reference"
  description="Complete endpoint documentation"
  href="/api-reference"
  icon="📚"
/>`;
const m2 = selfClosing.exec(multi);
console.log('\nTest 2 (multi-line self-closing):');
console.log('  Input:', JSON.stringify(multi).substring(0, 80) + '...');
console.log('  Match:', m2 ? 'YES (len=' + m2[0].length + ')' : 'NO');

// Test 3: MetricCard single-line self-closing
const name2 = 'MetricCard';
const escaped2 = name2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const selfClosing2 = new RegExp(`^<${escaped2}\\b[^>]*/>`);
const mc = '<MetricCard label="Avg Response Time" value={42} unit="ms" trend="12%" trendDirection="down" />';
const m3 = selfClosing2.exec(mc);
console.log('\nTest 3 (MetricCard single-line):');
console.log('  Input:', JSON.stringify(mc));
console.log('  Match:', m3 ? 'YES: ' + m3[0] : 'NO');

// Test 4: What does [^>]* actually match?
const test = 'label="Avg Response Time" value={42} unit="ms" /';
console.log('\nTest 4 ([^>]* on attr string):');
console.log('  Does [^>] match each char in attrs?');
for (let i = 0; i < test.length; i++) {
  if (test[i] === '>') {
    console.log(`  FOUND > at position ${i}!`);
  }
}
console.log('  No > found in attrs - all match [^>]');

// Test 5: Step-by-step regex match for MetricCard
console.log('\nTest 5 (step-by-step):');
const re = /^<MetricCard\b/;
console.log('  ^<MetricCard\\b matches:', re.test(mc));
const re2 = /^<MetricCard\b[^>]*/;
const m5 = re2.exec(mc);
console.log('  ^<MetricCard\\b[^>]* matches:', m5 ? JSON.stringify(m5[0]) : 'NO');
// Then check what comes next
if (m5) {
  const rest = mc.substring(m5[0].length);
  console.log('  Remaining after [^>]*:', JSON.stringify(rest));
  console.log('  Does remaining start with />?', rest.startsWith('/>'));
}

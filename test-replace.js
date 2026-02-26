// Test the placeholder replacement in route.js for $ special chars

// Simulate what happens in route.js line 149:
// content = content.replace(placeholderId, "\n\n" + convertedMdx + "\n\n");

// When String.replace(string, replacement), the replacement string has special patterns:
// $$ → inserts $
// $& → inserts the matched substring
// $` → inserts the portion before the match
// $' → inserts the portion after the match
// $n → inserts nth capture group

const content = 'Before\n{/* __AI_CONVERT__MetricCard__0__ */}\nAfter';
const placeholderId = '{/* __AI_CONVERT__MetricCard__0__ */}';

// Test 1: Normal AI output (no $ characters)
const normalOutput = '<Card title="Avg Response Time">\n  42ms\n</Card>';
const result1 = content.replace(placeholderId, "\n\n" + normalOutput + "\n\n");
console.log('Test 1 (normal output):');
console.log(result1);
console.log('---');

// Test 2: AI output with $ in it (e.g., pricing, regex examples)
const dollarOutput = 'The cost is $99/month. Use regex $1 to capture.';
const result2 = content.replace(placeholderId, "\n\n" + dollarOutput + "\n\n");
console.log('\nTest 2 ($ in output):');
console.log(result2);
console.log('---');

// Test 3: AI output with $& (inserts the matched string!)
const dangerOutput = 'Replace $& with something';
const result3 = content.replace(placeholderId, "\n\n" + dangerOutput + "\n\n");
console.log("\nTest 3 ($& in output - should insert the placeholder!):");
console.log(result3);
console.log('---');

// Test 4: AI output with $` (inserts text before match)
const danger2 = "See $` for prefix";
const result4 = content.replace(placeholderId, "\n\n" + danger2 + "\n\n");
console.log("\nTest 4 ($` in output - inserts text before match!):");
console.log(result4);
console.log('---');

// The FIX: use a function as replacement to avoid special patterns
const result5 = content.replace(placeholderId, () => "\n\n" + dollarOutput + "\n\n");
console.log('\nTest 5 (function replacement - safe):');
console.log(result5);

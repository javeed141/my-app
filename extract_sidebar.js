const fs = require('fs');

const file1 = 'C:/Users/g/.claude/projects/d--Projects-NEXTJSPROJECT-my-app/cc3de6da-2c0a-4a0a-b8eb-038ec2f60eb3/tool-results/mcp-claude_ai_FireCrawl-firecrawl_scrape-1771596219767.txt';
const file2 = 'C:/Users/g/.claude/projects/d--Projects-NEXTJSPROJECT-my-app/cc3de6da-2c0a-4a0a-b8eb-038ec2f60eb3/tool-results/mcp-claude_ai_FireCrawl-firecrawl_scrape-1771596260109.txt';

function extractHtml(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let html = '';
  for (const item of data) {
    try {
      const parsed = JSON.parse(item.text);
      if (parsed.rawHtml) { html = parsed.rawHtml; break; }
    } catch(e) {}
  }
  if (html.length === 0) {
    const full = data.map(d => d.text).join('');
    try { html = JSON.parse(full).rawHtml; } catch(e) { html = full; }
  }
  return html;
}

function analyzeHtml(html, label) {
  console.log('\n========================================');
  console.log('ANALYZING:', label);
  console.log('HTML length:', html.length);
  console.log('========================================\n');

  // Find script tags
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let i = 0;
  let sidebarScripts = [];
  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1];
    if (content.toLowerCase().includes('sidebar')) {
      sidebarScripts.push({ index: i, content });
    }
    i++;
  }
  console.log('Total script tags:', i);
  console.log('Script tags containing "sidebar":', sidebarScripts.length);

  for (const s of sidebarScripts) {
    console.log('\n--- Script', s.index, 'length=' + s.content.length, '---');
    // Show first 5000 chars
    console.log(s.content.substring(0, 5000));
    if (s.content.length > 5000) console.log('\n...[truncated, total length: ' + s.content.length + ']');
  }

  // Look for __NEXT_DATA__ or similar JSON blobs
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
  if (nextDataMatch) {
    console.log('\n--- __NEXT_DATA__ found, length=' + nextDataMatch[1].length, '---');
    try {
      const nextData = JSON.parse(nextDataMatch[1]);
      // Look for sidebar keys
      const keys = JSON.stringify(nextData).match(/"sidebar[^"]*"/gi);
      if (keys) {
        console.log('Keys matching "sidebar":', [...new Set(keys)].slice(0, 30));
      }
      // Check props structure
      if (nextData.props && nextData.props.pageProps) {
        const ppKeys = Object.keys(nextData.props.pageProps);
        console.log('pageProps keys:', ppKeys);
        if (nextData.props.pageProps.sidebars) {
          const sbKeys = Object.keys(nextData.props.pageProps.sidebars);
          console.log('sidebars keys:', sbKeys);
          // For each sidebar key, show structure
          for (const key of sbKeys) {
            const sb = nextData.props.pageProps.sidebars[key];
            console.log('\nsidebars["' + key + '"]:', Array.isArray(sb) ? 'Array, length=' + sb.length : typeof sb);
            if (Array.isArray(sb) && sb.length > 0) {
              console.log('First item keys:', Object.keys(sb[0]));
              console.log('First item:', JSON.stringify(sb[0]).substring(0, 1000));
            }
          }
        }
      }
    } catch(e) {
      console.log('Failed to parse __NEXT_DATA__:', e.message);
    }
  } else {
    console.log('\nNo __NEXT_DATA__ script tag found.');
  }

  // Look for header/nav links
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  if (headerMatch) {
    console.log('\n--- Header found, length=' + headerMatch[0].length + ' ---');
    // Extract links
    const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let linkMatch;
    let links = [];
    while ((linkMatch = linkRegex.exec(headerMatch[0])) !== null) {
      links.push({ href: linkMatch[1], text: linkMatch[2].replace(/<[^>]*>/g, '').trim() });
    }
    console.log('Header links:');
    for (const l of links) {
      console.log('  ', l.href, '->', l.text);
    }
  }

  // Look for nav with docs/reference/changelog links
  const navLinks = html.match(/href="[^"]*\/(docs|reference|changelog|recipes|discuss)[^"]*"/gi);
  if (navLinks) {
    console.log('\nNav-like links (docs/reference/changelog/recipes/discuss):');
    const unique = [...new Set(navLinks)].slice(0, 20);
    for (const l of unique) {
      console.log('  ', l);
    }
  }
}

const html1 = extractHtml(file1);
analyzeHtml(html1, 'paperform.readme.io/reference');

const html2 = extractHtml(file2);
analyzeHtml(html2, 'floorplanner.readme.io/reference/getting-started');

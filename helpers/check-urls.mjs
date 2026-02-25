import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const RESULTS_DIR = "./url-check-results";
const TIMEOUT_MS = 12000;

const urls = [
  // Developer APIs & SaaS Platforms
  { name: "Algolia", url: "https://algolia.readme.io/docs" },
  { name: "Toggl Track", url: "https://engineering.toggl.com/docs/" },
  { name: "Attio CRM", url: "https://docs.attio.com" },
  { name: "LaunchDarkly", url: "https://apidocs.launchdarkly.com" },
  { name: "Mux", url: "https://docs.mux.com" },
  { name: "Cal.com", url: "https://docs.cal.com/api-reference" },
  { name: "Metronome", url: "https://docs.metronome.com" },
  { name: "Clerk", url: "https://clerk.readme.io/docs" },
  { name: "Fiberplane", url: "https://docs.fiberplane.com" },
  { name: "Supaglue", url: "https://docs.supaglue.com" },

  // Payments, Finance & Banking APIs
  { name: "Razorpay", url: "https://razorpay.com/docs/api/" },
  { name: "Square", url: "https://developer.squareup.com/reference" },
  { name: "Adyen", url: "https://docs.adyen.com/api-explorer/" },
  { name: "Airwallex", url: "https://docs.airwallex.com" },
  { name: "Unit Finance", url: "https://docs.unit.co" },
  { name: "Modern Treasury", url: "https://docs.moderntreasury.com" },
  { name: "Lithic", url: "https://docs.lithic.com" },
  { name: "Treasury Prime", url: "https://docs.treasuryprime.com" },

  // AI, Data & Infrastructure APIs
  { name: "Replicate AI", url: "https://replicate.readme.io/docs" },
  { name: "AssemblyAI", url: "https://www.assemblyai.com/docs" },
  { name: "SerpAPI", url: "https://serpapi.com/search-api" },
  { name: "Clearbit", url: "https://clearbit.readme.io/docs" },
  { name: "Deepgram", url: "https://developers.deepgram.com/docs" },
  { name: "Pinecone", url: "https://docs.pinecone.io" },
  { name: "Weaviate Cloud", url: "https://weaviate.io/developers/weaviate" },

  // Web3, Crypto & Blockchain APIs
  { name: "Moralis", url: "https://docs.moralis.io" },
  { name: "QuickNode", url: "https://www.quicknode.com/docs" },
  { name: "Helius", url: "https://docs.helius.dev" },
  { name: "Tatum", url: "https://docs.tatum.io" },
  { name: "Blocknative", url: "https://docs.blocknative.com" },
  { name: "CoinAPI", url: "https://docs.coinapi.io" },

  // Communication, Messaging & Email APIs
  { name: "Sendbird", url: "https://sendbird.readme.io/docs" },
  { name: "MessageBird", url: "https://developers.messagebird.com" },
  { name: "Postmark", url: "https://postmarkapp.com/developer" },
  { name: "Courier", url: "https://docs.courier.com" },
  { name: "Telnyx", url: "https://developers.telnyx.com/docs" },

  // Dev Tools, Monitoring & Infrastructure
  { name: "Sentry", url: "https://docs.sentry.io/api/" },
  { name: "Linear", url: "https://developers.linear.app/docs" },
  { name: "Render", url: "https://render.com/docs/api" },
  { name: "Railway", url: "https://docs.railway.app/reference/api" },
  { name: "Logtail", url: "https://docs.logtail.com" },

  // ReadMe.io subdomains
  { name: "Clearbit (readme)", url: "https://clearbit.readme.io/docs" },
  { name: "Pusher Beams", url: "https://pusher.readme.io/docs" },
  { name: "Trinsic", url: "https://trinsic.readme.io/docs" },
  { name: "Shyft", url: "https://shyft.readme.io/docs" },
  { name: "EnableX", url: "https://enablex.readme.io/docs" },
  {name:"developer",url:"https://developer.monday.com/apps"}
];

async function checkUrl(entry) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const start = Date.now();

  try {
    const res = await fetch(entry.url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timer);
    const elapsed = Date.now() - start;
    return {
      name: entry.name,
      url: entry.url,
      status: res.status,
      ok: res.ok,
      elapsed_ms: elapsed,
      error: res.ok ? null : `HTTP ${res.status} ${res.statusText}`,
      final_url: res.url !== entry.url ? res.url : null,
    };
  } catch (err) {
    clearTimeout(timer);
    const elapsed = Date.now() - start;
    let reason = err.message;
    if (err.name === "AbortError") reason = `Timeout after ${TIMEOUT_MS}ms`;
    return {
      name: entry.name,
      url: entry.url,
      status: null,
      ok: false,
      elapsed_ms: elapsed,
      error: reason,
      final_url: null,
    };
  }
}

async function main() {
  if (!existsSync(RESULTS_DIR)) mkdirSync(RESULTS_DIR, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  console.log(`\nChecking ${urls.length} URLs...\n${"─".repeat(60)}`);

  const results = [];

  // Run checks in batches of 5 to avoid hammering servers
  const BATCH = 5;
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    const batchResults = await Promise.all(batch.map(checkUrl));
    for (const r of batchResults) {
      const icon = r.ok ? "✓" : "✗";
      const statusStr = r.status ? `[${r.status}]` : "[ERR]";
      console.log(`${icon} ${statusStr.padEnd(7)} ${r.name.padEnd(20)} ${r.url}`);
      if (!r.ok) console.log(`      → ${r.error}`);
      results.push(r);
    }
  }

  const passed = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  // ── Write full results JSON ──────────────────────────────────────
  const fullPath = join(RESULTS_DIR, `all-results-${timestamp}.json`);
  writeFileSync(fullPath, JSON.stringify(results, null, 2));

  // ── Write failures-only log ──────────────────────────────────────
  if (failed.length > 0) {
    const failLines = [
      `URL Check Failures — ${new Date().toUTCString()}`,
      `Total checked: ${results.length}  |  Passed: ${passed.length}  |  Failed: ${failed.length}`,
      "═".repeat(70),
      "",
      ...failed.map((f) => [
        `NAME   : ${f.name}`,
        `URL    : ${f.url}`,
        `STATUS : ${f.status ?? "N/A"}`,
        `ERROR  : ${f.error}`,
        `TIME   : ${f.elapsed_ms}ms`,
        f.final_url ? `FINAL  : ${f.final_url}` : null,
        "─".repeat(70),
        "",
      ].filter(Boolean).join("\n")),
    ].join("\n");

    const failPath = join(RESULTS_DIR, `failures-${timestamp}.txt`);
    writeFileSync(failPath, failLines);
    console.log(`\n${"─".repeat(60)}`);
    console.log(`FAILURES (${failed.length}):`);
    failed.forEach((f) => console.log(`  • ${f.name}: ${f.error}`));
  }

  // ── Summary ──────────────────────────────────────────────────────
  console.log(`\n${"═".repeat(60)}`);
  console.log(`SUMMARY: ${passed.length}/${results.length} passed, ${failed.length} failed`);
  console.log(`Results saved to: ${RESULTS_DIR}/`);
  console.log(`  • all-results-${timestamp}.json`);
  if (failed.length > 0) console.log(`  • failures-${timestamp}.txt`);
  console.log("═".repeat(60));
}

main().catch(console.error);

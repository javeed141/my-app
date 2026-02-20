"use client";

import { useState } from "react";

interface CompareResult {
  sitemapTotal: number;
  jsonTotal: number;
  matchedCount: number;
  missingCount: number;
  missing: string[];
  matched: string[];
}

export default function ComparePage() {
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompareResult | null>(null);
  const [showMatched, setShowMatched] = useState(false);

  // Pre-fill JSON from localStorage if available
  function loadFromScraper() {
    const raw = localStorage.getItem("scrape_result");
    if (raw) {
      setJsonText(raw);
      setError(null);
    } else {
      setError("No scraper result found. Run a scrape first from /fetch.");
    }
  }

  async function handleCompare() {
    if (!sitemapUrl.trim() || !jsonText.trim()) {
      setError("Both sitemap URL and JSON are required.");
      return;
    }

    let scraperJson;
    try {
      scraperJson = JSON.parse(jsonText);
    } catch {
      setError("Invalid JSON. Please paste valid scraper output.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sitemapUrl: sitemapUrl.trim(), scraperJson }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to compare");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sitemap Compare</h1>
        <p className="text-gray-500 text-sm mb-8">
          Compare a sitemap.xml against your scraper JSON to find missing pages.
        </p>

        {/* Sitemap URL */}
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Sitemap URL
        </label>
        <input
          type="text"
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          placeholder="https://docs.example.com/sitemap.xml"
          className="w-full bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400
                     rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-500
                     focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm mb-5"
        />

        {/* JSON input */}
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Scraper JSON
          </label>
          <button
            type="button"
            onClick={loadFromScraper}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Load from last scrape
          </button>
        </div>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='Paste your scraper JSON here, or click "Load from last scrape"'
          rows={6}
          className="w-full bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400
                     rounded-lg px-4 py-3 text-xs font-mono focus:outline-none focus:border-indigo-500
                     focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm resize-y mb-5"
        />

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Compare button */}
        <button
          type="button"
          onClick={handleCompare}
          disabled={loading || !sitemapUrl.trim() || !jsonText.trim()}
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                     hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors flex items-center gap-2 shadow-sm"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Comparing...
            </>
          ) : "Compare"}
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8">

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <StatCard label="Sitemap URLs" value={result.sitemapTotal} color="gray" />
              <StatCard label="JSON URLs" value={result.jsonTotal} color="gray" />
              <StatCard label="Matched" value={result.matchedCount} color="emerald" />
              <StatCard label="Missing" value={result.missingCount} color="rose" />
            </div>

            {/* Coverage bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Coverage</span>
                <span>{result.sitemapTotal > 0 ? Math.round((result.matchedCount / result.sitemapTotal) * 100) : 0}%</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${result.sitemapTotal > 0 ? (result.matchedCount / result.sitemapTotal) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Missing URLs */}
            {result.missing.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-rose-700 mb-2">
                  Missing from JSON ({result.missing.length})
                </h3>
                <div className="border border-rose-200 bg-rose-50 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                  {result.missing.map((url, i) => (
                    <div
                      key={i}
                      className={`px-4 py-2 text-xs font-mono text-rose-800 ${
                        i < result.missing.length - 1 ? "border-b border-rose-200/60" : ""
                      }`}
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched URLs (collapsible) */}
            {result.matched.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowMatched((v) => !v)}
                  className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-1.5 hover:text-emerald-900 transition-colors"
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${showMatched ? "rotate-90" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                  Matched ({result.matched.length})
                </button>
                {showMatched && (
                  <div className="border border-emerald-200 bg-emerald-50 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    {result.matched.map((url, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 text-xs font-mono text-emerald-800 ${
                          i < result.matched.length - 1 ? "border-b border-emerald-200/60" : ""
                        }`}
                      >
                        {url}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* All matched, nothing missing */}
            {result.missingCount === 0 && result.matchedCount > 0 && (
              <p className="text-emerald-700 font-semibold text-sm mt-4">
                All sitemap URLs are present in the scraper JSON.
              </p>
            )}
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 flex gap-4">
          <a href="/fetch" className="text-gray-400 hover:text-indigo-600 text-xs transition-colors">
            &larr; Scraper
          </a>
          <a href="/results" className="text-gray-400 hover:text-indigo-600 text-xs transition-colors">
            Results
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    gray: "bg-white border-gray-200 text-gray-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    rose: "bg-rose-50 border-rose-200 text-rose-700",
  };

  return (
    <div className={`border rounded-xl px-4 py-3 shadow-sm ${colors[color] || colors.gray}`}>
      <p className="text-[10px] uppercase tracking-wide font-semibold opacity-60 mb-0.5">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FetchPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleScrape() {
    const trimmed = url.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      localStorage.setItem("scrape_result", JSON.stringify(data));
      router.push("/results");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to scrape");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4">
            <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Doc Scraper</h1>
          <p className="text-slate-400 mt-2 text-lg">
            Extract structured navigation from any documentation site
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Documentation URL
          </label>

          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScrape()}
              placeholder="https://docs.example.com"
              className="flex-1 bg-slate-800/60 border border-slate-600/60 text-white placeholder:text-slate-500
                         rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                         transition-colors"
            />
            <button
              onClick={handleScrape}
              disabled={loading || !url.trim()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap
                         flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Scraping…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Scrape
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <p className="mt-5 text-xs text-slate-500 text-center">
            Works best with documentation sites using /docs, /reference, or /recipes paths
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  {
    type: "A",
    label: "Multi-Tab + Sidebar",
    desc: "Multiple top nav tabs + sidebar within each tab",
    links: [
      { name: "Pipedrive", url: "https://pipedrive.readme.io/docs/getting-started" },
      { name: "Lithic", url: "https://docs.lithic.com/docs/quick-start-start-here" },
      { name: "ReadMe", url: "https://docs.readme.com/main/docs" },
      { name: "Shopline", url: "https://shopline-developers.readme.io/docs/get-started" },
    ],
  },
  {
    type: "B",
    label: "Single Section + Sidebar",
    desc: "Only one tab + sidebar with all pages",
    links: [
      { name: "Paperform", url: "https://paperform.readme.io/reference" },
      { name: "Floorplanner", url: "https://floorplanner.readme.io/reference/getting-started" },
      { name: "Autocode", url: "https://autocode.readme.io/docs/getting-started" },
      { name: "Lirium", url: "https://lirium.readme.io/reference/welcome" },
    ],
  },
  {
    type: "C",
    label: "Tabs + Versions + Sidebar",
    desc: "Multiple tabs with a version selector",
    links: [
      { name: "Pennylane", url: "https://pennylane.readme.io/docs/getting-started" },
      { name: "Datafiniti", url: "https://docs.datafiniti.co/docs" },
      { name: "360Learning", url: "https://360learning.readme.io/docs/introduction" },
      { name: "ShippingEasy", url: "https://shippingeasy.readme.io/reference/getting-started" },
    ],
  },
  {
    type: "D",
    label: "Multi-Project + Sidebar",
    desc: "Product/project names in top nav, each with own sub-site",
    links: [
      { name: "Modern Treasury – Payments", url: "https://docs.moderntreasury.com/payments/docs" },
      { name: "Modern Treasury – Reconciliation", url: "https://docs.moderntreasury.com/reconciliation/docs" },
      { name: "Modern Treasury – Ledgers", url: "https://docs.moderntreasury.com/ledgers/docs" },
      { name: "Modern Treasury – Platform", url: "https://docs.moderntreasury.com/platform/docs" },
    ],
  },
];

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

  function handleQuickLink(linkUrl: string) {
    setUrl(linkUrl);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 flex flex-col items-center justify-center px-4 py-16">
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

        {/* Reference Links by Category */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 text-center">
            Try a reference site
          </h2>

          <div className="grid gap-4">
            {categories.map((cat) => (
              <div
                key={cat.type}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded-md">
                    Type {cat.type}
                  </span>
                  <span className="text-sm font-medium text-slate-200">
                    {cat.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3">{cat.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {cat.links.map((link) => (
                    <button
                      key={link.url}
                      onClick={() => handleQuickLink(link.url)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-600/40
                                 text-slate-300 hover:text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10
                                 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const categories = [
  {
    type: "A",
    label: "Multi-Tab + Sidebar",
    desc: "Multiple top nav tabs + sidebar within each tab",
    links: [
      { name: "Pipedrive", url: "https://pipedrive.readme.io/docs/getting-started" },
      { name: "Lithic", url: "https://docs.lithic.com/docs/" },
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
      { name: "Pennylane", url: "https://pennylane.readme.io/docs/" },
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

const quickLinks = [
  { name: "Pipedrive", url: "https://pipedrive.readme.io/docs/getting-started" },
  { name: "Lithic", url: "https://docs.lithic.com/docs/quick-start-start-here" },
  { name: "ReadMe", url: "https://docs.readme.com/main/docs" },
  { name: "Paperform", url: "https://paperform.readme.io/reference" },
  { name: "Datafiniti", url: "https://docs.datafiniti.co/docs" },
  { name: "Floorplanner", url: "https://floorplanner.readme.io/reference/getting-started" },
  { name: "Modern Treasury", url: "https://docs.moderntreasury.com/payments/docs" },
  { name: "Shopline", url: "https://shopline-developers.readme.io/docs/get-started" },
];

export default function FetchPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── THIS IS THE ONLY FUNCTION THAT CALLS THE API ───
  async function handleScrapeClick() {
    const trimmed = url.trim();
    if (!trimmed) return;

    try {
      new URL(trimmed);
    } catch {
      setError("Please enter a valid URL (e.g. https://docs.example.com)");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      localStorage.setItem("scrape_result", JSON.stringify(data));
      router.push("/results");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to scrape");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl py-20">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Doc Scraper</h1>
        <p className="text-gray-500 text-sm mb-8">
          Paste a documentation URL to extract its navigation structure.
        </p>

        {/* Input + Scrape Button (NO form, NO onSubmit, NO auto-trigger) */}
        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleScrapeClick();
              }
            }}
            placeholder="https://docs.example.com"
            className="flex-1 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400
                       rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-500
                       focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
          />
          <button
            type="button"
            onClick={handleScrapeClick}
            disabled={loading || !url.trim()}
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                       hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Scraping...
              </>
            ) : "Scrape"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Quick links — ONLY sets URL, never calls API */}
        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
          Quick test
        </p>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <button
              key={link.url}
              type="button"
              onClick={() => {
                setUrl(link.url);
                setError(null);
              }}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 bg-white
                         hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50
                         disabled:opacity-40 transition-colors shadow-sm"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Categories — ONLY sets URL, never calls API */}
        <div className="grid gap-4 mt-8">
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
                    type="button"
                    onClick={() => {
                      setUrl(link.url);
                      setError(null);
                    }}
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

        {/* Back link */}
        <div className="mt-10">
          <a href="/" className="text-gray-400 hover:text-indigo-600 text-xs transition-colors">
            &larr; Home
          </a>
        </div>
      </div>
    </div>
  );
}
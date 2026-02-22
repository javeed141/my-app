"use client";

import { useState, useRef } from "react";

interface Change {
  type: string;
  count: number;
  detail: string;
}

interface ConvertResult {
  original: string;
  converted: string;
  frontmatter: Record<string, string>;
  changes: Change[];
  warnings: string[];
  stats: {
    originalLength: number;
    convertedLength: number;
    totalChanges: number;
    unknownComponents: number;
  };
}

type InputMode = "url" | "mdx";

export default function MdxConvertPage() {
  const [mode, setMode] = useState<InputMode>("url");
  const [url, setUrl] = useState("");
  const [mdx, setMdx] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [activeTab, setActiveTab] = useState<"original" | "converted">("converted");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleConvert() {
    const body = mode === "url"
      ? { url: url.trim() }
      : { mdx: mdx.trim() };

    if (mode === "url" && !url.trim()) return;
    if (mode === "mdx" && !mdx.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data: ConvertResult = await res.json();
      setResult(data);
      setActiveTab("converted");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = mode === "url" ? url.trim().length > 0 : mdx.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MDX Converter</h1>
              <p className="text-xs text-gray-500">ReadMe MDX → Documentation.AI MDX</p>
            </div>
          </div>
          <a href="/" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">
            &larr; Home
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {/* Mode Toggle */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-5">
            <button
              onClick={() => setMode("url")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                mode === "url"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              URL
            </button>
            <button
              onClick={() => setMode("mdx")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                mode === "mdx"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Paste MDX
            </button>
          </div>

          {mode === "url" ? (
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleConvert();
                  }
                }}
                placeholder="https://raw.githubusercontent.com/org/repo/main/docs/page.mdx"
                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400
                           rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-500
                           focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button
                onClick={handleConvert}
                disabled={loading || !canSubmit}
                className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                           hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Converting...
                  </>
                ) : "Convert"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <textarea
                value={mdx}
                onChange={(e) => setMdx(e.target.value)}
                placeholder={"---\ntitle: My Page\nslug: my-page\n---\n\n> 📘 Note\n> This is a ReadMe callout\n\n## Content here..."}
                spellCheck={false}
                className="w-full min-h-[200px] bg-gray-50 border border-gray-300 text-gray-900
                           placeholder:text-gray-400 rounded-lg px-4 py-3 text-sm font-mono
                           focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                           transition-all resize-y leading-relaxed"
              />
              <button
                onClick={handleConvert}
                disabled={loading || !canSubmit}
                className="w-full px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                           hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Converting...
                  </>
                ) : "Convert MDX"}
              </button>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-4">
            {/* Stats Bar */}
            <div className="flex gap-2 flex-wrap">
              <Stat label="Changes" value={result.stats.totalChanges} />
              <Stat label="Original" value={`${result.stats.originalLength} chars`} />
              <Stat label="Converted" value={`${result.stats.convertedLength} chars`} />
              {result.warnings.length > 0 && (
                <Stat label="Warnings" value={result.warnings.length} warn />
              )}
            </div>

            {/* Changes List */}
            {result.changes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Changes Made</h3>
                <div className="flex flex-wrap gap-2">
                  {result.changes.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs">
                      <span className="font-bold text-indigo-700">{c.type}</span>
                      <span className="text-indigo-400">x{c.count}</span>
                      <span className="text-gray-500">{c.detail}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Warnings</h3>
                {result.warnings.map((w, i) => (
                  <p key={i} className="text-sm text-amber-800">{w}</p>
                ))}
              </div>
            )}

            {/* Code View */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Tab Bar */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4">
                <div className="flex">
                  <TabButton
                    active={activeTab === "converted"}
                    onClick={() => setActiveTab("converted")}
                    label="Converted"
                    badge="new"
                  />
                  <TabButton
                    active={activeTab === "original"}
                    onClick={() => setActiveTab("original")}
                    label="Original"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const text = activeTab === "converted" ? result.converted : result.original;
                      const blob = new Blob([text], { type: "text/markdown" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = activeTab === "converted" ? "converted.mdx" : "original.mdx";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold
                               text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download .mdx
                  </button>
                  <button
                    onClick={() => {
                      const text = activeTab === "converted" ? result.converted : result.original;
                      navigator.clipboard.writeText(text);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold
                               text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <pre className="p-5 text-sm font-mono leading-relaxed text-gray-800 overflow-auto max-h-[600px] whitespace-pre-wrap break-words">
                {activeTab === "converted" ? result.converted : result.original}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string | number; warn?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${
      warn
        ? "bg-amber-50 border-amber-200"
        : "bg-white border-gray-200"
    }`}>
      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{label}</span>
      <span className={`font-bold ${warn ? "text-amber-700" : "text-gray-900"}`}>{value}</span>
    </div>
  );
}

function TabButton({ active, onClick, label, badge }: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
        active
          ? "text-indigo-600 border-indigo-600"
          : "text-gray-400 border-transparent hover:text-gray-600"
      }`}
    >
      {label}
      {badge && active && (
        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </button>
  );
}

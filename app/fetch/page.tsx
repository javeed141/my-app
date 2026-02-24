// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";

// const categories = [
//   {
//     type: "A",
//     label: "Multi-Tab + Sidebar",
//     desc: "Multiple top nav tabs + sidebar within each tab",
//     links: [
//       { name: "Pipedrive", url: "https://pipedrive.readme.io/docs/getting-started" },
//       { name: "Lithic", url: "https://docs.lithic.com/docs/" },
//       { name: "ReadMe", url: "https://docs.readme.com/main/docs" },
//       { name: "Shopline", url: "https://shopline-developers.readme.io/docs/get-started" },
//     ],
//   },
//   {
//     type: "B",
//     label: "Single Section + Sidebar",
//     desc: "Only one tab + sidebar with all pages",
//     links: [
//       { name: "Paperform", url: "https://paperform.readme.io/reference" },
//       { name: "Floorplanner", url: "https://floorplanner.readme.io/reference/getting-started" },
//       { name: "Autocode", url: "https://autocode.readme.io/docs/getting-started" },
//       { name: "Lirium", url: "https://lirium.readme.io/reference/welcome" },
//     ],
//   },
//   {
//     type: "C",
//     label: "Tabs + Versions + Sidebar",
//     desc: "Multiple tabs with a version selector",
//     links: [
//       { name: "Pennylane", url: "https://pennylane.readme.io/docs/" },
//       { name: "Datafiniti", url: "https://docs.datafiniti.co/docs" },
//       { name: "360Learning", url: "https://360learning.readme.io/docs/introduction" },
//       { name: "ShippingEasy", url: "https://shippingeasy.readme.io/reference/getting-started" },
//     ],
//   },
//   {
//     type: "D",
//     label: "Multi-Project + Sidebar",
//     desc: "Product/project names in top nav, each with own sub-site",
//     links: [
//       { name: "Modern Treasury – Payments", url: "https://docs.moderntreasury.com/payments/docs" },
//       { name: "Modern Treasury – Reconciliation", url: "https://docs.moderntreasury.com/reconciliation/docs" },
//       { name: "Modern Treasury – Ledgers", url: "https://docs.moderntreasury.com/ledgers/docs" },
//       { name: "Modern Treasury – Platform", url: "https://docs.moderntreasury.com/platform/docs" },
//     ],
//   },
// ];

// const quickLinks = [
//   { name: "Pipedrive", url: "https://pipedrive.readme.io/docs/getting-started" },
//   { name: "Lithic", url: "https://docs.lithic.com/docs/quick-start-start-here" },
//   { name: "ReadMe", url: "https://docs.readme.com/main/docs" },
//   { name: "Paperform", url: "https://paperform.readme.io/reference" },
//   { name: "Datafiniti", url: "https://docs.datafiniti.co/docs" },
//   { name: "Floorplanner", url: "https://floorplanner.readme.io/reference/getting-started" },
//   { name: "Modern Treasury", url: "https://docs.moderntreasury.com/payments/docs" },
//   { name: "Shopline", url: "https://shopline-developers.readme.io/docs/get-started" },
// ];

// export default function FetchPage() {
//   const router = useRouter();
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // ─── THIS IS THE ONLY FUNCTION THAT CALLS THE API ───
//   async function handleScrapeClick() {
//     const trimmed = url.trim();
//     if (!trimmed) return;

//     try {
//       new URL(trimmed);
//     } catch {
//       setError("Please enter a valid URL (e.g. https://docs.example.com)");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/scrape", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url: trimmed }),
//       });

//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.error || `HTTP ${res.status}`);
//       }

//       const data = await res.json();
//       localStorage.setItem("scrape_result", JSON.stringify(data));
//       router.push("/results");
//     } catch (e: unknown) {
//       setError(e instanceof Error ? e.message : "Failed to scrape");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-xl py-20">

//         {/* Title */}
//         <h1 className="text-2xl font-bold text-gray-900 mb-1">Doc Scraper</h1>
//         <p className="text-gray-500 text-sm mb-8">
//           Paste a documentation URL to extract its navigation structure.
//         </p>

//         {/* Input + Scrape Button (NO form, NO onSubmit, NO auto-trigger) */}
//         <div className="flex gap-2 mb-4">
//           <input
//             ref={inputRef}
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 handleScrapeClick();
//               }
//             }}
//             placeholder="https://docs.example.com"
//             className="flex-1 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400
//                        rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-500
//                        focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
//           />
//           <button
//             type="button"
//             onClick={handleScrapeClick}
//             disabled={loading || !url.trim()}
//             className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg
//                        hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
//                        transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Scraping...
//               </>
//             ) : "Scrape"}
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <p className="text-red-600 text-sm mb-4">{error}</p>
//         )}

//         {/* Divider */}
//         <div className="border-t border-gray-200 my-8" />

//         {/* Quick links — ONLY sets URL, never calls API */}
//         <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
//           Quick test
//         </p>
//         <div className="flex flex-wrap gap-2">
//           {quickLinks.map((link) => (
//             <button
//               key={link.url}
//               type="button"
//               onClick={() => {
//                 setUrl(link.url);
//                 setError(null);
//               }}
//               disabled={loading}
//               className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 bg-white
//                          hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50
//                          disabled:opacity-40 transition-colors shadow-sm"
//             >
//               {link.name}
//             </button>
//           ))}
//         </div>

//         {/* Categories — ONLY sets URL, never calls API */}
//         <div className="grid gap-4 mt-8">
//           {categories.map((cat) => (
//             <div
//               key={cat.type}
//               className="bg-white/5 border border-white/10 rounded-xl p-5"
//             >
//               <div className="flex items-center gap-2 mb-1">
//                 <span className="text-xs font-bold text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded-md">
//                   Type {cat.type}
//                 </span>
//                 <span className="text-sm font-medium text-slate-200">
//                   {cat.label}
//                 </span>
//               </div>
//               <p className="text-xs text-slate-500 mb-3">{cat.desc}</p>

//               <div className="flex flex-wrap gap-2">
//                 {cat.links.map((link) => (
//                   <button
//                     key={link.url}
//                     type="button"
//                     onClick={() => {
//                       setUrl(link.url);
//                       setError(null);
//                     }}
//                     className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-600/40
//                                text-slate-300 hover:text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10
//                                transition-colors cursor-pointer"
//                   >
//                     {link.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Back link */}
//         <div className="mt-10">
//           <a href="/" className="text-gray-400 hover:text-indigo-600 text-xs transition-colors">
//             &larr; Home
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useCallback } from "react";
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

// Collect ALL unique URLs from categories + quickLinks
function getAllUrls(): { name: string; url: string }[] {
  const seen = new Set<string>();
  const all: { name: string; url: string }[] = [];

  for (const cat of categories) {
    for (const link of cat.links) {
      if (!seen.has(link.url)) {
        seen.add(link.url);
        all.push(link);
      }
    }
  }
  for (const link of quickLinks) {
    if (!seen.has(link.url)) {
      seen.add(link.url);
      all.push(link);
    }
  }
  return all;
}

type BatchStatus = "idle" | "running" | "done" | "cancelled";
type ItemStatus = "pending" | "running" | "success" | "error";

interface BatchItem {
  name: string;
  url: string;
  status: ItemStatus;
  error?: string;
}

export default function FetchPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Batch state ───
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [batchStatus, setBatchStatus] = useState<BatchStatus>("idle");
  const [batchResults, setBatchResults] = useState<Record<string, unknown>>({});
  const cancelRef = useRef(false);

  // ─── Single scrape ───
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

  // ─── Batch: scrape one URL ───
  async function scrapeOne(targetUrl: string): Promise<unknown> {
    const res = await fetch("/api/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: targetUrl }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    return res.json();
  }

  // ─── Batch: Run All ───
  const handleRunAll = useCallback(async () => {
    const allUrls = getAllUrls();
    cancelRef.current = false;

    const items: BatchItem[] = allUrls.map((u) => ({
      name: u.name,
      url: u.url,
      status: "pending" as ItemStatus,
    }));

    setBatchItems(items);
    setBatchStatus("running");
    setBatchResults({});

    const results: Record<string, unknown> = {};

    for (let i = 0; i < items.length; i++) {
      if (cancelRef.current) {
        setBatchStatus("cancelled");
        // Mark remaining as pending
        setBatchItems((prev) =>
          prev.map((item, idx) =>
            idx >= i ? { ...item, status: "pending" } : item
          )
        );
        break;
      }

      // Mark current as running
      setBatchItems((prev) =>
        prev.map((item, idx) =>
          idx === i ? { ...item, status: "running" } : item
        )
      );

      setUrl(items[i].url); // Show current URL in the input

      try {
        const data = await scrapeOne(items[i].url);
        results[items[i].url] = data;
        setBatchResults({ ...results });

        setBatchItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "success" } : item
          )
        );
      } catch (e: unknown) {
        const errMsg = e instanceof Error ? e.message : "Failed";
        setBatchItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "error", error: errMsg } : item
          )
        );
      }

      // Small delay to avoid hammering the API
      if (i < items.length - 1) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    if (!cancelRef.current) {
      setBatchStatus("done");
    }

    // Store all results
    localStorage.setItem("scrape_batch_results", JSON.stringify(results));
  }, []);

  const handleCancel = () => {
    cancelRef.current = true;
  };

  const handleDownloadResults = () => {
    const blob = new Blob([JSON.stringify(batchResults, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `batch-scrape-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const completedCount = batchItems.filter((i) => i.status === "success").length;
  const errorCount = batchItems.filter((i) => i.status === "error").length;
  const totalCount = batchItems.length;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl py-20">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Doc Scraper</h1>
        <p className="text-gray-500 text-sm mb-8">
          Paste a documentation URL to extract its navigation structure.
        </p>

        {/* Input + Scrape Button */}
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
            disabled={loading || batchStatus === "running" || !url.trim()}
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

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* ─── RUN ALL BUTTON ─── */}
        <div className="flex gap-2 mb-4">
          {batchStatus !== "running" ? (
            <button
              type="button"
              onClick={handleRunAll}
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg
                         hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
              </svg>
              Run All ({getAllUrls().length} URLs)
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg
                         hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" />
              </svg>
              Cancel
            </button>
          )}

          {(batchStatus === "done" || batchStatus === "cancelled") && completedCount > 0 && (
            <button
              type="button"
              onClick={handleDownloadResults}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                         hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download JSON ({completedCount})
            </button>
          )}
        </div>

        {/* ─── BATCH PROGRESS ─── */}
        {batchItems.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 shadow-sm">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch Progress
              </span>
              <span className="text-xs text-gray-500">
                {completedCount + errorCount} / {totalCount}
                {errorCount > 0 && (
                  <span className="text-red-500 ml-1">({errorCount} failed)</span>
                )}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div
                className="h-2 rounded-full transition-all duration-300 bg-emerald-500"
                style={{ width: `${((completedCount + errorCount) / totalCount) * 100}%` }}
              />
            </div>

            {/* Item list */}
            <div className="max-h-64 overflow-y-auto space-y-1">
              {batchItems.map((item, idx) => (
                <div
                  key={item.url}
                  className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md transition-colors ${
                    item.status === "running"
                      ? "bg-indigo-50 border border-indigo-200"
                      : item.status === "success"
                      ? "bg-emerald-50"
                      : item.status === "error"
                      ? "bg-red-50"
                      : "bg-gray-50"
                  }`}
                >
                  {/* Status icon */}
                  <span className="w-5 flex-shrink-0 text-center">
                    {item.status === "pending" && (
                      <span className="text-gray-300">○</span>
                    )}
                    {item.status === "running" && (
                      <svg className="animate-spin w-3.5 h-3.5 text-indigo-500 inline" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {item.status === "success" && (
                      <span className="text-emerald-500">✓</span>
                    )}
                    {item.status === "error" && (
                      <span className="text-red-500">✗</span>
                    )}
                  </span>

                  {/* Index */}
                  <span className="text-gray-400 w-5 text-right flex-shrink-0">{idx + 1}.</span>

                  {/* Name + URL */}
                  <span className={`font-medium truncate ${
                    item.status === "running" ? "text-indigo-700" :
                    item.status === "success" ? "text-emerald-700" :
                    item.status === "error" ? "text-red-700" :
                    "text-gray-500"
                  }`}>
                    {item.name}
                  </span>
                  <span className="text-gray-400 truncate flex-1 text-right font-mono">
                    {item.url.replace(/^https?:\/\//, "").slice(0, 40)}
                  </span>

                  {/* Error message */}
                  {item.error && (
                    <span className="text-red-400 truncate max-w-[120px]" title={item.error}>
                      {item.error}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Done message */}
            {batchStatus === "done" && (
              <p className="text-xs text-emerald-600 font-medium mt-3 pt-3 border-t border-gray-100">
                ✓ Batch complete — {completedCount} succeeded, {errorCount} failed.
                Results saved to localStorage as &quot;scrape_batch_results&quot;.
              </p>
            )}
            {batchStatus === "cancelled" && (
              <p className="text-xs text-amber-600 font-medium mt-3 pt-3 border-t border-gray-100">
                ⚠ Batch cancelled — {completedCount} completed before cancellation.
              </p>
            )}
          </div>
        )}

        <div className="border-t border-gray-200 my-8" />

        {/* Quick links */}
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
              disabled={loading || batchStatus === "running"}
              className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 bg-white
                         hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50
                         disabled:opacity-40 transition-colors shadow-sm"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="grid gap-4 mt-8">
          {categories.map((cat) => (
            <div
              key={cat.type}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Type {cat.type}
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {cat.label}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{cat.desc}</p>

              <div className="flex flex-wrap gap-2">
                {cat.links.map((link) => (
                  <button
                    key={link.url}
                    type="button"
                    onClick={() => {
                      setUrl(link.url);
                      setError(null);
                    }}
                    disabled={batchStatus === "running"}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200
                               text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50
                               disabled:opacity-40 transition-colors cursor-pointer"
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
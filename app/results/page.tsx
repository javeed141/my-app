"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// ── Types ────────────────────────────────────────────────────────────────────

type NavType = "projects" | "tabs" | "simple" | "fallback";

interface PageItem {
  title: string;
  path: string;
  fullUrl: string;
  level: number;
  group: string;
}

interface TreeNode extends PageItem {
  children: TreeNode[];
}

interface Section {
  name: string;
  pages: PageItem[];
}

interface ScrapeResult {
  site: string;
  navType: NavType;
  tabs?: string[];
  sections: Section[];
}

// ── Colors ───────────────────────────────────────────────────────────────────

const GROUP_COLORS = [
  { border: "border-emerald-200", text: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  { border: "border-sky-200", text: "text-sky-700", bg: "bg-sky-50", dot: "bg-sky-500", badge: "bg-sky-100 text-sky-700" },
  { border: "border-amber-200", text: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700" },
  { border: "border-violet-200", text: "text-violet-700", bg: "bg-violet-50", dot: "bg-violet-500", badge: "bg-violet-100 text-violet-700" },
  { border: "border-rose-200", text: "text-rose-700", bg: "bg-rose-50", dot: "bg-rose-500", badge: "bg-rose-100 text-rose-700" },
  { border: "border-cyan-200", text: "text-cyan-700", bg: "bg-cyan-50", dot: "bg-cyan-500", badge: "bg-cyan-100 text-cyan-700" },
  { border: "border-orange-200", text: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500", badge: "bg-orange-100 text-orange-700" },
  { border: "border-teal-200", text: "text-teal-700", bg: "bg-teal-50", dot: "bg-teal-500", badge: "bg-teal-100 text-teal-700" },
];

function getGroupColor(index: number) {
  return GROUP_COLORS[index % GROUP_COLORS.length];
}

const SECTION_TAB_COLORS: Record<string, { active: string; inactive: string; count: string }> = {
  "Guides":        { active: "bg-emerald-100 text-emerald-700", inactive: "text-emerald-600 hover:bg-emerald-50", count: "text-emerald-400" },
  "API Reference": { active: "bg-sky-100 text-sky-700", inactive: "text-sky-600 hover:bg-sky-50", count: "text-sky-400" },
  "Changelog":     { active: "bg-amber-100 text-amber-700", inactive: "text-amber-600 hover:bg-amber-50", count: "text-amber-400" },
  "Recipes":       { active: "bg-violet-100 text-violet-700", inactive: "text-violet-600 hover:bg-violet-50", count: "text-violet-400" },
};

function getSectionTabColor(name: string) {
  return SECTION_TAB_COLORS[name] || { active: "bg-indigo-100 text-indigo-700", inactive: "text-gray-500 hover:text-gray-700 hover:bg-gray-100", count: "text-indigo-400" };
}

// ── Tree builder ─────────────────────────────────────────────────────────────

function buildTree(pages: PageItem[]): TreeNode[] {
  const roots: TreeNode[] = [];
  const stack: TreeNode[] = [];

  for (const page of pages) {
    const node: TreeNode = { ...page, children: [] };
    while (stack.length > 0 && stack[stack.length - 1].level >= page.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      roots.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  }

  return roots;
}

// ── Sidebar node ─────────────────────────────────────────────────────────────

function SidebarNode({
  node, selectedPath, onSelect, depth,
}: {
  node: TreeNode;
  selectedPath: string | null;
  onSelect: (p: PageItem) => void;
  depth: number;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedPath === node.path;

  return (
    <div>
      <div
        className={`flex items-center rounded-md transition-colors
          ${isSelected ? "bg-indigo-50" : "hover:bg-gray-100"}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <span className="w-[26px] shrink-0" />
        )}

        <button
          onClick={() => onSelect(node)}
          className={`flex-1 text-left py-2 pr-3 text-sm truncate transition-colors
            ${isSelected ? "text-indigo-700 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
        >
          {node.title}
        </button>

        {hasChildren && (
          <span className="mr-3 text-xs text-gray-400 shrink-0">{node.children.length}</span>
        )}
      </div>

      {hasChildren && open && (
        <div className="border-l-2 border-gray-200 ml-5">
          {node.children.map((child, i) => (
            <SidebarNode key={i} node={child} selectedPath={selectedPath} onSelect={onSelect} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sidebar group ────────────────────────────────────────────────────────────
//
//  FIX: _ungrouped items are ALWAYS visible (no toggle, always open).
//  Named groups start collapsed but have a toggle button.

function SidebarGroup({
  group, tree, selectedPath, onSelect, defaultOpen, colorIndex,
}: {
  group: string;
  tree: TreeNode[];
  selectedPath: string | null;
  onSelect: (p: PageItem) => void;
  defaultOpen: boolean;
  colorIndex: number;
}) {
  const isUngrouped = group === "_ungrouped";
  const [open, setOpen] = useState(isUngrouped ? true : defaultOpen);
  const color = getGroupColor(colorIndex);

  function countAll(nodes: TreeNode[]): number {
    return nodes.reduce((n, node) => n + 1 + countAll(node.children), 0);
  }

  return (
    <div className="mb-1">
      {!isUngrouped && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold
                     hover:bg-gray-100 rounded-md transition-colors"
        >
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${color.dot}`} />
          <span className={`truncate ${color.text}`}>{group}</span>
          <span className="text-gray-400 ml-auto shrink-0">{countAll(tree)}</span>
          <svg
            className={`w-3 h-3 shrink-0 transition-transform duration-150 text-gray-400 ${open ? "rotate-90" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* ALWAYS render for ungrouped, toggle for named groups */}
      {(isUngrouped || open) && (
        <div className={isUngrouped ? "" : "ml-2"}>
          {tree.map((node, i) => (
            <SidebarNode key={i} node={node} selectedPath={selectedPath} onSelect={onSelect} depth={0} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<ScrapeResult | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("scrape_result");
    if (!raw) { router.push("/fetch"); return; }
    setData(JSON.parse(raw) as ScrapeResult);
  }, [router]);

  const currentSection = data?.sections[activeSection];

  const groupedTree = useMemo(() => {
    if (!currentSection) return new Map<string, TreeNode[]>();
    const lower = search.toLowerCase();
    const filtered = lower
      ? currentSection.pages.filter(
          (p) => p.title.toLowerCase().includes(lower) || p.path.toLowerCase().includes(lower)
        )
      : currentSection.pages;

    const byGroup = new Map<string, PageItem[]>();
    for (const p of filtered) {
      const key = p.group || "_ungrouped";
      if (!byGroup.has(key)) byGroup.set(key, []);
      byGroup.get(key)!.push(p);
    }

    const result = new Map<string, TreeNode[]>();
    for (const [key, pages] of byGroup) {
      result.set(key, lower ? pages.map((p) => ({ ...p, children: [] })) : buildTree(pages));
    }
    return result;
  }, [currentSection, search]);

  const totalPages = data?.sections.reduce((s, x) => s + x.pages.length, 0) ?? 0;

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

      {/* ── Top bar ── */}
      <header className="min-h-[56px] border-b border-gray-200 bg-white flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm flex-wrap py-2">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          title="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-px h-6 bg-gray-200" />

        <span className="text-base font-bold text-gray-900">{data.site}</span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">{data.navType}</span>

        {/* Detected tabs badges */}
        {data.tabs && data.tabs.length > 0 && (
          <div className="flex items-center gap-1">
            {data.tabs.map((t) => {
              const hasSection = data.sections.some(s => s.name === t);
              return (
                <span
                  key={t}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    hasSection ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                  }`}
                  title={hasSection ? `${t}: scraped` : `${t}: no pages found`}
                >
                  {t}
                </span>
              );
            })}
          </div>
        )}

        {/* Section tabs */}
        <div className="flex gap-1 ml-4">
          {data.sections.map((s, i) => {
            const color = getSectionTabColor(s.name);
            return (
              <button
                key={i}
                onClick={() => { setActiveSection(i); setSelectedPage(null); setSearch(""); }}
                className={`px-3.5 py-1.5 text-sm font-medium transition-colors rounded-lg ${
                  i === activeSection ? color.active : color.inactive
                }`}
              >
                {s.name}
                <span className={`ml-1.5 ${i === activeSection ? color.count : "text-gray-400"}`}>{s.pages.length}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-xs text-gray-400 hidden md:block">{totalPages} pages total</span>
          <a
            href="/fetch"
            className="text-sm px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold shadow-sm"
          >
            + New
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar (always shown) ── */}
        {sidebarOpen && (
          <aside className="w-72 shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
            <div className="p-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter pages..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm
                           text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500
                           focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div className="px-4 py-1.5 flex items-center justify-between text-xs">
              <span className="text-gray-400">{currentSection?.pages.length ?? 0} pages</span>
              {search && (
                <span className="text-amber-600 font-medium">
                  {[...groupedTree.values()].flat().length} matched
                </span>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto px-2 pb-4">
              {groupedTree.size === 0 && (
                <p className="text-center text-gray-400 text-sm mt-12">No results</p>
              )}
              {[...groupedTree.entries()].map(([group, tree], idx) => (
                <SidebarGroup
                  key={group}
                  group={group}
                  tree={tree}
                  selectedPath={selectedPage?.path ?? null}
                  onSelect={setSelectedPage}
                  defaultOpen={false}
                  colorIndex={idx}
                />
              ))}
            </nav>
          </aside>
        )}

        {/* ── Main ── */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {selectedPage ? (
            <PageDetail page={selectedPage} onBack={() => setSelectedPage(null)} />
          ) : (
            <SectionOverview
              section={currentSection!}
              groupedTree={groupedTree}
              onSelect={setSelectedPage}
              search={search}
              onSearchChange={setSearch}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ── Section overview ─────────────────────────────────────────────────────────

function SectionOverview({
  section, groupedTree, onSelect, search, onSearchChange,
}: {
  section: Section;
  groupedTree: Map<string, TreeNode[]>;
  onSelect: (p: PageItem) => void;
  search: string;
  onSearchChange: (s: string) => void;
}) {
  return (
    <div>
      <div className="mb-6 flex items-baseline gap-4">
        <h2 className="text-xl font-bold text-gray-900">{section?.name}</h2>
        <span className="text-sm text-gray-400">{section?.pages.length} pages</span>
      </div>

      <div className="grid gap-5">
        {[...groupedTree.entries()].map(([group, tree], idx) => {
          const color = getGroupColor(idx);
          return (
            <div key={group}>
              {group !== "_ungrouped" && (
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${color.dot}`} />
                  <h3 className={`text-sm font-bold ${color.text}`}>{group}</h3>
                  <span className="flex-1 h-px bg-gray-200" />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color.badge}`}>{tree.length}</span>
                </div>
              )}
              <div className={`border rounded-xl overflow-hidden shadow-sm ${color.border} ${color.bg}`}>
                {tree.map((node, i) => (
                  <OverviewNode key={i} node={node} depth={0} onSelect={onSelect} isLast={i === tree.length - 1} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Overview node ────────────────────────────────────────────────────────────

function OverviewNode({
  node, depth, onSelect, isLast,
}: {
  node: TreeNode;
  depth: number;
  onSelect: (p: PageItem) => void;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren ? setOpen((v) => !v) : onSelect(node)}
        className={`w-full text-left flex items-center gap-3 py-2.5 px-3
                   hover:bg-white/80 transition-colors group
                   ${!isLast ? "border-b border-gray-200/60" : ""}`}
        style={{ paddingLeft: `${12 + depth * 20}px` }}
      >
        {hasChildren ? (
          <svg
            className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <span className="w-3.5 shrink-0 text-center text-gray-300 text-lg">&middot;</span>
        )}

        <span className={`text-sm truncate transition-colors ${
          hasChildren
            ? "text-gray-800 font-semibold group-hover:text-gray-900"
            : "text-gray-600 group-hover:text-gray-900"
        }`}>
          {node.title}
        </span>

        {hasChildren && (
          <span className="text-xs text-gray-400 shrink-0 bg-gray-100 px-1.5 py-0.5 rounded font-medium">{node.children.length}</span>
        )}
      </button>

      {hasChildren && open && (
        <div>
          {node.children.map((child, i) => (
            <OverviewNode key={i} node={child} depth={depth + 1} onSelect={onSelect} isLast={i === node.children.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page detail ──────────────────────────────────────────────────────────────

function PageDetail({ page, onBack }: { page: PageItem; onBack: () => void }) {
  return (
    <div className="max-w-2xl">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-gray-700 text-sm mb-6 transition-colors flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">{page.title}</h2>

      <div className="flex gap-2 mb-6">
        {page.group && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
            {page.group}
          </span>
        )}
        {page.level > 0 && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 font-semibold">
            Depth {page.level}
          </span>
        )}
      </div>

      <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 mb-6 bg-white shadow-sm">
        <div className="flex gap-4 px-5 py-3.5">
          <span className="text-xs text-gray-400 w-12 shrink-0 uppercase font-bold tracking-wide pt-0.5">Path</span>
          <span className="text-gray-700 font-mono text-sm break-all">{page.path}</span>
        </div>
        <div className="flex gap-4 px-5 py-3.5">
          <span className="text-xs text-gray-400 w-12 shrink-0 uppercase font-bold tracking-wide pt-0.5">URL</span>
          <a
            href={page.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm break-all transition-colors font-mono"
          >
            {page.fullUrl}
          </a>
        </div>
      </div>

      <a
        href={page.fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white
                   text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
      >
        Open Page
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
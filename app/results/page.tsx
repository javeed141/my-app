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
  sections: Section[];
}

// ── Nav type metadata ────────────────────────────────────────────────────────

const NAV_TYPE_META: Record<NavType, { label: string; desc: string; color: string }> = {
  projects: {
    label: "Multi-Project",
    desc: "Multiple products detected via /{project}/docs paths",
    color: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  tabs: {
    label: "Tab Navigation",
    desc: "Standard tabs: Guides, API Reference, Changelog, Recipes",
    color: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  simple: {
    label: "Single Section",
    desc: "Single documentation URL with sidebar navigation",
    color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  fallback: {
    label: "Link Extraction",
    desc: "No sidebar found — extracted all /docs and /reference links",
    color: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
};

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

// ── Recursive sidebar node ───────────────────────────────────────────────────

function SidebarNode({
  node,
  selectedPath,
  onSelect,
  depth,
}: {
  node: TreeNode;
  selectedPath: string | null;
  onSelect: (p: PageItem) => void;
  depth: number;
}) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedPath === node.path;

  return (
    <div>
      <div
        className={`flex items-center rounded-lg transition-colors group
          ${isSelected ? "bg-violet-600/20" : "hover:bg-white/5"}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {/* Toggle chevron — only when there are children */}
        {hasChildren ? (
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors shrink-0"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <svg
              className={`w-3 h-3 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          /* Indent spacer for leaf nodes */
          <span className="w-5 shrink-0" />
        )}

        {/* Page title — always navigates */}
        <button
          onClick={() => onSelect(node)}
          className={`flex-1 text-left py-1.5 pr-3 text-sm truncate transition-colors
            ${isSelected ? "text-violet-300 font-medium" : "text-slate-400 hover:text-white"}`}
        >
          {node.title}
        </button>

        {/* Children count badge */}
        {hasChildren && (
          <span className="mr-2 text-[10px] text-slate-600 shrink-0">{node.children.length}</span>
        )}
      </div>

      {/* Children */}
      {hasChildren && open && (
        <div className="border-l border-white/5 ml-4">
          {node.children.map((child, i) => (
            <SidebarNode
              key={i}
              node={child}
              selectedPath={selectedPath}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Group block in sidebar ────────────────────────────────────────────────────

function SidebarGroup({
  groupKey,
  group,
  tree,
  selectedPath,
  onSelect,
  defaultOpen,
}: {
  groupKey: string;
  group: string;
  tree: TreeNode[];
  selectedPath: string | null;
  onSelect: (p: PageItem) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isUngrouped = group === "_ungrouped";
  const totalCount = countAll(tree);

  function countAll(nodes: TreeNode[]): number {
    return nodes.reduce((n, node) => n + 1 + countAll(node.children), 0);
  }

  return (
    <div className="mb-1" key={groupKey}>
      {!isUngrouped && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold
                     text-slate-500 uppercase tracking-wider hover:text-slate-300
                     transition-colors rounded-lg hover:bg-white/5"
        >
          <div className="flex items-center gap-2 truncate">
            <svg
              className={`w-3 h-3 shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="truncate">{group}</span>
          </div>
          <span className="text-slate-600 ml-2 shrink-0">{totalCount}</span>
        </button>
      )}

      {open && (
        <div className={isUngrouped ? "" : "ml-1"}>
          {tree.map((node, i) => (
            <SidebarNode
              key={i}
              node={node}
              selectedPath={selectedPath}
              onSelect={onSelect}
              depth={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

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

  // Group pages, applying search filter
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
      // Only build full tree when not searching (flat when searching)
      result.set(key, lower ? pages.map((p) => ({ ...p, children: [] })) : buildTree(pages));
    }
    return result;
  }, [currentSection, search]);

  const totalPages = data?.sections.reduce((s, x) => s + x.pages.length, 0) ?? 0;
  const navMeta = data ? NAV_TYPE_META[data.navType] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <svg className="animate-spin w-8 h-8 mx-auto mb-3 text-violet-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading results…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* ── Top bar ── */}
      <header className="h-14 border-b border-white/10 bg-slate-900/90 backdrop-blur flex items-center px-4 gap-3 sticky top-0 z-20">
        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="w-px h-5 bg-white/10" />

        {/* Site */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-white text-sm">{data.site}</span>
        </div>

        {/* Nav type badge */}
        {navMeta && (
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1
                        rounded-full border ${navMeta.color}`}
            title={navMeta.desc}
          >
            <NavTypeIcon type={data.navType} />
            {navMeta.label}
          </span>
        )}

        <div className="w-px h-5 bg-white/10 hidden sm:block" />

        {/* Section tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {data.sections.map((s, i) => (
            <button
              key={i}
              onClick={() => { setActiveSection(i); setSelectedPage(null); setSearch(""); }}
              className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                i === activeSection
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {s.name}
              <span className="ml-1.5 text-xs opacity-60">{s.pages.length}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 text-sm shrink-0">
          <span className="text-slate-500 hidden md:block">{totalPages} pages total</span>
          <a
            href="/fetch"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10
                       text-slate-300 hover:text-white text-sm transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New scrape
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <aside className="w-72 shrink-0 border-r border-white/10 bg-slate-950/50 flex flex-col overflow-hidden">
            {/* Nav type info strip */}
            {navMeta && (
              <div className={`px-4 py-2.5 border-b border-white/10 flex items-center gap-2 ${navMeta.color} bg-transparent`}>
                <NavTypeIcon type={data.navType} />
                <div className="min-w-0">
                  <div className="text-xs font-semibold">{navMeta.label}</div>
                  <div className="text-[10px] opacity-70 truncate">{navMeta.desc}</div>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="p-3 border-b border-white/10">
              <div className="flex items-center gap-2 bg-slate-800/80 rounded-lg px-3 py-2">
                <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search pages…"
                  className="bg-transparent text-sm text-white placeholder:text-slate-500 outline-none w-full"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-slate-500 hover:text-white transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Count */}
            <div className="px-4 py-1.5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{currentSection?.pages.length ?? 0} pages</span>
              {search && (
                <span className="text-[11px] text-violet-400">
                  {[...groupedTree.values()].flat().length} matches
                </span>
              )}
            </div>

            {/* Tree nav */}
            <nav className="flex-1 overflow-y-auto px-2 pb-6 pt-1">
              {groupedTree.size === 0 && (
                <p className="text-center text-slate-500 text-sm mt-10">No results found</p>
              )}
              {[...groupedTree.entries()].map(([group, tree]) => (
                <SidebarGroup
                  key={group}
                  groupKey={`${currentSection?.name}::${group}`}
                  group={group}
                  tree={tree}
                  selectedPath={selectedPage?.path ?? null}
                  onSelect={setSelectedPage}
                  defaultOpen={true}
                />
              ))}
            </nav>
          </aside>
        )}

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto p-8">
          {selectedPage ? (
            <PageDetail page={selectedPage} onBack={() => setSelectedPage(null)} />
          ) : (
            <SectionOverview
              section={currentSection!}
              groupedTree={groupedTree}
              navType={data.navType}
              navMeta={navMeta!}
              onSelect={setSelectedPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ── Nav type icon ─────────────────────────────────────────────────────────────

function NavTypeIcon({ type }: { type: NavType }) {
  if (type === "projects") return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
  if (type === "tabs") return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
  );
  if (type === "simple") return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  );
}

// ── Section overview ──────────────────────────────────────────────────────────

function SectionOverview({
  section,
  groupedTree,
  navType,
  navMeta,
  onSelect,
}: {
  section: Section;
  groupedTree: Map<string, TreeNode[]>;
  navType: NavType;
  navMeta: { label: string; desc: string; color: string };
  onSelect: (p: PageItem) => void;
}) {
  function flattenTree(nodes: TreeNode[]): PageItem[] {
    return nodes.flatMap((n) => [n, ...flattenTree(n.children)]);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-white">{section.name}</h2>
          <p className="text-slate-500 mt-1 text-sm">{section.pages.length} pages extracted</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm ${navMeta?.color}`}>
          <NavTypeIcon type={navType} />
          <div>
            <div className="font-semibold text-xs">{navMeta.label}</div>
            <div className="text-xs opacity-70">{navMeta.desc}</div>
          </div>
        </div>
      </div>

      {/* Groups → card grid */}
      {[...groupedTree.entries()].map(([group, tree]) => {
        const pages = flattenTree(tree);
        return (
          <div key={group} className="mb-10">
            {group !== "_ungrouped" && (
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-violet-400">{group}</h3>
                <span className="flex-1 h-px bg-violet-500/20" />
                <span className="text-xs text-slate-600">{pages.length}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(p)}
                  className="text-left bg-slate-800/50 hover:bg-slate-800 border border-white/10
                             hover:border-violet-500/40 rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                      {p.title}
                    </span>
                    <svg className="w-4 h-4 text-slate-600 group-hover:text-violet-400 shrink-0 mt-0.5 transition-colors"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 truncate font-mono">{p.path}</p>
                  {p.level > 0 && (
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-400">
                      {"·".repeat(p.level)} depth {p.level}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Page detail ───────────────────────────────────────────────────────────────

function PageDetail({ page, onBack }: { page: PageItem; onBack: () => void }) {
  return (
    <div className="max-w-2xl">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to overview
      </button>

      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{page.title}</h2>
        <div className="flex flex-wrap gap-2 mb-5">
          {page.group && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30">
              {page.group}
            </span>
          )}
          {page.level > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700 text-slate-400">
              Depth {page.level}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <Row label="Path" value={page.path} />
          <Row label="Full URL" value={page.fullUrl} isLink />
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <a
            href={page.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500
                       text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Open page
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs text-slate-500 w-20 shrink-0 pt-0.5">{label}</span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-violet-400 hover:text-violet-300 break-all transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm text-slate-300 break-all font-mono">{value}</span>
      )}
    </div>
  );
}

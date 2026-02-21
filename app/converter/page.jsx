"use client";
import { useState, useCallback, useRef, useMemo } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

// Source (ReadMe.io)
// { site, navType, tabs, sections: [{ name, pages: [{ title, path, fullUrl, level, group }] }] }

// Target (Documentation.AI)
// { name, navigation: { products|versions|tabs|groups|pages } }

// ─── Conversion Engine ──────────────────────────────────────────────────────

function cleanSiteName(site) {
  let name = site
    .replace(/\.readme\.io$/i, "")
    .replace(/\.com$/i, "")
    .replace(/\.co$/i, "")
    .replace(/\.dev$/i, "");
  name = name.replace(/^(docs?[_.]|dev[_.])/i, "");
  return name
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function cleanPath(path) {
  let p = path.replace(/^\/+/, "");
  p = p.replace(/^main\//, "");
  return p;
}

const METHOD_SUFFIXES = [
  ["delete", "DELETE"],
  ["patch", "PATCH"],
  ["options", "OPTIONS"],
  ["post", "POST"],
  ["head", "HEAD"],
  ["put", "PUT"],
  ["get", "GET"],
  ["del", "DELETE"],
];

function guessHttpMethod(title) {
  const lower = title.toLowerCase().trim();
  for (const [suffix, method] of METHOD_SUFFIXES) {
    if (lower.endsWith(suffix) && lower.length > suffix.length) {
      return method;
    }
  }
  return null;
}

function cleanMethodFromTitle(title) {
  const lower = title.toLowerCase().trim();
  for (const [suffix] of METHOD_SUFFIXES) {
    if (lower.endsWith(suffix) && lower.length > suffix.length) {
      const cleaned = title.slice(0, -suffix.length).trim();
      if (cleaned) return cleaned;
    }
  }
  return title;
}

function buildPage(srcPage) {
  const page = { title: srcPage.title.trim(), path: cleanPath(srcPage.path || "") };
  const method = guessHttpMethod(srcPage.title);
  if (method) {
    page.method = method;
    page.title = cleanMethodFromTitle(srcPage.title);
  }
  return page;
}

function buildNestedPages(pagesList) {
  const result = [];
  const stack = []; // [level, containerArray]

  for (const srcPage of pagesList) {
    const level = srcPage.level ?? 1;
    const docPage = buildPage(srcPage);

    if (level <= 1) {
      result.push(docPage);
      stack.length = 0;
      stack.push([level, result]);
    } else {
      while (stack.length > 1 && stack[stack.length - 1][0] >= level) stack.pop();
      const parentContainer = stack.length > 0 ? stack[stack.length - 1][1] : result;

      if (parentContainer.length > 0) {
        const parent = parentContainer[parentContainer.length - 1];
        if (!parent.pages && !parent.group) {
          const nestedGroup = { group: parent.title, pages: [docPage] };
          parentContainer[parentContainer.length - 1] = nestedGroup;
          stack.push([level, nestedGroup.pages]);
        } else if (parent.pages) {
          parent.pages.push(docPage);
          stack.push([level, parent.pages]);
        } else {
          result.push(docPage);
        }
      } else {
        result.push(docPage);
      }
    }
  }
  return result;
}

function groupPagesByGroupField(pages) {
  const order = [];
  const map = {};

  for (const page of pages) {
    const groupName = (page.group || "").trim() || "General";
    if (!map[groupName]) {
      map[groupName] = [];
      order.push(groupName);
    }
    map[groupName].push(page);
  }

  return order.map((name) => ({
    group: name,
    pages: buildNestedPages(map[name]),
  }));
}

function convertTabs(source) {
  const tabs = source.sections.map((section) => ({
    tab: section.name,
    groups: groupPagesByGroupField(section.pages),
  }));
  if (tabs.length === 1) return { groups: tabs[0].groups };
  return { tabs };
}

function convertSimple(source) {
  const allPages = source.sections.flatMap((s) => s.pages);
  return { groups: groupPagesByGroupField(allPages) };
}

function convertProjects(source) {
  const productsMap = new Map();

  for (const section of source.sections) {
    const parts = section.name.split("/", 2);
    const prodName = (parts[0] || section.name).trim().replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const tabName = (parts[1] || "Docs").trim();

    if (!productsMap.has(prodName)) productsMap.set(prodName, new Map());
    const tabsMap = productsMap.get(prodName);
    if (!tabsMap.has(tabName)) tabsMap.set(tabName, []);
    tabsMap.get(tabName).push(...groupPagesByGroupField(section.pages));
  }

  const products = [];
  for (const [prodName, tabsMap] of productsMap) {
    if (tabsMap.size === 1) {
      const groups = [...tabsMap.values()][0];
      products.push({ product: prodName, groups });
    } else {
      const tabs = [...tabsMap].map(([tabName, groups]) => ({ tab: tabName, groups }));
      products.push({ product: prodName, tabs });
    }
  }
  return { products };
}

function convert(source) {
  const name = cleanSiteName(source.site || "Unknown");
  let navigation;

  switch (source.navType) {
    case "projects":
      navigation = convertProjects(source);
      break;
    case "tabs":
      navigation = convertTabs(source);
      break;
    default:
      navigation = convertSimple(source);
  }

  return { name, navigation };
}

function countPages(obj) {
  if (!obj || typeof obj !== "object") return 0;
  let count = 0;
  if (Array.isArray(obj)) {
    for (const item of obj) count += countPages(item);
  } else {
    if (obj.title && obj.path) count = 1;
    for (const val of Object.values(obj)) {
      if (typeof val === "object") count += countPages(val);
    }
  }
  return count;
}

// ─── Tree Visualization ────────────────────────────────────────────────────

function TreeNode({ node, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 2);

  if (node.title && node.path) {
    return (
      <div className="tree-page" style={{ paddingLeft: depth * 20 }}>
        <span className="tree-icon">📄</span>
        {node.method && <span className={`method-badge method-${node.method.toLowerCase()}`}>{node.method}</span>}
        <span className="tree-title">{node.title}</span>
        <span className="tree-path">{node.path}</span>
      </div>
    );
  }

  const label = node.product || node.tab || node.group || node.dropdown || node.version || node.language;
  const type = node.product ? "product" : node.tab ? "tab" : node.group ? "group" : "item";
  const children = node.products || node.tabs || node.groups || node.pages || node.versions || node.languages || node.dropdowns || [];

  if (!label && !children.length) return null;

  return (
    <div style={{ paddingLeft: depth * 20 }}>
      {label && (
        <div className={`tree-branch tree-${type}`} onClick={() => setExpanded(!expanded)}>
          <span className="tree-toggle">{children.length > 0 ? (expanded ? "▾" : "▸") : " "}</span>
          <span className="tree-type-badge">{type}</span>
          <span className="tree-label">{label}</span>
          <span className="tree-count">{countPages(node)}</span>
        </div>
      )}
      {expanded && children.map((child, i) => <TreeNode key={i} node={child} depth={depth + 1} />)}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function ReadmeToDocAIConverter() {
  const [sourceJson, setSourceJson] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [view, setView] = useState("tree"); // tree | json
  const [dragOver, setDragOver] = useState(false);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);

  const handleConvert = useCallback(
    (jsonStr) => {
      try {
        const parsed = JSON.parse(jsonStr || sourceJson);
        if (!parsed.site || !parsed.sections) {
          throw new Error('Invalid ReadMe.io JSON — missing "site" or "sections" fields');
        }
        const output = convert(parsed);
        const stats = {
          site: parsed.site,
          navType: parsed.navType,
          sections: parsed.sections.length,
          sourcePagesTotal: parsed.sections.reduce((a, s) => a + s.pages.length, 0),
          outputPages: countPages(output.navigation),
          navShape: Object.keys(output.navigation)[0],
        };
        setResult({ output, stats });
        setError(null);
        setHistory((prev) => [{ name: output.name, stats, ts: Date.now() }, ...prev.slice(0, 9)]);
      } catch (e) {
        setError(e.message);
        setResult(null);
      }
    },
    [sourceJson]
  );

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setSourceJson(text);
        handleConvert(text);
      };
      reader.readAsText(file);
    },
    [handleConvert]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleDownload = useCallback(() => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result.output, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.output.name.toLowerCase().replace(/\s+/g, "-")}_docs.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  const handleCopy = useCallback(() => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result.output, null, 2));
  }, [result]);

  const outputJson = useMemo(() => (result ? JSON.stringify(result.output, null, 2) : ""), [result]);

  return (
    <div style={styles.root}>
      <style>{cssText}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoBlock}>
            <div style={styles.logoIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M9 15l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 style={styles.title}>Schema Converter</h1>
              <p style={styles.subtitle}>ReadMe.io → Documentation.AI</p>
            </div>
          </div>
          {history.length > 0 && (
            <div style={styles.historyBadge}>
              {history.length} converted
            </div>
          )}
        </div>
      </header>

      <main style={styles.main}>
        {/* Upload / Input Section */}
        <section style={styles.inputSection}>
          <div
            style={{
              ...styles.dropzone,
              ...(dragOver ? styles.dropzoneActive : {}),
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files?.[0])} />
            <div style={styles.dropzoneIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p style={styles.dropzoneTitle}>{fileName || "Drop ReadMe.io JSON here"}</p>
            <p style={styles.dropzoneHint}>or click to browse • .json files</p>
          </div>

          <div style={styles.divider}>
            <span style={styles.dividerText}>or paste JSON below</span>
          </div>

          <textarea
            style={styles.textarea}
            value={sourceJson}
            onChange={(e) => setSourceJson(e.target.value)}
            placeholder={`{\n  "site": "example.readme.io",\n  "navType": "tabs",\n  "tabs": ["Guides", "API Reference"],\n  "sections": [ ... ]\n}`}
            spellCheck={false}
          />

          <button style={styles.convertBtn} onClick={() => handleConvert()} disabled={!sourceJson.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
            Convert to Documentation.AI
          </button>
        </section>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <section style={styles.resultSection}>
            {/* Stats Bar */}
            <div style={styles.statsBar}>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Site</span>
                <span style={styles.statValue}>{result.stats.site}</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Source Type</span>
                <span style={styles.statValue}>{result.stats.navType}</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Sections</span>
                <span style={styles.statValue}>{result.stats.sections}</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Pages</span>
                <span style={styles.statValue}>{result.stats.outputPages}</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Navigation</span>
                <span style={styles.statValue}>{result.stats.navShape}</span>
              </div>
            </div>

            {/* View Toggle + Actions */}
            <div style={styles.toolbar}>
              <div style={styles.viewToggle}>
                <button style={view === "tree" ? styles.viewBtnActive : styles.viewBtn} onClick={() => setView("tree")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Tree
                </button>
                <button style={view === "json" ? styles.viewBtnActive : styles.viewBtn} onClick={() => setView("json")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  JSON
                </button>
              </div>
              <div style={styles.actionBtns}>
                <button style={styles.actionBtn} onClick={handleCopy} title="Copy JSON">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </button>
                <button style={styles.downloadBtn} onClick={handleDownload} title="Download JSON">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            </div>

            {/* Output Content */}
            <div style={styles.outputArea}>
              {view === "tree" ? (
                <div style={styles.treeContainer}>
                  <div className="tree-branch tree-root">
                    <span className="tree-type-badge" style={{ background: "#d946ef" }}>site</span>
                    <span className="tree-label" style={{ fontWeight: 700, fontSize: 15 }}>{result.output.name}</span>
                  </div>
                  <TreeNode node={result.output.navigation} depth={0} />
                </div>
              ) : (
                <pre style={styles.jsonOutput}>{outputJson}</pre>
              )}
            </div>
          </section>
        )}

        {/* Conversion History */}
        {history.length > 1 && (
          <section style={styles.historySection}>
            <h3 style={styles.historyTitle}>Conversion History</h3>
            <div style={styles.historyList}>
              {history.map((item, i) => (
                <div key={item.ts} style={styles.historyItem}>
                  <span style={styles.historyName}>{item.name}</span>
                  <span style={styles.historyMeta}>{item.stats.navType} • {item.stats.outputPages} pages</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const cssText = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.tree-page {
  display: flex; align-items: center; gap: 6px; padding: 4px 8px;
  font-size: 13px; color: #4b5563; border-radius: 6px; transition: background 0.15s;
}
.tree-page:hover { background: rgba(0,0,0,0.03); }
.tree-icon { font-size: 12px; opacity: 0.5; flex-shrink: 0; }
.tree-title { color: #1f2937; font-weight: 500; }
.tree-path { color: #9ca3af; font-size: 11px; font-family: 'JetBrains Mono', monospace; margin-left: auto; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.method-badge {
  font-size: 9px; font-weight: 700; font-family: 'JetBrains Mono', monospace;
  padding: 1px 5px; border-radius: 3px; flex-shrink: 0; letter-spacing: 0.5px;
}
.method-get { background: #d1fae5; color: #059669; }
.method-post { background: #dbeafe; color: #2563eb; }
.method-put { background: #ffedd5; color: #ea580c; }
.method-patch { background: #ede9fe; color: #7c3aed; }
.method-delete { background: #fee2e2; color: #dc2626; }
.method-head { background: #f3f4f6; color: #6b7280; }
.method-options { background: #f3f4f6; color: #6b7280; }

.tree-branch {
  display: flex; align-items: center; gap: 6px; padding: 5px 8px;
  font-size: 13px; color: #1f2937; border-radius: 6px; cursor: pointer; transition: background 0.15s;
  user-select: none;
}
.tree-branch:hover { background: rgba(0,0,0,0.03); }
.tree-toggle { width: 14px; text-align: center; color: #9ca3af; font-size: 11px; flex-shrink: 0; }
.tree-type-badge {
  font-size: 9px; font-weight: 700; font-family: 'JetBrains Mono', monospace; text-transform: uppercase;
  padding: 1px 6px; border-radius: 3px; flex-shrink: 0; letter-spacing: 0.5px;
}
.tree-product .tree-type-badge { background: #ede9fe; color: #7c3aed; }
.tree-tab .tree-type-badge { background: #e0f2fe; color: #0891b2; }
.tree-group .tree-type-badge { background: #fef9c3; color: #a16207; }
.tree-item .tree-type-badge { background: #f3f4f6; color: #6b7280; }
.tree-label { font-weight: 600; }
.tree-count { margin-left: auto; font-size: 11px; color: #9ca3af; font-family: 'JetBrains Mono', monospace; }
`;

const styles = {
  root: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    background: "#ffffff",
    minHeight: "100vh",
    color: "#1f2937",
  },
  header: {
    borderBottom: "1px solid #e5e7eb",
    background: "#ffffff",
    padding: "20px 24px",
  },
  headerInner: {
    maxWidth: 900,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBlock: { display: "flex", alignItems: "center", gap: 14 },
  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
  },
  title: { fontSize: 18, fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "-0.3px" },
  subtitle: { fontSize: 13, color: "#6b7280", margin: 0, marginTop: 1 },
  historyBadge: {
    fontSize: 12,
    fontWeight: 600,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#6b7280",
    padding: "4px 12px",
    borderRadius: 20,
  },
  main: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "28px 24px 60px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputSection: { display: "flex", flexDirection: "column", gap: 12 },
  dropzone: {
    border: "2px dashed #d1d5db",
    borderRadius: 12,
    padding: "32px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    background: "#f9fafb",
  },
  dropzoneActive: { borderColor: "#6366f1", background: "#eef2ff" },
  dropzoneIcon: { color: "#9ca3af", marginBottom: 10 },
  dropzoneTitle: { fontSize: 14, fontWeight: 600, color: "#374151", margin: 0 },
  dropzoneHint: { fontSize: 12, color: "#9ca3af", margin: 0, marginTop: 4 },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    color: "#d1d5db",
    fontSize: 12,
  },
  dividerText: {
    flexShrink: 0,
    color: "#9ca3af",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1,
    width: "100%",
    textAlign: "center",
    background: "linear-gradient(90deg, transparent, #ffffff 35%, #ffffff 65%, transparent)",
    position: "relative",
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    maxHeight: 300,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    color: "#374151",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    padding: "14px 16px",
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.2s",
    lineHeight: 1.6,
  },
  convertBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    padding: "12px 20px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #7c3aed)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 12px rgba(99,102,241,0.25)",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    borderRadius: 10,
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    fontSize: 13,
  },
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  statsBar: {
    display: "flex",
    gap: 2,
    background: "#f9fafb",
    borderRadius: 10,
    padding: 4,
    overflow: "auto",
    border: "1px solid #e5e7eb",
  },
  stat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: 8,
    minWidth: 100,
  },
  statLabel: { fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, color: "#9ca3af" },
  statValue: { fontSize: 14, fontWeight: 700, color: "#111827", marginTop: 2 },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  viewToggle: {
    display: "flex",
    background: "#f3f4f6",
    borderRadius: 8,
    padding: 3,
    gap: 2,
  },
  viewBtn: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 14px",
    border: "none",
    borderRadius: 6,
    background: "transparent",
    color: "#6b7280",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  viewBtnActive: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 14px",
    border: "none",
    borderRadius: 6,
    background: "#ffffff",
    color: "#111827",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  actionBtns: { display: "flex", gap: 6 },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    background: "#ffffff",
    color: "#4b5563",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 14px",
    border: "1px solid #c7d2fe",
    borderRadius: 8,
    background: "#eef2ff",
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  outputArea: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "auto",
    maxHeight: 520,
    minHeight: 200,
  },
  treeContainer: { padding: "12px 8px" },
  jsonOutput: {
    padding: "16px 20px",
    margin: 0,
    fontSize: 12,
    lineHeight: 1.6,
    color: "#4f46e5",
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: "pre",
    overflow: "auto",
  },
  historySection: {
    marginTop: 8,
    padding: "16px 20px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
  },
  historyTitle: { fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 },
  historyList: { display: "flex", flexDirection: "column", gap: 6 },
  historyItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 10px",
    borderRadius: 6,
    background: "#ffffff",
    border: "1px solid #f3f4f6",
    fontSize: 13,
  },
  historyName: { fontWeight: 600, color: "#374151" },
  historyMeta: { fontSize: 11, color: "#9ca3af", fontFamily: "'JetBrains Mono', monospace" },
};
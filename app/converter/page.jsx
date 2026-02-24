"use client";
import { useState, useCallback, useRef, useMemo } from "react";
import { cssText, styles } from "./styles";
import { convert, countPages } from "./convert.js";

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

  // ─── Batch state ───
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchResult, setBatchResult] = useState(null);
  const [batchError, setBatchError] = useState(null);

  const handleBatchConvert = useCallback(async () => {
    setBatchRunning(true);
    setBatchError(null);
    setBatchResult(null);
    try {
      const res = await fetch("/api/batch-convert", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setBatchResult(data);
    } catch (e) {
      setBatchError(e instanceof Error ? e.message : "Batch conversion failed");
    } finally {
      setBatchRunning(false);
    }
  }, []);

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
        {/* ─── Batch Convert All docs/ ─── */}
        <section style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 24,
          border: "1px solid rgba(139,92,246,0.3)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: batchResult ? 16 : 0 }}>
            <div>
              <h3 style={{ color: "#e0e7ff", fontSize: 15, fontWeight: 600, margin: 0 }}>
                Batch Convert All
              </h3>
              <p style={{ color: "#a5b4fc", fontSize: 12, margin: "4px 0 0" }}>
                Reads all JSON files from <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: 4 }}>docs/</code> → converts → saves to <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: 4 }}>documentation/</code>
              </p>
            </div>
            <button
              onClick={handleBatchConvert}
              disabled={batchRunning}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 20px", borderRadius: 10,
                background: batchRunning ? "#4338ca" : "#7c3aed",
                color: "#fff", border: "none", fontSize: 13, fontWeight: 600,
                cursor: batchRunning ? "not-allowed" : "pointer",
                opacity: batchRunning ? 0.7 : 1,
                transition: "all 0.2s",
              }}
            >
              {batchRunning ? (
                <>
                  <svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Converting...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  Convert All
                </>
              )}
            </button>
          </div>

          {batchError && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "8px 12px", color: "#fca5a5", fontSize: 12, marginTop: 12 }}>
              {batchError}
            </div>
          )}

          {batchResult && (
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 16 }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#a5b4fc" }}>{batchResult.total}</div>
                  <div style={{ fontSize: 10, color: "#818cf8", textTransform: "uppercase" }}>Total</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#34d399" }}>{batchResult.converted}</div>
                  <div style={{ fontSize: 10, color: "#6ee7b7", textTransform: "uppercase" }}>Converted</div>
                </div>
                {batchResult.failed > 0 && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#f87171" }}>{batchResult.failed}</div>
                    <div style={{ fontSize: 10, color: "#fca5a5", textTransform: "uppercase" }}>Failed</div>
                  </div>
                )}
                {batchResult.skipped > 0 && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#fbbf24" }}>{batchResult.skipped}</div>
                    <div style={{ fontSize: 10, color: "#fcd34d", textTransform: "uppercase" }}>Skipped</div>
                  </div>
                )}
              </div>
              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                {batchResult.results.map((r, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "5px 8px", borderRadius: 6, fontSize: 11,
                    background: r.status === "ok" ? "rgba(52,211,153,0.08)" : r.status === "error" ? "rgba(248,113,113,0.08)" : "rgba(251,191,36,0.08)",
                    marginBottom: 2,
                  }}>
                    <span style={{ color: r.status === "ok" ? "#34d399" : r.status === "error" ? "#f87171" : "#fbbf24", fontWeight: 600 }}>
                      {r.status === "ok" ? "OK" : r.status === "error" ? "ERR" : "SKIP"}
                    </span>
                    <span style={{ color: "#c7d2fe", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {r.name || r.file}
                    </span>
                    {r.pages != null && <span style={{ color: "#818cf8" }}>{r.pages}p</span>}
                    {r.outputFile && <span style={{ color: "#6b7280", fontFamily: "monospace", fontSize: 10 }}>{r.outputFile}</span>}
                    {r.error && <span style={{ color: "#fca5a5", fontSize: 10 }}>{r.error}</span>}
                    {r.reason && <span style={{ color: "#fcd34d", fontSize: 10 }}>{r.reason}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

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


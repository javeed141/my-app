export const cssText = `
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

export const styles = {
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
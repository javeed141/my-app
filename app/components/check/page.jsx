"use client";
import { useState, useCallback, useMemo } from "react";

// ============================================================
// KNOWN COMPONENTS — these are handled by the rule-based pipeline
// ============================================================
const KNOWN_COMPONENTS = new Set([
  "div","span","p","a","img","br","hr","table","thead","tbody",
  "tr","th","td","ul","ol","li","pre","code","blockquote",
  "h1","h2","h3","h4","h5","h6","em","strong","del","sub","sup",
  "details","summary","section","article","aside","header","footer",
  "nav","main","figure","figcaption","iframe","video","audio","source",
  "svg","path","circle","rect","line","polyline","polygon","g",
  "kbd","input","meta","link","b","i","u","s","small","mark",
  "abbr","cite","q","dl","dt","dd",
  // Documentation.AI components
  "Callout","Card","Columns","Image","Video","Iframe","CodeGroup",
  "Expandable","ExpandableGroup","Steps","Step","Tabs","Tab",
  "Update","ParamField","ResponseField","Request","Response",
  "Frame","Icon","Column",
  // ReadMe built-ins (handled by converters.js)
  "Cards","Accordion","AccordionGroup","Embed","Glossary",
]);

// ============================================================
// PARENT → CHILD relationships
// ============================================================
const PARENT_CHILD_MAP = {
  Recipe: ["RecipeStep"],
  Cards: ["Card"],
  Tabs: ["Tab"],
  Steps: ["Step"],
  ExpandableGroup: ["Expandable"],
};

// ============================================================
// CLASSIFIER — analyzes component signals
// ============================================================
const NAME_PATTERNS = [
  { pattern: /banner|alert|warning|deprecat|caution/i, category: "alert", target: '<Callout kind="alert">', icon: "🔴" },
  { pattern: /tip|hint|bestpractice|pro.?tip/i, category: "tip", target: '<Callout kind="tip">', icon: "💡" },
  { pattern: /info|note|notice|remind/i, category: "info", target: '<Callout kind="info">', icon: "ℹ️" },
  { pattern: /success|confirm|done|complete/i, category: "success", target: '<Callout kind="success">', icon: "✅" },
  { pattern: /terminal|cli|console|shell|command/i, category: "code", target: "```bash", icon: "⬛" },
  { pattern: /card|quicklink|navlink|tile/i, category: "card", target: "<Card>", icon: "🃏" },
  { pattern: /feature|grid|highlight|showcase/i, category: "grid", target: "<Columns> + <Card>", icon: "📊" },
  { pattern: /step|tutorial|recipe|guide|wizard/i, category: "steps", target: "<Steps>", icon: "📝" },
  { pattern: /tab|switch|compare|toggle|platform/i, category: "tabs", target: "<Tabs>", icon: "📑" },
  { pattern: /faq|question|quiz|trivia/i, category: "expandable", target: "<Expandable>", icon: "❓" },
  { pattern: /table|matrix|compat|pricing/i, category: "table", target: "Markdown table", icon: "📋" },
  { pattern: /progress|status|bar|meter/i, category: "text", target: "Bold text", icon: "📈" },
  { pattern: /slider|carousel|gallery/i, category: "images", target: "Multiple <Image>", icon: "🖼️" },
  { pattern: /code.?compare|before.?after|diff/i, category: "tabs", target: "<Tabs>", icon: "📑" },
];

const TAILWIND_SIGNALS = [
  { pattern: /bg-red|border-red|text-red/i, signal: "red-styling", hint: "alert/danger" },
  { pattern: /bg-yellow|border-yellow|text-yellow/i, signal: "yellow-styling", hint: "warning" },
  { pattern: /bg-blue|border-blue|text-blue/i, signal: "blue-styling", hint: "info" },
  { pattern: /bg-green|border-green|text-green/i, signal: "green-styling", hint: "success/tip" },
  { pattern: /bg-black.*text-green|font-mono/i, signal: "terminal-styling", hint: "CLI/terminal" },
  { pattern: /grid|flex.*gap|columns/i, signal: "layout", hint: "grid/columns" },
];

const JSX_SIGNALS = [
  { pattern: /useState|useEffect|useRef|useCallback/i, signal: "react-hooks", hint: "interactive (low confidence)" },
  { pattern: /fetch\(|axios|\.then\(/i, signal: "api-call", hint: "dynamic data" },
  { pattern: /onClick|onChange|onSubmit/i, signal: "event-handler", hint: "interactive" },
  { pattern: /\.map\s*\(/i, signal: "list-render", hint: "iterates data" },
  { pattern: /<table|<thead|<tbody|<tr/i, signal: "html-table", hint: "table component" },
  { pattern: /<a\s+href|<Link/i, signal: "navigation", hint: "link/card" },
  { pattern: /props\.children|\{children\}/i, signal: "wrapper", hint: "content wrapper" },
];

const PROP_SIGNALS = [
  { pattern: /commands\s*=|cmds\s*=/i, signal: "commands-prop", hint: "CLI terminal" },
  { pattern: /columns\s*=|cols\s*=/i, signal: "columns-prop", hint: "grid layout" },
  { pattern: /href\s*=|url\s*=|link\s*=/i, signal: "link-prop", hint: "navigation" },
  { pattern: /icon\s*=|fa-/i, signal: "icon-prop", hint: "has icons" },
  { pattern: /features\s*=|items\s*=/i, signal: "data-prop", hint: "data-driven" },
  { pattern: /value\s*=|max\s*=|percent/i, signal: "value-prop", hint: "progress/status" },
  { pattern: /question\s*=|options\s*=|correct\s*=/i, signal: "quiz-prop", hint: "quiz/trivia" },
];

function classifyComponent(name, definition, usage) {
  const signals = [];
  let category = "unknown";
  let confidence = "low";
  let target = "AI decides";
  let icon = "❔";

  // Signal 1: Name pattern
  for (const p of NAME_PATTERNS) {
    if (p.pattern.test(name)) {
      category = p.category;
      target = p.target;
      icon = p.icon;
      confidence = "high";
      signals.push(`name:${name}→${p.category}`);
      break;
    }
  }

  // Signal 2: Tailwind classes (from definition)
  if (definition) {
    for (const t of TAILWIND_SIGNALS) {
      if (t.pattern.test(definition)) {
        signals.push(`tailwind:${t.signal}`);
        if (confidence !== "high") {
          confidence = "medium";
        }
      }
    }
  }

  // Signal 3: JSX structure (from definition)
  if (definition) {
    for (const j of JSX_SIGNALS) {
      if (j.pattern.test(definition)) {
        signals.push(`jsx:${j.signal}`);
        if (j.signal === "react-hooks" || j.signal === "api-call") {
          confidence = "low";
        }
      }
    }
  }

  // Signal 4: Props (from usage)
  if (usage) {
    for (const p of PROP_SIGNALS) {
      if (p.pattern.test(usage)) {
        signals.push(`prop:${p.signal}`);
      }
    }
  }

  if (signals.length === 0) {
    signals.push("no-signals");
  }

  return { category, confidence, target, signals, icon };
}

// ============================================================
// FENCE MAP — track code block ranges
// ============================================================
function buildFenceMap(content) {
  const lines = content.split("\n");
  const fenceLines = [];
  let charIdx = 0;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/^```/.test(trimmed)) {
      const isOpener = /^```\w/.test(trimmed);
      fenceLines.push({ lineIdx: i, charIdx, isOpener, line: lines[i] });
    }
    charIdx += lines[i].length + 1;
  }

  const ranges = [];
  let openStart = null;

  for (const fl of fenceLines) {
    if (openStart === null) {
      if (fl.isOpener) openStart = fl.charIdx;
    } else {
      if (fl.isOpener) {
        openStart = fl.charIdx;
      } else {
        const lineLen = content.split("\n")[fl.lineIdx]?.length || 0;
        ranges.push([openStart, fl.charIdx + lineLen]);
        openStart = null;
      }
    }
  }

  return { ranges };
}

function isInsideFence(fenceMap, charIdx) {
  for (const [open, close] of fenceMap.ranges) {
    if (charIdx > open && charIdx < close) return true;
  }
  return false;
}

// ============================================================
// EXTRACT component definition
// ============================================================
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractComponentDefinition(content, name, fenceMap) {
  const escaped = escapeRegex(name);
  const startPatterns = [
    new RegExp(`^export\\s+const\\s+${escaped}\\s*=`, "m"),
    new RegExp(`^export\\s+function\\s+${escaped}\\s*\\(`, "m"),
    new RegExp(`^const\\s+${escaped}\\s*=`, "m"),
    new RegExp(`^function\\s+${escaped}\\s*\\(`, "m"),
  ];

  for (const regex of startPatterns) {
    const match = regex.exec(content);
    if (!match) continue;
    const startIdx = match.index;
    if (isInsideFence(fenceMap, startIdx)) continue;

    let braceDepth = 0, parenDepth = 0, foundFirstBrace = false;
    let inString = false, stringChar = "", inTemplateLiteral = false;
    let i = startIdx;

    while (i < content.length) {
      const ch = content[i];
      const prev = i > 0 ? content[i - 1] : "";

      if (!inTemplateLiteral && (ch === '"' || ch === "'")) {
        if (!inString) { inString = true; stringChar = ch; }
        else if (ch === stringChar && prev !== "\\") { inString = false; }
        i++; continue;
      }
      if (ch === "`" && !inString) { inTemplateLiteral = !inTemplateLiteral; i++; continue; }
      if (inString || inTemplateLiteral) { i++; continue; }

      if (ch === "(") parenDepth++;
      else if (ch === ")") parenDepth--;

      if (ch === "{" && parenDepth === 0) { braceDepth++; foundFirstBrace = true; }
      else if (ch === "}" && parenDepth === 0) {
        braceDepth--;
        if (foundFirstBrace && braceDepth === 0) {
          let endIdx = i + 1;
          while (endIdx < content.length && ";  \t".includes(content[endIdx])) endIdx++;
          if (endIdx < content.length && content[endIdx] === "\n") endIdx++;
          return content.slice(startIdx, endIdx).trim();
        }
      }

      if (!foundFirstBrace && ch === ";" && braceDepth === 0 && parenDepth === 0) {
        const slice = content.slice(startIdx, i + 1);
        if (/=>/.test(slice)) return slice.trim();
      }
      i++;
    }
  }
  return null;
}

// ============================================================
// EXTRACT usage
// ============================================================
function extractUsage(content, name, fenceMap) {
  const escaped = escapeRegex(name);
  const startMatch = new RegExp(`<${escaped}\\b`).exec(content);
  if (!startMatch) return null;
  if (isInsideFence(fenceMap, startMatch.index)) return null;

  const remaining = content.slice(startMatch.index);
  const selfClosing = new RegExp(`^<${escaped}\\b[^>]*/>`);
  const selfMatch = selfClosing.exec(remaining);
  if (selfMatch) return selfMatch[0];

  const openTag = new RegExp(`<${escaped}\\b`, "g");
  const closeTag = new RegExp(`</${escaped}\\s*>`, "g");
  let depth = 0, i = 0;

  while (i < remaining.length) {
    openTag.lastIndex = i;
    closeTag.lastIndex = i;
    const openMatch = openTag.exec(remaining);
    const closeMatch = closeTag.exec(remaining);
    if (!openMatch && !closeMatch) break;

    const openIdx = openMatch ? openMatch.index : Infinity;
    const closeIdx = closeMatch ? closeMatch.index : Infinity;

    if (openIdx < closeIdx) {
      depth++;
      i = openIdx + openMatch[0].length;
    } else {
      depth--;
      if (depth === 0) return remaining.slice(0, closeMatch.index + closeMatch[0].length);
      i = closeIdx + closeMatch[0].length;
    }
  }
  return null;
}

// ============================================================
// GET CONTEXT — surrounding lines
// ============================================================
function getContext(content, startIndex, length) {
  const before = content.substring(Math.max(0, startIndex - 200), startIndex);
  const after = content.substring(startIndex + length, startIndex + length + 200);
  const beforeLines = before.split("\n").slice(-3).join("\n").trim();
  const afterLines = after.split("\n").slice(0, 3).join("\n").trim();
  return `...${beforeLines}\n[COMPONENT HERE]\n${afterLines}...`;
}

// ============================================================
// ORDER parents before children
// ============================================================
function orderParentsFirst(unknowns) {
  const names = [...unknowns.keys()];
  const childSet = new Set();
  for (const parent of Object.keys(PARENT_CHILD_MAP)) {
    for (const child of PARENT_CHILD_MAP[parent]) childSet.add(child);
  }
  names.sort((a, b) => (childSet.has(a) ? 1 : 0) - (childSet.has(b) ? 1 : 0));
  return names;
}

// ============================================================
// MAIN SCANNER
// ============================================================
function scanUnknownComponents(content) {
  const unknowns = new Map();
  const componentBlocks = [];
  let cleanedContent = content;
  let fenceMap = buildFenceMap(cleanedContent);

  // Find unknown component names
  const tagRegex = /<([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)?)\b/g;
  let match;
  while ((match = tagRegex.exec(cleanedContent)) !== null) {
    const name = match[1];
    if (!KNOWN_COMPONENTS.has(name) && !isInsideFence(fenceMap, match.index)) {
      unknowns.set(name, (unknowns.get(name) || 0) + 1);
    }
  }

  const ordered = orderParentsFirst(unknowns);
  let placeholderIndex = 0;

  for (const name of ordered) {
    const definition = extractComponentDefinition(cleanedContent, name, fenceMap);
    if (definition) {
      cleanedContent = cleanedContent.replace(definition, "");
      fenceMap = buildFenceMap(cleanedContent);
    }

    const usages = [];
    const contexts = [];
    const placeholderIds = [];

    let usage;
    while ((usage = extractUsage(cleanedContent, name, fenceMap)) !== null) {
      const usageIndex = cleanedContent.indexOf(usage);
      const context = getContext(cleanedContent, usageIndex, usage.length);
      const pid = `{/* __AI_CONVERT__${name}__${placeholderIndex}__ */}`;
      placeholderIndex++;
      usages.push(usage);
      contexts.push(context);
      placeholderIds.push(pid);
      cleanedContent = cleanedContent.replace(usage, pid);
      fenceMap = buildFenceMap(cleanedContent);
    }

    const classification = classifyComponent(name, definition, usages.join("\n"));

    componentBlocks.push({
      name,
      definition: definition || null,
      usages,
      contexts,
      placeholderIds,
      classification,
      usageCount: unknowns.get(name) || usages.length,
    });
  }

  cleanedContent = cleanedContent.replace(/\n{3,}/g, "\n\n");
  return { unknowns, componentBlocks, content: cleanedContent };
}

// ============================================================
// SAMPLE MDX for demo
// ============================================================
const SAMPLE_MDX = `---
title: Getting Started
---

export const DeprecationBanner = ({ children, version }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 p-4 my-4">
      <span className="text-red-700 font-bold">⚠️ Deprecated in {version}:</span>
      <span className="ml-2">{children}</span>
    </div>
  );
};

## Authentication

The old auth method is deprecated.

<DeprecationBanner version="v3.0">
  This endpoint will be removed. Use /v2/users instead.
</DeprecationBanner>

export const Terminal = ({ commands }) => {
  return (
    <div className="bg-black text-green-400 rounded-lg p-4 font-mono">
      <div className="flex gap-2 mb-2">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      {commands.map((cmd, i) => (
        <div key={i}>$ {cmd}</div>
      ))}
    </div>
  );
};

## Quick Start

Install the SDK:

<Terminal commands={["npm install @acme/sdk", "npx acme init"]} />

Then initialize:

<Terminal commands={["acme config set --key YOUR_KEY"]} />

export const CompatibilityMatrix = ({ features }) => (
  <table>
    <thead><tr><th>Feature</th><th>Free</th><th>Pro</th><th>Enterprise</th></tr></thead>
    <tbody>
      {features.map(f => (
        <tr key={f.name}>
          <td>{f.name}</td>
          <td>{f.free ? "✅" : "❌"}</td>
          <td>{f.pro ? "✅" : "❌"}</td>
          <td>{f.enterprise ? "✅" : "❌"}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

## Pricing

<CompatibilityMatrix features={[
  { name: "API Access", free: true, pro: true, enterprise: true },
  { name: "Webhooks", free: false, pro: true, enterprise: true },
  { name: "SSO", free: false, pro: false, enterprise: true },
]} />

<ProgressBar value={75} max={100} label="Migration Progress" />

export const QuizGame = ({ question, options, correct }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="p-4 border rounded">
      <p><strong>{question}</strong></p>
      {options.map((opt, i) => (
        <button key={i} onClick={() => setSelected(i)}>{opt}</button>
      ))}
    </div>
  );
};

## Knowledge Check

<QuizGame
  question="Which HTTP method is idempotent?"
  options={["POST", "PUT", "PATCH"]}
  correct={1}
/>

<Banner type="warning" message="This API is in beta" link="/docs/beta-program" />

\`\`\`javascript
// This code block contains <FakeComponent> that should NOT be detected
const x = <FakeComponent prop="value" />;
\`\`\`
`;

// ============================================================
// CONFIDENCE COLORS
// ============================================================
const CONF_COLORS = {
  high: { bg: "#0d3320", border: "#16a34a", text: "#4ade80", label: "HIGH" },
  medium: { bg: "#3b2607", border: "#d97706", text: "#fbbf24", label: "MED" },
  low: { bg: "#3b0f0f", border: "#dc2626", text: "#f87171", label: "LOW" },
};

// ============================================================
// REACT COMPONENT
// ============================================================
export default function UnknownComponentScanner() {
  const [mdxInput, setMdxInput] = useState(SAMPLE_MDX);
  const [activeTab, setActiveTab] = useState("components");
  const [expandedComponent, setExpandedComponent] = useState(null);

  const scanResult = useMemo(() => {
    if (!mdxInput.trim()) return null;
    try {
      return scanUnknownComponents(mdxInput);
    } catch (e) {
      return { error: e.message };
    }
  }, [mdxInput]);

  const handlePaste = useCallback(() => {
    setMdxInput(SAMPLE_MDX);
  }, []);

  const stats = useMemo(() => {
    if (!scanResult || scanResult.error) return null;
    const blocks = scanResult.componentBlocks;
    const total = blocks.length;
    const withDef = blocks.filter(b => b.definition).length;
    const withoutDef = total - withDef;
    const totalUsages = blocks.reduce((s, b) => s + b.usages.length, 0);
    const high = blocks.filter(b => b.classification.confidence === "high").length;
    const medium = blocks.filter(b => b.classification.confidence === "medium").length;
    const low = blocks.filter(b => b.classification.confidence === "low").length;
    return { total, withDef, withoutDef, totalUsages, high, medium, low };
  }, [scanResult]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e2e8",
      fontFamily: "'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace",
    }}>
      {/* HEADER */}
      <div style={{
        borderBottom: "1px solid #1e1e2e",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "linear-gradient(180deg, #0f0f18 0%, #0a0a0f 100%)",
      }}>
        <div style={{
          width: 32, height: 32,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
        }}>⚡</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#f0f0f5", letterSpacing: "-0.02em" }}>
            Unknown Component Scanner
          </div>
          <div style={{ fontSize: 11, color: "#6b6b80", marginTop: 1 }}>
            ReadMe → Documentation.AI · Paste MDX to scan
          </div>
        </div>
        {stats && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 16, fontSize: 12 }}>
            <span style={{ color: "#6b6b80" }}>
              <span style={{ color: "#f0f0f5", fontWeight: 600 }}>{stats.total}</span> components
            </span>
            <span style={{ color: "#6b6b80" }}>
              <span style={{ color: "#f0f0f5", fontWeight: 600 }}>{stats.totalUsages}</span> usages
            </span>
            <span style={{ color: CONF_COLORS.high.text }}>{stats.high} high</span>
            <span style={{ color: CONF_COLORS.medium.text }}>{stats.medium} med</span>
            <span style={{ color: CONF_COLORS.low.text }}>{stats.low} low</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>
        {/* LEFT: INPUT */}
        <div style={{
          width: "42%",
          borderRight: "1px solid #1e1e2e",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            padding: "10px 16px",
            borderBottom: "1px solid #1e1e2e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#6b6b80",
          }}>
            <span>INPUT MDX</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handlePaste}
                style={{
                  background: "#1e1e2e",
                  border: "1px solid #2e2e3e",
                  color: "#a0a0b0",
                  borderRadius: 4,
                  padding: "3px 10px",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                Load Sample
              </button>
              <button
                onClick={() => setMdxInput("")}
                style={{
                  background: "#1e1e2e",
                  border: "1px solid #2e2e3e",
                  color: "#a0a0b0",
                  borderRadius: 4,
                  padding: "3px 10px",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={mdxInput}
            onChange={(e) => setMdxInput(e.target.value)}
            placeholder="Paste your ReadMe MDX content here..."
            spellCheck={false}
            style={{
              flex: 1,
              background: "#08080d",
              color: "#c8c8d0",
              border: "none",
              outline: "none",
              resize: "none",
              padding: 16,
              fontSize: 12,
              lineHeight: 1.7,
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* RIGHT: RESULTS */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tabs */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid #1e1e2e",
            padding: "0 16px",
          }}>
            {["components", "cleaned", "json"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 16px",
                  fontSize: 12,
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid #6366f1" : "2px solid transparent",
                  color: activeTab === tab ? "#e2e2e8" : "#6b6b80",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "inherit",
                }}
              >
                {tab === "components" ? `Components (${scanResult?.componentBlocks?.length || 0})` : tab === "cleaned" ? "Cleaned MDX" : "JSON Output"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
            {scanResult?.error ? (
              <div style={{
                padding: 16,
                background: "#3b0f0f",
                border: "1px solid #dc2626",
                borderRadius: 8,
                color: "#f87171",
                fontSize: 13,
              }}>
                Error: {scanResult.error}
              </div>
            ) : !scanResult || !scanResult.componentBlocks?.length ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#4b4b5e",
                gap: 12,
              }}>
                <div style={{ fontSize: 40, opacity: 0.3 }}>🔍</div>
                <div style={{ fontSize: 14 }}>
                  {mdxInput.trim() ? "No unknown components found" : "Paste MDX to begin scanning"}
                </div>
              </div>
            ) : activeTab === "components" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {scanResult.componentBlocks.map((block, idx) => {
                  const cls = block.classification;
                  const conf = CONF_COLORS[cls.confidence];
                  const isExpanded = expandedComponent === idx;

                  return (
                    <div
                      key={idx}
                      style={{
                        background: "#0f0f18",
                        border: `1px solid ${isExpanded ? "#3e3e5e" : "#1e1e2e"}`,
                        borderRadius: 8,
                        overflow: "hidden",
                        transition: "border-color 0.15s",
                      }}
                    >
                      {/* Component Header */}
                      <div
                        onClick={() => setExpandedComponent(isExpanded ? null : idx)}
                        style={{
                          padding: "12px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{cls.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#f0f0f5",
                            }}>
                              {"<"}{block.name}{">"}
                            </span>
                            <span style={{
                              fontSize: 10,
                              padding: "2px 6px",
                              borderRadius: 3,
                              background: conf.bg,
                              border: `1px solid ${conf.border}`,
                              color: conf.text,
                              fontWeight: 600,
                            }}>
                              {conf.label}
                            </span>
                            {block.definition ? (
                              <span style={{
                                fontSize: 10,
                                padding: "2px 6px",
                                borderRadius: 3,
                                background: "#0d2847",
                                border: "1px solid #1d4ed8",
                                color: "#60a5fa",
                              }}>
                                HAS DEF
                              </span>
                            ) : (
                              <span style={{
                                fontSize: 10,
                                padding: "2px 6px",
                                borderRadius: 3,
                                background: "#2a1a0a",
                                border: "1px solid #92400e",
                                color: "#fbbf24",
                              }}>
                                NO DEF
                              </span>
                            )}
                            <span style={{
                              fontSize: 10,
                              color: "#6b6b80",
                              marginLeft: 4,
                            }}>
                              {block.usages.length} usage{block.usages.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <div style={{
                            fontSize: 11,
                            color: "#6b6b80",
                            marginTop: 4,
                          }}>
                            → {cls.target}
                            <span style={{ color: "#4b4b5e", marginLeft: 8 }}>
                              [{cls.signals.join(", ")}]
                            </span>
                          </div>
                        </div>
                        <span style={{
                          color: "#4b4b5e",
                          fontSize: 14,
                          transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.15s",
                        }}>▶</span>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div style={{
                          borderTop: "1px solid #1e1e2e",
                          padding: 16,
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}>
                          {/* Definition */}
                          {block.definition && (
                            <div>
                              <div style={{
                                fontSize: 10,
                                color: "#6b6b80",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginBottom: 6,
                              }}>Definition</div>
                              <pre style={{
                                background: "#08080d",
                                border: "1px solid #1e1e2e",
                                borderRadius: 6,
                                padding: 12,
                                fontSize: 11,
                                lineHeight: 1.6,
                                overflow: "auto",
                                maxHeight: 200,
                                color: "#a0a0b0",
                                margin: 0,
                              }}>
                                {block.definition}
                              </pre>
                            </div>
                          )}

                          {/* Usages */}
                          {block.usages.map((usage, ui) => (
                            <div key={ui}>
                              <div style={{
                                fontSize: 10,
                                color: "#6b6b80",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginBottom: 6,
                              }}>Usage {ui + 1}</div>
                              <pre style={{
                                background: "#08080d",
                                border: "1px solid #1e1e2e",
                                borderRadius: 6,
                                padding: 12,
                                fontSize: 11,
                                lineHeight: 1.6,
                                overflow: "auto",
                                maxHeight: 150,
                                color: "#c4b5fd",
                                margin: 0,
                              }}>
                                {usage}
                              </pre>
                              {block.contexts[ui] && (
                                <pre style={{
                                  background: "#0a0a12",
                                  border: "1px dashed #1e1e2e",
                                  borderRadius: 6,
                                  padding: 10,
                                  fontSize: 10,
                                  lineHeight: 1.5,
                                  overflow: "auto",
                                  maxHeight: 100,
                                  color: "#4b4b5e",
                                  margin: "6px 0 0 0",
                                }}>
                                  {block.contexts[ui]}
                                </pre>
                              )}
                            </div>
                          ))}

                          {/* Classification Detail */}
                          <div style={{
                            background: "#0c0c14",
                            border: "1px solid #1e1e2e",
                            borderRadius: 6,
                            padding: 12,
                          }}>
                            <div style={{
                              fontSize: 10,
                              color: "#6b6b80",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              marginBottom: 8,
                            }}>Classification Signals</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {cls.signals.map((sig, si) => (
                                <span key={si} style={{
                                  fontSize: 11,
                                  padding: "3px 8px",
                                  borderRadius: 4,
                                  background: "#161622",
                                  border: "1px solid #2e2e3e",
                                  color: "#a0a0b0",
                                }}>
                                  {sig}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Placeholder */}
                          <div style={{ fontSize: 11, color: "#4b4b5e" }}>
                            Placeholder{block.placeholderIds.length > 1 ? "s" : ""}:{" "}
                            {block.placeholderIds.map((pid, pi) => (
                              <code key={pi} style={{
                                background: "#161622",
                                padding: "2px 6px",
                                borderRadius: 3,
                                fontSize: 10,
                                color: "#6366f1",
                                marginRight: 4,
                              }}>
                                {pid}
                              </code>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : activeTab === "cleaned" ? (
              <pre style={{
                background: "#08080d",
                border: "1px solid #1e1e2e",
                borderRadius: 8,
                padding: 16,
                fontSize: 12,
                lineHeight: 1.7,
                overflow: "auto",
                color: "#c8c8d0",
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {scanResult.content}
              </pre>
            ) : (
              <pre style={{
                background: "#08080d",
                border: "1px solid #1e1e2e",
                borderRadius: 8,
                padding: 16,
                fontSize: 11,
                lineHeight: 1.6,
                overflow: "auto",
                color: "#a0a0b0",
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {JSON.stringify(
                  scanResult.componentBlocks.map(b => ({
                    name: b.name,
                    hasDefinition: !!b.definition,
                    usageCount: b.usages.length,
                    classification: b.classification,
                    placeholderIds: b.placeholderIds,
                    usages: b.usages,
                    definition: b.definition ? b.definition.slice(0, 200) + (b.definition.length > 200 ? "..." : "") : null,
                  })),
                  null,
                  2
                )}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
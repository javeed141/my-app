# Documentation.AI Doc-Agent Evaluation Framework
# Technical Assessment Report

**Report ID:** EVAL-FW-2026-02-26
**Date:** February 26, 2026
**Prepared by:** Engineering Team
**Subject:** AI Agent Evaluation Framework — Architecture, Code Quality & Effectiveness Assessment

---

## Executive Summary

The Documentation.AI doc-agent evaluation framework is a **comprehensive, production-grade testing system** for validating AI-powered documentation agents. Built on the Vercel eval framework pattern, it tests **103 scenarios** across 5 agent categories: Orchestrator (routing), Answer (Q&A), Writer (content creation), Validation (quality checking), and GitHub (code-informed writing).

The framework employs an **LLM-as-Judge** pattern (GPT-5.2) for scoring, mock frontend tools for full workflow simulation, and supports both sequential and parallel batch execution. It covers the complete agent lifecycle: from routing decisions through tool selection, content generation, MDX syntax correctness, component usage, frontmatter safety, and site configuration management.

**Overall Assessment: 8.7 / 10** — A sophisticated, well-engineered evaluation system that demonstrates mature AI testing practices.

---

## 1. Product Context

### What is Documentation.AI?

Documentation.AI is an AI-powered documentation and knowledge base platform that enables teams to write, publish, and manage documentation through:

- **Notion-like web editor** with rich MDX components
- **AI agents** that draft, edit, and restructure pages with context awareness
- **Git-native workflow** for developers preferring IDE/code-based editing
- **Site configuration** via `documentation.json` for navigation, branding, redirects, and OpenAPI integration

### What the Eval Framework Tests

The framework evaluates the **dashboard AI agent system** — the conversational AI that helps users create, update, and manage their documentation sites through natural language commands. This includes:

- **Orchestrator Agent**: Routes user requests to the correct specialized agent
- **Answer Agent**: Answers questions about Documentation.AI features, components, and configuration
- **Writer Agent**: Creates/updates MDX pages, site config, OpenAPI specs, and handles file operations
- **Validation Subagent**: Checks MDX syntax, JSON validity, link integrity, and frontmatter completeness
- **GitHub Subagent**: Analyzes connected repos, reviews commits, and informs documentation updates

---

## 2. Framework Architecture

### System Design

```
User Request
    |
    v
+---------------------+
|  Evaluation Runner   |  <-- run-evals.ts orchestrates the pipeline
|  (eval.runner.ts)    |
+---------------------+
    |
    |-- 1. Load test cases from eval.dataset.ts
    |-- 2. Build context (ChatContext + mock file system)
    |-- 3. Create mock frontend tools (mock-frontend-tools.ts)
    |-- 4. Execute agent via Vercel AI SDK generateText()
    |-- 5. Collect metrics (latency, tokens, tool calls, step traces)
    |
    v
+---------------------+
|  LLM-as-Judge        |  <-- eval.scorer.ts
|  (GPT-5.2)           |
+---------------------+
    |
    |-- Score across 5 dimensions (0-1 each)
    |-- Check shouldContain / shouldNotContain
    |-- Verify expected tools were called
    |-- Validate output format (MDX/JSON/YAML)
    |-- Determine pass/fail
    |
    v
+---------------------+
|  Results & Reporting |  <-- JSON + CSV output
+---------------------+
```

### File Structure (7 files, ~3,200 lines)

| File | Lines | Purpose |
|---|---|---|
| eval.dataset.ts | ~870 | 103 test cases with expected behaviors |
| eval.runner.ts | ~520 | Agent execution engine with metrics |
| eval.scorer.ts | ~450 | LLM-as-Judge scoring + aggregation |
| eval.types.ts | ~180 | TypeScript type definitions |
| mock-frontend-tools.ts | ~450 | Simulated client-side tools |
| run-evals.ts | ~480 | CLI orchestrator with reporting |
| index.ts | ~25 | Public exports |

---

## 3. Test Coverage Analysis

### 103 Test Cases Across 5 Agent Types

| Agent Type | Test Cases | Coverage |
|---|---|---|
| Orchestrator | 10 | Routing logic (answer vs write), multi-turn, edge cases |
| Answer | 20 | Components, config, OpenAPI, icons, files, multi-turn, regressions |
| Writer | 45 | Create/update pages, components, nav, branding, redirects, OpenAPI, frontmatter safety |
| Validation | 11 | MDX syntax, JSON, OpenAPI, links, frontmatter, bulk validation |
| GitHub | 17 | Repo structure, commits, search, file read, multi-repo, production scenarios |

### Coverage by Difficulty

| Difficulty | Count | Description |
|---|---|---|
| Simple | 33 | Basic operations, clear intent |
| Moderate | 42 | Multi-step, context-dependent |
| Complex | 18 | Multi-tool, architectural decisions |
| Edge-case | 10 | Vague input, missing context, invalid format |

### Coverage by Feature Area

| Feature Area | Tests | Key Scenarios |
|---|---|---|
| Routing | 10 | Question vs create vs update vs delete, multi-turn confirmation, vague input |
| MDX Components | 12 | Callout, Steps, CodeGroup, Tabs, Expandable, Card+Columns, ParamField, ResponseField |
| Site Configuration | 16 | Redirects, navbar, logos, branding, OpenAPI page-level, hidden-apis, templates |
| Content Quality | 11 | Frontmatter safety (no `<>{}` in titles), realistic code examples, proper opening paragraphs |
| GitHub Integration | 17 | Repo tree, commits, search, file read, multi-repo routing, production cross-referencing |
| Validation | 11 | MDX syntax, JSON, OpenAPI, links, frontmatter, bulk, audit-and-fix |
| File Operations | 3 | Delete (with confirmation), move (with nav sync), create |
| Multi-turn | 5 | Confirmation after suggestion, follow-up questions, bulk continuation |
| OpenAPI | 8 | Spec creation, page-level connection, hidden-apis, mode configuration |

---

## 4. Detailed Component Assessment

### 4.1 Test Dataset (eval.dataset.ts) — 9.0/10

**Strengths:**

- **Real-world regression coverage**: Tests like `wrt-035` (frontmatter safety) and `ans-018` (endpoint routing) are clearly born from production bugs — these are the most valuable test cases
- **Content quality enforcement**: Writer tests don't just check if MDX was generated — they enforce that:
  - Frontmatter descriptions are useful search snippets, not generic "This page describes..."
  - Opening paragraphs are direct and substantive, not "In this guide, we will..."
  - Code examples use realistic data, not "foo", "bar", "test123"
  - Appropriate MDX components are used (ParamField for API params, Steps for procedures, CodeGroup for multi-language)
- **Production GitHub scenarios**: Tests `gh-prod-001` through `gh-prod-005` use real repo configurations (DocumentationAI-App, DocumentationAI-Dashboard) with actual installation IDs — these test the real authentication and API flow
- **Negative testing**: `shouldNotContain` checks prevent information leakage (e.g., internal template names like "Petstore" appearing in user-facing responses)
- **Progressive difficulty**: Simple (name extraction) through complex (multi-repo cross-reference with batch search)

**Gaps:**
- No performance regression tests (e.g., "this test should complete in under 10s")
- No concurrent user simulation
- Limited error injection tests (what happens when the AI API is down?)

### 4.2 Evaluation Runner (eval.runner.ts) — 8.5/10

**Strengths:**

- **Architecture bypass for testability**: The runner correctly identifies that `frontendTools()` from `@assistant-ui/react-ai-sdk` only provides schema definitions (no execute functions), so it creates eval-specific agent instances with executable mock tools. This is documented clearly with `IMPORTANT` comments.
- **AbortController for graceful timeout**: Instead of hard-killing timed-out tests, uses `AbortController` so partial results (completed steps) are preserved for debugging
- **Step-by-step tracing**: Every agent step is logged with elapsed time, tool calls, and text preview — invaluable for debugging timeout/stall cases
- **Parallel batch execution**: Configurable concurrency with `maxConcurrency` and `batchSize` parameters
- **Billing integration**: Records token usage via `recordDetailedUsage` even during evals — ensures billing logic is tested end-to-end
- **Provider options**: Passes `reasoningEffort: "medium"` and `reasoningSummary: "auto"` to the model — these are tuned for eval balance between quality and cost

**Gaps:**
- No warm-up run to avoid cold-start latency skewing the first test
- No retry mechanism for flaky tests (a test that fails once gets a permanent 0)
- `timeoutMs` default is 120s but some complex tests (multi-repo cross-reference) may need more

### 4.3 LLM-as-Judge Scorer (eval.scorer.ts) — 8.5/10

**Strengths:**

- **Tool-aware evaluation**: The judge prompt explicitly explains that "these agents use a tool-based workflow" and that "the actual content is in the tool outputs, not in the final text response." This prevents the common pitfall of penalizing agents for not repeating generated content in their summary.
- **Separate shouldContain vs shouldNotContain scoping**:
  - `shouldContain` checks combined text (output + tool outputs) — catches content in tool results
  - `shouldNotContain` checks ONLY the agent's final output — prevents false positives from tool metadata
  - This distinction shows deep understanding of the agent's architecture
- **Schema validation with retry**: If the judge's response doesn't match the Zod schema, it retries up to 2 times with 1s delay
- **Multi-dimensional scoring**: Quality, Relevance, Accuracy, Format Correctness, Tool Usage — each scored 0-1
- **Specialized orchestrator judge**: Routing tests get a completely different judge prompt focused solely on intent classification

**Gaps:**
- Judge model (GPT-5.2) is a single point of failure — no fallback model
- No judge calibration tests (known good/bad outputs to verify the judge itself is accurate)
- Format validation for MDX is basic (unclosed tag counting) — a real MDX parser would be more reliable

### 4.4 Mock Frontend Tools (mock-frontend-tools.ts) — 8.0/10

**Strengths:**

- **Complete file system simulation**: In-memory Map-based file system with read, create, delete, rename, and move operations
- **Operation tracking**: Every tool call is recorded with timestamp, arguments, and results — these are passed to the judge for evaluation
- **Realistic sample files**: 15 MDX files with intentional issues for testing:
  - `getting-started.mdx`: Has "authentification" typo for fix-typo tests
  - `guides/webhooks.mdx`: Has `.then()` callbacks for async/await modernization tests
  - `integrations.mdx`: Has unclosed `<Columns/>` tag (should be `</Columns>`) for syntax error tests
  - `deprecated-api.mdx`: Exists for deletion tests
  - `openapi.yaml`: Full OpenAPI 3.0.3 spec for validation tests
  - `documentation.json`: Complete site config with tabs, groups, pages, colors
- **Auto-approve alerts**: The `alert` tool auto-approves in eval mode, allowing full workflow testing of destructive operations (delete) that normally require human confirmation
- **Reset capability**: `reset()` method restores initial state between test runs

**Gaps:**
- No simulation of network errors or slow responses
- No file size limits or concurrent access simulation
- The `searchUnsavedFiles` tool is not mocked — tests expecting it may fail

### 4.5 CLI Runner (run-evals.ts) — 8.5/10

**Strengths:**

- **Rich CLI interface**: Progress bars, colored output, batch progress, per-test timing
- **Flexible filtering**: `--agent=writer`, `--difficulty=simple,moderate`, `--tags=routing`, `--ids=wrt-001,wrt-002`
- **Dual output format**: JSON (detailed) + CSV (summary) for analysis
- **Quality gate**: Exits with error code 1 if pass rate drops below 70% — suitable for CI/CD integration
- **Model configuration display**: Prints which models are used for each agent type before running

**Gaps:**
- No comparison mode (diff against previous run)
- No HTML report generation for non-technical stakeholders
- No Slack/email notification on completion

---

## 5. Alignment with Documentation.AI Technical Writing Standards

The test dataset enforces many of the Documentation.AI technical writing best practices:

| Best Practice | How It's Tested |
|---|---|
| **Direct opening paragraphs** | Writer tests check for absence of "In this guide, we will..." and "Welcome to..." |
| **Realistic code examples** | Tests require "realistic data, not 'foo', 'bar', 'test123'" |
| **Appropriate component usage** | 12 tests verify correct MDX components (Steps for procedures, CodeGroup for multi-lang, etc.) |
| **Frontmatter as search snippet** | Tests require "useful search snippet, not just repeating the title" |
| **H2 start (no H1 in body)** | Format validation checks for H1 in body |
| **Progressive disclosure** | Test wrt-043 checks "basics first, edge cases in Expandable" |
| **Action-oriented Card titles** | Test wrt-045 checks for "specific, action-oriented" titles |
| **Second person voice** | Writer agent system prompt enforces "you" addressing |
| **Active voice** | Enforced through judge quality scoring |
| **Proper heading hierarchy** | MDX format validation checks H2 -> H3 -> H4 |

### Areas Not Yet Covered by Tests

| Best Practice | Status |
|---|---|
| Alt text for images | No test verifies Image components have descriptive alt text |
| Link text accessibility | No test checks for "click here" style links |
| Keyboard navigation considerations | Not tested |
| Error handling in code examples | Only partially tested (wrt-005) |
| Prerequisites before procedures | Mentioned in wrt-039 description but not a hard check |

---

## 6. Scoring Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Test Coverage & Completeness | 9.0 | 25% | 2.25 |
| Architecture & Design | 8.5 | 20% | 1.70 |
| Scorer / Judge Quality | 8.5 | 15% | 1.28 |
| Mock Infrastructure | 8.0 | 10% | 0.80 |
| CLI & Reporting | 8.5 | 10% | 0.85 |
| Code Quality & TypeScript | 9.0 | 10% | 0.90 |
| Writing Standards Alignment | 8.5 | 10% | 0.85 |
| **TOTAL** | | **100%** | **8.63 / 10** |

---

## 7. Key Technical Achievements

1. **Tool-aware LLM-as-Judge** — The scorer understands that agent output lives in tool results, not final text. This is a critical distinction that most eval frameworks get wrong, leading to false failures.

2. **Scoped shouldContain/shouldNotContain** — Checking generated content in tool outputs while checking information leakage only in user-facing text. This prevents the common false-positive problem where tool metadata triggers shouldNotContain rules.

3. **Production regression tests** — Tests born from real production bugs (frontmatter `<>{}` causing MDX parse errors, internal template names leaking into responses, wrong OpenAPI routing) demonstrate that the eval framework evolves with the product.

4. **Content quality enforcement at test level** — Going beyond "did the agent call the right tool" to verify writing quality: realistic data, direct openings, proper components, useful descriptions. This aligns the eval framework with the product's technical writing standards.

5. **Graceful timeout with partial results** — Using AbortController to preserve completed steps when a test times out, enabling debugging of stalled agents without losing all telemetry.

6. **Complete type safety** — Full TypeScript types for test cases, results, judge requests/responses, metrics, and step traces. The Zod schema for judge output provides runtime validation on top of compile-time types.

---

## 8. Recommendations

### P0 — Critical

| # | Action | Impact |
|---|---|---|
| 1 | **Add judge calibration tests** — Run 10 known-good and 10 known-bad outputs through the judge to verify it scores them correctly. This prevents judge drift when updating the judge model. | Ensures scoring reliability |
| 2 | **Add retry for flaky tests** — Some tests depend on AI behavior that may vary run-to-run. Allow 1-2 retries before marking as failed. | Reduces false failures in CI |

### P1 — Important

| # | Action | Impact |
|---|---|---|
| 3 | **Add comparison mode** — Diff current run against a baseline run to detect regressions. Show which tests changed from pass to fail and vice versa. | Enables CI quality gates |
| 4 | **Mock searchUnsavedFiles** — Test `ans-007` expects this tool but it's not in the mock frontend tools. | Fixes a likely test failure |
| 5 | **Add image alt-text and link accessibility tests** — The writing standards require descriptive alt text and no "click here" links, but no tests enforce this. | Improves accessibility coverage |
| 6 | **Add error injection tests** — What happens when xAI API returns 500? When GitHub API rate limits? When a file doesn't exist? | Tests resilience |

### P2 — Nice to Have

| # | Action | Impact |
|---|---|---|
| 7 | **HTML report generation** — Generate a visual dashboard alongside JSON/CSV for non-technical stakeholders. | Better reporting |
| 8 | **Add warm-up run** — Run one throwaway test before timing starts to avoid cold-start latency skewing results. | More accurate metrics |
| 9 | **Add cost tracking per test** — Log the dollar cost of each test (input + output tokens at model pricing). | Budget visibility |
| 10 | **Add multi-run consistency scoring** — Run each test 3 times and report variance. High variance tests indicate prompt instability. | Quality insights |

---

## 9. Comparison: Eval Framework vs Industry Standards

| Capability | This Framework | Vercel Eval Framework | Braintrust | LangSmith |
|---|---|---|---|---|
| LLM-as-Judge | GPT-5.2 | Configurable | Configurable | Configurable |
| Multi-dimensional scoring | 5 dimensions | Custom | Custom | Custom |
| Tool-aware evaluation | Yes (unique) | No | Partial | Partial |
| Mock infrastructure | Full file system | None built-in | None built-in | None built-in |
| Parallel execution | Batch-based | Manual | Built-in | Built-in |
| CI integration | Exit code on threshold | Manual | Built-in | Built-in |
| Historical comparison | Not yet | Not built-in | Built-in | Built-in |
| Cost tracking | Billing integration | Not built-in | Built-in | Built-in |

The framework's **tool-aware evaluation** and **full mock infrastructure** are differentiators that most off-the-shelf eval frameworks don't provide. The main gaps are in historical comparison and built-in cost tracking.

---

## 10. Conclusion

The Documentation.AI doc-agent evaluation framework is a **well-engineered, production-grade system** that goes significantly beyond basic prompt testing. Its key strengths are:

1. **Depth of coverage**: 103 test cases covering routing, content creation, component enforcement, site configuration, GitHub integration, validation, and edge cases
2. **Writing quality enforcement**: Tests don't just check functionality — they verify content quality standards (realistic data, direct openings, proper components)
3. **Tool-aware architecture**: The scorer, runner, and mock infrastructure all understand that agent output lives in tool results, not just final text
4. **Production-informed regressions**: Test cases are clearly derived from real production bugs, making the suite increasingly valuable over time

With the recommended improvements (judge calibration, comparison mode, retry logic), this framework is well-positioned to serve as a **continuous quality gate** for the doc-agent system in CI/CD pipelines.

**Rating: 8.7 / 10** — Production-quality evaluation framework with sophisticated AI testing patterns.

---

*Report generated: February 26, 2026*
*Framework version: Based on Vercel eval framework pattern*
*Codebase analyzed: 7 files, ~3,200 lines of TypeScript*

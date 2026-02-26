# Evaluation Test Results — Site Structure Converter

**Report ID:** EVAL-2026-02-24
**Date:** February 24, 2026
**Prepared by:** Engineering Team
**Subject:** ReadMe-to-Documentation.AI Structure Converter — QA Evaluation Results

---

## Executive Summary

The site structure converter was evaluated against **13 real-world documentation sites** across **112 test cases**. The system achieved an overall **89.3% pass rate** (100/112 tests passed). All simple and moderate difficulty tests pass at 100%. The **sole critical failure area is page-count preservation**, where pages are being dropped during conversion, particularly on larger sites.

---

## Overall Metrics

| Metric | Value |
|---|---|
| Total Test Cases | 112 |
| Passed | 100 |
| Failed | 12 |
| Pass Rate | **89.3%** |
| Sites Tested | 13 |
| Categories Tested | 8 |

### Average Quality Scores (0–1 scale)

| Dimension | Score |
|---|---|
| Quality | 0.880 |
| Relevance | **1.000** |
| Accuracy | 0.893 |
| Format Correctness | 0.893 |
| Completeness | 0.893 |

---

## Results by Category

| Category | Passed | Total | Pass Rate | Status |
|---|---|---|---|---|
| Name Extraction | 13 | 13 | **100%** | PASS |
| Path Cleaning | 26 | 26 | **100%** | PASS |
| Full Conversion | 13 | 13 | **100%** | PASS |
| Tab Handling | 11 | 11 | **100%** | PASS |
| Nesting | 11 | 11 | **100%** | PASS |
| Method Detection | 12 | 12 | **100%** | PASS |
| Group Structure | 12 | 13 | **92.3%** | WARN |
| Page Count | 2 | 13 | **15.4%** | FAIL |

Six out of eight categories pass at 100%. Page-count preservation is the clear outlier at 15.4%.

---

## Results by Difficulty

| Difficulty | Passed | Total | Pass Rate |
|---|---|---|---|
| Simple | 57 | 57 | **100%** |
| Moderate | 33 | 33 | **100%** |
| Complex | 10 | 22 | **45.5%** |

All failures are concentrated in "complex" difficulty tests. The converter handles simple and moderate scenarios flawlessly.

---

## Results by Site

| Site | Passed | Total | Pass Rate | Failed Tests |
|---|---|---|---|---|
| autocode | 7 | 7 | **100%** | — |
| shippingeasy | 8 | 8 | **100%** | — |
| 360learning | 8 | 9 | 88.9% | page-count |
| datafiniti | 8 | 9 | 88.9% | page-count |
| floorplanner | 8 | 9 | 88.9% | page-count |
| lirium | 8 | 9 | 88.9% | page-count |
| lithic | 8 | 9 | 88.9% | page-count |
| paperform | 8 | 9 | 88.9% | page-count |
| pennylane | 8 | 9 | 88.9% | page-count |
| pipedrive | 8 | 9 | 88.9% | page-count |
| shopline-developers | 8 | 9 | 88.9% | page-count |
| readme | 7 | 8 | 87.5% | page-count |
| moderntreasury | 6 | 8 | 75.0% | page-count, group-structure |

---

## Critical Issue: Page Loss During Conversion

11 out of 13 sites are losing pages during conversion. Detailed breakdown:

| Site | Input Pages | Output Pages | Pages Lost | Loss % |
|---|---|---|---|---|
| moderntreasury | 1,234 | 283 | **-951** | **77.1%** |
| datafiniti | 258 | 216 | -42 | 16.3% |
| lithic | 393 | 355 | -38 | 9.7% |
| 360learning | 299 | 263 | -36 | 12.0% |
| floorplanner | 201 | 172 | -29 | 14.4% |
| pennylane | 207 | 181 | -26 | 12.6% |
| readme | 307 | 284 | -23 | 7.5% |
| paperform | 70 | 57 | -13 | 18.6% |
| shopline-developers | 99 | 87 | -12 | 12.1% |
| pipedrive | 91 | 83 | -8 | 8.8% |
| lirium | 75 | 68 | -7 | 9.3% |
| **autocode** | **31** | **31** | **0** | **0%** |
| **shippingeasy** | **38** | **38** | **0** | **0%** |

**Total pages lost across all sites: 1,185 pages**

### Key Observations

- **moderntreasury** is the worst case — 77% of pages lost (951 pages). This site also had the only group-structure failure (6 missing groups: Money Movement, Bring your own Bank, Accounts, Categories, Settlements, Reporting).
- The two sites that pass (autocode: 31 pages, shippingeasy: 38 pages) are both small, single-tab sites. This suggests the converter handles small, simple site structures correctly but struggles with larger, multi-tab, or multi-product sites.
- Average page loss across failing sites is ~18%.

---

## Group Structure Failure Detail

One site failed the group-structure test:

**moderntreasury** — 6 groups missing from output:
- Money Movement
- Bring your own Bank
- Accounts
- Categories
- Settlements
- Reporting

This site uses the `products` navigation type (instead of `tabs` or `groups`), which may indicate a bug in product-level group handling.

---

## What's Working Well

1. **Name extraction** — 100%. All site names are correctly extracted and cleaned from domains.
2. **Path cleaning** — 100%. No leading slashes, no `main/` prefixes in any output.
3. **Full conversion format** — 100%. Every output has valid `name` + `navigation` structure.
4. **Tab handling** — 100%. Multi-tab sites correctly produce tabs, single-tab sites correctly collapse to groups.
5. **Nesting** — 100%. Nested pages are properly converted into hierarchical group structures.
6. **HTTP method detection** — 100%. API endpoint methods (GET, POST, PUT, PATCH, DELETE) are correctly detected where present.

---

## Recommendations

| Priority | Action Item | Expected Impact |
|---|---|---|
| **P0** | Fix page loss bug — investigate why pages are dropped during conversion. Start with moderntreasury (77% loss) as the most extreme case. | Would fix 11 of 12 failures |
| **P1** | Fix multi-product group handling — the moderntreasury group-structure failure suggests a bug specific to the `products` navigation path. | Would fix remaining 1 failure |
| **P2** | Add regression tests for large sites — the two passing sites are both small and simple. | Prevent future regressions |

---

## Conclusion

The converter is structurally sound — formatting, naming, path cleaning, tabs, nesting, and method detection all work perfectly. The **single critical issue is page loss**, which affects 85% of tested sites and must be resolved before production use. Fixing this one issue would bring the overall pass rate from 89.3% to near 100%.

---

*Report generated from evaluation run: eval-2026-02-24T16-15-02-659Z.json*

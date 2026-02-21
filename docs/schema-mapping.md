# ReadMe.io → Documentation.AI Schema Mapping

## Overview

This document maps the structural components of **ReadMe.io** scraped JSON exports to the **Documentation.AI** `docs.json` configuration schema. The converter handles three ReadMe navigation types (`tabs`, `simple`, `projects`) and transforms them into Documentation.AI's hierarchical navigation model.

---

## Top-Level Properties

| ReadMe.io (Source)       | Documentation.AI (Target)        | Notes                                                            |
| ------------------------ | -------------------------------- | ---------------------------------------------------------------- |
| `site`                   | `name`                           | Domain cleaned to readable name (e.g., `pipedrive.readme.io` → `Pipedrive`) |
| `navType`                | Determines `navigation` shape    | `"tabs"` → tabs/groups, `"simple"` → groups, `"projects"` → products |
| `tabs[]`                 | `navigation.tabs[].tab`          | Tab display names become tab objects                             |
| `sections[]`             | `navigation.tabs[]` / `groups[]` / `products[]` | Sections decompose into the appropriate hierarchy level  |
| *(not present)*          | `favicon`                        | Not available in ReadMe export — set manually                    |
| *(not present)*          | `logo-dark` / `logo-light`       | Not available in ReadMe export — set manually                    |
| *(not present)*          | `colors`                         | Not available in ReadMe export — set manually                    |
| *(not present)*          | `navbar`                         | Not available in ReadMe export — set manually                    |
| *(not present)*          | `seo`                            | Not available in ReadMe export — set manually                    |
| *(not present)*          | `redirects`                      | Not available in ReadMe export — set manually                    |
| *(not present)*          | `template`                       | Not available — defaults to `"classic"`                          |
| *(not present)*          | `initialRoute`                   | Not available — set manually to first page path                  |

---

## Navigation Type Mapping

### 1. `navType: "tabs"` → `navigation.tabs[]`

ReadMe tabs with multiple sections become Documentation.AI tabs. A single-tab site is flattened to `navigation.groups[]`.

```
ReadMe.io                          Documentation.AI
─────────                          ─────────────────
sections[0].name = "Guides"   →   navigation.tabs[0].tab = "Guides"
sections[1].name = "API Ref"  →   navigation.tabs[1].tab = "API Ref"
```

### 2. `navType: "simple"` → `navigation.groups[]`

Simple sites with a single "main" section map directly to groups.

```
ReadMe.io                          Documentation.AI
─────────                          ─────────────────
sections[0].name = "main"     →   navigation.groups[...]
  pages[].group = "Setup"     →     groups[0].group = "Setup"
  pages[].group = "Config"    →     groups[1].group = "Config"
```

### 3. `navType: "projects"` → `navigation.products[]`

Project-based sites use section names like `"payments/Guides"`. These split into a product → tab hierarchy.

```
ReadMe.io                                  Documentation.AI
─────────                                  ─────────────────
sections[0].name = "payments/Guides"   →   products[0].product = "Payments"
sections[1].name = "payments/API Ref"  →     products[0].tabs[0].tab = "Guides"
                                             products[0].tabs[1].tab = "API Ref"
sections[2].name = "ledgers/Guides"    →   products[1].product = "Ledgers"
                                             products[1].groups[...]  (single tab flattened)
```

---

## Section → Group Mapping

| ReadMe.io                     | Documentation.AI                | Notes                                         |
| ----------------------------- | ------------------------------- | --------------------------------------------- |
| `sections[].name`             | `tabs[].tab`                    | Section name becomes tab name                 |
| `sections[].pages[].group`    | `groups[].group`                | The `group` field on pages creates sidebar groups |
| *(group ordering)*            | *(preserved)*                   | First-appearance order of group names is kept |
| Empty/missing group name      | `group: "General"`              | Fallback group name for ungrouped pages       |

---

## Page Mapping

| ReadMe.io Page Field | Documentation.AI Page Field | Notes                                                                 |
| -------------------- | --------------------------- | --------------------------------------------------------------------- |
| `title`              | `title`                     | Direct copy. HTTP method suffixes (`get`, `post`, etc.) are stripped   |
| `path`               | `path`                      | Leading `/` removed, `main/` prefix stripped                          |
| `fullUrl`            | *(not mapped)*              | Original URL not needed; can derive `href` if external link needed    |
| `level`              | Structural nesting          | `level 1` = group member, `level 2+` = nested inside `nestedGroup`   |
| `group`              | Parent `group.group`        | Determines which sidebar group the page belongs to                    |
| *(method suffix)*    | `method`                    | Detected from title suffix: `"...get"` → `"GET"`, `"...post"` → `"POST"` |
| *(not present)*      | `icon`                      | Not available — set manually per page                                 |
| *(not present)*      | `tags`                      | Not available — set manually                                          |
| *(not present)*      | `badge`                     | Not available — set manually (e.g., "New", "Beta")                    |
| *(not present)*      | `show-sidebar`              | Not available — defaults to `true`                                    |
| *(not present)*      | `show-toc`                  | Not available — defaults to `true`                                    |
| *(not present)*      | `content-width`             | Not available — defaults to `"normal"`                                |
| *(not present)*      | `openapi`                   | Not available — requires OpenAPI spec file reference                  |

---

## Hierarchy / Nesting (Level) Mapping

ReadMe uses a flat page list with `level` integers. Documentation.AI uses nested objects.

```
ReadMe.io (flat with levels)           Documentation.AI (nested objects)
────────────────────────────           ─────────────────────────────────
L1  "Quickstart"                  →    { "title": "Quickstart", "path": "..." }
L1  "Building in Sandbox"         →    { "group": "Building in Sandbox",
L2    "Internal Accounts"                "pages": [
L2    "Counterparties"                     { "title": "Internal Accounts", ... },
L2    "Simulate a Return"                  { "title": "Counterparties", ... },
                                           { "title": "Simulate a Return", ... }
                                         ]
                                       }
L1  "Opening accounts"            →    { "group": "Opening accounts",
L2    "Onboard Individual"               "pages": [
L2    "Onboard Business"                   { "title": "Onboard Individual", ... },
                                           { "title": "Onboard Business", ... }
                                         ]
                                       }
```

| ReadMe `level` | Documentation.AI Equivalent         | Description                          |
| --------------- | ----------------------------------- | ------------------------------------ |
| `0`             | Top-level page (no group)           | Standalone entries (e.g., changelog) |
| `1`             | `page` inside a `group.pages[]`     | Standard sidebar page                |
| `2`             | `page` inside a `nestedGroup.pages[]` | Child of the preceding L1 page     |
| `3+`            | Deeper `nestedGroup` nesting        | Further sub-children                 |

---

## HTTP Method Detection

API reference pages in ReadMe often append method keywords directly to titles:

| ReadMe Title                          | Documentation.AI                                          |
| ------------------------------------- | --------------------------------------------------------- |
| `"List all usersget"`                 | `{ "title": "List all users", "method": "GET" }`         |
| `"Create an invited userpost"`        | `{ "title": "Create an invited user", "method": "POST" }`|
| `"Delete a userdel"`                  | `{ "title": "Delete a user", "method": "DELETE" }`       |
| `"Update account holder...patch"`     | `{ "title": "Update account holder...", "method": "PATCH" }` |
| `"Getting Started"` *(no suffix)*     | `{ "title": "Getting Started" }` *(no method field)*     |

Detected suffixes: `get`, `post`, `put`, `patch`, `delete`, `del`, `head`, `options`

---

## Structural Comparison

```
ReadMe.io Structure                    Documentation.AI Structure
═══════════════════                    ══════════════════════════

site ─────────────────────────────►    name
navType ──────────────────────────►    navigation shape selector
│
├─ sections[] ────────────────────►    navigation
│  ├─ name ───────────────────────►      ├─ products[].product  (if projects)
│  │                                     │    └─ tabs[].tab
│  │                                     ├─ tabs[].tab          (if tabs)
│  │                                     └─ groups[]            (if simple)
│  │
│  └─ pages[] (flat list)                    └─ groups[].pages[] (nested)
│     ├─ title ───────────────────►              ├─ title (cleaned)
│     ├─ path ────────────────────►              ├─ path (cleaned)
│     ├─ fullUrl ─────────────────►              ├─ (not mapped)
│     ├─ level ───────────────────►              ├─ nesting depth
│     └─ group ───────────────────►              └─ parent group.group
│
└─ tabs[] (name strings) ────────►         tab names

NOT in ReadMe (set manually):         favicon, logos, colors, navbar,
                                       seo, redirects, template,
                                       initialRoute, icons, badges,
                                       tags, openapi, show-sidebar,
                                       show-toc, content-width
```

---

## Converted Files Summary

| Source File                          | Site                        | NavType    | Target Navigation  |
| ------------------------------------ | --------------------------- | ---------- | ------------------ |
| `360learning_readme_io_...json`      | 360learning.readme.io       | `tabs`     | `tabs → groups`    |
| `dev_frontapp_com_...json`           | dev.frontapp.com            | `tabs`     | `tabs → groups`    |
| `docs_datafiniti_co_...json`         | docs.datafiniti.co          | `tabs`     | `tabs → groups`    |
| `docs_lithic_com_...json`            | docs.lithic.com             | `tabs`     | `tabs → groups`    |
| `docs_moderntreasury_com_...json`    | docs.moderntreasury.com     | `projects` | `products → tabs → groups` |
| `docs_readme_com_...json` (×2)       | docs.readme.com             | `simple`   | `groups`           |
| `floorplanner_readme_io_...json`     | floorplanner.readme.io      | `tabs`     | `groups` (single tab flattened) |
| `lirium_readme_io_...json`           | lirium.readme.io            | `tabs`     | `groups` (single tab flattened) |
| `paperform_readme_io_...json`        | paperform.readme.io         | `tabs`     | `groups` (single tab flattened) |
| `pennylane_readme_io_...json`        | pennylane.readme.io         | `tabs`     | `tabs → groups`    |
| `pipedrive_readme_io_...json`        | pipedrive.readme.io         | `tabs`     | `tabs → groups`    |
| `shopline-developers_readme_io_...json` | shopline-developers.readme.io | `tabs` | `tabs → groups`    |

---

## Manual Steps After Conversion

After running the converter, you'll want to manually add these Documentation.AI-specific properties:

1. **`initialRoute`** — Set to the path of the first/landing page
2. **`template`** — Choose `"classic"` or `"atlas"`
3. **`favicon`**, **`logo-dark`**, **`logo-light`** — Upload brand assets
4. **`colors.light`** / **`colors.dark`** — Set brand hex colors
5. **`navbar.actions`** — Add CTA buttons and links
6. **`seo`** — Configure indexing preferences
7. **`redirects`** — Map any old ReadMe URLs to new paths
8. **`icon`** fields — Add Lucide icon names to groups/pages
9. **`badge`** fields — Tag pages as "New", "Beta", "Deprecated"
10. **`openapi`** references — Link OpenAPI spec files for auto-generated API docs

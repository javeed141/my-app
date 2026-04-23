# ReadMe MCP Use Cases

Real prompts and workflows for developers, content writers, and CI pipelines using ReadMe's MCP server.

[ReadMe's MCP server](https://docs.readme.com/main/docs/readmes-mcp-server) at `https://docs.readme.com/mcp` gives AI tools direct access to your ReadMe workspace — so you can search, read, and update your documentation without ever leaving your editor or CI pipeline.

Here are four ready-to-use workflows.

***

## For Developers: Sync Docs with Code Changes

Keep your documentation in step with every code change. Instead of manually tracking what changed and which doc to update, let your AI figure it out.

**What you need:**

* An AI coding assistant (Cursor, Claude Code, VS Code Copilot) connected to ReadMe's MCP server
* A ReadMe API key configured as the `authorization` header

**The prompt:**

```
Update the ReadMe docs to reflect my recent code changes.

1. Use git tools to see what changed: `git diff HEAD~1` or `git log --oneline -10`
2. For each changed file, use the ReadMe MCP `search` tool to find docs that
   cover that functionality
3. For each relevant doc, use the ReadMe MCP `fetch` tool to get the current
   content
4. Use the ReadMe MCP `update-docs` tool to update any pages that are now
   out of date, or create new pages where documentation is missing
```

**What the AI does:**

1. Runs `git diff` → sees that `src/auth/oauth.ts` was updated with a new `pkce` parameter
2. Calls `search("OAuth authentication")` → finds your "Authentication" guide
3. Calls `fetch(id)` → reads the current content
4. Identifies the outdated section and rewrites it with the new PKCE details
5. Calls `update-docs` → pushes the updated content back to ReadMe

No tab-switching, no copy-pasting. Your docs stay current as part of your normal development flow.

***

## For Everyone: Update Docs from Your Editor

Not every doc update starts with a code change. Sometimes you just need to tweak a description, add a note, or update a detail across your docs. With the ReadMe MCP server connected, you can do this with a simple natural language request — no need to open the ReadMe dashboard.

Just ask your AI assistant something like:

* "Update our docs to say the Agent uses Opus 4.6"
* "Add a note about the new rate limit to our API reference"
* "Rewrite the authentication section to mention SSO support"

**What happens behind the scenes:**

1. **Finds your live version** by looking up your project's current stable branch.
2. **Creates a new branch** (e.g., `3.0_agent-opus-4-6-update`) so your live docs are never modified directly.
3. **Fetches the target page** from the branch.
4. **Applies your requested changes** to the page content.
5. **Verifies the update persisted** with a follow-up read to confirm the changes were saved.
6. **Returns a review link** so you can preview the changes and merge when ready.

You get a branch-based workflow with a review step — just like a pull request for your docs — without having to manage any of it yourself.

> 📘 **Bi-directional sync note**
>
> If your project is synced with a Git repository, the MCP server will verify that writes persist after updating. In rare cases where the Git source of truth overrides API writes, you’ll be notified to push the change via Git instead.

***

## For Content Writers: Build and Apply a Style Guide

Use your best-performing content as the template for everything else.

### Step 1 — Extract your style from top-performing pages

```
Use the ReadMe MCP tools to analyze my best-performing documentation.

1. Use `search` to find my top 10 most-viewed or highest-rated pages
2. Use `fetch` to pull the full content of each one
3. Analyze what they have in common: structure, tone, heading patterns,
   code example placement, length, use of callouts, etc.
4. Write a concise style guide based on these patterns
```

The AI reads your actual best content and distills your team's voice into a reusable style guide — no guesswork, no generic writing advice.

### Step 2 — Apply the style guide to underperforming content

```
Now use the style guide you just created to improve my worst-performing page.

1. Use `search` to find my lowest-rated or least-viewed page
2. Use `fetch` to get its current content
3. Rewrite it following the style guide: match the structure, tone, and
   formatting patterns from the top-performing pages
4. Use `update-docs` to publish the improved version
```

The result: a data-driven content improvement loop, driven entirely by what already works in your docs.

***

## For CI/CD: Auto-generate Changelogs on Release

Every time you ship a new version, automatically create a changelog entry in ReadMe.

### GitHub Actions workflow

Add this workflow to your repository at `.github/workflows/changelog.yml`:

```yaml
name: Generate Changelog on Release

on:
  release:
    types: [published]

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Update ReadMe Changelog
        uses: anthropics/claude-code-action@beta
        with:
          prompt: |
            Use ReadMe MCP tools to create a new changelog entry.

            Release version: ${{ github.event.release.tag_name }}
            Release notes:
            ${{ github.event.release.body }}

            Steps:
            1. Use the `search` tool to find the existing Changelog page
            2. Use the `fetch` tool to get its current content
            3. Add a new section at the top for version ${{ github.event.release.tag_name }}
               - Use today's date as the release date
               - Summarize the release notes in a clear, developer-friendly format
               - Group changes into: New Features, Bug Fixes, Breaking Changes
            4. Use `update-docs` to publish the updated changelog

          mcp_config: |
            {
              "mcpServers": {
                "ReadMe MCP": {
                  "url": "https://docs.readme.com/mcp",
                  "headers": {
                    "authorization": "Bearer ${{ secrets.README_API_KEY }}"
                  }
                }
              }
            }
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          README_API_KEY: ${{ secrets.README_API_KEY }}
```

**What you need in GitHub Secrets:**

* `ANTHROPIC_API_KEY` — your Anthropic API key
* `README_API_KEY` — your ReadMe API key (format: `rdme_xxx...`)

**What happens on every release:**

1. The workflow triggers when you publish a release in GitHub
2. Claude connects to ReadMe's MCP server with your API key
3. It finds your changelog page, reads the current content
4. Writes a new, cleanly-formatted entry at the top
5. Publishes it back to ReadMe — before you've even tweeted about the release

***

## Getting Started

All four workflows require connecting your AI tool to ReadMe's MCP server. See [ReadMe's MCP Server](https://docs.readme.com/main/docs/readmes-mcp-server) for setup instructions and authentication details.
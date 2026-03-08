# Lithic MCP

Connect AI code editors to the Lithic API. Search docs, explore endpoints, and execute requests without leaving your editor.

The [Model Context Protocol](https://modelcontextprotocol.io) (MCP) is an open standard that lets AI-powered code editors connect to external tools and data sources. Instead of copying documentation into prompts or switching between your editor and a browser, MCP gives your AI assistant direct access to APIs, schemas, and reference material in real time.

The Lithic MCP server brings this capability to the [Lithic Developer API](https://docs.lithic.com). Once connected, your AI assistant can search Lithic documentation, inspect endpoint schemas, generate integration code, and execute live API requests, all from within your editor.

Lithic's MCP server works with any MCP-compatible client, including (but not limited to) [Cursor](#cursor), [Claude Code](#claude-code), [VS Code with GitHub Copilot](#vs-code-github-copilot), [Windsurf](#windsurf), [Cline](#cline), [Claude Desktop](#claude-desktop), [Claude.ai](#claudeai-web), [ChatGPT](#chatgpt), [JetBrains IDEs](#jetbrains-ides), Gemini CLI, and Codex CLI.

## Capabilities

Once connected, your AI coding assistant can:

* **Search Lithic documentation**: find guides, API references, and code examples by keyword
* **Explore API endpoints**: list all endpoints, inspect request/response schemas, and view code snippets in your language
* **Execute live API requests**: call the Lithic API directly from your editor (requires a [Lithic API key](https://docs.lithic.com/docs/authentication))
* **Generate integration code**: build Lithic integrations with real context from the API specification

## Prerequisites

* An AI code editor or chat app that supports MCP (see [supported clients](#connect-your-editor-or-chat-app) below)
* A [Lithic API key (authentication guide)](https://docs.lithic.com/docs/authentication) (required for executing API requests; documentation search and exploration work without one)
* For sandbox testing, use a [Sandbox API key](https://docs.lithic.com/docs/sandbox) to safely simulate transactions

## Lithic MCP Server URL

Lithic hosts a remote MCP server at:

```
https://docs.lithic.com/mcp
```

This is a hosted server. No local installation, `npm install`, or Docker setup is required. Add the URL to your editor's MCP configuration and you're ready to go.

## Store Your API Key in a `.env` File

To execute live API requests through the MCP server, your AI assistant needs access to your [Lithic API key](https://docs.lithic.com/docs/authentication). The recommended approach is to store it in a `.env` file in your project root so your assistant can read it when making requests.

Create a `.env` file in your project directory:

```bash
# .env
LITHIC_API_KEY=your_sandbox_api_key_here
```

Replace `your_sandbox_api_key_here` with your actual key. You can find your Sandbox API key in the [Lithic Dashboard](https://app.lithic.com).

> **Important:** Add `.env` to your `.gitignore` file to avoid committing your API key to version control.

```bash
# .gitignore
.env
```

Your AI assistant can then read the key from this file and include it as an `Authorization` header when using the `execute-request` tool. See [Improving Tool Discovery with Custom Instructions](#improving-tool-discovery-with-custom-instructions) for how to tell your assistant where to find the key.

***

## Connect Your Editor or Chat App

Select your editor or chat app and follow the setup instructions. Each section includes the exact configuration or steps you need.

### Cursor

Add to your project-level config (`.cursor/mcp.json`) or global config (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "lithic": {
      "url": "https://docs.lithic.com/mcp"
    }
  }
}
```

You can also add it via **Cursor Settings > Features > MCP Servers > + Add new global MCP server**.

> **Note:** Lithic MCP tools are available in Cursor's **Agent mode**. Make sure you're using Agent mode to access them.

### Claude Code

Use the CLI to add the Lithic MCP server:

```bash
# Add to your current project
claude mcp add lithic --transport http https://docs.lithic.com/mcp

# Or add globally (available across all projects)
claude mcp add lithic --transport http --scope user https://docs.lithic.com/mcp
```

To share the configuration with your team, add a `.mcp.json` file to your project root instead:

```json
{
  "mcpServers": {
    "lithic": {
      "type": "http",
      "url": "https://docs.lithic.com/mcp"
    }
  }
}
```

### VS Code (GitHub Copilot)

Add a `.vscode/mcp.json` file to your project:

```json
{
  "servers": {
    "lithic": {
      "type": "http",
      "url": "https://docs.lithic.com/mcp"
    }
  }
}
```

> **Important:** VS Code uses `"servers"` as the top-level key, not `"mcpServers"` like other editors. The `"type"` field is also required.

Lithic MCP tools are available in **Copilot Chat (Agent mode)**. Select "Agent" from the mode dropdown. Requires VS Code 1.99+ and the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot).

### Windsurf

Open **Windsurf Settings > Cascade > MCP Servers**, or edit `~/.codeium/windsurf/mcp_config.json` directly:

```json
{
  "mcpServers": {
    "lithic": {
      "serverUrl": "https://docs.lithic.com/mcp"
    }
  }
}
```

> **Note:** Windsurf uses `"serverUrl"` (preferred) for remote MCP servers. `"url"` is also accepted.

### Cline

Click the **MCP Servers icon** in the Cline panel, then **Configure MCP Servers**, and add:

```json
{
  "mcpServers": {
    "lithic": {
      "url": "https://docs.lithic.com/mcp",
      "alwaysAllow": [],
      "disabled": false
    }
  }
}
```

### Claude Desktop

To add the Lithic MCP server to Claude Desktop, use **Custom Connectors**:

1. Open **Claude > Settings > Connectors**
2. Click **"Add custom connector"**
3. Enter the MCP server URL: `https://docs.lithic.com/mcp`
4. Click **"Add"**

Custom connectors are the recommended way to add remote MCP servers in Claude Desktop. After adding, **fully quit and restart** Claude Desktop (closing the window is not enough).

> **Note:** If you prefer JSON config, you can use `mcp-remote` as a bridge in `claude_desktop_config.json`. See the [MCP remote documentation](https://github.com/geelen/mcp-remote) for setup details.

### Claude.ai (Web)

Claude.ai supports MCP servers through its **Connectors** feature. Available on all plans (Free users are limited to one custom connector).

1. Click your profile icon and select **Settings**
2. Go to **Settings > Connectors**
3. Scroll to the bottom and click **"Add custom connector"**
4. Enter the MCP server URL: `https://docs.lithic.com/mcp`
5. Click **"Add"** (no OAuth credentials are needed)

To use the connector in a conversation, click the **"+"** button at the bottom of the chat input, select **"Connectors"**, and enable the Lithic connector. You can toggle connectors on and off per conversation.

> **Note:** Connectors configured here are also available in the Claude mobile app, but new connectors cannot be added from mobile.

### JetBrains IDEs

To connect Lithic to JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, and others), open **Settings > Tools > AI Assistant > Model Context Protocol (MCP)** and add a new server:

* **Transport**: HTTP
* **URL**: `https://docs.lithic.com/mcp`

Requires JetBrains IDE version 2025.1 or later with the AI Assistant plugin enabled.

### ChatGPT

You can connect ChatGPT to the Lithic API using MCP through **Developer Mode**. Requires a Plus, Pro, Business, Enterprise, or Education plan.

**Step 1: Enable Developer Mode**

1. Click your profile icon and select **Settings**
2. Go to **Settings > Apps & Connectors**
3. Open **Advanced settings**
4. Toggle **Developer Mode (beta)** to on

**Step 2: Add the Lithic connector**

1. Still in **Apps & Connectors**, click **"Add new connector"**
2. Fill in the fields:
   * **Name**: `Lithic`
   * **Description**: `Search Lithic API documentation, explore endpoints, and execute API requests`
   * **MCP Server URL**: `https://docs.lithic.com/mcp`
   * **Authentication**: No Authentication
3. Check **"I trust this application"** and click **"Create"**

**Step 3: Enable per conversation**

Connectors are not automatically active. In each new conversation:

1. Click **"+"**, then **"More"**, then select **"Developer Mode"**
2. Enable the Lithic connector for that conversation

> **Note:** ChatGPT does not support API key authentication for MCP connectors. Documentation search and endpoint exploration work without authentication. To execute live API requests, you'll need to pass your [Lithic API key](https://docs.lithic.com/docs/authentication) directly in the prompt or request headers.

***

## Verify Your Setup

After configuring your editor or chat app, open a new chat and try one of these prompts:

* *"How do I create a card in the Lithic Sandbox?"*
* *"Show me the request body for creating an authorization rule."*
* *"What endpoints are available for transaction management?"*
* *"Simulate a transaction in the Lithic Sandbox."*

Your assistant should respond with accurate, up-to-date information pulled directly from the Lithic API documentation and endpoint schemas.

### Troubleshooting

**MCP server not appearing in my editor**

* Double-check that the URL is exactly `https://docs.lithic.com/mcp` with no trailing slash
* In Claude Desktop, you must fully quit and relaunch the app after editing the config
* In Cursor, try toggling the server off and on in **Settings > Features > MCP Servers**

**Tools aren't being used by my AI assistant**

* Make sure you're in **Agent mode** (required in Cursor, VS Code Copilot, and Claude Code)
* In VS Code, confirm the `"type": "http"` field is present. It's required and easy to miss
* In Claude.ai, make sure the connector is enabled for the current conversation via the **"+"** button
* In ChatGPT, make sure **Developer Mode** is active in the current conversation
* If your assistant ignores the tools even when connected, try adding [custom instructions](#improving-tool-discovery-with-custom-instructions)

**API requests are failing**

* The `execute-request` tool requires a valid [Lithic API key](https://docs.lithic.com/docs/authentication). Documentation search and endpoint exploration work without one
* Use a [Sandbox API key](https://docs.lithic.com/docs/sandbox) for testing to avoid affecting live data

***

## Improving Tool Discovery with Custom Instructions

AI assistants automatically detect available MCP tools, but they don't always use them unprompted, especially if you have many MCP servers connected or if your question doesn't obviously match a tool name. Adding a short instruction to your editor's configuration can improve how reliably your assistant reaches for the Lithic tools.

**Where to add instructions by client:**

| Client             | Where to add instructions                                |
| ------------------ | -------------------------------------------------------- |
| **Cursor**         | `.cursorrules` or `.cursor/rules/` files in your project |
| **Claude Code**    | `CLAUDE.md` in your project root                         |
| **VS Code**        | `.github/copilot-instructions.md` in your project        |
| **Claude.ai**      | Custom instructions in **Settings > Profile**            |
| **ChatGPT**        | Custom instructions in **Settings > Personalization**    |
| **Claude Desktop** | Custom instructions in **Settings > Profile**            |
| **Windsurf**       | Windsurf Rules in project settings                       |
| **Cline**          | `.clinerules` in your project root                       |

**Example instruction to add:**

```
When working with the Lithic API (cards, transactions, accounts, authorization rules,
payments, or webhooks), use the Lithic MCP tools to search documentation, explore
endpoints, and execute API requests. Use the Sandbox environment for testing.

When executing Lithic API requests, read the API key from the .env file
(LITHIC_API_KEY) and pass it as an Authorization header.
```

This is optional but recommended if you find your assistant isn't using the Lithic tools when it should be. For initial setup, see [Connect Your Editor or Chat App](#connect-your-editor-or-chat-app).

***

## Available MCP Tools

The Lithic MCP server exposes the following tools to your AI assistant:

| Tool                    | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `search`                | Search Lithic documentation by keyword              |
| `list-endpoints`        | List all available Lithic API endpoints             |
| `get-endpoint`          | Get detailed information about a specific endpoint  |
| `get-request-body`      | View the request body schema for an endpoint        |
| `get-response-schema`   | View the response schema for an endpoint            |
| `get-code-snippet`      | Get code examples for an endpoint in your language  |
| `execute-request`       | Execute a live API request against the Lithic API   |
| `fetch`                 | Fetch a specific Lithic documentation page by URL   |
| `search-specs`          | Search across the Lithic API OpenAPI specifications |
| `list-security-schemes` | List available authentication methods               |

***

## Configuration Reference

A quick comparison of how each client handles MCP configuration:

| Client             | Config Location               | Setup Method                                 | Notes                            |
| ------------------ | ----------------------------- | -------------------------------------------- | -------------------------------- |
| **Cursor**         | `.cursor/mcp.json`            | JSON config (`mcpServers` > `url`)           | Project or global config         |
| **Claude Code**    | `.mcp.json`                   | JSON config or CLI: `claude mcp add`         | `mcpServers` > `url`             |
| **VS Code**        | `.vscode/mcp.json`            | JSON config (**`servers`** > `url`)          | `type` field required            |
| **Windsurf**       | `mcp_config.json`             | JSON config (`mcpServers` > **`serverUrl`**) | Global config only               |
| **Cline**          | `cline_mcp_settings.json`     | JSON config (`mcpServers` > `url`)           | Supports `alwaysAllow`           |
| **JetBrains**      | Settings > AI Assistant > MCP | UI: Add HTTP server                          | 2025.1+; AI Assistant plugin     |
| **Claude Desktop** | Settings > Connectors         | UI: "Add custom connector"                   | Requires full app restart        |
| **Claude.ai**      | Settings > Connectors         | UI: "Add custom connector"                   | All plans (Free: 1 connector)    |
| **ChatGPT**        | Settings > Apps & Connectors  | UI: "Add new connector"                      | Plus/Pro/Business/Enterprise/Edu |

***

## Frequently Asked Questions

**What is the Lithic MCP server?**

The Lithic MCP server is a hosted service that connects AI code editors and chat apps to the [Lithic Developer API](https://docs.lithic.com) using the [Model Context Protocol](https://modelcontextprotocol.io) standard. It lets your AI assistant search Lithic documentation, explore API endpoints, and execute live API requests from within your editor or chat interface.

**Do I need a Lithic API key to use the MCP server?**

Not for everything. Documentation search, endpoint exploration, and schema inspection all work without an API key. You only need a [Lithic API key](https://docs.lithic.com/docs/authentication) to execute live API requests using the `execute-request` tool.

**Which AI tools support the Lithic MCP server?**

Any tool that supports the Model Context Protocol. This includes [Cursor](https://cursor.com), [Claude Code](https://claude.ai/code), [VS Code with GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview), [Windsurf](https://windsurf.com), [Cline](https://cline.bot), [Claude Desktop](https://claude.ai/download), [Claude.ai](https://claude.ai), and [ChatGPT](https://chatgpt.com). See [Connect Your Editor or Chat App](#connect-your-editor-or-chat-app) for setup instructions.

**Do I need to install anything locally?**

No. The Lithic MCP server is hosted at `https://docs.lithic.com/mcp`. You just add the URL to your editor's MCP configuration. No npm packages, Docker containers, or local server processes required.

**Can I use this with the Lithic Sandbox?**

Yes. Use a [Sandbox API key](https://docs.lithic.com/docs/sandbox) when executing API requests to test against the Lithic Sandbox environment without affecting production data.

**How do I use the Lithic API with AI coding tools?**

Add the Lithic MCP server URL (`https://docs.lithic.com/mcp`) to your editor's MCP configuration. This gives your AI assistant direct access to Lithic's documentation, API endpoint schemas, and the ability to execute API requests. See [Connect Your Editor](#connect-your-editor-or-chat-app) for step-by-step setup instructions for each supported editor.

**What is the Model Context Protocol (MCP)?**

The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard that allows AI assistants to connect to external tools and data sources. It provides a consistent way for code editors like Cursor, VS Code, and Claude Code to integrate with APIs and documentation. The Lithic MCP server implements this protocol so your AI assistant can work with the Lithic API natively.
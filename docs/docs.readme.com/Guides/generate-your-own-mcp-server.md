# Your Project's MCP Server

Enable an MCP server for your API docs so your users' AI tools can read, search, and call your API directly.

Every ReadMe project can have its own MCP server. Once enabled, your users' AI coding assistants can connect to it and instantly understand your entire API — endpoints, schemas, authentication, and documentation — without any manual copy-pasting.

## Enabling Your MCP Server

1. Open your project in ReadMe and enter **Edit Mode**
2. Click **:sparkles: AI** in the top-right corner to open the AI panel
3. Select **MCP** and toggle **MCP Server** on

Your MCP server is now live. Share the URL with your users.

<Image align="center" width="35%" src="https://files.readme.io/f4981199e6757d7c7a64ff259c4c592ab97b8b91f91255804a6a5a8d696fbd9b-mcp_advanced.png" />

***

## Your MCP Server URL

### Standard projects

```
https://your-project.readme.io/mcp
```

### Enterprise: custom domain

If your project uses a custom domain, your MCP server is at the root of that domain:

```
https://your-custom-domain.com/mcp
```

### Enterprise: all projects merged

Enterprise accounts also get a **root MCP server** — a single endpoint that merges all MCP-enabled projects in your organization. This is useful when users work across multiple products or services.

```
https://your-enterprise.readme.io/mcp
```

### Enterprise: filter to one project

If you only want to expose a specific project from your root domain, use the `project` filter:

```
https://your-enterprise.readme.io/mcp?project=project-slug
```

This limits the MCP server to tools and content from that single project only.

***

## URL Parameters

Append these to any MCP URL to customize behavior.

| Parameter | Example           | Description                                                                                                                                                                |
| --------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `branch`  | `?branch=v2.0`    | Connect to a specific version branch instead of the default stable branch. **Note:** Documentation search tools (`search`, `fetch`) are not available when using a branch. |
| `project` | `?project=my-api` | *(Enterprise only)* Limit the root MCP server to a single project.                                                                                                         |

You can combine parameters:

```
https://your-enterprise.readme.io/mcp?project=my-api&branch=v2.0
```

***

## Authentication

Different use cases require different authentication headers. Here's a clear breakdown:

### Public projects — no auth needed

If your project is publicly accessible, no headers are required. Users connect with just the URL.

### Private projects — control who can read your docs

If your project requires a login to view, users must pass an `x-readme-auth` header.

| Access type            | Header          | Value                                     |
| ---------------------- | --------------- | ----------------------------------------- |
| Password protected     | `x-readme-auth` | The site password                         |
| Teammates only         | `x-readme-auth` | `bearer rdme_xxx` (user's ReadMe API key) |
| Custom login (JWT/SSO) | `x-readme-auth` | `bearer rdme_xxx` (user's ReadMe API key) |

**Example config for a password-protected project:**

```json
{
  "mcpServers": {
    "My API": {
      "url": "https://your-project.readme.io/mcp",
      "headers": {
        "x-readme-auth": "your-site-password"
      }
    }
  }
}
```

**Example config for a teammates-only project:**

```json
{
  "mcpServers": {
    "My API": {
      "url": "https://your-project.readme.io/mcp",
      "headers": {
        "x-readme-auth": "bearer rdme_xxxxxxxxxxxx"
      }
    }
  }
}
```

### API execution — authenticate actual API calls

The `execute-request` tool makes live API calls on your user's behalf. Any headers your users include in their MCP config are automatically forwarded to those API calls.

If your API requires an `Authorization` header:

```json
{
  "mcpServers": {
    "My API": {
      "url": "https://your-project.readme.io/mcp",
      "headers": {
        "authorization": "Bearer user-api-key-here"
      }
    }
  }
}
```

Both a private-project header and an API execution header can be combined:

```json
{
  "mcpServers": {
    "My API": {
      "url": "https://your-project.readme.io/mcp",
      "headers": {
        "x-readme-auth": "bearer rdme_xxx",
        "authorization": "Bearer user-api-key-here"
      }
    }
  }
}
```

***

## Available Tools

Your MCP server exposes two categories of tools.

### OpenAPI Tools

These tools are always available and work directly from your OpenAPI specification.

| Tool                    | What it does                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `list-specs`            | Lists all API specs available in the project, with their titles                       |
| `list-endpoints`        | Returns all API paths and HTTP methods with their summaries                           |
| `get-endpoint`          | Returns full detail on a specific endpoint: description, parameters, security         |
| `get-request-body`      | Returns the request body schema for an endpoint                                       |
| `get-response-schema`   | Returns the response schema for a specific endpoint and status code                   |
| `list-security-schemes` | Lists all authentication methods defined in your API spec                             |
| `search-specs`          | Case-insensitive search across all paths, operations, and schemas                     |
| `execute-request`       | Makes a live API call and returns the response. Requires auth headers to be forwarded |
| `get-code-snippet`      | Generates a working code snippet for any endpoint in any programming language         |

### Documentation Tools

These tools require the **AI Booster Pack** add-on.

<Callout icon="📘" theme="info">
  Documentation Tools require the <Anchor label="AI Booster Pack" target="_blank" href="https://readme.com/pricing">AI Booster Pack</Anchor>.

  * **Startup & Business:** upgrade from your **Settings → Manage Plan** page
  * **Enterprise:** contact your Customer Success Manager
</Callout>

| Tool          | What it does                                                                           |
| ------------- | -------------------------------------------------------------------------------------- |
| `search`      | Full-text search across all guide pages. Returns a list of matches with titles and IDs |
| `fetch`       | Returns the full content of a specific guide page by ID                                |
| `update-docs` | Provides AI with instructions on how to update documentation pages                     |

***

## Custom Tools

You can define your own tools — plain-language "functions" that your users' AI assistants can invoke for repeated workflows.

**Examples:**

* A pre-flight checklist before calling a sensitive endpoint
* A validation reminder that checks required headers are set
* A shortcut that combines multiple endpoint calls into a named operation

To add a custom tool, go to **AI → MCP → Custom Tools** in your dashboard and click **New Tool**.

Each custom tool requires:

* **Title** — unique, letters/numbers/underscores/hyphens/dots only
* **Description** — when should the AI use this tool?
* **Body** — the instructions the AI should follow

> Tool titles can't match any of the built-in tool names listed above.

***

## Controlling Which Endpoints Are Exposed

By default, all endpoints in your OpenAPI spec are available through MCP. You can disable specific routes you don't want AI tools to access.

Go to **AI → MCP → Enabled MCP Routes** in your dashboard to toggle individual endpoints on or off.

***

## Generating Setup Instructions for Your Users

Once your MCP server is enabled, click **Generate MCP Template** in the AI panel. This creates a ready-to-publish doc in your Guides that shows your users how to connect their AI tools — pre-filled with your project's MCP URL and step-by-step instructions for Cursor, Claude Desktop, VS Code, and more.

You can find and edit this doc in a category called **MCP SERVER** at the bottom of your Guides.

***

## FAQ

<Accordion title="Can you show different information to different users?" icon="fa-info-circle">
  Not today. The MCP server is all-or-nothing in terms of what gets exposed. There is no way to differentiate between public and private users of the MCP server right now. That said, your own API's authentication can handle scoping at the data level: users supply their own API key, and your backend controls what they have access to based on that. URL-based filtering is on our roadmap.
</Accordion>
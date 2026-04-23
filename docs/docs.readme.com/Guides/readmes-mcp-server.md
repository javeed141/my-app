# ReadMe's MCP Server

Connect your AI tools to ReadMe's MCP server to search, read, and update your documentation through natural language.

ReadMe hosts an MCP server at `https://docs.readme.com/mcp`. Connect your AI coding assistant or agent to this server and you can manage your ReadMe docs — searching pages, reading content, and updating documentation — entirely through your editor or CI pipeline.

***

## Authentication

The ReadMe MCP server has two levels of access depending on what you pass as an auth header.

### No auth — read-only access to public docs

Without any credentials, the AI can search and read ReadMe's public documentation. This is enough for answering questions or exploring how ReadMe works.

### ReadMe API key — full read/write access

To create, update, or manage your ReadMe docs through AI, pass your ReadMe API key as the `authorization` header.

Your API key is in ReadMe under **Account Settings → API Keys** and starts with `rdme_`.

**How to add your API key:**

```json
{
  "mcpServers": {
    "ReadMe MCP": {
      "url": "https://docs.readme.com/mcp",
      "headers": {
        "authorization": "Bearer rdme_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

**For clients that use environment variables** (recommended for security):

```json
{
  "mcpServers": {
    "readmeApi": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://docs.readme.com/mcp",
        "--header",
        "Authorization:${AUTH_HEADER}"
      ],
      "env": {
        "AUTH_HEADER": "Bearer rdme_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

> ⚠️ **Claude Desktop on Windows:** Remove the space after `Authorization:` (use `Authorization:${AUTH_HEADER}` not `Authorization: ${AUTH_HEADER}`) to work around a known Claude Desktop argument-escaping bug.

***

<MCPConnect defaultUrl="https://docs.readme.com/mcp" />

***

## What You Can Do

Once connected with your API key, your AI can:

* **Search** your docs for any topic
* **Read** the full content of any guide page
* **Update** existing pages with new content
* **Create** new documentation pages
* **Manage** your ReadMe project through natural language

See [ReadMe MCP Use Cases](https://docs.readme.com/main/docs/mcp-use-cases-for-technical-writers) for ready-to-use prompts for developers, content writers, and CI pipelines.
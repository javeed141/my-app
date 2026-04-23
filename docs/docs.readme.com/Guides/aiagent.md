# Agent

The Agent is a powerful documentation assistant that helps you create, edit, and enhance content across Guides, API References, and Custom Pages with advanced research and analysis capabilities.

The Agent is a powerful documentation assistant that helps you create, edit, and enhance content across Guides, API References, and Custom Pages with advanced research and analysis capabilities.

## What It Can Do

The Agent provides comprehensive documentation assistance:

* **Content Creation & Editing**: Write, rewrite, translate, and fix grammar with proper markdown formatting
* **Research & Analysis**: Search the web, analyze URLs, and retrieve information from your documentation
* **Smart Components**: Suggest and implement ReadMe's built-in MDX components
* **Multi-step Workflows**: Combine research, analysis, and content creation in a single request
* **Fix Linter Errors**: Resolve syntax errors and warnings according to your configured style guide

## Usage

The Agent excels at complex, multi-step documentation tasks. You can make requests like:

* "Research the latest API design trends and create a guide"
* "Analyze this URL and add key points to our documentation"
* "Find authentication info from our docs and expand this section"

Each chat session maintains full context of your current page and OpenAPI specification files. All conversations are private to your account. Use our auto-selected model or select your own model from the pre-configured list.

## Attachments

You can attach images and files to your message to give the Agent more context. Click **Attach file** in the AI chat input, select your file(s), and you'll see them listed above the message box (you can remove any attachment before sending).

* **Limit**: Up to **5** attachments per message
* **File size**: Up to **18MB** per file
* **Supported file types**: PNG, JPG/JPEG, WebP, GIF, PDF, TXT, Markdown, CSV, JSON, JSONL, HTML

<Image align="center" border={false} src="https://files.readme.io/f678000604c17fb27accb05314a554ec94cf776d81f91701f4ed479db7e6b551-agent_mini.png" />

### Ask About ReadMe

Ask the Agent ReadMe-related questions to quickly navigate our platform as you work on your documentation. It draws from our knowledge base to answer your questions and guide you through features, tools, and best practices.

## Configure

Help the Agent work better for you:

* If certain models aren't compatible with your documentation, disable them in AI Chat settings (<i class="fa-regular fa-solid fa-gear" color="var(--gray80" />).
* To improve Agent responses, index your codebase to provide additional context or add custom content.

<Image align="center" border={false} width="350px" src="https://files.readme.io/5525b67a2ebb59fdfefbdc82f8c8b88f86f6cf3ba9b03c6c5b927d5acb8a499d-agent_settings_2.png" />

<br />

## FAQ

<Accordion title="What language model powers the Agent?" icon="fa-robot">
  The Agent is powered by Claude Opus 4.6, along with other advanced large language models (LLMs) including Google Gemini Pro 2.5 and OpenAI models, providing advanced reasoning and research capabilities.
</Accordion>

<Accordion title="Is my data shared with the language model?" icon="fa-shield-alt">
  Only when you use the Agent feature. If you don't use it, no data is shared. When activated, the current page you're viewing and relevant documentation are included in the prompt sent to the language model to generate a response.
</Accordion>

<Accordion title="Can it access external websites?" icon="fa-globe">
  Yes! The Agent can search the web and analyze URLs to enhance your documentation.
</Accordion>

<Accordion title="How does it access my existing docs?" icon="fa-search">
  It can search through your project documentation and knowledge sources to find and incorporate relevant information.
</Accordion>
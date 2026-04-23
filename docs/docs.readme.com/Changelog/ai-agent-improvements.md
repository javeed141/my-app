# AI Agent Improvements

<Image align="center" src="https://files.readme.io/d5d07bbb480072449d0f32cd9dabf90f159acb690b0aea392129900147b18631-changelog-213.webp" />

The AI Agent now has thumbs up/down response feedback and upgrades to Claude Sonnet 4.5 as the default model. It also gets more reliable page edits with fuzzy matching and automatic retries, plus consolidated thinking steps that collapse reasoning into a single section.

<br />

***

### New Features & Improvements

**AI Agent**

* Added thumbs up/down feedback on AI Agent responses so you can rate the quality of answers.
* Default model upgraded to Claude Sonnet 4.5.
* Thinking steps for reasoning models are now consolidated into a single collapsible section.
* Improved the ability of the AI Agent to apply changes with fuzzy matching.
* Linter now includes accurate line numbers in violation results.

**API Explorer / Docs**

* Accept header, response schema, and response examples now sync together when switching content types.
* New "Auto-fill first request example" setting to optionally prefill request forms with example data.
* "View as Markdown" now expands reusable content and variables.

**Admin**

* Improved localization for Log In/Out, color scheme dropdown, and search modal.

**MCP**

* Custom tool names are now validated for uniqueness across enterprise projects.
* Hidden endpoints are properly excluded from MCP servers.
* Fixed spec filtering errors with `summary` and `description` fields.

<br />

### Bugs Eaten (by Owlbert) 🐛

**Docs**

* Fixed non-latin character page editing.
* Glossary tooltips no longer cause horizontal overflow.
* Recipes with outdated slugs now resolve correctly.
* Emoji now displays properly in the recipes menu.
* Custom redirect rules no longer break with 2-letter path segments.

**AI Agent**

* Fixed performance issue causing lag and crashes during streaming with large content.
* AskAI dropdown no longer disappears when a project is made public.

**API Explorer**

* Fixed scroll on API definition pages.
* Enterprise group editors can now view API definitions.

**Admin**

* Fixed language picker dropdown in compact mode.
* Fixed Appearance tab crash related to recipe display.
* Branch renaming now properly cleans up the old branch.
* Group editors can now edit recipes.
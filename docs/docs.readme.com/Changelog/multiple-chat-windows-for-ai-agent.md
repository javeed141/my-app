# Multiple Chat Windows for AI Agent

<Image align="center" border={false} src="https://files.readme.io/bd44ee0adb71d99ecac9f5edff8fb9368c341c8844136e6ee59d17ddf6d41883-multi-chat.webp" />

This release brings a major upgrade to the AI Agent with support for multiple chat windows, allowing you to keep different conversation contexts open simultaneously. We’ve also added support for multiple Git connections, giving you more flexibility in how you sync your docs.

<br />

***

### New Features & Improvements

**Admin**

* Improved keyword search within the admin UI.
* Enhanced validation for MCP tool titles and improved the saving process on the Teammates page.
* Added support for multiple Git connections.

**Docs**

* Updated and refined the visual theming for dark mode.

**Editor**

* Editor blocks now display a preview while being dragged, making layout changes easier.
* Improved error messages when using an invalid OAS security scheme.
* You can now revert changes to Recipes, API Reference pages, and OAS files directly during the review process.
* New changelog posts are now created as hidden by default and will clearly indicate their hidden status in view mode.
* Added support for Font Awesome brand icons.

**Translations**

* Added support for translating Changelog posts.

<br />

### Bugs Eaten (by Owlbert) 🐛

**Admin**

* Fixed a bug that created duplicate endpoints when creating new endpoint pages.
* Fixed an issue where downgrading plans could prevent projects from being published.
* Resolved an issue with the password field on password-protected docs.
* Fixed a bug where the dark mode logo would not update properly after migrating from legacy projects.

**AI Agent**

* Fixed an issue where the agent failed if content contained extremely long URLs.
* Fixed a bug where the AI Dropdown remained enabled if a project became private.
* Fixed an issue where the Agent did not correctly recognize Components as valid MDX.
* Resolved visibility issues with the model selection dropdown.

**Docs**

* Fixed issues where enums would auto-populate even if not required, and single-enum boolean values could default to disallowed values.
* Fixed a bug where copying Markdown for LLMs would include the API definition twice.
* Fixed a broken link issue where "View as Markdown" could result in a 404 error.
* Fixed an issue where search appeared twice on mobile views and icons appeared even when disabled.
* Fixed a text wrapping issue with `x-enumDescriptions` in Safari and a display issue with `oneOf` options.
* Fixed an issue where the changelog feed would not update instantly for all users.

**Docs Audit**

* Fixed an issue where audit links could lead to a 404.
* Fixed an issue with sorting pages by the number of broken links.

**Doc Metrics**

* Fixed an issue with invalid URLs for pages on branches.
* Fixed a bug that inadvertently showed a paywall when not needed.

**Editor**

* Fixed an issue where duplicating pages did not copy the visibility setting.
* Fixed an issue where missing OAS `mappings` caused other schemas to be ignored.
* Fixed errors when uploading OAS files with invalid filenames.
* Fixed an issue where it was difficult to place the cursor before the first character in the editor.
* Fixed an issue where certain menus were difficult to access.
* Fixed bugs related to creating second-level nested pages and nesting links with the same name/URL.
* Fixed an issue where Reusable Content overlapped the editor footer.

**Translations**

* Fixed an issue where the `lang` property was not being set to the correct language code.

<br />
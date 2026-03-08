# Bug Fixes & Improvements

### New Features & Improvements

**API Designer**

* Added the ability to autogenerate Response Schema from an Example Response.

**Bidirectional Sync**

* Allowed users to remove their Bidirectional sync connection entirely.

### Bugs Eaten (by Owlbert) 🐛

**Search**

* Fixed an issue where the wrong phrase was sometimes highlighted in search results.
* Fixed an issue where the search API for Enterprise projects on Refactored was returning 500 errors.

**MDX**

* Prevented the page from being saved if it contains invalid MDX syntax.

**Editor Permissions**

* Fixed an issue where editors viewing the synced repository information would be switched from edit to view mode.

**Docs Audit**

* Fixed an issue where multiple docs audits could be accidentally started at the same time.

**API Designer**

* Added warnings to the API Designer for OpenAPI features that aren't currently supported.
* anyOf and oneOf objects with defaults set will properly render in the API Reference section.
* After syncing an OAS file, the URL used will be remembered for subsequent resyncs.

**API Reference**

* Fixed an issue with API Reference pages not being indexed by search engines by default.
* Fixed an issue where Node code samples were defaulting to `fetch` instead of the `api` module.

**a11y**

* Several accessibility improvements including:
  * Fixed Header search state that wasn’t visible on very dark backgrounds for the solid theme.
  * Added a missing label to the search dialog.
  * Added missing labels to discussion inputs.
  * Fixed the Jump To and Header buttons not refocusing after closing their respective modals.
  * Added missing aria-expanded props in API Reference.
  * Removed duplicate IDs from API Reference.
  * Fixed an inaccessible tooltip in API Reference auth.
  * Added aria-pressed state for the language picker.
  * Fixed missing labels on feedback buttons.
  * Fixed missing labels on close buttons on all modals.
  * All tooltips now close when pressing the escape key.

**MCP**

* Fixed an issue where enabling MCP for specific endpoints didn't work if the OAS file was missing operationIds.

**AI Agent**

* Improved loading state and streaming for AI Agent responses.

**llms.txt**

* Fixed an issue where the generated URL for enterprise projects was incorrect.

**Sitemap.xml**

* Fixed an issue where custom pages had the wrong URL in the generated sitemap.

**Guides**

* Fixed an issue printing pages that are more than one page long.
# API Designer Improvements

<br />

<Image align="center" border={false} src="https://files.readme.io/aed03c328a1815b8feafe94e10b852dabda34e5f4adedaa113f2e9ed0c99699d-dragdrop.webp" />

The API Designer is now more powerful and easier to use. You can rearrange parameters with a simple drag-and-drop, while also defining more complex and accurate APIs. We've recently introduced fully editable response schemas; added support for advanced structures like arrays, objects in query parameters, and json types; and improved how we render enums.

***

<br />

### New Features & Improvements

**Admin**

* Added a new keyboard shortcut (Ctrl + J) to open the admin navigation menu

**Docs**

* Open Graph images now use your project’s color scheme
* Improved the heading and section hierarchy in API References for better readability

**MCP**

* Added support for custom tools to be used in your MCP server

**Owlbot AI**

* Improved indexing reliability for more accurate and timely results
* Increased context limits by 400% to better support larger documentation sets

<br />

### Bugs Eaten (by Owlbert) 🐛

**Admin**

* Fixed an issue with relative links not working correctly
* Fixed a bug that occurred when navigating to the Recipes page and switching to edit mode
* Fixed an issue with editing endpoint pages after deleting their definition
* Resolved an issue where owners of Enterprise projects with staging enabled were not receiving emails when end users requested access
* Fixed an issue with changing header styles for some enterprise customers
* Fixed a bug where switching to the "Edit" tab would incorrectly reset page navigation
* Fixed an issue where notifications were not appearing in view mode

**AI Agent**

* Fixed a bug with the Agent sometimes showing an incorrect diff
* Fixed an issue where the chat input would not display the full content
* Fixed an issue with the Agent failing to edit empty pages

**Branches**

* Fixed an issue where merging branches could cause a white screen

**Docs**

* Fixed issues with navigating to custom pages and to specific headings within a page
* Fixed display issues with enums in API References
* Fixed an issue where duplicate boolean values could appear in parameters
* Fixed an issue where date parameters could have slightly different formats
* Fixed an issue where example.com would be displayed when specs were invalid
* Fixed an issue with the response UI handling a large number of examples
* Fixed an issue where custom footers on Recipe pages were not displaying properly

**Editor**

* Fixed an issue with the Raw Markdown toggle not working as intended
* Fixed an issue with the `Make Reusable` and `Copy` actions
* Fixed an issue where notifications could block editor actions
* Fixed an issue with inline links in table cells
* Fixed an issue where the editor would lose focus after saving
* Changing the slug of an endpoint page will no longer show an error message on success

**MCP**

* Fixed a compatibility issue with MCP inspector tools

**Search**

* Fixed search issues within password-protected and specific Enterprise project configurations

<br />
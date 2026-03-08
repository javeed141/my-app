# Keyboard Shortcuts

<Image align="center" src="https://files.readme.io/cfbf7f2b292db00f7817a0cbcd8527af70d882546072f7dbe15b5ec6f56caaf8-hotkeys_1.webp" />

Keyboard shortcuts make using ReadMe easier and faster for power users. We’ve added a new set of navigation shortcuts to make ReadMe easier to use:

* `⌃1` / `⌃2`: Open the View and Edit pages
* `⌃,`: Open admin settings
* `⌃i`/ `^b`/ `^m`: Toggle AI, Branches, My Developers
* `alt+1` / `alt+2` / `alt+3` / `alt+4` / `alt+5`: Navigate to Guides, Recipes, Reference, Changelog, and Custom Pages

***

### New Features & Improvements

**Admin**

* Improved loading times for projects without Custom CSS/JS
* Added support for rotating JWT secrets
* Improved performance when saving pages

**API Designer**

* Added support for `number` and `json` types
* Added support for editing enums

**API Reference**

* Improved readability of API methods

**MCP Server**

* Added support for returning code snippets

**Search**

* Increased the number search results returned

<br />

### Bugs Eaten (by Owlbert) 🐛

**Admin**

* Fixed an issue where entering invalid redirect rules would not display an error
* Improved error handling when navigating to a version or branch that doesn’t exist
* Fixed an issue with notifications failed to appear when exporting content
* Fixed an issue that could cause saving to fail when editing a page
* Fixed an issue where the editor could crash

**AI Agent**

* Fixed an issue where the AI Agent could fail to process requests
* Fixed an issue where diffs were not being displayed correctly

**API Reference**

* Fixed an issue where request code snippets did not use the correct theme in light mode

**Docs**

* Fixed an issue with the page not scrolling to the top when navigating
* Fixed an issue with embedding docs as an iframe
* Fixed an issue on legacy projects with viewing pages as Markdown showing mismatched content
* Fixed an issue where endpoint pages were not appearing in search results
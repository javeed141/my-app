# Collapsible Categories

<Image align="center" src="https://files.readme.io/9eec45802e5cda7655a1e211de746f3c80dabcda40611257233328a979b50a07-Changelog-2272026_1.webp" />

Your sidebar got a refresh with improved spacing, font weights, accessibility, and visual hierarchy. We've also added collapsible sidebar categories so your users can control navigation density.

Find the option in **Admin Settings** → **Page Settings**

<br />

***

### New Features & Improvements

**Docs**

* Recipe embeds are now available on API reference pages.
* Autofilling of API endpoint details in Recipes is now supported for all projects.

**AI Agent**

* Improved the AI Agent’s ability to maintain fresh context.

**MCP**

* MCP server data now includes schema filenames for better tool context.
* Added compression to the MCP project cache, supporting larger API schemas.

**Performance**

* Significantly reduced large-project Git sync times.

<br />

### Bugs Eaten (by Owlbert) 🐛

**API Explorer**

* Fixed a race condition that caused newly added items in polymorphic array fields to flicker and disappear.
* Eliminated UI flicker when opening accordions in the API Explorer.
* Fixed API reference rendering errors when OAS specs place non-schema objects under `components/schemas`.
* Fixed long enum values breaking the parameter card layout.
* Fixed the API Explorer scrambling parameter order when editing form fields.
* Fixed a crash when navigating between API reference pages with circular schema references.
* Fixed curl code snippets using `--data` instead of `--data-urlencode` for form data requests.

**Docs**

* Prevented `.md` file URLs from appearing in Google search results.
* Fixed `target="_blank"` links incorrectly opening in the same tab when viewing projects with custom JS/CSS.
* Fixed a 404 error when switching API versions from the dropdown on custom pages.
* Fixed custom CSS variables leaking from docs into the admin UI.
* Search results now properly interpolate user-specific variables instead of displaying raw variable syntax.
* Fixed various markdown rendering bugs via engine upgrade.

**Editor**

* Improved handling of non-conventional variable names in the MDX editor autocomplete.
* Fixed light-on-light text contrast in the MDX editor's JSX code blocks.

**AI Agent**

* Fixed AI chat slowdown caused by unnecessary re-renders during streaming.
* Fixed the AI Agent displaying the wrong page title during the first edit operation.
* Fixed AI Agent page editing failing when not currently viewing the target page.
* Fixed the AI Agent not including page context in responses.

**Admin**

* Fixed 500 errors when branch review report scores were null.
* Fixed "last updated" timestamps for branches not reflecting external bi-directional sync changes.
* Fixed auth token refresh during long-running bi-directional syncs.
* Added safeguards to prevent branches from being incorrectly deleted during bi-directional sync.
* Fixed 500 errors when reviewing branches with malformed frontmatter.
* Doubled the request body size limit for large OpenAPI definitions.
* Empty commits are no longer created when content is saved without changes.

**MCP**

* Fixed MCP cache failures blocking server connections.
* Fixed MCP schemas with identical titles being indistinguishable.

**Translations**

* Fixed the compact theme language picker not displaying native language names.
* Updated localization strings with professionally translated versions.

<br />
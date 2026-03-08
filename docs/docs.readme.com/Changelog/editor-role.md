# Editor Role

<Image align="center" alt="ReadMe’s Enterprise Dashboard on the Projects page with a merge access menu open" src="https://files.readme.io/48522fa2ad2d336e08c75ed60aa11375fa99e1c8c00cdf6a2f43f6a176ec9e2e-editors_1.webp" />

We’ve added a new [Editor role](https://docs.readme.com/main/docs/manage-team) available for all Enterprise customers. Editors can edit content, but won’t have access to any project settings. Users can also decide if editors will have limited access to merging.

***

### New Features & Improvements

**AI Agent**

* Rewrote the AI Agent for a significant improvement in reliability

**API Designer**

* Request body schemas on endpoints with non-`POST`/`PUT`/`PATCH` methods are now editable
* Users can now add and edit XML response examples

**API Reference**

* Long parameter names in the API schema will wrap instead of truncating so users can see the entire name without hovering

**Branches**

* Added a link to view the branch in GitHub
* Added an option to delete branches after merging

**Enterprise**

* Enterprise customers migrating to Refactored will be able to see their migration status on the Enterprise Dashboard

**Performance**

* Improvements to response times when navigating between pages

<br />

### Bugs Eaten (by Owlbert) 🐛

**API Designer**

* Fixed an issue where updating endpoints would not be reflected in the sidebar until a save

**API Reference**

* Fixed an issue where some OpenAPI specs would not load
* Fixed an issue on legacy projects where code snippets would show `@api/undefined`

**Ask AI (for LLMs)**

* Fixed an issue where **View as Markdown** wasn’t working for endpoint pages that weren’t connected to an API definition

**Changelog**

* Fixed accessibility issues with repeating `<main />` elements, `id`s and `h1`s

**Docs**

* Fixed an issue with inconsistent spacing on Custom Pages, Discussions, and the Changelog
* Fixed an issue when navigating to a page with a hash beginning with a number
* Fixed an issue where search would not filter to the current version of the docs by default

**Editor**

* Fixed an issue where hovering over an image would cause the page to think the editor was in a dirty state
* Fixed an issue when navigating to pages with a hash would not scroll to the target id
* Fixed an issue where having non-endpoint reference pages in What’s Next links would prevent page saves

**My Developers**

* Fixed an issue with testing webhook configurations

**Recipes**

* Fixed an issue where Recipe actions were not focusable when editing

**Suggested Edits**

* Fixed an issue where Suggested Edits would not populate in the admin UI
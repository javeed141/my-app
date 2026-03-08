# Ask AI & llms.txt

<Image align="center" src="https://files.readme.io/a870eab176fa246b757b8c35a4561ee95294b252e9b8bba11ef97efe9a8583c0-llms.webp" />

We’ve added a few new features to allow your docs to be discovered and integrated with AI tools.

* We’ve added support for [llms.txt](https://llmstxt.org/) so documentation can be read and understood by LLMs. You can see an example on our project at [https://docs.readme.com/main/llms.txt](https://docs.readme.com/main/llms.txt). This is enabled via a new setting in the AI dropdown on Refactored projects.
* Every page can also be accessed in plaintext markdown by adding `.md` to the end of the URL. For example, you can do that on this Changelog post: [https://docs.readme.com/main/changelog/ask-ai-llms-txt.md](https://docs.readme.com/main/changelog/ask-ai-llms-txt.md).
* We’ve also added a new setting to enable an “Ask AI” button on your documentation pages. This will let a user ask their favorite AI tool questions about the contents of any page.

### New Features & Improvements

* **Reusable Content**: Added support for saving Reusable Content and Custom Components with the cmd/ctrl+s keyboard shortcut
* **Sidebar**: Improved spacing and UI of the sidebar while also adding new CSS variables to allow for easier customization <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Styling**:
  * Added a new look for the Line navigation theme. Existing projects will have an option to upgrade to the new design in the Appearance section <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Allowed users to collapse the sidebar in the documentation <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Redesigned admin UI navigation for Refactored to consolidate settings <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Added filter in the new settings UI to make them easier to locate <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API**:
  * Added new API endpoints for creating, editing, and deleting Categories <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Added new API endpoints for editing and deleting Changelog posts <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

### 🐛 Bugs Eaten (by Owlbert)

* **Editor**:
  * Fixed an issue with characters being escaped unnecessarily on save
  * Fixed a crash when a JSX element was placed within a markdown list
  * Fixed a crash when typing `www.`
  * Fixed inserting links to the Reference section via the linking UI <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Fixed the toolbar not always appearing when text is highlighted
* **MDX**: Improved error messages when saving invalid MDX <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Reference**:
  * Improved performance syncing OpenAPI files with large amounts of circular references
  * Fixed an issue where OpenAPI files with symbols in the filename weren’t being encoded correctly and causing errors <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Fixed an issue where viewing a non-endpoint page in the Reference section would show the wrong section in the navigation
* **Styling**:
  * Fixed an issue where long unbroken code samples would cause the documentation site to have a horizontal scrollbar <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Fixed flashing of the sidebar when the page history panel is also open <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Recipes**:
  * Fixed an issue where saving a Recipe with a code sample without any content would result in a 500 error <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Fixed an issue preventing Recipes from rendering properly when embedded in a Documentation page <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Styling**:
  * Improved the styling of our dark mode syntax highlighting theme <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Fixed horizontal scrolling on the My Requests page on smaller screen sizes
* **My Requests**:
  * Fixed the link for “See All Requests” for enterprise projects
  * Fixed an issue making the My Requests page public <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Search**:
  * Fixed an issue where search was returning no results on specific Enterprise projects <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
  * Fixed an issue where some page content wasn’t being indexed for search properly
* **Discussions**: Fixed the link in the notification email when a new discussion post is submitted

<br />

***

<small style={{ display: 'table', opacity: 0.75, margin: '1em auto 0' }}><a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.</small>
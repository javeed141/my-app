# Ask AI for API References

<Image align="center" src="https://files.readme.io/7fec1058d55c25928fd331b9b869c78a5ddfda45aa0750cdfa61bc418068a6e7-Changelog_5.webp" />

We’ve added support for Ask AI on the API Reference pages, an option to ask Copilot, and it now remembers your last used option.

***

### New Features & Improvements

**Performance**

* Search indexing was improved for better performance.
* Refactored how we generate metadata to improve time to first byte performance. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Significant reductions to our initial bundle sizes (at least 25%).
* Immutable assets will be cached for longer.

**API Reference**

* Added support for arrays of objects in API Designer. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Added an option to make the `/openapi` path public. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Reordering endpoints and pages will now persist after resyncing.

**Admin**

* Added an option to hide icons used in the header. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Added an option to export content. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

***

### Bugs Eaten (by Owlbert) 🐛

**Admin**

* Fixed an issue where logging out from Settings was not working. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where Business plan customers were unable to edit footers. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where the current active state for navigation didn’t persist when switching between edit and view modes—while using the tab navigation. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

**Versions**

* Fixed an issue where starting a version with an extra `v` could cause issues. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where very long version names could break the create version UI. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

**API Reference**

* Fixed an issue where Getting Started, Authentication, and My Requests pages could appear out of order.
* Fixed an issue with rendering some API Reference pages.
* Fixed an issue where `x-readme-id` was being saved to OAS files when using the API Designer. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where the delete parameter dropdown would stick around longer than it should. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where the request examples menu overflow was not triggering scroll.

**Editor**

* Fixed an issue with creating links to API Reference.
* Fixed an issue where changing the page slug would result in an error—even though the change was saved successfully.
* Fixed an issue with Recipe Tiles not working in Reusable Content.
* Fixed an issue where Components was not accessible to Startup plans. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where the page could crash when clicking on a Glossary term.
* Fixed an issue where emojis that are the first character in a title would appear saturated in the editor in Chrome. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where an empty table cell could crash the page.
* Fixed an issue where pages with MDX errors could trigger a 404 error. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Changed when max-width on image size is set to prevent inadvertently sizing them at `1px`.
* Fixed an issue where you couldn’t edit Reusable Content after there’s been a rendering error.
* Components will now proactively display an error when creating an incorrectly named component. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

**Recipes**

* Fixed an issue where users couldn’t save Recipes without an emoji avatar.

**Enterprise**

* Fixed an issue where switching versions on child projects would navigate you to the landing page instead of the same page on the switched version.

**Documentation**

* Fixed an issue where pages could scroll horizontally. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where the Thumbs Down vote was not working.

<br />

***

<small style={{ display: 'table', opacity: 0.75, margin: '1em auto 0' }}><a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.</small>
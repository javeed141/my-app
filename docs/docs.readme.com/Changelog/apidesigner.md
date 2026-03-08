# API Designer

<Image align="center" src="https://files.readme.io/561606f2d54150470c2e742f069bc6a4fbba0a2ad3ef0b8171833c361230c78a-apidesigner.webp" />

Customers who have migrated to ReadMe Refactored now have access to the new API Designer. The new API Designer is easier to use, and outputs OAS files that can automatically sync to your GitHub repo.

***

<a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.

### New Features & Improvements

* **Editor**: The sidebar has be rewritten with significant improvements to performance
* **Editor**: Improved performance on projects with a large number of pages in the "What’s next" block and `[page selector]`
* **Owlbot**: Improved performance when typing
* **API Reference**: Added support for `maxItems` and `minItems`

### 🐛 Bugs Eaten (by Owlbert)

* **Editor**: Fixed an issue where code blocks content would overlap with line numbers
* **Editor**: Fixed an issue where users couldn’t save MDX components <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Editor**: Fixed an issue where the changelogs would sometimes crash <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Editor**: Fixed an issue where deleting the last Reusable Content could cause the page to crash <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Editor**: Fixed an issue with adding Recipes to a page <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Docs**: Fixed an issue where empty states would appear momentarily while loading <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **ReadMe Refactored**: Fixed a potential display issue with the welcome modal <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **SEO**: Fixed an issue in Enterprise projects where the incorrect robots.txt file was being used
* **Suggested Edits**: Fixed an issue where Suggested Edits would crash on a page with Reusable Content <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Admins**: Fixed an issue where some projects were unable to be bookmarked

<HTMLBlock>
  {`
  <style>
    .badge {
      background: linear-gradient(160deg, #000, rgba(89,75,159,0.75) 50%) black;
      border-radius: 0.5em;
      color: white;
      display: inline-block;
      font-family: var(--font-family-mono);
      font-size: 10px;
      font-weight: var(--font-weight-bold);
      letter-spacing: -0.025em;
      padding: 0.15em 0.4em;
      position: relative;
      text-decoration: none !important;
      top: -0.15em;
    }
    .badge:hover,
    .badge:active,
    .badge:focus {
    	color: white;
      text-decoration: underline !important;
    }
  </style>
  `}
</HTMLBlock>
# View My Developers Alongside Documentation

<Image align="center" src="https://files.readme.io/1871148a2a5819b6fb8ec404f2980ed782c4b242195097e3af0f0239686e7bcb-My_Developers.png" />

When looking at data in My Developers for a specific endpoint, it can be helpful to view the documentation for that endpoint to provide additional context. In ReadMe Refactored we now have a way to collapse the My Developers panel, showing the data and the documentation side by side.

***

<br />

<a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.

### New Features & Improvements

* **Admin Panel**: Add help button to more easily contact our support team <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Changelog**: Highlight Changelog pages containing invalid MDX <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Reference**: OAS files that are YAML can now be synced for Refactored projects <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

### 🐛 Bugs Eaten (by Owlbert)

* **Search**: Removed unnecessary API calls during search <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Recipes**: Fixed recipe embeds in the Guides section <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Recipes**: Fixed directly linking to a specific Recipe <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Sidebar**: Fixed an issue preventing pages from being moved between levels of nesting <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Reusable Content**: Fixed an issue where reuseable content wasn’t being rendered in the reference section
* **Editor**: Fixed an issue where we were showing incorrect validation errors <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Editor**: Fixed an issue where content inside of Style tags was getting parsed as Markdown
* **Sidebar**: Fixed an issue where collapsing or expanding a section in the sidebar would lose scroll position
* **Editor**: Fixed padding around Glossary items in the editor
* **Sidebar**: Improve performance of long sidebar pages <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Sidebar**: Fixed hidden pages incorrectly showing up when nested at the max level <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Editor**: Fixed an issue inserting HTML into table cells in Markdown
* **API Designer**: Disabling the API Designer will correctly disable editing the server URL and security schemes <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

<br />

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
        
        &:hover,
        &:active,
        &:focus {
          color: white;
          text-decoration: underline !important;
        }
      }
    </style>
  `}
</HTMLBlock>
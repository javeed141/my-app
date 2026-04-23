# Bug Fixes & Improvements

<a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.

### New Features & Improvements

* **Personalized Docs**: Ability to test Webhook configuration for personalized docs <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Designer**: Improved clarity on how to add a path parameter <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Recipes**: Recipes will now be included when cloning a project
* **Documentation**: Surface both Guides and API Reference pages when adding a page to the “What’s Next” section <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Reference**: Improved OAuth support in the API Reference section when scopes aren’t defined

### 🐛 Bugs Eaten (by Owlbert)

* **Editor**: Fixed an issue where HTML inside of a table cell was rendering incorrectly
* **Documentation**: Fixed links in pages resulting in a redirect getting caught in an infinite loop
* **API Designer**: Fixed an issue where editing the request body sometimes broke other parameters <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Designer**: Fixed an issue where projects using \{version} in the legacy manual API editor had an error during the migration to Refactored <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Search**: Fixed an issue where specific search terms could cause the page to crash <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Search**: Improved search response times <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Owlbot**: Fixed an issue where pages nested three levels weren’t indexed by Owlbot
* **Developer Dashboard**: Fixed the styling of the warning about hitting the monthly limit in Developer Dashboard <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

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
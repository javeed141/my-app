# Build and Use Custom Components With MDX

<Image align="center" src="https://files.readme.io/b4349fb219981aea70e54b9fab8c7e51c37b6bec6953ace33216c24abf3d81e2-mdx.png" />

Projects using ReadMe Refactored can now build their own custom components with MDX and easily style them with Tailwind. These components can be used anywhere in the documentation and can be used for all kinds of interactive widgets. We have a [GitHub repository](https://github.com/readmeio/marketplace/tree/main) with example components that you can use in your docs or as a start for your own. We’re super excited to see what you build! [🧩 Building Custom MDX Components](https://docs.readme.com/main/docs/building-custom-mdx-components#/)

<a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.

### New Features & Improvements

* **Versions**: Added a new version creation flow to the Refactored interface <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API**: Added an API endpoint for projects on Refactored to delete a synced OpenAPI file  <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **GitHub Sync**: Improved UX for initially syncing a repo when setting up GitHub Sync
* **Accessibility**: Added aria-labels to the sidebar and navigation

### 🐛 Bugs Eaten (by Owlbert)

* **API Reference**: Fixed issues with data not loading correctly when navigatign around the reference section <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Reference**: Fixed an issue where code samples using our `api` module weren’t being generated correctly <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Reference**: Fixed an issue preventing Windows users from being able to upload YAML OpenAPI Specs <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Changelog**: Fixed an issue where saving changelog posts sometimes returned an error message even for successful saves <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Changelog**: Fixed spacing for the author byline <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Versions**: Better error messages when attempting to create a version with an invalid name <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Custom Footer**: Fixed an issue updating the custom footer <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Documentation**: Fixed an issue where the page would crash when navigating between sections containing specific types of content <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Editor**: Fixed an issue with copying content with newlines in tables cells
* **Enterprise**: Fixed styling issues on the Enterprise list of projects page
* **Custom Pages**: Fixed code blocks on custom pages not updating to dark mode properly <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Designer**: Fixed an issue where pages were marked as having unsaved changes erroneously
* **Recipes**: Fixed an issue where on page load the code snippet would overlap with the line numbers
* **Sitemap**: Fixed an issue where the sitemap sometimes has stale content <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

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
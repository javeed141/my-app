# GitHub Copilot Support with Owlbot

<Image align="center" src="https://files.readme.io/703d1a9ed5de93d5f47ccfe577120ac0d723d49e1fd56b950e720423496c0065-Changelog_1.png" />

All of our [Owlbot](https://readme.com/ai) customers will now be able to configure a [Copilot extension](https://github.com/features/copilot/extensions) that interacts with their documentation. By setting up your own Copilot extension, your users will be able to install it directly in their IDE so they can ask questions right where they are working.

***

<a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.

### New Features & Improvements

* **Custom Variables**: Add a link to setting custom variables in Personalized Docs <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **MDX**: Improved the editing experience for mdx in the editor <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Documentation**: Improved clearing cache after updating content resulting in changes showing up much quicker to end users <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Accessibility**: Accessibility fixes to search, what’s next, and landing page
* **Accessibility**: Accessibility fixes to the Getting Started, Authentication, and My Request pages
* **Auth**: New users verifying their emails for the SAML login flow will be properly redirected back to the original page
* **Personalized Docs**: Add support for setting up Personalized Docs with AWS
* **Documentation Metrics**: Added link to Documentation Metrics in Refactored projects <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **MDX**: UI improvements to how we surface pages with MDX error in Refactored projects <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

### 🐛 Bugs Eaten (by Owlbert)

* **API Reference**: Properly support `nullable: false` in the Reference section
* **Recipes**: Fixed for recipes containing specific markdown characters <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **API Reference**: Fixed an error when uploading OAS failed due to a missing category error <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Realtime**: Fixed issue where our generated Getting Started & Authentication pages appeared in incorrect places in the sidebar <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **SEO**: Fixed issue where nested pages weren’t appearing in the sitemap
* **Documentation/Editor**: Fixed scroll position being incorrect when switching between View and Edit mode on some pages <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Versions**: Fixed renaming versions on Refactored projects <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Documentation**: Fixed issue where pages with long slugs would 404 in Refactored projects <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Suggested Edits**: Fixed issue where pages with a missing excerpt were unable to have suggested edits
* **Security**: XSRF cookies should now have the `secure` attribute
* **Owlbot**: Fixed UI issues when question wrapped to multiple lines

<br />

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
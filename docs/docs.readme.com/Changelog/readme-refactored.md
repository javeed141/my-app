# ReadMe Refactored

Over the past year, we’ve been reimagining, reinventing and refactoring every single part of ReadMe. And now, it’s here! New updates include a new editing UI, MDX components, syncing with GitHub, My Developers, and more. [Read our blog](https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/) and [docs](https://docs.readme.com/main/docs/mdx) for more details.

<HTMLBlock>
  {`
  <div class="Features_github">
    <div class="Features-card_github">
      <div class="Features-card-container">
      <h3 class="Features-heading">New Editing UI</h3>
  	  <img 
           class="Features-img" src="https://files.readme.io/0dd234acee6e3deb83051268a4d539b458d3b0c0dcb775c99f726ec6d4486d67-Getting_Started-20241120-1816422x.png" />
      </div>
    	<div class="Features-card-container">
      <h3 class="Features-heading">Sync with GitHub</h3>
  	  <img class="Features-img" src="https://files.readme.io/f6efed8cd050a27f5d05b5f373247ce545ff84b4e2ecfcd5e07f063d996cbd3d-Getting_Started-20241120-1817302x.png" />
      </div>
    </div>
  </div>
  `}
</HTMLBlock>

<br />

<HTMLBlock>
  {`
  <style>
    .Features_github {
      display: grid;
      gap: 1em;
      grid-template-columns: 1fr;
    }
      
    .Features-heading {
      color: white;
      margin: 0.15em 0 1em !important;
    }
      
    .Features-img {
      border-radius: 0.25em;
      height: auto;
      width: 500px;
    }
      
    .Features-card_github {
      background: black;
      border: 1px solid  var(--color-border-default);
      border-radius: 0.5em;
      display: flex;
      gap: 1em;
      justify-content: center;
      overflow: hidden;
      padding: 0 1em;
    }
      
    .Features-card-container {
      padding: 1em 0;
    }
      
    .Features-card-container:first-child {
      border-right: 1px solid rgba(255,255,255,0.15);
      padding-right: 1em;
    }
  </style>
  `}
</HTMLBlock>

It’s now easier to see changes as you make them with Site Navigation, Appearance, Custom CSS, and more appearing as you edit. And now you can sync content changes, including Guides, OAS files, References, Recipes, and Custom Pages with GitHub.

### MDX & New Editor Blocks

<HTMLBlock>
  {`
  <div class="Features_mdx">
    <div class="Features-card_mdx">
  	  <img src="https://files.readme.io/d41f9c213a74c0bf3d75c7b0cdcedfe3d3fcc9a38ca1dbd910724bc9ae7ed7ce-Getting_Started_with_wcag2aa-20241120-1728092x.png" />
    </div>
    <div class="Features-card_mdx">
  	  <img src="https://files.readme.io/e2a6c4012a6788befc4641a2e69ae27f4b6e0c6833fcc88e1fd8bda5022ee039-Getting_Started_with_wcag2aa-20241120-1716192x.png" />
    </div>
  </div>
  `}
</HTMLBlock>

<br />

<HTMLBlock>
  {`
  <style>
    .Features_mdx {
      display: grid;
      gap: 1em;
      grid-template-columns: repeat(2, 1fr);
    }
      
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
      
    .Features-img {
      height: auto;
      width: 300px;
    }
      
    .Features-card_mdx {
      align-items: center;
      background: white;
      border: 1px solid  var(--color-border-default);
      border-radius: 0.5em;
      display: flex;
      justify-content: center;
      overflow: hidden;
      padding: 1em;
    }
  </style>
  `}
</HTMLBlock>

We've added support for MDX and new editor components, including columns, tabs, accordions, and Mermaid. [Read the docs](https://docs.readme.com/main/docs/mdx)

<br />

***

<br />

<a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a> Some improvements are only available once your project has been upgraded.

### New Features & Improvements

* **My Developers**: The new My Developers helps you learn how developers interact with your API and reach out to them if they get stuck. <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* **Page History**: Changes in page history now show the difference between each change, instead of comparing to what’s live <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>

### 🐛 Bugs Eaten (by Owlbert)

* **Developer Dashboard**: Fixed an issue with our webhook testing flow
* **Developer Dashboard**: Fixed an issue with fresh data not appearing right away after setting up
* **Custom HTML**: Fixed an issue where footer HTML wasn’t appearing in all pages
* **Editor**: Fixed an issue with performance when working with a large amount of pages
* **Accessibility**: Fixed various accessibility issues with missing labels and color contrast
* **Admin Menu**: Fixed an issue with icon consistency

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
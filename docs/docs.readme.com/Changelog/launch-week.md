# Launch Week

<HTMLBlock>
  {`
  <div class="CoolGrid">
  <a class="CoolImageCard" href="https://www.postman.com/product/integrations/readme/">
    <div class="CoolImageCard-card">
  		<img alt="" class="CoolImageCard-image" src="https://files.readme.io/ec3b28e22146f67189a64ded122294ad5fd4a1c9da353a1a7097b355d28a5c61-postman-area51.webp" height="200" />
    </div>
    <div class="CoolImageCard-container">
      <span class="CoolImageCard-container-header">
        Postman Integration
  			<i aria-hidden="true" class="fa-regular fa-arrow-right CoolImageCard-container-header-icon"></i>
      </span>
  		<span class="CoolImageCard-container-text">We’ve added the ability to have a "Run in Postman" button in your docs, so your developers can access Postman Collections quickly.</span>
  	</div>
  </a>

  <a class="CoolImageCard" href="https://docs.readme.com/main/docs/readme-mcp-turbocharge-your-api-for-ai-assistants">
    <div class="CoolImageCard-card">
  		<img alt="" class="CoolImageCard-image" height="200" src="https://files.readme.io/8964ba03e44bbec55b987ed9d5a8e5178c7d2369f3392e3ccc93d6bff5870939-Launch_Week-20250628-1053352x_3.webp" />
    </div>
    <div class="CoolImageCard-container">
      <span class="CoolImageCard-container-header">
        MCP Servers
  			<i aria-hidden="true" class="fa-regular fa-arrow-right CoolImageCard-container-header-icon"></i>
      </span>
  		<span class="CoolImageCard-container-text">Generate your MCP server to use with clients like Cursor, VSCode, or Claude Code.</span>
  	</div>
  </a>

  <a class="CoolImageCard" href="https://docs.readme.com/main/docs/branches">
    <div class="CoolImageCard-card">
  		<img alt="" class="CoolImageCard-image" height="200" src="https://files.readme.io/099e566ee0a7f2bd2d1d2fcfa116c277ee0e63d1140939f940610f3298e2101c-Launch_Week-20250628-0955372x.webp" />
    </div>
    <div class="CoolImageCard-container">
      <span class="CoolImageCard-container-header">
        Branches
  			<i aria-hidden="true" class="fa-regular fa-arrow-right CoolImageCard-container-header-icon"></i>
      </span>
  		<span class="CoolImageCard-container-text">Use branches to make changes across multiple pages, and review them with teammates in a preview environment.</span>
  	</div>
  </a>

  <a class="CoolImageCard" href="http://readme.com/launchweek#day4">
    <div class="CoolImageCard-card">
  		<img alt="" class="CoolImageCard-image" height="200" src="https://files.readme.io/9330ec0a0a033e7b5093a4301fb228dc10991c1b81d8472daf0d1b7a33de6c15-Group_Settings__ReadMe-20250628-0953182x.webp" />
    </div>
    <div class="CoolImageCard-container">
      <span class="CoolImageCard-container-header">
        Refactored for Enterprise
  			<i aria-hidden="true" class="fa-regular fa-arrow-right CoolImageCard-container-header-icon"></i>
      </span>
  		<span class="CoolImageCard-container-text">We’re officially bringing ReadMe Refactored to our Enterprise customers.</span>
  	</div>
  </a>

  <a class="CoolImageCard" href="https://docs.readme.com/main/docs/design-themes">
    <div class="CoolImageCard-card">
  		<img alt="" class="CoolImageCard-image" height="200" src="https://files.readme.io/fed4c26797666f556c91d0ef382bb2b57855b4f5e33fd70ba21180f85f28d822-Launch_Week-20250628-0956562x.webp" />
    </div>
    <div class="CoolImageCard-container">
      <span class="CoolImageCard-container-header">
        New Themes
  			<i aria-hidden="true" class="fa-regular fa-arrow-right CoolImageCard-container-header-icon"></i>
      </span>
  		<span class="CoolImageCard-container-text">We’ve added support for new themes like Compact, Modern, and Sidebar (coming soon). Along with options for wide layouts, and unique icons on pages.</span>
  	</div>
  </a>

  <a class="CoolImageCard" href="https://docs.readme.com/main/docs/aiagent">
    <div class="CoolImageCard-card">
  		<img alt="" class="CoolImageCard-image" height="200" src="https://files.readme.io/e3777d52d6f1264c10b307b3a11e232db333a7026143bc205909bfb881cf0154-AI_Agent-20250628-1016022x.webp" />
    </div>
    <div class="CoolImageCard-container">
      <span class="CoolImageCard-container-header">
        AI Agent <span class="CoolImageCard-container-header-beta">Beta</span>
  			<i aria-hidden="true" class="fa-regular fa-arrow-right CoolImageCard-container-header-icon"></i>
      </span>
  		<span class="CoolImageCard-container-text">Now in beta, you can edit content with our AI Agent. Ask it adhere to a styleguide, or rewrite a page.</span>
  	</div>
  </a>
  </div>
  `}
</HTMLBlock>

<HTMLBlock>
  {`
  <style>
  .CoolImageCard {
  	color: var(--color-text-default);
    font-size: 14px;
    line-height: 1.4;
    text-align: left;
    text-decoration: none !important;

  	&:hover,
    &:active,
    &:focus {
      .CoolImageCard-card {
        background: rgba(255, 255, 255, 0.1) !important;
      }

      i {
        opacity: 0.75 !important;
        transform: none !important;
      }
    }
    
    .CoolImageCard-card {
  		align-items: flex-start;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius-lg);
      display: flex;
      flex-direction: column;	
      overflow: hidden;
      transition: all var(--transition-timing) var(--transition-fast);
    }
    
    .CoolImageCard-container {
  		display: flex;
      flex-direction: column;
      padding: 1.5em 0;
  	}

  	.CoolImageCard-container-header {
  		font-size: 1.1em;
  	  font-weight: var(--font-weight-bold);
    	margin-bottom: 0.5em;
    }

  	.CoolImageCard-container-header-beta {
  		align-items: center;
      background: var(--yellow);
      border-radius: 30px;
      box-sizing: border-box;
      color: var(--yellow10);
      display: inline-flex;
      font-family: var(--font-family);
      font-size: 0.6em;
      font-weight: var(--font-weight-bold);
      height: 1.5em;
      line-height: 1.3;
      margin-left: 0.75em;
      padding-left: 6px;
      padding-right: 6px;
      user-select: none;
  	}

  	.CoolImageCard-container-header-icon {
  		font-size: 0.8em;
      margin-left: 0.5em;
      opacity: 0;
      transition: all var(--transition-timing) var(--transition-fast);
      transform: translateX(-5px);
    }

  	.CoolImageCard-container-text {
  		color: var(--color-text-minimum);
  		font-size: 1.1em;
  	}

  	.CoolImageCard-image {
  		height: 200px;
  	  max-width: none;
    	width: auto;
  	}
  }

  .CoolGrid {
    display: grid;
  	gap: 20px;
  	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  	padding: 22.5px 0;
  }
  </style>
  `}
</HTMLBlock>

***

<p />

### New Features & Improvements

**Admin**

* You can now close Settings, Branches, and the AI menus by pressing `esc` <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>
* Added page views in Documentation Metrics for `.md` endpoints
* Improved semver validation for versions

**API V2**

* New endpoints for making changes to Recipes <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>
* New endpoints for uploading images (including your logos) <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>
* Improved handling of large OAS uploads <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>
* Improved consistency when getting project URIs from content responses <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>

**Branches**

* Users can now create a branch from changes made in a version<a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>

**Editor**

* Improved `delete` and `enter` behavior in editor. If the cursor is before a code, html, mdx, or table it will no longer delete the block. `enter` can now be used to leave focus when editing certain blocks
* Improved UI for setting code block syntax and tab names
* Improved highlight colors for dark mode
* Custom Pages can be swapped between Markdown and HTML while preserving existing content
* Added `enter` hotkey to open Reusable Content when it has focus

**Performance**

* Reduced the amount of JS loaded on pages
* Improved how we fetch sidebar, files, API definitions, components, and reusable component data

<br />

### Bugs Eaten (by Owlbert) 🐛

**Admin**

* Fixed an issue where the Search placeholder would be tiny in Safari <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>

**API Reference**

* Fixed an issue where example tabs with long names could overlap improperly
* Fixed an issue where users couldn‘t edit API definitions if the definition container server variables <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>

**Branches**

* Fixed an issue where users couldn’t view OAS files from a branch <a class="badge" href="https://blog.readme.com/readme-refactored-new-editing-experience-bi-directional-syncing-with-github-2/">Refactored</a>
* Fixed an issue where users could create merge conflicts that Git can’t safely merge. Users will now be warned before continuing those merges <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>

**Docs**

* Fixed an issue where empty categories were publicly visible
* Fixed an issue where the incorrect logo would be shown until dark/light mode is toggled

**Editor**

* Fixed an issue where image max-width wasn’t updating onBlur
* Fixed an issue where especially large pages could not be edited
* Fixed an issue where paragraphs could be added by pressing the up arrow at the top of a page

**Enterprise**

* Fixed an issue where Enterprise customers could not update their OAuth apps

**Recipes**

* Fixed an issue where direct links to a Recipe were not working <a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a>

<br />

***

<small style={{ display: 'table', opacity: 0.75, margin: '1em auto 0' }}><a class="badge" href="https://docs.readme.com/main/docs/refactored-vs-legacy">Refactored</a> Some improvements are only available once your project has been upgraded.</small>

![]()
# Bi-Directional Sync

Bi-directional sync creates a two-way connection between your ReadMe project and a GitHub or GitLab repository. This optional workflow keeps content consistent across both platforms:

* Write in your preferred environment whether that’s ReadMe or your local development setup.
* Developers, engineers, and technical writers can collaborate using tools they prefer.
* Changes sync automatically between ReadMe and Git creating a single source of truth.

<PlanTable currentPlan="Startup" />

***

## Setting Up Bi-Directional Sync

ReadMe supports bi-directional sync with both <Anchor label="GitHub" target="_blank" href="https://docs.readme.com/main/docs/sync-with-github">GitHub</Anchor> and <Anchor label="GitLab" target="_blank" href="https://docs.readme.com/main/docs/sync-with-gitlab">GitLab</Anchor>.

For syncing with GitHub, you can connect to GitHub Cloud. If you are on the Enterprise plan, ReadMe supports bi-directional sync to <Anchor label="GitHub Enterprise Server" target="_blank" href="https://docs.readme.com/ent/docs/connecting-github-enterprise-server">GitHub Enterprise Server</Anchor>.

<Image align="center" border={true} src="https://files.readme.io/6335bcb6aa344d9d1f23d11b3cf420cbe94493872630760fb04d2cce9df10189-Screenshot_2025-10-27_at_12.29.28_PM.png" className="border" />

<Callout icon="❗️" theme="error">
  The repository you’re syncing to must be empty—no commits or files (e.g., README.md)—before connecting to ReadMe. You can add or remove files after setup.
</Callout>

***

## Documentation Versioning

If your ReadMe project uses multiple [Versions](https://docs.readme.com/main/docs/versions), only the Main Version is initially synced when you first enable Bi-Directional Sync. After successfully enabling Bi-Directional Sync, any changes to the other versions will sync to your Git repository.

***

## Editing Your Docs

Once your Git Connection is set up, all changes made in the ReadMe editor will automatically sync to your Git repository, and vice versa. When editing documentation in Git, you can use your preferred code editor or Git tools

To ensure successful syncing from *Git to ReadMe*, follow these structure guidelines:

**Markdown Files:**

* Files must include required frontmatter: `title` and `summary`
* Content should be written in standard Markdown format
* File names must match the intended URL slug for proper routing

**Navigation:**

* Page order is defined using `_order.yaml` files
* Each category folder can have its’ own `order.yaml`
* [Navigation structure](https://docs.readme.com/main/docs/documentation-structure#/) in Git, mirrors your ReadMe project hierarchy

**[Branches](https://docs.readme.com/main/docs/branches#/)**

* The initial commit from ReadMe is to establish branch synchronization with GitHub
* Branch names must exactly match the version names defined in ReadMe
* Any mismatched version and names will exist in GitHub and will not sync with ReadMe.

<HTMLBlock>
  {`
  <div class="migrating-column">
    <section>
      <header>
        <i class="fa-duotone fa-solid fa-hexagon-exclamation"></i> Unsynced
      </header>
      <pre>ReadMe: v2.0_new-branch
  GitHub: v2-new-branch
  		</pre>
    </section>
    <section>
      <header>
        <i class="fa-duotone fa-solid fa-circle-check"></i> Synced
      </header>
      <pre>ReadMe: v2.0_new-branch
  GitHub: v2.0_new-branch
  		</pre>
    </section>
  </div>
  `}
</HTMLBlock>

<HTMLBlock>
  {`
  <!-- style guide CSS -->
  <style>
    .migrating-column {
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius);
      display: flex;
      justify-content: center;
      
      + .migrating-column {
        margin-top: 1em;
      }
      
      section {
        flex: 1 1 50%;
        overflow: hidden;
        
        + section {
          border-left: 1px solid var(--color-border-default);
        }
      }
      
      pre {
        background: transparent;
        border: 0;
        border-radius: 0;
        font-size: 0.8em;
        margin: 0;
        overflow: auto;
        padding: 15px;
        
        + pre {
          border-top: 1px solid var(--color-border-default);
        }
      }
      
      header {
        align-items: center;
        border-bottom: 1px solid var(--color-border-default);
        display: flex;
        font-size: 15px;
        font-weight: var(--font-weight-bold);
        gap: 0.5em;
        padding: 1em;
      }

      .fa-circle-check {
        color: var(--green);
      }

      .fa-hexagon-exclamation {
        color: var(--red);
      }
    }
  </style>
  `}
</HTMLBlock>

### Handling Conflicts

When a conflict is detected while saving in ReadMe, the system will immediately prompt you to Overwrite Git changes or Cancel the save and continue editing. Changes saved in ReadMe, will always match what goes live.

When merging from GitHub, the user can resolve conflicts via the GitHub editor or the merge tool of their choice locally before pushing.

***

## FAQ

<Accordion title="How does ReadMe integrate with GitHub and what permissions are required?" icon="fa-question-circle">
  ReadMe uses a GitHub App with rep-level access: read-only for metadata(required) and read/write for syncing content. Webhooks handle syncs, change detection, and conflict resolution.
</Accordion>

<Accordion title="Why aren't my branches showing up in GitHub or GitLab?" icon="fa-question-circle">
  New branches you create after enabling bi-directional sync automatically creates a corresponding branch on Git tools, but existing branches will not create a corresponding branch on Git tools until you save a change to that branch in ReadMe.
</Accordion>

<Accordion title="What permissions are required when syncing with GitLab?" icon="fa-question-circle">
  ReadMe requests access to:

  * `read_api` for listing projects
  * `read_user` and `read_profile` to display user information
  * `read_repository` to sync content in GitLab to ReadMe
  * `write_repository` to sync contnotion ent in ReadMe to GitLab
</Accordion>
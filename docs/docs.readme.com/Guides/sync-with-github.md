# Sync with GitHub

## How to Set Up Bi-Directional Sync with GitHub

### Prerequisites

* You will need a GitHub account.
* When syncing to a repository in an organization, you will need permission to create an **empty repository**.

### Set Up

1. Navigate to **Settings** > **Git Connection** page.
2. Select GitHub.
3. If you haven’t already, create an empty repository in [GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)—make sure to uncheck the option to create a README.
4. **Sync** with your provider and authenticate. Grant access to the repository you’d like to sync with and confirm your repository on the next screen.

***

## Changing Repositories

1. Within ReadMe, disconnect the project via the trash icon.
2. Within GitHub, create your new repository (must be empty).
3. Navigate to **Applications > Installed GitHub Apps**.
4. Find **ReadMe Sync** and click **Configure**.
5. Under *Repository access*, select the new repository you’d like to sync to.
6. Return to ReadMe and connect to your new repository.

***

## Editing Your Docs

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

***

### GitHub Enterprise Server

If you’re using a self-hosted **[GitHub Enterprise Server (GHES)](https://docs.readme.com/ent/docs/connecting-github-enterprise-server)**, you can set up syncing from your Group dashboard under **Git Connection**. Syncing requires a new, empty repository, and each child project can only sync to one repository.

<Image align="center" border={false} src="https://files.readme.io/bd2640dae70270e20b0a71ae98adf56bd4e3a59b275b1609e86bbc4fc8ad81cd-GHES.png" />

If GHES isn’t available for your project, please contact your Customer Success Manager.

### GitHub Branch Protection

If your GitHub repository uses branch protection rules, you’ll need to configure them to allow the ReadMe Sync app to push changes. Here's how to set it up based on your GitHub configuration:

#### For GitHub Rulesets (New Version)

1. Navigate to your repository’s branch protection settings.
2. Under the *Bypass list* section,**+ Add bypass**.
3. Search for *ReadMe Sync* (App • readmeio) and set the permission to **Always allow**.

<Image align="center" alt="Adding ReadMe Sync to the GitHub Rulesets bypass list for direct push access." border={false} caption="Adding ReadMe Sync to the GitHub Rulesets bypass list for direct push access." src="https://files.readme.io/0e52415eb4dede062a4d9df4a2d3f06dda62500c26caae7f000e4ecd50f4521d-Screenshot_2024-11-22_at_11.12.14_AM.png" width="600px" />

#### For Legacy Branch Protection

1. Go to your repository’s branch protection rules.
2. Find the *Allow specified actors to bypass required pull requests* section.
3. Add *readme-sync* (ReadMe Sync) to the allowed actors list.

<Image align="center" alt="Configuring ReadMe Sync in legacy branch protection settings to bypass pull request requirements." border={false} caption="Configuring ReadMe Sync in legacy branch protection settings to bypass pull request requirements." src="https://files.readme.io/8f3765d6ebbe96f5a93e4c6f915e52392ad6ba1512d0af4d4113ca8ff6ef8077-Screenshot_2024-11-22_at_11.12.07_AM.png" />

This configuration ensures that changes made in ReadMe’s editor can be synchronized to protected branches in your GitHub repository.

***

<br />

## FAQ

<Accordion title="How does ReadMe integrate with GitHub and what permissions are required?">
  ReadMe uses a GitHub App with rep-level access: read-only for metadata(required) and read/write for syncing content. Webhooks handle syncs, change detection, and conflict resolution.
</Accordion>

<Accordion title="Why don’t my branches show on GitHub?">
  New branches you create after enabling bi-directional sync automatically creates a corresponding branch on Github, but existing branches will not create a corresponding branch on GitHub until you save a change (however small) to that branch on the ReadMe side.
</Accordion>

<Accordion title="I’m seeing an error about repository rule violations.">
  Our GitHub App doesn’t automatically bypass any rules you have set on your repository. To fix this issue, add the `readme-sync` app to your <a href="#github-branch-protection">branch protection bypass list from your GitHub repository settings</a>.
</Accordion>
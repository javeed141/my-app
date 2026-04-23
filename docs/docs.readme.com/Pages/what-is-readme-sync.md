# What is ReadMe Sync?

ReadMe Sync is the name of the GitHub app that will be installed in your docs repository. Though the GitHub App will allow you to sync with existing repositories, we recommend creating a new repository for docs content to sync. Our app will not have permission to create the repositories automatically for you (this is a trade-off we made to reduce the amount of permissions we needed to request).

Once you connect a GitHub repository to your ReadMe project, changes to pages in GitHub will be reflected in ReadMe and vice versa. Whether you make updates in your codebase or directly in ReadMe’s editor, changes will sync seamlessly between both.

## GitHub Apps

We chose to integrate through [GitHub Apps](https://docs.github.com/en/apps/overview) because they allow us to offer a good user experience, and a high level of control over access. Namely:

* An easy-to-use UI for the install process
* Transparent UI that explains what data you are sharing with ReadMe
* Granular levels of access to your repositories
* The ability to change or terminate ReadMe’s access at any time

## Permissions

### Repository-level access

| Permission Required      | Description                                                             | Rationale                                   |
| :----------------------- | :---------------------------------------------------------------------- | :------------------------------------------ |
| Metadata: Read-only      | Search repositories, list collaborators, and access repository metadata | Required by GitHub                          |
| Contents: Read and write | Repository contents, commits, branches, downloads, releases, and merges | Used to sync doc content to and from ReadMe |

### Organization-level access

ReadMe does not request any access to your organization.

### Account-level access

ReadMe does not request any access to user accounts.

### Event access

We use GitHub webhooks so that we are notified when changes are made to your content. These are used to keep your ReadMe content in sync with what’s in your repository.

| Event               | Description                                                                                                 | Rationale                                                                |
| :------------------ | :---------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| Installation target | A GitHub App installation target is renamed                                                                 | Used to notify ReadMe if there is an issue with access to the repository |
| Meta                | When this App is deleted and the associated hook is removed                                                 | Used to notify ReadMe if there is an issue with access to the repository |
| Repository          | Repository created, deleted, archived, unarchived, publicized, privatized, edited, renamed, or transferred. | Used to notify ReadMe if there is an issue with access to the repository |
| Push                | Git push to a repository.                                                                                   | Used to notify ReadMe when to start a sync from GitHub                   |

***

If you have any questions or feedback, please don't hesitate to reach out to our team at [alpha@readme.io](mailto:alpha@readme.io).

<HTMLBlock>
  {`
  <style>
  .rm-CustomPage {
    margin: 0 auto;
    max-width: 800px;
    padding-bottom: var(--lg);
    padding-top: var(--lg);
  }
  </style>
  `}
</HTMLBlock>
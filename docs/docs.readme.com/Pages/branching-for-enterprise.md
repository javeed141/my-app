# Enterprise Workflow Guide

# Writing and Managing Docs with Branches

ReadMe’s **branching feature** gives Enterprise teams a flexible, Git-inspired workflow for writing and managing documentation—without requiring GitHub (though it's even more powerful when you do). This guide outlines best practices for using branches to manage frequent feature updates, parallel authoring, and review workflows.

***

## What Are Branches?

Branches let you create and edit content in isolation—without affecting the live version of your documentation. You can:

* Work on **multiple features in parallel**
* Save changes without publishing
* Review updates before merging them live
* Merge content on your own schedule

Think of branches as a place to **draft, test, and stage** your changes.

> ✅ You can use branches entirely in ReadMe, or sync with GitHub for deeper version control and CI/CD integration.

***

## Recommended Workflow for High-Release Teams

This workflow works well for weekly releases, multiple contributors, and asynchronous reviews.

### 1. Create One Branch per Feature or Initiative

Each writer should create **a separate branch per feature** (or group of related features). For example:

| Branch Name                | Description                             |
| -------------------------- | --------------------------------------- |
| `feature-devices-redesign` | Docs update for Devices page changes    |
| `feature-new-dashboard`    | Work in progress for Dashboard overhaul |
| `feature-charts-update`    | Delayed release for Charts improvements |
| `adapters-release-0915`    | New adapter docs for weekly release     |

<Callout icon="📌" theme="default">
  ### **Tip**: Prefix branches with `feature-`, `fix-`, or `release-` to standardize naming.
</Callout>

***

### 2. Draft in Parallel

Multiple writers can edit different branches at once—even on the same page (in different branches). This allows for:

* Long-running feature work (e.g. Q4 roadmap features)
* Short-term content (e.g. patch notes, UI tweaks)
* Cross-functional collaboration

There is no expiration on branches. They can stay open for weeks or months.

***

### 3. Preview and Review

Use the **Review tab** in any branch to:

* See a summary of changes
* Preview the content in a live-like environment
* Share with stakeholders (PMs, engineers, etc.)

> ✅ Viewers and editors can review branches. We recommend:
>
> * Assigning stakeholders as **Viewers**
> * Sharing branch names or links directly for async feedback
> * Using the Review tab to highlight what’s changed

***

### 4. Merge When Ready

When a branch is ready to go live:

* Click **Merge** from the branch menu
* We’ll check for **merge conflicts**:

  * ✅ If no conflicts: your changes go live
  * ⚠️ If conflicts: you’ll see a warning before proceeding

#### What Causes Merge Conflicts?

Conflicts only happen when:

* Another branch was merged after yours was created **and**
* You’re editing the same page

You’ll have 3 options:

1. **Overwrite** (force merge your version)
2. **Create a new branch** from the latest live version and re-apply your changes
3. **Resolve conflicts in Git**, if syncing with GitHub

***

### 5. Syncing with GitHub (Optional—but Powerful)

If your team prefers writing in Markdown or managing docs in source control, syncing ReadMe with GitHub unlocks a more robust, reviewable workflow.

* **Docs live in your GitHub repo** as `.md` files (MDX supported)
* Changes pushed to GitHub appear in ReadMe
* Changes made in ReadMe sync back to GitHub
* **Branches sync too**: create them in GitHub or ReadMe

#### Example Workflow with GitHub

1. **Create a new branch in GitHub**
   Format: `version_branch-name` (e.g. `v1.0_feature-user-permissions`)

2. **Edit your docs in GitHub or using the CLI**

   * Use your preferred IDE
   * Push changes as part of your PR
   * Preview and lint locally

3. **Open a pull request (PR)**

   * Review diffs, run automated checks
   * Collaborate with devs or PMs in GitHub
   * Merge when approved

4. **View the branch in ReadMe**

   * Changes appear under the correct version/branch
   * Use the Review tab for a visual preview
   * Share it with stakeholders without needing GitHub access

5. **Merge the branch in ReadMe or GitHub**

   * Either merge the PR in GitHub
   * Or merge in ReadMe’s UI
   * ReadMe will detect and handle sync automatically

***

## Best Practices Summary

| Scenario                    | Best Practice                                     |
| --------------------------- | ------------------------------------------------- |
| Multiple features in flight | One branch per feature                            |
| Long-term feature work      | Keep branch open until ready to merge             |
| Same page, multiple writers | Coordinate branches or wait to merge sequentially |
| Review with PMs/engineers   | Share branch link and use Review tab              |
| Weekly releases             | Merge relevant branches before publishing         |
| GitHub connected            | Resolve conflicts                                 |

***

## Final Tips

* **Don’t use “Hidden Pages” as a staging area**—branches are better for that.
* Name branches clearly so others know what they’re for.
* Clean up merged branches periodically.

***

## Questions or Need Help?

If you're unsure how to structure branches or run into merge issues, [reach out to support](mailto:support@readme.io) or your ReadMe account manager—we’re happy to help tailor a branching workflow that fits your team.
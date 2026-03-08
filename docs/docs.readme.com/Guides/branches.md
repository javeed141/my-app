# Branches

Branches allow admins to save changes across pages without them going live immediately.

With branches, you can continue to edit as you always have! Branches are an optional workflow that offer flexibility in your writing process. Writers use branches to:

* Make changes and review them in a preview environment before they’re live.
* Send changes to teammates for review.
* Make changes across multiple pages.

<PlanTable currentPlan="Business" />

<Callout icon="💼" theme="default">
  **Note:** Additional review options are only available on Enterprise plans.
</Callout>

***

## Creating a Branch

There are three ways to create a branch:

1. Navigate to the versions and branches menu. Once there, you can create new branches from a version.
2. While editing an individual guide, endpoint, etc., instead of clicking **Save**, you can click **Save to Branch**.
3. If you’re [syncing with GitHub](https://docs.readme.com/main/docs/bi-directional-sync) , branches created in GitHub will show up in ReadMe. And branches created in the ReadMe UI will automatically show up in GitHub!

Once your branch is created, you can start writing! Changes will not be live until you merge your branch into a public version.

<Image align="center" border={false} src="https://files.readme.io/65abcb59c51a4be0b668815cf0046ee818e93228057a6bff5ddbe4d3a4b9b97e-Getting_Started_with_Owlberts_Journeys-20250512-1502362x.webp" />

There are no time limit or expiration on branches. Any admin on your team can view, edit, merge, and delete any branch.

***

## Reviewing Changes

<Image align="center" alt="Review tab showing the diff between two pages line-by-line" border={false} src="https://files.readme.io/95ab92ffd9eec49ad16b279f1e4a66de1f54cc95eb121f43c381258fb1d7915e-Review-20251104-1847122x.webp" />

When editing a branch, you can access the Review tab to compare the changes made in your branch.

<Callout icon="☝️" theme="default">
  When reordering files, they’re represented as changes to the `_order` file in your docs. Each item in the `_order` file represents a page in your docs and matches the slug of each page
</Callout>

Customers with the Review feature can also mark branches as ready for review, which adds a badge in the versions and branches menu, and starts the [AI Linter](https://docs.readme.com/main/docs/linter). Users can bypass the merge requirements by checking the "Merge without requirements met" box to enable the **Merge** button.

***

## Merging Changes

Once you’re ready for the changes to go live, you can merge from the branch menu:

<Image align="center" border={false} width="300px" src="https://files.readme.io/0c4c2909e376be33b974e008b8b9b9f14860b13c3eff12b5be8a377395fd68e4-Getting_Started_with_Owlberts_Journeys-20250528-1418472x.png" />

On merge, a check will be run to ensure there are no merge conflicts. If there are conflicts that must be resolved, we recommend [resolving the conflicts from GitHub](https://docs.readme.com/main/docs/branches#/handling-conflicts). If your project does not sync with GitHub, you can to ignore the conflict and forcefully merge their changes—with preference to the changes in the branch.

Once merged, your branches are not deleted so you can review the changes before deleting them.

<Callout icon="💁‍♂️" theme="default">
  GitHub users can merge a branch into a version too—including via Pull Requests.
</Callout>

### Restricting Merge to Admins

Enterprise Customers can restrict merge access per project to [Only Admins or Admins & Editors](https://docs.readme.com/ent/docs/user-roles/). The settings can be found on the Enterprise Dashboard’s Project Page. Open **Settings** > **Enterprise Name** (at the bottom) > **Projects**

***

## Syncing with GitHub

You do not have to sync with GitHub to use branches.

When creating branches from GitHub, their name has to be formatted to include their version: `{version}_{branch}`. Examples:

```
v2.0_rewrite-getting-started
v2.0_add-new-feature
v2.0_fix-typo
```

### Access & Permissions

ReadMe and GitHub permissions are independent. Users with access to your GitHub project’s branches will have access to any content changes. In order for users to view content changes made in branches via GitHub, they will need a ReadMe account with access to your project’s branch.

### Handling Conflicts

When merging from GitHub, the user can resolve conflicts via the GitHub editor or the merge tool of their choice locally before pushing.

When merging from ReadMe, the changes you see when previewing will always match what goes lives when merging. Conflicting changes from GitHub will not appear.

***

## FAQ

<Accordion title="Who can view a branch?" icon="fa-help-circle">
  Only teammates with access to your project can view your branches—including the team Editor and Viewer roles.
</Accordion>
# Reusable Content

Create Global Reusable Content blocks for your Enterprise Group to use across your child projects!

<Callout icon="🔍" theme="default">
  ### Looking for the Full How-To Guide on Reusable Content?

  Head to [this page](https://docs.readme.com/main/docs/reusable-content#/) in our Product Guides for a full overview on all of the features and functionality that Reusable Content offers!
</Callout>

In addition to the full Reusable Content experience described [here](https://docs.readme.com/main/docs/reusable-content#/), Enterprise Groups also have additional functionalities that allow Enterprise Group Admins to manage Reusable Content blocks used across different child projects within their group.

## Reusable Content Page in Your Enterprise Group Dashboard

Enterprise customers have a Reusable Content page that is accessible via the sidebar in their Enterprise Group dashboard. This page lists all global Reusable Content blocks used across child projects. It is also where Enterprise Group Admins can create new global blocks and make updates to existing ones.

<Image align="center" border={true} src="https://files.readme.io/21a2cbe-Docs_RC_Menu_in_Enterprise_Group.png" className="border" />

The left column lists all global Reusable Content blocks by name, along with a preview of the text, when the block was last edited, and how many pages the block is used in.

Once you click into a block you’re able to see the full Markdown content of the block as well as how many and what pages the block is used in, as well as the names of projects where the global block is used.

Editing global Reusable Content blocks can only occur in this page, and edits can only be made by team members who have Enterprise Group Admin permissions. Once a global Reusable Content block is updated on this page,the changes will automatically populate across all instances where the block is used.

## Using a Global Reusable Content Block in an Enterprise Child Project

When a Project Admin pulls up the list of existing Reusable Content blocks from the editor Slash menu in their child project, they’ll see all global Reusable Content blocks that exist for their Enterprise Group as well as any blocks created just for that child project.

Global Reusable Content blocks are indicated as such in Enterprise child projects by the “Global Reusable” label in the upper left corner of the block.

<Image align="center" border={true} src="https://files.readme.io/fe3d4cf-Docs_Global_RC_block_in_page.png" className="border" />

If the Admin viewing the page in the child project also has Enterprise Group Admin permissions, they’ll be able to click Edit and make updates to the block from the Reusable Content page in the Enterprise Group dashboard.

If the Admin viewing the page in the child project does not have Enterprise Group Admin permissions, the Edit functionality will be greyed out and not clickable.

<Image align="center" border={true} src="https://files.readme.io/635bcfd-Screenshot_2023-12-08_at_3.10.35_PM.png" className="border" />

If the Admin wishes to continue with making edits to the global block, they’ll need to detach it and make edits. Since it’s been detached, this block of Markdown text will no longer be affiliated with the global Reusable Content block.

<Callout icon="👉" theme="default">
  ### Global Reusable Content Blocks vs. Reusable Content Blocks at the Child Project Level

  A reminder that global Reusable Content blocks can be used across all child projects in an Enterprise Group but Reusable Content blocks created at the child project level are particular to that project.
</Callout>

## Global Custom Blocks on Enterprise Refactored Experience

For Enterprise customers who've upgraded to our newest [ReadMe Refactored experience](https://docs.readme.com/main/docs/migration#/), your Enterprise Group dashboard now includes a **Custom Components** section, in addition to Reusable Content.

<Image align="center" border={false} src="https://files.readme.io/569cc39e0edc3bef7211255bcb9f9e8126efdfc9a560f481fa0bf282e7282cf0-global_custom_components.png" />

Powered by our MDX-backed editor, Custom Components—think buttons, page banners, graphs, and more—are a really powerful and visually impressive way to make your docs more engaging, dynamic, and interactive. Using MDX which blends Markdown and embedded JSX, and is built on top of React, and styling support from Tailwind, these customizable and reusable components can be added to any Guides and API Reference pages within your ReadMe API documentation! For more information on how to create a Custom Component from scratch or copy & paste—or build upon!—one from our GitHub marketplace, [head to this doc](https://docs.readme.com/main/docs/building-custom-mdx-components#/) .

Similar to the relationship between Reusable Content blocks created at the parent and child level, Global Custom Components can only be created at the Enterprise Group level, but can be used across all child projects associated with the Enterprise Group.

Within the Custom Components section of your Enterprise Group dashboard you can create, rename, and delete components, as well as see what child projects they're being used in, and navigate to those pages to see them in use.

<Image align="center" border={false} src="https://files.readme.io/3b0f8f02edc19b35ae09059589fac24ef5fec0069a94d49879bd6a3b2a2fe9d5-cc-used_in_view.png" />

<Accordion title="A few call outs about global Custom Components" icon="fa-info-circle">
  * You cannot delete a global Custom Component if it's currently in use in a child project. In order to delete it, you'll first need to navigate to the child project(s) where it's being used and delete those instances, and then return to the Custom Components page in your Enterprise Group to fully delete it.
  * If you have a Custom Component at the parent level that has the same name as a Custom Component at the child level, your child project will always default to the child level version of the component when it's inserted into a Guides or API Reference page.
  * This is a custom component!
</Accordion>
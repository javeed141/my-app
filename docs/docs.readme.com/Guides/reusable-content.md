# Reusable Content

Create reusable blocks of Markdown content to use repeatedly across your project’s Guides and API reference pages!

# Simplify Your Docs Maintenance Workflow

**Edit once, update everywhere**. Reusable Content blocks help you minimize manual errors and ensure that changes to your developer hub occur in all the places they’re needed. 😉

<Image align="center" src="https://files.readme.io/b099ae4d13804c2ef1a2c0006f6db99ca53e4cd48ae6a6af655f0cf593cfb5af-create_RC.gif" />

## How It Works

Reusable Content lets ReadMe Admins create Markdown blocks that appear across multiple pages. When you edit a block, the system updates all instances automatically.

You can access Reusable Content blocks from the editor's slash menu. Blocks support all Markdown elements: text, images, code snippets, callouts, and more.

### Benefits of Using Reusable Content

1. **Faster documentation updates**: Update content once to change it everywhere. No need to find and edit each instance manually.
2. **Fewer errors**: Automated updates reduce mistakes. Use blocks for version-specific content, plan callouts, or consistent linking across related pages.
3. **Better developer experience**: Consistent messaging helps developers understand and integrate your API more easily.

> 📘 Reusable Content is available on Business and Enterprise plans!
>
> Enterprise Groups will also have access to Global Reusable Content located in the Group dashboard.  If you’re on our Free, Startup, or Open Source plans, you’ll need to upgrade your plan in order to access this feature.

## How to Use

Manage Reusable Content in **Admin Settings > Reusable Content**.   Use this page to view, create, edit, and delete all blocks in your project. You can only delete blocks that aren't used on any pages.

<Image align="center" src="https://files.readme.io/d18554fd987f582baa2e6b5a596f44eaf5b979e32a66c7b0e755f26b81bfe841-RC_settings.png" />

### Create a New Block

On any Guides or API Reference pages with Markdown:

**Method 1: Convert an existing block**

Highlight any Markdown block and select **Make Reusable** from the Block Actions menu. Edit the content in the Reusable Content editor and save.

**Method 2: Create from the Slash menu**

Type `/` to open the Slash menu, navigate to Reusable Content and select **Create New**.

Both methods open the Reusable Content editor where you name the block (internal use only), edit content, and save.

> 🚧 Blocks names are only editable if not used on any pages.
>
> You cannot change a block's name while it is in use.

### Add to a Page

**Method 1: Use the `<` shortcut**

Type `<` on any page to open a menu showing all Reusable Content blocks, Custom Components, glossary terms, and variables. Select the block you need.

<Image align="center" border={true} src="https://files.readme.io/0b9fbf2-Docs_Using__to_Bring_Up_RC_Menu.png" className="border" />

**Method 2: Use the Slash menu**

Type `/` and select **Reuse Content** to see all available blocks. Choose one to insert it directly to the page.

### Identify a Reusable Content Block

Reusable Content blocks have a green border and are labeled as **REUSABLE** in the editor. Features included:

1. The left label identifies the block as Reusable and lists the name of the block
2. If you click the left dropdown, you’ll have the option to **edit** or **detach** the block
3. The right label notes how many pages this particular block is used across
4. If you click the right dropdown, it reveals the specific pages where the Reusable Content block is in use

<Image align="center" border={true} src="https://files.readme.io/bac17d4-docs_page_-_RC_block_menu.png" className="border" />

### Edit a Block

Click the left label dropdown and select **Edit**. Make your changes and click **Update** to apply them across all instances. (Enterprise projects with Global Reusable Content follows a different process—see the [Enterprise Guides for details](https://docs.readme.com/ent/docs/reusable-content-enterprise#/).)

The edit window also includes a **Delete** option. You must remove or detach all instances of a block before you can delete it.

### Detach Reusable Content

Detach a block when you want to edit it on one page without affecting other instances. Click the left dropdown menu and select **Detach**. The block converts back to standard Markdown.

<Image align="center" border={true} src="https://files.readme.io/7b61371-Detaching_an_RC_block.gif" className="border" />

<Callout theme="default">
  ### Enterprise Groups with Global Reusable Content

  If you’re an Enterprise customer looking to learn more about managing Reusable Content for your Enterprise Group, head to [this page](https://docs.readme.com/ent/docs/reusable-content-enterprise#/)!
</Callout>

# FAQ

<Accordion title="How do you find the Reusable Content blocks that already exist for your project?" icon="fa-info-circle">
  There are currently two ways to locate the Reusable Content blocks that have been created for your Business plan project (or Enterprise child project) – (1) you can locate them via the editor slash menu (Reusable -> Reuse Content -> populates a list of all Reusable Content blocks) or (2) use `/` to bring up the menu of all RC blocks (in addition to your project’s glossary terms and variables).
</Accordion>

<Accordion title="What are some things to keep in mind when using Reusable Content blocks?" icon="fa-info-circle">
  * You cannot nest Reusable blocks into another Reusable block
  * Reusable Content is saved separately from the page it's being used in. You will need to update blocks directly from the Resuable Content editor.
  * You will need to save the page in order for the block count to update to the correct page usage.
  * If you export a project to .md files, and then re-import that file back into ReadMe, any previously created Reusable Content blocks that were exported will no longer be recognized as Reusable Content blocks in the new project. If the new project is on Business or Enterprise, you will be able to create new Reusable Content blocks
</Accordion>

<Accordion title="How does versioning work with Reusable Content blocks?" icon="fa-info-circle">
  * Each version of your ReadMe project has its own subset of reusable blocks
  * You can’t use reusable blocks across versions, unless you manually clone them and add them to a new version. Even still, once you update in one version, they won’t auto-update in other versions
    * E.g., if you create a new version of your project, v2.0, that is forked from v1.0, the new version will include any Reusable Content blocks that were created and used in v1.0. The Reusable Content blocks that are now in v2.0, however, are different—and while still reusable and auto-syncing—do not sync with the Reusable Content blocks in v1.0 (even though the blocks have the same name). The count for how many times a Reusable Content block is used is tied to the version level.
</Accordion>

<Accordion title="What happens if you downgrade your plan?" icon="fa-info-circle">
  Your Reusable Content blocks still exist in the pages of your project but the blocks will be in "view only" mode. All Reusable Content will not be editable unless detached. If you upgrade to Business or Enterprise, you will regain access to all Reusable Content blocks.
</Accordion>
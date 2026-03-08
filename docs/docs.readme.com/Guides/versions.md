# Versioning

Maintaining multiple versions of your documentation is critical for many different technical products. This page goes into the details of how versioning works in ReadMe, as well as several use cases.

<Callout icon="🚧" theme="warn">
  **Affected Sections:** Only Guides, Recipes, and Reference sections are versioned. Content for Landing Page, Discussions, and Changelog will persist across versions.
</Callout>

## Making a New Version

To create a new version, open the Versions & Branches menu by selecting the **version name** (i.e. v3.0) in the admin navigation. Then click on the **+ New Version** button in the right top corner. Choose which version to fork from and name your new version. This will create a copy of this version, you will not be able to pull the changes back to the version that was forked.

<Image align="center" border={false} src="https://files.readme.io/c543cc3ff266bd3b210d720cfb7c5e09d7750c78dcb5ccfd60f669eae003ca39-versions.png" />

### Semver(-ish)

Our versioning is based on [Semver](http://semver.org/), but is much more flexible than Semver in terms of the acceptable inputs. This means your versions can be as simple as `v1.0`, but as complex as `v1.0-hello-this-is-a-version`.

***

## Version Options

<Image align="center" border={false} width="500px" src="https://files.readme.io/159f0425970c8c5849bc6b6e7b684f51fdab23a656f6488139337adaa75e9d60-version_options.png" />

### Default

This is the version that your domain will direct to. Users can change to a different version by clicking the version dropdown selector.

<Callout icon="🙅‍♂️" theme="default">
  It is not possible to merge two versions. If you want to make changes to both, you will need to do it manually!
</Callout>

### Public

Selecting this will make this available in the version dropdown selector and to anyone that can view your docs. If unselected, this version will be marked as **Hidden** and only be visible to project admins.

### Beta

Indicating that a version is a beta will add a badge next to a version in the version dropdown selector. It does not create a callout on the page or any other visible changes.

### Deprecated

Select this to mark older versions. In addition to seeing a "deprecated" badge next to the version in the version dropdown selector, users will also see a big red banner above the docs when visiting this deprecated version. Here's how it looks:

<Image align="center" border={true} width="smart" src="https://files.readme.io/RhO7iWuhSMGsBrHSrFMt_Screen%20Shot%202015-12-16%20at%2012.17.04%20PM.png" className="border" />

***

## Displaying Version Dropdown

<Image align="center" border={false} caption="Admin view: Hidden and Deprecated are not visible to end-users" src="https://files.readme.io/5f0ac4bab3338c5e1cceee0368a02363bb6c2eca6f40324725d6d43593e564ab-version_drop.png" />

By default, we show the aforementioned version dropdown picker in the subnavigation bar. You can toggle to display or hide this in **Settings > Header & Footer > Subnavigation**.

<Image align="center" border={false} src="https://files.readme.io/1a975ae96b399662d42cee67ca226a8fd49bfb9188da95ccfd00a2125f0347d7-version_picker.png" />

***

## Reusable Content

Any [Reusable Content](https://docs.readme.com/main/docs/reusable-content) created within one Version can only be used within that Version's documentation; it's not possible to define Reusable Content blocks that can be used across Versions within a single project.

If a new Version is created when forked from an existing Version, the new Version inherits all the Reusable Content blocks defined in the existing Version. However, the Reusable Content blocks in the new Version are completely independent from the old Version.

> 📘 Global Reusable Content
>
> Projects on an Enterprise plan have the ability to define **Global Reusable Content** that *can* be used across Projects and Versions. See our [Reusable Content for Enterprise Groups docs](https://docs.readme.com/ent/docs/reusable-content-enterprise) for more information!

***

## Use Cases

There are lots of different scenarios where doc versioning might be useful — some are more obvious than others. The most obvious use case is for when your documentation version needs to match the versioning that might be taking place with your API or other technical product, and you need to maintain copies of your docs for each respective version.

Another use case is for bigger content restructuring or migrations, especially when these changes are more involved than simply updating a few pages (in which case we'd recommend [Suggested Edits](https://docs.readme.com/main/docs/suggested-edits). You can fork a new version of your docs, do some major restructuring (e.g. reorganizing page categories, combining pages, deleting outdated content, etc.), and still have your old docs as your public-facing changes. And when you're ready to flip the switch over, it's as easy as renaming the versions and toggling a few version settings!

***

## FAQ

<Accordion title="How many versions can I create?" icon="fa-tags">
  Free plan users can create up to 3 versions. Upgrade to the Startup plan or higher to unlock unlimited versions.
</Accordion>
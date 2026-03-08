# Changelog

Keep a running record of your latest updates

> 📘 ReadMe Changelog
>
> [https://docs.readme.com/changelog](https://docs.readme.com/changelog)

Keep your end-users up to date on the latest updates and/or announcements using the Changelog.

## How It Works

### Feed

The Changelog feed displays posts from newest to oldest. New posts always appear at the top of the feed.

<Image align="center" border={false} src="https://files.readme.io/211a0f5f87700288308fb8e36c08e7846d4ae2c019add74af1f5524b82b03a0c-Changelog_Feed_1.gif" />

### Posts

Each posts represents new updates and/or announcements. A post can include content, an author, and a post date.

***

### Customize

You can customize how your Changelog appears in **Admin Settings > Changelog**.

**Layout**

* Continuous: Displays the image, header, and content directly in the feed
* Collapsed: Displays the image and header only. Content expands when selected.

**Date Display**

* Exact: Show the post's publish date.
* Relative: Shows the date relative to the current day.

**Author Display**

* Choose whether to show or hide the author on each post

***

### Create a Post

In Edit Mode, you can create and edit Changelog posts in the same manner as a Guides page, with a few key differences:

* New posts automatically appear at the top of the sidebar and feed (newest to oldest).
* Nesting is not supported.
* Changelog posts are **not** versioned.

<Callout icon="🚧" theme="warn">
  The Changelog is shared across all versions. Adding a post will add it to all versions. Deleting a post will remove it everywhere.
</Callout>

You can also assign a type to each post to help categorize updates. Available types include: Added, Fixed, Improved, Deprecated, Removed, and No type.

<Image align="center" border={false} src="https://files.readme.io/9cda636703647983f945af4420edbf55a0a2d1a5cf4a843ba020fe7f96d36315-changelog_types.png" />

### Manage Metadata

You can edit metadata from the post's drop-down menu, just like a Guides page. Metadata controls how your post appears for SEO and when shared on social media.

***

## :fa-rss-square: RSS Feed

Users can subscribe to your changelog. Simply add .rss to the end of your changelog URL

**yoursubdomain.readme.io/changelog.rss**

Or for custom domains:

**customdomain.com/changelog.rss**

and for enterprise projects with a custom domain:

**customdomain.com/\[project]/changelog.rss**

Once you have your URL, you can use any RSS feed widget/tool to input the URL and generate HTML to embed it ([here's](https://rss.bloople.net/) an example)!
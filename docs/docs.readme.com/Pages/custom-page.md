# What's a Custom Page?

<Callout icon="👍" theme="okay">
  This page is a Custom Page! Look up at the URL. Back to the [help article](https://docs.readme.com/docs/custom-page).
</Callout>

Use Custom Pages when you want to keep your ReadMe project's top navigation but customize everything below the search bar.

# What's different?

<Image align="center" alt="Left: Custom Page, Right: Docs page" border={false} src="https://files.readme.io/bd1fdada4819f920fe34200a101b248fa2fb2ec49b1f411249e088ab90eb1cfe-custom_page_vs_regular.png" />

Custom Pages change a few things compared to standard Documentation pages:

1. No left sidebar navigation
2. No table of contents, even if headers are used
3. A different URL path (`/page` instead of `/docs`)
4. No page voting
5. No "Updated x days ago"

<Callout icon="🚧" theme="warn">
  Custom Pages are not affected by versioning and are shared. If you delete a Custom Page it will be removed from everywhere.
</Callout>

# What's the same?

You can add a Custom Page to your subnavigation in **Admin Settings > Navigation**. It will appear as a new item using the same header name or a custom title.

## Modes

<Image align="center" alt="Markdown or HTML Mode" border={false} width="smart" src="https://files.readme.io/a3405f80c4e230e63e66a88c6248601094567ed639cba9519489e47ffb220175-custom_pages.png" />

Custom Pages have two modes:

1. **Markdown:** The standard mode used in Documentation section
2. **HTML:** The code is [sanitized](https://en.wikipedia.org/wiki/HTML_sanitization). If you want to include CSS or JavaScript, do so in Appearance > Custom Javascript/Stylesheet.
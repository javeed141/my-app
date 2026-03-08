# Custom Pages

<Callout icon="👍" theme="okay">
  View this article as [a Custom Page](https://docs.readme.com/page/custom-page)
</Callout>

Use Custom Pages when you want to keep your ReadMe project's top navigation but customize everything below the search bar.

# What's different?

<Image align="center" alt="Left: Custom Page, Right: Docs page" caption="Left: Custom Page  | Right: Guides Page" src="https://files.readme.io/34ffc014720bff814cca58867685fefeba1ce50f1a263e901d2739a6b8605139-custom_page_vs_regular.png" />

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

<Image align="center" alt="Markdown or HTML Mode" src="https://files.readme.io/fe5732c55dfc4003743fd9c51cb0b4590e3fa7e08c4e05fa37172c07ffc80cc5-custom_pages.png" />

Custom Pages support two modes:

1. **Markdown:** The standard mode used in the Documentation section
2. **HTML:** HTML is [sanitized](https://en.wikipedia.org/wiki/HTML_sanitization). If you want to include CSS or JavaScript, do so in **Appearance > Custom CSS/JS** instead.

<br />
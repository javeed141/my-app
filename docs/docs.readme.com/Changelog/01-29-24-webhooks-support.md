# Webhooks Support

<Image align="center" src="https://files.readme.io/5b7f08f-Webhooks.png" />

ReadMe now supports webhooks documented in your OAS 3.1 files. Try it out with an [example webhooks specs](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.1/webhook-example.json).

## ReadMe Labs

We’ve added ReadMe Labs in the dashboard so you can enable experimental features—just GraphQL for now. You can find it under configuration settings, which we’ve reorganized to make your settings easier to find.

### 🪶 Other Improvements

* **Developer Dashboard & Doc Metrics**: Show/hide column preferences persist across browser session
* **Developer Dashboard**: Increase requests per page from 20 to 30 rows
* **Reusable Content**: Added support for renaming reusable content blocks
* **Docs**: Deprecated banner now spans the full-width of the page
* **Docs**: Refactored mobile page navigation to support more interactions and additional levels of nesting
* **Enterprise**: Improvements made for more reliable PDF generation
* **Editor**: Improvements made to sidebar performance—especially ones with a large amount of categories and pages
* **Suggested Edits**: Added notifications to our Slack integration when an anonymous user makes a suggested edits
* **API Reference**: Response schema examples can now expand by default instead of in a modal (this can be changed in your Reference configuration)
* **Search**: HTML tables are now indexed

### 🐛 Bugs Eaten (by Owlbert)

* **Editor**: Fixed an issue where you couldn’t edit Iframe URLs
* **Editor**: Fixed an issue where extra characters were being added to image links when viewing in the editor
* **Enterprise**: Updated copy to clarify password access behavior
* **Developer Dashboard & Doc Metrics**: Fixed an issue where exports could crash the page in Safari and Firefox
* **Developer Dashboard**: Fixed an issue where long API Keys in the Authentication page were being truncated after clicking "Show API Key"
* **Owlbot**: Fixed an issue where Owlbot wouldn’t reveal its source if there were only one
* **Admin Dashboard**: Fixed an issue where the ReadMe rating UI was not accessible
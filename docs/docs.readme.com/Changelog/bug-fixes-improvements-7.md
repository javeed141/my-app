# Bug Fixes & Improvements

### Improvements

* **Performance**: Improved page load times for projects with lots of custom CSS/HTML/JS
* **API Reference**: Improved response header text wrapping
* **Staging**: Improved search indexing reliability

### 🐛 Bugs Eaten (by Owlbert)

* **Staging**: Fixed an issue where the page could crash in production when navigating to a page that’s been moved in staging
* **API Reference**: Fixed an issue where Try It could cause the page to crash with when JWT has been misconfigured
* **API Reference**: Fixed an issue where the response UI could not accommodate a large number of examples
* **API Reference**: Fixed an issue where API key selection wasn’t persisting across endpoints
* **API Reference**: Removed a confusing tooltip in the request history table
* **API Reference**: Fixed an issue where webhooks parameter headers were rendering incorrectly
* **Export**: Fixed an issue when exporting projects with special unicode characters not being displayed properly
* **Discussions**: Fixed an issue where Markdown wasn’t rendering in the Discussions list
* **Reusable Content**: Fixed an issue where the emoji dropdown would not be fully visible
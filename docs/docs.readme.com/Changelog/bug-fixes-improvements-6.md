# Bug Fixes & Improvements

### Improvements

* **SSO**: Added OpenID Connect as an option for end users
* **Developer Dashboard**: My Requests can now show Try It requests while logged out
* **Developer Dashboard**: Opening an expired shared request now loads the page with expiration info in the response
* **Developer Dashboard**: Added `x-documentation-url` header info to response details
* **Global Landing Page**: If a description is not provided, we now use the project description for improved SEO
* **API Reference**: Added webhook icon to the sidebar to make it easier to tell which endpoints are webhooks
* **Editor**: Improved support for writing longer descriptions

### 🐛 Bugs Eaten (by Owlbert)

* **Search**: Fixed an issue where project name letter casing was not being updated
* **Developer Dashboard**: Fixed an issue with a non-loading graph in My Requests
* **Developer Dashboard**: Fixed an issue where request history wasn’t being preserved when server variables are changed
* **Developer Dashboard**: Fixed an issue where Slack notifications weren’t working or displaying the correct icons
* **Doc Metrics**: Fixed an issue where the graphs would not load
* **Navigation**: Fixed an issue where the dropdown navigation menu would briefly display the incorrect page
* **Navigation**: Fixed an issue where adding a `?` to the URL on Changelog and Reference pages would prevent the page from loading
* **SSO**: Fixed an issue where group mappings could stop working
* **Global Landing Page**: Improved performance by removing an unnecessary redirect
* **Owlbot AI**: Fixed an issue where CSV exports would be formatted incorrectly
* **Manual Editor**: Fixed an issue where creating new pages would fail
* **PDF Export**: Fixed an issue where PDFs weren’t being generated sometimes
* **API Reference**: Fixed an issue where enum objects with default values were selected, even when defaults were not enabled
* **Editor**: Fixed an issue where errors would be shown on embeds URLs before a URL is entered
* **Editor**: Fixed an error when saving Reusable Content
* **Enterprise**: Fixed an issue where project passwords were not editable from the Group dashboard
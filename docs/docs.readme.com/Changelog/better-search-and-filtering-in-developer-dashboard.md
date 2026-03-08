# Better Search and Filtering in Developer Dashboard

<Image align="center" src="https://files.readme.io/7771cb3-DevDash_ID.png" />

We’ve added quality of life improvements to the My Requests page as well as My Developers. End users in your documentation will now be able to filter the requests they are viewing by custom date ranges. In addition, both admins and end users will be able to search for a specific log by its Request ID.

### Other Improvements

* **API Reference**: Added Node.js as an option for custom code samples
* **API Reference**: Improvements to showing top level examples in endpoints with Array types
* **Custom CSS**: Added class names to the documentation version dropdown to allow for easier CSS customization

### 🐛 Bugs Eaten (by Owlbert)

* **UI**: Fixed some scrollbars appearing light against dark content
* **API Reference**: Fixed issues with reset to default in API reference not always appearing when it should
* **Editor**: Fixed creating links for projects with only one enterprise project
* **Accessibility**: Added `aria-live` to search results
* **Accessibility**: Added `aria-hidden=true` to icons in navigation that shouldn’t be read by screen readers
* **Reusable Content**: Headers in reusable content will now show up in the table of contents
* **Dashboard**: Improved validation for setting configuring custom login
* **Changelog**: Fixed issue with removing type of a Changelog post after it had been created
* **Editor**: Added a tooltip when linking pages in the editor to allow seeing the entire title
* **API Reference**: More consistent padding and margin in the parameter table in the reference section
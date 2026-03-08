# Redesigned API Reference Configuration

<Image align="center" src="https://files.readme.io/5522313-Changelog.png" />

Over the past few weeks, we’ve been working on new options to customize your API References. As we've added more options we decided the page to set that up needed a refresh! Go to Appearance → API Reference to see the settings:

* Show Request History UI to view past Try It and actual API requests
* Automatically populate parameter inputs with default values
* Edit the request body with JSON
* Expand response schemas by default
* Expand the first 200 response example by default
* Make use of ReadMe’s SDK generator for code examples in 20 languages

### Improvements

* **Search/Reusable Content**: Content on a page from a Reusable Content block will now be indexed by search
* **API Reference**: Add a toggle to mask or show API Key

### 🐛 Bugs Eaten (by Owlbert):

* **Search**: Don’t show empty pages in search results
* **a11y**: Better maintain screen reader location when closing the search modal
* **Editor Sidebar**: UI Improvements for spacing and consistency while editing Category titles
* **Editor**: Fix list items being unnecessarily escaped from within headers
* **Transfer Ownership**: Fix transferring ownership on projects without active plans
* **API Reference**: Fix situations where the browser back button wouldn't take you to the correct page
* **API Reference**: Fixes for generated Swift code samples
* **API Reference**: Fix the height of request code samples being too small on pages with long responses
* **API Reference**: More even spacing between parameter sections
* **API**: Fix `body_html` response in the Get Doc endpoint being returned as Markdown
* **UI**: Fix some icons in buttons appearing too close to the button label
* **Staging**: Fix links to preview suggested edits while on staging
* **Staging**: More reliably clear cache on staging promotion
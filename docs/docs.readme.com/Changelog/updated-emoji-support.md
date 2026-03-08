# Updated Emoji Support

<Image align="center" src="https://files.readme.io/f768056-emoji.webp" />

We’ve switched over to native system emoji set for a more consistent experience. Emojis in our editor and recipes were previously using a different set of characters (native unicode and [Twemoji](https://github.com/twitter/twemoji)). And now we also support even more emoji ([Emoji 14.0](https://www.unicode.org/emoji/charts-14.0/emoji-released.html)), and aliases to make it easier to find emoji when searching.

### Improvements

* **Owlbot AI**: Now using GPT-4o; for faster responses
* **Admin Dashboard**: Manage Plan page now shows upcoming plan changes
* **Search**: Minor improvements to search network performance
* **PDF Export**: Customers on the Business tier can now export PDFs

### 🐛 Bugs Eaten (by Owlbert):

* **Editor**: Fixed an issue where duplicate dividers were shown in the API Reference editor
* **Editor**: Fixed an issue where duplicating synced endpoint pages would fail
* **Editor**: Fixed an issue where menus weren’t accessible on active pages
* **API Reference**: enums formatted as `int32` now renders as a select element instead of text input
* **API Reference**: Fixed a regression with menu sizes for the language selector
* **API Reference**: Fixed an issue where optional parameter values were being set with the default handling option was enabled
* **Search**: Fixed an issue where long titles in search were not completely visible
* **Changelog**: Fixed an issue where variables weren’t being rendered in RSS feeds
* **Recipes**: Fixed an issue where emojis weren’t being displayed
* **Enterprise**: Fixed an issue where the global landing page would crash with Owlbot and private projects
* **Custom CSS**: Fixed an issue where `.rm-Header-bottom` wasn’t applying to the correct element
* **Custom CSS**: Added `.rm-SearchModal-empty` classes for easier customization of search UI
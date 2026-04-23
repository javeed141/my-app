# Getting Started Improvements

<Image align="center" src="https://files.readme.io/8867cd1-Parameters.png" />

The Getting Started page shows developers how to use your API as quickly as possible. Sometimes, you want to start with a slightly more complicated request, so the Getting Started page now includes all parameters and headers that make up the request.

### 🪶 Other Improvements

* **Reusable Content**: Added the ability to search the page usage list
* **API Reference**: APIs using custom code samples will no longer show auto-generated samples
* **Documentation**: We’ve refactored some of our documentation login pages; they may look a little different, but you should see no change in functionality

### 🐛 Bugs Eaten (by Owlbert)

* **Developer Dashboard**: Fixed an issue where the Getting Started or Authentication pages could be in a broken state when the endpoints used on those pages are deleted
* **Developer Dashboard**: Fixed an issue where API keys menu on the My Requests page wasn’t working
* **Developer Dashboard**: Fixed an issue where duplicated query parameters would appear when replaying requests
* **Documentation**: Fixed an issue where users couldn't log in via passwordless login
* **Documentation**: Fixed an issue where the Jump To menu weren’t showing endpoints nested 2 levels deep
* **Enterprise**: Fixed an issue where selecting a deprecated version in some enterprise projects would load a blank page
* **Variables**: Fixed an issue where project admins could edit group-level variables
* **API Reference**: Fixed an issue where server variables were incorrectly marked as invalid
* **API Reference**: Fixed an issue where resetting server variables without a default would show undefined
* **Custom Page**: Fixed an issue where custom JS would load twice when custom pages were used as an error page
* **Editor**: Fixed a bug when bolding text in list items
* **Translations**: Fixed an issue where users couldn’t save after removing a language
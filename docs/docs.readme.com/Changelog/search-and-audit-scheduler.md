# Smarter Search & Scheduled Docs Audits

<Image align="center" border={false} src="https://files.readme.io/e4dae5d0999f5b846c68d43f973ea173c5248c5bbfa3d140ad6f584bb6fc3a2e-docs-audit.webp" />

This update brings smarter search improved relevance across all queries, and enhanced result highlighting. For those times when you need precision, you can now wrap your search query in "quotation marks" to force an exact match search. We’ve also added the ability to schedule Docs Audits on a recurring basis and export the results.

<br />

***

### New Features & Improvements

**Admin**

* Projects on ReadMe Refactored can now be cloned.
* Enterprise projects can now set a configurable inactive timeout period before admins are automatically logged out of the Enterprise dashboard.

**Ask AI**

* Added a new length option, **“Unrestricted,”** that lets Ask AI determine how long the answer should be.
* Exporting data from Ask AI as a CSV is now available on all plans with the AI Booster pack.
* The input field will now grow as the user types, making it easier to enter more complex prompts.

**API Designer**

* Added an option to configure the proxy specifically for OAuth requests.
* Improved styling of parameters by providing a clearer, more focused editing UI.

**API Reference**

* Added breadcrumbs to the API Reference section showing where the page is located within the section.
* Added PKCE support to the Try It Now OAuth flow.

**Billing**

* Moved the ability to manage your current plan and upgrade to a paid plan in ReadMe Refactored from the legacy dashboard.Smarter S

**Auth**

* Users with the Editor permission can now see hidden pages.

<br />

### Bugs Eaten (by Owlbert) 🐛

**AI Linting**

* Fixed line wrapping when displaying linting rules in Enterprise projects.

**Docs Audit**

* Improved clarity around the fact that individual Docs Audit scores are clickable.

**Editor**

* Prevented issues with duplicated pages when attempting to make subsequent edits before the operation was completed.

**AI Dropdown**

* Fixed an issue with spacing between icons and text.

**API Reference**

* The “Use Example Value” button now correctly respects parameter types.
* Fixed displaying binary data in example responses.
* Improved performance for pages with large OAS files or a high number of references.
* Fixed syncing OAS files with external references.
* Fixed an issue where pagination in My Requests was not working correctly.
* Fixed an issue where example objects and arrays could end up double-stringified.
* Fixed an issue where the OAuth scope list wasn’t updated when switching between endpoints in different OAS files in the Reference section.

**Auth**

* Fixed an issue where logos with large heights could push the login form off the screen.
* Fixed an issue where the Password Reset form could crash instead of showing an error message in specific situations.

**API Designer**

* Fixed issues where multiple parameters could be created with empty names.
* Fixed an issue where undefined schemas caused the designer to error.

**ReadMe API**

* Improved consistency when handling branch and version names with and without a `v` prefix.

**Documentation**

* Fixed an issue where pages linking to headers with non-Latin characters did not scroll correctly.

**Recipes**

* Fixed an issue where Recipes embedded on pages with large amounts of text could be scrolled out of view.
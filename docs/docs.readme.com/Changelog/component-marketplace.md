# Component Marketplace

<Image align="center" src="https://files.readme.io/b9828f7254c68711a0b6869cea2ec5b1db609eb79b07729d9ed168e86c959e68-components.webp" />

We’ve added a new Component Marketplace where you can browse and install vetted components from ReadMe and our community. You can find the marketplace on the Custom Components page and [contribute to new components on GitHub](https://github.com/readmeio/marketplace).

***

### New Features & Improvements

AI Agent

* You can now choose between AI models from Gemini, Claude, and OpenAI
* Added the option to provide the Agent with custom knowledge
* The Agent now has more context about your docs, leading to more relevant answers
* Chat history is now maintained per page

**API Designer**

* Response schemas are now fully editable
* Added support for object and array of object types in query parameters
* Server URLs are now rendered in monospace font
* Added support for editing multiple request bodies

**Docs**

* Enum values are now displayed in parameter descriptions

**MCP**

* Users can now specify which routes are enabled for their MCP server

**My Developers**

* Enterprise projects can now set variables without needing configured webhooks

**SEO**

* Open Graph images are now generated based on doc’s appearance and content

**Suggest in GitHub**

* Docs syncing with public repos can now add a “Suggest in GitHub” link to their pages, making it easier for readers to contribute

<br />

### Bugs Eaten (by Owlbert) 🐛

**Admin**

* Fixed a scroll-to-target issue when navigating between pages in admin view mode
* Fixed an issue where Ask AI links would fail to load for admins
* Fixed an issue where the versions panel could render off-screen
* Fixed an issue where admins could not `meta + click` links to open them in a new tab
* Fixed several issues that caused the UI to unexpectedly reload when navigating

**AI**

* Fixed various minor UI issues in the AI settings
* Fixed a bug that prevented the AI Agent chat from being accessible

**API Designer**

* Fixed an issue where stale values would sometimes be displayed in the UI

**CLI**

* Fixed an issue where working with semver-named branches could fail

**Components**

* Fixed an issue where component previews could fail to render

**Discussions**

* Fixed an issue where some users could appear as `undefined`
* Fixed an issue that caused certain users to see an empty Discussions page

**Docs**

* Fixed an issue in Custom Login setups that failed to redirect users to the correct page after logging in
* Fixed an issue where the OAuth authentication UI would not render
* Fixed an issue that caused some redirects to fail
* Fixed an issue where projects with Custom HTML would briefly see an empty state when navigating

**Editor**

* Fixed an issue with pasting text into table cells
* Fixed an issue with the link component’s open-in-a-new-tab feature not working

**Search**

* Fixed an issue where search results were ranked improperly
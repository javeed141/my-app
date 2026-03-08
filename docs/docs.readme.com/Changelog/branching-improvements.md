# Branching Improvements

<Image align="center" src="https://files.readme.io/a546973ec4ec3beff3d63b1e4c8b338074097166bb8775029af11b0d3486f2f2-Branches_2.webp" />

We’ve added new options for branch management: you can now delete a branch after it has been merged and merge a branch directly from the editor UI.

***

### New Features & Improvements

**Recipes**

* Improved layout and styling on the list of Recipes page.

**API Designer**

* Added an option for users to disable Try It Now and our API Proxy in the API Designer.
* Deleting an endpoint from the API Designer will now also remove it from the OpenAPI file.

**AI Agent**

* The AI Agent will now output JSX by default.
* When a page has MDX errors, you will be able to automatically fix them using the AI Agent.

<br />

### Bugs Eaten (by Owlbert) 🐛

**Documentation**

* What’s Next links for pages in the Reference section containing only markdown will now go to the correct place.
* Fixed an issue with viewing API Reference pages as Markdown.
* Fixed an issue where navigating between multiple sections could result in users seeing an empty state instead of previously loaded content.

**Search**

* Fixed an issue searching on versions that aren’t the main version of the project.

**OpenAPI Import**

* Fixed an issue where validation issues in an imported OpenAPI file weren’t being surfaced properly.

**Recipes**

* Fixed an issue with syntax highlighting in Recipes.

**Editor Role**

* Fixed an issue where users with the new Editor role weren’t able to access disabled sections.
* Users with the Editor role will now also be able to edit content stored in the Enterprise group.

**Email Notifications**

* Added a confirmation page for unsubscribing from emails to prevent email clients that prefetch links from inadvertently unsubscribing.

**Owlbot**

* Fixed an issue with Owlbot not returning responses in legacy projects.
* Slightly improved the average quality of Owlbot responses.

**API Designer**

* Fixed an issue with editing endpoints in OAS files where the filename contained spaces.
* Fixed an issue with editing the path/method for endpoints without an explicitly defined operationId.
* Fixed an issue where removing the last required item from an object resulted in an invalid OpenAPI file.
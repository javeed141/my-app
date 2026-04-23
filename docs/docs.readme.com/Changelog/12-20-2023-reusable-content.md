# Reusable Content

<Image align="center" src="https://files.readme.io/915f8c4-Content_Reuse.png" />

We’ve added Reusable Content! You can create blocks in the editor via the command menu `/`. You can reuse any combination of blocks you already have in the editor across guides and reference pages. [Read more](https://docs.readme.com/main/docs/reusable-content)

### 🪶 Other Improvements

* **Developer Dashboard:** Try It requests will populate with user emails if the user is logged in without any configuration required
* **Editor:** Callout headings are now `h2` tags for improved accessibility
* **Editor:** Reordering pages are now faster and more reliable
* **SAML:** Added an optional redirect URL on log out
* **Owlbot AI:** Updated AI model for more detailed responses and larger prompts (via GPT-4 Turbo)

### 🐛 Bugs Eaten (by Owlbert)

* **Developer Dashboard:** Fixed an issue where webhook URL couldn’t be removed
* **Developer Dashboard:** Fixed an issue with deleting custom variables rendering incorrect variables key names
* **Editor:** Updated outdated copy when adding your first first API
* **Editor:** Fixed an issue where reordering pages updated the timestamps of all pages
* **Editor:** Fixed an issue where you couldn’t save changes to pages after navigating from staging
* **SEO:** Fixed meta info not appearing when sharing links to Twitter
* **Search:** Fixed an issue where deleted endpoint pages weren’t being removed from search results
* **Search:** Fixed an issue where reindexing would fail if a project contained orphaned pages
* **Enterprise:** Fixed an issue with some projects not inheriting custom CSS from their parent
* **Enterprise:** Fixed an issue where changing a user role would change roles for multiple users
* **API Reference:** Fixed an issue where Try It requests were not working
* **Login:** Fixed an issue where admin logins on password protected pages weren’t redirecting to the correct page
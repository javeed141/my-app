# Staging Promotion Improvements

<Image align="center" src="https://files.readme.io/2c8b272-Changelog.png" />

We've made improvements to Enterprise Staging when promoting your changes to production to make it clearer which changes will be going live. We now show a breakdown of who made changes and which sections are affected.

### Improvements

* **Developer Dashboard**: When viewing an API Log, the list of headers is now collapsible.
* **Developer Dashboard**: Add an error rate chart that shows what percentage of requests errored across all of your developers.

### 🐛 Bugs Eaten (by Owlbert)

* **Editor**: Fixed the issue where the Reusable Content menu was preventing writing HTML in the editor.
* **API Reference**: Fixed the issue where a schema object property being set to `null` caused the page to crash.
* **API Reference**: Fixed the issue where optional objects with required properties were incorrectly being displayed as required objects.
* **API Reference**: Fixed the issue preventing switching an endpoint page back to a normal page in the dashboard.
* **Reusable Content**: Fixed the issue where Reusable Content blocks with special characters in their name couldn’t be deleted.
* **Discussions**: Fixed the issue preventing users from completing reCAPTCHA verification for suspected spam.
* **Quick Switcher**: Fixed the issue navigating to Guides and API References via the dashboard quick switcher.
* **SEO**: Fixed some admin routes not being disallowed in robots.txt.
* **Search**: Fixed links to reference pages returned via the search API endpoint.
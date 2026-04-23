# Simpler AWS API Gateway Setup

<Image align="center" src="https://files.readme.io/3ab9e12d2536640c4e582c4fe94bfa567a06dbe51ace983f7e59c709242d6e24-Changelog_1.webp" />

Setting up your Developer Dashboard with AWS API Gateway is easier than before. Get API keys in your docs and understand your API customers, by setting up within your AWS Console. Find the new setup steps from your Admin Dashboard → My Developers → Set Up API Keys and select the API Gateway tab.

### Improvements

* **Landing Page**: Added support for OpenGraph images
* **API Reference**: `minLength` and `maxLength` are now better surfaced in the UI
* **SSO**: SAML verification codes are now easier to spot in your emails
* **Custom Domains**: Some projects will see a new custom domains setup page

### 🐛 Bugs Eaten (by Owlbert)

* **SSO**: Fixed an issue with an empty safelist and authentication errors
* **Editor**: Fixed an issue where JSX comments would cause the page to crash
* **Editor**: Fixed an issue where back-to-back Reusable Content blocks could fail to render
* **Editor**: Fixed an issue where files could be mixed up on upload
* **API Reference**: Fixed an issue where base URLs in the request code is not persisted on refresh
* **API Reference**: Fixed a recent regression where parameter inputs weren’t reset between endpoint pages
* **Suggested Edits**: Fixed an issue where non-merged Suggested Edits would update the last updated timestamp
* **Inviting Users**: Fixed an issue where inviting users could sometimes fail
* **Docs**: Fixed an issue where you couldn’t navigate to a parent page if it was an endpoint
# Owlbot AI API for Asking Questions

<Image align="center" src="https://files.readme.io/7d03094-AI_API.png" />

We've added API access to ask Owlbot AI questions programatically to our Enterprise plan. This enables customers to embed Owlbot functionality directly within their product or wherever else information from documentation could be useful. View documentation on how to make a call [here.](https://docs.readme.com/main/reference/owlbot-ai)

## Generate SEO Metadata Description With AI

When editing SEO metadata you can automatically generate a short description of the page with AI.

### 🐛 Bugs Eaten (by Owlbert)

* **Auth**: Fixed issue where SAML End Users weren't getting updated permissions
* **Slack Integraiton**: Improved reliability of Slack notifications delivering
* **Owlbot AI**: Improve performance and reliability of Owlbot AI exports
* **Developer Dashboard**: Better communicate expiration of log URLs
* **Documentation**: Fixed issues with navigating from 404 pages with the back button
* **SEO**: Sitemap URL will now always be absolute in robots.txt
* **SEO**: Fix showing the sitemap in robots.txt for enterprise projects
* **SEO**: Only show entry in sitemap if the page has content
* **Editor**: Fix issue where the editor toolbar wouldn't always appear in the Changelog
* **Favicon**: Always show the uploaded favicon at /favicon.ico
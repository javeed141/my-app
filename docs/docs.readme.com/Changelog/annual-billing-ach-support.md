# Annual Billing & ACH Support

<Image align="center" src="https://files.readme.io/8158acd-billing.png" />

Over the past few weeks, we've rolled out improvements to our billing flow, including annual billing and supporting additional ways to pay. Customers who switch to one of the new annual plans will receive a discount on the monthly rate. In addition to paying via credit card, we now support payments via ACH as well as cards that require Enhanced Multi-Factor Authentication (MFA).

### Improvements

* **Recipes**: Added class names for components in Recipes for use with Custom CSS
* **Security**: Warning when deleting a project with a custom domain to remove CNAME in DNS provider

### 🐛 Bugs Eaten (by Owlbert):

* **Recipes**: Fixed menu overflow for projects with a lot of API Endpoints
* **Recipes**: Fixed error that occurred when reordering specific Recipes
* **API Reference**: Fixed setting the browser page title when navigating within the reference section
* **API Reference**: Fixed bug with redirect not persisting from the "Authenticate" button on the API Getting Started page
* **API Reference**: Fixed issue where certain browsers were missing styles in select components
* **Discussion**: Show suspected spam posts a captcha to prevent false positives
* **Documentation**: Fixed issue where the table of contents would be shown after navigating even when disabled
* **Documentation**: Fixed issue where non-teammates were able to view hidden versions
* **Search**: Fixed issue where project filters in search weren’t showing up until after a search was started
* **Staging**: Fixed issue where Group Viewers logged in via SAML were unable to view staging
* **Editor**: Fixed issue where focus was being lost when adding embedded content
# Single Sign On (SSO)

**Prerequisite**

Reach out to your CSM or Modern Treasury support to enable this feature, if eligible

**Introduction**

Single Sign-On (SSO) is an account security feature that allows customers to enforce sign-in requirements and user access to systems like the Modern Treasury dashboard. Modern Treasury supports Security Assertion Markup Language (SAML) version 2.0, which allows for the creation and authentication of user accounts to be deferred to an Identity Provider (IdP).

**Getting Started**

To enable and configure SSO for your organization, please contact your CSM or reach out to Modern Treasury Support ([support@moderntreasury.com](mailto:support@moderntreasury.com)).

Customer support will provide the following information to get you set up:

* **Assertion Consumer Service URL** - commonly referred to as ACS URL or ACS endpoint
* **Entity ID** - ID of the Modern Treasury service

Use this information to create a new SSO connection in your IdP.

Once the connection has been created, you will need to provide your Service Provider (SP) Metadata to customer support. This is typically a URL or an XML file provided by your IdP. This last step is crucial to completing your SSO setup.

**Testing**

After the initial setup, we recommend testing your connection to ensure that IdP-initiated SSO works as expected. Customer support will be available to assist you with troubleshooting any issues that may arise during this phase.

*Testing checklist:*

* [ ] &#x20;Login from the IdP portal
* [ ] &#x20;Seamlessly access the Modern Treasury dashboard
* [ ] &#x20;Address any error messages or unexpected behavior

**Optional - SSO-only Login**

After testing and ensuring that SSO works as expected, Modern Treasury can further restrict access to the Modern Treasury dashboard to only use SSO login. Please let customer support know if you would like to enable this restriction.

For any further assistance or questions, please reach out to Modern Treasury customer support ([support@moderntreasury.com](mailto:support@moderntreasury.com)).
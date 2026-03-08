# About the Pipedrive API

<Callout icon="📘" theme="info">
  An **application programming interface** (API) is a set of functionalities that a service owner provides so people can use its features and/or build software applications. An API details how a user makes requests and the responses they receive in return.
</Callout>

Pipedrive is a sales CRM with an intuitive [RESTful API](https://developers.pipedrive.com/docs/api/v1), webhooks, app extensions and API clients to help you build [an app](https://pipedrive.readme.io/docs/marketplace-creating-a-proper-app) for the [Pipedrive Marketplace](https://pipedrive.com/marketplace).

<hr />

## Pipedrive RESTful API

<hr />

Our Pipedrive **RESTful API Reference** can be accessed via [https://developers.pipedrive.com/docs/api/v1/](https://developers.pipedrive.com/docs/api/v1/), where you will find a list of endpoints and their descriptions.

Calls to our API are validated against an API token or an `access_token` when using [OAuth 2.0](https://pipedrive.readme.io/docs/marketplace-oauth-api). Our API supports UTF-8 for character encoding. Learn how to find and use the `api_token` [here](https://pipedrive.readme.io/docs/tutorials).

<Image align="center" alt={3687} border={false} caption="Pipedrive Entity Relationship Diagram (ERD)" title="Pipedrive full ERD.jpeg" src="https://files.readme.io/3e08ec2-Pipedrive_full_ERD.jpeg" />

### Webhooks

Webhooks enable you to obtain real-time, programmatic notifications from Pipedrive regarding changes to your data as they happen. Instead of pulling information via our API, webhooks will push information to your endpoint.

You can create webhooks via the web app and our API. You can create a webhook programmatically by making a `POST` request to the webhook’s endpoint. Pipedrive will then send a notification when an event is triggered (e.g., a new lead is added) as an HTTP post with a JSON body to the endpoint(s) you have specified.  Find out more about webhooks [here](https://pipedrive.readme.io/docs/guide-for-webhooks).

### App extensions

App extensions enable apps built for the Pipedrive Marketplace to give additional value to their users. With app extensions, the app’s functionality will be available directly inside the Pipedrive platform’s UI and users will be able to interact with and see the custom functionality of your app.

This also helps to increase your app's visibility and brand awareness, as the app icon will be displayed inside Pipedrive after a user has installed it. Find out more about app extensions [here](https://pipedrive.readme.io/docs/app-extensions).

### API clients

Pipedrive API clients are available on [GitHub](https://github.com/pipedrive). Some of the most popular repositories include:

* [Client-nodejs](https://github.com/pipedrive/client-nodejs) (official)
* [Client-php](https://github.com/pipedrive/client-php) (official)
* [Pipedrive](https://github.com/IsraelOrtuno/pipedrive) (community built)
* [Python-pipedrive](https://github.com/jscott1989/python-pipedrive) (community built)
* [Pipedrive-dotnet](https://github.com/DavidRouyer/pipedrive-dotnet) (community built)
* [Pipedrive.rb](https://github.com/amoniacou/pipedrive.rb) (community built)

<hr />

## How Pipedrive API works

<hr />

<Callout icon="📘" theme="info">
  Do take note that entity/entities may be called “item/items” or “type of item/items” for the end user in the Pipedrive web and mobile app.
</Callout>

At the base of your Pipedrive account is a customer relationship management (CRM) database of your sales pipeline, processes and relationships. As organizing sales data is essential for sales activities, Pipedrive helps to [organize and link your data together](https://support.pipedrive.com/en/article/how-is-pipedrive-data-organized) for better visibility through the core and adjacent entities.

### Core entities

Within the Pipedrive API, we have core entities that consist of multiple endpoints. These core entities represent a larger area inside Pipedrive and can be found in the left-hand side menu in the Pipedrive web app. Tied to them are adjacent entities that contain supplementary information relevant to the core entities.

<Image align="center" alt={2041} border={false} caption="Pipedrive core entities ERD" title="Core Entities w fields ERD.jpeg" src="https://files.readme.io/bd4ed77-Core_Entities_w_fields_ERD.jpeg" />

The ERD above shows how core entities are connected within Pipedrive.

* As leads can be converted to deals, they are sometimes used in place of each other. For example, in the case of activities, an activity can be associated with either a lead or a deal. This goes the same for products.
* Persons and organizations are considered contacts and are often grouped together.

Mailbox, found in the Mail tab of the Pipedrive web app, is the email control hub inside Pipedrive that stores all the emails a user decides to keep a record of. Mail is tracked and associated with persons and deals through Pipedrive’s email sync and Smart Bcc features.

\[Entity] Fields endpoints allow you to obtain the near-complete schema of the respective core entities. You can add, update and delete main and custom fields through these adjacent entities.

Read on to discover how leads, deals, persons and organizations (contacts), activities, products and users are further connected to other core and adjacent entities. <br />

### Leads

<Image align="center" alt={1847} border={false} caption="Leads ERD" title="Leads ERD.jpeg" src="https://files.readme.io/b1befef-Leads_ERD.jpeg" />

[Leads](adding-a-lead) are prequalified, potential deals that are kept in a separate inbox called the Leads Inbox. Leads can subsequently be converted to deals via the Pipedrive web app and added to a pipeline.

Leads can have activities, emails (mailbox) and notes attached to them. They can also have multiple LeadLabels to categorize them and be linked with one LeadSource to indicate where the lead came from.

Key aspects of leads:

* Leads must always have one person (contacts) or organization (contacts) linked with them
* Leads can only have one source (LeadSource). Leads created through the API have a set source “API”.
* Leads can only have the same [custom fields](https://pipedrive.readme.io/docs/core-api-concepts-custom-fields) (DealFields) as deals
* Leads can only be converted to deals via the Pipedrive web app\ <br />

### Deals

<Image align="center" alt={2443} border={false} caption="Deals ERD" title="Deals ERD.jpeg" src="https://files.readme.io/9892096-Deals_ERD.jpeg" />

[Deals](https://pipedrive.readme.io/docs/creating-a-deal) are ongoing transactions pursued with a person or an organization. It’s tracked and processed through the Stages of a pipeline until it’s won or lost. Deals can be converted from leads via the Pipedrive web app.

In Pipedrive, deals contain all actions taken towards closing a sale, for example, activities, emails (mailbox), notes and files, and have their own custom fields (DealFields). Products and subscriptions can also be attached to deals.

A deal can be linked with either a person or organization (contacts) but it must always have one contact linked with them. As a deal is associated with a contact, it will pull all information from the linked contact and, likewise, associate all actions performed on the deal with the linked contact. <br />

### Persons & organizations (contacts)

<Image align="center" alt={2073} border={false} caption="Persons & organizations (contacts) ERD" title="Persons & Organizations (Contacts) ERD.jpeg" src="https://files.readme.io/f6130f6-Persons__Organizations_Contacts_ERD.jpeg" />

Persons (or people) are the specific customers of the sales process, while [organizations](https://pipedrive.readme.io/docs/adding-an-organization) are the companies that the persons work at. Persons and organizations are considered contacts and they rest in one centralized hub in the Pipedrive web app. The ERD above depicts how different core and adjacent entities can either relate to contacts as a whole or persons/organizations specifically.

Both persons and organizations can have activities, notes and files attached to them and their respective main fields and custom fields (PersonFields and OrganizationFields). Emails (Mailbox) and products can only be linked to persons while OrganizationRelationships can only be linked to organizations.

Key aspects of Persons and organizations (contacts):

* A person can only be linked to one organization
* A lead or a deal must always have a person or an organization linked to it
* Both persons and organizations can have multiple deals open for them at the same time

### Activities

<Image align="center" alt={2043} border={false} caption="Activities ERD" title="Activities ERD.jpeg" src="https://files.readme.io/fcf6339-Activities_ERD.jpeg" />

[Activities](https://pipedrive.readme.io/docs/adding-an-activity) are any actions a user does towards the closing of a sale. There are different types of activities (ActivityTypes) that can be performed, e.g. a phone call (CallLogs), a meeting or a task. You can have custom activity types and custom fields (ActivityFields) for activities. Users can schedule activities in relation to a person, an organization or a lead/deal.

Key aspects of activities:

* Associating an activity with a deal will also associate the activity with the person and/or organization linked to the deal
* Currently, Files [can only be added](https://pipedrive.readme.io/docs/adding-a-file) to activities via the API

#### CallLogs

CallLogs for [calls made via the Pipedrive mobile app](https://support.pipedrive.com/en/article/calling-and-logging-calls-in-the-mobile-app) are also considered activities, which means they can be associated with a deal, a person and/or an organization. Do note that CallLogs differ from other activities as they only receive the information needed to describe the phone call. <br />

### Projects

<Image align="center" border={false} src="https://files.readme.io/16b22b4-Projects_ERD_-_ERD.png" />

[Projects](https://developers.pipedrive.com/docs/api/v1/Projects) represents projects and task management entities to assist sales processes from an after-sales activities perspective.  Each project has an owner and must be placed in a phase. Projects can be attached to an organization, person or deal. Projects can also be connected with Tasks and ProjectTemplates.

### Products

<Image align="center" alt={1401} border={false} caption="Products ERD" title="Products ERD.jpeg" src="https://files.readme.io/cb9b52c-Products_ERD.jpeg" />

[Products](https://pipedrive.readme.io/docs/adding-a-product) are goods and/or services that your company deals with. Products can have their own custom fields (ProductFields) and be attached to deals. Persons (contacts) can be added as participants and users can be added as followers for a product. Files can also be added to products. <br />

### Users

<Image align="center" alt={1598} border={false} caption="Users ERD" title="Users ERD.jpeg" src="https://files.readme.io/70fca2f-Users_ERD.jpeg" />

A Company within pipedrive comprises Users who may be grouped into teams. The ERD above depicts how different core and adjacent entities can relate to a company as a whole or users/teams specifically.

Goals may be related to a company, a team and/or a user. Users and teams can have their own specific PermissionSets and Roles, which are a part of the visibility groups’ feature. Users can also have their own UserSettings and UserConnections.

2 main types of webhooks can be created: [webhooks related to a company](https://pipedrive.readme.io/docs/guide-for-webhooks) and [webhooks for apps](https://pipedrive.readme.io/docs/webhooks-for-apps). When querying webhooks, a user can obtain the webhooks they’ve created, while apps can only see and delete webhooks that have the type set as `type= 'application'`. <br />
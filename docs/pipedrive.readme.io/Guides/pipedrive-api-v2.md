# Pipedrive API v2 overview

Pipedrive’s v1 API has been constantly evolving, but it is still based on the same foundations that were laid a long time ago. Pipedrive as a company has grown a lot since then and it is time to reflect that in our API as well. Hence, we are announcing a gradual transition to a new v2 version of our API.

The new v2 API comes with many benefits such as

* a lot less breaking changes;
* lower [rate limiter token costs](https://pipedrive.readme.io/docs/core-api-concepts-rate-limiting#token-based-rate-limiting) per endpoint;
* significantly better performance and response times, especially when iterating over large data sets;
* consistent and predictable behavior with compliance with REST best practices;
* better data quality due to stricter input validation.

## What is changing?

We will gradually release new v2 APIs to replace the corresponding parts of v1 API. The corresponding v1 APIs will then be marked for deprecation and have a grace period of at least 1 year for migrations.

## API v2 availability

Currently the following APIs are available as v2:

* Activities API
* Deals API
* Deal Followers API
* Deal Products API
* Fields API (ActivityFields, DealFields, OrganizationFields, PersonFields, ProductFields)
* Organizations API
* Organization Followers API
* Persons API
* Person Followers API
* Products API
* Product Followers API
* Product Variations API
* Pipelines and Stages API
* User Followers API
* Search API

## Migrating and overview of changes

We have compiled an in-depth [migration guide](https://pipedrive.readme.io/docs/pipedrive-api-v2-migration-guide) for migrating from v1 to v2 APIs and the endpoints are also documented on our [API Reference](https://developers.pipedrive.com/docs/api) page. As always, you can reach out to us through our [Developers' Community](https://devcommunity.pipedrive.com/) for further questions.
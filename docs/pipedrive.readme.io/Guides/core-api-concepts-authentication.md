# Authentication

<Callout icon="📘" theme="info">
  All requests to our API need **authentication**.
</Callout>

## If you're creating an app

Continue to [OAuth 2.0 overview](https://pipedrive.readme.io/docs/marketplace-oauth-api).\
You can find our step-by-step guide to getting OAuth 2.0 implemented in your app in [OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization) .

## If you're working with an API token integration

The API token must be provided in the `x-api-token` header for all requests, for example:

```curl
curl --request GET \
--url "https://companydomain.pipedrive.com/api/v2/deals" \
--header "x-api-token: 659c9fddb16335e48cc67114694b52074e812e03"
```

[How to find the API token?](https://pipedrive.readme.io/docs/how-to-find-the-api-token)

<Callout icon="📘" theme="info">
  Keep in mind that an API token is tied to a specific user and company, giving access to all user's data. You can only have one active API token at any time. If you change the API token, all existing integrations using this API token will not be able to make successful requests against our API and stop working.
</Callout>
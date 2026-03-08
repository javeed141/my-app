# OAuth 2.0 overview

The recommended authorization protocol for all public apps available in the Pipedrive Marketplace is the industry-standard [OAuth 2.0 protocol](https://oauth.net/2/). OAuth 2.0 allows apps granular access to users’ data and provides a secure and easy-to-use connection between the app and Pipedrive.

Using OAuth 2.0 authorization allows all requests you make to Pipedrive API to be authorized by a user. A Pipedrive user must grant access to their data for the app. As proof of this grant, every request to our API must contain a valid `access_token`. Every `access_token` is bound to:

* The Pipedrive user who granted the access
* The company of the user (if a user is connected to multiple accounts, then it’s dependent on the company they’re logged into when authorizing the app)
* The 3rd party app which asked for this access
* A [set of permissions](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations) that will be allowed
* An expiration date

To get access to the users’ data, the app must be registered in the Pipedrive Marketplace as this is where the app installation (i.e. access-granting) process starts.

<Callout icon="📘" theme="info">
  See our [OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization) for a step-by-step guide on implementing OAuth 2.0 for your app.
</Callout>

<hr />

## Steps to take to get the `access_token`

<hr />

1. Get your [developer sandbox account](https://developers.pipedrive.com/)
2. Register your app in [Developer Hub](https://pipedrive.readme.io/docs/marketplace-registering-the-app) to get the [`client_id`, `client_secret`](https://pipedrive.readme.io/docs/client-id-and-client-secret) and subsequently, choose relevant [scopes](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations) for your app
3. Implement the OAuth 2.0 protocol by following our guide for [OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization)

Now you should have the `access_token` and `refresh_token` necessary for making requests to Pipedrive’s API.

<hr />

## How to authenticate the requests?

<hr />

All requests to the API should be authenticated with the `access_token` by providing its value in the Authorization header:

```text URL
GET https://{COMPANYDOMAIN}.pipedrive.com/api/v1/deals -H 'Authorization: Bearer v1u:AQIABHj...XNYcKcd_8LIrqRhRT9GQs4XW1MawrF_K4yg'
```
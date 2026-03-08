# How to get the company domain

There are a few methods for getting the value of the subdomain for a Pipedrive company for which we use the `company_domain` parameter:

* [Finding it manually](https://pipedrive.readme.io/docs/how-to-get-the-company-domain#method-1)
* [Request to `GET /users/me` endpoint](https://pipedrive.readme.io/docs/how-to-get-the-company-domain#method-2)
* [Request to the OAuth server](https://pipedrive.readme.io/docs/how-to-get-the-company-domain#method-3)

<hr />

## Method 1

<hr />

You can get it manually from the Pipedrive app by logging into your Developer Sandbox account and seeing the URL:

<Image alt={1480} border={true} src="https://files.readme.io/8910671-Company_domain.png" title="Company domain.png" className="border" />

<hr />

## Method 2

<hr />

You can fetch it via [`GET /users/me`](https://developers.pipedrive.com/docs/api/v1/Users#getCurrentUser). Just **copy the command** below into your terminal and don't forget to replace the placeholder with your actual API token. Execute the command and find the `company_domain` in the JSON output:

```curl
curl --request GET \
  --url https://api.pipedrive.com/v1/users/me \
  --header 'x-api-token: YOUR_API_TOKEN_HERE'
```

You can check the [`GET /users/me`](https://developers.pipedrive.com/docs/api/v1/Users#getCurrentUser) response structure [here](https://pipedrive.readme.io/docs/marketplace-getting-user-data).

<hr />

## Method 3

<hr />

If you’re using [OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization) you can get the `company_domain` in the OAuth server's response when making a HTTP request to it.  In the JSON response body, `company_domain` will be a part of the `api_domain` parameter's value.

More info can be found about it in the [getting the OAuth tokens](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-4-and-step-5-getting-the-tokens) and [refreshing the OAuth tokens](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-7-refreshing-the-tokens) sections.
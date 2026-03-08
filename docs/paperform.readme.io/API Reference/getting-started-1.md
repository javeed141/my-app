# Getting Started

## Paperform API (1.0.0)

Paperform API Support: <support@paperform.co> | URL: <https://paperform.co>

## Authentication

API access is only available with either the Standard or Business API for Paperform, and the Papersign API for Papersign. Please see the [Paperform pricing page](https://paperform.co/pricing/) or the [Papersign pricing page](https://paperform.co/products/papersign/#pricing) to see the plans that have these features. To use this API you will need a valid API Key. You can generate an API key on [your account page](https://paperform.co/account/developer). Your API key needs to be sent with every request in the authorization header:

```text
"Authorization": "Bearer <token>"
```

## Rate Limits

The Paperform API is rate limited to prevent abuse. If you exceed the rates, you will see a response of `429 Too Many Requests`. You can monitor your current usage and limits via the following response headers.

| Header                | Description                                           |
| :-------------------- | :---------------------------------------------------- |
| X-RateLimit-Limit     | Request limit per minute.                             |
| X-RateLimit-Remaining | The number of requests left for the time window.      |
| Retry-After           | How many seconds to wait before the limit has lifted. |
| X-RateLimit-Reset     | Unix timestamp for when the limit will lift.          |

## Contact Support

For help working with the Paperform API contact our support team via the [in-app chat](https://paperform.co/dashboard) or via [email](mailto:support@paperform.co).

[block:embed]
{
  "html": false,
  "url": "https://rxc0gfw9.paperform.co?embed=1&inline=1",
  "title": "Request an API Feature",
  "favicon": "https://rxc0gfw9.paperform.co/favicon-16x16.png",
  "image": "https://img.paperform.co/fetch/w_1800,f_jpg,c_limit/https://s3-ap-southeast-2.amazonaws.com/paperform/u-1/1/2018-09-09/cl53rxa/Screen%20Shot%202018-09-09%20at%204.33.34%20pm.png",
  "provider": "rxc0gfw9.paperform.co",
  "href": "https://rxc0gfw9.paperform.co?embed=1&inline=1",
  "height": "570px",
  "width": "100%",
  "iframe": true
}
[/block]
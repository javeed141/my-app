# Authentication

# Authentication Method

All requests must be made over HTTPS and will be authenticated over standard [HTTP basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).

## API Authentication Username & Password

Authentication requires a `username` and a `password`. When these values are requested in console/terminal, programming libraries, SDKs, or even here in our docs, use the following values for `username` and `password`:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        `username`
      </th>

      <th>
        `password`
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Organization ID
      </td>

      <td>
        Production or Sandbox API Key
      </td>
    </tr>
  </tbody>
</Table>

# Retrieve API Keys

You can retrieve your production and sandbox API keys from the [API keys page](https://app.moderntreasury.com/developers/api_keys) in the dashboard.

> 🚧 Keep your API keys secret!
>
> API keys must be kept secret. They should not be in your client-side code or checked into your application's code.

# Example Requests

## Ping

```shell Ping Request
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ping
```

## Current API Key

You can also view information about the current API key. ([View more.](https://docs.moderntreasury.com/reference#api-keys))

```shell Current API Key Request
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \ 
  --url https://app.moderntreasury.com/api/api_keys/current
```
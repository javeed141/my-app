# Migrating existing integration users

If you are a partner with an existing API token integration, you may want to migrate your existing integration's users to a Marketplace app.

It's possible to exchange the API token to a pair of access and refresh tokens using a custom grant type. You must execute this HTTP request to the OAuth server:

```text URL
POST https://oauth.pipedrive.com/oauth/token
```

In order to execute the request, your request **has** to be authenticated via HTTP Basic Auth with the values of `client_id` and `client_secret`.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Header parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `Authorization`
      </td>

      <td>
        Base 64 encoded string containing the `client_id` and `client_secret` values.\
        Value should be `"Authorization: Basic <base64(client_id:client_secret)>"`.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="🚧" theme="warn">
  Note that authentication could also be done by providing values for <code>client\_id</code> and `client_secret` in the request body, but it's not recommended. Use it only when you cannot use HTTP Basic Auth approach.
</Callout>

| Body parameter | Description                                                                                                   |
| :------------- | :------------------------------------------------------------------------------------------------------------ |
| `grant_type`   | Since you are trying to exchange an API token to a pair of tokens, you must use value `"exchange_api_token"`. |
| `api_token`    | API token of the user                                                                                         |

<Callout icon="🚧" theme="warn">
  Have in mind that each `api_token` can be exchanged only once, you have one chance for this operation. In case of problems, please contact [marketplace.devs@pipedrive.com](mailto:marketplace.devs@pipedrive.com)
</Callout>

If all data is correct, you will receive a response with the JSON data:

| JSON key name   | Description                                                                                          |
| :-------------- | :--------------------------------------------------------------------------------------------------- |
| `access_token`  | Access token you need to use for accessing user's data via API                                       |
| `token_type`    | The format of the token. Always "bearer"                                                             |
| `refresh_token` | Refresh token which is needed when you refresh `access_token`                                        |
| `scope`         | List of scopes selected in the app's settings                                                        |
| `expires_in`    | TTL of access token in seconds. After this time token will become invalid and you have to refresh it |
| `api_domain`    | The base URL path, including the `company_domain`, where the requests can be sent to.                |

When the exchange of the tokens was successful, all users who were previously using the API token integration, will receive an email notifying them about the following:

* the integration has now been updated to an OAuth app,
* the OAuth app has been installed to their company,
* the user needs to confirm [the permissions](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations)  the app has in their account before starting to use it.

The app will also appear in the user's *Settings > Tools and apps > Marketplace apps* page.

<Callout icon="❗️" theme="error">
  Now you **should** delete the API token, because from this point on your app must only use OAuth authentication.
</Callout>
# Handling user app uninstallation

Once you’ve put a lot of effort into designing, building and launching your app, we’re pretty sure you’d like to be notified if a user uninstalls it. In addition, your server should also know so that it can stop sending requests for that specific user.

Continue reading to get details on the app uninstallation flow.

<hr />

## Uninstall callback

<hr />

After a successful app uninstall by a user, the OAuth server will send a `DELETE` request in `JSON` format to the “Callback URL” (a value you [specified in the *Developer Hub > Basic info*](https://pipedrive.readme.io/docs/marketplace-registering-the-app#basic-info) for your app).

> 📘 As it's a background request, this won't work with any local URLs like 127.0.0.1, localhost, etc.

This `DELETE` request's body will be in `JSON` format and it will contain the following properties:

| Property     | Description                                                                           |
| :----------- | :------------------------------------------------------------------------------------ |
| `client_id`  | The Client ID provided to you by the Pipedrive Marketplace when you register your app |
| `company_id` | Company ID of the Pipedrive User who uninstalled the app                              |
| `user_id`    | ID of the Pipedrive User who uninstalled the app                                      |
| `timestamp`  | Date and time of the app uninstallation                                               |

This `DELETE` request will be authenticated with HTTP Basic Auth including app credentials (`client_id` and `client_secret`) encoded with Base 64. This is done for security reasons, so your app can verify the request is valid and originated by the Pipedrive OAuth server.

Example of code in Node.js:

```javascript node.js
const basicAuthHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
 
if (`Basic ${basicAuthHeader}` === request.get('authorization')) {
    // request is valid
}
```

Response code and body from your side are not read or processed by us.

<hr />

## Token revocation

<hr />

When the uninstall is initiated from the vendor's side, an app must revoke the access that a Pipedrive user has granted it and invalidate the `refresh_token`.

This token revocation endpoint conforms to [RFC 7009](https://tools.ietf.org/html/rfc7009).

In order to execute the request, your request has to be authenticated via HTTP Basic Auth with the values of `client_id` and `client_secret`.

```text URL
POST https://oauth.pipedrive.com/oauth/revoke
```

Content-type for the request must be `application/x-www-form-urlencoded`.

| Header parameter | Description                                                                                                                                              |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`  | Base 64 encoded string containing the `client_id` and `client_secret` values. Value should be "`Authorization: Basic <base64(client_id:client_secret)>`" |

### Revoking the Refresh Token aka marking an app uninstalled

By sending a `refresh_token`, **all** OAuth data is removed from our side, which means the app is marked uninstalled.

| Body parameter    | Required |                                                                                                                                                                       |
| :---------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`           | Yes      | The `refresh_token` to be revoked                                                                                                                                     |
| `token_type_hint` | Optional | Allowed values: `refresh_token`. If the server is unable to locate the token using the given hint, it will extend its search across all of its supported token types. |

The server responds with the HTTP status code 200 if the token revocation has been successful or if the client submitted an invalid token (see [https://tools.ietf.org/html/rfc7009#section-2.2](https://tools.ietf.org/html/rfc7009#section-2.2)).

### Revoking the Access Token

By sending the `access_token`, only the `access_token` is revoked. The `refresh_token` still exists, which means the app is still "installed". The existing `refresh_token` can be used to get a new `access_token`.

| Body parameter    | Required |                                                                                                                                                                                                                                                                                     |
| :---------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`           | Yes      | The `access_token` to be revoked                                                                                                                                                                                                                                                    |
| `token_type_hint` | Optional | Allowed value: `access_token`. If the server is unable to locate the token using the given hint, it will extend its search across all of its supported token types. E.g. if type hint is "`access_token`" and no such access token is found, it will try to revoke `refresh_token`. |
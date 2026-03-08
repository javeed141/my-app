# OAuth authorization

Using OAuth 2.0 is necessary for developing apps that are available in the Pipedrive Marketplace. Authorization via [OAuth 2.0](https://oauth.net/2/) is a well-known and stable way to get fine-grained access to an API.

After [registering the app](https://pipedrive.readme.io/docs/marketplace-registering-the-app), you must add the necessary server-side logic to your app to establish the OAuth flow.\
Here’s a diagram showing the flow of authorization:

<Image title="Marketplace guide diagram (1).png" alt={1140} align="center" width="80%" src="https://files.readme.io/95aade2-Marketplace_guide_diagram_1.png" />

And here's a video to get you more acquainted with building apps with OAuth:

<Embed url="https://www.youtube.com/watch?v=U6GBrUmfaR4" title="Your first Pipedrive app using OAuth" favicon="https://www.google.com/favicon.ico" image="https://i.ytimg.com/vi/U6GBrUmfaR4/hqdefault.jpg" provider="youtube.com" href="https://www.youtube.com/watch?v=U6GBrUmfaR4" typeOfEmbed="default" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FU6GBrUmfaR4%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DU6GBrUmfaR4%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FU6GBrUmfaR4%252Fhqdefault.jpg%26key%3D7788cb384c9f4d5dbbdbeffd9fe4b92f%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

<hr />

## Step 1: Requesting authorization

<hr />

> 🚧
>
> This step is necessary to implement only when you allow app installation **outside** of the Marketplace.

First, your app must start the authorization process. For that, you must redirect the customer’s web browser to make a request to the OAuth server’s `/authorize` endpoint:

```text URL
GET https://oauth.pipedrive.com/oauth/authorize?client_id=b4d083d9216986345b32&state=148aHxbdd92&redirect_uri=https://awesomeapp.com/oauth/callback
```

The request must provide the following `GET` parameters:

| Query parameter | Required | Description                                                                                                                                                                                                                                                                                                                                              |
| :-------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client_id`     | Yes      | The [client ID](https://pipedrive.readme.io/docs/client-id-and-client-secret) provided to you by the Pipedrive Marketplace when you register your app.                                                                                                                                                                                                                                |
| `redirect_uri`  | Yes      | The callback URL you provided when you registered your app. Authorization code will be sent to that URL (if it matches with the value you entered in the registration form) if a user approves the app install. Or, if a customer declines, the corresponding error will also be sent to this URL.                                                       |
| `state`         | No       | You may pass any random string as the **state** parameter and the **same** string will be returned to your app after a user authorizes access. It may be used to store the user’s session ID from your app or distinguish different responses. Using **state** may increase security; see [RFC-6749](https://tools.ietf.org/html/rfc6749#section-10.12). |

<hr />

## Step 2: Customer authorizes the app

<hr />

As a result of the request from [Step 1](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-1-requesting-authorization), the customer will see a page with the confirmation dialog, which will present the details of your app (title, company name, icon) and explain the permission scopes that you have set for the app. Customers should confirm their wish to install the app by clicking "Allow and install" or deny authorization by clicking "Cancel".

<hr />

## Step 3: Callback to your app

<hr />

After the customer accepts or denies your app installation, the browser will be redirected to your callback URL (which was registered with the app) with the result of the user’s action:

```text URL
GET https://<your_callback_url>?code=123.456.2d73391055ca60cbf07f13aaaaf1207cfe33a4b605&state=148aHxbdd92
```

The following query parameters will be passed to the request:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Query parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `code`
      </td>

      <td>
        The `authorization_code` that was issued when the user agreed to the installation. You will need this code to exchange it for the `access_token`.
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td>
        The error code (`user_denied`) is sent if the user denied installation.

        :warning: Code and error parameters are mutually exclusive!
      </td>
    </tr>

    <tr>
      <td>
        `state`
      </td>

      <td>
        The same value will be returned to your callback URL if the state was provided during the authorization request.
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Step 4 and Step 5: Getting the tokens

<hr />

> 📘
>
> After the customer has clicked "Allow and install" in [Step 2](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-2-customer-authorizes-the-app), make sure that the customer has created and logged into an account in your app before exchanging the `authorization_code`.

After the customer has confirmed the app installation, you will need to exchange the `authorization_code` to a pair of access and refresh tokens. Using an access token, you can access the user’s data.

> 🚧
>
> Note that the `authorization_code` expires in **5 minutes**.

To exchange the `authorization_code` for the tokens, you must execute this HTTP request to the OAuth server:

```text URL
POST https://oauth.pipedrive.com/oauth/token
```

The content-type for the request must be `application/x-www-form-urlencoded`.

To execute the request, your request **has** to be authenticated via HTTP Basic Auth with the values of the `client_id` and the `client_secret` (you can find the values like [this](https://pipedrive.readme.io/docs/client-id-and-client-secret#how-to-get-your-client_id-and-client_secret)).

| Header parameter | Description                                                                                                                                                   |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization    | Base 64 encoded string containing the `client_id` and `client_secret` values. The value should be `"Authorization: Basic <base64(client_id:client_secret)>"`. |

> 🚧
>
> Note that authentication could also be done by providing values for the `client_id` and the `client_secret` in the request body, but it's not recommended. Use it only when you cannot use HTTP Basic Auth approach.

| Body parameter | Description                                                                                                                 |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `grant_type`   | Since you are trying to exchange an authorization code for a pair of tokens, you must use the value `"authorization_code"`. |
| `code`         | The authorization code that you received after the user confirmed app installation.                                         |
| `redirect_uri` | The callback URL you provided when you registered your app.                                                                 |

If all data is correct, you will receive a response with the JSON data:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        JSON key name
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `access_token`
      </td>

      <td>
        You need to use an `access token` for accessing the user's data via API.

        :information\_source: You will need to [refresh the access token](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-7-refreshing-the-tokens)  if the`access_token` becomes invalid.\
        :information\_source: Access token length can fluctuate based on the information encrypted in the tokens, which continues to grow as we expand the Pipedrive platform. We recommend using a minimum of varchar (768) for storing the tokens in your app’s database.
      </td>
    </tr>

    <tr>
      <td>
        `token_type`
      </td>

      <td>
        The format of the token. Always "bearer".
      </td>
    </tr>

    <tr>
      <td>
        `refresh_token`
      </td>

      <td>
        A refresh token is needed when you refresh the access token. `refresh_token` will expire if it isn't used in **60 days**. Each time `refresh_token` is used, its expiry date is **reset** back to **60 days**.
      </td>
    </tr>

    <tr>
      <td>
        `scope`
      </td>

      <td>
        List of scopes to which users have agreed to grant access within this `access_token`.
      </td>
    </tr>

    <tr>
      <td>
        `expires_in`
      </td>

      <td>
        The maximum time in seconds until the `access_token` expires.
      </td>
    </tr>

    <tr>
      <td>
        `api_domain`
      </td>

      <td>
        The base URL path, including the `company_domain`, where the requests can be sent to.
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Step 6: Using the tokens

<hr />

When you have the tokens, you can execute API requests with `access_token`.

You need to add the `company_domain` to the request URL and provide the `access_token` in every request in the `Authorization` header:

```text URL
GET https://{COMPANYDOMAIN}.pipedrive.com/api/v1/deals -H 'Authorization: Bearer v1u:AQIABHj...XNYcKcd_8LIrqRhRT9GQs4XW1MawrF_K4yg'
```

Remember that `access_token` is bound to the scopes your app asked permissions for from the user, so requests will be denied if they will be executed against the API endpoints that are not in [these scopes](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations).

For example, you can also use `access_token` to [retrieve user’s data](https://pipedrive.readme.io/docs/marketplace-getting-user-data) from the [`/users/me`](https://developers.pipedrive.com/docs/api/v1/Users#getCurrentUser) endpoint and then generate an account for this user using the received data. In this way, the user has an account on your app’s side and doesn’t need to worry about additional registrations.

<hr />

## Step 7: Refreshing the tokens

<hr />

The `access_token` has a lifetime. After a period of time, which was returned to you in `expires_in` JSON property, the `access_token` will be invalid, and you can no longer use it to get data from our API. To refresh the `access_token`, you must use the `refresh_token`. You need to execute an HTTP request to the OAuth server:

```text URL
POST https://oauth.pipedrive.com/oauth/token
```

Content-type for the request must be `application/x-www-form-urlencoded`.

| Header parameter | Description                                                                                                                                                   |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Authorization`  | Base 64 encoded string containing the `client_id` and `client_secret` values. The value should be `"Authorization: Basic <base64(client_id:client_secret)>"`. |

| Body parameter  | Description                                                                             |
| :-------------- | :-------------------------------------------------------------------------------------- |
| `grant_type`    | Since you are to refresh your `access_token`, you must use the value `"refresh_token"`. |
| `refresh_token` | The refresh token that you received after you exchanged the authorization code.         |

If all data is correct, you will receive a response with the JSON data:

| JSON key name   | Description                                                                                                                                                                |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `access_token`  | The new access token you need to use for accessing the user's data via API. `access_token` expires after 60 minutes.                                                       |
| `token_type`    | The format of the token. Always "bearer".                                                                                                                                  |
| `refresh_token` | The refresh token which is needed when you refresh the `access_token`. The same `refresh token` will be issued in the response with the expiry window extended by 60 days. |
| `scope`         | List of scopes to which users have agreed to grant access within this `access_token`.                                                                                      |
| `expires_in`    | TTL of access token in seconds. After this time, the `access_token` will become invalid and you have to refresh it.                                                        |
| `api_domain`    | The base URL path, including the `company_domain`, where the requests can be sent to.                                                                                      |

As the `refresh_token` expires when it hasn't been renewed during a 60-day period, you might encounter a situation when you’ll need to get a new `refresh_token`. In this case, the whole installation process needs to be started from the beginning with the [user installing the app](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-1-requesting-authorization) and you exchanging the `authorization_code` for `access_token` and `refresh_token`.
# OAuth status codes

Learn about the Marketplace status codes for both [OAuth](docs:marketplace-oauth-and-api-proxy-status-codes#oauth) and [API request](https://pipedrive.readme.io/docs/marketplace-oauth-and-api-proxy-status-codes#api-request) to indicate the success or failure of your requests.

<hr />

## OAuth

<hr />

[https://oauth.pipedrive.com](https://oauth.pipedrive.com)

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Status Code
      </th>

      <th>
        URL
      </th>

      <th>
        Message
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `200` OK
      </td>

      <td>
        **/oauth/token**
      </td>

      <td />

      <td>
        Example response:

        \{

        ```
        "access_token": "ACCESS_TOKEN", 
        "token_type": "Bearer", 
        "expires_in": 3600,
        "refresh_token": "REFRESH_TOKEN", 
        "scope": "..scopes..,base" 
        ```

        }
      </td>
    </tr>

    <tr>
      <td>
        `400` Bad Request
      </td>

      <td>
        **/oauth/token**
      </td>

      <td>
        Missing parameter: `grant_type`
      </td>

      <td>
        Required parameter `grant_type` is not provided
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Unsupported grant type: `grant_type` is invalid
      </td>

      <td>
        Provided parameter `grant_type` is not valid. Supported values: `authorization_code`, `refresh_token`, `exchange_api_token`
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid grant: `authorization_code` is invalid
      </td>

      <td>
        Provided value of `authorization_code` parameter is not valid or was already exchanged to ACCESS TOKEN
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid grant: `authorization_code` has expired
      </td>

      <td>
        More than 5 minutes passed after issue of provided `authorization_code` and it became invalid
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid grant: `refresh_token` is invalid
      </td>

      <td>
        Provided `refresh_token` is not valid for provided client credentials or it was already exchanged
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid grant: `api_token` is invalid
      </td>

      <td>
        Provided parameter `api_token` is not valid for any Pipedrive user
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid client: cannot retrieve client credentials
      </td>

      <td>
        Both or at least one of required parameters `client_id` or `client_secret` were not provided in the request
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid client: client is invalid
      </td>

      <td>
        Provided values of `client_id` or `client_secret` are not valid
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid request: `redirect_uri` is not a valid URI
      </td>

      <td>
        Required parameter `redirect_uri` is not provided or value is not a valid URI
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid request: `redirect_uri` is invalid
      </td>

      <td>
        Provided value of `redirect_uri` parameter doesn't match with value defined in Developer Hub
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        Invalid request: content must be `application/x-www-form-urlencoded`
      </td>

      <td>
        Request to OAuth should have Content-Type `application/x-www-form-urlencoded`
      </td>
    </tr>

    <tr>
      <td />

      <td>
        **/oauth/authorize**
      </td>

      <td>
        App cannot be installed for requested company
      </td>

      <td>
        User tried to install app that was removed from the Marketplace or not visible for last active user company in Pipedrive
      </td>
    </tr>

    <tr>
      <td>
        `500`
      </td>

      <td>
        **\***
      </td>

      <td>
        Internal Server Error
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `503`
      </td>

      <td>
        **/oauth/authorize**
      </td>

      <td>
        Whoops! Something broke in our servers and we cannot serve you this page.
      </td>

      <td>
        Company database of Pipedrive user is under maintenance
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## API request

<hr />

[https://companydomain.pipedrive.com/api/v2/](https://companydomain.pipedrive.com/api/v2/)

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Status Code
      </th>

      <th>
        Message
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `200` OK
      </td>

      <td />

      <td />
    </tr>

    <tr>
      <td>
        `201` Created
      </td>

      <td />

      <td>
        Resource created
      </td>
    </tr>

    <tr>
      <td>
        `204` No Content
      </td>

      <td />

      <td>
        No content *(purpose can be different for different resources)*
      </td>
    </tr>

    <tr>
      <td>
        `400` Bad Request
      </td>

      <td>
        Invalid request: malformed authorization header
      </td>

      <td>
        Provided value of access token in `Authorization` header doesn't follow format `Bearer ACCESS_TOKEN`
      </td>
    </tr>

    <tr>
      <td />

      <td>
        *(An explanation of what went wrong, which can be different for different resources)*
      </td>

      <td>
        Request contains invalid or missing data. Mostly relevant for `POST` and `PUT` requests.
      </td>
    </tr>

    <tr>
      <td>
        `401` Unauthorized
      </td>

      <td>
        Invalid token: `access_token` is invalid
      </td>

      <td>
        Provided `access_token` in `Authorization` header is not valid
      </td>
    </tr>

    <tr>
      <td>
        `403` Forbidden
      </td>

      <td>
        Scope and URL mismatch
      </td>

      <td>
        Not allowed to access requested resource by application scope that is defined by owner
      </td>
    </tr>

    <tr>
      <td>
        `404` Not found
      </td>

      <td>
        `%Resource` not found
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `410` Gone
      </td>

      <td />

      <td>
        Old resource permanently unavailable
      </td>
    </tr>

    <tr>
      <td>
        `422` Unprocessable Entity
      </td>

      <td />

      <td>
        For example, when the webhooks limit is reached for a user or an app and it's forbidden to create a new one
      </td>
    </tr>

    <tr>
      <td>
        `429` Too Many Requests
      </td>

      <td>
        Request over limit
      </td>

      <td>
        API requests limit reached for a company
      </td>
    </tr>

    <tr>
      <td>
        `500`
      </td>

      <td>
        Internal Server Error
      </td>

      <td />
    </tr>
  </tbody>
</Table>
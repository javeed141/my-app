# OAuth Flows in Try It!

OAuth flows automatically apply authentication headers to API requests based on your OpenAPI security schemes

# Overview

Testing OAuth APIs just got a whole lot easier. With OAuth flows enabled in ReadMe's Try It! feature, your developers can generate authentication tokens within Try It! and those tokens will be auto-populated in your authentication headers across all your OAuth endpoints.

## What This Does for You

When OAuth flows are active in your Try It! interface, authentication happens automatically. The feature reads OAuth security schemes from your OpenAPI specification and prompts the user to go through the authorization flow to generate a token.  Since scopes can also be defined in the OpenAPI definition, developers will also see what scopes are required for each endpoint and can create a token with those scopes applied.  Once the token is generated, it is automatically applied to all API endpoints that support OAuth.

## How It Works

Your OpenAPI file and the OAuth security schemes power the OAuth flow. Here's the flow:

1. **Token Input Prompt**: Try It! detects your OAuth configuration and prompts users to go through the authorization flow
2. **Flexible Token Options**: Users can either:
   * **Get tokens directly in Try It!** (when your OAuth provider supports direct token exchange)
   * **Paste externally obtained tokens** (for flows requiring external authentication)
3. **Support for Scopes**: Based on your OpenAPI definition, the user can select scopes and see which ones are required for specific endpoints
4. **Automatic Header Injection**: Once a token is provided, Try It! automatically adds the proper `Authorization` token header to all subsequent API requests

### Supported Grant Types

Try It! works with the following grant types:

* **Client Credentials** - Perfect for server-to-server authentication
* **Authorization Code** - Ideal for user-facing applications

The experience adapts based on what your OpenAPI spec defines, giving developers the right authentication flow for your specific use case.

## Example: Testing with OAuth

Here's what your developers will see when testing an OAuth-secured endpoint:

```yaml
# In your OpenAPI spec
components:
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://api.example.com/oauth/token
          scopes:
            read: Grants read access
            write: Grants write access
```

When developers hit "Try It!" on a secured endpoint:

1. They'll see a token input field in the Try It! panel
2. They can either obtain a token directly (if supported) or paste one from your OAuth provider
3. Try It! automatically includes `Authorization: Bearer <their-token>` in the request
4. They get real, authenticated API responses without manual header management

## What This Feature Doesn't Do

Let's be clear about the boundaries—OAuth flows in Try It! streamline authentication, but they don't:

* **Modify your OpenAPI definition** - Your spec stays exactly as you've defined it
* **Generate tokens universally** - Token generation only works when your OAuth provider supports direct exchange
* **Support Refresh Token Workflows** - Tokens will need to be regenerated from the token endpoint and not via a refresh token endpoint.
* **Manage OAuth parameters** - Audience, scope, and additional parameters must be configured in your OpenAPI file

Think of it as authentication made simple, not authentication made magical. The feature works within the constraints of your existing OAuth setup to provide the smoothest possible testing experience.

## Getting the Most Out of OAuth Flows

To maximize the benefits for your developers:

* **Define clear security schemes** in your OpenAPI spec with accurate `tokenUrl` endpoints
* **Document token requirements** in your guides—let developers know what scopes or permissions they need
* **Test the flow yourself** to ensure the authentication experience matches your API's requirements

OAuth flows in Try It! transform API testing from a multi-step authentication dance into a one-click experience. Your developers get faster feedback loops, and you get more comprehensive API testing across your documentation.

Ready to enable seamless authenticated testing? Your OpenAPI spec is the key—define those OAuth security schemes and watch Try It! handle the rest.

## Additional Details

* By default, for client credential flows, ReadMe encodes the client ID and client secret as an authorization header as recommended by the OAuth 2.0 RFC. If you want to pass the credentials in the payload instead, you'll need to update your OpenAPI spec with the `useInsecureClientAuthentication` extension like below:

```json
{
  "x-readme": {
    "oauth-options": {
      "useInsecureClientAuthentication": true
    }
  }
}
```

* By default, ReadMe uses spaces for scope separation, but different formats can be supported as well using the `scopeSeparator` extension like below:

```json
{
  "x-readme": {
    "oauth-options": {
      "scopeSeparator": ","
    }
  }
}
```
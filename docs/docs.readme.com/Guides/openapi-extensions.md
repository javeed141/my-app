# OpenAPI Extensions

We've added a few OpenAPI extensions to help you better integrate with ReadMe.

## Getting Started

[Extensions](https://swagger.io/docs/specification/openapi-extensions) are properties added to an OpenAPI spec that customize your API Reference user experience. All of these properties are optional.

ReadMe extensions are defined by the `x-readme` object and most can be placed either on the root level of your spec, or on the operation level. See the [Usage](#usage) section below for specific details.

Want to see a spec file that utilizes these extensions? Take a look at the example demo spec file [here](https://github.com/readmeio/oas/blob/main/packages/oas-examples/3.0/json/readme-extensions.json).

## Usage

Unless otherwise noted below all of our custom OpenAPI extensions can be defined on the root level of your API definition within a `x-readme` object:

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "Owl Parliament",
    "description": "This is a sample Owl Parliament Server",
    "version": "1.0.0"
  },
  "x-readme": {
    "explorer-enabled": false,
    "proxy-enabled": false,
    "samples-languages": ["shell", "python", "go"]
  }
}
```

If you don't want to use `x-readme` in your spec, you can define each extension as `x-<extension_name>` instead:

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "Owl Parliament",
    "description": "This is a sample Owl Parliament Server",
    "version": "1.0.0"
  },
  "x-explorer-enabled": false,
  "x-proxy-enabled": false,
  "x-samples-languages": ["shell", "python", "go"]
}
```

### Operation-level usage

You can also define each extension on the operation-level to individually control their functionality on an operation-by-operation basis. If an extension is defined at both the operation and root levels, the operation-level extension takes presedence.

```json
{
  "paths": {
    "/owl": {
      "post": {
        "summary": "Add a new owl to the parliament",
        "description": "Adds a new owl to the parliament",
        "operationId": "addOwl",
        "x-readme": {
          "samples-languages": ["shell", "python", "go"]
        }
      }
    }
  }
}
```

You can also define the extension using the `x-<extension_name>` format instead:

```json
{
  "paths": {
    "/owl": {
      "post": {
        "summary": "Add a new owl to the parliament",
        "description": "Adds a new owl to the parliament",
        "operationId": "addOwl",
        "x-proxy-enabled": false,
        "x-samples-languages": ["shell", "python", "go"]
      }
    }
  }
}
```

## Available Extensions

### Disable the API Explorer

Disables the API Explorer's "Try It" button, preventing users from making API requests from within your docs. Users will still be able to fill out any entry fields (path or query parameters, etc.), and code snippets will be auto-generated based on the user's input, however to interact with your API the user will need to copy the code snippet and execute it outside of your docs.

This **does not** disable your API Reference documentation.

| Extension                   | Default value |
| :-------------------------- | :------------ |
| `x-readme.explorer-enabled` | `true`        |

```json
{
  "x-readme": {
    "explorer-enabled": true
  }
}
```

<Image align="center" alt={1161} border={false} caption="Screenshot of the API Explorer with the &#x22;Try It&#x22; button disabled and omitted. Note that filled out fields will still update the code sample." title="disable-the-api-explorer-1.png" src="https://files.readme.io/b7c37bf-disable-the-api-explorer-1.png" />

### Code sample languages

Toggles what languages are shown by default for code samples in the API Explorer. This only affects what languages are initially shown to the user; if the user picks another language from the three-dot menu, that language and the respective auto-generated code snippet will also appear as an option in the API Explorer.

<Callout icon="❗" theme="error">
  We built a Node package called [`api`](https://www.npmjs.com/package/api) that magically generates an SDK from an OpenAPI definition! To see `api` in action visit our [API documentation](https://docs.readme.com/developers/reference/projects)!
</Callout>

| Extension                    | Default value                                       |
| :--------------------------- | :-------------------------------------------------- |
| `x-readme.samples-languages` | `['shell', 'node', 'ruby', 'javascript', 'python']` |

```json
{
  "x-readme": {
    "samples-languages": ["shell", "node", "ruby", "javascript", "python"]
  }
}
```

These are the languages supported by way of the [httpsnippet](https://github.com/readmeio/httpsnippet) library:

| Language    | Available language mode(s) | Libraries (if applicable)\*                                                                                                                                                                                                                                                                  |
| :---------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C           | `c`                        | [Libcurl](http://curl.haxx.se/libcurl)                                                                                                                                                                                                                                                       |
| Clojure     | `clojure`                  | [clj-http](https://github.com/dakrone/clj-http)                                                                                                                                                                                                                                              |
| C++         | `cplusplus`                | [Libcurl](http://curl.haxx.se/libcurl)                                                                                                                                                                                                                                                       |
| C#          | `csharp`                   | [HttpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient), [RestSharp](http://restsharp.org/)                                                                                                                                                                     |
| HTTP        | `http`                     | [HTTP/1.1](https://tools.ietf.org/html/rfc7230)                                                                                                                                                                                                                                              |
| Go          | `go`                       | [NewRequest](http://golang.org/pkg/net/http/#NewRequest)                                                                                                                                                                                                                                     |
| Java        | `java`                     | [AsyncHttp](https://github.com/AsyncHttpClient/async-http-client), [java.net.http](https://openjdk.java.net/groups/net/httpclient/intro.html), [OkHttp](http://square.github.io/okhttp/), [Unirest](http://unirest.io/java.html)                                                             |
| JavaScript  | `javascript`               | [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), [Axios](https://github.com/axios/axios), [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [jQuery](http://api.jquery.com/jquery.ajax/)                                    |
| JSON        | `json`                     | [Native JSON](https://www.json.org/json-en.html)                                                                                                                                                                                                                                             |
| Kotlin      | `kotlin`                   | [OkHttp](http://square.github.io/okhttp/)                                                                                                                                                                                                                                                    |
| Node.js     | `node`                     | [`api`](https://api.readme.dev), [HTTP](http://nodejs.org/api/http.html#http_http_request_options_callback), [Request](https://github.com/request/request), [Unirest](http://unirest.io/nodejs.html), [Axios](https://github.com/axios/axios), [Fetch](https://github.com/bitinn/node-fetch) |
| Objective-C | `objectivec`               | [NSURLSession](https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html)                                                                                                                                                                     |
| OCaml       | `ocaml`                    | [CoHTTP](https://github.com/mirage/ocaml-cohttp)                                                                                                                                                                                                                                             |
| PHP         | `php`                      | [cURL](http://php.net/manual/en/book.curl.php), [Guzzle](http://docs.guzzlephp.org/en/stable/), [HTTP v1](http://php.net/manual/en/book.http.php), [HTTP v2](http://devel-m6w6.rhcloud.com/mdref/http)                                                                                       |
| Powershell  | `powershell`               | [Invoke-WebRequest](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-WebRequest), [Invoke-RestMethod](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-RestMethod)                                               |
| Python      | `python`                   | [Requests](http://docs.python-requests.org/en/latest/api/#requests.request)                                                                                                                                                                                                                  |
| R           | `r`                        | [httr](https://cran.r-project.org/web/packages/httr/vignettes/quickstart.html)                                                                                                                                                                                                               |
| Ruby        | `ruby`                     | [net::http](http://ruby-doc.org/stdlib-2.2.1/libdoc/net/http/rdoc/Net/HTTP.html)                                                                                                                                                                                                             |
| Shell       | `shell`                    | [cURL](http://curl.haxx.se/), [HTTPie](http://httpie.org/), [Wget](https://www.gnu.org/software/wget/)                                                                                                                                                                                       |
| Swift       | `swift`                    | [URLSession](https://developer.apple.com/documentation/foundation/urlsession)                                                                                                                                                                                                                |

\*This column documents any supported HTTP libraries for a given language mode. The `x-readme.samples-languages` array should contain language values (i.e. values from the second column like `node` or `php`) and **not** library names (i.e., values from the third column like `axios` or `guzzle`).

<Image align="center" alt={1160} border={false} caption="Screenshot of the API Explorer with &#x22;x-readme.sample-languages&#x22; set to Swift; note the Swift language shows up first above the code snippet." title="code-sample-languages-1.png" src="https://files.readme.io/e85f7e2-code-sample-languages-1.png" />

### Custom code samples

Enables custom-written code samples to be set for your operations. Use this if you have specific formatting that may not be followed by the auto-generated code samples.

<Callout icon="❗" theme="error">
  Custom code samples are treated as static content, so it's not possible to populate a code sample with [enduser data from a custom login (JWT)](https://docs.readme.com/main/docs/user-data-options#using-variables-with-your-api).
</Callout>

<Callout icon="❗" theme="error">
  This extension can only be set on the operation level
</Callout>

| Extension               | Default value |
| :---------------------- | :------------ |
| `x-readme.code-samples` | `[]`          |

This must be provided as an array of JSON objects containing:

| Key                     | Requirement  | Description                                                                                                                                                                                                                                                |
| :---------------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `language`              | **Required** | The language of the code sample. See the list of supported languages [above](#code-sample-languages).                                                                                                                                                      |
| `code`                  | **Required** | Your custom code. It should preferrably be neat and tidy.                                                                                                                                                                                                  |
| `name`                  | *Optional*   | A short name for your code sample. If none is provided we use the creative name `default`.                                                                                                                                                                 |
| `install`               | *Optional*   | If an external library is required for your code sample to function this can be a single command your users can run to install that library. For example of your code sample requires a custom Ruby SDK you can set this as `gem install our-inhouse-sdk`. |
| `correspondingExamples` | *Optional*   | If a response example should be displayed alongside this code sample, specify the response example's unique identifier using this field. When users select this code sample, the corresponding response example will automatically be selected.            |

```json
"x-readme": {
  "code-samples": [
    {
      "language": "curl",
      "code": "curl -X POST https://api.example.com/v2/alert",
      "name": "Custom cURL snippet",
      "install": "brew install curl",
      "correspondingExample": "TestExample"
    },
    {
      "language": "php",
      "code": "<?php echo \"This is our custom PHP code snippet.\"; ?>",
      "name": "Custom PHP snippet"
    }
  ]
}
```

#### Corresponding Response Examples

Note how the `correspondingExample` value in the above definition is `TestExample` and the [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responses-object) below contains that `TestExample` response example. With this setup, the response example below is automatically selected when a user selects that first cURL code sample above. In order to use this feature, you must use [the `examples` map](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#fixed-fields-12) approach to defining examples.

```yaml
responses:
  '200':
    description: OK
    content:
      application/json:
        examples:
          TestExample: # the identifier is on this line!
            summary: An example of a cat
            value:
              name: Fluffy
              petType: Cat
              color: White
              gender: male
              breed: Persian
```

<Image align="center" alt="Screenshot of the API Explorer with an example spec utilizing the x-code-samples extension." border={false} caption="Screenshot of the API Explorer with an example spec utilizing the x-code-samples extension. Note the tabs showing different snippets for the cURL (Shell) language." title="code-samples.png" src="https://files.readme.io/2462f63-CleanShot_2024-03-26_at_14.19.012x.png" />

### Enum Descriptions Table

Generates a table so descriptions can be added for each enum option. This will need to placed at the schema level where the enum is defined.

<Callout icon="📘" theme="info">
  This extension [may look familiar](https://redocly.com/docs/api-reference-docs/specification-extensions/x-code-samples/) for folks coming from Redocly! Because this extension is used by other vendors, it should **not** be contained within an `x-readme` object and instead should live at the schema level.
</Callout>

| Extension            | Default value |
| :------------------- | :------------ |
| `x-enumDescriptions` | `{}`          |

```json
{
  "type": "string",
  "enum": ["Owlbert", "Lorem Ipsum"],
  "x-enumDescriptions": {
    "Owlbert": "ReadMe's mascot",
    "Lorem Ipsum": "dolor sit amet"
  }
}
```

### CORS proxy enabled

Toggles the CORS proxy used when making API requests from within your docs (via the "Try It" button). If your API is already set up to return CORS headers, you can safely disable this feature.

Disabling the CORS proxy will make the request directly from the user's browser and will prevent [Metrics](https://docs.readme.com/main/docs/developer-dashboard) data from being logged by us unless [Metrics have already set up on your backend](https://docs.readme.com/main/docs/sending-api-logs).

| Extension                | Default value |
| :----------------------- | :------------ |
| `x-readme.proxy-enabled` | `true`        |

```json
{
  "x-readme": {
    "proxy-enabled": true
  }
}
```

### Parameter ordering

Controls the order of parameters on your API Reference pages.

Your custom ordering **must** contain all of our available parameter types:

* `path`: Path parameters
* `query`: Query parameters
* `body`: Non-`application/x-www-form-urlencoded` request body payloads
* `cookie`: Cookie parameters
* `form`: `application/x-www-form-urlencoded` request body payloads
* `header`: Header parameters

| Extension                     | Default value                                           |
| :---------------------------- | :------------------------------------------------------ |
| `x-readme.parameter-ordering` | `['path', 'query', 'body', 'cookie', 'form', 'header']` |

```json
{
  "x-readme": {
    "parameter-ordering": ["path", "query", "header", "cookie", "body", "form"]
  }
}
```

### Static headers

Adds static headers to add to each request. Use this when there are specific headers unique to your API.

| Extension          | Default value |
| :----------------- | :------------ |
| `x-readme.headers` | `[]`          |

Headers must be provided as an array of objects with `key` and `value` properties.

```json
{
  "x-readme": {
    "headers": [
      {
        "key": "X-Static-Header-One",
        "value": "owlbert"
      },
      {
        "key": "X-Static-Header-Two",
        "value": "owlivia"
      }
    ]
  }
}
```

<Image align="center" alt={1159} border={false} caption="Screenshot of the API Explorer with a custom static header &#x22;x-api-key&#x22; defined in its spec." title="static-headers.png" src="https://files.readme.io/0b22079-static-headers.png" />

### Authentication defaults

Sets the default API Key or OAuth2 token used when making API requests from your docs. Other authentication types are not supported.

Unlike the other extensions we provide, authentication defaults are set using `x-default` in your `securitySchemes` object. Defaults can only be set for `oauth2` and `apiKey` authentication types.

```json
{
  "securitySchemes": {
    "oauth": {
      "type": "oauth2",
      "x-default": "TXlOYW1lSXNPd2xiZXJ0IQ==",
      "flows": {
        "authorizationCode": {
          "authorizationUrl": "https://example.com/oauth/authorize",
          "tokenUrl": "https://example.com/oauth/token",
          "scopes": {
            "write:owls": "modify owls in your account",
            "read:owls": "read your owls"
          }
        }
      }
    }
  }
}
```

```json
{
  "securitySchemes": {
    "type": "apiKey",
    "name": "api_key",
    "in": "header",
    "description": "An API key that will be supplied in a named header.",
    "x-default": "TXlOYW1lSXNPd2xiZXJ0IQ=="
  }
}
```

### OAuth Configuration Options

| Key                               | Default Value | Description                                                                                                                                                                                                                                                                                                                                       |
| :-------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `scopeSeparator`                  | ` `           | Scope separator for passing scopes (defaults to a single space character). This value will be URL-encoded.                                                                                                                                                                                                                                        |
| `useInsecureClientAuthentication` | `false`       | When enabled, the client credentials (i.e., `client_id` and `client_secret`) are sent in the request body (NOT recommended). When disabled (the default), client credentials are sent using the HTTP Basic Authentication scheme.                                                                                                                 |
| `usePkce`                         | `false`       | When enabled, uses PKCE (Proof Key for Code Exchange) for OAuth 2.0 authorization code flows. With PKCE, the client secret is replaced with an auto-generated code verifier and code challenge, providing enhanced security for public clients that cannot securely store secrets. See [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636). |

```json
{
  "x-readme": {
    "oauth-options": {
      "scopeSeparator": ",",
      "useInsecureClientAuthentication": true,
      "usePkce": false
    }
  }
}
```

### Disable API Metrics

Disables API requests from the API Explorer's "Try It" button from being sent into our [API Metrics](https://readme.com/metrics) for you and your users. Additionally on any API endpoint that this is disabled on your users will not see lists or graphs of previous requests they've made against that API endpoint — either through the API Explorer's interactivity or through one of our [Metrics SDKs](https://docs.readme.com/main/docs/sending-api-logs) (if you have those installed on your API).

| Extension                  | Default value |
| :------------------------- | :------------ |
| `x-readme.metrics-enabled` | `true`        |

## Deprecated and Unsupported Extensions

The extensions below are deprecated or are no longer supported in the most recent version of the API Reference Design. These are documented for reference purposes only.

### Send defaults

<Callout icon="❗" theme="error">
  This extension is deprecated and all defaults will be sent via the API Explorer.
</Callout>

Whether to send the defaults specified in your OpenAPI document, or render them as placeholders.

| Extension                | Default value |
| :----------------------- | :------------ |
| `x-readme.send-defaults` | `false`       |

```json
{
  "x-readme": {
    "send-defaults": false
  }
}
```

### Disable code examples

<Callout icon="❗" theme="error">
  This extension is no longer supported.
</Callout>

Disable auto-generated code samples from appearing on your API Reference operation documentation.

| Extension                  | Default value |
| :------------------------- | :------------ |
| `x-readme.samples-enabled` | `true`        |

```json
{
  "x-readme": {
    "samples-enabled": true
  }
}
```

## Support

Questions? [Contact Support](/main/docs/need-more-support), we don't bite!
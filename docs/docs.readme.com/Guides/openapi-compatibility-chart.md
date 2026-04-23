# OpenAPI Compatibility Chart

This OpenAPI Compatibility Chart aims to document every part of the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) that we do and don't support in the API Explorer (i.e., "View" mode), as well as any quirks that might be present that you should be aware of.

We currently support OpenAPI through [v3.1.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md). For [Swagger 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md) support we use a tool called [swagger2openapi](https://www.npmjs.com/package/swagger2openapi) that upconverts Swagger definitions to OpenAPI 3.0.

<Callout icon="📘" theme="info">
  Unless mentioned otherwise, all `description` properties that we support are run through our Markdown engine: <Glossary>RDMD</Glossary>
</Callout>

## OpenAPI Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#openapi-object)

* `openapi`
  * We currently support everything up through `3.1.0`.
* `info` – [Info Object](#info-object)
* `jsonSchemaDialect`
  * `jsonSchemaDialect` is new to OpenAPI 3.1. See [JSON Schema Dialects](#json-schema-dialects) for a list of dialects that we support. ✅
* `servers` – [Server Object](#server-object)
* `paths` – [Paths Object](#paths-object)
* `webhooks` - Map containing [Path Item Object](#path-item-object) and/or [Reference Object](#reference-object)
  * OpenAPI definitions can contain a mix of `paths` and `webhooks` — as of January 2024, we support both. ✅
* `components` – [Components Object](#components-object)
* `security` – [Security Requirement Object](#security-requirement-object)
  * We support both global and operation-specific security requirements. ✅
* `tags` – [Tag Object](#tag-object)
* `externalDocs` – [External Documentation Object](#external-documentation-object)

## Info Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#info-object)

* `title` ✅
* `summary` ✅
  * `summary` is new to OpenAPI 3.1.
  * This value is surfaced in the **API Info** table on [the Getting Started page](https://docs.readme.com/main/docs/reference-core-pages).
* `description` ✅
  * This value is surfaced in the **API Info** table on [the Getting Started page](https://docs.readme.com/main/docs/reference-core-pages).
* `termsOfService` ✅
  * This value is surfaced in the **API Info** table on [the Getting Started page](https://docs.readme.com/main/docs/reference-core-pages).
* `contact` ✅
  * See [Contact Object](#contact-object) for more details.
  * This object is surfaced in the **API Info** table on [the Getting Started page](https://docs.readme.com/main/docs/reference-core-pages).
* `license` ✅
  * See [License Object](#license-object) for more details.
  * This object is surfaced in the **API Info** table on [the Getting Started page](https://docs.readme.com/main/docs/reference-core-pages).
* `version` ✅
  * For certain OpenAPI definition upload methods, we use this value to determine what version of your docs to place your API definition. See [Versions](https://docs.readme.com/main/docs/versions) for more information on docs versions. Below, we go over the different upload methods:
    * When uploading via [`rdme`](https://docs.readme.com/main/docs/rdme), this value is ignored by default. To use this value, you can [pass the `useSpecVersion` flag](https://github.com/readmeio/rdme#uploading-or-editing-an-api-definition-in-a-project-version).
    * When [uploading via the API](https://docs.readme.com/main/reference/uploadapispecification), this value is used only if the `x-readme-version` request header is omitted.
    * This value is ignored by default in file uploads.

## Contact Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contact-object)

<Callout icon="👍" theme="okay">
  This object is surfaced in the **API Info** table on [the Getting Started page](https://docs.readme.com/main/docs/reference-core-pages).
</Callout>

* `name` ✅
* `url` ✅
* `email` ✅

## License Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#license-object)

<Callout icon="👍" theme="okay">
  This object is surfaced in the **API Info** table on [the Getting Started page](https://docs.readme.com/main/docs/reference-core-pages).
</Callout>

* `name` ✅
* `identifier` ✅
  * `identifier` is new to OpenAPI 3.1.
* `url` ✅

## Server Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#server-object)

* `url` ✅
* `description` ✅
* `variables` ✅
  * See [Server Variable Object](#server-variable-object) for more details.

## Server Variable Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#server-variable-object)

* `enum` ✅
* `default` ✅
* `description` ✅

## Components Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#components-object)

<Callout icon="👍" theme="okay">
  With the exception of `securitySchemes`, all components that can be loaded as a `$ref` pointer are <Glossary>dereferenced</Glossary> prior to rendering.
</Callout>

* `schemas` – [Schema Object](#schema-object)
* `responses` – [Response Object](#response-object)
* `parameters` – [Parameter Object](#parameter-object)
* `examples` – [Example Object](#example-object)
* `requestBodies` – [Request Body Object](#request-body-object)
* `headers` – [Header Object](#header-object)
* `securitySchemes` – [Security Scheme Object](#security-scheme-object)
* `links` – [Link Object](#link-object)
* `callbacks` – [Callback Object](#callback-object)
* `pathItems` – [Path Item Object](#path-item-object)
  * `pathItems` is new with OpenAPI 3.1.

## Paths Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#paths-object)

<Callout icon="👍" theme="okay">
  We support the Path Object because we wouldn't offer an <Glossary>API Reference</Glossary> without them. 😀
</Callout>

## Path Item Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#path-item-object)

* `$ref` ✅
  * All `$ref` pointers are <Glossary>dereferenced</Glossary> prior to rendering.
* `summary` ✅
* `description` ✅
* `get` ✅
* `put` ✅
* `post` ✅
* `delete` ✅
* `options` ✅
* `head` ✅
* `patch` ✅
* `trace` ✅
* `servers` ⛔
  * We currently do not support `servers` declarations at the Path Item level. See [Server Object](#server-object) for more details.
* `parameters` ✅

## Operation Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operation-object)

* `tags` ✅
* `summary` ✅
* `description` ✅
* `externalDocs` ⛔
  * See [External Documentation Object](#external-documentation-object) for more details.
* `operationId` ✅
* `parameters` ✅
  * See [Parameter Object](#parameter-object) for more details.
* `requestBody` ✅
  * See [Request Body Object](#request-body-object) for more details.
* `responses` ✅
  * See [Responses Object](#responses-object) for more details.
* `callbacks` ✅
  * See [Callback Object](#callback-object) for more details.
* `deprecated` ✅
* `security` ✅
  * See [Security Requirement Object](#security-requirement-object) for more details.
* `servers` ⛔
  * We currently do not support `servers` declarations at the Operation level. See [Server Object](#server-object) for more details.

## External Documentation Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#external-documentation-object)

<Callout icon="🚧" theme="warn">
  We currently only surface the `External Documentation Object` within the [Tag Object](#tag-object) of your documentation.
</Callout>

* `description` ✅
* `url` ✅

## Parameter Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameter-object)

* `name` ✅
* `in` ✅
* `description` ✅
* `required` ✅
* `deprecated` ✅
* `allowEmptyValue` ✅
  * To add an empty value into our API Explorer you must first type in something and then delete it.
* `style` ✅
* `explode` ✅
* `allowReserved` ✅
* `schema` ✅
  * See [Schema Object](#schema-object) for more details.
* `example` ✅
* `examples` ✅
* `content` ⛔

### Style Values

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-values)

Support for parameter `style` serialization:

<Table align={["left","left","left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        `style`
      </th>

      <th>
        Data type
      </th>

      <th>
        `explode`
      </th>

      <th>
        Path
      </th>

      <th>
        Query, `multipart/form-data`
      </th>

      <th>
        Cookie
      </th>

      <th>
        Header
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        matrix
      </td>

      <td>
        primitive
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        matrix
      </td>

      <td>
        primitive
      </td>

      <td>
        `false`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        matrix
      </td>

      <td>
        array
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        matrix
      </td>

      <td>
        array
      </td>

      <td>
        `false`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        matrix
      </td>

      <td>
        object
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        matrix
      </td>

      <td>
        object
      </td>

      <td>
        `false`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        label
      </td>

      <td>
        primitive
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        label
      </td>

      <td>
        primitive
      </td>

      <td>
        `false`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        label
      </td>

      <td>
        array
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        label
      </td>

      <td>
        array
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        label
      </td>

      <td>
        object
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        label
      </td>

      <td>
        object
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        form
      </td>

      <td>
        primitive
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        ✅
      </td>

      <td />
    </tr>

    <tr>
      <td>
        form
      </td>

      <td>
        primitive
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        ✅
      </td>

      <td />
    </tr>

    <tr>
      <td>
        form
      </td>

      <td>
        array
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        ✅
      </td>

      <td />
    </tr>

    <tr>
      <td>
        form
      </td>

      <td>
        array
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        ✅
      </td>

      <td />
    </tr>

    <tr>
      <td>
        form
      </td>

      <td>
        object
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        ✅
      </td>

      <td />
    </tr>

    <tr>
      <td>
        form
      </td>

      <td>
        object
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        ✅
      </td>

      <td />
    </tr>

    <tr>
      <td>
        simple
      </td>

      <td>
        array
      </td>

      <td>
        `true`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>
    </tr>

    <tr>
      <td>
        simple
      </td>

      <td>
        array
      </td>

      <td>
        `false`
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>
    </tr>

    <tr>
      <td>
        spaceDelimited
      </td>

      <td>
        array
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        spaceDelimited
      </td>

      <td>
        array
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        spaceDelimited
      </td>

      <td>
        object
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        spaceDelimited
      </td>

      <td>
        object
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ⛔
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        spaceDelimited
      </td>

      <td>
        query
      </td>

      <td>
        `true`
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>
    </tr>

    <tr>
      <td>
        spaceDelimited
      </td>

      <td>
        query
      </td>

      <td>
        `false`
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>
    </tr>

    <tr>
      <td>
        pipeDelimited
      </td>

      <td>
        array
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        pipeDelimited
      </td>

      <td>
        array
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        pipeDelimited
      </td>

      <td>
        object
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        pipeDelimited
      </td>

      <td>
        object
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ⛔
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        pipeDelimited
      </td>

      <td>
        query
      </td>

      <td>
        `true`
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>
    </tr>

    <tr>
      <td>
        pipeDelimited
      </td>

      <td>
        query
      </td>

      <td>
        `false`
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>

      <td>
        ⚠️
      </td>
    </tr>

    <tr>
      <td>
        deepObject
      </td>

      <td>
        object
      </td>

      <td>
        `true`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅ (including arrays of objects, serialized using the

        [`qs`](https://www.npmjs.com/package/qs)

        module)
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>

    <tr>
      <td>
        deepObject
      </td>

      <td>
        object
      </td>

      <td>
        `false`
      </td>

      <td>
        * <br />
      </td>

      <td>
        ✅
      </td>

      <td>
        * <br />
      </td>

      <td>
        * <br />
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="🚧" theme="warn">
  `spaceDelimited` and `pipeDelimited` support on `query` and `form-data` parameters, while new to OpenAPI 3.1, is currently untested on our platform.
</Callout>

## Request Body Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#request-body-object)

* `description` ✅
* `content` ⚠️
  * Though we support `content`, the <Glossary>API Reference</Glossary> only supports one Media Type at a time; so if you have a `content` declaration that has two Media Types we'll use either the first out of the list or whichever is JSON-compatible.
* `required` ✅

## Media Type Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#media-type-object)

* `schema` ✅
* `example` ✅
* `examples` ✅
* `encoding` ⚠️
  * We only support `encoding` for `multipart/form-data` media types.

## Encoding Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encoding-object)

<Callout icon="🚧" theme="warn">
  We only support the `Encoding Object` on `multipart/form-data` media types.
</Callout>

* `contentType` ⛔
* `headers` ⛔
* `style` ⚠️
  * We support the `style` parameter for `multipart/form-data` media types. See the [style](#style-values) support list for more details.
* `explode` ⚠️
  * We support the `explode` parameter for `multipart/form-data` media types. See the [style](#style-values) support list for more details.
* `allowReserved` ⛔

## Responses Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responses-object)

For Responses we support `default`, blanket `1XX`, `2XX`, `3XX`, `4XX`, and `5XX` statuses, as well as all HTTP status codes that are listed within with [IANA Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).

<Callout icon="🚧" theme="warn">
  Any HTTP status code that is used but not listed below will be shown but internally treated as a general `<number>XX` variant.
</Callout>

| Code | Description                          |
| :--- | :----------------------------------- |
| 1XX  | Informational                        |
| 100  | Continue                             |
| 101  | Switching Protocols                  |
| 102  | Processing                           |
| 103  | Early Hints                          |
| 2XX  | Success                              |
| 200  | OK                                   |
| 201  | Created                              |
| 202  | Accepted                             |
| 203  | Non-Authoritative Information        |
| 204  | No Content                           |
| 205  | Reset Content                        |
| 206  | Partial Content                      |
| 207  | Multi-Status                         |
| 208  | Already Reported                     |
| 218  | This is fine                         |
| 226  | IM Used                              |
| 3XX  | Redirection                          |
| 300  | Multiple Choices                     |
| 301  | Moved Permanently                    |
| 302  | Found                                |
| 303  | See Other                            |
| 304  | Not Modified                         |
| 305  | Use Proxy                            |
| 306  | Switch Proxy                         |
| 307  | Temporary Redirect                   |
| 308  | Permanent Redirect                   |
| 4XX  | Client Error                         |
| 400  | Bad Request                          |
| 401  | Unauthorized                         |
| 402  | Payment Required                     |
| 403  | Forbidden                            |
| 404  | Not Found                            |
| 405  | Method Not Allowed                   |
| 406  | Not Acceptable                       |
| 407  | Proxy Authentication Required        |
| 408  | Request Timeout                      |
| 409  | Conflict                             |
| 410  | Gone                                 |
| 411  | Length Required                      |
| 412  | Precondition Failed                  |
| 413  | Payload Too Large                    |
| 414  | URI Too Long                         |
| 415  | Unsupported Media Type               |
| 416  | Range Not Satisfiable                |
| 417  | Expectation Failed                   |
| 418  | I'm a teapot                         |
| 419  | Page Expired                         |
| 420  | Enhance Your Calm                    |
| 421  | Misdirected Request                  |
| 422  | Unprocessable Entity                 |
| 423  | Locked                               |
| 424  | Failed Dependency                    |
| 425  | Too Early                            |
| 426  | Upgrade Required                     |
| 428  | Precondition Required                |
| 429  | Too Many Requests                    |
| 430  | Request Header Fields Too Large      |
| 431  | Request Header Fields Too Large      |
| 440  | Login Time-out                       |
| 444  | No Response                          |
| 449  | Retry With                           |
| 450  | Blocked by Windows Parental Controls |
| 451  | Unavailable For Legal Reasons        |
| 494  | Request Header Too Large             |
| 495  | SSL Certificate Error                |
| 496  | SSL Certificate Required             |
| 497  | HTTP Request Sent to HTTPS Port      |
| 498  | Invalid Token                        |
| 499  | Client Error                         |
| 5XX  | Server Error                         |
| 500  | Internal Server Error                |
| 501  | Not Implemented                      |
| 502  | Bad Gateway                          |
| 503  | Service Unavailable                  |
| 504  | Gateway Timeout                      |
| 505  | HTTP Version Not Supported           |
| 506  | Variant Also Negotiates              |
| 507  | Insufficient Storage                 |
| 508  | Loop Detected                        |
| 509  | Bandwidth Limit Exceeded             |
| 510  | Not Extended                         |
| 511  | Network Authentication Required      |
| 520  | Web Server Returned an Unknown Error |
| 521  | Web Server Is Down                   |
| 522  | Connection Timed Out                 |
| 523  | Origin Is Unreachable                |
| 524  | A Timeout Occurred                   |
| 525  | SSL Handshake Failed                 |
| 526  | Invalid SSL Certificate              |
| 527  | Railgun Error                        |
| 529  | Site is Overloaded                   |
| 530  | Site is Frozen                       |
| 598  | Network Read Timeout Error           |

## Response Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#response-object)

* `description` ✅
* `headers` ✅
  * See [Header Object](#header-object) for more details.
* `content` ✅
  * See [Media Type Object](#media-type-object) for more details.
* `links` ⛔
  * See [Link Object](#link-object) for more details.

## Callback Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callback-object)

As a `Callback Object` is a container for a [Path Item Object](#path-item-object), see the [Path Item Object](#path-item-object) for our list of supported components.

Note that we do not currently support making API requests to callback endpoints, they are purely rendered as documentation.

## Example Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#example-object)

* `summary` ✅
  * If this is not supplied, when rendering Request Body examples we will set this to "Request Example".
* `description` ⛔
  * We currently do not surface example descriptions anywhere.
* `value` ✅
* `externalValue` ⛔
  * We currently do not surface external example values anywhere.

## Link Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#link-object)

<Callout icon="🛑" theme="error">
  We currently do not support the `Link Object`.
</Callout>

* `operationRef`
* `operationId`
* `parameters`
* `requestBody`
* `description`
* `server`
  * See [Server Object](#server-object) for more details.

## Header Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#header-object)

<Callout icon="👍" theme="okay">
  Where we support `headers`, and the Header Object, we support everything for headers that we support within the [Parameter Object](#parameter-object). See [Parameter Object](#parameter-object) for more information.
</Callout>

## Tag Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tag-object)

* `name` ✅
* `description` ✅
* `externalDocs` ✅
  * See External Documentation Object for more details.

When handling tags not only do we ingest them when you upload an OpenAPI definition to create [Categories, Pages and Subpages](https://docs.readme.com/main/docs/openapi-categories-pages-subpages), but we also render tags on your API Reference like so:

![Tags in the API Reference](https://files.readme.io/dc44471-aFqJIaEw.png)

## Reference Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#reference-object)

Prior to rendering your API documentation all `$ref` pointers are <Glossary>dereferenced</Glossary>. Additionally, as of OpenAPI 3.1, you can include `summary` and `description` fields in addition to the `$ref` pointer, [which will override the `summary` and `description` fields of the referenced component](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#fixed-fields-19). Everything else will be fully deferenced.

Relative schemas (`$ref: "Pet.json"`) and URL references (`$ref: "https://example.com/Pet"`) are not supported on ReadMe and will be rejected on upload. If your schema uses relative schemas or URL references you can instead upload your API definition via [`rdme`](https://www.npmjs.com/package/rdme) and that will bundle all the necessary schemas together into a single payload acceptable for our API.

<Callout icon="📘" theme="info">
  Note that we currently struggle to handle recursive and circular reference objects. Under certain circumstances in parameters and request bodies we're able to handle a circular reference it’s within an array (like an array of objects).
</Callout>

## Schema Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schema-object)

### Properties

* `additionalProperties` ⚠️
  * Though [JSON Schema Specification Wright Draft 00](https://json-schema.org/) specifies that when `additionalProperties` is not present, defaults to `true`, ReadMe defaults to `false` for a cleaner UI. If you wish to allow users to add additional properties you should explicitly set this to `true`.
* `allOf` ✅
* `anyOf` ✅
* `const` ✅
* `default` ✅
* `description` ✅
* `enum` ✅
* `exclusiveMaximum` ✅
* `exclusiveMinimum` ✅
* `format` ✅
  * See [Data Types](#data-types) for a list of formats that we support.
* `items` ✅
* `maximum` ✅
* `maxItems` ✅
* `maxLength` ✅
* `maxProperties` ✅
* `minimum` ✅
* `minItems` ✅
* `minLength` ✅
* `minProperties` ⛔
* `multipleOf` ✅
* `not` ⛔
* `oneOf` ✅
* `pattern` ✅
* `patternProperties` ⛔
* `properties` ✅
* `required` ✅
* `title` ✅
  * `title` in a schema associated with a Parameter or Request Body OAS section is prioritized over that section's `name` property when displaying a label to an end user.
* `type` ⚠️
  * We support general **and** mixed `type` declarations however our API Explorer form system does not support setting `null` data for mixed non-primitive and non-boolean nullable schemas. For example, `['boolean', 'null']` and `['string', 'null']` are supported but `['array', 'null']` and `['object', 'null'] ` are not.
* `uniqueItems` ✅

### Fixed Fields

* `deprecated` ✅
* `discriminator` ✅
  * See [Discriminator Object](#discriminator-object) for more details.
* `example` ✅
* `externalDocs` ⛔
  * See [External Documentation Object](#external-documentation-object) for more details.
* `nullable` ⚠️
  * Our API Explorer form system does not support setting null data for `array`, `object`, or `boolean` types.
* `readOnly` ✅
  * Properties marked as `readOnly: true` are only rendered in the **Response Schema** section.
* `writeOnly` ✅
  * Properties marked as `writeOnly: true` are only rendered in the **Request** section.
* `xml` ⛔
  * See [XML Object](#xml-object) for more details.

### JSON Schema Dialects

<Callout icon="📘" theme="info">
  [Unicode regular expressions](https://ajv.js.org/options.html#unicoderegexp) are only supported with OpenAPI v3.1.x documents and [JSON Schema v2020-12](https://json-schema.org/specification-links.html#2020-12). If no JSON Schema dialects are specified, we adhere to the OAS and default to v2020-12 for all OpenAPI v3.1.x documents.
</Callout>

We support the following JSON Schema dialects:

* [Draft 4](https://json-schema.org/specification-links.html#draft-4)
* [2020-12](https://json-schema.org/specification-links.html#2020-12)

## Data Types

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#data-types)

We support a number of different data types and formats:

| Type      | Format      | Comments                                                                                                                        |
| :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `boolean` |             |                                                                                                                                 |
| `integer` |             |                                                                                                                                 |
| `integer` | `int8`      |                                                                                                                                 |
| `integer` | `int16`     |                                                                                                                                 |
| `integer` | `int32`     |                                                                                                                                 |
| `integer` | `int64`     |                                                                                                                                 |
| `integer` | `uint8`     |                                                                                                                                 |
| `integer` | `uint16`    |                                                                                                                                 |
| `integer` | `uint32`    |                                                                                                                                 |
| `integer` | `uint64`    |                                                                                                                                 |
| `number`  |             |                                                                                                                                 |
| `number`  | `float`     |                                                                                                                                 |
| `number`  | `double`    |                                                                                                                                 |
| `string`  |             |                                                                                                                                 |
| `string`  | `binary`    | Will render out a [file input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file).                           |
| `string`  | `blob`      | Will render out a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).                               |
| `string`  | `byte`      | ‡                                                                                                                               |
| `string`  | `date`      | †                                                                                                                               |
| `string`  | `dateTime`  | †                                                                                                                               |
| `string`  | `date-time` | †                                                                                                                               |
| `string`  | `duration`  |                                                                                                                                 |
| `string`  | `html`      | Will render out a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea). ‡                             |
| `string`  | `json`      | Will render out a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea). ‡                             |
| `string`  | `password`  | Will render out a [password field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password) to mask all input. |
| `string`  | `timestamp` |                                                                                                                                 |
| `string`  | `uri`       | ‡                                                                                                                               |
| `string`  | `url`       | ‡                                                                                                                               |
| `string`  | `uuid`      | ‡                                                                                                                               |

† We do not render a date picker for `date` and `date-time` due to the lack of wide browser support for [datetime-local](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) and [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).

‡ We do not perform any validation on this value to ensure the value remains unchanged.

## Discriminator Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#discriminator-object)

* `propertyName` ✅
* `mapping` ✅

## XML Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-object)

<Callout icon="🛑" theme="error">
  We currently do not support the `XML Object`.
</Callout>

* `name`
* `namespace`
* `prefix`
* `attribute`
* `wrapped`

## Security Scheme Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#security-scheme-object)

* `type` ⚠️
  * We do not support the `openIdConnect` security type.
  * We do not support the `mutualTLS` security type that was introduced in OpenAPI 3.1
* `description` ✅
* `name` ✅
* `in` ✅
* `scheme` ✅
* `bearerFormat` ⚠️
  * The OpenAPI Specification specifies that this describes how the bearer formatted but since we do not support OAuth Flows that would format the bearer, we currently ignore this.
* `flows` ⚠️
  * We support the Authorization Code and Client Credentials grant types. See [OAuth Flows Object](#oauth-flows-object) for more details.
  * For more information on how to configure OAuth Flows, check out
    <Anchor label="our OAuth Flows docs" target="_blank" href="https://docs.readme.com/main/docs/oauth-workflows-in-try-it">our OAuth Flows docs</Anchor>
    .
* `openIdConnectUrl` ⛔
  * We do not support the `openIdConnect` security type.

## OAuth Flows Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauth-flows-object)

* `authorizationCode` ✅
* `clientCredentials` ✅
* `implicit` ⛔
* `password` ⛔

## OAuth Flow Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauth-flow-object)

* `authorizationUrl` ✅
* `tokenUrl` ✅
* `refreshUrl` ⛔
* `scopes` ✅

## Security Requirement Object

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#security-requirement-object)

While we only support a subset of Security Scheme Objects, we can support all combinations of those objects. For example we can support multiple headers, one header or OAuth, one query parameter and one header and so on.

## Specification Extensions

📚 [Specification Link](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specification-extensions)

The OpenAPI specification allows for augmenting certain Objects with custom extensions and we support these, but only [our extensions](https://docs.readme.com/main/docs/openapi-extensions). If you have custom extensions in place for things like [AWS API Gateways](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html), they will be ignored.

For the full list of our extensions that we offer and support, see [OpenAPI Extensions](https://docs.readme.com/main/docs/openapi-extensions).
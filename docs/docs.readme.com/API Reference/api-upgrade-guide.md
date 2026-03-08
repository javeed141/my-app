# API v1 → v2 Update Guide

ReadMe API v2 is the best way to programmatically access your ReadMe data once you have upgraded to [ReadMe Refactored](https://docs.readme.com/main/docs/upgrade-to-refactored). We’re giving you access to the very same API that ReadMe’s developers use to build ReadMe. Let’s try it out.

## Overview of Key Changes

Below is a quick summary of the major updates to transition from API v1 to v2. For a deeper dive into each change, refer to the relevant sections below.

|                                                      | API v1                                                           | API v2                                                                     |
| :--------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| [API endpoints](#what-are-the-new-api-endpoints)     |                                                                  | Updated URLs, [new endpoints](https://docs.readme.com/main/reference/getproject-1), and redesigned responses. |
| [Authentication](#authentication)                    | Basic Authentication                                             | Bearer Authentication                                                      |
| [Hostname](#hostname)                                | [https://dash.readme.com/api/v1](https://dash.readme.com/api/v1) | [https://api.readme.com/v2](https://api.readme.com/v2)                     |
| [Versions](https://docs.readme.com/main/reference/branches)                             |                                                                  | Renamed to [Branches](https://docs.readme.com/main/reference/branches)                                        |
| [Project Version](#specifying-project-version)       | Supplied a `x-readme-version` header.                            | Supply the branch (previously version) in your API URL.                    |
| [Using Default Version](#specifying-project-version) | Omit the `x-readme-version` header                               | Use `stable` in your API URL.                                              |
| [Flag Values](#flag-values)                          | booleans                                                         | enums                                                                      |
| [Resource Identifiers](#resource-identifiers)        | Hexadecimal IDs                                                  | Slugs and URIs                                                             |
| [Response Body Shapes](#response-body-shapes)        | camelCase                                                        | snake\_case                                                                |
| [Pagination](#pagination)                            | `Link` header                                                    | Collection format                                                          |

## 💡 Make your first API v2 Request

We’re going to use cURL in this example, however any HTTP client should work too. Let’s start with a request to get details about your project.

```sh
curl -X GET https://api.readme.com/v2/projects/me --header "Authorization: Bearer {your-api-key}"
```

In the `Authorization` header you’ll need to add an API key. Learn more about ReadMe API keys [here](https://docs.readme.com/main/reference/intro/authentication).

When you run this cURL command, you will see JSON with details about your project. If that’s the case, you’ve successfully made your first API v2 request. If not, [contact support](mailto:support@readme.io?subject=I+need+help+making+an+API+request) and we’ll help you figure it out!

Most aspects of this cURL command can be reused for your other API requests; here are the most important points:

* [https://api.readme.com/v2/](https://api.readme.com/v2/) is the hostname for every API call. You can place it into a constant for reuse across all of your API requests.
* [The `Authorization` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) will always be how you provide your API key. The value must include the string `Bearer`, then a space, then your API key.
* The `GET` HTTP method returns data, but will never change data.
* The `POST` HTTP method requests generally create data (such as guides or custom pages), but are also used for more complex requests like querying Owlbot AI.
* The `PATCH` HTTP method is used for editing data that already exists.
* The `PUT` HTTP method is used for creating data (if you have the URI) or replacing data that already exists.
* The `DELETE` HTTP method is used for deleting data that already exists.

## ‼️ Major changes

### Authentication

**As mentioned previously, authentication has changed:**

ReadMe API v1 previously used [Basic Authentication](https://datatracker.ietf.org/doc/html/rfc7617) and has now moved to [Bearer Authentication](https://datatracker.ietf.org/doc/html/rfc6750). Here’s what a cURL request looked like previously in API v1:

```sh
curl -X GET https://dash.readme.com/api/v1 --user "{your-api-key}:"
```

That same request with API v2:

```sh
curl -X GET https://api.readme.com/v2/projects/me --header "Authorization: Bearer {your-api-key}"
```

### Hostname

**As mentioned previously, the hostname has changed:**

* API v1 (old): [https://dash.readme.com/api/v1](https://dash.readme.com/api/v1)
* API v2 (new): [https://api.readme.com/v2](https://api.readme.com/v2)

### Versions

Across API v2, we have reworked our API URIs from being centered around "versions" to "branches" as part of our support for [branching](docs:branches) within [ReadMe Refactored](docs:upgrade-to-readme-refactored). **All branching APIs we offer within API v2 support both versions and feature branches.**

Though the recommended API v2 URIs use `/branches/{branch}`, we still do support accessing these endpoints via `/versions/{version}` or `/versions/{branch}` for backwards compatibility reasons. If you use the latter, we emit a [Warning](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Warning) header with a `199` code informing you that they have been deprecated.

#### Specifying Project Version

**The project version has moved from a`x-readme-version` header into the URL:**

* As with API v1, you can pass the version with or without the `v` prefix (e.g., `GET https://api.readme.com/v2/branches/1.0/custom_pages` or `GET https://api.readme.com/v2/branches/v1.0/custom_pages`).
* Previously, if you wanted the default version (a.k.a. stable version) you could leave the header out. With the new API, you can use the word `stable` (e.g., `GET https://api.readme.com/v2/branches/stable/custom_pages`).

### Flag Values

Nearly all flags that were previously delineated with boolean values (e.g., `true` or `false`) have now been moved to enum fields (e.g., `enabled` or `disabled`). The API reference docs for a given endpoint and the fields within will contain detailed information on what the possible enum values are.

The reason for this change is that we previously ran into issues where, for instance, we needed to introduce an additional state beyond true and false. Enums provide us with additional overhead for future enhancements and more descriptive states (e.g., `enabled` vs. `disabled`, `public` vs. `anyone_with_link`, etc.), while maintaining a nearly identical API reference experience.

### Resource Identifiers

**Resources are identified via URIs and slugs**:

We’ve heard your feedback that using hexadecimal object IDs (e.g., `5f92cbf10cf217478ba93561`) in API v1 to identify resources (e.g., API definitions, categories, etc.) makes it difficult to build scalable integrations (e.g., integrations that might update many API definitions at once across several project versions)so we have updated to using slugs and URIs as our primary resource identifiers.

For example, to retrieve all of the API schemas for a given project version, you’d make a request to `GET /v2/branches/{branch}/apis` and your response may look something like this:

```json
{
  "total": 1,
  "data": [
    {
      ...
      "created_at": "2025-01-27T16:33:27.193Z",
      "type": "openapi",
      "upload": {
        "status": "done"
      },
      "uri": "/branches/1.0/apis/petstore.json",
    }
  ]
}
```

For this API definition resource, the URI is `/branches/1.0/apis/petstore.json` and the slug is `petstore.json`. You can use the URI and slug for this API definition to make reads and writes to that resource. For example, you can make the following API request to retrieve information about your `petstore.json` API definition:

```sh
curl -X GET https://api.readme.com/v2/branches/1.0/apis/petstore.json --header "Authorization: Bearer {your-api-key}"
```

### Response Body Shapes

**The response body shape has changed:**

We now offer consistent snake\_case field names and have structured the responses in anticipation of growing them to include more useful data over time by nesting all objects within a top-level `data` property. If you are retrieving a collection of results, `data` will be an array of objects. If you are retrieving a single resource, `data` will be an object.

Here’s what a response from our [custom pages API](docs:custom-page) formerly looked like with API v1:

```json
[
  {
    "metadata": {
      "image": [],
      "title": "",
      "description": "",
      "keywords": ""
    },
    "mdx": {
      "altBody": "",
      "status": "rdmd"
    },
    "algolia": {
      "recordCount": 1,
      "publishPending": false
    },
    "title": "Welcome to the API",
    "slug": "welcome-to-the-api",
    "body": "We’ve got endpoints galore",
    "html": "",
    "htmlmode": false,
    "fullscreen": false,
    "hidden": true,
    "revision": 2,
    "_id": "673974422297a9aa6fc28b2b",
    "createdAt": "2025-01-16T21:12:34.267Z",
    "updatedAt": "2025-01-16T21:12:34.267Z",
    "lastUpdatedHash": "1608f5b78bac84444acc76ce134667c318bbc6ee",
    "__v": 0
  }
]
```

That same request under API v2:

```json
{
  "total": 1,
  "data": [
    {
      "appearance": {
        "fullscreen": false
      },
      "content": {
        "body": "We’ve got endpoints galore",
        "type": "markdown"
      },
      "metadata": {
        "description": null,
        "image": {
          "uri": null,
          "url": null
        },
        "keywords": null,
        "title": null
      },
      "privacy": {
        "view": "public"
      },
      "slug": "welcome-to-the-api",
      "title": "Welcome to the API",
      "updated_at": "2025-01-16T21:15:53.484Z",
      "links": {
        "project": "/projects/me"
      },
      "uri": "/branches/1.0/custom_pages/welcome-to-the-api"
    }
  ]
}
```

### Pagination

**Pagination has changed:**

In API v2, we no longer use the [`Link` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) that [we used in API v1](refs:pagination). In API v2, we have a new "Collection" format that includes pagination metadata alongside the data you requested. Here’s an example:

```json
{
  "total": 5,
  "page": 2,
  "per_page": 2,
  "paging": {
    "next": "/images?page=3&per_page=2",
    "previous": "/images?page=1&per_page=2",
    "first": "/images?page=1&per_page=2",
    "last": "/images?page=3&per_page=2"
  },
  "data": [
    {
      /* image object */
    },
    {
      /* image object */
    }
  ]
}
```

`total`, `page` and `per_page` (previously `perPage`) behave like they did in API v1, giving you all the important quantity-related metadata. `paging` is where it gets interesting. This object contains four URIs that are the API calls you can make to get additional pages of content:

* `next` is the page of content immediately following the current page. If the current page is the last page, this will be `null`.
* `previous` is the page of content immediately before the current page. If the current page is the first page, this will be `null`.
* `first` is the very first page of content. This will always have a value.
* `last` is the very last page of content. This will always have a value.

**Note:** These pagination links will retain the query parameters used in your API call. In fact, you shouldn’t need to modify the pagination URLs in any way!

## 🆕 API Endpoint and Response changes

While the URLs for every API endpoint have changed, we worked to make them intuitive to use. Let’s walk through an example below.

Here’s a comparison of the old and new endpoints to get a list of all of your custom pages:

**API v1:**

```
GET https://dash.readme.com/api/v1/custompages
```

**API v2:**

```
GET https://api.readme.com/v2/branches/{branch}/custom_pages
```

### API Registry

| API v1                     | Documentation                                                  | API v2 | Documentation                                                                                                                                            |
| :------------------------- | :------------------------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api-registry/{uuid}` | [Retrieve an entry from the API Registry](refs:getapiregistry) | 🚫     | This endpoint does not currently exist on API v2. Because it does not require authentication credentials you can continue to use the endpoint in API v1. |

### API Specification

| API v1                           | Documentation                                               | API v2                                      | Documentation                                                                                                                                                                                           |
| :------------------------------- | :---------------------------------------------------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET /api-specification`         | [Get metadata](refs:getapispecification)                    | `GET /branches/{branch}/apis`               | [Get all API definitions](refs:getapis)                                                                                                                                                                 |
| `POST /api-specification`        | [Upload specification](refs:uploadapispecification)         | `POST /branches/{branch}/apis`              | [Create an API definition](refs:createapi)                                                                                                                                                              |
| `PUT /api-specification/{id}`    | [Update specification](refs:updateapispecification)         | `PUT /branches/{branch}/apis/{filename}`    | [Update an API definition](refs:updateapi)                                                                                                                                                              |
| `DELETE /api-specification/{id}` | [Delete specification](refs:deleteapispecification)         | `DELETE /branches/{branch}/apis/{filename}` | [Delete an API definition](refs:deleteapi)                                                                                                                                                              |
| `POST /api-validation`           | [Validate API specification](refs:validateapispecification) | `POST /validate/api`                        | [Validate an API](refs:validateapi)                                                                                                                                                                     |
| `GET schema`                     | [Get our OpenAPI Definition](refs:getapischema)             | 🚫                                          | This endpoint does not yet exist on API v2. If you need an up-to-date copy of our OpenAPI definition you can grab it from [https://docs.readme.com/main/openapi](https://docs.readme.com/main/openapi). |

#### Changes to how we process API definition uploads

To better support larger and more complex API definitions, we have moved API definition upload processing into a queue-based system. What this means for you is that now, when you upload a new API definition with `POST /branches/{branch}/apis` or update an existing with `PUT /branches/{branch}/apis/{filename}`, your upload will not be immediately processed.

Instead, we now surface an `upload.status` property on the response of these APIs to inform you where in our processing pipeline your API is. You can poll this field via `GET /branches/{branch}/apis/{filename}`, which our `POST` and `PUT` endpoints conveniently return for you in a `uri` property. The possible values of `upload.status` are the following:

* `pending`
* `failed`
* `done`
* `pending_update`
* `failed_update`

If you ever receive `failed` or `failed_update` it means that there was an issue processing the API, usually the result of an OpenAPI validation error, and you can see the reason for the failure in `upload.reason`. When you receive `done`, however, your API has finished processing, and any new or changed API reference pages from it are immediately available on your ReadMe project!

#### Response schema changes

| API v1    | API v2                                  | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :-------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | `uri`                                   | We have dropped support for our legacy hexadecimal IDs in favor of the unique resource identifier of a `filename` path parameter (for the `PUT /branches/{branch}/apis/{filename}` and `DELETE /branches/{branch}/apis/{filename}` endpoints). When creating an API, you can specify the filename within the `multipart/form-data` payload.<br /><br />In response payloads, the `uri` will contain the unique resource identifier.                                                                                                                |
| `source`  | `source.current`<br />`source.original` | Our `source` object now informs you of the current, and original, source from which this API was ingested. `source.original` is immutable from the first upload, but `source.current` may change from subsequent uploads if you use alternative upload methods.<br /><br />These values remain largely unchanged except for `cli` mapping to `rdme` and `cli-gh` mapping to `rdme_github`.                                                                                                                                                         |
| `type`    | `type`                                  | In addition to our previously supported `openapi` and `swagger` values, dictating the type of API this is, we have added support for `postman`. Though we convert Postman API schemas to OpenAPI on ingestion, this will be set to `postman` if that conversion took place.<br /><br />We have also added a new `unknown` type for when an invalid API definition is uploaded. See [our above documentation](#changes-to-how-we-process-api-definition-uploads) for the changes we’ve made to the API definition upload flow for more information. |
| `version` | *(moved to path parameter)*             | Because our API URIs are now centered around supplying a version or branch directly in the API URI via a path parameter, we have dropped support for this value in the request/response body because this value would be identical to what you supplied.                                                                                                                                                                                                                                                                                           |

If you do not see a piece of data listed here, then we no longer support it in API v2. Are we missing something you relied on? [Give us a shout!](mailto:support@readme.io)

### Categories

| API v1                        | Documentation                                 | API v2                                                      | Documentation                                            |    |
| :---------------------------- | :-------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------------------- | :- |
| `GET /categories`             | [Get all categories](refs:getcategories)      | `GET /branches/{branch}/categories/{section}`               | [Get all categories](refs:getcategories-1)               |    |
| `POST /categories`            | [Create category](refs:createcategory)        | `POST /branches/{branch}/categories`                        | [Create a category](refs:createcategory-1)               |    |
| `GET /categories/{slug}`      | [Get category](refs:getcategory)              | `GET /branches/{branch}/categories/{section}`               | [Get a category](refs:getcategory-1)                     |    |
| `PUT /categories/{slug}`      | [Update category](refs:updatecategory)        | `PATCH /branches/{branch}/categories/{section}/{title}`     | [Update a category](refs:updatecategory-1)               |    |
| `DELETE /categories/{slug}`   | [Delete category](refs:deletecategory)        | `DELETE /branches/{branch}/categories/{section}/{title}`    | [Delete a category](refs:deletecategory-1)               |    |
| `GET /categories/{slug}/docs` | [Get docs for category](refs:getcategorydocs) | `GET /branches/{branch}/categories/{section}/{title}/pages` | [Get the pages within a category](refs:getcategorypages) |    |

#### Response schema changes

| API v1    | API v2                      | Notes                                                                                                                                                                                                                                                    |
| :-------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `order`   | `position`                  | We do not currently return `position` in category responses. However, if you know the position you wish to set a category at in your sidebar, you can supply `position` to either the POST or PATCH endpoints.                                           |
| `id`      | `title`                     | We have dropped support for our legacy hexadecimal IDs in favor of the unique resource identifier of a `title`.                                                                                                                                          |
| `project` | `links.project`             | This was previously a hexadecimal ID for the project attached to the page. We have replaced this with a `links.project` URI to our [`GET /projects/me`](refs:getproject) endpoint where you can obtain additional information.                           |
| `slug`    | `title`                     | Previously, there was no difference in API v1 between `slug` and `title`, so we have dropped `slug` in favor of the latter.                                                                                                                              |
| `title`   | `title`                     |                                                                                                                                                                                                                                                          |
| `type`    | `section`                   | This has been removed in favor of supplying a `section` path parameter to the category APIs.                                                                                                                                                             |
| `version` | *(moved to path parameter)* | Because our API URIs are now centered around supplying a version or branch directly in the API URI via a path parameter, we have dropped support for this value in the request/response body because this value would be identical to what you supplied. |

If you do not see a piece of data listed here, then we no longer support it in API v2. Are we missing something you relied on? [Give us a shout!](mailto:support@readme.io)

### Changelog

| API v1                      | Documentation                            | API v2                            | Documentation                                      |
| :-------------------------- | :--------------------------------------- | :-------------------------------- | :------------------------------------------------- |
| `GET /changelogs`           | [Get changelogs](refs:getchangelogs)     | `GET /changelogs`                 | [Get all changelog entries](refs:getchangelogs-1)  |
| `POST /changelogs`          | [Create changelog](refs:createchangelog) | `POST /changelogs`                | [Create a changelog entry](refs:createchangelog-1) |
| `GET /changelogs/{slug}`    | [Get changelog](refs:getchangelog)       | `GET /changelogs/{identifier}`    | [Get a changelog entry](refs:getchangelog-1)       |
| `PUT /changelogs/{slug}`    | [Update changelog](refs:updatechangelog) | `PATCH /changelogs/{identifier}`  | [Update a changelog entry](refs:updatechangelog-1) |
| `DELETE /changelogs/{slug}` | [Delete changelog](refs:deletechangelog) | `DELETE /changelogs/{identifier}` | [Delete a changelog entry](refs:deletechangelog-1) |

#### Response schema changes

| API v1                 | API v2                 | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `body`                 | `content.body`         |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `createdAt`            | `created_at`           |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `hidden`               | `privacy.view`         | If `privacy.view` is `anyone_with_link`, the page is hidden.                                                                                                                                                                                                                                                                                                                                                                                              |
| `metadata.description` | `metadata.description` |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `metadata.image`       | `metadata.image`       | This previously returned an array of various pieces of your image, like the URL and colors that are used in it. For the image URL, you can now access this via `metadata.image.url`. For the additional metadata that was originally part of this array, you can now access that data by making a request to the [`GET /image/{identifier}`](refs:getimage) endpoint — the URI of which is available through the `metadata.image.uri` response parameter. |
| `metadata.keywords`    | `metadata.keywords`    | This was previously a comma-separated list. It is now an array of strings.                                                                                                                                                                                                                                                                                                                                                                                |
| `metadata.title`       | `metadata.title`       |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `slug`                 | `slug`                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `title`                | `title`                |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `type`                 | `type`                 | With the exception of now returning `none` instead of an empty string when a changelog has no type, `type` remains unchanged.                                                                                                                                                                                                                                                                                                                             |
| `updatedAt`            | `updated_at`           |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

If you do not see a piece of data listed here, then we no longer support it in API v2. Are we missing something you relied on? [Give us a shout!](mailto:support@readme.io)

### Custom Pages

| API v1                       | Documentation                           | API v2                                          | Documentation                                   |
| :--------------------------- | :-------------------------------------- | :---------------------------------------------- | :---------------------------------------------- |
| `GET /custompages`           | [Get custom pages](refs:getcustompages) | `GET /branches/{branch}/custom_pages`           | [Create a custom page](refs:createcustompage-1) |
| `POST /custompages`          | [Create custom page](refs:)             | `POST /branches/{branch}/custom_pages`          | [Get all custom pages](refs:getcustompages-1)   |
| `GET /custompages/{slug}`    | [Get custom page](refs:)                | `GET /branches/{branch}/custom_pages/{slug}`    | [Get a custom page](refs:getcustompage-1)       |
| `PUT /custompages/{slug}`    | [Update custom page](refs:)             | `PATCH /branches/{branch}/custom_pages/{slug}`  | [Update a custom page](refs:updatecustompage-1) |
| `DELETE /custompages/{slug}` | [Delete custom page](refs:)             | `DELETE /branches/{branch}/custom_pages/{slug}` | [Delete a custom page](refs:deletecustompage-1) |

#### Response schema changes

| API v1                 | API v2                  | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fullscreen`           | `appearance.fullscreen` |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `body`                 | `content.body`          | We previously had this data split across two different properties of `body` and `html`. If `body` has content and `html` is empty, then your custom page is pure Markdown. If it had `html` but no `body`, then it was an HTML custom page. We have merged these two into a single `content.body` property and given you a discriminator of `content.type` that you can use to infer the type of content this is.                                         |
| `hidden`               | `privacy.view`          | If `privacy.view` is `anyone_with_link`, then the page is hidden.                                                                                                                                                                                                                                                                                                                                                                                         |
| `html`                 | `content.body`          | See the note in `body` for how to interpret this data now.                                                                                                                                                                                                                                                                                                                                                                                                |
| `htmlmode`             | `content.type`          | If `htmlmode` was previously `true`, then `content.type` is `html`. The default `type` is `markdown`, meaning your custom page is pure Markdown.                                                                                                                                                                                                                                                                                                          |
| `metadata.description` | `metadata.description`  |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `metadata.image`       | `metadata.image`        | This previously returned an array of various pieces of your image, like the URL and colors that are used in it. For the image URL, you can now access this via `metadata.image.url`. For the additional metadata that was originally part of this array, you can now access that data by making a request to the [`GET /image/{identifier}`](refs:getimage) endpoint — the URI of which is available through the `metadata.image.uri` response parameter. |
| `metadata.keywords`    | `metadata.keywords`     | This was previously a comma-separated list. It is now an array of strings.                                                                                                                                                                                                                                                                                                                                                                                |
| `metadata.title`       | `metadata.title`        |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `slug`                 | `slug`                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `title`                | `title`                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `updatedAt`            | `updated_at`            |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

If you do not see a piece of data listed here, then we no longer support it in API v2. Are we missing something you relied on? [Give us a shout!](mailto:support@readme.io)

### Docs

Previously, all of our guides and API reference APIs had a resource identifier of a hexadecimal ID with a single endpoint to handle both page types. This has changed with APIv2, where we have reshaped their responses, not only because guides and references have independent sets of identifiers, but also to allow for future expansion (e.g., potentially returning the referenced OpenAPI definition when retrieving an API reference).

Functionally, these two APIs are identical, and the `/reference/` family of endpoints includes some additional data.

| API v1                        | Documentation                               | API v2                                                                                      | Documentation                                                                                                                                                                                                                                                                                                                       |
| :---------------------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST docs`                   | [Create doc](refs:createdoc)                | `POST /branches/{branch}/guides`<br />`POST /branches/{branch}/reference`                   | [Create a guides page](refs:createguide)<br />[Create a reference page](refs:createreference)                                                                                                                                                                                                                                       |
| `POST /docs/search`           | [Search docs](refs:searchdocs)              | `GET /search`†                                                                              | [Perform a search query](refs:search-3)                                                                                                                                                                                                                                                                                             |
| `GET /docs/{slug}`            | [Get doc](refs:getdoc)                      | `GET /branches/{branch}/guides/{slug}`<br />`GET /branches/{branch}/reference/{slug}`       | [Get a guides page](refs:getguide)<br />[Get a reference page](refs:getreference)                                                                                                                                                                                                                                                   |
| `PUT /docs/{slug}`            | [Update Doc](refs:updatedoc)                | `PATCH /branches/{branch}/guides/{slug}`<br />`PATCH /branches/{branch}/reference/{slug}`   | [Update a guides page](refs:updateguide)<br />[Update a reference page](refs:updatereference)                                                                                                                                                                                                                                       |
| `DELETE /docs/{slug}`         | [Delete doc](refs:deletedoc)                | `DELETE /branches/{branch}/guides/{slug}`<br />`DELETE /branches/{branch}/reference/{slug}` | [Delete a guides page](refs:deleteguide)<br />[Delete a reference page](refs:deletereference)                                                                                                                                                                                                                                       |
| `GET /docs/{slug}/production` | [Get production doc](refs:getproductiondoc) | 🚫                                                                                          | With the release of [ReadMe Refactored](docs:upgrade-to-readme-refactored) and [branching](docs:branches), we have begun to move away from our existing staging architecture. As such, this endpoint no longer exists within API v2. To retrieve a "staged" copy of a guide or reference, you can access it from a specific branch. |

<small>† Though we have differing APIs for guides and API reference pages, our `GET /search` endpoint handles all forms of content in your ReadMe Project: guides, references, recipes, discussions, etc.</small>

#### Response schema changes

Unless explicitly noted otherwise, all response schema changes documented here apply to both the Guide and API Reference family of endpoints.

| API v1                 | API v2                      | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api.method`           | `api.method`                | Only available on the API Reference endpoints.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `api.url`              | `api.path`                  | Only available on the API Reference endpoints.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `body`                 | `content.body`              |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `category`             | `category.uri`              | This was previously a hexadecimal ID to your category, we have revised this to be an API v2 URI to the [`GET /branches/{branch}/categories`](refs:getcategory-1) endpoint.                                                                                                                                                                                                                                                                               |
| `deprecated`           | `state`                     | If `state` is `deprecated`.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `excerpt`              | `content.excerpt`           |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `hidden`               | `privacy.view`              | If `privacy.view` is `anyone_with_link` then the page is hidden.                                                                                                                                                                                                                                                                                                                                                                                         |
| `icon`                 | `appearance.icon`           |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `id`                   | `title`                     | We have dropped support for our legacy hexadecimal IDs in favor of the unique resource identifier of a `slug`.                                                                                                                                                                                                                                                                                                                                           |
| `isApi`                | `type`                      | If `type` is `endpoint`.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `isReference`          |                             | This has been removed in favor of splitting our Guide and API Reference APIs apart.                                                                                                                                                                                                                                                                                                                                                                      |
| `link_external`        | `link.new_tab`              |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `link_url`             | `link.url`                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `metadata.description` | `metadata.description`      |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `metadata.image`       | `metadata.image`            | This previously returned an array of various pieces of your image, like the URL and colors that are used in it. For the image URL you can now access this via `metadata.image.url`. For the additional metadata that was originally part of this array, you can now access that data by making a request to the [`GET /image/{identifier}`](refs:getimage) endpoint — the URI of which is available through the `metadata.image.uri` response parameter. |
| `metadata.keywords`    | `metadata.keywords`         | This was previously a comma-separated list. It is now an array of strings.                                                                                                                                                                                                                                                                                                                                                                               |
| `metadata.robots`      | `allow_crawlers`            | The `index` value of `metadata.robots` now equates to if `allow_crawlers` is `enabled`, `noindex` is now `disabled`.                                                                                                                                                                                                                                                                                                                                     |
| `metadata.title`       | `metadata.title`            |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `next.description`     | `next.description`          |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `next.pages`           | `next.pages`                |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `project`              | `project.*`                 | This was previously a hexadecimal ID to the project attached to the page. We have replaced this with a `project` object that contains various data about the project in question, including an API v2 URI to our [`GET /projects/me`](refs:getproject) endpoint where you can obtain additional information.                                                                                                                                             |
| `slug`                 | `slug`                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `title`                | `title`                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `type`                 | `type`                      | We have deprecated and removed support for `fn`, `error`, and `page` types, but all other page types have remained unchanged.                                                                                                                                                                                                                                                                                                                            |
| `updatedAt`            | `updated_at`                |                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `version`              | *(moved to path parameter)* | Because our API URIs are now centered around supplying a version or branch directly in the API URI via a path parameter, we have dropped support for this value in the request/response body because this value would be identical to what you supplied.                                                                                                                                                                                                 |

If you do not see a piece of data listed here, then we no longer support it in API v2. Are we missing something you relied on? [Give us a shout!](mailto:support@readme.io)

### IP Addresses

| API v1              | Documentation                                             | API v2              | Documentation                                               |
| :------------------ | :-------------------------------------------------------- | :------------------ | :---------------------------------------------------------- |
| `GET /outbound-ips` | [Get ReadMe’s outbound IP addresses](refs:getoutboundips) | `GET /outbound_ips` | [Get ReadMe’s outbound IP addresses](refs:getoutboundips-1) |

#### Response schema changes

| API v1      | API v2       | Notes |
| :---------- | :----------- | :---- |
| `ipAddress` | `ip_address` |       |

### Owlbot AI

| API v1             | Documentation                              | API v2             | Documentation                                |
| :----------------- | :----------------------------------------- | :----------------- | :------------------------------------------- |
| `POST /owlbot/ask` | [Ask Owlbot AI a question](refs:askowlbot) | `POST /owlbot/ask` | [Ask Owlbot AI a question](refs:askowlbot-1) |

#### Response schema changes

Other than the aforementioned core response restructuring of resources being returned within a `data` object nothing has changed here!

### Projects

| API v1  | Documentation                                             | API v2             | Documentation                             |
| :------ | :-------------------------------------------------------- | :----------------- | :---------------------------------------- |
| `GET /` | [Get metadata about the current project](refs:getproject) | `GET /projects/me` | [Get project metadata](refs:getproject-1) |

#### Response schema changes

| API v1       | API v2                    | Notes |
| :----------- | :------------------------ | :---- |
| `jwt_secret` | `custom_login.jwt_secret` |       |
| `name`       | `name`                    |       |
| `plan`       | `plan.type`               |       |
| `subdomain`  | `subdomain`               |       |

If you do not see a piece of data listed here, then we no longer support it in API v2. Are we missing something you relied on? [Give us a shout!](mailto:support@readme.io)

### Search

As mentioned [in the Docs section above](#docs), the [section-specific `Search Docs` endpoint in our legacy API](https://docs.readme.com/main/reference/searchdocs) has now been replaced by [a general project-wide search endpoint](https://docs.readme.com/main/reference/search-3).

A few things to note:

* The search query is still passed via a query parameter (previously called `search`, now called `query`).
* You can now filter results for a specific section of your project (e.g., guides, API reference, etc.) via an optional `section` query parameter.
* For enterprise groups, this endpoint also searches results across all child projects. There's an optional `projects` query parameter for limiting results to certain child projects.

### Version

As mentioned above, our version APIs have been reframed around the [branching](docs:branches) functionality now available within [ReadMe Refactored](docs:upgrade-to-readme-refactored). Versions and branches off of those versions are accessed through the same API — to access them, supply the name of that version (e.g., `2.0`) or the branch (e.g., `2.0_cool-dogs`) within the endpoint URI. You can key off of the `type` property, `version` or `branch`, from the response to know what kind of data you have.

| API v1                        | Documentation                        | API v2                     | Documentation                                   |
| :---------------------------- | :----------------------------------- | :------------------------- | :---------------------------------------------- |
| `GET /version`                | [Get versions](refs:getversions)     | `GET /branches`            | [Get branches](refs:getbranches)                |
| `POST /version`               | [Create version](refs:createversion) | `POST branches`            | [Create a branch](refs:createbranch)            |
| `GET /version/{versionId}`    | [Get version](refs:getversion)       | `GET /branches/{branch}`   | [Get a branch](refs:getbranch)                  |
| `PUT /version/{versionId}`    | [Update version](refs:updateversion) | `PATCH /branches/{branch}` | [Updates an existing branch](refs:updatebranch) |
| `DELETE /version/{versionId}` | [Delete version](refs:deleteversion) | `PATCH /branches/{branch}` | [Delete a branch](refs:deletebranch)            |

#### Response schema changes

| API v1          | API v2          | Notes                                                                                                                                                                     |
| :-------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `codename`      | `display_name`  |                                                                                                                                                                           |
| `forked_from`   | `base`          | `forked_from` was previously a hexadecimal ID for the base version. It is now the name of the base version or branch. (e.g., `2.0` instead of `685345e07d0542c58d8d4cce`) |
| `is_beta`       | `release_stage` | If `release_stage` is `beta`.                                                                                                                                             |
| `is_deprecated` | `state`         | If `state` is `deprecated`.                                                                                                                                               |
| `is_hidden`     | `privacy.view`  | If `privacy.view` is `hidden`.                                                                                                                                            |
| `is_stable`     | `release_stage` | If `release_stage` is `default`.                                                                                                                                          |
| `version`       | `name`          |                                                                                                                                                                           |

If you do not see a piece of data listed here, then we no longer support it in APIv2. Are we missing something you relied on? [Give us a shout!](mailto:support@readme.io)
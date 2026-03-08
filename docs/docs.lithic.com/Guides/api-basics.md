# API Basics

Learn our API's fundamentals, including authentication, request structure, error handling, and core functionalities like card issuance and transaction management.

## Authenticating

An API key is required to get started. Generate one on the Program settings page of the Lithic Dashboard.

Requests are authenticated with an API (secret) key with the following request header:

```curl
"Authorization: YOUR_API_KEY"
```

### Example

```curl cURL
curl --request GET \
     --url 'https://api.lithic.com/v1/cards' \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR_API_KEY'
```

## Errors

You can use this information to diagnose failed transactions and fine-tune your exception-handling capabilities.

## `400`

|                                   |                                                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| \[query] is not a valid parameter | A parameter in the query given in the request does not match the valid queries for the endpoint |

## `401`

|                                                               |                                                                                                          |                                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| User has not been authenticated                               | Invalid or missing API key                                                                               |                                                                |
| API key is not active                                         | The API key used is no longer active                                                                     |                                                                |
| Could not find API key                                        | The API key provided is not associated with any user                                                     |                                                                |
| Please provide API key in Authorization header                | The Authorization header is not in the request                                                           |                                                                |
| Please provide API key in the form `Authorization: [api-key]` | The Authorization header is not formatted properly                                                       |                                                                |
| Insufficient Privileges. Issuing API key required             | Write access requires an Issuing API key. Please contact [support@lithic.com](mailto:support@lithic.com) |                                                                |
| Insufficient privileges to create virtual cards.              | Creating virtual cards requires an additional privilege                                                  | Please contact [support@lithic.com](mailto:support@lithic.com) |

## `422`

|                                      |                                                         |
| ------------------------------------ | ------------------------------------------------------- |
| Authorization failed (in simulation) | An authorization fails when simulating an authorization |

## `429`

|                                            |                                               |
| ------------------------------------------ | --------------------------------------------- |
| Rate limited, too many requests per second | User has exceeded their per second rate limit |

## `5xx`

Lithic APIs may return HTTP 5xx errors in case of issues on Lithic's side. This always indicates a server-side error, and the specific HTTP error should not matter to the caller. The recommended action is to retry the request. If the issue persists, check our [Status Page](https://status.lithic.com/) and contact [support@lithic.com](mailto:support@lithic.com).

|     |                       |                                                                                              |
| --- | :-------------------- | -------------------------------------------------------------------------------------------- |
| 500 | Internal Server Error | There was a processing error on the server-side.                                             |
| 502 | Bad Gateway           | There was a processing error on the server-side due to network configuration                 |
| 503 | Service Unavailable   | There was a processing error on the server-side due to unavailability of an internal service |
| 504 | Gateway Timeout       | There was a processing error on the server-side due to network timeout                       |

## General Notes

* Each entity is identified by its `token`.
* HTTP bodies must be valid JSON and the request header `Content-Type` must be `application/json`.
* Amounts are all integers. They are represented in the smallest unit of the associated currency (e.g., `amount` of 100 in USD is $1) unless specified otherwise.
* Any field we don’t have data for will show up as empty.
* All dates are RFC 3339 unless specified otherwise.
* Additional fields may be added to API response payloads. API users should ensure that any integrations and use of these responses can handle new fields at any time.

## Pagination

> 📘
>
> Auto-pagination helpers are available in our [API libraries](https://docs.lithic.com/docs/api-libraries) for easy navigation through all pages of a list.

Top-level API resources support bulk fetches through "list" API methods, such as list events, list disputes, and list settlement records. These methods have a common structure, taking at least `page_size`, `starting_after`, and `ending_before` as parameters.

**Request Parameters:**

* `page_size`: The number of records to return in the API response.
* `starting_after`: A cursor for pagination. Provide an item's token to fetch the next page of results that appear after this item in the list.
* `ending_before`: A cursor for pagination. Provide an item's token to fetch the previous page of results that appear before this item in the list.

The value provided for `starting_after` or `ending_before` should be a token of the type of resource being queried. For example, when querying the `/disputes` endpoint you would provide a dispute object's `token` as either the `starting_after` or `ending_before` value.

To navigate through pages:

* To get the next page: use `starting_after` with the token of the last item in your current results
* To get the previous page: use `ending_before` with the token of the first item in your current results

If neither `starting_after` or `ending_before` are provided, then the API will return the newest objects. Objects are always returned in reverse chronological order (newest first). `starting_after` and `ending_before` cannot be used together.

**Response Parameters:**

`has_more`: `true` when there are more records that match the API request. To access those items, update either the `starting_after` or `ending_before` parameters and send another request.

**Pagination Example**

```json
// Example Request to GET /disputes using Pagination
{
  ...
  "page_size": 5,
  "starting_after": "bf3022a8-4628-4417-b4db-e1ba72075a08",
  // Returns the next page of results (older items) after this dispute in the list.
}

// Response
{
  "data": [...], // 5 items returned because of the provided "page_size" in the request.
  "has_more": true // More items exist that match the query.
  // Change the "starting_after" to the token of the last object in data
  // to receive the next page of objects.
}

// Example: If items were created in order [A,B,C,D,E], they are returned as [E,D,C,B,A]
// First page of size 3 (no cursor): returns [E,D,C]
// Next page using starting_after="C": returns [B,A]
// Previous page using ending_before="C": returns [E,D]
```

**Transitioning from offset pagination to cursor-based pagination**

If you are using an SDK, all Lithic client libraries now use cursor-based pagination by default. Update your libraries to the latest version to leverage this enhancement

If you are directly querying our APIs, to transition to cursor-based pagination, you would include the header `X-Lithic-Pagination: cursor` in your API requests and use `starting_after` or `end_before` query parameters instead of `page`. For example, assume you used the below offset pagination to get a list of transactions starting on page 2:

```json
// Example Request to GET /transactions using offset
{
  ...
  "page_size": 25,
  "page": 2,
}

// Response
{
  "data": [
    {
      "token": "764fa5a3-2371-40f0-8cbb-9a2e1230d955",
    	...
    },
    ...
  ], // 25 items returned because of the provided "page_size" in the request.
  "page": 2,
  "total_entries": 100,
  "total_pages": 4
}
```

To get the same results with offset pagination, you would traverse the list starting from the most recent entry:

```json
// Example Request to GET /transactions using cursor-based
{
  ...
  "page_size": 25,
    // no starting_after or ending_before provided since we are starting from the most recent event
}

// Response
{
  "data": [
    ...
    {
      "token": "079d1898-65f7-4d66-b0bc-172d2935a5fa",
    	...
    },
  ], // first 25 items returned in reverse chronological order
  "has_more": true
}
```

Then, you would take the `token` of the last object in the above result (`079d1898-65f7-4d66-b0bc-172d2935a5fa`) and use it in your next request as the value for `starting_after`. The results from this second request will match the results you retrieved from page 2 of the offset pagination request (assuming there has been no updates to the data):

```json JSON
// Example Request to GET /transactions using cursor-based
{
  ...
  "page_size": 25,
  "starting_after": "079d1898-65f7-4d66-b0bc-172d2935a5fa" // continue onto "page 2" of the results
}

// Response
{
  "data": [
    {
      "token": "764fa5a3-2371-40f0-8cbb-9a2e1230d955",
    	...
    },
    ...
  ], // next 25 items returned
  "has_more": true
}
```

Note that `total_entries` and `total_pages` fields will no longer be provided in the response to maintain consistent performance at scale.

## Versioning and backwards compatibility

The Lithic API will not make backwards-incompatible changes (such as removing a field from the API) without reaching out to you first. We're continually making backwards-compatible changes to the API, however. A record of backwards-compatible changes can be found in our [Changelog](https://docs.lithic.com/changelog). Examples of backwards-compatible changes which we do not consider "breaking" include:

1. Adding new optional request parameters to existing API methods.
2. Adding new properties to existing API responses.
3. Changing the order of properties in existing API responses.
4. Adding new API resources or methods.
5. Changing the length or format of opaque strings, such as resource IDs, error messages, and other human-readable strings.
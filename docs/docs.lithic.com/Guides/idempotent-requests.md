# Idempotent Requests

Learn how to make idempotent POST requests

The API provides support for idempotency, which ensures that you can safely retry requests without inadvertently performing the same action multiple times. When creating or updating objects, you should include an idempotency key. This means that even if there's a connection issue and you have to resend the request, you won't end up with duplicate objects or updates.

## Making Idempotent Requests

To make an idempotent request, add the following header: `Idempotency-Key: {key}`.

An idempotency key is a unique value created by the client that the server uses to identify repeated attempts of the same request. The idempotency key must be a valid UUID (V4 UUIDs are recommended).

```shell cURL
curl https://api.lithic.com/v1/cards \
  -H "Authorization: YOUR_API_KEY" \
  -H "Idempotency-Key: 123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "VIRTUAL"
  }'
```

## Which Endpoints Support Idempotency

| HTTP Method            | Idempotency Support                                                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`                 | Most POST endpoints support idempotency, including resource creation and action endpoints (e.g., card renewal operations). Using idempotency keys with POST requests is strongly recommended. |
| `PATCH`                | PATCH operations are designed to be declarative and do not have relative change logic (increment by Y), making them naturally idempotent. Idempotency keys are not required.                  |
| `GET`, `DELETE`, `PUT` | These methods are inherently idempotent per HTTP specification and don't require idempotency keys.                                                                                            |

## Supported Endpoints

Idempotency is currently supported on the following endpoints:

* [`POST /v1/financial_accounts`](https://docs.lithic.com/reference/createfinancialaccount)
* [`POST /v1/cards`](https://docs.lithic.com/reference/postcards)

Support for idempotency is being rolled out to all API endpoints. All POST endpoints will support idempotency in the future.

## How Idempotency Works

Lithic's idempotency system stores the result of the initial request associated with a specific idempotency key. When you retry a request with the same key, you'll receive the same response as the original request.

### Key Retention

Idempotency keys are valid for **30 days** for a given endpoint and HTTP method. After 30 days, keys are automatically removed from the system. If you reuse a key after it's been deleted, a new request will be processed.

### Request Validation

The idempotency system validates that retried requests match the original:

| Scenario                                      | Response                                                                                                                                                                                                                                 |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Duplicate request with same body              | `201 Created`: Returns the result of the original operation with the same resource                                                                                                                                                       |
| Duplicate request with modified body          | `422 Unprocessable Content`: The request body differs from the original request                                                                                                                                                          |
| Duplicate request after resource modification | `409 Conflict`: The resource has been modified after the original creation. The response includes a `conflicts_with` field containing the token of the conflicting resource.                                                             |
| Concurrent requests                           | `200`/`201` or `409 Conflict`: The API will either respond with the appropriate status code as if the requests happened sequentially, or return `409 Conflict` with an `X-Should-Retry: true` header to indicate it's a retryable error. |

### Error Handling

* **Validation errors (400 Bad Request)**: If a request fails due to parameter validation errors, the idempotency key is not stored and may be safely reused with corrected parameters.
* **Server errors (5xx)**: If you retry a request that previously returned a server error, the API will attempt to process the operation again rather than simply returning the cached error. This ensures retries can succeed after transient issues are resolved.

### Reusing Keys

* Do not reuse idempotency keys across different endpoints or HTTP methods
* Do not reuse keys after 30 days have elapsed
* Ensure the request body is identical when retrying with the same key

## Client Library Support

Our client libraries automatically generate idempotency keys to enable request retries. You also have the option of providing your own custom idempotency keys for more control over retry behavior.
# Idempotent Requests

The Modern Treasury API supports [idempotent](https://en.wikipedia.org/wiki/Idempotence) requests to help prevent you from accidentally issuing the same API call twice. This feature can be helpful if you are instructing us to move money, create an entity, or make changes to an existing resource. For example, if you are creating a Payment Order and the request fails due to a network issue, you can retry the request with the same idempotency key to guarantee the payment order was only created once.

To use this, you will include a header as a part of your request like `Idempotency-Key: <your-key>`. This key should be something unique, preferably something like an internal database UUID. It may not exceed 180 characters.

When a successful request is made with an idempotency key, we will save the result of that request for 24 hours. If you issue a new request within 24 hours using the same credentials and idempotency key, we will echo the original response (status code and body) back to you.

A few things to note:

* Results are only saved if the request successfully executed.
* If there was a connection interruption or another error that prevented us from completing the original request, we will execute the following request and cache its results.
* Idempotency keys are independent of the route. For example if you use a key to create a payment order and then use the same key to create a counterparty within 24 hours, you will received the cached result of the first payment order request.
* All `POST` and `PATCH` requests accept idempotency keys.
* `GET`, `PUT`, and `DELETE` are idempotent by definition. Any idempotency key sent for these types of requests will be ignored and not be saved.
* If the system is in the middle of storing a request with an idempotency key and receives another request with the same key, it will return a `409` for the newer request.

> 🚧 Idempotency keys are scoped by your API key
>
> Idempotency keys are scoped to the API key that initiated the request. If you use multiple API keys with the same idempotency key, they will each execute their requests independently and result in multiple updates.

```shell Idempotent Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  -H "Idempotency-Key: <your-key>" \
  --url https://app.moderntreasury.com/api/<endpoint>
```
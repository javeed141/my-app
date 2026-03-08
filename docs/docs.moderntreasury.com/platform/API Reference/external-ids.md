# External IDs

External IDs provide a way to synchronize resources between your system and our API. They serve as your unique identifier for resources, with a maximum length of 180 characters, preventing duplicate resource creation. The external ID must also match this regex `/\A[\w-]+\z/` meaning it must be composed of numbers, letters, underscores `_` and dashes `-`.

Once you assign an external ID to a resource, that ID becomes immutable and enables you to maintain referential integrity between your database and ours. This feature is particularly valuable for system synchronization, as you can use your existing internal IDs, UUIDs, or any string format that makes sense for your system.

# Using External IDs

External ID can be optionally passed as a field on the creation of objects like [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object) and [Ledger Transactions](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object). They can be used in GET and PATCH requests in place of a Modern Treasury ID.

If you attempt to create an object with an External ID that has already been used, the request will return a 409 error code with response containing:

```json
{
  "errors": {
    "message": "external_id has been taken"
  }
}
```

External IDs do not replace idempotency keys—they serve different purposes and work together. While external IDs help you reference and identify resources across systems using your own identifiers, idempotency keys ensure that duplicate API requests don't create unintended side effects. The interaction and behavior of idempotency keys remains unchanged when using external IDs.

If you attempt to create an object using an idempotency key that has been used, the request will have the same behavior as [Idempotent Requests](https://docs.moderntreasury.com/platform/reference/idempotent-requests) regardless of the External ID provided.

<br />
# Reconciliation Group

When many Transactions and many ExpectedPayments are reconciled together, they are grouped under a single reconciliation group.

All transaction line items within the same reconciliation group represent a complete reconciliation between the transactions and the expected payments.

When the grouped transaction line items are unreconciled, the reconciliation group may be discarded if no other line items reference it.

> 🚧
>
> Reconcile many Transactions and many ExpectedPayments under one reconciliation group using the Bulk Requests API.

```json Reconciliation Group
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "live_mode": true,
  "created_at": "2025-06-12T09:38:14Z",
  "updated_at": "2025-06-12T09:38:14Z"
}
```
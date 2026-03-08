# Ledger Account Settlement Webhooks

| Event                  | Description                                                                                                                            |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **finish\_processing** | A ledger account settlement has been processed successfully. The `status` has transitioned from `processing` to `pending` or `posted`. |
| **finish\_archiving**  | A ledger account settlement has been archived successfully. The `status` has transitioned from `archiving` to `archived`.              |

```json Sample Ledger Account Payout Webhook
{
  "event": "finish_processing",
  "data": {
    "id": "e8006520-9cc2-4b53-a8c6-d24c43bbdedf",
    "amount": 100,
    "object": "ledger_account_settlement",
    "status": "pending",
    "currency": "USD",
    "metadata": {
      "foo": "bar"
    },
    "live_mode": true,
    "created_at": "2023-02-01T19:37:39Z",
    "updated_at": "2023-02-01T19:37:41Z",
    "description": "Alice's January Payout",
    "currency_exponent": 2,
    "ledger_transaction_id": "e6f6a58d-c967-4e0a-ab29-574d91a8b233",
    "effective_at_upper_bound": "2023-01-31T23:59:59Z",
    "settled_ledger_account_id": "4cf989d4-0abb-43b3-bb37-116dabc3ea67",
    "contra_ledger_account_id": "8077e8df-42a2-458d-8f9e-931f386d6722"
  }
}
```
# Ledger Account Webhooks

| Event       | Description                                                                                                                                     |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **created** | A ledger account has been created successfully.                                                                                                 |
| **updated** | A ledger account has been updated successfully. This includes balance updates or updates to mutable fields (name, description, metadata, etc.). |

```json Sample Ledger Account Webhook
{
  "event": "created",
  "data": {
    "id": "019783ca-d4cd-7719-b316-70c478c56539",
    "object": "ledger_account",
    "live_mode": true,
    "name": "Liabilities",
    "ledger_id": "019783ca-d489-79f4-8485-df3e46b0d7fc",
    "description": null,
    "lock_version": 0,
    "normal_balance": "credit",
    "balances":
    {
        "effective_at_lower_bound": null,
        "effective_at_upper_bound": null,
        "pending_balance":
        {
            "credits": 0,
            "debits": 0,
            "amount": 0,
            "currency": "USD",
            "currency_exponent": 2
        },
        "posted_balance":
        {
            "credits": 0,
            "debits": 0,
            "amount": 0,
            "currency": "USD",
            "currency_exponent": 2
        },
        "available_balance":
        {
            "credits": 0,
            "debits": 0,
            "amount": 0,
            "currency": "USD",
            "currency_exponent": 2
        }
    },
    "ledgerable_type": null,
    "ledgerable_id": null,
    "external_id": "cd156174-a0ee-42a2-9d02-0af08adbbd27",
    "metadata": {},
    "discarded_at": null,
    "created_at": "2025-06-18T16:06:37Z",
    "updated_at": "2025-06-18T16:06:37Z"
  }
}
```
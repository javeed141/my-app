# Ledger Account Balance Monitor Webhooks

| Event         | Description                                                                                                                                                                                                  |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **triggered** | A ledger account balance monitor has been triggered. This will occur when an update to the Ledger Account's balances cause the monitor's `alert_condition` to evaluate to true when it was previously false. |
| **resolved**  | A ledger account balance monitor has been resolved. This will occur when an update to the Ledger Account's balances cause the monitor's `alert_condition` to evaluate to false when it was previously true.  |

```json Sample Ledger Account Balance Monitor Webhook
{
  "event": "triggered",
  "data": {
    "id": "36f99587-e551-4836-bab5-62250338ef70",
    "object": "ledger_account_balance_monitor",
    "live_mode": true,
    "ledger_account_id": "895cf384-3d37-48bf-b04d-ea34bf358079",
    "description": "Alert when balance changes",
    "alert_condition": {
      "field": "available_amount",
      "operator": "greater_than",
      "value": 0
    },
    "current_ledger_account_balance_state": {
      "balances": {
        "pending_balance": {
          "credits": 10,
          "debits": 0,
          "amount": 10,
          "currency": "USD",
          "currency_exponent": 2
        },
        "posted_balance": {
          "credits": 10,
          "debits": 10,
          "amount": 10,
          "currency": "USD",
          "currency_exponent": 2
        },
        "available_balance": {
          "credits": 10,
          "debits": 0,
          "amount": 10,
          "currency": "USD",
          "currency_exponent": 2
        }
      },
      "ledger_account_lock_version": 1,
      "triggered": true
    },
    "metadata": {},
    "discarded_at": null,
    "created_at": "2023-08-14T17:22:37Z",
    "updated_at": "2023-08-14T17:22:37Z"
  }
}
```
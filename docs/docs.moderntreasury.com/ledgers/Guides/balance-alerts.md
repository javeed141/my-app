# Balance Alerts and Ledger Account Balance Monitors

# Overview

If you want to be alerted or trigger a process when a Ledger Account exceeds a given range, you can use a `ledger_account_balance_monitor`. You can find the API reference for Ledger Account Balance Monitors [here](https://docs.moderntreasury.com/platform/reference/ledger-account-balance-monitor-object) and the webhook information [here](https://docs.moderntreasury.com/platform/reference/ledger-account-balance-monitors).

Balance monitors should be used for cases where Ledger Accounts are allowed to exit a certain range, but where this activity needs to be flagged. For example, you may have a range within which a cash or user account should remain over the normal course of business, outside of which operational users should be alerted.

For Ledger Accounts that should never exceed a given range (e.g. user balances that should never go below zero), you can use balance locking on ledger entry creation. See [Handling Concurrency](https://docs.moderntreasury.com/ledgers/docs/handling-concurrency).

# Create a Ledger Account Balance Monitor

Ledger Account Balance monitors can be created by calling our [Create Ledger Account Balance Monitor](https://docs.moderntreasury.com/platform/reference/create-ledger-account-balance-monitor) endpoint. For example, to create a balance monitor which sends a webhook when the available balance of the account goes below 0, the following request can be made:

```curl
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_account_balance_monitors \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '
{
     "alert_condition": {
        "field": "available_balance_amount",
        "condition": "less_than",
        "value": 0
     },
     "description": "Available balance went below 0",
     "ledger_account_id": "78fa571-fe0e-97b2-4228-ccc79018db8e9",
     "metadata": {}
}
'
```

# Listening to webhooks

One the balance monitor is created, it will send an initial webhook which reflects the initial state. Then, every time the alert condition transitions from `true` to `false`, or `false` to `true`, a webhook will be sent.

Learn more about webhooks in general [here](https://docs.moderntreasury.com/platform/reference/webhooks) and Ledger Account Balance Monitor webhook information [here](https://docs.moderntreasury.com/platform/reference/ledger-account-balance-monitors).

# Alert Conditions

An alert condition is comprised of three parts; the field, operator, and value.

* The `field` denotes the specific balance/value we are comparing against.is one of `available_balance_amount`, `pending_balance_amount`, `posted_balance_amount`, `ledger_account_lock_version`.
* The `operator` is used compare the `field` against the `value`. It is one of `less_than`, `less_than_or_equals`, `equals`, `greater_than_or_equals`, `greater_than`.
* The `value` is the comparison value which is compared against the value retrieved through the `field`.

<br />
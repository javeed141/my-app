# Tracking Account Balances

Modern Treasury provides you with real-time balance updates each time a transaction is processed on your account. This information is transmitted to you via webhooks and can also be polled using the Modern Treasury API.

## Balance Reports and Balance Types

Balance Reports represent a collection of balances for an account at a given moment in time. Modern Treasury specifically provides real-time balance reports that contain two types of balances:

* `current_ledger` is the current posted balance of your account. This balance does not account for pending inflows and outflows.
* `current_available` is the current balance available for use when initiating payments from this account. This balance is equal to your `current_ledger` minus any pending outflows.

## Ingesting Balances via Webhooks

Each time an account's balance changes, a [Balance Report webhook](https://docs.moderntreasury.com/platform/reference/balance-reports) will be created. The webhook will contain both balance types mentioned above and an `as_of_time` to represent at what moment in time the balances are reporting on.

```json Sample Balance Report Webhook
{
  "event": "created",
  "data": {
    "id": "b9382713-ce26-4864-9327-289bd7c62j25",
    "object": "balance_report",
    "balances": [
      {
        "id": "805637d6-980d-4a34-8ff6-c3e1e33cd504",
        "amount": 100,
        "object": "balance",
        "currency": "USD",
        "live_mode": true,
        "as_of_date": "2026-01-01",
        "as_of_time": "16:30",
        "created_at": "2026-01-01T20:40:35Z",
        "updated_at": "2026-01-01T20:40:35Z",
        "value_date": "2026-01-01",
        "vendor_code": "current_available",
        "balance_type": "current_available",
        "vendor_code_type": "modern_treasury"
      },
      {
        "id": "1d9bd86f-2b63-453d-b55c-a9e6046aec8w",
        "amount": 235,
        "object": "balance",
        "currency": "USD",
        "live_mode": true,
        "as_of_date": "2026-01-01",
        "as_of_time": "16:30",
        "created_at": "2026-01-01T20:40:35Z",
        "updated_at": "2026-01-01T20:40:35Z",
        "value_date": "2026-01-01",
        "vendor_code": "current_ledger",
        "balance_type": "current_ledger",
        "vendor_code_type": "modern_treasury"
      }
    ],
    "live_mode": true,
    "as_of_date": "2026-01-01",
    "as_of_time": "16:30",
    "created_at": "2026-01-01T20:40:35Z",
    "updated_at": "2026-01-01T20:40:35Z",
    "interest_rate": null,
    "balance_report_type": "real_time",
    "internal_account_id": "bf5f1df9-de01-40c2-9040-7ec10170a14c"
  }
}
```

## Fetching Balances via the API

You can also poll the Modern Treasury's API using [Get Balance Report](https://docs.moderntreasury.com/platform/reference/get-balance-report). You'll need to specify the `internal_account_id` and can fetch the most recent balance available by setting the `id` to `latest`.
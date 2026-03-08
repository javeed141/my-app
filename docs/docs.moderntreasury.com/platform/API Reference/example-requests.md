# Example Requests

# Using the `effective_at` to control the type of rate

```json Spot rate
{
  "internal_account_id": "d728aaf5-8e90-43a8-bbfb-c1f0bcabcb50",
  "effective_at": null, // Null effective at OR omitted entirely
  "base_currency": "USD",
  "target_currency": "EUR",
  "target_amount": 1000
}
```

```json Daily rate sheet
{
  "internal_account_id": "d728aaf5-8e90-43a8-bbfb-c1f0bcabcb50",
  "effective_at": "YYYY-MM-DD", // Where YYYY-MM-DD is today's date
  "base_currency": "USD",
  "target_currency": "EUR",
  "target_amount": 1000
}
```

```json Forward rate
{
  "internal_account_id": "d728aaf5-8e90-43a8-bbfb-c1f0bcabcb50",
  "effective_at": "YYYY-MM-DD", // Where YYYY-MM-DD is some date in the future
  "base_currency": "USD",
  "target_currency": "EUR",
  "target_amount": 1000
}
```

# Using the `base_amount` and `target_amount` to control fixed side

```json Variable to Fixed
{
  "internal_account_id": "d728aaf5-8e90-43a8-bbfb-c1f0bcabcb50",
  "effective_at": null,
  "base_currency": "USD",
  "target_currency": "EUR",
  "target_amount": 1000 // Target amount is specified; base amount is omitted.
}
```

```json Fixed to Variable
{
  "internal_account_id": "d728aaf5-8e90-43a8-bbfb-c1f0bcabcb50",
  "effective_at": null,
  "base_currency": "USD",
  "target_currency": "EUR",
  "base_amount": 1000 // Base amount is specified; target amount is omitted.
}
```
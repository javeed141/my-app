# Create a Foreign Exchange (FX) Quote

<Callout icon="📘" theme="info">
  The Foreign Exchange Quotes functionality is in limited release with select partners. If you are interested in using this feature, please reach out to your Modern Treasury point of contact for more details.
</Callout>

To request a quote from your bank, create a Foreign Exchange Quote with the currency and amount. Modern Treasury will automatically route the request to the appropriate bank, based on the provided `internal_account_id` and respond with an exchange rate specific to your organization.

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

See the [Create Foreign Exchange Quote](https://docs.moderntreasury.com/platform/reference/create-foreign-exchange-quote)  API reference and [examples](https://docs.moderntreasury.com/platform/reference/example-requests#using-the-effective_at-to-control-the-type-of-rate) for details on the available parameters.

# Base vs. Target Amount

When requesting a quote, you either specify a `base_amount` or `target_amount`, but not both. The amount specified is considered the "fixed" amount, and the unspecified amount is the "variable" amount which is calculated after the exchange rate is applied. You may want to fix the base or target amount depending on your user experience.

| Scenario          | Description                                                                                               | Amount specified |
| :---------------- | :-------------------------------------------------------------------------------------------------------- | :--------------- |
| Variable to Fixed | I want to ensure my Counterparty receives €10.00 EUR; I don't care how much USD is sold.                  | `target_amount`  |
| Fixed to Variable | I want to ensure I convert (sell) exactly $10.00 USD; I don't care how much EUR my Counterparty receives. | `base_amount`    |

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

See the [Create Foreign Exchange Quote](https://docs.moderntreasury.com/platform/reference/create-foreign-exchange-quote)  API reference and [examples](https://docs.moderntreasury.com/platform/reference/example-requests#using-the-base_amount-and-target_amount-to-control-fixed-side) for details on the available parameters.
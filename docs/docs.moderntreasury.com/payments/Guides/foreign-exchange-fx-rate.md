# Foreign Exchange Rate

The `foreign_exchange_rate` object is how Modern Treasury represents exchange rate information between two currencies with high precision.

The rate itself is not a resource that can be queried for, but will serialized as part of the object it applies to. Modern Treasury will automatically attach `foreign_exchange_rate` data to relevant objects when we can. For example, an FX Payment Order that has been transmitted to the bank, may have a `foreign_exchange_rate` object describing the final rate applied to the payment. Similarly, a Foreign Exchange Quote will have a `foreign_exchange_rate` object describing the rate being quoted.

<Image align="center" src="https://files.readme.io/ac4791f-Untitled.png" />

See the [Foreign Exchange Rate](https://docs.moderntreasury.com/platform/reference/foreign-exchange-rates) API reference for more details on the object.

The exchange rate is stored as two integer components: its `value` and `exponent`. The decimal rate is computed as `value / (10 ^ exponent)`. For example, a USD to EUR rate of `0.93` would be represented as:

```json JSON
{
  "base_currency": "USD",
  "base_amount": 100,
  "target_currency": "EUR",
  "target_amount": 93,
  "value": 93,
  "exponent": 2,
  "rate_string": "0.93"
}
```

When displaying the rate to users, or elsewhere in your system, consider using the provided `rate_string`.
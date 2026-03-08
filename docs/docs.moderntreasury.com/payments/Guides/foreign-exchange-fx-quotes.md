# Foreign Exchange Quotes

Learn about Foreign Exchange Quotes

<Callout icon="📘" theme="info">
  The Foreign Exchange Quotes functionality is in limited release with select partners. If you are interested in using this feature, please reach out to your Modern Treasury point of contact for more details.
</Callout>

The Foreign Exchange Quote (`foreign_exchange_quote`) object is the mechanism for generating an exchange rate between two currencies. A quote is an exchange rate that is valid until a certain date. A quote is not a guaranteed rate and is valid until it expires (`expires_at`). To receive the quoted rate for an FX Payment Order, we recommend originating the Payment Order before the quote expires.

Modern Treasury supports various types of exchange rates, depending on your configuration at each bank. The `effective_at` timestamp can be used to determine the type of rate, and may have a direct impact on the resulting exchange rate.

| Type of FX Rate  | `effective_at` | Description                                                                                                                                                               |
| :--------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Spot rate        | `null`         | When no `effective_at` is provided, the resulting Quote is for a “spot” rate.                                                                                             |
| Daily rate sheet | Today          | When the `effective_at` is set to today’s date, the resulting Quote is from your daily rate sheet. This rate sheet is typically pre-negotiated between you and your bank. |
| Forward rate     | > Today        | When the `effective_at` is set to a future date, the resulting Quote is a forward rate.                                                                                   |

See the [Foreign Exchange Quotes](https://docs.moderntreasury.com/platform/reference/foreign-exchange-quotes)  API reference for more details.
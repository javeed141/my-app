# Foreign Exchange Quotes

A `foreign_exchange_quote` is an exchange rate that is valid for a certain period of time for a requested currency pair.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attribute
      </th>

      <th style={{ textAlign: "left" }}>
        Type
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **id**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`\
        UUID
      </td>

      <td style={{ textAlign: "left" }}>
        The UUID of the Foreign Exchange Quote.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **object**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`
      </td>

      <td style={{ textAlign: "left" }}>
        `"foreign_exchange_quote"`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **effective\_at**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`\
        [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
      </td>

      <td style={{ textAlign: "left" }}>
        The timestamp until when the quoted rate is valid.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **expires\_at**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`\
        [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
      </td>

      <td style={{ textAlign: "left" }}>
        The timestamp until which the quote must be booked by.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **foreign\_exchange\_indicator**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`
      </td>

      <td style={{ textAlign: "left" }}>
        Either `fixed_to_variable` if the `base_amount` was specified, or `variable_to_fixed` if the `target_amount` was specified when requesting the quote.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **foreign\_exchange\_rate**
      </td>

      <td style={{ textAlign: "left" }}>
        `object`
      </td>

      <td style={{ textAlign: "left" }}>
        The serialized rate information represented by this quote. See [Foreign Exchange Rates](foreign-exchange-rates).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **internal\_account\_id**
      </td>

      <td style={{ textAlign: "left" }}>
        `uuid`
      </td>

      <td style={{ textAlign: "left" }}>
        The ID for the `InternalAccount` this quote is associated with. See [Internal Accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**
      </td>

      <td style={{ textAlign: "left" }}>
        `object`
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **vendor\_id**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`
      </td>

      <td style={{ textAlign: "left" }}>
        This vendor assigned ID for this quote.
      </td>
    </tr>
  </tbody>
</Table>

# Example Response

```json Foreign Exchange Quote example
{
  "id": "63d023ec-c8d5-47b2-8054-7c7db012aade",
  "object": "foreign_exchange_quote",
  "live_mode": true,
  "foreign_exchange_indicator": "variable_to_fixed",
  "internal_account_id": "9a471ebb-1097-4617-b6d2-5a5e2417fc81",
  "vendor_id": "acc3e05e-10eb-4376-bfcc-f4b03f5afc90",
  "effective_at": "2024-04-07T23:59:59Z",
  "expires_at": "2024-04-06T23:59:59Z",
  "foreign_exchange_rate": {
    "base_amount": 100,
    "base_currency": "USD",
    "target_amount": 91,
    "target_currency": "EUR",
    "value": 91,
    "exponent": 2,
    "rate_string": "0.91"
  },
  "metadata": {
    "custom": "metadata"
  },
  "created_at": "2024-04-05T19:28:44Z",
  "updated_at": "2024-04-05T19:28:44Z"
}
```
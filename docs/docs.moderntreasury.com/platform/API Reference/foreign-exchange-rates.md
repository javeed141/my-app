# Foreign Exchange Rates

The `foreign_exchange_rate` object is how Modern Treasury represents exchange rate information between two currencies with high precision. The rate itself is not a resource that can be queried for, but will serialized as part of the object it applies to.

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
        **base\_amount**
      </td>

      <td style={{ textAlign: "left" }}>
        `integer`
      </td>

      <td style={{ textAlign: "left" }}>
        Amount in the lowest denomination of the `base_currency` to convert, often called the "sell" amount.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **base\_currency**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`\
        [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)
      </td>

      <td style={{ textAlign: "left" }}>
        Currency to convert, often called the "sell" currency.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **exponent**
      </td>

      <td style={{ textAlign: "left" }}>
        `integer`
      </td>

      <td style={{ textAlign: "left" }}>
        The exponent component of the rate. The decimal is calculated as `value` / (10 ^ `exponent`)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **rate\_string**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`
      </td>

      <td style={{ textAlign: "left" }}>
        A string representation of the rate, e.g. `"1.234"`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **target\_amount**
      </td>

      <td style={{ textAlign: "left" }}>
        `integer`
      </td>

      <td style={{ textAlign: "left" }}>
        Amount in the lowest denomination of the `target_currency`, often called the "buy" amount.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **target\_currency**
      </td>

      <td style={{ textAlign: "left" }}>
        `string`\
        [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)
      </td>

      <td style={{ textAlign: "left" }}>
        Currency to convert the `base_currency` to, often called the "buy" currency.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **value**
      </td>

      <td style={{ textAlign: "left" }}>
        `integer`
      </td>

      <td style={{ textAlign: "left" }}>
        The whole number component of the rate. The decimal is calculated as `value` / (10 ^ `exponent`)
      </td>
    </tr>
  </tbody>
</Table>
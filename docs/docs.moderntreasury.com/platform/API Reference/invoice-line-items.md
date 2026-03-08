# Invoice Line Items

An invoice line item refers to any service or product added to an invoice, along with any quantities or unit amounts that pertain to them. An invoice can have many line items.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attribute
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
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the invoice line item.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Name of the line item, typically a product or SKU name.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **description**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An optional free-form description of the line item.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **direction**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Either `debit` or `credit`. `debit` indicates that a client owes the business money and increases the [invoice's](https://docs.moderntreasury.com/platform/reference/invoices) `total_amount` due. `credit` has the opposite intention and effect.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **amount**\
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        The total amount for this line item, specified in the [invoice](https://docs.moderntreasury.com/platform/reference/invoices) currency's smallest unit.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **quantity**\
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        The number of units of a product or service that this line item is for. Must be a whole number. Defaults to 1 if not provided.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **unit\_amount**\
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        The cost per unit of the product or service that this line item is for specified in the [invoice](https://docs.moderntreasury.com/platform/reference/invoices) currency's smallest unit.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **unit\_amount\_decimal**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The cost per unit of the product or service that this line item is for, specified in the invoice currency's smallest unit. Accepts decimal strings with up to 12 decimals.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata) .
      </td>
    </tr>
  </tbody>
</Table>

```json Invoice Line Item Example
{
  "id": "2d3ed5fb-8bca-4d12-bfb8-3d314cb9887d",
  "object": "invoice_line_item",
  "live_mode": true,
  "amount": 72000,
  "description": "1 year subscription to this service",
  "direction": "debit",
  "name": "Service Monthly Subscription",
  "quantity": 12,
  "unit_amount": 6000,
  "created_at": "2023-01-23T20:56:19Z",
  "updated_at": "2023-01-23T20:56:19Z"
}
```
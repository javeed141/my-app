# Line Items

A `line_item` is additional information that can be included on a [payment order](https://docs.moderntreasury.com/platform/reference/payment-order-object) or an [expected payment](https://docs.moderntreasury.com/platform/reference/expected-payment-object) that represents a specific sub-amount. Line items will always sum to the total of the parent payment order or expected payment. Metadata is internal to Modern Treasury and will never be sent to your bank or be seen by your counterparties.

As an example, Company A is sending $100 to Company B to pay an invoice for two $50 widgets. Company A wants to track this information and creates a $100 Payment Order with two line items for $50 each and a unique description for each.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        *string*
      </td>

      <td>
        Unique identifier for the line item.
      </td>
    </tr>

    <tr>
      <td>
        **amount**
        *int32*
      </td>

      <td>
        Value in specified currency's smallest unit. e.g. $10 would be represented as 1000.
      </td>
    </tr>

    <tr>
      <td>
        **description**
        *string*
      </td>

      <td>
        A free-form description of the line item.
      </td>
    </tr>

    <tr>
      <td>
        **itemizable\_id**
        *string*
      </td>

      <td>
        The ID of the payment order or expected payment.
      </td>
    </tr>

    <tr>
      <td>
        **itemizable\_type**
        *string*
      </td>

      <td>
        One of `payment_orders` or `expected_payments`.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See

        [Metadata](https://docs.moderntreasury.com/platform/reference/metadata)

        .
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**
        *boolean*
      </td>

      <td>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>
  </tbody>
</Table>

```json Line Item Example
{
  "id": "ca12b3ec-884f-41f7-bde8-43e813dab5fa",
  "amount": 20000,
  "description": "Principal For Loan #123",
  "itemizable_id": "ba450474-daa0-11ec-9d64-0242ac120002",
  "itemizable_type": "payment_orders",
  "metadata": {
    "Type": "Principal"
  },
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
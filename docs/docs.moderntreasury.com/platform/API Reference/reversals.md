# Reversals

A `reversal` represents a reversal of a single payment order. In order to reverse an ACH payment, your internal account must support ACH payment origination in the opposite direction. For example, to reverse a credit payment order, your internal account must have debit capabilities.

Related Guides: [Reversing an ACH payment](/payments/docs/reverse-an-ach-payment)

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
        Unique identifier for the return.
      </td>
    </tr>

    <tr>
      <td>
        **reason**
        *string*
      </td>

      <td>
        The reason for the reversal.
      </td>
    </tr>

    <tr>
      <td>
        **payment\_order\_id**
        *string*
      </td>

      <td>
        The ID of the relevant [Payment Orders](https://docs.moderntreasury.com/platform/docs/payment-order-object)
      </td>
    </tr>

    <tr>
      <td>
        **status**
        *string*
      </td>

      <td>
        The current status of the reversal.
      </td>
    </tr>

    <tr>
      <td>
        **reconciliation\_status**
        *string*
      </td>

      <td>
        The current reconciliation status. One of `unreconciled`, `tentatively_reconciled`, `reconciled`
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_transaction\_id**
        *string*
      </td>

      <td>
        The ID of the ledger transaction linked to the payment order. See [Linking to other Modern Treasury objects](/ledgers/docs/link-ledger-accounts-to-payment-objects) .
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata) .
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

```json Return Example
{
  "id": "08c251e1-4cba-4706-8faa-9c2df2682aa3",
  "object": "reversal",
  "reason": "duplicate",
  "payment_order_id": "4f898a70-6aeb-41f8-9b98-82e42f54cad8",
  "ledger_transaction_id": nil,
  "metadata": {},
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
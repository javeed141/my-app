# Transaction Line Items

A `transaction_line_item` represents a subset of a [transaction](https://docs.moderntreasury.com/platform/reference/transaction-object). This often occurs for ACH transactions where a single bulk transaction is comprised of multiple individual line items. For example, if 100 Payment Orders are sent to the bank on a single day and each payment order is a $5 credit, the next day you will receive only a single transaction for the activity. While this could be the full $500 debit, oftentimes banks will hold individual payment orders for longer processing and some items might have been returned. This leads to cases where the full breakdown of a transaction is unclear or requires manual work to reconcile.

Modern Treasury removes the guesswork of figuring out these cases by automatically creating line items for these transactions using information from the bank. We automatically reconcile all activity for Payment Orders created through the system, allowing you full visibility into your bank statements. Modern Treasury will only link the payment orders to transaction line items when we are 100% sure of the match. If we are not, the `transactable` association will remain null.

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
        **type**
        *string*
      </td>

      <td>
        Indicates whether the line item is `originating` or `receiving` (see [ODFI vs. RDFI](https://www.moderntreasury.com/journal/beginners-guide-to-ach) for more)
      </td>
    </tr>

    <tr>
      <td>
        **transactable\_type**
        *string*
      </td>

      <td>
        If a matching object exists in Modern Treasury, the type will be populated here, otherwise `null`.
        This can be one of `payment_order`, `incoming_payment_detail`,  `reversal`, or `return`.
      </td>
    </tr>

    <tr>
      <td>
        **transactable\_id**
        *string*
      </td>

      <td>
        If a matching object exists in Modern Treasury, the id will be populated here, otherwise `null`.
      </td>
    </tr>

    <tr>
      <td>
        **amount**
        *bigint*
      </td>

      <td>
        If a matching object exists in Modern Treasury, `amount` will be populated. Value in specified currency's (taken from parent Transaction) smallest unit.
      </td>
    </tr>

    <tr>
      <td>
        **description**
        *string*
      </td>

      <td>
        If no matching object is found, `description` will be a free-form text field describing the line item.

        This field may contain sensitive information and is not included in API responses by default. Learn more about changing your settings [here](https://docs.moderntreasury.com/reference/data-privacy-controls).
      </td>
    </tr>

    <tr>
      <td>
        **counterparty\_id**\
        *string*
      </td>

      <td>
        The ID for the counterparty for this transaction line item.
      </td>
    </tr>

    <tr>
      <td>
        **expected\_payment\_id**\
        *string*
      </td>

      <td>
        The ID of the reconciled [Expected Payment](https://docs.moderntreasury.com/platform/reference/expected-payment-object) otherwise `null`.
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**\
        *boolean*
      </td>

      <td>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>

    <tr>
      <td>
        **transaction\_id**\
        *string*
      </td>

      <td>
        The ID of the parent transaction.
      </td>
    </tr>

    <tr>
      <td>
        **reconciliation\_group\_id**\
        *string*
      </td>

      <td>
        The ID of the reconciliation group this line item belongs to, otherwise `null`.
      </td>
    </tr>
  </tbody>
</Table>

```json Transaction Line Item Example
{
  "id": "21bfd337-5d13-4c9a-8f9e-2409023d9627",
  "transactable_type": null,
  "transactable_id": null,
  "transaction_id": "1bbc5b0e-fdee-4a4b-b16f-d8164444861f",
  "expected_payment_id": null,
  "reconciliation_group_id": null,
  "amount": 1000,
  "description": "Generic Line Item",
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
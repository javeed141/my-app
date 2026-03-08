# Expected Payments

An Expected Payments is a reconcilable item that represents a payment you expect to occur at your vendor such as a bank or payment processor. They are often mirror data from your internal systems, and represent invoices, bills, payment instructions, or other receivables. Expected Payments can be automatically reconciled to Transactions, this requires using [reconciliation rules](https://docs.moderntreasury.com/payments/docs/defining-reconciliation-rules).

> ⚠️ Expected Payments API has been updated to use reconciliation rules
>
> The legacy API for Expected Payments is being deprecated. This is the updated API – it requires the reconciliation\_rule\_variables parameter, and requires your organization to have created at least 1 [reconciliation rule](https://docs.moderntreasury.com/payments/docs/defining-reconciliation-rules)  to automate reconciliation.

Modern Treasury automatically analyzes all Expected Payment(s) to Transaction(s) routinely, and will reconcile ones that satisfy all of the conditions of a reconciliation rule. Common reconciliation parameters include the `amount`, `date`, `direction`, and `custom_identifiers` fields.

You will notice the use of ranges for both the amount and date on the expected payment. This is because sometimes you aren't quite sure about these values. For example, you may expect a $10 to $15 charge between Monday and Wednesday. You would specify this using the lower and upper bound fields for each. If you know the values precisely, you can simply make the bounds equal.

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
        Unique identifier for the expected payment.
      </td>
    </tr>

    <tr>
      <td>
        **description**\
        *string*
      </td>

      <td>
        An optional description for internal use.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**\
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td>
        **transaction\_id**\
        *string*
      </td>

      <td>
        The ID of the [Transaction](https://docs.moderntreasury.com/platform/reference/transaction-object) this expected payment object has been matched to.
      </td>
    </tr>

    <tr>
      <td>
        **transaction\_line\_item\_id**\
        *string*
      </td>

      <td>
        The ID of the [Transaction Line Item](https://docs.moderntreasury.com/platform/reference/transaction-line-item-object) this expected payment has been matched to.
      </td>
    </tr>

    <tr>
      <td>
        **status**\
        *string*
      </td>

      <td>
        One of `unreconciled`, `reconciled`, `partially_reconciled`, or `archived`.
      </td>
    </tr>

    <tr>
      <td>
        **reconciliation\_method**\
        *string*
      </td>

      <td>
        One of `manual` if this expected payment was manually reconciled in the dashboard, `automatic` if it was automatically reconciled by Modern Treasury, or `null` if it is unreconciled.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_transaction\_id**\
        *string*
      </td>

      <td>
        The ID of the ledger transaction linked to the expected payment. See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/docs/linking-to-other-modern-treasury-objects).
      </td>
    </tr>

    <tr>
      <td>
        **external\_id**\
        *string*
      </td>

      <td>
        An optional user-defined unique identifier. Max 180 characters.
      </td>
    </tr>

    <tr>
      <td>
        **amount\_reconciled**\
        *int32*
      </td>

      <td>
        The amount reconciled to this expected payment.
      </td>
    </tr>

    <tr>
      <td>
        **amount\_reconciled\_direction**\
        *string*
      </td>

      <td>
        One of `credit` or `debit`. Indicates whether `amount_reconciled` is a credit or debit amount.
      </td>
    </tr>

    <tr>
      <td>
        **amount\_unreconciled**\
        *int32*
      </td>

      <td>
        The amount that remains unreconciled to this expected payment.
      </td>
    </tr>

    <tr>
      <td>
        **amount\_unreconciled\_direction**\
        *string*
      </td>

      <td>
        One of `credit` or `debit`. Indicates whether `amount_unreconciled` is a credit or debit amount.
      </td>
    </tr>

    <tr>
      <td>
        **reconciliation\_rule\_variables**\
        *array*
      </td>

      <td>
        Fields used for matching reconciliation rule conditions: `internal_account_id`, `direction`, `amount_lower_bound`, `amount_upper_bound`, `currency`, `type`, `date_lower_bound`, `date_upper_bound`, `counterparty_id`, `custom_identifiers`
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**\
        *boolean*
      </td>

      <td>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>
  </tbody>
</Table>

```json Expected Payment Example
{
  "id": "afc256b0-dab8-4b9a-98c1-735fc23204ce",
  "object": "expected_payment",
  "metadata": {},
  "transaction_id": null,
  "transaction_line_item_id": null,
  "ledger_transaction_id": null,
  "status": "unreconciled",
  "reconciliation_method": null,
  "external_id": "237aebcb2bad",
  "amount_reconciled": 0,
  "amount_reconciled_direction": "credit",
  "amount_unreconciled": 20000,
  "amount_unreconciled_direction": "credit",
  "reconciliation_rule_variables":[
    {
      "type": "wire",
      "amount_upper_bound": 20000,
      "amount_lower_bound": 20000,
      "direction": "credit",
      "internal_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
      "currency": "USD",
      "date_upper_bound": "2024-05-15",
      "date_lower_bound": "2024-05-15",
      "counterparty_id": "37ba4454-dd33-4aa0-8906-0e2e4103e45c",
    } ],
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
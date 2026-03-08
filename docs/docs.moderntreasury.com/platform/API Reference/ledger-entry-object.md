# Ledger Entries

A `ledger_entry` represents an accounting entry within a parent [ledger transaction](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object).

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
        Unique identifier for the ledger entry.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        ID of the ledger account.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_currency**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The currency of the ledger account
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_currency\_exponent**\
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        The currency exponent of the ledger account
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **direction**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Either `credit` or `debit`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **amount**\
        *int*
      </td>

      <td style={{ textAlign: "left" }}>
        Value in specified currency's smallest unit. e.g. $10 would be represented as `1000`. Can be any integer up to 10³⁶.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **resulting\_ledger\_account\_balances**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The resulting pending, posted, and available balances for this ledger account. The posted balance is the sum of all `posted` entries on the account. The pending balance is the sum of all `pending` and `posted` entries on the account.  The available balance is the `posted` incoming entries minus the sum of the `pending` and `posted` outgoing amounts.  See the\
        [Transaction Status and Balances](https://docs.moderntreasury.com/platform/docs/transaction-status-and-balances) guide for more information.\
        This is present **only** when the Ledger Entry is first created or updated with `show_resulting_ledger_account_balances` set as true for the Ledger Entry, otherwise the field will be `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **status**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Equal to the state of the ledger transaction when the ledger entry was created. One of `pending`, `posted`, or `archived`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **created\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime that the ledger entry was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime of the last update to the ledger entry.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>
  </tbody>
</Table>

```json Ledger Entry Example
{
  "id": "2a9b522e-5be3-49bc-b607-a09f9786dc3c",
  "object": "ledger_entry",
  "live_mode": true,
  "amount": 1500000000,
  "direction": "debit",
  "status": "pending",
  "ledger_account_id": "063da2e3-4a37-4abf-8626-57d25bd6d441",
  "ledger_account_currency": "USD",
  "ledger_account_currency_exponent": 2,
  "ledger_account_lock_version": 57001,
  "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
  "resulting_ledger_account_balances": {
    "pending_balance": {
      "credits": 0,
      "debits": 0,
      "amount": 0,
      "currency": "USD",
      "currency_exponent": 2
    },
    "posted_balance": {
      "credits": 0,
      "debits": 0,
      "amount": 0,
      "currency": "USD",
      "currency_exponent": 2
    },
    "available_balance": {
      "credits": 0,
      "debits": 0,
      "amount": 0,
      "currency": "USD",
      "currency_exponent": 2
    }
  },
  "discarded_at": null,
  "created_at": "2020-08-04T16:58:51Z",
  "updated_at": "2020-08-04T16:58:51Z",
  "metadata": {}
}
```
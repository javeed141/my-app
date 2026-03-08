# Ledger Transactions

A `ledger_transaction` is a transaction between two or more ledger accounts. To create a ledger transaction, there must be at least one credit [ledger entry](https://docs.moderntreasury.com/platform/reference/ledger-entry-object) and one debit ledger entry. Additionally, the sum of all credit entry amounts must equal the sum of all debit entry amounts. The ledger transaction is immutable once it has posted.

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
        Unique identifier for the ledger transaction.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **external\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An optional user-defined unique identifier.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **description**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An optional free-form description for internal use.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **status**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        One of `pending`, `posted`, or `archived`.
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

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_entries**\
        *array object*
      </td>

      <td style={{ textAlign: "left" }}>
        An array of [ledger entry](https://docs.moderntreasury.com/platform/reference/ledger-entry-object) objects.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **posted\_at**\
        *time*
      </td>

      <td style={{ textAlign: "left" }}>
        The time on which the ledger transaction posted. This is `null` if the ledger transaction is pending.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **effective\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The time at which the ledger transaction happened for reporting purposes.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the ledger this ledger transaction belongs to.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledgerable\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        If the ledger transaction can be reconciled to another object in Modern Treasury, the type will be populated here, otherwise `null`.\
        This can be one of `payment_order`, `incoming_payment_detail`, `expected_payment`, `return`, or `reversal`.\
        See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/ledgers/docs/linking-ledger-transaction-to-payment-objects)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledgerable\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        If the ledger transaction can be reconciled to another object in Modern Treasury, the id will be populated here, otherwise `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **reversed\_by\_ledger\_transaction\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        If the ledger transaction is reversed by another ledger transaction, the `reversed_by_ledger_transaction_id` will be populated here, and it is the ID of the reversal ledger transactions.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **reverses\_ledger\_transaction\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        If the ledger transaction reverses another ledger transaction, the `reverses_ledger_transaction_id` will be populated here, and it is the ID of the original ledger transaction.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **archived\_reason**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        System-set reason why the ledger transaction was archived; currently only 'balance\_lock\_failure' for transactions that violated balance constraints.\
        Only populated when archive\_on\_balance\_lock\_failure is true and a balance lock violation occurs, otherwise null.
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
        **created\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime that the ledger transaction was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime of the last update to the ledger transaction.
      </td>
    </tr>
  </tbody>
</Table>

```json Ledger Transaction Example
{
    "id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
    "object": "ledger_transaction",
    "ledgerable_type": null,
    "ledgerable_id": null,
    "ledger_id": "a9d970da-207e-43da-b4d6-6e9ae01ba2cc",
    "description": "Louisiana Purchase",
    "status": "pending",
    "archived_reason": null,
    "ledger_entries": [
        {
            "id": "45067a63-6e4d-48f6-8aed-872cb3ee9c72",
            "object": "ledger_entry",
            "amount": 1500000000,
            "direction": "credit",
            "ledger_account_id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "resulting_ledger_account_balances": null,
            "live_mode": true,
            "metadata": {},
            "created_at": "2020-08-04T16:58:51Z",
            "updated_at": "2020-08-04T16:58:51Z"
        },
        {
            "id": "2a9b522e-5be3-49bc-b607-a09f9786dc3c",
            "object": "ledger_entry",
            "amount": 1500000000,
            "direction": "debit",
            "ledger_account_id": "063da2e3-4a37-4abf-8626-57d25bd6d441",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "resulting_ledger_account_balances": null,
            "live_mode": true,
            "metadata": {},
            "created_at": "2020-08-04T16:58:51Z",
            "updated_at": "2020-08-04T16:58:51Z"
        }
    ],
    "posted_at": null,
    "effective_at": "2021-01-01T00:00:00.000000Z",
    "effective_date": "2021-01-01",
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:58:51Z",
    "updated_at": "2020-08-04T16:58:51Z"
}
```

## Ledger Transaction Versions

A `ledger_transaction_version` is a historical record of a `ledger_transaction`. A new `ledger_transaction_version` is created when a `ledger_transaction` is created or updated.

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
        Unique identifier for the ledger transaction\_version.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_transaction\_id**\
        *string*
      </td>

      <td>
        The ID of the ledger transaction
      </td>
    </tr>

    <tr>
      <td>
        **version**\
        *integer*
      </td>

      <td>
        The version number of the ledger transaction
      </td>
    </tr>

    <tr>
      <td>
        **description**\
        *string*
      </td>

      <td>
        An optional free-form description for internal use.
      </td>
    </tr>

    <tr>
      <td>
        **status**\
        *string*
      </td>

      <td>
        One of `pending`, `posted`, or `archived`.
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
        **ledger\_entries**\
        *array object*
      </td>

      <td>
        An array of [ledger entry](https://docs.moderntreasury.com/platform/reference/ledger-entry-object) objects.
      </td>
    </tr>

    <tr>
      <td>
        **posted\_at**\
        *time*
      </td>

      <td>
        The time on which the ledger transaction posted. This is `null` if the ledger transaction is pending.
      </td>
    </tr>

    <tr>
      <td>
        **effective\_at**\
        *datetime*
      </td>

      <td>
        The time at which the ledger transaction happened for reporting purposes.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_id**\
        *string*
      </td>

      <td>
        The ID of the ledger this ledger transaction belongs to.
      </td>
    </tr>

    <tr>
      <td>
        **ledgerable\_type**\
        *string*
      </td>

      <td>
        If the ledger transaction can be reconciled to another object in Modern Treasury, the type will be populated here, otherwise `null`.\
        This can be one of `payment_order`, `incoming_payment_detail`, `expected_payment`, `return`, or `reversal`.\
        See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects).
      </td>
    </tr>

    <tr>
      <td>
        **ledgerable\_id**\
        *string*
      </td>

      <td>
        If the ledger transaction can be reconciled to another object in Modern Treasury, the id will be populated here, otherwise `null`.
      </td>
    </tr>

    <tr>
      <td>
        **archived\_reason**\
        *string*
      </td>

      <td>
        System-set reason why the ledger transaction was archived; currently only 'balance\_lock\_failure' for transactions that violated balance constraints.
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

```json Ledger Transaction Versions Example
[{
    "id": "b3ea66d8-ffa9-44e6-96d2-591cdb998a5e",
    "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
    "object": "ledger_transaction_version",
    "ledgerable_type": null,
    "ledgerable_id": null,
    "ledger_id": "a9d970da-207e-43da-b4d6-6e9ae01ba2cc",
    "description": "Louisiana Purchase",
    "status": "posted",
    "archived_reason": null,
    "ledger_entries": [
        {
            "id": "5f6a2fe9-502c-439a-a475-2af09b8836ef",
            "object": "ledger_entry",
            "amount": 1600000000,
            "direction": "credit",
            "ledger_account_id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "live_mode": true,
            "metadata": {},
            "created_at": "2020-08-05T16:58:51Z",
            "updated_at": "2020-08-05T16:58:51Z"
        },
        {
            "id": "0bbdf6db-2378-449f-b731-0409c14f270c",
            "object": "ledger_entry",
            "amount": 1600000000,
            "direction": "debit",
            "ledger_account_id": "063da2e3-4a37-4abf-8626-57d25bd6d441",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "live_mode": true,
            "metadata": true,
            "created_at": "2020-08-05T16:58:51Z",
            "updated_at": "2020-08-05T16:58:51Z"
        }
    ],
    "posted_at": "2020-08-05T16:58:51Z",
    "effective_at": "2021-01-01T00:00:00.000",
    "effective_date": "2021-01-01",
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-05T16:58:51Z",
    "version": 1
  },
  {
    "id": "3a3105c1-9a82-4134-8880-9ec68b5ccdfb",
    "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
    "object": "ledger_transaction_version",
    "ledgerable_type": null,
    "ledgerable_id": null,
    "ledger_id": "a9d970da-207e-43da-b4d6-6e9ae01ba2cc",
    "description": "Louisiana Purchase",
    "status": "pending",
    "ledger_entries": [
        {
            "id": "45067a63-6e4d-48f6-8aed-872cb3ee9c72",
            "object": "ledger_entry",
            "amount": 1500000000,
            "direction": "credit",
            "ledger_account_id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "live_mode": true,
            "metadata": {}.
            "created_at": "2020-08-04T16:58:51Z",
            "updated_at": "2020-08-04T16:58:51Z"
        },
        {
            "id": "2a9b522e-5be3-49bc-b607-a09f9786dc3c",
            "object": "ledger_entry",
            "amount": 1500000000,
            "direction": "debit",
            "ledger_account_id": "063da2e3-4a37-4abf-8626-57d25bd6d441",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "live_mode": true,
            "metadata": {},
            "created_at": "2020-08-04T16:58:51Z",
            "updated_at": "2020-08-04T16:58:51Z"
        }
    ],
    "posted_at": null,
    "effective_at": "2021-01-01T00:00:00.000",
    "effective_date": "2021-01-01",
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:58:51Z",
    "version": 0
}]
```
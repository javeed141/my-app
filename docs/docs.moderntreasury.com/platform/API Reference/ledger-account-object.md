# Ledger Accounts

A `ledger_account` is an account in a double-entry accounting system. Common examples include asset, liability, expense, and revenue accounts. Each ledger account belongs to a [ledger](https://docs.moderntreasury.com/platform/reference/ledger-object) and can only have entries with other accounts belonging to the same ledger.

<Callout icon="📘" theme="info">
  `currency` and `currency_exponent` for the account are visible in the `balances` object.
</Callout>

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
        Unique identifier for the ledger account.
      </td>
    </tr>

    <tr>
      <td>
        **name**
        *string*
      </td>

      <td>
        The name of the ledger account. e.g. Assets
      </td>
    </tr>

    <tr>
      <td>
        **description**
        *string*
      </td>

      <td>
        An optional free-form description for internal use.
      </td>
    </tr>

    <tr>
      <td>
        **normal\_balance**
        *string*
      </td>

      <td>
        One of `credit`, `debit`

        If an account is `credit` normal, then a "negative" balance would be one where the debit balance exceeds the credit balance. For example, liabilities accounts are `credit` normal whereas assets accounts are `debit` normal.
      </td>
    </tr>

    <tr>
      <td>
        **balances**
        *object*
      </td>

      <td>
        The pending, posted, and available balances for this ledger account. See [Ledger Balances](https://docs.moderntreasury.com/platform/reference/ledger-balances-object) for more details.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_id**
        *string*
      </td>

      <td>
        The ID of the ledger this account belongs to.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**
        *boolean*
      </td>

      <td>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td>
        **lock\_version**
        *int32*
      </td>

      <td>
        This field is incremented when the pending or posted balance of the ledger account changes. Can be referenced when creating a ledger transaction to prevent the transaction from being created if the lock version has changed.
      </td>
    </tr>

    <tr>
      <td>
        **ledgerable\_type**
        *string*
      </td>

      <td>
        If the ledger account is linked to a ledgerable account, the type will be populated here, otherwise `null`.
        This can be `external_account`, `internal_account` or `virtual_account`
        See [Link a ledger account to a virtual account](https://docs.moderntreasury.com/ledgers/docs/link-a-ledger-account-to-a-virtual-account) and [Link a ledger account to an internal or external account](https://docs.moderntreasury.com/ledgers/docs/link-a-ledger-account-to-an-internal-or-external-account)
      </td>
    </tr>

    <tr>
      <td>
        **ledgerable\_id**
        *string*
      </td>

      <td>
        If the ledger account is linked to a ledgerable account, the id will be populated here, otherwise `null`.
      </td>
    </tr>

    <tr>
      <td>
        **external\_id**
        *string*
      </td>

      <td>
        An optional user-defined 180 character unique identifier
      </td>
    </tr>

    <tr>
      <td>
        **created\_at**
        *datetime*
      </td>

      <td>
        The datetime that the ledger account was created.
      </td>
    </tr>

    <tr>
      <td>
        **updated\_at**
        *datetime*
      </td>

      <td>
        The datetime of the last update to the ledger account.
      </td>
    </tr>
  </tbody>
</Table>

```json Ledger Account Example
{
    "id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
    "object": "ledger_account",
    "name": "Liabilities",
    "ledger_id": "a9d970da-207e-43da-b4d6-6e9ae01ba2cc",
    "description": null,
    "lock_version": 6,
    "normal_balance": "credit",
    "balances": {
      "effective_at_lower_bound": "2020-08-04T16:54:32Z",
      "effective_at_upper_bound": "2021-08-04T16:54:32Z",
      "pending_balance": {
        "credits": 50000,
        "debits": 10000,
        "amount": 40000,
        "currency": "USD",
        "currency_exponent": 2
      },
      "posted_balance": {
        "credits": 20000,
        "debits": 1000,
        "amount": 19000,
        "currency": "USD",
        "currency_exponent": 2
      },
      "available_balance": {
        "credits": 20000,
        "debits": 10000,
        "amount": 10000,
        "currency": "USD",
        "currency_exponent": 2
      } 
    },
    "ledgerable_type": "external_account",
    "ledgerable_id": "22c19f2f-14cf-4a17-b5d0-c6838e3eaeb3",
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}
```
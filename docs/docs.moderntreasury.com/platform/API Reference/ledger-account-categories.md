# Ledger Account Categories

A `ledger_account_category` is a grouping of Ledger Accounts. Its balance is equal to the sum of the balances of all contained accounts. Ledger Account Categories can also contain other categories, which enables the creation of nested hierarchies.

<Callout icon="📘" theme="info">
  `currency` and `currency_exponent` for the category are visible in the `balances` object.
</Callout>

Related guide: [Nesting ledger accounts](/ledgers/docs/nest-ledger-categories)

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
        Unique identifier for the ledger account category.
      </td>
    </tr>

    <tr>
      <td>
        **name**
        *string*
      </td>

      <td>
        The name of the ledger account category.
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
        **ledger\_id**
        *string*
      </td>

      <td>
        The ID of the ledger this category belongs to.
      </td>
    </tr>

    <tr>
      <td>
        **normal\_balance**
        *string*
      </td>

      <td>
        One of `credit`, `debit`.

        This value is used to calculate the balance amount fields. If the value is `credit`, then the amount will be equal to `credits` - `debits`. If the value is `debit`, then the amount will be `debits` - `credits`.
      </td>
    </tr>

    <tr>
      <td>
        **balances**
        *object*
      </td>

      <td>
        The pending, posted, and available balances for the ledger account category. See [Ledger Balances](https://docs.moderntreasury.com/platform/reference/ledger-balances-object)  for more details.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs.
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
        The datetime that the ledger account category was created.
      </td>
    </tr>

    <tr>
      <td>
        **updated\_at**
        *datetime*
      </td>

      <td>
        The datetime of the last update to the ledger account category.
      </td>
    </tr>
  </tbody>
</Table>

```json
{
    "id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
    "object": "ledger_account_category",
    "name": "Combined View",
    "ledger_id": "a9d970da-207e-43da-b4d6-6e9ae01ba2cc",
    "description": null,
    "normal_balance": "credit",
    "balances": {
      "pending_balance": {
        "credits": 50000,
        "debits": 0,
        "amount": 50000,
        "currency": "USD",
        "currency_exponent": 2
      },
      "posted_balance": {
        "credits": 20000,
        "debits": 0,
        "amount": 20000,
        "currency": "USD",
        "currency_exponent": 2
      },
      "available_balance": {
        "credits": 20000,
        "debits": 0,
        "amount": 20000,
        "currency": "USD",
        "currency_exponent": 2
      }
    },
    "metadata": {},
    "external_id": null,
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}
```
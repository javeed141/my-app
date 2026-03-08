# Ledger Account Settlements

A `ledger_account_settlement` is an object that creates a ledger transaction to safely offset the posted balance of a ledger account.

Related Guides: [Ledger Account Settlements Overview](https://docs.moderntreasury.com/ledgers/docs/ledger-account-settlements-overview)

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
        Unique identifier for the ledger account settlement.
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
        One of `drafting`, `processing`, `pending`, `posted`, `archiving` or `archived`.
      </td>
    </tr>

    <tr>
      <td>
        **settlement\_entry\_direction**\
        *string*
      </td>

      <td>
        The direction of the ledger entry with the settled\_ledger\_account.
      </td>
    </tr>

    <tr>
      <td>
        **settled\_ledger\_account\_id**\
        *string*
      </td>

      <td>
        The Ledger Account that we will query the Entries against, and its balance is reduced as a result. The settled ledger account and the contra ledger account must belong to the same ledger.

        For example, let’s say we’re a ride-sharing app. To pay out a specific driver, the `settled_ledger_account_id` would reference a payable account belonging to a driver, and the `contra_ledger_accout_id` would be your corporate cash account.
      </td>
    </tr>

    <tr>
      <td>
        **contra\_ledger\_account\_id**\
        *string*
      </td>

      <td>
        The Ledger Account that sends to or receives funds from the settled ledger account. The settled ledger account and the contra ledger account must belong to the same ledger.

        For example, let’s say we’re a ride-sharing app. To pay out a specific driver, the `settled_ledger_account_id` would reference a payable account belonging to a driver, and the `contra_ledger_accout_id` would be your corporate cash account.
      </td>
    </tr>

    <tr>
      <td>
        **effective\_at\_upper\_bound**\
        *datetime*
      </td>

      <td>
        The exclusive upper bound of the effective time of entries included in the ledger account settlement.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_transaction\_id**\
        *string*
      </td>

      <td>
        The ID of the Settlement Ledger Transaction.
      </td>
    </tr>

    <tr>
      <td>
        **amount**\
        *int*
      </td>

      <td>
        Value in specified currency’s smallest unit. Can be any integer up to 10³⁶. The amount is null when the Settlement is in `processing` status.
      </td>
    </tr>

    <tr>
      <td>
        **currency**\
        *string*
      </td>

      <td>
        The currency of the ledger account settlement.
      </td>
    </tr>

    <tr>
      <td>
        **currency\_exponent**\
        *int32*
      </td>

      <td>
        The currency exponent of the ledger account settlement.
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
        **live\_mode**\
        *boolean*
      </td>

      <td>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td>
        **created\_at**\
        *datetime*
      </td>

      <td>
        The datetime that the ledger account settlement was created.
      </td>
    </tr>

    <tr>
      <td>
        **updated\_at**\
        *datetime*
      </td>

      <td>
        The datetime of the last update to the ledger account settlement.
      </td>
    </tr>
  </tbody>
</Table>

```json Ledger Account Settlement Example
{
    "id": "dbdbbfe5-da56-4aaf-be36-3fbc415622dd",
    "object": "ledger_account_settlement",
    "live_mode": true,
    "description": "Alice's January settlement",
    "settled_ledger_account_id": "d44ad0d0-b3ea-4698-867d-09fe961e52a6",
    "contra_ledger_account_id": "3824af4d-4151-48f6-8e8b-bf859cbddbcd",
    "effective_at_upper_bound": "2023-01-01T00:00:00.000Z",
    "status": "pending",
    "amount": 1000,
    "currency": "USD",
    "ledger_transaction_id": "b47ce462-806b-4d5d-9476-9add11a42529",
    "metadata": {
        "foo": "bar"
    },
    "created_at": "2023-01-11T20:35:36Z",
    "updated_at": "2023-01-11T20:36:02Z"
}
```
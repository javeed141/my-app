# Ledgers

A `ledger` represents a standard chart of ledger accounts.  A ledger contains a discrete set of accounts and transactions and is guaranteed to include equal debit and credit entries at all times.

Related Guides: [Ledgers Overview](/ledgers/docs/overview)

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
        Unique identifier for the ledger.
      </td>
    </tr>

    <tr>
      <td>
        **name**\
        *string*
      </td>

      <td>
        The name of the ledger.
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
        The datetime that the ledger was created.
      </td>
    </tr>

    <tr>
      <td>
        **updated\_at**\
        *datetime*
      </td>

      <td>
        The datetime of the last update to the ledger.
      </td>
    </tr>
  </tbody>
</Table>

```json Ledger Example
{
    "id": "89c8bd30-e06a-4a79-b396-e6c7e13e7a12",
    "object": "ledger",
    "name": "General Ledger",
    "description": "Tracks all money movements",
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:48:05Z",
    "updated_at": "2020-08-04T16:48:05Z"
}
```
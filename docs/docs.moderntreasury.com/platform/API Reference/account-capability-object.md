# Account Capabilities

An `account_capability` object holds information necessary for originating payments of specific types and directions out of a given bank account. An example of this includes holding ACH Company ID identifiers, which are unique references assigned by banks to an entity for tracking and verification of payment purposes. Account Capabilities are directly tied to the capabilities enabled by the bank for the user, and Modern Treasury does not allow users to create or set an `account_capability` that does not exist at the bank.

<br />

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
        Unique identifier for the capability.
      </td>
    </tr>

    <tr>
      <td>
        **direction**\
        *string*
      </td>

      <td>
        One of `credit` or `debit`. The direction of money  movement this capability is responsible for.
      </td>
    </tr>

    <tr>
      <td>
        **identifier**\
        *string*
      </td>

      <td>
        A unique reference assigned by your bank for tracking and recognizing payment files. It is important this is formatted exactly how the bank assigned it.
      </td>
    </tr>

    <tr>
      <td>
        **payment\_type**\
        *string*
      </td>

      <td>
        The type of payment this capability is responsible for originating. The full list of possible types is at [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object).
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

<br />

```json Account Capability Example
{
  "id": "2e90da60-405c-44bc-8b33-2bdb9419afe3",
  "object": "account_capability",
  "payment_type": "wire",
  "live_mode": true,		
  "identifier": "9140032",
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z",
  "discard_at": null
}
```
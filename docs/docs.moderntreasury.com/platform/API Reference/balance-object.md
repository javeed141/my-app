# Balances

A `balance` object is a specific number reported by your bank regarding your bank account balance. Often this is split up into many different categories depending on on how the bank handles its reporting.

Also see: [Balance Reports](https://docs.moderntreasury.com/platform/reference/balance-report-object)

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
        The unique identifier for the balance.
      </td>
    </tr>

    <tr>
      <td>
        **amount**\
        *int*
      </td>

      <td>
        The balance amount.
      </td>
    </tr>

    <tr>
      <td>
        **as\_of\_date**\
        *date*
      </td>

      <td>
        The date on which the balance became true for the account.
      </td>
    </tr>

    <tr>
      <td>
        **as\_of\_time**\
        *time*
      </td>

      <td>
        The time (24-hour clock) on which the balance became true for the account in local time.
      </td>
    </tr>

    <tr>
      <td>
        **currency**\
        *string*
      </td>

      <td>
        The currency of the balance.
      </td>
    </tr>

    <tr>
      <td>
        **balance\_type**\
        *string*
      </td>

      <td>
        The specific type of balance reported. One of `opening_ledger`, `closing_ledger`, `current_ledger`, `opening_available`, `opening_available_next_business_day`, `closing_available`, `current_available`, `previously_closed_book`, or `other`.
      </td>
    </tr>

    <tr>
      <td>
        **value\_date**\
        *int*
      </td>

      <td>
        The date on which the money of the balance becomes available to use or accrue interest.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_code**\
        *string*
      </td>

      <td>
        The code used by the bank when reporting this specific balance.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_code\_type**\
        *string*
      </td>

      <td>
        The type of `vendor_code` being reported. See possible Vendor Code Types at [Transactions](https://docs.moderntreasury.com/platform/reference/transaction-object)
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
  </tbody>
</Table>

```json Balance Object Example
{
  "id": "1f4b0995-338e-41ed-93c4-a41ed8312312",
  "object": "balance",
  "amount": 1033236,
  "as_of_date" "2019-11-08",
  "as_of_time": "21:06",
  "currency": "USD",
  "balance_type": "opening_ledger",
  "value_date": "2019-11-11",
  "vendor_code": "010",
  "vendor_code_type": "bai2",
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
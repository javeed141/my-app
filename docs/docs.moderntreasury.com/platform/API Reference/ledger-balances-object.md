# Ledger Balances

Objects such as [Ledger Accounts](https://docs.moderntreasury.com/platform/reference/ledger-account-object) and [Ledger Account Categories](ledger-account-categories) have Ledger Balances objects. Balances are returned in the `balances` hash object, where the keys denote the balance type. See the sample Balance Object JSON below.

# Types of Balances

| Balance Type | Key                 | Description                                                                                                                                                               |
| :----------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pending      | `pending_balance`   | The sum of all pending AND posted entry amounts.                                                                                                                          |
| Posted       | `posted_balance`    | The sum of all posted entry amounts.                                                                                                                                      |
| Available    | `available_balance` | The sum of all posted entries and pending outbound entries, where direction is determined by the normality of the object holding the balance. See below for more details. |

# Pending Balance

> 👍 Pending balances include both posted and pending amounts.
>
> Note that pending balances include both pending and posted amounts. To calculate the total of only pending transactions, you subtract the posted balance from the pending balance.

| Balance Key | `pending_balance` |
| :---------- | :---------------- |

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
        **credits**
        *int*
      </td>

      <td>
        Summed amounts of all posted and pending ledger entries with `credit` direction.
      </td>
    </tr>

    <tr>
      <td>
        **debits**\
        *int*
      </td>

      <td>
        Summed amounts of all posted and pending ledger entries with `debit` direction.
      </td>
    </tr>

    <tr>
      <td>
        **amount**\
        *int*
      </td>

      <td>
        * *Credit Normal:*\* `pending_balance["credits"] - pending_balance["debits"]`
        * *Debit Normal:*\* `pending_balance["debits"] - pending_balance["credits"]`
      </td>
    </tr>

    <tr>
      <td>
        **currency**\
        *string*
      </td>

      <td>
        The currency of this ledger object.
      </td>
    </tr>

    <tr>
      <td>
        **currency\_exponent**\
        *int*
      </td>

      <td>
        The currency exponent of this ledger object.
      </td>
    </tr>
  </tbody>
</Table>

# Posted Balance

| Balance Key | `posted_balance` |
| :---------- | :--------------- |

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
        **credits**
        *int*
      </td>

      <td>
        Sum amounts of all posted ledger entries with `credit` direction.
      </td>
    </tr>

    <tr>
      <td>
        **debits**\
        *int*
      </td>

      <td>
        Sum amounts of all posted ledger entries with `debit` direction.
      </td>
    </tr>

    <tr>
      <td>
        **amount**\
        *int*
      </td>

      <td>
        * *Credit Normal:*\* `posted_balance["credits"] - posted_balance["debits"]`
        * *Debit Normal:*\* `posted_balance["debits"] - posted_balance["credits"]`
      </td>
    </tr>

    <tr>
      <td>
        **currency**\
        *string*
      </td>

      <td>
        The currency of this ledger object.
      </td>
    </tr>

    <tr>
      <td>
        **currency\_exponent**\
        *int*
      </td>

      <td>
        The currency exponent of this ledger object.
      </td>
    </tr>
  </tbody>
</Table>

# Available Balance

| Balance Key | `available_balance` |
| :---------- | :------------------ |

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
        **credits**
        *int*
      </td>

      <td>
        `posted_balance["credits"]`
      </td>
    </tr>

    <tr>
      <td>
        **debits**\
        *int*
      </td>

      <td>
        `pending_balance["debits"]`
      </td>
    </tr>

    <tr>
      <td>
        **amount**\
        *int*
      </td>

      <td>
        * *Credit Normal:*\* `posted_balance["credits"] - pending_balance["debits"]`
        * *Debit Normal:*\* `posted_balance["debits"] - pending_balance["credits"]`
      </td>
    </tr>

    <tr>
      <td>
        **currency**\
        *string*
      </td>

      <td>
        The currency of this ledger object.
      </td>
    </tr>

    <tr>
      <td>
        **currency\_exponent**\
        *int*
      </td>

      <td>
        The currency exponent of this ledger object.
      </td>
    </tr>
  </tbody>
</Table>

# Sample Balance Object

```json Balance Object Example
{
  "balances": {
    "pending_balance": {
      "credits": 25000,
      "debits": 10000,
      "amount": 15000,
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
      "debits": 10000,
      "amount": 10000,
      "currency": "USD",
      "currency_exponent": 2
    }
  }
}
```
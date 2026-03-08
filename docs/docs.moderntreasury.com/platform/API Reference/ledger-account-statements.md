# Ledger Account Statements

A `ledger_account_statement` is an object that provides the starting and ending balances for a specific time period. Once created, it can be used to retrieve the ledger entries and ledger transaction versions that correspond to that time period and lock version of the ledger account.

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
        Unique identifier for the ledger account statement.
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
        **ledger\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The id of the ledger that this ledger account statement belongs to.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The id of the ledger account whose ledger entries are queried against, and its balances are computed as a result.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **effective\_at\_lower\_bound**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The inclusive lower bound of the effective\_at timestamp of the ledger entries to be included in the ledger account statement.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **effective\_at\_upper\_bound**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The exclusive upper bound of the effective\_at timestamp of the ledger entries to be included in the ledger account statement.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_lock\_version**\
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        Lock version of the ledger account at the time of statement generation.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_normal\_balance**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The normal balance of the ledger account.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **currency\_exponent**\
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        The currency exponent of the ledger account payout.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **starting\_balances**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The pending, posted, and available balances for this ledger account at the `effective_at_lower_bound`. The posted balance is the sum of all posted entries on the account. The pending balance is the sum of all pending and posted entries on the account. The available balance is the posted incoming entries minus the sum of the pending and posted outgoing amounts.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ending\_balances**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The pending, posted, and available balances for this ledger account at the `effective_at_upper_bound`. The posted balance is the sum of all posted entries on the account. The pending balance is the sum of all pending and posted entries on the account. The available balance is the posted incoming entries minus the sum of the pending and posted outgoing amounts.
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
        The datetime that the ledger account statement was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime of the last update to the ledger account statement.
      </td>
    </tr>
  </tbody>
</Table>
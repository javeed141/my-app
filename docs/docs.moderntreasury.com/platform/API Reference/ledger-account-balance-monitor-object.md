# Ledger Account Balance Monitors

A `ledger_account_balance_monitor` is an object that stores an `alert_condition` for which, when the account's values cross the alert\_condition, [a webhook is sent](https://docs.moderntreasury.com/platform/reference/ledger-account-balance-monitors). Each ledger account balance monitor belongs to a [ledger\_account](https://docs.moderntreasury.com/platform/reference/ledger-account-object).

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
        Unique identifier for the ledger account balance monitor.
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
        **alert\_condition**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Describes the condition that must be satisfied for the monitor to be triggered.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **current\_ledger\_account\_balance\_state**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The ledger account's balances and the monitor state as of the current ledger account lock version.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ledger account associated with this balance monitor.
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
        **metadata**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **created\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime the ledger account balance monitor was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime of the last update to the ledger account balance monitor.
      </td>
    </tr>
  </tbody>
</Table>

```json Ledger Account Balance Monitor Sample
{
  "id": "36f99587-e551-4836-bab5-62250338ef70",
  "object": "ledger_account_balance_monitor",
  "live_mode": true,
  "ledger_account_id": "895cf384-3d37-48bf-b04d-ea34bf358079",
  "description": "Alert when balance changes",
  "alert_condition": {
    "field": "available_amount",
    "operator": "greater_than",
    "value": 0
  },
  "current_ledger_account_balance_state": {
    "balances": {
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
    "ledger_account_lock_version": 0,
    "triggered": false
  },
  "metadata": {},
  "discarded_at": null,
  "created_at": "2023-08-14T17:22:37Z",
  "updated_at": "2023-08-14T17:22:37Z"
}
```
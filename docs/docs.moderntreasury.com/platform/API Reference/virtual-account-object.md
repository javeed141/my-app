# Virtual Accounts

A `virtual_account` represents a subset of the transactions in an [Internal Account](https://docs.moderntreasury.com/platform/reference/internal-account-object). Virtual Accounts allow you to attribute transactions to particular users. For example, you might have a single Internal Account that holds all customer funds and a Virtual Account for every customer.

Additionally, if your virtual accounts are being debited or credited by external parties, you can use [Expected Payments](https://docs.moderntreasury.com/platform/reference/expected-payment-object) to monitor for activity.

Related Guides:

* [Virtual Accounts](https://docs.moderntreasury.com/payments/docs/virtual-accounts)
* [Testing Virtual Accounts in the sandbox](https://docs.moderntreasury.com/payments/docs/virtual-account-testing)

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
        Unique identifier for the virtual account.
      </td>
    </tr>

    <tr>
      <td>
        **name**
        *string*
      </td>

      <td>
        The name of the virtual account.
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
        **counterparty\_id**
        *string*
      </td>

      <td>
        The ID of a counterparty that the virtual account belongs to. Optional.
      </td>
    </tr>

    <tr>
      <td>
        **internal\_account\_id**
        *string*
      </td>

      <td>
        The ID of the internal account that the virtual account is in.
      </td>
    </tr>

    <tr>
      <td>
        **account\_details**
        *array object*
      </td>

      <td>
        An array of [account detail](https://docs.moderntreasury.com/platform/reference/account-detail-object) objects.
      </td>
    </tr>

    <tr>
      <td>
        **routing\_details**
        *array object*
      </td>

      <td>
        An array of [routing detail](https://docs.moderntreasury.com/platform/reference/routing-detail-object) objects. These will be the routing details of the internal account.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_account\_id**
        *string*
      </td>

      <td>
        The

        [Ledger Account](https://docs.moderntreasury.com/platform/reference/ledger-account-object)

        id linked to this `virtual_account`. See

        [Linking to Other Modern Treasury Objects](https://docs.moderntreasury.com/ledgers/update/docs/link-a-ledger-account-to-a-virtual-account#/)

        .
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See

        [Metadata](https://docs.moderntreasury.com/platform/reference/metadata)

        .
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
  </tbody>
</Table>

```json Virtual Account Example
{
  "id": "2e0296c1-1daf-4b3e-954d-fb9ec7be56f6",
  "object": "virtual_account",
  "name": "Funds on behalf of Alice Jones",
  "description": null,
  "counterparty_id": null,
  "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd",
  "ledger_account_id": "c39d893d-4944-419e-816e-1266387f2ec5",
  "account_details": [
    {
      "id": "5668c0cf-972d-49c6-970f-b32591f3e8a6",
      "object": "account_detail",
      "account_number_safe": "0001",
      "account_number_type": "other"
    }
  ],
  "routing_details": [
    {
      "id": "a2d0e5c4-3058-4c04-9e75-d691a967305f",
      "object": "routing_detail",
      "payment_type": "wire",
      "routing_number": "021000021",
      "routing_number_type": "aba",
      "bank_name": "JPMORGAN CHASE BANK, NA",
      "bank_address": {
        "id": "29024065-ebd1-4a72-97b8-814108f14511",
        "object": "address",
        "line1": "14249 Stewart Ranch",
        "line2": null,
        "locality": "East Graham",
        "region": "IL",
        "postal_code": "75520",
        "country": "US"
      }
    },
    {
      "id": "ec6d8ad5-6bf6-4861-b748-0f2d3cf35191",
      "object": "routing_detail",
      "payment_type": "ach",
      "routing_number": "021000021",
      "routing_number_type": "aba",
      "bank_name": "JPMORGAN CHASE BANK, NA",
      "bank_address": {
        "id": "16b7e236-6170-4fa9-9fb7-706edf7d3ff1",
        "object": "address",
        "line1": "504 Jakubowski Lodge",
        "line2": null,
        "locality": "South Jamee",
        "region": "AZ",
        "postal_code": "27953-3448",
        "country": "US"
      }
    }
  ],
  "metadata": {},
  "live_mode": true,
  "created_at": "2020-11-09T00:11:07Z",
  "updated_at": "2020-11-09T00:11:07Z"
}
```
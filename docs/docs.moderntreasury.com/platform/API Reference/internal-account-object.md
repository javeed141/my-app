# Internal Accounts

An `internal_account` is an account that you can use to make payments and hold money. These accounts contain the relevant name, address, entity type information necessary for making payments. An internal account also has [account details](https://docs.moderntreasury.com/platform/reference/account-detail-object) and [routing details](https://docs.moderntreasury.com/platform/reference/routing-detail-object) which include attributes like account numbers, routing numbers, and SWIFT codes. An account can have multiple routing details, such as when banks have different routing numbers for ACH and wire payments.

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
        Unique identifier for the account.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **account\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type of account. One of `checking`, `savings`, `other`, or left null.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **party\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The legal name of the entity which owns the account.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **party\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Either `individual`, `business` or `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **party\_address**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The [address](https://docs.moderntreasury.com/platform/reference/address-object) associated with the owner or `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **account\_details**\
        *array object*
      </td>

      <td style={{ textAlign: "left" }}>
        An array of [account detail](https://docs.moderntreasury.com/platform/reference/account-detail-object) objects.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **routing\_details**\
        *array object*
      </td>

      <td style={{ textAlign: "left" }}>
        An array of [routing detail](https://docs.moderntreasury.com/platform/reference/routing-detail-object) objects.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        A nickname for the account.
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
        **connection**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The [Connection](https://docs.moderntreasury.com/platform/reference/connections) that the account belong to.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **currency**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The currency of the account.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **parent\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The UUID of the parent `InternalAccount` that this account belongs to. Optional.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **counterparty\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The UUID of the [Counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object) that this account refers to. Optional.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The [Ledger Account](https://docs.moderntreasury.com/platform/reference/ledger-account-object) id linked to this `internal_account`. See [Linking to Other Modern Treasury Objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects#external-accounts--internal-accounts).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **contra\_ledger\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The Contra [Ledger Account](https://docs.moderntreasury.com/platform/reference/ledger-account-object) id linked to this `internal_account`. See [Linking to Other Modern Treasury Objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects#external-accounts--internal-accounts).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **vendor\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The vendor ID associated with this account.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **account\_capabilities**\
        *array object*
      </td>

      <td style={{ textAlign: "left" }}>
        An array of [account capability](https://docs.moderntreasury.com/platform/reference/account-capability-object)  objects.
      </td>
    </tr>
  </tbody>
</Table>

```json Internal Account Example
{
  "id": "f7b2fc7a-3f22-4f82-b651-fa9e2f8d2653",
  "object": "internal_account",
  "account_type": null,
  "party_name": "Your Company",
  "party_type": null,
  "party_address": {
    "id": "ad326417-4270-4156-8652-dfe1b2ec3ae8",
    "object": "address",
    "line1": "100 Universal City Plaza",
    "line2": null,
    "locality": "Universal City",
    "region": "CA",
    "postal_code": "91608",
    "country": "US"
  },
  "account_details": [
    {
      "id": "f3552822-38f5-4dd5-aa10-a5a2fce00ed6",
      "object": "account_detail",
      "account_number_safe": "934",
      "account_number_type": "other",
      "live_mode": true
    }
  ],
  "routing_details": [
    {
      "id": "2e90da60-405c-44bc-8b33-2bdb9419afe3",
      "object": "routing_detail",
      "payment_type": null,
      "routing_number": "021000021",
      "routing_number_type": "aba",
      "bank_name": "Gringotts Wizarding Bank",
      "bank_address": {
        "id": "fcf5ebe1-b990-4684-880f-f69c277106bb",
        "object": "address",
        "line1": "6000 Universal Boulevard",
        "line2": null,
        "locality": "Orlando",
        "region": "FL",
        "postal_code": "32819",
        "country": "US",
        "live_mode": true
      }
    }
  ],
  "connection": {
    "id": "e680b151-c8a2-4b36-aa6b-059f9f2a969c",
    "object": "connection",
    "vendor_id": "example1",
    "vendor_name": "Gringotts Wizarding Bank"
  },
  "currency": "USD",
  "parent_account_id": "5fcd681b-826c-480c-a565-f2919bcbdb82",
  "counterparty_id": "8646ad4a-f582-454f-9928-148dcb445995",
  "metadata": {},
  "ledger_account_id": null,
  "contra_ledger_account_id": null,
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z",
	"vendor_id": null,
  "account_capabilities": [
    {
		 	"id": "2e90da60-405c-44bc-8b33-2bdb9419afe3",
      "object": "account_capability",
      "payment_type": "wire",
      "live_mode": true,		
      "identifier": "9140032",
			"created_at": "2019-11-09T00:11:07Z",
      "updated_at": "2019-11-09T00:11:07Z",
			"discard_at": null
    },
    {
			"id": "2e90da60-405c-44bc-8b33-2bdb9419afe3",
      "object": "routing_detail",
      "payment_type": "ach",
			"live_mode": true,		
      "identifier": "9140001",
			"created_at": "2019-11-09T00:11:07Z",
      "updated_at": "2019-11-09T00:11:07Z",
			"discard_at": null
		}
	]
}
```
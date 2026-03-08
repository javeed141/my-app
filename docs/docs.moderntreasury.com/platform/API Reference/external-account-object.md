# External Accounts

An `external_account` is a bank account that belongs to a [counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object). External Accounts contain the relevant name, address, entity type information necessary for making payments.

Occasionally banks have different routing numbers for ACH and wire payments. Modern Treasury makes it simple to capture this information in the form of [routing details](https://docs.moderntreasury.com/platform/reference/routing-detail-object).

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
        Unique identifier for the account.
      </td>
    </tr>

    <tr>
      <td>
        **account\_type**
        *string*
      </td>

      <td>
        The type of account. This is usually `checking`, `savings`, `other`, or left null. For some use cases, this also supports the values `cash`, `general_ledger`, `loan`, `non_resident`, `overdraft`
      </td>
    </tr>

    <tr>
      <td>
        **party\_name**
        *string*
      </td>

      <td>
        The legal name of the entity which owns the account.
      </td>
    </tr>

    <tr>
      <td>
        **party\_type**
        *string*
      </td>

      <td>
        Either `individual` or `business`.
      </td>
    </tr>

    <tr>
      <td>
        **party\_address**
        *object*
      </td>

      <td>
        The [address](https://docs.moderntreasury.com/platform/reference/address-object) associated with the owner or `null`.
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
        An array of [routing detail](https://docs.moderntreasury.com/platform/reference/routing-detail-object) objects.
      </td>
    </tr>

    <tr>
      <td>
        **name**
        *string*
      </td>

      <td>
        A nickname for the account.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
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
        **counterparty\_id**
        *string*
      </td>

      <td>
        The ID of the [Counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object).
      </td>
    </tr>

    <tr>
      <td>
        **verification\_status**
        *string*
      </td>

      <td>
        The verification status of the external account. Can be one of `unverified`, `pending_verification`, or `verified`. For more on  how verification statuses are used, refer to [External Account Verification](https://docs.moderntreasury.com/payments/docs/verifying-bank-accounts).
      </td>
    </tr>

    <tr>
      <td>
        **verification\_source**
        *string*
      </td>

      <td>
        The verification source of the external account. Can be one of `ach_prenote`, `microdeposits`, or `plaid`. For more on how verification is done, refer to [External Account Verification](https://docs.moderntreasury.com/payments/docs/verifying-bank-accounts).
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_account\_id**
        *object*
      </td>

      <td>
        The [Ledger Account](https://docs.moderntreasury.com/platform/reference/ledger-account-object) id linked to this `external_account`. See [Linking to Other Modern Treasury Objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects#external-accounts--internal-accounts).
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
  </tbody>
</Table>

```json External Account Example
{
  "id": "22c19f2f-14cf-4a17-b5d0-c6838e3eaeb3",
  "object": "external_account",
  "account_type": "checking",
  "party_name": "Mitchell LLC",
  "party_type": "business",
  "name": null,
  "party_address": {
    "id": "4076977f-aa24-4273-b18f-a5e9f585550a",
    "object": "address",
    "line1": "680 Darron Flats",
    "line2": null,
    "locality": "Lake Boville",
    "region": "WV",
    "postal_code": "36045-2227",
    "country": "US"
  },
  "account_details": [
    {
      "id": "5668c0cf-972d-49c6-970f-b32591f3e8a6",
      "object": "account_detail",
      "account_number_safe": "4445",
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
  "external_id": null,
  "counterparty_id": "60df9366-c98e-4be9-a1af-163e792331cd",
  "intermediate_account_id": null,
  "verification_status": "unverified",
  "verification_source": null,
  "metadata": {},
  "ledger_account_id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
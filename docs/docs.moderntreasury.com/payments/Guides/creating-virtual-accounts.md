# Creating Virtual Accounts

Check to see if your bank’s product supports the Virtual Accounts API or the Internal Account API in our [Virtual Accounts Overview](https://docs.moderntreasury.com/payments/docs/virtual-accounts).

<Callout icon="📘" theme="info">
  If your bank provides balances for these virtual accounts, use the [Internal Account API](https://docs.moderntreasury.com/payments/docs/creating-nested-internal-accounts).
</Callout>

## Account Number Scheme

Depending on the bank, the virtual account numbers you use will follow a different provisioning scheme:

| Bank                | Product Name              | Scheme  |
| :------------------ | :------------------------ | :------ |
| BankProv            | Virtual Ledgers           | Dynamic |
| Cross River Bank    | Subledgers                | Dynamic |
| Evolve              | vAccounts                 | Range   |
| Goldman Sachs       | Virtual Accounts          | Range   |
| Increase            | Account Numbers           | Dynamic |
| JP Morgan Chase     | Virtual Reference Numbers | Range   |
| Silicon Valley Bank | ACH Sub-Accounts          | Range   |
| Wells Fargo         | Perfect Receivables       | Range   |

A `Dynamic` virtual account number scheme means the bank determines the virtual account number on request. You do not provide the virtual account number in your API call.

A `Range` virtual account number scheme means the bank provisions a range of account numbers to use.

* You may either omit the account number or provide one when you initiate an API call to create a virtual account. If you omit the account number, Modern Treasury will automatically select one for you.

## Creating Virtual Accounts

You can create Virtual Account with or without an account number:

```curl Create a Virtual Account with an account number
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/virtual_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Funds on behalf of Alice Jones",
    "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd",
    "account_details": [
      {
        "account_number": "2000001",
        "account_number_type": "other"
      }
    ]
  }'
```

```curl Create a Virtual Account without an account number
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/virtual_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Funds on behalf of Alice Jones",
    "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd"
  }'
```

The response will contain the virtual account, including the virtual account number and routing number.

```json
{
  "id": "2e0296c1-1daf-4b3e-954d-fb9ec7be56f6",
  "object": "virtual_account",
  "name": "Funds on behalf of Alice Jones",
  "description": null,
  "active": true,
  "counterparty_id": null,
  "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd",
  "debit_ledger_account_id": null,
  "credit_ledger_account_id": null,
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
      "id":"5ceb251f-0235-48a2-81cb-0c668f5ee81b",
      "object": "routing_detail",
      "payment_type": null,
      "routing_number": "121141822",
      "routing_number_type": "aba",
      "bank_name": "BANK OF AMERICA CALIFORNIA, NA",
      "bank_address": {
        "id": "2f1e12dd-de80-44aa-92cd-f0e4101b8e54",
        "object": "address",
        "line1": "PO BOX 27025",
        "line2": null,
        "locality": "RICHMOND",
        "region": "VA",
        "postal_code": "23261-7025",
        "country": "US",
        "live_mode": true,
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      },
      "live_mode": true,      
      "created_at": "2019-11-09T00:11:07Z",
      "updated_at": "2019-11-09T00:11:07Z"
    }
  ],
  "metadata": {},
  "live_mode": true,
  "created_at": "2020-11-09T00:11:07Z",
  "updated_at": "2020-11-09T00:11:07Z"
}
```

## Creating Virtual Accounts with a Counterparty

Our API supports linking a virtual account to a counterparty. This may be helpful if you are holding funds on behalf of someone, or if you want to link a set of transactions to a counterparty.

```curl Create a Virtual Account with a Counterparty
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/virtual_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Funds on behalf of Alice Jones",
    "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd",
    "counterparty_id": "b4313c66-3892-416d-995f-f5b6044b5c7a",
    "account_details": [
      {
        "account_number": "2000001",
        "account_number_type": "other"
      }
    ]
  }'
```

## Creating Virtual Accounts with a Ledger

To benefit from auto-ledgering on Virtual Accounts both the Internal Account and Virtual Account must be linked to Ledger Accounts.

A Virtual Account can be linked to a Ledger Account through its [Create API ](https://docs.moderntreasury.com/platform/reference/create-virtual-account)via the `ledger_account` parameter, or its [Update API](https://docs.moderntreasury.com/platform/reference/update-virtual-account) via the `ledger_account_id` parameter. Alternatively you could also set the `ledgerable_id` and `ledgerable_type` fields on a Ledger Account on [Create](https://docs.moderntreasury.com/platform/reference/create-ledger-account) or [Update](https://docs.moderntreasury.com/platform/reference/update-ledger-account).

An Internal Account can be linked to a Ledger Account through its [Update API](https://docs.moderntreasury.com/platform/reference/update-internal-account) via the `ledger_account_id` parameter, or through setting the `ledgerable_id` and `ledgerable_type` fields on a Ledger Account on [Create](https://docs.moderntreasury.com/platform/reference/create-ledger-account) or [Update](https://docs.moderntreasury.com/platform/reference/update-ledger-account).

Funds moving into (credit) or out of (debit) an Internal Account via a Virtual Account will be [auto-ledgered](https://docs.moderntreasury.com/ledgersdocs/link-a-ledger-account-to-a-virtual-account#default-ledgering) to the connected Ledger Account.
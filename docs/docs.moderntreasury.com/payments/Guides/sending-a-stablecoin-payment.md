# Originate a Stablecoin transfer (On-ramp)

Let's assume you want to send a $10 USDC transfer to an externally managed stablecoin wallet address.  This could be to fund an onchain savings account, pay a vendor who prefers to receive USDC or pay interest for an onchain-originated loan.  This is what is traditionally called an "on-ramp" in the industry.

Before making requests, you will need your API Key and Organization ID.  To find these, you can follow this guide: [Retrieve your API Key](/platform/docs/retrieve-an-api-key)

## 1. Retrieve your Internal Account ID

To get an Internal Account ID, you can pick one from [your accounts page](https://app.moderntreasury.com/accounts). Any of the IDs will work for testing, although you can refer to [Internal Accounts](https://docs.moderntreasury.com/payments/docs/test-internal-accounts) to see the differences in how the test banks process payments.

If you want to [get all the internal accounts using the API](/platform/reference/internal-account-object) , you can issue the following request:

```curl Request
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/internal_accounts
```

```json Response
{
    "id": "d8f8cdef-0d24-4252-86fd-9c9f749d3601",
    "object": "internal_account",
    "live_mode": true,
    "party_name": "Modern Treasury Corp",
    "party_address": null,
    "account_details": [
        {
            "account_number": "0x9bE868839163E128971Bb6AE045e172Fa806E805",
            "account_number_type": "ethereum_address"
        },
        {
            "account_number": "Gjcc3Zzw9YGhftR9tEAvcBPjEAX79rTQ9GNKoKDqLjzV",
            "account_number_type": "solana_address"
        }
    ],
    "name": "Modern Treasury Corp - USDC",
    "metadata": {},
    "legal_entity_id": "135778f6-1e2c-486b-a835-d52cbd1ff6f6",
    "currency": "USDC",
    "status": "active",
    "created_at": "2025-12-17T20:41:02Z",
    "updated_at": "2025-12-17T22:20:57Z"
}
```

You will receive an array of all your internal accounts.

## 2. Funding and using a Stablecoin Account

> 📘 Conversions between USD and stablecoins
>
> Conversions between USD and Stablecoins in Modern Treasury are represented as Book Transfers between Internal Accounts.

When starting with USD on the MT platform, you can fund a Stablecoin Internal Account via a book transfer (`book`) between your USD Internal Account to the Stablecoin Internal Account.  For example, you could use a USD Account ID (e.g. `0f8e3719-3dfd-4613-9bbf-c0333781b59f1 `from the [ACH debit guide](https://docs.moderntreasury.com/payments/docs/initiate-an-ach-debit)) as `originating_account_id` and `d8f8cdef-0d24-4252-86fd-9c9f749d3601` as `receiving_account_id`

If you or your user does not have a sufficient balance in a USD account, a USD Internal Account needs to be funded via an External Account.  ACH debits are a useful tool here when used in coordination with funding a stablecoin Internal Account.  Alternatively, the USD account can be funded by an ACH credit or wire initiated outside of the Modern Treasury platform.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "book",
    "amount": 1000,
    "direction": "credit",
    "currency": "USDC",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f1",
    "receiving_account_id": "d8f8cdef-0d24-4252-86fd-9c9f749d3601"
  }'
```

## 3. Create a Counterparty

Counterparties for stablecoin transfers require different information than standard payment rails.  Most importantly, we need a different kind of External Account, in the form of a Stablecoin wallet address.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Acme Fireblocks Wallet",
    "accounts": [
    {
      "account_details": [
        {
          "account_number": "0x9bE868839163E128971Bb6AE045e172Fa806E805",
          "account_number_type": "ethereum_address"
        }
      ]
    }
    ]
}'
```

```json Response
{
    "id": "fb9d6c24-da0b-4b43-81ef-e84440d928c0",
    "object": "counterparty",
    "live_mode": true,
    "name": "Acme Fireblocks Wallet",
    "email": null,
    "send_remittance_advice": false,
    "verification_status": "verified",
    "external_id": null,
    "legal_entity_id": null,
    "metadata": {},
    "accounts": [
        {
            "id": "dca61c52-f215-4449-bba8-b7b1efc3c5a4",
            "object": "external_account",
            "live_mode": true,
            "account_type": "other",
            "party_name": "Acme Fireblocks Wallet",
            "party_type": null,
            "party_address": null,
            "account_details": [
                {
                    "id": "ba9eb4d1-2423-4c05-a65b-e69ad78fe489",
                    "object": "account_detail",
                    "live_mode": true,
                    "account_number": "0x9bE868839163E128971Bb6AE045e172Fa806E805",
                    "account_number_safe": "E805",
                    "account_number_type": "ethereum_address",
                    "discarded_at": null,
                    "created_at": "2026-01-22T00:30:18Z",
                    "updated_at": "2026-01-22T00:30:18Z"
                }
            ],
            "routing_details": [],
            "name": null,
            "metadata": {},
            "verification_status": "unverified",
            "verification_source": null,
            "external_id": null,
            "contact_details": [],
            "ledger_account_id": null,
            "discarded_at": null,
            "created_at": "2026-01-22T00:30:18Z",
            "updated_at": "2026-01-22T00:30:18Z"
        }
    ],
    "discarded_at": null,
    "created_at": "2026-01-22T00:30:18Z",
    "updated_at": "2026-01-22T00:30:18Z"
}
```

Note that the response returns a new Counterparty object with 1 attached external account. You will need the ID of the external account (`dca61c52-f215-4449-bba8-b7b1efc3c5a4`) for the next step.

## 3. Create a Payment Order

To create a payment order, you will use your Internal Account ID (`d8f8cdef-0d24-4252-86fd-9c9f749d3601`) as the `originating_account_id` and the Counterparty's Account ID (`dca61c52-f215-4449-bba8-b7b1efc3c5a4`) as the `receiving_account_id`.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "stablecoin",
    "amount": 1000,
    "direction": "credit",
    "currency": "USDC",
    "originating_account_id": "d8f8cdef-0d24-4252-86fd-9c9f749d3601",
    "receiving_account_id": "dca61c52-f215-4449-bba8-b7b1efc3c5a4"
  }'
```

```json Response
{
  "id": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a",
  "object": "payment_order",
  "type": "stablecoin",
  "amount": 1000,
  "direction": "credit",
  "originating_account_id": "d8f8cdef-0d24-4252-86fd-9c9f749d3601",
  "receiving_account": {
    "id": "dca61c52-f215-4449-bba8-b7b1efc3c5a4",
    "object": "external_account",
    "account_type": "other",
    "party_name": "Acme Fireblocks Wallet",
    "party_type": null,
    "party_address": null,
    "account_details": [
      {
        "id": "ba9eb4d1-2423-4c05-a65b-e69ad78fe489",
        "object": "account_detail",
        "account_number_safe": "6789",
        "account_number_type": "other",
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      }
    ],
    "routing_details": []
    ],
    "created_at": "2019-11-09T00:11:07Z",
    "updated_at": "2019-11-09T00:11:07Z"
  },
  "receiving_account_id": "dca61c52-f215-4449-bba8-b7b1efc3c5a4",
  "receiving_account_type": "external_account",
  "accounting_category_id": null,
  "currency": "USDC",
  "effective_date": "2025-11-19",
  "priority": "normal",
  "description": null,
  "statement_descriptor": null,
  "remittance_information": null,
  "metadata": {},
  "status": "approved",
  "counterparty_id": "fb9d6c24-da0b-4b43-81ef-e84440d928c0",
  "transaction_ids": [],
  "charge_bearer": null,
  "foreign_exchange_indicator": null,
  "foreign_exchange_contract": null,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```

This is the response you will see. It contains the `id` of the payment order, `c5f4009c-bdd6-4cc1-84b2-17974ac9e77a`, as well as additional details about it.
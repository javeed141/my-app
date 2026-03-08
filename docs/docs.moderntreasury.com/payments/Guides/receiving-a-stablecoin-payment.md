# Receive a Stablecoin transfer (Off-ramp)

Let's assume you have $10 USDC off-platform and you want to convert it to USD, then withdraw it to an external bank account.  This could be to withdraw funds from a global peer-to-peer payments platform, settle a cross border payment which originated in a stablecoin, or pay a vendor in USD when you keep most of your corporate treasury in stablecoins.  This is traditionally called an "off-ramp" flow in the industry.

Before making requests, you will need your API Key and Organization ID.  To find these, you can follow this guide: [Retrieve your API Key](/platform/docs/retrieve-an-api-key)

## 1. Using a stablecoin account to receive inbound payments

> 📘 Stablecoin Accounts
>
> A stablecoin account can be used to receive onchain payments.  This is usually seen in association with a stablecoin-to-USD Book Transfer, followed by a subsequent USD Payment Order to an External Account (collectively, "off-ramp").  However, please note that our platform can support onchain deposits followed by subsequent stablecoin Payment Orders.

Your Stablecoin account has a unique address per blockchain, which can be used to receive inbound payments from onchain External Accounts.  This can be retrieved by querying an Internal Account using ID: e.g. `d8f8cdef-0d24-4252-86fd-9c9f749d3601`.  This example assumes an Internal Account has already been created.  In particular, this is the same Internal Account created in [this](https://docs.moderntreasury.com/payments/docs/stablecoins) example.

This address can be used to *receive* Stablecoins from any External Account address that you manage yourself. The address can be found in the `account_number` field in the `account_details` section of the Internal Account you retrieved.

```json Account Details Snippet

"account_details": 
[
    {
      "id": "ce594f58-041c-44be-bcdb-714d9e690d78",
      "object": "account_detail",
      "live_mode": true,
      "account_number": "0x9bE868839163E128971Bb6AE045e172Fa806E805",
      "account_number_safe": "E805",
      "account_number_type": "ethereum_address",
      "discarded_at": null,
      "created_at": "2025-12-18T00:56:58Z",
      "updated_at": "2025-12-18T00:56:58Z"
    },
    {
      "id": "749f02b0-6e31-446a-a480-12a1b002557d",
      "object": "account_detail",
      "live_mode": true,
      "account_number": "Gjcc3Zzw9YGhftR9tEAvcBPjEAX79rTQ9GNKoKDqLjzV",
      "account_number_safe": "LjzV",
      "account_number_type": "solana_address",
      "discarded_at": null,
      "created_at": "2025-12-18T00:56:58Z",
      "updated_at": "2025-12-18T00:56:58Z"
    }
]
```

## 2. Move from stablecoin to USD

> 📘 Conversions between stablecoins and USD
>
> Conversions between USD and stablecoins in Modern Treasury are represented as Book Transfers between Internal Accounts.

After your Stablecoin account has been funded via an External Account, you can move your Stablecoin to USD by executing a book transfer (`book`) to a USD Internal Account.

For this example, we can use the same USD Account ID and Stablecoin Internal Account ID as the sample in [originate a stablecoin transfer](https://docs.moderntreasury.com/payments/docs/sending-a-stablecoin-payment), but in the inverse order.

So, when creating your Payment Order, set `d8f8cdef-0d24-4252-86fd-9c9f749d3601`as `originating_account_id`and `0f8e3719-3dfd-4613-9bbf-c0333781b59f1`as `receiving_account_id`.

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
    "originating_account_id": "d8f8cdef-0d24-4252-86fd-9c9f749d3601",
    "receiving_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f1"
  }'
```

You now have a funded USD Internal Account, from which the final leg of your "off-ramp" transaction can be initiated.

## 3. Create a Counterparty

From here on out, you can follow the standard approach of sending a Payment Order to a Counterparty.  The Counterparty can be one of your business' External Accounts or that of a customer's.  To proceed, you need to create a Counterparty with a defined External Account.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Vendor A's US Bank Account",
    "accounts": [
      {
        "account_type": "checking",
        "routing_details": [
          {
            "routing_number_type": "aba",
            "routing_number": "121141822"
          }
        ],
        "account_details": [
          {
            "account_number": "123456789"
          }
        ]
      }
    ]
  }'
```

```json Response
{
  "id":"37ba4454-dd33-4aa0-8906-0e2e4103e45c",
  "object": "counterparty",
  "name":"Kenner, Bach and Ledeen",
  "email":null,
  "metadata":{},
  "accounts": [
    {
      "id":"5acec2ef-987b-4260-aa97-b719eeb0a8d5",
      "object": "external_account",
      "account_type":"checking",
      "party_name":"Kenner, Bach and Ledeen",
      "party_type":null,
      "party_address":null,
      "account_details": [
        {
          "id":"81a7cd32-39f5-4f0c-873f-4d9137ec9cd9",
          "object": "account_detail",
          "account_number_safe":"6789",
          "account_number_type":"other",
          "created_at": "2019-11-09T00:11:07Z",
          "updated_at": "2019-11-09T00:11:07Z"
        }
      ],
      "routing_details": [
        {
          "id":"5ceb251f-0235-48a2-81cb-0c668f5ee81b",
          "object": "routing_detail",
          "payment_type":null,
          "routing_number":"121141822",
          "routing_number_type":"aba",
          "created_at": "2019-11-09T00:11:07Z",
          "updated_at": "2019-11-09T00:11:07Z"
        }
      ],
      "created_at": "2019-11-09T00:11:07Z",
      "updated_at": "2019-11-09T00:11:07Z"
    }
  ],
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```

Note that the response returns a new Counterparty object with 1 attached External Account. You will need the `id` of the External Account (`5acec2ef-987b-4260-aa97-b719eeb0a8d5`) for the next step.

## 3. Create a Payment Order

To create a Payment Order, you will use your Internal Account ID (`0f8e3719-3dfd-4613-9bbf-c0333781b59f`) as the `originating_account_id`and the Counterparty's Account ID (`5acec2ef-987b-4260-aa97-b719eeb0a8d5`) as the `receiving_account_id`.  This example shows the payment to your Counterparty being sent instantly via RTP.

```shell Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "rtp",
    "amount": 1000,
    "direction": "credit",
    "currency": "USD",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```

```json Response
{
  "id": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a",
  "object": "payment_order",
  "type": "rtp",
  "amount": 1000,
  "direction": "credit",
  "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "receiving_account": {
    "id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5",
    "object": "external_account",
    "account_type": "checking",
    "party_name": "Kenner, Bach & Ledeen",
    "party_type": null,
    "party_address": null,
    "account_details": [
      {
        "id": "81a7cd32-39f5-4f0c-873f-4d9137ec9cd9",
        "object": "account_detail",
        "account_number_safe": "6789",
        "account_number_type": "other",
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      }
    ],
    "routing_details": [
      {
        "id": "5ceb251f-0235-48a2-81cb-0c668f5ee81b",
        "object": "routing_detail",
        "payment_type": null,
        "routing_number": "121141822",
        "routing_number_type": "aba",
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      }
    ],
    "created_at": "2019-11-09T00:11:07Z",
    "updated_at": "2019-11-09T00:11:07Z"
  },
  "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5",
  "receiving_account_type": "external_account",
  "accounting_category_id": null,
  "currency": "USD",
  "effective_date": "2018-11-19",
  "priority": "normal",
  "description": null,
  "statement_descriptor": null,
  "remittance_information": null,
  "metadata": {},
  "status": "approved",
  "counterparty_id": "37ba4454-dd33-4aa0-8906-0e2e4103e45c",
  "transaction_ids": [],
  "charge_bearer": null,
  "foreign_exchange_indicator": null,
  "foreign_exchange_contract": null,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```

This is the response you will see. It contains the `id` of the Payment Order, `c5f4009c-bdd6-4cc1-84b2-17974ac9e77a`, as well as additional details about it.

## Optional: Handle post-creation events

Modern Treasury sends a number of useful events once your Payment Order is created.  Use the Dashboard, [Webhooks](/platform/reference/webhooks), or a third party solution to receive these events and perform actions like notifying the Counterparty of the transfer, knowing when the Payment Order is complete, or determining when and why a return occurred.
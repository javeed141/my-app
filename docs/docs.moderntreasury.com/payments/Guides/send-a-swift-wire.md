# Originate a SWIFT wire transfer

# Overview

Let's assume you want to send money to a customer located in another country. You can do this by sending a SWIFT wire. A SWIFT wire can be initiated either in your bank account's currency or in the currency of your counterparty. In this guide, we will walk you through:

* How to set up a counterparty to receive a wire via SWIFT
* How to send a SWIFT wire in USD
* How to send a SWIFT wire in a foreign currency

# Setting up your Counterparty

Before sending a SWIFT wire, you must set up your Counterparty with their banking information. In most cases, you'll set them up with an IBAN number and SWIFT code.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Kenner, Bach and Ledeen",
    "accounts": [
      {
      	"party_name": "Kenner, Bach and Ledeen Corp.",
        "party_type": "business",
        "routing_details": [
          {
            "routing_number_type": "swift",
            "routing_number": "DEUTDEBB"
          }
        ],
        "account_details": [
          {
            "account_number": "AT483200000012345864",
            "account_number_type": "iban"
          }
        ],
      	"party_address": {
          "line1": "Genslerstrae 84",
          "locality": "Berlin",
          "region": "Berlin-Brandenburg",
          "postal_code": "33610",
          "country": "DEU"
        }
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
      "party_name":"Kenner, Bach and Ledeen Corp.",
      "party_type":"business",
      "party_address": {
        "id": "11f052ae-9fb0-42c2-b9a9-dc037260c795",
        "object": "address",
        "line1": "Genslerstrae 84",
        "line2": null,
        "locality": "Berlin",
        "region": "Berlin-Brandenburg",
        "postal_code": "33610",
        "country": "DEU",
        "live_mode": true,
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      },
      "account_details": [
        {
          "id":"81a7cd32-39f5-4f0c-873f-4d9137ec9cd9",
          "object": "account_detail",
          "account_number_safe":"5864",
          "account_number_type":"iban",
          "created_at": "2019-11-09T00:11:07Z",
          "updated_at": "2019-11-09T00:11:07Z"
        }
      ],
      "routing_details": [
        {
          "id":"5ceb251f-0235-48a2-81cb-0c668f5ee81b",
          "object": "routing_detail",
          "payment_type":null,
          "routing_number":"DEUTDEBB",
          "routing_number_type":"swift",
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

If you have additional account numbers or routing numbers for the counterparty, you may create multiple [account details](/platform/reference/account-detail-object) or [routing details](/platform/reference/routing-detail-object) in the External Account.

# Example 1: Sending USD via a SWIFT wire

This example will demonstrate how to send USD to your Counterparty via a SWIFT wire. For this example, let's assume you want to send $10 to the counterparty that was previously set up. This is the API call.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "wire",
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
  "type": "wire",
  "amount": 1000,
  "direction": "credit",
  "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "receiving_account": {
    "id":"5acec2ef-987b-4260-aa97-b719eeb0a8d5",
    "object": "external_account",
    "account_type":"checking",
    "party_name":"Kenner, Bach and Ledeen Corp.",
    "party_type":"business",
    "party_address": {
      "id": "11f052ae-9fb0-42c2-b9a9-dc037260c795",
      "object": "address",
      "line1": "Genslerstrae 84",
      "line2": null,
      "locality": "Berlin",
      "region": "Berlin-Brandenburg",
      "postal_code": "33610",
      "country": "DEU",
      "live_mode": true,
      "created_at": "2019-11-09T00:11:07Z",
      "updated_at": "2019-11-09T00:11:07Z"
    },
    "account_details": [
      {
        "id":"81a7cd32-39f5-4f0c-873f-4d9137ec9cd9",
        "object": "account_detail",
        "account_number_safe":"5864",
        "account_number_type":"iban",
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      }
    ],
    "routing_details": [
      {
        "id":"5ceb251f-0235-48a2-81cb-0c668f5ee81b",
        "object": "routing_detail",
        "payment_type":null,
        "routing_number":"DEUTAT00123",
        "routing_number_type":"swift",
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

# Example 2: Sending a foreign currency via a SWIFT wire

This example will demonstrate how to send a foreign currency to your Counterparty via a SWIFT wire. For this example, let's assume you want to send 10 euros to the Counterparty that was previously set up. This is the API call. Note that the difference from Example 1 is that the currency is now `EUR`.

In this example, you will take the market rate for conversions from USD to EUR. This means that your bank will execute the currency conversion at the time they execute the wire.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "wire",
    "amount": 1000,
    "direction": "credit",
    "currency": "EUR",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```

```json Response
{
  "id": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a",
  "object": "payment_order",
  "type": "wire",
  "amount": 1000,
  "direction": "credit",
  "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "receiving_account": {
    "id":"5acec2ef-987b-4260-aa97-b719eeb0a8d5",
    "object": "external_account",
    "account_type":"checking",
    "party_name":"Kenner, Bach and Ledeen Corp.",
    "party_type":"business",
    "party_address": {
      "id": "11f052ae-9fb0-42c2-b9a9-dc037260c795",
      "object": "address",
      "line1": "Genslerstrae 84",
      "line2": null,
      "locality": "Berlin",
      "region": "Berlin-Brandenburg",
      "postal_code": "33610",
      "country": "DEU",
      "live_mode": true,
      "created_at": "2019-11-09T00:11:07Z",
      "updated_at": "2019-11-09T00:11:07Z"
    },
    "account_details": [
      {
        "id":"81a7cd32-39f5-4f0c-873f-4d9137ec9cd9",
        "object": "account_detail",
        "account_number_safe":"5864",
        "account_number_type":"iban",
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      }
    ],
    "routing_details": [
      {
        "id":"5ceb251f-0235-48a2-81cb-0c668f5ee81b",
        "object": "routing_detail",
        "payment_type":null,
        "routing_number":"DEUTAT00123",
        "routing_number_type":"swift",
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
  "currency": "EUR",
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
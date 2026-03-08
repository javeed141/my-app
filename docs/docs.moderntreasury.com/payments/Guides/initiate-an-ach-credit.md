# Originate an ACH credit

## Overview

Let's assume you want to send $10 using an ACH transfer.  This could be to pay a vendor, reimburse an employee, or move funds between corporate accounts, for example.  To do so, we will need to create a [Payment Order](/platform/reference/payment-order-object) with a [Counterparty](/platform/reference/counterparty-object).

Before making requests, you will need your API Key and Organization ID.  To find these, you can follow this guide: [Retrieve your API Key](/platform/docs/retrieve-an-api-key)

## 1. Retrieve your Internal Account ID

> 📘 Internal Accounts
>
> Modern Treasury uses the term Internal Account to refer to your accounts.  Your customers', vendors', and employees' bank accounts are called External Accounts.

When you create a payment order, you must specify which account you want the transaction to originate from. If you are sending someone money, this is the account that the money will be taken out of.

To get an Internal Account ID, you can pick one from [your accounts page](https://app.moderntreasury.com/accounts). Any of the IDs will work for testing, although you can refer to [Internal Accounts](https://docs.moderntreasury.com/payments/docs/test-internal-accounts) to see the differences in how the test banks process payments.

If you want to [get all the internal accounts using the API](/platform/reference/internal-account-object) , you can issue the following request:

```shell Request
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/internal_accounts
```

```json Response
[
  {
    "id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "object": "internal_account",
    "account_type": null,
    "party_name": "Modern Treasury",
    "party_type": null,
    "party_address": null,
    "account_details": [
      {
        "id": "aaf74f7e-d697-4a73-95a3-05bede2edce6",
        "object": "account_details",
        "account_number_safe": "2971",
        "account_number_type": null,
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      }
    ],
    "routing_details": [
      {
        "id": "a3649136-f8d2-46e8-8b41-327bd7da3110",
        "object": "routing_details",
        "payment_type": null,
        "routing_number": "021000021",
        "routing_number_type": "aba",
        "created_at": "2019-11-09T00:11:07Z",
        "updated_at": "2019-11-09T00:11:07Z"
      }
    ],
    "connection": {
      "id": "05487db0-e234-4ae8-914a-c627f76c987f",
      "object": "connection",
      "vendor_id": "example1",
      "vendor_name": "Gringotts Wizarding Bank",
      "created_at": "2019-11-09T00:11:07Z",
      "updated_at": "2019-11-09T00:11:07Z"
    },
    "created_at": "2019-11-09T00:11:07Z",
    "updated_at": "2019-11-09T00:11:07Z"
  }
]
```

You will receive an array of all your Internal Accounts.  For this example, we'll just use one of the account IDs to originate the Payment Order from. In this response, we'll use the first one, `0f8e3719-3dfd-4613-9bbf-c0333781b59f`.

> 📘 Sandbox Setup
>
> For more information on how we've set up your accounts, visit our [Sandbox Details](https://docs.moderntreasury.com/payments/docs/payments-sandbox-overview) guide.

## 2. Create a Counterparty

Counterparties need different information depending on how you want to use them.  In the case we want to send them money using an ACH transfer, we need to ensure the customer has both an `account_number` and a `routing_number`.

```shell Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Kenner, Bach and Ledeen",
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

Note that the response returns a new Counterparty object with 1 attached External Account. You will need the ID of the External Account (`5acec2ef-987b-4260-aa97-b719eeb0a8d5`) for the next step.

## 3. Create a Payment Order

To create a Payment Order, you will use your Internal Account ID (`0f8e3719-3dfd-4613-9bbf-c0333781b59f`) as the `originating_account_id` and the Counterparty's Account ID (`5acec2ef-987b-4260-aa97-b719eeb0a8d5`) as the `receiving_account_id`.

```shell Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "ach",
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
  "type": "ach",
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

This is the response you will see. It contains the ID of the Payment Order, `c5f4009c-bdd6-4cc1-84b2-17974ac9e77a`, as well as additional details about it.

## Optional: Handle post-creation events

Modern Treasury sends a number of useful events once your Payment Order is created.  Use the Dashboard, [Webhooks](/platform/reference/webhooks), or a third party solution to receive these events and perform actions like notifying the counterparty of the transfer, knowing when the Payment Order is complete, or determining when and why a return occurred.
# Simulate an Incoming Payment Detail

## Overview

In the Sandbox, you may wish to simulate workflows where you have received a *unoriginated* inbound payment in your bank account from an external party. For example, perhaps you'd like to simulate the receipt of an unoriginated inbound wire credit to your account.

This guide walks you through how to simulate these workflows using an [Incoming Payment Detail](https://docs.moderntreasury.com/platform/reference/incoming-payment-detail-object), so you can build the end-to-end experience in your application.

## 1. Create an Incoming Payment Detail

The first step is to [create](/platform/reference/simulate-incoming-payment-detail-1) an Incoming Payment Detail (IPD). You will use a *simulation* endpoint that creates the IPD asynchronously in your Sandbox, and notifies you via webhook if it was successfully created. Just as in production, you will receive a webhook from Modern Treasury when an IPD is created.

Here is an example of how to create the IPD against an Internal Account.

```curl Creating an IPD
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/simulations/incoming_payment_details/create_async \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "wire",
    "direction": "credit",
    "amount": 2000,
    "internal_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f"
  }'
```

You will receive the following successful API response from this endpoint, unless you pass in an invalid `internal_account_id`.

```json API response
{
  "object": "incoming_payment_detail",
  "id": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a"
}
```

## 2. Monitor for IPD created webhook

After enqueuing the IPD for creation in step 1, you must now monitor for the webhook to see if it was created successfully or not. There is a 1 minute delay before you receive the `created` webhook event.

If created successfully, you will receive the IPD in a webhook. This webhook will resemble what you see in production. The initial state of the IPD will be `pending` until it is reconciled to a transaction, which happens in step 3.

Please note that the exact schema within the `data` object may change depending on bank partner. The Sandbox simulates the data object from one of our [partners](https://docs.moderntreasury.com/payments/docs/banks), Increase.

```json Successful IPD webhook
{
  "event": "created",
  "data": {
    "id": "4844bda1-eb57-4129-afb4-fc663a395ca0",
    "object": "incoming_payment_detail",
    "internal_account_id": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a",
    "virtual_account_id": null,
    "transaction_line_item_id": null,
    "transaction_id": null,
    "type": "wire",
    "data": { // This field may contain PII and is not included in webhook event bodies by default
      "id": "sandbox_transaction_686898458",
      "date": "2021-05-07",
      "path": "/transactions/sandbox_transaction_686898458",
      "amount": 3100,
      "source": {
        "amount": 3100,
        "class_name": "inbound_wire_transfer",
        "description": "Doloremque ducimus blanditiis incidunt.",
        "originator_name": "Prof. Summer Lesch",
        "beneficiary_name": "Rachele Bergnaum DVM",
        "beneficiary_reference": "84624313903339570000",
        "originator_address_line1": "7953 Kessler Union",
        "originator_address_line2": "Suite 964",
        "originator_address_line3": "Richelleside",
        "beneficiary_address_line1": "713 Ivey Ports",
        "beneficiary_address_line2": "Suite 686",
        "beneficiary_address_line3": "Baileyborough",
        "input_message_accountability_data": "66872621214100990000",
        "originator_to_beneficiary_information_line1": "Alias earum fuga culpa.",
        "originator_to_beneficiary_information_line2": "null",
        "originator_to_beneficiary_information_line3": "null",
        "originator_to_beneficiary_information_line4": "null"
      },
      "route_id": "sandbox_account_route_1",
      "account_id": "sandbox_account_1296c413b83b",
      "description": "Doloremque ducimus blanditiis incidunt."
    },
    "amount": 10000,
    "currency": "USD",
    "direction": "credit",
    "status": "pending",
    "metadata": {},
    "as_of_date": "2020-10-17",
    "live_mode": true,
    "created_at": "2020-10-15T04:23:11Z",
    "updated_at": "2020-10-15T04:23:11Z"
  }
}
```

If the data provided in the original API call is invalid, you will receive a webhook to indicate it was not created.

```json Failed IPD webhook
{
  "event": "failed",
  "id": "4844bda1-eb57-4129-afb4-fc663a395ca0",
  "errors": {
    "code": "parameter_missing",
    "message": "Amount is required",
    "parameter": "amount"
  }
}
```

## 3. Monitor for IPD webhooks

In step 2, we showed how to simulate creating an IPD. Typically, you will receive an IPD a few hours to a day prior to a [Transaction](/platform/reference/transaction-object) posting in your bank account. Once a Transaction posts in your bank account, Modern Treasury automatically reconciles the IPD to the bank transaction. In the Sandbox, we simulate the Transaction creation and subsequent reconciliation.

You will receive webhooks on two different objects: the IPD and the Transaction.

Listen for the `completed` event on the IPD, to inform you that the IPD has been posted to your Internal Account. The `completed` webhook is detailed below.

```json Completed IPD webhook
{
  "event": "completed",
  "data": {
    "id": "4844bda1-eb57-4129-afb4-fc663a395ca0",
    "object": "incoming_payment_detail",
    "internal_account_id": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a",
    "virtual_account_id": null,
    "transaction_line_item_id": null,
    "transaction_id": null,
    "type": "wire",
    "data": { // This field may contain PII and is not included in webhook event bodies by default
      "id": "sandbox_transaction_686898458",
      "date": "2021-05-07",
      "path": "/transactions/sandbox_transaction_686898458",
      "amount": 3100,
      "source": {
        "amount": 3100,
        "class_name": "inbound_wire_transfer",
        "description": "Doloremque ducimus blanditiis incidunt.",
        "originator_name": "Prof. Summer Lesch",
        "beneficiary_name": "Rachele Bergnaum DVM",
        "beneficiary_reference": "84624313903339570000",
        "originator_address_line1": "7953 Kessler Union",
        "originator_address_line2": "Suite 964",
        "originator_address_line3": "Richelleside",
        "beneficiary_address_line1": "713 Ivey Ports",
        "beneficiary_address_line2": "Suite 686",
        "beneficiary_address_line3": "Baileyborough",
        "input_message_accountability_data": "66872621214100990000",
        "originator_to_beneficiary_information_line1": "Alias earum fuga culpa.",
        "originator_to_beneficiary_information_line2": "null",
        "originator_to_beneficiary_information_line3": "null",
        "originator_to_beneficiary_information_line4": "null"
      },
      "route_id": "sandbox_account_route_1",
      "account_id": "sandbox_account_1296c413b83b",
      "description": "Doloremque ducimus blanditiis incidunt."
    },
    "amount": 10000,
    "currency": "USD",
    "direction": "credit",
    "status": "completed",
    "metadata": {},
    "as_of_date": "2020-10-17",
    "live_mode": true,
    "created_at": "2020-10-15T04:23:11Z",
    "updated_at": "2020-10-15T04:23:11Z"
  }
}
```

The second webhook you will receive will be the `created`[webhook](/platform/reference/transactions) on the Transaction object. This will mirror the events you'd see in Production.

> 📘 Using the webhooks
>
> In many cases, our customers simply rely on the IPD webhooks. If you want to ignore the Transaction webhooks, that is safe to do and you may customize your event delivery options in the dashboard to exclude them.
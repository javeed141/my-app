# Simulate a Payment Order Failure

## Overview

Before making Payment Order requests in the Sandbox, you will need your [API Key](/platform/docs/retrieve-an-api-key), Organization ID, and an [Internal Account](https://docs.moderntreasury.com/payments/docs/sandbox-internal-accounts).

In your Sandbox, you may wish to simulate workflows where you have originated a [Payment Order](/platform/reference/payment-order-object) that fails. This guide walks you through how to simulate these workflows so you can build the end-to-end experience in your application.

Currently, you can simulate Payment Order failures for the following payment types: ACH, Wires, and RTP.

You will need to create the Counterparties using [special account number patterns](https://docs.moderntreasury.com/payments/docs/test-counterparties#example-requests-to-create-counterparties-for-simulations) that Modern Treasury recognizes for simulation.

### How Payment Orders are failed for a Counterparty in the Sandbox

The only requirement to fail a general Payment Order is to send it to a Counterparty with an account number `11111111X...X` (eg. `111111110`).

For information on the lifecycle of a Payment Order, see [this reference](/platform/reference/payment-orders).

## 1. Retrieve your Internal Account ID

To get an Internal Account ID, you can pick one from [your accounts page](https://app.moderntreasury.com/accounts).

If you want to retrieve all the Internal Accounts using the API , you can issue the following request:

```shell
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/internal_accounts
```

## 2. Retrieve the Counterparty External Account ID

Select the appropriate Counterparty for the failure situation you want to simulate ([creating it if needed](https://docs.moderntreasury.com/payments/docs/test-counterparties#example-requests-to-create-counterparties-for-simulations)).

You can fetch the Counterparty External Account ID either by:

* calling [List Counterparties API](https://docs.moderntreasury.com/platform/reference/list-counterparties) and extracting the `id` out of the relevant nested `external_account` within the response
* or navigating to the [Counterparties page](https://app.moderntreasury.com/counterparties) in the Modern Treasury UI, choosing the specific failure Counterparty detail page, and selecting the `id` of one of the bank accounts. **Note**: this is not the Counterparty `id`, but rather the `id` of one of its External Accounts.

## 3. Create a Payment Order

Now that you have both the `originating_account_id` (Internal Account ID) and the `receiving_account_id` (Counterparty External Account ID), you can [create the Payment Order](/platform/reference/payment-order-object):

```shell
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

## 4. Monitor for Webhook Events

Sandbox will mirror Production behavior for this scenario, including [webhook](https://docs.moderntreasury.com/platform/docs/webhooks-1) delivery; although the timing of the  status changes will differ from PRoduction.

Following the [Payment Order](/platform/reference/payment-orders) states and events, you will see these events in order: `approved`, `begin_processing` and then `failed`. Dependent on whether you are using the asynchronous or synchronous endpoint to create Payment Orders, you may also see the `created`  webhook before the Payment Order is approved.
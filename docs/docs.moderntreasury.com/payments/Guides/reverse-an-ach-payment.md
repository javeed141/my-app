# Reverse an ACH payment

## Overview

Modern Treasury can support the reversal of ACH Payment Orders. This is helpful in rectifying an error with a payment that has been sent to the bank.

There are strict NACHA rules that dictate if a payment can be reversed. The reversal must be sent to the bank within 24 hours of noticing the error and no later than 5 banking days after settlement. The payment originator must also reach out to the payment recipient to inform them a reversal is in progress. Finally there must be a valid reason for the reversal.

The NACHA rules dictate a payment may be reversed for the following reasons:

* Duplicate payment
* Incorrect payment recipient
* Incorrect payment amount
* Payment date earlier than intended (ACH debit only)
* Payment date later than intended (ACH credit only)

The reversal reasons listed above are the only reasons accepted by Modern Treasury.

In this guide, we will walk through an example of originating an ACH reversal.

*Note: ACH reversals are not standard for ACH integrations and are not available at all banks. For more details your can reach out to your Modern Treasury point of contact.*

## 1. Create the Reversal

The first step is to [Create a Reversal](https://docs.moderntreasury.com/payments/reference/create-reversal). The Reversal must adhere to the conditions noted in the overview section above.

```curl Creating a Reversal
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders/0f8e3719-3dfd-4613-9bbf-c0333781b59f/reversals \
  --header 'Content-Type: application/json' \
  --data '{"reason":"incorrect_amount"}'
```

This API call will return a response that includes the reversal object.

```json Response
{
  "id": "08c251e1-4cba-4706-8faa-9c2df2682aa3",
  "object": "reversal",
  "reason": "incorrect_amount",
  "payment_order_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "metadata": {},
  "live_mode": true,
  "created_at": "2021-01-28T00:11:07Z",
  "updated_at": "2021-01-28T00:11:07Z"
}
```

## 2. Monitor the Reversal

Once the reversal has been created, it will be transmitted to the bank prior to the next cutoff. You may monitor the reversal's status via the API or by subscribing to the [reversal webhooks](/platform/reference/reversals-1). If the reversal succeeds, you will receive a completed webhook event. If it fails, you will receive a failed webhook event. The reversal's state will be reflected in the status attribute on the reversal object as well.
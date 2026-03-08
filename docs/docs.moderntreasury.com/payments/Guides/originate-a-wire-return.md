# Originate a wire return

## Overview

Modern Treasury can support the origination of wire returns. This may be helpful in cases where you receive a wire transfer that you want to reject. Inbound wire transfers contains the relevant pieces of information that you would need to return the wire, such as the sender's account and routing number. Modern Treasury automatically parses this information so that the workflow for returning the wire is straightforward.

Returning a wire is relatively straightforward since wire transactions are irreversible. Once you've received a wire transfer in your bank account, the funds can't be pulled back by the sender. Therefore it is safe to send the funds back to them via a return.

In this guide, we will walk through an example of originating a wire return.

*Note:* *Wire returns are not standard for wires integrations and are not available at all banks. For more details your can reach out to your Modern Treasury point of contact.*

## 1. Identify an incoming payment detail to be returned

Before you can initiate a wire return, you need to have received an incoming payment detail. You may have been notified about the incoming payment detail via an `incoming_payment_detail.created` [webhook](/platform/reference/incoming-payment-details). You will need the ID of the incoming payment detail to create the return object. For the purposes of this guide, we will use the following sample incoming payment detail. The incoming payment detail ID is `0f8e3719-3dfd-4613-9bbf-c0333781b59f`.

```json Incoming Payment Detail object
{
  "id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "data": { // This field may contain PII and is not included in webhook event bodies by default
    "imad": "20210121L1B77D1C001602",
    "omad": "20210121GMQFMP0100602801210908",
    "reference": "20210210840500",
    "sender_aba": "121140399",
    "wire_amount": 10000,
    "currency_code": "USD",
    "originator_id": "1234567",
    "account_number": "987654321",
    "beneficiary_id": "987654321",
    "payment_method": "Fed",
    "originator_name": "BERKSHIRE HATHAWAY.",
    "beneficiary_name": "BERKSHIRE HATHAWAY.",
    "transaction_date": "2021-01-21",
    "reference_for_bank": "",
    "beneficiary_id_code": "D",
    "originator_address_1": "1 Main St",
    "originator_address_2": "10TH FLOOR",
    "originator_address_3": "SAN FRANCISCO, CA  94104",
    "wire_sequence_number": "45137763",
    "beneficiary_address_1": "2 Main St.",
    "beneficiary_address_2": "UNIT 12",
    "beneficiary_address_3": "US",
    "business_function_code": "CTR",
    "transaction_description": "I",
    "bank_to_bank_information": "",
    "originator_to_beneficiary_information": "16E1042F27E540E5                   /ROC/16E1042F27E540E5/OBI GOES HERE"
  },
  "type": "wire",
  "amount": 10000,
  "object": "incoming_payment_detail",
  "status": "pending",
  "currency": "USD",
  "metadata": {},
  "direction": "credit",
  "live_mode": true,
  "as_of_date": "2021-01-21",
  "created_at": "2021-01-21T17:05:39Z",
  "updated_at": "2021-01-21T17:05:39Z",
  "transaction_id": "00dea47c-2011-480d-ab02-44cfea7b2890",
  "virtual_account_id": null,
  "virtual_account": null,
  "internal_account_id": "07d61aca-e5ba-4008-b00d-cfca8d7c5290",
  "transaction_line_item_id": "9dde4e56-30a9-452e-a196-e0858c4dced5"
}
```

## 2. Create the return

Next, you can [create a return](https://docs.moderntreasury.com/payments/reference/create-return).

```shell Creating a return
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/returns \
  -H 'Content-Type: application/json' \
  -d '{
    "returnable_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "returnable_type": "incoming_payment_detail"
  }'
```

This API call will return a response that includes the return object.

```json Response
{
  "id": "08c251e1-4cba-4706-8faa-9c2df2682aa3",
  "object": "return",
  "returnable_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "returnable_type": "incoming_payment_detail",
  "transaction_line_item_id": null,
  "transaction_id": null,
  "type": "wire",
  "amount": 20000,
  "currency": "USD",
  "code": null,
  "reason": null,
  "live_mode": true,
  "status": "pending",
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```

## 3. Monitor the return

Once the return has been created, it will be transmitted to the bank prior to the next cutoff. You may monitor the return's status via the API or by subscribing to the [return webhooks](/platform/reference/returns). If the return succeeds, you will receive a `completed` webhook event. If it fails, you will receive a `failed` webhook event. If the originating return itself is returned by the RDFI, you will receive a `returned` webhook event. The status of the incoming payment detail will only move to `returned` once the return succeeds at the bank; otherwise, it will remain in whatever state it was when the return was created. The return's state will be reflected in the `status` attribute on the return object as well.

<br />
# Verify an account using a pre-note

## Overview

Modern Treasury supports the origination of ACH prenotifications (prenotes). [Learn more about prenotes](https://www.moderntreasury.com/learn/what-is-an-ach-prenote) in our Learn article.

A prenote or prenotification is a $0 ACH payment order used to validate the account and routing information of a counterparty before sending live transactions. They are an alternative to using microdeposits, and do not require the counterparty to take any action during verification. The disadvantage of prenotes is that they take some time to complete validation.

Payment Orders must have the following attributes to be considered an ACH Prenote:

| Attribute                   | Value   | Description                                                                                                          |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------- |
| **type**                    | `"ach"` | Type must be `ach`.                                                                                                  |
| **amount**                  | `0`     | Payment `amount` must be `0`.                                                                                        |
| **remittance\_information** | `null`  | The remittance information must be omitted, or set to `null` in order for a payment to be considered an ACH prenote. |

Live payments against the receiving account can begin on the third banking day after the prenote has settled provided that:

* no Return on the prenote has been received
* any changes from Notification of Change (NOC) Returns related to the prenote have been resolved

In this guide, we will walk through an example of originating an ACH prenote.

## 1. Create the Payment Order

**ACH prenotes are $0 ACH Payment Orders in Modern Treasury with no remittance information.** The first step is to [create a $0 payment order](https://docs.moderntreasury.com/payments/reference/create-payment-order).

```json JSON
{
  "type": "ach",
  "amount": 0,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
}
```

This API call will return a response that includes the payment order object.

```json Response
{
    "id": "82171186-519f-44d9-a2dd-9c5de4054797",
    "object": "payment_order",
    "type": "ach",
    "amount": 0,
    "direction": "credit",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "receiving_account": {
        "id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5",
        "object": "external_account",
        "account_type": "checking",
        "party_name": "John Smith",
        "party_type": null,
        "party_address": null,
        "account_details": [
            {
                "id": "3994463f-7652-4e4f-b9c6-9ee06427cccc",
                "object": "account_detail",
                "account_number_safe": "3334",
                "account_number_type": "other",
                "live_mode": true,
                "created_at": "2021-03-15T21:52:05Z",
                "updated_at": "2021-03-15T21:52:05Z"
            }
        ],
        "routing_details": [
            {
                "id": "c20c51e7-c4a7-4637-b6c9-8c0709667922",
                "object": "routing_detail",
                "payment_type": "sen",
                "routing_number": "021000021",
                "routing_number_type": "aba",
                "bank_name": "GOLIATH NATIONAL BANK",
                "bank_address": {
                    "id": "cc3cf074-00f6-456d-b3f8-e727de7f63f9",
                    "object": "address",
                    "line1": "36535 Nia Lane",
                    "line2": null,
                    "locality": "Watsicaview",
                    "region": "AR",
                    "postal_code": "93751-4071",
                    "country": "US",
                    "live_mode": true,
                    "created_at": "2021-03-15T21:52:05Z",
                    "updated_at": "2021-03-15T21:52:05Z"
                },
                "live_mode": true,
                "created_at": "2021-03-15T21:52:05Z",
                "updated_at": "2021-03-15T21:52:05Z"
            },
        ],
        "created_at": "2021-03-15T21:52:05Z",
        "updated_at": "2021-03-15T21:52:05Z",
        "name": null,
        "metadata": {},
        "live_mode": true,
        "verification_status": "unverified"
    },
    "receiving_account_id": "71fae619-afa6-45e6-8630-ce4d0b3d6387",
    "receiving_account_type": "external_account",
    "accounting_category_id": null,
    "accounting_ledger_class_id": null,
    "currency": "USD",
    "effective_date": "2021-04-02",
    "priority": "normal",
    "description": null,
    "statement_descriptor": null,
    "remittance_information": null,
    "metadata": {},
    "status": "approved",
    "counterparty_id": "928db55e-6552-4aaf-96d7-10c693922b1f",
    "transaction_ids": [],
    "charge_bearer": null,
    "foreign_exchange_indicator": null,
    "foreign_exchange_contract": null,
    "nsf_protected": false,
    "originating_party_name": null,
    "ultimate_originating_party_name": null,
    "ultimate_originating_party_identifier": null,
    "ultimate_receiving_party_name": null,
    "ultimate_receiving_party_identifier": null,
    "current_return": null,
    "reference_numbers": [],
    "live_mode": true,
    "created_at": "2021-04-02T02:35:00Z",
    "updated_at": "2021-04-02T02:35:00Z"
}
```

## 2. Monitor the prenote

Once the payment order has been created, it will be transmitted to the bank prior to the next cutoff. Note that originated prenotes will not show up as transactions in Modern Treasury, but the payment order's status will be updated (see below).

You may monitor the payment order's status via the API or by subscribing to the [Payment Orders webhooks](https://docs.moderntreasury.com/payments/reference/payment-orders).

* If no return is received within 3 business days following the payment order's effective date, Modern Treasury will complete the Payment Order and you may begin live transmission. Note that completed ACH Payment Orders may still be returned.

You can monitor for returns on the payment order by subscribing to the [Returns webhooks](https://docs.moderntreasury.com/payments/reference/returns).

* If the payment order is returned, you must correct the error denoted by the return code and submit a new prenote.
* If a Notice of Change (NOC) return is received, Modern Treasury will automatically update the counterparty data accordingly and will complete the prenote. You may begin live transmission.

## Sandbox

ACH prenotes are supported on the **Gringotts Wizarding Bank (GWB)** account. Prenotes at Gringotts will be completed every 15 minutes, as long as the current UTC time is on or after the prenote's effective date.

To simulate a return on an ACH prenote, see [Simulating an ACH Return](https://docs.moderntreasury.com/payments/docs/simulating-a-return).
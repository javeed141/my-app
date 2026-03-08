# Originate an ACH return

## Overview

Modern Treasury can support the origination of ACH returns. This may be helpful in cases where you are the receiving depository financial institution (RDFI) in a transaction and your bank account is credited or debited unexpectedly or incorrectly.

This guide will also work for originating returns against simulated incoming payment details (IPDs) created in the sandbox.

In most cases, there are rules that dictate how long you have to initiate a return. Returns must be received by the ODFI no later than the opening of business on the 2nd or 60th banking day following the settlement date of the original incoming payment detail. For example, let’s say an incoming payment detail has a settlement date of the 1st. To return the incoming payment detail, the return must be created in Modern Treasury by the cutoff time on the 2nd so that the ODFI will be notified on the morning of the 3rd.

* The following return codes can be used up to 60 days after the settlement date: `R05, R07, R10, R11, R33, R37, R38, R51, R52, R53`.
* The following return codes can be used up to 2 days after the settlement date: `R01, R02, R03, R04, R08, R09, R12, R14, R15, R16, R17, R20, R21, R22, R23, R24, R29, R39`.
* The following return codes can be used any number of days after the settlement date: `R06, R31`.

The return codes listed above are the only return codes accepted by Modern Treasury.

In this guide, we will walk through an example of originating an ACH return.

*Note: ACH returns are not standard for ACH integrations and are not available at all banks. For more details your can reach out to your Modern Treasury point of contact.*

## 1. Identify an Incoming Payment Detail to be returned

Before you can initiate an ACH return, you need to have received an Incoming Payment Detail. You may have been notified about the Incoming Payment Detail via an `incoming_payment_detail.created`  [webhook](/platform/reference/incoming-payment-details).

You will need the ID of the Incoming Payment Detail to create the Return object. For the purposes of this guide, we will use the following sample Incoming Payment Detail. The Incoming Payment Detail ID is `0f8e3719-3dfd-4613-9bbf-c0333781b59f`.

```json Incoming Payment Detail object
{
  "id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "object": "incoming_payment_detail",
  "internal_account_id": "487b9a5c-6737-43ea-b11c-593f39226b92",
  "virtual_account_id": null,
  "virtual_account": null,
  "transaction_line_item_id": null,
  "transaction_id": null,
  "type": "ach",
  "data": { // This field may contain PII and is not included in webhook event bodies by default
    "batch_header_record": {
      "service_class_code": "200",
      "standard_entry_class_code": "IAT",
      "company_entry_description": "EXAMPLE",
      "effective_entry_date": "2020-10-22",
      "settlement_date": 296,
      "originator_status_code": "1",
      "originating_dfi_identification": "098765431",
      "batch_number": "487",
      "iat_indicator": "",
      "foreign_exchange_indicator": "FF",
      "foreign_exchange_reference_indicator": "3",
      "foreign_exchange_reference": "",
      "iso_destination_country_code": "US",
      "originator_identification": "1234567890",
      "iso_originating_currency_code": "USD",
      "iso_destination_currency_code": "USD"
    },
    "detail_record": {
      "transaction_code": "22",
      "amount": 10000,
      "addenda_record_indicator": true,
      "trace_number": "999999999999999",
      "number_of_addenda_records": 10,
      "dfi_account_number": "99999",
      "gateway_operator_ofac_screening_indicator": "",
      "secondary_ofac_screening_indicator": "0"
    },
    "addenda_record": {
       "transaction_type_code": "MIS",
       "foreign_payment_amount": 0,
       "foreign_trace_number": "",
       "receiving_name": "EXAMPLE INC",
       "originator_name": "Jane Doe",
       "originator_street_address": "123 Main St",
       "originator_locality_and_region": "San Francisco*CA\\",
       "originator_country_and_postal_code": "US*94109\\",
       "originating_dfi_name": "Wells Fargo",
       "originating_dfi_identification_number_qualifier": "01",
       "originating_dfi_identification": "99999999",
       "originating_dfi_branch_country_code": "US",
       "receiving_dfi_name": "SILICON VALLEY BANK",
       "receiving_dfi_identification_number_qualifier": "01",
       "receiving_dfi_identification": "99999999",
       "receiving_dfi_branch_country_code": "US",
       "receiver_identification_number": "99999999",
       "receiver_street_address": "123 Main Street",
       "receiver_locality_and_region": "San Francisco*CA\\",
       "receiver_country_and_postal_code": "US*94107\\"
        },
    "payment_related_information": "Lorem Ipsum",
    "foreign_corresponent_bank_records": [
      {
        "foreign_correspondent_bank_name": "AS LHV Pank",
        "foreign_correspondent_bank_identification_number_qualifier": "02",
        "foreign_correspondent_bank_identification_number": "LHVBXX00",
        "foreign_correspondent_bank_branch_country_code": "EE"
      }
    ]
  },
  "amount": 10000,
  "currency": "USD",
  "direction": "debit",
  "status": "pending",
  "metadata": {},
  "as_of_date": "2020-10-17",
  "live_mode": true,
  "created_at": "2020-10-15T04:23:11Z",
  "updated_at": "2020-10-15T04:23:11Z"
}
```

## 2. Create the Return

Next, you can [create a Return](/platform/reference/create-return). The Return must adhere to the conditions noted in the overview section above.

```shell Creating a return
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/returns \
  -H 'Content-Type: application/json' \
  -d '{
    "returnable_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "returnable_type": "incoming_payment_detail",
    "code": "R01"
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
  "type": "ach",
  "amount": 20000,
  "currency": "USD",
  "code": "R01",
  "reason": null,
  "live_mode": true,
  "status": "pending",
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```

## 3. Monitor the Return

Once the return has been created, it will be transmitted to the bank prior to the next cutoff. You may monitor the return's status via the API or by subscribing to the [return webhooks](/platform/reference/returns). If the return succeeds, you will receive a `completed` webhook event. If it fails, you will receive a `failed` webhook event. The return's state will be reflected in the `status` attribute on the return object as well. The status of the incoming payment detail will only move to `returned` once the return succeeds at the bank; otherwise, it will remain in whatever state it was when the return was created.

When you create a return against a simulated incoming payment detail, the return will be processed exactly **1 minute** after being created to simulate a real-world delay between the creation of the return and its completion.
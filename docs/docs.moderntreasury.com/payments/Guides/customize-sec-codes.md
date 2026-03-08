# Customize SEC codes

Learn how to customize SEC codes for ACH payments

## Overview

A Standard Entry Class Code (SEC Code) is a way to classify an ACH payment. The following SEC Codes are supported by Modern Treasury when originating payment orders

| SEC Code                                | Definition                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PPD (Prearranged Payment and Deposit)   | A PPD entry is a credit or debit entry originated by an organization to a consumer’s account, based on standing or single-entry authorization from that consumer. A PPD entry supports including one addendum.                                                                                                                                                       |
| CCD (Corporate Credit or Debit)         | A CCD entry can be either a buyer-initiated or seller-initiated transaction used to move funds between the buyer’s and seller’s financial institution accounts. It is also used by companies to move funds from outlying depository locations to a central bank account. A CCD entry supports including one addendum and is typically used when paying for one item. |
| CTX (Corporate Trade Exchange)          | A CTX entry is similar to a CCD entry, but it supports including multiple addenda.                                                                                                                                                                                                                                                                                   |
| IAT (International ACH Transactions)    | An IAT entry is a debit or credit entry that is part of a payment transaction involving a financial agency’s office that is not located in the territorial jurisdiction of the United States.                                                                                                                                                                        |
| CIE (Customer-Initiated Entry)          | A CIE entry is a credit entry initiated on behalf of, and upon the instruction of, a consumer to transfer funds to a non-consumer Receiver.                                                                                                                                                                                                                          |
| WEB (Internet Initiated/Mobile Entries) | WEB entries are entries transmitted to a consumer Receiver’s account. These entries can be either debits or credits. WEB entries may be either recurring or non-recurring transactions.                                                                                                                                                                              |
| TEL (Telephone Initiated Entries)       | TEL Entries are initiated in response to a Receiver’s oral authorization that is spoken over the telephone. These Entries can be debit only.                                                                                                                                                                                                                         |

When Modern Treasury initiates an ACH payment on your behalf, the SEC Code is set automatically. When the receiving account's `party_type` is `individual`, the `PPD` code is used. When `party_type` is `business` or isn't set, `CCD` is used.

## Customizing SEC Codes

You may alter the SEC Code used for a payment order by altering the field `subtype`. In most cases, you can simply fill in the new subtype when creating a payment order:

```curl Initiating a WEB payment
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "ach",
    "subtype": "WEB",
    "amount": 1000,
    "direction": "credit",
    "currency": "USD",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```

## Using the CIE code

When using the `CIE` subtype, you must specify an `ultimate_originating_party_name` on the payment order. This should be the name of the person that the payment is on behalf of. Additionally, you must specify an `ultimate_originating_party_identifier` which the receiver can use to identify the purpose of the payment, such as an invoice number or customer number.

For example, imagine you were paying a utility bill on behalf of a user named Jane Doe. Jane's account number with her utility company is `A1823N`. In this case, the payment order request will look like this:

```curl Initiating a CIE payment
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "ach",
    "subtype": "CIE",
    "amount": 1000,
    "direction": "credit",
    "currency": "USD",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "ultimate_originating_party_name": "Jane Doe",
    "ultimate_originating_party_identifier": "A1823N",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```

Additionally, you may specify an `originating_party_name` which would represent the originator of the ACH payment. This may be helpful if you are originating payment on behalf of another business for that business' user.

For example, if you have a corporate customer named Acme Company that has to pay a bill on behalf of Jane Doe, the API call would then look like this:

```curl Initiating a CIE payment for another originator
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "ach",
    "subtype": "CIE",
    "amount": 1000,
    "direction": "credit",
    "currency": "USD",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "originating_party_name": "Acme Company",
    "ultimate_originating_party_name": "Jane Doe",
    "ultimate_originating_party_identifier": "A1823N",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```
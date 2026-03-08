# Send a check with an attachment

## Overview

When mailing a check to your counterparty, you may want to include attachments. These attachments can range from invoices to detailed remittance information.

We support including attachments for customers who mail checks via our integration with [Lob](https://docs.lob.com/#checks_create). Lob is a third party provider that can print and mail checks on your behalf.

This guide will walk through the steps for sending a check with an attachment.

## 1. Create a counterparty

First, you will create a counterparty with a valid mailing address.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
        "name": "John Smith",
        "accounts": [
            "party_address": {
                "line1": "1 Main St",
                "locality": "San Francisco",
                "region": "CA",
                "postal_code": "94105",
                "country": "USA"
            }
          }
        ]
      }'
```

```json Response
{
    "id": "46815130-99f3-44a7-8bb2-f253834ca4aa",
    "object": "counterparty",
    "live_mode": true,
    "name": "John Smith",
    "email": null,
    "send_remittance_advice": false,
    "metadata": {},
    "accounts": [
        {
            "id": "40af5496-c8e8-4766-bcc4-7bd08a866c7a",
            "object": "external_account",
            "live_mode": true,
            "account_type": "other",
            "party_name": "John Smith",
            "party_type": null,
            "party_address": {
                "id": "f936503f-9291-42fa-ade8-e125faf89d6b",
                "object": "address",
                "live_mode": true,
                "line1": "1 Main St",
                "line2": null,
                "locality": "San Francisco",
                "region": "CA",
                "postal_code": "94105",
                "country": "US",
                "created_at": "2021-09-03T17:12:35Z",
                "updated_at": "2021-09-03T17:12:35Z"
            },
            "account_details": [],
            "routing_details": [],
            "name": null,
            "metadata": {},
            "verification_status": "unverified",
            "discarded_at": null,
            "created_at": "2021-09-03T17:12:35Z",
            "updated_at": "2021-09-03T17:12:35Z"
        }
    ],
    "discarded_at": null,
    "created_at": "2021-09-03T17:12:35Z",
    "updated_at": "2021-09-03T17:12:35Z"
}
```

Note that the response returns a new Counterparty object with 1 attached external account. You will need the ID of the external account (`40af5496-c8e8-4766-bcc4-7bd08a866c7a`) for the next step.

## 2. Create a payment order

The next step is to create a payment order, which will mail the check. Normally, you would use `application/json` as your content type for submitting a POST request. However, in order to include the attachment, you must send a `multipart/form-data` request. This will allow you to both include the required parameters for creating the payment order and create the associated documents.

In order for the document to be sent to Lob, you must give it a `document_type` of `payment_order_supplement`. At most one document may be sent to Lob. If you create more than one, the most recently created one will be sent.\
Further, you must ensure that the document adheres to Lob's requirements for attachments, which can be found in their API docs [here](https://docs.lob.com/#checks_create). We have copied relevant snippets below as well for convenience:

```
Accepts a remote URL or a local upload of an HTML, PDF, PNG, or JPG file. Remote URLs have a 20 MB file size limit and must be downloaded within 40 seconds. All pages of PDF, PNG, and JPGs must be sized at 8.5"x11" at 300 DPI. If a PDF is provided, it must be 6 pages or fewer. The attachment will be printed double-sided in black & white and will be included in the envelope after the check page.
```

Here are their [design guidelines](https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/check_attachment_template.pdf).

If these requirements are not adhered to, then your payment order will fail when it is sent to Lob. Currently, Modern Treasury does not enforce the requirements as outlined by Lob.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: multipart/form-data' \
  -F type=check \
  -F amount=1000 \
  -F direction=credit \
  -F originating_account_id=fdf03820-5d8d-4044-abe4-f3ed07995c43 \
  -F receiving_account_id=6d093e6d-1241-4d6e-84ee-b771fc2b4aad \
  -F documents[][document_type]=payment_order_supplement \
  -F documents[][file]=<file>
```
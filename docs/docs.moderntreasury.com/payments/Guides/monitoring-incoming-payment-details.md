# Monitoring Incoming Payment Details

Receiving incoming payments into a Virtual Account allows you to easily segment and categorize transactions in a specific account.

## Prepare for an incoming payment

Before an incoming payment is made, you need to [create a Virtual Account](/platform/reference/create-virtual-account). Once the Virtual Account is created, make sure your payment originator has two things:

1. The virtual account number eg. `2000001`
2. The virtual account routing number eg. `121141822`

You can grab these details through the UI or within the API response when you create a Virtual Account. When you are creating nested Internal Accounts, the account number and routing number of that Internal Account will be the details you provide to the payment originator.

You can find the account number and routing number in the [Account Details](/platform/reference/account-detail-object)  and [Routing Details](/platform/reference/routing-detail-object) fields.

## Lifecycle of an incoming payment

Modern Treasury represents incoming payments in the form of [Incoming Payment Details (IPDs)](/platform/reference/incoming-payment-detail-object). The IPD will include details about the transaction that is about to hit your bank account, such as the settlement date of the payment. IPDs may arrive days before the transaction actually hits your account, like in payroll.

1. When the payment is initiated and in-flight, you will receive an Incoming Payment Detail `created` webhook event containing relevant pieces of payment information below.

2. When the transaction first appears in your account statements, you will receive an `tentatively_reconciled` webhook. This means that you have a *pending* transaction in your bank account that is tentatively being matched to the incoming payment you received.

3. Finally, you will receive `completed` and `reconciled` webhooks when the transaction posts in your bank account and the IPD is reconciled to that transaction respectively. This typically occurs the following banking day.

The webhook body of the IPD will include the  `virtual_account` that it was sent to. If you're using [Nested Internal Accounts](/payments/docs/creating-nested-internal-accounts), the `internal_account_id` will be the reference to the account that the payment was sent to. The `virtual_account` will be unpopulated in this scenario.

Here is a sample body of the webhook when you receive the first `created` event.

```json Incoming Payment Detail
{
  "event": "created",
  "data": { // This field may contain PII and is not included in webhook event bodies by default
    "id": "4844bda1-eb57-4129-afb4-fc663a395ca0",
    "object": "incoming_payment_detail",
    "internal_account_id": "487b9a5c-6737-43ea-b11c-593f39226b92",
    "virtual_account_id": "fd3c1f59-6d5b-466c-9126-7f8c82ad6e1c",
    "virtual_account": {
      "id": "fd3c1f59-6d5b-466c-9126-7f8c82ad6e1c",
      "object": "virtual_account",
      "name": "Funds on behalf of Alice Jones",
      "description": null,
      "counterparty_id": null,
      "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd",
      "debit_ledger_account_id": null,
      "credit_ledger_account_id": null,
      "account_details": [
        {
          "id": "5668c0cf-972d-49c6-970f-b32591f3e8a6",
          "object": "account_detail",
          "account_number": "2000001",
          "account_number_type": "other"
        }
      ],
      "routing_details": [
        {
          "id":"5ceb251f-0235-48a2-81cb-0c668f5ee81b",
          "object": "routing_detail",
          "payment_type": null,
          "routing_number": "121141822",
          "routing_number_type": "aba",
          "bank_name": "BANK OF AMERICA CALIFORNIA, NA",
          "bank_address": {
            "id": "2f1e12dd-de80-44aa-92cd-f0e4101b8e54",
            "object": "address",
            "line1": "PO BOX 27025",
            "line2": null,
            "locality": "RICHMOND",
            "region": "VA",
            "postal_code": "23261-7025",
            "country": "US",
            "live_mode": true,
            "created_at": "2019-11-09T00:11:07Z",
            "updated_at": "2019-11-09T00:11:07Z"
          },
          "live_mode": true,      
          "created_at": "2019-11-09T00:11:07Z",
          "updated_at": "2019-11-09T00:11:07Z"
        }
      ],
      "metadata": {},
      "live_mode": true,
      "created_at": "2020-11-09T00:11:07Z",
      "updated_at": "2020-11-09T00:11:07Z"    
    },
    "transaction_line_item_id": null,
    "transaction_id": null,
    "type": "ach",
    "data": {
      "batch_header_record": {
        "batch_number": "999",
        "company_name": "moderntreasury.com",
        "settlement_date": 17,
        "service_class_code": "200",
        "effective_entry_date": "2019-01-30",
        "company_identification": "9999999999",
        "originator_status_code": "1",
        "company_descriptive_date": "",
        "company_entry_description": "moderntreasury.co",
        "standard_entry_class_code": "CCD",
        "company_discretionary_data": "",
        "originating_dfi_identification": "99999999"
      },
      "detail_record": {
        "amount": 10000,
        "trace_number": "999999999999999",
        "transaction_code": "27",
        "dfi_account_number": "99999",
        "discretionary_data": "",
        "identification_number": "moderntreasury.com",
        "receiving_company_name": "EXAMPLE INC",
        "addenda_record_indicator": true
      },
      "payment_related_information": "Lorem Ipsum",
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
}
```

> 📘 Simulating in the Sandbox
>
> You can [simulate the entire cycle of an Incoming Payment Detail](/payments/docs/simulating-an-incoming-payment-detail) for a virtual account within the sandbox.
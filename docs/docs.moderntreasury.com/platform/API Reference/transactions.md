# Transaction Webhooks

| Event          | Description                                                                    |
| :------------- | :----------------------------------------------------------------------------- |
| **created**    | A transaction has been created.                                                |
| **reconciled** | A transaction has been reconciled.                                             |
| **updated**    | A transaction has been updated (e.g. `metadata` modified, or `details` added). |

```json Sample Reconciled Transaction Webhook
{
  "event": "reconciled",
  "data": {
    "id": "30dd4826-732f-4fe5-ab15-fc903f85ffdd",
    "object": "transaction",  
    "amount": 400000,
    "posted": true,
    "direction": "credit",
    "type": "ach",  
    "as_of_date": "2019-12-12",
    "as_of_time": null,
    "created_at": "2019-12-12T23:01:17Z",
    "currency": "USD",
    "details": {},
    "internal_account_id": "b9fc1ae0-d493-4f01-a7b3-b39104e802b5",
    "metadata": {},
    "custom_identifiers":{
      "buyer_email_address": "jennifer.dough@email.com",
      "payment_id": "abc123"
    },
    "reconciled": true,
    "updated_at": "2019-12-12T23:01:32Z",
    "vendor_code": "142",
    "vendor_code_type": "bai2",
    "vendor_customer_id": null,
    "vendor_description": "ACH PAYMENT",
    "vendor_id": null
  }
}
```

```json Sample RTP Transaction Webhook
{
  "event": "reconciled",
  "data": {
    "id": "b5b721f3-5617-4b4c-bf3d-933684916e15",
    "type": "rtp",
    "amount": 1200,
    "object": "transaction",
    "posted": true,
    "currency": "USD",
    "metadata": {},
    "direction": "credit",
    "live_mode": true,
    "vendor_id": "transaction_xyz",
    "as_of_date": "2022-10-02",
    "as_of_time": "10:21",
    "created_at": "2022-10-02T19:11:17Z",
    "reconciled": true,
    "updated_at": "2022-10-02T19:11:18Z",
    "vendor_code": "inbound_real_time_payments_transfer_confirmation",
    "discarded_at": null,
    "vendor_code_type": "bnk_dev",
    "vendor_customer_id": null,
    "internal_account_id": "08bcd6be-fee7-4723-872d-e0858a0ac196"
  }
}
```
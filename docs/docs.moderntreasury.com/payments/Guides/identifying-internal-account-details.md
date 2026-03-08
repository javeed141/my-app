# Retrieving Internal Account Details

If you want to receive a payment into an Internal Account you will need to retrieve your Internal Account Details, such as account number and routing number, from Modern Treasury either via API or via the Modern Treasury App. Ensure you have gone through the steps to onboard an [Individual](onboard-an-individual) or [Business](onboard-a-business) and opened an Internal Account before proceeding.

# Using Webhooks to Retrieve  Internal Account Details

Ensure you are subscribed to `internal_account` [Webhooks](https://docs.moderntreasury.com/platform/reference/webhooks).  By default, you will only receive the last four digits of your account number in Webhook responses.  If you prefer to receive the entire account number (for example, if you want to pass on the account number to a counterparty to receive a payment), ensure [Data Privacy](https://docs.moderntreasury.com/platform/docs/data-privacy-controls-1) settings are turned off.

After creating an Internal Account, you will receive an `internal_account.activated` Webhook.  An example is below:

```json
{
"id":"dwshch37-82fc-4e3a-9ffc-eda83faf20f6",
"name":"Your Company",
"object":"internal_account",
"status":"active",
"currency":"USD",
"metadata":{},
"live_mode":true,
"vendor_id":"38fksgn8-5e60-358g-a7f4-sgj38gf93146",
"connection":{
"id":"f3a7c2d9-8e41-4b29-9c73-2f6d8a1b5e94",
"object":"connection",
"live_mode":true,
"vendor_id":"mt",
"created_at":"2025-09-11T19:43:27Z",
"updated_at":"2025-11-20T19:41:41Z",
"vendor_name":"Modern Treasury Flow of Funds",
"discarded_at":null,
"vendor_customer_id":"7d2e9b58-3c14-4f6a-8a92-e5b6f4c8d1a3"
},
"created_at":"2025-12-17T20:39:49Z",
"party_name":"Your Company",
"party_type":null,
"updated_at":"2025-12-17T20:57:39Z",
"account_type":"other",
"party_address":null,
"account_details":[
0:{
"id":"a4c8e6f2-9b37-4d81-b5e9-3f7a2c4d8e91",
"object":"account_detail",
"live_mode":true,
"created_at":"2025-12-17T20:57:39Z",
"updated_at":"2025-12-17T20:57:39Z",
"discarded_at":null,
"account_number":"1234567898",
"account_number_safe":"7898",
"account_number_type":"other"
}
],
"counterparty_id":null,
"legal_entity_id":"6b9d3f7e-4a82-4c15-9e6b-8d1f5a7c2e94",
"routing_details":[
0:{
"id":"e2f5a8c7-6d49-4b3e-a7d2-9f4e1b8c5a36",
"object":"routing_detail",
"bank_name":"Cross River Bank",
"live_mode":true,
"created_at":"2025-12-17T20:57:39Z",
"updated_at":"2025-12-17T20:57:39Z",
"bank_address":{
"id":"828b00a4-4ec4-4a16-8351-34608da1f6fa",
"line1":"2115 Linwood Ave",
"line2":null,
"object":"address",
"region":"NJ",
"country":"US",
"locality":"Fort Lee",
"live_mode":true,
"created_at":"2025-12-02T21:31:31Z",
"updated_at":"2025-12-02T21:31:31Z",
"postal_code":"07024"
},
"discarded_at":null,
"payment_type":null,
"routing_number":"021214891",
"routing_number_type":"aba"
}
],
"ledger_account_id":null,
"parent_account_id":null,
"account_capabilities":[
0:{
"id":"c9a4d7f1-2e68-4b9c-b3f5-7a1e9d4c6b82",
"object":"account_capability",
"direction":"credit",
"live_mode":true,
"created_at":"2025-12-17T20:57:39Z",
"identifier":null,
"updated_at":"2025-12-17T20:57:39Z",
"discarded_at":null,
"payment_type":"wire"
},
1:{
"id":"5f8c2a6d-7b31-4e94-a2c8-d9e4f6b1a735",
"object":"account_capability",
"direction":"credit",
"live_mode":true,
"created_at":"2025-12-17T20:57:39Z",
"identifier":null,
"updated_at":"2025-12-17T20:57:39Z",
"discarded_at":null,
"payment_type":"ach"
},
2:{
"id":"b3e7f4a9-5c26-4d81-9f6e-2a8d7c1b4e59",
"object":"account_capability",
"direction":"debit",
"live_mode":true,
"created_at":"2025-12-17T20:57:39Z",
"identifier":null,
"updated_at":"2025-12-17T20:57:39Z",
"discarded_at":null,
"payment_type":"ach"
},
3:{
"id":"d8a1c5e9-4f72-4b36-8e2a-6b9f3d7c1a84",
"object":"account_capability",
"direction":"credit",
"live_mode":true,
"created_at":"2025-12-17T20:57:39Z",
"identifier":null,
"updated_at":"2025-12-17T20:57:39Z",
"discarded_at":null,
"payment_type":"rtp"
}
],
"contra_ledger_account_id":null
}
```

You can pass the following information on to your counterparty to receive a payment:

> Account number: 1234567898
>
> Routing number: 021214891
>
> Name on account: Your Company

# Polling the API to Retrieve Internal Account Details

Use the ID from the Internal Account you created to call the Internal Account API:

```json
curl --request GET \
     -u ORGANIZATION_ID:API_KEY \
     --url https://app.moderntreasury.com/api/internal_accounts/7355aaa7-1be9-4b6a-b0f7-2d67eeae0666 \
--header 'accept: application/json'
```

Here is a sample response payload:

```json
{
  "id": "7355aaa7-1be9-4b6a-b0f7-2d67eeae0666",
  "object": "internal_account",
  "live_mode": true,
  "account_type": null,
  "party_name": "Your Company",
  "party_type": null,
  "party_address": {
    "id": "1655db64-7c75-4f91-bf9d-6ff5af8a8f14",
    "object": "address",
    "live_mode": true,
    "line1": "1994 Wyman Islands",
    "line2": "Suite 337",
    "locality": "North Marianoland",
    "region": "SC",
    "postal_code": "24640-3149",
    "country": "US",
    "created_at": "2022-08-30T21:47:29Z",
    "updated_at": "2022-08-30T21:47:29Z"
  },
  "account_details": [
    {
      "id": "d1029673-e5ef-489d-aeba-c4bdf71e1e53",
      "object": "account_detail",
      "live_mode": true,
      "account_number": "1234567898",
      "account_number_type": "other",
      "discarded_at": null,
      "created_at": "2022-08-30T21:47:29Z",
      "updated_at": "2022-08-30T21:47:29Z"
    }
  ],
  "routing_details": [
    {
      "id": "d04ff7bd-9c41-4d3f-b396-068107997e73",
      "object": "routing_detail",
      "live_mode": true,
      "payment_type": null,
      "routing_number": "021214891",
      "routing_number_type": "aba",
      "bank_name": "Cross River Bank",
      "bank_address": {
        "id": "28d54680-7b1c-45da-949d-5f322701241d",
        "object": "address",
        "live_mode": true,
        "line1": "1111 Polaris Parkway",
        "line2": null,
        "locality": "Columbus",
        "region": "OH",
        "postal_code": "43240",
        "country": "US",
        "created_at": "2022-08-30T21:47:29Z",
        "updated_at": "2022-08-30T21:47:29Z"
      },
      "discarded_at": null,
      "created_at": "2022-08-30T21:47:29Z",
      "updated_at": "2022-08-30T21:47:29Z"
    }
  ],
  "name": "Expenses",
  "metadata": {},
  "connection": {
    "id": "d44f7ff2-9899-4331-84de-2e4e7cdb8fb3",
    "object": "connection",
    "live_mode": true,
    "vendor_id": "mt",
    "vendor_name": "Modern Treasury Flow of Funds",
    "vendor_customer_id": null,
    "discarded_at": null,
    "created_at": "2022-08-30T21:47:29Z",
    "updated_at": "2022-08-30T21:47:29Z"
  },
  "currency": "USD",
  "parent_account_id": null,
  "counterparty_id": null,
  "created_at": "2022-08-30T21:47:29Z",
  "updated_at": "2022-08-30T21:47:29Z"
}
```

You can pass the following information on to your counterparty to receive a payment:

> Account number: 1234567898
>
> Routing number: 021214891
>
> Name on account: Your Company
>
> Party Address: 1994 Wyman Islands, Suite 337, North Marianoland, SC, 24640

<br />

# Using the UI to Retrieve Internal Account Details

You can also view Internal Account details in the Modern Treasury Application.

* Navigate to the Cash Management Tab.
* Click on the Accounts tab and find the Internal Account you just created.
* Click on the Details tab to find the Internal Account details.

<br />
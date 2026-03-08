# Quick Start - Commercial Revolving Credit

Lithic provides a robust suite of configuration options including interest categories, billing periods, fees, credit limits and much more.

**You will complete the following steps in this guide:**

1. Enroll a business customer
2. Set the credit configuration for that business account
3. Enroll employees in that business
4. Issue credit cards to those employees
5. Transact
6. Generate a statement
7. Perform a management operation
8. Make a payment

### **1. Enroll business customer**

When your API key is provisioned and your program is set up, Lithic automatically creates a default account and `ISSUING` financial accounts for your program.

To add business clients, start by creating a **Business Account Holder**. This step generates an associated account and an `ISSUING` financial account specifically for that business.

For more details on Lithic's KYC and KYB processes, see our guides on [Account Holders (Individuals)](https://docs.lithic.com/docs/account-holders-kyc) and [Account Holders (Businesses)](https://docs.lithic.com/docs/account-holders-kyb).

Send a `POST` request to [Create Business Account Holder](https://docs.lithic.com/reference/postaccountholders):

```jsx
curl https://api.lithic.com/v1/account_holders
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
   "workflow": "KYB_BYO",
   "tos_timestamp": "2025-01-13T00:00:00Z",
   "business_entity": {
      "legal_business_name": "New Coffee Shop",
      "government_id": "000003333",
      "address": {
          "address1": "456 Main Street",
          "city": "New York",
          "state": "NY",
          "postal_code": "10128",
          "country": "USA"
      },
      "phone_numbers": ["+15555555555"]
   },
   "website_url": "newcoffeeshop.com",
   "kyb_passed_timestamp": "2025-01-14T00:00:00Z",
   "nature_of_business":"Retail store selling coffee gear",
   "control_person": {
      "first_name": "Johnny",
      "last_name": "AppleSeed",
      "dob": "1990-06-28",
      "phone_number": "+15555555555",
      "email": "johnny@appleseed.com",
      "government_id": "000003333",
      "address": {
         "address1": "123 Main Street",
         "postal_code": "10128",
         "city": "New York",
         "state": "NY",
         "country": "USA"
        }
      },
   "beneficial_owner_individuals": [
      {
         "first_name": "Mary",
         "last_name": "AppleSeed",
         "dob": "1991-06-28",
         "phone_number": "+15555555556",
         "email": "mary@appleseed.com",
         "government_id": "000004444",
         "address": {
            "address1": "789 Main Street",
            "postal_code": "10128",
            "city": "New York",
            "state": "NY",
            "country": "USA"
         }
      }
   ]
}
'
```

Below is a sample response:

```jsx
{
    "account_token": "80aad00c-26e4-48d8-beaa-1d5adbb22ad5",
    "status": "ACCEPTED",
    "status_reasons": [],
    "token": "e95ac4e2-2905-492e-9e27-88a15ed97bc9",
    "created": "2025-05-23T18:38:17.471790",
    "required_documents": []
}
```

### 2. Set Credit Configuration to Client’s Business Account

At this point, the issuing financial account for the business client has been created. You can view this account by sending a `GET` request to [List Financial Accounts](https://docs.lithic.com/docs/financial-accounts#list-financial-accounts).

You are now ready to associate the credit configuration to the business account you just created. You will need:

1. the credit product token you received from your implementations specialist
2. the credit tier you want to associate with this business, defined in the credit configuration. For this guide we will associate TIER\_1 with this business account.
3. credit limit you want to set for this business

To link credit configurations to the business account send a `POST` request to the financial account:

```jsx
curl https://api.lithic.com/v1/financial_accounts/:financial_account_token/credit_configuration
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
    "credit_limit": 1000,
    "credit_product_token": "2nqUhyNoCAovReAIa6HNFCsWroH",
    "tier": "TIER_1"
}
 '
```

**Response:**

```jsx
{
    "account_token": "6617a88e-d8b1-42e7-a4da-9ce4cb8923c5",
    "credit_limit": 1000,
    "external_bank_account_token": null,
    "credit_product_token": "2nqUhyNoCAovReAIa6HNFCsWroH",
    "tier": "TIER_1",
    "financial_account_state": "CURRENT",
    "is_spend_blocked": null
}
```

Notice, the financial account status is now `CURRENT`. A financial account will remain `PENDING` until the credit configuration is associated with the financial account.

### 3. Enroll Employees

Before you can issue cards, you will enroll the business's employees and link them to the business using the `business_account_token`. To keep this guide simple lets assume you will enroll customer KYC exempt. You will work with you implementation specialist to support the right KYC approach for your specific use case.

Send a `POST` request to [Create Account Holder](https://docs.lithic.com/reference/postaccountholders):

```jsx
curl https://api.lithic.com/v1/account_holders
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "workflow": "KYC_EXEMPT",
  "address": {
    "address1": "123 Old Forest Way",
    "city": "Omaha",
    "country": "USA",
    "postal_code": "68022",
    "state": "NE"
  },
  "business_account_token": "80aad00c-26e4-48d8-beaa-1d5adbb22ad5",
  "email": "tom@middle-earth.com",
  "first_name": "Tom",
  "kyc_exemption_type": "AUTHORIZED_USER",
  "last_name": "Bombadil",
  "phone_number": "+12124007676"
}
'
```

Response:

```jsx
{
    "account_token": "fabcc209-1ce8-4183-bd61-2f8c9327ec99",
    "status": "ACCEPTED",
    "status_reasons": [],
    "token": "089834e8-5229-4f39-ae3a-914643f145a6",
    "created": "2025-05-23T19:24:51.823475"
}
```

### 4. Issue credit cards to those employees

Now that you have enrolled your business customer in the program, set the credit card product config to the business account and enroll individual account holders. You can now issue cards to those account holders (employees of your business customer).

Create a card for that account holder so that they can start spending on their company credit card. All card transactions taking place on physical and virtual cards associated with the employee’s account will count against the credit limit of the overall business. **Individual employees do not have their own credit limit**. Instead, individual account holder spend can be managed with Lithic's spend limits [Auth Rules and ASA.](https://docs.lithic.com/docs/auth-stream-access-asa)

Send a `POST` request to [Create Card](https://docs.lithic.com/reference/postcards) to create a virtual card:

```jsx
curl https://api.lithic.com/v1/cards \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
     "type": "VIRTUAL",
     "memo": "New Card",
     "spend_limit": 1000,
     "spend_limit_duration": "TRANSACTION",
     "state": "OPEN",
     "account_token": "fabcc209-1ce8-4183-bd61-2f8c9327ec99" ,
}
'
```

Below is a sample response:

```jsx
{
    "created": "2025-05-23T19:28:20Z",
    "token": "7b9e7666-1b54-4577-b75b-53a48052c18f",
    "last_four": "4713",
    "hostname": "",
    "memo": "New Card",
    "type": "VIRTUAL",
    "exp_month": "10",
    "exp_year": "2030",
    "spend_limit": 1000,
    "spend_limit_duration": "TRANSACTION",
    "state": "OPEN",
    "funding": null,
    "auth_rule_tokens": [],
    "replacement_for": null,
    "replacement_account_token": null,
    "card_program_token": "2nqUhyNoCAovReAIa6HNFCsWroH",
    "account_token": "8b143846-d7a2-49cb-9163-94a3e8178e5e",
    "product_id": null,
    "digital_card_art_token": null,
    "cardholder_currency": "USD",
    "pin_status": "NOT_SET",
    "pending_commands": []
}
```

### 5. Transact

As employees transact with their cards, you can view a list of transactions that have occurred with [Financial Transactions](https://docs.lithic.com/docs/financial-transactions). A financial transaction tells you the state of a transaction as it moves through its lifecycle and transaction events occur.

Let’s take a closer look at Financial Transactions. Assume the following events have occurred with one of your end-users:

* June 15: $20 was authorized at Merchant ABC
* June 15: $70 was authorized at Merchant XYZ
* June 16: $70 was cleared at Merchant XYZ (i.e., the transaction’s final amount was $70)

Send a `GET` request to [List Financial Transactions](https://docs.lithic.com/docs/financial-transactions#list-financial-transactions) to retrieve all transactions between June 14 and June 16 2023:

```jsx
curl https://api.lithic.com/v1/financial_accounts/c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6/financial_transactions?begin=2023-06-14T00%3A00%3A00&end=2023-06-17T00%3A00%3A00 \
  -H "Authorization: YOUR_API_KEY"
```

This should return a response with two results. The first result would be the $20 authorization at Merchant ABC. It has a state of `PENDING` and the `pending_amount` is the full $20. The `settled_amount` remains at $0 until the transaction has been finalized by the merchant.

```jsx
{
    "data": [
	 {
	  "category": "CARD",
	  "status": "PENDING",
	  "result": "APPROVED",
	  "token": "c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6",
	  "settled_amount": 0,
	  "pending_amount": -2000,
	  "currency": "USD",
	  "events": [
	    {
	      "amount": -2000,
	      "type": "CARD_AUTHORIZATION",
	      "result": "APPROVED",
	      "created":  "2025-06-15T17:48:48Z",
	      "token": "99945678-aa69-4cbc-af4p-30d90181b111"
	    }
	  ],
	  "descriptor": "Merchant ABC",
	  "created": "2023-06-15T17:48:48Z",
	  "updated": "2023-06-15T17:48:48Z"
	},
	{
	  "category": "CARD",
	  "status": "SETTLED",
	  "result": "APPROVED",
	  "token": "9b8497cb-6ff7-413e-a5a8-a09c906b2b12",
	  "pending_amount": 0,
	  "settled_amount": -7000,
	  "currency": "USD",
	  "events": [
	    {
	      "amount": -7000,
	      "type": "AUTHORIZATION",
	      "result": "APPROVED",
	      "created":  "2025-06-15T18:48:48Z",
	      "token": "11145678-aa69-4cbc-a946-30d90181cccc"
	    },
	    {
	      "amount": -7000,
	      "type": "CLEARING",
	      "result": "APPROVED",
	      "created":  "2023-06-16T17:48:48Z",
	      "token": "8d4f88f0-16e9-4755-832e-b09f00c587fc"
	    }
	  ],
	  "descriptor": "Merchant XYZ",
	  "created": "2023-06-15T17:48:48Z",
	  "updated": "2023-06-16T17:48:48Z"
	}
],
    "has_more": false
}

```

For more information on the different states of a transaction, please refer to our [Financial Transactions guide](https://docs.lithic.com/docs/financial-transactions). For more details on the card transaction lifecycle, please refer to our [Transaction Flow guide](https://docs.lithic.com/docs/transaction-flow).

As the spend occurs on the cards, it will accumulate a balance. You can check the balance of the business client's issuing financial account using [Get Balances](https://docs.lithic.com/docs/balances#get-balances):

```jsx
curl https://api.lithic.com/v1/financial_accounts/12345678-aa69-4cbc-a946-30d90181b621/balances \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```jsx

{
 "data": [
    {
      "financial_account_type": "ISSUING",
      "financial_account_token": "c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6",
      "currency": "USD",
      "available_amount": -7000,
      "pending_amount": -2000,
      "total_amount": -9000,
      "created": "2025-06-10T17:48:48Z",
      "updated": "2025-06-13T17:48:48Z",
      "last_transaction_token": "9b8497cb-6ff7-413e-a5a8-a09c906b2b12",
      "last_transaction_event_token": "8d4f88f0-16e9-4755-832e-b09f00c587fc"
    }
 ],
  "has_more": false,
}
```

The available balance of -$90 indicates $90 of the $1000K credit limit has been utilized. The total amount of -$70 indicates the total settled amount that would be repaid via auto-collections

### 6. Generate Statements

Lithic provides the ability for customers to retrieve statements via API. After a billing period elapses, a statement is generated.

Statements are ***immutable***. Any updates to transactions, such as a clearing of a payment, after statement has already generated will reflect in the following periods balances. We cannot make changes to statements after they have been created.

Assume this business client is on a rolling billing period configuration. Lithic generates the data needed for you to create a statement for the business client at the end of the billing period.

To retrieve the summary details for statements, send a `GET` request to [List Statements](https://docs.lithic.com/reference/getstatements):

```jsx
curl https://api.lithic.com/v1/financial_accounts/c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6/statements \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```jsx

{
  "token": "2jySUy6WudynALA8hvCiBXYgV3K",
  "financial_account_token": "c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6",
  "statement_start_date": "2025-06-15",
  "statement_end_date": "2025-07-14",
  "payment_due_date": "2025-07-19",
  "days_in_billing_cycle": 30,
  "credit_limit": 100000,
  "available_credit": 99930,
  "starting_balance": 0,
  "ending_balance": 0,
  "amount_due": 7000,
  "amount_past_due": 0,
  "period_totals": {
    "payments": 0,
    "purchases": 70000,
    "fees": 0,
    "credits": 0,
    "interest": 0,
    "cash_advances": 0,
    "balance_transfers": 0
  },
  "ytd_totals": {
    "payments": 0,
    "purchases": 70000,
    "fees": 0,
    "credits": 0,
    "interest": 0,
    "cash_advances": 0,
    "balance_transfers": 0
  },
  "created": "2025-07-15T17:48:48Z",
  "updated": "2025-07-15T17:48:48Z",
  "credit_product_token": "string",
  "account_standing": {
    "state": "STANDARD",
    "period_number": 0
  }
}
```

**Note:** Lithic does not produce PDF’s of statement at this time.

### 7. Management Operations

Lithic gives you the ability to impact an account balance using following actions via [management operations](https://docs.lithic.com/reference/getmanagementoperations):

* charge a fee
* Issue credit (used to dispute a transactions)
* issue reward
* issue adjustment

Lets assume your customer has not paid the statement balance by the due date and you want to assess a late payment fee. Issue request below to access access the fee.

**Request**

```jsx
{
    "category": "MANAGEMENT_FEE",
    "financial_account_token": "c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6",
    "amount": 100,
    "effective_date": "2025-08-01",
    "event_type": "LATE_PAYMENT",
    "direction": "DEBIT",
    "token": "21345678-aa69-4cbc-a946-30d90181cckk",
    "user_defined_id": "1234"
}
```

**Response:**

```jsx
{
    "data": [
        {
            "token": "21345678-aa69-4cbc-a946-30d90181cckk",
            "result": "APPROVED",
            "category": "MANAGEMENT_FEE",
            "status": "REVERSED",
            "settled_amount": 0,
            "pending_amount": 0,
            "currency": "USD",
            "events": [
                {
                    "amount": -321,
                    "type": "CURRENCY_CONVERSION",
                    "subtype": "FX CAD to USD",
                    "result": "APPROVED",
                    "detailed_results": [
                        "APPROVED"
                    ],
                    "created": "2025-10-25T15:17:36Z",
                    "token": "0fe33440-dc81-5c80-81f2-dce5833fddbe",
                    "memo": "FX fee from CAD to USD",
                    "effective_date": "2024-09-09"
                },
                {
                    "amount": 321,
                    "type": "CURRENCY_CONVERSION_REVERSAL",
                    "subtype": "FX CAD to USD",
                    "result": "APPROVED",
                    "detailed_results": [
                        "APPROVED"
                    ],
                    "created": "2025-10-25T15:17:38Z",
                    "token": "68144c24-8a5d-5351-9bd7-8f268e526487",
                    "memo": "Reversed Management Fee Operation from 80e33e89-861a-554e-ad5a-32400a3f2c90",
                    "effective_date": "2024-09-09"
                }
            ],
            "created": "2025-10-25T15:17:36Z",
            "updated": "2025-10-25T15:17:38Z",
            "user_defined_id": null,
            "financial_account_token": "80e33e89-861a-554e-ad5a-32400a3f2c90",
            "direction": "DEBIT"
        }
    ],
    "has_more": false
 }

```

**Note:** Lithic’s engineering team is currently hard at working building configuration based automated fee assessment. Expected to be launched late Q4 2024.

### 8. Payments

Lithic supports both [native ACH rails](https://docs.lithic.com/docs/ach-overview) or the ability for you to post updates to the ledger using your own payment processing capabilities. For this guide we are assuming you are using our own ACH rails to process customer card payments and you utilize Lithic’s [External Payment API](https://docs.lithic.com/reference/getexternalpayments) to update account balances.

Request

```jsx
{
    "category":"EXTERNAL_ACH",
    "financial_account_token":"c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6",
    "amount":100,
    "effective_date":"2025-09-04",
    "payment_type":"DEPOSIT",
    "user_defined_id": "1234"
}
```

Response:

```jsx
{
    "token": "de664ec9-547e-46ae-a65f-a8ec833985e5",
    "result": "APPROVED",
    "category": "EXTERNAL_ACH",
    "status": "PENDING",
    "settled_amount": 0,
    "pending_amount": 100,
    "currency": "USD",
    "events": [
        {
            "amount": 100,
            "type": "EXTERNAL_ACH_INITIATED",
            "result": "APPROVED",
            "detailed_results": [
                "APPROVED"
            ],
            "created": "2025-10-28T17:23:06Z",
            "token": "8964eb43-8087-511b-9f79-d26f122a4f21",
            "memo": "External Ach Payment to c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6",
            "effective_date": "2024-09-04"
        }
    ],
    "created": "2025-10-28T17:23:06Z",
    "updated": "2025-10-28T17:23:06Z",
    "user_defined_id": "1234",
    "financial_account_token": "c9e61cdc-83d3-5ed5-b0a3-cf298e279ed6",
    "payment_type": "DEPOSIT"
}
```

### **Congratulations & Moving Forward!**

Congratulations on setting up your revolving credit program with Lithic! You’ve configured a tailored credit solution that empowers your customers and gives you full control over program settings. As your credit program grows, Lithic’s flexible platform is here to support you with ongoing adjustments, new features, and comprehensive documentation.

For any additional guidance, don’t hesitate to reach out to your implementation specialist or explore our resources for ongoing support.
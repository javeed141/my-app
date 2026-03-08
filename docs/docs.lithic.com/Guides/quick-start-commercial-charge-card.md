# Quick Start - Commercial Charge Card

Commercial Charge is a charge card configuration for SMBs that combines the flexibility of card-based spend with the discipline of periodic full payment. Unlike revolving credit, customers must pay their full statement balance by the due date—interest is not charged.

Commercial Charge enables you to:

* **Issue Cards to SMBs:** Funded via your program’s Security Account and governed by both instance and SMB-level spend controls.
* **Control Risk:** Authorizations are capped by the available balance in your program’s Security Account.
* **Collect from SMBs on Schedule:** Lithic aggregates transactions and collects on your behalf at a fixed cadence (e.g., weekly or monthly).

# Security Account

This setup uses a **Security Account** that also acts as your overall Program Spend Limit **(Open-to-Buy)**, giving the program a pre-funded feel. It determines how much **all** SMBs can spend across **all** cards in your program. You must maintain a sufficient balance to meet daily network settlement obligations.

You can maintain and top up your Security Account balance in 2 ways:

1. ACH Push from External Account:
   * Deposit funds directly into your Instance Funding Account (Security).
   * This sets the **initial Open-to-Buy** limit.
2. Automated Collection via SMBs
   1. After receiving ACH collections from SMBs, you can use book transfer endpoints to move money back into the Security Account from the Program Operating Account.

## Example

The following explains a sample event sequence for a program with 2 SMB customers:

| Event                                                      | Open-to-Buy | Notes                                                |
| ---------------------------------------------------------- | ----------- | ---------------------------------------------------- |
| ACH Push from external account for $1,000                  | $1,000      | Initial funding of Security Account by program       |
| SMB 1 swipes for $20                                       | $980        |                                                      |
| SMB 2 swipes for $70                                       | $910        |                                                      |
| Network Settlement                                         | $910        | No change on program limit                           |
| SMB 1 swipes for $40                                       | $870        |                                                      |
| SMB2 collection for 70$                                    | $870        | Program’s operating +$70. No change on program limit |
| Fund Security Account from operating $70 via Book Transfer | $940        | Security Account topped up                           |

# Step 1 - Enroll a business

When your API key is first provisioned and your program is set up, a default account and your program’s ISSUING, RESERVE, OPERATING financial accounts are created. To add your business clients, you should first create a Business Account Holder, which will generate an associated account and ISSUING financial account shortly thereafter. For the purpose of this guide, let’s assume you are enrolling your business clients' employees as KYC-Exempt Individual Account Holders. Before your program goes live, work with your implementation specialist to understand your specific KYC requirements.

<div align="center">
  <img src="https://files.readme.io/bdf2c81-image.png" alt="Business Account Structure" width="500" />
</div>

For this guide, assume you are utilizing your own Know Your Business (KYB) process, known as a BYO KYB workflow. For more information on the different KYC and KYB (Know Your Business) processes that Lithic supports, please refer to our guides for [Account Holders (Individuals)](https://docs.lithic.com/docs/account-holders-kyc) and [Account Holders (Businesses)](https://docs.lithic.com/docs/account-holders-kyb).

Send a `POST` request to [Create Account Holder](https://docs.lithic.com/reference/postaccountholders) to create a Business Account Holder:

```javascript
curl https://api.lithic.com/v1/account_holders
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
   "workflow": "KYB_BYO",
   "tos_timestamp": "2023-01-13T00:00:00Z",
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
   "kyb_passed_timestamp": "2023-01-14T00:00:00Z",
   "nature_of_business":"Retail store selling coffee and other food items",
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

```json
{
  "account_token": "b68b7424-aa69-4cbc-a946-30d90181b621",
  "status": "ACCEPTED",
  "status_reasons": [],
  "token": "12345678-aa69-4cbc-a946-30d90181b621",
}
```

At this point, the issuing and operating financial account for the business customer is also created. For commercial charge card, only the business client's issuing financial account will be used. You can view this account by sending a `GET` request to [List Financial Accounts](https://docs.lithic.com/docs/financial-accounts#list-financial-accounts):

```curl
curl https://api.lithic.com/v1/financial_accounts?business_account_token=b68b7424-aa69-4cbc-a946-30d90181b621\
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```json
{
  "data": [
      {
        "token": "12345678-aa69-4cbc-a946-30d90181b621",
        "created": "2023-06-10T17:48:48Z",
        "updated": "2023-06-10T17:48:48Z",
        "type": "ISSUING",
        "nickname": "string",
        "routing_number": "100000000",
        "account_number": "11111234567890",
        "is_for_benefit_of": false 

      },
      {
        "token": "910c80e8-7010-4f46-b16a-8b0b933807ef",
        "created": "2023-06-10T17:48:48Z",
        "updated": "2023-06-10T17:48:48Z",
        "nickname": "string",
        "type": "OPERATING",
        "routing_number": "100000000",
        "account_number": "11111234567892",
        "is_for_benefit_of": false
      }
   ]
}
```

<br />

# Step 2 - Add and Verify an External Bank Account

You will now add the external bank account that your enrolled business clients will use to pay their charge card bills. This should be a commercial bank account that you have received authorization to ACH debit on a recurring basis. The external bank account should be linked to the business's KYB account. Use our [External Bank Accounts Guide](https://docs.lithic.com/docs/external-accounts-api) to go through adding an External Bank Account

![](https://files.readme.io/02912f8-image.png)

# Step 3 - Configure your charge card program

At this point you will work with your implementation specialist to set up the [Credit Configuration](https://docs.lithic.com/docs/credit-products). After you have received up the credit product token for the program from Lithic, you can then set the credit limit, Credit Product Token, and external bank account for each of your customers. For this guide, lets attach a credit limit of $100,000 and an external bank account for a given account token.

Note: Your implementation specialist will provide you with a credit\_product\_token for each environment.

Send a `PATCH` request to [Credit Configuration](https://docs.lithic.com/reference/patchaccountcreditconfiguration) for the issuing Financial Account of the business client you just created:

```curl
curl https://api.lithic.com/v1/financial_accounts/12345678-aa69-4cbc-a946-30d90181b621/credit_configuration
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "credit_limit": 10000000,
  "external_bank_account_token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "credit_product_token": "2jyR0tDUZK7N7fMxmzMHJOa7bH7"
}
’
```

# Step 4 - Create Individual Account Holders

Next, you will enroll the business's employees and link them to the business using the `business_account_token`. Send a `POST` request to [Create Account Holder](https://docs.lithic.com/reference/postaccountholders):

```bash
curl https://api.lithic.com/v1/account_holders
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
   "workflow": "KYC_EXEMPT",
   "kyc_exemption_type": "AUTHORIZED_USER",
   "tos_timestamp": "2023-06-11T00:00:00Z",
   "individual": {
      "first_name": "Johnny",
      "last_name": "AppleSeed",
      "email": "johnny@appleseed.com",
      "address": {
         "address1": "123 Main Street",
         "postal_code": "10128",
         "city": "New York", 
         "state":"NY",
         "country":"USA"
      }
   },
   "business_account_token": "b68b7424-aa69-4cbc-a946-30d90181b621"
}
’
```

Below is a sample response:

```json
{
  "data": {
      "account_token": "8dc88f3e-21ea-4d17-9a1c-00cea1a76cf9",
      "status": "ACCEPTED",
      "status_reasons": [],
      "token": "12345678-aa69-4cbc-a946-30d90181b621",
      "business_account_token": "b68b7424-aa69-4cbc-a946-30d90181b621"
  }
}
```

<br />

# Step 5 - Create a card

Create a card for your business client's employee so that they can spend on their company charge card. All card transactions taking place on physical and virtual cards associated with the employee’s account will count against the credit limit of the overall business. **Individual employees do not have their own credit limit**. Instead, employee spend can be managed with Lithic's spend limits, [Auth Rules, and ASA.](https://docs.lithic.com/docs/auth-stream-access-asa)

Send a `POST` request to [Create Card](https://docs.lithic.com/reference/postcards) to create a virtual card:

```bash
curl https://api.lithic.com/v1/cards \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
     "type": "VIRTUAL",
     "memo": "New Card",
     "state": "OPEN",
     "account_token": "8dc88f3e-21ea-4d17-9a1c-00cea1a76cf9" ,
}
'
```

Below is a sample response:

```json
{
  "created": "2021-06-28T22:53:15Z",
  "token": "7ef7d65c-9023-4da3-b113-3b8583fd7951",
  "last_four": "4142",
  "hostname": "",
  "memo": "New Card",
  "type": "VIRTUAL",
  "state": "OPEN",
  "funding": null,
  "auth_rule_tokens": [
     "6397a416-bac6-464c-9647-b006f3a5f91d"
  ],
  "exp_month": "06",
  "exp_year": "2027"
}
```

# Step 6 - Transact

As employees transact with their cards, you can view a list of transactions that have occurred with [Financial Transactions](https://docs.lithic.com/docs/financial-transactions). A Financial Transaction tells you the state of a transaction as it moves through its lifecycle and transaction events occur.

Let’s take a closer look at Financial Transactions. Assume the following events have occurred with one of your end-users:

* June 15: $20 was authorized at Merchant ABC
* June 15: $70 was authorized at Merchant XYZ
* June 16: $70 was cleared at Merchant XYZ (i.e., the transaction’s final amount was $70)

Send a `GET` request to [List Financial Transactions](https://docs.lithic.com/docs/financial-transactions#list-financial-transactions) to retrieve all transactions between June 14 and June 16 2023:

```bash
curl https://api.lithic.com/v1/financial_accounts/12345678-aa69-4cbc-a946-30d90181b621/financial_transactions?begin=2023-06-14T00%3A00%3A00&end=2023-06-17T00%3A00%3A00 \
  -H "Authorization: YOUR_API_KEY"
```

This should return a response with two results. The first result would be the $20 authorization at Merchant ABC. It has a state of `PENDING` and the `pending_amount` is the full $20. The `settled_amount` remains at $0 until the transaction has been finalized by the merchant.

```json
{
  "category": "CARD",
  "status": "PENDING",
  "result": "APPROVED",
  "token": "1234fhjt-aa69-4cbc-a946-30d90181dhf7",
  "settled_amount": 0,
  "pending_amount": -2000,
  "currency": "USD",
  "events": [
    {
      "amount": -2000,
      "type": "CARD_AUTHORIZATION",
      "result": "APPROVED",
      "created":  "2023-06-15T17:48:48Z",
      "token": "99945678-aa69-4cbc-af4p-30d90181b111"
    }
  ],
  "descriptor": "Merchant ABC",
  "created": "2023-06-15T17:48:48Z",
  "updated": "2023-06-15T17:48:48Z"
}
```

The second result represents the $70 cleared transaction at Merchant XYZ. This transaction has an updated state of `SETTLED`, and the full $70 has been transferred from the `pending_amount` to the `settled_amount`.

```json
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
      "created":  "2023-06-15T18:48:48Z",
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
```

For more information on the different states of a transaction, please refer to our [Financial Transactions guide](https://docs.lithic.com/docs/financial-transactions). For more details on the card transaction lifecycle, please refer to our [Transaction Flow guide](https://docs.lithic.com/docs/transaction-flow).

You may also want to check the balance of the business employee's issuing financial account using [Get Balances](https://docs.lithic.com/docs/balances#get-balances). Note that balances go negative for Financial Accounts in this construct.

```bash
curl https://api.lithic.com/v1/financial_accounts/12345678-aa69-4cbc-a946-30d90181b621/balances \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```json

{
 "data": [
    {
      "financial_account_type": "ISSUING_ACCOUNT_RECEIVABLE",
      "financial_account_token": "12345678-aa69-4cbc-a946-30d90181b621",
      "currency": "USD",
      "available_amount": 9000,
      "pending_amount": -2000,
      "total_amount": 7000,
      "created": "2023-06-10T17:48:48Z",
      "updated": "2023-06-13T17:48:48Z",
      "last_transaction_token": "9b8497cb-6ff7-413e-a5a8-a09c906b2b12",
      "last_transaction_event_token": "8d4f88f0-16e9-4755-832e-b09f00c587fc"
    }
 ],
  "has_more": false,
}
```

The total balance of -$90 indicates $90 of the $100K credit limit has been utilized. The available amount of -$70 indicates the total settled amount that would be repaid via auto-collections

# Step 7 - Generate Statements

*Please note: Step 7 demonstrates production-only functionality, as we do not generate statements in sandbox.*

*The URL of the Statements API shown is a production URL, although the`financial_ account_token` and `credit_product_token` remain the sandbox UUIDs for consistency.*

Because this business client is on a 30-day billing period, 30 days after June 15th, Lithic will close the billing period and generate the data needed for you to create a statement for the business client.

To retrieve the summary details for statements, send a `GET` request to [List Statements](https://docs.lithic.com/reference/getstatements):

```bash
curl https://api.lithic.com/v1/financial_accounts/12345678-aa69-4cbc-a946-30d90181b621/statements \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```json

{
  "token": "2jySUy6WudynALA8hvCiBXYgV3K",
  "financial_account_token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "statement_start_date": "2023-06-15",
  "statement_end_date": "2023-07-14",
  "payment_due_date": "2023-07-19",
  "days_in_billing_cycle": 30,
  "credit_limit": 1000000,
  "available_credit": 993000,
  "starting_balance": 0,
  "ending_balance": 0,
  "amount_due": 7000,
  "amount_past_due": 0,
  "period_totals": {
    "payments": 0,
    "purchases": 7000,
    "fees": 0,
    "credits": 0,
    "interest": 0,
    "cash_advances": 0,
    "balance_transfers": 0
  },
  "ytd_totals": {
    "payments": 0,
    "purchases": 7000,
    "fees": 0,
    "credits": 0,
    "interest": 0,
    "cash_advances": 0,
    "balance_transfers": 0
  },
  "created": "2023-07-15T17:48:48Z",
  "updated": "2023-07-15T17:48:48Z",
  "credit_product_token": "string",
  "account_standing": {
    "state": "STANDARD",
    "period_number": 0
  }
}
```

Next, let's retrieve the line item details for the statement. Send a `GET` request to [List line items for a statement](https://docs.lithic.com/reference/getstatementlineitems):

```bash
curl https://api.lithic.com/v1/financial_accounts/12345678-aa69-4cbc-a946-30d90181b621/statements/81384995-b510-4aef-baaa-66b19dce2848/line_items \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```json

{
  "data": [
    {
      "token": "2jySUxGBhsWYrFryssnZdvUWWzz",
      "financial_account_token": "12345678-aa69-4cbc-a946-30d90181b621",
      "card_token": "7ef7d65c-9023-4da3-b113-3b8583fd7951",
      "financial_transaction_token": "9b8497cb-6ff7-413e-a5a8-a09c906b2b12",
      "category": "CARD",
      "event_type": "CLEARING",
      "settled_date": "2023-06-15",
      "descriptor": "Merchant XYZ",
      "amount": -7000,
      "currency": "USD",
      "created": "2023-07-15T17:48:48Z"
    }
  ],
  "has_more": true
}

```

# Step 8 - Auto-Collection of Repayment

*Please note: Step 8 demonstrates production-only functionality, as we do not auto-collect payments in sandbox.*

*The URL of the payments API shown for Step 8 is a production URL, although the`financial_ account_token` and `credit_product_token` remain the sandbox UUIDs for consistency.*

Five days after the billing period end date the payment for the $70 bill is due. Lithic auto-initiates an ACH debit origination to collect the $70 from the business client's external bank account. To see this ACH debit origination, you can either query the Payments API or the Financial Transactions API.

You can send a `GET` request to the Payments API.

```
curl https://api.lithic.com/v1/payments\
  -H 'AUTHORIZATION: YOUR_API_KEY'
```

Below is a sample response. Note that the total balance for the business client's issuing financial account has decreased to $0, indicating that they have paid their bill. The available balance remains -$70 until the ACH debit has settled:

```json
{
  "data": [
    {
      "category": "ACH",
      "status": "PENDING",
      "result": "APPROVED",
      "method_attributes": {
        "sec_code": "CCD",
        "return_reason_code": null,
      },
      "financial_account_token": "12345678-aa69-4cbc-a946-30d90181b621",
      "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
      "direction": "DEBIT",
      "source": "LITHIC",
      "method": "ACH_NEXT_DAY",
      "token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
      "settled_amount": 0,
      "pending_amount": 7000,
      "currency": "USD",
      "events": [
        {
          "amount": 7000,
          "type": "ACH_ORIGINATION_PENDING",
          "result": "APPROVED",
          "detailed_results": ["APPROVED"],
          "created": "2023-06-23T22:07:47Z",
          "token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
        },
        {
          "amount": 7000,
          "type": "ACH_ORIGINATION_PROCESSED",
          "result": "APPROVED",
          "detailed_results": ["APPROVED"],
          "created": "2023-06-23T23:07:47Z",
          "token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
        }
      ],
      "descriptor": "CHARGE_COLLECTION",
      "user_defined_id": null,
      "created": "2022-07-19T22:07:47Z",
      "updated": "2022-07-19T23:07:47Z",
      "balance": {
        "financial_account_type": "ISSUING",
        "financial_account_token": "12345678-aa69-4cbc-a946-30d90181b621",
        "currency": "USD",
        "available_amount": -9000,
        "pending_amount": 9000,
        "total_amount": 0,
        "created": "2022-06-10T17:48:48Z",
        "updated": "2022-07-19T23:08:00Z",
        "last_transaction_token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
        "last_transaction_event_token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
      }
    }
],
  "has_more": true
}
```

Once the hold period has passed (default 2 business days), the collected repayment will settle and be automatically swept into your program's operating financial account, where it can be used toward future transactions or repayment to debt providers.

If you send a `GET` request to the Payments API at this point, you would see the below. Note that the available balance is now $0, indicating that the available credit limit has increased back to $100K:

```json
{
    "category": "ACH",
    "status": "PENDING",
    "result": "APPROVED",
    "method_attributes": {
        "sec_code": "CCD",
      	"return_reason_code": null,
    },
    "financial_account_token": "12345678-aa69-4cbc-a946-30d90181b621",
    "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
    "direction": "DEBIT",
    "source": "LITHIC",
    "method": "ACH_NEXT_DAY",
    "token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
    "settled_amount": 0,
    "pending_amount": 7000,
    "currency": "USD",
    "events": [
      	{
            "amount": 7000,
            "type": "ACH_ORIGINATION_PENDING",
            "result": "APPROVED",
            "detailed_results": ["APPROVED"],
            "created": "2023-06-23T22:07:47Z",
            "token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
        },
        {
            "amount": 7000,
            "type": "ACH_ORIGINATION_PROCESSED",
            "result": "APPROVED",
          	"detailed_results": ["APPROVED"],
            "created": "2023-06-23T23:07:47Z",
            "token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
        },
        {
            "amount": 7000,
            "type": "ACH_ORIGINATION_RELEASED",
            "result": "APPROVED",
          	"detailed_results": ["APPROVED"],
            "created": "2023-06-27T22:07:47Z",
            "token": "2a652ffd-cfa2-53c7-997b-26e7ad579995"
        }
    ],
    "descriptor": "CHARGE_COLLECTION",
    "user_defined_id": null,
    "created": "2023-07-19T22:07:47Z",
    "updated": "2023-07-19T23:07:47Z",
    "balance": {
        "financial_account_type": "ISSUING",
        "financial_account_token": "12345678-aa69-4cbc-a946-30d90181b621",
        "currency": "USD",
        "available_amount": 0,
        "pending_amount": 2000,
        "total_amount": 0,
        "created": "2023-06-10T17:48:48Z",
        "updated": "2023-07-19T23:08:00Z",
        "last_transaction_token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
        "last_transaction_event_token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
    }
}
```
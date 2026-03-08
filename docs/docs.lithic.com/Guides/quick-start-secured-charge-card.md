# Quick Start - Secured Charge Card

Secured Charge enables a charge card model backed by a user-funded security account. This construct gives end users the flexibility to spend up to the value held in their security account, while requiring full repayment at the end of each billing cycle. It combines the user experience of a charge card with the control and risk management of a pre-funded balance.

Secured Charge enables you to:

* **Offer Controlled Credit Access:** Let users access a charge card experience without traditional credit underwriting.
* **Enforce Account-Level Risk Management:** All spend is secured by pre-funded balances, eliminating unsecured float exposure.
* **Automate Billing and Repayment:** Automatically generate statements and collect from the security account on a rolling schedule.

# Security Account

In this model, every transaction is balance-checked against the user’s security account, ensuring that all spend is fully secured. Based on the statement timing specified in the [Credit Configuration](https://docs.lithic.com/docs/credit-products), the outstanding balance is automatically collected from the security account. Users must continue to top up their security account before they can continue transacting.

The following explains a sample event sequence for an individual's Secured Charge Card where the billing cycle is 14 days, and payment is due 7 days after the end of the cycle:

| Days since start of billing cycle | Event                                                                  | Credit Limit | Notes                                                    |
| :-------------------------------- | :--------------------------------------------------------------------- | :----------- | :------------------------------------------------------- |
| 0                                 | User funds security account from External Bank Account via ACH of $500 | $500         | Initial funding of Security Account by user              |
| 1                                 | User swipes for $15                                                    | $485         |                                                          |
| 1                                 | User swipes for $40                                                    | $445         |                                                          |
| 4                                 | User swipes for $45                                                    | $400         |                                                          |
| 14                                | Billing period ends. $100 total spent.                                 | $400         |                                                          |
| 18                                | User swipes for $50                                                    | $350         |                                                          |
| 21                                | Payment due date for cycle. $100 is collected                          | $350         |                                                          |
| 21                                | Collection Sweep                                                       | $350         | Sweep collected funds to program's external bank account |
| 22                                | Top up of $150 from user External Bank Account                         | $500         | User restores Credit Limit back to its original amount   |

<br />

# Step 1 - Enroll your customers

When your API key is first provisioned and your program is set up, a default account and your program’s ISSUING, RESERVE, OPERATING financial accounts are created. To add your customers, you should [Create Account Holders](https://docs.lithic.com/reference/postaccountholders). This will generate an associated account as well as `ISSUING` and `SECURITY` Financial accounts.

For the purpose of this guide, let’s assume you are enrolling your customers as KYC-Basic Individual Account Holders. Before your program goes live, you'll work with your implementation specialist to understand your specific KYC requirements. For more information on the different KYC processes that Lithic supports, please refer to our guides for [Account Holders (Individuals)](https://docs.lithic.com/docs/account-holders-kyc)

<br />

```curl
curl --request POST \
     --url https://sandbox.lithic.com/v1/account_holders \
     --header 'Authorization: YOUR_API_KEY' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "workflow": "KYC_BASIC",
  "individual": {
    "address": {
      "address1": "123 Drury Lane",
      "city": "New York",
      "country": "USA",
      "postal_code": "10011",
      "state": "NY"
    },
    "dob": "1997-04-17",
    "email": "muffinman97@gmail.com",
    "first_name": "Chet",
    "government_id": "000002222",
    "last_name": "Baker",
    "phone_number": "+16082212200"
  },
  "tos_timestamp": "2025-01-13T00:00:00Z"
}
'
```

Below is a sample response:

```json
{
  "account_token": "f1301db0-28e8-484c-9b7f-7f4984299aa9",
  "status": "ACCEPTED",
  "status_reasons": [],
  "token": "cac77737-3562-4770-a138-95e55e48d4a6",
  "created": "2025-07-24T01:59:32.871891"
}
```

Note: save the `account_token` here for Card Creation.

At this point, the `ISSUING` and `SECURITY` financial accounts for the customer have been created. You can view this account by sending a GET request to [List Financial Accounts](doc:financial-accounts#/list-financial-accounts):

```curl
curl --request GET \
     --url 'https://sandbox.lithic.com/v1/financial_accounts?account_token=f1301db0-28e8-484c-9b7f-7f4984299aa9' \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```json
{
  "data": [
    {
      "token": "e43e97f8-265e-581f-b559-936db1964603",
      "created": "2025-06-24T17:54:48Z",
      "updated": "2025-06-24T17:54:48Z",
      "type": "SECURITY",
      "routing_number": "112320788",
      "account_number": "98885431544461",
      "nickname": null,
      "account_token": "f1301db0-28e8-484c-9b7f-7f4984299aa9",
      "status": "OPEN",
      "substatus": null,
      "is_for_benefit_of": true,
      "credit_configuration": {
        "credit_limit": null,
        "external_bank_account_token": null,
        "credit_product_token": null,
        "tier": null,
        "is_spend_blocked": false,
        "financial_account_state": "PENDING",
        "charged_off_reason": null
      }
    },
    {
      "token": "c7ecece7-6ce4-58d5-9fde-64974cb1f8ef",
      "created": "2025-06-24T17:54:48Z",
      "updated": "2025-06-24T17:54:48Z",
      "type": "ISSUING",
      "routing_number": null,
      "account_number": null,
      "nickname": null,
      "account_token": "f1301db0-28e8-484c-9b7f-7f4984299aa9",
      "status": "OPEN",
      "substatus": null,
      "is_for_benefit_of": true,
      "credit_configuration": {
        "credit_limit": null,
        "external_bank_account_token": null,
        "credit_product_token": null,
        "tier": null,
        "is_spend_blocked": false,
        "financial_account_state": "PENDING",
        "charged_off_reason": null
      }
    }
  ],
  "has_more": false
}
```

<br />

# Step 2 - Add and Verify an External Bank Account

If your customer's Security Account is going to be topped up via ACH Debit Originations, you will now add the external bank account. This should be an account that you have received authorization to ACH debit on a recurring basis. The external bank account should be linked to the business's KYB account. Use our [External Bank Accounts Guide](https://docs.lithic.com/docs/external-accounts-api) to go through adding an External Bank Account.

If you will be topping up the Security Account via ACH Credit Receipts sent by your customer's external banks, you do not need to add and verify an External Bank Account

<br />

<br />

# Step 3 - Configure your charge card program

At this point you will work with your implementation specialist to set up the [Credit Configuration](https://docs.lithic.com/docs/credit-products). For this customer, we will be using a 14 day billing cycle where payment is due 7 days after. After you have received the credit product token for the program from Lithic, you can then set the Credit Product Token for each of your customers by using the Issuing Financial Account token.

*Note: Your implementation specialist will provide you with a`credit_product_token` for each environment.*

Send a PATCH request to Credit Configuration for the business client's account you just created:

```curl
curl https://api.lithic.com/v1/accounts/c7ecece7-6ce4-58d5-9fde-64974cb1f8ef/credit_configuration
  -X PATCH \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "credit_product_token": "2yN1jTzLcgXCJe0uXX43d8I0z2r"
}
’
```

<br />

<br />

# Step 4 - Create a card

Create a card for your users for spend. All card transactions taking place on physical and virtual cards will count against the credit limit, which is determined by the funding in the Security Account.

Send a POST request to Create Card to create a virtual card using the account token generated in Step 1:

<br />

```curl
curl https://api.lithic.com/v1/cards \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
     "type": "VIRTUAL",
     "memo": "New Card",
     "state": "OPEN",
     "account_token": "f1301db0-28e8-484c-9b7f-7f4984299aa9"
}
'
```

Below is a sample response:

<br />

```json
{
  "created": "2025-06-24T18:03:02Z",
  "token": "affa1116-7893-40cb-8ca1-5217a2335823",
  "last_four": "1098",
  "hostname": "",
  "memo": "New Card",
  "type": "VIRTUAL",
  "exp_month": "07",
  "exp_year": "2031",
  "spend_limit": 0,
  "spend_limit_duration": "TRANSACTION",
  "state": "OPEN",
  "funding": null,
  "auth_rule_tokens": [],
  "replacement_for": null,
  "substatus": null,
  "comment": "",
  "card_program_token": "00000000-0000-0000-1000-000000000000",
  "account_token": "f1301db0-28e8-484c-9b7f-7f4984299aa9",
  "product_id": null,
  "digital_card_art_token": null,
  "cardholder_currency": "USD",
  "pin_status": "NOT_SET",
  "pending_commands": [],
  "network_program_token": "",
  "pan": "4111111149061098",
  "cvv": "070"
}
```

<br />

# Step 5 - Transact

As users transact with their cards, you can view a list of transactions that have occurred with Financial Transactions. A Financial Transaction tells you the state of a transaction as it moves through its lifecycle and transaction events occur.

Let’s take a closer look at Financial Transactions. Assume the following events have occurred with one of your end-users at the beginning of their billing cycle:

* July 15: $15 was authorized at Merchant ABC
* July 15: $40 was authorized at Merchant XYZ
* July 16: $40 was cleared at Merchant XYZ (i.e., the transaction’s final amount was $40)

Send a GET request to [List Financial Transactions](doc:financial-transactions#/list-financial-transactions) to retrieve all transactions between July 14 and July 16 2025, inclusive:

```curl
curl https://api.lithic.com/v1/financial_accounts/c7ecece7-6ce4-58d5-9fde-64974cb1f8ef/financial_transactions?begin=2025-07-14T00%3A00%3A00&end=2025-07-17T00%3A00%3A00 \
  -H "Authorization: YOUR_API_KEY"
```

This should return a response with two results. The first result would be the $15 authorization at Merchant ABC. It has a state of PENDING and the pending\_amount is the full $15. The settled\_amount remains at $0 until the transaction has been finalized by the merchant.

```json
{
  "category": "CARD",
  "status": "PENDING",
  "result": "APPROVED",
  "token": "1234fhjt-aa69-4cbc-a946-30d90181dhf7",
  "settled_amount": 0,
  "pending_amount": -1500,
  "currency": "USD",
  "events": [
    {
      "amount": -1500,
      "type": "CARD_AUTHORIZATION",
      "result": "APPROVED",
      "created": "2025-06-15T17:48:48Z",
      "token": "99945678-aa69-4cbc-af4p-30d90181b111"
    }
  ],
  "descriptor": "Merchant ABC",
  "created": "2025-06-15T17:48:48Z",
  "updated": "2025-06-15T17:48:48Z"
}
```

The second result represents the $40 cleared transaction at Merchant XYZ. This transaction has an updated state of SETTLED, and the full $40 has been transferred from the pending\_amount to the settled\_amount.

```json
{
  "category": "CARD",
  "status": "SETTLED",
  "result": "APPROVED",
  "token": "9b8497cb-6ff7-413e-a5a8-a09c906b2b12",
  "pending_amount": 0,
  "settled_amount": -4000,
  "currency": "USD",
  "events": [
    {
      "amount": -4000,
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "created": "2025-07-15T18:48:48Z",
      "token": "11145678-aa69-4cbc-a946-30d90181cccc"
    },
    {
      "amount": -4000,
      "type": "CLEARING",
      "result": "APPROVED",
      "created": "2025-07-16T17:48:48Z",
      "token": "8d4f88f0-16e9-4755-832e-b09f00c587fc"
    }
  ],
  "descriptor": "Merchant XYZ",
  "created": "2025-07-15T17:48:48Z",
  "updated": "2025-07-16T17:48:48Z"
}
```

For more information on the different states of a transaction, please refer to our [Financial Transactions guide](https://docs.lithic.com/docs/financial-transactions). For more details on the card transaction lifecycle, please refer to our [Transaction Flow guide](https://docs.lithic.com/docs/transaction-flow).

# Step 6 - Generate Statements

*Please note: Step 6 demonstrates production-only functionality, as we do not generate statements in sandbox.*

\_The URL of the Statements API shown is a production URL, although the`financial_ account*token`and`credit_product_token` remain the sandbox UUIDs for consistency.\*

Because this customer is on a 14 day billing cycle, Lithic will close the billing period on July 28 and generate the Statement data. To retrieve the summary details for this statement, set a `GET` request to [List Statements](https://docs.lithic.com/reference/getstatements) using your financial account token:

```curl
curl https://api.lithic.com/v1/financial_accounts/d72866cd-d544-55f2-a228-770b5a69d51f/statements \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```json
{
  "statement": {
    "statement_start_date": "2025-07-15",
    "statement_end_date": "2023-07-28",
    "next_statement_end_date": "2025-08-11",
    "payment_due_date": "2025-08-04",
    "next_payment_due_date": "2025-08-25",
    "days_in_billing_cycle": 14,
    "credit_limit": 50000,
    "available_credit": 40000,
    "starting_balance": 0,
    "ending_balance": 10000,
    "period_totals": {
      "payments": 0,
      "purchases": 10000,
      "fees": 0,
      "credits": 0,
      "interest": 0,
      "cash_advances": 0,
      "balance_transfers": 0
    },
    "ytd_totals": {
      "payments": 0,
      "purchases": 10000,
      "fees": 0,
      "credits": 0,
      "interest": 0,
      "cash_advances": 0,
      "balance_transfers": 0
    },
    "credit_product_token": "2yN1jTzLcgXCJe0uXX43d8I0z2r",
    "account_standing": {
      "period_state": "STANDARD",
      "period_number": 1,
      "consecutive_minimum_payments_made": 0,
      "consecutive_minimum_payments_missed": 0,
      "consecutive_full_payments_made": 0,
      "days_past_due": 0,
      "has_grace": true,
      "financial_account_state": {
        "status": "OPEN",
        "substatus": null
      }
    },
    "amount_due": {
      "amount": 10000,
      "past_due": 0
    },
    "interest_details": null,
    "statement_type": "PERIOD_END"
  },
  "line_items": [
    {
      "category": "CARD",
      "event_type": "CLEARING",
      "effective_date": "2025-07-15",
      "amount": 1500,
      "currency": "USD"
    },
    {
      "category": "CARD",
      "event_type": "CLEARING",
      "effective_date": "2025-07-15",
      "amount": 4000,
      "currency": "USD"
    },
    {
      "category": "CARD",
      "event_type": "CLEARING",
      "effective_date": "2025-07-18",
      "amount": 4500,
      "currency": "USD"
    }
  ]
}
```

<br />

<br />

# Step 7 - Collection

*Please note: Step 7 demonstrates production-only functionality, as we do not collect payments on Secured Charge Card in sandbox.*

\_The URL of the Statements API shown for Step 7 is a production URL, although the`financial_ account*token`and`credit_product_token` remain the sandbox UUIDs for consistency.\*

Lithic will then collect payment from the security account 7 days after the billing cycle closes, as per configuration. After collection, the statement will be updated with the payment information. To retrieve the new details for this statement, set a `GET` request to [List Statements](https://docs.lithic.com/reference/getstatements) using your financial account token:

```curl
curl https://api.lithic.com/v1/financial_accounts/d72866cd-d544-55f2-a228-770b5a69d51f/statements \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response:

```json
{
  "statement": {
    "statement_start_date": "2025-07-15",
    "statement_end_date": "2023-07-28",
    "next_statement_end_date": "2025-08-11",
    "payment_due_date": "2025-08-04",
    "next_payment_due_date": "2025-08-25",
    "days_in_billing_cycle": 14,
    "credit_limit": 50000,
    "available_credit": 45000,
    "starting_balance": 0,
    "ending_balance": 10000,
    "period_totals": {
      "payments": 0,
      "purchases": 10000,
      "fees": 0,
      "credits": 0,
      "interest": 0,
      "cash_advances": 0,
      "balance_transfers": 0
    },
    "ytd_totals": {
      "payments": -10000,
      "purchases": 15000,
      "fees": 0,
      "credits": 0,
      "interest": 0,
      "cash_advances": 0,
      "balance_transfers": 0
    },
    "credit_product_token": "2yN1jTzLcgXCJe0uXX43d8I0z2r",
    "account_standing": {
      "period_state": "STANDARD",
      "period_number": 1,
      "consecutive_minimum_payments_made": 0,
      "consecutive_minimum_payments_missed": 0,
      "consecutive_full_payments_made": 0,
      "days_past_due": 0,
      "has_grace": true,
      "financial_account_state": {
        "status": "OPEN",
        "substatus": null
      }
    },
    "amount_due": {
      "amount": 10000,
      "past_due": 0
    },
    "interest_details": null,
    "statement_type": "PERIOD_END"
  },
  "line_items": [
    {
      "card_token": null,
      "category": "BALANCE_OR_FUNDING",
      "event_type": "COLLECTION",
      "effective_date": "2023-05-06",
      "descriptor": "Book transfer",
      "amount": -10000,
      "currency": "USD"
    },
    {
      "category": "CARD",
      "event_type": "CLEARING",
      "effective_date": "2025-07-15",
      "amount": 1500,
      "currency": "USD"
    },
    {
      "category": "CARD",
      "event_type": "CLEARING",
      "effective_date": "2025-07-15",
      "amount": 4000,
      "currency": "USD"
    },
    {
      "category": "CARD",
      "event_type": "CLEARING",
      "effective_date": "2025-07-18",
      "amount": 4500,
      "currency": "USD"
    }
  ]
}
```
# Financial Transactions

Learn more about financial transactions

Lithic [Financial Accounts](https://docs.lithic.com/docs/financial-accounts) have a list of financial transactions that have impacted their [balances](https://docs.lithic.com/docs/balances). A financial transaction is any transaction that impacted either the available balance or pending balance, this includes:

* Card authorizations, captures, voids, returns, etc.
* ACH receipts (funds received by your routable financial accounts via ACH)
* Direct transfers between financial accounts within your program

A single financial transaction may include multiple transaction events that affect the state and lifecycle of the financial transaction. These events are included in the Financial Transactions response.

# Financial Transaction Schema

```json
{
    "category": String,
    "status": String,
    "result": String,
    "token": String,
    "settled_amount": Integer,
    "pending_amount": Integer,
    "currency": String,
    "events": [
	    Event
    ],
    "descriptor": String,
    "created": String,
    "updated": String
}
```

|                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| category        | `CARD`, `ACH`, `TRANSFER`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status          | `PENDING`, `VOIDED`, `SETTLED`, `DECLINED`, `EXPIRED`, `RETURNED`                                                                                                                                                                                                                                                                                                                                                                                                                |
| result          | `APPROVED`, `DECLINED`                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| token           | Globally unique identifier for the transaction                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| settled\_amount | Completed amount of the transaction in the currency’s smallest unit (e.g., cents for USD). Positive amount indicates the transaction increases your balance while a negative amount indicates it decreases your balance. The value of this field will grow over time once the financial transaction is settled                                                                                                                                                                   |
| pending\_amount | Pending amount of the transaction in the currency’s smallest unit (e.g., cents for USD). Positive amount indicates the transaction, once completed, will increase your balance while a negative amount indicates it will decrease your balance.<br /> The value of this field will go to zero over time once the financial transaction is settled. For partial capture card transactions, this field will reflect the remaining authorized amount that has not yet been captured |
| currency        | 3-digit alphabetic ISO 4217 code for the settling currency of the transaction. For card transactions, this is the currency that the transaction will settle in, not the merchant\_currency                                                                                                                                                                                                                                                                                       |
| events          | Transaction Event object                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| descriptor      | A string that provides a description of the financial transaction; may be useful to display to users                                                                                                                                                                                                                                                                                                                                                                             |
| created         | Date and time for when the financial transaction occurred                                                                                                                                                                                                                                                                                                                                                                                                                        |
| updated         | Date and time for when the financial transaction was last updated                                                                                                                                                                                                                                                                                                                                                                                                                |

## Event Schema

```json
{
	  "amount": Integer,
	  "type": String,
	  "result": String,
	  "created": String,
	  "token": String
}
```

|         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| amount  | Amount of the transaction event in the currency’s smallest unit (e.g., cents for USD)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| type    | `AUTHORIZATION`, `CREDIT_AUTHORIZATION`, `AUTHORIZATION_ADVICE`, `FINANCIAL_AUTHORIZATION`, `FINANCIAL_CREDIT_AUTHORIZATION`, `AUTHORIZATION_REVERSAL`, `CREDIT_AUTHORIZATION_ADVICE`, `AUTHORIZATION_EXPIRY`, `CLEARING`, `BALANCE_INQUIRY`, `RETURN`, `RETURN_REVERSAL`, `CORRECTION_DEBIT`, `CORRECTION_CREDIT`, `ACH_RECEIPT`, `ACH_ORIGINATION_PENDING`, `ACH_ORIGINATION_PROCESSED`, `ACH_ORIGINATION_RELEASED`, `ACH_RETURN_PENDING`, `ACH_RETURN`, `ACH_INSUFFICIENT_FUNDS`, `TRANSFER`, `TRANSFER_INSUFFICIENT_FUNDS` |
| result  | `APPROVED`, `DECLINED`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| created | Date and time for when the transaction event occurred                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| token   | Globally unique identifier for the transaction event                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

# List Financial Transactions

```bash
GET https://api.lithic.com/v1/financial_accounts/{financial_account_token}/financial_transactions
```

|                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| financial*account\_token* (required, path parameter)\_ | Globally unique identifier for the financial account whose associated financial transactions should be returned.<br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).*                                                                                                                                                                                                                                                                                                        |
| category *(optional, query parameter)*                 | Financial Transaction category to be returned.<br /> *String. Permitted values: ACH, CARD, TRANSFER.*                                                                                                                                                                                                                                                                                                                                                                                                  |
| status *(optional, query parameter)*                   | Financial Transaction status to be returned.<br /> *String. Permitted values: PENDING, VOIDED, SETTLED, DECLINED, EXPIRED.*                                                                                                                                                                                                                                                                                                                                                                            |
| result *(optional, query parameter)*                   | Financial Transaction result to be returned.<br /> *String. Permitted values: APPROVED, DECLINED.*                                                                                                                                                                                                                                                                                                                                                                                                     |
| begin *(optional, query parameter)*                    | Transaction entries created on or after the specific date will be included.<br /> *String. Permitted values: Date string in the RFC 3339 format: yyyy-MM-dd’T’hh:mm:ss.SSSZ.*                                                                                                                                                                                                                                                                                                                          |
| end *(optional, query parameter)*                      | Transaction entries created before the specific date will be included (i.e., transaction entries created on the specified date will not be included).<br /> *String. Permitted values: Date string in the RFC 3339 format: yyyy-MM-dd’T’hh:mm:ss.SSSZ.*                                                                                                                                                                                                                                                |
| page*size* (optional, query parameter)\_               | For cursor-based pagination - specifies the number of entries to be included on each page in the response. Default value is 100.<br /> *Integer. Permitted values: 1-100.*                                                                                                                                                                                                                                                                                                                             |
| starting*after* (optional, query parameter)\_          | For cursor-based pagination - specifies the next object in a list to be returned. Requests can only use either starting*after or ending\_before. <br /> For example, you have a list of 100 Financial Transaction objects where the first entry is UUID `abcd` and last entry is UUID `wxyz`. A request of starting\_after = `abcd` and page\_size = 100 will return 99 results (`abcd` is excluded from the response)<br /> \_String. Permitted values: 36-digit version 4 UUID (including hyphens).* |
| ending*before* (optional, query parameter)\_           | For cursor-based pagination - specifies the last object in a list to be returned. Requests can only use either starting*after or ending\_before.<br /> For example, you have a list of 100 Financial Transaction objects where the first entry is UUID `abcd` and last entry is UUID `wxyz`. A request of ending\_before = `wxyz` and page\_size = 100 will return the full list of 100<br /> \_String. Permitted values: 36-digit version 4 UUID (including hyphens)*                                 |

**Sample Request**

```bash
curl https://api.lithic.com/v1/financial_accounts/764fa5a3-2371-40f0-8cbb-9a2e1230d955/financial_transactions \
  -H "Authorization: YOUR_API_KEY"
```

**Sample Response**

```json
{
  "data": [
    {
      "category": "CARD",
      "status": "PENDING",
      "result": "APPROVED",
      "token": "18394f8e-711b-4b3e-ae21-d35a9eafe7d1",
      "settled_amount": 0,
      "pending_amount": -1000,
      "currency": "USD",
      "events": [
        {
          "amount": -1000,
          "type": "AUTHORIZATION",
          "result": "APPROVED",
          "created": "2022-07-18T21:40:07.011Z",
          "token": "ba9a1a51-d035-4c21-a2a2-ed00a8f1f209"
        }
      ],
      "descriptor": "MERCHANT ABC",
      "created": "2022-07-18T21:40:07.011Z",
      "updated": "2022-07-18T21:40:07.011Z"
    }
  ],
  "has_more": false
}
```

# Get Financial Transaction

```bash
GET https://api.lithic.com/v1/financial_accounts/{financial_account_token}/financial_transactions/{financial_transaction_token}
```

|                                                        |                                                                                                                                                                                                 |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| financial*account\_token* (required, path parameter)\_ | Globally unique identifier for the financial account whose associated financial transactions should be returned.<br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).* |
| token *(required, path parameter)*                     | Globally unique identifier for the financial transaction that should be returned.<br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).*                                |

**Sample Request**

```bash
curl https://api.lithic.com/v1/financial_accounts/3fa85f64-5717-4562-b3fc-2c963f66afa6/financial_transactions/18394f8e-711b-4b3e-ae21-d35a9eafe7d1
  -H "Authorization: YOUR_API_KEY"
```

**Sample Response**

```json
{
  "category": "CARD",
  "status": "PENDING",
  "result": "APPROVED",
  "token": "18394f8e-711b-4b3e-ae21-d35a9eafe7d1",
  "settled_amount": 0,
  "pending_amount": -1000,
  "currency": "USD",
  "events": [
    {
      "amount": -1000,
      "type": "CARD_AUTHORIZATION",
      "result": "APPROVED",
      "created": "2022-07-18T21:40:07.011Z",
      "token": "ba9a1a51-d035-4c21-a2a2-ed00a8f1f209"
    }
  ],
  "descriptor": "MERCHANT ABC",
  "created": "2022-07-18T21:40:07.011Z",
  "updated": "2022-07-18T21:40:07.011Z"
}
```

# Enumerations

## Financial\_transaction.status

|          |                                                                                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PENDING  | The financial transaction is still pending completion from the merchant (card transaction) or pending release from an ACH hold period (ACH transactions) |
| SETTLED  | The financial transaction is complete                                                                                                                    |
| VOIDED   | Previously pending card transaction has been voided by the merchant                                                                                      |
| EXPIRED  | Previously pending card transaction has been voided by Lithic                                                                                            |
| DECLINED | A card transaction that was declined                                                                                                                     |

## Financial\_transaction.result

|          |                                                      |
| -------- | ---------------------------------------------------- |
| APPROVED | Successful transaction                               |
| DECLINED | Transaction was declined by user, Lithic, or network |

# Events API and Webhooks

You can receive notification of Financial Transaction events by subscribing to the following event types in the [Events API](https://docs.lithic.com/docs/events-api):

* `payment_transaction.created`: receive notification when Lithic first receives or originates an ACH transaction
* `payment_transaction.updated`: receive notification when there has been a change in the status of an existing ACH transaction such as an ACH return
* `transfer_transaction.created`: receive notification when a transfer between your financial accounts at Lithic has occurred
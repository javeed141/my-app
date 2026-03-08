# ACH Payment API

Originate ACH transactions to External Bank Accounts

The Payments API enables you to move funds between a Lithic-assigned general purpose account (see [Financial Accounts](https://docs.lithic.com/docs/financial-accounts)) and an external bank account (see [External Bank Accounts](https://docs.lithic.com/docs/external-accounts-api)). Funds are currently moved via ACH but additional payment rails will be added in the future.

This page gives an overview of the API objects and endpoints you will work with for ACH payments. See the [ACH Payments Lifecycle](https://docs.lithic.com/docs/ach-payments-lifecycle) for more detailed information about possible lifecycle permutations.

<br />

<br />

# Payments Schema

```json
{
  "category": "String",
  "created": "String",
  "currency": "String",
  "descriptor": "String",
  "events": [ Event ],
  "pending_amount": "Integer",
  "result": "String",
  "settled_amount": "Integer",
  "status": "String",
  "token": "String",
  "updated": "String",
  "method_attributes": { Method_Attribute
  },
  "external_bank_account_token": "String",
  "direction": "String",
  "source": "String",
  "method": "String",
  "user_defined_id": "String",
}
```

| Field                          | Description                                                                                                                                                                                                                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| category                       | Type of payment. Currently, only `ACH` is supported                                                                                                                                                                                                                                                                               |
| created                        | Date and time of when this payment was first created                                                                                                                                                                                                                                                                              |
| currency                       | Currency of payment transaction in 3-digit alphabetic ISO 4217 code                                                                                                                                                                                                                                                               |
| descriptor                     | Customer-provided description for the payment in `memo` field. First 10 characters may appear in RDFI bank statement                                                                                                                                                                                                              |
| events                         | A list of events that have modified this payment                                                                                                                                                                                                                                                                                  |
| pending\_amount                | Pending amount of the transaction in the currency's smallest unit (e.g., cents for USD). Positive amount indicates the payment, once completed, will increase your balance while a negative amount indicates it will decrease your balance. <br /> The value of this field will go to zero over time once the payment is settled. |
| settled\_amount                | Completed amount of the payment in the currency's smallest unit (e.g., cents for USD). Positive amount indicates the payment increases your balance while a negative amount indicates it decreases your balance. <br /> The value of this field will grow over time once the payment is settled                                   |
| result                         | `APPROVED`, `DECLINED`                                                                                                                                                                                                                                                                                                            |
| status                         | `DECLINED`, `EXPIRED`, `PENDING`, `SETTLED`, `VOIDED` ,`RETURNED`, `REVERSED`                                                                                                                                                                                                                                                     |
| token                          | Globally unique identifier for this payment                                                                                                                                                                                                                                                                                       |
| updated                        | Date and time of when this payment was last updated                                                                                                                                                                                                                                                                               |
| method\_attributes             | Additional fields unique to the payment type                                                                                                                                                                                                                                                                                      |
| external\_bank\_account\_token | Globally unique identifier of a record of an external bank account. This is the bank account that Lithic will either send funds to or collect funds from                                                                                                                                                                          |
| direction                      | `DEBIT` indicates funds are moving from an external bank account to a Lithic-assigned virtual bank account number. <br /> `CREDIT` indicates funds are moving from a Lithic-assigned virtual bank account number to an external bank account                                                                                      |
| source                         | `LITHIC` which indicates a manual payment initiated by Lithic, `CUSTOMER` which indicates a payment initiated by customers                                                                                                                                                                                                        |
| method                         | `ACH_NEXT_DAY`, `ACH_SAME_DAY`                                                                                                                                                                                                                                                                                                    |
| user\_defined\_id              | Additional metadata provided by customers that may help with reconciliation against other systems                                                                                                                                                                                                                                 |

## Event Schema

```json
{
	  "amount": Integer,
	  "type": String,
	  "result": String,
  	"detailed_results": List,
	  "created": String,
	  "token": String
}
```

| Field             | Description                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| amount            | Amount of the transaction event in the currency's smallest unit (e.g., cents for USD)                                                                                                                                                                                                                                          |
| type              | `ACH_ORIGINATION_INITIATED`, `ACH_ORIGINATION_REVIEWED`, `ACH_ORIGINATION_PROCESSED`, `ACH_ORIGINATION_SETTLED`, `ACH_ORIGINATION_RELEASED`, `ACH_RETURN_INITIATED` `ACH_RETURN_PROCESSED`, `ACH_RECEIPT_PROCESSED`, `ACH_RECEIPT_SETTLED`. See [ACH Payments Lifecycle](https://docs.lithic.com/docs/ach-payments-lifecycle) for more details on each. |
| result            | `APPROVED`, `DECLINED`                                                                                                                                                                                                                                                                                                         |
| detailed\_results | `APPROVED`, `FUNDS_INSUFFICIENT`, `ACCOUNT_INVALID`, `PROGRAM_TRANSACTION_LIMIT_EXCEEDED`, `PROGRAM_DAILY_LIMIT_EXCEEDED`, `PROGRAM_MONTHLY_LIMIT_EXCEEDED`. See [ACH Payments Lifecycle](https://docs.lithic.com/docs/ach-payments-lifecycle) for more details on each.                                                                                |
| created           | Date and time for when the transaction event occurred                                                                                                                                                                                                                                                                          |
| token             | Globally unique identifier for the transaction event                                                                                                                                                                                                                                                                           |

## Method Attribute Schema

This object contains attributes that are specific to the payment method. Lithic currently only displays attributes for ACH

```json
{
  "sec_code": "String",
  "retries": Integer,
  "return_reason_code": "String",
  "company_id": "String",
  "receipt_routing_number": "String",
  "addenda": "String"
}
```

| Field                    | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sec\_code                | Code used by ACH network to indicate nature of ACH transaction. Lithic currently supports ACH originations for the following SEC codes: <br /><br />- **CCD** : Corporate Credit or Debit<br />- **PPD** : Pre-arranged Payment or Deposit<br />- **WEB**: Internet-Initiated/Mobile Entries <br /> See full list of SEC Codes NACHA supports [here](https://achdevguide.nacha.org/ach-file-details). |
| retries                  | Number of retries for an ACH origination that was returned due to insufficient funds                                                                                                                                                                                                                                                                                                                  |
| return\_reason\_code     | Reason for ACH return provided by the recipient bank                                                                                                                                                                                                                                                                                                                                                  |
| company\_id              | For ACH receipts, a 10-digit unique identifier of the entity that sent the ACH transaction                                                                                                                                                                                                                                                                                                            |
| receipt\_routing\_number | For ACH receipts, the routing number that the receipt was sent from                                                                                                                                                                                                                                                                                                                                   |
| addenda                  | Additional information about the entry that can be passed from ODFI -> RDFI through the ACH network. Note that not all RDFIs surface addenda information to their end users.                                                                                                                                                                                                                          |

# Create payment

```bash
POST https://api.lithic.com/v1/payments
```

Use this endpoint to create a payment between a Lithic-assigned virtual bank account and an External Bank Account verified with Lithic.

**Sample Request**

```bash
curl https://api.lithic.com/v1/payments \
	-X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
	-d '
{
  "type": "COLLECTION",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "method": "ACH_NEXT_DAY",
  "financial_account_token": "f817bc6a-e9d5-49bf-8caa-b4bf442c9408",
  "external_bank_account_token": "6548116f-6a34-41d9-a9d4-0b93f000e32e",
  "amount": 500,
  "memo": "Test"
}
'
```

**Sample Response**

```json
{
  "category": "ACH",
  "created": "2023-06-03T23:30:23Z",
  "currency": "USD",
  "descriptor": "Test",
  "events": [
    {
      "amount": 500,
      "created": "2023-06-03T23:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_PENDING"
    }
  ],
  "pending_amount": 500,
  "result": "APPROVED",
  "settled_amount": 0,
  "status": "PENDING",
  "token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": "2023-06-03T23:30:23Z",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "external_bank_account_token": "6548116f-6a34-41d9-a9d4-0b93f000e32e",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "user_defined_id": null,
  "balance": {
    "available_amount": 0,
    "created": "2023-06-03T23:30:23Z",
    "currency": "string",
    "last_transaction_event_token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
    "last_transaction_token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "pending_amount": 500,
    "token": "f817bc6a-e9d5-49bf-8caa-b4bf442c9408",
    "total_amount": 0,
    "type": "ISSUING",
    "updated": "2023-06-03T23:30:23Z"
  }
}
```

| Parameter                                   | Description                                                                                                                                                                                                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| financial*account\_token* (required)\_      | Globally unique identifier for the financial account that is sending or receiving funds <br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).*                                                                                          |
| external*bank\_account\_token* (required)\_ | Globally unique identifier for the external bank account record that is the counterparty to this payment transaction <br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).*                                                             |
| type *(required)*                           | Indicates the direction of the payment transaction where `PAYMENT` indicates financial*account `=>` external\_bank\_account and `COLLECTION` indicates financial\_account `<=` external\_bank\_account <br /> \_String. Permitted values:`PAYMENT`,`COLLECTION`* |
| amount *(required)*                         | Amount to be transferred in the currency's smallest unit (e.g., cents for USD). This should always be a positive value. <br /> *Integer. Permitted values: 0 or greater.*                                                                                        |
| memo *(optional)*                           | Optional descriptor for the payment. <br /> *String. Permitted values: 1-512 characters*                                                                                                                                                                         |
| method *(required)*                         | Indicates the payment rails used for this payment transaction <br /> *String. Permitted values:`ACH_NEXT_DAY`,`ACH_SAME_DAY`*                                                                                                                                    |
| method*attributes* (required)\_             | Additional fields required per payment type. For `ACH`, customers need to indicate the `sec_code` of the ACH payment; Lithic currently supports `CCD`, `PPD`, `WEB`. <br /> *String. Permitted values: varies by method*                                         |
| token *(optional)*                          | Customer-provided transaction token that will serve as an idempotency token. <br /> *String. Permitted values: 36-digit UUID (including hyphens).*                                                                                                               |
| user*defined\_id* (optional)\_              | Additional metadata provided by customers that may help with reconciliation against other systems <br /> *String. Permitted values: 1-512 characters*                                                                                                            |

# Retry ACH Return

For ACH originations that were returned with reason code R01 or R09 (insufficient funds), users can resubmit the origination after verifying that the recipient has sufficient balance to complete the ACH transaction. Users can retry up to 2 times per origination.

```
POST https://api.lithic.com/v1/payments/{payment_token}/retry
```

**Sample Request**

```bash
curl https://api.lithic.com/v1/payments/3fa85f64-5717-4562-b3fc-2c963f66afa6/retry
	-X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
```

# List payments

```bash
GET https://api.lithic.com/v1/payments
```

**Sample Request**

```bash
curl https://api.lithic.com/v1/payments\
  -H 'AUTHORIZATION: YOUR_API_KEY'
```

**Sample Response**

```json
{
  "data": [
    {
      "category": "ACH",
      "created": "2023-06-03T23:30:23Z",
      "currency": "USD",
      "descriptor": "Test",
      "events": [
        {
          "amount": 500,
          "created": "2023-06-03T23:30:23Z",
          "result": "APPROVED",
          "detailed_results": ["APPROVED"],
          "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
          "type": "ACH_ORIGINATION_PENDING"
        },
        {
          "amount": 500,
          "created": "2023-06-04T00:30:23Z",
          "result": "APPROVED",
          "detailed_results": ["APPROVED"],
          "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
          "type": "ACH_ORIGINATION_PROCESSED"
        }
      ],
      "pending_amount": 500,
      "result": "APPROVED",
      "settled_amount": 0,
      "status": "PENDING",
      "token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "updated": "2023-06-03T23:30:23Z",
      "method_attributes": {
        "sec_code": "CCD"
      },
      "external_bank_account_token": "6548116f-6a34-41d9-a9d4-0b93f000e32e",
      "direction": "DEBIT",
      "source": "CUSTOMER",
      "method": "ACH_NEXT_DAY",
      "user_defined_id": null
    }
  ],
  "has_more": true
}
```

| Parameter                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| financial*bank\_account\_token* (optional)\_  | Globally unique identifier for the financial account that is sending or receiving funds <br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).*                                                                                                                                                                                                                                                                                                                                |
| status *(optional)*                           | Query by payment status <br /> *String. Permitted values:`APPROVED`, `DECLINED`*                                                                                                                                                                                                                                                                                                                                                                                                                       |
| result *(optional)*                           | Query by payment result <br /> *String. Permitted values:`DECLINED`, `EXPIRED`, `PENDING`, `SETTLED`, `VOIDED`*                                                                                                                                                                                                                                                                                                                                                                                        |
| page*size* (optional, query parameter)\_      | For cursor-based pagination - specifies the number of entries to be included on each page in the response. Default value is 100.<br /> *Integer. Permitted values: 1-100.*                                                                                                                                                                                                                                                                                                                             |
| starting*after* (optional, query parameter)\_ | For cursor-based pagination - specifies the next object in a list to be returned. Requests can only use either starting*after or ending\_before. <br /> For example, you have a list of 100 Financial Transaction objects where the first entry is UUID `abcd` and last entry is UUID `wxyz`. A request of starting\_after = `abcd` and page\_size = 100 will return 99 results (`abcd` is excluded from the response)<br /> \_String. Permitted values: 36-digit version 4 UUID (including hyphens).* |
| ending*before* (optional, query parameter)\_  | For cursor-based pagination - specifies the last object in a list to be returned. Requests can only use either starting*after or ending\_before.<br /> For example, you have a list of 100 Financial Transaction objects where the first entry is UUID `abcd` and last entry is UUID `wxyz`. A request of ending\_before = `wxyz` and page\_size = 100 will return the full list of 100<br /> \_String. Permitted values: 36-digit version 4 UUID (including hyphens)*                                 |

# Get payment by token

```bash
GET https://api.lithic.com/v1/payments/{payment_token}
```

**Sample Request**

```bash
curl https://api.lithic.com/v1/payments/3fa85f64-5717-4562-b3fc-2c963f66afa6\
  -H 'AUTHORIZATION: YOUR_API_KEY'
```

**Sample Response**

```json
{
  "category": "ACH",
  "created": "2023-06-03T23:30:23Z",
  "currency": "USD",
  "descriptor": "Test",
  "events": [
    {
      "amount": 500,
      "created": "2023-06-03T23:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_PENDING"
    },
    {
      "amount": 500,
      "created": "2023-06-04T00:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_PROCESSED"
    }
  ],
  "pending_amount": 500,
  "result": "APPROVED",
  "settled_amount": 0,
  "status": "PENDING",
  "token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": "2023-06-03T23:30:23Z",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "external_bank_account_token": "6548116f-6a34-41d9-a9d4-0b93f000e32e",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "user_defined_id": null
}
```

| Parameter                                   | Description                                                                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| payment*token* (required, path parameter)\_ | Globally unique identifier for the payment <br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).* |

# Simulate payment release

```bash
POST https://api.lithic.com/v1/simulate/payments/release
```

Use this endpoint to release a simulated payment in Sandbox

**Sample Request**

```bash
curl https://sandbox.lithic.com/v1/simulate/payments/release\
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
	-d '
{
  "payment_token": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
'
```

**Sample Response**

```json
{
  "debugging_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "result": "APPROVED",
  "transaction_event_token": "cd20af3e-4979-402e-8fc6-3195f32802e6"
}
```

At this point, if you queried the GET Payment endpoint for this payment, you would see the below response where the payment `status` has been updated to `SETTLED` and an additional `ACH_ORIGINATION_RELEASED` event has been posted:

```json
{
  "category": "ACH",
  "created": "2023-06-03T23:30:23Z",
  "currency": "USD",
  "descriptor": "Test",
  "events": [
    {
      "amount": 500,
      "created": "2023-06-03T23:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_INITIATED"
    },
    {
      "amount": 500,
      "created": "2023-06-04T00:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_REVIEWED"
    },
    {
      "amount": 500,
      "created": "2023-06-04T00:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_PROCESSED"
    },
    {
      "amount": 500,
      "created": "2023-06-04T00:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_SETTLED"
    },
    {
      "amount": 500,
      "created": "2023-06-04T00:30:23Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_RELEASED"
    }
  ],
  "pending_amount": 0,
  "result": "APPROVED",
  "settled_amount": 500,
  "status": "SETTLED",
  "token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": "2023-06-03T23:30:23Z",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "external_bank_account_token": "6548116f-6a34-41d9-a9d4-0b93f000e32e",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "user_defined_id": null
}
```
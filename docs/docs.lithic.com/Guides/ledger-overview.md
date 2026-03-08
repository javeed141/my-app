# Ledger Overview

Use Lithic's native Financial Accounts to track balances

Any card or payments product needs a reliable system of record to track the movement of value between internal and external sources. Having an immutable, double-entry ledger is the right path for any fintech businesses looking to launch and scale their offering and transactional flows. At a high level, that means:

* **Immutable:** Once a transaction is recorded, it cannot be altered, deleted, or reversed - only new entries can be added to correct or adjust previous records. This ensures an auditable history of all financial activity.
* **Double-Entry**: Every transaction is recorded in at least two accounts - a debit in one account and an equal credit in another - ensuring accounting always balances. This creates a self-checking system that maintains accuracy and detects unexpected money movements.

<br />

Lithic offers a native ledger that follows both of the above principles, and uses the following building blocks to help you construct your program offering:

* **Financial Accounts**: Balance-tracking object that serves as the container for the transactions tied to an account holder's financial activity
* **Transactions**: Balance-affecting objects that happen to the Financial Account based on actions received from a payment network, customer API, or internal process. At Lithic, we have 5 families of Transactions:
  * Card Transactions
  * Payment Transactions
  * Book Transfer Transactions
  * Management Operation Transactions
  * External Payments Transactions
* **Events**: Sequence of event objects that happen to transactions. Events can be balance affecting, or non-balance affecting

In using our Financial Accounts and Transactions, you will see this core data populated in various endpoints. Below is an example of an [ACH payment transaction](https://docs.lithic.com/reference/getpaymentbytoken):

```json
{
  "status": "PENDING",
  //The unique identifier for the transaction
  "token": "40a85f64-5717-4562-b3fc-2c963f66afa1",
  "created": "2025-12-26T21:42:59.779Z",
  "updated": "2025-12-26T21:42:59.779Z",
  "family": "PAYMENT",
  "category": "ACH",
  "type": "ORIGINATION_CREDIT",
  "currency": "USD",
  "result": "APPROVED",
  // The unique identifier for the balance tracking financial account that is affected by this payment
  "financial_account_token": "5ca85f64-5717-4562-b3fc-2c963f66afa6",
  // The unique indentifier for the financial account outside of Lithic's system that the payment is   going to
  "external_bank_account_token": "c9a85f64-5717-4562-b3fc-2c963f66afa6",
  "direction": "CREDIT",
  "source": "LITHIC",
  "method": "ACH_NEXT_DAY",
  "settled_amount": 0,
  "pending_amount": 10000,
  //The corresponding events that happen as part of this Transaction. This list grows as new events happen
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2025-12-26T21:42:59.779Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2025-12-26T21:42:59.779Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2025-12-26T21:42:59.779Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    }
  ],
  "descriptor": "string",
  "user_defined_id": "string",
  "expected_release_date": "2025-12-26",
  "related_account_tokens": {
    "business_account_token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "account_token": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  //Payment-specific information. In this case it's ACH
  "method_attributes": {
    "sec_code": "CCD",
    "return_reason_code": "string",
    "ach_hold_period": 0,
    "retries": 0,
    "company_id": "string",
    "receipt_routing_number": "string",
    "trace_numbers": ["string"],
    "addenda": "string"
  }
}
```

For customers using Lithic for Financial Accounts and ledgering, we post [webhook events](https://docs.lithic.com/reference/post_financial-account-updated) to update customers on the latest for any Financial Account changes, new Transactions, or new Events for existing Transactions.
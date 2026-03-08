# Example Requests

These are sample payloads that can be used when creating an expected payment. To automatically reconcile Expected Payments to Transactions, you will need to also [create reconciliation rules](https://docs.moderntreasury.com/reconciliation/docs/defining-your-reconciliation-rules) to specify how the data will be used for matching.

## Expecting to be charged

The following request will indicate that you are expecting to be charged $10.

```json
{
  "reconciliation_rule_variables":[
    {
      "direction": "debit",
      "amount_lower_bound": 100000,
      "amount_upper_bound": 100000,
      "internal_account_id": "<Internal Account ID>"
    }
  ] 
}
```

## Expecting to receive money

The following request will indicate that you're expecting to receive $200,000

```json
{
  "reconciliation_rule_variables":[
    {
      "direction": "credit",
      "amount_lower_bound": 20000000,
      "amount_upper_bound": 20000000,
      "internal_account_id": "<Internal Account ID>"
    }
  ] 
}
```

## Using Ranges

The following request uses ranges to show that you're expecting to receive between $100-$110, sometime between the dates 5/15/2024-5/22/2024. A reconciliation rule can be created to ensure a transaction will only reconcile if it matches these criteria.

```json
{
  "reconciliation_rule_variables":[
    {
      "direction": "credit",
      "amount_lower_bound": 10000,
      "amount_upper_bound": 11000,
      "internal_account_id": "<Internal Account ID>",
      "date_lower_bound": "2024-05-15",
      "date_upper_bound": "2024-05-22"
    }
  ] 
}

```

## Using Custom Identifiers

The following request enables you to add `custom_identifiers` to further restrict the reconciliation rule to only match transactions that have specific remittance information included, such as the `email address` or `payment_id` present in the transaction data.

```json JSON
{
  "reconciliation_rule_variables":[
    {
      "direction": "credit",
      "amount_lower_bound": 10000,
      "amount_upper_bound": 11000,
      "internal_account_id": "<Internal Account ID>",
      "date_lower_bound": "2024-05-15",
      "date_upper_bound": "2024-05-22",
      "custom_identifiers":{
        "buyer_email_address": "jennifer.dough@email.com",
        "payment_id": "abc123"
      }
    }
  ] 
}
```

## Representing an Off Platform Check Payment

The following request provides an example of how to represent an off platform check payment using the `custom_identifier` fields on the expected payment. The custom identifiers will be used within a reconciliation rule to match transactions that include check-specific information, such as the `check_number` and `payee_name`.

For checks, the `date_lower_bound` and `date_upper_bound` reflect the date range in which the check is expected to be cashed. It is important to define both the `issue_date` as a custom identifier along with appropriate `date_lower_bound` and`date_upper_bound` fields that reflect your policies around check validity and automatic voiding. Checks cashed outside of that date range will not reconcile.

```json JSON
{
  "reconciliation_rule_variables": [
    {
      "direction": "debit",
      "amount_lower_bound": 1000,
      "amount_upper_bound": 1000,
      "internal_account_id": "<Internal Account ID>",
      "currency": "USD",
      "type": "check",
      "date_lower_bound": "2025-05-08",
      "date_upper_bound": "2025-011-08",
      "custom_identifiers": {
        "check_number": "121782323",
        "issue_date": "2025-05-08",
        "payee_name": "Ted Mosby",
        "originating_account_number": "1234567890"
      }
    }
  ]
}
```

## Creating a Ledger Transaction with the Expected Payment

Ledger Transactions can be created inline with Expected Payments. If Ledger Transaction creation fails, Expected Payment creation will also fail. The Ledger Transaction status will be automatically updated based on the status of the Expected Payment.

```json JSON
{
  "ledger_transaction": {
    "description": "Sample Ledger Transaction Description",
    "ledger_entries": [
      {
        "amount": 1000,
        "direction": "credit",
        "ledger_account_id": "<Ledger Account ID1>"
      },
      {
        "amount": 1000,
        "direction": "debit",
        "ledger_account_id": "<Ledger Account ID2>"
      }
    ]
  },
  "reconciliation_rule_variables": [
    {
      "internal_account_id": "ffed3525-fa0a-42a2-b513-cf712d8576a2",
      "direction": "credit",
      "amount_lower_bound": 1000,
      "amount_upper_bound": 1000
    }
  ]
}
```
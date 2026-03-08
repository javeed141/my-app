# Example Categorization Rules

This feature can support custom rules based on your use case. To help illustrate functionality, below are sample rules.

Rules shown here are for illustrative purposes only and your actual implementation may vary.

### General Ledger Account Tagging

This sample rule tags general ledger codes on transactions as they are reconciled to streamline month-end book closes.

If the following conditions are met:

* Transaction `Internal Account` **is** Customer Revenue (\*2450); **AND**
* Transaction `direction` **is** Credit

Apply metadata:

| Key                                  | Value                                |
| :----------------------------------- | :----------------------------------- |
| General Ledger Account Code - Credit | 2120012 - Customers Revenue          |
| General Ledger Account Code - Debit  | 2120023 - Bank Account Ending \*2450 |
| Subsidiary                           | Main                                 |

### Treasury Codes

In this example, we apply metadata to a transaction with a specific description field. Treasury codes are often used to support downstream reporting.

If the following conditions are met:

* Transaction `direction` **is** Credit.

**AND**

* Transaction `vendor_description` **contains** "CREDIT\_POS"

Apply metadata:

| Key           | Value                                       |
| :------------ | :------------------------------------------ |
| Treasury Code | S824 - Incoming Credit From Tier 1 Customer |
| Treasury Code | POS Credit                                  |

### High-value payments

This sample rule flags transactions that require further work by a payment operations team, in this case, a high-priority counterparty.

If the following conditions are met:

* Reconciled Payment Order `Counterparty` **is** ACME Co; **AND**
* Transaction `Amount` **is greater than** $500.00; **AND**

Apply metadata:

| Key      | Value |
| :------- | :---- |
| Customer | ACME  |
| Priority | High  |
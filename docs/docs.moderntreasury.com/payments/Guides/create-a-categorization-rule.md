# Create a Categorization Rule

New rules can be created in [Settings / Categorization Rules](https://app.moderntreasury.com/settings/transaction_categorization/rules).

Rule conditions can reference fields in the transaction object itself, as well as Expected Payments and Payment Orders reconciled to that Transaction. For a primer on reconciliation, refer to [Reconciliation Overview](https://docs.moderntreasury.com/payments/docs/overview).

### Conditions

We currently support the condition fields below. Contact [product@moderntreasury.com](mailto:product@moderntreasury.com) if you require support for additional condition fields.

| Object                      | Condition Field     | Supported Operators                                                       |
| :-------------------------- | :------------------ | :------------------------------------------------------------------------ |
| Transaction                 | Vendor Description  | Equal To; Not Equal To; Contains; Does Not Contain                        |
| Transaction                 | As of Date          | Greater Than or Equal To; Lower Than or Equal To                          |
| Transaction                 | Amount              | Equal To, Not Equal To; Greater Than or Equal To; Lower Than or Equal To; |
| Transaction                 | Currency            | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |
| Transaction                 | Type                | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |
| Transaction                 | Direction           | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |
| Transaction                 | Internal Account    | Is Any of; Is Not Any Of                                                  |
| Reconciled Expected Payment | Counterparty        | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |
| Reconciled Payment Order    | Counterparty        | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |
| Reconciled Payment Order    | Originating Account | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |
| Reconciled Payment Order    | Purpose Code        | Contains; Does Not Contain                                                |
| Reconciled Payment Order    | Creation Method     | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |
| Reconciled Payment Order    | Type                | Equal To; Not Equal To; Is Any Of; Is Not Any Of                          |

For examples of how to use these fields for different use cases refer to [Sample Categorization Rules](https://docs.moderntreasury.com/payments/docs/example-categorization-rules)

### Rule Timing

When creating a new rule, you can define the time it should apply. Rules can run either when a transaction is created in Modern Treasury, or when it is reconciled.

* **Run rule at creation**: if you intend to report unreconciled transactions, this option allows you to apply tags as soon as Modern Treasury ingests the transaction object from your vendor, regardless of reconciliation. This can help categorize unexpected transactions, such as interest, fees, or charges. Note that a rule that runs at creation cannot refer to Payment Orders or Expected Payment condition fields, as these are available only after reconciliation. We recommend using this option if you require to apply general tags to all your transactions.
* **Run rule at reconciliation**: in this case, the rule will apply when a transaction is reconciled. This is best used for rules that require referencing to the reconciled Expected Payment or Payment Order to tag. These rules allow you to reference fields such as `counterparty`, `purpose code`, or `type` in the reconciled EP or PO. We recommend using this option for more granular tagging logic.

### Many Expected Payments or Payment Orders

In the event of many Expected Payments or many Payment Orders reconciled to the same transaction, the condition fields for **all** reconciled Expected Payments or Payment Orders need to be evaluated to **true** for the metadata to be applied.

For example, a rule that applies the metadata tag `payment category: vendor payout to ACME` if the reconciled Expected Payment counterparty is `ACME Co` would only apply when **all** reconciled Expected Payments have counterparty `ACME Co`.
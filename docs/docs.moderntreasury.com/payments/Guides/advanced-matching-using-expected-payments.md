# Advanced Matching Using Expected Payments

## Amount Variance

Reconciliation can still be automated when the transaction amount is unclear or might have a variance. For example, due to foreign exchange conversion, blended fees such as interchange, or other types of unpredictability.

### Reconciling One Transaction to One Expected Payment

An amount range can be set on the Expected Payment by providing the `amount_lower_bound` and `amount_upper_bound` in the `reconciliation_rule_variable` array.

Transactions and Expected Payments will automatically reconcile when the Transaction amount is within the Expected Payment amount range.

<Image border={false} src="https://files.readme.io/e12e39b-image.png" />

In this case, when reconciling with a Rule with an amount range:

* Transaction will be marked as reconciled (`reconciled` = `true`).
* Expected Payment will be marked as reconciled (`status` = `reconciled`).
* Transaction Line Item that link the two items will have an amount equal to the Transaction amount.

**Example**

* Your Reconciliation Rule attempts to reconcile:
  * Transaction with amount = $100
  * Expected Payment with amount range = $80-$100 (inclusive), i.e., the `amount_lower_bound`=$80, and \`amount\_upper\_bound=$100.
* Result:
  * Transaction `reconciled` = `true`.
  * Expected Payment `status` = `reconciled`.
  * Transaction Line Item linking the objects has `amount` = $100.

### Reconciling One Transaction to Many Expected Payments

A Reconciliation Rule can be created with an `amount_variance_type` of `fixed`  or `percentage`.

* When the `amount_variance_type` is `fixed` the `amount_variance_threshold` is specified in the smallest unit of the currency (e.g., cents for USD). To set a $5 variance in USD, you would use 500 for the `amount_variance_threshold`.
* When the `amount_variance_type` is `percentage` the `amount_variance_threshold` is specified in percent points. To set a 10% variance, you would use 10 for the `amount_variance_threshold`.

When reconciling with a Rule with amount variance:

* Transaction will remain unreconciled (`reconciled` = `false`).
* Expected Payments will be marked as reconciled (`status` = `reconciled`).
* Transaction Line Items that link the two items will have an amount equal to the Expected Payment amount.

In the case of One Transaction to Many Expected Payments, the Transaction remains unreconciled until 1 or more Expected Payments are reconciled to close the variance in amount between the Transaction and the sum of the Expected Payment amount. This aids teams in being able to account for and record the variance amount(s) before fully reconciling the transaction.

**Example**

* Your Reconciliation Rule has:
  * `amount_variance_type` = `percentage`
  * `amount_variance_threshold` = 1.
  * This means it will reconcile if the sum of the Expected Payment amount is between 99% and 101% of the Transaction amount.
* Your Reconciliation Rule attempts to reconcile:
  * Transaction with amount = $100
  * 2 Expected Payments with amounts = $50 and $51
* Result:
  * Transaction `reconciled` = `false`, with a net variance of $1 in reconciled amount.
  * Both Expected Payments have `status` = `reconciled`.
  * Transaction Line Items have amounts = $50 and $51, respectively.

## Net Credit and Debit Reconciliation

When creating a *One Transaction to Many Expected Payments* Reconciliation Rule, users can specify whether one Transaction should be reconciled against a set of Expected Payments in only one direction (either all credits or all debits) or against a net amount of both credit and debit Expected Payments.

This field is controlled by the 'Net of Credit and Debits' toggle.

When 'Net of Credit and Debits' is off, a Transaction can be matched with Expected Payments in only one direction. For example, a $100 credit Transaction would reconcile to a set of two Expected Payments with amounts of $70 credit and $30 credit.

When 'Net of Credit and Debits' is on, a Transaction can be matched with a net amount of both credit and debit Expected Payments. For example, a $100 credit Transaction would reconcile to a set of three Expected Payments with amounts of $100 credit, $50 credit and $50 debit.
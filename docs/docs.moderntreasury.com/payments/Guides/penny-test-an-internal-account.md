# Penny test your Internal Account

After your bank connection to Modern Treasury is complete and live, we highly recommend conducting comprehensive Payment Order tests on every linked bank account to ensure seamless functionality.

Test payments should encompass various scenarios applicable to your use case, including:

* 1 test credit Payment Order
* 1 test debit Payment Order
* 1 test Payment Order expected to result in a Return

Given these will be test payments in production, use low balance amounts (under 1 or 5 dollars). Penny testing will ensure your connection to Modern Treasury has been set up correctly.

# To penny test an Internal Account

1. ## Create Counterparties

* Navigate to Counterparties Overview. From the "Create New" dropdown menu in the top right-hand corner, click "Counterparty".
  * **Create a legitimate Counterparty** using a bank account where you will be able to view the bank statements. This should not be the bank account that is already connected to MT as your Internal Bank Account.
  * **Create a dummy Counterparty** that will result in a `Returned` payment. Below are example bank account details you can add as the External Account for this Counterparty (**note:** that MT has a validation check in place that requires authentic Routing Numbers when initiating Payment Orders).
    * Counterparty Name: Rosie Returns
    * Email: N/A
    * Account Number: 789567123
    * Routing Number: 021000021
    * Account Type: Checking
    * Party Type: Individual

2. ## Create Test Payment Orders

* Navigate to Payments Overview.  From the "Create New" dropdown menu in the top right-hand corner, click "Payment Order".
  * For each connected bank account, send a payment for each direction and each payment type, as well as one to test returned payments.
    * ACH (or RFP, Same-Day ACH, etc.) debit
    * ACH (or RTP, Same-Day ACH, Wire, etc.) credit
    * ACH debit or credit that is sure to be `Returned` (by using the dummy Counterparty)

3. ## Validation

* Test Payment Orders should progress to the `Completed` status, which means a Payment Order has been reconciled with a posted Transaction.
  * Reference the [Payment Order Lifecycle](/platform/reference/payment-order-object#payment-order-statuses) for a comprehensive overview of statuses.
* For tests involving returned Payment Orders, note that a Payment Order must transition to `Completed` status before reaching `Returned` status, which is the desired outcome.
  * You can find ACH Return Reason Codes at this [link](/payments/docs/ach-return-codes).

<br />
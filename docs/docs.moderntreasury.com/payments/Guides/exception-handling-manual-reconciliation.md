# Exception Handling - Manual Reconciliation

When Modern Treasury cannot automatically match an Expected Payment with a Transaction, users can step in to manually review and reconcile the items. This may happen if the Expected Payment does not meet the criteria set by your configured Reconciliation Rules.

> 📘 Single Transaction to Many Expected Payments Reconciliation
>
> In the case where a single bank Transaction corresponds to multiple Expected Payments, you can specify the breakdown and reconcile all to the Transaction.

> 📘 Adjusting the Expected Payment Amount
>
> When the amount on the Expected Payment is incorrect, you can adjust the amount before reconciling it (within the "Enter Amount" text field).

# Reconcile to Existing Expected Payment(s)

1. Navigate to Reconciliation > Reconcile
2. In the Side-by-Side Reconciliation view, select the Transaction(s) on the left side
3. Select the Expected Payment(s) on the right side.
4. Ensure the difference noted at the top is as desired. In most cases, this will be 0, as the selected transactions fully offset the selected expected payments.
5. Click "Reconcile" to finish.

Upon being reconciled, a *reconciled* webhook will be sent for both the Transaction and Expected Payment objects.

# Reconcile to New Expected Payment

1. Navigate to any unreconciled Transaction
2. Under the “Reconciled Items” tab, click the "Manually Reconcile" to generate a list of possible matching Expected Payments
   * You can filter by amount, date, description, or metadata to further refine your search
3. Select one or multiple Expected Payments to reconcile to the Transaction
4. Once the Expected Payments have been selected, specify the "Amount To" reconcile to the Transaction
5. Click "Match" to finish manually reconciling the Expected Payment

Upon being reconciled, a *reconciled* webhook will be sent for both the Transaction and Expected Payment object.
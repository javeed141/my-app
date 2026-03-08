# When to use Entity Linking

Entity linking is related but solves a different problem from reconciliation. Reconciliation matches payment intent to actuals, and updates statuses across objects such as Payment Orders, Expected Payments, and Transactions together. Whereas linking provides an informational connection between payment intent objects.

### Sample workflow: marketplace pay-ins and payouts.

As an example, consider a marketplace using Modern Treasury to receive funds from a buyer (ACME Co) and send them to a seller (Numbus Works Inc). Here is how this workflow can be represented in Modern Treasury:

<Image border={false} src="https://files.readme.io/3afca8bd5425f4651f15861859e2ee39a67c01b0e36f73ea4c27ccec95b9bbd1-image.png" />

1. First, an Expected Payment is created to represent incoming funds from ACME Co. This is typically tied to an invoice or another business record representing a receivable that is due.
2. Incoming funds arrive from ACME Co., represented by a Transaction item.
3. After the Transaction is added to Modern Treasury, it is then reconciled to the appropriate Expected Payment using reconciliation rules. For more information, read [Reconciliation Rules Overview](https://docs.moderntreasury.com/payments/docs/defining-reconciliation-rules).
4. After reconciliation, a Payment Order is created to represent the disbursement of funds to the seller. Instructions are sent to the bank for processing.
5. The outgoing transaction is processed by the bank as intended.
6. Modern Treasury automatically reconciles the Payment Order to the outgoing Transaction.
7. Finally, to represent that both the Payment Order and the Expected Payment were part of the same sale, the marketplace links both objects using the Link page in the app.

For more information on Entity Linking, refer to our documentation [here](https://docs.moderntreasury.com/payments/docs/link-payment-orders-to-expected-payments-entity-linking).

### How Linking and Reconciliation Work

Importantly, reconciliation includes a host of system behaviors that linking does not:

* In reconciliation, item statuses are linked. For example, an Expected Payment will have its status changed to `reconciled` after it is matched to a Transaction and vice versa. The same does **not** occur for linking.
* To support reconciliation, Modern Treasury automatically defines fields such as `amount unreconciled`. This balance is calculated in Expected Payments and Transactions to support manual reconciliation, but no similar field exists for linking.
* Reconciliation triggers webhook events such as `reconciled` and `unreconciled`, while linking does not.
# Mapping payment objects and invoices

Invoices at Modern Treasury are designed to be able to automatically update themselves to be correctly reflecting real world money movement. This is done through tracking the status of an attached payment order or expected payment.

To get a little more specific, an invoice always has 1 “active” payment object attached to it when it is not in `paid` or `draft`. This payment object is always an expected payment in `unreconciled` , `partially reconciled` or a payment order in `needs approval`, `approved`, `processing`, or `sent`. When an attached payment order is `completed` or an attached expected payment is `reconciled` the invoice will transition to `paid`.

**Manual or UI Payment**

For an invoice with a manual or ui payment method this is initially an `unreconciled` expected payment and if a payment is issued or the payment flow is filled out the expected payment is archived, replaced with a payment order and the invoice is transitioned to `payment pending`. Going forward the invoice will now track this payment order’s status.

**Automatic Payment**

For an invoice with automatic payment method it initially tracks the created payment order. Once the PO is created it is in `payment pending`. If the PO fails then the invoice moves to its [fallback payment method](https://docs.moderntreasury.com/payments/docs/invoice-payments#fallback-payment-method).

**Returned or Reversed Payments**

If a completed payment on any invoice is returned or reversed the invoice moves from `paid` → `unpaid` and an expected payment will be created and attached to the invoice. The invoice now tracks the attached expected payment.

**Voiding Invoices with Attached Payment Objects**

An invoice can only be manually voided or marked as paid when it does not have an active payment order attached. In either case the attached expected payment is archived.
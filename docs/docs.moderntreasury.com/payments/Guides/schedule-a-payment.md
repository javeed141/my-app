# Schedule a payment

Modern Treasury allows users to specify a timestamp until which the payment will not be processed. This is useful when you need the ability to cancel a payment order for a specific time. It ensures minimum waiting time before transmitting the payment to the bank.

<Callout icon="❗️" theme="error">
  The `process_after` field is **only supported on certain bank connections**.
  For most API-based connections, payments are sent immediately and `process_after` will not take effect.

  Please contact Support or your Customer Success Manager to confirm whether this field applies to your bank connections.
</Callout>

# FAQs

## How does Process After affect Payment Date?

When creating a payment order, the user can specify the Payment Date using UI (or `effective_date` using API). This is the payment’s effective date. When creating a new payment order, the user can specify the Process After date and time later than the Payment Date. In such a situation, Process After will take precedence over the Payment Date. Upon creating the payment order, it will have an updated value for the Payment Date.

# How to schedule a payment

TAB-API

To schedule a payment order using the API, you can use the [Create Payment Order](https://docs.moderntreasury.com/platform/reference/create-payment-order) route setting the `process_after` to a specific ISO 8601 formatted date and time.

TAB-Dashboard

When creating a payment order, expand the `Additional Information` panel and specify `Process After` date and time.

<Image align="center" src="https://files.readme.io/1960a1e-process-after.gif" />
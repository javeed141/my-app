# Invoice Payments

Overview of invoice payments

# Payment Methods

Modern Treasury provides multiple methods of payments. Choosing one of these methods will connect the payment to the lifecycle of the Invoice and automatically update the status of the Invoice based on the status of the payment.

## Unoriginated Payment

Unoriginated payments are when your bank accounts receive a debit or credit originated by a counterparty. Whenever an invoice recipient sends a payment manually using the information provided on the invoice, that is an unoriginated payment. This is the default payment method for invoices since an end recipient could always choose this option.

To reconcile an unoriginated payment with an invoice, MT leverages **Expected Payments**. By default, an invoice will create a corresponding [Expected Payment object](https://docs.moderntreasury.com/reference/expected-payment-object) when the invoice is issued. The Expected Payment will be set with attributes designed to match a payment for the invoice amount from the counterparty. It is recommended that the recipient puts the Invoice number e.g. `2023-00004` on the statement description in their payment to improve the likelihood of matching the payment with the invoice. More details about the statement description can be found [here](https://docs.moderntreasury.com/platform/docs/best-practices-for-reconciling-with-expected-payments). Once the Expected Payment has been matched with the corresponding Transaction line item, those items will be associated with the Invoice.

The Expected Payment will be automatically archived if another payment method is selected. If the end recipient pays through the payment UI, the Expected Payment will be archived. Similarly, if a payment is manually issued from within Modern Treasury for the Invoice, the Expected Payment will be archived.

The Expected Payment can also be manually reconciled via the "Reconcile" page by searching for the Invoice number or by selecting "Reconcile Invoice" in the dropdown menu on the Invoice page.

## Embedded Payment UI

Invoices can be sent with embedded payment flows. This is a component on the Invoice where the end recipient can enter the details of the account from which they want to be debited. Once the recipient hits Submit, a **Payment Order** is created to ACH debit their account. The originating account must have ACH debit capabilities enabled to use this payment method.

To send an Invoice with an embedded component, either:

* Enable payment collection on the create invoice page

![](https://files.readme.io/a61105c-image.png)

Or:

* Create an invoice with `payment_method` set to `ui`.

The recipient will receive an invoice looking like the following:

<Image align="center" src="https://files.readme.io/92299db-Screenshot_2023-09-07_at_2.09.32_PM.png" />

## Automatic Payment

Invoices can be sent with automatic payments enabled, in this case a Payment Order object is created at the time the Invoice is issued. Today we support ACH debits via this method. The debit will be initiated on the **Payment Effective Date**. The originating account must have ACH debit capabilities enabled to use this payment method.

To send an Invoice with a automatic payment either:

* Enable automatic payment on the Invoice creation page

  ![](https://files.readme.io/07889bb-image.png)

Or:

* Create an invoice with `payment_method` set to `automatic` and fill in the appropriate values for the parameters `payment_effective_date`, `receiving_account_id`, and `payment_type`. More information can be found on the [invoice API reference](https://docs.moderntreasury.com/reference/invoices).

### Fallback Payment Method

When an automatic payment fails, it transitions the Invoice back to the `unpaid` status and creates an **Expected Payment** to handle an unoriginated payment that might be issued in place of the automatic payment. By setting the fallback payment method to `ui` via the API or selecting payment collection on the invoice form, the invoice will automatically create an embedded payment ui on the invoice when the automatic payment fails. The email notification for the invoice payment failure to the invoice recipient will also provide a "Pay Invoice" link to the invoice, providing the recipient with an option to pay via the embedded payment ui.

## Manually Issuing Payment

After an invoice has transitioned from `draft` to the `unpaid` state, a payment can be manually issued via the UI or the [API](https://dash.readme.com/project/modern-treasury/v1.1/refs/add_payment_order_to_invoice). The payment order issued must have matching `originating_account_id`, `amount`, `currency` to the invoice and must be in the direction of a `debit`.

# Invoice Status

The invoice lifecycle will be directly connected to the payment object it is associated with. When the payment order or expected payment successfully completes, the invoice will be marked as `paid`. When a payment order is created, the invoice will be marked as `payment_pending`.

Invoices can be manually marked as `paid` through the UI or the API as long as the invoice is not in the `payment_pending` state.

When an Invoice is transitioned to `payment_pending` through embedded payment UI or `paid` manually, any associated expected payment object will automatically be archived to avoid duplicated payments.

# Required permissions

To use invoice payments, you will need the following permissions:

1. Ability to manage the originating account associated with the invoice
2. Ability to read the invoice counterparty

To create an Invoice with automatic payment enabled, you will need the above permissions in addition to:

1. Ability to read the receiving account
2. Ability to create a new payment order

To create an Invoice with an associated Virtual Account, you will need the above permissions in addition to:

1. Ability to read the Virtual Account
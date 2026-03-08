# Cancel a Payment Order

> 🚧 Cancellations are not possible once a Payment Order is `Sent` to the bank.
>
> Cancellations are only possible for Payment Orders with a status of `Needs Approval` or `Approved`.
>
> Payment Orders can not be cancelled after they've been `Sent` to the bank. You will need to issue a Reversal or contact your bank directly.

Modern Treasury offers several controls around payments. Canceling a Payment Order prevents the payment from being sent to the bank for processing. It is notably different than a Return or Reversal, which are controls once payment instructions have already been sent to the bank.

# How to cancel a payment order

TAB-API

To cancel a payment order using the API, you can use the [Update Payment Order](/platform/reference/update-payment-order) route setting the `status` to `cancelled`.

TAB-Dashboard

1. Login to Modern Treasury
2. Navigate to the [Payments Overview](https://app.moderntreasury.com/payment_orders) page and locate the Payment Order that you wish to cancel
3. Click the Payment Order to open the respective payment's page
4. From the **Actions** dropdown menu in the upper right corner, Click **Cancel** to cancel the payment
5. Once you click cancel you should see the status immediately update to `Cancelled`

## Frequently Asked Questions

### What happens when a payment order is canceled?

Cancelled payment orders will not be deleted. You can still view canceled payment orders and filter for them as needed. Cancelled payment orders can also be duplicated.

### Why is the "Cancel" button not visible?

Once a payment is `Processing`, `Sent`, `Completed`, or `Returned`, a cancellation cannot be issued through our platform, as the payment has already been submitted to the bank, at which point we will hide the button.

### I canceled the wrong payment. Can I undo this?

No, once a payment has been canceled you cannot undo this action. You can however **Duplicate** the payment and send It again.

### When are payment orders sent to the bank?

Based on the payment order `effective_date` and the bank's required timings, Modern Treasury determines the optimal date and time to send the payment to the bank. Modern Treasury strives to maximize the cancellation window, reducing the need to contact banks directly to modify in-flight payments.
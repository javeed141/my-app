# Handling payment returns

When you are making payments, you should expect to see some percentage get returned. A return can occur for various reasons and usually results in the funds movement being reversed and a notification with additional details. These additional details generate a Return in the Modern Treasury system.

The Modern Treasury [Returns](https://docs.moderntreasury.com/platform/reference/return-object) object represents a rejection of a returnable. This returnable can be a [Payment Order](https://docs.moderntreasury.com/platform/reference/payment-order-object), [Reversal](https://docs.moderntreasury.com/platform/reference/reversals), or [Incoming Payment Detail](https://docs.moderntreasury.com/platform/reference/incoming-payment-detail-object). When you are originating payments, your returns will received, as indicated by the `return.role` field being `receiving`. If you are originating returns to reject inbound debits or credits, then your `return.role` will be `originating`.

### Return Webhooks

Return Webhooks corresponding to the return statuses can be received in varying orders depending on when you receive a return from the bank. Here are some important details on the returns lifecycle:

* `return.created`,` payment_order.completed`, `payment_order.returned`, and `return.completed `webhooks may be received in various orders. See [return webhooks](https://docs.moderntreasury.com/platform/reference/returns) and [payment order webhooks](https://docs.moderntreasury.com/platform/reference/payment-orders) for more information.
* A Return may be created before or after the Payment Order has already been `completed`, depending on how early a return file is received and the [return code type](/payments/docs/ach-return-codes). The Payment Order’s transition to `returned` is not affected by the Return’s status. A Payment Order can be moved to `returned` even if the Return is pending. If the Return is `created` after the Payment Order is already `completed`, then the Payment Order will be immediately moved to `returned`.
* `return.completed` may be emitted either before or after `payment_order.returned`
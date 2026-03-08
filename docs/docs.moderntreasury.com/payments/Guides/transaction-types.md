# Understanding the transaction.type field

Transaction objects have a field `type` that defines the payment rail that originated the transaction. When Modern Treasury is connected to your bank for connectivity, we'll calculate the transaction's type based on several factors we receive from bank data, such as via BAI2 files. We'll derive the type from the following fields:

* `vendor_code_type`
* `vendor_code`
* `vendor_description`
* `currency`

For example, a transaction that originates at J.P. Morgan & Chase (JPMC) may have a `vendor_code_type` of `bai2`, and a `vendor_code` of `165`, which would therefore be classified as an `ach` transaction.

Sometimes payments in local payment types may settle in US-based accounts as `ach`, in which case we’ll also use the `currency` as a factor in determining the type. For example, if a transaction labeled `ach` but is settled in AUD, we’ll classify the transaction as `au_becs`.

Specific banks may have their own code mappings which take precedence over our default classification. For example, JPMC sends wires using the BAI2 code 216.

Finally, if we can't infer a payment type based on the information given, the transaction will be labeled as `other`.

For an exhaustive list of our payment types, see [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object#:~:text=the%20payment%20order-,type,-string).

If you have any questions about what vendor codes may be overridden, please reach out to our support team at [support@moderntreasury.com](mailto:support@moderntreasury.com).
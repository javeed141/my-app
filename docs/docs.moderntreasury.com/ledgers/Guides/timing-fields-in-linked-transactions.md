# Timing Fields in Linked Transactions

Ledger Transaction objects have a field `effective_at` which represents when the underlying money movement occurred. If a Ledger Transaction is linked to a payment in Modern Treasury, Modern Treasury can automatically set this field based on the timing of the underlying payment.

Ensuring that the Ledger Transaction's `effective_at` will help provide an accurate view when comparing bank and ledger account balances.

## Configuring automatic behavior

When you link a Ledger Transaction to a payment in Modern Treasury without specifying an `effective_at`, the `effective_at` field will be set and managed by Modern Treasury throughout the Ledger Transaction's lifecycle. Modern Treasury will update the `effective_at` field once the timing of the underlying bank transaction is known.

Ledger Transactions automatically created by Modern Treasury will also follow this behavior.

If you specify an `effective_at` on the Ledger Transaction, Modern Treasury will not manage or update the field automatically.

## Behavior of the field

When a pending Ledger Transaction is first created and linked to an unreconciled Payment Order, Expected Payment, Return, Reversal, or Incoming Payment Detail, its `effective_at` will be set to the `created_at` of the Ledger Transaction.

As soon as the payment object is reconciled to a bank Transaction object, the Ledger Transaction will inherit the underlying timing of the bank Transaction. The `effective_at` field on the ledger transaction will get updated to `transaction.as_of_time` if it is provided by the bank, or the `transaction.as_of_date` otherwise. If  `transaction.as_of_date` is used, the Ledger Transaction timestamp is set to the start of day (00:00:00) in the bank's reported timezone.

| When                                               | Ledger Transaction `effective_at` inherits |
| :------------------------------------------------- | :----------------------------------------- |
| Upon creation                                      | Ledger transaction `created_at`            |
| Upon reconciliation (if available)                 | Bank transaction `as_of_time`              |
| Upon reconciliation (if `as_of_time` not provided) | Bank transaction `as_of_date`              |
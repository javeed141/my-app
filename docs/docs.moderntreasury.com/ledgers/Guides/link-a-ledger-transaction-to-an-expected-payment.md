# Link a Ledger Transaction to an Expected Payment

You can link an [Expected Payment](/platform/reference/expected-payment-object) to a Ledger Transaction.

## Linked Statuses

After a payment object is created, you can create a new Ledger Transaction linked to that object by specifying `ledgerable_type` and `ledgerable_id`.

If a Ledger Transaction is linked to an Expected Payment, we will automatically update the Ledger Transaction's `status` based on the `status` of the linked object. The table below shows how different object statuses correspond to Ledger Transaction statuses.

| Ledger Transaction status | Expected Payment status |
| :------------------------ | :---------------------- |
| `pending`                 | `unreconciled`          |
| `posted`                  | `reconciled`            |
| `archived`                | `archived`              |

After you link a Ledger Transaction to another object, you will no longer be able to manually update the Ledger Transaction's status.

If a linked Expected Payment changes from `reconciled` to `unreconciled`, we will automatically create two new Ledger Transactions: one `posted` transaction reversing the entries of the original transaction, and one `pending` transaction linked to the now `unreconciled` Expected Payment.
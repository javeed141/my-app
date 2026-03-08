# Link a Ledger Transaction and Payment Order

There are two ways to link a Ledger Transaction to a Payment Order. As described previously, you can create a new Ledger Transaction linked to an existing [Payment Order](/platform/reference/payment-order-object).

Alternatively, you can create both a Payment Order and Ledger Transaction in a single API call. You can do so by using the [Create Payment Order](/platform/reference/create-payment-order) endpoint and using the `ledger_transaction` field.

## Linked Statuses

If a Ledger Transaction is linked to a Payment Order, we will automatically update the Ledger Transaction's `status` based on the `status` of the linked object. The table below shows how different object statuses correspond to Ledger Transaction statuses.

| Ledger transaction status | Payment Order status                               | Return status                   | Reversal status                 |
| :------------------------ | :------------------------------------------------- | :------------------------------ | :------------------------------ |
| `pending`                 | `needs approval`, `approved`, `processing`, `sent` | `pending`, `processing`, `sent` | `pending`, `processing`, `sent` |
| `posted`                  | `completed`, `returned`, `reversed`                | `completed`, `returned`         | `completed`, `returned`         |
| `archived`                | `denied`, `failed`, `cancelled`                    | `failed`                        | `failed`                        |

After you link a Ledger Transaction to another object, you will no longer be able to manually update the Ledger Transaction's status.

If you link a Payment Order to a Ledger Transaction and the Payment Order status changes to `returned`, we will create a new Ledger Transaction tied to the corresponding [Return](/platform/reference/return-object) object and reversing the entries of the original transaction.

If you link a Payment Order to a Ledger Transaction and then redraft the Payment Order, we will create a new Ledger Transaction linked to the redrafted Payment Order.
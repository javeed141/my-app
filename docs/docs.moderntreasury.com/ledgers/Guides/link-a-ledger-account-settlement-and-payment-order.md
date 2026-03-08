# Link a Ledger Account Settlement and Payment Order

# Creating and linking LAS and PO

1. Create a `pending` Ledger Account Settlement through the [Create Ledger Account Settlement AP](https://docs.moderntreasury.com/platform/reference/create-ledger-account-settlement)I. The settlement object is in `processing` status initially;
2. Once the Ledger Account Settlement is processed successfully, Modern Treasury sends a `ledger_account_settlement.finished_processing` webhook, which contains `status`, `amount`, `direction`, `ledger_transaction_id` among other fields;
3. Create a Payment Order through the [Create Payment Order API](https://docs.moderntreasury.com/platform/reference/create-payment-order) and set the `ledger_transaction_id` parameter to the LAS's `ledger_transaction_id`. The LAS and the PO are now linked together through a common Ledger Transaction.

# Status updates

When the Payment Order is `completed`: Modern Treasury updates the Ledger Account Settlement and the Ledger Transaction to `posted` and sends `ledger_account_settlement.posted` and `ledger_transaction.posted` webhooks.

When the Payment Order is `canceled`, `denied`,  or `failed`: The Ledger Account Settlement stays in `pending`. You could either fix and redraft the Payment Order, or explicitly archive the Ledger Account Settlement so that the Ledger Entries are available for future Settlements to pick up. Note that once a Ledger Account Settlement is `archived`, it cannot be restored.

When the Payment Order is `returned` or `reversed`: The Ledger Account Settlement is updated to `pending`, and it's `ledger_transaction` is updated to the latest pending `ledger_transaction` given that Ledger Transactions are immutable once posted.

| Payment Order status                               | Ledger Transaction status | Settlement status |
| :------------------------------------------------- | :------------------------ | :---------------- |
| `needs approval`, `approved`, `processing`, `sent` | `pending`                 | `pending`         |
| `completed`                                        | `posted`                  | `posted`          |
| `cancelled`, `denied`, `failed`                    | `archived`                | `pending`         |
| `returned`, `reversed`                             | `posted`                  | `pending`         |

# Look up an LAS's linked PO

A Ledger Account Settlement and a Payment Order are linked together through their common Ledger Transaction. In order to look up the linked PO from an LAS, you would:

1. Get the `ledger_transaction_id` of the Ledger Account Settlement;
2. Retrieve the Ledger Transaction by calling the [Get Ledger Transaction API](https://docs.moderntreasury.com/platform/reference/get-ledger-transaction) with its ID. The Ledger Transaction's `ledgerable_type` is `payment_order`, the `ledgerable_id` is the Payment Order ID.

# Look up a PO's linked LAS

A Ledger Account Settlement and a Payment Order are linked together through their common Ledger Transaction. In order to look up the linked LAS from a PO, you would:

1. Get the `ledger_transaction_id` of the Payment Order;
2. Query the Ledger Account Settlements by passing in the `ledger_transaction_id` parameter. There should only be one LAS returned.
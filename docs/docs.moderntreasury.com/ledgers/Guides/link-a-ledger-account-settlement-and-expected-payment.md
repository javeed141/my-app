# Link a Ledger Account Settlement and Expected Payment

# Creating and linking LAS and EP

1. Create a `pending` Ledger Account Settlement through the [Create Ledger Account Settlement API](https://docs.moderntreasury.com/platform/reference/create-ledger-account-settlement). The settlement object is in `processing` status initially;
2. Once the Ledger Account Settlement is processed successfully, Modern Treasury sends a `ledger_account_settlement.finished_processing` webhook, which contains `status`, `amount`, `direction`, `ledger_transaction_id` among other fields;
3. You could then create an Expected Payment through the [Create Expected Payment API ](https://docs.moderntreasury.com/platform/reference/create-expected-payment)and set the `ledger_transaction_id` parameter to the LAS's `ledger_transaction_id`. The LAS and the EP are now linked together through a common Ledger Transaction.

# Status updates

When the Expected Payment is `reconciled`: Modern Treasury updates the Ledger Account Settlement and the Ledger Transaction to `posted` and sends `ledger_account_settlement.posted` and `ledger_transaction.posted` webhooks

When the Expected Payment is `unreconciled` or `partially_reconciled`: The Ledger Account Settlement is updated to `pending`, and it's `ledger_transaction` is updated to the latest pending `ledger_transaction` given that Ledger Transactions are immutable once posted.

When the Expected Payment is `archived`: The Ledger Account Settlement stays in `pending`. You could either unarchive the Expected Payment, or archive the Ledger Account Settlement so that the Ledger Entries are available for future Settlements to pick up. Note that once a Ledger Account Settlement is `archived`, it cannot be restored.

| Expected Payment status                | Ledger Transaction status | status    |
| :------------------------------------- | :------------------------ | :-------- |
| `unreconciled`, `partially_reconciled` | `pending`                 | `pending` |
| `reconciled`                           | `posted`                  | `posted`  |
| `archived`                             | `archived`                | `pending` |

# Look up an LAS's linked EP

A Ledger Account Settlement and a Expected Payment are linked together through their common Ledger Transaction. In order to look up the linked EP from an LAS, you would:

1. Get the `ledger_transaction_id` of the LAS;
2. Retrieve the Ledger Transaction by calling the [Get Ledger Transaction API ](https://docs.moderntreasury.com/platform/reference/get-ledger-transaction)with its ID. The Ledger Transaction's `ledgerable_type` is `expected_payment`, the `ledgerable_id` is the Expected Payment ID.

# Look up an EP's linked LAS

A Ledger Account Settlement and a Expected Payment are linked together through their common Ledger Transaction. In order to look up the linked LAS from an EP, you would:

1. Get the `ledger_transaction_id` of the Expected Payment;
2. Query the Ledger Account Settlements by passing in the `ledger_transaction_id` parameter. There should only be one LAS returned.
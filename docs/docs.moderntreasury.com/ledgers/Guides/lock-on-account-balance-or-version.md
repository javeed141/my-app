# Lock on Account Balance or Version

# Overview

Every time you check a Ledger Account balance in your app, you get a snapshot of that balance at a moment in time. As money moves, you need to be confident that that snapshot is accurate even as balances are constantly shifting in real time.

To prevent a double-spend situation, your ledger needs to be able to record transactions that are conditional on the state of an account balance or account version. The [Ledgers API](https://www.moderntreasury.com/products/ledgers) provides both of these mechanisms.

# Locking on Account Balance

When creating or updating a Ledger Transaction, you can send balance filters as part of a Ledger Entry to validate the balance of the corresponding Ledger Account if the current Ledger Transaction were to be created or updated.  If this Ledger Transaction would cause the Ledger Account's current balance to go outside of the specified range, the request will fail with a 422.

The available types of balance filters are `pending_balance_amount`, `posted_balance_amount`, and `available_balance_amount` and the balance may be filtered with `gt` (>), `gte` (>=), `eq` (=), `lte` (\<=), and `lt` (\<).

**Note** balance filters consider every Ledger Entry on the corresponding Ledger Account, regardless of their `effective_at` values.

For example, suppose you are recording a payment moving $1 out of a credit-normal user account. You can specify that the account's `available_balance` must remain greater than or equal to $0 upon completion of the transaction:

```shell
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_transactions \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '{
       "effective_at": "2022-01-01T00:00:00.000",
       "status": "pending",
       "ledger_entries": [{
         "amount": 100,
         "direction": "debit",
         "available_balance_amount": { "gte": 0 },
         "ledger_account_id": "89c8bd30-e06a-4a79-b396-e6c7e13e7a12"
       }, {
         "amount": 100,
         "direction": "credit",
         "ledger_account_id": "a30e5616-9408-4e5e-957a-bb0bcea5f0ce"
       }]
     }'
```

# Using the lock\_version Field

As an alternative locking mechanism, you can specify a `lock_version` when writing an entry to the Ledger Account. If the `lock_version` specified is not the same as the current `lock_version` of the Ledger Account balance, the transaction will fail to be created.

For example, suppose you are recording a payment paying out $10.32 from a credit-normal user account. You can specify that the transaction be written if and only if the Ledger Account has not been updated since you last checked its `lock_version`:

```shell
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_transactions \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '{
      "description": "Payout",
      "effective_at": "2022-01-01T00:00:00.000",
      "status": "pending",
      "external_id": "97dbb8b1-e6f2-485e-a0ec-6267e3c60718",
      "ledger_entries": [{
         "amount": 1032,
         "direction": "debit",
         "lock_version": 5
         "ledger_account_id": "89c8bd30-e06a-4a79-b396-e6c7e13e7a12"
       }, {
         "amount": 1032,
         "direction": "credit",
         "ledger_account_id": "a30e5616-9408-4e5e-957a-bb0bcea5f0ce"
       }]
    }'
```

If the `lock_version` of your Ledger Account balance is not 5, meaning there has been another entry written to the account since `lock_version` 5, the transaction will fail.

# Locking on Category Balance

You can also lock on a [Ledger Account Category](https://docs.moderntreasury.com/ledgers/docs/ledger-account-categories-overview) balance.

When creating or updating a Ledger Transaction, you can send category balance filters by specifying the `ledger_account_category_balance_locks`, which validates the balance of a corresponding Ledger Account Category if the current Ledger Transaction were created or updated.  If this Ledger Transaction would cause the Ledger Account Category's current balance to go outside of the specified range, the request will fail with a 422.

The available types of balance filters are `pending_balance_amount`, `posted_balance_amount`, and `available_balance_amount` and the balance may be filtered with the parameters `gt` (>), `gte` (>=), `eq` (=), `lte` (\<=), and `lt` (\<).

**Note** that a category's balance considers all of the Ledger Accounts that are part of the category. Modern Treasury requires that the category being locked contains at least 1 Ledger Account that is updated by the Ledger Transaction being created or updated.

For example, let's consider a corporate card program. Multiple users are allowed to have corporate cards that all share a single spend limit. Suppose an employee is spending 10$ on the corporate card. You can specify that the overall corporate expenditure category's `available_balance` must remain greater than or equal to $0 upon completion of the transaction:

```shell
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_transactions \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '{
       "effective_at": "2024-03-01T00:00:00.000",
       "status": "pending",
       "ledger_entries": [{
         "amount": 1000,
         "direction": "debit",
         "ledger_account_id": "89c8bd30-e06a-4a79-b396-e6c7e13e7a12"
       }, {
         "amount": 1000,
         "direction": "credit",
         "ledger_account_id": "a30e5616-9408-4e5e-957a-bb0bcea5f0ce"
       }],
       "ledger_account_category_balance_locks": [{
       	"ledger_account_category_id": "c085209a-abab-4d27-ab38-1321d802030a",
        "available_balance_amount": { "gte": 0 }
     }'
```
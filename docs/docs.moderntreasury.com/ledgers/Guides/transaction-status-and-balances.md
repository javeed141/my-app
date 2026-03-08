# Transaction Status and Balances

## Overview

Ledger Transactions have a status field reflecting whether a transaction is in `pending`, `posted`, or `archived`.

Ledger Accounts return several different balances based on the statuses of transactions written to those accounts: `pending_balance`, `posted_balance`, and `available_balance`.

## Ledger Transaction Statuses

A Ledger Transaction is designed to be highly auditable, so you can keep track of what happened with your money movement. A completed Ledger Transaction is immutable, so your ledger records cannot be retroactively altered.

While a Ledger Transaction is `pending`, it is mutable, meaning you can modify it with a [PATCH request](https://docs.moderntreasury.com/platform/reference/update-ledger-transaction). Even if modified, you can see past versions of the Ledger Transaction by examining [Ledger Transaction Versions](https://docs.moderntreasury.com/platform/reference/list-ledger-transaction-versions). Read more at [Verify Prior Ledger States](https://docs.moderntreasury.com/ledgers/docs/verify-prior-ledger-states).

When a payment is settled, you can change the corresponding Ledger Transaction’s status to `posted`.

You can also cancel the ledger transaction by setting its status to `archived`. You might do this if a payment fails.

Once a ledger transaction is `posted` or `archived` its status and entries are immutable, meaning they cannot be modified. A ledger transaction's metadata can always be updated. In order to undo the effect of a `posted` Ledger Transaction, you will need to write a second [reversing Ledger Transaction](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction-reversal).

## Account Balances

Ledger accounts have three balances, `pending_balance`, `posted_balance`, and `available_balance`. All balances under an account have the same currency, but different ledger accounts (even in the same ledger) may have different currencies.

You can learn more about the different balance types and their structure [here](/platform/reference/ledger-balances-object).

You can write a ledger transaction conditional on the resulting balance of a ledger account. To learn more, see [Handling Concurrency](https://docs.moderntreasury.com/ledgers/docs/handle-concurrency).
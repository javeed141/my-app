# Ledger Transactions Overview

A robust ledgering system needs a Transaction model to enable atomic movement of money among 2 or more [Accounts](https://docs.moderntreasury.com/ledgers/docs/ledger-accounts-overview)  and enforce double-entry rules.

Transactions allow you to specify groups of Entries that either must all succeed or all fail. The total balance of all Entries on a single Ledger Transaction must have equal [debits and credits](https://docs.moderntreasury.com/ledgers/docs/guide-to-debits-and-credits). In order to guarantee atomicity, all the non-discarded Entries on a Transaction must share the status of the Transaction. This ensures that all Entries progress in status at the same time, all-or-nothing.

A Ledger Transaction can have different [Transaction statuses](https://docs.moderntreasury.com/ledgers/docs/transaction-status-and-balances). A `posted` Ledger Transaction is financially immutable and its Entries cannot be updated, though its metadata can be updated.
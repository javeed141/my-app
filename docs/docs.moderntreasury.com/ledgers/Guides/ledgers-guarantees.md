# Ledgers Guarantees

Ledgers enforces a set of principles, listed here:

* **Balanced**: For each currency within a Ledger, credits will always equal debits. For each currency within a Ledger Transaction, credits will always equal debits. At any given moment in time, the balance of an Account is equal to the sum of its effective credit and debit entries.
* **Auditable Versions**: The exact Entries that contribute to each `lock_version` of an account can always be queried.
* **Archival Instead of Deletion**: Ledger Transactions cannot be deleted, only archived. Once archived, a Ledger Transaction’s Entries won’t count toward any Account Balances. Posted Ledger Transactions cannot be archived.
* **Ledger Isolation**: Each Ledger will isolate its accounting from other Ledgers. We validate that Ledger Transactions can only be written against Accounts in the same Ledger. If accounts or transactions across different Ledgers refer to the same real-world entity, you can use [metadata](https://docs.moderntreasury.com/reference/metadata) to reference the same identifier.
* **Immutability**: Entries cannot be changed or removed on a Ledger Transaction once it is posted. Fields that do not affect balances like metadata can still be edited.
* **Idempotency**: Idempotency keys are supported on all POST requests to prevent creating duplicate objects, even when you’re retrying failures. When provided, we also enforce `external_id` to be unique for all Transactions within a ledger.
* **Write Atomicity**: When you create a Ledger Transaction, its Entries will either all succeed or all fail to be written.
* **Read Committed Isolation**: Reads won’t block and aren’t blocked by writes. Writes can use locking to ensure serial writes when you want to create a Ledger Transaction that depends on an Account Balance.
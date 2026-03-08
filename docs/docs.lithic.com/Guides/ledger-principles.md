# Ledger Principles

Lithic enforces the following principles to ensure accuracy and scalability in how you track funds.

### Balanced

For each `financial_account`, and for the entirety of your fintech program, credits and debits will always equal each other.

### Ledger Isolation

Each program's ledgering remains isolated from other ledgers. We validate that Ledger Transactions can only be written against other `financial_account`'s in the same program's ledger. We also validate that ledgering remains isolated to the respective sponsor bank or financial entity.

### Daily Reconciliation

When working with a sponsor bank, we reconcile and close the books every single day.

### Immutability

Transactions and Events cannot be removed from Lithic's ledger, once posted.

### Idempotency

Idempotency keys are supported on all POST requests to prevent the creation of duplicate objects.

### Atomicity

When you create a Transaction, its Entries will either all succeed or all fail to be written.

### Read Committed Isolation

Reads won’t block and aren’t blocked by writes.

### Strict Balance Checking

In writing events which affect balances, strict consistent checks are performed to ensure the same balance cannot be applied twice.
# Ledgers Objects

Ledgers has a simple data structure built around four core objects.

The `ledger` object represents your entire product ledger. You may set up a single Ledger to track all money movement across your products, or you may want to maintain different Ledgers for different discrete use cases such as business lines, individual products, or geographies.

Nested within your larger `ledger` object are `ledger accounts`. These are the balances your platform will track.

Also nested within your `ledger` object are `ledger transaction` objects. These represent financial events that happen on your platform. Each `ledger transaction` object is composed of at least two `ledger entry` objects. The Ledger Transaction obeys accounting rules; its credit and debit entries must sum to the same amount. Each `ledger entry` will update a single `ledger account`.  Note that `ledger transactions` can write to only a single ledger, requiring multiple transactions to write across multiple ledgers.

Ledgers supports any currency as well as values that behave like currency (rewards, points, etc.).

<Image border={false} src="https://files.readme.io/0608b04-Ledgers_objects.png" title="Ledgers objects.png" />

Ledgers also features `account category` objects, which are aggregations of Ledger Accounts or other Account Categories. Read more about Ledger Account Categories [here](https://docs.moderntreasury.com/reference/ledger-account-categories).
# Synchronous Ledger Entry Rate Limiting

The Ledgers API supports 100 QPS on all read and write APIs, and higher rate limits are available upon request. In addition to these standard rate limits, we also rate limit synchronous Ledger Entries at a rate of 20 Ledger Entries per Ledger Account per second and enforce a 5 QPS limit on Ledger Transactions created with category balance locks across all categories for an organization.

A Ledger Entry is synchronous if any of the following conditions are true:

* One of these fields is set on the Ledger Entry at creation: **pending\_balance\_amount**, **posted\_balance\_amount**, **available\_balance\_amount**, or **lock\_version**.  See [Handling Concurrency](https://docs.moderntreasury.com/ledgers/docs/handling-concurrency) for information about these fields.
* The **show\_resulting\_ledger\_account\_balances** field is set to `true` on the Ledger Entry at creation.
* **ledger\_account\_category\_balance\_locks** specifies a Ledger Account Category that contains the Ledger Account of the Ledger Entry.

We rate limit synchronous Ledger Entries because they require a lock on the associated Ledger Account and must be processed serially. In order to avoid high latency and rate limiting at high throughputs, you must architect your ledger to avoid the “hot account” problem.

If you want to get the list of Ledger Entries that have been processed on a Ledger Account, fetch the Ledger Account and pass the returned `lock_verson` to List Ledger Entries in the `as_of_lock_version` parameter.
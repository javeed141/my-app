# Design a Ledger for Concurrency

How to handle concurrent transaction and balance operations:

# Overview

A key decision in ledger design is when to process entries synchronously or asynchronously.

Synchronous entries are necessary when you need to guarantee that the ledger is in a certain state. For example, a user withdrawal should be synchronously processed with regard to that user's balance, so they don't overdraw their account.

Asynchronous entries are necessary when you need to guarantee throughput. At scale, handling all entries synchronously is not a feasible or efficient ledger design. This is particularly the case for entries that impact balances that are shared across many users or systems.

# Ledger Entry Synchronous Behavior

In Ledgers, Modern Treasury determines whether to process a Ledger Entry synchronously or asynchronously based on whether locking parameters are passed on the entry. Because this is determined at the entry level, Ledger Transactions can be created that combine synchronous and asynchronous Ledger Entries, balancing the considerations above.

A Ledger Entry is guaranteed to be processed synchronously if:

* One of these fields is set on the Ledger Entry at creation: **pending\_balance\_amount**, **posted\_balance\_amount**, **available\_balance\_amount**, or **lock\_version**.  See [Lock on Account Balance or Version](https://docs.moderntreasury.com/ledgers/docs/lock-on-account-balance-or-version) for information about these fields.
* The **show\_resulting\_ledger\_account\_balances** field is set to `true` on the Ledger Entry at creation.
* **ledger\_account\_category\_balance\_locks** specifies a Ledger Account Category that contains the Ledger Account of the Ledger Entry.

Any other Ledger Entry may be processed asynchronously. This means it is batched and written to the Ledger Account with other Ledger Entries. As a result, a Ledger Account may have a single lock version that corresponds to writing multiple Ledger Entries at once.

When updating a Ledger Transaction without sending new Ledger Entries, all Ledger Entries which were originally created synchronously will automatically be updated synchronously.  If the update replaces the Ledger Entries, they will be synchronous based on the new parameters.

# Best Practice

When designing how Ledger Transactions are written, it is critical to be intentional about whether entries are written synchronously or asynchronously.

Many ledger designs involve a hot account. A hot account is a Ledger Account that receives a high volume of Ledger Entries. Many ledger architectures include a hot account to represent overall omnibus cash or a shared settlement account. In general, it is best practice to ensure that the hot account receives only asynchronous entries, so that it can perform at high throughput.

Often, transactions that involve a hot account will write other entries that involve lower throughput accounts, like user-specific account. In this case, the optimal design is locking only on these user accounts.

For example a typical transaction for a debit card program may look like:

| Account Name                            | Debits | Credits | Conditions                      |
| --------------------------------------- | ------ | ------- | ------------------------------- |
| Alice’s Debit Card                      | 100    |         | Lock on available\_balance >= 0 |
| Issuing Bank Nightly Settlement Account |        | 100     |                                 |

<br />

> 📘 Key takeaway
>
> When you’re writing to a single Ledger Account at a high throughput (a “hot account”), don’t write the Ledger Entries with balance or `lock_version` conditions, and don’t use the `show_resulting_ledger_account_balances` flag. All Ledger Entries will be applied to the associated Ledger Account balance within 60 seconds.
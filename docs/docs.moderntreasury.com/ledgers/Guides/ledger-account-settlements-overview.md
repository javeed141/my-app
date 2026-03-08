# Ledger Account Settlements Overview

When a Ledger Transaction is created, its Ledger Entries are added to the corresponding Ledger Accounts. Each Ledger Account accumulates many Ledger Entries over time, which contributes to the Account’s balance increase. As a result, it makes sense to pay out those Accounts in order to safely empty their balances. For example, a marketplace will pay a supplier the entire amount owed according to the supplier’s payables account balance.

Settlements are difficult to manage because Ledger Entries can be backdated into periods that had been paid out previously already. For example, when paying out a Ledger Account’s February balance in March, Ledger Entries with a January effective time could have been added during February after January’s settlement was completed. These Ledger Entries should be paid out in March instead of being left behind. Additionally, itemizing Ledger Entries to their corresponding Settlement for accounting is complex.

Using the `ledger_account_settlement` solves these problems by giving you out-of-the-box snapshotting and itemization functionality. A `ledger_account_settlement` is an object that creates a Ledger Transaction to safely offset the posted balance of a Ledger Account.

# How Modern Treasury handles Ledger Account Settlements

Let’s use the same monthly settlement example mentioned earlier. As a marketplace platform user, you pay out the supplier’s payables accounts on a monthly basis. Say today is February 2nd and you would like to pay out a supplier’s ledger account, you’d create a `ledger_account_settlement` object through Modern Treasury’s Create Ledger Account Settlement API.

Behind the scenes, Modern Treasury uses the criteria you provided through the API to gather the Ledger Entries for this settlement and calculate the settlement amount for you. It also creates a Ledger Transaction that reduces the Account’s balance as a result. Each Ledger Entry can be included in at most one Ledger Account Settlement. This prevents you from paying out the same amount twice. The settlement amount is computed asynchronously so that there is no limit on how many Ledger Entries can be processed per Settlement.

# Creating a Ledger Account Settlement

When creating a Ledger Account Settlement (LAS), the settled ledger account's Ledger Entries are used to calculate the settlement amount, and its balance is reduced as a result. The contra Ledger Account is used to send or receive funds, depending on the normality of the accounts. Each Ledger Entry of the settled Ledger Account can only be included in one Ledger Account Settlement, which prevents paying one ledger entry multiple times.

An optional `effective_at_upper_bound` can be provided as an extra threshold to decide which ledger entries the Settlement should include. For example, say today is 02/05/23 and you are paying out Alice's January ledger entries, you'd specify the `effective_at_upper_bound` as `2023-02-01T00:00:00.000Z`, this way the February Ledger Entries are excluded in this Settlement. It also excludes any Ledger Entries that have been paid out already.

The `status` is set to `pending` by default, because the common workflow is to first create a pending Ledger Account Settlement, then move money based on the Settlement amount, and lastly set the Settlement to `posted`. But setting `status` directly to `posted` is also an option.

# Attaching Ledger Entries to a Ledger Account Settlement

We allow setting the status of a Ledger Account Settlement to `drafting` during creation. This allows users the ability to include any desired Ledger Entry to the Ledger Account Settlement. You can curate the Settlement with custom Ledger Entries Using the [Add](https://docs.moderntreasury.com/platform/reference/add-ledger-entries-to-settlement) or [Remove](https://docs.moderntreasury.com/platform/reference/remove-ledger-entries-from-settlement) Ledger Entries to Settlement APIs. Once the Ledger Entries are attached to the Ledger Account Settlement, it can then be updated to the desired status using the Update Ledger Account Settlement API.

For Ledger Account Settlements created this way, we do not use the `effective_at_upper_bound` to determine the Ledger Entries that are to be included in the Settlement. Only the Ledger Entries that were manually added to the Ledger Account Settlement will be included.

# Modern Treasury processes Ledger Account Settlements asynchronously

Once a Ledger Account Settlement is created, its status is set to `processing` immediately. When a Ledger Account Settlement is still being processed, its `amount` and `ledger_transaction_id` are null. Once a Ledger Account Settlement is processed successfully, the status is updated to `pending` or `posted` based on the status provided when creating the Settlement and its `amount` and `ledger_transaction_id` are now available. Since the status is updated by Modern Treasury, an `ledger_account_settlement.finish_processing` [webhook](https://docs.moderntreasury.com/reference/webhooks) event is emitted for the Ledger Account Settlement.

# Updating a Ledger Account Settlements

When a Ledger Account Settlement is in `pending` status, it can be updated through the Update Ledger Account Settlement API. This is where you can set the Settlement to `posted` as mentioned above. You can also set the Settlement to `archived` if it was created by mistake. Once the Settlement is archived successfully, the ledger entries are detached from the Settlement, and they can be included in future Settlements again.

# Retrieving Settlement related data

The Settlements themselves can be retrieved through the [Get Ledger Account Settlement API](https://docs.moderntreasury.com/platform/reference/get-ledger-account-settlement) and the [List Ledger Account Settlement API](https://docs.moderntreasury.com/platform/reference/list-ledger-account-settlements). To retrieve the itemized Ledger Entries of the settlement, use the `ledger_account_settlement_id` as a query parameter of the List Ledger Entries API. To retrieve the itemized Ledger Transactions of the settlement, use the `ledger_account_settlement_id` as a query parameter of the List Ledger Transactions API.

# Migrating to the Ledger Account Settlement API

If you have been tracking Ledger Account Settlements through metadata, or outside Modern Treasury's system, this article provides solutions for migrating to the [Ledger Account Settlement API.](https://docs.moderntreasury.com/platform/reference/ledger-account-settlements)

## Create migration settlements

1. Get a list of Ledger Accounts that you would like to pay out to. It's advised to start off with a small batch of Ledger Accounts first.
2. For each Ledger Account:

   2.a. Create a Settlement through the `POST /ledger_account_settlements` API with an `effective_at_upper_bound` cursor. Assuming that these Ledger Entries have been paid out by you in the past already, the status should be set to `posted`, and the `skip_settlement_ledger_transaction` should be set to `true` so that the settled ledger account's balance will not be reduced by the migration settlement. Please feel free to give the settlement a description like “Settlement for migration purpose only”.  Once the Settlement is created, please take notes of the Settlement’s `created_at` timestamp from the API response. Since this is the first time you are using the Settlements API, it will scoop up all the historical Ledger Entries and include them in this Settlement. As a result, the Settlement amount is for backfilling purpose only, and you should NOT move money for the initial Settlement.

```json
// Example request:
// Say today is 2023-02-01 and you are about to pay out Alice's January ledger entries
{
    "description": "Alice's migration settlement",
    "settled_ledger_account_id": "d44ad0d0-b3ea-4698-867d-09fe961e52a6",
    "contra_ledger_account_id": "3824af4d-4151-48f6-8e8b-bf859cbddbcd",
    "effective_at_upper_bound": "2023-02-01T00:00:00Z",
    "status": "posted",
    "skip_settlement_ledger_transaction": true
  }
```

2.b. Even though Ledger Account Settlements are processed on Modern Treasury side asynchronously, since you do not care about the settlement amount during migration, you would not need to wait for the settlement `finish_processing` webhook before moving on to your routine settlement workflow.

2.c. For your routine settlement workflow, if you have been using `effective_at` to query the Ledger Entries or Ledger Transactions, you would set it to the same value as the Ledger Account Settlement's `effective_at_upper_bound`. If you have been using `posted_at` to query,  you would use the Ledger Account Settlement's `created_at` as an inclusive upper bound of `posted_at`.

After these migration settlements, the future settlements on these accounts should reflect the correct settlement amount.

## Double writing phase

* Please make sure the settlements created in the previous step are in `posted` status instead of `processing` before moving forward. This can be done through consuming Modern Treasury's `ledger_account_settlement.finish_processing` [webhook](https://docs.moderntreasury.com/reference/webhooks) event, or by listing the settlements with pagination and check their status.
* When next Settlement cycle comes around, you should repeat the steps above, but this time please also compare the Settlement amount for each Account. If any discrepancies found, please reach out to Modern Treasury to resolve it. One heads-up is, the Ledger Account API does not take an `effective_at` lower bound. It is designed to prevent missing pay out back-dated Ledger Entries. If this is the root cause of the discrepancies, it is actually the desired behavior to catch any issues in the existing system.
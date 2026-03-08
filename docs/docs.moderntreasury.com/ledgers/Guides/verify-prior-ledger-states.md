# Verify Prior Ledger States

Immutability is one of the most important guarantees from a ledger.

At Modern Treasury, we guarantee immutability by keeping track of the historical changes whenever a Ledger object is updated, which is backed by a series of immutable event logs. In this guide we will walk through how to verify prior ledger states by auditing historical changes to a Ledger object.

# Ledger Transaction History

Ledger Transactions record money movements between Ledger Accounts. Throughout the life cycle of a Ledger Transaction, each modification generates a new Ledger Transaction Version with an incremental version number starting from zero.

A Ledger Transaction can be updated when the status is `pending`, but once it transitions to the final status `posted` or `archived`, it can no longer be changed.

Ledger Entries of a pending Ledger Transaction can also be updated. In order to guarantee immutability, the old Ledger Entries are discarded while new Ledger Entries are created. The Ledger Transaction Version object not only stores the top level Transaction attributes like `description`, `status`, `metadata`, it also captures the historical Ledger Entry values when the change happened.

## Querying Ledger Transaction Versions

The Versions of a Ledger Transaction can be retrieved by sending a request to the [List Ledger Transaction Versions](https://docs.moderntreasury.com/reference/list-ledger-transaction-versions) endpoint:

```curl
curl --request GET \
     --url https://app.moderntreasury.com/api/ledger_transactions/d376dd4e-1c4f-4ba2-9b13-db63c04471e0/versions
```

The API response contains a list of historical values of the Ledger Transaction, sorted by `version` in descending order. Each Version also includes the Ledger Entries attached to the Transaction at the time when the Version was created:

```json
[
  {
    "id": "b3ea66d8-ffa9-44e6-96d2-591cdb998a5e",
    "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
    "object": "ledger_transaction_version",
    "ledgerable_type": null,
    "ledgerable_id": null,
    "ledger_id": "a9d970da-207e-43da-b4d6-6e9ae01ba2cc",
    "description": "Restaurant bill",
    "status": "posted",
    "ledger_entries": [
        {
            "id": "0bbdf6db-2378-449f-b731-0409c14f270c",
            "object": "ledger_entry",
            "amount": 5000,
            "direction": "credit",
            "status": "posted",
            "ledger_account_id": "063da2e3-4a37-4abf-8626-57d25bd6d441",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_account_lock_version": 5,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "resulting_ledger_account_balances": null,
            "live_mode": true,
            "created_at": "2022-10-15T16:58:51Z",
            "updated_at": "2022-10-15T16:58:51Z"
        },
        {
            "id": "5f6a2fe9-502c-439a-a475-2af09b8836ef",
            "object": "ledger_entry",
            "amount": 5000,
            "direction": "debit",
            "status": "posted",
            "ledger_account_id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
            "ledger_account_currency": "USD",
            "ledger_account_currency_exponent": 2,
            "ledger_account_lock_version": 5,
            "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
            "resulting_ledger_account_balances": null,
            "live_mode": true,
            "created_at": "2022-10-15T16:58:51Z",
            "updated_at": "2022-10-15T16:58:51Z"
        }
    ],
    "posted_at": "2022-10-15T16:58:51Z",
    "effective_at": "2022-09-30T16:58:51Z",
    "metadata": {},
    "live_mode": true,
    "created_at": "2022-10-15T16:58:51Z",
    "version": 10
  },
  ...
]
```

Versions can be queried by their created\_at timestamps. For example, to find the Ledger Transaction changes between 9am and 6pm UTC on Oct 21st, you would add query parameters `created_at[gte]=2022-10-21T09:00:00Z&created_at[lte]=2022-10-21T18:00:00Z`:

```curl
curl --request GET \
     --url https://app.moderntreasury.com/api/ledger_transactions/d376dd4e-1c4f-4ba2-9b13-db63c04471e0/versions&created_at[gte]=2022-10-21T09:00:00Z&created_at[lte]=2022-10-21T18:00:00Z
```

Versions can also be queried by a version number range. For example, if you’d like to see what a Ledger Transaction looked like when it was first created, you would add query parameter `version[eq]=0`:

```curl
curl --request GET \
     --url https://app.moderntreasury.com/api/ledger_transactions/d376dd4e-1c4f-4ba2-9b13-db63c04471e0/versions&version[eq]=0
```

# Ledger Account Balance History

A Ledger Account has a `lock_version` field which increments when the pending or posted balance of the Ledger Account changes. Note that you can add Ledger Entries to a Ledger Account with an arbitrary or past `effective_at` timestamp, but the `lock_version` of the Ledger Account will always increment upward upon updating the account.

## Querying Ledger Entries

In order to find out which Ledger Entry contributed to a certain Ledger Account `lock_version`, you can send a request to the List Ledger Entries endpoint with `ledger_account_id` and `ledger_account_lock_version` query parameters.

As mentioned earlier, in order to guarantee immutability, previous Ledger Entries are replaced with the new ones upon editing, which is why we pass an extra query parameter, `show_deleted=true`:

```curl
curl --request GET \
     --url 'https://app.moderntreasury.com/api/ledger_entries?ledger_account_id=063da2e3-4a37-4abf-8626-57d25bd6d441&ledger_account_lock_version=5&show_deleted=true'
```

The API response contains the Ledger Entries of the `ledger_account_lock_version`:

```json
[
    {
        "id": "b5cecf80-93ff-4e2a-8f37-fa5687a14837",
        "object": "ledger_entry",
        "live_mode": true,
        "amount": 6000,
        "direction": "credit",
        "ledger_account_id": "063da2e3-4a37-4abf-8626-57d25bd6d441",
        "ledger_account_currency": "USD",
        "ledger_account_currency_exponent": 2,
        "ledger_account_lock_version": 5,
        "ledger_transaction_id": "d376dd4e-1c4f-4ba2-9b13-db63c04471e0",
        "discarded_at": "2022-10-12T17:32:22Z",
        "created_at": "2022-10-11T19:40:59Z",
        "updated_at": "2022-10-12T17:32:22Z"
    }
]
```

## Querying Account Balance

When a Ledger Entry with an `effective_at` timestamp is added to a Ledger Account, it affects the balance on and after the `effective_at` timestamp.

For example, at 6pm UTC on Oct 1st, some Ledger Entries are added with a backdated `effective_at` of September 30th 6pm UTC. On Oct 15th, you decide to check if the balances as of September 30th have changed. You would send a request to the Get Ledger Account endpoint with a query parameter `balances[effective_at]`:

```curl
curl --request GET \
     --url https://app.moderntreasury.com/api/ledger_accounts/09fa6c2e-ab3e-42c8-86dd-6afbe7ef05ae?balances%5Beffective_at%5D=2022-09-30T18:00:00Z
```

The balances in the response are the sum of all the Ledger Entries that are currently recorded in the system with effective\_at less than or equal to 2022-09-30T18:00:00Z.

```json
{
    "id": "09fa6c2e-ab3e-42c8-86dd-6afbe7ef05ae",
    "object": "ledger_account",
    "name": "Alice's account",
    "ledger_id": "a9d970da-207e-43da-b4d6-6e9ae01ba2cc",
    "description": "Alice's account",
    "lock_version": 5,
    "normal_balance": "credit",
    "balances": {
      "pending_balance": {
        "credits": 50000,
        "debits": 10000,
        "amount": 40000,
        "currency": "USD",
        "currency_exponent": 2
      },
      "posted_balance": {
        "credits": 20000,
        "debits": 1000,
        "amount": 19000,
        "currency": "USD",
        "currency_exponent": 2
      },
      "available_balance": {
        "credits": 20000,
        "debits": 10000,
        "amount": 10000,
        "currency": "USD",
        "currency_exponent": 2
      } 
    },
    "metadata": {},
    "live_mode": true,
    "created_at": "2022-08-04T16:54:32Z",
    "updated_at": "2022-08-04T16:54:32Z"
}
```
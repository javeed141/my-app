# Query for Ledger Account Category Balances

We can use the [get Ledger Account Categories](https://docs.moderntreasury.com/reference/get-ledger-account-category) and [list Ledger Account Categories](https://docs.moderntreasury.com/reference/list-ledger-account-categories) endpoints to return balances from Categories in the Ledger.

When using the LIST endpoint, you can define queries using parameters such as `id`, `name`, `ledger_id`, `parent_ledger_account_category_id` and `metadata`, among other fields. In the example below we are returning two categories that belong to the same Ledger.

```curl
curl --request GET \
     --url 'https://app.moderntreasury.com/api/ledger_account_categories?ledger_id=6266f306-6441-4b4c-988c-82a6fc3c72fa&per_page=25' \
     --header 'Accept: application/json'
```

Response:

```json
[
  {
    "id": "17a7e900-435f-419b-848f-a8d80d26b62f",
    "object": "ledger_account_category",
    "live_mode": false,
    "name": "MT Combined Accounts",
    "ledger_id": "6266f306-6441-4b4c-988c-82a6fc3c72fa",
    "description": null,
    "normal_balance": "credit",
    "balances": {
      "pending_balance": {
        "credits": 600,
        "debits": 0,
        "amount": 600,
        "currency": "USD",
        "currency_exponent": 2
      },
      "posted_balance": {
        "credits": 600,
        "debits": 0,
        "amount": 600,
        "currency": "USD",
        "currency_exponent": 2
      },
      "available_balance": {
        "credits": 600,
        "debits": 0,
        "amount": 600,
        "currency": "USD",
        "currency_exponent": 2
      }
    },
    "metadata": {},
    "discarded_at": null,
    "created_at": "2022-06-24T21:27:19Z",
    "updated_at": "2022-06-24T21:27:19Z"
  },
  {
    "id": "0999a267-58dd-4c3f-98e5-9f7af40cc25d",
    "object": "ledger_account_category",
    "live_mode": true,
    "name": "Combined View",
    "ledger_id": "6266f306-6441-4b4c-988c-82a6fc3c72fa",
    "description": "Test Category",
    "normal_balance": "credit",
    "balances": {
      "pending_balance": {
        "credits": 1220,
        "debits": 0,
        "amount": 1220,
        "currency": "USD",
        "currency_exponent": 2
      },
      "posted_balance": {
        "credits": 900,
        "debits": 0,
        "amount": 900,
        "currency": "USD",
        "currency_exponent": 2
      },
      "available_balance": {
        "credits": 900,
        "debits": 0,
        "amount": 900,
        "currency": "USD",
        "currency_exponent": 2
      }
    },
    "metadata": {},
    "discarded_at": null,
    "created_at": "2022-06-24T17:55:18Z",
    "updated_at": "2022-06-24T17:55:18Z"
  }
]
```

Note that, similar to Ledger Accounts, Categories also feature `pending`, `posted`, and `available` balances.
# Create a Ledger Account Category

Ledger Account Categories can be created simply by calling our [Create Ledger Account Category](https://docs.moderntreasury.com/reference/create-ledger-account-category) endpoint:

```curl
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_account_categories \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '
{
     "name": "US Payables",
     "description": "Groups all payable accounts in the United States",
     "normal_balance": "credit",
     "currency": "USD",
     "ledger_id": "78fa571-fe0e-97b2-4228-ccc79018db8e9",
     "metadata": {}
}
'
```

This would return the following object:

```json
{
  "id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
  "object": "ledger_account_category",
  "name": "US Payables",
  "ledger_id": "78fa571-fe0e-97b2-4228-ccc79018db8e9",
  "description": "Groups all payable accounts in the United States",
  "normal_balance": "credit",
  "balances": {
    "pending_balance": {
      "credits": 0,
      "debits": 0,
      "amount": 0,
      "currency": "USD"
    },
    "posted_balance": {
      "credits": 0,
      "debits": 0,
      "amount": 0,
      "currency": "USD"
    }
  },
  "metadata": {},
  "live_mode": true,
  "created_at": "2022-08-04T16:54:32Z",
  "updated_at": "2022-08-04T16:54:32Z"
}
```

Note that similar to Ledger Accounts, account categories take a `normal_balance` (one of `debit` or `credit`) and free-form metadata.

#
# Add a Ledger Account to a Ledger Account Category

We can use the [add Ledger Account to Category](https://docs.moderntreasury.com/reference/add-ledger-account) endpoint to add an account to a Category. For this, we simply need the ids of both the parent Category and the Ledger Account we will be nesting under it.

```curl
curl --request PUT \
     --url https://app.moderntreasury.com/api/ledger_account_categories/f1c7e474-e6d5-4741-9f76-04510c8b6d7a/ledger_accounts/7244f59-cfd8-8dfa-9466-7de9f42b0b1a9 \
     --header 'Accept: application/json'
```

After we add an account to a Category, it can be removed by using the [remove Ledger Account from Category](https://docs.moderntreasury.com/reference/remove-ledger-account) endpoint. This does not affect the underlying transactions, which are immutable, or the underlying account: it simply removes the newly excluded account balance from the category balance calculation.

Finally, to add several accounts to a Category, we can use the [list Ledger Transactions](https://docs.moderntreasury.com/reference/list-ledger-transactions) endpoint to query transactions by metadata and programmatically add them into a Category using the same API call above repeatedly.
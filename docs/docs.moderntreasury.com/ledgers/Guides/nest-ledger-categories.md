# Nest Ledger Account Categories

We can add a Ledger Account Category to another Category by using the [add Ledger Account Category to Category](https://docs.moderntreasury.com/reference/add-ledger-account-category) endpoint. For this call, we again need ids of both Categories:

```curl
curl --request PUT \
     --url https://app.moderntreasury.com/api/ledger_account_categories/40cb8f7-2ba1-c303-bcf7-5605c2f20eb4b/ledger_account_categories/fc5b284-da91-d70a-b43f-fdda68ae21d84 \
     --header 'Accept: application/json'
```

As above, a Category can be removed from another by using the [remove Ledger Account Category from Category](https://docs.moderntreasury.com/reference/remove-ledger-account-category) endpoint. This also does not affect underlying transactions: it simply removes the newly excluded child category balance from the parent category balance calculation.

Categories can be nested up to level 4, where a root category without any nested category is considered level 0. Up to 1 million Ledger Accounts can be added to a single Ledger Account Category graph.
# Ledger Account Categories Overview

These guides explains how account Categories can be used to nest Ledger Accounts.

Ledger account categories are free-form account groups that can be used to create account hierarchies. Categories can contain other accounts or as well as other categories. The balance of a Ledger Category is equal to the sum of the balances of all contained accounts. Ledgers supports an unlimited amount of ledger categories.

A best practice is to set up Ledger Accounts as the lowest level aggregations for your business and use Categories to 'rollup' balances as needed. If you are using the ledger to track accounts payable, for instance, you can have each individual vendor you owe represented as an account and use categories to group accounts by state, country, or any other grouping of your choice.

Ledger Account Category balances can be used to lock Ledger Transactions creates and updates. Read more about this [here](https://docs.moderntreasury.com/ledgers/docs/handle-concurrency#locking-on-category-balance).

In this guide, we will walk through the following examples: creating a Category, adding existing Ledger Accounts to a new Category, adding existing Ledger Categories to a new Category, and querying balances. You can find the API reference for Ledger Account Categories [here](https://docs.moderntreasury.com/reference/create-ledger-account-category).
# Debits and Credits

Ledgers was built with double-entry accounting principles in order to guarantee that your software does not misplace money.

This is an introduction to the subset of accounting rules you need to know to map your accounts and start recording transactions and tracking balances on Ledgers.

## Accounts & Transactions

Accounts are objects that represent the balances you will track. Transactions are Ledgers objects that represent the financial transactions written into the ledger. Each of these is represented by the API objects `ledger account` and `ledger transaction`, respectively.

Each `ledger transaction` object is composed of two or more `ledger entry` objects. `ledger entry` objects have a `direction` property that takes one of two values: `debit` or `credit`.

When a transaction is created, at least one entry needs to have a `debit` direction property (and therefore called a debit, or an entry on the debit side), and at least one entry needs to have a `credit` direction property (and therefore called a credit, or an entry on the credit side).

Put differently, a transaction will have at least one debit entry and at least one credit entry. Each entry is associated with and updates the balance of a single account.

## Debit Normal vs Credit Normal Accounts

Accounts have types. Such types are represented by the `normal_balance` field that `ledger account` objects have on the API. This field will take one of `debit` or `credit`.

Accounts with `debit` normality - or debit normal accounts - represent funds your company **owns**. They are broadly associated with uses of funds, assets, and expenses.

Accounts with `credit` normality - or credit normal accounts - represent funds your company **owes**. They are broadly associated with sources of funds, liabilities, and revenue.

General examples include:

| Debit Normal Accounts                                                                                                              | Credit Normal Accounts                                                                                                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accounts that represent **assets** such as cash or principal outstanding on a loan.                                                | Accounts that represent **liabilities** such as balances held on behalf of users in a digital wallet or owed to external parties such as investors in your platform. |
| Accounts that represent **expenses** such as card processing fees or payments to third parties executed in the course of business. | Accounts that represent **revenue** or **income** such as interest revenue in your lending platform or revenue from fees.                                            |

## Debits and credits in a transaction

Transaction entries will modify accounts based on the normality of the account:

| Effect on Balances | Debit Normal Account | Credit Normal Account |
| :----------------- | :------------------- | :-------------------- |
| Debit Entry        | Increase             | Decrease              |
| Credit Entry       | Decrease             | Increase              |

Entries on the debit side will increase debit normal accounts, while entries on the credit side will decrease them. Conversely, entries on the credit side will increase credit normal accounts, while entries on the debit side will decrease them.

## Next Steps

* For more information on debits and credits, take a look at our [Accounting for Developers](https://www.moderntreasury.com/journal/accounting-for-developers-part-i) series.
* To understand how to deploy these principles within your specific use case, review our Use Case Guides.
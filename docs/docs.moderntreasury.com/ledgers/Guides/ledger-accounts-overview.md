# Ledger Accounts Overview

A Ledger Account is a programmatically tracked balance in a double-entry system.

The Ledger Account tracks a sum of money, denominated in a specified currency. An account might represent a user's digital wallet, a counterparty's outstanding balance receivable, a company’s operating cash, or a loan principal.

Each Ledger Account belongs to a Ledger and can only transact with other accounts belonging to the same Ledger.

Ledger Accounts have a Balance object that allows you to report on balances in real-time. Accounts can report a few different balances:

* **Posted Balance:** The amount that has fully settled in an Account. This is the sum of posted Ledger Entries on the Account.
* **Pending Balance:** The amount that is expected to settle in or out of an Account plus the amount that is already settled. This is the sum of posted and pending Ledger Entries on the Account.
* **Available Balance**: The amount that is safely available to use from an Account. This balance subtracts money that is expected to leave an Account, but does not include money that’s expected to settle in an Account. For a debit-normal Account, this is the sum of posted debit entries and pending or posted credit entries. For a credit-normal Account, this is the sum of posted credit entries and pending or posted debit entries.

You can learn more about the attributes of Ledger Accounts and their balances in [the API reference](/platform/reference/ledger-account-object).
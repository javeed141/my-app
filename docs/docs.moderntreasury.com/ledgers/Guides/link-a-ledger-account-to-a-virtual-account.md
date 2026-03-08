# Link a Ledger Account to a Virtual Account

If you are using [Virtual Accounts](/platform/reference/virtual-account-object), you can link any virtual account to [Ledger Accounts](/platform/reference/ledger-account-object). This allows you to automatically represent unoriginated transactions that pass through the Virtual Accounts in the ledger.

# Linking Ledger Accounts

To benefit from auto-ledgering on Virtual Accounts both the Internal Account and Virtual Account must be linked to Ledger Accounts.

A Virtual Account can be linked to a Ledger Account through its [Create API ](https://docs.moderntreasury.com/platform/reference/create-virtual-account)via the `ledger_account` parameter, or its [Update API](https://docs.moderntreasury.com/platform/reference/update-virtual-account) via the `ledger_account_id` parameter. Alternatively you could also set the `ledgerable_id` and `ledgerable_type` fields on a Ledger Account on [Create](https://docs.moderntreasury.com/platform/reference/create-ledger-account) or [Update](https://docs.moderntreasury.com/platform/reference/update-ledger-account).

An Internal Account can be linked to a Ledger Account through its [Update API](https://docs.moderntreasury.com/platform/reference/update-internal-account) via the `ledger_account_id` parameter, or through setting the `ledgerable_id` and `ledgerable_type` fields on a Ledger Account on [Create](https://docs.moderntreasury.com/platform/reference/create-ledger-account) or [Update](https://docs.moderntreasury.com/platform/reference/update-ledger-account).

# Default Ledgering

Funds can move into (credit) or out of (debit) an Internal Account via a Virtual Account. For each scenario an `incoming_payment_detail` as well as a `ledger_transaction` objects are created. Each scenario is auto-ledgered in the following ways:

* When funds flow into an Internal Account via a Virtual Account a `credit` IPD is created, the Virtual Account's Ledger Account will be credited the amount of the inbound payment and the Internal Account's Ledger Account will be debited the amount of the inbound payment.
* When a Virtual Account is debited a `debit` IPD is created, the Virtual Account's Ledger Account will be debited the amount of the outbound payment and the internal account's ledger account will be credited the amount of the outbound payment.
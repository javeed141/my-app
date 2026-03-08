# Link a Ledger Account to an Internal or External Account

You can link Internal Accounts or External Accounts to Ledger Accounts in order to automatically ledger payments and to perform [Account Reconciliation](https://docs.moderntreasury.com/reconciliation/docs/account-reconciliation-overview).

# Setup

An [Internal Account](/platform/reference/internal-account-object) can be linked to a [Ledger Account](https://docs.moderntreasury.com/ledgers/docs/ledger-accounts-overview) by passing a `ledger_account_id` parameter on [updating the Internal Account](https://docs.moderntreasury.com/platform/reference/update-internal-account), or by passing `ledgerable_id` and `ledgerable_type` fields on [creating the Ledger Account](https://docs.moderntreasury.com/platform/reference/create-ledger-account).

An  [External Account](/platform/reference/external-account-object-w-ledger) can also be linked to a Ledger Account by passing a `ledger_account_id` parameter on [updating the External Account](https://docs.moderntreasury.com/platform/reference/update-external-account), or by passing `ledgerable_id` and `ledgerable_type` fields on [creating the Ledger Account](https://docs.moderntreasury.com/platform/reference/create-ledger-account). You can also pass in a new `ledger account` object when [creating an External Account](https://docs.moderntreasury.com/platform/reference/create-external-account), which will create both objects at the same time.

# Account Reconciliation

Account reconciliation allows you to compare the balance of a Ledger Account to the balance of an Internal Account in the Modern Treasury dashboard. This is an important step to ensure that your ledger is in sync with the bank or provider's balance reports, and that you have not failed to ledger any transactions.

Once an Internal Account is linked to a Ledger Account, you will see the variance between the two accounts displayed on the Reconciliation Overview and Reconcile pages, as well as the Ledgers tab on the Internal Account page.

Read more on [Account Reconciliation](https://docs.moderntreasury.com/reconciliation/docs/account-reconciliation-overview).

# Default Ledgering

If you link both Internal Accounts and External Accounts to Ledger Accounts, any Payment Orders you initiate between the Internal and External Accounts will be automatically ledgered.

When creating a Payment Order between these bank accounts, if you do not specify an attached Ledger Transaction, one will be created for you. Payments increasing the Internal Account balance will debit its corresponding Ledger Account and credit the External Account's corresponding Ledger Account. Payments decreasing the Internal Account balance will credit its corresponding Ledger Account and debit the External Account's corresponding Ledger Account.

Ledger Transactions are created asynchronously, so the `ledger_transaction_id` will not be in the Payment Order response. For this information, you can listen to the `ledger_transaction.created` or `payment_order.auto_ledgered` webhooks.

# Auto-Ledgering Incoming Payments with Internal Accounts and  Nested Internal Accounts

For use cases requiring dual-entry bookkeeping on a single Internal Account or Nested Internal Account, you can link a contra Ledger Account to automatically ledger incoming payments.

## Setup

Link a contra ledger account to the Internal Account by passing the `contra_ledger_account_id` parameter when updating a Nested Internal Account:

```json
// PATCH /internal_accounts/9fddd355-306d-4c88-9f72-582d6a02325f
{
  "ledger_account_id": "cf1adf88-c121-46fc-8e49-8dc135968069",
  "contra_ledger_account_id": "019a92ef-6000-7e84-8373-f03464e62b9b"
}
```

Both the primary `ledger_account_id` and the `contra_ledger_account_id` must be set to auto-ledger inbound payments.

## Behavior

When an [Incoming Payment Detail](https://docs.moderntreasury.com/platform/reference/incoming-payment-detail-object#/) is received for an Internal Account with both Ledger Accounts linked, a Ledger Transaction is automatically created with offsetting entries for the amount of the incoming payment:

**Credit IPD (funds flowing in):**

* Increases the balance of the primary Ledger Account by the amount of the IPD
  * If the primary Ledger Account is credit normal → credit entry to primary Ledger Account
  * If the primary Ledger Account is debit normal → debit entry to primary Ledger Account
* The contra Ledger Account receives the offsetting entry

**Debit IPD (funds flowing out):**

* Decreases the balance of the primary Ledger Account by the amount of the IPD
  * If the primary Ledger Account is credit normal → debit entry to primary Ledger Account
  * If the primary Ledger Account is debit normal → credit entry to primary Ledger Account
* The contra Ledger Account receives the offsetting entry

**Example flow of an inbound credit:**

<Image border={false} src="https://files.readme.io/aafd5b5206fc5f1ef1ed20f19ec83364e182131ad4c59606a230cf8f754ccff2-image.png" />
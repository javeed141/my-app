# Account Reconciliation

You can perform account reconciliation in Modern Treasury to resolve the variance between a balance in your ledger and a balance reported by a bank or vendor. Generally, performing account reconciliation is a good way to confirm that you have tracked and attributed all funds within an account.

In Modern Treasury, account reconciliation is performed between an Internal Account (which represents a bank or vendor reported account) and a Ledger Account (which is your internal representation of that account).

# Setting Up

If you have Reconciliation and Ledgers enabled, you can [connect an Internal Account to a Ledger Account](https://docs.moderntreasury.com/ledgers/docs/link-a-ledger-account-to-an-internal-or-external-account) to enable the feature.

To keep your internal ledger in sync with money movement, you should ledger every money movement that passes through the account. You can link [Ledger Transactions to Payment Orders](https://docs.moderntreasury.com/ledgers/docs/link-a-ledger-transaction-and-payment-order) that you originate, and you can link [Ledger Transactions to Expected Payments](https://docs.moderntreasury.com/ledgers/docs/link-a-ledger-transaction-to-an-expected-payment) in order to reconcile and ledger unoriginated transactions.

# Viewing Account Variance

In the Cash Management page, you can view the variance between the Internal Account Balance and Ledger Account balance.

<Image align="center" border={false} src="https://files.readme.io/2041a8a-Screenshot_2024-05-09_at_11.49.45_AM.png" />

Clicking on an account shows you the variance calculated for each day that a Balance Report was received for the Internal Account.

<Image align="center" border={false} src="https://files.readme.io/3f5ad9333861d05843164beb55ef42e29b45dc8779069e1489b718791d6556de-Screenshot_2025-07-22_at_9.17.08_AM.png" />

# Resolving Account Variance

If you want to perform Account Reconciliation for a given reporting day, you can click the table row for that day to navigate to the Reconcile page. On this page, you can view reported transactions for the time period that have not been added to the ledger. Selecting a transaction and clicking on the Reconcile button will allow you to create a Ledger Transaction and Expected Payment corresponding to this transaction, allowing you to bring variance for the reporting period closer to zero.
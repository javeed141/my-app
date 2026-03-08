# Virtual Account Testing

When you first start using Modern Treasury's Virtual Accounts, it's important to run tests in production before going live to ensure incoming payments are being successfully attributed.

## To test a Virtual Account

### 1. Initiate a test payment

Once you have successfully created a Virtual Account, send one payment of each payment type you expect to receive (such as ACH, Wire, etc.) to the associated virtual account number. This payment should be initiated ***outside*** of Modern Treasury, through any bank portal.

### 2. Monitor activity in Modern Treasury

If the payment was completed, you should see a few indications in the dashboard that we received the inbound payment notice from your bank.

1. **An Incoming Payment Detail (IPD)** - Found in Payments Overview, under the [Incoming Payments](https://app.moderntreasury.com/incoming_payment_details) tab
   1. An IPD represents a payment where your bank is the RDFI and your account is the receiving account, as opposed to a payment you originate via a Payment Order.
   2. For certain banks, these can also be interpreted as a pre-notification of inbound funds. By pre-notification, we mean that an IPD is a notice of a pending payment that has been received but has not been settled. Eventually, these IPDs will reconcile to a Transaction on a bank statement.
2. **A Transaction** - Found in the [Transactions](https://app.moderntreasury.com/transactions) page under the Reconciliation section
   1. Transactions refer to a Modern Treasury object that represents the bank statement transactions that we obtain from the underlying bank. Depending on the connection, these are generated from BAI2 files or a bank's API.

If you see both an IPD and a Transaction, your Virtual Accounts are properly configured and ready for production use.
# Virtual Accounts

A Virtual Account is an alias account number that is linked to a standard bank account. They can receive incoming payments in place of a bank account, and divide up the balance of the linked bank account. Some Virtual Accounts can report its own balance too, you can learn more about the two types of Virtual Accounts [here](https://docs.moderntreasury.com/payments/docs/virtual-account-testing-1).

Creating Virtual Accounts is an easier way to have many account numbers since it replaces the need to create many individual bank accounts.

Common use cases are:

* Attributing incoming payments
* Holding funds on behalf of users
* Operating an in-house bank

Your bank must support Virtual Accounts to use them on Modern Treasury. Though some banks call this product by a different name. [See here for a list of supported banks.](https://docs.moderntreasury.com/payments/docs/virtual-account-testing-1)

Our customers use Virtual Accounts in a variety ways to power money movement, attribution, and reconciliation in their products and workflows. Here are a few examples.

# Attribute incoming payments

Companies that allow users to send funds as a payment method (e.g., receiving wires from users) can use Virtual Accounts to accurately track who sent them funds.

To start, you create and assign a unique Virtual Account Number to each user. This means each user has a unique payment instruction.

After an incoming payment is posted, you will receive an [Incoming Payment Detail](/platform/reference/incoming-payment-detail-object) specifying the Virtual Account number that received this payment. This enables you to map the unique Virtual Account number back to the assigned user and confirm who sent the payment.

# Hold funds for users

Companies that hold funds on behalf of users (e.g., in a digital wallet) can use Virtual Accounts to track the balances.

To start, you create a unique Virtual Account for each digital wallet. This enables each wallet to receive funds using an account and routing number just like a bank account.

You can also connect each wallet to its user by [creating and linking a counterparty](https://docs.moderntreasury.com/payments/docs/creating-virtual-accounts#creating-virtual-accounts) to each Virtual Account. This allows you to refer to the user directly (e.g., name, email, id) making it easier to recognize and initiate payouts to specific users.

Some banks maintain individual balances for each Virtual Account. This means transactions will credit and debit the Virtual Account directly, and you will be able to check the latest balance just like any bank account.

If your bank does not maintain balances for Virtual Accounts, you can link Virtual Accounts with [Ledgers](/ledgers/docs/link-a-ledger-account-to-a-virtual-account) and Modern Treasury will automatically maintain an updated balance with each transaction. In these cases, funds received and originated by these Virtual Accounts will post to the linked bank account.

# Operate an in-house bank

Companies can operate an in-house bank using Virtual Accounts for greater efficiency in speed and cost.

To start, you create a unique Virtual Account for each separate internal entity. This avoids the hassle and cost of creating numerous individual bank accounts, while still enabling each entity to receive funds from external sources if needed.

When operating an in-house bank it is important to pair Virtual Accounts with a [Ledger](/ledgers/docs/link-a-ledger-account-to-a-virtual-account). This will enable you to transfer funds between internal entities as an instant ledger transaction, without needing to pay any transaction fees.

Some in-house banks need to send payments directly from an internal entity to an external counterparty. In these cases, you may want to work with [a bank that supports originating payments](https://docs.moderntreasury.com/payments/docs/virtual-account-testing-1) directly from Virtual Accounts since it will be easier. Otherwise, the payments will originate from the linked physical bank account.

# Testing  Virtual Accounts in Sandbox

You may test the [Virtual Accounts](https://docs.moderntreasury.com/payments/docs/virtual-accounts) API in the sandbox. Virtual Accounts can be created in any Internal Account.

Virtual account numbers in the sandbox are dynamically generated. When creating a Virtual Account, you do not have to pass in the account number. So your API call would look like this.

```curl Creating a virtual account
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/virtual_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Funds on behalf of Alice Jones",
    "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd"
  }'
```

If you would like to simulate incoming payments to your virtual accounts, please refer to [Simulating an Incoming Payment Detail](/payments/docs/simulating-an-incoming-payment-detail).
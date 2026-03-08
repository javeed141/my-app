# Cards

Ledgers tutorial for cards. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial will explain how to use **Modern Treasury**’s [Ledgers API](https://www.notion.so/platform/reference/ledger-object) to power your card issuing workflows.

In this guide, we’ll walk through how to design and implement your ledger to support card issuing. Topics covered include:

* Defining the most common **Ledger Transactions** to record to the Ledger
* Creating the **Ledger** and **Ledger Accounts** required to support this use case
* Important design considerations to support card issuing, such as implementing credit limits via balance locking and avoiding locking on hot accounts.
* Future steps needed to get to a Production-ready application ledger

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68deac3fb0b0a1caf38e5f00?mode=link&layoutType=web&zoomLevel=0.8&step=1" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

# Step 1. Defining Account and Transaction Logic

Before implementing the ledger, we need to design our **accounts** and **transactions**.

**Ledger Accounts** represent the most specific balances that we need to track. With card issuing, there are two main use cases:

* Credit (The card program extends credit on purchases  and later  retrieves funds back from the consumer)
* Debit (Customer prefunds the account, similar to a digital wallet use case)

The general balances to be tracked are as follows:

| **Ledger Account Name**            | **Normality** | Purpose                                                                                                                   |
| ---------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Bank Balance**                   | Debit         | Tracks total funds held in the bank account powering the card program                                                     |
| **User Receivable Balance**        | Debit         | Tracks user activity and funds owed from the user back to the card program \[Applies only to **credit** card use case]    |
| **User Wallet/ Card Account**      | Credit        | Tracks funds a specific user has available. One Ledger Account per user. \[Applies to **debit**/ prefunded card use case] |
| **Merchant/ Card Network Payable** | Credit        | Tracks amount owed to merchants and/or the card network powering the card program                                         |
| **Revenue**                        | Credit        | Track revenue streams captured by the card product.                                                                       |

**Ledger Transactions** represent the events that happen in the card program - what are the customer actions that you need to track, and how do they change the account balances above? The table below shows the most common user actions supported by card issuing programs and how they should be recorded to the **Ledger**.

<Callout icon="💡" theme="default">
  **Note**: For a refresher on account normality and how debits and credits work, review our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits). For more on how to design your chart of accounts, see the [Appendix](https://www.notion.so/Digital-Wallet-Ledgers-Guide-24ed6bfc268380bbafced768cbdceb96?pvs=21).
</Callout>

**Debit Card Flow (User prefunds their account and spends from “wallet” balance)**

| **Sample Ledger Transaction** | **Debited Accounts**                      | **Credited Accounts**                     | **Notes**                                                                                                                                                                                             |
| ----------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User Account Funding          | Cash account (increase)                   | User Card Account (increase)              | When a user deposits funds to their account, we capture the increase in cash and corresponding increase in the user balance.                                                                          |
| User Card Swipe               | User Card Account (decrease)              | Merchant/ Card Network Payable (increase) | When a debit card user swipes their card at a merchant, their balance moves from the account to a merchant/ card network payable account.                                                             |
| Merchant Settlement           | Merchant/ Card Network Payable (Decrease) | Cash account (Decrease)                   | Settle to merchant and/or card network. With card networks, it is common that they will debit this amount directly from your bank account. You should be notified of the debit and ledger accordingly |

**Credit Card Flow (Platform extends credit and collects from user )**

| **Sample Ledger Transaction** | **Debited Accounts**                      | **Credited Accounts**                     | **Notes**                                                                                                                                                                                             |
| ----------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User Card Swipe               | User Receivable  account (Increase)       | Merchant/ Card Network Payable (increase) | When a credit card user swipes their card at a merchant, track the amount they spent at the merchant and the amount they owe back to the card program                                                 |
| User Card repayment           | Cash account (Increase)                   | User Receivable  account (Decrease)       | Track User repayment to their credit card program, reducing the user receivable account and increasing the cash account                                                                               |
| Merchant Settlement           | Merchant/ Card Network Payable (Decrease) | Cash account (Decrease)                   | Settle to merchant and/or card network. With card networks, it is common that they will debit this amount directly from your bank account. You should be notified of the debit and ledger accordingly |

Your application code will write transactions to the **Ledger** when users take any of the actions above. Our team can help you structure your Ledger Transaction logic to meet your product and financial reporting requirements, and optimize app performance.

# Step 2. Create Your Ledger and Ledger Accounts

Before we can post any **Ledger Transactions**, we’ll need to instantiate our Ledger.

Create a Ledger using the [Create Ledger endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger) (`POST /ledgers`).

```bash
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledgers \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Card Ledger",
    "description": "Ledger to Power Card Program "
  }'
```

Modern Treasury will return a **Ledger** object with a UUID to be used in subsequent steps.

```bash
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "Card Ledger",
    "description": "Ledger to Power Card Program ",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:48:05Z",
    "updated_at": "2020-08-04T16:48:05Z"
}
```

Next, create the required **Ledger Accounts,** outlined in section 1\*\*,\*\* using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account) (`POST /ledger_accounts`).

```bash
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Bank Account",
    "description": "Tracks Bank Account that powers card program",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Customer Card Balance",
    "description": "Balance held on customer card",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Customer Recievable",
    "description": "Tracks money Owed to card program from customer",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Processor Payable",
    "description": "Tracks Money Owed to Processor",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the four **Ledger Accounts** you've created. Each has their own UUID that we can use in our **Ledger Transactions**.

# Step 3. Record Ledger Transactions

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, we can write to the **Ledger** to record some user actions. Each card action by your customer can be used to write a ledger transaction to Modern Treasury Ledgers. This tutorial will cover the credit flow, where the user swipes a card, the card program collects payment from the user, and then the card program settles the amount with a processor or merchant.

In this example, we will record a card swipe activity of $100, with your platform taking $0.30 in fees from the processor pay out. On the ledger, create a **Ledger Transaction** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`) with the following ledger entries

```bash
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "User Card Swipe",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<Card Swipe ID>",
    "ledger_entries": [
      {
        "amount": 10000,
        "direction": "debit",
        "ledger_account_id": "<user_receivable_id>"
      },
      {
        "amount": 9970,
        "direction": "credit",
        "ledger_account_id": "<processor_payable_id>"
      },
      {
        "amount": 30,
        "direction": "credit",
        "ledger_account_id": "<revenue_account_id>"
      }
    ]
  }'
```

This transaction will record a $100 receivable to the customer, a $99.70 payable to the processor and $0.3 in revenue to your platform

Next, we will simulate the customer repaying the amount owed to your card platform. Create a Ledger Transaction to  reduce the receivable from the customer and increase your cash balance

```bash
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "User Pay In",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<Card Swipe ID>",
    "ledger_entries": [
      {
        "amount": 10000,
        "direction": "debit",
        "ledger_account_id": "<Cash Balance>"
      },
      {
        "amount": 10000,
        "direction": "credit",
        "ledger_account_id": "<user_receivable_id>"
      }
    ]
  }'
```

This transaction represents $100 hitting the programs bank account, and reducing the amount owed from the user by $100

Lastly, we will model settlement to a card processor or merchant. In merchant flows, your platform usually pushes funds to settle outstanding balances, whereas in card processor flows, the processor will typically pull funds from your bank account. In either case, the Ledger Transaction and entries are the same.

You will have to determine what event will write this ledger transaction. If using our Payments product, this transaction can be written as part of an Expected Payment (for pull scenarios) or Payment Order (for Push Scenarios)

```bash
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Processor Settlement",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<Card Swipe ID>",
    "ledger_entries": [
      {
        "amount": 9970,
        "direction": "debit",
        "ledger_account_id": "<processor_payable_id>"
      },
      {
        "amount": 9970,
        "direction": "credit",
        "ledger_account_id": "<Cash Balance>"
      }
    ]
  }'
```

This transaction will show $99.70 leaving our bank balance to settle the amount owed to the processor

# Additional Topics

This section will cover common functionality that is needed for a card issuing implementation.

### Enforcing Credit Limits

Credit limits is a common requirement amongst card programs to implement. In its simplest form, the goal of a credit limit is simply enforcing that an account balance does not go over a specified amount. With Modern Treasury Ledgers, we can use our Balance Locking functionality to enforce this.

With balance locking, you can include balance filters with a Ledger Entry to validate the corresponding Ledger Account's balance when creating or updating a transaction. If the transaction would push the account balance outside the specified range, the request will fail with a 422 error.

Available balance filter types include `pending_balance_amount`, `posted_balance_amount`, and `available_balance_amount`.

For example, if your user has a credit limit of $2000 but already has a $1000 balance on their receivables and attempts to charge another $1500 to their account, we can make sure this transaction fails using a balance lock with the less than or equal to filter (lte)

```bash
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "User Card Swipe",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<Card Swipe ID>",
    "ledger_entries": [
      {
        "amount": 150000,
        "direction": "debit",
        "ledger_account_id": "<user_receivable_id>"
        "posted_balance_amount": {"lte": 200000}
      },
      {
        "amount": 149970,
        "direction": "credit",
        "ledger_account_id": "<processor_payable_id>"
      },
      {
        "amount": 30,
        "direction": "credit",
        "ledger_account_id": "<revenue_account_id>"
      }
    ]
  }'
```

### Avoid locking on hot accounts

When specifying a balance lock, entries will be written synchronously. As a result, this means that it is best to specify locks only on lower throughput accounts such as user specific accounts rather than “hot accounts” (such as the processor payable account).

In the example above, the lock is specified only on the user\_receivable account while other accounts are not locked.

Be sure to read our guide on [handling concurrency](https://docs.moderntreasury.com/ledgers/docs/handle-concurrency) for more information.
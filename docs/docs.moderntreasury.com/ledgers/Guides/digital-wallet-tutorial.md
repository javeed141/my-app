# Digital Wallet

Ledgers tutorial for digital wallets. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial will explain how to use **Modern Treasury’s** [Ledgers API](https://docs.moderntreasury.com/platform/reference/ledger-object#/) to build a digital wallet app. We’ll design a Ledger for a platform called **SendCash** that enables users to deposit money and send it to their friends.

In this guide, we’ll walk through design to implementation of a digital wallet ledger. We will do so by:

* Defining the most common transactions SendCash needs to record to the Ledger
* Creating the **Ledger** and **Ledger Accounts** (LA) required to support this use case
* Posting **Ledger Transactions** to change our LA balances, in response to user actions
* Future steps needed to get to a Production-ready application ledger

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68ae0f84c6f03cbb45b5f88a?mode=link&layoutType=web&zoomLevel=0.8&step=1" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

# Step 1. Defining Account and Transaction Logic

Before we implement our ledger, we need to design our **accounts** and **transactions**.

**Ledger Accounts** represent the most specific balances that we need to track. Our digital wallet application requires that we track each end-user’s wallet balance as well as the total cash balance in our bank account. We’ll also track revenue earned from any direct transaction fees we charge.

| **Ledger Account Name** | **Normality** | Purpose                                                                  |
| ----------------------- | ------------- | ------------------------------------------------------------------------ |
| **Cash**                | Debit         | Tracks total funds held in our custodian bank account.                   |
| **User Wallet(s)**      | Credit        | Tracks funds a specific user has available. One Ledger Account per user. |
| **Revenue**             | Credit        | Track revenue streams captured by our digital wallet product.            |

**Ledger Transactions** represent the events that happen in our funds flow - what actions need to occur in SendCash's digital wallet, and how do they change our account balances above? The table below shows the most common user actions supported by digital wallet apps and how they should be recorded to the **Ledger**.

<Callout icon="💡" theme="default">
  **Note**: For a refresher on account normality and how debits and credits work, review our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits). For more on how to design your chart of accounts, see the **[Learn More](https://docs.moderntreasury.com/ledgersdocs/digital-wallet-tutorial#learn-more-designing-your-chart-of-accounts)** section of this guide.
</Callout>

| **Sample Ledger Transaction** | **Debited Accounts**                    | **Credited Accounts**                                 | **Notes**                                                                                                                    |
| :---------------------------- | :-------------------------------------- | :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Deposit**                   | Cash account (increase)                 | User wallet account (increase)                        | When a user deposits funds to their account, we capture the increase in cash and corresponding increase in the user balance. |
| **In-App Transfer**           | Sender's user wallet account (decrease) | Recipient's user wallet account (increase)            | A transfer from user A to user B will reduce the sender's balance and increase the recipient's.                              |
| **Withdrawal**                | User wallet account (decrease)          | Cash account (decrease); Revenue from fees (increase) | This is the inverse flow to a deposit, with the exception that 2% of the withdrawal would be captured as Revenue.            |

Your application code will write transactions to the **Ledger** when users take any of the actions above. Our team can help you structure your Ledger Transaction logic to meet your product and financial reporting requirements, and optimize app performance.

# Step 2. Create Your Ledger and Ledger Accounts

Before we can post any **Ledger Transactions**, we’ll need to instantiate our Ledger.

Create a Ledger using the [Create Ledger endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger) (`POST /ledgers`).

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledgers \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "SendCash Ledger",
    "description": "Represents our USD funds and User Balances"
  }'
```

Modern Treasury will return a **Ledger** object with a UUID to be used in subsequent steps.

```shell
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "SendCash Ledger",
    "description": "Represents our USD funds and User Balances",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:48:05Z",
    "updated_at": "2020-08-04T16:48:05Z"
}
```

Next, create the four **Ledger Accounts** required for our initial **Ledger Transactions** using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account#/) (`POST /ledger_accounts`).

<Callout icon="💡" theme="default">
  **Note**: Our bank account balance is `normal_balance = debit` because it represents a cash balance that we hold, whereas the user wallet accounts are `normal_balance = credit` because they represent balances that we owe to our users.
</Callout>

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Cash Account",
    "description": "Tracks our cash",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Jane Doe Wallet",
    "description": "Tracks balance held on behalf of Jane Doe",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe Wallet",
    "description": "Tracks balance held on behalf of John Doe",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Revenue",
    "description": "Tracks Revenue earned from fees",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the four **Ledger Accounts** you've created. Each has their own UUID that we can use in our **Ledger Transactions**.

```shell
{
    "id": "<cash_account_id>",
    "object": "ledger_account",
    "name": "Cash Account",
    "ledger_id": "<ledger_id>",
    "description": "Tracks our cash",
    "normal_balance": "debit",
    "currency": "USD",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<jane_wallet_account_id>",
    "object": "ledger_account",
    "name": "Jane Doe Wallet",
    "ledger_id": "<ledger_id>",
    "description": "Tracks balance held on behalf of Jane Doe",
    "normal_balance": "credit",
    "currency": "USD",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<john_wallet_account_id>",
    "object": "ledger_account",
    "name": "John Doe Wallet",
    "ledger_id": "<ledger_id>",
    "description": "Tracks balance held on behalf of John Doe",
    "normal_balance": "credit",
    "currency": "USD",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<revenue_account_id>",
    "object": "ledger_account",
    "name": "Revenue",
    "ledger_id": "<ledger_id>",
    "description": "Tracks Revenue earned from fees",
    "normal_balance": "credit",
    "currency": "USD",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}
```

# Step 3. Record Ledger Transactions

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, let’s write to the **Ledger** to record some user actions.

First, create a **Ledger Transaction** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`) to record that Jane Doe has deposited $100 in her user wallet account. This records that $100 has entered our bank account (asset), and that we’re now holding $100 on behalf of Jane Doe (liability).

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe cash deposit",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<cash_deposit_id>",
    "ledger_entries": [
      {
        "amount": 10000,
        "direction": "debit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 10000,
        "direction": "credit",
        "ledger_account_id": "<jane_wallet_account_id>"
      }
    ]
  }'
```

Next, Jane uses our app to send $50 to John Doe's wallet. No cash transfer has to occur: we simply record that a portion of the cash we’re holding is now owed to a different user.

Create the following **Ledger Transaction** to record this transfer of funds between Jane and John’s user wallet accounts, with 2% of the transaction, or $1, earned as revenue.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe wallet transfer to John Doe",
    "effective_at": "2020-08-29",
    "status": "posted",
    "external_id": "<wallet_transfer_id>",
    "ledger_entries": [
      {
        "amount": 4900,
        "direction": "credit",
        "ledger_account_id": "<john_wallet_account_id>"
      },
      {
        "amount": 5000,
        "direction": "debit",
        "ledger_account_id": "<jane_wallet_account_id>"
      },
      {
        "amount": 100,
        "direction": "credit",
        "ledger_account_id": "<revenue_account_id>"
      }
    ]
  }'
```

Finally, John Doe withdraws $49 from his wallet. Create a **Ledger Transaction** recording that $49 has left our bank account, and that $49 is no longer held on behalf of John.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "John Doe cash withdrawal",
    "effective_at": "2020-08-30",
    "status": "posted",
    "external_id": "<john_withdrawal_id>",
    "ledger_entries": [
      {
        "amount": 4900,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 4900,
        "direction": "debit",
        "ledger_account_id": "<john_wallet_account_id>"
      }
    ]
  }'

```

<Callout icon="💡" theme="default">
  **Note**: At the end of this set of Ledger Transactions, we still have an additional $1 in our bank account representing the revenue we have earned from fees.
</Callout>

# Step 4. Read Ledger Account Balances

**Modern Treasury’s Ledger** serves as your consistent source of truth for your user transactions and balances at scale. For example, you'll query the **Ledger** for a user's wallet balance in order to display it in their app experience when they log in.

When Jane wants to see her wallet balance, your app can query the Ledgers API, using just the UUID for Jane’s user wallet account.

To test this, run [Get Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/get-ledger-transaction)  on Jane’s wallet Ledger Account id (`GET /ledger_accounts/{jane_wallet_account_id}`.

```shell
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
   --url https://app.moderntreasury.com/api/ledger_accounts/61574fb6-7e8e-403e-980c-ff23e9fbd61b
```

This will return Jane's live wallet balance, which you can display in your app.

```shell
{
  "id":"61574fb6-7e8e-403e-980c-ff23e9fbd61b",
  "object":"ledger_account",
  "live_mode":true,
  "name":"Jane Doe Wallet",
  "ledger_id": "<jane_wallet_account_id>",
  "description": "Tracks balance held on behalf of Jane Doe",
  "lock_version":2,
  "normal_balance":"credit",
  "balances":{
    "pending_balance":{
      "credits":10000
      "debits":5000
      "amount":5000
      "currency":"USD",
      "currency_exponent":2
    },
    "posted_balance":{
      "credits":10000
      "debits":5000
      "amount":5000
      "currency":"USD",
      "currency_exponent":2
      },
    "available_balance":{
      "credits":10000
      "debits":5000
      "amount":5000
      "currency":"USD",
      "currency_exponent":2
    }
  },
  "metadata":{},
  "discarded_at":NULL,
  "created_at": "2020-08-04T16:54:32Z",
  "updated_at": "2020-08-04T17:23:12Z"
}

```

<br />

# Next Steps: Advanced Topics

Up to this point, we’ve covered the basics of creating **Ledger Accounts** and **Ledger Transactions** to record user actions in the Ledger, but we’re just scratching the surface of what it takes to build a Production-ready application ledger.

Below are some more Advanced Topics you should explore as you build out your Ledger design

## Attaching Metadata

**Modern Treasury Ledgers** supports attaching free-form metadata to most objects, in the form of key-value pairs. We’ve seen our digital wallet customers attach some of the following metadata tags:

| Object             | Metadata                            |
| ------------------ | ----------------------------------- |
| Ledger             | `productID`                         |
| Ledger Account     | `walletID`; `userId`; `accountType` |
| Ledger Transaction | `transactionType`                   |

**Modern Treasury Ledgers** supports querying based on metadata. By using the [List Ledger Transactions endpoint](https://docs.moderntreasury.com/reference/list-ledger-transactions) to query all transactions associated with User Wallet #31512, for instance, the system will return all the transactions that modified this account in the requested time period.

## Defining Ledger Account Categories

Oftentimes, we need to retrieve a real-time balance that is the sum of all **Ledger Accounts** of a particular type.

For example, we’ll often want to review the sum of all User Balance Accounts to compare against a Bank Account balance, ensuring that all the funds in that Bank Account are properly accounted for.

Use cases like these are why we built [Ledger Account Categories](https://docs.moderntreasury.com/ledgers/docs/ledger-account-categories-overview). This enables you to easily “roll up” balances that comprise many Ledger Accounts, providing real-time access to aggregate balances to meet any UI or reporting needs.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Ledger Account Category
      </th>

      <th>
        Normality
      </th>

      <th>
        Description
      </th>

      <th>
        Contains the following Ledger Accounts
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Total User Balance**
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Sums all Ledger account balances across all user digital wallets. Balance represents total money SendCash is holding on behalf of users.
      </td>

      <td>
        * User #1241241 Balance
      </td>
    </tr>

    <tr>
      <td>
        **Total Expenses**
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Sums fees paid and amount payable to vendors. Balance represents total expenses SendCash is liable for.
      </td>

      <td>
        * Credit card fees paid
        * Payable to Vendor X
      </td>
    </tr>

    <tr>
      <td>
        **Total Revenue**
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Sums deposit and transfer fees across all SendCash transactions. Balance represents total SendCash revenue.
      </td>

      <td>
        * Revenue from deposit fees
        * Revenue from transfer fees
      </td>
    </tr>

    <tr>
      <td>
        **Total Operating Cash**
      </td>

      <td>
        Debit Normal
      </td>

      <td>
        Sums amount in operating cash accounts used for SendCash business.
      </td>

      <td>
        * SendCash Operating Cash Account
      </td>
    </tr>
  </tbody>
</Table>

<br />

## Balance Locking

You can make each Ledger Transaction **conditional** on the current balance of the Ledger Account.

You can include balance filters with a Ledger Entry to validate the corresponding Ledger Account's balance when creating or updating a transaction. If the transaction would push the account balance outside the specified range, the request will fail with a 422 error.

Available balance filter types include `pending_balance_amount`, `posted_balance_amount`, and `available_balance_amount`. You can filter balances using the operators `gt` (>), `gte` (>=), `eq` (=), `lte` (\<=), and `lt` (\<).

If Jane wants to send $50 to John (like described in the previous section), but only if Jane stays ≥ $0 `available_balance` on her Ledger Account, the `POST /ledger_transactions` call would read as follows:

```shell

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe wallet transfer to John Doe",
    "effective_at": "2020-08-29",
    "status": "posted",
    "external_id": "<wallet_transfer_id>",
    "ledger_entries": [
      {
        "amount": 5000,
        "direction": "credit",
        "ledger_account_id": "<john_wallet_account_id>",
      },
      {
        "amount": 5000,
        "direction": "debit",
        "ledger_account_id": "<jane_wallet_account_id>",
	      "available_balance_amount": {"gte": 0}
      },
      ,
      {
        "amount": 100,
        "direction": "credit",
        "ledger_account_id": "<revenue_account_id>"
      }
    ]
  }'

```

# Learn More: Designing Your Chart of Accounts

Ledgers enforces double-entry accounting concepts, to ensure scalable consistency. If you are not familiar with debits and credits, start with our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits). We also recommend reviewing our [guide to Ledgers Objects](https://docs.moderntreasury.com/docs/guide-to-ledger-objects), as it explains Ledger Accounts, Transactions, and Categories in detail.

Balances are tracked in the Ledger by way of Ledger Accounts. Implementing a digital wallet often requires the following sets of accounts:

* **User Balance Accounts:**
  * Balances held on behalf of particular users, available for sending or withdrawal;
  * Surfaced to users in UI, used to validate user transactions
* **Cash Accounts:**
  * Cash balances associated with your digital wallet product;
  * Used for financial reporting and bank account reconciliation
* **Expense Accounts:**
  * Track fees incurred in the operation of digital wallet product;
  * Used for financial reporting as well
* **Revenue Accounts:**
  * Track revenue streams captured by your digital wallet product

## User Balance Accounts

User Balance Accounts are **credit normal** accounts that track user balances. These are credit normal accounts because they represent funds your platform **owes to other parties** - or sources of funds. (For more, read our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits)).

Your platform needs one Ledger Account per user. New accounts can be created using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/reference/create-ledger-account). Ledger Accounts (like all Modern Treasury objects) can be enriched with free-form metadata. Here is a sample User Balance Account:

<Table align={["left","left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Account Name**
      </th>

      <th>
        **Normality**
      </th>

      <th>
        **Represents**
      </th>

      <th>
        **Increased By (Credits)**
      </th>

      <th>
        **Decreased By (Debits)**
      </th>

      <th>
        **Sample Metadata**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        User #1241241 Balance
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Balance for user John Doe.
      </td>

      <td>
        User deposits or credits.
      </td>

      <td>
        User withdrawals, fees.
      </td>

      <td>
        `accountType: "User Balance",  
                                                                                                                                                                                                        userFirstName: "John",  
                                                                                                                                                                                                        userLastName: "Doe",  
                                                                                                                                                                                                        userState: "NY",  
                                                                                                                                                                                                        userActive: yes`
      </td>
    </tr>

    <tr>
      <td>
        User #1241242 Balance
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Balance for user Jane Doe.
      </td>

      <td>
        User deposits or credits.
      </td>

      <td>
        User withdrawals, fees.
      </td>

      <td>
        `accountType: "User Balance",  
                                                                                                                                                                                                        userFirstName: "Jane",  
                                                                                                                                                                                                        userLastName: "Doe",  
                                                                                                                                                                                                        userState: "NY",  
                                                                                                                                                                                                        userActive: yes`
      </td>
    </tr>
  </tbody>
</Table>

## Cash Accounts

Cash Accounts track different cash positions associated with the digital wallet app. They are **debit normal** given they represent funds your platform **owns**.

There are many different cash positions you might want to track in your digital wallet app:

* Reserve funds that hold cash available for user withdrawals
* Operating bank accounts holding pools of funds you direct income to and deduct expenses from
* Any other cash pools tied to operational or regulatory requirements

Here is a sample Cash Account:

| Account Name                    | Normality    | Represents                            | Increased By (Debits)    | Decreased By (Credits)    | Sample Metadata                             |
| ------------------------------- | ------------ | ------------------------------------- | ------------------------ | ------------------------- | ------------------------------------------- |
| SendCash Operating Cash Account | Debit Normal | Overall cash position of SendCash app | Cash inflows of any kind | Cash outflows of any kind | `accountType: "Cash Omnibus",  active: yes` |

## Expense Accounts

Expense Accounts track expenses incurred in the regular operation of the digital wallet app. These can be **debit normal** when they represent expenses **paid** (as they reflect money outflows in a regular course of business) and **credit normal** when they represent expenses **due** (as they reflect payables).

A few types of expense accounts include:

* Card fees incurred in the event of an account deposit or withdrawal
* Any taxes or fees to third parties paid on balances or transfers in the platform
* Banking fees associated with specific transactions

Here are two sample Expense Accounts:

<Table align={["left","left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Account Name**
      </th>

      <th>
        **Normality**
      </th>

      <th>
        **Represents**
      </th>

      <th>
        **Increased By (Debits)**
      </th>

      <th>
        **Decreased By (Credits)**
      </th>

      <th>
        **Sample Metadata**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Credit card fees paid
      </td>

      <td>
        Debit Normal
      </td>

      <td>
        Total paid in credit card fees
      </td>

      <td>
        New credit card fees paid
      </td>

      <td>
        Typically not decreased except in the event of an adjusting entry
      </td>

      <td>
        `accountType: "expense"`
      </td>
    </tr>

    <tr>
      <td>
        Payable to Vendor X
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Balance due to Vendor X
      </td>

      <td>
        New amounts are recorded as due to Vendor X
      </td>

      <td>
        Payouts (i.e. settlement of Payable)
      </td>

      <td>
        `accountType: "expense",  
                                                                                                                                                                                                        vendor: "X"`
      </td>
    </tr>
  </tbody>
</Table>

## Revenue Accounts

Revenue Accounts track money inflows categorized as Revenue by your digital wallet app. They are always **credit normal** accounts.

Different Revenue Accounts can be created to differentiate between revenue streams.

Here are two sample Revenue Accounts:

<Table align={["left","left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Account Name**
      </th>

      <th>
        **Normality**
      </th>

      <th>
        **Represents**
      </th>

      <th>
        **Increased By (Credits)**
      </th>

      <th>
        **Decreased By (Debits)**
      </th>

      <th>
        **Sample Metadata**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Revenue from deposit fees
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Revenue incurred when users deposit funds in the app
      </td>

      <td>
        Deposits
      </td>

      <td>
        Typically ledger adjustments (e.g. refund or cancellation)
      </td>

      <td>
        `accountType: "revenue",  
                                                                                                                                                                                                        revenueStream: "deposit_fees"`
      </td>
    </tr>

    <tr>
      <td>
        Revenue from transfer fees
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Revenue incurred when users transfer funds from each other in the platform
      </td>

      <td>
        User to user transfers
      </td>

      <td>
        Typically ledger adjustments (e.g. transfer cancellation)
      </td>

      <td>
        `accountType: "revenue",  
                                                                                                                                                                                                        revenueStream: "transfer_fees"`
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="💡" theme="default">
  **Note**: In digital wallet or similar applications, you may instead charge usage or service fees separate from money movement, i.e. as an accruing invoice. In this case, as activity happens, you may accrue an outstanding invoice amount against two alternate accounts:

  * User Receivable (debit normal): A receivable account tracking how much a user owes for fees. You can optionally create an account per invoice.
  * Revenue (credit normal): Total revenue earned from fees. You can optionally track this amount as unreceived or unearned revenue until the fee has been paid.
</Callout>
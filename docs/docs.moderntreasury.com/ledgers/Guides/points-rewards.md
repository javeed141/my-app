# Points & Rewards

Ledgers tutorial for tracking points or rewards. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial will explain how to use **Modern Treasury**’s [Ledgers API](https://www.notion.so/platform/reference/ledger-object)  to power an application that keeps track of user “points” and rewards redemptions. We’ll design a Ledger for a platform called **Rewardly** that lets users earn points when they browse online from their home computer. Those users can also spend their earned points on purchases made on the Rewardly app.

In this guide, we’ll walk through design to implementation of your ledger

* Defining the most common transactions Rewardly needs to record to the Ledger
* Creating the **Ledger** and **Ledger Accounts** required to support this use case
* Posting **Ledger Transactions** to change our LA balances, in response to user actions
* Future steps needed to get to a Production-ready application ledger

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src=" https://coast.moderntreasury.com/share/68bf5d05c12148956b870580?mode=link&layoutType=web&zoomLevel=0.8&step=0" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

# Step 1. Defining Account and Transaction Logic

Before we implement our ledger, we need to design our **accounts** and **transactions**.

**Ledger Accounts** represent the most specific balances that we need to track. Our user rewards application requires that we track each end-user’s points, the total cash balance in Rewardly’s bank account, and liabilities owed to the in-app store vendor. We’ll also have ledger accounts which facilitate points redemptions

| **Ledger Account Name**     | Currency | **Normality** | Purpose                                                                                            |
| --------------------------- | -------- | ------------- | -------------------------------------------------------------------------------------------------- |
| **Rewardly Cash**           | USD      | Debit         | Tracks total funds held in our custodian bank account.                                             |
| **User Points Balance(s)**  | Points   | Credit        | Tracks rewards points held by a user                                                               |
| **Total Points**            | Points   | Debit         | Tracks the total number of points credited to end users                                            |
| **Redeemed Points Expense** | USD      | Debit         | Tracks the dollar value of points redeemed by users.                                               |
| **IAP Vendor Payable**      | USD      | Credit        | Track funds owed to Giftbit (In-App rewards partner)when a user spends their rewards in the store. |

**Ledger Transactions** represent the events that happen in our funds flow - what actions will users take in Rewardly’s application, and how will they change our account balances above? The table below shows the most common user actions supported by digital rewards apps and how they should be recorded to the **Ledger**.

<Callout icon="💡" theme="default">
  **Note**: For a refresher on account normality and how debits and credits work, review our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits). For more on how to design your chart of accounts, see the [Appendix](Rewards%20and%20Points%20Use%20Case%20Ledgers%20Guide%20253d6bfc2683803d98efcf8f8954614e.md).
</Callout>

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Sample Ledger Transaction**
      </th>

      <th>
        **Debited Accounts**
      </th>

      <th>
        **Credited Accounts**
      </th>

      <th>
        **Notes**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **User earns rewards**
      </td>

      <td>
        Total Points (increase)
      </td>

      <td>
        User Rewards Balance (increase)
      </td>

      <td>
        When a user earns rewards from a browser session, credit funds to their account.
      </td>
    </tr>

    <tr>
      <td>
        **In-App Purchase**
      </td>

      <td>
        User Points Balance (decrease)

        Redeemed Points Expense
        (increase)
      </td>

      <td>
        Total Points
        (decrease)

        Giftbit Payable
        (increase)
      </td>

      <td>
        Deduct funds from the user account and record the new liability to Giftbit
      </td>
    </tr>

    <tr>
      <td>
        **Giftbit Payment**
      </td>

      <td>
        Giftbit Payable (decrease)
      </td>

      <td>
        Cash (decrease)
      </td>

      <td>
        Deduct funds from the Cash Balance to reflect the payment to Giftbit. We can use a similar pattern if using a payment processor instead.
      </td>
    </tr>

    <tr>
      <td>
        **Withdrawal**
      </td>

      <td>
        User Points Balance (decrease)

        Redeemed Points Expense
        (increase)
      </td>

      <td>
        Total Points
        (decrease)

        Cash Account
        (decrease)
      </td>

      <td />
    </tr>
  </tbody>
</Table>

Your application code will write transactions to the **Ledger** when users take any of the actions above. Our team can help you structure your Ledger Transaction logic to meet your product and financial reporting requirements, and optimize app performance.

# Step 2. Create Your Ledger and Ledger Accounts

Before we can post any **Ledger Transactions**, we’ll need to instantiate our Ledger.

Create a Ledger using the [Create Ledger endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger)  (`POST /ledgers`).

**Note:** Both the User Points and the Total Points ledger accounts will *not* be denominated in USD, but rather by a custom currency like `Rewardly-Points`. This ensures that an errant transaction will not mix points balances and USD balances.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledgers \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Rewardly Ledger",
    "description": "Represents USD funds and User Points Balances",
  }'
```

Modern Treasury will return a **Ledger** object with a UUID to be used in subsequent steps.

```json
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "Rewardly Ledger",
    "description": "Represents USD funds and User Points Balances",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:48:05Z",
    "updated_at": "2020-08-04T16:48:05Z"
}

```

Next, create the four **Ledger Accounts** required for our initial **Ledger Transactions** using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account)  (`POST /ledger_accounts`).

<Callout icon="💡" theme="default">
  **Note:** Both the User Points and the Total Points ledger accounts will *not* be denominated in USD, but rather by a custom currency like `Rewardly-Points`. This ensures that an errant transaction will not mix points balances and USD balances.
</Callout>

```curl
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
    "name": "Jane Doe Rewards Points",
    "description": "Tracks points held by Jane Doe",
    "normal_balance": "credit",
    "currency": "Points",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Total Points",
    "description": "Tracks total points distributed to users",
    "normal_balance": "debit",
    "currency": "Points",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Giftbit Payable",
    "description": "Tracks liabilities for purchases made in the Rewardly store",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
  
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Redeemed Points Expense",
    "description": "Tracks the dollar value of points redeemed by users",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the **Ledger Accounts** you've created. Each has their own UUID that we can use in our **Ledger Transactions**.

```json
{
	"id": "<cash_account_id>",
	"object": "ledger_account",
	"name": "Cash Account",
	"description": "Tracks our cash",
	"ledger_id": "<ledger_id>",
	"normal_balance": "debit",
	"live_mode": true,
	"lock_version": 0,
	"balances": {<balance_array>},
	"ledgerable_type": null,
	"ledgerable_id": null,
	"external_id": null,
	"metadata": {},
	"created_at": "2025-08-04T23:39:08Z",
	"updated_at": "2025-08-04T23:39:08Z"
}

{
	"id": "<jane_doe_rewards_id>",
	"object": "ledger_account",
	"name": "Jane Doe Rewards",
	"description": "Tracks points held by Jane Doe",
	"ledger_id": "<ledger_id>",
	"normal_balance": "credit",
	"live_mode": true,
	"lock_version": 0,
	"balances": {<balance_array>},
	"ledgerable_type": null,
	"ledgerable_id": null,
	"external_id": null,
	"metadata": {},
	"created_at": "2025-08-04T23:39:08Z",
	"updated_at": "2025-08-04T23:39:08Z"
}

{
	"id": "<total_points_id>",
	"object": "ledger_account",
	"name": "Total Points",
	"description": "Tracks total points distributed to users",
	"ledger_id": "<ledger_id>",
	"normal_balance": "debit",
	"live_mode": true,
	"lock_version": 0,
	"balances": {<balance_array>},
	"ledgerable_type": null,
	"ledgerable_id": null,
	"external_id": null,
	"metadata": {},
	"created_at": "2025-08-04T23:39:08Z",
	"updated_at": "2025-08-04T23:39:08Z"
}

{
	"id": "<giftbit_payable_id>",
	"object": "ledger_account",
	"name": "Giftbit Payable",
	"description": "Tracks liabilities for purchases made in the Rewardly store",
	"ledger_id": "<ledger_id>",
	"normal_balance": "credit",
	"live_mode": true,
	"lock_version": 0,
	"balances": {<balance_array>},
	"ledgerable_type": null,
	"ledgerable_id": null,
	"external_id": null,
	"metadata": {},
	"created_at": "2025-08-04T23:39:08Z",
	"updated_at": "2025-08-04T23:39:08Z"
}

{
	"id": "<redeemed_points_expense_id>",
	"object": "ledger_account",
	"name": "Redeemed Points Expense",
	"description": "Tracks the dollar value of points redeemed by users",
	"ledger_id": "<ledger_id>",
	"normal_balance": "debit",
	"live_mode": true,
	"lock_version": 0,
	"balances": {<balance_array>},
	"ledgerable_type": null,
	"ledgerable_id": null,
	"external_id": null,
	"metadata": {},
	"created_at": "2025-08-04T23:39:08Z",
	"updated_at": "2025-08-04T23:39:08Z"
}
```

# Step 3. Record Ledger Transactions

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, we can write to the **Ledger** to record some user actions.

First,  create a **Ledger Transaction** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction)  (`POST /ledger_transactions`) to record that Jane Doe has earned 2000 points from her latest browsing session.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe points earned",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<cash_deposit_id>",
    "ledger_entries": [
      {
        "amount": 2000,
        "direction": "debit",
        "ledger_account_id": "<total_points_id>"
      },
      {
        "amount": 2000,
        "direction": "credit",
        "ledger_account_id": "<jane_doe_rewards_id>"
      }
    ]
  }'
```

Next, Jane spends 1000 points on a purchase inside the Rewardly app. The purchase creates a liability that Rewardly will have to fulfill with the store vendor, Giftbit. Note here that 1000 points are equivalent to $5.00, a determination that Rewardly is making based on it’s own business logic.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe In-App-Purchase",
    "effective_at": "2020-08-29",
    "status": "posted",
    "external_id": "<points_purchase_id>",
    "ledger_entries": [
      {
        "amount": 1000,
        "direction": "debit",
        "ledger_account_id": "<jane_doe_rewards_id>"
      },
      {
        "amount": 1000,
        "direction": "credit",
        "ledger_account_id": "<total_points_id>"
      },
      {
        "amount": 500,
        "direction": "debit",
        "ledger_account_id": "<redeemed_points_expense_id>"
      },
      {
        "amount": 500,
        "direction": "credit",
        "ledger_account_id": "<giftbit_payable_id>"
      }
    ]
  }'
```

Next, Rewardly will fulfill the outstanding payable to Giftbit. The vendor expense will be funded from the Cash account.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe In-App-Purchase",
    "effective_at": "2020-08-30",
    "status": "posted",
    "external_id": "<vendor_payment_id>",
    "ledger_entries": [
      {
        "amount": 500,
        "direction": "debit",
        "ledger_account_id": "<giftbit_payable_id>"
      },
      {
        "amount": 500,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      }
    ]
  }'
```

Finally, Jane Doe will “cash out” her remaining points for $2 USD. We can create a **Ledger Transaction** recording both the points leaving her account, as well as the $2 USD leaving the cash account to pay Jane Doe. Note how the points are valued at a different USD rate when withdrawing directly vs. spending in the shop.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe cash withdrawal",
    "effective_at": "2020-08-31",
    "status": "posted",
    "external_id": "<jane_doe_withdrawal_id>",
    "ledger_entries": [
      {
        "amount": 1000,
        "direction": "credit",
        "ledger_account_id": "<total_points_id>"
      },
      {
        "amount": 1000,
        "direction": "debit",
        "ledger_account_id": "<jane_doe_rewards_id>"
      },
      {
        "amount": 200,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 200,
        "direction": "debit",
        "ledger_account_id": "<redeemed_points_expense_id>"
      }
    ]
  }'

```

# Step 4. Read Ledger Account Balances

**Modern Treasury’s Ledger** serves as your consistent source of truth for your user transactions and balances at scale. For example, you'll query the **Ledger** for a user's points balance in order to display it in their app experience when they log in.

When Jane wants to see her points balance, your app can query the Ledgers API using the [GET Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/get-ledger-transaction) , using just the UUID for Jane’s points account:

```curl
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
   --url https://app.moderntreasury.com/api/ledger_accounts/<jane_doe_rewards_id>
```

This will return Jane's live points balance, which you can display in your app.

```json
{
  "id":"jane_doe_rewards_id",
  "object":"ledger_account",
  "live_mode":true,
  "name":"Jane Doe Rewards Points",
  "ledger_id": "<jane_doe_rewards_id>",
  "description": "Tracks points held by Jane Doe",
  "lock_version":2,
  "normal_balance":"credit",
  "balances":{
    "pending_balance":{
      "credits":10000
      "debits":5000
      "amount":5000
      "currency":"Points",
      "currency_exponent":2
    },
    "posted_balance":{
      "credits":10000
      "debits":5000
      "amount":5000
      "currency":"Points",
      "currency_exponent":2
    }
  },
  "metadata":{},
  "discarded_at":NULL,
  "created_at": "2020-08-04T16:54:32Z",
  "updated_at": "2020-08-04T17:23:12Z"
}
```

# Next Steps: Advanced Topics

Up to this point, we’ve covered the basics of creating **Ledger Accounts** and **Ledger Transactions** to record user actions in the Ledger, but we’re just scratching the surface of what it takes to build a Production-ready application ledger.

Below are some more Advanced Topics you should explore as you build out your Ledger design

## Attaching Metadata

**Modern Treasury Ledgers** supports attaching free-form metadata to most objects, in the form of key-value pairs. We’ve seen rewards and points customers attach some of the following metadata tags:

| Object             | Metadata                |
| ------------------ | ----------------------- |
| Ledger             | `productID`             |
| Ledger Account     | `userId`; `accountType` |
| Ledger Transaction | `transactionType`       |

**Modern Treasury Ledgers** supports querying based on metadata. By using the [List Ledger Transactions](https://docs.moderntreasury.com/reference/list-ledger-transactions) endpoint to query all transactions associated with User Points #31512, for instance, the system will return all the transactions that modified this account in the requested time period.

## Defining Ledger Account Categories

Oftentimes, we need to retrieve a real-time balance that is the sum of all **Ledger Accounts** of a particular type.

For example, we’ll often want to review the sum of all User Balance Accounts, maybe attributed to a specific sub-section of your product.

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
        Contains
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Total User Points Balance**
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Sums all Ledger Account balances across all user points accounts. Balance represents the total amount of points Rewardly has distributed to users.
      </td>

      <td>
        User #1241242 Points
        User #1241243 Points
      </td>
    </tr>

    <tr>
      <td>
        **Total Vendor Payable**
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        When more than one vendor or payment processor is in scope, this category will allow you to retrieve the total payable
      </td>

      <td>
        All distinct vendor/processor payables
      </td>
    </tr>

    <tr>
      <td>
        **Total Cash**
      </td>

      <td>
        Debit Normal
      </td>

      <td>
        Sums amount in operating cash accounts used for SendCash business.
      </td>

      <td>
        All cash ledger accounts
      </td>
    </tr>
  </tbody>
</Table>

## Balance Locking

You can make each Ledger Transaction **conditional** on the current balance of the Ledger Account.

You can include balance filters with a Ledger Entry to validate the corresponding Ledger Account's balance when creating or updating a transaction. If the transaction would push the account balance outside the specified range, the request will fail with a 422 error.

Available balance filter types include `pending_balance_amount`, `posted_balance_amount`, and `available_balance_amount`. You can filter balances using the operators `gt` (>), `gte` (>=), `eq` (=), `lte` (\<=), and `lt` (\<).

If Jane wants to withdraw her 1000 points balance but we want to disallow overdrawing points, the POST / Ledger Transactions call would read as follows:

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane Doe cash withdrawal",
    "effective_at": "2020-08-31",
    "status": "posted",
    "external_id": "<jane_withdrawal_id>",
    "ledger_entries": [
      {
        "amount": 1000,
        "direction": "credit",
        "ledger_account_id": "<total_points_id>"
      },
      {
        "amount": 1000,
        "direction": "debit",
        "ledger_account_id": "<jane_doe_rewards_id>",
        "posted_balance_amount": {"gte": 0}
      },
      {
        "amount": 200,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 200,
        "direction": "debit",
        "ledger_account_id": "<redeemed_points_expense_id>"
      }
    ]
  }'
```
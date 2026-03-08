# FX Wallets

Ledger tutorial for cross-currency digital wallets. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial explains how to use Modern Treasury’s Ledgers API to build an **FX Wallet product**. We will design a Ledger for a platform called **FXfer** that records user deposits and cross-currency wallet-to-wallet transfers.

In this guide, we will cover:

* Defining the most common [multi-currency](https://docs.moderntreasury.com/ledgers/docs/use-multiple-currencies) **Ledger Transactions** FXfer needs to record to the Ledger
* Creating the **Ledger** and **Ledger Accounts** required to support this use case
* Posting **Ledger Transactions** to change our LA balances, in response to user actions

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68f0ff2d332ab26710589ceb?mode=link&layoutType=web&zoomLevel=0.8&step=0" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

<br />

# Step 1. Defining Account and Transaction Logic

Before we implement our ledger, we need to design our **accounts** and **transactions**.

**Ledger Accounts** represent the most specific balances that we need to track. The FXfer application requires that we track each end-user’s wallet balance *in their native currencies*, as well as the total cash balance in our bank accounts.

Modern Treasury Ledger Accounts record transactions and balances in a *single* currency, defined at account creation. For the purposes of this example, FXfer's accounts will support USD and EUR.

| **Ledger Account Name**  | Currency | **Normality** | Purpose                                                                      |
| ------------------------ | -------- | ------------- | ---------------------------------------------------------------------------- |
| **FXfer Cash Asset-USD** | USD      | Debit         | Tracks total funds held in our USD custodian bank account.                   |
| **FXfer Cash Asset-EUR** | EUR      | Debit         | Tracks total funds held in our EUR custodian bank account.                   |
| **User Wallet(s)-USD**   | USD      | Credit        | Tracks USD funds a specific user has available. One Ledger Account per user. |
| **User Wallet(s)-EUR**   | EUR      | Credit        | Tracks EUR funds a specific user has available. One Ledger Account per user. |

<br />

**Ledger Transactions** represent the events that happen in our funds flow - what actions need to occur in FXfer’s platform, and how do they change our account balances above? The table below shows how the most common user actions for this use case should be recorded to the **Ledger**.

<Callout icon="💡" theme="default">
  **Note**: For a refresher on account normality and how debits and credits work, review our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits).
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
        **User Deposit-USD**
      </td>

      <td>
        Cash Asset-USD (increase)
      </td>

      <td>
        User wallet-USD (increase)
      </td>

      <td>
        When a user deposits funds to their account, we capture the increase in Cash and corresponding increase in the user wallet balance.
      </td>
    </tr>

    <tr>
      <td>
        **In-App Cross Currency Transfer (USD → EUR)**
      </td>

      <td>
        Sender's User Wallet-USD (decrease)

        Cash Asset-EUR (increase)
      </td>

      <td>
        Recipient's User Wallet-EUR (increase)

        Cash Asset-USD (decrease)
      </td>

      <td>
        A transfer of USD to EUR from user A to user B will reduce the sender's balance in USD and increase the recipient's in EUR. To maintain double-entry principles, the corresponding Cash Asset accounts will need to be updated as well.
      </td>
    </tr>

    <tr>
      <td>
        **User Withdrawal-EUR**
      </td>

      <td>
        User wallet-EUR (decrease)
      </td>

      <td>
        Cash Asset-EUR (decrease)
      </td>

      <td>
        When a user withdraws funds from their alternate currency account, we capture the decrease in Cash and corresponding decrease in the user wallet balance.
      </td>
    </tr>
  </tbody>
</Table>

<br />

Your application code will write transactions to the **Ledger** when users take any of the actions above. Our team can help you structure your Ledger Transaction logic to meet your product and financial reporting requirements, and optimize app performance.

# Step 2. Create Your Ledger and Ledger Accounts

Before we can post any **Ledger Transactions**, we’ll need to instantiate our Ledger.

Create a Ledger using the [Create Ledger endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger) (`POST /ledgers`).

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledgers \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "FXfer Ledger",
    "description": "Represents our multi-currency funds and User Balances"
  }'
```

Modern Treasury will return a **Ledger** object with a UUID to be used in subsequent steps.

```json
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "FXfer Ledger",
    "description": "Represents our multi-currency funds and User Balances",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2025-08-04T16:48:05Z",
    "updated_at": "2025-08-04T16:48:05Z"
}
```

Next, create the four **Ledger Accounts** required for our initial **Ledger Transactions** using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account) (`POST /ledger_accounts`).

<Callout icon="💡" theme="default">
  **Note:** Our bank account balance is `normal_balance = debit` because it represents a cash balance that we hold, whereas the user wallet accounts are `normal_balance = credit` because they represent balances that we owe to our users.
</Callout>

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Cash Asset-USD",
    "description": "Tracks our USD cash",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Cash Asset-EUR",
    "description": "Tracks our EUR cash",
    "normal_balance": "debit",
    "currency": "EUR",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Wallet-USD",
    "description": "Tracks USD balance held on behalf of John",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Jane Wallet-EUR",
    "description": "Tracks EUR balance held on behalf of Jane",
    "normal_balance": "credit",
    "currency": "EUR",
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the four **Ledger Accounts** you've created. Each has their own UUID that we can use in our **Ledger Transactions**.

```json
{
    "id": "<cash_account_usd_id>",
    "object": "ledger_account",
    "name": "Cash Asset-USD",
    "ledger_id": "<ledger_id>",
    "description": "Tracks our USD cash",
    "normal_balance": "debit",
    "currency": "USD",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "balances": {<balance_array>},
    "created_at": "2025-08-04T16:54:32Z",
    "updated_at": "2025-08-04T16:54:32Z"
}

{
    "id": "<cash_account_eur_id>",
    "object": "ledger_account",
    "name": "Cash Asset-EUR",
    "ledger_id": "<ledger_id>",
    "description": "Tracks our EUR cash",
    "normal_balance": "debit",
    "currency": "EUR",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "balances": {<balance_array>},
    "created_at": "2025-08-04T16:54:32Z",
    "updated_at": "2025-08-04T16:54:32Z"
}
{
    "id": "<john_wallet_account_id>",
    "object": "ledger_account",
    "name": "John Wallet-USD",
    "description": "Tracks USD balance held on behalf of John",
    "ledger_id": "<ledger_id>",
    "normal_balance": "credit",
    "currency": "USD",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "balances": {<balance_array>},
    "created_at": "2025-08-04T16:54:32Z",
    "updated_at": "2025-08-04T16:54:32Z"
}

{
    "id": "<jane_wallet_account_id>",
    "object": "ledger_account",
    "name": "Jane Wallet-EUR",
    "ledger_id": "<ledger_id>",
    "description": "Tracks EUR balance held on behalf of Jane",
    "normal_balance": "credit",
    "currency": "EUR",
    "currency_exponent": 2,
    "active": true,
    "metadata": {},
    "live_mode": true,
    "balances": {<balance_array>},
    "created_at": "2025-08-04T16:54:32Z",
    "updated_at": "2025-08-04T16:54:32Z"
}

```

# Step 3. Record Ledger Transactions

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, let’s write to the **Ledger** to record some user actions.

First, create a **Ledger Transaction** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`) to record that John has deposited $5,000 in his user wallet account. This records that $5,000 has entered our USD bank account (asset), and that we’re now holding $5,000 on behalf of John (liability).

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "John cash deposit",
    "effective_at": "2025-08-27",
    "status": "posted",
    "external_id": "<cash_deposit_id>",
    "ledger_entries": [
      {
        "amount": 500000,
        "direction": "debit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 500000,
        "direction": "credit",
        "ledger_account_id": "<john_wallet_account_id>"
      }
    ]
  }'
```

Next, John uses **FXfer** to send $100 to Jane’s wallet *in EUR*. External to Modern Treasury, FXfer will be converting that $100 to its equivalent in EUR. Let’s assume, for the purposes of this example, FXfer exchanges the USD for EUR in the real world using a spot FX rate of 0.85, resulting in a conversion to €85.00.

Create the following **Ledger Transaction** to record this transfer of funds between John and Jane’s user wallet accounts, along with the transfer of funds between the corresponding Cash Assets.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "John USDEUR transfer to Jane",
    "effective_at": "2025-08-29",
    "status": "posted",
    "external_id": "<wallet_transfer_id>",
    "ledger_entries": [
      {
        "amount": 8500,
        "direction": "credit",
        "ledger_account_id": "<jane_wallet_account_id>"
      },
      {
        "amount": 8500,
        "direction": "debit",
        "ledger_account_id": "<cash_account_eur_id>"
      },
      {
        "amount": 10000,
        "direction": "debit",
        "ledger_account_id": "<john_wallet_account_id>"
      },
      {
        "amount": 10000,
        "direction": "credit",
        "ledger_account_id": "<cash_account_usd_id>"
      }      
    ],
    "metadata": {
      "effective_fx_rate" : "0.85"
    }
  }'
```

Finally, Jane withdraws €85.00 from her wallet. Create a **Ledger Transaction** recording that €85.00 has left FXfer’s EUR bank account, and that €85.00 is no longer held on behalf of Jane.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Jane cash withdrawal",
    "effective_at": "2025-08-30",
    "status": "posted",
    "external_id": "<jane_withdrawal_id>",
    "ledger_entries": [
      {
        "amount": 8500,
        "direction": "credit",
        "ledger_account_id": "<cash_account_eur_id>"
      },
      {
        "amount": 8500,
        "direction": "debit",
        "ledger_account_id": "<jane_wallet_account_id>"
      }
    ]
  }'

```
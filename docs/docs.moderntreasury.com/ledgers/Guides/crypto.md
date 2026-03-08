# Crypto

Ledger tutorial for a crypto-fiat wallet product. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial will explain how to use **Modern Treasury**’s [Ledgers API](https://www.notion.so/platform/reference/ledger-object) to track and power your crypto use cases. We will design a **Crypto Wallet service,** where users can deposit USD and exchange it for other crypto currencies such as SOL.

In this guide, we’ll walk through how to design and implement your ledger for a crypto wallet and exchange. Topics covered include:

* Creating the **Ledger** and **Ledger Accounts** required to support this use case
* Defining the most common **Ledger Transactions** to record to the Ledger for crypto use cases
* Important design considerations to crypto, such as FX Accounts, custom currencies and currency exponents
* Future steps needed to get to a Production-ready application ledger

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68f1005f332ab2671058e832?mode=link&layoutType=web&zoomLevel=0.8&step=0" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

# Step 1. Defining Account and Transaction Logic

Before implementing the ledger, we need to design our **accounts** and **transactions**.

**Ledger Accounts** represent the most specific balances that we need to track. In a crypto wallet use case, you will typically need to track:

* USD operations, including user wallets and supporting bank accounts
* Crypto operations, including user wallets and the platform's custodial crypto currencies
* Foreign exchange concepts, used to convert between currencies
* Revenue, which are fees generated when a user buys crypto currencies. In this example we will track revenue in USD

The balances should be tracked as the following ledger accounts:

| **Ledger Account Name**           | **Normality** | Purpose                                                                                      |
| --------------------------------- | ------------- | -------------------------------------------------------------------------------------------- |
| **USD Bank Balance**              | Debit         | Tracks your USD bank balance used to power the USD wallet                                    |
| **User USD Wallet**               | Credit        | Tracks user USD wallet/ USD deposit amount                                                   |
| **Platform SOL Custodial**        | Debit         | Tracks the amount of SOL you hold as a platform \[repeat for each supported crypto currency] |
| **User SOL Wallet**               | Credit        | Tracks the amount of SOL allocated to the user \[repeat for each user/ currency combination] |
| **FX Account - USD**              | Credit        | Used to exchange USD to/from another currency                                                |
| **FX Account - SOL**              | Credit        | Used to exchange SOL to/from another currency                                                |
| **Revenue**                       | Credit        | Track revenue streams captured by the card product.                                          |
| **Transaction Fee Expense - SOL** | Debit         | Track expenses accrued via transaction fees (gas fees)                                       |

### Custom Currencies in Ledgers

Ledger Accounts can only be defined with one currency. In a multi-currency use case, such as a crypto use case, the user wallet holding the crypto currency constitutes its own Ledger Account.

For Ledger Accounts that track crypto currencies, you will have to define a custom currency. A custom currency in the Ledger can be defined with a custom `currency` value and a `currency_exponent` value (the smallest unit of a currency). Lets take a look at our Solana example.

For Solana, the smallest unit is a Lamport. 1 Lamport is equal to 0.000000001 SOL or 1\*10^9 SOL. This means the currency exponent is 9.

When creating the Ledger Account, the `currency` value can be passed as SOL and `currency_exponent` as 9. When writing a Ledger Entry against the SOL account, an amount of 1000000000 will represent 1 SOL.

### **Ledger Transactions**

**Ledger Transactions** represent the events on your platform, your customer's actions that you need to track, and how they change the Ledger Account balances above.

In order to preserve double-entry integrity, we require equal credit and debits in each currency. As a result, cross currency transactions require an FX Account for each currency. FX Accounts involved are highlighted above.

The table below shows the common user actions in a crypto exchange platform and how they should be recorded to the **Ledger** via **Ledger Transactions.**

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
        **User USD Account Funding**
      </td>

      <td>
        USD Bank Balance(increase)
      </td>

      <td>
        User USD Wallet (increase)
      </td>

      <td>
        When a user deposits USD to their account, we capture the increase in cash and corresponding increase in the user USD wallet.
      </td>
    </tr>

    <tr>
      <td>
        **User Trades USD to SOL**
      </td>

      <td>
        User USD Wallet (decrease),

        FX SOL (decrease)
      </td>

      <td>
        FX USD (increase),

        User SOL Wallet (increase)
      </td>

      <td>
        When a user exchanges currencies, we will have to go through the FX accounts to maintain double entry accounting integrity. This example does not include fees
      </td>
    </tr>

    <tr>
      <td>
        **Platform buys SOL from USD reserve**
      </td>

      <td>
        SOL Custodial (increase),

        FX USD (decrease)
      </td>

      <td>
        USD Bank Balance (decrease),

        FX SOL (increase)
      </td>

      <td>
        This transaction represents moving funds from the platforms USD to SOL so that the platform holds a reserve to back the users wallet
      </td>
    </tr>
  </tbody>
</Table>

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
    "name": "Crypto Ledger",
    "description": "Ledger to Crypto Exchange "
  }'
```

Modern Treasury will return a **Ledger** object with a UUID to be used in subsequent steps.

```json
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "Crypto Ledger",
    "description": "Ledger to Crypto Exchange",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:48:05Z",
    "updated_at": "2020-08-04T16:48:05Z"
}
```

Next, create the required **Ledger Accounts,** outlined in section 1 using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account) (`POST /ledger_accounts`).

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Bank Account",
    "description": "Tracks Bank Account that holds USD for customer wallets",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Customer USD Wallet",
    "description": "Customer USD",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Customer SOL Wallet",
    "description": "Customer SOL",
    "normal_balance": "credit",
    "currency": "SOL",
    "currency": 9,
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Custodian SOL",
    "description": "Platform SOL holdings",
    "normal_balance": "debit",
    "currency": "SOL",
    "currency": 9,
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the four **Ledger Accounts** you've created. Each has their own UUID that we can use in our **Ledger Transactions**.

# Step 3. Record Ledger Transactions

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, we can write to the **Ledger** to record some user actions. Each card action by your customer can be used to write a Ledger Transaction to Modern Treasury Ledgers.

In this example, we will record a customer onboarding to the platform with $1000 and then exchanging USD for SOL. We will also record some gas fees and platform transaction fee.

On the ledger, create a **Ledger Transaction** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`) with the following Ledger Entries:

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "User Onboarding Transaction",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<External ID>",
    "ledger_entries": [
      {
        "amount": 100000,
        "direction": "debit",
        "ledger_account_id": "<usd_bank_account>"
      },
      {
        "amount": 100000,
        "direction": "credit",
        "ledger_account_id": "<user_usd_wallet>"
      },
    ]
  }'
```

This transaction will record a $1,000 deposited to your bank account, and $1,000 in your customer’s USD wallet

Next, we will simulate the customer exchanging the USD for SOL. Create a Ledger Transaction with the following requirements:

* An exchange rate of 200 USD : 1 SOL

* A platform fee for the trade of 5% taken in USD

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "User Pay In",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<External ID>",
    "ledger_entries": [
      {
        "amount": 100000,
        "direction": "debit",
        "ledger_account_id": "<user_usd_wallet>"
      },
      {
        "amount": 5000,
        "direction": "credit",
        "ledger_account_id": "<revenue>"
      },
       {
        "amount": 95000,
        "direction": "credit",
        "ledger_account_id": "<fx_usd>"
      },
       {
        "amount": 475000000,
        "direction": "debit",
        "ledger_account_id": "<fx_sol>"
      },
        {
        "amount": 475000000,
        "direction": "credit",
        "ledger_account_id": "<user_sol_wallet>"
      }  
    ]
  }'
```

This transaction represents $950 converted to 4.75 SOL and $50 taken in platform fees
The FX transaction allows the $950 USD to leave our ledger and 4.75 SOL to enter our ledger while respecting double entry accounting standards.

Lastly, we will model the transaction where you platform buys additional SOL to back the custodial crypto  holdings to support customer wallets. This transaction will include moving money out of your USD account to trade for SOL, as well as gas fees incurred in SOL.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Processor Settlement",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<External ID>",
    "ledger_entries": [
      {
        "amount": 100000,
        "direction": "credit",
        "ledger_account_id": "<usd_bank_account>"
      },
       {
        "amount": 100000,
        "direction": "debit",
        "ledger_account_id": "<fx_usd>"
      }, 
       {
        "amount": 5000000000,
        "direction": "credit",
        "ledger_account_id": "<fx_sol>"
      },
       {
        "amount": 4999500000,
        "direction": "debit",
        "ledger_account_id": "<sol_custodial>"
      },
       {
        "amount": 500000,
        "direction": "debit",
        "ledger_account_id": "<sol_gas_expense>"
      },
    ]
  }'
```

This transaction will show $1,000 leaving the bank account and 4.9995 SOL in your holdings, with 0.0005 SOL going towards gas fees tracked in an expense account.
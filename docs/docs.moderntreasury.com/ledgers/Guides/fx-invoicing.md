# FX Invoicing

Ledgers tutorial for a cross-currency invoicing use-case. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial will explain how to use **Modern Treasury**’s [Ledgers API](https://www.notion.so/platform/reference/ledger-object) to power a foreign exchange invoicing use case. We’ll design a Ledger for a platform called **FX Pay** that enables buyers to *pay* an invoice in one currency (e.g. USD) and sellers to *receive* funds in their native currency (e.g. EUR).

In this guide, we’ll walk through how to design and implement a ledger involving multi-currency fund movements. We will do so by:

* Defining the most common transactions FX Pay needs to record to the Ledger
* Creating the **Ledger** and **Ledger Accounts** required to support this use case
* Posting **Ledger Transactions** to change our LA balances, in response to user actions
* Future steps needed to get to a Production-ready application ledger

# &#x20;Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68f11015332ab267105d5eb9?mode=link&layoutType=web&zoomLevel=0.8&step=0" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

<br />

# Accounting for FX Gains and Losses at FX Pay

At FX Pay, the exchange rate can fluctuate between the time an invoice is *recorded* and when it is *settled*, leading to a foreign exchange gain or loss.

When an invoice payable is recorded in a foreign currency (e.g. EUR), it is recorded at the spot exchange rate on the transaction date. This creates an accounts receivable and payable in your ledger. If the exchange rate shifts before the payment is actually made or collected, the value of that receivable or payable in your functional currency changes.

When the cash finally settles and you convert to your functional currency, you revalue the transaction again at the settlement rate, and any additional difference between the original booking and settlement is realized as an FX gain or loss.

<Callout icon="💡" theme="default">
  Modern Treasury does not set or determine foreign exchange rates. When payments involve a currency conversion, the applicable FX rate is provided by the underlying financial institution or FX provider facilitating the transaction. It would be advisable to pass in an `effective_fx_rate` as `metadata` in your Ledger Transactions.
</Callout>

# Step 1. Defining Account and Transaction Logic

Before we implement our ledger, we need to design our **accounts** and **transactions**.

**Ledger Accounts** represent the most specific balances that we need to track. Our foreign exchange application requires that we track receivables, payables and the total cash balance in our bank account. In FX Pay’s use case, the Receivable will be tracked in a currency different from the Payable, which necessitates the creation of FX Conversion accounts per currency.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Ledger Account Name**
      </th>

      <th>
        **Normality**
      </th>

      <th>
        Currency
      </th>

      <th>
        Purpose
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **FX Pay Cash**
      </td>

      <td>
        Debit
      </td>

      <td>
        USD
      </td>

      <td>
        Tracks total funds held in our custodian bank account.
      </td>
    </tr>

    <tr>
      <td>
        **Buyer Receivable**
      </td>

      <td>
        Debit
      </td>

      <td>
        USD
      </td>

      <td>
        Tracks fund expected to be paid into the platform in base currency.
      </td>
    </tr>

    <tr>
      <td>
        **FX USD Drift**
      </td>

      <td>
        Credit
      </td>

      <td>
        USD
      </td>

      <td>
        FX Conversion account that serves as a contra-account to the Buyer Receivable.

        This tracks balances such as the amount *anticipated* to be exchanged in USD (as per the FX rate at the time the invoice is recorded), and the amount that is *actually* exchanged when the invoice is paid out.

        Note that the USD value may fluctuate based on the change in FX rate. Gains would be reflected as a positive balance, whereas losses would be negative.
      </td>
    </tr>

    <tr>
      <td>
        **Seller Payable**
      </td>

      <td>
        Credit
      </td>

      <td>
        EUR
      </td>

      <td>
        Tracks funds payable in the foreign currency.
      </td>
    </tr>

    <tr>
      <td>
        **FX EUR Settleable**
      </td>

      <td>
        Debit
      </td>

      <td>
        EUR
      </td>

      <td>
        FX Conversion account to track the amount of EUR anticipated to be settled. This serves as a contra-account for the Seller Payable.
      </td>
    </tr>
  </tbody>
</Table>

**Ledger Transactions** represent the events that happen in our funds flow - what actions need to occur in FX Pay’s platform, and how do they change our account balances above? The table below shows some common steps followed by foreign exchange platforms in order to record accurate movements of money as they switch currencies.

<Callout icon="💡" theme="default">
  For a refresher on account normality and how debits and credits work, review our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits).
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
        **Invoice Recorded**
      </td>

      <td>
        Buyer Receivable (increase)

        FX EUR Settleable (increase)
      </td>

      <td>
        Seller Payable

        FX USD Drift (increase)
      </td>

      <td>
        When an invoice is recorded, we record the amount expected from the buyer in base currency and amount expected from the seller in their native currency. Because there are two currencies involved in this transaction, we also record these values in the FX conversion accounts for balancing.
      </td>
    </tr>

    <tr>
      <td>
        **Buyer Pays In**
      </td>

      <td>
        FX Pay Cash (increase)
      </td>

      <td>
        Buyer Receivable  (decrease)
      </td>

      <td>
        The buyer paying in satisfies the expected receivable and zeros it out. Cash is now held in FX Pay's bank account.
      </td>
    </tr>

    <tr>
      <td>
        **Seller Pay Out**
      </td>

      <td>
        Seller Payable (decrease)

        FX USD Drift (decrease)
      </td>

      <td>
        FX Pay Cash account (decrease)

        FX EUR Settleable(decrease)
      </td>

      <td>
        Remitting funds to the Seller Payable (in EUR) extinguishes the Payable liability and the FX EUR Settleable. The cash account is decremented by the corresponding USD amount using the FX rate at the time of payout, and balanced by decrementing the FX USD Drift account by the same amount. The remaining balance in the FX Drift account will indicate a gain or loss due to changes in the FX rate.
      </td>
    </tr>
  </tbody>
</Table>

### **Example Ledger**

Below is a visual representation of the debits and credits involved in each transaction:

<Image align="center" border={true} src="https://files.readme.io/96eec699b307cd25f95ba97085fa98410bf183a07b07d64fc1a34f8f9c56e531-image.png" className="border" />

This is an example of a $175.00 invoice payable at a rate of 0.8572 USD to EUR, amounting to €150.00. The Receivable is collected in USD. Upon transaction settlement, the conversion rate changed to 0.8824 USD to EUR, resulting in an FX gain of $5.

Ledgering FX Transactions in this way will help maintain a more accurate financial picture for the platform.

# Step 2. Create Your Ledger and Ledger Accounts

Before we can post any **Ledger Transactions**, we’ll need to instantiate our Ledger.

Create a Ledger using the [Create Ledger endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger) (`POST /ledgers`).

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledgers \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "FX Pay Ledger",
    "description": "Represents FX transactions between sellers and buyers on the platform"
  }'
```

Modern Treasury will return a **Ledger** object with a UUID to be used in subsequent steps.

```json
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "FX Pay Ledger",
    "description": "Represents FX transactions between sellers and buyers on the platform",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2025-08-04T16:48:05Z",
    "updated_at": "2025-08-04T16:48:05Z"
}
```

Next, create the five **Ledger Accounts** required for our initial **Ledger Transactions** using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account) (`POST /ledger_accounts`).

<Callout icon="💡" theme="default">
  **Note:** Our bank account and receivable balances are `normal_balance = debit` This is because the bank represents a cash balance that we hold and the receivable represents cash we expect to receive. The FX EUR Settleable account is also debit normal. Normality matters less here as this account is used for balancing purposes.

  The Payable and FX USD Drift accounts are `normal_balance = credit.`The Payable represents a balance owed to the seller, and the USD drift account is given this normality so that balances due to FX conversion are intuitive (positive balance for a gain and negative balance for loss).
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
    "name": "Buyer Receivable",
    "description": "Tracks receivable balance from buyer",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Seller Payable",
    "description": "Tracks payable balance owed to seller, in EUR",
    "normal_balance": "credit",
    "currency": "EUR",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "FX EUR Settleable",
    "description": "Tracks amount in Euros to be settled",
    "normal_balance": "debit",
    "currency": "EUR",
    "ledger_id": "<ledger_id>"
  }'
  
  curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "FX USD Drift",
    "description": "Tracks drift due to FX movements",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the five **Ledger Accounts** you've created. Each has their own UUID that we can use in our **Ledger Transactions**.

```json
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
    "balances": {<balance_array>},
    "created_at": "2025-08-04T16:54:32Z",
    "updated_at": "2025-08-04T16:54:32Z"
}

{
    "id": "<buyer_receivable_account_id>",
    "object": "ledger_account",
    "name": "Buyer Receivable",
    "ledger_id": "<ledger_id>",
    "description": "Tracks receivable balance from buyer",
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
    "id": "<seller_payable_account_id>",
    "object": "ledger_account",
    "name": "Seller Payable",
    "ledger_id": "<ledger_id>",
    "description": "Tracks payable balance owed to seller",
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

{
    "id": "<FX_EUR_settleable_account_id>",
    "object": "ledger_account",
    "name": "FX EUR Settleable",
    "ledger_id": "<ledger_id>",
    "description": "Records EUR to be settled",
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
    "id": "<FX_USD_drift_account_id>",
    "object": "ledger_account",
    "name": "FX USD Drift",
    "ledger_id": "<ledger_id>",
    "description": "Tracks drift due to FX movements",
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
```

# Step 3. Record Ledger Transactions

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, let’s write to the **Ledger** to record some user actions.

First, create a **Ledger Transaction** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`) to track that an invoice has been recorded on FX Pay’s platform for $175 which corresponds to €150 at the current FX rate. This records that $175 has entered our receivable and and FX USD Drift accounts. This also records that €150 has entered our Seller Payable and FX EUR Settleable accounts.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Invoice creation",
    "effective_at": "2025-08-27",
    "status": "posted",
    "external_id": "<invoice_creation_id>",
    "ledger_entries": [
      {
        "amount": 17500,
        "direction": "debit",
        "ledger_account_id": "<buyer_receivable_id>"
      },
      {
        "amount": 17500,
        "direction": "credit",
        "ledger_account_id": "<FX_USD_drift_account_id>"
      },
      {
        "amount": 15000,
        "direction": "credit",
        "ledger_account_id": "<seller_payable_account_id>"
      },
      {
        "amount": 15000,
        "direction": "debit",
        "ledger_account_id": "<FX_EUR_settleable_account_id>"
      }
    ],
    "metadata" : {
        "effective_fx_rate" : "0.8572",
        "sourceCcy" : "USD",
        "targetCcy" : "EUR"
    }
  }'
```

Next, the Buyer pays in their Receivable amount so we increase our cash account and zero out our Receivable. Create the following **Ledger Transaction** to record the platform’s receipt of these funds.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Buyer Pay In",
    "effective_at": "2025-08-29",
    "status": "posted",
    "external_id": "<buyer_pay_id>",
    "ledger_entries": [
      {
        "amount": 17500,
        "direction": "debit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 17500,
        "direction": "credit",
        "ledger_account_id": "<buyer_receivable_account_id>"
      }
    ]
  }'
```

Finally, the buyer is payed out the €150 that they are owed and the FX drift is reflected.  Create a **Ledger Transaction** recording that €150 is sent to the seller and the corresponding amount of USD ($170 for this example) is removed from the bank account.

```curl
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Seller Payout",
    "effective_at": "2025-08-30",
    "status": "posted",
    "external_id": "<seller_payout_id>",
    "ledger_entries": [
      {
        "amount": 17000,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 17000,
        "direction": "debit",
        "ledger_account_id": "<FX_USD_drift_account_id>"
      },
      {
        "amount": 15000,
        "direction": "debit",
        "ledger_account_id": "<seller_payable_account_id>"
      },
      {
        "amount": 15000,
        "direction": "credit",
        "ledger_account_id": "<FX_EUR_settleable_account_id>"
      }
    ],
    "metadata" : {
      "effective_fx_rate" : "0.8824",
      "sourceCcy" : "USD",
      "targetCcy" : "EUR"
    }
  }'

```

<Callout icon="💡" theme="default">
  **Note**: At the end of this set of Ledger Transactions, we have a balance of $5 in our FX USD Drift account, representing an FX *gain* for the platform. You may choose to record a subsequent Ledger Transaction to move that gain into a separate Revenue Ledger Account!
</Callout>

# Step 4. Read Ledger Account Balances

**Modern Treasury’s Ledger** serves as your consistent source of truth for your user transactions and balances at scale. For example, you'll query the **Ledger** for an outstanding receivable or payable balance and display it to users in your platforms UI.

When a Seller wants to see the money they are owed, your app can run the [GET Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/get-ledger-transaction) on the seller payable Ledger Account UUID:

```curl
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
   --url https://app.moderntreasury.com/api/ledger_accounts/<seller_payable_account_id>
```

This will return the seller payable balance, which you can display in your app.

```json
{
  "id":"61574fb6-7e8e-403e-980c-ff23e9fbd61b",
  "object":"ledger_account",
  "live_mode":true,
  "name":"Seller Payable",
  "ledger_id": "<seller_payable_account_id>",
  "description": "Tracks payable balance owed to seller",
  "lock_version":2,
  "normal_balance":"credit",
  "balances":{
    "pending_balance":{
      "credits":150000
      "debits":0
      "amount":15000
      "currency":"EUR",
      "currency_exponent":2
    },
    "posted_balance":{
      "credits":15000
      "debits":0
      "amount":15000
      "currency":"EUR",
      "currency_exponent":2
    },
     "available_balance":{
      "credits":15000
      "debits":0
      "amount":15000
      "currency":"EUR",
      "currency_exponent":2
    }
  },
  "metadata":{},
  "discarded_at":NULL,
  "created_at": "2025-08-04T16:54:32Z",
  "updated_at": "2025-08-04T17:23:12Z"
}

```

# Next Steps: Advanced Topics

Up to this point, we’ve covered the basics of creating **Ledger Accounts** and **Ledger Transactions** to record user actions in the Ledger, but we’re just scratching the surface of what it takes to build a Production-ready application ledger.

Below are some more Advanced Topics you should explore as you build out your Ledger design

## Attaching Metadata

**Modern Treasury Ledgers** supports attaching free-form metadata to most objects, in the form of key-value pairs. We’ve seen our foreign exchange customers attach some of the following metadata tags:

| Object             | Metadata                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| Ledger             | `productID`                                                                 |
| Ledger Account     | `buyerid`; `sellerid` ; `accountType`; `countryCd`                          |
| Ledger Transaction | `transactionType` ; `effective_fx_rate`; `sourceCurrency`; `targetCurrency` |

**Modern Treasury Ledgers** supports querying based on metadata. By using the [List Ledger Transactions](https://docs.moderntreasury.com/reference/list-ledger-transactions) endpoint to query all transactions associated with `buyerid #31512`, for instance, the system will return all the transactions that modified this account in the requested time period.

## Defining Ledger Account Categories

Oftentimes, we need to retrieve a real-time balance that is the sum of all **Ledger Accounts** of a particular type.

For example, we’ll often want to review the sum of all Outstanding Receivable Accounts across multiple buyers to ensure the platform is receiving funds in a timely fashion that way sellers can be paid out as expected.

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
        **Outstanding Receivables**
      </td>

      <td>
        Debit Normal
      </td>

      <td>
        Sums all ledger account balances across all buyer receivable accounts. Balance represents total money FX Pay is expecting to receive from buyers.
      </td>

      <td>
        * Buyer #1241241 Receivable  Balance
        * Buyer #1241242 Receivable Balance
      </td>
    </tr>

    <tr>
      <td>
        **Outstanding Payables**
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Sums all ledger account balances across all seller payable accounts. Balance represents total money FX Pay is liable to pay to sellers.
      </td>

      <td>
        * Seller #1241243 Payable Balance
        * Seller #1241244 Payable Balance
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
        Sums amount in operating cash accounts used for FX Pay business.
      </td>

      <td>
        * FX Pay Operating Cash Account
      </td>
    </tr>
  </tbody>
</Table>

<br />
# Bill Payments

Ledgers tutorial for bill payments. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial explains how to use Modern Treasury’s Ledgers API to build a **bill payment product**. We will design a Ledger for a company called **Billably**, a business-to-business (B2B) bill payment platform. We will demonstrate how Billably can use Modern Treasury’s Ledger to pay vendors and charge buyers, while collecting a fee for Billably.

In this guide, we will cover:

* Defining the **Ledger Accounts** and the most common **Ledger Transactions** Billably needs to record to the Ledger
* Creating the **Ledger** and the **Ledger Accounts** required to support this use case
* Posting Ledger Transactions to record any financial obligations (e.g. the balance owed by a buyer, balance owed to a vendor), along with subsequent Ledger Transactions to record the *satisfaction* of those financial obligations
* Creating Ledger Account Settlements to safely empty out an accrued balance from one account to another.

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68b1f3791c9aefe270c8e867?mode=link&layoutType=web&zoomLevel=0.8&step=0" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

<br />

# Step 1. Defining Accounts and Transaction Logic

Before we implement our ledger, we need to design our **accounts** and **transactions**.

**Ledger Accounts** represent the most specific balances that we need to track. Our bill payment application will need to track the following types of accounts:

| Ledger Account Name     | Normality | Purpose                                                             |
| ----------------------- | --------- | ------------------------------------------------------------------- |
| **Cash**                | Debit     | Tracks cash in Billably’s bank account                              |
| **Buyer Receivable(s)** | Debit     | Tracks funds owed by each Buyer (e.g. Beta Corp) to Billably        |
| **Vendor Payable(s)**   | Credit    | Tracks balance owed to a given Vendor (e.g. Valor Inc.) by Billably |
| **Revenue**             | Credit    | Tracks revenue captured by Billably                                 |

<Callout icon="💡" theme="default">
  Depending on the use case, the Receivables and Payables may require a lower level of granularity. For example, some bill payment platforms may need to surface bill-level balances regularly and take action on those.  Such a scenario would warrant a Receivable Ledger Account and Payable Ledger Account *per-bill*.
</Callout>

**Ledger Transactions** represent the events that occur in Billably’s flow of funds - what actions need to occur in Billably’s platform, and how do these actions affect our account balances above? The table below shows the most common user actions supported by B2B invoicing or bill payment systems and how they should be recorded to the **Ledger**.

<Callout icon="💡" theme="default">
  **Note**: For a refresher on account normality and how debits and credits work, review our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits).
</Callout>

| **Sample Ledger Transaction**  | **Debited Accounts** | **Credited Accounts**      | **Notes**                                                                                                                                                             |
| ------------------------------ | -------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Valor invoices Beta            | Beta Corp Receivable | Valor Inc Payable, Revenue | The invoicing step records the amount Owed by the Buyer (Accounts Receivable), the amount owed to the Vendor (Accounts Payable), and any Revenue accrued by Billably. |
| Billably pulls funds from Beta | Cash                 | Beta Corp Receivable       | Pulling funds from the Buyer will zero out the Buyer Account Receivable. Cash is now held in Billably’s bank account.                                                 |
| Billably reimburses Valor      | Valor Inc Payable    | Cash                       | Remitting funds to the Vendor  extinguishes the Payable liability and removes funds from Billably’s bank account.                                                     |

Your application code will write transactions to the Ledger when users take any of the actions above. Our team can work with you to structure your Ledger Transaction logic to meet your product and financial reporting requirements, and optimize app performance.

# Step 2. Create Your Ledger and Ledger Accounts

Before we can post any **Ledger Transactions**, we’ll need to instantiate our Ledger.

Create a Ledger using the [Create Ledger endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger) (`POST /ledgers`).

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledgers \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Billably Ledger",
    "description": "Represents our USD funds, Receivable, and Payable Balances"
  }'
```

Modern Treasury will return a **Ledger** object with a UUID (`<ledger_id>`) to be used in subsequent steps.

```shell
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "Billably Ledger",
    "description": "Represents our USD funds, Receivable, and Payable Balances",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2025-08-04T16:48:05Z",
    "updated_at": "2025-08-04T16:48:05Z"
}
```

Next, create the four **Ledger Accounts** required for our initial **Ledger Transactions** using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account) (`POST /ledger_accounts`).

<Callout icon="💡" theme="default">
  **Note:** Our bank account balance is `normal_balance = debit` because it represents an asset (cash balance) that we hold. The Buyer Receivable account(s) are also `normal_balance = debit` because they represent balances that *are owed* to us. The Vendor Payable account(s) are `normal_balance = credit` because they represent balances that we *owe*.
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
    "name": "Buyer Beta Receivable",
    "description": "Tracks balance owed by Beta Corp",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Vendor Valor Payable",
    "description": "Tracks balance owed to Valor Inc",
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

Modern Treasury will return the four **Ledger Accounts** you've created. Each ledger account has its own UUID that we can use in our **Ledger Transactions**.

```shell
{
    "id": "<cash_account_id>",
    "object": "ledger_account",
    "name": "Cash Account",
    "ledger_id": "<ledger_id>",
    "description": "Tracks our cash",
    "normal_balance": "debit",
    "live_mode": false,
    "lock_version": 0,
    "balances": {<balance_array>},
    "ledgerable_type": null,
    "ledgerable_id": null,
    "external_id": null,
    "metadata": {},
    "discarded_at": null,
    "created_at": "2025-08-04T15:16:14Z",
    "updated_at": "2025-08-04T15:16:14Z"
}

{
    "id": "<buyer_beta_account_id>",
    "object": "ledger_account",
    "name": "Buyer Beta Receivable",
    "ledger_id": "<ledger_id>",
    "description": "Tracks balance owed by Beta Corp",
    "normal_balance": "debit",
    "live_mode": false,
    "lock_version": 0,
    "balances": {<balance_array>},
    "ledgerable_type": null,
    "ledgerable_id": null,
    "external_id": null,
    "metadata": {},
    "discarded_at": null,
    "created_at": "2025-08-04T15:16:14Z",
    "updated_at": "2025-08-04T15:16:14Z"
}

{
    "id": "<vendor_valor_account_id>",
    "object": "ledger_account",
    "name": "Vendor Valor Payable",
    "ledger_id": "<ledger_id>",
    "description": "Tracks balance owed to Valor Inc",
    "normal_balance": "credit",
    "live_mode": false,
    "lock_version": 0,
    "balances": {<balance_array>},
    "ledgerable_type": null,
    "ledgerable_id": null,
    "external_id": null,
    "metadata": {},
    "discarded_at": null,
    "created_at": "2025-08-04T15:16:14Z",
    "updated_at": "2025-08-04T15:16:14Z"
}

{
    "id": "<revenue_account_id>",
    "object": "ledger_account",
    "name": "Revenue",
    "ledger_id": "<ledger_id>",
    "description": "Tracks Revenue earned from fees",
    "normal_balance": "credit",
    "live_mode": false,
    "lock_version": 0,
    "balances": {<balance_array>},
    "ledgerable_type": null,
    "ledgerable_id": null,
    "external_id": null,
    "metadata": {},
    "discarded_at": null,
    "created_at": "2025-08-04T15:16:14Z",
    "updated_at": "2025-08-04T15:16:14Z"
}
```

# Step 3. Record Ledger Transactions

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, let’s write to the **Ledger** to record some Billably actions.

First, create a **Ledger Transaction** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`) to record that Valor has invoiced Beta $1000, on top of which Billably will charge an additional $10 in fees. This records a financial obligation stating Beta owes a balance ($1010), and Valor is owed a balance ($1000), with a $10 revenue accrual.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Invoice 110382",
    "effective_at": "2025-08-27",
    "status": "posted",
    "external_id": "<invoice_id>",
    "ledger_entries": [
      {
        "ledger_account_id": "<buyer_beta_account_id>",
        "direction": "debit",
        "amount": 101000
      },
      {
        "ledger_account_id": "<vendor_valor_account_id>",
        "direction": "credit",
        "amount": 100000
      },
      {
        "ledger_account_id": "<revenue_account_id>",
        "direction": "credit",
        "amount": 1000
      }
    ]
  }'
```

Next, Billably pulls the money from Buyer Beta’s bank account, to extinguish the Account Receivable.

Create the following **Ledger Transaction** to record this transfer of funds between Buyer Beta’s bank account and Billably’s Cash Account.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Funding pull from Beta Corp",
    "effective_at": "2025-09-15",
    "status": "posted",
    "external_id": "<fund_payment_id>",
    "ledger_entries": [
      {
        "ledger_account_id": "<buyer_beta_account_id>",
        "direction": "credit",
        "amount": 101000
      },
      {
        "ledger_account_id": "<cash_account_id>",
        "direction": "debit",
        "amount": 101000
      }
    ]
  }'
```

Finally, Billably remits funds to Vendor Valor’s bank account. Create a **Ledger Transaction** recording that $1000 has left our bank account, extinguishing the Account Payable liability.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Remit to Valor Inc",
    "effective_at": "2025-09-15",
    "status": "posted",
    "external_id": "<remittance_payment_id>",
    "ledger_entries": [
      {
         "ledger_account_id": "<vendor_valor_account_id>",
         "direction": "debit",
         "amount": 100000
      },
      {
        "ledger_account_id": "<cash_account_id>",
        "direction": "credit",
        "amount": 100000
      }
    ]
  }'

```

<Callout icon="💡" theme="default">
  **Note**: At the end of this set of Ledger Transactions, we still have a remaining balance of $10 in our Cash bank account, which corresponds to the Revenue we have earned from fees.
</Callout>

# Step 4. Read Ledger Account Balances

**Modern Treasury’s Ledger** serves as your consistent source of truth for your user transactions and balances at scale. For example, you'll query the **Ledger** for the amount owed *from* a Buyer, across *all* vendors, in order to display it in their app experience when they log in. You can query the Ledger for the amount owed *to* each Vendor, in order to understand Billably’s liabilities.

When Beta Corp wants to see the amount it owes across all vendors, your app can query the Ledgers API, using just the UUID for Buyer Beta Ledger Account.

To test this, run [GET Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/get-ledger-transaction) on Beta Corp’s Ledger Account id (`GET /ledger_accounts/{<buyer_beta_account_id>}` .

```shell
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
   --url https://app.moderntreasury.com/api/ledger_accounts/<buyer_beta_account_id>
```

This will return Beta Corp’s live account receivable balance, which you can display in your app.

```shell
{
  "id":"61574fb6-7e8e-403e-980c-ff23e9fbd61b",
  "object":"ledger_account",
  "live_mode":true,
  "name":"Buyer Beta Receivable",
  "ledger_id": "<buyer_beta_account_id>",
  "description": "Tracks balance owed by Beta Corp",
  "lock_version":2,
  "normal_balance":"debit",
  "balances": {
    "effective_at_lower_bound": null,
    "effective_at_upper_bound": null,
    "pending_balance": {
      "credits": 0,
      "debits": 300000,
      "amount": 300000,
      "currency": "USD",
      "currency_exponent": 2
    },
    "posted_balance": {
      "credits": 0,
      "debits": 300000,
      "amount": 300000,
      "currency": "USD",
      "currency_exponent": 2
    },
    "available_balance": {
      "credits": 0,
      "debits": 300000,
      "amount": 300000,
      "currency": "USD",
      "currency_exponent": 2
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

Below are some more Advanced Topics you should explore as you build out your Ledger design.

## Attaching Metadata

**Modern Treasury Ledgers** supports attaching free-form `metadata` to most objects, in the form of key-value pairs. We’ve seen our B2B bill payment customers attach some of the following `metadata` tags:

| Object             | Metadata                                                         |
| ------------------ | ---------------------------------------------------------------- |
| Ledger             | `productID`                                                      |
| Ledger Account     | `accountType` ; `vendorName`; `vendorId`; `buyerName`; `buyerId` |
| Ledger Transaction | `transactionType`; `invoiceNum`; `paymentId`                     |

**Modern Treasury Ledgers** allows you to query based on `metadata`. You can use the [List Ledger Transactions](https://docs.moderntreasury.com/reference/list-ledger-transactions) endpoint with both `ledger_account_id` and `metadata` parameters to find all transactions for a specific account (like Buyer Beta Receivable) that match certain `metadata` criteria (such as `invoiceNum = IN00123`).

## Defining Ledger Account Categories

Oftentimes, we need to retrieve a real-time balance that is the sum of all **Ledger Accounts** of a particular type.

For example, we will often want to review the sum of all Vendor Payable Accounts to understand Billably’s outstanding liabilities.

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
        **Total Payable**
      </td>

      <td>
        Credit Normal
      </td>

      <td>
        Sums all Ledger account balances across all Vendor Payables. Balance represents Billably’s outstanding reimbursable liabilities.
      </td>

      <td>
        Vendor #10001 Payable Balance

        Vendor #10002 Payable Balance
      </td>
    </tr>

    <tr>
      <td>
        **Total Receivable**
      </td>

      <td>
        Debit Normal
      </td>

      <td>
        Sums all Ledger account balances across all Buyer Receivables. Balance represents total amount Billably expects to receive.
      </td>

      <td>
        Buyer #30001 Receivable Balance
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
        Sums amount in operating cash accounts used for Billably’s business.
      </td>

      <td>
        Billably Cash Account at Bank1
        Billably Cash Account at Bank2
      </td>
    </tr>
  </tbody>
</Table>

<br />

## Ledger Account Settlements

A common pattern we observe in invoicing use cases is that an account can accumulate a balance over time, and, on some cadence, it will need to be settled all at once.

For instance, Buyers on Billably’s platform are invoiced monthly across all their bills and vendors. We can use a [Ledger Account Settlement](https://docs.moderntreasury.com/ledgers/docs/ledger-account-settlements-overview) to safely settle that Buyer Receivable balance into the Billably Cash Account.

The **Ledger Account Settlement** is a construct that will:

* atomically and asynchronously calculate the `amount` that has accrued in the account you wish to settle
* automatically generate a Ledger Transaction (by default, in `pending` state) for that `amount`
* tag all the Ledger Entries that are being settled, so that an entry cannot be paid out twice

You can use the `amount` from the generated Ledger Account Settlement to pull funds from your Buyer’s bank account into your own Cash account (using Modern Treasury’s Payments product, or your own existing solution), and [update](https://docs.moderntreasury.com/platform/reference/update-ledger-account-settlement) the `status` of the Ledger Account Settlement to `posted` once the funds have hit your account. This will, in turn, mark the related Ledger Transaction as `posted`.

To create the Ledger Account Settlement to settle all entries in Beta Corp’s Buyer Receivable Account (up until the `effective_at_upper_bound`)  into Billably’s Cash Account, the `POST /ledger_account_settlements` call would read as follows:

```shell
curl --request POST \
	--url https://app.moderntreasury.com/api/ledger_account_settlements \
	--header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '
{
  "status": "pending",
  "allow_either_direction": false,
  "description": "Settle Beta Corp Buyer Receivable Aug 2025",
  "settled_ledger_account_id": <buyer_beta_account_id>,
  "contra_ledger_account_id": <cash_account_id>,
  "effective_at_upper_bound": "2025-08-31T00:00:00Z"
}'
```

This will return a `<ledger_account_settlement_id>` UUID, while the settlement processes asynchronously. Subscribe to the `finish_processing` [webhook](https://docs.moderntreasury.com/platform/reference/ledger-account-payouts) to get the generated `ledger_transaction_id` and the settled `amount` .

Once your app is aware that the funds have been moved at the bank, you can update the Ledger Account Settlement to posted, which will post your Ledger Transaction.

```shell
curl --request PATCH \
  --url https://app.moderntreasury.com/api/ledger_account_settlements/<settlement_id> \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '
{
  "status": "posted"
}'
```

<Callout icon="💡" theme="default">
  Ledger Account Settlements seamlessly integrate with Modern Treasury’s [Payments](https://docs.moderntreasury.com/payments/docs/overview) product. The generated Ledger Transaction can be [linked](https://docs.moderntreasury.com/ledgers/docs/linking-ledger-transaction-to-payment-objects#linked-statuses) to a Payment Order. When the Payment Order lifecycle completes, the Ledger Transaction `status` is automatically updated to `posted`.
</Callout>
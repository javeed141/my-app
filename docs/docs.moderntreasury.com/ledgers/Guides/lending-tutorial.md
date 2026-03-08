# Lending

Ledgers tutorial for lending companies to track principal, interest, and fees across loans; surface that data in user balances; enrich transactions with free-form metadata, and more. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

This tutorial will explain how to use **Modern Treasury**’s [Ledgers API](https://www.notion.so/platform/reference/ledger-object) to build a **lending product**. We’ll design a Ledger for **LendNow** a platform where customers can either lend or borrow USD.

In this guide, we’ll cover:

* Defining the most common transactions LendNow needs to record to the Ledger
* Creating the **Ledger** and **Ledger Accounts** required to support this use case
* Recording **Ledger Transactions** to change Ledger Account balances \*\*\*\*for loan origination, interest accrual, and repayment.
* Reading balances to show outstanding principal and interest.
* Advanced steps to extend this design to production.

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68bf5debc12148956b8722bd?mode=link&layoutType=web&zoomLevel=0.8&step=0" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

# Step 1. Defining Accounts and Transaction Logic

Before we implement the ledger, we need to define the **accounts** (balances to track) and **transactions** (events that change balances).

**Ledger Accounts** represent the most specific balances that we need to track. Our lending use case requires that we track three core groups of Accounts:

* Accounts related to **each loan** outstanding such as principal, interest, and fees.
* Accounts related to **investors or liquidity providers**, such as investor principal balances or interest due to investors.
* A set of **operating accounts** representing revenue, cash, and/or expenses.

## Loan Accounts

These are accounts that track balances for **each individual loan outstanding** in LendNow.  The individual accounts would be represented as `Loan 1-Principal Balance`  or a similar description. You can also use metadata to map principal, interest, and fee accounts to a given loan or borrower.

| Ledger Account Name  | Normality | Purpose                                 |
| :------------------- | :-------- | :-------------------------------------- |
| **Loan - Principal** | Debit     | Outstanding principal in a single loan. |
| **Loan - Interest**  | Debit     | Interest balance in a single loan.      |
| **Loan - Fees**      | Debit     | Fees balance in a single loan.          |

<Callout icon="💡" theme="default">
  Interest calculations happen in your application code based on outstanding principal balances. Ledgers **can’t calculate interest based on percentages** but will rather log the **total interest due as described in the Ledger Transaction.**
</Callout>

## Liquidity Provider Accounts

These are accounts that track balances for each **liquidity provider** in LendNow.

| Account Type                 | Normality | Purpose                                                                                    |
| :--------------------------- | :-------- | :----------------------------------------------------------------------------------------- |
| **Investor - Principal Due** | Credit    | Principal balances associated with a single investor, debt facility or liquidity provider. |
| **Investor - Interest Due**  | Credit    | Interest due to a single investor, debt facility or liquidity provider.                    |

<br />

## LendNow Operating Accounts

These are accounts that **LendNow’s** cash position and revenue.

| Account Type             | Normality | Purpose                                                                                                               |
| :----------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------- |
| **LendNow Cash Account** | Debit     | LendNow's cash balance for Loan business.                                                                             |
| **LendNow Revenue**      | Credit    | LendNow revenue streams. Can be specified by stream, for example **revenue from fees** and **revenue from interest.** |
| **LendNow Expenses**     | Debit     | Funds LendNow spends in the course of business, for example bank and services fees.                                   |

<br />

## Common Ledger Transaction Logic

**Ledger Transactions** represent the events that happen in our funds flow - what actions need to occur in LendNow’s platform, and how do they change our account balances above? The table below shows the most common user actions supported by lending marketplace apps and how they should be recorded to the **Ledger**.

<Callout icon="💡" theme="default">
  For a refresher on account normality and how debits and credits work, review our [guide to debits and credits](https://docs.moderntreasury.com/docs/guide-to-debits-and-credits). For more on how to design your chart of accounts, see the [Appendix](https://docs.moderntreasury.com/ledgersdocs/lending-tutorial#next-steps-advanced-topics-1).
</Callout>

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Sample Ledger Transaction
      </th>

      <th>
        Debited Accounts
      </th>

      <th>
        Credited Accounts
      </th>

      <th>
        Notes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Liquidity provider wires capital to LendNow**
      </td>

      <td>
        LendNow Cash Account (increase)
      </td>

      <td>
        Investor - Principal Due (increase)
      </td>

      <td>
        Capital calls made to liquidity provider increase both our cash account and payable due to the investor, MoneyNow.
      </td>
    </tr>

    <tr>
      <td>
        **A new Loan is disbursed**
      </td>

      <td>
        Loan  - Principal (increase)
      </td>

      <td>
        LendNow Cash Account (decrease)
      </td>

      <td>
        As the loan is disbursed we compute both the increase in principal and decrease in cash.
      </td>
    </tr>

    <tr>
      <td>
        **Interest is accrued at the end of every month**
      </td>

      <td>
        Loan - Interest (increase)
      </td>

      <td>
        LendNow Revenue (increase)

        Investor - Interest Due (increase)
      </td>

      <td>
        Interest is accrued at the end of each month. The interest is due by the borrower on the loan has to be equal to the interest due to the investor plus LendNow's revenue spread.
      </td>
    </tr>

    <tr>
      <td>
        **Borrower  pays installment (n of)**
      </td>

      <td>
        LendNow Cash Accounts (increase)
      </td>

      <td>
        Loan - Principal (decrease)

        Loan - Interest (decrease)
      </td>

      <td>
        As borrowers pay off installments our cash account increases. Repayments then decrease principal and interest balance due.
      </td>
    </tr>

    <tr>
      <td>
        **LendNow wires a disbursement to the liquidity provider**
      </td>

      <td>
        Investor - Principal (decrease)

        Investor - Interst (decrease)
      </td>

      <td>
        LendNow Cash  Account (decrease)
      </td>

      <td>
        As cash is disbursed out to liquidity providers we  decrease total interest and principal due as well as cash in equal amounts.
      </td>
    </tr>
  </tbody>
</Table>

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
    "name": "LendNow Ledger",
    "description": "Represents LendNow's funds and investor and borrower's balances"
  }'
```

Modern Treasury will return a **Ledger** object with a UUID to be used in subsequent steps.

```shell
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "LendNow Ledger",
    "description": "Represents LendNow's funds and investor and borrower's balances",
    "active": true,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:48:05Z",
    "updated_at": "2020-08-04T16:48:05Z"
}
```

Next, create the three sets of **Ledger Accounts** we need for our initial **Ledger** **Transactions** using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account) (`POST /ledger_accounts`).

## Loan Accounts

<Callout icon="💡" theme="default">
  Accounts related to **each loan** outstanding are `normal_balance = debit` because they represent balances that are owed to LendNow
</Callout>

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Loan 1 - Principal",
    "description": "Tracks Loan 1 outstanding principal due",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Loan 1 - Interest",
    "description": "Tracks Loan 1 outstanding interest due",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url <https://app.moderntreasury.com/api/ledger_accounts> \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Loan 1 - Fees",
    "description": "Tracks fees associated with Loan 1",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

## Liquidity Provider Accounts

<Callout icon="💡" theme="default">
  Accounts related to **investors or liquidity providers** are `normal_balance = credit` because they represent balances that LendNow owes
</Callout>

```shell
curl --request POST \\
  -u ORGANIZATION_ID:API_KEY \\
  --url <https://app.moderntreasury.com/api/ledger_accounts> \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "MoneyNow - Principal Due",
    "description": "Tracks principal owed to MoneyNow",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \\
  -u ORGANIZATION_ID:API_KEY \\
  --url <https://app.moderntreasury.com/api/ledger_accounts> \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "MoneyNow - Interest Due",
    "description": "Tracks interest owed to MoneyNow",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

## LendNow Operation Accounts

<Callout icon="💡" theme="default">
  LendNow’s **operating accounts** representing revenue, cash, and/or expenses have different normalities:

  * Cash and Expenses are `normal_balance = debit` because they represent assets LendNow will use as part of LendNow’s business operations
  * Revenue is are `normal_balance = credit` because it represents part of LendNow’s assets
</Callout>

```shell
curl --request POST \\
  -u ORGANIZATION_ID:API_KEY \\
  --url <https://app.moderntreasury.com/api/ledger_accounts> \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "LendNow Cash Account",
    "description": "Tracks LendNow cash balances",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \\
  -u ORGANIZATION_ID:API_KEY \\
  --url <https://app.moderntreasury.com/api/ledger_accounts> \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "LendNow Revenue",
    "description": "Tracks LendNow revenue from all streams, including fees and interest",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \\
  -u ORGANIZATION_ID:API_KEY \\
  --url <https://app.moderntreasury.com/api/ledger_accounts> \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "LendNow Expenses",
    "description": "Tracks LendNow expenses in the course of business, including bank and service fees",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the **Ledger Accounts** you've created for each `POST/ledger_accounts` call. Each has their own UUID that we will use in our **Ledger Transactions**.

```shell
{
    "id": "<loan_1_principal_id>",
    "object": "ledger_account",
    "name": "Loan 1 - Principal",
    "ledger_id": "<ledger_id>",
    "description": "Tracks Loan 1 outstanding principal due",
    "lock_version": #,
    "normal_balance": "debit",
    "balances":  {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<loan_1_interest_id>",
    "object": "ledger_account",
    "name": "Loan 1 - Interest",
    "ledger_id": "<ledger_id>",
    "description": "Tracks Loan 1 outstanding interest due",
    "lock_version": #,
    "normal_balance": "debit",
    "balances": {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "currency": "USD",
    "currency_exponent": 2,
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<loan_1_fees_id>",
    "object": "ledger_account",
    "name": "Loan 1 - Fees",
    "ledger_id": "<ledger_id>",
    "description": "Tracks fees associated with Loan 1",
    "lock_version": #,
    "normal_balance": "debit",
    "balances": {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "currency": "USD",
    "currency_exponent": 2,
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<moneynow_principal_due_id>",
    "object": "ledger_account",
    "name": "MoneyNow - Principal Due",
    "ledger_id": "<ledger_id>",
    "description": "Tracks principal owed to MoneyNow",
    "lock_version": #,
    "normal_balance": "credit",
    "balances": {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "currency": "USD",
    "currency_exponent": 2,
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<moneynow_interest_due_id>",
    "object": "ledger_account",
    "name": "MoneyNow - Interest Due",
    "ledger_id": "<ledger_id>",
    "description": "Tracks interest owed to MoneyNow",
    "lock_version": #,
    "normal_balance": "credit",
    "balances": {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "currency": "USD",
    "currency_exponent": 2,
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<lendnow_cash_account_id>",
    "object": "ledger_account",
    "name": "LendNow Cash Account",
    "ledger_id": "<ledger_id>",
    "description": "Tracks LendNow cash balances",
    "lock_version": #,
    "normal_balance": "debit",
    "balances": {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "currency": "USD",
    "currency_exponent": 2,
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<lendnow_revenue_id>",
    "object": "ledger_account",
    "name": "LendNow Revenue",
    "ledger_id": "<ledger_id>",
    "description": "Tracks LendNow revenue from all streams, including fees and interest",
    "lock_version": #,
    "normal_balance": "credit",
    "balances": {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "currency": "USD",
    "currency_exponent": 2,
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}

{
    "id": "<lendnow_expenses_id>",
    "object": "ledger_account",
    "name": "Revenue",
    "ledger_id": "<ledger_id>",
    "description": "Tracks Revenue earned from fees",
    "lock_version": #,
    "normal_balance": "credit",
    "balances": {
	    "<balance_array>",
	    "currency": "USD",
	    "currency_exponent": 2
	    },
    "currency": "USD",
    "currency_exponent": 2,
    "ledgerable_type": null,
    "external_id": null,
    "metadata": {},
    "live_mode": true,
    "created_at": "2020-08-04T16:54:32Z",
    "updated_at": "2020-08-04T16:54:32Z"
}
```

# Step 3. Record Ledger Transactions

<Callout icon="💡" theme="default">
  The next two sections outline core lending flows at a simplified level for this tutorial. In a production environment, you may also use **Ledger Account Categories** to query total loan balances and act on them. See **[Advanced Topics](https://docs.moderntreasury.com/ledgersdocs/lending-tutorial#next-steps-advanced-topics)** for more detail
</Callout>

Now that we’ve set up our **Ledger** and created some critical **Ledger Accounts**, we can write to the **Ledger** to record some user actions.

Create **Ledger Transactions** using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`) to record the actions we outlined in the [Common Ledger Transaction Logic](https://www.notion.so/WIP-Lending-Ledgers-Guide-253d6bfc268380a58520e9d78308ceea?pvs=21) section.

Liquidity Provider 1, MoneyNow, wires $10,000 to LendNow. This money will be used by LendNow to provide loans to their users. This Ledger Transaction records that we (LendNow) have received $10,000, and we now owe MoneyNow at $10,000.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "MoneyNow liquidity provided",
    "effective_at": "2020-08-27",
    "status": "posted",
    "external_id": "<id_from_lendnow_records>",
    "ledger_entries": [
      {
        "amount": 1000000,
        "direction": "debit",
        "ledger_account_id": "<lendnow_cash_account_id>"
      },
      {
        "amount": 1000000,
        "direction": "credit",
        "ledger_account_id": "<moneynow_principal_due_id>"
      }
    ]
  }'
```

Next, a borrower receives a $10,000 loan, Loan 1, using our platform.

Notice that, in this model, our revenue will differ from cash on hand. This is because accrual accounting  recognizes revenue when it is earned, i.e. when the loan disbursement first happens, whereas cash-based accounting recognizes revenue when money has moved, i.e. when the loan installment is paid.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url <https://app.moderntreasury.com/api/ledger_transactions> \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Loan 1 disbursed",
    "effective_at": "2020-09-10",
    "status": "posted",
    "external_id": "<id_from_lendnow_records>",
    "ledger_entries": [
      {
        "amount": 1000000,
        "direction": "debit",
        "ledger_account_id": "<loan_1_principal_id>"
      },
      {
        "amount": 50000,
        "direction": "debit",
        "ledger_account_id": "<loan_1_interest_id>"
      },
      {
        "amount": 1000000,
        "direction": "credit",
        "ledger_account_id": "<lendnow_cash_account_id>"
      },
      {
        "amount": 25000,
        "direction": "credit",
        "ledger_account_id": "<lendnow_revenue_id>"
      },
      {
        "amount": 25000,
        "direction": "credit",
        "ledger_account_id": "<moneynow_interest_due_id>"
      }
    ]
  }'
```

Loan 1 interest is recognized at the end of every month depending on the principal remaining in the Loan 1 - Principal account. That calculation was made externally from MT, we have to write the amount of interest owed as an integer. For this month, $50 will be owed as interest for Loan 1. Half of the interest is recognized as being owed to MoneyNow and the other half is recognized by LendNow as revenue.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Loan 1 - Month 1 Interest",
    "effective_at": "2020-10-10",
    "status": "posted",
    "external_id": "<id_from_lendnow_records>",
    "ledger_entries": [
      {
        "amount": 5000,
        "direction": "debit",
        "ledger_account_id": "<loan_1_interest_id>"
      },
      {
        "amount": 2500,
        "direction": "credit",
        "ledger_account_id": "<lendnow_revenue_id>"
      },
      {
        "amount": 2500,
        "direction": "credit",
        "ledger_account_id": "<moneynow_interest_due_id>"
      }
    ]
  }'
```

The borrower pays Loan 1 in installments of $1,050 per month. For the first month, $1,000 are allocated to the paying the Principal and $50 are allocated to paying the Interest. The distribution between Principal and Interest was calculated externally to MT.

As the borrower pays off Loan 1, our cash account increases. These repayments also decrease the balance on the Ledger Accounts tracking the principal and interest due on Loan 1. This is done until both the Principal and Interest is paid off, or all Ledger Accounts associated with Loan 1 have a balance of $0.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Loan 1 repayment 1",
    "effective_at": "2020-10-11",
    "status": "posted",
    "external_id": "<id_from_lendnow_records>",
    "ledger_entries": [
      {
        "amount": 105000,
        "direction": "debit",
        "ledger_account_id": "<lendnow_cash_account_id>"
      },
      {
        "amount": 100000,
        "direction": "credit",
        "ledger_account_id": "<loan_1_principal_id>"
      },
      {
        "amount": 5000,
        "direction": "credit",
        "ledger_account_id": "<loan_1_interest_id>"
      }
    ]
  }'
```

Ten months later, once Loan 1 has been paid off in its entirety, we wire MoneyNow a disbursement for both the principal, $10,000, and the interest they are owed, $250. We record this transaction by extinguishing their Investor Principal and Interest accounts and balancing that with money from our Cash Account.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Payment back to MoneyNow for Loan 1",
    "effective_at": "2021-07-10",
    "status": "posted",
    "external_id": "<id_from_lendnow_records>",
    "ledger_entries": [
      {
        "amount": 1000000,
        "direction": "debit",
        "ledger_account_id": "<moneynow_principal_due_id>"
      },
      {
        "amount": 25000,
        "direction": "debit",
        "ledger_account_id": "<moneynow_interest_due_id>"
      },
      {
        "amount": 1025000,
        "direction": "credit",
        "ledger_account_id": "<lendnow_cash_account_id>"
      }
    ]
  }'
```

# Step 4. Read Ledger Account Balances

**Modern Treasury’s Ledger** serves as your consistent source of truth for your user transactions and balances at scale. For example, you'll query the **Ledger** for a liquidity provider’s balance in order to display it in their LendNow account when they log in. If this liquidity provider was MoneyNow, you would use the UUID for their Principal and Interest Ledger Accounts.

To test this, run [GET Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/get-ledger-transaction) on MoneyNow’s Principal Due Ledger Account (`GET /ledger_accounts/{moneynow_principal_due_id}`)

```shell
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
   --url https://app.moderntreasury.com/api/ledger_accounts/{moneynow_principal_due_id}
```

This will return MoneyNow’s principal due, which you can be displayed to them via an app or a report:

```shell
{
    "id": "<moneynow_principal_due_id>",
    "object": "ledger_account",
    "live_mode": true,
    "name": "MoneyNow - Principal Due",
    "ledger_id": "<lendnow_ledger>",
    "description": "Tracks principal owed to MoneyNow",
    "lock_version": 2,
    "normal_balance": "credit",
    "balances": {
        "effective_at_lower_bound": null,
        "effective_at_upper_bound": null,
        "pending_balance": {
            "credits": 1000000,
            "debits": 1000000,
            "amount": 0,
            "currency": "USD",
            "currency_exponent": 2
        },
        "posted_balance": {
            "credits": 1000000,
            "debits": 1000000,
            "amount": 0,
            "currency": "USD",
            "currency_exponent": 2
        },
        "available_balance": {
            "credits": 1000000,
            "debits": 1000000,
            "amount": 0,
            "currency": "USD",
            "currency_exponent": 2
        }
    },
    "ledgerable_type": null,
    "ledgerable_id": null,
    "external_id": null,
    "metadata": {},
    "discarded_at": null,
    "created_at": "2025-08-25T22:34:23Z",
    "updated_at": "2025-08-25T22:34:23Z"
```

# Next Steps: Advanced Topics

Up to this point, we’ve covered the basics of creating **Ledger Accounts** and **Ledger Transactions** to record user actions in the Ledger, but we’re just scratching the surface of what it takes to build a Production-ready application ledger.

Below are some more Advanced Topics you should explore as you build out your Ledger design.

## Attaching Metadata

Modern Treasury **Ledgers** supports attaching free-form metadata to most objects, in the form of key-value pairs. We’ve seen our lending platform customers attach some of the following metadata tags:

| Object             | Metadata                                                 |
| ------------------ | -------------------------------------------------------- |
| Ledger             | `countryID`; `productID`                                 |
| Ledger Account     | `borrowerID`; `borrowerZIP`; `loanID`; `debt_facilityID` |
| Ledger Transaction | `paymentMethod`; `transactionType`                       |

For some of Ledger Accounts above, here are some example metadata that could be included.

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
        **Purpose**
      </th>

      <th>
        **Sample Metadata**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Loan - Principal**
      </td>

      <td>
        Debit
      </td>

      <td>
        Outstanding principal in a single loan.
      </td>

      <td>
        `accountType: "Loan Principal",
                                                borrowerID: "ABC",
                                                borrowerZIP: "90258",
                                                loanID: "Loan 1",
                                                loanTerms: "20 months"`
      </td>
    </tr>

    <tr>
      <td>
        **Investor - Interest Due**
      </td>

      <td>
        Credit
      </td>

      <td>
        Principal balances due to a single investor, debt facility or liquidity provider.
      </td>

      <td>
        `accountType: "Investor Principal Due",
                                                debtFacilityID: "XYZ",
                                                loanID: "Loan 1"`
      </td>
    </tr>

    <tr>
      <td>
        **LendNow Cash Account**
      </td>

      <td>
        Debit
      </td>

      <td>
        LendNow’s cash balance for Loan business
      </td>

      <td>
        `accountType: "Cash for Lending",
                                                active: yes`
      </td>
    </tr>
  </tbody>
</Table>

**Modern Treasury Ledgers** supports querying based on metadata. By using the [List Ledger Transactions](https://docs.moderntreasury.com/reference/list-ledger-transactions) endpoint to query all transactions associated with Loan 1, for instance, the system will return all the transactions that modified their Principal and Interest accounts in the requested time period.

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
        Contains
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Investor Balance**
      </td>

      <td>
        Credit
      </td>

      <td>
        Sums balances of Principal and Interest due Ledger Accounts associated with a specific investor/liquidity provider. Balance represents total money due to a specific investor.
      </td>

      <td>
        Investor Y-Principal Due

        Investor Y-Interest Due
      </td>
    </tr>

    <tr>
      <td>
        **Individual Loan Balance**
      </td>

      <td>
        Debit
      </td>

      <td>
        Sums balances of Principal, Interest, and Fee Ledger Accounts across an individual loan. Balance represent amount owed to ledNow and Investor for a specific loan.
      </td>

      <td>
        Loan A-Principal

        Loan A-Interest

        Loan A-Fees
      </td>
    </tr>

    <tr>
      <td>
        **Borrower Loan Balance**
      </td>

      <td>
        Debit
      </td>

      <td>
        If a user has multiple loans, this category sums balances of all Ledger Accounts across loans associated with a specific user. Balance represents amount owed to LendNow and Investor by a borrower across multiple loans.
      </td>

      <td>
        Loan B-Ledger Account Category

        Loan C-Ledger Account Category
      </td>
    </tr>

    <tr>
      <td>
        **LendNow Total Revenue**
      </td>

      <td>
        Credit
      </td>

      <td>
        If multiple Ledger Accounts are tracking revenue, this category sums up all revenue across sources of income. Balance represents total lendNow revenue.
      </td>

      <td>
        LendNow Revenue-Interest

        LendNow Revenue-Fees
      </td>
    </tr>
  </tbody>
</Table>

* <br />

Reach out to us at [sales@moderntreasury.com](mailto:sales@moderntreasury.com) if we can be helpful.
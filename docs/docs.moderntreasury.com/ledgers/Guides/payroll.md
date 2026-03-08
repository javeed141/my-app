# Payroll

Ledgers tutorial for payroll companies. [Sign up for an account](https://app.moderntreasury.com/sign_up?signupProduct=ledgers) to start using the API.

# Use Case Overview

In this tutorial, we will design a purpose-built Ledger for a payroll software platform, **Ctrl Pay**. Ctrl Pay is an embedded payroll provider that helps companies pay their employees and calculate taxes.

This will be done using four steps:

1. Define the Account and Transactions
2. Create the Ledger Objects
3. Write the Ledger Transactions
4. Read the Ledger Account Balances

# Demo of Tutorial

You can click through a demo of this Tutorial below:

<HTMLBlock>
  {`
  <iframe 
    src="https://coast.moderntreasury.com/share/68dead19b0b0a1caf38e9acf?mode=link&layoutType=web&zoomLevel=0.8&step=0" 
    style="width: 100%; height: 800px; border: none;"
    frameborder="0">
  </iframe>
  `}
</HTMLBlock>

# Step 1. Define the Account and Transactions

Before we implement our ledger, we need to design our **accounts** and **transactions**.

Ledger Accounts represent the discrete balances that Ctrl Pay will need to track during the course of business. As a payroll company, Ctrl Pay handles employee payroll payments for other companies. To support this, Ctrl Pay will need to track amounts owed to them by employers, the amounts they owe to the employees, and tax deductions.

| Ledger Account Name                | Normality | Purpose                                                                                                                                              |
| ---------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ctrl Pay Cash**                  | Debit     | Tracks total funds held in the Ctrl Pay account on behalf of employers.                                                                              |
| **Employer Receivable**            | Debit     | Tracks the amount Ctrl Pay needs to collect from a certain employer. Each employer that Ctrl Pay works with will have their own receivable.          |
| **Employee Payable**               | Credit    | Tracks the amount Ctrl Pay needs to pay out to a certain employee. Each employee will have their own payable.                                        |
| **Employer Tax Authority Payable** | Credit    | Tracks the taxes that must be paid on behalf of an employer to a particular tax authority. Each employer will have a payable for each tax authority. |

Next, we must consider the Ledger Transactions that will take place for Ctrl Pay’s use case. Ledger Transactions represent the events that happen during Ctrl Pay’s operations that affect the different Ledger Account balances.

Ctrl Pay must both collect funds from employers and disburse those funds to the appropriate counterparties. These will be the most common operations for Ctrl Pay, so let’s look at how these are represented as Ledger Transactions and their impact in the Ledger.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Ledger Transaction
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
        **Employee Allocation**
      </td>

      <td>
        Employer Receivable account (increase)
      </td>

      <td>
        Employee Payable accounts (increase)

        Employer Tax Authority Payable accounts (increase)
      </td>

      <td>
        Near the end of every pay period, Ctrl Pay calculates the employee and tax payouts for that period. The cumulative total of these payouts is the amount to be collected from employers.
      </td>
    </tr>

    <tr>
      <td>
        **Employer Collection**
      </td>

      <td>
        Cash account (increase)
      </td>

      <td>
        Employer Receivable account (decrease)
      </td>

      <td>
        Ctrl Pay collects the amount needed from the employer to cover the payroll period.
      </td>
    </tr>

    <tr>
      <td>
        **Employee Payout**
      </td>

      <td>
        Employee Payable accounts (decrease)
      </td>

      <td>
        Cash account (decrease)
      </td>

      <td>
        Ctrl Pay pays out the owed amounts to each employee.
      </td>
    </tr>

    <tr>
      <td>
        **Tax Payout**
      </td>

      <td>
        Employer Tax Authority Payable accounts (decrease)
      </td>

      <td>
        Cash account (decrease)
      </td>

      <td>
        Ctrl Pay pays out the taxes owed to a tax authority on behalf of an employer.
      </td>
    </tr>
  </tbody>
</Table>

# Step 2. Create the Ledger Objects

To begin putting our Ledger Accounts and Ledger Transactions in action, we’ll first need to instantiate our Ledger.

Create a Ledger object using the [Create Ledger endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger) (`POST /ledgers`).

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledgers \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Ctrl Pay Ledger",
    "description": "Represents our funds and employer and employee balances"
  }'
```

Modern Treasury will return a Ledger object with an `id` to be used in subsequent steps.

```shell
{
    "id": "<ledger_id>",
    "object": "ledger",
    "name": "Ctrl Pay Ledger",
    "description": "Represents our funds and employer and employee balances",
    "metadata": {},
    "live_mode": true,
    "created_at": "2025-08-04T14:32:04Z",
    "updated_at": "2025-08-04T14:32:04Z"
}
```

Next, create the four types of Ledger Accounts from the previous section using the [Create Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-account#/) (`POST /ledger_accounts`). For the sake of this example, we will work with Employer X, who has Employee A and Employee B as employees. Only federal income taxes will be collected for both employees.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Cash Account",
    "description": "Tracks Ctrl Pay cash",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Employer X Receivable",
    "description": "Tracks amount to be collected from Employer X",
    "normal_balance": "debit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Employee A Payable",
    "description": "Tracks amount owed to Employee A",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Employee B Payable",
    "description": "Tracks amount owed to Employee B",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Employer X Employee Income Taxes",
    "description": "Tracks income tax owed to the federal government on behalf of Employer X",
    "normal_balance": "credit",
    "currency": "USD",
    "ledger_id": "<ledger_id>"
  }'
```

Modern Treasury will return the six Ledger Accounts you've created. Each has their own `id`, which are used in any Ledger Transactions that involve the Ledger Accounts.

```shell
{
    "id": "<cash_account_id>",
    "object": "ledger_account",
    "name": "Cash Account",
    "description": "Tracks Ctrl Pay cash",
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
    "id": "<employer_x_account_id>",
    "object": "ledger_account",
    "name": "Employer X Receivable",
    "description": "Tracks amount to be collected from Employer X",
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
    "id": "<employee_a_account_id>",
    "object": "ledger_account",
    "name": "Employee A Payable",
    "description": "Tracks amount owed to Employee A",
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
    "id": "<employee_b_account_id>",
    "object": "ledger_account",
    "name": "Employee B Payable",
    "description": "Tracks amount owed to Employee B",
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
    "id": "<employer_x_tax_account_id>",
    "object": "ledger_account",
    "name": "Employer X Employee Income Taxes",
    "description": "Tracks income tax owed to the federal government on behalf of Employer X",
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
```

# Step 3. Write the Ledger Transactions

Now that we’ve created our Ledger and the needed Ledger Accounts, let’s write the Ledger Transactions that represent the payroll process using the [Create Ledger Transaction endpoint](https://docs.moderntreasury.com/platform/reference/create-ledger-transaction) (`POST /ledger_transactions`).

As the end of Employer X’s payroll period approaches, Ctrl Pay determines the gross earnings for each employee for the period ($3,500 and $2,000, respectively). For each employee, the federal income tax withholding is then calculated ($700 and $400, respectively). For simplicity, a flat 20% tax rate has been used. Once these values are known for an employee, the Employee Allocation Ledger Transaction can be written.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Employee A Allocation for Period 08-15",
    "status": "posted",
    "external_id": "<payroll_processing_id>",
    "ledger_entries": [
      {
        "amount": 350000,
        "direction": "debit",
        "ledger_account_id": "<employer_x_account_id>"
      },
      {
        "amount": 280000,
        "direction": "credit",
        "ledger_account_id": "<employee_a_account_id>"
      },
      {
        "amount": 70000,
        "direction": "credit",
        "ledger_account_id": "<employer_x_tax_account_id>"
      }
    ]
  }'
  
  curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Employee B Allocation for Period 08-15",
    "status": "posted",
    "external_id": "<payroll_processing_id>",
    "ledger_entries": [
      {
        "amount": 200000,
        "direction": "debit",
        "ledger_account_id": "<employer_x_account_id>"
      },
      {
        "amount": 160000,
        "direction": "credit",
        "ledger_account_id": "<employee_b_account_id>"
      },
      {
        "amount": 40000,
        "direction": "credit",
        "ledger_account_id": "<employer_x_tax_account_id>"
      }
    ]
  }'
```

When the Employee Allocation for each employee has been completed, the Employer X Receivable Ledger Account balance will reflect the total amount that must be collected by Ctrl Pay to cover this payroll period ($5,500). Ctrl Pay will charge Employer X for the amount and create a `pending` Ledger Transaction to reflect the incoming funds, which increase Ctrl Pay’s cash account and decreases Employer X’s receivable account.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Employer X Collection for Period 08-15",
    "status": "pending",
    "external_id": "<collection_id>",
    "ledger_entries": [
      {
        "amount": 550000,
        "direction": "debit",
        "ledger_account_id": "<cash_account_id>"
      },
      {
        "amount": 550000,
        "direction": "credit",
        "ledger_account_id": "<employer_x_account_id>"
      }
    ]
  }'
```

Once the transaction has posted to Ctrl Pay's cash account, the Ledger Transaction can be updated to `posted`.

```shell
curl --request PATCH \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions/<ledger_transaction_id> \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Updating Employer X collection to posted",
    "status": "posted"
  }'
```

<Callout theme="default">
  💡 A common pattern for any real-world money movement is to start the associated Ledger Transaction in `pending` and only update it to `posted` once the bank transaction has posted or settled at the originating bank. This pattern is automatically handled when Ledger Transactions are linked to Modern Treasury Payments.
</Callout>

Next, Ctrl Pay sends each employee what they are owed. `pending` Ledger Transactions are used to reflect the outgoing funds and clear out the respective payables.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Employee A Payout for Period 08-15",
    "status": "pending",
    "external_id": "<employee_payout_id>",
    "ledger_entries": [
      {
        "amount": 280000,
        "direction": "debit",
        "ledger_account_id": "<employee_a_account_id>"
      },
      {
        "amount": 280000,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      }
    ]
  }'
  
  curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Employee B Payout for Period 08-15",
    "status": "pending",
    "external_id": "<employee_payout_id>",
    "ledger_entries": [
      {
        "amount": 160000,
        "direction": "debit",
        "ledger_account_id": "<employee_b_account_id>"
      },
      {
        "amount": 160000,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      }
    ]
  }'
```

Once the transactions post to Ctrl Pay's cash account, the Ledger Transactions can be updated to `posted`.

```shell
curl --request PATCH \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions/<ledger_transaction_id> \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Updating Employee A payout to posted",
    "status": "posted"
  }'

curl --request PATCH \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions/<ledger_transaction_id> \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Updating Employee B payout to posted",
    "status": "posted"
  }'
```

Finally, Ctrl Pay sends the taxes owed to the federal government on behalf of Employer X for all their employees this pay period ($1,100). A `pending` Ledger Transaction is created to reflect the outgoing funds that clear out the employer's tax authority payable.

```shell
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Employer X Tax Payout for Period 08-15",
    "status": "pending",
    "external_id": "<tax_payout_id>",
    "ledger_entries": [
      {
        "amount": 110000,
        "direction": "debit",
        "ledger_account_id": "<employer_x_tax_account_id>"
      },
      {
        "amount": 110000,
        "direction": "credit",
        "ledger_account_id": "<cash_account_id>"
      }
    ]
  }'
```

Once the transactions post to Ctrl Pay's cash account, the Ledger Transaction can be updated to `posted`.

```shell
curl --request PATCH \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_transactions/<ledger_transaction_id> \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Updating Employer X tax payout to posted",
    "status": "posted"
  }'
```

# Step 4. Read the Ledger Account Balances

The Modern Treasury Ledger will act as a consistent source of truth for the balances Ctrl Pay must track. For example, after the Employee Allocations in Step 3, Ctrl Pay can query the balance of the Employer X Receivable Ledger Account to know how much to charge the employer or to display the owed balance to the employer at any time.

This is done using the [Get Ledger Account endpoint](https://docs.moderntreasury.com/platform/reference/get-ledger-account) (`GET /ledger_accounts/<employer_x_account_id>`).

```shell
curl --request GET \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/ledger_accounts/<employer_x_account_id>
```

This would return Employer X’s current balance after the Employee Allocations:

```shell
{
  "id":"<employer_x_account_id>",
  "object":"ledger_account",
  "name":"Employer X Receivable",
  "description": "Tracks amount to be collected from Employer X",
  "ledger_id": "<ledger_id>",
  "normal_balance":"debit",
  "live_mode":true,
  "lock_version":1,
  "balances":{
    "pending_balance":{
      "credits":0
      "debits":550000
      "amount":550000
      "currency":"USD",
      "currency_exponent":2
    },
    "posted_balance":{
      "credits":0
      "debits":550000
      "amount":550000
      "currency":"USD",
      "currency_exponent":2
      },
    "available_balance":{
      "credits":0
      "debits":550000
      "amount":550000
      "currency":"USD",
      "currency_exponent":2
    }
  },
  "ledgerable_type": null,
	"ledgerable_id": null,
	"external_id": null,
  "metadata":{},
  "created_at": "2025-08-04T23:39:08Z",
  "updated_at": "2025-08-04T23:43:12Z"
}
```

Similarly, the employee payable Ledger Accounts can be queried to know how much is owed to an employee and to be able to display that balance to the employee at anytime.

Here is what Employee A’s balance looks like after the Employee Allocations step.

```shell
{
  "id":"<employee_a_account_id>",
  "object":"ledger_account",
  "name":"Employee A Payable",
  "description": "Tracks amount owed to Employee A",
  "ledger_id": "<ledger_id>",
  "normal_balance":"credit",
  "live_mode":true,
  "lock_version":1,
  "balances":{
    "pending_balance":{
      "credits":280000
      "debits":0
      "amount":280000
      "currency":"USD",
      "currency_exponent":2
    },
    "posted_balance":{
      "credits":280000
      "debits":0
      "amount":280000
      "currency":"USD",
      "currency_exponent":2
      },
    "available_balance":{
      "credits":280000
      "debits":0
      "amount":280000
      "currency":"USD",
      "currency_exponent":2
    }
  },
  "ledgerable_type": null,
	"ledgerable_id": null,
	"external_id": null,
  "metadata":{},
  "created_at": "2025-08-04T23:39:08Z",
  "updated_at": "2025-08-04T23:43:12Z"
}
```

# Next Steps: Advanced Topics

Up to this point, we’ve covered the basics of creating Ledger Accounts and Ledger Transactions to record user actions in the Ledger, but we’re just scratching the surface of what it takes to build a Production-ready application ledger.

Below are some more advanced topics you should explore as you build out your ledger design.

## Attaching Metadata

**Modern Treasury Ledgers** supports attaching free-form `metadata` to most objects, in the form of key-value pairs. Below are some `metadata` ideas that a payroll company like Ctrl Pay could use.

| Object             | Metadata                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Ledger             | `productID`                                                                                 |
| Ledger Account     | `accountType`; `employerName`; `employerId`; `employeeName`; `employeeId`; `taxAuthorityId` |
| Ledger Transaction | `transactionType`; `payPeriod`; `employerId`; `employeeId`; `taxAuthorityID`                |

**Modern Treasury Ledgers** allows you to query based on `metadata`. For example, the [List Ledger Transactions](https://docs.moderntreasury.com/reference/list-ledger-transactions) endpoint can be used with both `ledger_account_id` and `metadata` parameters to find all Ledger Transactions for a specific Ledger Account that match certain `metadata` criteria.

## Defining Ledger Account Categories

Oftentimes, we need to retrieve a real-time balance that is the sum of all Ledger Accounts of a particular type.

For example, Ctrl Pay will often want to review the sum of all Employee Payables to understand their outstanding liabilities.

[Ledger Account Categories](https://docs.moderntreasury.com/ledgers/docs/ledger-account-categories-overview) (LAC) are the solution for this. They enable Ctrl Pay to easily “roll up” balances that comprise many Ledger Accounts, providing real-time access to aggregate balances to meet UI or reporting needs. Below are some LACs that may be useful for a payroll company.

| Ledger Account Category                   | Normality | Description                                                                                                                                                                                                     | Contains                                                                                                                     |
| ----------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Total Employer Receivables                | debit     | Sums balances across all **Employer Receivable** Ledger Accounts. Represents the total amount Ctrl Pay must collect from all employers.                                                                         | Employer X Receivable balance; Employer Y Receivable balance; Employer Z Receivable balance; etc.                            |
| Total Employee Payables for Employer      | credit    | Sums balances across all **Employee Payable** Ledger Accounts for a specific employer. Represents the total amount that employer owes to employees, which must be paid out by Ctrl Pay.                         | Employee A Payable balance; Employee B Payable balance; Employee C Payable balance; etc.                                     |
| Total Employee Payables for All Employers | credit    | This LAC is itself made up of LACs. This aggregates all **Total Employee Payables for Employer** LACs. Represents the overall total amount Ctrl Pay must pay out for employers’ payrolls.                       | Total Employee Payables for Employer X; Total Employee Payables for Employer Y; Total Employee Payables for Employer Z; etc. |
| Total Tax Payables for Employer           | credit    | Sums balances across all **Employer Tax Authority Payable** Ledger Accounts for a specific employer. Represents the total amount that employer owes in taxes, which must be paid out by Ctrl Pay.               | Employer Tax Authority 1 Payable; Employer Tax Authority 2 Payable; Employer Tax Authority 3 Payable; etc.                   |
| Total Tax Payables for All Employers      | credit    | This LAC is itself made up of LACs. This aggregates all **Total Tax Payables for Employer** LACs. Represents the overall total amount of taxes Ctrl Pay must pay out on behalf of employers.                    | Total Tax Payables for Employer X; Total Tax Payables for Employer Y; Total Tax Payables for Employer Z; etc.                |
| Total Payables for Tax Authority          | credit    | Sums balances across all **Employer Tax Authority Payable** Ledger Accounts for a specific tax authority. Represents the total amount Ctrl Pay must pay out to a specific tax authority on behalf of employers. | Employer X Tax Authority 1 Payable; Employer Y Tax Authority 1 Payable; Employer Z Tax Authority 1 Payable; etc.             |
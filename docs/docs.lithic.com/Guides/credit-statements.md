# Credit Statements

Learn how to retrieve data to generate statements for your credit programs

Lithic's [Statements API ](https://docs.lithic.com/reference/getstatement)provides comprehensive, compliant infrastructure for credit product statement generation that directly supports Regulation Z (Truth in Lending Act) requirements.

The API automatically calculates and exposes all mandated disclosures including:

* Payment Allocation across principal/interest/fees
* Detailed APR breakdowns by transaction category
* Critical Payoff Disclosure information
* Granular transaction categorization
* Interest calculation methodology
* Account standing metrics like days past due, consecutive payment tracking, and grace period status

# API Schema Guide

`GET /v1/financial_accounts/{financial_account_token}/statements/{statement_token}`

Retrieves a single statement for a financial account. Returns detailed billing period data including balances, transaction totals, account standing, interest details, payoff projections, and payment information.

***

## Core Identifiers

| Attribute                 | Type   | Required | Description                                          |
| ------------------------- | ------ | -------- | ---------------------------------------------------- |
| `token`                   | string | Yes      | Globally unique identifier for the statement         |
| `financial_account_token` | UUID   | Yes      | Globally unique identifier for the financial account |
| `credit_product_token`    | string | Yes      | Globally unique identifier for the credit product    |

## Timestamps

| Attribute | Type      | Required | Description                         |
| --------- | --------- | -------- | ----------------------------------- |
| `created` | date-time | Yes      | When the statement was created      |
| `updated` | date-time | Yes      | When the statement was last updated |

## Statement Period

| Attribute               | Type    | Required | Description                                            |
| ----------------------- | ------- | -------- | ------------------------------------------------------ |
| `statement_start_date`  | date    | Yes      | When the billing period began                          |
| `statement_end_date`    | date    | Yes      | When the billing period ended                          |
| `days_in_billing_cycle` | integer | Yes      | Number of days in the billing cycle                    |
| `statement_type`        | enum    | Yes      | Type of statement: `INITIAL`, `PERIOD_END`, or `FINAL` |

## Payment Information

| Attribute                 | Type | Required | Description                            |
| ------------------------- | ---- | -------- | -------------------------------------- |
| `payment_due_date`        | date | No       | When payment for this statement is due |
| `next_payment_due_date`   | date | No       | When the next payment is due           |
| `next_statement_end_date` | date | No       | When the next billing period will end  |

## Amount Due

**`amount_due`** (object, required)

| Attribute  | Type    | Description                                                                                                                          |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`   | integer | Payment due at end of billing period in cents. Negative = owed. Positive = net credit. This is the auto-collection amount if enabled |
| `past_due` | integer | Amount past due in cents                                                                                                             |

## Balances

| Attribute          | Type    | Required | Description                                                                                      |
| ------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------ |
| `starting_balance` | integer | Yes      | Balance at the start of the billing period in cents                                              |
| `ending_balance`   | integer | Yes      | Balance at the end of the billing period in cents. For charge cards, equals statement amount due |
| `available_credit` | integer | Yes      | Amount of credit available to spend in cents                                                     |
| `credit_limit`     | integer | Yes      | Maximum credit balance extended by the lender in cents                                           |

## Account Standing

**`account_standing`** (object, required)

| Attribute                             | Type    | Description                                   |
| ------------------------------------- | ------- | --------------------------------------------- |
| `consecutive_full_payments_made`      | integer | Number of consecutive full payments made      |
| `consecutive_minimum_payments_made`   | integer | Number of consecutive minimum payments made   |
| `consecutive_minimum_payments_missed` | integer | Number of consecutive minimum payments missed |
| `days_past_due`                       | integer | Number of days past due                       |
| `has_grace`                           | boolean | Whether the account currently has grace       |
| `period_number`                       | integer | Current overall period number                 |
| `period_state`                        | enum    | `STANDARD`, `PROMO`, or `PENALTY`             |

### Financial Account State

Nested under `account_standing.financial_account_state` (object).

| Attribute   | Type | Required | Description                                                                                        |
| ----------- | ---- | -------- | -------------------------------------------------------------------------------------------------- |
| `status`    | enum | Yes      | `OPEN`, `CLOSED`, `PENDING`, or `SUSPENDED`                                                        |
| `substatus` | enum | No       | `DELINQUENT`, `CHARGED_OFF_DELINQUENT`, `CHARGED_OFF_FRAUD`, `BANK_REQUEST`, or `END_USER_REQUEST` |

## Transaction Totals (Period) — Enhanced

**`period_totals`** (object, required) — Transaction totals for this billing period. All values in cents.

| Attribute           | Type    | Description                                                                             |
| ------------------- | ------- | --------------------------------------------------------------------------------------- |
| `purchases`         | integer | Net card transaction volume less cash advances                                          |
| `cash_advances`     | integer | ATM and cashback transactions                                                           |
| `balance_transfers` | integer | Opening balance transferred from previous account                                       |
| `payments`          | integer | Funds transfers affecting the balance                                                   |
| `credits`           | integer | Credit management operations less balance transfers                                     |
| `fees`              | integer | Volume of debit transactions on the `financial_account`. Redundant with `debits`        |
| `interest`          | integer | Interest accrued                                                                        |
| `debits`            | integer | **New.** Volume of debit transactions on the `financial_account`. Redundant with `fees` |
| `credit_details`    | object  | **New.** Breakdown of credits by category                                               |
| `debit_details`     | object  | **New.** Breakdown of debits by category                                                |
| `payment_details`   | object  | **New.** Breakdown of payments by category                                              |

## Transaction Totals (Year-to-Date) — Enhanced

**`ytd_totals`** (object, required) — Same enhanced structure as `period_totals`, but aggregated for the entire year.

## Interest Details

**`interest_details`** (object, optional) — Interest calculation information.

| Attribute                     | Type    | Required | Description                       |
| ----------------------------- | ------- | -------- | --------------------------------- |
| `interest_calculation_method` | enum    | Yes      | `DAILY` or `AVERAGE_DAILY`        |
| `prime_rate`                  | string  | No       | Prime rate used for calculations  |
| `actual_interest_charged`     | integer | No       | Actual interest charged in cents  |
| `minimum_interest_charged`    | integer | No       | Minimum interest charged in cents |

### Daily Balance Amounts

Nested under `interest_details.daily_balance_amounts` (object).

| Attribute           | Type   | Description                         |
| ------------------- | ------ | ----------------------------------- |
| `purchases`         | string | Daily balance for purchases         |
| `cash_advances`     | string | Daily balance for cash advances     |
| `balance_transfers` | string | Daily balance for balance transfers |

### Effective APR

Nested under `interest_details.effective_apr` (object).

| Attribute           | Type   | Description               |
| ------------------- | ------ | ------------------------- |
| `purchases`         | string | APR for purchases         |
| `cash_advances`     | string | APR for cash advances     |
| `balance_transfers` | string | APR for balance transfers |

### Interest for Period

Nested under `interest_details.interest_for_period` (object).

| Attribute           | Type   | Description                           |
| ------------------- | ------ | ------------------------------------- |
| `purchases`         | string | Interest accrued on purchases         |
| `cash_advances`     | string | Interest accrued on cash advances     |
| `balance_transfers` | string | Interest accrued on balance transfers |

## Payoff Details (New)

**`payoff_details`** (object, optional) — Projections for paying off the current balance.

| Attribute                              | Type    | Description                                                                                          |
| -------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `minimum_payment_months`               | string  | Months to pay off balance with minimum payments only. `"NA"` indicates negative or zero amortization |
| `minimum_payment_total`                | string  | Total interest + principal when paying minimum only. `"NA"` indicates negative or zero amortization  |
| `payoff_period_length_months`          | integer | Number of months to full payoff                                                                      |
| `payoff_period_monthly_payment_amount` | integer | Amount needed monthly (in cents) to achieve payoff                                                   |
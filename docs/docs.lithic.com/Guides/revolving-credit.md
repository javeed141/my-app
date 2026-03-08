# Revolving Credit

Launch credit card programs with flexible interest rates, billing cycles, and payment terms using Lithic's credit infrastructure.

## Overview

Lithic's credit infrastructure enables you to launch consumer and commercial revolving credit card programs with full control over interest rates, fees, billing cycles, and payment terms. Whether you're building a traditional credit card, a store card, or an embedded credit product, Lithic provides the core ledger and card issuing capabilities you need.

Revolving credit allows cardholders to carry balances from one billing period to the next, paying interest on outstanding amounts. Lithic handles the complex mechanics of interest calculation, statement generation, minimum payments, and grace periods, while giving you flexibility to configure terms that match your product and risk tolerance.

## Key Features for Revolving Credit

### Flexible Rate Structures

Support diverse credit products with multiple interest rate options:

* **Tiered Pricing**: Different APRs based on credit score bands (prime, near-prime, subprime)
* **Promotional Rates**: 0% intro APR for 6-18 months, then standard rate
* **Penalty Pricing**: Increased APR triggered by missed payments or other events
* **Transaction-Based Rates**: Different rates for purchases, cash advances, and balance transfers
* **Variable Rates**: Prime-linked rates that adjust automatically with prime rate changes

### Comprehensive Fee Management

Lithic automatically assesses core fees based on customer behavior:

* Late payment fees with maximum occurrences per cycle (automated)
* Returned payment fees for ACH failures (automated)
* Foreign transaction fees calculated on non-USD transactions (automated)
* Annual membership fees with waiver options (automated)

Implement additional fees via management operations API:

* Cash advance fees (greater of fixed amount or percentage)
* Over-limit fees (if opt-in allows)
* Custom fees specific to your product

### Regulatory Compliance

Built-in compliance with credit card regulations:

* **Reg Z Statements**: Required disclosures, APR calculations, payment allocation
* **CARD Act Compliance**: Payment application order, fee limitations, rate change notices
* **Truth in Lending**: APR calculations, finance charge disclosures
* **Fair Credit Billing Act**: Dispute rights, billing error resolution
* **Minimum Payment Warnings**: Required warnings about interest costs

### Advanced Payment Features

**Payment Allocation**: Payments applied in compliant order:

1. Fees (late fees, returned payment fees, etc.)
2. Interest charges (oldest to newest)
3. Principal balances (highest APR to lowest APR)

**Payment Scheduling**: Support for future-dated payments and recurring payments.

**Payment Source Options**:

* ACH pull from external bank account

### Grace Period Management

Intelligent grace period tracking:

* Grace applies to new purchases if prior balance paid in full
* Grace revoked if carrying balance from prior statement
* Separate grace tracking for promotional rate categories
* Customer-visible grace status in statements and account details

### Credit Line Management

Dynamic credit line adjustments:

* API-driven credit limit increases/decreases
* Temporary credit line increases for specific periods
* Automatic limit reductions based on delinquency
* Credit line reinstatement after paydown

### Statement & Reporting

Comprehensive financial reporting:

* Monthly statements with transaction detail
* Year-end interest and fee summaries (for tax reporting)
* Payment history and on-time payment tracking
* Credit utilization reporting
* Transaction categorization for budgeting

## Core Capabilities

### Credit Product Configuration

**Revolving Credit Accounts**: Enable customers to carry balances with flexible repayment:

* **Credit Limits**: Business-level exposure caps and card-level limits
* **Interest Rate Categories**: Multiple rate types for different transaction and balance types:
  * Purchase rates (standard transaction APR)
  * Promotional rates (introductory or special offers)
  * Cash advance rates (ATM withdrawals and cash equivalents)
  * Penalty rates (triggered by late payments or other events)
  * Balance transfer rates (transfers from other credit products)
* **Tiered APRs**: Different rates and fees for customer segments based on creditworthiness
* **Custom APRs:** Select your exact preferred rate per Financial Account:
* **Prime Rate Linking**: Automatic rate adjustments tied to prime rate changes
* **Interest Caps**: Regulatory compliance for maximum interest rates
* **Custom Minimum Payment:** Control the balance categories that go into your customers’ minimum payments

**Billing Cycles**: Configure how and when statements are generated:

* **Fixed Calendar Billing**: Statement close on specific day each month (e.g., 25th of every month)
* **Rolling Billing**: Statement close based on days from enrollment (e.g., every 30 days from account opening)
* **Configurable Cycle Length**: Support for monthly, bi-monthly, or custom periods
* **Statement Dates**: Close date, due date, and grace period configuration

**Grace Periods**: Interest-free periods for new purchases:

* Configurable grace period length (up to billing cycle length)
* Grace period revoked if previous balance not paid in full
* Separate grace period tracking for different rate categories

### Interest Calculation & Accrual

Lithic handles complex interest calculations using industry-standard methods:

**Average Daily Balance Method**:

* Daily balance tracking throughout billing cycle
* Interest accrued daily based on average balance
* Separate calculations for each rate category (purchases, cash advances, etc.)
* Proper handling of payments, credits, and new charges

**Interest Posting**:

* Interest added to statement balance at cycle close
* Interest on interest (compound interest) configurable
* Interest rounds to nearest cent (or configurable)
* Minimum interest charges (e.g., $1 minimum if any interest due)

**Payoff Disclosure Calculations:**

* Automatically calculated 36 month repayment and Time-to-Pay-Off with minimum payment
* Let Lithic handle support for consumer Reg Z disclosures

**Retroactive Interest Calculations:**

* Automatically recalculated interest from previous periods if necessary
* Let Lithic handle support for MLA and SCRA

### Statement Generation

**Reg Z-Compliant Statements**: Automatic generation of credit card statements with required disclosures:

* Opening and closing balances
* All transactions during billing cycle (purchases, payments, fees, interest)
* Interest charges by transaction category
* Minimum payment required
* Payment due date and grace period information
* Year-to-date totals (interest paid, fees paid)
* Annual Percentage Rate (APR) disclosures
* Payment allocation disclosures

**Immutable Transaction Records**: All statement data is permanent and auditable for regulatory compliance.

### Payment Processing

**Flexible Payment Options**:

* **Minimum Payment**: Calculated based on balance percentage + fees + interest
* **Statement Balance**: Pay full statement amount to maintain grace period
* **Current Balance**: Pay all outstanding charges including recent transactions
* **Custom Amount**: Pay any amount above minimum payment

**Payment Application**:

* Payments applied in regulatory-compliant order ~~(fees, interest, principal)~~
  * in order of highest → lowest interest rate
* Separate tracking for different balance types (purchases vs. cash advances)
* ACH payment processing

**Auto-Collection**: Configurable automatic payment collection via ACH:

* Pull minimum payment, statement balance, or custom amount
* Scheduled collection after due date
* Retry logic for failed payments
* Customer opt-in/opt-out capabilities

### Fees & Penalties

**Lithic-Automated Fees**:

Lithic automatically assesses the following fees based on your credit product configuration:

* **Late Payment Fees**: Automatically triggered when minimum payment not received by due date
* **Returned Payment Fees**: Automatically applied when payment ACH returns (NSF, account closed, etc.)
* **Foreign Transaction Fees**: Percentage of transaction amount for non-USD transactions
* **Annual Fees**: Recurring yearly fee for card membership

**Customer-Implemented Fees**:

These fees are not automatically assessed by Lithic. You can implement them using the Management Operations API:

* **Cash Advance Fees**: Fixed or percentage fee for ATM withdrawals and cash-equivalent transactions
* **Over-Limit Fees**: Charged when card balance exceeds credit limit (if allowed)
* **Statement Copy Fees**: Fee for requesting paper statements or copies
* **Custom Fees**: Any additional fees specific to your credit product

Example - Posting a cash advance fee:

```json
POST /v1/management_operations
{
  "category": "MANAGEMENT_FEE",
  "event_type": "MONTHLY",
  "subtype": "CASH_ADVANCE_FEE",
  "financial_account_token": "b68b7424-aa69-4cbc-a946-30d90181b621",
  "amount": 500,  // $5.00 fee
  "direction": "DEBIT",
  "effective_date": "2024-01-15",
  "memo": "Cash advance fee for ATM withdrawal"
}

```

**Fee Configuration**:

* Configure automated fees with your credit product setup (contact Lithic)
* Fixed amounts or percentage-based fees
* Maximum fee occurrences per billing cycle
* Fee waiver rules for customer segments
* Regulatory caps on fee amounts

All fees (automated or manual) can be reversed as desired using management operations

### Credit Limit Management

**Multi-Level Limits**:

* **Business-Level Limits**: Total exposure cap across all credit accounts
* **Card-Level Limits**: Individual credit line for each cardholder
* **Shared Limits**: Multiple cards drawing from same credit line (employee cards)
* **Credit Line Increases**: API-driven credit limit adjustments
* **Over-Limit Transactions**: Configurable approval/decline behavior

**Dynamic Limit Validation**: Real-time authorization decisions based on:

* Current outstanding balance
* Pending authorizations
* Available credit line
* Program-level reserve and receivables accounts

### Transaction Authorization

**Credit-Specific Authorization Controls**:

* **Available Credit Checks**: Real-time validation against credit limit and outstanding balance
* **Authorization Holds**: Pending transactions reduce available credit until settlement
* **Overlimit Behavior**: Configure whether to approve or decline transactions exceeding limit
* **Authorization Amount**: Includes merchant authorization amount plus network fees

**Integration with Authorization Rules**:

* Conditional blocking (MCC restrictions, country blocks, etc.)
* Velocity limits (daily, monthly transaction counts and amounts)
* Challenge authentication for suspicious transactions
* Real-time decisioning via Authorization Stream Access

### Balance Tracking

**Credit Account Balances** (tracked as negative balances):

* **available\_amount**: Total amount fully spent and settled (absolute value is amount owed)
* **pending\_amount**: Amount in authorization holds not yet settled
* **total\_amount**: Combined amount owed (available + pending)
* **available\_credit**: Credit limit minus total amount (spendable amount remaining)

**Balance Components**:

* Principal balances by rate category (purchases, cash advances, balance transfers)
* Interest balances (accrued but not yet billed, billed but not paid)
* Fee balances (assessed fees not yet paid)
* Payment credits (payments received but not yet applied)

## Implementation Guide

### 1. Set Up Credit Product Configuration

Credit products must be configured with Lithic before use. Contact your Lithic account manager to set up your revolving credit product with:

* **Product type**: REVOLVING
* **Billing cycle**: Fixed calendar day (e.g., 25th of each month) or rolling
* **Grace period**: Number of days (e.g., 25 days)
* **Interest rates**: Purchase APR, cash advance APR, balance transfer rates
* **Fees**: Late payment, foreign transaction, cash advance, annual fees
* **Minimum payment**: Percentage of balance plus fees/interest
* **Auto-collection**: Enable/disable automatic payment collection

Once configured, you'll receive a `credit_product_token` to use when setting up customer accounts.

### 2. Create Account Holder and Configure Credit

Onboard a customer and create their credit account:

```json
POST /v1/account_holders
{
  "individual": {
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@example.com",
    "phone_number": "+15555551234",
    "dob": "1985-06-20",
    "address": {
      "address1": "456 Oak Ave",
      "city": "Austin",
      "state": "TX",
      "postal_code": "78701",
      "country": "USA"
    }
  },
  "tos_timestamp": "2024-01-15T10:30:00Z",
  "workflow": "KYC_EXEMPT"
}

```

<Callout icon="📘" theme="info">
  Please perform your own KYC verification before onboarding customers for individual account holders using `KYC_EXEMPT`. Lithic-managed KYC for individuals will be available later in 2026.
</Callout>

Creating the account holder automatically creates an associated financial account. Listen for the `financial_account.created` webhook to receive the financial account token:

```jsx
// Webhook: financial_account.created
{
  "event_type": "financial_account.created",
  "payload": {
    "token": "b68b7424-aa69-4cbc-a946-30d90181b621",
    "account_token": "d5b3c2e1-4f8a-4d9b-9c7e-2a1f3b5c6d8e",
    "type": "ISSUING",
    "created": "2024-01-15T10:30:00Z"
  }
}

```

Once you receive the webhook, configure credit on the financial account:

```json
PATCH /v1/financial_accounts/{financial_account_token}/credit_configuration
{
  "credit_product_token": "credit_product_token",
  "credit_limit": 500000,  // $5,000 credit limit
  "external_bank_account_token": "external_bank_account_token",
  "auto_collection_configuration": {
    "auto_collection_enabled": true
  }
}

```

### 3. Issue Credit Card

Issue a credit card linked to the account:

```json
POST /v1/cards
{
  "type": "VIRTUAL",
  "account_token": "account_token",
  "state": "OPEN"
}

```

The card is now active and ready for transactions. The credit limit is controlled by the financial account configuration, not at the card level.

### 4. Process Transactions & Authorizations

When the cardholder makes a purchase, Lithic automatically:

1. Receives authorization request from card network
2. Validates against available credit (credit limit - outstanding balance - pending holds)
3. Applies any authorization rules (MCC blocks, velocity limits, etc.)
4. Creates authorization hold reducing available credit
5. Returns approval or decline to merchant

Monitor transactions:

```json
GET /v1/financial_accounts/{financial_account_token}/financial_transactions

```

### 5. Interest Accrual During Billing Cycle

Throughout the billing cycle, Lithic automatically:

1. Tracks daily balances for each rate category
2. Accrues interest daily using average daily balance method
3. Applies payments to reduce principal and stop interest accrual
4. Maintains grace period eligibility based on prior balance payoff

Query current balance including accrued (unbilled) interest:

```json
GET /v1/financial_accounts/{credit_financial_account_token}/balances

```

### 6. Statement Generation

At billing cycle close (e.g., 25th of the month), Lithic:

1. Calculates average daily balance for each rate category
2. Computes interest charges for the billing cycle
3. Assesses any applicable automated fees (late payment, returned payment, annual, FX)
4. Generates Reg Z-compliant statement
5. Calculates minimum payment due
6. Sets payment due date (e.g., 20 days after close date)

Retrieve statement:

```json
GET /v1/statements/{statement_token}

```

### 7. Payment Processing

When cardholder makes a payment:

```json
POST /v1/payments
{
  "amount": 10000,  // $100 payment
  "financial_account_token": "credit_financial_account_token",
  "external_bank_account_token": "external_bank_account_token",
  "payment_type": "COLLECTION",
  "method": "ACH_NEXT_DAY",
  "method_attributes": {
    "sec_code": "WEB"
  }
}

```

Lithic automatically:

1. Processes ACH debit from customer's external account
2. Applies payment to fees, then interest, then principal (in regulatory order)
3. Reduces outstanding balance
4. Updates available credit
5. Tracks grace period eligibility for next cycle

**Auto-Collection**: If enabled in the credit configuration, Lithic automatically initiates minimum payment collection on the due date. To enable or update auto-collection settings:

```json
PATCH /v1/financial_accounts/{credit_financial_account_token}/credit_configuration
{
  "auto_collection_configuration": {
    "auto_collection_enabled": true
  }
}

```

### 8. Monitor Account Status & Delinquency

Track account health and payment status by retrieving statements:

```json
GET /v1/financial_accounts/{credit_financial_account_token}/statements

```

Get details for a specific statement:

```json
GET /v1/financial_accounts/{credit_financial_account_token}/statements/{statement_token}

```

Statement response includes:

* Days past due
* Outstanding balance by category
* Minimum payment due
* Payment due date
* Interest charges
* All transactions for the billing cycle

## Use Cases

**Consumer Credit Cards**: General purpose credit cards for everyday spending with rewards, cashback, or points programs.

**Store Credit Cards**: Private label cards for specific retailers with special financing offers (0% APR for 6-12 months on large purchases).

**Secured Credit Cards**: Credit-building products where customer deposits collateral equal to credit limit, with graduation to unsecured after demonstrated payment history.

**Small Business Credit Cards**: Commercial credit cards for small business owners with higher limits and business-specific rewards.

**Embedded Lending**: Add "buy now, pay later" or installment loan features to existing products with revolving credit lines.

**Co-Branded Cards**: Partner with brands to offer credit cards with brand-specific benefits and rewards tied to credit line usage.

## Related Documentation

* [Credit Configurations](https://docs.lithic.com/docs/credit-products)
* [Credit Statements](https://docs.lithic.com/docs/credit-statements)
* [Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2)
# Disbursements

Disburse funds instantly to individuals and businesses using virtual and physical cards, ACH, or instant book transfers.

## Overview

Lithic enables you to build flexible disbursement programs that deliver funds to recipients quickly and efficiently. Whether you're paying contractors, distributing insurance settlements, issuing corporate incentives, or running rewards programs, Lithic provides multiple disbursement methods to meet your specific needs.

Disbursements on Lithic can be delivered via instant card funding, ACH transfers, or internal book transfers, giving you flexibility in speed, cost, and recipient experience. With real-time balance tracking, webhook notifications, and built-in compliance, you can scale your disbursement operations while maintaining full visibility and control.

## Key Features for Disbursements

### Instant Disbursement

* **Real-Time Card Funding**: Book transfers settle instantly, funds immediately available on cards
* **Zero Latency**: No waiting for ACH settlement or check clearing
* **24/7 Availability**: Issue disbursements anytime, including weekends and holidays

### Flexible Recipient Experience

* **Multiple Formats**: Virtual cards, physical cards, or ACH based on recipient preference
* **Digital Wallet Support**: Recipients can add cards to Apple Pay or Google Pay
* **Reloadable or Single-Use**: Issue once and reload, or issue new card for each payment
* **Branded Experience**: Custom card designs with your logo and branding

### Comprehensive Spend Controls

* **Merchant Category Restrictions**: Limit spending to specific business types (e.g., grocery, medical, transportation)
* **Geographic Controls**: Restrict to domestic transactions or specific countries
* **Time-Based Controls**: Set card expiration dates to enforce spending windows
* **Amount Limits**: Daily, monthly, or lifetime spending caps
* **Transaction Velocity**: Limit number of transactions per time period

### Cost Efficiency

* **Lower Fees**: Book transfers are free; ACH cheaper than third-party processors
* **Reduced Fraud**: Real-time controls and monitoring minimize loss
* **No Check Costs**: Eliminate printing, mailing, and reconciliation costs

### Compliance & Reporting

* **KYB Verification**: Verify the corporate funders for the disbursements
* **Transaction Audit Trail**: Immutable ledger of all disbursements and spending
* **Real-Time Monitoring**: Monitor transaction data for unusual patterns or policy violations
* **Flexible Reporting**: Access transaction data via API for accounting, tax reporting, or audits
* **Regulatory Compliance**: You are responsible for BSA/AML compliance, OFAC screening, and state money transmitter laws

## Core Capabilities

### Multi-Method Disbursement

**Instant Card Funding**: Deliver funds directly to virtual or physical cards in real-time:

* **Virtual Cards**: Issue cards instantly via API and fund immediately
* **Physical Cards**: Pre-fund cards before shipment or load funds after activation
* **Reload Existing Cards**: Add funds to cards that have already been issued
* **Recipient Spend**: Funds are immediately available for purchases online, in-store, or via digital wallets

**ACH Transfers**: Send funds to recipient bank accounts:

* **Next-Day ACH**: Cost-effective transfers settling in 1-2 business days
* **Same-Day ACH**: Faster transfers settling same business day (three daily windows)
* **Direct to Bank**: No card required, funds deposited to recipient's checking or savings account
* **Batch Processing**: Process thousands of payments in single API calls

### Account & Card Management

**Financial Accounts**: Track balances for each recipient and for your disbursement program:

* **ISSUING Accounts**: Recipient card balances with real-time tracking
* **OPERATING Accounts**: Non-card balances for ACH recipients or intermediary accounts
* **Program OPERATING Account**: Your master funding source for all disbursements

**Account Holders**: Create business or individual account holders

* Automatic financial account creation
* Update capabilities for recipient information

**Card Issuance Options**:

* **Virtual Cards**: Instant issuance for immediate online/digital wallet spend
* **Single-Use Cards**: Auto-close after first transaction (one-time payments)
* **Reloadable Cards**: Issue once, reload multiple times for recurring disbursements
* **Physical Cards**: Ship cards to recipients for in-store use

### Funding & Money Movement

**Multiple Funding Sources**:

* **ACH Pull**: Pull funds from your external bank account to prefund program
* **ACH Receipt**: Receive funds from partners or customers
* **Book Transfer**: Move funds internally between your accounts

**Disbursement Execution**:

```
Your Program Operating Account
    ↓ (Book Transfer - Disburse)
Recipient Financial Account
    ↓ (Card Funding)
Recipient Card
    ↓ (Cardholder Spend)
Merchant

```

**Balance Management**:

* Real-time balance tracking at account and card level
* Webhook notifications for balance changes
* Pending vs. available balance visibility
* Overdraft prevention with balance checks

### Transaction Controls & Security

**Disbursement Controls**:

* **Amount Limits**: Set maximum disbursement amounts per transaction or time period
* Funder Verification: KYB checks before funds are received
* **Audit Trails**: Complete transaction history with immutable ledger

**Recipient Spend Controls**: After funds are disbursed to cards, control how recipients use them:

* **Authorization Rules**: Block specific merchant categories, countries, or transaction types
* **Spending Limits**: Daily, monthly, or lifetime caps on card usage
* **Expiration Dates**: Set card expiration to enforce fund usage within specific timeframes
* **Merchant Restrictions**: Allow only specific merchants or MCCs (e.g., grocery, gas, pharmacy)
* **Geographic Controls**: Restrict to domestic-only or specific country usage

**Fraud Prevention**:

* Real-time authorization monitoring
* Velocity limits (max transactions per hour/day)
* Challenge authentication via SMS for suspicious activity
* 3D Secure for online transactions
* Transaction risk scoring

### Reporting & Reconciliation

**Real-Time Visibility**:

* Track disbursement status (pending, settled, failed)
* Monitor recipient card balances and spend
* View transaction history by recipient or time period
* Failed disbursement reporting with reason codes

**Webhooks for Automation**:

* `balance.updated`: Real-time balance changes
* `book_transfer_transaction.created`: Disbursement initiated
* `transaction.created`: Recipient card transaction
* `card.shipped`: Physical card status updates
* `external_payment.created`: External payment initiated (ACH, check, etc.)
* `external_payment.updated`: External payment settled or failed

**Data Export & Integration**:

* API access to all transaction and balance data
* Real-time balance queries
* Transaction categorization by disbursement type

### Compliance & Verification

**KYB Workflow**: Verify identities on corporate funders

* Automated identity verification workflows
* Document upload and review
* You are responsible for sanctions screening, watchlist monitoring, and BSA/AML compliance

**Disbursement Limits**: Configurable limits based on verification level:

* Program-level exposure caps

## Implementation Guide

### 1. Set Up Program Operating Account

Your disbursement program needs a master operating account to hold funds:

```json
POST /v1/financial_accounts
{
  "type": "OPERATING",
  "nickname": "Contractor Disbursement Program",
  "account_token": "your_program_account_holder_token"
}

```

Fund this account via ACH to create your disbursement pool.

### 2. Create Recipient Account Holder

For each disbursement recipient, create an account holder:

```json
POST /v1/account_holders
{
  "individual": {
    "first_name": "Maria",
    "last_name": "Garcia",
    "email": "maria.garcia@example.com",
    "phone_number": "+15555555678",
    "address": {
      "address1": "789 Pine St",
      "city": "Denver",
      "state": "CO",
      "postal_code": "80202",
      "country": "USA"
    }
  },
  "tos_timestamp": "2024-01-20T14:00:00Z",
  "workflow": "KYC_EXEMPT"
}

```

### 3. Issue Card to Recipient (Card Disbursement Method)

Issue a virtual or physical card:

```json
POST /v1/cards
{
  "type": "VIRTUAL",
  "account_token": "recipient_account_token",
  "memo": "Contractor Payment - Project Alpha"
}

```

### 4. Disburse Funds to Card (Book Transfer)

Transfer funds from your program operating account to the recipient's card account:

```json
POST /v1/book_transfers
{
  "amount": 150000,  // $1,500 disbursement
  "from_financial_account_token": "program_operating_account_token",
  "to_financial_account_token": "recipient_issuing_account_token",
  "category": "BALANCE_OR_FUNDING",
  "type": "DISBURSE",
  "memo": "Payment for services rendered - Invoice #12345",
  "subtype": "DISBURSE"
}

```

The funds are instantly available on the recipient's card for purchases.

### 5. Alternative: ACH Disbursement

For recipients who prefer bank deposits, connect their external account and send via ACH:

```json
POST /v1/external_bank_accounts
{
  "owner": "Maria Garcia",
  "owner_type": "INDIVIDUAL",
  "account_token": "recipient_account_holder_token",
  "account_number": "987654321",
  "routing_number": "123456789",
  "type": "CHECKING",
  "verification_method": "EXTERNALLY_VERIFIED"
}

```

Then initiate ACH disbursement:

```json
POST /v1/payments
{
  "amount": 150000,  // $1,500 disbursement
  "external_bank_account_token": "external_bank_account_token",
  "financial_account_token": "program_operating_account_token",
  "payment_type": "PAYMENT",
  "method": "ACH_NEXT_DAY",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "memo": "Contractor Payment - Invoice #12345"
}

```

### 6. Configure Spend Controls (Optional)

Control how recipients can use disbursed funds:

```json
POST /v2/auth_rules
{
  "account_tokens": ["recipient_account_holder_token"],
  "program_level": false,
  "state": "ACTIVE",
  "type": "CONDITIONAL_ACTION",
  "parameters": {
    "conditions": [
      {
        "attribute": "MCC",
        "operation": "IS_ONE_OF",
        "value": ["5812", "5814", "5411", "5542"]  // Restaurants, grocery, gas only
      }
    ],
    "action": "ALLOW"
  }
}

```

### 7. Monitor Disbursements & Recipient Spend

Track disbursement status:

```json
GET /v1/book_transfers?financial_account_token=program_operating_account_token

```

Monitor recipient card balances:

```json
GET /v1/financial_accounts/{recipient_issuing_account_token}/balances

```

View recipient transaction history:

```json
GET /v1/financial_accounts/{recipient_issuing_account_token}/financial_transactions

```

### 8. Reconcile & Report

Subscribe to webhooks for real-time updates:

**Disbursement Events:**

```jsx
// Webhook: book_transfer_transaction.created
{
  "event_type": "book_transfer_transaction.created",
  "payload": {
    "token": "book_transfer_token",
    "amount": 150000,
    "category": "BALANCE_OR_FUNDING",
    "type": "DISBURSE",
    "from_financial_account_token": "program_operating_account_token",
    "to_financial_account_token": "recipient_issuing_account_token",
    "status": "SETTLED",
    "memo": "Payment for services rendered - Invoice #12345"
  }
}

```

**Recipient Spend Events:**

```jsx
// Webhook: transaction.created - When recipient spends funds
{
  "event_type": "transaction.created",
  "payload": {
    "token": "transaction_token",
    "amount": 5000,  // $50 purchase
    "card_token": "recipient_card_token",
    "account_holder_token": "recipient_account_holder_token",
    "status": "PENDING",
    "merchant": {
      "descriptor": "GROCERY STORE",
      "city": "DENVER",
      "state": "CO",
      "mcc": "5411"
    }
  }
}

```

**Balance Updates:**

```jsx
// Webhook: balance.updated - When recipient balance changes
{
  "event_type": "balance.updated",
  "payload": {
    "financial_account_token": "recipient_issuing_account_token",
    "available_amount": 145000,  // $1,450 remaining
    "pending_amount": 5000,      // $50 pending transaction
    "total_amount": 150000
  }
}

```

## Disbursement Program Types

### Contractor & Gig Economy Payments

**Use Case**: Pay independent contractors, freelancers, and gig workers for completed work.

**Implementation**:

* Issue virtual cards to contractors upon onboarding
* Disburse funds via book transfer after invoice approval
* Configure spend controls to limit merchant categories (if desired)

**Benefits**:

* Instant payment delivery (no 3-5 day ACH wait)
* Lower cost than third-party payment processors
* Recipients can spend immediately online or via digital wallets
* Convert to physical card for in-store purchases

### Insurance Claims & Settlements

**Use Case**: Disburse insurance settlements, claims payouts, or legal settlements to claimants.

**Implementation**:

* Create account holder for each claimant
* Issue virtual or physical card or initiate ACH based on claimant preference
* Disburse settlement amount via book transfer to card or ACH to bank account
* Set card expiration dates to align with settlement terms
* Control spend categories (e.g., medical expenses only for health claims)

**Benefits**:

* Fast payouts improve customer satisfaction
* Spend controls ensure funds used for intended purposes
* Detailed transaction records for audit and compliance
* Reduce check printing and mailing costs

### Corporate Incentives & Rewards

**Use Case**: Distribute employee bonuses, sales incentives, customer rewards, or promotional rebates.

**Implementation**:

* Issue virtual cards to all recipients
* Disburse rewards via book transfers
* Configure spend limits and expiration dates
* Use single-use cards for one-time bonuses, reloadable for ongoing rewards
* Brand cards with company logo and messaging

**Benefits**:

* Instant reward delivery drives engagement
* Recipients choose how to spend (more valuable than gift cards)
* Track utilization rates and popular merchant categories
* Lower fulfillment costs vs. physical gift cards
* Interchange revenue for card spend

### Class Action Settlements

**Use Case**: Distribute settlement funds to large numbers of claimants in class action lawsuits.

**Implementation**:

* Create account holders from claimant list
* Issue single-use or reloadable cards based on settlement terms
* Disburse settlement amounts
* Set expiration dates per settlement agreement
* Generate detailed reports for settlement administrator and court

**Benefits**:

* Faster than check distribution and processing
* Real-time visibility into settlement fund utilization
* Lower administrative costs
* Interchange revenue for card spend

### Clinical Trial Participant Payments

**Use Case**: Compensate clinical trial participants for time, travel, and participation.

**Implementation**:

* Create account holder for each enrolled participant
* Issue reloadable virtual or physical cards
* Disburse payments after each study visit or milestone completion
* Configure spend controls if study protocols require (e.g., no alcohol)
* Track payment history per participant for compliance

**Benefits**:

* Immediate payment improves participant retention
* Reduce burden on trial coordinators (no cash handling)
* Detailed audit trail for regulatory compliance
* Flexible payment schedules (per visit, weekly, monthly)

### Government Benefit Disbursements

**Use Case**: Distribute government benefits, assistance programs, or disaster relief funds.

**Implementation**:

* Issue cards to benefit recipients
* Configure merchant category restrictions (e.g., food and groceries only)
* Recurring monthly disbursements via scheduled book transfers
* Real-time balance monitoring and alerts
* Compliance reporting for oversight agencies

**Benefits**:

* Ensure funds used for intended purposes with spend controls
* Reduce fraud with real-time authorization monitoring
* Lower program costs vs. paper checks
* Instant fund availability for recipients
* Bulk ship cards to a location for handing out directly versus mailing directly to account holders.

## Related Documentation

* [Book Transfers](https://docs.lithic.com/docs/book-transfers)
* [Financial Accounts](https://docs.lithic.com/docs/financial-accounts)
* [Card Issuance](https://docs.lithic.com/docs/cards)
* [Account Holders](https://docs.lithic.com/docs/account-holders)
* [ACH Payments](https://docs.lithic.com/docs/ach-overview)
* [Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2)
* [Events API and Webhooks](https://docs.lithic.com/docs/events-api)
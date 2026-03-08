# Digital Banking

Build modern digital banking experiences with checking accounts, debit cards, and real-time balance management powered by Lithic's ledger infrastructure.

## Overview

Lithic provides the core infrastructure to build modern digital banking experiences, from neobanks to embedded banking products. By combining our ledger offering with card issuing and payment rails to move money, you can offer a complete banking solution to your customers.

Digital banking on Lithic supports both consumer and commercial use cases, with real-time balance tracking, instant card issuance, and flexible funding options. Whether you're building a standalone neobank or embedding card and accounts into your existing product, Lithic's API-first platform provides the foundation you need.

## Key Features for Digital Banking

### Real-Time Balance Updates

Lithic's ledger processes transactions in real-time, providing instant balance updates across all money movement types:

* Card authorizations immediately reduce available balance
* ACH receipts post 6x daily with instant balance increases
* Book transfers execute instantly with same-second balance updates

### Flexible Funding Options

Support multiple funding methods to meet customer needs:

* **ACH Push**: Direct deposits from employers and benefits
* **ACH Pull**: Customer-initiated transfers from external accounts
* **Book Transfers**: Internal movement between accounts

### Comprehensive Transaction History

Provide customers with detailed transaction records:

* Complete transaction lifecycle from authorization to clearing
* Merchant information (name, MCC, location)
* Snapshot of the transaction's state

### Regulatory Compliance

Built-in compliance features for banking products:

* KYC/KYB verification workflows
* RESERVE financial account types available for prepaid program compliance
* Statements API for credit products

## Core Capabilities

### Account Management

**Financial Accounts**: At the heart of digital banking is Lithic's financial account system, which provides real-time balance tracking and double-entry accounting:

* **ISSUING accounts**: Track card spend and balances for each customer
* **OPERATING accounts**: Manage non-card transactions like ACH transfers and internal movements
* **Balance types**: Accounts can hold a prepaid balance (funds stored), or a credit balance (funds owed). Within prepaid or credit financial accounts, Lithic tracks available balance, pending balance, and total balance

**Account Holders**: Create business or individual account holders

* Automatic financial account creation for each account holder
* Update capabilities for customer information (address, phone, contact details)

### Card Issuance

Issue both virtual and physical debit cards to your customers instantly:

**Virtual Cards**:

* Instant issuance via API
* Immediate availability for e-commerce and digital wallet transactions
* Can be converted to physical cards later
* Support for Apple Pay and Google Pay in-app or web push provisioning

**Physical Cards**:

* Manufacturing: Integrated with many card personalization bureaus for all types of card printing options.
* Support for in-store POS, contactless NFC, chip, and magstripe
* PIN management with encrypted PIN blocks
* Support for Apple Pay and Google Pay provisioning

**Card Programs**: Configure card programs with specific BIN ranges, digital wallet art, and program-level settings.

### Funding & Money Movement

Enable seamless money movement in and out of customer accounts:

**Money Movement**:

* **Same Day and Next-Day ACH**: Process [ACH push and pull transactions](https://docs.lithic.com/docs/intro-to-ach) on all six ACH windows
* **Direct Deposits**: Accept employer payroll and government benefits
* **Bill Pay + ACH Auth rules**: Receive ACH debits from merchants and service providers, and use custom logic to define who and when can debit your customers’ accounts

**External Bank Accounts**:

* Connect and save [external bank accounts](https://docs.lithic.com/docs/external-accounts-api) for funding and payments
* Verify account ownership using micro-deposits or prenotes

**Book Transfers**:

* [Instant internal transfers](https://docs.lithic.com/docs/book-transfers) between financial accounts
* Move funds between customer accounts or from your operating account to customer cards
* Support for dozens of transfer types: disbursements, card-to-card, account-to-account, collections, fees, and rewards

### Transaction Controls

Provide customers with powerful spending controls and security:

**Authorization Rules**:

* Conditional blocking based on merchant category, country, transaction amount, and more
* Velocity limits (daily, monthly, annual spend caps)
* Challenge authentication via SMS for suspicious transactions
* Shadow mode for testing rules without affecting transactions
* Backtest new rules on months of past transactions immediately

**Real-Time Decisioning**:

* Authorization Stream Access (ASA) for custom approval logic
* 3-second response window for authorization decisions
* Access to 150+ transaction data points
* Integrate with your own fraud scoring and risk assessment systems

### Digital Wallet Support

Modern payment experiences with digital wallet integration:

* Apple Pay and Google Pay tokenization
* In-app and web push provisioning
* Customizable card art for wallet display
* Tokenization decisioning (Lithic-managed or customer-managed)
* Tokenization rules for better fraud controls

## Implementation Guide

### 1. Account Onboarding

Create an account holder and associated financial accounts:

```json
POST /v1/account_holders
{
  "individual": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "phone_number": "+15555551234",
    "dob": "1990-01-15",
    "address": {
      "address1": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94105",
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

Response includes the `account_holder_token` and automatically creates an ISSUING financial account.

### 2. Retrieve Financial Account

Get the financial account token that was automatically created:

```json
GET /v1/financial_accounts?account_token={account_holder_token}

```

This returns the ISSUING financial account token needed for funding operations.

### 3. Issue Virtual Debit Card

Once the account holder is verified, issue a virtual card:

```json
POST /v1/cards
{
  "type": "VIRTUAL",
  "account_token": "account_token",
  "state": "OPEN"
}

```

The card is immediately available for online transactions and digital wallet provisioning.

### 4. Connect External Bank Account

Enable ACH funding by connecting the customer's external bank account:

```json
POST /v1/external_bank_accounts
{
  "owner": "Jane Doe",
  "owner_type": "INDIVIDUAL",
  "account_token": "account_holder_token",
  "account_number": "123456789",
  "routing_number": "123456789",
  "type": "CHECKING",
  "country": "USA",
  "currency": "USD",
  "verification_method": "MICRO_DEPOSIT",
  "financial_account_token": "issuing_account_token"
}

```

Verify the account using micro-deposits or prenote before enabling funding. The `financial_account_token` is used to fund the micro-deposits for verification.

### 5. Configure Authorization Rules

Set up spending controls for the customer:

```json
POST /v2/auth_rules
{
  "account_tokens": ["account_holder_token"],
  "program_level": false,
  "state": "ACTIVE",
  "type": "CONDITIONAL_ACTION",
  "parameters": {
    "conditions": [
      {
        "attribute": "MCC",
        "operation": "IS_ONE_OF",
        "value": ["5813", "7995"]  // Block gambling and betting
      }
    ],
    "action": "BLOCK"
  }
}

```

### 6. Fund the Account

Transfer funds from the external bank account via ACH:

```json
POST /v1/payments
{
  "amount": 50000,
  "external_bank_account_token": "external_bank_account_token",
  "financial_account_token": "issuing_account_token",
  "payment_type": "COLLECTION",
  "method": "ACH_NEXT_DAY",
  "method_attributes": {
    "sec_code": "WEB"
  }
}

```

Funds will be available based on the ACH settlement schedule (same-day or next-day).

### 7. Monitor Balances & Transactions

Track account balances in real-time:

```json
GET /v1/financial_accounts/{financial_account_token}/balances

```

Response:

```json
{
  "available_amount": 48500,
  "pending_amount": 1500,
  "total_amount": 50000,
  "currency": "USD",
  "last_transaction_token": "transaction_token",
  "last_transaction_event_token": "event_token"
}

```

Subscribe to webhooks for real-time balance updates:

* `financial_account.created`: New financial account
* `balance.updated`: Fired when account balance changes
* `transaction.created`: New card transaction or payment

## Use Cases

**Consumer Neobanks**: Full-featured digital banking apps with checking accounts, debit cards, and mobile payment capabilities.

**Embedded Banking**: Add banking features to existing products like payroll platforms, HR systems, or consumer apps.

**Commercial Banking**: Business checking accounts with expense management, employee cards, and ACH payments.

**International Remittances**: Multi-currency support with card issuance and ACH funding for cross-border payments.

## Related Documentation

* [Account Holders](https://docs.lithic.com/docs/account-holders)
* [Financial Accounts](https://docs.lithic.com/docs/financial-accounts)
* [Cards](https://docs.lithic.com/docs/cards)
* [ACH Payments](https://docs.lithic.com/docs/ach-overview)
* [Book Transfers](https://docs.lithic.com/docs/book-transfers)
* [Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2)
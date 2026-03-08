# Expense Management

Build corporate expense management solutions with employee cards, spend controls, real-time visibility, and automated expense tracking.

## Overview

Modern expense management requires more than just corporate credit cards and expense reports. Lithic enables you to build sophisticated expense management platforms that give finance teams real-time visibility and control over corporate spending, while empowering employees with instant card issuance and flexible spend options.

With Lithic's card infrastructure, you can issue virtual and physical cards to employees, configure granular spending rules, track expenses in real-time, and integrate seamlessly with accounting systems. Whether you're building a standalone expense management platform or adding expense features to your existing fintech product, Lithic provides the foundational infrastructure you need.

## Key Features for Expense Management

### Instant Card Issuance

* **Virtual Cards in Seconds**: Issue cards to new employees immediately
* **Physical Cards in Days**: Rapid fulfillment for in-person purchases
* **Bulk Shipping**: Onboard entire departments or offices at once
* **Temporary Cards**: Single-use cards for one-time vendors or purchases

### Proactive Spend Control

* **Policy Enforcement**: Authorization rules block non-compliant spending automatically
* **Real-Time Budgets**: Prevent overspend by declining transactions when budget exhausted
* **Merchant Restrictions**: Allow only business-appropriate categories

### Real-Time Visibility

* **Instant Notifications**: See spending as it happens via webhooks
* **Budget Tracking**: Monitor budget utilization and forecast month-end totals
* **Pending Holds**: See authorized but not yet settled transactions

### Finance Team Efficiency

* **No Manual Data Entry**: All transactions automatically captured and categorized
* **Policy Compliance**: Rules enforce policy without manual review
* **Audit-Ready**: Complete transaction history

### Security & Fraud Prevention

* **Granular Controls**: Lock down cards to specific merchants, amounts, or times
* **Real-Time Monitoring**: Flag suspicious transactions immediately
* **Challenge Authentication**: Require SMS approval for risky transactions
* **Card Lock/Unlock**: Employees can freeze cards if lost or stolen
* **Virtual Cards**: Reduce fraud with unique PANs for online subscriptions

## Core Capabilities

### Employee Card Issuance

**Virtual Cards**: Issue instant virtual cards to employees for online purchases and subscriptions:

* **Instant Issuance**: Generate cards via API in seconds, no physical distribution needed
* **Single-Use Cards**: Issue one-time cards for specific vendors or purchases
* **Multi-Use Cards**: Reusable virtual cards for ongoing expenses
* **Merchant-Locked Cards**: Cards which can only transact at particular merchants
* **Digital Wallet Support**: Add to Apple Pay or Google Pay for contactless in-person purchases
* **Vendor-Specific Cards**: Issue cards locked to specific merchants for recurring subscriptions

**Physical Cards**: Distribute physical cards for in-store purchases and travel:

* **Rapid Fulfillment**: Ship cards to employees within days
* **Bulk Shipping**: Order cards for entire departments or teams
* **Custom Branding**: White-label cards with company logo and design
* **PIN Management**: Secure PIN generation and reset capabilities
* **Contactless/NFC**: Modern payment technology for quick transactions

**Card Programs**: Organize cards by department, team, or spend category:

* **Shared Team Cards**: Multiple employees with access to shared budget
* **Executive Cards**: Higher limits and fewer restrictions for leadership

### Granular Spend Controls

**Authorization Rules**: Configure sophisticated spending policies that enforce automatically:

**Merchant Category Controls**:

To restrict cards to only approved merchant categories, decline transactions that fall outside your allowed list:

```json
{
  "type": "CONDITIONAL_ACTION",
  "parameters": {
    "conditions": [
      {
        "attribute": "MCC",
        "operation": "IS_NOT_ONE_OF",
        "value": [
          "5812", // Restaurants
          "5814", // Fast food
          "5411", // Grocery stores
          "3000-3299", // Airlines
          "3501-3999", // Hotels/Lodging
          "5541", // Gas stations
          "5734" // Computer software stores
        ]
      }
    ],
    "action": "DECLINE"
  }
}
```

**Transaction Amount Limits**:

* Per-transaction maximums (e.g., no transaction over $500)
* Daily, monthly, or annual spending caps
* Velocity limits (e.g. max 10 transactions per day or $400 per week)
* Budget allocation enforcement

**Geographic Restrictions**:

* Domestic-only transactions for most employees
* International allowed for executives and travelers
* Country-specific allowlists (e.g., only US, CA, UK)
* State or region restrictions

**Challenge Authentication**:

* SMS authentication for transactions over threshold (e.g., $1,000+)
* Two-factor authentication for international purchases

**Real-Time Decisioning**: Use Authorization Stream Access (ASA) for custom approval logic:

* Query internal expense policies and budgets (within 3-second timeout)
* Check project budget availability before approving
* Integrate with HRIS systems for employee verification

### Spend Limits & Budgets

**Card-Level Limits**: Set spending caps per employee card:

* **Transaction Limit**: Maximum per purchase (e.g., $1,000)
* **Daily Limit**: Maximum spend per day (e.g., $2,500)
* **Monthly Limit**: Maximum spend per month (e.g., $10,000)
* **Lifetime Limit**: Total spend across card's lifetime

**Account-Level Limits**: Control total spending per employee across all cards:

* Sum all cards issued to an employee
* Prevent limit circumvention by issuing multiple cards
* Shared limits for team members on same project

**Budget Allocation**:

* Assign budgets by department, project, or cost center
* Track spend against allocated budget in real-time
* Alert finance team when approaching budget thresholds

### Real-Time Expense Tracking

**Transaction Visibility**: Monitor all employee spending in real-time:

* **Pending Authorizations**: See charges immediately upon authorization
* **Settled Transactions**: Track when merchants capture funds
* **Merchant Details**: Name, MCC, location, and transaction metadata
* **Employee Assignment**: Link every transaction to specific employee and card

**Transaction Categorization**:

* Merchant category codes (MCC) for expense categorization

**Balance Tracking**:

* Real-time balance updates across all cards and accounts
* Pending vs. settled transaction visibility
* Available vs. total budget tracking
* Multi-currency support with FX rates

**Webhooks for Real-Time Alerts**:

```jsx
// Webhook: transaction.created
{
  "event_type": "transaction.created",
  "payload": {
    "token": "transaction_token",
    "amount": 5420,  // $54.20
    "merchant": {
      "descriptor": "CHIPOTLE #1234",
      "city": "SAN FRANCISCO",
      "state": "CA",
      "mcc": "5814"  // Fast food
    },
    "card_token": "employee_card_token",
    "account_holder_token": "employee_account_holder_token",
    "status": "PENDING"
  }
}
```

Use webhooks to:

* Send Slack/email notifications to finance team
* Trigger receipt requests to employees
* Flag suspicious transactions for review
* Update internal expense tracking systems

### Employee Account Management

* Create account holder for each employee
* Issue virtual and/or physical cards
* Configure authorization rules to control spending
* Check remaining budget and spending history
* Employees view their card details (last 4 digits, expiration)
* Temporarily lock/unlock cards (e.g., lost card)
* Adjust employee spend limits as needed

### Travel & Entertainment (T\&E) Expense Management

**Travel Cards**: Issue cards specifically for business travel:

* Higher limits for flights, hotels, and car rentals
* International transaction support with FX
* Merchant category restrictions (travel, meals, transportation only)
* Temporary activation for trip duration
* Receive detailed T\&E transaction information, such as flight or lodging dates

**Per Diem Enforcement**:

* Configure daily meal allowances
* Automatically approve meals under per diem.

### Corporate Subscriptions & Recurring Expenses

**Vendor-Specific Virtual Cards**: Issue cards locked to specific SaaS vendors:

* One card per vendor (Salesforce, AWS, Google Workspace, etc.)
* Prevent unauthorized charges from vendor
* Easy cancellation by closing card

**Budget Allocation by Vendor**:

* Assign budget per vendor (e.g., $10k/month for AWS)
* Automatic card decline if over-budget

## Implementation Guide

### 1. Set Up Corporate Expense Program

Create financial accounts for your expense management program:

```json
POST /v1/financial_accounts
{
  "type": "OPERATING",
  "nickname": "Corporate Expense Management - Operating Account"
}
```

Fund this account via ACH to provide liquidity for employee card spending.

### 2. Create Employee Account Holders

For each employee, create an account holder:

```json
POST /v1/account_holders
{
  "individual": {
    "first_name": "Alex",
    "last_name": "Rivera",
    "email": "alex.rivera@company.com",
    "phone_number": "+15555558765",
    "dob": "1988-11-30",
    "address": {
      "address1": "100 Market St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94105",
      "country": "USA"
    }
  },
  "external_id": "employee_id_12345",  // Link to HRIS system
  "tos_timestamp": "2024-01-30T10:00:00Z",
  "workflow": "KYC_EXEMPT"
}

```

### 3. Issue Employee Cards

**Issue virtual card for immediate use:**

```json
POST /v1/cards
{
  "type": "VIRTUAL",
  "account_token": "account_token",
  "state": "OPEN",
  "memo": "Employee Card - Alex Rivera - Marketing Dept"
}
```

Then configure spending controls using authorization rules (see Step 4 below).

**Issue physical card for in-person purchases:**

```json
POST /v1/cards
{
  "type": "PHYSICAL",
  "account_token": "account_token",
  "state": "OPEN",
  "product_id": "custom_corporate_card_program",
  "shipping_method": "STANDARD",
  "shipping_address": {
    "first_name": "Alex",
    "last_name": "Rivera",
    "address1": "100 Market St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94105",
    "country": "USA"
  }
}
```

### 4. Configure Authorization Rules

Set company-wide spending policies and employee-specific budget controls:

**Block Restricted Merchants** (program-wide):

```json
POST /v2/auth_rules
{
  "program_level": true,  // Apply to all cards
  "state": "ACTIVE",
  "type": "CONDITIONAL_ACTION",
  "parameters": {
    "conditions": [
      {
        "attribute": "MCC",
        "operation": "IS_ONE_OF",
        "value": ["5813", "7995", "7273", "5993"]  // Gambling, betting, prepaid
      }
    ],
    "action": "DECLINE"
  }
}
```

**Enforce Monthly Spending Cap** (per employee):

```json
POST /v2/auth_rules
{
  "account_tokens": ["account_token"],
  "state": "ACTIVE",
  "type": "VELOCITY_LIMIT",
  "parameters": {
    "filters": {
      "include_purchases": true,
      "include_withdrawals": false
    },
    "period_window": "MONTH",
    "limit_amount": 250000,  // $2,500 monthly budget
    "limit_count": null
  }
}
```

**Enforce Per-Transaction Limit** (per employee):

```json
POST /v2/auth_rules
{
  "account_tokens": ["account_token"],
  "state": "ACTIVE",
  "type": "CONDITIONAL_ACTION",
  "parameters": {
    "conditions": [
      {
        "attribute": "TRANSACTION_AMOUNT",
        "operation": "IS_GREATER_THAN",
        "value": 50000  // Decline transactions over $500
      }
    ],
    "action": "DECLINE"
  }
}
```

**Require Approval for Large Transactions**:

```json
POST /v2/auth_rules
{
  "account_tokens": ["account_token"],
  "type": "CONDITIONAL_ACTION",
  "parameters": {
    "conditions": [
      {
        "attribute": "TRANSACTION_AMOUNT",
        "operation": "IS_GREATER_THAN",
        "value": 100000  // Over $1,000
      }
    ],
    "action": "CHALLENGE"  // SMS authentication required
  }
}
```

### 5. Fund Employee Cards

Transfer funds from corporate operating account to employee cards:

```json
POST /v1/book_transfers
{
  "amount": 250000,  // $2,500 monthly budget
  "from_financial_account_token": "corporate_operating_account_token",
  "to_financial_account_token": "employee_issuing_account_token",
  "category": "BALANCE_OR_FUNDING",
  "subtype": "INTRA_CUSTOMER",
  "type": "TRANSFER",
  "memo": "Monthly expense budget - Alex Rivera - February 2024"
}
```

Alternatively, use prepaid model where corporate operating account backs all card spending without individual employee funding.

### 6. Monitor Employee Spending

Subscribe to webhooks for real-time transaction notifications:

```jsx
// Webhook listener
app.post("/webhooks/lithic", (req, res) => {
  const event = req.body;

  if (event.event_type === "transaction.created") {
    const transaction = event.payload;

    // Send notification to finance team
    sendSlackNotification(
      `New expense: ${transaction.merchant.descriptor} - $${transaction.amount / 100} by ${getEmployeeName(transaction.account_holder_token)}`,
    );

    // Request receipt from employee
    sendReceiptRequest(transaction.account_holder_token, transaction.token);

    // Update internal expense tracking
    logExpenseTransaction(transaction);
  }

  res.sendStatus(200);
});
```

Query transaction history:

```json
GET /v1/transactions?account_token={account_token}&begin=2024-02-01&end=2024-02-29
```

### 7. Generate Expense Reports

Pull transaction data and generate reports:

```jsx
// Fetch all transactions for employee for date range
const transactions = await lithic.transactions.list({
  account_token: employeeToken,
  begin: "2024-02-01",
  end: "2024-02-29",
});

// Group by category
const expenseReport = {
  employee: employeeName,
  period: "February 2024",
  categories: {
    "Meals & Entertainment": [],
    Travel: [],
    "Software & Subscriptions": [],
    "Office Supplies": [],
    Other: [],
  },
  total: 0,
};

transactions.data.forEach((txn) => {
  const category = mapMCCToCategory(txn.merchant.mcc);
  expenseReport.categories[category].push({
    date: txn.created,
    merchant: txn.merchant.descriptor,
    amount: txn.amount / 100,
    receipt: txn.receipt_url || null,
  });
  expenseReport.total += txn.amount;
});

// Export to accounting system
exportToQuickBooks(expenseReport);
```

### 8. Reconcile & Close Period

At month-end, reconcile all transactions:

```jsx
// Get all transactions with missing receipts
const unreconciled = await getTransactionsWithoutReceipts("2024-02");

// Notify employees to submit receipts
unreconciled.forEach((txn) => {
  sendReceiptReminder(txn.account_holder_token, txn.token);
});

// Flag disputed transactions
const disputed = await getDisputedTransactions("2024-02");

// Generate reconciliation report
const report = generateReconciliationReport({
  totalTransactions: allTransactions.length,
  totalAmount: sumTransactions(allTransactions),
  reconciled: reconciledTransactions.length,
  unreconciled: unreconciled.length,
  disputed: disputed.length,
  categorized: categorizedTransactions.length,
});

// Close accounting period
closeAccountingPeriod("2024-02", report);
```

## Use Cases

**Corporate Card Programs**: Replace traditional corporate credit cards with modern expense management and real-time controls.

**Startup Finance**: Provide employee cards with spend limits while maintaining tight budget control for resource-constrained startups.

**Remote Workforce**: Manage expenses for distributed teams with virtual cards, digital receipts, and automated reporting.

**Travel & Entertainment**: Issue travel-specific cards with higher limits, international support, and per diem enforcement.

**Contractor Spend**: Provide limited-use cards to contractors and freelancers with strict merchant and amount restrictions.

**Department Budgets**: Allocate budgets to Marketing, Sales, Engineering, etc. with separate card programs and spending controls.

**Project-Based Spend**: Issue cards tied to specific projects or initiatives with budget caps and automatic reconciliation.

**Subscription Management**: Track and control SaaS spending with vendor-specific virtual cards for each subscription.

## Related Documentation

* [Cards](https://docs.lithic.com/docs/cards)
* [Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2)
* [Account Holders](https://docs.lithic.com/docs/account-holders)
* [Financial Accounts](https://docs.lithic.com/docs/financial-accounts)
* [Book Transfers](https://docs.lithic.com/docs/book-transfers)
* [Transactions](https://docs.lithic.com/docs/transactions)
* [Events API and Webhooks](https://docs.lithic.com/docs/events-api)
* [Authorization Stream Access](https://docs.lithic.com/docs/auth-stream-access-asa)
* [Merchant Category Codes (MCC)](https://docs.lithic.com/docs/merchant-category-codes-mccs)
# Accounting & Ledger Impact

Learn how to track dispute-related funds flows based on your program type.

<Callout icon="📘" theme="info">
  This guide provides a high level overview of dispute accounting across different program types. For details specific to your program's configuration, including your exact funding construct and account setup, please reach out to your Lithic Customer Success Manager or refer to documentation provided during your onboarding process.
</Callout>

## Overview

Disputes create financial movements that you need to track for accounting, reconciliation, and cardholder balance management. How you do this depends on your program type:

* **PM (Program Managed)**: Lithic provides ledgering and handles network settlement on your behalf
* **PG (Processor Gateway) using Lithic Ledger**: You handle your own network settlement, but use Lithic's ledger to track accounts and their balances
* **PG bringing your own ledger**: You manage network settlement and use your own ledger

To aid with tracking or facilitating funds movements, Lithic provides you with:

* Dispute webhooks: Real-time updates about your disputes
* Disputes API: Programmatic access to retrieve disputes
* Settlement API: Network settlement reports showing chargebacks, representments, arbitrations, etc. at the line item and aggregate level

At a high level, your program must be able to:

* Issue, reverse, or write off provisional credits to your cardholders' accounts, if you are subject to Regulation E or Regulation Z *or* have opted in to granting provisional credits
* Make additional disbursements to cardholders upon dispute resolution
* Ensure your program account that funds provisional credits maintains a sufficient balance, if your program setup requires such an account
* Reconcile dispute financial activity to network settlement, if your program manages its own network settlement

### Quick Reference: What Lithic Handles

|                                                 | PM (Program Managed) | PG Using Lithic Ledger | PG Bringing Your Own Ledger |
| ----------------------------------------------- | -------------------- | ---------------------- | --------------------------- |
| **Provisional credits**                         | ✔️                   | ✔️                     |                             |
| **Resolution disbursements**                    | ✔️                   | ✔️                     |                             |
| **Network settlement (for dispute financials)** | ✔️                   |                        |                             |

## PM (Program Managed) Programs

### What Lithic Does

* Manages provisional credits for your cardholders
* Handles settlement with the network on your behalf

### What You Do

* For prepaid programs: ensure adequate funding is available to support provisional credits

### How Disputes Impact Your Ledger

#### Provisional Credits

Provisional credit events, denoted as CARDHOLDER\_LIABILITY events in the dispute object, trigger automatic ledger movements between accounts. When a provisional credit is granted, the cardholder account is credited. If the provisional credit is later reversed, the cardholder account is debited. The specific mechanism for this depends on your program's funding model.

**Prepaid:** Lithic executes [Book Transfers](/docs/book-transfers) between your Provisional Credit Account and your cardholders' accounts. Note: If your Provisional Credit Account has insufficient funds when a provisional credit needs to be issued, the book transfer will return a `DECLINED` status and you will need to fund the account for Lithic to retry.

**Credit or Charge:** Lithic executes [Management Operations](/docs/financial-transactions) between your Customer Account Payable and your cardholders' accounts.

#### Resolution Disbursements

When a dispute closes, the final resolution amount may differ from the provisional credit given out earlier. Typically, this is when the cardholder was given a smaller provisional credit than what they ultimately won. In these cases, Lithic will post a true-up accounting entry to ensure the cardholder is made whole for the correct amount. This takes the form of a **book transfer** for prepaid programs and a **management operation** for credit/charge programs.

Example 1: Cardholder was not granted a provisional credit initially, and won the dispute

* Provisional credit: $0
* Dispute outcome: Won $100
* True-up needed: Credit cardholder $100

Example 2: Cardholder was granted partial provisional credit initially, and won the dispute

* Provisional credit: $75
* Dispute outcome: Won $125
* True-up needed: Credit cardholder additional $50

Example 3: Cardholder was granted full provisional credit and won the dispute

* Provisional credit: $100
* Dispute outcome: Won $100
* True-up needed: None

### How Disputes Appear in Your API

You can tie each CARDHOLDER\_LIABILITY and FINANCIAL event within the [dispute lifecycle](https://docs.lithic.com/docs/tracking-disputes#tracking-via-api) to its downstream fund movement:

| Dispute Event Type    | API Endpoint                                                                                                                                            | What It Represents                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| CARDHOLDER\_LIABILITY | [Management Operation](https://docs.lithic.com/reference/getmanagementoperation) or [Book Transfer ](https://docs.lithic.com/reference/getbooktransfer) | Provisional credits to/from your cardholders' balances                                                                      |
| FINANCIAL             | [Settlement Details](https://docs.lithic.com/reference/getsettlementdetails)                                                                            | Individual chargebacks, representments, and so forth that impact the net amount you owe (or are owed) at network settlement |

**Note:** Only management operations and book transfers modify account balances on Lithic's ledger. Meanwhile, settlement details represent the dispute financials rolling up to the network settlement occurring between the card network and Lithic (on your behalf). These have no bearing on account balances and are solely for informational purposes.

## PG (Processor Gateway) Using Lithic Ledger

### What Lithic Does

* Manages provisional credits for your cardholders

### What You Do

* Manage your own network settlement and any post-settlement activities with your bank
* Ensure adequate funding is available to support provisional credits

### How Disputes Impact Your Ledger

#### Provisional Credits

Provisional credit events, denoted as CARDHOLDER\_LIABILITY events in the dispute object, trigger [management operations](https://docs.lithic.com/reference/getmanagementoperation) that transfer funds between your Program Receivables Account and your cardholders' accounts. Each CARDHOLDER\_LIABILITY event contains an `action` describing whether the provisional credit is being granted, reversed, or written off:

| Action                        | Account Debited     | Account Credited    |
| ----------------------------- | ------------------- | ------------------- |
| PROVISIONAL\_CREDIT\_GRANTED  | Program Receivables | Cardholder          |
| PROVISIONAL\_CREDIT\_REVERSED | Cardholder          | Program Receivables |
| WRITTEN\_OFF                  | N/A                 | N/A                 |

Note that management operations use the **original clearing date** of the disputed transaction, for interest calculation and Regulation Z compliance.

How you fund your Program Receivables Account depends on your specific funding setup. Funding may occur through daily ACH collections from your external bank account, sweeps from your Customer Accounts Payable, or external funding that you manage independently.

#### Resolution Disbursements

When a dispute closes, the final resolution amount may differ from the provisional credit given out earlier. Typically, this is when the cardholder was given a smaller provisional credit than what they ultimately won. In these cases, Lithic will post a true-up **management operation** to ensure the cardholder is made whole for the correct amount.

Example 1: Cardholder was not granted a provisional credit initially, and won the dispute

* Provisional credit: $0
* Dispute outcome: Won $100
* True-up needed: Credit cardholder $100

Example 2: Cardholder was granted partial provisional credit initially, and won the dispute

* Provisional credit: $75
* Dispute outcome: Won $125
* True-up needed: Credit cardholder additional $50

Example 3: Cardholder was granted full provisional credit and won the dispute

* Provisional credit: $100
* Dispute outcome: Won $100
* True-up needed: None

### Network Settlement

Card networks process chargebacks, representments, pre-arbitrations, and arbitrations. These dispute financial events incur settlement impact, because the network transfers material liability between issuer (you) and acquirer.

Dispute financial events themselves do *not* trigger immediate cash movement. Instead, on a periodic basis the network nets your dispute activity against all other activity (regular transactions, interchange, fees), then uses wire transfer to pull from or deposit into your bank's settlement account. **This occurs between the network and your bank, outside Lithic's visibility.** All subsequent handling of the funds post-settlement occur between you and your bank, also outside of Lithic's purview.

For instance, if your program’s activity for the day is a $50 purchase, a $60 chargeback, a $30 representment, and $4 in interchange, you will have $16 pulled from your bank settlement account. Using Lithic's Settlement Details, you can see which line items (the $50 purchase, the $60 chargeback, and so forth) rolled up into that final $16 wire transfer.

### How Disputes Appear in Your API

| Dispute Event Type    | API Endpoint                                                                      | Purpose                                                                                                               |
| --------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| CARDHOLDER\_LIABILITY | [Management Operation](https://docs.lithic.com/reference/getmanagementoperations) | Provisional credits to/from your cardholders' balances                                                                |
| FINANCIAL             | [Settlement Details](https://docs.lithic.com/reference/getsettlementdetails)      | Individual chargebacks, representments, and so forth that impact how much you owe (or are owed) at network settlement |

**Note:** Only management operations modify account balances on Lithic's ledger. Settlement details represent the dispute financials rolling up to the network settlement occurring between the card network and your bank. These have no bearing on account balances and are solely for reconciliation purposes.

## PG Bringing Your Own Ledger

### What Lithic Does

* Acts purely as a messenger for dispute updates

### What You Do

* Post all accounting entries in your own ledger based on dispute events
* Manage your own network settlement and any post-settlement activities with your bank

### How Disputes Appear in Your Ledger

Lithic does not sit in your funds flow; rather, funds flows are defined and managed at your program's discretion according to your requirements or preferences.

You can utilize the dispute lifecycle in the API and webhooks to trigger your accounting operations. Below is guidance on how you may want to respond to certain dispute events:

#### Provisional Credits

| Event                         | Your Recommended Action                                                     |
| ----------------------------- | --------------------------------------------------------------------------- |
| PROVISIONAL\_CREDIT\_GRANTED  | Grant provisional credit to cardholder and debit your offsetting account    |
| PROVISIONAL\_CREDIT\_REVERSED | Reverse provisional credit to cardholder and credit your offsetting account |
| WRITTEN\_OFF                  | Write off loss adjustment and finalize provisional credit to cardholder     |

Your offsetting account may be an account that you regularly fund and then draw down from when a provisional credit is issued. Or if your cardholder maintains a line of credit, you might temporarily write off their transaction (and any accrued interest) from their statement and outstanding balance. This will all vary based on your program setup.

#### Dispute Financial Events

The occurrence of a dispute financial event signals that liability has transferred between you and the acquirer and will be accounted for in the net settlement. Each FINANCIAL event is signed as DEBIT or CREDIT, where a debit is an outflow of funds to the acquirer and a credit is an inflow of funds from the acquirer.

The FINANCIAL event does *not* directly coincide with the settlement process itself; timing of settlement is determined between you and your bank, outside of Lithic's purview.

#### Resolution Disbursements

When a dispute closes, the final resolution amount may differ from the provisional credit given out earlier. Typically, this is when the cardholder was given a smaller provisional credit than what they ultimately won. In these cases, you are advised to post a true-up accounting entry to ensure the cardholder is made whole for the correct amount.

Example 1: Cardholder was not granted a provisional credit initially, and won the dispute

* Provisional credit: $0
* Dispute outcome: Won $100
* True-up needed: Credit cardholder $100

Example 2: Cardholder was granted partial provisional credit initially, and won the dispute

* Provisional credit: $75
* Dispute outcome: Won $125
* True-up needed: Credit cardholder additional $50

Example 3: Cardholder was granted full provisional credit and won the dispute

* Provisional credit: $100
* Dispute outcome: Won $100
* True-up needed: None

### Network Settlement

Card networks process chargebacks, representments, pre-arbitrations, and arbitrations. These dispute financial events incur settlement impact, as networks transfer material liability between issuer (you) and acquirer.

The network nets your dispute activity against all other activity (regular transactions, interchange, fees), then uses wire transfer to pull from or deposit into your bank's settlement account. **This occurs between the network and your bank, outside Lithic's visibility.**

All subsequent handling of the funds post-settlement occur between you and your bank, also outside of Lithic's purview.

## Reconciling Disputes

The [Settlement API](https://docs.lithic.com/docs/settlement-reporting) provides network settlement data for all program types. This helps you reconcile the financial impact of your dispute activity.

**Settlement Summary**: Aggregate view of settlement for each day. When `is_complete` is `true`, all Settlement Details for that day are available.

**Settlement Details**: Individual line items for each financial event (chargebacks, representments, etc.). Each Settlement Detail includes:

* `type`: The stage of the dispute
* `transaction_token`: The token of the dispute object
* `event_tokens`: Array containing the token(s) of the corresponding financial event(s) in the dispute object (e.g., a CHARGEBACK settlement detail references the CHARGEBACK financial event)

Using the `transaction_token` and `event_tokens`, you can tie a settlement line item back to the specific dispute by querying [this endpoint](https://docs.lithic.com/reference/getsettlementdetails).

**Note:** Provisional credit activity consists of internal transfers only and has no bearing on network settlement, so it is not included in the Settlement API.
# Overview

Understand what disputes are, why they matter, and how Lithic's managed disputes solution can serve you.

## Introduction to Disputes

A dispute occurs when a cardholder challenges the validity of a transaction that has posted to their account. This can happen for several reasons: the cardholder doesn't recognize the charge, didn't receive goods or services they paid for, was charged the wrong amount, or believes the transaction was fraudulent.

Disputes represent a critical moment in the cardholder experience. How quickly and effectively you handle disputes directly impacts cardholder satisfaction and trust. They also have significant financial implications—unresolved disputes can result in losses, and mismanaged disputes can lead to regulatory penalties.

### Types of Disputes

Disputes fall into four main categories based on the nature of the issue:

**Fraud Disputes** occur when a cardholder reports unauthorized transactions. This includes stolen cards, card-not-present fraud, counterfeit cards, or account takeover. These disputes typically receive the strongest consumer protections under both card network rules and federal regulations.

**Consumer Disputes** involve disagreements about goods or services. The cardholder received something different than what was promised, didn't receive it at all, or the merchant refused to issue a promised refund. These disputes require documentation showing what was expected versus what was delivered.

**Authorization Disputes** happen when there are problems with the authorization process itself. The transaction may have been processed without proper authorization, the cardholder was charged after authorization was declined, or the authorization amount didn't match the final charge.

**Processing Error Disputes** involve technical or administrative mistakes. Examples include duplicate charges, incorrect amounts, or transactions posted to the wrong account.

## Lithic's Managed Disputes Solution

Lithic provides a comprehensive, end-to-end disputes management service that removes the operational burden from your team while giving you full visibility into every dispute.

This diagram illustrates at a high level how Lithic facilitates disputes from initial reporting to resolution.

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/9c0bbc9ab56486b2_cfe48ccd24817560726631551fe93b8470b76b256a2c9a28a4cb289a51cab516-image.png" />

**Cardholder Dispute**: The cardholder reports fraud, merchant error, or transaction error to your customer support team.

**Dispute Portal**: Your customer support team uses the Lithic dashboard to submit a dispute.

**Dispute Decision Engine**: Determines chargeback eligibility, assesses write-off decisions based on thresholds set in dispute configuration, applies regulation requirements, and identifies the appropriate resolution route.

**Dispute Investigators**: If a manual review is required, Lithic agents investigate the dispute.

**Card Networks**: Process chargebacks, representments, pre-arbitrations, and arbitrations between your program and the acquirer representing the merchant.

**Dispute Resolution**: The dispute is resolved based on the investigation and network outcome.

**Dispute Credit Disbursement**: If applicable, a credit is issued to the cardholder.

### What Lithic Provides

**Full Dispute Resolution Management**: Once a dispute is initiated, Lithic handles the entire lifecycle. Our disputes team manages all interactions with the card networks, files chargebacks, responds to representments, handles pre-arbitration and arbitration, and works to achieve the best possible outcome for your program. Lithic agents will review representment evidence and proceed with pre-arbitration if we determine the provided evidence is inadequate to reverse the chargeback. You don't need to become an expert in network dispute rules or manage the back-and-forth with merchants and acquirers.

**Flexible Dispute Intake**: You have multiple options for entering disputes into our system. You can use the Lithic dashboard to initiate disputes yourself, empowering your customer service team to handle dispute intake directly. Alternatively, Lithic can provide dedicated customer support staffing to handle dispute intake on your behalf. Our agents can field cardholder calls, gather required information and documentation, and submit disputes into the system, acting as an extension of your team.

**Real-Time Visibility**: Every dispute update is available through the dashboard, API, and webhooks. As disputes progress through their lifecycle, from initial filing through chargeback, representment, arbitration, and final resolution, you'll receive real-time notifications. This visibility enables you to provide accurate status updates to cardholders, track dispute performance, and maintain proper accounting records.

**Integrated Ledgering**: If you use Lithic's ledger, accounting entries resulting from each dispute will automatically update your balances on the ledger. If you use your own ledger, you'll receive webhook events that provide the information you need to update your ledger.

**Network Expertise**: Lithic manages relationships and communications with the card networks, tracks performance and high-risk areas based on dispute patterns, and conducts recurring business reviews for your program.

### What You're Responsible For

**Cardholder Support**: Ensure cardholders can easily report disputes and provide the necessary information. This includes the transaction details, the reason for the dispute, supporting documentation (receipts, correspondence with merchants, police reports for fraud), and the cardholder's account and contact information. If you leverage Lithic's staffing for dispute intake, our agents will manage this for you.

**Decision Thresholds**: While Lithic handles the mechanics of issuing provisional credits through the ledger, you configure the thresholds for when to automatically grant provisional credits, file chargebacks, and so forth. These decisions should align with your obligations under Regulation E or Regulation Z.

**Regulatory Reporting**: Submit required reporting to your bank partners.

**Regulatory Requirements**: Fulfill any Regulation E and Regulation Z requirements (if applicable to your program) that were not configured during implementation due to your program type or preferences.

### Comparison with Lithic Chargebacks

See how Lithic Managed Disputes stacks against [Lithic Chargebacks](https://docs.lithic.com/docs/disputes-api).

| Dispute Step                              | Managed Disputes | Chargebacks |
| ----------------------------------------- | ---------------- | ----------- |
| Intake                                    | ✔️               |             |
| Investigation                             | ✔️               |             |
| Card network interactions                 | ✔️               | ✔️          |
| Resolution (write off, arbitrations, etc) | ✔️               |             |
| Disbursement (crediting cardholder)       | ✔️               |             |
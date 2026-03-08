# About Authorization Intelligence

An overview of Lithic's Authorization Intelligence framework for programmable, context-aware decisioning across every stage of the payment lifecycle.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/c4ce355390125c37_dfe60bef5a81d84c2b76e60208adb38c432f7aec33e0615c72c716bc78e8cad2-image.png)

# Overview

Authorization Intelligence is Lithic's framework for programmable payment decisioning. Static rules cannot distinguish a legitimate high-value purchase from a fraudulent one with similar surface characteristics. Authorization Intelligence addresses this limitation by incorporating context, permissions, and continuous risk signals into every authorization decision across the payment stack.

At its core is a unified decisioning engine that evaluates context-aware rules across every stage of the payment lifecycle. This engine operates across multiple payment form factors: card, ACH, and digital wallet. The same expressive rule logic, draft-and-promote lifecycle, and data signals apply whether the decision involves a card authorization, a 3DS authentication challenge, a digital wallet tokenization request, or an incoming ACH payment.

***

# Decisioning Across Your Payment Stack

Each touchpoint in the cardholder payment experience represents a distinct opportunity to intercept fraud. Earlier interception yields greater protection. Stopping a fraudulent digital wallet tokenization eliminates every fraudulent transaction that would have followed. Catching a suspicious card-not-present session with 3DS prevents a liability-shifted dispute before a card authorization ever occurs. If a fraudster does get past tokenization 2FA or a 3DS challenge, card authorization decisioning provides the most robust line of defense. For programs that also move money over ACH, the same decisioning framework extends to that rail as well.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/d1eb075558111b9f_233e28c0a318388468103238c509c3b6275b0ac6abf0d1eb84618952ea7edae7-image.png)

## Wallet Tokenization

When a cardholder attempts to add a card to Apple Pay, Google Pay, or Samsung Pay, Lithic programs can apply custom decisioning logic to that tokenization request in real time. You can evaluate requests against your own risk models and respond within milliseconds to **decline** the request outright or **require two-factor authentication** before proceeding.

This capability is critical because fraud on digital wallet cards is generally non-disputable. Digital wallet transactions usually shift the chargeback liability to the issuer, so stopping fraudulent tokenizations at the decisioning layer prevents unrecoverable losses.

Tokenization rules can evaluate requests against a rich set of attributes:

* **Wallet risk signals**: The wallet's account and device risk scores, its recommended decision, and the specific risk reasons behind that recommendation
* **Request context**: The tokenization channel (digital wallet vs. merchant), the source (manual provision, push provision, account on file), and the token requestor identity
* **Card state**: The current state of the card being tokenized

Lithic enforces a strict precedence rule: customer-configured rules can make decisions more restrictive than what the digital wallet recommends, but cannot override a wallet's decline.

There are two approaches to tokenization decisioning. [Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2) on the `TOKENIZATION` event stream provide no-code, Lithic-hosted decisioning. A [Tokenization Decisioning](https://docs.lithic.com/docs/tokenization-control) responder endpoint enables fully custom logic, similar to how ASA works for card transactions. Both approaches can be used together. Auth Rules handle standard rule sets, while the Tokenization Decisioning Responder handles complex, custom logic.

When two-factor authentication is required, Lithic can send the 2FA code on your behalf. Alternatively, Lithic can deliver the code to your systems via webhook so you can send it to cardholders yourself. See [2FA for Tokenization](https://docs.lithic.com/docs/2fa-for-tokenization) for details.

## 3D Secure Authentication

3D Secure (3DS) is an authentication protocol that verifies cardholder identity during online transactions. When merchants initiate 3DS, they collect over 150 data points about the cardholder's environment. These span device, cardholder, and merchant categories. The data is sent through the card network to the issuer for risk evaluation.

Successful 3DS authentication transfers fraud liability from the merchant to your program. This makes every authentication decision crucial for managing risk exposure.

<Callout icon="⚠️" theme="warning">
  Without a 3DS solution in place, the card network approves authentications on your behalf. This shifts liability to your program for transactions you had no input on. You also lose access to the comprehensive transaction data that could inform your later authorization decision.
</Callout>

Lithic provides two decisioning models:

* **[Lithic Decisioning](https://docs.lithic.com/docs/3ds-decisioning)**: Lithic's fraud engine handles all 3DS authentication decisions automatically. The model analyzes dozens of attributes, including account holder matching against KYC records, IP intelligence (VPN/proxy detection, geographic mismatches), and device data (locale, time zone, screen resolution, coordinates). These are weighed into a combined risk score. This model requires no integration work and provides immediate access to rich authentication data through webhooks.

* **[Customer Decisioning](https://docs.lithic.com/docs/3ds-customer-decisioning)**: Your organization maintains complete control over 3DS authentication decisions through a real-time decisioning endpoint. Lithic forwards the full authentication data to your system. Your endpoint must respond within one second with an approve, decline, or challenge decision. This model enables integration of proprietary risk rules, custom business logic, and internal data sources.

With either model, you can layer on [3DS Authentication Rules](https://docs.lithic.com/docs/3ds-authentication-rules) to enforce additional controls. These rules can target attributes like MCC, country, currency, transaction amount, risk score, and merchant ID. They follow the same draft → shadow mode → promote lifecycle as all Authorization Rules. Rules can decline authentications that the base decisioning model would approve, or trigger step-up challenges. The strictest decision across all evaluations is always applied.

When a challenge is warranted, Lithic supports three orchestration approaches:

* **Frictionless**: Approve or decline with no cardholder interaction
* **Lithic-orchestrated**: Lithic manages SMS one-time passcodes and the challenge UI
* **Customer-orchestrated**: You control the delivery method and experience end-to-end

See [3DS Challenge Flows](https://docs.lithic.com/docs/3ds-challenge-flow) for details.

Authentication and authorization are separate decision points, but Lithic evaluates 3DS data within the same transaction context. The `cardholder_authentication` object in the subsequent authorization request includes the liability shift status, authentication outcome, decision maker, and a linking token that correlates the authentication with its authorization. This eliminates the data fragmentation that occurs when these systems are separate. The intelligence gathered during 3DS directly informs the final authorization decision. Even after a successful 3DS authentication, you can still decline the authorization via ASA or Auth Rules.

## Card Authorizations

Card authorization provides the broadest set of risk signals and the most expressive rule logic. Lithic's [Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2) engine supports two rule types on the `AUTHORIZATION` event stream:

**Conditional Action Rules** decline or challenge transactions based on combinations of conditions. Available attributes include:

* **Merchant attributes**: MCC, country, currency, merchant ID, and descriptor (with regex pattern matching for merchant name variations)
* **Transaction attributes**: Transaction amount, cash amount, liability shift status, PAN entry mode, wallet type, and transaction initiator (cardholder, merchant, or unknown)
* **Risk signals**: Network-provided risk score (0–999 scale), address verification (AVS) result, and PIN status
* **Behavioral signals**: Card transaction count in the trailing 15 minutes, 1 hour, and 24 hours
* **Card attributes**: Current card state and whether a PIN was entered

New attributes are added regularly. For the most up-to-date list, see the [Auth Rules API specification](https://docs.lithic.com/reference/post_v2-auth-rules).

Conditions within a single rule use AND logic. The transaction must match all conditions to trigger the action. For OR logic, create separate rules for each condition set. Multiple rules can be defined at each entity level (program, account, card). When multiple rules apply, the most restrictive outcome takes precedence.

**Velocity Limit Rules** restrict the number or value of transactions within a specified time period. Limits can be set by transaction count, total spend amount, or both. Tracking can be scoped per card or per account. Time periods can be calendar-based (daily, weekly, monthly, yearly, resetting at midnight ET) or rolling custom windows defined in seconds. Velocity limits can also be filtered to count only transactions at specific MCCs, in specific countries, or with specific PAN entry modes.

**[Auth Stream Access (ASA)](https://docs.lithic.com/docs/auth-stream-access-asa)** provides a real-time HTTP interface to the authorization stream for programs that need fully custom authorization logic. Lithic delivers the full transaction payload to your registered endpoint. This includes transaction details, merchant information, card data, authentication context, point-of-sale data, fleet information, and network-specific fields. Your system can inject account-level signals from your own data, such as recent password changes, suspicious login attempts, or proprietary risk scores. Responses include a granular decline reason (`SUSPECTED_FRAUD`, `INSUFFICIENT_FUNDS`, `UNAUTHORIZED_MERCHANT`, `VELOCITY_EXCEEDED`, etc.) and must be returned within 6 seconds.

Auth Rules and ASA work together. Any applicable Auth Rules are evaluated before the ASA request is sent. A transaction that violates an Auth Rule is declined before it reaches your endpoint.

## ACH Payments

The same decisioning framework extends beyond card rails into ACH. [ACH Auth Rules](https://docs.lithic.com/docs/ach-auth-rules) operate on the `ACH_CREDIT_RECEIPT` and `ACH_DEBIT_RECEIPT` event streams. These rules control which ACH payments are received by your financial accounts.

ACH rules evaluate payments based on the originator's company name and company ID, transaction amount, SEC code, timestamp, and memo field. Each rule specifies an action: **APPROVE** to accept matching payments or **RETURN** to reject them with a NACHA return code. If both APPROVE and RETURN rules match a single payment, Lithic applies the stricter action and returns the payment.

All ACH Debit Receipts are returned by default until you create APPROVE rules to accept them. This prevents unauthorized debits from reaching your accounts. You can take a whitelist approach and selectively approve known originators per account. Alternatively, you can approve all debits at the program level and add stop-payment RETURN rules as needed.

ACH Auth Rules follow the same draft-and-promote workflow as card authorization rules. Rules are created in an inactive state, reviewed, and then promoted to begin affecting live payments.

***

# Safe Iteration

A common failure mode in authorization decisioning is a rule change that backfires. Too restrictive and you decline valid transactions. Too permissive and fraud slips through before you catch it. Lithic's decisioning platform is built with testability as a core requirement.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/b8412f68cf10b171_b5c61ab27b15bad0ed78053b03972d509ee583d1112477380e525f5278168392-image.png)

## Shadow Mode

Authorization Rules are created in a draft state and must be explicitly promoted before they affect live transactions. In shadow mode, draft rules evaluate against live traffic without influencing outcomes. This lets you measure real-world impact before bringing a rule live and catch unintended consequences before anything touches a real authorization.

## Performance Reports

Performance reports provide daily statistics for both current (active) and draft versions of each rule. These include approval, decline, and challenge counts along with sample events. Reports cover up to 3 months of history and can be retrieved at any time through the API.

## Backtesting

[Backtesting](https://docs.lithic.com/docs/backtesting-authorization-rules) replays a rule against months of historical transactions. This compresses what would otherwise be an extended shadow observation period into a much shorter feedback cycle. You specify a time range, and Lithic simulates how the rule would have performed against every transaction in that window. Results include approval, decline, and challenge counts for both the current and draft versions, along with specific transaction examples. Backtest results are delivered asynchronously via webhook.

## Observability

Every rule evaluation is logged with both machine-readable decline codes and human-readable explanations. When a transaction is declined, the [`rule_results`](https://docs.lithic.com/reference/get_v2-auth-rules-results) object on the transaction identifies exactly which rule triggered and why. This matters for troubleshooting, for cardholder support, and for compliance and audit requirements. Descriptive rule naming makes this especially useful. A decline attributed to "Block: High-Value Gaming Transactions" is immediately actionable for a support agent.

***

# Define Rules Your Way

Programs leveraging Lithic's decisioning platform vary widely in team composition and technical capacity. Lithic supports multiple ways to express Authorization Rules to match how your team actually works.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/d7b8e1e0c262ea8d_e9d89f23d14e61df7fadfd4679edaa0c2e1ef2ff09fb81f9499ba3f0511c2f4d-image.png)

## API and Dashboard

Authorization Rules can be created and managed through the [API](https://docs.lithic.com/reference/post_v2-auth-rules) or the [Lithic Dashboard](https://docs.lithic.com/docs/lithic-dashboard-rules-ui). The Dashboard provides a visual interface for building, editing, and monitoring rules without writing code. Both interfaces support the full rule lifecycle: creation, shadow mode, promotion, backtesting, and performance reporting.

The Dashboard's step-by-step rule creation flow guides users through attribute selection, operation selection, and value configuration. Rules can be scoped to the program, specific accounts, or specific cards. Program-level rules can optionally exclude individual cards.

***

# Next Steps

<Callout icon="📘" theme="info">
  Ready to start building? Explore these resources to go deeper on each capability.
</Callout>

* **[Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2)** — Create and manage Lithic-hosted decisioning rules for card transactions, 3DS, tokenization, and ACH.
* **[Auth Stream Access (ASA)](https://docs.lithic.com/docs/auth-stream-access-asa)** — Build fully custom authorization logic by integrating your own decisioning endpoint.
* **[Backtesting Authorization Rules](https://docs.lithic.com/docs/backtesting-authorization-rules)** — Simulate rule impacts on historical transactions before deploying.
* **[Dashboard Rules UI](https://docs.lithic.com/docs/lithic-dashboard-rules-ui)** — Manage rules visually in the Lithic Dashboard.
* **[About 3DS](https://docs.lithic.com/docs/about-3ds)** — Understand how 3DS works and why it matters for your card program.
* **[3DS Lithic Decisioning](https://docs.lithic.com/docs/3ds-decisioning)** — Let Lithic's fraud engine handle 3DS authentication automatically.
* **[3DS Customer Decisioning](https://docs.lithic.com/docs/3ds-customer-decisioning)** — Take full control of 3DS authentication with your own decisioning endpoint.
* **[3DS Authentication Rules](https://docs.lithic.com/docs/3ds-authentication-rules)** — Layer additional controls on top of either 3DS decisioning model.
* **[ACH Auth Rules](https://docs.lithic.com/docs/ach-auth-rules)** — Apply authorization logic to incoming ACH payments.
* **[Tokenization Decisioning](https://docs.lithic.com/docs/tokenization-control)** — Build custom decisioning logic for digital wallet tokenization requests.
* **[2FA for Tokenization](https://docs.lithic.com/docs/2fa-for-tokenization)** — Configure how two-factor authentication codes are delivered during tokenization.
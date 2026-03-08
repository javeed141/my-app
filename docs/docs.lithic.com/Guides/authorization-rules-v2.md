# Authorization Rules

Learn how to create, update and apply customizable Lithic-hosted authorization decisioning to card transactions, 3DS authentication, tokenization, and ACH payments.

# Intro

Authorization Rules are a flexible, Lithic-hosted solution designed to give card programs detailed control over transaction authorizations. By allowing the creation of rules based on high-signal attributes like MCC, country, currency, risk score, and more, they provide a powerful tool for enforcing business-specific authorization logic at the program, account, or card level. Whether you need to block transactions based on geographic location, restrict certain merchants, or apply spending limits, Authorization Rules enable precise decision-making without the complexity of additional infrastructure.

A key feature of Authorization Rules is shadow mode, which allows you to safely test draft rules without impacting live transactions. In shadow mode, rules observe the authorization stream, logging how they would have affected approvals and declines, giving you the ability to fine-tune rules before activating them. Once a draft rule is promoted, it immediately begins affecting transaction outcomes.

In addition to transaction-specific decisioning logic, velocity limits can be defined to control transaction volume or spend over set periods, helping prevent unauthorized usage and enforce compliance policies.

To ensure your rules are performing as expected, performance reports provide detailed insights into approval and decline rates, with specific transaction examples. Reports are computed daily and can be retrieved immediately at any time, helping you continuously optimize your rule configurations.

Authorization Rules also integrate seamlessly with Lithic’s Authorization Stream Access (ASA), enabling businesses to handle more complex decision-making through a combination of Lithic-hosted rules and custom ASA logic.

Beyond card transaction authorization, the Auth Rules engine supports multiple event streams, each enabling decisioning for different payment flows:

* **Tokenization Rules** allow you to control how digital wallet and merchant tokenization requests are decisioned. Operating on the `TOKENIZATION` event stream, they use the same `CONDITIONAL_ACTION` rule type and follow the same draft → shadow mode → promote lifecycle. This enables you to define conditions that decline tokenization requests or require two-factor authentication (TFA) before a card can be added to a digital wallet.

* **3DS Authentication Rules** allow you to control how 3D Secure authentication requests are decisioned. Operating on the `THREE_DS_AUTHENTICATION` event stream, they can decline authentication requests or trigger step-up challenges based on attributes like MCC, country, transaction amount, and risk score.

* **ACH Auth Rules** allow you to control which ACH payments are received by your financial accounts. Operating on the `ACH_CREDIT_RECEIPT` and `ACH_DEBIT_RECEIPT` event streams, they can approve or return incoming ACH transactions based on originator details, amount, and SEC code. For full details, see [ACH Auth Rules](https://docs.lithic.com/docs/ach-auth-rules).

# Defining Authorization Rules

## Rule Configuration

Before diving into the process of drafting and managing Authorization Rules, it's essential to understand the types of rules that can be created, the available options for defining them, and the limitations of different rule templates. Lithic offers various rule configurations to meet your program’s specific authorization logic needs.

## Types of Authorization Rules

Authorization Rules can be categorized based on the type of action they enforce on transactions. The two primary types of rules are:

* **CONDITIONAL\_ACTION**: This rule type allows you to take action based on a set of conditions. The available actions depend on the event stream:

  * `AUTHORIZATION`: Decline or challenge (SMS step-up) transactions
  * `THREE_DS_AUTHENTICATION`: Decline or challenge 3DS authentication requests
  * `TOKENIZATION`: Decline tokenization requests or require two-factor authentication (TFA)
  * `ACH_CREDIT_RECEIPT` / `ACH_DEBIT_RECEIPT`: Approve or return ACH transactions with a NACHA return code

  The event stream is specified via the `event_stream` field when creating the rule. A transaction will be actioned if it meets **all** the conditions defined in the rule.

* **VELOCITY\_LIMIT**: These rules place restrictions on the number or value of transactions allowed within a specified time period. Velocity limits help control excessive spending or manage fraud risks by enforcing limits on how frequently or how much a card can be used. Velocity limits operate on the `AUTHORIZATION` event stream.

### Event Streams Overview

The following table summarizes which rule types and actions are available on each event stream:

| Event Stream              | Rule Types                             | Available Actions        |
| ------------------------- | -------------------------------------- | ------------------------ |
| `AUTHORIZATION`           | `CONDITIONAL_ACTION`, `VELOCITY_LIMIT` | `DECLINE`, `CHALLENGE`   |
| `THREE_DS_AUTHENTICATION` | `CONDITIONAL_ACTION`                   | `DECLINE`, `CHALLENGE`   |
| `TOKENIZATION`            | `CONDITIONAL_ACTION`                   | `DECLINE`, `REQUIRE_TFA` |
| `ACH_CREDIT_RECEIPT`      | `CONDITIONAL_ACTION`                   | `APPROVE`, `RETURN`      |
| `ACH_DEBIT_RECEIPT`       | `CONDITIONAL_ACTION`                   | `APPROVE`, `RETURN`      |

## Conditional Action Rules

A *conditional action* rule lets you take action on transactions based on a combination of conditions. On the `AUTHORIZATION` event stream, a conditional action can either **decline** or **challenge** (trigger an SMS-based step-up authentication) a transaction. These conditions help you create granular controls over the authorization process.

To create a conditional action rule, you must define:

1. **Attributes**: The characteristics of the transaction (e.g., MCC, country, currency).
2. **Operation**: The logical operation to be applied (e.g., IS\_ONE\_OF, IS\_GREATER\_THAN).
3. **Values**: The specific values that trigger the condition (e.g., "USD", 500).

By specifying these parameters, you can create precise rules tailored to the specific needs of your card program. For example, a US card program may want to block all foreign currency transactions. This can be achieved by defining a rule with:

**Action:**: `DECLINE`

1. **Attribute**: `Currency`
2. **Operation**: `IS_NOT_ONE_OF`
3. **Value**: `USD`

As defined, this rule would block any transaction where the currency is not USD.

### Conditional Action Attributes

> 📘 Check our [API spec](https://docs.lithic.com/reference/post_v2-auth-rules) for the most up-to-date information!
>
> We're adding new decisionable attributes all the time. For the latest and best information about the functionality available for Authorization Rules, please check our API spec.

Below are the available attributes for defining a conditional action rule on the `AUTHORIZATION` event stream:

* **Merchant Category Code (MCC)**: A four-digit number listed in ISO 18245 that classifies a business by the types of goods or services it provides.

* **Country**: The country of the card acceptor entity.

* **Currency**: The 3-character alphabetic ISO 4217 code for the merchant currency of the transaction.

* **Merchant ID**: The unique alphanumeric identifier for the payment card acceptor (merchant).

* **Descriptor**: The short description of the card acceptor.

* **Liability Shift**: Indicates whether chargeback liability shift to the issuer applies to the transaction.

* **PAN Entry Mode**: The method by which the cardholder's primary account number (PAN) was entered.

* **Transaction Amount**: The amount of the transaction in the cardholder billing currency.

* **Risk Score**: The network-provided score assessing risk level associated with a given authorization.

* **Card State**: The current state of the card associated with the transaction.

* **PIN Entered**: Indicates whether a PIN was entered during the transaction.

* **PIN Status**: The current state of the card's PIN.

* **Wallet Type**: For transactions using a digital wallet token, indicates the source of the token.

* **Card Transaction Count 15M**: The number of transactions on the card in the trailing 15 minutes before the authorization.

* **Card Transaction Count 1H**: The number of transactions on the card in the trailing hour up and until the authorization.

* **Card Transaction Count 24H**: The number of transactions on the card in the trailing 24 hours up and until the authorization.

* **Address Match**: The result of address verification (AVS) for the transaction. Possible values: `MATCH`, `MATCH_ADDRESS_ONLY`, `MATCH_ZIP_ONLY`, `MISMATCH`, `NOT_PRESENT`.

* **Cash Amount**: The cash amount of the transaction in minor units (cents). Useful for identifying cash-back transactions.

* **Transaction Initiator**: Indicates who initiated the transaction. Possible values: `CARDHOLDER`, `MERCHANT`, `UNKNOWN`.

<br />

### Conditional Action Operations

Below are the available operations for defining conditions in a conditional authorization action rule:

#### List Operations

Use with an array of strings as the value. Applies to string attributes like:`COUNTRY`, `CURRENCY`, `PAN_ENTRY_MODE`, etc.

| Operation       | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `IS_ONE_OF`     | Matches if the attribute value equals any value in the provided list.         |
| `IS_NOT_ONE_OF` | Matches if the attribute value does not equal any value in the provided list. |

#### Numeric Operations

Use with a number as the value. Applies to `TRANSACTION_AMOUNT`, `CASH_AMOUNT`, `RISK_SCORE`, etc.

| Operation                     | Description                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `IS_EQUAL_TO`                 | Matches if the attribute value equals the provided number.                      |
| `IS_NOT_EQUAL_TO`             | Matches if the attribute value does not equal the provided number.              |
| `IS_GREATER_THAN`             | Matches if the attribute value is greater than the provided number.             |
| `IS_GREATER_THAN_OR_EQUAL_TO` | Matches if the attribute value is greater than or equal to the provided number. |
| `IS_LESS_THAN`                | Matches if the attribute value is less than the provided number.                |
| `IS_LESS_THAN_OR_EQUAL_TO`    | Matches if the attribute value is less than or equal to the provided number.    |

#### String Pattern Operations

Use with a regular expression string as the value.

| Operation        | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| `MATCHES`        | Matches if the attribute value matches the provided regular expression pattern.        |
| `DOES_NOT_MATCH` | Matches if the attribute value does not match the provided regular expression pattern. |

**Regular Expression Matching**

The `MATCHES` and `DOES_NOT_MATCH` operations use regular expression (regex) patterns for flexible string matching. This is particularly useful for matching merchant descriptors that may have variations in formatting.

* Patterns follow [standard regex syntax](https://en.wikipedia.org/wiki/Regular_expression#Syntax)
* Matching is case-sensitive by default
* Patterns match against the full attribute value

**Examples:**

| Pattern             | Description                 | Matches                          | Does Not Match      |
| ------------------- | --------------------------- | -------------------------------- | ------------------- |
| `(?i)amazon`        | Case-insensitive match      | `AMAZON`, `amazon`, `Amazon`     | `AMZN`              |
| `UBER(EATS\|TRIP)?` | Optional group matching     | `UBER`, `UBEREATS`, `UBERTRIP`   | `UBER EATS`, `uber` |
| `TST\*.*`           | Starts with "TST\*" (Toast) | `TST*RESTAURANT`, `TST*CAFE NYC` | `TOAST`, `tst*cafe` |

### Combining Multiple Conditions into Rules

Lithic’s Authorization Rules can be combined to create complex logic tailored to your unique program requirements.

You can define multiple conditional parameters within a single rule to create scenarios where transactions are blocked only if they meet ***all*** of the specified criteria. For example, if a US card program wants to block most foreign currency transactions but still allow those with a very low network risk score, they could define a rule with the following parameters:

**Rule:**

***Conditional Parameters 1:***

1. **Attribute**: `Currency`
2. **Operation**: `IS_NOT_ONE_OF`
3. **Value**: `USD`

***Conditional Parameters 2:***

1. **Attribute**: `Risk Score`
2. **Operation**: `IS_GREATER_THAN`
3. **Value**: `200`

This single rule will decline transactions which are placed in a foreign currency ***AND*** which have a network risk score greater than 200. Foreign currency transactions with a network risk score below 200 will not be declined because they do not meet all the criteria defined in the rule.

The Lithic Authorization Rules product allows for multiple rules to be defined at each entity level (card program, account, and card). To create an authorization scenario where transactions will be declined if ***any*** of the parameters are met, simply create multiple rules with each rule housing a single parameter definition. To give an example, if a US card program wanted to block transactions place in a foreign currency *OR* transactions which have anything over a very low network risk score, they could define two separate rules like:

***Rule 1:***

Conditional Parameters:

1. **Attribute**: `Currency`
2. **Operation**: `IS_NOT_ONE_OF`
3. **Value**: `USD`

***Rule 2:***

Conditional Parameters:

1. **Attribute**: `Risk Score`
2. **Operation**: `IS_GREATER_THAN`
3. **Value**: `200`

By separating these two sets of parameters into two distinct rules, Lithic will now decline transactions which are either in a foreign currency ***OR*** have a network risk score above 200.

Through the combination of multiple rules per entity and the use of complex, multi-parameter individual rules, card programs can design unique authorization criteria that precisely enforce their desired logic, all hosted on Lithic’s infrastructure.

## 3DS Authentication Rules

3DS Authentication Rules give you control over how 3D Secure authentication requests are decisioned. These rules use the `CONDITIONAL_ACTION` rule type with the `event_stream` set to `THREE_DS_AUTHENTICATION` and follow the same draft → shadow mode → promote lifecycle as authorization rules.

### 3DS Authentication Rule Actions

When a 3DS authentication rule’s conditions are met, one of two actions can be taken:

* **DECLINE** — Reject the authentication request outright.
* **CHALLENGE** — Trigger a step-up challenge, requiring the cardholder to complete additional authentication before the transaction can proceed.

### 3DS Authentication Rule Attributes

The following attributes are available for defining conditions on 3DS authentication rules:

* **Merchant Category Code (MCC)**: A four-digit number listed in ISO 18245 that classifies the merchant.
* **Country**: The country of the card acceptor entity.
* **Currency**: The 3-character alphabetic ISO 4217 currency code.
* **Merchant ID**: The unique alphanumeric identifier for the merchant.
* **Descriptor**: The short description of the card acceptor.
* **Transaction Amount**: The amount of the transaction in the cardholder billing currency.
* **Risk Score**: The network-provided authentication risk level (Mastercard only).
* **Message Category**: The category of authentication being processed.
* **Address Match**: The result of address verification for the transaction.

<Callout icon="📘" theme="info">
  Check our [API spec](https://docs.lithic.com/reference/post_v2-auth-rules) for the most up-to-date list of 3DS attributes.
</Callout>

## Velocity Limit Rules

A Velocity Limit rule restricts the number or value of transactions within a specified timeframe. These rules can be used to manage spending and prevent excessive usage.

### Velocity Limit Parameters

To create a velocity limit rule, you must define:

* **Scope**: The entity level at which velocity is tracked — either `CARD` (per-card) or `ACCOUNT` (per-account). For example, a card-scoped velocity limit of $500/day tracks each card's spend independently, while an account-scoped limit tracks the combined spend across all cards on the account.

* **Limits**: You can set one or both of the following on a single rule:
  * **`limit_amount`**: Maximum total spend allowed within the period, in cents. Set to `null` for no amount limit.
  * **`limit_count`**: Maximum number of transactions allowed within the period. Set to `null` for no count limit.

* **Period**: The time window for tracking velocity. Options include:

  | Period Type | Description                        | Configuration Options                            |
  | ----------- | ---------------------------------- | ------------------------------------------------ |
  | `DAY`       | Resets daily at 00:00 ET           | —                                                |
  | `WEEK`      | Resets weekly at 00:00 ET          | `day_of_week` (1=Mon through 7=Sun, default 1)   |
  | `MONTH`     | Resets monthly at 00:00 ET         | `day_of_month` (1–31, default 1)                 |
  | `YEAR`      | Resets annually at 00:00 ET        | `month` (1–12) and `day_of_month` (1–31)         |
  | `CUSTOM`    | Rolling window, defined in seconds | `duration` (10 to 2,678,400 seconds / \~31 days) |

* **Filters** (optional): Narrow which transactions count toward the velocity limit:
  * `include_mccs` / `exclude_mccs` — Filter by Merchant Category Code
  * `include_countries` / `exclude_countries` — Filter by country (ISO 3166-1 alpha-3)
  * `include_pan_entry_modes` — Filter by PAN entry mode

### Velocity Limit Example

The following example creates a velocity limit that restricts each card to $400 in ATM withdrawals per day:

```json
{
  "name": "Daily ATM withdrawal limit",
  "program_level": true,
  "type": "VELOCITY_LIMIT",
  "parameters": {
    "scope": "CARD",
    "period": {
      "type": "DAY"
    },
    "limit_amount": 40000,
    "limit_count": null,
    "filters": {
      "include_mccs": ["6011"]
    }
  }
}
```

Velocity limits are highly effective in controlling how often or how much a card is used, especially for fraud prevention, managing budgets, or enforcing compliance requirements.

<Callout icon="📘" theme="info">
  Contrary to legacy Lithic [spend limits](https://docs.lithic.com/docs/spend-limits), setting a velocity limit rule value of `0` will **block** authorizations for applicable transactions. To exempt a card from a velocity limit rule, instead use the `excluded_card_tokens` feature.
</Callout>

## Tokenization Rules

Tokenization Rules give you control over whether a card can be added to a digital wallet (Apple Pay, Google Pay, Samsung Pay, etc.) or stored by a merchant.

Tokenization Rules use the `CONDITIONAL_ACTION` rule type with the event\_stream set to `TOKENIZATION`. Like authorization rules, they follow the same draft → shadow mode → promote lifecycle.

Tokenization Rules via Auth Rules provide a no-code, Lithic-hosted way to control tokenization decisioning. For customers who need fully custom decisioning logic — such as incorporating external data sources or proprietary risk models — Lithic also offers external customer [Tokenization Decisioning](https://docs.lithic.com/docs/tokenization-control), which works similarly to Authorization Stream Access (ASA). Both approaches can be used together: Auth Rules handle standard rule sets, while the Tokenization Decisioning Responder handles complex, custom logic.

### Tokenization Rule Actions

When a tokenization rule's conditions are met, one of two actions can be taken:

* **DECLINE** — Reject the tokenization request outright. The cardholder will not be able to add the card to the wallet or merchant.
* **REQUIRE\_TFA** — Require the cardholder to complete two-factor authentication before the tokenization can proceed. The cardholder will be prompted to verify their identity via SMS, email, or in-app authentication.

Each action can optionally include a `reason` code for internal tracking and observability. Common reason codes include:

* **DECLINE reasons**: `ACCOUNT_SCORE_1`, `DEVICE_SCORE_1`, `CVC_MISMATCH`, `GENERIC_DECLINE`, `CARD_INVALID_STATE`
* **REQUIRE\_TFA reasons**: `SUSPICIOUS_ACTIVITY`, `HIGH_RISK`, `TOO_MANY_RECENT_ATTEMPTS`, `CUSTOMER_RULE_TFA`

See the [API spec](https://docs.lithic.com/reference/post_v2-auth-rules) for the full list of available reason codes.

### Tokenization Rule Attributes

<Callout icon="📘" theme="info">
  For more details on supported values for tokenization rules please contact your Customer Success Manager or Lithic Support.
</Callout>

Tokenization rules can evaluate conditions based on the following attributes. For the full list of valid values for each attribute, see the [API spec](https://docs.lithic.com/reference/post_v2-auth-rules).

* `TOKENIZATION_CHANNEL`: The channel of the request — digital wallet or merchant tokenization
* `TOKENIZATION_SOURCE`: How the cardholder initiated the tokenization (e.g., manual provision, push provision, account on file)
* `TOKEN_REQUESTOR_NAME`: The entity requesting the token (e.g., Apple Pay, Google Pay, Samsung Pay, a specific merchant)
* `TOKEN_REQUESTOR_ID`: Unique identifier for the token requestor
* `WALLET_ACCOUNT_SCORE`: The digital wallet's risk assessment of the end user's account
* `WALLET_DEVICE_SCORE`: The digital wallet's risk assessment of the end user's device
* `WALLET_RECOMMENDED_DECISION`: The decision recommended by the digital wallet provider
* `WALLET_RECOMMENDATION_REASONS`: Specific risk signals provided by the wallet for its recommendation
* `WALLET_TOKEN_STATUS`: The current status of the wallet token
* `CARD_STATE`: The current state of the card being tokenized
* `TIMESTAMP`: The timestamp of the tokenization request

The same conditional operators available for authorization rules (`IS_ONE_OF`, `IS_LESS_THAN`, `CONTAINS_ANY`, etc.) are also available for tokenization rules.

### Wallet Decisioning Precedence

Lithic will never allow a more permissive tokenization decision than what the digital wallet recommends. Customer-configured tokenization rules can make decisions **more restrictive** — for example, declining a request the wallet would have approved, or requiring TFA when the wallet recommended approval — but cannot override a wallet's decline. If the wallet recommends declining a tokenization, the request will be declined regardless of any customer rules.

## Rule Limitations and Considerations

While Authorization Rules are highly customizable, there are some limitations and best practices to consider when defining your rules:

* **Compliance with Card Network Policies**: When using block rules such as MCC or country restrictions, ensure that they comply with your cardholder agreement terms. Restrictions beyond what is stated in your agreement may require additional steps to remain compliant with card network policies. If needed, reach out to your Customer Success representative for further assistance.
* **Conflict Resolution**: When multiple rules apply to a transaction at different entity levels (program, account, or card), the most restrictive rule will take precedence. For instance, if a program-level rule allows transactions in all countries, but a card-level rule restricts transactions to the US, transactions on that card will only be allowed in the US.
* **Rule Testing**: It is essential to use shadow mode and performance reports to test rule logic before activation. Poorly defined rules can result in unintended transaction declines, especially when combining multiple conditions.
* **Velocity Limit Computation**: While velocity limits are enforced based on authorized and settled volume, they are not recommended to be used for balance or reconciliation-level accuracy. Velocity limit computation is eventually consistent - which may result in exceeding the limit in some edge cases. For balance or reconciliation-level accuracy, please see our [balances](https://docs.lithic.com/docs/balances) product for more detail.
* **Tokenization Rule Precedence**: Lithic applies its own internal tokenization security rules in addition to customer-configured rules. Lithic will never allow a more permissive tokenization decision than what the digital wallet recommends. If a wallet recommends declining a tokenization, customer rules cannot override that to approve it.
* **Lithic-Managed Rules**: Some rules in your program may be flagged as `lithic_managed`. These rules are managed by Lithic and cannot be modified or deleted through the API or Dashboard. They will appear in rule listings and rule results but are not editable.
* **Rule Naming**: Rules support an optional `name` field (max 1,024 characters). Assigning descriptive names is strongly recommended — rule names appear in `rule_results` on declined transactions, making it much easier to identify which rule caused a decline.

# Creating and Managing Authorization Rules

## Drafting a New Authorization Rule

Drafting a new authorization rule is the first step in creating custom authorization logic for your program, account, or card. When you draft a rule, it runs in **shadow mode**, meaning it observes live transactions without affecting authorization outcomes. This allows you to see how the rule would perform in real-world conditions before fully activating it.

### Create a Draft Rule

To draft a new rule, use the `POST /v2/auth_rules` endpoint. You’ll specify the parameters that define your rule, such as the transaction attributes (e.g., MCC, country, risk score) that will be evaluated. The rule will be created in draft mode and will begin running in shadow mode immediately, allowing you to measure its impact without affecting live authorizations.

Rules can be scoped to one of three entity levels:

* **Program level**: Set `program_level: true` to apply the rule across the entire card program. Optionally use `excluded_card_tokens` to exempt specific cards.
* **Account level**: Provide `account_tokens` and/or `business_account_tokens` to apply the rule to specific accounts.
* **Card level**: Provide `card_tokens` to target specific cards.

**Example Request:**

```json
{
  "name": "Block gambling MCCs",
  "program_level": true,
  "type": "CONDITIONAL_ACTION",
  "event_stream": "AUTHORIZATION",
  "parameters": {
    "action": "DECLINE",
    "conditions": [
      {
        "attribute": "MCC",
        "operation": "IS_ONE_OF",
        "value": ["7801", "7802", "7995"]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  To see all information about creating authorization rules, see the full API specification [here](https://docs.lithic.com/reference/post_v2-auth-rules).
</Callout>

In this example, the rule is created to decline transactions at gambling-related Merchant Category Codes (MCC) and is applied at the program level. You can adjust the parameters to match your specific use case, applying rules at the account or card level if necessary.

### Test in Shadow Mode

Once the rule is created, it runs in shadow mode. This means the rule will evaluate transactions in real-time, logging how it would have affected transaction outcomes—whether it would have approved or declined them—but it will not yet influence live transactions. During this phase, you can measure the rule's performance by observing its behavior through the performance reports feature, which will be covered in the next section.

Using shadow mode is essential to ensuring your rule functions as intended before promoting it to live status, minimizing the risk of unintended transaction declines or approvals.

#### Best Practices

* **Thorough testing**: Use shadow mode to evaluate the rule’s behavior across different transaction types and scenarios, ensuring it performs as expected before promotion.
* **Iterate as needed**: Authorization logic can evolve. Make use of drafts to refine rules incrementally based on performance data and new business requirements.
* **Keep rule interactions in mind**: When drafting multiple rules, consider how they may interact to avoid unintended outcomes when they are activated.

## Measuring an Authorization Rule

Once a draft authorization rule has been created and is running in shadow mode, it's important to measure its performance before promoting it to active status. Lithic provides performance reports that give insights into how a rule would impact transactions, whether in draft or active mode. These reports help you assess the effectiveness of the rule by tracking how it influences transaction approvals and declines.

### Retrieve Performance Data

Performance reports are generated daily and provide daily statistics for both current and draft versions of the Auth rule, including approval, decline, and challenge counts along with sample events.

**Time Range Limitations:**

* Reports are supported for the past 3 months only
* Maximum interval length is 1 month
* Report data is available only through the previous day in UTC (current day data is not available)

**Example Response:**

```json
{
  "auth_rule_token": "cbab2546-b597-4b17-903e-3e392c10ed64",
  "begin": "2025-11-19",
  "end": "2025-12-18",
  "daily_statistics": [
    {
      "date": "2025-11-20",
      "current_version_statistics": {
        "approved": 1,
        "declined": 0,
        "challenged": 0,
        "examples": [
          {
            "event_token": "4a2dba2f-729a-496b-8943-ec11b4768e3e",
            "timestamp": "2025-11-20T18:26:53Z",
            "decision": "APPROVED"
          }
        ]
      },
      "draft_version_statistics": null
    },
    {
      "date": "2025-12-11",
      "current_version_statistics": {
        "approved": 3,
        "declined": 0,
        "challenged": 0,
        "examples": [
          {
            "event_token": "54af6161-d544-4d92-b482-2f96814f438c",
            "timestamp": "2025-12-11T19:56:57Z",
            "decision": "APPROVED"
          },
          {
            "event_token": "e7751c31-d14d-4acb-8990-67adadf71f5a",
            "timestamp": "2025-12-11T22:18:02Z",
            "decision": "APPROVED"
          },
          {
            "event_token": "0aa98f19-c576-4f12-a02a-e271748dd293",
            "timestamp": "2025-12-11T21:50:14Z",
            "decision": "APPROVED"
          }
        ]
      },
      "draft_version_statistics": null
    },
    {
      "date": "2025-12-18",
      "current_version_statistics": {
        "approved": 1,
        "declined": 0,
        "challenged": 0,
        "examples": [
          {
            "event_token": "9c7742c7-f5e8-4aa2-af85-b212b178b7b9",
            "timestamp": "2025-12-18T20:47:02Z",
            "decision": "APPROVED"
          }
        ]
      },
      "draft_version_statistics": null
    }
  ]
}
```

<Callout icon="📘" theme="info">
  To see all information about the webhook event for performance reports, see the full API specification [here](https://docs.lithic.com/reference/get_v2-auth-rules-auth-rule-token-report).
</Callout>

Performance reports show statistics for both the current active version and the draft version of the rule, allowing you to compare how each is performing. If you're drafting a rule for the first time and no active version yet exists, only the draft version statistics will be populated.

#### Best Practices for Measuring Rules

* **Monitor regularly**: Request performance reports frequently to keep track of how your rule evolves over time, especially as transaction patterns change.
* **Review transaction examples**: Use the examples provided in the report to review specific transactions affected by the rule. This can help refine rule parameters for improved performance.
* **Compare draft and active versions**: Analyze the data from both draft and active rules to ensure you are optimizing your authorization logic effectively across all versions.

### Backtesting Rules

In addition to performance reports, Lithic supports **backtesting** — the ability to simulate a rule against historical transactions to understand how it would have performed in the past. Backtesting is especially useful when making significant changes to rule parameters, as it provides a data-driven way to evaluate impact before promoting.

To learn more about initiating backtests, interpreting results, and best practices, see [Backtesting Authorization Rules](https://docs.lithic.com/docs/backtesting-authorization-rules).

### Retrieving Calculated Feature Values

For velocity limit rules and rules using transaction count attributes, you can retrieve the current calculated feature values for a specific card or account using the `GET /v2/auth_rules/{auth_rule_token}/features` endpoint. This is useful for debugging velocity limits — for example, checking how much of a card's velocity window has been consumed.

**Query Parameters:**

* `card_token` — Required for card-scoped velocity limits and transaction count attributes
* `account_token` — Required for account-scoped velocity limits

The response includes the current amount and transaction count tracked against each velocity window or count attribute on the rule.

## Promoting an Authorization Rule

Once you have measured the performance of your draft rule and are confident in its effectiveness, the next step is to promote the rule from **shadow mode** to **active mode**. Promoting a rule makes it immediately live in the authorization stream, meaning it will start impacting real transactions according to the logic you have defined.

### Promote the Rule

To promote a rule, use the `POST /v2/auth_rules/{auth_rule_token}/promote` endpoint. This endpoint will take the parameters of the draft version and apply them to the active authorization rule, replacing any existing active rule for the specified token. Once promoted, the rule begins affecting authorizations in real time.

**Example Request:**

```http
POST /v2/auth_rules/{auth_rule_token}/promote
```

<Callout icon="📘" theme="info">
  To see all information about promoting an authorization rule, see the full API specification [here](https://docs.lithic.com/reference/post_v2-auth-rules-auth-rule-token-promote).
</Callout>

There are no additional parameters required in the request body. The promotion process will simply transfer the draft parameters to the active rule, and the draft will be cleared.

#### What Happens During Promotion

Promoting a rule makes the draft parameters the active rule, replacing the existing active rule for the specified token. Once promoted, the draft rule ceases to exist, and its parameters are applied to the active authorization stream. This means the rule will now affect authorizations in real-time based on the logic you have defined.

It’s important to note that once a rule is promoted, the details of the previous active rule are no longer recoverable, as they are overwritten by the promoted draft. Make sure to measure and verify the draft’s performance thoroughly before promotion to avoid unintended results.

#### Best Practices for Promoting Rules

* **Verify thoroughly**: Ensure the draft rule has been adequately tested and measured in shadow mode before promotion, as the active rule will immediately begin affecting live authorizations.
* **Document changes**: Keep a record of rule promotions to track changes and adjustments made to your authorization logic over time.
* **Monitor post-promotion**: After promotion, continue to monitor the rule’s performance using performance reports to ensure it is behaving as expected in live transactions.

Once a rule is promoted, it becomes the active authorization logic for the specified entities (program, account, or card), and will continue to impact transactions until it is modified or disabled.

## Disabling an Authorization Rule

Disabling an authorization rule is the process of stopping the rule from impacting the live authorization stream. When a rule is disabled, it no longer applies to transactions, and the rule's `current_version` is cleared. Any existing `draft_version` is preserved.

### Disable the Rule

To disable a rule, use the `PATCH /v2/auth_rules/{auth_rule_token}` endpoint, setting the rule's state to `INACTIVE`. This will prevent the rule from affecting authorization decisions.

<Callout icon="⚠️" theme="warning">
  Deactivating a rule **clears the `current_version`** — the previously active configuration is not preserved. To reactivate the rule, you must create a new draft via the `/draft` endpoint and then promote it. If a draft already exists at the time of deactivation, it will be retained and can be promoted directly.
</Callout>

**Example Request:**

```http
PATCH /v2/auth_rules/{auth_rule_token}
```

```json JSON
{
  "state": "INACTIVE"
}
```

<Callout icon="📘" theme="info">
  To see all information about updating an authorization rule, see the full API specification [here](https://docs.lithic.com/reference/patch_v2-auth-rules-auth-rule-token).
</Callout>

This request changes the state of the authorization rule to `INACTIVE`, effectively disabling it. The rule will no longer affect transaction authorizations.

### Clearing Drafts

In addition to disabling active rules, you can clear a draft rule by overwriting it with a blank rule template. This is useful if the draft version of a rule no longer needs to be tested in shadow mode or if you want to reset the rule's logic.

**Example Request to Clear a Draft:**

```http
POST /v2/auth_rules/{auth_rule_token}/draft
```

```json
{
  "parameters": null
}
```

<Callout icon="📘" theme="info">
  To see all information about clearing drafts, see the full API specification [here](https://docs.lithic.com/reference/post_v2-auth-rules-auth-rule-token-draft).
</Callout>

This request resets the draft parameters, effectively clearing the draft version of the rule without affecting the active rule.

#### Best Practices for Disabling Rules

* **Save your configuration first**: Before deactivating, consider creating a draft with the current parameters so you can promote it later to restore the rule. Without a draft, the rule's configuration will be lost on deactivation.
* **Document deactivations**: Keep a record of when and why rules are disabled to avoid confusion when reactivating or modifying them later.
* **Reassess before reactivation**: If a rule is re-enabled after a long period of inactivity, ensure the logic is still relevant to current transaction patterns.

### Deleting a Rule

To permanently remove a rule from your system, use the `DELETE /v2/auth_rules/{auth_rule_token}` endpoint. Unlike disabling, deletion is irreversible — the rule and its configuration cannot be recovered.

**Example Request:**

```http
DELETE /v2/auth_rules/{auth_rule_token}
```

A successful deletion returns a `204 No Content` response. Use this when a rule is no longer needed and you want to clean up your rule set. If you may need the rule again in the future, consider disabling it instead.

## Retrieving Existing Authorization Rules

After creating, drafting, or promoting an authorization rule, you may want to retrieve and review the existing rules in your system. Lithic provides endpoints for listing all authorization rules under a program, as well as fetching the details of a specific rule by its token. These endpoints help you manage and review active, draft, or disabled rules across your card program.

### Listing All Authorization Rules

To retrieve a list of all authorization rules under your program, use the `GET /v2/auth_rules` endpoint. This endpoint returns details of all authorization rules applied at the program, account, or card level. It is especially useful for reviewing the status and parameters of multiple rules in one query.

**Example Request:**

```http
GET /v2/auth_rules
```

You can filter the response using the following query parameters:

* `account_token` / `card_token` / `business_account_token` — Filter rules associated with a specific entity
* `scope` — Filter by rule scope: `PROGRAM`, `ACCOUNT`, `BUSINESS_ACCOUNT`, `CARD`, or `ANY`
* `event_streams` — Filter by event stream (e.g., `AUTHORIZATION`, `TOKENIZATION`, `THREE_DS_AUTHENTICATION`, `ACH_DEBIT_RECEIPT`, `ACH_CREDIT_RECEIPT`)
* `page_size` — Control pagination (1–100, default 50)

**Example Response:**

```json
{
  "data": [
    {
      "auth_rule_token": "a4e8dc9a-f821-4365-b6a9-a6219b105b6d",
      "program_level": true,
      "parameters": {
        "conditions": [
          {
            "attribute": "MCC",
            "operation": "IS_ONE_OF",
            "value": ["3000", "3001"]
          }
        ]
      },
      "state": "ACTIVE"
    },
    {
      "auth_rule_token": "a25eab6a-7cc1-48e1-b7cc-eb4674fb8c7e",
      "program_level": false,
      "account_tokens": ["a1b2c3d4"],
      "parameters": {
        "conditions": [
          {
            "attribute": "COUNTRY",
            "operation": "IS_NOT_ONE_OF",
            "value": ["USA", "CAN"]
          }
        ]
      },
      "state": "INACTIVE"
    }
  ],
  "has_more": false
}
```

<Callout icon="📘" theme="info">
  To see all information about listing authorization rules, see the full API specification [here](https://docs.lithic.com/reference/get_v2-auth-rules).
</Callout>

This example response shows two authorization rules: one that is active at the program level and another that is inactive and applied to a specific account.

### Fetching an Authorization Rule by Token

To retrieve the details of a specific authorization rule, use the `GET /v2/auth_rules/{auth_rule_token}` endpoint. This request returns detailed information about the rule, including its parameters, current state (active or inactive), and any draft versions that may exist.

**Example Request:**

```http
GET /v2/auth_rules/{auth_rule_token}
```

<Callout icon="📘" theme="info">
  To see all information about fetching an authorization rule by token, see the full API specification [here](https://docs.lithic.com/reference/get_v2-auth-rules-auth-rule-token).
</Callout>

This is useful for checking the configuration of a specific rule before making modifications or reviewing its status in the authorization stream.

#### Best Practices for Retrieving Rules

* **Filter results**: Use filters like `account_token` or `card_token` to narrow down the list of rules and make it easier to manage specific entities.
* **Review regularly**: Regularly review active and inactive rules to ensure your authorization logic remains relevant and aligned with your business needs.

By retrieving and reviewing existing authorization rules, you can effectively manage and maintain your program’s authorization logic over time.

# Understanding Authorization Rule Decline Results

Authorization Rules apply specific logic to transactions based on the conditions set by each rule. When a rule configuration blocks a transaction, the Lithic [transaction object](https://docs.lithic.com/reference/gettransactionbytoken) reflects this with an entry in the `rule_results` array, providing detailed insight into which rules affected the transaction outcome and why. This information helps card programs understand exactly how their authorization logic is impacting transactions.

## Rule Results

Each Lithic transaction contains an array of `rule_results`, shedding light on the specific rules which caused a particular transaction to decline and the conditions within that rule which caused the decline evaluation. This array is always present but only contains entries when a rule affects a transaction, remaining empty for approved transactions. Rule result entries will be generated when a user-configured rule causes a decline, but will also be present in the event that a Lithic-configured rule causes a decline (such as in the case of mandatory bank limits or other mandatory enforcement).

Let's look at an example:

```json
"rule_results": [
  {
    "auth_rule_token": "ef49df0c-ed17-44cb-811b-6de1ec0f088a",
    "name": "Block foreign country rule",
    "result": "DECLINE",
    "explanation": "The conditional block rule declined the transaction because the COUNTRY value of CAN failed the parameter evaluation of COUNTRY IS_NOT_ONE_OF USA."
  }
]
```

In this example, the `rule_results` array includes the following fields:

* **`auth_rule_token`**: UUID of the rule responsible for the decline or `null` if the decline was due to a Lithic-configured rule.
* **`name`**: Name of the authorization rule, if configured.
* **`result`**: Details about the rule's evaluation outcome.
* **`explanation`**: Human-readable explanation for the decline.

Tokenization events also include a `rule_results` array, following the same structure as authorization rule results. For tokenization events, the `result` field can be `APPROVED`, `DECLINED`, `REQUIRE_TFA`, or `ERROR`. When a tokenization is declined or requires TFA due to a Lithic-configured internal rule (rather than a customer rule), the `auth_rule_token` will be `null`.

By referencing these values, it is clear which rule caused the decline and the specific evaluation that led to this decline result. If this decline was undesirable, you may look up the rule using the `auth_rule_token`. You can then apply the necessary changes to rule parameters to ensure that the same evaluation does not occur in the future.

# Conclusion

Authorization Rules provide a powerful and flexible way to manage decisioning across your program, account, or card levels — spanning card authorizations, 3DS authentication, tokenization, and ACH payments. Whether you’re drafting new rules in shadow mode, measuring their impact with performance reports and backtesting, or promoting and disabling rules as your business evolves, Lithic’s Authorization Rules give you the control you need to enforce complex decisioning logic efficiently.

The integration of Authorization Rules with Lithic’s infrastructure removes the need to manage external systems, offering a streamlined, scalable solution that adapts to your program’s needs. For more complex decision-making, Authorization Rules can also work alongside Lithic’s [Authorization Stream Access (ASA)](https://docs.lithic.com/docs/auth-stream-access-asa) and [Tokenization Decisioning](https://docs.lithic.com/docs/tokenization-control), giving you the flexibility to combine built-in rule logic with fully customizable decisioning.

For detailed information about any of the endpoints mentioned, please refer to the full API documentation linked throughout this guide. Additional resources include:

* [Backtesting Authorization Rules](https://docs.lithic.com/docs/backtesting-authorization-rules) — Simulate rules against historical data
* [ACH Auth Rules](https://docs.lithic.com/docs/ach-auth-rules) — Control ACH payment receipts
* [Lithic Dashboard - Authorization Rules UI](https://docs.lithic.com/docs/lithic-dashboard-rules-ui) — Manage rules via the no-code Dashboard interface

If you have any questions or need further assistance, feel free to reach out to our support team by using the **HELP** button in your Lithic Dashboard.

# Authorization Rules FAQ

<details>
  <summary>How do Authorization Rules at various entity levels interact with each other </summary>

  When multiple Authorization Rules apply to a transaction at different entity levels (program, account, or card), the most restrictive set of conditions will apply. For example, if an account-level rule allows transactions only in the US and Canada, and a card-level rule allows only US-based transactions, then transactions on that card will be restricted to the US. Similarly, for MCC controls, if a program-level rule blocks MCC 1234 and a card-level rule allows MCC 5678, transactions will be permitted only on MCC 5678 for that card.
</details>

<details>
  <summary>Will every declined transaction have an associated rule\_result record?</summary>

  No, not all declined transactions will have an associated `rule_result`. Transactions declined by *user-configured authorization rules* will always generate a corresponding `rule_result`. However, there are scenarios where declines occur without creating a `rule_result`.

  For example, Lithic performs a series of basic security checks on all incoming transactions *before* evaluating user-configured authorization rules. If a transaction is declined during these security checks, a `rule_result` will not be populated.

  While other situations can also result in declined transactions without a `rule_result`, it is important to note that any decline directly caused by an authorization rule will produce a `rule_result` record.
</details>

<details>
  <summary>How do country restrictions work for e-commerce transactions?</summary>

  Country restrictions in Authorization Rules are based on the country parameter in the merchant schema of the transaction object, which reflects the country of the card acceptor. While this data is usually accurate for card-present transactions, it can be less reliable for e-commerce transactions. For programs with heavy e-commerce use cases, we recommend testing specific merchants before implementing broad country restrictions.
</details>

<details>
  <summary>How do Authorization Rules work if I already have ASA implemented?</summary>

  Authorization Rules are evaluated before a transaction reaches your Authorization Stream Access (ASA) endpoint. If a transaction violates an Authorization Rule, it will be declined without sending a request to ASA. Although an ASA request will not be sent, the card program will still be notified of the attempted transaction via a `card_transaction.updated webhook`. This means Authorization Rules act as an initial filter, preventing unnecessary ASA requests for transactions that don't meet your predefined rules.
</details>

<details>
  <summary>Can I set different Authorization Rules for specific cards or accounts?</summary>

  Yes, Authorization Rules can be applied at the program, account, or card level. This allows you to create more specific rules for individual entities within your program. For instance, you might apply different spending limits or MCC restrictions to specific cards while maintaining broader rules at the program level.
</details>

<details>
  <summary>How do Authorization Rules handle multiple conditions?</summary>

  Authorization Rules allow for multiple conditions to be combined using logical operators. For example, you can create rules that block transactions if all conditions are true (such as transactions with BOTH a high transaction amount *and* high risk score) by creating a single rule with multiple conditions. To create a ruleset that blocks transactions if any condition is true (such as transactions with specific currencies *or* specific MCCs), create two separate rules with one set of conditions each. The transaction will decline if any rule triggers.
</details>

<details>
  <summary> Can I use tokenization rules to override a wallet's decline recommendation?</summary>

  No. Lithic will never allow a more permissive tokenization decision than what the digital wallet recommends. Customer-configured rules can make decisions more restrictive (e.g., declining a request the wallet would have approved, or requiring TFA when the wallet recommended approval), but cannot override a wallet's decline.
</details>

<details>
  <summary>What happens if I have both tokenization rules and a Tokenization Decisioning Responder?</summary>

  Auth Rules-based tokenization rules are evaluated by Lithic before sending the request to your Tokenization Decisioning Responder. If a tokenization rule declines the request, it will not be forwarded to your responder. If the rules approve or require TFA, the request proceeds to your responder for additional custom decisioning.
</details>

<details>
  <summary> Can I test tokenization rules in shadow mode?</summary>

  Yes. Tokenization rules follow the same draft → shadow mode → promote lifecycle as authorization rules. When a tokenization rule is in draft/shadow mode, it evaluates live tokenization requests and logs how it would have affected outcomes without actually impacting them. Use performance reports to measure impact before promoting.
</details>

<details>
  <summary>Can I simulate tokenizations to test my rules in sandbox?</summary>

  Yes. Use the `POST /v1/simulate/tokenizations` endpoint in sandbox to simulate tokenization requests with configurable parameters. See [Simulating Tokenizations](https://docs.lithic.com/docs/simulating-tokenizations) for details.
</details>

<details>
  <summary>How do 3DS Authentication Rules relate to Authorization Rules?</summary>

  3DS Authentication Rules use the same Auth Rules engine and lifecycle (draft → shadow mode → promote) as authorization rules. They are `CONDITIONAL_ACTION` rules with the `event_stream` set to `THREE_DS_AUTHENTICATION`. They evaluate 3DS authentication requests and can either decline or challenge them based on attributes like MCC, country, transaction amount, and risk score. 3DS rules are evaluated during the authentication phase, before the authorization itself occurs.
</details>

<details>
  <summary>Can I use Auth Rules to control ACH payments?</summary>

  Yes. ACH Auth Rules use the same Auth Rules engine to control which ACH payments are received by your financial accounts. They operate on the `ACH_CREDIT_RECEIPT` and `ACH_DEBIT_RECEIPT` event streams with `APPROVE` or `RETURN` actions. For full details and sample flows, see [ACH Auth Rules](https://docs.lithic.com/docs/ach-auth-rules).
</details>

<details>
  <summary>What is the CHALLENGE action and when should I use it?</summary>

  The `CHALLENGE` action is available on `CONDITIONAL_ACTION` rules for the `AUTHORIZATION` and `THREE_DS_AUTHENTICATION` event streams. On the `AUTHORIZATION` stream, it triggers an SMS-based step-up authentication, requiring the cardholder to verify their identity before the transaction proceeds. On the `THREE_DS_AUTHENTICATION` stream, it triggers a 3DS challenge flow. This is useful for transactions that you don't want to outright decline but that carry higher risk — for example, high-value transactions from new merchants or transactions with mismatched AVS data.
</details>

<br />

<br />

<br />
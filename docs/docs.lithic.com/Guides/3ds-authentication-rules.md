# 3DS Authentication Rules

Learn how to customize 3DS decisioning logic using Lithic 3DS Auth Rules

<Image border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/8418b15495469ecd_918cdef3d0f97e12047b6ea0312b9f87a1405740d5ecc8c479703eab2dd00e04-image.png" />

<br />

<Callout icon="📘" theme="info">
  3DS Authentication Rules require enrollment in Lithic's 3DS service. Rules with `CHALLENGE` actions additionally require a challenge orchestration model to be configured. [Learn more about enabling Lithic 3DS](https://docs.lithic.com/docs/about-3ds)
</Callout>

## Overview

3DS Authentication Rules enable your organization to define custom logic for 3DS authentication decisions based on transaction attributes. These rules evaluate authentication requests against configurable conditions and can automatically decline transactions or trigger challenge flows when specific criteria are met.

Authentication rules operate as an additional control layer that works with both Lithic Decisioning and Customer Decisioning models. Rules are evaluated during the 3DS authentication flow and can enforce stricter controls than the base decisioning model, but cannot override decline decisions made by other systems.

## How Authentication Rules Work

When a 3DS authentication request arrives:

1. The authentication data is evaluated against all active authentication rules in parallel
2. Rules check transaction attributes against their configured conditions
3. If conditions match, the rule executes its defined action (decline or challenge)
4. The strictest decision across all evaluations is applied
5. The final authentication response is sent through the network

Authentication rules follow a "most restrictive" principle: if any rule declines an authentication, the transaction is declined regardless of other rule or model decisions. Similarly, if a rule triggers a challenge, the authentication proceeds to a challenge flow unless another rule declines it.

For example, consider two rules: one configured to challenge authentications with risk scores greater than 600, and another configured to decline authentications with risk scores greater than 800. When an authentication is processed with a risk score of 850, both rules evaluate as true. Since authentication rules apply the strictest decision, the authentication is declined rather than challenged due to decline being the stricter decision.

## Rule Configuration

### Rule Types

3DS Authentication Rules use the `CONDITIONAL_3DS_ACTION` rule type, which evaluates during the `THREE_DS_AUTHENTICATION` event stream. These rules can trigger two actions:

* `DECLINE`: Reject the authentication request
* `CHALLENGE`: Initiate a challenge flow (requires challenge orchestration to be configured)

### Targetable Attributes

Rules can evaluate authentications based on several attributes including (but not limited to):

* `MCC`: Merchant Category Code
* `COUNTRY`: Country of card acceptor
* `CURRENCY`: Transaction currency
* `MERCHANT_ID`: Unique alphanumeric merchant identifier
* `DESCRIPTOR`: Short description of card acceptor
* `TRANSACTION_AMOUNT`: Transaction amount in cents
* `RISK_SCORE`: Network-provided risk score
* `MESSAGE_CATEGORY`: Authentication category type

<Callout icon="📘" theme="info">
  For the full list of targetable attributes, please review the [Auth Rules API specification](https://docs.lithic.com/reference/post_v2-auth-rules).
</Callout>

### Operations

Each condition supports these operations:

* `IS_ONE_OF` / `IS_NOT_ONE_OF`: Match against a list of values
* `MATCHES` / `DOES_NOT_MATCH`: Regex pattern matching
* `IS_GREATER_THAN` / `IS_LESS_THAN`: Numeric comparisons

### Scope Levels

Authentication rules can be applied at three levels:

* **Program Level**: Applies to all cards in your program
* **Account Level**: Applies to specific account tokens
* **Card Level**: Applies to specific card tokens

Program-level rules can exclude specific cards using the `excluded_card_tokens` parameter.

## Integration with Decisioning Models

### With Lithic Decisioning

When used with Lithic Decisioning, authentication rules provide additional control over Lithic's fraud model decisions. Rules can:

* Decline authentications that Lithic's model would approve
* Trigger challenges for transactions Lithic would approve without challenge

This allows organizations to enforce specific business policies or risk tolerances stricter than Lithic's baseline model.

All authentication rules, including the Lithic Decisioning model, are evaluated in parallel and the strictest decision is applied to the authentication. Because of this, 3DS auth rules cannot be used to approve authentications that Lithic's model declines.

### With Customer Decisioning

When used with Customer Decisioning, authentication rules can act as a safety net or policy enforcement layer. Rules evaluate independently of your decisioning endpoint and can:

* Enforce consistent policies across all authentications
* Act as a fallback if your endpoint times out
* Implement quick policy changes without modifying endpoint logic

The final authentication decision applies the strictest outcome from both your endpoint and active rules.

## Testing and Validation

### Draft Versions

Authentication rules support draft versions, allowing you to create and test rule configurations before activation. Draft rules:

* Run in shadow mode during evaluation
* Generate performance data without affecting live transactions
* Can be promoted to active status after validation

### Performance Reports

Performance reports provide historical analysis of how rules performed or would have performed:

```
GET /v2/auth_rules/{auth_rule_token}/performance
```

Reports include daily statistics showing:

* Number of authentications approved, declined, or challenged
* Performance metrics for both current and draft versions
* Example transactions with decision outcomes

### Backtesting

Backtesting evaluates draft rules against historical transaction data:

```
POST /v2/auth_rules/{auth_rule_token}/backtest
```

Backtests help validate rule effectiveness by showing:

* How the rule would have performed on past transactions
* Impact on approval and decline rates
* Specific examples of affected transactions

## Example Use Cases

### Challenge High-Risk Merchant Categories

```json
{
  "type": "CONDITIONAL_3DS_ACTION",
  "action": "CHALLENGE",
  "conditions": [
    {
      "attribute": "MCC",
      "operation": "IS_ONE_OF",
      "value": ["5967", "7995", "5816"]
    }
  ]
}
```

### Challenge Transaction Amount Thresholds

```json
{
  "type": "CONDITIONAL_3DS_ACTION",
  "action": "CHALLENGE",
  "conditions": [
    {
      "attribute": "TRANSACTION_AMOUNT",
      "operation": "IS_GREATER_THAN",
      "value": 100000
    }
  ]
}
```

### Decline High-Risk Country Blocks

```json
{
  "type": "CONDITIONAL_3DS_ACTION",
  "action": "DECLINE",
  "conditions": [
    {
      "attribute": "COUNTRY",
      "operation": "IS_ONE_OF",
      "value": ["XYZ", "ABC"]
    }
  ]
}
```

## Example Implementation Process

1. **Design rule logic**: Identify transaction patterns requiring additional controls
2. **Create draft rules**: Use the [Create Auth Rule API](https://docs.lithic.com/reference/post_v2-auth-rules) to create rules in draft state
3. **Run backtests**: Validate rule impact using historical data
4. **Monitor performance**: Review performance reports during shadow mode operation
5. **Promote to active**: Use the [Promote Auth Rule API](https://docs.lithic.com/reference/post_v2-auth-rules-auth-rule-token-promote) to activate validated rules
6. **Ongoing monitoring**: Track rule performance and adjust as needed

For complete API specifications and additional rule types, see the [Auth Rules API documentation](https://docs.lithic.com/reference/post_v2-auth-rules).
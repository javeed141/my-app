# Authorization Challenges

Learn how to escalate a risky authorizations to a step-up authentication

# Introduction

Authorization Challenges provide an SMS-based authentication mechanism for verifying cardholder identity during high-risk transactions. When authorization logic identifies a transaction as potentially fraudulent, Lithic declines the authorization and sends an SMS to the cardholder requesting confirmation. Upon successful validation, the cardholder can reattempt the transaction.

# How Authorization Challenges Work

When authorization rules or ASA logic trigger a challenge, Lithic declines the authorization immediately and attempts to send an SMS to the cardholder. The message template is customizable, but should request confirmation like: "Did you attempt a \[amount] transaction at \[merchant]? Reply YES if so, NO if not." Cardholders have up to 10 minutes to respond to the message before the challenge expires. Lithic parses the cardholder's SMS response to determine challenge outcome. This process is asynchronous by design, as authorization responses must be delivered within network timeout windows.

Cardholder response to the challenge SMS determines how Lithic handles retry attempts, though the specific behavior differs between Authorization Rules and ASA implementations. When the cardholder retries the transaction after a successful validation, Authorization Rules will bypass the challenge requirement, while ASA implementations receive challenge state information in the `latest_challenge` object.

Negative cardholder responses initiate a secondary SMS recommending that the cardholder pause the card and contact their issuing card program.

# Triggering Authorization Challenges

Authorization Challenges can be initiated through two distinct mechanisms: [Authorization Rules](doc:authorization-rules-v2#/) or [Authorization Stream Access](doc:auth-stream-access-asa#/).

## Using Authorization Rules

Authorization Rules enable challenge triggering through the `CONDITIONAL_ACTION` rule type with the `action` parameter set to `CHALLENGE`. Rules evaluate transaction attributes and initiate challenges when all specified conditions are satisfied.

**Example request to create a challenge rule:**

```json
POST /v2/auth_rules

{
  "program_level": true,
  "type": "CONDITIONAL_ACTION",
  "event_stream": "AUTHORIZATION",
  "parameters": {
    "action": "CHALLENGE",
    "conditions": [
      {
        "attribute": "TRANSACTION_AMOUNT",
        "operation": "IS_GREATER_THAN",
        "value": 50000
      },
      {
        "attribute": "RISK_SCORE",
        "operation": "IS_GREATER_THAN",
        "value": 700
      }
    ]
  }
}
```

This configuration challenges transactions exceeding $500 with network risk scores above 700. Consult the [Auth Rules API specification](https://docs.lithic.com/reference/post_v2-auth-rules) for the complete attribute catalog and supported operations.

Authorization challenges can also be configured via the Rules tab within the Lithic Dashboard.

<Image align="center" border={false} width="75% " src="https://d1jvjlrimvr0n9.cloudfront.net/stable/528ac8b95847d685_2540feef9a4e90100cb438e8e8a142d7ae0dc693bcd4621b8c4a4f7573c3d86c-CleanShot_2025-10-14_at_21.48.112x.png" />

<br />

Authorization Rules use the phone number associated with the card's accountholder. If the phone number was not provided during accountholder creation or has changed, the number must be updated with Lithic for challenges to be delivered correctly. When no phone number is associated with the accountholder, transactions will be declined and no SMS will be sent.

Authorization Rules are appropriate when challenge criteria can be expressed through transaction attributes accessible within Lithic's authorization context. This approach requires no external infrastructure. However, rules cannot incorporate external data sources or implement complex decisioning logic requiring contextual information beyond the transaction object. If this is required, authorization challenges can also be implemented via Authorization Stream Access.

## Using Authorization Stream Access

Authorization Stream Access provides programmatic challenge control through a customer decisioning endpoint. Responding with `CHALLENGE` in the ASA response initiates the challenge flow.

**Example ASA response triggering a challenge:**

```json
{
  "result": "CHALLENGE"
}
```

The ASA response can optionally include a phone number for SMS delivery. If provided, Lithic uses that number. If omitted, Lithic uses the accountholder's phone number on file. When no phone number is available through either method, the transaction is declined and no SMS is sent.

**Example ASA response with phone number:**

```json
{
  "result": "CHALLENGE",
  "phone_number": "+15551234567"
}
```

Refer to the [ASA request specification](https://docs.lithic.com/reference/post_asa-request) for complete request format documentation.

Providing the phone number in the ASA response enables challenge initiation even when no phone number is associated with the accountholder in Lithic's system, offering greater flexibility for phone number management.

# Authorization Behavior for Completed Challenge

Challenge behavior differs fundamentally between Authorization Rules and Authorization Stream Access implementations.

## Authorization Rules Behavior for Completed Challenges

When challenges are triggered via Authorization Rules, Lithic automatically applies logic which bypasses additional challenges after a successful challenge completion. Upon receiving a "YES" response from the cardholder, the system creates a bypass record scoped to the card and merchant combination. This bypass prevents the specific challenge rule from triggering again for 24 hours for the same card at the same merchant ID.

The bypass applies exclusively to the challenge requirement. All other authorization rules continue to evaluate normally. If a cardholder successfully completes a challenge at Merchant A, later transactions on the same card at Merchant A within the bypass window will not trigger the same Authorization Challenge rule. However, those transactions remain subject to all other authorization rules including spend limits, velocity limits, merchant locks, and any other configured rules. Transactions at Merchant B remain subject to challenge evaluation, as bypass records are merchant-specific.

## Authorization Stream Access Bypass Behavior

ASA implementations receive challenge state information but must implement bypass logic within their own decisioning endpoint. Lithic does not automatically approve authorizations based on challenge completion. Customer ASA endpoints receive every authorization request regardless of challenge state and must return an authorization decision for each authorization request.

ASA requests include a `latest_challenge` object when a recent challenge exists for the card and merchant combination.

**Example `latest_challenge` object:**

```json
{
  "status": "COMPLETED",
  "phone_number": "+15551234567",
  "completed_at": "2024-10-09T14:23:45Z"
}
```

The `status` field indicates challenge state:

* `COMPLETED`: Cardholder successfully completed the challenge
* `PENDING`: Challenge remains open awaiting cardholder response
* `EXPIRED`: Challenge timeout occurred without completion
* `ERROR`: Challenge processing encountered a system error

The `phone_number` field contains the phone number used for SMS delivery. The `completed_at` field appears only when `status` is `COMPLETED`, providing the completion timestamp in UTC.

Customer ASA decisioning logic must evaluate this object and determine whether to approve, decline, or re-challenge based on challenge state and risk tolerance. For example, if `status` is `COMPLETED` and the `completed_at` timestamp is recent, the decisioning logic may return `APPROVED` rather than `CHALLENGE`.

Lithic will honor the decision returned by the endpoint precisely. Lithic does not enforce any default bypass behavior for ASA-triggered challenges.

# Customizing Challenge Messages

The authorization challenge flow consists of three SMS messages that card programs can fully customize: the initial challenge request, the affirmative response followup, and the negative response followup.

The initial message requests cardholder confirmation about the transaction attempt. This message should provide sufficient transaction context for the cardholder to recognize whether they initiated the purchase and clearly indicate that a YES or NO response is required. For example:

> Did you attempt a $75.50 transaction at BOBS HARDWARE STORE? Reply YES if so, or NO if you do not recognize the transaction.

The affirmative response followup is sent when the cardholder responds YES. This message should instruct the cardholder to retry the transaction. For example:

> Thank you for confirming, please wait a few moments and retry the transaction.

The negative response followup is sent when the cardholder responds NO. This message should instruct the cardholder to contact their card issuer. For example:

> Thank you for confirming. This transaction was declined. Contact your card issuer immediately to secure your account.

## Template Variables

The initial challenge message template supports the following variables, which are automatically replaced with transaction and card details at send time:

| Variable        | Description                                                                               | Example                               |
| --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------- |
| `{{AMOUNT}}`    | Transaction amount formatted with currency symbol and code                                | `$75.50 USD`, `€123.45 EUR`, `¥1 JPY` |
| `{{MERCHANT}}`  | Merchant name, truncated to 25 characters. Defaults to "Unknown Merchant" if unavailable. | `BOBS HARDWARE STORE`                 |
| `{{LAST_FOUR}}` | Last four digits of the card number                                                       | `1234`                                |
| `{{MEMO}}`      | Card memo, truncated to 30 characters                                                     | `Employee Travel Card`                |

**Default template:**

```
Did you attempt a {{AMOUNT}} transaction at {{MERCHANT}}? Reply YES if you did, NO if not.
```

If a variable's underlying value is unavailable (e.g., no memo set on the card), it is replaced with an empty string.

All three messages are restricted to 160 characters each to prevent segmentation into multiple SMS messages. If the rendered message exceeds 160 characters after variable substitution, it will be truncated. During implementation, Lithic will test message templates with various merchant names and transaction amounts to ensure clarity across edge cases.

# Integration with Transactions API

Lithic evaluates all authorization rules in parallel and applies the strictest decision across all rule evaluations. If one rule evaluates to decline and another rule evaluates to challenge, the transaction will be declined without sending a challenge SMS.

Challenged transactions contain specific decline indicators within the transaction object. The transaction `result` field contains `DECLINED`, but the `detailed_results` array includes the reason code corresponding with the specific scenario. For authorization rules, the `rule_results` array provides attribution to the specific rule that triggered challenge initiation.

**Example transaction response for a challenged transaction:**

```json
{
  "token": "a4e8dc9a-f821-4365-b6a9-a6219b105b6d",
  "result": "DECLINED",
  "status": "DECLINED",
  "events": [
    {
      "token": "bbbf1e86-322d-11ee-9779-00505685a123",
      "type": "AUTHORIZATION",
      "result": "DECLINED",
      "detailed_results": ["CARDHOLDER_CHALLENGED"],
      "rule_results": [
        {
          "auth_rule_token": "ef49df0c-ed17-44cb-811b-6de1ec0f088a",
          "name": "High-Risk Transaction Challenge",
          "result": "CARDHOLDER_CHALLENGED",
          "explanation": "All conditions satisfied: TRANSACTION_AMOUNT=50001, RISK_SCORE=701"
        }
      ]
    }
  ]
}
```

When challenge initiation fails due to missing cardholder phone number, the `detailed_results` array contains `CARDHOLDER_CHALLENGE_FAILED`.

After a cardholder successfully completes a challenge and retries the transaction, the rule that previously challenged the same transaction at the same merchant will now allow the authorization to proceed. This scenario is noted in the `explanation`.

**Example transaction response when challenge is bypassed:**

```json
{
  "token": "b5f9ed0b-g932-5476-c7b0-b7320c216c7e",
  "result": "APPROVED",
  "status": "APPROVED",
  "events": [
    {
      "token": "cccg2f97-433e-22ff-0880-11616796b234",
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "rule_results": [
        {
          "auth_rule_token": "ef49df0c-ed17-44cb-811b-6de1ec0f088a",
          "name": "High-Risk Transaction Challenge",
          "result": "CARDHOLDER_CHALLENGED",
          "explanation": "All conditions satisfied: TRANSACTION_AMOUNT=50001, RISK_SCORE=701. Challenge was recently completed; approved instead."
        }
      ]
    }
  ]
}
```

# Getting Started

Contact your program's Customer Success Manager to enable authorization challenges for your instance. Your CSM will walk you through the implementation process, including configuring the necessary message templates and enabling the feature for your program.

Refer to the [Auth Rules API documentation](https://docs.lithic.com/reference/post_v2-auth-rules) and [ASA specification](https://docs.lithic.com/reference/post_asa-request) for complete API specifications.
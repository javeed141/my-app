# Backtesting Authorization Rules

Simulate rule impacts on historical transactions to optimize performance and safely refine configurations

## Introduction

Backtesting is a powerful feature of Lithic’s Authorization Rules, allowing card programs to evaluate potential rules against historical transaction data. By simulating how a rule would have performed in the past, backtesting enables data-driven decision making, helping you fine-tune rules to optimize authorization rates and minimize unnecessary declines before implementing them in a live environment.

***

## What is Backtesting?

Backtesting allows you to evaluate both draft and active authorization rules by simulating their impact on historical transactions. This feature lets you:

* Understand how a new rule configuration would have affected previous transactions.
* Compare the performance of draft and active rules.
* Fine-tune rules to achieve desired authorization outcomes before deployment.

Backtesting works seamlessly with *Conditional Block Rules*, enabling you to analyze transaction approval and decline patterns across your program. Depending on the velocity configuration, backtesting may be compatible with certain *Velocity Limit Rules*.

***

## Initiating a Backtest

To initiate a backtest, use the `POST /v2/auth_rules/{auth_rule_token}/backtests` endpoint. Provide the token of the rule you want to test and specify the time range for the historical transactions to simulate.

When the backtest report generation is complete, the report will be delivered asynchronously through a webhook with `event_type` = `auth_rules.backtest_report.created`. To learn about setting up webhooks or to verify that your webhook event configuration is correct, please review our documentation: [webhook subscriptions](https://docs.lithic.com/docs/events-api).

### Example Request

```http
POST /v2/auth_rules/{auth_rule_token}/backtests
```

```json
{
  "start": "2024-10-01T00:00:00Z",
  "end": "2024-10-31T23:59:59Z"
}
```

> 📘
>
> **Note:** For complete information about initiating a backtest, see the [full API specification](https://docs.lithic.com/reference/post_v2-auth-rules-auth-rule-token-backtests).

### Parameters

* **`auth_rule_token`**: The UUID of the rule to backtest.
* **`start`**: The start time for the backtest simulation (ISO 8601 format).
* **`end`**: The end time for the backtest simulation (ISO 8601 format).

Upon successful initiation, the API responds with a `backtest_token` which can be used to track the status and retrieve results.

***

## Retrieving Backtest Results

After a backtest report is generated successfully, it is delivered asynchronously via webhook. To retrieve a completed backtest report manually, you can use the `GET /v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}` endpoint. The results include detailed statistics for both the active and draft versions of the rule, as well as examples of impacted transactions.

### Example Request

```http
GET /v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}
```

### Example Response

```json
{
  "backtest_token": "a1b2c3d4-5678-9abc-def0-1234567890ab",
  "simulation_parameters": {
    "auth_rule_token": "50800f8a-4ed2-416f-9f70-ad504d7c90d5",
    "start": "2024-10-01T00:00:00Z",
    "end": "2024-10-31T23:59:59Z"
  },
  "results": {
    "current_version": {
      "version": 3,
      "approved": 800,
      "declined": 50,
      "examples": [
        {
          "event_token": "d0b52bd2-f003-4a03-9ffc-db36fc06f9e5",
          "timestamp": "2024-10-15T12:00:00Z",
          "approved": true
        }
      ]
    },
    "draft_version": {
      "version": 4,
      "approved": 750,
      "declined": 100,
      "examples": [
        {
          "event_token": "8dc5b7de-03c3-4ed3-b444-7dcf9f5a9fbb",
          "timestamp": "2024-10-18T14:30:00Z",
          "approved": false
        }
      ]
    }
  }
}
```

> 📘
>
> **Note:** For complete information about retrieving a completed backtest, see the [full API specification](https://docs.lithic.com/reference/get_v2-auth-rules-auth-rule-token-backtests-auth-rule-backtest-token).

### Understanding the Response

* `current_version`: The performance of the currently active version of the rule, including the number of approved and declined transactions during the backtest period.
* `draft_version`: The performance of the draft version of the rule, if applicable, showing how it would have impacted transactions in the same period.
* `examples`: Specific transactions that illustrate how the rule would have handled different scenarios, including timestamps and approval outcomes.

These insights allow you to evaluate the rule’s effectiveness and identify areas for refinement.

***

## Interpreting Backtest Results

Backtest results provide insights into the potential impact of a rule configuration. Key metrics include:

* **Approved Transactions**: The number of historical transactions within the backtest window that would have been approved by the rule.
* **Declined Transactions**: The number of historical transactions within the backtest window that would have been declined by the rule.
* **Examples**: Real-world transactions to help understand specific cases affected by the rule.

### Use Cases

* **Optimizing Authorization Rates**: Compare the performance of draft and active rules to identify configurations that maximize approval rates.
* **Fine-Tuning Logic**: Adjust rule parameters to address unintended declines or approvals based on transaction examples.
* **Validating Changes**: Ensure new rules align with business objectives and compliance requirements before deployment.

***

## Best Practices

### 1. Select Representative Timeframes

Choose historical time ranges that reflect typical transaction patterns for your program. This ensures the backtest results are relevant and provide actionable insights.

### 2. Focus on Edge Cases

Pay attention to the transaction examples included in backtest results. These examples can help identify unusual scenarios where the rule might cause unintended declines or approvals.

### 3. Iterate Gradually

Make incremental adjustments to rule configurations and perform multiple backtests. Gradual iteration minimizes the risk of unintended outcomes when deploying new rules.

### 4. Leverage Webhooks

Use the webhook notification system (`auth_rules.backtest_report.created`) to automate the monitoring of backtest completion. This ensures timely review of results and seamless integration with your workflows.

***

## Conclusion

The backtesting feature for Authorization Rules empowers card programs to make informed decisions by analyzing historical transaction data. By simulating the impact of rules before deployment, you can ensure optimal authorization rates, minimize declines, and maintain compliance with minimal risk.

For detailed API specifications, see the [Authorization Rules Backtesting API Documentation](https://docs.lithic.com/reference/post_v2-auth-rules-auth-rule-token-backtests). For questions, reach out to our support team through the **HELP** button in your Lithic Dashboard.
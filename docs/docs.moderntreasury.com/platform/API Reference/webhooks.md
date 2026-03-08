# Overview

A large number Modern Treasury's integrations are asynchronous in nature and do not take effect immediately. Primarily this is due to how the underlying systems operate (e.g. file-based messaging over FTP) but it also allows Modern Treasury to efficiently batch its communications to the bank. Fewer files often translates into lower costs and less operational overhead.

To make dealing with these systems easier, the Modern Treasury API is built around the idea of sending important updates over HTTP webhooks. These endpoints can be configured through [the webhooks settings page](https://app.moderntreasury.com/developers/webhooks) inside the application and apply to the entire organization. If needed, separate URLs may be provided for live and test traffic.

# Technical Details

All endpoints must be configured to receive a HTTP POST with a JSON payload. The webhook system will wait a maximum 5 seconds for a 2XX HTTP status code in order to mark the payload as delivered. If the endpoint takes longer to respond or an error is returned, the webhook will be re-enqueued for delivery at a later time subject to an exponential backoff.

Modern Treasury delivers webhooks exclusively over HTTPS using TLS 1.2 or greater. This protects the confidentiality of customer data by ensuring webhook payloads are encrypted in transit.

# Authentication

To verify that a webhook was actually sent by Modern Treasury, every payload is signed with a signature that is passed through as the HTTP header `X-Signature`. The signature is Hex encoded and can be replicated by applying HMAC-SHA-256 to the body of the webhook with your specific webhook key, which can be found in your webhook settings page.

Please contact support if your webhook key is accidentally made public. We will rotate the key and coordinate the change with you.

# IP addresses

Modern Treasury's IP addresses are documented at [IP Addresses](https://docs.moderntreasury.com/platform/reference/ip-addresses) if you would like to verify the transmission IP as part of a webhook receipt solution.

# Webhook Idempotency

Each webhook has a unique ID. This is passed through as the HTTP header `X-Webhook-ID`. You can save these IDs as you process webhooks to ensure each webhook is only processed once. If a webhook is sent multiple times, its ID will remain the same between requests.

# Live vs Test

When making API calls that invoke webhooks, the endpoint URL will depend on whether the live or test key was used. If you want to use the same URL for both live and test webhooks, you can still differentiate using the HTTP header `X-Live-Mode` which is `true` for live traffic and `false` for test traffic.

# Topics

Each webhook payload contains a topic that describes which category the event belongs to. This is passed through as the HTTP header `X-Topic`.

| Topic                       | Description                                    |
| :-------------------------- | :--------------------------------------------- |
| `balance_report`            | Any balance report lifecycle event.            |
| `connection_legal_entity`   | Any connection legal entity lifecycle event.   |
| `decision`                  | Any Compliance decision lifecycle event.       |
| `external_account`          | Any external account lifecycle event.          |
| `expected_payment`          | Any expected payment lifecycle event.          |
| `incoming_payment_detail`   | Any incoming payment detail lifecycle event.   |
| `internal_account`          | Any internal account lifecycle event.          |
| `ledger_account_settlement` | Any ledger account settlement lifecycle event. |
| `ledger_transaction`        | Any ledger transaction lifecycle event.        |
| `legal_entity`              | Any legal entity lifecycle event.              |
| `payment_order`             | Any payment order lifecycle event.             |
| `return`                    | Any return lifecycle event.                    |
| `reversal`                  | Any reversal lifecycle event.                  |
| `transaction`               | Any transaction lifecycle event.               |
| `user_onboarding`           | Any user onboarding lifecycle event.           |

# Contents and Structure

## Webhook skeleton

All Modern Treasury webhooks have the same top level structure.

* `event` specifies what happened to the object.
* `data` contains the updated object that changed.

```json Webhook Skeleton
{
  "event": "event_type",
  "data": {
    // serialized object
  }
}
```

## Sample webhook headers

* `X-Event-ID` is the ID of the Event object that is unique. If there are retries, each individual retry will be tied to the same Event ID. The Event ID is in the Event object in the Event Log and also in each delivery attempt. You can see this Event ID in the Event object in the Event Log and also in each delivery attempt.
* `X-Event-Time` is the time of the event, resolved to a decimal fraction of seconds with a precision of 9.
* `X-Webhook-ID` is a unique ID tied to this specific webhook event that will persist across retries.
* `X-Delivery-ID` is an ID tied uniquely to each individual delivery attempt of this webhook. Across retries, this will change. You can see your webhook delivery attempts in your webhook endpoint pages and at the bottom of each individual Event Log.
* `X-Internal-Signature` is an internal failsafe in the case that a webhook key is ever exposed to a potential attacker. You do not need to pay attention to this Signature. If that attacker were to send you an erroneous webhook event with an X-Signature that is valid (since they have the webhook key), the `X-Internal-Signature` is a method that Modern Treasury can verify against those spurious events.

```json Sample Webhook Headers
{
  "Content-Length": "464",
  "Content-Type": "application/json",
  "X-Topic": "expected_payment",
  "X-Event-ID": "f8651bc8-6862-49c1-9a1a-7ff5ea7aa228",
  "X-Event-Time": "2025-08-07T19:38:01.123456789+07:00",
  "X-Live-Mode": "true",
  "X-Signature": "62d1745dcb53d510963cfb9d3588109903a9ff2cb895ea0f59e5ed38472f6ac8",
  "X-Webhook-ID": "7b5bc00751e4c9760974ee85",
  "X-Delivery-ID": "0413352f-93df-4a4a-851b-2baaa47b4fe5",
  "X-Organization-ID": "<ORGANIZATION_ID>",
  "X-Internal-Signature": "884ee247af1d1d5b0c7122c3e69e1aadf7f83f16c992ea6c7fe557679e7753db",
  "User-Agent": "http.rb/4.2.0"
}
```

## Sample webhook body

```json Sample Webhook Body (Created Expected Payment)
{
  "event": "created",
  "data": {
    "id": "0198860a-5655-7dbc-9cbd-6616a8090fa8",
    "type": null,
    "object": "expected_payment",
    "status": "unreconciled",
    "currency": null,
    "metadata": {},
    "direction": null,
    "live_mode": true,
    "created_at": "2025-08-07T19:38:01Z",
    "updated_at": "2025-08-07T19:38:01Z",
    "description": null,
    "external_id": null,
    "transaction_id": null,
    "counterparty_id": null,
    "date_lower_bound": null,
    "date_upper_bound": null,
    "amount_lower_bound": null,
    "amount_upper_bound": null,
    "internal_account_id": null,
    "statement_descriptor": null,
    "ledger_transaction_id": null,
    "reconciliation_groups": null,
    "reconciliation_method": null,
    "reconciliation_filters": null,
    "remittance_information": null,
    "transaction_line_item_id": null,
    "reconciliation_rule_variables": [
      {
        "type": "ach",
        "currency": "USD",
        "direction": "credit",
        "counterparty_id": null,
        "date_lower_bound": null,
        "date_upper_bound": null,
        "amount_lower_bound": 100000,
        "amount_upper_bound": 100000,
        "custom_identifiers": {},
        "internal_account_id": "49fa49e6-cdfc-4dca-a936-54c8189462f0"
      }
    ]
  }
}
```

# Troubleshooting

<Callout icon="🚧" theme="warn">
  It is important to keep an eye on your webhook endpoint(s) to ensure they are reliably receiving and processing webhooks. By policy, Modern Treasury automatically pauses webhook endpoints when we're unable to deliver events to them for five consecutive days (excepting any days where no deliveries were attempted).
</Callout>

Modern Treasury keeps historical logs of all webhook delivery attempts to aid customers in troubleshooting issues with network connectivity and webhook endpoint behavior. Dashboard users can browse these logs in Developer settings, on the Webhooks page.

Modern Treasury may be configured to notify one or more user groups when a webhook endpoint exhibits a high failure rate or is wholly unresponsive. **We strongly recommend that all customers that use webhooks [subscribe to these notifications](https://docs.moderntreasury.com/platform/docs/webhook-endpoint-best-practices#subscribe-to-webhook-endpoint-failure-notifications)**.
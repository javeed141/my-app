# Best Practices

# Overview

Webhook events enable customers to respond to changes to Modern Treasury resources in near-real-time. You can configure webhook endpoints in your organization's **Developer settings**. Once an endpoint is enabled, Modern Treasury sends it any events matching its subscription settings as they occur.

> 🚧 Sandbox Webhook Rate Limits
>
> Webhook delivery in Sandbox is rate limited to 300 cumulative deliveries per minute across all webhook endpoints. Exceeding this limit will cause delays in receiving webhooks for Sandbox events.

Below are some recommended best practices for integrating with Modern Treasury’s webhook events. We highly encourage you to implement all recommendations as they promote a secure and scalable integration.

## Authenticate all requests to your webhook endpoint

Modern Treasury includes an HMAC signature with each outgoing webhook request in an `X-Signature` HTTP header. Endpoints should [verify each request](https://docs.moderntreasury.com/platform/docs/verifying-webhooks) by: (1) computing an expected HMAC signature for the payload and (2) verifying that the value contained in the `X-Signature` header provided by the sender matches the expected signature.

Depending on your organization's security posture, you may also wish to validate that the IP address of the requestor belongs to Modern Treasury. You can view Modern Treasury’s IP addresses [here](https://docs.moderntreasury.com/platform/reference/ip-addresses).

## Subscribe to webhook endpoint failure notifications

Modern Treasury may be configured to notify users by email when an endpoint exhibits a high delivery failure rate (i.e. when it frequently fails to respond to webhooks with an HTTP `2xx` response, or is otherwise unreachable). These notifications are intended to help you detect and proactively remediate issues that might adversely impact applications downstream of your webhook endpoints.

Webhook endpoint failure notifications are dispatched **daily**, whenever an endpoint exhibits a failure rate of **greater than 30%** over the last day (min. 1,000 delivery attempts).

**To subscribe to notifications**:

1. Ensure you are logged in to `app.moderntreasury.com`.
2. Navigate to the **Settings** page in the main left navigation.
3. Navigate to the **Notifications** page, under **Organization**.
4. Find the input labeled **Webhook Endpoints Fail** and select the role(s) you wish to notify.

## Subscribe to only the events you need

While Modern Treasury supports many types of events, you should subscribe to only those that are essential for your use case. This strategy minimizes the number of requests dispatched to your webhook endpoint, which serves to minimize demand on your associated resources that enable event consumption. Minimizing demand on your resources will also help reduce failure rates for your endpoints. Explicitly subscribing to only events you need also prevents errors when Modern Treasury introduces new events, which might alter the traffic patterns on your endpoints.

As an example, if you were to implement a simple application that uses webhooks to keep track of the payment volume reconciled by Modern Treasury for your organization, you would subscribe to only the `transaction.reconciled` event.

> 📘 Other Options
>
> Webhooks are intended to enable customers to respond to Modern Treasury events in near-real-time. If you feel it necessary to subscribe to many or all of the event types, you may want to consider a more comprehensive data-synchronization solution based on our API or [Push to Warehouse](https://docs.moderntreasury.com/platform/docs/push-to-warehouse) product.

## Respond to requests as quickly as possible

When a webhook endpoint fails to respond to a request *within 5 seconds*, Modern Treasury closes the underlying HTTP connection and records the delivery attempt as failed. Developers should design and implement webhook endpoints that respond in under this limit.

It is often best to delegate processing of webhook payloads to asynchronous jobs. Strictly speaking, endpoints need only do two things synchronously when a request arrives:

1. Authenticate the request
2. Store its contents in a persistent data store for asynchronous processing

Using an asynchronous strategy enables you to quickly respond with an HTTP `2XX` response, ensuring Modern Treasury registers successful receipt of events.

## Handle duplicate events

Modern Treasury guarantees *at-least-once delivery* of events, meaning webhook endpoints may occasionally receive duplicate events. All event requests include an `X-Webhook-ID` header, which may be used to deduplicate webhook events.
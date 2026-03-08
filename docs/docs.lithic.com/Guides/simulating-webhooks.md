# Simulating Webhook Events

Simulate webhook events through the Events API

You can send sample webhooks in the Sandbox environment using the simulation endpoint.

```
POST https://sandbox.lithic.com/v1/simulate/event_subscriptions/{event_subscription_token}/send_example
```

**Sample Request**

```curl
curl https://sandbox.lithic.com/v1/simulate/event_subscriptions/ep_2VVERxQnBoXIeAyr9IGnM0d10F9/send_example \
  -X POST
  -H 'Authorization: YOUR_API_KEY' \
  -H 'accept: application/json' \
  -H 'content-type: application/json' \
  -d '
{
  "event_type": "card.created"
}
```

See [Event Types](https://docs.lithic.com/docs/types-of-events) for a list of all events you can simulate.
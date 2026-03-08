# Migrate from Legacy Transaction Webhooks to our Events API

Lithic's initial event-driven card transaction updates via webhooks are evolving. Addressing customer requests, we've developed the [Events API](https://docs.lithic.com/docs/events-api) for a broader range of events and historical data access.

As we phase out the old webhook system, we ensure a smooth transition by maintaining the same schema and temporarily sharing the same HMAC headers. The legacy HMAC headers (`X-Lithic-HMAC` and `X-Lithic-Signature`) will be available in the Events API for six months before fully transitioning to the `webhook-signature` header at which time Legacy Transaction Webhooks will be retired as well.

> 💡 Always test in sandbox first!
>
> Transactions simulated in sandbox will be sent via Legacy Transaction Webhooks and Events API. See [simulating transactions](https://docs.lithic.com/docs/simulating-transactions) and [simulating webhooks](https://docs.lithic.com/docs/simulating-webhooks) for more information.

### How do I know if I'm on Legacy Transaction Webhooks?

If you configured your webhooks from the Program Settings page of the Lithic dashboard, then you are using transaction webhooks. Another way to tell is if your webhook ***does not*** receive the newer `webhook-signature` header, you are using Legacy Transaction Webhooks.

<Image align="center" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/b03f095a86291854_1adaf69db7d3d8909232ae6d2a984387a84fb2a72060bdacaf0d49532d9fb747-how-do-i-know-if-im-on-legacy-transaction-webhooks.png" />

## Choosing your Approach

Lithic’s webhooks perform ***at-least-once*** message delivery, meaning that messages can (very rarely) be delivered twice. We recommend that all webhook endpoints be idempotent, meaning processing the same message twice won't alter the outcome.

If your system handles duplicate messages, we recommend option 1 below where you enable a second endpoint and then disable the original. If your system does not, see option 2.

## Option 1: **For Idempotent Message Processin&#x67;*(Recommended)***

If your system handles duplicates well, simply add an Events API subscription, confirm message reception, and then deactivate the legacy Transaction Webhook subscription for a seamless transition.

**Steps:**

1. **Create an Events API Event Subscription:** Use the API to [create a new subscription for your current endpoint](https://docs.lithic.com/docs/events-api#create-event-subscription) for the `card_transaction.updated` event. This will only capture the types of events that would have been sent by legacy transaction webhooks.

   ```bash
   curl https://api.lithic.com/v1/event_subscriptions \
   	-X POST \
   	-H "Authorization: ${YOUR_API_KEY}" \
   	-H 'accept: application/json' \
   	-H 'content-type: application/json' \
   	-d '
   {
   	"url": "https://www.example.com/webhooks",
   	"description": "Transaction webhook subscription to <example microservice>",
   	"event_types": "card_transaction.updated"
   }
   '
   ```

2. **Verify New Endpoint Functionality:** Ensure that messages are being correctly received and processed by the new API. You can do this both by checking your own logs and also by listing [Events API message delivery attempts](https://docs.lithic.com/docs/events-api#listing-message-attempts). Note, Events API events have an Event ID that can be used to lookup information about a sent event and our legacy system had no equivalent.

3. **Remove Legacy Transaction Webhook Subscription:** Once you confirm that the new endpoint is fully operational, decommission your legacy webhook by updating your Program Settings in the Lithic Dashboard and removing the old webhook.

4. **Update your HMAC verification:** Switch from using the older `X-Lithic-Signature` or `X-Lithic-HMAC` headers to the newer `webhook-signature` header. We recommend using our [official libraries](https://docs.lithic.com/docs/api-libraries) to validate webhooks (see individual readme’s for webhook validation procedures) or [consult our documentation](https://docs.lithic.com/docs/events-api#verifying-webhooks) to roll your own.

## **Option 2: For Non-Idempotent Message Processing**

If receiving the same message more than once causes problems for your systems, then migrating will require. few extra steps.

1. **Remove Old Endpoint:** First, deactivate your current legacy webhook endpoint. You can do this by unchecking the webhook on the Lithic Dashboard under *Program Settings*. You will no longer be receiving messages.

2. **Add New Events API Event Subscription:** This will start delivering Events API events to your endpoint.

   ```bash
   curl https://api.lithic.com/v1/event_subscriptions \
   	-X POST \
   	-H "Authorization: ${YOUR_API_KEY}" \
   	-H 'accept: application/json' \
   	-H 'content-type: application/json' \
   	-d '
   {
   	"url": "https://www.example.com/webhooks",
   	"description": "Transaction webhook subscription to <example microservice>",
   	"event_types": "card_transaction.updated"
   }
   '
   ```

3. **Replay Missed Events:** Utilize [the 'List Events' endpoint](https://docs.lithic.com/docs/events-api#list-all-events) to identify and replay any events that occurred during the transition period. Lithic webhooks perform retries on failed delivery and so they never guarantee delivery order, but be aware that event replay can result in many more out of order messages than usual.

   ```bash
   curl 'https://api.lithic.com/v1/events?event_types=card_transaction.updated&limit=250&with_content=true' \
   	-H "Authorization: ${YOUR_API_KEY}" \
   	-H 'accept: application/json'
   ```

   The above will list events in pages of 250 messages. You can use this list to compare to your database or logs and identify messages you missed during the transition. Using the `timestamp` field you can identify the time range where messages were missed. Once you have this, you can request for Events API to replay the time range that had missing messages by setting the begin and end times in a request like below.

   ```bash
   curl 'https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1/replay_missing' \
     -X 'POST' \
   	-H "Authorization: ${YOUR_API_KEY}" \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
       "begin": "2023-01-01T14:15:00Z",
       "end": "2023-01-20T14:15:00Z"
   }'
   ```

4. **Update your HMAC verification:** Switch from using the older `X-Lithic-Signature` or `X-Lithic-HMAC` headers to the newer `webhook-signature` header. We recommend using our [official libraries](https://docs.lithic.com/docs/api-libraries) to validate webhooks (see individual readme’s for webhook validation procedures) or [consult our documentation](https://docs.lithic.com/docs/events-api#verifying-webhooks) to roll your own.
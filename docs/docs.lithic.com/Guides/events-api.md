# Events API and Webhooks

Learn how to receive and query events.

Webhooks are near-time messages about API events that are sent after they happen. With Lithic Events, you can register and manage webhook URLs, replay webhook messages, control event subscription secrets, and search past events.

# Event Subscription Schema

```json
{
  "description": "Example Event Subscription",
  "token": "ep_1srOrx2ZWZBpBUvZwXKQmoEYga1",
  "event_types": null,
  "disabled": false,
  "url": "https://www.lithic.com/webhooks"
}
```

| Field        | Description                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description  | Event subscription description. *String.*                                                                                                                                           |
| event\_types | Indicates types of events that will be sent to this subscription. If left blank, all types will be sent. See [Event Types](https://docs.lithic.com/docs/events-api#event-types) for complete list. *String.* |
| disabled     | Represents whether the event subscription is active (`false`) or inactive (`true`). *Boolean.*                                                                                      |
| url          | URL to which event webhooks will be sent. URL must be a valid HTTPS address. *String.*                                                                                              |
| token        | Unique identifier for event subscription. *String.*                                                                                                                                 |

# Create Event Subscription

```
POST https://api.lithic.com/v1/event_subscriptions
```

**Sample Request**

```json
curl https://api.lithic.com/v1/event_subscriptions \
	-X POST \
	-H 'Authorization: YOUR_API_KEY' \
	-H 'accept: application/json' \
	-H 'content-type: application/json' \
	-d '
{
	"url": "https://www.lithic.com/webhooks",
	"description": "Subscription to all event types"
}
'
```

**Sample Response**

```json
{
  "description": "Subscription to all event types",
  "token": "ep_1srOrx2ZWZBpBUvZwXKQmoEYga1",
  "event_types": null,
  "disabled": false,
  "url": "https://www.lithic.com/webhooks",
  "debugging_request_id": "2b736cba-a7a7-4036-8454-0d48a2cc15ed"
}
```

| Parameter                 | Description                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| description *(optional)*  | Event subscription description. *String.*                                                                          |
| event*types* (optional)\_ | Indicates types of events that will be sent to this subscription. If left blank, all types will be sent. *String.* |
| disabled *(optional)*     | Represents whether the event subscription is active (`false`) or inactive (`true`). *Boolean.*                     |
| url *(required)*          | URL to which event webhooks will be sent. URL must be a valid HTTPS address. *String.*                             |

# List Event Subscriptions

```
GET https://api.lithic.com/v1/event_subscriptions
```

**Sample Request**

```json
curl https://api.lithic.com/v1/event_subscriptions \
	-H 'Authorization: YOUR_API_KEY' \
	-H 'accept: application/json'
```

**Sample Response**

```json
{
  "data": [
    {
      "description": "First Event Subscription",
      "token": "ep_1srOrx2ZWZBpBUvZwXKQmoEYga1",
      "event_types": null,
      "disabled": false,
      "url": "https://www.lithic.com/webhooks"
    }
  ],
  "has_more": false
}
```

| Parameter                                     | Description                                                                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| page*size* (optional, query parameter)\_      | For pagination - specifies the number of entries to be included on each page in the response. Default value is 50. <br /> *Integer. Permitted values: 1-100.* |
| starting*after* (optional, query parameter)\_ | For pagination - event subscriptions created after the specified event token will be included. *String.*                                                      |
| ending*before* (optional, query parameter)\_  | For pagination - event subscriptions created before the specified event token will be included. *String.*                                                     |

# Get Event Subscription

```
GET https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}
```

**Sample Request:**

```json
curl https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1 \
 	-H 'Authorization: YOUR_API_KEY' \
 	-H 'accept: application/json'
```

**Sample Response:**

```json
{
  "description": "First Event Subscription",
  "token": "ep_1srOrx2ZWZBpBUvZwXKQmoEYga1",
  "event_types": null,
  "disabled": false,
  "url": "https://www.lithic.com/webhooks"
}
```

| Parameter                                               | Description                                                             |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription. <br /> *String.* |

# Update Event Subscription

```
PATCH https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}
```

**Sample Request**

```json
curl --request PATCH \
     --url https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1 \
     --header 'Authorization: 1fe14193-bf47-4336-8366-f8680d6e9250' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
     "description": "Updated Event Subscription",
     "disabled": true,
     "url": "https://www.lithic.com/webhooks2"
}
'
```

**Sample Response**

```json
{
  "description": "Updated Event Subscription",
  "token": "ep_1srOrx2ZWZBpBUvZwXKQmoEYga1",
  "event_types": null,
  "disabled": true,
  "url": "https://www.lithic.com/webhooks2"
}
```

| Parameter                                               | Description                                                                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription to be updated. <br /> *String.*                                                            |
| disabled *(optional)*                                   | Represents whether the event subscription is active (`false`) or inactive (`true`). *Boolean.*                                                   |
| event*types* (optional)\_                               | Indicates types of events will be sent to this subscription. If not specified, all types will be sent.                                           |
| url *(required)*                                        | URL to which event webhooks will be sent. URL must be a valid HTTPS address. *String.*                                                           |
| description *(optional)*                                | Description for your event subscription. We recommend against using this field to store JSON data as it can cause unexpected behavior. *String.* |

# Delete Event Subscription

```
DELETE https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}
```

**Sample Request**

```json
curl https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1 \
  -X DELETE \
  -H 'Authorization: YOUR_API_KEY' \
  -H 'content-type: application/json'
```

**Sample Response**

```text
No Content
```

| Parameter                                               | Description                                                                           |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription to be deleted. <br /> *String.* |

# Resend Failed Messages

Resend all failed messages since a given time. Lithic marks non-2XX responses as failed.

```
POST https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}/recover
```

**Sample Request**

```json
curl https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1/recover \
  -X POST \
  -H 'Authorization: YOUR_API_KEY' \
  -H 'accept: application/json' \
  -H 'content-type: application/json' \
  -d '{
    "begin": "2023-01-01T14:15:00Z",
    "end": "2023-01-20T14:15:00Z"
}'
```

**Sample Response**

```
No Content
```

| Parameter                                               | Description                                                                                                                                   |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription whose messages you want resent. <br /> *String.*                                        |
| begin *(optional, query parameter)*                     | Events created on or after the specified date will be included. <br /> *String.*                                                              |
| end *(optional, query parameter)*                       | Events created before the specified date will be included (i.e., events created on the specified date will not be included). <br /> *String.* |

# Replay Missing Messages

Replay messages to the endpoint. Only messages that were created after `begin` will be sent. Messages that were previously sent to the endpoint are not resent. Replay is only available for up to 90 days.

Message will be retried if endpoint responds with a non-2xx status code. See [Retry Schedule](https://docs.lithic.com/docs/events-api#retry-schedule) for details.

> 📘 Replay Missing vs. Resend Failed
>
> It's worth distinguishing between the 'replay missing' and the 'resend failed' endpoint. The 'replay missing' is designed for scenarios where new endpoints are registered. In such situations, Lithic didn't attempt to send any data because there was no registered endpoint available at that time. You can think of it as "catching up" a newly registered endpoint.

```
GET https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}/replay_missing
```

**Sample Request**

```curl
curl 'https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1/replay_missing' \
  -X 'POST' \
  -H 'Authorization: YOUR_API_KEY' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "begin": "2023-01-01T14:15:00Z",
    "end": "2023-01-20T14:15:00Z"
}'
```

**Sample Response**

```
No Content
```

| Parameter                                               | Description                                                                                                                                   |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription whose messages you want resent. <br /> *String.*                                        |
| begin *(optional, query parameter)*                     | Events created on or after the specified date will be included. <br /> *String.*                                                              |
| end *(optional, query parameter)*                       | Events created before the specified date will be included (i.e., events created on the specified date will not be included). <br /> *String.* |

# Get Event Subscription Secret

```
GET https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}/secret
```

**Sample Request**

```json
curl https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1/secret \
  -H 'Authorization: YOUR_API_KEY' \
  -H 'accept: application/json'
```

**Sample Response**

```json
{
  "key": "whsec_qhVbLvxSzK3OyH4baRAKDUGm3az3bduK"
}
```

| Parameter                                               | Description                                                                                               |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription whose secret you want to retrieve. <br /> *String.* |

# Rotate Event Subscription Secret

<Callout icon="📘" theme="info">
  The previous secret will be valid for the next 24 hours. See Validating Webhooks for more information on how to validate signatures.
</Callout>

```
POST https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}/secret/rotate
```

**Sample Request**

```json
curl https://api.lithic.com/v1/event_subscriptions/ep_1srOrx2ZWZBpBUvZwXKQmoEYga1/secret/rotate \
	-X POST \
	-H 'Authorization: YOUR_API_KEY' \
	-H 'content-type: application/json'
```

**Sample Response**

```text
No Content
```

| Parameter                                               | Description                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription whose secret you want to rotate. <br /> *String.* |

# List All Events

List events previous events. All events in the preceding 90 days should be present with the full payload that was sent. Events are sorted from newest to oldest. Running two queries for a past time period the the same `event_types` and `starting_after` cursor should provide the same results.

```
GET https://api.lithic.com/v1/events
```

**Sample Request**

```json
curl 'https://api.lithic.com/v1/events' \
 -H 'Authorization: YOUR_API_KEY' \
 -H 'accept: application/json'
```

**Sample Response**

```json
{
	"data": [...],
	"has_more": false
}
```

| Parameter                                     | Description                                                                                                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| page*size* (optional, query parameter)\_      | For pagination - specifies the number of entries to be included on each page in the response. Default value is 50. <br /> *Integer. Permitted values: 1-1000.* |
| starting*after* (optional, query parameter)\_ | For pagination - events created after the specified event token will be included. <br /> *String.*                                                             |
| ending*before* (optional, query parameter)\_  | For pagination - Events created before the specified event token will be included. <br /> *String.*                                                            |
| begin *(optional, query parameter)*           | Events created on or after the specified date will be included. <br /> *String.*                                                                               |
| end *(optional, query parameter)*             | Events created before the specified date will be included (i.e., events created on the specified date will not be included). <br /> *String.*                  |
| event*types* (optional, query parameter)\_    | Event types to filter by. Note you must pass event types as a comma separated list, i.e. `event_types=foo,bar`.                                                |

# Get Specific Event

```
GET https://api.lithic.com/v1/events/{event_token}
```

**Sample Request**

```json
curl https://api.lithic.com/v1/events/msg_1srOrx2ZWZBpBUvZwXKQmoEYga1 \
	-H 'Authorization: YOUR_API_KEY' \
	-H 'accept: application/json'
```

**Sample Response**

```json
{
	"token": "msg_1srOrx2ZWZBpBUvZwXKQmoEYga1",  // this is the same as webhook-id in the header
	"event_type": "dispute.updated",
	"payload": {...},  // includes event_type
	"created": "2022:10:10T12:31:12Z"
}
```

| Parameter                                 | Description                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| event*token* (required, path parameter)\_ | Globally unique identifier for the event you want to retrieve. <br /> *String.* |

# Resend an Event

```
POST https://api.lithic.com/v1/events/{event_token}/event_subscriptions/{event_subscription_token}/resend
```

**Sample Request**

```Text cURL
curl -X POST https://api.lithic.com/v1/events/msg_1srOrx2ZWZBpBUvZwXKQmoEYga1/event_subscriptions/msg_123Orx2ZWZBpBUvZwXKQmoEYabc/resend \
	-H 'Authorization: YOUR_API_KEY' \
	-H 'accept: application/json'
```

| Parameter                                               | Description                                                                                  |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| event*token* (required, path parameter)\_               | Globally unique identifier for the event you want to retrieve. <br /> *String.*              |
| event*subscription\_token* (required, path parameter)\_ | Globally unique identifier for the event subscription you want to retrieve. <br /> *String.* |

# Verifying Webhooks

<Callout icon="📘" theme="info">
  The recommended way to verify webhooks is using our [official libraries](https://docs.lithic.com/docs/api-libraries). See the README of their repositories for how to use them to verify webhooks.
</Callout>

Each webhook call includes three headers that can be used for verification:

* `webhook-id`: Identifier for the webhook message that distinguishes it from other messages. This identifier will remain unchanged if the same webhook message is resent (e.g., due to a previous failure). This is the same as `event.token`.
* `webhook-timestamp`: [Unix time](https://en.wikipedia.org/wiki/Unix_time).
* `webhook-signature`: A list of signatures encoded in Base64 and separated by spaces. Can be multiple as a result of rotation.

## Constructing the signed content

The content to sign is composed by concatenating the id, timestamp and payload, separated by the full-stop character (`.`). In code, it will look something like:

```javascript
signedContent = "${webhookId}.${webhookTimestamp}.${body}";
```

Here, `body` refers to the raw body of the request. Note that your web framework may be parsing the JSON body for you automatically - make sure you are using the raw request body, especially in untyped languages.

## Calculate the expected signature

Lithic uses an [HMAC](https://en.wikipedia.org/wiki/HMAC) with [SHA-256](https://en.wikipedia.org/wiki/SHA-2) to sign its webhooks. Each webhook request includes a cryptographic signature that proves it originated from Lithic. Verify this signature using your webhook secret to authenticate the request. This signature-based approach provides stronger security than IP whitelisting and supports our modern, distributed cloud-native infrastructure. As such, we do not provide static IP addresses for whitelisting.

Calculate the expected signature by applying HMAC to the `signedContent` using the Base64 part of your signing secret, which comes after the `whsec_` prefix, as the key. For instance, with the secret `whsec_uV7N6t5FJWzsRxkTQA9MKDYh1BgBgDcR`, you should use `uV7N6t5FJWzsRxkTQA9MKDYh1BgBgDcR` as the key. Secrets are configured on a per-program basis, so if you have multiple programs, ensure you are using the correct key for each program.

This generated signature should match one of the ones sent in the `webhook-signature` header.

The `webhook-signature` header is composed of a list of space delimited signatures and their corresponding version identifiers. Multiple signatures can be included in the event of say a secret rotation.

**Example header with multiple signature**

```
v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE= v1,bm9ldHUjKzFob2VudXRob2VodWUzMjRvdWVvdW9ldQo=
```

> 🚧 Make sure to remove the version prefix and delimiter (e.g. v1,) before verifying the signature.

## Verify timestamp

It's recommended to use a constant-time string comparison method in order to prevent timing attacks.

As mentioned above, Lithic also sends the timestamp of the attempt in the `webhook-timestamp` header. You should compare this timestamp against your system timestamp and make sure it's within your tolerance in order to prevent replay attacks.

## Example code

```python Python (Lithic Library)
@app.post('/my-webhook-handler')
async def handler(request: Request):
    body = await request.body()
    secret = os.environ['LITHIC_WEBHOOK_SECRET']  # env var used by default; explicit here.
    payload = client.webhooks.unwrap(body, request.headers, secret)
    print(payload)

    return {'ok': True}
```

```typescript Typescipt (Lithic Library)
// with Express:
app.use(
  "/webhooks/lithic",
  bodyParser.text({ type: "*/*" }),
  function (req, res) {
    const payload = lithic.webhooks.unwrap(
      req.body,
      req.headers,
      process.env["LITHIC_WEBHOOK_SECRET"],
    ); // env var used by default; explicit here.
    console.log(payload);
    res.json({ ok: true });
  },
);

// with Next.js (app router):
export default async function POST(req) {
  const body = await req.text(); // if you're using the pages router, you will need this trick: https://vancelucas.com/blog/how-to-access-raw-body-data-with-next-js/
  const payload = lithic.webhooks.unwrap(
    body,
    req.headers,
    process.env["LITHIC_WEBHOOK_SECRET"],
  ); // env var used by default; explicit here.
  console.log(payload);
  return NextResponse.json({ ok: true });
}
```

```python
import base64
import hashlib
import hmac
import json
import typing as t
from datetime import datetime, timedelta, timezone
from math import floor


class WebhookVerificationError(Exception):
    pass


def hmac_data(key: bytes, data: bytes) -> bytes:
    return hmac.new(key, data, hashlib.sha256).digest()


def verify_timestamp(timestamp_header: str) -> str:
    webhook_tolerance = timedelta(minutes=5)
    now = datetime.now(tz=timezone.utc)
    try:
        timestamp = datetime.fromtimestamp(float(timestamp_header), tz=timezone.utc)
    except Exception:
        raise WebhookVerificationError("Invalid Signature Headers")

    if timestamp < (now - webhook_tolerance):
        raise WebhookVerificationError("Message timestamp too old")
    if timestamp > (now + webhook_tolerance):
        raise WebhookVerificationError("Message timestamp too new")
    return timestamp_header


def sign_webhook(whsecret: bytes, msg_id: str, timestamp: str, data: str) -> str:
    to_sign = f"{msg_id}.{timestamp}.{data}".encode()
    signature = hmac_data(whsecret, to_sign)
    return f"v1,{base64.b64encode(signature).decode('utf-8')}"


def verify_webhook(whsecret: str, data: bytes, headers: t.Dict[str, str]) -> bool:
    SECRET_PREFIX = "whsec_"
    if whsecret.startswith(SECRET_PREFIX):
        whsecret = whsecret[len(SECRET_PREFIX) :]
    whsecret = base64.b64decode(whsecret)

    headers = {k.lower(): v for (k, v) in headers.items()}
    msg_id = headers.get("webhook-id")
    msg_signature = headers.get("webhook-signature")
    msg_timestamp = headers.get("webhook-timestamp")

    if not (msg_id and msg_timestamp and msg_signature):
        raise WebhookVerificationError("Missing required headers")

    timestamp = verify_timestamp(msg_timestamp)
    expected_sig = base64.b64decode(sign_webhook(whsecret, msg_id, timestamp, data).split(",")[1])

    # Signature header can contain multiple signatures delimited by spaces
    passed_sigs = msg_signature.split(" ")

    for versioned_sig in passed_sigs:
        (version, signature) = versioned_sig.split(",")
        # Only verify prefix v1
        if version != "v1":
            continue
        sig_bytes = base64.b64decode(signature)
        if hmac.compare_digest(expected_sig, sig_bytes):
            return True

    raise False
```

```javascript TypeScript
const WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60; // 5 minutes

class ExtendableError extends Error {
    constructor(message: any) {
        super(message);
        Object.setPrototypeOf(this, ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message).stack;
    }
}

export class WebhookVerificationError extends ExtendableError {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
    }
}

export interface WebhookRequiredHeaders {
    "webhook-id": string;
    "webhook-timestamp": string;
    "webhook-signature": string;
}

export interface WebhookOptions {
    format?: "raw";
}

/** Make an assertion, if not `true`, then throw. */
function assert(expr: unknown, msg = ""): asserts expr {
    if (!expr) {
        throw new Error(msg);
    }
}

/** Compare to array buffers or data views in a way that timing based attacks
 * cannot gain information about the platform. */
function timingSafeEqual(
    a: ArrayBufferView | ArrayBufferLike | DataView,
    b: ArrayBufferView | ArrayBufferLike | DataView
): boolean {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
    }
    if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
    }
    assert(a instanceof DataView);
    assert(b instanceof DataView);
    const length = a.byteLength;
    let out = 0;
    let i = -1;
    while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
    }
    return out === 0;
}

export class Webhook {
    private static prefix = "whsec_";
    private readonly key: Uint8Array;

    constructor(secret: string | Uint8Array, options?: WebhookOptions) {
        if (!secret) {
            throw new Error("Secret can't be empty.");
        }
        if (options?.format === "raw") {
            if (secret instanceof Uint8Array) {
                this.key = secret;
            } else {
                this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
            }
        } else {
            if (typeof secret !== "string") {
                throw new Error("Expected secret to be of type string");
            }
            if (secret.startsWith(Webhook.prefix)) {
                secret = secret.substring(Webhook.prefix.length);
            }
            this.key = base64.decode(secret);
        }
    }

    public verify(
        payload: string,
        headers_:
            | WebhookRequiredHeaders
            | Record<string, string>
    ): unknown {
        const headers: Record<string, string> = {};
        for (const key of Object.keys(headers_)) {
            headers[key.toLowerCase()] = (headers_ as Record<string, string>)[key];
        }

        let msgId = headers["webhook-id"];
        let msgSignature = headers["webhook-signature"];
        let msgTimestamp = headers["webhook-timestamp"];

        if (!msgSignature || !msgId || !msgTimestamp) {
            throw new WebhookVerificationError("Missing required headers");
        }

        const timestamp = this.verifyTimestamp(msgTimestamp);

        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];

        const passedSignatures = msgSignature.split(" ");

        const encoder = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
            const [version, signature] = versionedSignature.split(",");
            if (version !== "v1") {
                continue;
            }

            if (timingSafeEqual(encoder.encode(signature), encoder.encode(expectedSignature))) {
                return JSON.parse(payload);
            }
        }
        throw new WebhookVerificationError("No matching signature found");
    }

    public sign(msgId: string, timestamp: Date, payload: string): string {
        const encoder = new TextEncoder();
        const toSign = encoder.encode(`${msgId}.${timestamp.getTime() / 1000}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
    }

    private verifyTimestamp(timestampHeader: string): Date {
        const now = Math.floor(Date.now() / 1000);
        const timestamp = parseInt(timestampHeader, 10);
        if (isNaN(timestamp)) {
            throw new WebhookVerificationError("Invalid Signature Headers");
        }

        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
            throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
            throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1000);
    }
}
```

## Example signature computation

Given the example headers below extracted from the request and an example body (Python):

```
webhookId = "65a9dad4-1b60-4686-83fd-65b25078a4b4"
timestamp = 1698031907 #2023-10-23 03:31:47.000
secret = "aDeFC3Zn55XB3PDD2zF0JP9cyrDHdV/18VOmkTcuyto="
body = '{"acquirer_fee":0,"amount":2000,"authorization_amount":2000}'
```

The expected signature will be computed as `"OGBiqPtc/O2sWacUsuS4pvTdfFBv6dqxYX/4UFzrbGk="` using Lithic HMAC libraries or the example code above.

# Retry Schedule

Each message is attempted based on the following schedule, where each period is started following the failure of the preceding attempt:

```
Immediate  → +5s  → +5m  → +30m  → +2h  → +5h  → +10h  → +10h (additional and final)

(s = seconds, m = minutes, h = hours)
```

For example, an attempt that fails three times before eventually succeeding will be delivered roughly 35 minutes and 5 seconds following the first attempt. Events will not be retired after the 8th attempt.

If an endpoint is removed or disabled delivery attempts to the endpoint will be disabled as well.

## What if all retries are failing?

If your subscription fails for ***5 days continuously*** it will be disabled automatically. You can [re-enable it by updating the event subscription](https://docs.lithic.com/docs/events-api#update-event-subscription) and setting `"disabled": false`. Re-enabling gives you 5 more days to fix your issue before it is automatically disabled again.

## Manual retries

You can also manually retry each message at any time, or automatically retry ("recover") all failed messages starting from a given date.

* Resend webhook for retrying a single message.
* Resend failed webhooks for the failed messages recovery.

# Message Attempts

An "attempt" signifies an effort to deliver a message to a specific endpoint. It also logs the content of the response from the endpoint, the HTTP status code of the response, along with other associated properties. In case of failures, **multiple** such entities may exist. These "attempt" entities can be later accessed for analysis and review.

## Listing message attempts

You can list attempts for a specific message or across an entire subscription.

```
GET https://api.lithic.com/v1/events/{event_token}/attempts
GET https://api.lithic.com/v1/event_subscriptions/{event_subscription_token}/attempts
```

| Parameter                                     | Description                                                                                                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| page*size* (optional, query parameter)\_      | For pagination - specifies the number of entries to be included on each page in the response. Default value is 50. <br /> *Integer. Permitted values: 1-1000.* |
| starting*after* (optional, query parameter)\_ | For pagination - events created after the specified event token will be included. <br /> *String.*                                                             |
| ending*before* (optional, query parameter)\_  | For pagination - Events created before the specified event token will be included. <br /> *String.*                                                            |
| begin *(optional, query parameter)*           | Events created on or after the specified date will be included. <br /> *String.*                                                                               |
| end *(optional, query parameter)*             | Events created before the specified date will be included (i.e., events created on the specified date will not be included). <br /> *String.*                  |
| status *(optional, query parameter)*          | Status of message attempt to filter (`FAILED`, `PENDING`, `SENDING`, `SUCCESS`).                                                                               |

## Message Attempt Schema

```json
{
  "created": "2023-07-18T00:45:37.195Z",
  "event_subscription_token": "ep_1srOrx2ZWZBpBUvZwXKQmoEYga1",
  "event_token": "msg_1srOrx2ZWZBpBUvZwXKQmoEYga1",
  "response": "string",
  "response_status_code": 400,
  "status": "FAILED",
  "url": "string",
  "token": "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2"
}
```

| Field                      | Description                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| created                    | Created datetime. *String.*                                            |
| event\_subscription\_token | Event subscription token. *String.*                                    |
| event\_token               | Event token. *String.*                                                 |
| response                   | Response string of server. *String.*                                   |
| response\_status\_code     | Response status code of server. *Integer*                              |
| status                     | Status of attempt. `FAILED`, `PENDING`, `SENDING`, `SUCCESS`. *String* |
| url                        | URL message was sent to. *String.*                                     |
| token                      | Identifier of attempt. *String.*                                       |

# Sending Example Events

See [Simulating Webhook Events](https://docs.lithic.com/docs/simulating-webhooks).

# Event Types

See [Event Types](https://docs.lithic.com/docs/types-of-events) for a list of all events.
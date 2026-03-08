# Guide for Webhooks v2

> 📘 This guide focuses on **version 2 (v2)** of our **general** webhooks.
>
> If you want to learn about our App-Specific Webhooks, which can be created only by Marketplace apps, then you can do it [here](https://pipedrive.readme.io/docs/webhooks-for-apps).

## About webhooks

<hr />

**Webhooks** allow you to get programmatic notifications from Pipedrive about changes to your data as they happen. If you’re new to webhooks, [read this guide](https://requestbin.com/blog/working-with-webhooks/) to learn more.

Webhooks v2 brings **added reliability and stability** by **reducing duplicate and missing webhook triggers** and **delays** and giving you **better debugging** capabilities. In addition, you can now **create`lead` webhooks** in v2.

Rather than requiring you to pull information via our API, webhooks will **push** information to your endpoint. When one of those events is triggered (for example, a new deal is added), Pipedrive will send this notification as an HTTP `POST` request, with a JSON body, to the endpoint(s) you specify.

The **maximum limit** of webhooks is **40 different webhooks per user**.

<hr />

## How to create webhooks v2 via API

<hr />

When creating webhooks v2 via API, please ensure you add the `version` parameter to the webhook request body.

You will be able to see the v2 webhooks you’ve created in the Pipedrive web app via [*Settings > Tools and apps > (Tools) > Webhooks*](https://app.pipedrive.com/webhooks).

**`POST/v1/webhooks`**
Creates a new Webhook and returns its details. Specifying an event that triggers the Webhook combines 2 parameters - `event_action` and `event_object`. E.g., use `*.*` for getting notifications about all events, `create.deal` for any newly added deals, `delete.persons` for any deleted persons, etc.

**Body parameters**
`application/json`

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th />

      <th />
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        subscription\_url
        (string, required)
      </td>

      <td>
        A full, valid, publicly accessible URL which determines where to send the notifications.NB: Pipedrive API endpoints cannot be used as the `subscription_url` and the chosen URL must not redirect to another link.
      </td>
    </tr>

    <tr>
      <td>
        event\_action\
        (string, required)
      </td>

      <td>
        The type of [action](guide-for-webhooks-v2#supported-event-actions) to receive notifications about. Wildcard will match all supported actions. Values: `create`, `change`, `delete`, `*`
      </td>
    </tr>

    <tr>
      <td>
        event\_object\
        (string, required)
      </td>

      <td>
        The type of [object](https://pipedrive.readme.io/docs/guide-for-webhooks-v2#supported-object-types) to receive notifications about. Wildcard will match all supported objects. Values: `activity`, `deal`, `lead`, `note`, `organization`, `person`, `pipeline`, `product`, `stage`, `user`, `*`
      </td>
    </tr>

    <tr>
      <td>
        version\
        (string)
      </td>

      <td>
        Webhook version. Values: `1.0`, `2.0`

        **NB**: If the `version` parameter value is not specified, `2.0` will be used as default.
      </td>
    </tr>

    <tr>
      <td>
        user\_id\
        (integer)
      </td>

      <td>
        The ID of the user that this webhook will be authorized with. You have the option to use a different user's `user_id`. If it’s not set, the current user's `user_id` will be used.As each webhook event is checked against a user’s permissions, the webhook will only be sent if the user has access to the specified object(s). If you want to receive notifications for all events, please use a top-level admin user’s `user_id`.
      </td>
    </tr>

    <tr>
      <td>
        http\_auth\_user\
        (string)
      </td>

      <td>
        The HTTP basic auth username of the subscription URL endpoint
      </td>
    </tr>

    <tr>
      <td>
        http\_auth\_password\
        (string)
      </td>

      <td>
        The HTTP basic auth password of the subscription URL endpoint
      </td>
    </tr>

    <tr>
      <td>
        name\
        (string)
      </td>

      <td>
        The name of the webhook
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Webhook format

<hr />

```json
{
    "meta": {
        "action": "create",
        "entity": "deal",
        "company_id": "xxxxx",
        "correlation_id": "xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "entity_id": "xxx",
        "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "is_bulk_edit": false,
        "timestamp": "2023-01-01T00:00:00.000Z",
        "type": "general",
        "user_id": "xxxxx",
        "version": "2.0",
        "webhook_id": "xxx",
        "webhook_owner_id": "xxxxxx",
        "change_source": "app",
        "attempt": 1,
        "host": "company.pipedrive.com",
        "permitted_user_ids": ["123", "456", "789"], // present for entities other than 'user'
    },
    "data": ( the object data as of this update ),
    "previous": ( the previous data of the object fields that have been changed )
 }
```

See the explanations for the webhook meta block’s parameters [here](https://pipedrive.readme.io/docs/guide-for-webhooks-v2#webhooks-meta-block).

<hr />

## `Attempt` field explanation

<hr />

> 📘 For a successful delivery, we'll accept any 2XX status code.
>
> Anything else is counted as a failure and the [retry policy](https://pipedrive.readme.io/docs/guide-for-webhooks-v2#retry-logic) will commence.

You can determine the number of delivery attempts according to the value of the `attempt` field in the payload (see the format [above](https://pipedrive.readme.io/docs/guide-for-webhooks-v2#webhook-format)). Learn about the retry logic below.

| `Attempt` value | Value explanation                      |
| :-------------- | :------------------------------------- |
| `1`             | Webhook delivered on the first attempt |
| `2`             | Webhook delivered on the first retry   |
| `3`             | Webhook delivered on the second retry  |
| `4`             | Webhook delivered on the third retry   |

<hr />

## `Data` and `previous`

<hr />

In the `data` block, the standard data contains only crucial information about the entity and related/connected entities if their `id`s are provided. You can see the payload for webhooks v2 in the [migration guide here](https://pipedrive.readme.io/docs/webhooks-v2-migration-guide#webhook-v2-examples).

In the `previous` block, the standard data contains only the fields that have changed.

| Action             | Event action | Data                   | Previous                |
| :----------------- | :----------- | :--------------------- | :---------------------- |
| Deleting objects   | delete       | null                   | last state (object)     |
| Adding new objects | create       | current state (object) | null                    |
| Updating objects   | change       | current state (object) | previous state (object) |

<hr />

## Webhook’s meta block

<hr />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Examples and explanations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `"action"`
      </td>

      <td>
        <p>See <a href="doc:guide-for-webhooks-v2#supported-event-actions">supported event actions</a></p>
      </td>
    </tr>

    <tr>
      <td>
        `"entity"`
      </td>

      <td>
        <p>See <a href="doc:guide-for-webhooks-v2#supported-object-types">supported object types</a></p>
      </td>
    </tr>

    <tr>
      <td>
        `"company_id"`
      </td>

      <td>
        <p>ID of the company where the webhook was triggered in</p>
      </td>
    </tr>

    <tr>
      <td>
        `"correlation_id"`
      </td>

      <td>
        <p>Correlation ID for internal troubleshooting</p>
      </td>
    </tr>

    <tr>
      <td>
        `"entity_id"`
      </td>

      <td>
        <p>ID of the object</p>
      </td>
    </tr>

    <tr>
      <td>
        `"id"`
      </td>

      <td>
        <p>ID of the event triggering the webhook</p>
      </td>
    </tr>

    <tr>
      <td>
        `"is_bulk_edit"`
      </td>

      <td>
        <p>Values are shown in boolean:</p><ul><li><code>true</code> - trigger event originated from List view with bulk operation being used</li><li><code>false</code> - trigger event occurred after only one object was affected and the object wasn't affected by bulk operations</li></ul>
      </td>
    </tr>

    <tr>
      <td>
        `"timestamp"`
      </td>

      <td>
        <p>10 character timestamp</p>
      </td>
    </tr>

    <tr>
      <td>
        `"type"`
      </td>

      <td>
        <p>Type of webhook</p><p>Values are shown in string:</p><ul><li><code>general</code> for regular webhooks</li><li><code>application</code> for Marketplace apps’ webhooks</li></ul>
      </td>
    </tr>

    <tr>
      <td>
        `"user_id"`
      </td>

      <td>
        ID of the user who triggered the webhook
      </td>
    </tr>

    <tr>
      <td>
        `"version"`
      </td>

      <td>
        Webhooks version (in this case, it's version 2.0)
      </td>
    </tr>

    <tr>
      <td>
        `"webhook_id"`
      </td>

      <td>
        ID of the webhook
      </td>
    </tr>

    <tr>
      <td>
        `"webhook_owner_id"`
      </td>

      <td>
        ID of the user who owns the webhook
      </td>
    </tr>

    <tr>
      <td>
        `"change_source"`
      </td>

      <td>
        <p>Only the following 2 values are possible for this field:</p><ul><li><code>app</code> - the webhook is triggered from the Pipedrive web app</li><li><code>api</code> - the webhook is triggered through the API</li></ul>
      </td>
    </tr>

    <tr>
      <td>
        `"attempt"`
      </td>

      <td>
        Retry attempt number. See

        [retry logic](https://pipedrive.readme.io/docs/guide-for-webhooks-v2#retry-logic)

        for more.
      </td>
    </tr>

    <tr>
      <td>
        `"host"`
      </td>

      <td>
        `{COMPANYDOMAIN}.pipedrive.com`
      </td>
    </tr>

    <tr>
      <td>
        `"permitted_user_ids"`
      </td>

      <td>
        Array of user IDs that can see the given entity. Only present for entities that are not of type "user".
      </td>
    </tr>

    <tr>
      <td>
        `"merged_to_id"`
      </td>

      <td>
        A string value that is only present for delete events that were done as part of a merge action.
      </td>
    </tr>

    <tr>
      <td>
        `"merged_from_id"`
      </td>

      <td>
        A string value that is only present for change events that were done as part of a merge action.
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Supported event actions

<hr />

* `create`
* `change`
* `delete`

<hr />

## Supported object types

<hr />

* `activity`
* `deal`
* `lead`
* `note`
* `organization`
* `person`
* `pipeline`
* `product`
* `stage`
* `user`

> 📘 View [list of webhooks v2](https://pipedrive.readme.io/docs/list-of-webhooks-v2) to see all available combinations of event objects and actions for creating webhooks.

<hr />

## Examples and explanations

<hr />

It's possible to set up notifications for events like `added.organization`, `*.deal`, `updated.*`, `deleted.person`. When setting up notifications, note that event objects are not combinations but refer back to themselves.

* For example, if you want a webhook for deal ownership changes, you should choose `deal` as the event object and `change` as the event action. If you pick `user` as the event object, the webhook will send notifications when things, such as the user’s personal data, have been changed.

You can see all possible webhooks v2 that can be created in Pipedrive [here](https://pipedrive.readme.io/docs/list-of-webhooks-v2).

<hr />

## Status codes for Webhooks

<hr />

You can see the status of the last attempt made by your webhook(s) in the webhook dashboard. The webhooks dashboard is available under *Tools and integrations > Webhooks* inside Pipedrive.

There are three status code ranges or messages that are expected:

* A `2XX`  status code range shows a successful delivery of your webhook request.
* A `500`  status code indicates a server error, usually on the client side.
* An `Error` status message is shown if there is a timeout of the webhook request, the webhook is blocked, or there is an internal problem on Pipedrive’s end. If you encounter this error, you can contact our support team, who can further inquire into the logs of these requests.

For a successful delivery, we'll accept any `2XX` status code. Any other code or message is counted as a failure, which means the retry logic and the webhooks policy will commence.

<hr />

## Retry logic

<hr />

Webhooks retry policy is as follows:

* In case the original notification sending attempt fails (**due to receiving a non-`2XX` response code or exceeding timeout of 10 seconds**), we will try **3 more times**: after 3, 30 and 150 seconds. If it still fails for each of those attempts, it is counted as one non-successful delivery.
* If there are no successful deliveries on 3 consecutive days, we will **delete** this specific webhook.

> 📘 Outgoing webhooks are **not** subject to our API rate limit.

<hr />

## Webhooks policy

<hr />

The webhooks policy is applied to both general and [App-Specific](https://pipedrive.readme.io/docs/webhooks-for-apps) webhooks.

Pipedrive has a Ban System for webhooks, which means that every time the original notification sending attempt fails on the first try (due to receiving a non-`2xx` response code or exceeding a timeout of 10 seconds) the ban counter will increase by one.

When the ban counter reaches **10** on a webhook, this specific webhook will be banned for **30 minutes**. When the ban time is over, the webhook is reactivated, and the ban counter is set back to zero.

* If a webhook is unreachable on the first try, its ban count will increase, and the standard retry logic will be applied. If the webhook is unreachable during retries, the ban counter won’t be increased.
* If a webhook is banned, the webhook’s event message is lost. No data will be saved for retries after the ban.

If there are **no** successful deliveries to a webhook on **3 consecutive days**, we will delete it.
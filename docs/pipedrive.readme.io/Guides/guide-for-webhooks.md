# Guide for Webhooks

<Callout icon="📘" theme="info">
  In this article, we focus on our **general** webhooks.\
  If you want to learn about our App-Specific Webhooks, which can be created only by Marketplace apps, then you can do it [here](https://pipedrive.readme.io/docs/webhooks-for-apps).
</Callout>

<hr />

## About webhooks

<hr />

**Webhooks** allow you to get programmatic notifications from Pipedrive about changes to your data as they happen. If you're new to webhooks, [read this guide](https://requestbin.com/blog/working-with-webhooks/) to learn more.

Rather than requiring you to pull information via our API, webhooks will **push** information to your endpoint. When one of those events is triggered (for example a new deal is added), Pipedrive will send this notification as an HTTP `POST` request, with a JSON body, to the endpoint(s) you specify.

You can create a new webhook in the Pipedrive web app via [*Settings > Tools and apps > (Tools) > Webhooks*](https://app.pipedrive.com/settings/webhooks). The **maximum limit** of webhooks is **40 different webhooks per user**.

* **Regular users** can create/delete webhooks but only under their own Permission level.
* **Admin users** can manage webhooks for all users in their company.

<Callout icon="🚧" theme="warn">
  The user will be disabled in the Permission level's dropdown list if one has exceeded the max limit of webhooks.
</Callout>

Here's what the **Create new webhook** form looks like **for the Admin user** because the Permission level drop-down menu is unavailable to Regular users:

<Image align="center" alt={1744} border={true} width="80%" src="https://files.readme.io/94faa18-create_new_webhook.png" title="create_new_webhook.png" className="border" />

Now let us explain the parameters for events both in and outside of Pipedrive:

<hr />

## Events in Pipedrive

<hr />

With an event, you can filter what kind of events you want to receive (few example events [below](https://pipedrive.readme.io/docs/guide-for-webhooks#examples-and-explanations)).

| Parameter        | Description                                                                                                                                                                                  |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Event action     | The action done on an event object. Use `*.*` for all events. [Supported event actions](https://pipedrive.readme.io/docs/guide-for-webhooks#supported-event-actions).                                                     |
| Event object     | The object the action is done on. Use `*.*` for all objects. [Supported event object types](https://pipedrive.readme.io/docs/guide-for-webhooks#supported-object-types).                                                  |
| Permission level | The permission level specifies the permissions under which the webhooks are being sent out. Webhooks about objects are not sent if the selected user does not have permitted access to them. |

<Callout icon="📘" theme="info">
  Events in Pipedrive are triggered both from the Pipedrive UI and from the API calls.
</Callout>

<hr />

## Endpoint outside Pipedrive

<hr />

| Parameter                                     | Description                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint URL                                  | An endpoint URL is the HTTP endpoint where your preferred events are sent. We can send them only to a full, valid, publicly accessible URL.                                                                                                                                                                                         |
| HTTP Auth username and password (if required) | HTTP auth username and HTTP auth password are optional depending on your server setup. Webhooks service will send these Basic Authentication credentials in the header of every HTTP request. To protect your data, we strongly recommend using authenticated HTTPS requests. Note that we do not support self-signed certificates. |

<Callout icon="📘" theme="info">
  For testing and sandboxing purposes, you could use [RequestBin](https://requestbin.com/), [Webhook Tester](https://webhook.site/) or [ngrok](https://ngrok.com/).
</Callout>

<hr />

## Webhook format

<hr />

```json
{
    "v": 1,
    "matches_filters": {
      "current": [],
      "previous": []
    },
    "meta": {
      "v": 1,
      "action": "added",
      "object": "deal",
      "change_source": "app",
      "id": xxx,
      "company_id": xxxxx,
      "user_id": xxxxx,
      "host": "company.pipedrive.com",
      "timestamp": 1523440213,
      "timestamp_micro": 1523440213384700,
      "permitted_user_ids": [],
      "trans_pending": false,
      "is_bulk_update": false,
      "pipedrive_service_name": false,
      "matches_filters": {
        "current": [],
        "previous": []
      },
      "webhook_id": xxx
    },
    "retry": 0,
    "current": (the object data as of this update),
    "previous": (the object data prior to this update),
    "event": "event name"
  }
```

NB: For changes specific to the `user` object, the change object should be accessed as `current[0]` and `previous[0]`.

See the explanations for the webhook meta block's parameters [here](https://pipedrive.readme.io/docs/guide-for-webhooks#webhooks-meta-block).

<hr />

## Retry field explanation

<hr />

<Callout icon="📘" theme="info">
  For a successful delivery, we'll accept any 2XX status code.\
  Anything other is counted as a failure and the retry policy will commence.
</Callout>

You can determine the number of delivery attempts according to the value of the `retry` field in the payload (see the format above). Learn about the retry logic [below](https://pipedrive.readme.io/docs/guide-for-webhooks#retry-logic).

| Retry value | Value explanation                      |
| :---------- | :------------------------------------- |
| `0`         | Webhook delivered on the first attempt |
| `1`         | Webhook delivered on the first retry   |
| `2`         | Webhook delivered on the second retry  |
| `3`         | Webhook delivered on the third retry   |

<hr />

## Current and previous

<hr />

In the `current` and `previous` blocks, the standard data of each object is placed in a way which conforms to our [API Reference](https://developers.pipedrive.com/docs/api/v1) with the following rules:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Action
      </th>

      <th>
        Event name
      </th>

      <th>
        Current
      </th>

      <th>
        Previous
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Deleting objects
      </td>

      <td>
        deleted.\[object]
      </td>

      <td>
        null
      </td>

      <td>
        last state (object)
      </td>
    </tr>

    <tr>
      <td>
        Adding new objects
      </td>

      <td>
        added.\[object]
      </td>

      <td>
        current state (object)
      </td>

      <td>
        null
      </td>
    </tr>

    <tr>
      <td>
        Updating objects
      </td>

      <td>
        updated.\[object]
      </td>

      <td>
        current state (object)
      </td>

      <td>
        previous state (object)
      </td>
    </tr>

    <tr>
      <td>
        Merging objects
      </td>

      <td>
        merged.\[object] (about the object merged into)\
        deleted.\[object] (about the object merged)
      </td>

      <td>
        current state (object)

        null
      </td>

      <td>
        previous state (object)

        previous state (object)
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Webhook's meta block

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
        `"v"`
      </td>

      <td>
        Webhooks version (currently, it's version 1)
      </td>
    </tr>

    <tr>
      <td>
        `"action"`
      </td>

      <td>
        See [supported event actions](https://pipedrive.readme.io/docs/guide-for-webhooks#supported-event-actions)
      </td>
    </tr>

    <tr>
      <td>
        `"object"`
      </td>

      <td>
        See [supported object types](https://pipedrive.readme.io/docs/guide-for-webhooks#supported-object-types)
      </td>
    </tr>

    <tr>
      <td>
        `"change_source"`
      </td>

      <td>
        Only the following 2 values are possible for this field:

        <ul>
          <li><code>app</code> - the webhook is triggered from the Pipedrive web app</li>
          <li><code>api</code> - the webhook is triggered through the API</li>
        </ul>
      </td>
    </tr>

    <tr>
      <td>
        `"id"`
      </td>

      <td>
        ID of the object
      </td>
    </tr>

    <tr>
      <td>
        `"company_id"`
      </td>

      <td>
        ID of the company where the webhook was triggered in
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
        `"host"`
      </td>

      <td>
        company.pipedrive.com, where the company represents the company name.
      </td>
    </tr>

    <tr>
      <td>
        `"timestamp"`
      </td>

      <td>
        10 character timestamp
      </td>
    </tr>

    <tr>
      <td>
        `"timestamp_micro"`
      </td>

      <td>
        16 character timestamp
      </td>
    </tr>

    <tr>
      <td>
        `"permitted_user_ids"`
      </td>

      <td>
        IDs of users who can see or have access to the object
      </td>
    </tr>

    <tr>
      <td>
        `"trans_pending"`
      </td>

      <td>
        The parameter is used for showing the status of the database transaction's commit.Values are shown in boolean:

        <ul>
          <li><code>false</code> - transaction was completed</li>
          <li><code>true</code> - the completion of the transaction is pending</li>
        </ul>
      </td>
    </tr>

    <tr>
      <td>
        `"is_bulk_update"`
      </td>

      <td>
        Values are shown in boolean:

        <ul>
          <li><code>true</code> - trigger event originated from List view with bulk operation being used</li>
          <li><code>false</code> - trigger event occurred after only one object was affected and the object wasn't affected by bulk operations</li>
        </ul>
      </td>
    </tr>

    <tr>
      <td>
        `"pipedrive_service_name"`
      </td>

      <td>
        If the trigger for the webhook came from Pipedrive's own service we'll return the name of the service (e.g `"Import"`), otherwise, we'll return `false`.
      </td>
    </tr>

    <tr>
      <td>
        `"matches_filters"`
      </td>

      <td>
        Contains the ID of the filter only if the event was triggered from a view with applied filter to the object. If there isn't a filter applied the object doesn't match the set filter, the parameter will be displayed as empty.
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
        `"send_activity_notifications"`
      </td>

      <td>
        Appears only when the activity object was triggered.\
        Values are shown in boolean:

        <ul>
          <li><code>false</code> - transaction was completed</li>
          <li><code>true</code>- the completion of the transaction is pending</li>
        </ul>
      </td>
    </tr>

    <tr>
      <td>
        `"activity_notifications_language"`
      </td>

      <td>
        Appears only when the activity object was triggered.\
        Displays the language, which the activity notification will be displayed in. If `"send_activity_notifications": false`, then `"activity_notifications_language":null`.
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Supported event actions

<hr />

* `added`
* `deleted`
* `merged`
* `updated`

<hr />

## Supported object types

<hr />

* `activity`
* `activityType`
* `deal`
* `note`
* `organization`
* `person`
* `pipeline`
* `product`
* `stage`
* `user`

<Callout icon="📘" theme="info">
  View [list of webhooks](https://pipedrive.readme.io/docs/list-of-webhooks) to see all available combinations of event objects and event actions for creating webhooks.
</Callout>

<hr />

## Examples and explanations

<hr />

It's possible to set up notifications for events like `added.organization`, `*.deal`, `updated.*`, `deleted.person`. When setting up notifications, note that event objects are not combinations but refer back to themselves. For example, if you want to have a webhook show when a deal changes stages, you should choose `deal` as the event object, not `stage`, and then choose `update` as the event action. If you pick `stage` as the event object, the webhook will send notifications when things, such as stage name or other settings of the stage, have been changed.

You can see all possible webhooks that can be created in Pipedrive [here](https://pipedrive.readme.io/docs/list-of-webhooks).

<hr />

## Status codes for Webhooks

<hr />

You can see the status of the last attempt made by your webhook(s) in the webhook dashboard. The webhooks dashboard is available under *Tools and integrations > Webhooks* inside Pipedrive.

There are three status code ranges or messages that are expected:

* A `2XX`  status code range shows a successful delivery of your webhook request.
* A `500`  status code indicates a server error, usually on the client-side.
* An `Error` status message is shown if there is a timeout of the webhook request, the webhook is blocked, or there is an internal problem on Pipedrive’s end. If you encounter this error, you can contact our support team, who can further inquire into the logs of these requests.

For a successful delivery, we'll accept any `2XX` status code. Any other code or message is counted as a failure, which means the retry logic, as well as the webhooks policy, will commence.

<hr />

## Retry logic

<hr />

Webhooks retry policy is as follows:

* In case the original notification sending attempt fails (**due to receiving a non-`2XX` response code or exceeding timeout of 10 seconds**), we will try **3 more times**: after 3, 30 and 150 seconds. If it still fails for each of those attempts, it is counted as one non-successful delivery.
* If there are no successful deliveries on 3 consecutive days, we will **delete** this specific webhook.

<Callout icon="📘" theme="info">
  Outgoing webhooks are **not** subject to our API rate limit.
</Callout>

<hr />

## Webhooks policy

<hr />

The webhooks policy is applied to both general and [App-Specific](https://pipedrive.readme.io/docs/webhooks-for-apps) webhooks.

Pipedrive has a Ban System for webhooks, which means that every time the original notification sending attempt fails on the first try (due to receiving a non-`2xx` response code or exceeding a timeout of 10 seconds) the ban counter will increase by one.

When the ban counter reaches **10** on a webhook, this specific webhook will be banned for **30 minutes**. When the ban time is over, the webhook is reactivated and the ban counter is set back to zero.

Do take note that:

* If a webhook is unreachable on the first try, its ban count will increase, and the standard retry logic will be applied. If the webhook is unreachable during retries, the ban counter won’t be increased.
* If a webhook is banned, the webhook's event message is lost. No data will be saved for retries after the ban.

If there are **no** successful deliveries to a webhook on **3 consecutive days**, we will delete it.
# Webhook Endpoints

A `Webhook Endpoint` is an object in Modern Treasury that describes an endpoint where your webhook will send data to over HTTPS.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attribute
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique Identifier for Webhook Endpoints.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **url**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        A HTTPS endpoint that will receive notifications from webhooks.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **configured\_events**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        This field describes which events the webhook endpoint is subscribed towards. By default, if no events are provided, it subscribes to all events. An optional array of event types, which can be found [here.](https://docs.moderntreasury.com/reference#webhooks)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **webhook\_key**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The secret key used to sign the webhook body. See [Verifying Webhooks](https://docs.moderntreasury.com/docs/verifying-webhooks). Only shown when created, so make sure to save it!
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **enabled**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field describes whether or not this webhook endpoint is paused/enabled.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **discarded\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        This field describe when this object was deleted.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **created\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        This field describes when this object was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        This field describes when this object was last updated.
      </td>
    </tr>
  </tbody>
</Table>

```json Webhook Endpoint Example
{
  "id": "5bcbec62-69df-46dd-9849-e89f42f9dc31",
  "object": "webhook_endpoint",
  "live_mode": false,
  "url": "https://<your-domain.com>",
  "configured_events": {},
  "webhook_key": "<webhook key>",
  "enabled": true,
  "discarded_at": null,
  "created_at": "2022-02-16T02:09:08Z",
  "updated_at": "2022-02-16T02:09:08Z"
}
```
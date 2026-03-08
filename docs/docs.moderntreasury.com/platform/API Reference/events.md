# Events

An `event` is an object that describes an event in Modern Treasury. The events in Modern Treasury will be sent to your webhook endpoints if you are subscribed to webhooks. For a full list of the events in Modern Treasury, refer to the [section on webhooks](https://docs.moderntreasury.com/platform/reference/webhooks).

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
        Unique identifier for the event.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **resource**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type of resource for the event.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **event\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The name of the event.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **event\_time**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The time of the event.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **data**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The body of the event.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the entity for the event.
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
  </tbody>
</Table>

```json Event Example
{
  "id": "c20ef4da-1eb7-42df-872f-b26577fa69f6",
  "object": "event",
  "live_mode": true,
  "created_at": "2020-09-03T00:58:35Z",
  "updated_at": "2020-09-03T00:58:35Z",
  "resource": "expected_payment",
  "event_name": "reconciled",
  "event_time": "2020-09-03T00:58:35.000000000+00:00",
  "data": {
    "amount_lower_bound": 400000,
    "amount_upper_bound": 400000,
    "counterparty_id": null,
    "created_at": "2020-09-03T00:58:35Z",
    "currency": "USD",
    "date_lower_bound": "2019-09-03",
    "date_upper_bound": "2019-09-04",
    "description": null,
    "direction": "credit",
    "id": "46141eca-7362-4a25-8f71-cf942423e450",
    "internal_account_id": "b9fc1ae0-d493-4f01-a7b3-b39104e802b5",
    "metadata": {},
    "object": "expected_payment",
    "remittance_information": null,
    "statement_descriptor": null,
    "status": "reconciled",
    "transaction_id": "30dd4826-732f-4fe5-ab15-fc903f85ffdd",
    "transaction_line_item_id": null,
    "type": "ach",
    "updated_at": "2020-09-03T00:58:35Z"
  },
  "entity_id": "51732bde-dc31-40f6-a0f4-e43ba3248dc3"
}
```
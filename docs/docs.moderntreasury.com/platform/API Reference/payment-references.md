# Payment Reference Webhooks

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Event
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **created**
      </td>

      <td style={{ textAlign: "left" }}>
        A payment reference has been created.
      </td>
    </tr>
  </tbody>
</Table>

```json Sample Payment Reference Webhook
{
  "event": "created",
  "data": {
    "id": "9d5f3f75-cef9-4823-88a7-6b10eb4d0062",
    "object": "payment_reference",
    "live_mode": true,
    "created_at": "2022-12-02T14:38:08Z",
    "updated_at": "2022-12-02T14:38:08Z",
    "reference_number": "1232",
    "referenceable_id": "e9ade445-3d9e-41ee-8937-ea9ca107df26",
    "referenceable_type": "payment_order",
    "reference_number_type": "other"
  }
}
```
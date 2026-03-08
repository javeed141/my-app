# Balance Report Webhooks

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
        A balance report has been created.
      </td>
    </tr>
  </tbody>
</Table>

```json Sample Created Balance Report Webhook
{
  "event": "created",
  "data": {
    "as_of_date": "2019-12-12",
    "as_of_time": null,
    "balance_report_type": "previous_day",
    "balances": [],
    "created_at": "2019-12-12T22:51:43Z",
    "id": "94bdba1d-ef15-4fbf-a213-9a5b342f221c",
    "internal_account_id": "b9fc1ae0-d493-4f01-a7b3-b39104e802b5",
    "object": "balance_report",
    "updated_at": "2019-12-12T22:51:43Z"
  }
}
```
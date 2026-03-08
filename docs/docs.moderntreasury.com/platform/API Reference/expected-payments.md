# Expected Payment Webhooks

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
        An expected payment has been created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **reconciled**
      </td>

      <td style={{ textAlign: "left" }}>
        The expected payment has been reconciled to a posted transaction. The transaction ID will be included in the data provided.\
        This event will occur when the bank transaction is created. At most banks, this occurs when Modern Treasury ingests the BAI2 file in the morning.\
        When this event is sent, the `status` is `reconciled`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **partially\_reconciled**
      </td>

      <td style={{ textAlign: "left" }}>
        The expected payment has been reconciled to a posted transaction and the sum of the transactions reconciled to the expected payment is less than the expected payment's amount range. The reconciled transactions can be viewed by filtering on expected payment id with the [LIST transactions endpoint](https://docs.moderntreasury.com/platform/reference/list-transactions) .\
        When this event is sent, the `status` is `partially_reconciled`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **tentatively\_reconciled**
      </td>

      <td style={{ textAlign: "left" }}>
        The expected payment has been reconciled to a pending transaction. The pending transaction ID will be included in the data provided.\
        This can be a helpful webhook to process if you are confident the pending transaction will correspond to the posted transaction. For example, wires will always post. But sometimes ACH transactions can appear pending, but never post. [See the guide for more information.](https://docs.moderntreasury.com/docs/processing-tentative-reconciliation)

        When this event is sent, the `status` is `unreconciled` since the posted transaction has not come in yet. The expected payment's status does not change.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **overdue**
      </td>

      <td style={{ textAlign: "left" }}>
        The expected payment was not reconciled to a transaction. This will be sent at 6am Pacific Time when the `date_upper_bound` is passed, which indicates the payment was not received by the expected date. For example, if you expected a payment to come in on Monday but it does not arrive, this webhook will be sent on Tuesday at 6am PT.\
        When this event is sent, the `status` is `unreconciled`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **archived**
      </td>

      <td style={{ textAlign: "left" }}>
        The expected payment has been archived. This action can only be performed by a user in the dashboard or using the API. Modern Treasury will not automatically archive expected payments.

        Archived expected payments will not be considered during future reconciliation attempts.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **unreconciled**
      </td>

      <td style={{ textAlign: "left" }}>
        An expected payment has been unreconciled from a transaction.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **linked\_entity**
      </td>

      <td style={{ textAlign: "left" }}>
        An expected payment has been linked to another entity (note the different data [schema](https://docs.moderntreasury.com/platform/reference/entity-links))
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **unlinked\_entity**
      </td>

      <td style={{ textAlign: "left" }}>
        An expected payment has been unlinked from another entity (note the different data [schema](https://docs.moderntreasury.com/platform/reference/entity-links))
      </td>
    </tr>
  </tbody>
</Table>

```json Sample Reconciled Expected Payment Webhook
{
  "event": "reconciled",
  "data": {
    "created_at": "2019-12-12T22:58:14Z",
    "updated_at": "2019-12-12T23:01:32Z",
    "description": null,
    "id": "46141eca-7362-4a25-8f71-cf942423e450",
    "live_mode":true,
    "metadata": {},
    "object": "expected_payment",
    "remittance_information": null,
    "status": "reconciled",
    "reconciliation_method": "automatic",
    "transaction_id": "30dd4826-732f-4fe5-ab15-fc903f85ffdd",
    "transaction_line_item_id": "724ed2e9-5b8d-42f8-a56a-705bb6c802ae",
    "reconciliation_rule_variables":[
      {
        "amount_lower_bound": 400000,
        "amount_upper_bound": 400000,
        "counterparty_id": null,
        "currency": "USD",
        "date_lower_bound": "2019-12-12",
        "date_upper_bound": "2019-12-13",
        "direction": "credit",
        "internal_account_id": "b9fc1ae0-d493-4f01-a7b3-b39104e802b5",
        "type": "ach",
        "custom_identifiers":{
          "payment_id":"12345"
        }
      }
    ]
  }
}
```

```json Sample Expected Payment Linked Webhook
{
  "event": "linked_entity",
  "data": {
    "id": "21bfd337-5d13-4c9a-8f9e-2409023d9627",
    "entiy_a_id": "1bbc5c0e-fdee-4a4b-b16f-d8164444861f",
    "entity_a_type": "expected_payment",
    "entiy_b_id": "22ccfb02-fdee-4a4b-b16f-d8164444861f",
    "entity_b_type": "payment_order",
    "created_by_actor_id": "b45c5b0e-fdee-4a4b-b16f-d8164444861f",
    "created_by_actor_type": "user",
    "created_by_actor_name": "Some Name",
    "live_mode": true,
    "created_at": "2019-11-09T00:11:07Z",
    "updated_at": "2019-11-09T00:11:07Z"
	}
}
```
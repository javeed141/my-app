# Return Webhooks

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
        A return has been created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **begin\_processing**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has begun processing. *Originating returns only*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **finish\_processing**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has finished processing and been sent to the bank. *Originating returns only*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **tentatively\_reconciled**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has been tentatively reconciled to a pending transaction. [See the guide for more information.](https://docs.moderntreasury.com/docs/processing-tentative-reconciliation)

        *Does not change the return's state.*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **reconciled**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has been reconciled with a posted transaction. This event will contain the reconciled transaction Ids.

        At this point, we know the return was successful, and your account will have been debited or credited.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **completed**
      </td>

      <td style={{ textAlign: "left" }}>
        The return has been accepted and posted by the bank (reflected in the customers ledger).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **returned**
      </td>

      <td style={{ textAlign: "left" }}>
        An originated return has been returned.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **failed**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has failed due to an error.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **unreconciled**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has been unreconciled from a transaction.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **linked\_entity**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has been linked to another entity (note the different data [schema](https://docs.moderntreasury.com/platform/reference/entity-links))
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **unlinked\_entity**
      </td>

      <td style={{ textAlign: "left" }}>
        A return has been unlinked from another entity (note the different data [schema](https://docs.moderntreasury.com/platform/reference/entity-links) )
      </td>
    </tr>
  </tbody>
</Table>

These are the statuses a return may have:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Status
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **pending**
      </td>

      <td>
        This is the initial state for a new return.
      </td>
    </tr>

    <tr>
      <td>
        **processing**
      </td>

      <td>
        This is a very short state where Modern Treasury is preparing the return to be sent to the bank. *Originating returns only*
      </td>
    </tr>

    <tr>
      <td>
        **sent**
      </td>

      <td>
        The return has been sent to the bank. It may remain in this state for up to a few days, depending on the type of return. *Originating returns only*
      </td>
    </tr>

    <tr>
      <td>
        **completed**
      </td>

      <td>
        The return has been accepted and posted by the bank (reflected in the customers ledger).
      </td>
    </tr>

    <tr>
      <td>
        **returned**
      </td>

      <td>
        The originated return was returned by the RDFI.
        *Originating returns only*
      </td>
    </tr>

    <tr>
      <td>
        **failed**
      </td>

      <td>
        This status is rare but may happen if there is an error at the bank.
      </td>
    </tr>
  </tbody>
</Table>

```json Sample Created Return Webhook
{
  "event": "created",
  "data": {
    "id": "59981d98-7573-4e82-981e-acb1aaf4801e",
    "object": "return",
    "status": "pending",
    "reconciliation_status": "reconciled",
    "returnable_id": "0383a613-1439-4ff8-992c-5e8691dfcc19",
    "returnable_type": "payment_order",
    "transaction_line_item_id": null,
    "transaction_id": null,
    "type": "ach",
    "amount": 20000,
    "currency": "USD",
    "code": "R03",
    "reason": "No Account/Unable to Locate Account",
    "role": "originating",
    "created_at": "2019-12-12T23:15:49Z",
    "updated_at": "2019-12-12T23:15:49Z"
  }
}
```

```json Sample Return Linked Entity Webhook
{
  "event": "linked_entity",
  "data": {
    "id": "21bfd337-5d13-4c9a-8f9e-2409023d9627",
    "entiy_a_id": "1bbc5c0e-fdee-4a4b-b16f-d8164444861f",
    "entity_a_type": "return",
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

## Return Reconciliation

Reconciliation is decoupled from the return’s status. `completed` indicates that the bank has posted the return, but it no longer means the return is `reconciled`.

A return’s Reconciliation Status is marked `reconciled` once its been reconciled to a posted transaction.
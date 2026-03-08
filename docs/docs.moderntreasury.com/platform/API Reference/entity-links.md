# Entity Links

An `entity_link` represents a link between two objects. [Entity Links](https://docs.moderntreasury.com/reconciliation/docs/entity-linking) is currently an Early Access feature and is available for linking Expected Payments, Returns, and Payment Orders.

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
        Unique identifier for the entity link
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity\_a\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        ID of linked object
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity\_a\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Type of linked object, can be `expected_payment`, `return` or `payment_order`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity\_b\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        ID of linked object
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity\_b\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Type of linked object, can be `expected_payment`, `return` or `payment_order`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>
  </tbody>
</Table>

```json Entity Link Example
{
  "id": "21bfd337-5d13-4c9a-8f9e-2409023d9627",
  "entiy_a_id": "1bbc5c0e-fdee-4a4b-b16f-d8164444861f",
  "entity_a_type": "payment_order",
  "entiy_b_id": "22ccfb02-fdee-4a4b-b16f-d8164444861f",
  "entity_b_type": "payment_order",
  "created_by_actor_id": "b45c5b0e-fdee-4a4b-b16f-d8164444861f",
  "created_by_actor_type": "user",
  "created_by_actor_name": "Some Name",
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
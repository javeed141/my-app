# Bulk Results

A `bulk_result` represents an individual result of a bulk request. A [bulk request](https://docs.moderntreasury.com/platform/reference/bulk-requests) has many `bulk_results`. A bulk result can have a `status` of `successful` or `failed`.

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
        Unique identifier for the bulk result
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **request\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type of the request that created this result.\
        `bulk_request` is the only supported `request_type`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **request\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the request that created this bulk result. This is the ID of the [bulk request](https://docs.moderntreasury.com/platform/reference/bulk-requests) when `request_type` is `bulk_request`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **status**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        One of `success` or `failed`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **request\_params**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        An optional object that contains the provided input params for the request that created this result. This is an item in the `resources` array for the `bulk_request`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type of the result entity object.\
        For a `successful` bulk result, this is the same as the `resource_type` of the bulk request.\
        For a `failed` bulk result, this is always `bulk_error`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the result entity object.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entity**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        An object with type as indicated by `entity_type`.\
        For a bulk request with `create` action type and `payment_order` resource type, this is the created [payment order](https://docs.moderntreasury.com/platform/reference/payment-order-object) object when the result is `successful` and  the [bulk error](https://docs.moderntreasury.com/platform/reference/bulk-errors) object when the result is `failed`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be `true` if this bulk result was created with a live API key or `false` if created with a sandbox API key.
      </td>
    </tr>
  </tbody>
</Table>

```json Success Bulk Result Example
{
  "id": "4c16a33b-a416-44c5-a39f-843e78c03e50",
  "object": "bulk_result",
  "live_mode": true,
  "request_id": "20e2efa7-6329-48ff-b1e1-50432b6a117d",
  "request_type": "bulk_request",
  "entity_id": "5749bfe7-f7ac-4758-a863-7b21b3a3394c",
  "entity_type": "payment_order",
  "entity": {
    "id": "5749bfe7-f7ac-4758-a863-7b21b3a3394c",
    "object": "payment_order",
    "live_mode": true,
    "type": "ach",
    "amount": 1,
    "direction": "debit",
    "originating_account_id": "dedf7a81-ddeb-4525-98ed-2b3db9d07a78",
    "receiving_account": {
      "id": "681b2044-1a7b-489e-ad71-a1182af84ebe",
      "object": "external_account",
      "live_mode": true,
      "account_type": "other",
      "party_name": "Adam Stepniewski",
      "party_type": "individual",
      "party_address": {
        "id": "9a4ad985-9ed6-4a97-acae-e9975e066fba",
        "object": "address",
        "live_mode": true,
        "line1": "4708 SW 129th Street",
        "line2": null,
        "locality": "Oklahoma City",
        "region": "OK",
        "postal_code": "73173",
        "country": "US",
        "created_at": "2021-11-04T19:11:45Z",
        "updated_at": "2021-11-04T19:11:45Z"
      },
      "account_details": [
        {
          "id": "9e8ff325-94f5-4c53-8134-83012bfe4b47",
          "object": "account_detail",
          "live_mode": true,
          "account_number_safe": "5125",
          "account_number_type": "other",
          "discarded_at": null,
          "created_at": "2021-11-04T19:11:45Z",
          "updated_at": "2021-11-04T19:11:45Z"
        }
      ],
      "routing_details": [
        {
          "id": "56564549-a317-4e3e-90e0-663c3deb2098",
          "object": "routing_detail",
          "live_mode": true,
          "payment_type": null,
          "routing_number": "303087995",
          "routing_number_type": "aba",
          "bank_name": "MidFirst Bank",
          "bank_address": {
            "id": "12086d3e-c811-46d8-9d9a-f6fcc15f389a",
            "object": "address",
            "live_mode": true,
            "line1": "501 NW Grand Blvd",
            "line2": null,
            "locality": "Oklahoma City",
            "region": "OK",
            "postal_code": "73118",
            "country": "US",
            "created_at": "2021-11-04T19:11:45Z",
            "updated_at": "2021-11-04T19:11:45Z"
          },
          "discarded_at": null,
          "created_at": "2021-11-04T19:11:45Z",
          "updated_at": "2021-11-04T19:11:45Z"
        }
      ],
      "name": null,
      "metadata": {},
      "verification_status": "unverified",
      "contact_details": [],
      "ledger_account_id": null,
      "discarded_at": null,
      "created_at": "2021-11-04T19:11:45Z",
      "updated_at": "2021-11-04T19:11:45Z"
    },
    "receiving_account_id": "681b2044-1a7b-489e-ad71-a1182af84ebe",
    "receiving_account_type": "external_account",
    "currency": "USD",
    "effective_date": "2023-08-29",
    "priority": "normal",
    "description": null,
    "statement_descriptor": null,
    "remittance_information": null,
    "metadata": {},
    "status": "approved",
    "counterparty_id": null,
    "transaction_ids": [],
    "charge_bearer": null,
    "foreign_exchange_indicator": null,
    "foreign_exchange_contract": null,
    "nsf_protected": false,
    "transaction_monitoring_enabled": false,
    "originating_party_name": null,
    "ultimate_originating_party_name": null,
    "ultimate_originating_party_identifier": null,
    "ultimate_receiving_party_name": null,
    "ultimate_receiving_party_identifier": null,
    "current_return": null,
    "reference_numbers": [],
    "send_remittance_advice": null,
    "subtype": "PPD",
    "purpose": null,
    "vendor_failure_reason": null,
    "ledger_transaction_id": null,
    "decision_id": null,
    "created_at": "2023-08-18T23:32:07Z",
    "updated_at": "2023-08-28T17:24:24Z",
    "accounting": {
      "account_id": null,
      "class_id": null
    },
    "expires_at": null,
    "compliance_rule_metadata": null,
    "accounting_category_id": null,
    "accounting_ledger_class_id": null
  },
  "request_params": {
    "type": "ach",
    "amount": 1,
    "direction": "debit",
    "receiving_account_id": "681b2044-1a7b-489e-ad71-a1182af84ebe",
    "originating_account_id": "dedf7a81-ddeb-4525-98ed-2b3db9d07a78"
  },
  "status": "successful",
  "created_at": "2023-08-18T23:27:59Z",
  "updated_at": "2023-08-18T23:32:07Z"
}
```

```json Failed Bulk Result Example
{
  "id": "e4ead54c-3e76-4954-9171-e5752fd85bdc",
  "object": "bulk_result",
  "live_mode": true,
  "request_id": "9c976385-8a02-42d8-9ffd-009ada3ac604",
  "request_type": "bulk_request",
  "entity_id": "4028fca0-7250-4302-8ae1-ebc192e2861f",
  "entity_type": "bulk_error",
  "entity": {
    "id": "4028fca0-7250-4302-8ae1-ebc192e2861f",
    "object": "bulk_error",
    "live_mode": true,
    "request_errors": {
      "originating_account": [
        {
          "type": "record",
          "error": "invalid_type"
        }
      ]
    },
    "created_at": "2023-08-18T22:27:39Z",
    "updated_at": "2023-08-18T22:27:39Z"
  },
  "request_params": {
    "type": "ach",
    "amount": 1000,
    "direction": "credit",
    "currency": "USD",
    "originating_account_id": "cb16caf3-d822-4067-bd0f-0064bde82862",
    "receiving_account_id": "e1acda06-f777-4903-bf56-f430673ae27d"
  },
  "status": "failed",
  "created_at": "2023-08-18T22:27:33Z",
  "updated_at": "2023-08-18T22:27:39Z"
}
```
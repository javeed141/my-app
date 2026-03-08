# Counterparties

A `counterparty` is an entity outside of your organization that you want to send or receive money from. They can be an individual or a business.

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
        Unique identifier for the counterparty.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **name**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        A human friendly name for this counterparty.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **accounts**
        *array*
      </td>

      <td style={{ textAlign: "left" }}>
        The accounts for this counterparty.
        See [Account](https://docs.moderntreasury.com/platform/reference/external-account-object) for additional details.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **email**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The counterparty's email.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **taxpayer\_identifier**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Valid tax payer ID for counterparty's region. Note that this is currently not returned in API responses.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See

        [Metadata](https://docs.moderntreasury.com/platform/reference/metadata)

        .
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **send\_remittance\_advice**
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        Send an email to the counterparty whenever an associated payment order is sent to the bank.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **external\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An optional user-defined 180 character unique identifier
      </td>
    </tr>
  </tbody>
</Table>

```json Counterparty Example
{
  "id": "928db55e-6552-4aaf-96d7-10c693922b1f",
  "object": "counterparty",
  "name": "John Smith",
  "email": "abby@marquardtschuppe.net",
  "send_remittance_advice": true,
  "metadata": {},
  "accounts": [
    {
      "id": "c8d059bc-e781-4528-9359-d46eaaa7f953",
      "object": "external_account",
      "account_type": null,
      "party_name": "John Smith",
      "party_type": "business",
      "party_address": null,
      "account_details": [
        {
          "id": "3036a533-53ad-4e58-ba30-33c4d75c0c57",
          "object": "account_detail",
          "account_number_safe": "1291",
          "account_number_type": null,
          "live_mode": true
        }
      ],
      "routing_details": [
        {
          "id": "e8626e0b-2687-4b0d-9f2c-68a4c29ee5f1",
          "object": "routing_detail",
          "payment_type": null,
          "routing_number": "121141822",
          "routing_number_type": "aba",
          "live_mode": true
        }
      ],
      "live_mode": true
    }
  ],
  "live_mode": true,
  "external_id": null,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
# Documents

A `document` represents a single file attached to a given resource. Often these are documents attached to payment orders to provide further context or image files for incoming checks.

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
        The unique identifier for the document.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **document\_type**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        A category given to the document, can be `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **documentable\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The unique identifier for the associated object.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **source**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The source of the document. Can be `vendor` or `customer` where `vendor` is a third-party and `customer` is your organization that has uploaded the document.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **documentable\_type**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type of the associated object. Currently can be one of `payment_order`, `transaction`,  `expected_payment`, `counterparty`, `organization`, `identification`, `internal_account`, or `external_account`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **file.size**
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        The size of the document in bytes.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **file.filename**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The original filename of the document.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **file.content\_type**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The [MIME](https://www.iana.org/assignments/media-types/media-types.xhtml) content type of the document.
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
  </tbody>
</Table>

```json Document Example
{
  "id": "b05dd054-6eea-4cdd-9096-cf3fa8eb6fb7",
  "object": "document",
  "source": "customer",
  "document_type": "Invoice",
  "documentable_id": "00ddb900-317f-4436-8b79-6329c924ef27",
  "documentable_type": "payment_order",
  "file": {
    "size": 1558074,
    "filename": "invoice-6000.pdf",
    "content_type": "application/pdf"
  },
  "document_details": [],
  "live_mode": true,
  "created_at": "2023-06-20T15:58:59Z",
  "updated_at": "2023-06-20T15:58:59Z"
}
```
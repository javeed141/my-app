# Contact Details

A `contact_detail` object represents a specific point of contact for an account. Similar to routing and account details, we can encapsulate different contact points like emails or phone numbers and assign them to a single [account](https://docs.moderntreasury.com/platform/reference/external-account-object).

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
        The ID of the contact detail.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **contact\_identifier**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The contact information.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **contact\_identifier\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type or communication channel of the identifier. Must be one of `email`, `website` or `phone_number`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>
  </tbody>
</Table>

```json Contact Detail Example
{
  "id": "1234da60-405c-44bc-8b33-2bdb9419afe3",
  "object": "contact_detail",
  "contact_identifier": "harry@hogwarts.com",
  "contact_identifier_type": "email",
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
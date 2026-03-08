# Addresses

An `address` object contains the necessary data fields for a mailing address and can be attached to many different objects in the platform.

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
        A unique identifier for the address.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **line1**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Line 1.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **line2**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Line 2.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **locality**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Locality or City.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **region**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Region or State.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **postal\_code**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Postal Code.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **country**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Country code conforms to [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
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

```json Address Example
{
  "id": "4b0f10be-a84b-42e0-b59b-e3026c408212",
  "line1": "84 Beacon St.",
  "line2": null,
  "locality": "Boston",
  "region": "MA",
  "postal_code": "02108",
  "country": "US",
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```
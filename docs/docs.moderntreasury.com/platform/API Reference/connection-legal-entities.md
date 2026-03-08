# Connection Legal Entities

A `connection_legal_entity` is a representation of a Legal Entity at a downstream vendor.

**Connection Legal Entities cannot be created or managed in our sandbox environment by default. Please contact [support](mailto:support@moderntreasury.com) to enable this functionality in Sandbox.**

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        *string*
      </td>

      <td>
        Unique identifier for the Connection Legal Entity.
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**\
        *boolean*
      </td>

      <td>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td>
        **status**\
        *string*
      </td>

      <td>
        The current status of the Connection Legal Entity. Possible values: `completed` `denied`, `failed`, `processing`.
      </td>
    </tr>

    <tr>
      <td>
        **connection\_id**\
        *string*
      </td>

      <td>
        The UUID of the [Connection](https://docs.moderntreasury.com/platform/reference/connections) .
      </td>
    </tr>

    <tr>
      <td>
        **legal\_entity\_id**\
        *string*
      </td>

      <td>
        The UUID of the [Legal Entity](https://docs.moderntreasury.com/platform/reference/legal-entities)
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_id**\
        *string*
      </td>

      <td>
        The ID of the entity at the Connection.
      </td>
    </tr>
  </tbody>
</Table>

<br />

```json Connection Legal Entity Example
{
  "id": "8425ab9c-725f-4ef1-8102-a582926e753b",
  "object": "legal_entity",
  "live_mode": true,
  "status": "completed",
  "legal_entity_id": "6a33a4df-48ee-4a44-9ebf-66f00c6a2333",
  "connection_id": "8abeaf42-2159-413d-99e9-1e7bf059bc71",
  "vendor_id": "775608ac-1035-429a-923a-dd57f8202517",
  "discarded_at": null,
  "created_at": "2024-02-05T17:42:33Z",
  "updated_at": "2024-02-05T17:42:33Z"
}
```
# API Keys

An `API Key` is used to access the Modern Treasury API. API Keys are managed through the web interface.

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
        Unique identifier for the API Key.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The API Key's name.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **default**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        `true` if provided by the system at organization creation time.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **roles**\
        *string array*
      </td>

      <td style={{ textAlign: "left" }}>
        Roles defined by `domain:access_level` where domain is one of `accounts`, `counterparties`, `developer`, `external_accounts`,  `ledgers`, `compliance`. `access_level` is one of `read` or `manage`.

        `accounts:ACCESS_LEVEL` can be optionally appended by the account id if scoped to a specific account (`accounts:read:1233b7a...17559`).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ip\_allowlist**\
        *string array*
      </td>

      <td style={{ textAlign: "left" }}>
        List of allowed IP addresses for the API Key.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **organization\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The organization the API Key belongs to.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **decommissioned**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        `true` if the API Key has been archived.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **decommissioned\_at**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        If the API key has been archived, the datetime of that occurred.
      </td>
    </tr>
  </tbody>
</Table>

```json API Key Example
{
  "created_at": "2020-09-08T20:40:43Z",
  "decommissioned": false,
  "decommissioned_at": null,
  "default": false,
  "id": "d1233b7a-1404-47d8-8ee9-fb084fd17559",
  "ip_allowlist": [],
  "live_mode": true,
  "name": "developer key",
  "object": "api_key",
  "roles": [
    "developer:read"
  ],
  "organization_id": "16554646-35c6-4678-855f-dffe5b2c0552",
  "updated_at": "2020-09-08T20:40:43Z"
}
```
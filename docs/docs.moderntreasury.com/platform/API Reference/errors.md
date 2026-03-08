# Errors

When there is an error, Modern Treasury returns an object with as much descriptive information as we can. A list of common error codes can be found below.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Error Code
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        parameter\_invalid
      </td>

      <td style={{ textAlign: "left" }}>
        The value provided for the parameter is invalid
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        parameter\_missing
      </td>

      <td style={{ textAlign: "left" }}>
        No value has been provided for the parameter
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        resource\_not\_found
      </td>

      <td style={{ textAlign: "left" }}>
        The resource couldn't be found for the identifier
      </td>
    </tr>
  </tbody>
</Table>

```json Error Example
{
  "errors": {
    "code":"resource_not_found",
    "message":"Resource not found",
    "parameter":"id"
  }
}
```
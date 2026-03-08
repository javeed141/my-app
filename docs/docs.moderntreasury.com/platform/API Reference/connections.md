# Connections

A `Connection` object represents an active connection to a bank or vendor.

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
        Unique identifier for the connection.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **vendor\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the bank or vendor.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **vendor\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        A human-friendly name for the bank or vendor.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **vendor\_customer\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An identifier given to this connection by the bank.
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
  </tbody>
</Table>
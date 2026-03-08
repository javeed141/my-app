# HTTP status codes

Here's a list of the **status codes** used in Pipedrive:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Status Code
      </th>

      <th style={{ textAlign: "left" }}>
        Name
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `200`
      </td>

      <td style={{ textAlign: "left" }}>
        OK
      </td>

      <td style={{ textAlign: "left" }}>
        Request fulfilled
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `201`
      </td>

      <td style={{ textAlign: "left" }}>
        Created
      </td>

      <td style={{ textAlign: "left" }}>
        New resource created
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `400`
      </td>

      <td style={{ textAlign: "left" }}>
        Bad Request
      </td>

      <td style={{ textAlign: "left" }}>
        Request not understood
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `401`
      </td>

      <td style={{ textAlign: "left" }}>
        Unauthorized
      </td>

      <td style={{ textAlign: "left" }}>
        Invalid API token
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `402`
      </td>

      <td style={{ textAlign: "left" }}>
        Payment Required
      </td>

      <td style={{ textAlign: "left" }}>
        Company account is not open (possible reason: trial expired, payment details not entered)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `403`
      </td>

      <td style={{ textAlign: "left" }}>
        Forbidden
      </td>

      <td style={{ textAlign: "left" }}>
        Request not allowed.\
        User account has [reached a limit](https://support.pipedrive.com/en/article/usage-limits-in-pipedrive) for an entity.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `404`
      </td>

      <td style={{ textAlign: "left" }}>
        Not Found
      </td>

      <td style={{ textAlign: "left" }}>
        Resource unavailable
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `405`
      </td>

      <td style={{ textAlign: "left" }}>
        Method not allowed
      </td>

      <td style={{ textAlign: "left" }}>
        Incorrect request method
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `410`
      </td>

      <td style={{ textAlign: "left" }}>
        Gone
      </td>

      <td style={{ textAlign: "left" }}>
        Old resource permanently unavailable
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `415`
      </td>

      <td style={{ textAlign: "left" }}>
        Unsupported Media Type
      </td>

      <td style={{ textAlign: "left" }}>
        Feature is not enabled
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `422`
      </td>

      <td style={{ textAlign: "left" }}>
        Unprocessable Entity
      </td>

      <td style={{ textAlign: "left" }}>
        Webhooks limit reached
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `429`
      </td>

      <td style={{ textAlign: "left" }}>
        Too Many Requests
      </td>

      <td style={{ textAlign: "left" }}>
        [Rate limit](https://pipedrive.readme.io/docs/core-api-concepts-rate-limiting) has been exceeded
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `500`
      </td>

      <td style={{ textAlign: "left" }}>
        Internal Server Error
      </td>

      <td style={{ textAlign: "left" }}>
        Generic server error
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `501`
      </td>

      <td style={{ textAlign: "left" }}>
        Not Implemented
      </td>

      <td style={{ textAlign: "left" }}>
        Non-existent functionality
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `503`
      </td>

      <td style={{ textAlign: "left" }}>
        Service Unavailable
      </td>

      <td style={{ textAlign: "left" }}>
        Scheduled maintenance
      </td>
    </tr>
  </tbody>
</Table>
# Check statuses with Lob

Modern Treasury integrates with [Lob](https://www.lob.com/) to provide check printing and mailing services.

## Statuses

Modern Treasury monitors your bank statements for check activity. Below are the relevant [Payment Order statuses](https://docs.moderntreasury.com/reference/payment-orders#payment-order-statuses) as they relate to Lob.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Payment Order Status
      </th>

      <th>
        Lob Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `sent`
      </td>

      <td>
        The check has been created in your Lob account. A `lob_check_id` will be added as a [Payment Reference](/platform/reference/payment-reference-object) to the Payment Order.
      </td>
    </tr>

    <tr>
      <td>
        `completed`
      </td>

      <td>
        The Payment Order is marked as `completed` when the check appears on your bank statement.
      </td>
    </tr>
  </tbody>
</Table>

## Using Lob Webhook Events

Modern Treasury does not consume Lob webhook events. You can however configure your Lob account to send webhook events to your own application. You can connect these lob events using the `lob_check_id` [Payment Reference](/platform/reference/payment-reference-object).

## Supported Banks

Not all banks support Lob. While it is a third party service, some banks require Positive Pay files in order to honor checks. You will need to check with your bank and Modern Treasury to ensure automated check sending with Lob is possible. If you have any questions, please reach out to [support@moderntreasury.com](mailto:support@moderntreasury.com).
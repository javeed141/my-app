# Holds

Reporting compliance and risk holds placed on Payment Orders by your bank

A hold represents a hold placed by a payment processor or bank on a [Payment Order](https://docs.moderntreasury.com/platform/reference/payment-order-object). Creating a hold will transition the status of the linked Payment Order to `held`.

<Callout icon="ℹ️" theme="info">
  Please note that Holds in Modern Treasury have no impact on the processing of your payment, they are purely for reporting / visibility purposes.
</Callout>

You can directly manage holds to update your Payment Order status using the Modern Treasury Holds API:

* **Mark as held** using [Create Hold](https://docs.moderntreasury.com/platform/reference/create-a-hold)
* **Mark as resolved** using  [Update Hold](https://docs.moderntreasury.com/platform/reference/update-a-hold)

Once a [Payment Order](https://docs.moderntreasury.com/platform/reference/payment-order-object) status is `held`, you can access its `current_hold` information directly on the Payment Order.

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
        Unique identifier for the line item.
      </td>
    </tr>

    <tr>
      <td>
        **status**
        *string*
      </td>

      <td>
        Either `active` or `resolved`.
      </td>
    </tr>

    <tr>
      <td>
        **reason**
        *string*
      </td>

      <td>
        Contextual information for placing this [Payment Order](https://docs.moderntreasury.com/platform/reference/payment-order-object) on hold (optional).
      </td>
    </tr>

    <tr>
      <td>
        **resolution**
        *string*
      </td>

      <td>
        Contextual information about the resolution of the hold (optional).
      </td>
    </tr>

    <tr>
      <td>
        **resolved\_at**
        *string*
      </td>

      <td>
        Timestamp at which hold was resolved by the bank. If the hold is automatically resolved by Modern Treasury. This will be the timestamp on the bank signal or the reception timestamp if there is no explicit value.
      </td>
    </tr>

    <tr>
      <td>
        **target\_id**
        *string*
      </td>

      <td>
        The ID of the payment order.
      </td>
    </tr>

    <tr>
      <td>
        **target\_type**
        *string*
      </td>

      <td>
        Must be `payment_order`.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**
        *boolean*
      </td>

      <td>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>
  </tbody>
</Table>

<br />
# Payment Flows

A `payment_flow` is an object that can be used to embed a pre-built UI in your application to collect payment details from an end-user and initiate a payment. The properties configured on the `payment_flow` dictate the `amount` and `currency` of the payment order that will be created as part of the flow.  A `payment_flow` currently only creates ACH debits.

Check out our [Embed Payment Flow](https://docs.moderntreasury.com/payments/docs/embed-payment-flow) guide to learn how to embed this pre-built UI in your application.

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
        The ID of the payment flow.
      </td>
    </tr>

    <tr>
      <td>
        **client\_token**\
        *string*
      </td>

      <td>
        The client token of the payment flow. This token can be used to embed a payment flow UI in your client-side application.
      </td>
    </tr>

    <tr>
      <td>
        **status**\
        *string*
      </td>

      <td>
        One of `pending`, `completed`, `expired`, or `cancelled`.

        The current status of the payment flow.
      </td>
    </tr>

    <tr>
      <td>
        **amount**\
        *int32*
      </td>

      <td>
        Value in specified currency's smallest unit. e.g. $10 would be represented as 1000. Can be any integer up to 36 digits.
      </td>
    </tr>

    <tr>
      <td>
        **currency**\
        *string*
      </td>

      <td>
        The currency of the payment.
      </td>
    </tr>

    <tr>
      <td>
        **direction**\
        *string*
      </td>

      <td>
        Describes the direction money is flowing in the transaction. Can only be `debit`. A `debit` pulls money from someone else's account to your own.
      </td>
    </tr>

    <tr>
      <td>
        **counterparty\_id**\
        *string*
      </td>

      <td>
        The ID of a [counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object) associated with the payment.. An [external account](https://docs.moderntreasury.com/platform/reference/external-account-object) created with this flow will be associated with this counterparty.
      </td>
    </tr>

    <tr>
      <td>
        **originating\_account\_id**\
        *string*
      </td>

      <td>
        The ID of one of your organization's [internal accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object).
      </td>
    </tr>

    <tr>
      <td>
        **effective\_date\_selection\_enabled**\
        *bool*
      </td>

      <td>
        Enables the end user to select an effective date for the payment (e.g. the date transactions are to be posted to the participants' account).
      </td>
    </tr>

    <tr>
      <td>
        **due\_date**\
        *date*
      </td>

      <td>
        The date that the payment is due. The end user can view this date when selecting an effective date.
      </td>
    </tr>

    <tr>
      <td>
        **receiving\_account\_id**\
        *string*
      </td>

      <td>
        If present, the ID of the [external account](https://docs.moderntreasury.com/platform/reference/external-account-object) created using this flow.
      </td>
    </tr>

    <tr>
      <td>
        **payment\_order\_id**\
        *string*
      </td>

      <td>
        If present, the ID of the [payment order](https://docs.moderntreasury.com/platform/reference/payment-order-object) created using this flow.
      </td>
    </tr>

    <tr>
      <td>
        **selected\_effective\_date**\
        *date*
      </td>

      <td>
        If present, the effective date for the payment, selected by the end user.
      </td>
    </tr>
  </tbody>
</Table>

```json Payment Flow Example
{
  "id": "d93b8ae4-b30e-42ce-bc5d-e1ca5785f863",
  "object": "payment_flow",
  "live_mode": true,
  "client_token": "pay-live-fmsXHyYikKHstYHeSB6Co5AjezMqKoFKFhKmwnY2tvJMUFmndkarJY7GcwYkcBvr",
  "status": "pending",
  "amount": 10000,
  "currency": "USD",
  "direction": "debit",
  "counterparty_id": "34b33f71-daaa-4ce3-b9f3-a275e7b9a6f7",
  "effective_date_selection_enabled": true,
  "due_date": "2023-08-25",
  "receiving_account_id": null,
  "originating_account_id": "ceab8d17-1312-44fe-94e2-a858370c3f10",
  "payment_order_id": null,
  "selected_effective_date": NULL,
  "created_at": "2023-02-18T03:50:54Z",
  "updated_at": "2023-02-18T03:50:54Z"
}
```
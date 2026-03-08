# Account Collection Flows

An `account_collection_flow` is an object that can be used to embed a pre-built Account Collection UI in your application. The properties configured on the `account_collection_flow` dictate which fields to collect from your end-user.  Account collection flows currently only support collecting domestic US account information, but in the future, global payments will be supported.

Check out our [Embed Account Collection](https://docs.moderntreasury.com/payments/docs/account-collection-pre-built-ui) guide to learn how to embed this pre-built UI in your application.

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
        The ID of the account collection flow.
      </td>
    </tr>

    <tr>
      <td>
        **client\_token**
        *string*
      </td>

      <td>
        The client token of the account collection flow. This token is used to embed an account collection UI in your client-side application.
      </td>
    </tr>

    <tr>
      <td>
        **status**
        *string*
      </td>

      <td>
        One of `pending`, `completed`, `expired`, or `cancelled`.

        The current status of the account collection flow.
      </td>
    </tr>

    <tr>
      <td>
        **counterparty\_id**\
        *string*
      </td>

      <td>
        The ID of a [counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object). An [external account](https://docs.moderntreasury.com/platform/reference/external-account-object) created with this flow will be associated with this counterparty.
      </td>
    </tr>

    <tr>
      <td>
        **external\_account\_id**\
        *string*
      </td>

      <td>
        If present, the ID of the [external account](https://docs.moderntreasury.com/platform/reference/external-account-object) created using this flow.
      </td>
    </tr>

    <tr>
      <td>
        **payment\_types**\
        *array*
      </td>

      <td>
        An array of payment types.  An [external account](https://docs.moderntreasury.com/platform/reference/external-account-object) created with this flow must support ALL of these payment types.  Note this is currently restricted to domestic US rails (`ach`, `wire` or `check`).
      </td>
    </tr>
  </tbody>
</Table>

```json Account Collection Flow Example
{
  "id": "454e874b-ff1d-46e8-9d22-0464615cf1e0",
  "object": "account_collection_flow",
  "live_mode": true,
  "client_token": "ac-live-QVj2yTSt6qRNAzXQGKLHS9qfLF7Gs5JcCYHT5xztgjucGRbS6VfrJBpaNo5SrmfZ",
  "status": "pending",
  "payment_types": ["ach"],
  "counterparty_id": "c03581a8-c948-41a9-889a-e5228390fd80",
  "external_account_id": null,
  "created_at": "2023-02-18T03:23:48Z",
  "updated_at": "2023-02-18T03:23:48Z"
}
```
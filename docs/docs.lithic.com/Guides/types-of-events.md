# Types of Events

<br />

# Event Types

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Event Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        account\_holder.created
      </td>

      <td>
        Notification of the successful creation of an accountholder. See [Create Webhook for KYC/KYB Status](https://docs.lithic.com/docs/account-holders-kyb#create-webhook-for-kyckyb-status).
      </td>
    </tr>

    <tr>
      <td>
        account\_holder.updated
      </td>

      <td>
        Notification of the update of an accountholder. See [Create Webhook for KYC/KYB Status](https://docs.lithic.com/docs/account-holders-kyb#create-webhook-for-kyckyb-status).
      </td>
    </tr>

    <tr>
      <td>
        account\_holder.verification
      </td>

      <td>
        Notification of a verification result for an accountholder. See [Create Webhook for KYC/KYB Status](https://docs.lithic.com/docs/account-holders-kyb#create-webhook-for-kyckyb-status).
      </td>
    </tr>

    <tr>
      <td>
        balance.updated
      </td>

      <td>
        Notification that the balance for an `ISSUING`, `OPERATING`, or `RESERVE` financial account has been updated
      </td>
    </tr>

    <tr>
      <td>
        book\_transfer\_transaction.created
      </td>

      <td>
        Notification that a book transfer between your financial accounts has occurred.
      </td>
    </tr>

    <tr>
      <td>
        book\_transfer\_transaction.updated
      </td>

      <td>
        Notification that a reversal of a book transfer between your financial accounts has occurred.
      </td>
    </tr>

    <tr>
      <td>
        card.created
      </td>

      <td>
        Notification that a card has been created.
      </td>
    </tr>

    <tr>
      <td>
        card.converted
      </td>

      <td>
        Notification that a card has been converted from VIRTUAL to PHYSICAL.
      </td>
    </tr>

    <tr>
      <td>
        card.renewed
      </td>

      <td>
        Notification that a card has been renewed.
      </td>
    </tr>

    <tr>
      <td>
        card.shipped
      </td>

      <td>
        Physical card shipment notification. See [Physical Card Shipping Webhook](https://docs.lithic.com/docs/cards#physical-card-shipped-webhook).
      </td>
    </tr>

    <tr>
      <td>
        card\_transaction.updated
      </td>

      <td>
        Notification that a transaction object has either been created or updated with a new event.
      </td>
    </tr>

    <tr>
      <td>
        card\_transaction.enhanced\_data.updated
      </td>

      <td>
        Notification that enhanced commercial data (L2/L3) is available for a card transaction.
      </td>
    </tr>

    <tr>
      <td>
        dispute.updated
      </td>

      <td>
        Indication of an update to a dispute.
      </td>
    </tr>

    <tr>
      <td>
        dispute\_evidence.upload\_failed
      </td>

      <td>
        Dispute evidence upload failed. The most likely cause of this is the file uploaded was not a supported format.
      </td>
    </tr>

    <tr>
      <td>
        external\_bank\_account.created
      </td>

      <td>
        Notification that an external bank account resource has been created
      </td>
    </tr>

    <tr>
      <td>
        external\_bank\_account.updated
      </td>

      <td>
        Notification that an external bank account has been updated e.g., name change, verification status changes
      </td>
    </tr>

    <tr>
      <td>
        financial\_account.created
      </td>

      <td>
        Notification that a financial account has been created.
      </td>
    </tr>

    <tr>
      <td>
        payment\_transaction.created
      </td>

      <td>
        Notification that an ACH transaction has occurred. See [Financial Transactions](https://docs.lithic.com/reference/getfinancialtransactions)
      </td>
    </tr>

    <tr>
      <td>
        payment\_transaction.updated
      </td>

      <td>
        Notification that the state of an ACH transaction has been updated. See [Financial Transactions](https://docs.lithic.com/reference/getfinancialtransactions)
      </td>
    </tr>

    <tr>
      <td>
        statements.created
      </td>

      <td>
        Notification that a statement has been created.
      </td>
    </tr>

    <tr>
      <td>
        settlement\_report.updated
      </td>

      <td>
        Notification that a settlement API report has been created or updated. *Only available for programs that settle directly with the card networks.*
      </td>
    </tr>

    <tr>
      <td>
        three\_ds\_authentication.created
      </td>

      <td>
        Notification that a 3DS authentication has taken place on one of your cards.
      </td>
    </tr>

    <tr>
      <td>
        tokenization.approval\_request
      </td>

      <td>
        Card network's request to Lithic to activate a token.
      </td>
    </tr>

    <tr>
      <td>
        tokenization.result
      </td>

      <td>
        Notification of the end result of a tokenization, whether successful or failed.
      </td>
    </tr>

    <tr>
      <td>
        tokenization.two\_factor\_authentication\_code
      </td>

      <td>
        A code to be passed to an end user to complete digital wallet authentication.
      </td>
    </tr>

    <tr>
      <td>
        tokenization.two\_factor\_authentication\_code\_sent
      </td>

      <td>
        Notification that a digital wallet tokenization request 2FA code has been sent to our downstream messaging providers for delivery.
      </td>
    </tr>

    <tr>
      <td>
        tokenization.updated
      </td>

      <td>
        Notification that a tokenization status has changed.
      </td>
    </tr>

    <tr>
      <td>
        transfer\_transaction.created (deprecated)
      </td>

      <td>
        Notification that a transfer between financial accounts has occurred. See [Financial Transactions](https://docs.lithic.com/reference/getfinancialtransactions).

        *This event type has been deprecated in favor of the`book_transfer_transaction.created` and `book_transfer_transaction.updated` types.*
      </td>
    </tr>
  </tbody>
</Table>

# Event Schema

You can reference the schema of the various events types in our centralized [OpenAPI spec](https://github.com/lithic-com/lithic-openapi/blob/main/lithic-openapi.yml).

# Send Event Examples

You can simulate events in Sandbox. Please refer to [this section](https://docs.lithic.com/docs/simulating-webhooks).
# Managing Offline PIN Cards

This article describes card management specific to offline PIN cards.

# Intro

Offline PIN cards are a type of payment card widely used in certain non-US markets, including Canada. These cards store the cardholder’s PIN on the chip, enabling PIN verification to be completed entirely offline between the card and the terminal, without requiring immediate communication with the issuer. This allows transactions to proceed in situations where a point-of-sale (POS) terminal cannot establish an online connection.

However, in zero-floor markets like Canada, where every transaction must go online for final authorization, this creates unique management challenges. While the PIN verification is handled offline, the transaction itself is sent for online authorization, requiring careful synchronization between the card’s offline PIN status and the issuer’s systems. This guide outlines the API tools available for managing offline PIN cards, covering PIN updates, status synchronization, and blocked PIN handling.

<br />

# Creating an Offline PIN Card

To create a new offline PIN card, card programs can use the existing [Create Card](https://docs.lithic.com/reference/postcards) endpoint. Although the API documentation marks the `pin` field as optional, for offline PIN cards, **a PIN must be supplied** to ensure proper offline PIN functionality. The PIN is stored on the card’s chip and must be encoded at the time of card manufacture to ensure a smooth first transaction experience for the cardholder.

> 🚧 Warning:
>
> While the Create Card API reference indicates that the `pin` parameter is optional, it is required for all cards issued with offline PIN functionality.

The cardholder's preferred PIN should be collected by the card program during the cardholder's onboarding and passed to Lithic during card creation as an encrypted PIN block. For more information on generating an encrypted PIN block, refer to the [Encrypted PIN Block Guide](https://docs.lithic.com/docs/cards#encrypted-pin-block).

<br />

# Changing a Card PIN after Issuance

To change the PIN on an offline PIN card after the card has been issued, the card program can use the [Update Card](https://docs.lithic.com/reference/patchcardbytoken) endpoint. The provided encrypted PIN block will be synchronized with the card’s chip the next time the card comes online. This operation allows the cardholder to update their PIN as needed, with the new PIN being securely transmitted and stored on the card’s chip the next time the card is inserted into a terminal.

It is important to note that although the PIN change request is initiated online, it may not take immediate effect on the card if the card is not connected to a terminal. The change will be queued and applied the next time the card comes online. This is typically when the cardholder initiates another transaction.

### Example Request

```json
PATCH https://api.lithic.com/v1/cards/{card_token}
{
  "pin": "ENCRYPTED_PIN_BLOCK_STRING"
}
```

### Example Response

```json
200 - OK
{
  "token": "7ef7d65c-9023-4da3-b113-3b8583fd7951",
  "pin_status": "OK",
  "pending_commands": ["CHANGE_PIN"]
}
```

> 📘
>
> To see all of the information regarding updating a card, please see the API reference [here](https://docs.lithic.com/reference/patchcardbytoken).

When a PIN change request is initiated via API, Lithic’s response will indicate that the request is queued (as shown in `pending_commands`), but the change will remain pending until the card comes online. When the card comes online, Lithic will send a script to the card terminal to update the card's offline PIN. However, the success or failure of this update cannot be confirmed within the same transaction.

When the card comes online the *next* time, Lithic will be informed if the PIN change attempt was executed successfully. If the change was a success, `pending_commands` will be cleared. If the offline PIN change failed, Lithic will retry each time the card comes online until success is confirmed.

> 💬
>
> PIN change attempts will fail most commonly at payment terminals when the card is removed from the terminal before the new PIN can be written to the chip.

<br />

# Unblocking an Offline PIN

PIN blocking is a security feature of offline PIN cards designed to prevent unauthorized use. If multiple consecutive incorrect PIN attempts are made (typically three attempts), the card’s PIN will become blocked. When the PIN is blocked, the card cannot be used for any PIN-secured transactions until the block is cleared.

If a card’s offline PIN becomes blocked, the card program can unblock it using the [Update Card](https://docs.lithic.com/reference/patchcardbytoken) endpoint. This allows the cardholder to continue using their card without needing to change their PIN.

To unblock a PIN, update the card’s `pin_status` to `OK`. This will queue the unblock command and synchronize it with the card the next time it comes online. Similar to PIN changes, unblocking the PIN will not take immediate effect if the card is offline. The update will be processed the next time the card connects to a terminal.

> ℹ️ **Note:**
>
> If the unblock command fails (for example, due to the card being removed from the terminal too quickly), Lithic will retry the operation until it is successful. The `pending_commands` field will reflect any ongoing attempts to unblock the PIN.

### Example Request

```json
PATCH https://api.lithic.com/v1/cards/{card_token}
{
  "pin_status": "OK"
}
```

### Example Response

```json
200 - OK
{
  "token": "7ef7d65c-9023-4da3-b113-3b8583fd7951",
  "pin_status": "BLOCKED",
  "pending_commands": ["UNBLOCK_PIN"]
}
```

> 📘
>
> To see all of the information regarding updating a card, please see the API reference [here](https://docs.lithic.com/reference/patchcardbytoken).

After sending a request to set the `pin_status` to `OK`, this request will be reflected by `pending_commands` being populated by `UNBLOCK_PIN`. Although the unblocking operation is queued, it cannot be completed until the card comes online. Because of this, the `PIN_STATUS` will remain `BLOCKED` until the card comes online and the operation is able to execute.

Once the card comes online, the queued unblock command will be executed. The `pin_status` will be updated to `OK`, and the `pending_commands` field will clear, indicating that the PIN has been successfully unblocked.

To unblock a blocked PIN, it is equally valid to change the PIN as described above. Changing a card's PIN will always unblock the card's PIN status, no additional action is required.

<br />

# Identifying a blocked PIN

Lithic performs a series of basic checks on incoming authorizations to pre-decline invalid transactions before forwarding the authorization request to the card program via ASA for decisioning. These basic checks include things like verifying that the PAN is valid, that the card isn’t expired, and that the PIN input by the cardholder matches the PIN on file. This security-related, pre-ASA decline behavior extends to cards with blocked PINs.

Although the card program will not receive an ASA request, it will still be notified of the attempted transaction. This notification will come in the form of a `card_transaction.updated` webhook.

When a card’s PIN becomes blocked, the card program is encouraged to notify the cardholder to either reset/unblock their PIN or report the card as lost or stolen if unauthorized attempts were made. The card program can identify when a card’s PIN becomes blocked by checking the authorization’s detailed result, which will show `PIN_BLOCKED`, available in the `card_transaction.updated` webhook.

See below an abridged `card_transaction.updated` webhook event showing an authorization that was declined due to a blocked PIN.

```json
{
...
  "events": [
    {
      "amount": 12345,
      "created": "2024-06-19T21:09:45Z",
      "detailed_results": [
        "PIN_BLOCKED"
      ],
      "result": "INCORRECT_PIN",
      "token": "a9cf0fae-c782-4875-a0d7-a3c6a170541b",
      "type": "AUTHORIZATION"
    }
  ],
  ...
  },
  "result": "INCORRECT_PIN",
  ...
  }
}
```

> 📘
>
> To see the full structure of a transaction event, see the API reference [here](https://docs.lithic.com/reference/post_card-transaction-updated).

<br />

# Identifying Cards with Blocked PINs via Lithic Dashboard

If a cardholder is attempting to transact with a card and their PIN has become blocked due to multiple failed PIN attempts, the cardholder may contact the Card Program about their issue. To make it clear that a card's PIN is blocked to first-line customer support, new fields have been added to the Cards section of the Lithic dashboard.

<Image align="center" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/61756135d7bade9f_83da10cf057fef894042b77ade8f1d607c986e1012bd8b059c992007eeb46e3d-Managing_Offline_PIN_Cards.png" />

In this screenshot, `PIN Status` is present in the Card details within the Lithic Dashboard. For the majority of cards, the value will be `Ok`, but when a blocked offline PIN is communicated to Lithic, the status in the dashboard will update to `Blocked` in sync with the data available via API. To unblock a card via the Lithic Dashboard, click the *Unblock* button next to the PIN Status.

The *Pending Commands* field will be conditionally present. If there is a pending command for the card, it will be shown in the dashboard. If there are no pending commands (vast majority of cards) the row will be absent.
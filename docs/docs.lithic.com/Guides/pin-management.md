# Managing Online PIN Cards

This article describes card management specific to online PIN cards.

# Unblock Card PIN

As a security feature of Lithic-issued cards, the entry of 3 consecutive incorrect PIN attempts will result in the card's PIN becoming blocked. PIN blocking will only occur for cards whose PINs have been fully configured (set), and only when incorrect attempts are *consecutive*. Once a card PIN becomes blocked, the card will be unable to make subsequent PIN transactions until either:

1. The PIN is changed
2. The card program sends a PIN unblock request

Transactions which are declined due to a blocked PIN are treated similarly to other security-related declines, meaning that they occur prior to an ASA request being dispatched to the card program. Because of this, the first step to unblocking a card PIN is identifying when a card's PIN becomes blocked.

## Identifying a blocked PIN

Lithic performs a series of basic checks on incoming authorizations to pre-decline invalid transactions before forwarding the authorization request to the card program via ASA for decisioning. These basic checks include things like verifying that the PAN is valid, that the card isn’t expired, and that the PIN input by the cardholder matches the PIN on file. This security-related, pre-ASA decline behavior extends to cards with blocked PINs.

Although the card program will not receive an ASA request, the card program will still be notified of the attempted transaction. This notification will come in the form of a `card_transaction.updated` webhook.

When a card’s PIN becomes blocked, the card program is encouraged to notify the cardholder to either reset/unblock their PIN or report the card as lost or stolen if unauthorized attempts were made. To know when a card’s PIN status has transitioned to blocked, this information is available via the authorization detailed result value of `PIN_BLOCKED`, available in the `card_transaction.updated` webhook.

See below an abridged `card_transaction.updated` webhook event showing an authorization that was declined due to a blocked PIN. To see the full structure of a transaction event, see the API reference [here](https://docs.lithic.com/reference/post_card-transaction-updated).

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

## Unblocking a PIN

Once a card’s PIN is blocked, there are two options to resolve it:

1. Send a PIN unblock request
2. Change the card's PIN

### Card Unblock Request

To unblock a card's PIN, card programs can take advantage of the `pin_status` field included in the Lithic [Update Card](https://docs.lithic.com/reference/patchcardbytoken) endpoint.

To unblock a card with a `pin_status` of `BLOCKED` without changing the PIN, send a PATCH request to the /cards endpoint updating the `pin_status` to `OK`.

#### Example Request

```json
PATCH https://api.lithic.com/v1/cards/{card_token}

{
	"pin_status": "OK",
}
```

### Change Card PIN

To change a card's PIN, card programs should follow the standard PIN change behavior by using the Lithic [Update Card](https://docs.lithic.com/reference/patchcardbytoken) endpoint.

You can learn more about updating a card with example requests and responses here: [API Guide reference](https://docs.lithic.com/docs/cards#update-card).

There are no additional actions required for the PIN change to unblock the PIN. Changing the PIN will always unblock a blocked offline PIN.

### Request
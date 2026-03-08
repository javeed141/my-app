# Managing Cards

Learn how to renew, replace, and reissue cards or update a virtual card to a physical card.

> 📘 Manage Cards Overview
>
> Note: It's important to understand the differences between Reissue, Renew, and Replace to select the appropriate option. Please reference the table below to understand the different options. More details can be found in each detailed section below.

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }} />

      <th style={{ textAlign: "left" }}>
        Reissue
      </th>

      <th style={{ textAlign: "left" }}>
        Renew
      </th>

      <th style={{ textAlign: "left" }}>
        Replace
      </th>

      <th style={{ textAlign: "left" }}>
        Convert to Physical
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        General Use Case
      </td>

      <td style={{ textAlign: "left" }}>
        Physical card is damaged and the same card needs to be reissued
      </td>

      <td style={{ textAlign: "left" }}>
        Card is expiring and needs to be renewed with an updated expiry
      </td>

      <td style={{ textAlign: "left" }}>
        Card is compromised and needs to be closed and a new PAN needs to be created
      </td>

      <td style={{ textAlign: "left" }}>
        User has a virtual card and wants a physical card
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Supported Card Types
      </td>

      <td style={{ textAlign: "left" }}>
        `PHYSICAL`
      </td>

      <td style={{ textAlign: "left" }}>
        `PHYSICAL`

        `VIRTUAL`
      </td>

      <td style={{ textAlign: "left" }}>
        `PHYSICAL`

        `VIRTUAL`
      </td>

      <td style={{ textAlign: "left" }}>
        `VIRTUAL`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Card token
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        **new**
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        PAN
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        **new**
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Expiry
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        **new**
      </td>

      <td style={{ textAlign: "left" }}>
        **new**
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        CVC
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        **new**
      </td>

      <td style={{ textAlign: "left" }}>
        **new**
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        PIN
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>

      <td style={{ textAlign: "left" }}>
        **new**
      </td>

      <td style={{ textAlign: "left" }}>
        same
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        New card can transact
      </td>

      <td style={{ textAlign: "left" }}>
        once activated
      </td>

      <td style={{ textAlign: "left" }}>
        once activated
      </td>

      <td style={{ textAlign: "left" }}>
        once activated
      </td>

      <td style={{ textAlign: "left" }}>
        Physical card can once activated
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Old card can transact
      </td>

      <td style={{ textAlign: "left" }}>
        until new card is activated
      </td>

      <td style={{ textAlign: "left" }}>
        until new card is activated
      </td>

      <td style={{ textAlign: "left" }}>
        old card is closed immediately
      </td>

      <td style={{ textAlign: "left" }}>
        Virtual card continues to work
      </td>
    </tr>
  </tbody>
</Table>

# Renew Card

As cards approach expiry, customers can *renew* cards, generating a card with the same card token and PAN, but updated expiry and CVC code. This can be done with both `PHYSICAL` and `VIRTUAL` cards. API Reference: [Renew Card](https://docs.lithic.com/reference/postcardrenew). A card can be reissued and/or renewed a maximum of 8 times.

For `PHYSICAL` cards, this flow is best suited for replacing a card approaching expiry. To set up a card renewal flow:

1. Make a POST request to `/cards/{card_token_UUID}/renew`.
2. This POST request will trigger a physical card shipment. As part of this POST request, you must specify an address for the card to be shipped.
3. The card's state will change to `PENDING_FULFILLMENT`. Once the card has been created by the card manufacturer, the state will change again to `PENDING_ACTIVATION`. Once the card is delivered to the cardholder, you should activate it by changing state to `OPEN`.
4. The new physical card will only start working for card-present transactions once activated (the state is changed from `PENDING_ACTIVATION` back to `OPEN`)
5. The original physical card will keep working for card-present transactions until the new card is activated. For card-not-present transactions, the original card details (expiry, CVC) will also keep working until the new card is activated.
6. Lithic will pass along the updated card details to Mastercard's Automatic Billing Updater or Visa's Account Updater. Participating merchants will be able to update the card-on-file information.

For `VIRTUAL` cards:

1. Make a POST request to `/cards/{card_token_UUID}/renew`.
2. The card's state will remain unchanged. If the card was `PAUSED`, it will remain in `PAUSED` state.
3. Lithic will pass along the updated card details to Mastercard's Automatic Billing Updater or Visa's Account Updater. Participating merchants will be able to update the card-on-file information.

# Replace Card

Replace a `PHYSICAL` card with a new physical card with a different PAN, CVC, and card token (e.g. card was stolen) or replace a `VIRTUAL` card with a virtual card with a different PAN, CVC, and card token. API Reference: [Create Card](https://docs.lithic.com/reference/postcards).

This flow closes the original card and creates a new card with a new PAN, expiry, CVC, and card token. This is best suited for replacing a lost or stolen card whose number is no longer secure.

For `PHYSICAL` cards, to set up a card replacement flow:

1. Make a POST request to the `/cards` endpoint. In your request, specify the UUID of the card you want to replace in the `replacement_for` field. Specify a new PIN same as a standard card create.
2. This POST request will trigger a physical card shipment. As part of this POST request, you must specify an address for the card to be shipped.
3. **Please note: this POST request will immediately change the predecessor physical card's state to`CLOSED` and that physical card will no longer be able to transact.**
4. The new card's state will change to `PENDING_FULFILLMENT`. Once the card has been created by the card manufacturer, the state will change again to `PENDING_ACTIVATION`. Once the card is delivered to the cardholder, you should activate it by changing state to `OPEN`.
5. The replacement card will be created with the `replacement_for` field populated with the predecessor card's `token` for future reference. The replacement card will be created with the replacement\_for field populated with the predecessor card's token for future reference.
6. Lithic will pass along the updated card details to Mastercard's Automatic Billing Updater or Visa's Account Updater. Participating merchants will be able to update the card-on-file information.

For `VIRTUAL` cards:

1. Make a POST request to the `/cards` endpoint. In your request, specify the token of the card you want to replace in the `replacement_for` field. Specify a new PIN same as a standard card create.
2. The predecessor virtual card's state will be changed to `CLOSED` and no longer be able to transact.
3. The new card's state will change to `OPEN` and able to transact immediately.
4. The replacement card will be created with the replacement\_for field populated with the predecessor card's token for future reference.
5. Lithic will pass along the updated card details to Mastercard's Automatic Billing Updater or Visa's Account Updater. Participating merchants will be able to update the card-on-file information.

# Reissue Physical Card

Initiate print and shipment of a replacement physical card (e.g. card is physically damaged). A card can be reissued and/or renewed a maximum of 8 times. API Reference: [Reissue card](https://docs.lithic.com/reference/postcardreissue). This is not available for a `VIRTUAL` card since the data is the same and the current card. Replace Card and Renew Card should be considered first to see if they are a better option for the action you are looking for.

When you reissue a physical card, the following will happen:

1. The card state will change from `OPEN` to `PENDING_FULFILLMENT`. Once the card has been created by the card manufacturer, the state will change again to `PENDING_ACTIVATION`. Once the card is delivered to the cardholder, you should activate it by changing state to `OPEN`.
2. The PAN, expiry, and CVC will remain the same (with the exception of cards created before 5/2023 - CVC will change in those cases). These credentials can be used for card-not-present transactions at any time.
3. The new physical card will only start working for card-present transactions once activated (the state is changed from `PENDING_ACTIVATION` back to `OPEN`)
4. The original physical card will keep working for card-present transactions until the new card is activated.

<br />

# Convert Virtual to Physical Cards

Convert a card from a `VIRTUAL` card to a `PHYSICAL` card and manufacture it.

1. Customer must supply relevant fields for physical card creation including `product_id`, `carrier` and `shipping_address`.
2. The `card_token` will be unchanged. The card's type will be altered to `PHYSICAL`.
3. The card will be set to state `PENDING_FULFILLMENT` and fulfilled at the next fulfillment cycle.
   Virtual cards created on card programs which do not support physical cards cannot be converted. The card program cannot be changed as part of the conversion. Cards must be in a state of `OPEN`.
4. Only applies to cards of type `VIRTUAL` (existing cards with deprecated types of `DIGITAL_WALLET` or `UNLOCKED`will also be supported).
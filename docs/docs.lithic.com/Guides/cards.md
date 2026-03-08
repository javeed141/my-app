# Cards

Learn how to create, update cards.

# Card Details

<Callout icon="📘" theme="info">
  Due to PCI compliance requirements, the `pan`and `cvv` fields are only available in **Production** for customers who have verified PCI compliance.

  All customers will see these fields in **Sandbox**.
</Callout>

The following Card types are supported on the platform:

* `VIRTUAL` - The card will support card-not-present transactions and can be added to a digital wallet like Apple Pay or Google Pay (if the card program is digital wallet-enabled) to be used in stores. This will create a card that will not be manufactured, however a `VIRTUAL` card can be changed to a `PHYSICAL` card at later point in time through the [Convert Virtual to Physical Card](https://docs.lithic.com/reference/postconvertphysical) endpoint.
* `PHYSICAL` - The card Manufactured and sent to the cardholder and can be used. The card will support card-not-present transactions, can be added to a digital wallet like Apple Pay or Google Pay (if the card program is digital wallet-enabled) and used in stores at POS. We offer white label branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality. The program must be configured with a `product_id` to support `PHYSICAL` cards.
* `SINGLE_USE` - The card is closed upon first successful authorization and can only be used once. After the first transaction, additional purchases will be declined, but the card will remain available to process refunds. *Note that merchants may still initiate[force post](https://docs.lithic.com/docs/transaction-flow#7-clearing) charges (i.e., a clearing without a prior authorization) which Lithic is not able to decline. These may be subject to chargeback.*

Cards can be in following `state` values:

* `CLOSED` - Card will no longer approve authorizations. Closing a card cannot be undone.
* `OPEN` - Card will approve authorizations (if they match card and account parameters).
* `PAUSED` - Card will decline authorizations, but can be resumed at a later time.
* `PENDING_FULFILLMENT` - The initial state for cards of type PHYSICAL. The card is provisioned pending manufacturing and fulfillment. Upon creation of a physical card, the card details can immediately be provided to the cardholder to be used virtually or added to their digital wallet until they receive the physical card. Cards in this state can accept authorizations for e-commerce purchases and digital wallet POS transactions, but not for "Card Present" purchases where the physical card itself is present.
* `PENDING_ACTIVATION` - At regular intervals, cards of type PHYSICAL in state PENDING\_FULFILLMENT are sent to the card production warehouse and updated to state PENDING\_ACTIVATION . Similar to PENDING\_FULFILLMENT, cards in this state can be used for e-commerce transactions or can be added to mobile wallets. API clients should update the card's state to OPEN only after the cardholder confirms receipt of the card.

<Callout icon="📘" theme="info">
  If neither `exp_month` nor `exp_year` is provided, an 6 year expiration date will be generated.  6 years is the maximum expiration date that can be provided.
</Callout>

# Create Card

API Reference: [Create card](https://docs.lithic.com/reference/postcards)

Create either a virtual or physical card.

In sandbox, the same daily batch fulfillment occurs, but no cards are actually manufactured.

<Callout icon="🚧" theme="warn">
  Before physical cards can be issued, there are a few onboarding steps with external party dependencies that must be completed. Please [Contact Us](https://lithic.com/contact) or your Customer Success rep for more information. Steps required include:

  1. Establish and validate new BINs with the network and card manufacturer; this ensures that BINs are set up correctly and are ready for use, that transactional data will be sent securely, and that physical cards can be issued by the manufacturer
  2. Set up requirements for card manufacturing (e.g., card art)
  3. Test and confirm card configurations (e.g., spend testing, shipping) for final approval
</Callout>

# List Cards

API Reference: [List cards](https://docs.lithic.com/reference/getcards)

Get details for all cards or a specified card. This endpoint can only be used for cards that are managed by the program associated with the calling API key.

# Update Card

API Reference: [Update card](https://docs.lithic.com/reference/patchcardbytoken)

Update the specified properties of the card. Unsupplied properties will remain unchanged.

# Get Specific Card

API Reference: [Get card](https://docs.lithic.com/reference/getcardbytoken)

Get card configuration such as spend limit and state

# Encrypted PIN Block

Cardholder PINs can be configured for cards of type `PHYSICAL` and `VIRTUAL`. You can provide cardholder PIN when creating cards using the [create card](https://docs.lithic.com/docs/cards#create-card) endpoint. The [update card](https://docs.lithic.com/reference/patchcardbytoken) endpoint can be used to set or update it later.

<Callout icon="🚧" theme="warn">
  Due to their sensitive nature, PINs must be encrypted on the frontend immediately after user input.
</Callout>

An Encrypted PIN block is a JSON blob containing a `nonce` and a `pin`field, encrypted with the Lithic API public key, base64 digest. The Lithic API public key is: [api.lithic.com.pub.pem](https://lithic.com/assets/api/api.lithic.com.pub.pem), this is used for both the sandbox and live environments. The `nonce` should be chosen as a large random integer generated per request to prevent replay attacks.

To generate the Encrypted PIN Block, the JSON blob should be:

* UTF-8 encoded
* Encrypted using the public key
* Then base64 encoded

The below code example shows a JSON blob input and its corresponding encrypted PIN block after the steps above are executed.

```json
{
  "nonce": 12341234,
  "pin": "1234"
}
```

```text Encrypted + Encoded
BfXX5BvNY7u+JSGe5RKIidYP9QQ4CX+Yd71Roi6nUwANHZK45j9n+jc6Q27iqodXXo0k4Kb7V7b2zsq4Fi24hHYNQh3B9GapN1mHQytjfSsJOF9eHS6I/nlnU/VmPQ09w4Yp5bjkpwKTaR2h5F1M73QWzUSwjNL68WVRDcAy6GWmUBBkrr6VI+TIBO68h6AESDp102Cs3NDFKwJKwqyLgx4eNu3yIMOIV3R1nD5JLGLMb0A7Cd+z/BToj7t9tv88Nl9zgxRCWfQcEaxeT1ZXEhAyeF0m+csDZqAuk9WGhQ1i4lKxL4AEY/2wes/2gVsserHx37vdi5Tk5TOLVDXYP39DmkZSjvi5UJyYod2qAUQAJ2Ac21H3okqAbeZKsxx7vfxJxOiY1l/7wOQASO1mID4lQFI3ZAr+JnSjTc4NPGjgYJ0AAH8PfPFFYZidCrgEr69Brjxn+N6QM1pcv7m54JuVc3b5hdOrJpD0wyjAcNs7ljfV0O2iKReQERY8gFOPtjcYaN+xj1oTiNMzM5oUqZZ73noT1pCt9QjwmJECSKLeaU2ffkmj1mx1G9P1cGUAVoK77i4PEriI10BfZuhjyiR/BCAVKVxWI5a/XpeUJhK7e85mjZ39bEEQR1bMaXlJp5dPCvh7jC8ALrJts0ZR3xlSXHfNvQUzcvzCj7dNgZM=
```

<br />

# Physical Card Shipped Webhook

When Lithic receives confirmation from the card manufacture that your physical cards have shipped Lithic will send a webhook to your registered [Events webhook URL](https://docs.lithic.com/docs/events-api)(s) subscribing to events of type `card.shipped`. This generally occurs at the end of the day for all cards shipped during the day.

Check with your customer success manager if your manufacturer requires additional setup to support `card.shipped` events.
# Physical Cards Setup

Learn how to set up a physical card program.

# Overview: Launching A Physical Card Program

Creating a physical card program involves several third parties: a card manufacturer, a network, and a sponsor bank. Before you can create physical cards, you’ll have to complete these three steps:

1. **BIN Setup:** You’ll need to acquire a new BIN(s) in coordination with a sponsor bank and a card network (unless you’re using a BIN pre-established by your Program Manager).
2. **Card Manufacturing Setup:** Then, you’ll need to set up your BIN for use with the card manufacturer and share your physical card program details with Lithic or the card manufacturer.
3. **End-to-End Development and Testing:** Once you’ve set up your BIN with a sponsor bank, the network, and the card manufacturer and received your card stock, you’ll want to test your whole physical card issuance process.
   1. Validate your card package, including the card (and its transacting functionality), envelope, and card carrier (the paper the card comes attached to), with a test package from your card manufacturer.
   2. Test your end users’ physical card issuance workflow end to end (e.g., from triggering issuance from a mobile app to card delivery).
   3. When all the above steps are complete, you can start issuing physical cards using the Lithic API! See [How to Issue a Physical Card](https://docs.lithic.com/docs/physical-cards-setup-guide#how-to-issue-a-physical-card).

## Physical Card Implementation Types

Lithic offers two types of card implementations:

1. **Templated cards:** Templated card programs use standardized black or white cards, but the logo, card carrier, and card text can be customized within the bounds of a template. Lithic manages the card inventory and manufacturer relationship.
   * Lithic also offers generic black/white card options with no customization for customers prioritizing speed to market.

2. **Custom cards:** For custom cards, you’ll contract directly with our partner card manufacturer (we're happy to provide an intro!) and fully manage your physical card program (e.g., managing card stock, working with the manufacturer on design and pricing).
   * This fuller management enables broader customizability, including options like choosing unique card art or packaging. Cards will still be issued and managed via the Lithic API. Note that physical card programs will still need to be approved by the bank and network.

## How to Issue a Physical Card

1. Request your `card_program_token` and `product_id` from your implementation manager.
2. Send a `POST` request to the [Create Card](https://docs.lithic.com/reference/postcards) endpoint
3. Once your request is sent successfully, a new card will be created with the status `PENDING_FULFILLMENT`. Once the card manufacturer receives and confirms your order, the status will change to `PENDING_ACTIVATION`.
4. Once your customer confirms receipt of the card, set the card’s `state` to `OPEN`.
5. Prompt your customer to [set a PIN](https://docs.lithic.com/docs/cards#encrypted-pin-block) to further secure their card after receipt.

### Card Fulfilment Details

Card manufacturers have restrictions on which characters are allowed for embossing, mailers, and track data, and these may vary across card manufacturers. Lithic currently performs the following alterations of supplied data to aim to conform to common restrictions across card manufacturers.

* For fields such as `shipping_address->first_name`, `shipping_address->last_name`, `shipping_address->business_name`, and for other `shipping_address` fields, Lithic removes **|#\`\~^;" .**
* For track1 data which utilizes the first name and last name, Lithic will transliterate non-ascii characters to ascii, as well as remove both the character set above as well as an additional set of characters **|#\`\~^;",.&'!$\*-:%()@?+/**

It may be possible for the card to fail post Lithic alterations for different use cases.

The `first_name` and `last_name` in the `shipping_address` object will printed on the carrier and on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters, however each fulfillment house and card design could have further limitations.

Please work with your card manufacturer to understand their requirements and submit the Create Card details in compliance to ensure the card is printed without issues.

## How to Renew Expiring Physical Cards or Replace Lost/Stolen Physical Cards

Please see our [Managing Cards](https://docs.lithic.com/docs/managing-cards) guide for more information.
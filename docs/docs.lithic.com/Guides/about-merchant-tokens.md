# About Merchant Tokenization

# Introduction

## What is merchant tokenization?

Merchant tokenization works in a similar way to [digital wallet tokenization](https://docs.lithic.com/docs/about-digital-wallets). When a cardholder saves their card details at on online merchant or subscription service, the merchant can send a tokenization request to the token service provider. Once the tokenization request is approved the merchant can store the token, rather than full PAN details, on their system. During subsequent payments the merchant uses the card's token and contacts the network to get a cryptogram for every transaction, securing the purchase.

Merchant tokenization increases security for both the merchant and the issuer since each token is mapped to the cardholder and the specific merchant.

You might hear merchant tokenization also referred to as tokenization for online card on file payments.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/f04ede4c31d809b6_ba17f94-image.png)

<br />

## How are cards tokenized at merchants?

Unlike digital wallet tokenization, the cardholder cannot control if saving their card at a merchant will initiate the merchant tokenization flow. It's up to the merchant if they would rather store the full PAN or request a token to store on their system. The cardholder isn't able to see the difference between a card stored as a full PAN or token on the merchant's system.

# Implementation

Once your BIN or BIN range is enabled for tokenizations during the [digital wallet tokenization](https://docs.lithic.com/docs/about-digital-wallets) setup, there are no additional steps or configurations to enable merchant tokenization.

## How do I know if a token is for a merchant or digital wallet?

The [Get a Card's Tokenization](https://docs.lithic.com/reference/gettokenizations) endpoint has a query parameter called `tokenization_channel` which will accept `DIGITAL_WALLET` or `MERCHANT` to return the associated tokens for each type.

You can also be notified when a new token is added to the card account, by subscribing to the tokenization events which will include a`tokenization_channel `field with value `DIGITAL_WALLET` or `MERCHANT`.
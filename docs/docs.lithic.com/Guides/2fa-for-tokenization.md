# 2FA for Tokenization

# Sending Cardholders 2FA Codes

See [Cardholder Authentication](https://docs.lithic.com/docs/about-digital-wallets#digital-wallet-cardholder-authentication) for an overview of two-factor authentication for digital wallets. The generation of a 2FA code is triggered when either the wallet or you decide (if using self-serve tokenization decisioning) to authenticate the end user trying to tokenize their card. Note that when Apple or Google pass a `recommendation_decision` of `REQUIRE_ADDITIONAL_AUTHENTICATION`, Lithic **must** either trigger 2FA or decline the tokenization per the wallets’ requirements.

Lithic offers two ways to send a two-factor authentication code to end users:

## Lithic sends the 2FA code on your behalf.

We will send the user a message via text or email using the information on file for [enrolled accountholders](https://docs.lithic.com/docs/account-holders-kyc). Speak to your implementation manager about how to set this up.

<Image align="center" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/5b8fd80faaa133f7_2068e43-_Cardholder_Authentication_Options_Lithic2x.png" />

## You send the 2FA code to end users yourself.

Lithic also enables customers to deliver authentication codes to end users themselves. This option is great if you want to customize your messaging and/or send all messages from a single, consistent email address or phone number. This webhook will only be sent to customers authenticating their end users via email or phone; this code will not be sent for users authenticating via mobile app.

Lithic will send you a webhook containing the two-factor authentication code using `event_type`: `tokenization.two_factor_authentication_code`. Note that to receive these webhooks, you'll need to [subscribe to this event type using our Events API](https://docs.lithic.com/docs/events-api#create-event-subscription). See the [API Reference](https://docs.lithic.com/reference/post_tokenization-two-factor-authentication-code) for more information about the data you will receive via the webhook.

<Image align="center" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/51e228cc73ba2612_39b13d6-Cardholder_Authentication_Options_Customer2x.png" />

<br />
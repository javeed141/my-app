# In-App Push Provisioning

Learn how to add cards to digital wallets with in-app push provisioning.

> 🚧 Before setting up digital wallet in-app push provisioning, the [implementation steps](https://docs.lithic.com/docs/about-digital-wallets#implementation-steps) for digital wallets must be complete.

Push provisioning allows your cardholders to add their virtual or physical cards to their digital wallets with the tap of a button in your mobile app. This lets them skip manually typing in their card information.

<div align="center">
  <img src="https://files.readme.io/bb4ff1c-add-to-apple-wallet-logo_1.png" alt="Add to Apple Wallet" width="200" />
</div>

<div align="center">
  <img src="https://files.readme.io/033cf6e-jk.png" alt="Google Pay" width="200" />
</div>

# Guide: Enabling Push Provisioning

There are three main steps to enabling push provisioning:

1. [Obtaining Entitlements from the wallets](https://docs.lithic.com/docs/push-provisioning#1-obtaining-entitlements-from-the-wallets)
2. [Sharing your Entitlements with Lithic](https://docs.lithic.com/docs/push-provisioning#2-sharing-entitlements-with-lithic)
3. [Setting up the Add to Wallet button](https://docs.lithic.com/docs/push-provisioning#3-setting-up-the-add-to-wallet-button)

## 1. Obtaining Entitlements from the Wallets

### Entitlements from Apple

To obtain entitlements from Apple, have the owner of your Apple developer account send the following to the Apple Pay Entitlements team at [apple-pay-provisioning@apple.com](mailto:apple-pay-provisioning@apple.com):

Subject: Apple Pay Entitlement & Whitelisting Request - Issuer Name - \[Country Code]
e.g. Apple Pay Entitlement & Whitelisting Request - MyBank - \[DE]

Body:

1. Issuer Name: the name of your company, e.g., PayPal
2. Country \[Country Code]: e.g., Germany \[DE]
3. Developer Team ID: can be [found here](https://developer.apple.com/account/#/membership) or [here](https://appstoreconnect.apple.com/login).
4. Adam ID: can similarly be found from [App Store Connect](https://appstoreconnect.apple.com/login).
5. App Name: the name of your app, e.g., PayPal Mobile

If approved by Apple Pay, the team should send you an email with additional steps to complete, including entitlement configuration, and metadata/payment data configuration.

### Entitlements from Google

To obtain entitlements from Google, request access to Google’s Push Provisioning API here:

1. **Push Provisioning API Access Request:** `<https://support.google.com/faqs/contact/pp_api_allowlist?authuser=1>`
2. **Push Provisioning API UX Review Request:** `<https://support.google.com/faqs/contact/pp_api_ux>`

## 2. Sharing Entitlements with Lithic

Once you’ve completed the entitlements process with the digital wallets, you’ll need to share the following with Lithic:

**Apple:**

1. Application Identifiers
2. Adam ID
3. Application Launch URL

Share these with your implementation or customer success manager.

For **Google**, you'll need to obtain Push Provisioning API Access (see link above) to be added to Google's allowlist.

## 3. Setting up the Add to Wallet button

Once you’ve shared your entitlements with Lithic, you’re ready to set up your Add to Wallet button in your mobile app! When your users click Add to Wallet, you’ll make a series of calls to the wallets and Lithic to kick off the digital wallet tokenization process.

### Push Provisioning with Apple

Push provisioning with Apple Wallet involves several parties: your app, Apple Wallet/Servers, and Lithic (your issuer).

1. First, your user triggers push provisioning by pressing the “Add to Apple Wallet” button in the app.
2. Your app will then call Apple, who will generate Public Certificates and a [nonce](https://csrc.nist.gov/glossary/term/nonce). Those determine how Lithic encrypts payment data.
3. The Apple Public Certificates and [nonce](https://csrc.nist.gov/glossary/term/nonce) are provided to your app.
4. Your app then passes this certificate and nonce to Lithic as part of your call to the `/cards/{card_token}/provision` endpoint (see Provision Card - Digital Wallet).
5. We then return several pieces of information to your app: an `ephemeralPublicKey`, `encryptedPassData`, and `activationData`.
6. Your app passes this data to Apple, who coordinates with the card network to kick off the regular digital wallet tokenization flow.

Check out [Apple's Wallet documentation](https://developer.apple.com/documentation/passkit/wallet?language=objc) for more detail.

### Push Provisioning with Apple (`activationData` Only)

If you only require `activationData` (e.g. a card is already added to Apple Wallet and only needs to be activated) you can omit steps 2 and 3 above. By omitting the `certificate`, `nonce`, and `nonce_signature` in the `/cards/{card_token}/provision` request body you will only receive the `activationData` in the response body which can then be passed to Apple.

### Push Provisioning with Google

Push provisioning with Google Wallet is similar. Once you’ve been approved for access to Google’s Push Provisioning API, go to Google’s [Integration Steps page](https://developers.google.com/pay/issuers/apis/push-provisioning/android/integration-steps) to see their documentation.

For Google, you’ll work with us (the “Token Service Provider”, or TSP, in Google’s parlance) to generate and encrypt an Opaque Payment Card (OPC).

# Provision Card - Digital Wallet

API Reference: [Provision card (Digital Wallet)](https://docs.lithic.com/reference/postcardprovision)

As part of the push provisioning flow, when your user presses the “Add to Wallet” button, you’ll want to call Lithic to generate an encrypted `provisioning_payload`. This cryptographic payload represents a payment card that can be passed to a device's digital wallet.

To determine if a transaction originated from a card once provisioned to the wallet, use the `token_info` field in [ASA](https://docs.lithic.com/docs/auth-stream-access-asa).

```
POST https://api.lithic.com/v1/cards/{card_token}/provision
```

#### Sample Request

```curl
curl https://api.lithic.com/v1/cards/f5f905f5-8a8e-49bf-a9b4-c0adaa401456/provision \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '
{
     "digital_wallet":"APPLE_PAY"
}
'
```

| Parameter                                                                                                                                | Description                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| card*token* (required, path parameter)\_                                                                                                 | Globally unique identifier for the card to be added to a device's digital wallet. <br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).*                                                                                           |
| certificate *(only applicable if `digital_wallet` is `APPLE_PAY`)*                                                                       | Apple's public leaf certificate, provided by the device's wallet. Omit to receive only `activationData` in the response. <br /> *String. Permitted values: Base64 encoded in PEM format with headers (`-----BEGIN CERTIFICATE-----`) and trailers omitted.* |
| client*wallet\_account\_id* (only applicable if `digital_wallet` is `GOOGLE_PAY` or `SAMSUNG_PAY` and the card is on the Visa network)\_ | Consumer ID that identifies the wallet account holder entity.                                                                                                                                                                                               |
| client*device\_id* (only applicable if `digital_wallet` is `GOOGLE_PAY` or `SAMSUNG_PAY` and the card is on the Visa network)\_          | Stable device identification set by the wallet provider.                                                                                                                                                                                                    |
| digital*wallet* (required)\_                                                                                                             | Name of digital wallet to which the card will be added. <br /> *String. Permitted values: `APPLE_PAY`, `GOOGLE_PAY`, `SAMSUNG_PAY`.*                                                                                                                        |
| nonce *(only applicable if `digital_wallet` is `APPLE_PAY`)*                                                                             | Number provided by the device's wallet to prevent replay attacks. Omit to receive only `activationData` in the response. <br /> *String. Permitted values: Base64 cryptographic nonce.*                                                                     |
| nonce*signature* (only applicable if `digital_wallet` is `APPLE_PAY`)\_                                                                  | Device-specific signature for the nonce provided by the device's wallet. Omit to receive only `activationData` in the response. <br /> *String. Permitted values: Base64 nonce signature.*                                                                  |

#### Sample Response: Apple Pay

Object containing the fields required to add a card to Apple Pay. Applies only to Apple Pay wallet. The details may vary based on the digital wallet provider; consult the wallet's documentation for more info.

```json
{
  "provisioning_payload": {
    "activationData": "...",
    "ephemeralPublicKey": "...",
    "encryptedData": "..."
  }
}
```

#### Sample Response: Google Pay or Samsung Pay

The `provisioning_payload` is a base64 encoded JSON payload. The details of this payload may vary based on the digital wallet provider; consult the wallet's documentation for more info.

```json
{
  "provisioning_payload": "eyJjYXJkSW5mbyI...Q3MjRFRUEzQkI3OEU="
}
```
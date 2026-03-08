# Tokenization Decisioning

Learn how to decision tokenizations with Lithic.

See [About Digital Wallets](https://docs.lithic.com/docs/about-digital-wallets) for a broader overview of digital wallet tokenizations.

> 🚧 Customer Tokenization Decisioning is only available for Mastercard programs and for Digital Wallet Tokens. It is not available for Merchant Tokens.

Lithic offers two ways to decision on digital wallet tokenizations:

1. Lithic decisions on your behalf, generally aligned with the wallets’ recommendations, or
2. You decide with a tokenization decisioning responder, similar to decisioning for card transactions [with Auth Stream Access](https://docs.lithic.com/docs/auth-stream-access-asa).

Being able to accurately decision on tokenization is important for two reasons:

1. Fraud on digital wallet cards is generally not disputable with the networks, as digital wallet transactions are categorized as Card Present. This means stopping fraudulent tokenizations can prevent unrecoverable fraud.
2. False positives, in which a non-fraudulent user is blocked from tokenizing, can frustrate end users.

# Tokenization Decisioning by Lithic

For customers who prefer simpler implementations, Lithic can decision on tokenizations on your behalf. Note that for Lithic to decision on tokenizations, you **must** be [enrolling accountholders](https://docs.lithic.com/docs/account-holders-kyc) so that Lithic has the information on file to authenticate your end users when the wallets require two-factor authentication.

# Customer Tokenization Decisioning

*Note: Customer Tokenization Decisioning is currently only available for Mastercard.*

Customers who want to decision on tokenizations themselves should set up a tokenization decisioning responder to build their own logic around who should or should not be approved to tokenize cards. Below are the possible outcomes of tokenization decisioning. Please note that Lithic will **not** allow a more permissive tokenization decision than what the wallets require. For example, if you respond to a request with `APPROVE` even though the wallets recommended `REQUIRE_AUTHENTICATION`, Lithic will fallback to our own tokenization logic and likely adhere to the wallets' recommendation. Note that if a card is in the `CLOSED` state, we will always decline the request and never send a request to your tokenization decisioning responder.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/446588e1966209c2_20ff1bb-Customer_Tokenization_Decisioning2x.png)

## Setting Up a Tokenization Decisioning Responder

To use Tokenization Decisioning, you'll first have to set up a responder to which we'll send Tokenization Decisioning Requests. This responder should reply to our requests with a Tokenization Decisioning Response. Use the [Enroll a Responder Endpoint](https://docs.lithic.com/reference/postresponderendpoints) with `type` `TOKENIZATION_DECISIONING` to set up your responder for this purpose.

To delete an existing responder, use the [Disenroll a Responder Endpoint](https://docs.lithic.com/reference/deleteresponderendpoint) at any time. To determine whether you have an enrolled endpoint or to retrieve the URL for your responder endpoint, use the [Check the Status of a Responder Endpoint](https://docs.lithic.com/reference/getresponderendpoints).

## Tokenization Decisioning HMAC Secrets

Tokenization decisioning requests use the same HMAC functionality as Lithic's Events API for security. You'll need to sign your responses with your HMAC secret. See the [Events API's Verifying Webhooks documentation](https://docs.lithic.com/docs/events-api#verifying-webhooks) for more information.

To retrieve your secret key for tokenization decisioning, use the [Retrieve the Tokenization Decisioning HMAC Secret Key](https://docs.lithic.com/reference/gettokenizationdecisioningsecret) endpoint. To rotate or generate a new secret key, use the [Rotate the Tokenization Decisioning HMAC Secret Key](https://docs.lithic.com/reference/rotatetokenizationdecisioningsecret) endpoint. Note that the prior secret key will be deactivated after 24 hours from a successful API call.

## Tokenization Decisioning Request

Once you've set up your tokenization decisioning responder, we'll send you a decisioning request for each digital wallet tokenization very similar to the [Tokenization Approval Webhook](https://docs.lithic.com/reference/post_tokenization-approval-request). They are identical except the Tokenization Decisioning Request will not have the `customer_tokenization_decision` field; it will be populated after your endpoint responds to the request and then sent in the Tokenization Approval Webhook.

## Tokenization Decisioning Response

Your responder should be set up to respond to Lithic's Tokenization Decisioning Request with the below response. As part of decisioning, you must share users' authentication information to pass to the wallets. The wallets then display this information to end users to select how they want to authenticate (for a code to be sent to &#x6A;**\*\*\***[n@gmail.com](mailto:n@gmail.com), for example). This also ensures 2FA codes sent by Lithic are sent to the most recent email/phone number on file; Lithic deletes this user info 30 minutes after receipt.

Customers enabling their end users to authenticate via mobile app must pass the name of the mobile app that will be opened by the wallet for user authentication. Please note that **at least two methods** must be passed for your decision to be accepted if your decision is `AUTHENTICATE`.

## Response Guidelines

If we do not receive a tokenization decisioning response from you in 2.5 seconds, we will decision on the tokenization on your behalf.
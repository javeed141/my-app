# Tokenization Management

Tokenization management allows customers to manage the lifecycles of card tokenizations, including:

* Activating tokens
* Deactivating tokens
* Pausing tokens
* Unpausing tokens
* Resending activation codes
* Updating digital card art

You may also hear this called Customer Service APIs or Token Lifecycle Management APIs.

<Image align="center" className="border" border={true} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/cc115abbfa3d45ae_de268fb-Tokenization_Management.png" />

# API Endpoints

You can use the [Get Tokenization APIs](https://docs.lithic.com/reference/gettokenizations) to return a card's tokens that can then be used for the following Token Management endpoints.

Token Management endpoints, except `update_digital_card_art`, are RPC, or remote procedure call, requests. With RPC, a successful response indicates that Lithic told the network to update the token and they received our message; it does not mean the network updated the token. Clients should also subscribe to [Tokenization Events](https://docs.lithic.com/docs/types-of-events) to receive details when the request has been completed.

## Activate Tokenization

Endpoint: [/v1/tokenizations/\{tokenization\_token}/activate](https://docs.lithic.com/reference/activatetokenization)

This endpoint is used to ask the card network to activate a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network activates the tokenization, the state will be updated and an event will be created. The endpoint may only be used on digital wallet tokenizations with status `INACTIVE`, `PENDING_ACTIVATION`, or `PENDING_2FA`.\
This will put the tokenization in an `ACTIVE` state, and authorizations will be allowed.

## Pause Tokenization

Endpoint: [/v1/tokenizations/\{tokenization\_token}/pause](https://docs.lithic.com/reference/pausetokenization)

This endpoint is used to ask the card network to pause a tokenization. A paused token will prevent merchants from sending authorizations, and is a temporary status that can be changed. A successful response indicates that the request was successfully delivered to the card network. When the card network pauses the tokenization, the state will be updated and an `tokenization.updated` event will be created. The endpoint may only be used on tokenizations with status `ACTIVE`.

## Unpause Tokenization

Endpoint: [/v1/tokenizations/\{tokenization\_token}/unpause](https://docs.lithic.com/reference/unpausetokenization)

This endpoint is used to ask the card network to unpause a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network unpauses the tokenization, the state will be updated and an `tokenization.updated`event will be created. The endpoint may only be used on tokenizations with status `PAUSED`.\
This will put the tokenization in an `ACTIVE` state, and authorizations may resume.

## Deactivate Tokenization

Endpoint: [/v1/tokenizations/\{tokenization\_token}/deactivate](https://docs.lithic.com/reference/deactivatetokenization)

This endpoint is used to ask the card network to deactivate a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network deactivates the tokenization, the state will be updated and an `tokenization.updated`event will be created.

Authorizations attempted with a deactivated tokenization will be blocked and will not be forwarded to Lithic from the network. If the target is a digital wallet tokenization, it will be removed from its device.

## Resend Activation Code for Tokenization

Endpoint:[/v1/tokenizations/\{tokenization\_token}/resend\_activation\_code](https://docs.lithic.com/reference/resendactivationcodefortokenization)\
Body: `{"activation_method_type": TYPE}`\
Type values: `EMAIL_TO_CARDHOLDER_ADDRESS` or `TEXT_TO_CARDHOLDER_NUMBER`

This endpoint is used to ask the card network to send another activation code to a cardholder that has already tried tokenizing a card. A successful response indicates that the request was successfully delivered to the card network.\
The endpoint may only be used on Mastercard digital wallet tokenizations with status `INACTIVE`, `PENDING_ACTIVATION`, or `PENDING_2FA`.

Mastercard will send a new activation code to the one of the contact methods provided in the initial tokenization flow. If a user fails to enter the code correctly 3 times, the contact method will not be eligible for resending the activation code, and the cardholder must restart the provision process.

**This is not available for Visa.**

## Update Digital Card Art for Tokenization

Endpoint: [/v1/tokenizations/\{tokenization\_token}/update\_digital\_card\_art](https://docs.lithic.com/reference/updatedigitalcardartfortokenization)\
Body: `{"digital_card_art_token": UUID}`

This endpoint is used update the digital card art for a digital wallet tokenization. A successful response indicates that the card network has updated the tokenization's art, and the tokenization's digital\_cart\_art\_token field was updated.\
The endpoint may not be used on tokenizations with status `DEACTIVATED`.

Note that this updates the art for one specific tokenization, not all tokenizations for a card. New tokenizations for a card will be created with the art referenced in the card object's digital\_card\_art\_token field.
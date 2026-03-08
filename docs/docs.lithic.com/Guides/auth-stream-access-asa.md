# Auth Stream Access (ASA)

Learn about providing your own authorization rules by registering an endpoint.

<Callout icon="📘" theme="info">
  # **Check the API Specification**

  This guide focuses on ASA concepts, implementation patterns, and best practices.
  For the complete, up-to-date API schema including all fields, types, and enumeration values, see the [ASA API Reference](https://docs.lithic.com/reference/postresponderendpoints).
</Callout>

Authorization Stream Access (ASA) provides the ability to make custom transaction approval decisions through an HTTP interface to the [ISO 8583](https://www.iso.org/obp/ui/#iso:std:iso:8583:-1:ed-1:v1:en) message stream.

ASA requests are delivered as an HTTP POST during authorization. The ASA request body adheres to the Lithic transaction schema, with some additional fields added for use in decisioning. A response should be sent with HTTP response code 200 and the approval decision in the response body. This response is converted by Lithic back into ISO-8583 format and forwarded to the network.

> 🚧 Pre-ASA Request Checks
>
> For ASA-enabled users, Lithic only performs a limited set of pre-authorization checks before sending the ASA request. Specifically, [account spend velocity](https://docs.lithic.com/docs/accounts#account-schema) is not checked.
>
> Lithic will not send ASA requests to your endpoint if the message fails pre-authorization checks. For a list of all pre-authorization checks, please reference [Transaction.result](https://docs.lithic.com/docs/transactions#transactionresult).

## Set up an ASA responder in under 10 minutes!

Full details on responding to ASA requests follow, but to get you up and running quickly we've also provided sample applications for creating an auth stream access webhook with [AWS API Gateway](https://aws.amazon.com/api-gateway/) and [Lambda](https://aws.amazon.com/lambda/), managed via [AWS Serverless Application Model (SAM)](https://aws.amazon.com/serverless/sam/).

1. NodeJS example: `https://github.com/lithic-com/asa-demo-node`
2. Python example: `https://github.com/lithic-com/asa-demo-python`

## Testing

In both sandbox and production, users can self-[enroll](https://docs.lithic.com/reference/postresponderendpoints) and [disenroll](https://docs.lithic.com/reference/deleteresponderendpoint) in ASA.

## Understanding the ASA Request

The ASA request contains several key data groups that you'll use for decisioning. Each group provides specific information needed to make intelligent authorization decisions.

### Transaction Details

Core payment information including:

* **Amount fields** - The authorization amount (including fees), merchant amount in local currency, acquirer fees, and any cash back requested
* **Currency information** - Both cardholder and merchant currencies with conversion rates for international transactions
* **Risk scoring** - Network-provided risk scores on a 0-999 scale
* **Transaction type** - Whether it's a purchase, balance inquiry, credit, or financial authorization

The relationship between amounts is important: `authorization_amount` includes the base transaction plus `acquirer_fee`, while `merchant_amount` shows what the merchant receives in their local currency.

→ [View complete request schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

### Merchant Information

Identifies where the transaction is occurring:

* **Unique identifiers** - Acceptor ID and acquiring institution ID that identify specific merchant locations
* **Location details** - City, state, and country (note: Data quality varies; online merchants may send URLs or phone numbers in city field, for example)
* **MCC** - Merchant Category Code (MCC) for implementing category-based controls
* **Descriptor** - The name that appears on cardholder statements

→ [View complete request schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

### Card Data

Essential card information for authorization:

* **Identifiers** - Card token (UUID) and PAN for identification
* **Status and limits** - Current card state, spending limits, and limit duration windows
* **Card type** - Whether virtual, physical, or other card type
* **Custom fields** - Memo field for your reference

→ [View complete request schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

### Authentication Data

Security context for 3DS and tokenized transactions:

* **Liability shift** - What, if anything, caused fraud liability to move to the issuer (EG `3DS_AUTHENTICATED` or `TOKEN_AUTHENTICATED`)
* **Authentication outcome** - Result of authentication attempt
* **Decision source** - Who made the authentication decision
* **Linking token** - Token that connects the authorization to its 3DS authentication event

→ [View complete request schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

### Point of Sale Context

How and where the card was used:

* **Entry mode** - How card data was captured (EG chip, swipe, contactless)
* **Presence indicators** - Whether card and cardholder were present at transaction
* **Terminal details** - Terminal capabilities, type, and whether it's attended
* **PIN entry** - Whether the cardholder entered their PIN

→ [View complete request schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

### Fleet Information

Additional data for fleet card programs:

* **Validation data** - Driver and vehicle numbers that can be checked against your systems for identity verification, similar to a PIN
* **Program restrictions** - Static configuration for purchase types (fuel-only) or required prompts
* **Tracking identifiers** - Enable expense allocation by driver or vehicle

→ [View complete request schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

### Additional Context

Supplementary information that may be included:

* **Token details** - Wallet type for digital payments (EG Apple Pay, Google Pay, Samsung Pay)
* **Network-specific data** - Additional fields from Mastercard or Visa for advanced decisioning
* **AVS data** - Address and ZIP code when provided by merchant for verification

→ [View complete request schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

## Understanding the ASA Response

Your endpoint must return a response indicating your authorization decision:

**Required Fields:**

* `result` - Your authorization decision (see Response Result values below)

**Optional Fields:**

* `token` - Echo back the transaction token from the request
* `avs_result` - AVS validation result (see AVS Response values below)
* `balance` - Account balance information for balance inquiries

→ [View complete response schema in API Reference](https://docs.lithic.com/reference/post_asa-request#)

## Response Guidelines

### Response Time

If no response is received within 6 seconds, the transaction will be declined for the cardholder. Every party involved in the transaction processing flow takes a certain amount of time, and the merchant or the acquirer will time out at some point. We recommend responding within 3 seconds. If your ASA responder takes longer than that, you may see a higher percentage of transactions being voided shortly after you have approved them.

### AVS Matching

Address verification (AVS) checks two pieces of information, the postal code and the billing street address. Responding with AVS is optional. If AVS is present and a response is not received, Lithic will return AVS validated.

If AVS attributes aren't included in the authorization, any AVS response result will be ignored.

**AVS Response Values:**

* `MATCH` - Both address and ZIP match. Return this when both pieces of information in the request match your records.
* `MATCH_ZIP_ONLY` - ZIP matches but address doesn't. Indicates partial verification.
* `MATCH_ADDRESS_ONLY` - Address matches but ZIP doesn't. Also indicates partial verification.
* `FAIL` - Neither address nor ZIP match. Complete AVS validation failure.

**Matching Logic:**

* If both the address line and ZIP code are available in the ASA request, ASA responders should respond with `MATCH` when both match your records
* Use partial match responses to indicate which specific component matched
* Consider your risk tolerance when deciding whether to approve transactions with partial AVS matches

Lithic's default behavior for an approval when an ASA responder does not include an AVS response result is to respond to the networks based on what information is available in the authorization request. For example, if both address and zip are available, Lithic will respond to the network with `MATCH`. If only the ZIP is provided, Lithic will only indicate that there was a match on ZIP. If only an address line was provided, Lithic will only indicate that there was a match on address. On declines, Lithic will return that the AVS was not validated.

### Returned Balances

`BALANCE_INQUIRY` ASA messages require a settled and available amount to be returned.

* `amount` represents the balance held on the card.
* `available` represents the balance available for the cardholder to spend. This is calculated as the settled amount minus any pending authorizations on the card.

If no balance is returned, Lithic will return $0 to the network as a response.

## Response Guidelines

### Decline Reasons

Choose specific decline reasons to help merchants and cardholders understand the issue:

<Table>
  <thead>
    <tr>
      <th>
        **Decline reason**
      </th>

      <th>
        **Description**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `SUSPECTED_FRAUD`
      </td>

      <td>
        Transaction should be declined because it violates program fraud rules designed to stop 3rd-party fraud. This response should only be used if no other ASA response is more accurate
      </td>
    </tr>

    <tr>
      <td>
        `AVS_INVALID`
      </td>

      <td>
        Prevent acquirers from approving the transaction despite incorrect AVS. Note: AVS response is not required for this decline type.
      </td>
    </tr>

    <tr>
      <td>
        `INSUFFICIENT_FUNDS`
      </td>

      <td>
        User has insufficient funds. Acquirers may retry the transaction at a later time.
      </td>
    </tr>

    <tr>
      <td>
        `DRIVER_NUMBER_INVALID`
      </td>

      <td>
        The Driver ID given does not match the expected Driver ID for the card. Applicable only for fleet cards.
      </td>
    </tr>

    <tr>
      <td>
        `VEHICLE_NUMBER_INVALID`
      </td>

      <td>
        The Vehicle ID given does not match the expected Vehicle ID for the card. Applicable only for fleet cards.
      </td>
    </tr>

    <tr>
      <td>
        `UNAUTHORIZED_MERCHANT`
      </td>

      <td>
        Can be used for restricted MCCs, countries, or transaction types (e.g. money transfer transactions).
      </td>
    </tr>

    <tr>
      <td>
        `VELOCITY_EXCEEDED`
      </td>

      <td>
        Transaction exceeds issuer-set velocity limits. Acquirers may retry the transaction at a later date.
      </td>
    </tr>

    <tr>
      <td>
        `CARD_PAUSED`
      </td>

      <td>
        This ASA response should only be used in select cases when a card program maintains a more granular card state than what is supported via the Update Card endpoint. This does not apply to most programs. All other programs should [update the card state](https://docs.lithic.com/reference/patchcardbytoken) to address card pauses.

        If the card state is correctly set to `PAUSED` within Lithic, any incoming authorization will be automatically declined by Lithic while the card state remains paused.
      </td>
    </tr>
  </tbody>
</Table>

Any response other than `APPROVED` will decline the transaction. Choose the most specific decline reason to provide the best user experience.

## ASA Webhook Verification

Lithic enables webhook verification for ASA requests using the same methodology that is used in our Events API and webhooks. Please refer to [this page](https://docs.lithic.com/docs/events-api#verifying-webhooks) for detailed implementation steps and example code you can use.

By default, the three headers (`webhook-id`, `webhook-timestamp`, and `webhook-signature`) are not included in ASA requests. To begin receiving these headers, call the [retrieve the ASA HMAC secret key](https://docs.lithic.com/reference/getauthstreamsecret) endpoint. Secret keys are configured on a per-program basis, so if you have multiple programs, you must create a key for each program. Within minutes, the headers will begin appearing in your ASA requests. To rotate your key, call the [rotate the ASA HMAC secret key](https://docs.lithic.com/reference/rotateauthstreamsecret) endpoint. Both of these endpoints (as well as simulated ASA requests) are available in Sandbox, and we recommend testing your implementation of webhook verification in the Sandbox environment first.

You can also retrieve these keys on the [account page](https://app.lithic.com/account) of the Lithic Dashboard. Note that a Production key will only appear once your card program is configured by your Implementation Manager to have ASA enabled, and a Sandbox key will only appear once you have enrolled in Sandbox ASA via the [Enroll Responder Endpoint](https://docs.lithic.com/reference/post_responder-endpoints) endpoint.

## ASA Retry Policy

If Lithic's first attempt to send the ASA request fails due to network connectivity issues or an HTTP status code in the 5xx range, we will immediately retry sending the request. Please be aware that in rare cases, such as when a connection is interrupted while receiving a response, this means that your ASA responder may receive the same request twice. We will not retry on 4xx HTTP errors or on successful responses (2xx status code) with invalid content. Note that this retry policy is different from [Events delivery](https://docs.lithic.com/docs/events-api#retry-schedule), where Lithic does not need an immediate response.
# Transaction Object

Learn more about how the Lithic platform uses transactions to inform you about activity taking place on your cards.

A [`transaction` object](https://docs.lithic.com/reference/transaction) is created when a payment or payment-related event takes place on a card. Examples of events triggering the creation of a `transaction` object are an authorization to make a purchase at a store and a credit authorization requested by a merchant to issue a refund.

The transaction object updates whenever new events take place that modify the transaction. An example of this is when a merchant clears an outstanding purchase authorization.

Our [Transaction Flow guide](https://docs.lithic.com/docs/transaction-flow) contains detailed examples of scenarios in which a `transaction` object is created or updated.

Check out our [Simulating Transactions guide](https://docs.lithic.com/docs/simulating-transactions) to get started with simulating card transactions in our sandbox environment.

# How to View Transactions

Lithic provides the following API endpoints to view card transactions in `transaction` object form:

* [List multiple transactions](https://docs.lithic.com/reference/gettransactions)
* [Get a single transaction](https://docs.lithic.com/reference/gettransactionbytoken)

# Transaction Events

To properly interpret the `transaction` object and the underlying card activity that it represents, it is important to understand the various events that can either trigger the creation of an object or append to an existing object's `events` array to signal a new lifecycle event.

Transaction events can generally be separated along two dimensions: financial vs. non-financial messages, and requests vs. advice.

|             | Non-financial                                                                    | Financial                                                                          |
| :---------- | :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Request** | A message that requires a response but does not move money (e.g. authorization). | A message that requires a response and moves money (e.g. financial authorization). |
| **Advice**  | An informational message that does not move money (e.g. auth advice).            | An informational message that moves money (e.g. clearing).                         |

Financial messages prompt movement of funds between accounts (e.g. a clearing message that prompts a withdrawal of funds from a card program's bank account), while non-financial messages do not prompt movement of funds (e.g. an authorization request that induces a hold on funds but doesn’t trigger a payment to the merchant until the transaction settles).

On the other axis, requests are messages that require a response (i.e., approval or decline) from Lithic, while advice messages only require an acknowledgment of receipt from Lithic.

| Event Type                     | Description                                                                                                                                                                                                                                        | Financial or Non-financial | Request or Advice |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :---------------- |
| Authorization                  | A dual-message authorization request from a merchant has taken place on the card. If approved, a subsequent clearing is typically expected.                                                                                                        | Non-financial              | Request           |
| Financial Authorization        | A single-message authorization request from a merchant has taken place on the card, and no subsequent clearing is expected.                                                                                                                        | Financial                  | Request           |
| Credit Authorization           | A dual-message credit or refund authorization request from a merchant has taken place on the card. If approved, a subsequent clearing is normally expected.                                                                                        | Non-financial              | Request           |
| Financial Credit Authorization | A single-message credit or refund authorization request from a merchant has taken place on the card, and no subsequent clearing is expected.                                                                                                       | Financial                  | Request           |
| Authorization Advice           | An advice message indicating either that the authorized amount of a previous authorization has been modified or that an authorization was declined upstream on your behalf (most typically by the network).                                        | Non-financial              | Advice            |
| Credit Authorization Advice    | An advice message indicating that a credit authorization was approved upstream on your behalf (most typically by the network).                                                                                                                     | Non-financial              | Advice            |
| Authorization Reversal         | An advice message indicating that an authorization was reversed by the merchant. Typical causes of this are that an authorization approval was not received in time or the issuer sent back an Address Verification Service (AVS) mismatch result. | Non-financial              | Advice            |
| Clearing                       | An advice message indicating either that a merchant has captured the transaction and money has moved, or that a financial authorization was declined upstream on your behalf (most typically by the network).                                      | Financial                  | Advice            |
| Return                         | An advice message indicating that a refund has been processed on the transaction, and money has moved.                                                                                                                                             | Financial                  | Advice            |
| Return Reversal                | An advice message indicating that a refund has been reversed. A primary motive for this is a merchant needing to reverse an incorrectly issued refund.                                                                                             | Financial                  | Advice            |
| Balance Inquiry                | A request from a merchant for the card's balance. This is most often seen when a cardholder requests to see their balance via an ATM.                                                                                                              | Non-financial              | Request           |

# Transaction Amounts

The `transaction` object contains various amount fields indicating how much the transaction has been authorized and settled for, across any currencies involved. These can be found in the `amounts` object, which specifies the amounts, currencies, and conversion rates utilized during the transaction. All amounts include any acquirer fees and display in the smallest unit of their corresponding currencies.

The **pending amount** referred to below represents the total amount authorized that is currently pending completion by the merchant/acquirer. This may change over the course of a transaction lifecycle, depending on which events take place. Events impacting the pending amount are:

* Non-financial requests. When Lithic approves this type of request, the amount the merchant is authorized to transact on then increases in magnitude. Examples: Authorization and Credit Authorization.
* Non-financial advices. These increase or decrease the amount the merchant is authorized to transact on, without Lithic's approval. Examples: Authorization Advice and Authorization Reversal.
* Financial events settling an existing non-financial request or advice. Such events reduce the remaining amount that the merchant can transact on. Examples: Clearing (following an Authorization) and Return (following a Credit Authorization).

**How should you use the pending amount?**

Pending debit transactions and pending credit transactions differ in how Lithic treats them. The pending amount in both cases indicates the current expectation of funds settling in one direction or the other – merchant to cardholder, or vice versa. However, a pending debit transaction also results in a temporary reduction, or hold, of the cardholder's spending power by the pending amount, to ensure the cardholder does not spend beyond what is permitted. If the transaction settles, this reduction becomes permanent to a full or partial extent, depending on how much has settled; otherwise the reduction is eventually reversed. A pending credit transaction, on the other hand, *does not* increase the cardholder's spending power. This increase only occurs once the transaction settles and the expectation of funds has been realized, to prevent situations where the credit authorization gets reversed and the cardholder has overspent as a result of the anticipated funds never arriving.

Due to this difference, the pending amount of a debit transaction equates to the actual hold placed on the cardholder's spending power. This materializes as a decrease in the available balance to spend (for a debit or prepaid card program) or a decrease in the available credit (for a credit card program). The pending amount is also summed into the total spend controlled by any [spend limits](https://docs.lithic.com/docs/spend-limits). Meanwhile, the pending amount of a credit transaction has no impact, except to signal that the cardholder may receive funds from the merchant. Customers integrating Lithic with their own or a third-party ledger are strongly encouraged to treat the pending amount as described above.

The **settled amount** referred to below represents the total amount of the transaction that has settled. This may change over the course of a transaction lifecycle. Financial events impact the settled amount, while non-financial events do not.

Note, balance inquiries do not affect any amounts, because these are purely informational requests from the merchant.

A transaction may span multiple currencies during its lifecycle, by authorizing in one currency and settling in another. To capture this, Lithic displays amounts in the following types of currencies:

* The **cardholder billing currency** is the currency the card is issued in and the currency the cardholder is typically billed in.
* The **merchant currency**, also known as the transaction currency, is the currency used by the merchant/acquirer when submitting the transaction to the network.
* The **settlement currency** is the currency that settlement (actual funds movement) takes place in.

**How do the amounts in these currencies relate to each other?**

1. In each event, the merchant specifies the desired amount in its default currency; this is called the **merchant amount**, or transaction amount.
2. If the cardholder billing currency differs from the merchant currency, the card network converts the merchant amount to the cardholder billing currency to yield the **cardholder billing amount**. The network pins the exchange rate at the time of the first event in the transaction and reuses it for any subsequent events in this transaction. Applying a fixed exchange rate across all stages of the transaction provides a consistent experience to the cardholder, by ensuring that the pending amount displayed on the cardholder's account matches the final amount in the statement issued to the cardholder.
3. If the event is financial and the settlement currency differs from the merchant currency, then the card network converts the merchant amount to the settlement currency. The conversion rate used here is not pinned, meaning the network will apply the live exchange rate to any subsequent financial event in this transaction (see our guide to [Multiple Completion](https://docs.lithic.com/docs/transaction-flow#multiple-completion)). The **settlement amount** output by this conversion represents how much will actually settle between the issuer and the network for this particular event. Due to fluctuating conversion rates and network fees, this will deviate from the cardholder billing amount.

Lithic exposes all of these amounts, as well as the conversion rates used, to give customers transparency into how much their transactions are pending or settling for at each stage. Customers may use the cardholder billing amount to bill cardholders, but should keep in mind that actual funds movement occurs in the settlement amount. Lithic utilizes the settlement amount when updating balances within our ledger.

Let's look at an example illustrating the concepts above. A person with a card issued in Canada makes a 100 AUD purchase at a store in Sydney. Assume this takes place as a dual-message system transaction. The merchant sends an authorization request to the card network with a merchant amount of 100 AUD, and the network pins and uses the current conversion rate of 1 AUD to 0.9159 CAD to calculate a cardholder billing amount of 91.59 CAD. Lithic receives and approves this authorization request. The next day, the merchant submits a clearing of 100 AUD to settle the transaction. The network uses the pinned rate to calculate a cardholder billing amount of 91.59 CAD. Suppose settlement takes place in CAD; then the network uses the live conversion rate of 1 AUD to 0.9160 CAD to calculate a settlement amount of 91.60 CAD. The settlement amount differs from the cardholder billing amount by 0.01 CAD.

Below describes the amount fields in the `transaction` object, along with the events that can affect them. These are negative for a debit transaction and positive for a credit transaction. A full outline of the `amounts` object can be found [here](https://docs.lithic.com/reference/gettransactionbytoken).

| Field                       | Description                                                                         | Impacting Events                                                                                                                 |
| :-------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `amounts.cardholder.amount` | The estimated settled amount of the transaction in the cardholder billing currency. | Financial Authorization, Financial Credit Authorization, Clearing, Return, Return Reversal                                       |
| `amounts.hold.amount`       | The pending amount of the transaction in the anticipated settlement currency.       | Authorization, Credit Authorization, Authorization Advice, Credit Authorization Advice, Authorization Reversal, Clearing, Return |
| `amounts.merchant.amount`   | The settled amount of the transaction in the merchant currency.                     | Financial Authorization, Financial Credit Authorization, Clearing, Return, Return Reversal                                       |
| `amounts.settlement.amount` | The settled amount of the transaction in the settlement currency.                   | Financial Authorization, Financial Credit Authorization, Clearing, Return, Return Reversal                                       |

### Deprecated Transaction Amount Fields

The `transaction` object also contains the following fields that are deprecated and will be removed in the future. Lithic will provide advance notice to customers at such time that this occurs.

The **authorization amount** referred to below represents the total amount requested by the merchant. This may change over the course of a transaction lifecycle, depending on which events take place. Events impacting the authorization amount are:

* Requests, both financial and non-financial, as they signal the merchant's intent to transact for a given amount. Examples: Authorization and Financial Credit Authorization.
* Non-financial advices. These events modify the requested transaction amount. Examples: Authorization Advice and Authorization Reversal.
* Financial advices reversing an existing financial request or advice. Such events unwind, either partially or entirely, the prior funds movement *as well as* the merchant's intent to trigger this movement. The latter is done to signal that the merchant should reauthorize for the desired amount if it wants to reattempt the funds movement. Examples: Return (following a Clearing) and Return Reversal (following a Return).

All amounts include any acquirer fees and display in the smallest unit of their corresponding currencies.

| Field                           | Description                                                                                                                                                                                                                                | Impacting Events                                                                                                                                                                                 |
| :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`                        | When the transaction is pending, this represents the authorization amount of the transaction in the anticipated settlement currency. This field represents the settled amount in the settlement currency once the transaction has settled. | All events, except for Balance Inquiry                                                                                                                                                           |
| `authorization_amount`          | The authorization amount of the transaction in the anticipated settlement currency.                                                                                                                                                        | Authorization, Financial Authorization, Credit Authorization, Financial Credit Authorization, Authorization Advice, Credit Authorization Advice, Authorization Reversal, Return, Return Reversal |
| `merchant_amount`               | Analogous to the `amount`, but in the merchant currency.                                                                                                                                                                                   | All events, except for Balance Inquiry                                                                                                                                                           |
| `merchant_authorization_amount` | Analogous to the `authorization_amount`, but in the merchant currency.                                                                                                                                                                     | Authorization, Financial Authorization, Credit Authorization, Financial Credit Authorization, Authorization Advice, Credit Authorization Advice, Authorization Reversal, Return, Return Reversal |
| `settled_amount`                | The settled amount of the transaction in the settlement currency.                                                                                                                                                                          | Financial Authorization, Financial Credit Authorization, Clearing, Return, Return Reversal                                                                                                       |

## Transaction Event Amounts

Each event in the `transaction` object's `events` array also contains fields detailing, in multiple currency types, the amount requested by the merchant/acquirer, independent of whether the event is approved or declined. These can be found in the event's `amounts` object, which lists the amounts, currencies, and conversion rates involved. A full outline of the `amounts` object can be found [here](https://docs.lithic.com/reference/gettransactionbytoken).

| Field                       | Description                                                                                                                                          |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amounts.cardholder.amount` | Amount of the event in the cardholder billing currency.                                                                                              |
| `amounts.merchant.amount`   | Amount of the event in the merchant currency.                                                                                                        |
| `amounts.settlement.amount` | Amount of the event, if it is financial, in the settlement currency. Non-financial events do not contain this amount because they do not move funds. |

### Deprecated Transaction Event Amount Fields

The `transaction` event also contains the following fields that are deprecated and will be removed in the future. Lithic will provide advance notice to customers at such time that this occurs.

| Field    | Description                                     |
| :------- | :---------------------------------------------- |
| `amount` | Amount of the event in the settlement currency. |

# Enumerations

## Transaction Status

> 📘
>
> For the most accurate and up-to-date values, refer to the [API reference](https://docs.lithic.com/reference/gettransactionbytoken).

The following outlines the possible values for the `status` within the `transaction` object.

| Value    | Description                                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| DECLINED | The transaction was declined                                                                                                                                                   |
| EXPIRED  | The authorization validity window (which dictates how long the merchant has to clear or settle the transaction) has passed. Lithic has automatically expired the authorization |
| PENDING  | Authorization is pending completion from the merchant                                                                                                                          |
| SETTLED  | The transaction is complete                                                                                                                                                    |
| VOIDED   | The merchant has voided the previously pending authorization                                                                                                                   |

## Transaction Result and Transaction Event Result

> 📘
>
> For the most accurate and up-to-date values, refer to the [API reference](https://docs.lithic.com/reference/gettransactionbytoken).

The following outlines the possible values for the transaction-level `result`and event-level `result`.

|                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ACCOUNT\_PAUSED                   | Transaction was declined because the account's state was `PAUSED` at the time of authorization                                                                                                                                                                                                                                                                                                                                                       |
| ACCOUNT\_STATE\_TRANSACTION\_FAIL | Contact [support@lithic.com](mailto:support@lithic.com)                                                                                                                                                                                                                                                                                                                                                                                              |
| APPROVED                          | Successful transaction                                                                                                                                                                                                                                                                                                                                                                                                                               |
| BANK\_CONNECTION\_ERROR           | Please reconnect a funding source                                                                                                                                                                                                                                                                                                                                                                                                                    |
| BANK\_NOT\_VERIFIED               | Please confirm the funding source                                                                                                                                                                                                                                                                                                                                                                                                                    |
| CARD\_PAUSED                      | Transaction was declined because either the card program responded to ASA request with a response of `CARD_PAUSED` or the card’s state was `PAUSED` at the time of authorization                                                                                                                                                                                                                                                                     |
| CARD\_CLOSED                      | Transaction was declined because either the card program responded to ASA request with a response of `CARD_CLOSED` or the card’s state was `CLOSED` at the time of authorization                                                                                                                                                                                                                                                                     |
| DECLINED                          | Transaction was declined for a reason not captured by the other listed reasons                                                                                                                                                                                                                                                                                                                                                                       |
| DO\_NOT\_HONOR\_ADVICE            | Transaction was declined due to a decision made by the acquirer or the card network. This primarily occurs when transaction processing takes a long time on the Lithic side, due to either the customer's ASA responder or the Lithic platform taking too long to respond. An advice with this result typically follows a declined authorization or an approved and voided authorization. On occasion, it may also follow a financial authorization. |
| FRAUD\_ADVICE                     | Transaction declined due to risk-related reasons                                                                                                                                                                                                                                                                                                                                                                                                     |
| IGNORED\_TTL\_EXPIRY              | Authorization could not be processed by the Lithic platform in time                                                                                                                                                                                                                                                                                                                                                                                  |
| INACTIVE\_ACCOUNT                 | Contact [support@lithic.com](mailto:support@lithic.com)                                                                                                                                                                                                                                                                                                                                                                                              |
| INCORRECT\_PIN                    | PIN verification failed. This may occur for several reasons, including a PIN entered incorrectly by the cardholder or a PIN transaction attempted while the PIN is blocked due to consecutive incorrect attempts. In rare cases, this result can be triggered if the merchant sends through bad PIN data, even if the cardholder was not prompted to enter a PIN during the transaction.                                                             |
| INSUFFICIENT\_FUNDS               | Transaction was declined because the card's [available balance](https://docs.lithic.com/docs/balances) was insufficient to cover the authorization amount.                                                                                                                                                                                                                                                                                           |
| INSUFFICIENT\_FUNDS\_PRELOAD      | Result given when client responds to ASA request with `INSUFFICIENT_FUNDS`. See [ASA Response Result](https://docs.lithic.com/docs/auth-stream-access-asa#asa-response-result)                                                                                                                                                                                                                                                                                                |
| INVALID\_CARD\_DETAILS            | Incorrect CVV or expiry date                                                                                                                                                                                                                                                                                                                                                                                                                         |
| INVALID\_TRANSACTION              | Transaction type (for example, inter-account transfer) cannot be processed                                                                                                                                                                                                                                                                                                                                                                           |
| MERCHANT\_BLACKLIST               | This merchant is disallowed on the platform                                                                                                                                                                                                                                                                                                                                                                                                          |
| ORIGINAL\_NOT\_FOUND              | Merchant submitted a reversal without a corresponding original                                                                                                                                                                                                                                                                                                                                                                                       |
| PREVIOUSLY\_COMPLETED             | A duplicate message from the network was received on a transaction that has already been completed or cleared                                                                                                                                                                                                                                                                                                                                        |
| SINGLE\_USE\_RECHARGED            | Single-use card attempted multiple times                                                                                                                                                                                                                                                                                                                                                                                                             |
| SUSPECTED\_FRAUD                  | Transaction declined due to suspected fraud                                                                                                                                                                                                                                                                                                                                                                                                          |
| SWITCH\_INOPERATIVE\_ADVICE       | Network error, re-attempt the transaction                                                                                                                                                                                                                                                                                                                                                                                                            |
| UNAUTHORIZED\_MERCHANT            | Merchant locked card attempted at different merchant.                                                                                                                                                                                                                                                                                                                                                                                                |
| UNKNOWN                           | Transaction was declined for an unspecified reason                                                                                                                                                                                                                                                                                                                                                                                                   |
| UNKNOWN\_HOST\_TIMEOUT            | Network error, re-attempt the transaction                                                                                                                                                                                                                                                                                                                                                                                                            |
| USER\_TRANSACTION\_LIMIT          | User-set spend limit exceeded                                                                                                                                                                                                                                                                                                                                                                                                                        |

## Transaction Event Detailed Results

> 📘
>
> For the most accurate and up-to-date values, refer to the [API reference](https://docs.lithic.com/reference/gettransactionbytoken).

The following outlines the possible values composing the transaction *event-level* `detailed_results` array.

Enum values only relevant for authorization-based events (i.e., may appear associated with event types `AUTHORIZATION`, `FINANCIAL_AUTHORIZATION`, `CREDIT_AUTHORIZATION`, `FINANCIAL_CREDIT_AUTHORIZATION`, `BALANCE_INQUIRY`):

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th />

      <th />
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        ACCOUNT\_DAILY\_SPEND\_LIMIT\_EXCEEDED
      </td>

      <td>
        Authorization was declined because authorization amount exceeds the account’s available daily spend limit
      </td>
    </tr>

    <tr>
      <td>
        ACCOUNT\_DELINQUENT
      </td>

      <td>
        Authorization was declined because the account is in delinquency
      </td>
    </tr>

    <tr>
      <td>
        ACCOUNT\_INACTIVE
      </td>

      <td>
        Authorization was declined because the account object is not in a transactable state (e.g., `PAUSED` or `CLOSED`)
      </td>
    </tr>

    <tr>
      <td>
        ACCOUNT\_LIFETIME\_SPEND\_LIMIT\_EXCEEDED
      </td>

      <td>
        Authorization was declined because authorization amount exceeds the account’s available lifetime spend limit
      </td>
    </tr>

    <tr>
      <td>
        ACCOUNT\_MONTHLY\_SPEND\_LIMIT\_EXCEEDED
      </td>

      <td>
        Authorization was declined because authorization amount exceeds the account’s available monthly spend limit
      </td>
    </tr>

    <tr>
      <td>
        ACCOUNT\_PAUSED
      </td>

      <td>
        Authorization was declined because the account’s state was `PAUSED` at the time of authorization
      </td>
    </tr>

    <tr>
      <td>
        ACCOUNT\_UNDER\_REVIEW
      </td>

      <td>
        Authorization was declined because the account is under review
      </td>
    </tr>

    <tr>
      <td>
        ADDRESS\_INCORRECT
      </td>

      <td>
        Authorization was declined because card program responded to ASA request with a response of `AVS_INVALID`
      </td>
    </tr>

    <tr>
      <td>
        AUTH\_RULE
      </td>

      <td>
        Authorization was declined due to an Auth Rule
      </td>
    </tr>

    <tr>
      <td>
        CARD\_CLOSED
      </td>

      <td>
        Authorization was declined because the card’s state was `CLOSED` at the time of authorization
      </td>
    </tr>

    <tr>
      <td>
        CARD\_EXPIRY\_DATE\_INCORRECT
      </td>

      <td>
        Authorization was declined because the expiry date provided was incorrect
      </td>
    </tr>

    <tr>
      <td>
        CARD\_NOT\_ACTIVATED
      </td>

      <td>
        Authorization was declined because card is in a `PENDING_FULFILLMENT` or a `PENDING_ACTIVATION` state.
      </td>
    </tr>

    <tr>
      <td>
        CARD\_PAUSED
      </td>

      <td>
        Authorization was declined because either the card program responded to ASA request with response of `CARD_PAUSED` or the card’s state was `PAUSED` at the time of authorization
      </td>
    </tr>

    <tr>
      <td>
        CARD\_PIN\_INCORRECT
      </td>

      <td>
        Authorization was declined because the provided PIN was incorrect
      </td>
    </tr>

    <tr>
      <td>
        CARD\_SECURITY\_CODE\_INCORRECT
      </td>

      <td>
        Authorization was declined because the provided security code was incorrect. Excessive occurrences of incorrect security codes on the same card may be an indicator of cardholder confusion or fraud.
      </td>
    </tr>

    <tr>
      <td>
        CARD\_SPEND\_LIMIT\_EXCEEDED
      </td>

      <td>
        Authorization was declined because either the authorization amount exceeds the card’s available spend limit or the card program responded to ASA request with response of `VELOCITY_EXCEEDED`
      </td>
    </tr>

    <tr>
      <td>
        CARDHOLDER\_CHALLENGED
      </td>

      <td>
        A 3DS cardholder challenge was initiated
      </td>
    </tr>

    <tr>
      <td>
        CARDHOLDER\_CHALLENGE\_FAILED
      </td>

      <td>
        Authorization was declined because the 3DS cardholder challenge failed
      </td>
    </tr>

    <tr>
      <td>
        CUSTOM\_ASA\_RESULT
      </td>

      <td>
        Authorization was declined because the card program responded to ASA request with a decline reason not contained in the [predefined set](https://docs.lithic.com/docs/auth-stream-access-asa#asa-response-result)
      </td>
    </tr>

    <tr>
      <td>
        CUSTOMER\_ASA\_TIMEOUT
      </td>

      <td>
        Authorization was declined because the card program’s ASA responder timed out and did not provide an approve or decline reason within the allotted time
      </td>
    </tr>

    <tr>
      <td>
        DRIVER\_NUMBER\_INVALID
      </td>

      <td>
        Authorization was declined because transaction had an invalid driver number
      </td>
    </tr>

    <tr>
      <td>
        VEHICLE\_NUMBER\_INVALID
      </td>

      <td>
        Authorization was declined because transaction had an invalid vehicle number
      </td>
    </tr>

    <tr>
      <td>
        INSUFFICIENT\_FUNDING\_SOURCE\_BALANCE
      </td>

      <td>
        Authorization was declined because the associated funding source had insufficient balance
      </td>
    </tr>

    <tr>
      <td>
        LITHIC\_SYSTEM\_ERROR
      </td>

      <td>
        Authorization was declined because of a Lithic system error, and transaction should be re-attempted
      </td>
    </tr>

    <tr>
      <td>
        LITHIC\_SYSTEM\_RATE\_LIMIT
      </td>

      <td>
        Authorization was declined because of a rate limit applied by the Lithic system (most typically when a surge in authorization volume takes place)
      </td>
    </tr>

    <tr>
      <td>
        MALFORMED\_ASA\_RESPONSE
      </td>

      <td>
        Authorization was declined because the card program’s response to the ASA request did not conform to the [specified response structure](https://docs.lithic.com/docs/auth-stream-access-asa#user-response)
      </td>
    </tr>

    <tr>
      <td>
        MERCHANT\_LOCKED*CARD*
        ATTEMPTED\_ELSEWHERE
      </td>

      <td>
        Authorization was declined because the merchant-locked card was attempted at a different merchant than the one it is locked to
      </td>
    </tr>

    <tr>
      <td>
        MERCHANT\_NOT\_PERMITTED
      </td>

      <td>
        Authorization was declined because transactions with the merchant are not permitted on the Lithic platform
      </td>
    </tr>

    <tr>
      <td>
        PIN\_BLOCKED
      </td>

      <td>
        Authorization was declined because the card's `PIN_STATUS` is currently `BLOCKED` due to excessive consecutive incorrect PIN attempts. To unblock a card's PIN, see the Managing Cards guide [here](https://docs.lithic.com/docs/managing-cards#unblock-card-pin).
      </td>
    </tr>

    <tr>
      <td>
        PROGRAM\_CARD\_SPEND\_LIMIT\_EXCEEDED
      </td>

      <td>
        Authorization was declined because the authorization amount exceeds the card’s permitted spend amount (as determined at the program-level)
      </td>
    </tr>

    <tr>
      <td>
        PROGRAM\_SUSPENDED
      </td>

      <td>
        Authorization was declined because the program is suspended
      </td>
    </tr>

    <tr>
      <td>
        PROGRAM\_USAGE\_RESTRICTION
      </td>

      <td>
        Authorization was declined because the transaction violates the program’s terms of use (e.g., transacting at prohibited MCCs)
      </td>
    </tr>

    <tr>
      <td>
        SINGLE\_USE\_CARD\_REATTEMPTED
      </td>

      <td>
        Authorization was declined because the card used is a single use card that has already been used
      </td>
    </tr>

    <tr>
      <td>
        SUSPECTED\_FRAUD
      </td>

      <td>
        Authorization was declined due to suspected fraud
      </td>
    </tr>

    <tr>
      <td>
        UNAUTHORIZED\_MERCHANT
      </td>

      <td>
        Authorization was declined because the card program responded to ASA request with response of `UNAUTHORIZED_MERCHANT`
      </td>
    </tr>
  </tbody>
</Table>

Enum values only relevant for advices (i.e., may appear associated with event types `AUTHORIZATION_ADVICE`, `CREDIT_AUTHORIZATION_ADVICE`, `AUTHORIZATION_REVERSAL`, `AUTHORIZATION_EXPIRY`, `CLEARING`, `RETURN`, `RETURN_REVERSAL`):

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th />

      <th />
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CARD\_RESTRICTED
      </td>

      <td>
        Network declined the authorization and populated the advice message with a response code indicating “restricted card”
      </td>
    </tr>

    <tr>
      <td>
        CONTACT\_CARD\_ISSUER
      </td>

      <td>
        Network declined the authorization and populated the advice message with a response code indicating “contact card issuer”
      </td>
    </tr>

    <tr>
      <td>
        DO\_NOT\_HONOR
      </td>

      <td>
        Network declined the authorization and populated the advice message with a response code indicating “do not honor”
      </td>
    </tr>

    <tr>
      <td>
        FORMAT\_ERROR
      </td>

      <td>
        Network declined the authorization and populated the advice message with a response code indicating “format error”. This indicates that the acquirer’s message had a format error, causing an on-behalf decline and subsequent advice message.
      </td>
    </tr>

    <tr>
      <td>
        MERCHANT\_INVALID
      </td>

      <td>
        Network declined the authorization and populated the advice message with a response code indicating “invalid merchant”
      </td>
    </tr>

    <tr>
      <td>
        OVER\_REVERSAL\_ATTEMPTED
      </td>

      <td>
        The merchant attempted to reverse the authorized amount, but the reversal would have caused the transaction amount to go negative
      </td>
    </tr>

    <tr>
      <td>
        REVERSAL\_UNMATCHED
      </td>

      <td>
        The merchant attempted to reverse a prior authorization or settlement, but the original event was not found and therefore the reversal is not matched
      </td>
    </tr>

    <tr>
      <td>
        TRANSACTION\_NOT*PERMITTED*
        TO\_ACQUIRER\_OR\_TERMINAL
      </td>

      <td>
        Network declined the authorization and populated the advice message with a response code indicating “transaction not permitted to acquirer/terminal”
      </td>
    </tr>

    <tr>
      <td>
        TRANSACTION\_NOT*PERMITTED*
        TO\_ISSUER\_OR\_CARDHOLDER
      </td>

      <td>
        Network declined the authorization and populated the advice message with a response code indicating “transaction not permitted to issuer/cardholder”
      </td>
    </tr>

    <tr>
      <td>
        TRANSACTION\_PREVIOUSLY\_COMPLETED
      </td>

      <td>
        The merchant attempted to reverse a prior authorization, but the authorization was already successfully cleared or reversed, and this reversal is considered a duplicate
      </td>
    </tr>
  </tbody>
</Table>

Enum values only relevant for both authorization-based events and advices:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th />

      <th />
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        APPROVED
      </td>

      <td>
        Either the authorization was approved or the network populated the advice message with a response code indicating "success".
      </td>
    </tr>

    <tr>
      <td>
        CARD*CRYPTOGRAM*
        VALIDATION\_FAILURE
      </td>

      <td>
        Either Lithic declined the authorization because the card’s cryptogram could not be validated, or the network declined the authorization and populated the advice message with a response code indicating “cryptographic failure”
      </td>
    </tr>

    <tr>
      <td>
        CARD\_EXPIRED
      </td>

      <td>
        Either Lithic declined the authorization because the card has an expiry date that has passed, or the network declined the authorization and populated the advice message with a response code indicating “expired card”
      </td>
    </tr>

    <tr>
      <td>
        CARD\_INVALID
      </td>

      <td>
        Either Lithic declined the authorization because the card details entered are not recognized (e.g., card was just created and has not yet been propagated across Lithic’s system to support an authorization) or the network declined the authorization and populated the advice message with a response code indicating “invalid card number”
      </td>
    </tr>

    <tr>
      <td>
        DECLINED
      </td>

      <td>
        Either Lithic declined the authorization for a reason not captured elsewhere in the set of enums, or the network declined the authorization and populated the advice message with a response code not captured elsewhere in the set of enums
      </td>
    </tr>

    <tr>
      <td>
        INSUFFICIENT\_FUNDS
      </td>

      <td>
        Either Lithic declined the authorization because the associated financial account had an [insufficient available balance](https://docs.lithic.com/docs/balances) to cover the authorization amount, the card program responded to ASA request with a response of `INSUFFICIENT_FUNDS`, or the network declined the authorization and populated the advice message with a response code indicating “insufficient funds/over credit limit)
      </td>
    </tr>

    <tr>
      <td>
        SECURITY\_VIOLATION
      </td>

      <td>
        Either Lithic declined the authorization because a security violation occurred (e.g., required card security details were not provided) or the network declined the authorization and populated the advice message with a response code indicating “security violation”
      </td>
    </tr>

    <tr>
      <td>
        TRANSACTION\_INVALID
      </td>

      <td>
        Either Lithic declined the authorization because the attempted transaction type is not supported, or the network declined the authorization and populated the advice message with a response code indicating “invalid transaction”
      </td>
    </tr>
  </tbody>
</Table>
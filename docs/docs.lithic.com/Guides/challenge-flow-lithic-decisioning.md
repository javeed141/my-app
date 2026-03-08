# Lithic Orchestration - 3DS Challenges

Learn about how you can expand your 3DS authentication flow to include challenges orchestrated by Lithic.

## Overview

Lithic Orchestration for 3DS challenges enables challenge flows where Lithic manages the entire challenge delivery and verification process on your organization's behalf. When a transaction requires additional cardholder verification, Lithic automatically sends a one-time passcode (OTP) via SMS to the cardholder's registered phone number and handles the verification through the challenge user interface.

This orchestration model simplifies challenge implementation by eliminating the need for your organization to build and maintain challenge delivery infrastructure. Lithic handles SMS delivery, OTP generation, verification logic, and response processing.

## How It Works

When a cardholder is challenged as part of a 3DS authentication, this is the user journey that they will experience:

1. **Transaction Attempt**: The cardholder initiates an online (eCommerce) transaction at the merchant's checkout.
2. **Challenge Decision**: The authentication is evaluated and a decision is made to challenge the transaction (by either Lithic's model or your organization's decisioning logic, depending on your configuration).
3. **Challenge Initiation**: Instead of an immediate approve/decline, the transaction is paused and a secure Challenge UI is displayed to the cardholder in the checkout flow.
4. **OTP Delivery**: Lithic sends a one-time, 6-digit passcode to the cardholder's phone number on file. This code is unique to the transaction and expires after a short time (configurable, usually 10 minutes).
5. **Cardholder Verification**:
   * **Successful Verification**: If the correct OTP is entered, authentication is approved, and the transaction can proceed.
   * **Incorrect/No Response**: If the OTP is incorrect or not entered before expiration, authentication is declined, preventing a liability shift on potentially fraudulent activity.
6. **Transaction Completion**: Upon successful verification, the cardholder is informed that the transaction can continue. The merchant will unpause the flow and complete the existing checkout, and the legitimate transaction is captured without excessive friction.

Note: In most cases, a merchant will choose to forgo an authorization attempt after a failed authentication. In some cases however, a merchant may choose to proceed with the authorization, even after a failed authentication. In these cases, the authorization is NOT granted a liability shift and you (the issuer) retain the chargeback rights to the transaction. You can still choose to decline these authorizations via ASA, as discussed in the [Data Visibility](https://docs.lithic.com/docs/challenge-flow-lithic-decisioning#data-visibility) section.

## Implementation Requirements

### Accurate Cardholder Contact Information

Maintaining valid and up-to-date phone numbers is essential, as OTPs are delivered via SMS. Before enabling Challenge Flow, we recommend:

1. Auditing your records to ensure phone numbers are current and correctly updated for Lithic account holders
2. Using Lithic's [update account holder](https://docs.lithic.com/reference/patchaccountholder) endpoint to keep contact details current on an ongoing basis
3. Implementing processes to regularly verify and update cardholder contact information

Accurate cardholder contact information is absolutely essential for challenges to deliver expected outcomes.

### User Interface and SMS Customization

Card programs have control in defining the templates for SMS copy and the Challenge UI that are shown to the cardholder during checkout to ensure the user experience matches card program's brand identity:

1. **Challenge UI**: There is a moderate degree of customizability regarding the copy, information, and style of the Challenge UI that you may configure. Display your brand's logo, colors, and text that matches your brand's voice, while adhering to the information architecture proscribed by the 3DS standard.

   <Image alt="This is an example of a 3DS Challenge UI that could be shown to a cardholder." align="center" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/33382f175da60613_4a4fcaba006f40ef14bc0b49721a62638597d09e8236e37074ed4f18aaf7a89c-CleanShot_2025-04-25_at_16.18.452x.png">
     This is an example of a 3DS Challenge UI that could be shown to a cardholder.
   </Image>

2. **SMS Template**: The message copy delivered to cardholders is fully customizable by you, however the copy must fit within the single SMS character limit of 160 characters. Here is an example of a message you may configure:
   > "\[Brand] Your verification code is xxxxxx. Do not share it with anyone! We will never call to ask for it. If you didn’t request it, freeze your card immediately."

## Implementation Process

1. **Decisioning Model**: Ensure your program has a decisioning model configured (either Lithic Decisioning or Customer Decisioning). The decisioning model determines who decides when to challenge; Lithic Orchestration handles the challenge delivery regardless of which model you choose.
2. **Templates Setup**: Work with Lithic to customize the SMS message template and challenge UI according to your brand guidelines.
3. **Testing**: Before full deployment, run test transactions to verify the challenge flow functions correctly.
4. **Event Subscription**: Subscribe to 3DS authentication events via the Events API to receive real-time notifications when challenges are issued and completed.

## Data Visibility

As with all Lithic 3DS products, the full set of rich 3DS authentication data is available to you via webhooks. This data can be particularly useful to use during the authorization flow in the event that a merchant proceeds with authorization, despite a failed 3DS authentication.

Transactions where the purchaser was presented a challenge flow, but failed to authenticate themselves as the true cardholder, may pose a larger risk of fraudulent activity than other similar transactions. You can identify these transactions by referring to the `cardholder_authentication` object in the [ASA request](https://docs.lithic.com/reference/post_asa-request). Such transactions will have an `authentication_method` value of `CHALLENGE` and an `authentication_result` value of `DECLINE`.

While nothing can be done to *prevent* merchants from attempting an authorization after a failed authentication, Lithic 3DS gives the visibility to decline these transactions at your discretion when they do occur.

Additionally, merchants can send `DATA_SHARE_ONLY` authentications, providing 3DS authentication data without requesting a liability shift, purely to inform the issuer's authorization decision. Taking this data into consideration within the authorization path can lead to superior fraud outcomes.

## Getting Started

To enable Challenge Flows for 3DS Lithic Decisioning, contact your Implementation Manager (for implementing programs) or your Customer Success Manager (for live programs). They will guide you through the setup process and ensure your card program is properly configured.
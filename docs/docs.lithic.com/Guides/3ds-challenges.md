# 3DS Challenge Flows

Configure challenge flow orchestration to verify cardholder identity for high-risk transactions.

3DS challenge flows provide an additional authentication layer for transactions that fall within an elevated risk threshold but remain potentially legitimate. Rather than automatically declining these authentications, challenge flows prompt the cardholder to complete identity verification through a secondary channel before proceeding with the authentication decision.

## Challenge Flow Mechanics

When a transaction is identified for challenge during 3DS authentication, the standard approve/decline decision process is extended to include a verification step. The cardholder receives a prompt to complete identity verification, typically through channels such as a one-time passcode (OTP) delivered via SMS, a link via email, or a push notification sent to a mobile device. Successful completion of the challenge results in authentication approval, while failure or abandonment of the challenge results in decline.

Challenge flows enable organizations to approve legitimate transactions that would otherwise be declined due to risk signals, while maintaining fraud protection through cardholder verification.

## Orchestration Models

When implementing challenge flows into your program's 3DS authentication process, an important factor to decide is: *who is responsible for contacting the cardholder to deliver the challenge*. The entity that delivers the challenge is known as the Challenge Orchestrator. Programs can choose to delegate this responsibility to Lithic (Lithic Orchestration), or to handle this responsibility themselves (Customer Orchestration).

### Lithic Orchestration

Lithic manages the complete challenge delivery and verification process. When a challenge is initiated, Lithic generates and delivers a one-time passcode via SMS to the cardholder's registered phone number, presents a challenge interface during checkout for the cardholder to enter the passcode, and processes the cardholder's entry. Your organization's only responsibility is to maintain current phone number records for all cardholders in the Lithic system.

### Customer Orchestration

Your organization maintains complete authority over challenge delivery and verification processes. Upon challenge initiation, Lithic provides the transaction and authentication context, but your organization is responsible for contacting the cardholder through your selected method, collecting the cardholder response, and communicating the result back to Lithic within the specified timeframe. Customer Orchestration provides additional flexibility regarding challenge delivery methods, enabling contact through push notifications, email, in-app biometric verification, or other preferred channels. This flexibility comes at the cost of building and maintaining additional customer-owned infrastructure.

## Orchestration Comparison

| Aspect                      | Lithic Orchestration        | Customer Orchestration                          |
| --------------------------- | --------------------------- | ----------------------------------------------- |
| Challenge Delivery          | Lithic SMS                  | Customer-managed delivery                       |
| Verification Methods        | SMS OTP only                | SMS, push notifications, in-app biometric, etc. |
| Infrastructure Requirements | Phone number maintenance    | Complete challenge delivery infrastructure      |
| Customization               | SMS template and UI styling | Complete control over experience                |
| Implementation Complexity   | Low                         | High                                            |

## Network Compliance Requirements

Card networks monitor challenge flow abandonment rates and may assess penalties for excessive abandonment. Mastercard requires challenge completion rates of at least 90% under their Data Integrity Monitoring Program (Edit 8). Challenge abandonment occurs when cardholders fail to complete the verification process within the allotted timeframe, typically 10 minutes.

Any penalties associated with failure to meet challenge completion requirements will be passed through from Lithic to your organization.

## Implementation Prerequisites

Challenge flows are an extension of basic 3DS decisioning. Organizations must first configure their [base decisioning model](https://docs.lithic.com/docs/3ds-decisioning-models) before enabling challenge orchestration.

Contact your Implementation Manager or Customer Success Manager to configure challenge flow orchestration for your card program.
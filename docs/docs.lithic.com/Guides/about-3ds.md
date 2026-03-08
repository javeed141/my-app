# About 3DS

Learn about how 3DS works and how it is relevant to your card program.

# What is 3DS and Why It Matters for Your Program

3D Secure (3DS) is an authentication protocol that verifies cardholder identity during online transactions. When merchants initiate 3DS, they collect extensive data about the cardholder's environment (150+ data points) and send it through the card network to the issuer for risk evaluation. Based on this assessment, issuers can require additional authentication steps like one-time passwords or transaction confirmation through banking applications.

**The critical impact for your program**: successful 3DS authentication transfers fraud liability from the merchant to your program. Once a transaction is authenticated, you cannot dispute it for fraud. This liability shift makes every authentication decision crucial for managing your program's risk exposure.

When a merchant requests 3DS authentication, *you cannot opt out*. Without a 3DS solution in place, the card network will approve authentications on your behalf, shifting liability to your program for transactions without your input or risk assessment. You also lose access to the comprehensive transaction data that could inform your later authorization decision.

Beyond individual transaction decisions, 3DS provides valuable intelligence for your broader fraud prevention strategy. The rich data from each authentication attempt, whether approved or declined, helps you identify patterns, refine risk models, and make better-informed decisions on subsequent authorizations.

This guide describes how Lithic's 3DS implementation gives you control over authentication decisions, provides access to complete transaction data, and integrates with your authorization logic to strengthen fraud management across your card program.

## Key Considerations for 3DS

* 3DS authentication shifts liability for fraud to the issuer. 3DS-authenticated transactions carry a disproportionate amount of risk due to this liability shift.
* Issuers cannot opt out of 3DS. If an issuer has no 3DS solution in place, the card network approves all authentications on their behalf.
* You can use the 3DS outcome and data elements to improve your authorization decisioning.
* 3DS is initiated by merchant. In the US, merchant adoption is optional. In the EU, 3DS authentication occurs on nearly all online transactions due to [SCA requirements](https://en.wikipedia.org/wiki/Strong_customer_authentication). The authentication process cannot be triggered by the issuer.

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/bf8bd22fd63ffb0b_aa5b6e3f9db11c0a9112e178ddc5f1bedc925ed21dd95198a18d40e67209f1fd-image.png" />

<br />

# 3DS Implementation Options with Lithic

Lithic provides flexible 3DS implementation options to meet the operational and technical needs of your card program. You have two primary decisions to make: selecting your **Decisioning Model** and choosing your **Challenge Orchestration Model**.

## Choosing Your Decisioning Model

Lithic supports two distinct decisioning models to accommodate your organization's technical infrastructure, operational goals, and preferred level of involvement in the authentication process.

### Lithic Decisioning

Lithic's fraud engine automatically handles all 3DS authentication decisions on your behalf. This requires no integration work and provides immediate access to rich authentication data through webhooks. Choose this model for minimal operational overhead and proven fraud detection without building infrastructure.

### Customer Decisioning

Your organization maintains complete control over 3DS authentication decisions through a real-time decisioning endpoint. Lithic forwards authentication data to your system, which must respond within one second with approve, decline, or challenge decisions. Choose this model when you need to integrate proprietary risk rules or internal data sources into authentication decisions.

## Choosing Your Challenge Orchestration Model

After selecting your decisioning model, you must choose your preferred approach to managing and delivering authentication challenges. Lithic offers three distinct options:

### Frictionless (No Challenges)

All authentications are immediately approved or declined based on risk assessment, with no cardholder interaction. This provides the fastest, lowest-friction experience but may result in declining legitimate transactions that fall into grey areas. Choose this when prioritizing speed and simplicity over nuanced fraud detection.

### Lithic Orchestrated Challenges

Lithic manages the complete challenge process, sending SMS one-time passcodes to cardholders and handling verification through our Challenge UI. You only need to maintain current cardholder phone numbers in Lithic's system. Choose this for balanced fraud prevention with minimal operational complexity.

### Customer Orchestrated Challenges

Your organization controls the entire challenge process, from delivery method (SMS, push notifications, in-app biometric) to user experience design. You must build infrastructure to deliver challenges and respond to Lithic with results within the challenge window. Choose this for maximum flexibility and seamless integration with your existing cardholder communication channels.

# 3DS and Authorization Decisioning

Since the 3DS authentication process runs *before* authorizations, you can take advantage of the data contained in these webhooks to improve your authorization decisioning logic. To get the most out of 3DS, we strongly recommend that card programs incorporate the outcome of 3DS authentications into their authorization decisioning.

When a 3DS authentication takes place, the `cardholder_authentication` object in the ASA request contains data indicating the outcome of the 3DS authentication. To view the full data, refer to our [API specification](https://docs.lithic.com/reference/post_asa-request). A few key fields to note:

* `liability_shift`: Indicates whether chargeback liability shift to the issuer applies to the transaction; in other words, whether the issuer forfeits the ability to dispute the transaction for fraud if it approves the authorization
* `authentication_result`: Indicates what the outcome of the 3DS authentication process is
* `decision_made_by`: Indicates which party made the 3DS authentication decision
* `three_ds_authentication_token`: Unique identifier you can use to match a given 3DS authentication (available via the `three_ds_authentication.created` event webhook) and the subsequent authorization

Remember: even if 3DS authentication has taken place and liability has shifted, you still have the ability to decline the authorization via ASA to protect your card program in the case of suspected fraud.

# Getting Started

To enable 3DS for your card program, contact your Implementation Manager (for implementing programs) or your Customer Success Manager (for live programs). They'll guide you through the implementation process specific to your chosen decisioning and orchestration models.

For detailed implementation instructions, see:

* [3DS Lithic Decisioning](https://docs.lithic.com/docs/3ds-decisioning) - for Lithic-managed authentication
* [3DS Customer Decisioning](https://docs.lithic.com/docs/3ds-customer-decisioning) - for customer-managed authentication
* [3DS Challenge Flows](https://docs.lithic.com/docs/3ds-challenges) - for adding challenge capabilities
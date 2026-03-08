# 3DS Decisioning Models

Choose the 3DS decisioning model that is right for your program

When a merchant initiates a 3DS authentication request for cards within your program, Lithic supports two distinct decisioning models to accommodate your organization's operational requirements and technical infrastructure.

## Decisioning Models

> 📘 Consider 3DS Authentication Rules
>
> All decisioning models can be augmented with custom logic you define via 3DS Auth Rules. Learn more about [3DS Auth Rules here](https://docs.lithic.com/docs/3ds-authentication-rules).

### Lithic Decisioning

3DS authentication decisions are processed using Lithic's integrated risk engine. Upon receiving a 3DS authentication request for cards within your program, Lithic's system evaluates the transaction against comprehensive risk signals and generates approval or decline responses automatically. This model requires no real-time integration from your organization.

### Customer Decisioning

Your organization maintains complete authority over 3DS authentication decisions. Upon receiving a 3DS authentication request, Lithic forwards comprehensive authentication data to your organization's responder endpoint. Your system must evaluate the provided risk data and respond with an authentication decision within one second.

## Decisioning Model Comparison

| Aspect                   | Lithic Decisioning                      | Customer Decisioning                             |
| ------------------------ | --------------------------------------- | ------------------------------------------------ |
| Integration Requirements | None                                    | Decisioning endpoint development and maintenance |
| Response Time SLA        | N/A                                     | 1 second                                         |
| Decision Authority       | Lithic Decisioning model                | Customer risk evaluation logic                   |
| Data Access              | Full access to rich authentication data | Full access to rich authentication data          |

## Card Network Compliance

Customer decisioning models must maintain compliance with card network requirements for minimum 3DS authentication approval rates. Mastercard requires issuers to maintain at least a 70% approval rate for frictionless authentication requests under their Data Integrity Monitoring Program (Edit 1).

For Program Managed customers, any penalties or fees associated with failure to meet these compliance requirements will be passed through from Lithic to your organization.

In certain circumstances, such as when Lithic detects card testing attempts, we may decline authentications regardless of your selected decisioning model to prevent disclosure of valid PANs.
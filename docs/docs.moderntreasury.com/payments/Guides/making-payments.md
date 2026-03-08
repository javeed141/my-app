# Originating Payments

Modern Treasury enables you to originate payments across multiple payment rails. The core resource for payments is a [payment order](https://docs.moderntreasury.com/payments/reference/payment-order-object). A payment order is an instruction to move money. We enable both sending money (credits) and pulling money (debits).

We offer a single resource, Payment Orders, to move money rather than exposing different endpoints for ACH, wires, RTP, stablecoins, etc. This decision is meant to simplify your integration. As a result, there may be some fields that are more or less relevant depending on the payment rail you are using. We have guides to walk you through orchestrating payments over different rails.

You can subscribe to [webhooks](https://docs.moderntreasury.com/payments/reference/payment-orders) to get updates on a payment order throughout its lifecycle. We also provide additional objects to provide more information for payment operations and debugging, such as [returns](https://docs.moderntreasury.com/payments/reference/return-object) and [payment references](https://docs.moderntreasury.com/payments/reference/payment-reference-object).

All payment orders are run through validations automatically. These validations include:

**Fiat:**

* Routing number validation: We ensure that every payment order routing number is valid, active, and can receive the specific type of payment being originated.
* Payment network validation: Depending on the payment network, we ensure that all the relevant information (name, address, etc.) are populated at time of creation before being sent to the network. We also further validate fields like `amount` to make sure they comply with network rules.
* ACH NOC validation: When receiving ACH Notifications of Change, we automatically apply those corrections to our internal systems. That way future payment orders are processed with the correct data.
* Date validation: Our system ensures that all effective dates are valid and that payments aren't sent late or too early to the payment networks.
* Account number validation: We ensure that all account numbers are valid for the specific payment instruction including verifying IBANs and embedded checksums.

**Stablecoins:**

* Account/wallet address validation: all stablecoin wallet addresses are validated to ensure they are the right format for the respective blockchain being used.
* Screening: all stablecoin wallet addresses interacting with the MT platform are screened prior to Payment Order execution.
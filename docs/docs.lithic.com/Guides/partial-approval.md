# Partial Approval

Learn about how to use partial approval in ASA

Partial approval can be used to approve only part of a transaction (i.e., a portion of the goods amount) when the merchant terminal is configured to support this type of response.

## Details

* Use of this feature is conditional on the merchant POS supporting partial approval, indicated by the ASA field `pos.terminal.partial_approval_capable`. Attempting to partially approve a transaction on a non-capable POS will result in the authorization being declined.
* If a prepaid card has “run out” of funds (e.g., a gift card with a fixed balance), the purchase can be partially approved for the remainder of funds on the card and the cardholder will be prompted for a second form of payment (“split tender”) for the balance of the purchase.
* If a debit card backed by a bank account is out of funds, the purchase can likewise be partially approved with the balance of the purchase paid with a different form of payment.
* If a customer wants to approve an exact amount in a restaurant, partially approving the transaction ensures that the 20% authorization tolerance at MCC 5812 or 5814 does not apply. If the authorization is partially approved (note that the partial approval amount can be equal to the authorization request amount) and the capture is more than the approved amount, the issuer retains chargeback rights even if the capture is within 20% of the authorized amount.
* If a customer wants to approve a specific amount when an automated fuel dispenser (AFD) requests a $1 preauth, they can do so by partially approving the transaction for the requested amount. This amount may be less than the $350 or $125 AFD chargeback limit, offering more protection on transactions occurring at fuel dispensers.
* In general, card-present terminals tend to be partial approval capable, while card-not-present terminals (e.g., ecommerce) tend to not be partial approval capable.

## Implementation Guide

* Customers must be integrated with ASA to return the approved amount (similar to a balance check). In the future, customers using Lithic’s ledger will be able to partially pay for a purchase when the ledger balance is low.
* The partially-approved amount will be sent back to Lithic in the ASA response in a new `approved_amount` field on the ASA response. The return `approved_amount` should be in the settlement currency, and should not include the acquirer fee, if one exists. Sample ASA response:
  ```json
  {
    "result": "APPROVED",
    "approved_amount": Integer,
  }
  ```
* The `approved_amount` must be less than or equal to the requested authorization amount, except for $1 fuel authorizations on MCC 5542.
* ATM withdrawals cannot be partially approved.
* Credit authorizations cannot be partially approved.
* Partial approval is not available for purchases with cashback.
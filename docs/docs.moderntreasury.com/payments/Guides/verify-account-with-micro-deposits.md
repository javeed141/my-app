# Verify account with micro-deposits

Use micro-deposits to verify a bank account

Micro-deposit verification is a form of authenticating bank account ownership or access. Modern Treasury supports micro-deposits across multiple payment rails, also allow [Instant Micro-Deposits](https://docs.moderntreasury.com/payments/docs/instant-micro-deposits) at supported banks.

# How does Micro-Deposit Verification work?

## 1. Initiate the verification

Upon collecting your end-user's bank account information, you will send two small amounts. These amounts are unknown to the end-user. In Modern Treasury, you can [initiate a micro-deposit verification using our API](/platform/reference/initiate-external-account-verification). This will create a verification using two credit payment orders. The verification status will be set to `pending_verification`.

> 👍 Modern Treasury provides a fallback option for Instant Micro-Deposits
>
> If the counterparty isn’t eligible to receive an RTP/FedNow micro-deposit, users are able to specify the `fallback_type` to complete the verification using ACH

> 👍 Modern Treasury automates retrieval of micro-deposits
>
> Upon successful sending of micro-deposits, Modern Treasury will automatically create a charge for the sum of the two amounts to recoup the deposits. Based on the payment rail used, Modern Treasury follows guidelines to properly retrieve funds.

## 2. Complete the verification

When your end-user reports back the two micro-deposit amounts, you [submit these amounts via API](/platform/reference/complete-external-account-verification). If these amounts are correct, the verification status will be set to `verified`

# FAQs

## Can I edit the attributes of the micro-deposit payment orders?

Fields that are used for your internal usage, such as the internal description and metadata, may be edited on these payment orders. The fields that dictate the mechanics of the payment itself, such as the amount, counterparty, and payment type, may not be changed.

## Are micro-deposits subject to approval rules?

Yes, the payment orders will also adhere to the approval rules system, which means a user may have to approve the micro-deposits before they are sent. You can add in a rule condition where payment amounts need to be above $1, as all micro-deposits are less than $1.
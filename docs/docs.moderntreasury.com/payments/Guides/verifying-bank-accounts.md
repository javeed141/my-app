# Verifying external bank accounts

All [External Accounts](https://docs.moderntreasury.com/reference/external-account-object) in Modern Treasury have an attribute called `verification_status`. This attribute tracks whether the external account's banking information has been verified through the Modern Treasury platform. There are three possible states that this can be in: `unverified`, `pending_verification`, or `verified`. All API responses and webhook payloads will include this field.

<Image title="Verification with microdeposits - 2_25_21.svg" alt={1067} align="center" src="https://files.readme.io/2db296d-Verification_with_microdeposits_-_2_25_21.svg">
  State Diagram for External Account Verification
</Image>

The verification status of an External Account has no impact on your ability to use the account for Payment Orders. It is purely for informational purposes so that you can track whether an account has been verified through Modern Treasury. This is different than what you might be familiar with from other platforms, where some form of verification is required prior to initiating payments.

By default, all External Accounts are unverified. If you do not plan to use our platform's verification tools, the accounts will remain unverified. You may choose to do this if you handle verification in your own platform and do not want to use our tools.

If you do want to use our verification tools, there are currently three ways that we support verifying external accounts.

## ACH Prenotes

A prenote or prenotification is a $0 ACH payment order used to validate the account and routing information of a counterparty before sending live transactions.

They are an alternative to using microdeposits, and do not require the counterparty to take any action during verification.

The disadvantage of prenotes is that they take some time to complete validation.

## Microdeposits

Microdeposit verification is a way to verify bank accounts by testing small payments to the account. Modern Treasury will send two payments that are under $1 to the account. The counterparty can verify that they own the account by passing back the amounts that were deposited to them.

The benefit of microdeposits is that they work with any bank account. All you need is an account and routing number to send funds to someone.

The disadvantage is that it will take 1-2 days until the counterparty can view the microdeposits and verify their account.

## Plaid

Modern Treasury partners with Plaid to perform account validation. Plaid verifies accounts through end users providing account credentials. Once the connection has been made and the account information has been pulled, the external account will be verified.

The benefit of this type of verification is that it is instant. You can also prevent banking information from passing through your infrastructure, and simply pass Modern Treasury a tokenized string when creating a counterparty rather than bank account details.

The main disadvantage is that this approach requires your user to grant access to their bank account, which some users may be reluctant to do. Additionally, some banks do not support Plaid.
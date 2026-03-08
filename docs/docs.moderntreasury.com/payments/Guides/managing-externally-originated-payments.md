# Reconciling received payments

Create an [Expected Payment](/platform/reference/expected-payment-object) to represent and reconcile a payment that you expect to receive or send (e.g., an invoice). The details specified are used to automatically match and reconcile to transactions from your financial institution.

> 📘 Payments sent with Modern Treasury using a Payment Order will be automatically reconciled –  you do not need to create an Expected Payment in this case.

# How the matching engine works

To achieve high accuracy, Expected Payments will only reconcile to a Transaction if all of the defined conditions are matched. If you require the [counterparty](/platform/reference/counterparty-object) to match, the counterparty must have a linked [external account](/platform/reference/external-account-object) or [virtual accounts](/platform/reference/virtual-account-object) for it to be considered for matching.

When multiple Expected Payments match the details of a transaction, they won't be automatically reconciled. Instead, these exceptions will be flagged for [manual reconciliation](https://docs.moderntreasury.com/reconciliation/docs/manually-reconcile-an-expected-payment) to ensure accuracy.

## Example matches

ACH transaction:

<Image align="center" border={false} src="https://files.readme.io/dc0efda-Expected_Payments_Matching_Guide.jpg" />

Wire transaction:

<Image align="center" border={false} src="https://files.readme.io/bbc5a8a-Expected_Payments_Matching_Guide_1.jpg" />

# Which fields are most useful for matching?

While we recommend providing as much detail as possible when creating an expected payment, some fields are more helpful than others when it comes to matching to a transaction. The utility of the different fields can vary by use case. In the case of a Capital Call for example, investors may send wire payments for the same amount over the same time period – reducing the utility of the amount and date ranges. But using custom\_identifiers to match on the vendor description field could be very helpful in that case if clear instructions are provided to (and followed by) the counterparty.

**Amount or Amount Range**\
If known ahead of time, specifying the exact amount of the expected payment is helpful for matching. However, certain variables such as fees, taxes, and even currency fluctuations can alter the amount you expect to receive. In that case, it’s best to specify the amount range (amount\_lower\_bound - amount\_upper\_bound) that you expect the payment to fall within. This built-in flexibility can be very useful when it comes to matching bank transactions where the exact amount may vary.

**Expected Date or Date Range**\
Even payments with strict due dates can be late. Specifying a date range for an expected payment is a great way to build in fault tolerance for payments that arrive later than expected. If a given payment doesn’t have a due date, then you may want to specify a generous date range to increase the likelihood of a match.

**Custom Identifiers**\
Custom identifiers allows you to specify free form or custom matching data, allowing it to be both unique and specific. This provides a great opportunity for matching expected payments to transactions. You can use this to match on the unstructured or structured remittance data that is often available in the Transaction vendor description. It’s helpful to give clear and specific instructions to your counterparty, such as providing their full name or a unique identifier in the appropriate field of the payment (i.e., OBI field for Wire payments).
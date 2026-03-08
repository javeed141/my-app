# SWIFT wires FAQs

Frequently asked questions for global payouts

This guide includes answers to some of the common questions we get asked about global payouts.

# How do I specify the intermediary or correspondent banks for my SWIFT wire?

When you use Modern Treasury, you only need to provide the SWIFT code for your counterparty's receiving bank. We automatically populate the intermediary and correspondent banks on your behalf through a data agreement with [LexisNexis](https://risk.lexisnexis.com/financial-services/payments-efficiency/validate-account-bank-details). This ensures that your wires are being sent with the most up-to-date information. Note that currently this is supported only at select banks.

# What tracking information can you provide about SWIFT wires?

When you initiate a payment order via Modern Treasury, we will automatically record relevant tracking codes. We store these in [Payment References](/platform/reference/payment-references).

# Do you validate the account and routing details?

All account numbers are automatically checked to ensure they are in the proper format. This does not ensure that the accounts exist, however.

All routing numbers - ABA routing numbers, SWIFT codes, sort codes, BSB codes, etc. - are validated against databases. We also have an [API endpoint](https://docs.moderntreasury.com/reference#validate-routing-number) that customers may use to validate routing numbers.
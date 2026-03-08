# Create a Payment Order

How to create a payment order

When you need to move funds in or out of your Internal Account, you will create a Payment Order.

A Payment Order is an instruction that will be sent to your bank to move from your Internal Account to another account.

# How to create a Payment Order

1. Login to Modern Treasury
2. Navigate to the [Payments Overview](https://app.moderntreasury.com/payment_orders) page
3. From the **Create New** dropdown menu, select **Payment Order**
4. Begin by filling in the required fields:
   1. **Action:** Determine whether you are paying or charging the Receiving Account.
   2. **Payment Type:** Select the desired method of payment (ACH, wire, check, or RTP).
   3. **Amount:** Specify the sum of money to be transferred.
   4. **From:** Choose the Internal from which the payment will be made.
   5. **To**: Identify the recipient or payee. This can be another Internal Account or an External Account (your Counterparty's bank account).
5. Utilize additional information:
   1. **Bank Statement Description:** Optionally provide a brief description of the bank statement (10 characters for ACH, 15 for EFT).
   2. **Remittance Information:** Include additional details for the counterparty, passing through on addenda records (80 characters for ACH, 140 characters for Wires).
   3. **Internal Description:** Add a description for internal use only. Not visible to Counterparties.
   4. **Payment Date:** Specify the date of the payment, also known as the effective date.
   5. **Non-Sufficient Funds Protection Checkbox:** Opt for this option to verify available funds before processing (for ACH charges with External Accounts authenticated via Plaid).
   6. **Metadata:** Add free-form key-value pairs for easier searching.
   7. **Line Items:** Include additional information to represent sub-amounts.
   8. **Documents:** Attach any associated files as needed.
6. Once you've entered all relevant information, click `Create Payment Order` to finish creating the payment.
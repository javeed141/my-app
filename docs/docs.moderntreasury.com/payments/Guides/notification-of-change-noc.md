# Notification of Change (NOC)

When initiating ACH Payments, it's possible to receive a **Notification of Change (NOC)** code as a return from the RDFI.

A **NOC code** is simply a **notification** that the payment order information is incorrect and must be corrected to ensure efficient processing. The payment order in question was still successfully processed, but it's a courtesy given by the bank, specifically the RDFI, to prevent future issues in transacting against this bank account.

> 📘 Automatic External Account Updates
>
> Modern Treasury automatically handles NOC codes with the provided change information. The External Account will automatically reflect those changes to proactively prevent future issues with payment origination.

In Modern Treasury, if you receive a Notification of Change, you will see a $0.00 Return object that contains the NOC code under `Code`, the associated `Reason` for the return, and all of the relevant fields that have been updated alongside their new values. Again, this is not a standard return and is rather the bank issuing a notification tied to a payment order - "We processed the payment, but some aspect of the account information has changed." In the screenshot example below, the return is for a NOC with a `C07` code indicating the originating account number, routing number, and transaction code were all incorrect on the original payment.

<Image align="center" src="https://files.readme.io/0c2e1c8108729db9c21e25379f0b68449444229d29993659ae73209b35eff6ab-Screenshot_2025-06-24_at_12.00.09_PM.png" />

<br />

Here is what that same example Return would look like serialized from a GET request over the Modern Treasury API. All of the updated information received from the RDFI is contained within the `corrections` field. This object is also subject to PII constraints, and in this example, PII is turned off, preventing the corrected account number from also being included in the response.

```json
{
    "id": "fd402803-7d7d-402c-929a-0a8026d0b34a",
    "object": "return",
    "live_mode": true,
    "status": "completed",
    "returnable_id": "012a3af3-6d82-454c-b555-9162e4a583be",
    "returnable_type": "payment_order",
    "transaction_line_item_id": null,
    "transaction_id": null,
    "internal_account_id": "05578c8e-d24c-495d-8229-56b8c2ae96d8",
    "type": "ach_noc",
    "amount": 0,
    "currency": "USD",
    "code": "C07",
    "failure_reason": null,
    "reason": "Incorrect DFI Account Number, Routing Number, Account Type",
    "role": "receiving",
    "date_of_death": null,
    "current_return": null,
    "reference_numbers": [],
    "ledger_transaction_id": null,
    "corrections": {
        "company_id": null,
        "company_name": null,
        "individual_identification_number": null,
        "routing_number": "000111000",
        "transaction_code": "22"
    },
    "discarded_at": null,
    "created_at": "2025-06-11T14:28:19Z",
    "updated_at": "2025-06-24T15:59:30Z"
}
```
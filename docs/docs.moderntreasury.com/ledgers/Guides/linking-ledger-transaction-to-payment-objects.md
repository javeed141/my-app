# Link Ledger Transaction to Payments

# Overview

Ledger Transactions often represent payments in other systems. In these cases, the Ledger Transaction should reflect the amount and status of the external payment.

# Payments Outside Modern Treasury

If a payment is executed in another system outside Modern Treasury, you can use a Ledger Transaction to represent this payment.

When the payment is updated, executed, or cancelled in the external system, your system can use the [Update Ledger Transaction](https://docs.moderntreasury.com/platform/reference/update-ledger-transaction) endpoint to update, post, or archive the underlying Ledger Transaction.

Metadata fields can be used to attach external system IDs and other references to the Ledger Transaction.

# Payments in Modern Treasury

Payment objects in Modern Treasury can also be recorded in your internal Ledger. For example, you may want a Payment to a user to decrement their in-app funds represented in the ledger.

If you link a Modern Treasury payment to a Ledger Transaction, Modern Treasury will handle reflecting any changes in the payment lifecycle on the Ledger Transaction.

## Linking After Payment Object Creation

[Ledger Transactions](/platform/reference/ledger-transaction-object) can be linked to other Modern Treasury objects using the fields `ledgerable_type` and `ledgerable_id`.

`ledgerable_type` can be one of `payment_order`, `incoming_payment_detail`, `expected_payment`, `return`, or `reversal`. You can link an object to a Ledger Transaction if it is within the same environment as the Ledger Transaction and it is not already tied to a different Ledger Transaction.

## Linked Statuses

After a payment object is created, you can create a new Ledger Transaction linked to that object by specifying `ledgerable_type` and `ledgerable_id`.

If a Ledger Transaction is linked to another object, we will automatically update the Ledger Transaction's `status` based on the `status` of the linked object. The table below shows how different object statuses correspond to Ledger Transaction statuses.

| Ledger transaction status | Payment Order status                               | Return status                   | Incoming Payment Detail status | Expected Payment status | Reversal status                 |
| :------------------------ | :------------------------------------------------- | :------------------------------ | :----------------------------- | :---------------------- | :------------------------------ |
| `pending`                 | `needs approval`, `approved`, `processing`, `sent` | `pending`, `processing`, `sent` | `pending`, `returned`          | `unreconciled`          | `pending`, `processing`, `sent` |
| `posted`                  | `completed`, `returned`, `reversed`                | `completed`, `returned`         | `completed`, `returned`        | `reconciled`            | `completed`, `returned`         |
| `archived`                | `denied`, `failed`, `cancelled`                    | `failed`                        |                                | `archived`              | `failed`                        |

After you link a Ledger Transaction to another object, you will no longer be able to manually update the Ledger Transaction's status.
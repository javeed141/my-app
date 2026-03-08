# Setting the charge bearer for a SWIFT wire

When sending a SWIFT wire, you may specify who is liable for the wire fees in the transaction. You would set the `charge_bearer` to one of the following values: `shared`, `sender,` or `receiver`, which correspond respectively with the [SWIFT 71A](https://www.sepaforcorporates.com/swift-for-corporates/payment-fees-the-difference-between-ben-our-and-sha/) values SHA, OUR, BEN.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "wire",
    "amount": 1000,
    "direction": "credit",
    "currency": "EUR",
    "charge_bearer": "shared",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```

Modern Treasury supports the following charge bearer values to be passed in:

* `shared` - fee split by both sides
* `sender` - fee covered by sender
* `receiver` - fee covered by the receiving counterparty

If not given, Modern Treasury will often have a default ready depending on rail and direction. The defaults typically:

* `sender` for wires during serialization
* `shared` for cross border payments depending on corresponding banking arrangements.

> 📘 ACH
>
> For ACH Payments, we do not serialize charge bearer as it's usually waived for the customer or handled separately based on rules and agreements outside the payment.

## Mappings

In the outgoing payment order to the banking system, we will combine the direction of the payment and the values allowed by the particular payment standard. A few of the mappings in use:

### ISO20022

This is for the `<ChrgBr>` XML tag

|            | Credit | Debit  |
| :--------- | :----- | :----- |
| `shared`   | `SHAR` | `SHAR` |
| `sender`   | `DEBT` | `CRED` |
| `receiver` | `CRED` | `DEBT` |

> 📘 SEPA
>
> For SEPA, the only allowed value is `SLEV` (Service Level), so any `charge_bearer` value given won't be used.

### MT103

These are typically placed in the `71A` tag with no variation on credit or debit

|            | Credit | Debit |
| :--------- | :----- | :---- |
| `shared`   | `SHA`  | `SHA` |
| `sender`   | `OUR`  | `OUR` |
| `receiver` | `BEN`  | `BEN` |

### FedWire

This is placed in tag `6500`, with no variation on credit or debit

|            | Credit  | Debit   |
| :--------- | :------ | :------ |
| `shared`   | `/CTS/` | `/CTS/` |
| `sender`   | `/CTO/` | `/CTO/` |
| `receiver` | `/CTB/` | `/CTB/` |

<br />

> 📘 Bank Specific Formats
>
> Many Banks with their custom payment standards will often use the same charge bearer formats as the popular standards we've shown above, and Modern Treasury will follow the same mappings as above.
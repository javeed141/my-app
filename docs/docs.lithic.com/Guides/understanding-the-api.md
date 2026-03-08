# The Dispute Object

Explore the dispute object returned by our API and webhooks.

Lithic provides [API endpoints](https://docs.lithic.com/reference/getdisputesv2) for retrieving disputes. These endpoints return a dispute object that presents a live snapshot of a dispute, with a log of key events that have occurred throughout the dispute's lifecycle. This guide dives into how to interpret this dispute object.

<Callout icon="📘" theme="info">
  The full schema of the dispute object is available in the [API reference](https://docs.lithic.com/reference/getdisputebytokenv2).
</Callout>

### Dispute vs Card Transaction

A dispute is one-to-one with a [card transaction event](https://docs.lithic.com/docs/transactions#transaction-events). If a cardholder disputes a card transaction containing 5 clearing events, 5 separate disputes will be created and some, all, or none will resolve in their favor.

## Key Fields in the Dispute

### Status and Disposition

The dispute object uses two fields to indicate its current state:

**status**: Whether the dispute is active or resolved

* `OPEN`: Dispute is active and may progress through additional stages
* `CLOSED`: Dispute has reached final resolution

**disposition**: The final outcome, `null` when status is `OPEN` and populated with one of the following when status is `CLOSED`

| Disposition     | What It Means                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WON`           | Dispute succeeded and funds were fully recovered from the acquirer.                                                                                       |
| `PARTIALLY_WON` | Partial recovery achieved, meaning your program recovered some funds but not the full disputed amount. The difference was either written off or denied.   |
| `LOST`          | Dispute was lost and no funds were recovered. Your program either wrote off the amount or reversed provisional credit to the cardholder.                  |
| `WITHDRAWN`     | Dispute was withdrawn before resolution, typically because the merchant resolved directly with the cardholder (e.g., issued a refund).                    |
| `DENIED`        | Dispute was denied at the claim stage before ever being filed to the network, typically due to insufficient evidence or being outside network timeframes. |

A dispute can be **reopened** if its previous disposition was `DENIED` or `WITHDRAWN`. Upon reopen:

* `status` transitions from `CLOSED` back to `OPEN`
* `disposition` transitions back to `null`

Cardholders may request to reopen disputes if new evidence becomes available or if they believe the initial denial was in error.

### Case ID

The `case_id` is assigned by the card network and used for all network communications. Each network uses its own format.

The `case_id` is `null` until a chargeback is filed with the network. If a dispute is resolved before any filing to the network, the `case_id` will remain `null`.

### Transaction Series

The `transaction_series` object links the dispute back to the original transaction. This is useful for:

* displaying the disputed transaction details to cardholders (call the [get card transaction API endpoint](https://docs.lithic.com/reference/gettransactionbytoken) with `transaction_series.related_transaction_token`)
* fetching all disputes on a given transaction (call the [list disputes API endpoint](https://docs.lithic.com/reference/getdisputesv2) with `transaction_series.related_transaction_token`)
* making accounting adjustments to the disputed transaction in your ledger, such as revising a credit card statement to temporarily write off the transaction

### Liability Allocation

This provides a snapshot of how the disputed amount has been allocated across all parties. Think of it as a running balance sheet for the dispute.

Example:

```
Original amount: $1,200 (what cardholder disputed)

- Recovered: $800 (what you got back from acquirer via chargebacks/arbitration)
- Written off: $300 (what your program absorbed as a loss)
- Denied: $100 (what you charged back to cardholder)
- Remaining: $0 (nothing left unresolved)
```

**Common Patterns**:

| Pattern                             | What It Means                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| recovered = original, others = 0    | Full recovery. Dispute won completely.                                              |
| denied = original, others = 0       | Full denial o. Cardholder liable for full amount.                                   |
| written\_off = original, others = 0 | Full write-off. Your program absorbed the loss.                                     |
| recovered + written\_off = original | Partial recovery. You recovered some funds and wrote off the rest.                  |
| recovered + denied = original       | Partial recovery. You recovered some funds and charged the rest back to cardholder. |
| remaining > 0                       | Dispute still in progress, not yet fully resolved.                                  |

## Dispute Events

The dispute object contains an array of chronological events, of which there are 3 types.

### Workflow Events

Workflow events provide updates about the case management workflow; they do not directly contribute any accounting impact. These are the combinations that can occur today (note: more will be added in the future).

| Stage | Action   | What Happened                                                                                       |
| ----- | -------- | --------------------------------------------------------------------------------------------------- |
| CLAIM | OPENED   | Dispute was initiated and entered Lithic's system                                                   |
| CLAIM | CLOSED   | Dispute reached final resolution. Check `disposition` in this event to see outcome.                 |
| CLAIM | REOPENED | A previously closed dispute (`disposition` of DENIED or WITHDRAWN) was reopened for reconsideration |

CLAIM is the entry and exit point of the dispute - where the dispute first initializes, and where it eventually resolves.

### Financial Events

Financial events represent liability transfer between the issuer (your program) and the acquirer through network settlement. These affect your bank settlement account balance by way of the network settlement process.

| Stage          | Polarity | What Happened                                         | Impact to You          |
| -------------- | -------- | ----------------------------------------------------- | ---------------------- |
| CHARGEBACK     | CREDIT   | Chargeback succeeded                                  | You receive funds (+$) |
| REPRESENTMENT  | DEBIT    | Representment succeeded                               | You return funds (-$)  |
| PREARBITRATION | CREDIT   | Prearbitration resolved in your favor                 | You receive funds (+$) |
| PREARBITRATION | DEBIT    | Prearbitration resolved against you                   | You return funds (-$)  |
| ARBITRATION    | CREDIT   | Arbitration ruled in your favor                       | You receive funds (+$) |
| ARBITRATION    | DEBIT    | Arbitration ruled against you                         | You return funds (-$)  |
| COLLABORATION  | CREDIT   | Merchant provided refund via Mastercard Collaboration | You receive funds (+$) |

**Keep in mind:**

* Financial events track issuer-acquirer financial liability. They do not represent changes to any cardholder's balance. They also do not coincide directly with when the network settlement occurs that actually moves the funds.
* Refunds, vouchers, or any other credits given from the merchant to the cardholder outside of the network's dispute platform are not displayed here. Refunds are visible in the [Card Transactions API](https://docs.lithic.com/reference/gettransactionbytoken).

### Cardholder Liability Events

These events track when and how cardholder liability changes, in the form of provisional credits that are granted or pulled back. Use these to update cardholder balances if you are managing your own ledger.

| Action                        | When It Happens                                                                | Impact to Balances                               |
| ----------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------ |
| PROVISIONAL\_CREDIT\_GRANTED  | Lithic issues provisional credit while dispute is investigated                 | Credit the cardholder's account                  |
| PROVISIONAL\_CREDIT\_REVERSED | Dispute is denied and Lithic reverses the provisional credit                   | Debit the cardholder's account                   |
| WRITTEN\_OFF                  | Your program absorbs the loss, and the cardholder keeps the provisional credit | Record a loss adjustment on your program account |

**Can these actions occur multiple times?**

Yes. A single dispute can have:

* Multiple WRITTEN\_OFF events (partial write-offs at different stages)
* Multiple PROVISIONAL\_CREDIT\_REVERSED events (partial denials at different stages)
* Multiple PROVISIONAL\_CREDIT\_GRANTED events (uncommon, but possible if a dispute is reopened)

Sum them cumulatively. For instance, two WRITTEN\_OFF events for $200 and $300 = $500 total written off.

## Examples

### Chargeback Won

A cardholder reported an unauthorized transaction for $2,500 on January 5, 2026. Provisional credit was granted immediately. Lithic filed a chargeback which was accepted by the network, recovering the full amount. The dispute closed successfully with the cardholder keeping their provisional credit.

```json
{
  "case_id": "VROL54321",
  "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "card_token": "11ddee49-4558-4a79-80ce-339e12cc141c",
  "account_token": "22d7c408-2bbb-4f63-889a-8a2a2b1601af",
  "network": "VISA",
  "currency": "USD",
  "status": "CLOSED",
  "disposition": "WON",
  "created": "2026-01-05T09:00:00Z",
  "updated": "2026-01-15T14:30:00Z",
  "merchant": {
    "acceptor_id": "123456789012345",
    "acquiring_institution_id": "123456",
    "descriptor": "ONLINE SHOP",
    "mcc": "5942",
    "city": "NEW YORK",
    "state": "NY",
    "country": "USA"
  },
  "transaction_series": {
    "type": "DISPUTE",
    "related_transaction_token": "6ba7b820-9dad-11d1-80b4-00c04fd430c8",
    "related_transaction_event_token": "6ba7b821-9dad-11d1-80b4-00c04fd430c8"
  },
  "liability_allocation": {
    "original_amount": 250000,
    "recovered_amount": 250000,
    "written_off_amount": 0,
    "denied_amount": 0,
    "remaining_amount": 0
  },
  "events": [
    {
      "token": "550e8400-e29b-41d4-a716-446655440100",
      "type": "WORKFLOW",
      "created": "2026-01-05T09:00:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "OPENED",
        "reason": "Fraud - Card Not Present",
        "amount": 250000,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440101",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-05T09:30:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_GRANTED",
        "amount": 250000,
        "reason": "Provisional Credit"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440102",
      "type": "FINANCIAL",
      "created": "2026-01-12T11:00:00Z",
      "data": {
        "stage": "CHARGEBACK",
        "amount": 250000,
        "polarity": "CREDIT"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440103",
      "type": "WORKFLOW",
      "created": "2026-01-15T14:30:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Resolved-Won",
        "disposition": "WON"
      }
    }
  ]
}
```

***

### Denied Before Filing

A cardholder disputed a $45 Starbucks online order on January 8, 2026, claiming they didn't receive the items. Provisional credit was granted immediately. However, after reviewing evidence (receipt showed completed transaction and cardholder signature), Lithic denied the dispute on January 12 without filing to the network. The provisional credit was reversed, placing liability back on the cardholder. Note: In a Reg E protected dispute, the reversal would occur 5+ business days after closure.

```json
{
  "case_id": null,
  "token": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "card_token": "33ddee49-4558-4a79-80ce-339e12cc141c",
  "account_token": "44d7c408-2bbb-4f63-889a-8a2a2b1601af",
  "network": "MASTERCARD",
  "currency": "USD",
  "status": "CLOSED",
  "disposition": "DENIED",
  "created": "2026-01-08T10:30:00Z",
  "updated": "2026-01-12T16:45:00Z",
  "merchant": {
    "acceptor_id": "987654321098765",
    "acquiring_institution_id": "987654",
    "descriptor": "STARBUCKS #1234",
    "mcc": "5814",
    "city": "SAN FRANCISCO",
    "state": "CA",
    "country": "USA"
  },
  "transaction_series": {
    "type": "DISPUTE",
    "related_transaction_token": "7ba7b830-9dad-11d1-80b4-00c04fd430c8",
    "related_transaction_event_token": "7ba7b831-9dad-11d1-80b4-00c04fd430c8"
  },
  "liability_allocation": {
    "original_amount": 4500,
    "recovered_amount": 0,
    "written_off_amount": 0,
    "denied_amount": 4500,
    "remaining_amount": 0
  },
  "events": [
    {
      "token": "550e8400-e29b-41d4-a716-446655440110",
      "type": "WORKFLOW",
      "created": "2026-01-08T10:30:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "OPENED",
        "reason": "Services Not Received",
        "amount": 4500,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440111",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-08T10:45:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_GRANTED",
        "amount": 4500,
        "reason": "Provisional Credit"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440112",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-12T16:30:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_REVERSED",
        "amount": 4500,
        "reason": "Processing Liability - Deny Dispute"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440113",
      "type": "WORKFLOW",
      "created": "2026-01-12T16:45:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Resolved-Denied",
        "disposition": "DENIED"
      }
    }
  ]
}
```

***

### Representment with Partial Recovery

A cardholder disputed $87.50 on January 12, 2026, claiming they received only 2 of 5 items ordered. Provisional credit for the full amount was granted. Chargeback was filed and initially won, recovering $87.50. The merchant filed a representment on February 5 with tracking showing 2 items were delivered. After reviewing the evidence, Lithic wrote off $30 (accepting the delivered items) and reversed the provisional credit for the remaining $57.50 back to the cardholder. Net result: your program recovered $30 from the original chargeback ($87.50 chargeback - $57.50 representment) and reversed $57.50 to the cardholder.

```json
{
  "case_id": "VROL67890",
  "token": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "card_token": "55ddee49-4558-4a79-80ce-339e12cc141c",
  "account_token": "66d7c408-2bbb-4f63-889a-8a2a2b1601af",
  "network": "VISA",
  "currency": "USD",
  "status": "CLOSED",
  "disposition": "PARTIALLY_WON",
  "created": "2026-01-12T11:00:00Z",
  "updated": "2026-02-08T15:20:00Z",
  "merchant": {
    "acceptor_id": "222333444555666",
    "acquiring_institution_id": "222333",
    "descriptor": "GADGET WAREHOUSE",
    "mcc": "5732",
    "city": "AUSTIN",
    "state": "TX",
    "country": "USA"
  },
  "transaction_series": {
    "type": "DISPUTE",
    "related_transaction_token": "8ba7b840-9dad-11d1-80b4-00c04fd430c8",
    "related_transaction_event_token": "8ba7b841-9dad-11d1-80b4-00c04fd430c8"
  },
  "liability_allocation": {
    "original_amount": 8750,
    "recovered_amount": 3000,
    "written_off_amount": 0,
    "denied_amount": 5750,
    "remaining_amount": 0
  },
  "events": [
    {
      "token": "550e8400-e29b-41d4-a716-446655440120",
      "type": "WORKFLOW",
      "created": "2026-01-12T11:00:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "OPENED",
        "reason": "Merchandise Not Received - Partial",
        "amount": 8750,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440121",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-12T11:30:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_GRANTED",
        "amount": 8750,
        "reason": "Provisional Credit"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440122",
      "type": "FINANCIAL",
      "created": "2026-01-18T10:15:00Z",
      "data": {
        "stage": "CHARGEBACK",
        "amount": 8750,
        "polarity": "CREDIT"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440123",
      "type": "FINANCIAL",
      "created": "2026-02-05T14:30:00Z",
      "data": {
        "stage": "REPRESENTMENT",
        "amount": 5750,
        "polarity": "DEBIT"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440124",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-02-08T15:00:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_REVERSED",
        "amount": 5750,
        "reason": "Partial delivery confirmed"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440125",
      "type": "WORKFLOW",
      "created": "2026-02-08T15:20:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Resolved-Partial Recovery",
        "disposition": "PARTIALLY_WON"
      }
    }
  ]
}
```

***

### Arbitration with Partial Recovery

A cardholder disputed $1,500 on January 3, 2026, for a hotel reservation issue. Provisional credit was granted immediately. A chargeback was filed and won initially, recovering $1,500. The merchant filed a representment with their cancellation policy as evidence. In response, Lithic escalated to arbitration and the network ruled partially in favor of the issuer, awarding $900. Lithic wrote off the remaining $600 representing valid cancellation fees per the merchant's terms. The cardholder retained the full $1,500 provisional credit, and your program recovered $900 net and absorbed a $600 loss.

```json
{
  "case_id": "MC45678",
  "token": "d4e5f6a7-b8c9-0123-defg-234567890123",
  "card_token": "77ddee49-4558-4a79-80ce-339e12cc141c",
  "account_token": "88d7c408-2bbb-4f63-889a-8a2a2b1601af",
  "network": "MASTERCARD",
  "currency": "USD",
  "status": "CLOSED",
  "disposition": "PARTIALLY_WON",
  "created": "2026-01-03T08:00:00Z",
  "updated": "2026-02-20T16:45:00Z",
  "merchant": {
    "acceptor_id": "333444555666777",
    "acquiring_institution_id": "333444",
    "descriptor": "HOTEL BOOKING INC",
    "mcc": "7011",
    "city": "LAS VEGAS",
    "state": "NV",
    "country": "USA"
  },
  "transaction_series": {
    "type": "DISPUTE",
    "related_transaction_token": "9ba7b850-9dad-11d1-80b4-00c04fd430c8",
    "related_transaction_event_token": "9ba7b851-9dad-11d1-80b4-00c04fd430c8"
  },
  "liability_allocation": {
    "original_amount": 150000,
    "recovered_amount": 90000,
    "written_off_amount": 60000,
    "denied_amount": 0,
    "remaining_amount": 0
  },
  "events": [
    {
      "token": "550e8400-e29b-41d4-a716-446655440130",
      "type": "WORKFLOW",
      "created": "2026-01-03T08:00:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "OPENED",
        "reason": "Cancelled Reservation",
        "amount": 150000,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440131",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-03T08:30:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_GRANTED",
        "amount": 150000,
        "reason": "Provisional Credit"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440132",
      "type": "FINANCIAL",
      "created": "2026-01-10T12:00:00Z",
      "data": {
        "stage": "CHARGEBACK",
        "amount": 150000,
        "polarity": "CREDIT"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440133",
      "type": "FINANCIAL",
      "created": "2026-01-28T15:30:00Z",
      "data": {
        "stage": "REPRESENTMENT",
        "amount": 150000,
        "polarity": "DEBIT"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440134",
      "type": "FINANCIAL",
      "created": "2026-02-20T14:00:00Z",
      "data": {
        "stage": "ARBITRATION",
        "amount": 90000,
        "polarity": "CREDIT"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440135",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-02-20T16:30:00Z",
      "data": {
        "action": "WRITTEN_OFF",
        "amount": 60000,
        "reason": "Arbitration partial ruling - valid cancellation fees"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440136",
      "type": "WORKFLOW",
      "created": "2026-02-20T16:45:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Resolved-Arbitration Partial",
        "disposition": "PARTIALLY_WON"
      }
    }
  ]
}
```

***

### Dispute Reopen

A cardholder disputed a $15.99 subscription charge on January 14, 2026, claiming they had already cancelled the subscription. Provisional credit was granted but after investigation revealed a still active subscription, the dispute was denied on January 18 and the provisional credit was reversed. On January 22, the cardholder provided new evidence, an email confirmation of cancellation sent before the charge. The dispute was reopened, provisional credit was granted again, and after reviewing the new evidence, Lithic wrote off the amount on January 25 as a goodwill gesture rather than pursuing chargeback.

```json
{
  "case_id": null,
  "token": "e5f6a7b8-c9d0-1234-efgh-345678901234",
  "card_token": "99ddee49-4558-4a79-80ce-339e12cc141c",
  "account_token": "00d7c408-2bbb-4f63-889a-8a2a2b1601af",
  "network": "VISA",
  "currency": "USD",
  "status": "CLOSED",
  "disposition": "LOST",
  "created": "2026-01-14T09:15:00Z",
  "updated": "2026-01-25T14:20:00Z",
  "merchant": {
    "acceptor_id": "444555666777888",
    "acquiring_institution_id": "444555",
    "descriptor": "STREAMING SERVICE",
    "mcc": "4899",
    "city": "PALO ALTO",
    "state": "CA",
    "country": "USA"
  },
  "transaction_series": {
    "type": "DISPUTE",
    "related_transaction_token": "0ca7b860-9dad-11d1-80b4-00c04fd430c8",
    "related_transaction_event_token": "0ca7b861-9dad-11d1-80b4-00c04fd430c8"
  },
  "liability_allocation": {
    "original_amount": 1599,
    "recovered_amount": 0,
    "written_off_amount": 1599,
    "denied_amount": 0,
    "remaining_amount": 0
  },
  "events": [
    {
      "token": "550e8400-e29b-41d4-a716-446655440140",
      "type": "WORKFLOW",
      "created": "2026-01-14T09:15:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "OPENED",
        "reason": "Cancelled Recurring",
        "amount": 1599,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440141",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-14T09:30:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_GRANTED",
        "amount": 1599,
        "reason": "Provisional Credit"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440142",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-18T15:00:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_REVERSED",
        "amount": 1599,
        "reason": "Active subscription confirmed"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440143",
      "type": "WORKFLOW",
      "created": "2026-01-18T15:15:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Denied - Insufficient Evidence",
        "disposition": "DENIED"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440144",
      "type": "WORKFLOW",
      "created": "2026-01-22T10:00:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "REOPENED",
        "reason": null,
        "amount": null,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440145",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-22T10:15:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_GRANTED",
        "amount": 1599,
        "reason": "Provisional Credit - Reopened"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440146",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-25T14:00:00Z",
      "data": {
        "action": "WRITTEN_OFF",
        "amount": 1599,
        "reason": "Goodwill adjustment"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440147",
      "type": "WORKFLOW",
      "created": "2026-01-25T14:20:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Resolved-Written Off",
        "disposition": "LOST"
      }
    }
  ]
}
```

***

### Written Off Without Provisional Credit

A cardholder disputed a $35 restaurant charge on January 20, 2026, claiming poor service. After investigation, Lithic determined the dispute didn't have sufficient evidence for network filing but chose to write off the amount as a goodwill gesture. No provisional credit was issued upfront since the amount was below the automatic issuance threshold. The write-off occurred directly and the dispute closed with disposition LOST.

```json
{
  "case_id": null,
  "token": "f6a7b8c9-d0e1-2345-fghi-456789012345",
  "card_token": "aaddee49-4558-4a79-80ce-339e12cc141c",
  "account_token": "bbd7c408-2bbb-4f63-889a-8a2a2b1601af",
  "network": "VISA",
  "currency": "USD",
  "status": "CLOSED",
  "disposition": "LOST",
  "created": "2026-01-20T13:00:00Z",
  "updated": "2026-01-23T11:30:00Z",
  "merchant": {
    "acceptor_id": "555666777888999",
    "acquiring_institution_id": "555666",
    "descriptor": "FINE DINING CAFE",
    "mcc": "5812",
    "city": "CHICAGO",
    "state": "IL",
    "country": "USA"
  },
  "transaction_series": {
    "type": "DISPUTE",
    "related_transaction_token": "1ca7b870-9dad-11d1-80b4-00c04fd430c8",
    "related_transaction_event_token": "1ca7b871-9dad-11d1-80b4-00c04fd430c8"
  },
  "liability_allocation": {
    "original_amount": 3500,
    "recovered_amount": 0,
    "written_off_amount": 3500,
    "denied_amount": 0,
    "remaining_amount": 0
  },
  "events": [
    {
      "token": "550e8400-e29b-41d4-a716-446655440150",
      "type": "WORKFLOW",
      "created": "2026-01-20T13:00:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "OPENED",
        "reason": "Services Not as Described",
        "amount": 3500,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440151",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-23T11:00:00Z",
      "data": {
        "action": "WRITTEN_OFF",
        "amount": 3500,
        "reason": "Below threshold - goodwill write-off"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440152",
      "type": "WORKFLOW",
      "created": "2026-01-23T11:30:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Resolved-Written Off",
        "disposition": "LOST"
      }
    }
  ]
}
```

***

### Early Resolution via Collaboration

This applies to programs on Mastercard only. A cardholder disputed a $124.50 charge on January 17, 2026. Provisional credit was granted. Mastercard's Collaboration system alerted the merchant, who chose to issue a refund through the network within 3 days. This resolved the dispute quickly without requiring Lithic to escalate to a formal chargeback.

```json
{
  "case_id": "MC11223",
  "token": "a7b8c9d0-e1f2-3456-ghij-567890123456",
  "card_token": "ccddee49-4558-4a79-80ce-339e12cc141c",
  "account_token": "ddd7c408-2bbb-4f63-889a-8a2a2b1601af",
  "network": "MASTERCARD",
  "currency": "USD",
  "status": "CLOSED",
  "disposition": "WON",
  "created": "2026-01-17T10:00:00Z",
  "updated": "2026-01-20T15:30:00Z",
  "merchant": {
    "acceptor_id": "666777888999000",
    "acquiring_institution_id": "666777",
    "descriptor": "RETAIL OUTLET",
    "mcc": "5311",
    "city": "PORTLAND",
    "state": "OR",
    "country": "USA"
  },
  "transaction_series": {
    "type": "DISPUTE",
    "related_transaction_token": "2ca7b880-9dad-11d1-80b4-00c04fd430c8",
    "related_transaction_event_token": "2ca7b881-9dad-11d1-80b4-00c04fd430c8"
  },
  "liability_allocation": {
    "original_amount": 12450,
    "recovered_amount": 12450,
    "written_off_amount": 0,
    "denied_amount": 0,
    "remaining_amount": 0
  },
  "events": [
    {
      "token": "550e8400-e29b-41d4-a716-446655440160",
      "type": "WORKFLOW",
      "created": "2026-01-17T10:00:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "OPENED",
        "reason": "Merchandise Not as Described",
        "amount": 12450,
        "disposition": null
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440161",
      "type": "CARDHOLDER_LIABILITY",
      "created": "2026-01-17T10:30:00Z",
      "data": {
        "action": "PROVISIONAL_CREDIT_GRANTED",
        "amount": 12450,
        "reason": "Provisional Credit"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440162",
      "type": "FINANCIAL",
      "created": "2026-01-20T14:00:00Z",
      "data": {
        "stage": "COLLABORATION",
        "amount": 12450,
        "polarity": "CREDIT"
      }
    },
    {
      "token": "550e8400-e29b-41d4-a716-446655440163",
      "type": "WORKFLOW",
      "created": "2026-01-20T15:30:00Z",
      "data": {
        "stage": "CLAIM",
        "action": "CLOSED",
        "reason": "Resolved-Merchant Collaboration",
        "disposition": "WON"
      }
    }
  ]
}
```

<br />
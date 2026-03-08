# Funding Events

Learn how Lithic collects from your program for customer spend

# Overview

A **Funding Event** represents a collection of settled card transactions over a specified period, resulting in one or more ACH debits to your program's External Bank Account. Each funding event captures what was collected, when, and provides downloadable reports for reconciliation. This information is packaged into the [Funding Events API](https://docs.lithic.com/reference/getfundingevents)

# What Transactions Are Included

Funding events include **approved, financial card transaction events** that have settled through the card networks. Specifically:

* Transactions where the network response was `APPROVE`
* Transactions flagged as financial (i.e., actual money movement, not auth-only)
* Transactions with a non-zero amount

The following are **not** included in funding event collections:

* Disputes and chargebacks
* Interchange fees
* Program fees

In short, funding events cover the gross settled card purchase activity on your program. Debits (cardholder spend) and credits (refunds/reversals) are both captured and netted.

These are the same transactions visible via the [Card Transaction Events API](https://docs.lithic.com/reference/gettransactionevents) — specifically, those with an approved financial status. You can use the transaction event tokens in the Settlement Details report to cross-reference individual transactions against the Card Transaction Events API for full detail.

# Collection Schedule

Collections typically run **three times per day** on banking days. The schedule determines which ACH method is used (Same-Day or Next-Day) and the expected Fed settlement window.

| **Run** | **Time (Eastern)** | **ACH Method** | **Expected Settlement** |
| ------- | ------------------ | -------------- | ----------------------- |
| Run 1   | 12:30 AM ET        | Next-Day ACH   | 8:30 AM ET same day     |
| Run 2   | 8:30 AM ET         | Same-Day ACH   | 1:00 PM ET same day     |
| Run 3   | 10:00 AM ET        | Same-Day ACH   | 1:00 PM ET same day     |

Because collections are driven by a high watermark mechanism (see below), any temporary schedule adjustment is handled automatically — the next collection picks up exactly where the previous one left off, so no transactions are missed or double-counted regardless of timing changes.

Additionally, please note that the exact timing of when debits appear or post in your External Bank Account depends on your financial institution's processing schedule.

On non-banking days, the collections process still runs to generate Funding Events. But the ACH entries are queued for settlement at 8:30 AM ET on the next banking day.

## Fed ACH Settlement Windows (Reference)

These are the standard FedACH processing windows that determine when funds move:

| **Window**        | **File Submission Deadline (ET)** | **Settlement Time (ET)** |
| ----------------- | --------------------------------- | ------------------------ |
| Next-Day          | 2:15 AM                           | 8:30 AM same day         |
| Same-Day Window 1 | 10:30 AM                          | 1:00 PM                  |
| Same-Day Window 2 | 2:45 PM                           | 5:00 PM                  |
| Same-Day Window 3 | 4:45 PM                           | 6:00 PM                  |

For more details on ACH payments, please see [ACH at Lithic](https://docs.lithic.com/docs/ach-overview)

<br />

# Transaction Windows

Each collection run captures transactions that have settled **since the previous collection**. Lithic maintains a high watermark (based on transaction creation time) to ensure:

* Every settled transaction is collected **exactly once**
* No transactions are missed between runs
* No transactions are double-counted

The transaction window for each run spans from the end of the previous collection up to a recent cutoff.

# Funding Event Response Fields

<br />

| **Field**                    | **Description**                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `token`                      | Unique identifier for the funding event                                                   |
| `collection_tokens`          | IDs of the ACH collection(s); look up via the API indicated by `collection_resource_type` |
| `collection_resource_type`   | Which API to query for collection details (e.g., `PAYMENT`)                               |
| `previous_high_watermark`    | Start of the transaction window (exclusive)                                               |
| `high_watermark`             | End of the transaction window                                                             |
| `network_settlement_summary` | Array of settlement amounts broken down by network settlement date                        |
| `created`                    | When the funding event was created                                                        |
| `updated`                    | When the funding event was last updated                                                   |

## Collection Tokens

One or more tokens referencing the ACH entries created for the collection. The `collection_resource_type` field indicates which API to query for details (e.g., PAYMENT maps to the [Payments API](https://docs.lithic.com/reference/searchpayments)).

**Note on split entries**: Same-Day ACH has a per-entry limit of $1,000,000. Collections exceeding this amount are automatically split into multiple ACH entries, resulting in multiple collection tokens within a single funding event.

## High Watermarks

Each funding event exposes `previous_high_watermark` and `high_watermark` timestamps, representing the time window of transactions included in the collection. This can be useful for reconciliation.

## Network Settlement Summary

The `network_settlement_summary` array provides a breakdown of the settled gross amount by network settlement date. This allows you to reconcile which card network settlement dates are covered by each collection.

## Downloadable Reports

Detailed CSV reports for a funding event are available via the [**Get Funding Event Details**](https://docs.lithic.com/reference/getfundingeventdetailsbyid), which returns time-limited pre-signed URLs for two files:

1. **Settlement Summary** - Aggregated view by network settlement date, showing debits, credits, and settled gross amount
2. **Settlement Details** - Transaction-level detail including account token, card token, card program, BIN, merchant information, MCC, and individual settled amounts

# Webhooks

You can also subscribe to [funding event webhooks](https://docs.lithic.com/reference/post_funding-event-created) to be notified when new collections occur.
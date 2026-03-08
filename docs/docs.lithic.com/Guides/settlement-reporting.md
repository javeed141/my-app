# Settlement API

Learn about Lithic's settlement reporting suite

Settlement is the periodic exchange of funds between issuing and acquiring banks, with card networks serving as intermediaries, to finalize transaction volume and associated fees or interchange for a given period.

Lithic's Settlement API provides a distilled view of settlement activity at multiple levels of granularity, enabling customers to reconcile daily cash movements from their settlement accounts against their transaction history, as well as view interchange and network fees.

The Settlement API consists of the following:

* **Settlement Summary**: A daily aggregated view of gross settlement amounts
* **Settlement Details**: A transaction-level breakdown of the Settlement Summary
* **Network Totals**: Official settlement totals as reported directly by the card networks

Please refer to the [API Reference](https://docs.lithic.com/reference/getsettlementdetails) for information about how to use the Settlement API endpoints.

<Callout icon="📘" theme="info">
  The Settlement API is an **Enterprise product** available in production only. Please contact [support@lithic.com](mailto:support@lithic.com) if you are interested in using our settlement reporting.
</Callout>

# Settlement Summary and Details

The Settlement Summary and Settlement Details go hand-in-hand to present gross settlement amounts, itemized at the transaction level and rolled up to a daily basis. They are intended for use in reconciliation and transaction analysis, such as understanding how an individual transaction contributes to the overall settlement.

**What is a "complete" Settlement Summary?**

Settlement Summaries update over time to account for new data delivered by the card networks. When the `is_complete` [flag](https://docs.lithic.com/reference/getsummary) on a Settlement Summary is `false`, additional updates are expected for the given report date. When the `is_complete` flag is `true`, all data for a given report date has been reconciled and is accounted for in the Settlement Summary.

The optimal time to pull settlement data is once daily when you receive the `is_complete` flag set to `true`. This ensures you're retrieving the most comprehensive and finalized dataset for that settlement date.

Settlement Summaries are generally marked complete at a consistent time every day; however, variation in timing may occur due to multiple operational factors, with delays in the network's delivery of settlement reports to Lithic being a primary cause. Such delays are outside Lithic's control and must be addressed by the network. Lithic will declare an incident on the status page if a Settlement Summary is still not marked completed by end of day Eastern time.

If you receive another update for a date that was already marked complete (this can happen occasionally), simply re-pull all the settlement details for that date and replace what you have in your system.

Customers can subscribe to [event webhooks](https://docs.lithic.com/reference/post_settlement-report-updated) to receive updates on their Settlement Summaries.

# Network Totals

Network Totals source official settlement figures directly from network settlement reports. While the Settlement Summary aggregates Settlement Details to obtain its daily totals, idiosyncratic rounding rules used by certain networks can occasionally result in slight differences between these computed totals and the official totals. Customers who manage their own network settlement can consult the Network Totals for the exact figures when facilitating actual cash movements.

**How should Network Totals be interpreted?**

Each card network employs its own settlement strategy and structures its settlement reporting accordingly. Furthermore, each customer has a specific settlement institution hierarchy configured for each partner network, which directly impacts the network's reporting as well. As a result, the Network Totals also reflect each customer's hierarchy and the network involved. Customers will need to determine which Network Total records to use based on their particular institution setup and the guidance below.

Each Network Total record represents a unique combination of settlement service, report date, clearing cycle, and institution ID. Visa, Interlink, and Maestro follow one daily cycle, while Mastercard utilizes six cycles. This means we report Mastercard Network Totals six times as often as for other networks. Additionally, Network Total records are typically returned for all institutions in a hierarchy; some may also overlap in covering the same transaction activity.

Network Totals generally follow these conventions by network:

* For Visa/Interlink: The Network Totals of the parent institution contain the *sum* of the Network Totals of the child institutions, effectively presenting the day's totals precomputed.
* For Mastercard/Maestro: The Network Totals of the parent institution do *not* include the Network Totals of the child institutions. The day's totals must be obtained by summing up the Network Totals across all the institutions.

**What is a "complete" Network Total?**

A Network Total is deemed complete when all corresponding Settlement Details are available in [this endpoint](https://docs.lithic.com/reference/getsettlementdetails). This is reflected in the `is_complete` flag in the Network Total.

Customers can subscribe to event webhooks to receive notifications about [new](https://docs.lithic.com/reference/post_network-total-created) or [modified](https://docs.lithic.com/reference/post_network-total-updated) Network Totals. When `is_complete` in a Network Total transitions from `false` to `true`, an event webhook of type `network_total.updated` will be dispatched.

# Settlement Timing and Terminology

Each network independently defines and manages the settlement process, resulting in different terminology and settlement intervals across networks. The Settlement API standardizes these variations using the terminology below.

### Key Terms

**Report date**: The date the network reports settlement figures in their clearing files. This can fall on any calendar day. Each report includes all reconciled activity since the previous report.

**Settlement date**: The expected date of funds transfer, typically via wire drawdown, which only occurs on banking days.

For transactions processed on banking days, settlement occurs on the same day. For transactions processed on non-banking days, such as over the weekend or on a federal holiday, settlement occurs on the next banking day.

### Report Coverage

The time frame covered in a report is anchored to the report date, and exact cutoffs vary by settlement service within each network. Transactions processed after a cutoff are included in the following report. For instance, a transaction processed after Mastercard's first clearing cycle cutoff will be part of the second clearing cycle, reflected in the Settlement Summary/Details and Network Totals. Please refer to the relevant network settlement manuals for more information.

### Network-Specific Variations

Most networks follow the standard definitions above, with some notable exceptions.

The **Mastercard Dual Message System** uses different terminology:

* The report date is the "reconciliation date" in Mastercard's terminology, aligned with Global Clearing Management System cycles.
* The settlement date is the date Mastercard sends the settlement advisement. The actual funds transfer date, also called the "value date" by Mastercard, is typically that same day but may vary by settlement service.

The **Maestro Single Message System** operates multiple settlement services with different cutoff times. Two are highlighted below:

* Service 000 (Default): Reports are sent on the day of transaction processing, but *after* the settlement cutoff
* Service 007 (US Domestic PIN Debit): Follows standard same-day settlement, meaning reports are sent on the day of transaction processing *before* the cutoff

The timing of Service 000's report delivery causes its activity to carry over to the next settlement window, meaning yesterday's Service 000 activity settles alongside today's Service 007 activity in the same wire. To cohesively display amounts that settle together, the Settlement Summary and Details adjust Service 000's report date forward by one calendar day to align with Service 007. Keep in mind that the Network Totals honor the *exact* settlement figures and dates from the network, so they echo Service 000's report date without the one-day adjustment.

Example of Saturday (Service 000) and Sunday (Service 007) activity settling on a Monday:

1. If a Network Total from Service 000 has a report date of July 12, 2025, then the Settlement Summary and Details show a report date of July 13, 2025 and settlement date of July 14, 2025.
2. A Network Total from Service 007 with a report date of July 13, 2025 corresponds to Settlement Summary and Details also showing report date of July 13, 2025 and settlement date of July 14, 2025.
3. Both of these settle together on July 14, and share a report date of July 13 in the Settlement Summary and Details.

Example of Sunday (Service 000) and Monday (Service 007) activity settling on a Monday:

1. If a Network Total from Service 000 has a report date of July 13, 2025, then the Settlement Summary and Details show report and settlement dates of July 14, 2025.
2. A Network Total from Service 007 with a report date of July 14, 2025 corresponds to Settlement Summary and Details also showing report and settlement dates of July 14, 2025.
3. Both of these settle together on July 14, and share a report date of July 14 in the Settlement Summary and Details.

# Enumerations

## Network Enumerations

| Name       |
| ---------- |
| INTERLINK  |
| MAESTRO    |
| MASTERCARD |
| UNKNOWN    |
| VISA       |

## Type Enumerations

| Name           | Description                                                                                                                                                                                |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CLEARING       | Dual Message System transaction settlement                                                                                                                                                 |
| FINANCIAL      | Single Message System transaction settlement                                                                                                                                               |
| NON\_FINANCIAL | Single Message System message. These messages do not have a `transactions_gross_amount` but can have `interchange_gross_amount`. A common example is a card balance check.                 |
| ADJUSTMENT     | Adjustment issued by the network to correct a transaction, interchange, fee, or other amount                                                                                               |
| COLLABORATION  | An early resolution process (primarily Mastercard) that alerts merchants to new disputes before a chargeback is filed, allowing them to issue a credit to preempt the chargeback           |
| CHARGEBACK     | The issuer formally disputes a transaction with the card network and requests funds back from the merchant. Results in a credit to the issuer                                              |
| REPRESENTMENT  | The merchant challenges the chargeback by providing evidence that the original transaction was valid. Results in a debit to the issuer (funds reversed back to merchant)                   |
| PREARBITRATION | A second dispute attempt after representment, where either party can challenge the outcome before escalating to arbitration. The party who forfeits at this stage pays the disputed amount |
| ARBITRATION    | The card network makes a final binding decision on the dispute when the parties cannot resolve it themselves. The losing party pays the disputed amount                                    |
| FEE            | Fee collected by the network at the ICA/FTSRE level                                                                                                                                        |

## Fee Type Enumerations

| Name | Description                                                                           |
| :--- | :------------------------------------------------------------------------------------ |
| ISA  | International Service Assessment (ISA) fees for cross-border transactions (Visa only) |
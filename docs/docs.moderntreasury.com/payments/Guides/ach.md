# ACH

Automated Clearing House, commonly referred to as ACH, transfers are bank to bank transfers that are processed by the Automated Clearing House.  These payments can include bill payments, person to person payments, direct deposits, and fund transfers.

## Completion Timing For Originated ACH Payments

| ACH Priority and Direction | Settlement Time | Example Timeline                                                                                                                                                                           |
| :------------------------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Same Day ACH Credit        | Same day        | If you send a same day ACH Credit before the last batch on Monday, your payment order will complete on Monday.  The counterparty will receive funds Monday evening.                        |
| Same Day ACH Debit         | 2 banking days  | If you send a same day ACH Debit before the last batch on Monday, your payment order will complete on Wednesday.  Your Internal Account's available balance will be credited on Wednesday. |
| Next Day ACH Credit        | 1 banking day   | If you send a next day ACH Credit before the last batch on Monday, your payment order will complete on Tuesday.  The counterparty will receive funds Tuesday.                              |
| Next Day ACH Debit         | 3 banking days  | If you send a next day ACH Debit before the last batch on Monday, your payment order will complete on Thursday.  Your Internal Account's available balance will be credited on Thursday.   |

<br />

# Cutoffs for Originated ACH Payments

| ACH Priority | Intermediate Batch Timings (EST) | Last Batch (EST) |
| :----------- | :------------------------------- | :--------------- |
| Same Day ACH | 8:50, 9:40, 12:50, 13:40, 14:50  | 15:40            |
| Next Day ACH | 17:20                            | 18:10            |

<Callout icon="📘" theme="info">
  If you are using [bring your own bank](https://docs.moderntreasury.com/payments/docs/internal-accounts-overview), settlement timing and cutoffs will be dependent on your banking partner and may vary from the above.
</Callout>
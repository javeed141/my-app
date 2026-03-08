# Reversal Webhooks

As reversals progress through their lifecycle, Modern Treasury will send webhooks to convey their latest statuses. The message body will include both an event and a data representation of the reversal. When there is an error, it will also be included. See the [status codes section](https://docs.moderntreasury.com/platform/reference/status-codes) for additional details on how errors are presented.

These are the events you may receive:

| Event                  | Description                                                                                  |
| :--------------------- | :------------------------------------------------------------------------------------------- |
| **created**            | A reversal has been created.                                                                 |
| **begin\_processing**  | A reversal has begun processing. Payment orders will no longer be editable after this point. |
| **finish\_processing** | A reversal has finished processing and been sent to the bank.                                |
| **completed**          | A reversal has been reconciled with a posted transaction.                                    |
| **failed**             | A reversal has been rejected by the bank.                                                    |
| **returned**           | A reversal has been returned.                                                                |
| **unreconciled**       | A reversal has been unreconciled from a transaction.                                         |

These are the statuses a reversal may have:

| Status         | Description                                                                                                                  |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **pending**    | This is the initial state for a new reversal.                                                                                |
| **processing** | This is a very short state where Modern Treasury is preparing the reversal to be sent to the bank.                           |
| **sent**       | The reversal has been sent to the bank. It may remain in this state for up to a few days, depending on the type of reversal. |
| **completed**  | The reversal has been reconciled to a posted bank transaction. At this point, we know the reversal was successful.           |
| **failed**     | This status may happen if the reversal is rejected by the bank or if there is an error at the bank.                          |
| **returned**   | A reversal has been returned.                                                                                                |
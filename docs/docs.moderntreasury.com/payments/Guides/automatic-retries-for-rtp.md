# Automatic Retries for RTP

Real-Time Payment requests will be automatically retried for certain errors that Modern Treasury has identified as temporary. The payment order being retried will remain in processing until one of the following conditions is met:

* The payment succeeds.
* A non retry able error is encountered.
* The maximum number of retries is reached.
* **The bank's servers remain unavailable (i.e., experiencing downtime) for more than 10 minutes after the first retry attempt, at which point the payment will automatically fail.**

### Retry Timeline

Modern Treasury will retry failed requests up to 25 times, spaced out over the course of just under 4 days. The table below shows a partial timeline of retry attempts (intermediate attempts omitted).

| Retry attempts | Delay      | Total time elapsed |
| :------------- | :--------- | :----------------- |
| 1              | 0h 1m 0s   | 0h 1m 0s           |
| 5              | 0h 25m 0s  | 0h 55m 0s          |
| 10             | 1h 40m 0s  | 6h 25m 0s          |
| 15             | 3h 45m 0s  | 20h 40m 0s         |
| 20             | 6h 40m 0s  | 47h 50m 0s         |
| 25             | 10h 25m 0s | 92h 5m 0s          |

> If a payment encounters a retry able error **that is not caused by bank server downtime**, it will continue retrying according to the schedule above.

### Handling Bank Server Downtime

If a bank's servers are **unavailable (down) for more than 10 minutes from the start of processing**, Modern Treasury will **automatically fail the RTP payment** instead of continuing to retry. This applies only to **RTP payments** where bank server errors (such as outages or unresponsiveness) prevent the payment from being processed.

When this happens, the payment order will fail with the following reason:

> This payment order failed due to a server error at \{Bank Name}. The maximum number of retries has been reached. Please try again later.

Customers should retry the payment at a later time once the bank’s systems are operational.
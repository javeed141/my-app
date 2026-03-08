# Rate Limits

Our default rate limit is 100 requests per second in Production. In Sandbox, the default rate limit is 25 requests per second. This is cumulatively processed across all API keys and all requests to non-List endpoints in your account.

Requests to List endpoints have a stricter rate limit of 20 requests per second in Production, and 5 requests per second in Sandbox, which applies cumulatively to all List endpoints across all API keys.

If a rate limit is exceeded, a `429` status code will be returned to indicate that you have hit the rate limit.

You may experience the rate limit if you are:

* parallelizing requests across services
* running API calls in large batches at one time
* experiencing high inbound webhook load leading directly to API actions.

We recommend building processes that thoughtfully consider the rate limit as an upper bound across your services. Please read the recommendations below to help design a robust integration against Modern Treasury.

## Rate Limit versus Concurrency Limit

**A general note:** Our 100 requests per second rate limit is a # of requests per time interval limit rather than a concurrency limit. You can send 100 requests within the current second but are not limited by concurrency.

For example, if some requests take longer than 1 second to process, you may have more than 100 requests active concurrently, but you will still adhere to 100 requests per second.

## Rate limiting special cases

#### Stress Testing the Sandbox

We do not recommend running load tests against our application in the sandbox. Performance and behavior are not going to accurately model what happens in the live mode environment due to mocking and "sandbox" magic which differs from that in live mode.

#### List Operations

We restrict List operations across all endpoints to 20 requests per second. It is recommended to utilize our Get operations for querying specific objects, this can be enabled by storing Modern Treasury ID's as part of your integration. We also enable utilizing External ID's across our high volume Ledgers Objects such as Ledger Transactions and Ledger Accounts.

To power analytical workloads we recommend utilizing our Push to Warehouse integration.

#### Synchronous Ledger Entries

In addition to these standard rate limits, we also rate limit synchronous Ledger Entries at a rate of 20 Ledger Entries per Ledger Account per second.  We rate limit synchronous Ledger Entries because they require a lock on the associated Ledger Account and must be processed serially.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) details on synchronous Ledger Entries and how to avoid this limitation in your API calls.

#### Bulk Requests

Creating [Bulk Requests](bulk-requests) is rate limited at 1 request per second irrespective of the `resource_type`, `action_type` or the number of `resources` in the request payload. This rate limit does not impact the default rate limit for other API requests.

## Handling Parallelized API Requests

You may breach the rate limit if you are running large, parallelized API batches to Modern Treasury or if you have many places in your application or internal system hitting the API concurrently. Here are some considerations for these cases.

### Custom retry logic

As standard practice, you should build retry logic. If you receive a status of `429` for "Too Many Requests", retry the request with [jittered exponential backoff](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/). This classic solution is powerful and can be used hand-in-hand with any of the following strategies. Make sure you utilize [Idempotency Keys](https://docs.moderntreasury.com/reference/idempotent-requests) in your requests.

### Staggering API calls

You may prefer to hit the API in batches, either during a backfill or at some scheduled cadence. In this set-up, you can enable a static throttling process in which you execute requests with delayed batching logic, where each 100 call "batch" is separated by a delay (sleep(), setTimeout(), etc.). To be safe, you can reduce the "batch" size, i.e. after every 80 requests, introduce a 1 second delay.

Note that if you are concurrently powering other processes while the batch is running, you will need to take those parallel API calls into account. We provide both `X-Rate-Limit-Limit` and `X-Rate-Limit-Remaining` in the headers of API responses to provide your global active rate limit stats. These enable you to set up a dynamic throttling process, where you might pause an API job when the `X-Rate-Limit-Remaining` hits 0.

### Locking

Another option is to set up an atomic thread counter to create a locking mechanism that prevents your internal system from surpassing a defined initiated thread-per-second threshold. This can be implemented with with the staggering API calls approach or used independently.

Within a one second interval, each initiated thread asynchronously increments the counter. Execute a new thread only if the counter is less than the limit (i.e. 80). New threads (API calls) greater than the limit cannot be initiated until after the counter is flushed and will need to be retried or added to a queue for later execution.

### Queueing

A strong solution is to pipe your system events into a queue to be processed more controllably with better auditing. You can direct these actions to a queueing service like [Amazon SQS](https://aws.amazon.com/sqs/) or [Apache Kafka](https://kafka.apache.org/) and then consume those messages in batches at any desired polling interval and deliver API requests to Modern Treasury.

## Handling High Webhook Load

Depending on your use-case with Modern Treasury, you may occasionally receive webhook bursts. This most often occurs for our Payments users in situations like these:

* At a bank cutoff, when generating instructions to the bank, Modern Treasury will transmit `payment_order.begin_processing` and immediately `payment_order.finish_processing` for each approved Payment Order being transmitted on your behalf
* We typically receive transaction reporting from bank partners in the morning. This results in transmitting webhook events like `transaction.created` and `transaction.reconciled` and `payment_order.completed`, respectively.

You may have API activity or internal activity resulting from these webhook events. To better control this throughput, here are some recommendations.

### Queueing

You can pipe received webhook events into a queue to manage inbound events from Modern Treasury controllably. As described in the **Queueing** section above, this setup streamlines high volume spikes.

### Webhook Throttling

If you continue to experience consistent bursts of high traffic realtime webhooks, please reach out to [support@moderntreasury.com](mailto:support@moderntreasury.com). We can discuss batching outbound webhook traffic to your endpoints.
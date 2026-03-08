# Configure your API client for Performance & Reliability

This document describes some of the recommended practices that will improve the reliability of API clients.

### Use Idempotent Requests

The Modern Treasury API supports [Idempotent Requests](https://docs.moderntreasury.com/platform/reference/idempotent-requests) to prevent accidental duplication of API calls. This feature is particularly useful when initiating actions such as money transfers, entity creation, or resource modifications. For instance, if a network error outside of our control occurs while creating a Payment Order, you can safely retry the request using the same idempotency key to ensure that only one payment order is created.

### Build Retry Policies

We recommend building custom policies to retry requests that fail due to transient issues either due to rate limits (`429`s) or non-terminal server-side errors (`500`, `502`, `503`, `504`). We've outlined additional guidance in our [Rate Limit](https://docs.moderntreasury.com/platform/reference/rate-limits) section.

### Set a Request Timeout

Our API servers use a timeout of 60s and will fail if our application takes longer than 60s to return a response. It is safe for API clients to use the same timeout.

You may require a shorter client-side timeout due to your application's requirements. If an API request incurs your client-side timeout, you should retry the request with the same idempotency key.

### Use HTTP/2 and TLS 1.3

HTTP/2 and TLS 1.3 promise several performance and reliability benefits. If available, choose an API client that supports both HTTP/2 and TLS 1.3.

Unfortunately, several popular HTTP clients have yet to introduce native support for HTTP/2. We expect this to become more widely available over the next few years.

Here is an example for the [`HttpClient` in JDK 20 ](https://docs.oracle.com/en/java/javase/20/docs/api/java.net.http/java/net/http/HttpClient.html):

```Text Java
HttpClient client = HttpClient.newBuilder()
    .version(Version.HTTP_2)
    .build();
```

### HTTP/1.1: Use Persistent Connections

Each new encrypted TCP connection incurs some overhead. Creating many of these in a tight loop can consume valuable resources, lock threads, and cause timeouts. If you are using HTTP/1.1, we recommend adopting a mature connection pool and using [HTTP Keep-Alive](https://hpbn.co/http1x/#benefits-of-keepalive-connections) to reuse persistent connections. This improves connection reliability and decreases latency. Some clients *e.g.* Java's `HttpClient`and Python's `urllib3` and `httpx` have built-in connection pools and already use them by default.

### Use Connection Pools with a Keep-Alive or Idle Timeout

We recommend that API clients configure connection pools to use a keep-alive timeout (a.k.a. *idle timeout*) of between 2s and 340s. This is because AWS Global Accelerator uses an [idle timeout of 340s](https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html). Applicable to both HTTP/1.1 and HTTP/2.

The relevant configuration parameters for some common languages and frameworks are listed below:

* [Akka](https://doc.akka.io/docs/akka-http/current/common/timeouts.html#client-pool-timeouts): `akka.http.host-connection-pool.keep-alive-timeout`
  * This defaults to `infinite`, which will cause connection errors due to a race condition that is described in Akka's documentation.
* [Ruby](https://ruby-doc.org/3.2.2/stdlibs/net/Net/HTTP.html#attribute-i-keep_alive_timeout): `keep_alive_timeout`
  * This defaults to 2 seconds, which works well.
* [Java](https://docs.oracle.com/en/java/javase/17/core/java-networking.html#GUID-86B96A42-74FE-4E7D-8E60-D64A03862083): `jdk.httpclient.keepalive.timeout`
  * Older JDKs use a default of 20 minutes, which will cause connection errors.
  * JDK 20 and above use a default of 30 seconds, which works well.
* [Python](https://www.python-httpx.org/advanced/#pool-limit-configuration): `keepalive_expiry`
  * This defaults to 5 seconds in httpx, which works well.
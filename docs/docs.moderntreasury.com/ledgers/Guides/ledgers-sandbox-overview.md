# Ledgers Sandbox Overview

Modern Treasury has a fully functional Sandbox environment that allows customers to test their payment flows in a simulated environment before moving to Production. Many Modern Treasury objects have a `live_mode` field that will be `true` if they are production or live objects or `false` if they are Sandbox objects.

In general, Ledgers sandbox differs very little from production. Some noticeable differences:

1. Where Ledger objects are dependent on objects within Payments, they payment object is subject to [the Sandbox Payments behavior](https://docs.moderntreasury.com/payments/docs/payments-sandbox-overview).
2. Sandboxes have lower limits on requests per second.
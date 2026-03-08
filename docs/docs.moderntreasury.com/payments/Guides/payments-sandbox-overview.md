# Building in Sandbox

Modern Treasury has a fully functional Sandbox environment that allows customers to test their payment flows in a simulated environment before moving to Production. Most Modern Treasury objects have a `live_mode` field is `true` for Production objects and `false` for Sandbox objects.

Payments in the Sandbox do not correspond to actual money movement. In this section you can learn about the different options for simulating workflows, including exceptions.

> 🚧 Sandbox timings vary from production.
>
> In order to make development and testing more efficient, unless otherwise stated Sandbox behavior may behave different from real-life. For example, rather than wait a day for an ACH payment to settle, the Sandbox will settle the Payment Order within seconds allowing for an end-to-end reconciliation workflow in seconds rather than hours to days.
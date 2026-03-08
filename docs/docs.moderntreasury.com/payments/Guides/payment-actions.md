# Using Payment Actions

> 📘 Early Access Feature
>
> Payment Actions is currently an Early Access feature. Please reach out to [product@moderntreasury.com](mailto:product@moderntreasury.com) or your customer success manager for access.

## Overview

Payment Actions represent actions or instructions that should be taken regarding an existing payment that is distinct from the payment initiation instruction, which can be issued for payments originated via Modern Treasury or off-platform.

Modern Treasury supports two types of Payment Actions for checks: Positive Pay and Stop Pay, which are primarily used as a mechanism for preventing fraud. These two actions allow you to inform your bank to authorize or stop check payments, respectively.

More information on how and why Positive Pay works can be found here: [https://www.moderntreasury.com/journal/how-to-avoid-check-fraud-with-positive-pay](https://www.moderntreasury.com/journal/how-to-avoid-check-fraud-with-positive-pay).

Modern Treasury supports automated Positive Pay at select banks, but Payment Actions extends this functionality by allowing you to send Positive Pay when automatic Positive Pay is not supported or checks are originated off platform.

In order to use Payment Actions, either [integrate using our API](https://docs.moderntreasury.com/platform/reference/payment-actions) or access Payment Actions in the Dashboard.
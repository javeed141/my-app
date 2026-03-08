# Spend Limits

> ❗️ Spend Limits have been superseded by [Authorization Rules](doc:authorization-rules-v2#/velocity-limit-rules)!
>
> For all spend velocity use-cases, Authorization Rules offer superior efficiency, customizability, and visibility into performance. New programs should implement Velocity Limit Authorization Rules (rather than Spend Limits) to control cardholder spend.

Lithic's Card and Account Spend Limits provide basic controls that help customers manage spend velocity. Lithic's Authorization system declines authorizations exceeding the configured limits, while still allowing refunds and credits to process normally.

<Callout icon="⚠️" theme="warn">
  While spend limits track authorized and settled transaction volumes, they are not designed for precise balance tracking or reconciliation-level accuracy. Spend velocity calculation may not include transactions from the past several seconds, potentially allowing approvals that exceed configured limits. For balance management, please refer to our [balances](https://docs.lithic.com/docs/balances) product or contact [support@lithic.com](mailto:support@lithic.com) for assistance.
</Callout>

### Setting Spend Limits

> ⚠️ Account spend limits are being phased out
>
> For customers onboarded after 2/1/2026, no default account limits are set. To configure a default account velocity limit, deploy a program-wide [Velocity Limit Authorization Rule](https://docs.lithic.com/docs/authorization-rules-v2#velocity-limit-rules).

Card and Account Spend Limits can be set via Lithic’s API. For non-ASA customers onboarded before 2/1/2026, we configure default account limits on account creation - $1,250 per day and $5,000 per month. For ASA customers, we do not configure any default limits.

Cards support a single `spend_limit`with `spend_limit_duration` of `ANNUALLY`, `FOREVER`, `MONTHLY`, or `TRANSACTION`. Accounts support multiple concurrent spend limits: daily, monthly, and lifetime. In all cases, a spend limit of `0` means that no spend limit is enforced.

Spend limits are *rolling* limits, not calendar based limits:

* Daily limits look back 24 hours from the time of authorization
* *For cards*, monthly limits look back \~25 days (a calendar month with a padding factor of 6 days)
  *For accounts*, monthly limits look back 30 days
* Annual limits look back 1 year

### Get Available Spend Limits

Lithic provides an API to get the currently configured spend limit as well as the amount available to spend at any time [here](https://docs.lithic.com/reference/getcardspendlimits) for cards and [here](https://docs.lithic.com/reference/getaccountspendlimits) for accounts.

### Force Posted Charges

Spend limits cannot block force posted charges (i.e., when a merchant sends a clearing message without a prior authorization - see [here](https://docs.lithic.com/docs/transaction-flow#7-clearing) for more detail.

Additionally, merchants may send an authorization for one amount before later clearing for a larger amount. Similar to force-posted charges, spend limits are not able to prevent this scenario.

As an example, for a cardholder with a spend limit of $100 remaining for a given period, a merchant may send an authorization for $90 (which would not be blocked because it is within the remaining spend limit) and subsequently clear for $110. Spend limits are not able to prevent this discrepancy.

### Credits

Lithic's rolling spend limits are intended to control a card's spend velocity (the rate at which funds are *spent* on a given card or account) and are not recommended to be used for balance or reconciliation-level accuracy. For balance tracking, please see our [balances](https://docs.lithic.com/docs/balances) product for more detail. Because of this, for all non-lifetime spend limit durations, credits are not factored into the spend limit calculation in any way. Credits will not "reduce" the accumulated spend to enable further spend.

As an example, for a card with a monthly spend limit of $1000:

> Day 1: Purchase of $900 - Approved
>
> Day 5: Refund of purchase from day 1, -$900 - Cleared
>
> Day 10: Purchase of $900 - Declined

The refund (credit) processed on Day 5 does not reduce the card's rolling monthly spend limit. Non-lifetime spend limits only track the rate at which funds are spent, so the $900 purchase on day 10 is declined because it exceeds the remaining available monthly spend limit of $100.

For lifetime (`FOREVER`) limits, cleared credits will be factored into the spend limit calculation and increase the available spend limit.
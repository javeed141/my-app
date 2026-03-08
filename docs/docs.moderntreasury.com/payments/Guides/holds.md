# Managing bank holds on payments

<br />

<Callout icon="🚧" theme="warn">
  Leveraging this feature will result in Payment Orders entering the `held` state, which is only used for manual holds you initiate on Bring your own Bank connections.
</Callout>

# Holds on Payment Orders

Banks may sometimes put your Payment Orders on hold for regulatory, compliance, or risk-related reasons. Common reasons include funding verification, fraud checks, sanctions reviews, or other compliance screenings that must happen before money can flow. In these cases, the bank will likely ask for additional information or documents to justify or explain the intention of the payment.

In Modern Treasury, you can move any Payment Order that has been sent to `held` status to inform internal teams and your end users that the payment has been stopped in transit. **Note that managing holds in Modern Treasury has no impact on the movement of funds, it is purely for reporting and visibility purposes.**

Due to the sensitive nature of these inquiries, banks will not directly inform Modern Treasury of these holds. That means it’s up to you to let us know when your bank tells you about a hold.

For a payment you've moved to held, there are two ways the hold can be resolved:

1. Modern Treasury will automatically update the payment status if we receive a signal from the bank (such as a transaction, failure notification, reversal, or return). In these cases, no action is needed from you.
2. You can manually resolve a hold on a payment, which will update the payment status to reflect the status it had prior to being marked as held. This is useful in two scenarios:
   1. If the payment was in a terminal status (e.g. `completed` or `failed`) before being marked as held, Modern Treasury may not receive a subsequent signal from your bank to know how to resolve the Hold. An example of this would be a Payment Order held by the RDFI which is successfully resolved (`completed` > `held` > `completed`).
   2. If you have confirmation from the bank that the hold has been resolved and want to reflect this on the Payment Order immediately, before any subsequent signal in received by Modern Treasury.

# Managing Holds

## Via Dashboard

On the **Payment Order details page**, you can manually add or resolve a hold.

See [Mark as Held](https://docs.moderntreasury.com/payments/docs/mark-as-held) and [Mark as Resolved](https://docs.moderntreasury.com/payments/docs/mark-as-resolved).

## Via API

You can programmatically manage holds via the [Holds API](https://docs.moderntreasury.com/platform/reference/holds). Your request should include the `id` of the payment order that’s on hold. You can both flag holds or mark an existing one as resolved.

<br />
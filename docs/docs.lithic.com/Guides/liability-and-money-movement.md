# Liability and Money Movement

Understand how liability moves and when money changes hands throughout the dispute lifecycle.

Throughout a dispute's lifecycle, liability shifts between three parties: the cardholder, your program (the issuer), and the merchant's acquirer. The party that bears liability is financially responsible for the transaction.

**The Cardholder** initiated the original transaction and now disputes it. Initially, they bear the full liability because the transaction has posted to their account and they owe that amount. Through the dispute process, liability may shift off the cardholder (via provisional credit) and potentially back on (if the dispute is denied).

**The Issuer (Your Program)** issued the card and maintains the cardholder relationship. When you grant a provisional credit, you temporarily assume liability for the disputed amount. If the dispute succeeds via chargeback, liability shifts to the acquirer and you recover those funds. If you lose the dispute on a subsequent representment or in later stages such as arbitration, you must decide whether to write off the amount (your program takes the loss) or deny it (liability goes back to the cardholder).

**The Merchant's Acquirer** processed the original transaction and received funds from that transaction. When a chargeback is filed, they lose those funds as liability shifts to them. They can contest this and shift liability back by submitting a representment, thus reclaiming these funds.

Liability transfers between your program and the cardholder, and between your program and the merchant's acquirer, using different mechanisms described below.

## Provisional Credits

A provisional credit is a temporary reversal of the disputed transaction that provides immediate relief to the cardholder while the dispute is investigated. Your program credits the cardholder's account for the disputed amount, effectively removing that liability from them and assuming it yourself. This provides an optimal customer experience by protecting the cardholder from any associated financial loss while their dispute is underway.

Provisional credits are ultimately reversed or finalized depending on the dispute outcome:

* A provisional credit is **reversed** if the cardholder is ultimately ruled to be liable for the original transaction. This is the appropriate outcome when evidence shows the transaction was valid, or the transaction no longer meets dispute eligibility requirements (such as passing the timeframe for filing a dispute). Your program debits the cardholder's account, transferring liability back to the cardholder.
* A provisional credit is **finalized** if the cardholder wins the dispute (i.e. Lithic has successfully recovered the funds from the merchant's acquirer), or if the cardholder loses the dispute but Lithic writes off the credit according to your configured thresholds. With a write-off, your program chooses to absorb the loss rather than charge it back to the cardholder. This can be done out of goodwill to maintain the customer relationship.

**How is a provisional credit granted?**

It depends on your program. If your cardholders maintain account balances using their own funds, a provisional credit could be a simple credit to the account (e.g. +$20 into the cardholder's account). If your cardholders borrow from a line of credit, they may see the disputed transaction and any interest accrued on it temporarily removed from their statement, reducing their outstanding balance owed.

**How is it reversed?**

It also depends on your program. If the cardholder received a simple credit into their account, they would receive an offsetting debit (e.g. -$20 from their account). If the disputed transaction was removed from the cardholder's statement, it would be added back along with any accrued interest, increasing their outstanding balance.

Details about the specific accounting entries applicable to your program will be shared as you onboard with Lithic's Managed Disputes solution.

## Financial Events

Dispute financial events transfer liability between issuer and acquirer through the card network's settlement process. These events imply real financial impact, as cash moves between bank accounts.

Financial events occur at multiple stages throughout the dispute lifecycle. The network determines what transfer should occur based on the outcome of each stage.

A **credit** financial event occurs when liability transfers to the acquirer. The network debits the acquirer's settlement account and credits your settlement account. This is when you recover funds, such as upon chargeback filing or an arbitration win.

A **debit** financial event occurs when liability transfers to the issuer (your program). The network debits your settlement account and credits the acquirer's settlement account. You lose the funds you previously recovered, such as upon representment or an arbitration loss.

Let's look at an example. Suppose the network accepts your chargeback for $300. It will record a credit financial line item of $300 to your program in its clearing and settlement reports, which you can access through Lithic's [settlement reporting suite](https://docs.lithic.com/docs/settlement-reporting). Moments later, the network processes a representment for $250. It will record a debit financial line item of $250 to your program.

**How does the money actually move?**

As part of the daily settlement process, the network nets out your dispute activity against all other activity on your program, such as regular card transactions, interchange, and fees. The network then uses a wire transfer to pull the net amount from, or deposit this net amount into, your bank's settlement account, depending on whether your program owes or is owed funds. If you manage your own network settlement, this singular cash movement occurs between the network and your bank, outside of Lithic’s purview. All subsequent handling of the funds post-settlement occur between you and your bank, also outside of Lithic’s purview.

Continuing the example above, if your program’s activity for a given day is $1000 in purchases, a $300 chargeback, a $250 representment, and $10 in interchange, you will see $940 ($1000 - $300 + $250 - $10) pulled from your bank account.

Keep in mind that dispute financial events are separate from provisional credits, which concern only your program and your cardholders and do not involve the network.

## Shared Liability

Not all disputes result in 100% wins or losses; sometimes liability is split between parties. This typically happens at arbitration when the network determines both parties are responsible (a split ruling), or during pre-arbitration when one party accepts partial responsibility.

For example, a dispute might involve a $100 online purchase where representment shows the merchant delivered some but not all items. Your program might reverse $60 of provisional credit in recognition of the merchant's partial delivery and recover $40 via arbitration for the undelivered items. The resulting state is:

* The cardholder keeps $40 of the initial provisional credit, but is liable for the remaining $60
* Your program is not liable for any part of the transaction
* The merchant's acquirer is liable for the $40 of goods not delivered

Alternatively, if your program writes off $60 in provisional credit:

* The cardholder keeps the full $100 provisional credit and is not liable for any part of the transaction
* Your program is liable for $60
* The merchant's acquirer is liable for $40
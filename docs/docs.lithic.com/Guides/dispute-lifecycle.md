# Dispute Lifecycle

Learn how disputes progress from initial filing to resolution.

A dispute can progress through several distinct stages as it moves through the dispute resolution process. Understanding these stages helps you set proper expectations with cardholders and anticipate the events you'll see in the API and webhooks.

## The Stages

**Claim**: The dispute begins when the cardholder reports the issue, and you submit it through the Lithic dashboard or our customer support agents submit on your behalf. Lithic's decision engine evaluates chargeback eligibility, applies write-off thresholds configured for your program, and determines the appropriate resolution route. A Lithic agent may also review specific details. If the dispute is valid, provisional credit is typically granted to the cardholder while the dispute is investigated. If the dispute doesn't meet filing requirements or lacks sufficient evidence, it may be denied at this stage without ever reaching the network.

**Chargeback**: If the dispute is deemed eligible, Lithic files a chargeback with the card network. This formally transfers liability from your program to the merchant's acquirer. The chargeback includes a reason code that identifies the nature of the dispute and any required supporting documentation. The network processes the chargeback and debits funds from the acquirer, crediting your program. This is the first "financial event" where money actually changes hands between issuer and acquirer. The acquirer may choose not to contest the chargeback, in which case the dispute ends at this stage and the cardholder is made whole.

**Representment**: The acquirer may contest the chargeback on the merchant's behalf by filing a representment. This is their opportunity to provide counter-evidence showing the transaction was valid. Common representment evidence includes proof of delivery, signed receipts, terms and conditions the cardholder agreed to, or documentation of merchant attempts to resolve the issue. When a representment occurs, Lithic agents will review the representment evidence and proceed with pre-arbitration if we determine the provided evidence is inadequate to reverse the chargeback. Liability shifts back to your program and you are debited the funds unless you proceed to prearbitration.

**Pre-arbitration**: After representment, you have the option to escalate the dispute to pre-arbitration. This is an attempt to resolve the dispute before formal arbitration. Both parties can present additional evidence, and one party may accept liability at this stage. Note that Visa uses its own terminology and processes (called "Collaboration" and "Allocation") that serve similar purposes but operate differently.

**Arbitration**: If pre-arbitration doesn't resolve the dispute, either party can escalate to arbitration. The card network makes a binding decision about who bears liability. Arbitration has associated fees and may result in split liability where both parties share the loss. The network's decision is final at this last stage.

## Timeline

Disputes typically take 45-90 days from initiation to resolution, though complex cases involving arbitration can take 120-180 days. Card networks impose strict timeframe requirements at each stage:

* Chargebacks must typically be filed within 120 days of the transaction
* Acquirers have 30-45 days to respond to chargebacks
* Pre-arbitration and arbitration each have their own deadlines, usually 10-45 days depending on the network

Lithic manages all these deadlines on your behalf, ensuring your program remains compliant with network requirements.

## Network-Specific Differences

While all card networks support chargebacks and representments, there are important differences in how they handle the dispute lifecycle:

**Visa** uses two main dispute workflows called "Allocation" and "Collaboration." Allocation applies to fraud and authorization disputes and attempts to automatically determine liability based on transaction data and network rules. Collaboration applies to consumer disputes and processing errors, and works more like Mastercard's process. Visa does not use a separate pre-arbitration stage; disputes move directly from representment to arbitration if needed.

**Mastercard** follows the traditional chargeback, representment, pre-arbitration, and arbitration flow described above. They also offer a "Collaboration" mechanism that enables merchants to settle the dispute proactively, before formal chargeback filing. If a merchant responds to a Collaboration request with a refund, the dispute may be resolved without a chargeback.
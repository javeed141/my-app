# Filing Disputes

Learn how to file disputes in Lithic's dashboard.

## Initiate a Dispute

### Information You'll Need

Before submitting a dispute, gather the following from the cardholder:

**Transaction Details**:

* The specific transaction being disputed (date, merchant, amount)
* Whether the entire amount is disputed or only a portion
* The cardholder's account number and card details

**Dispute Reason**:

* The nature of the issue (fraud, goods not received, goods not as described, duplicate charge, etc.)
* Clear explanation of what happened
* When the cardholder first became aware of the issue

**Supporting Documentation**:

* For fraud: Police report (if filed), statement that card is in cardholder's possession
* For goods not received: Expected delivery date, tracking info, merchant correspondence
* For goods not as described: Photos, product descriptions, merchant's listing
* For cancelled services: Cancellation confirmation, merchant policy
* For duplicate charges: Both transaction receipts or statements
* For incorrect amounts: Receipt showing correct amount

**Cardholder Contact Information**:

* Current mailing address (required for network correspondence)
* Email address (for status updates)
* Phone number

### Submitting in the Dashboard

1. Click on the **Accountholder's name** to access their account page
2. Navigate to **Disputes → Initiate Dispute**
3. Answer the questions based on the dispute reason
4. Click **Continue**
5. Search for the transaction (if disputing multiple transactions, search within a timeframe)
6. Complete the dispute intake by answering the remaining questions
7. Upload any supporting documentation (PDF, JPEG, PNG, TIFF formats accepted, up to 45MB per file)
8. Review all information for accuracy
9. Click **Submit**

**Note**: The dispute submission process follows the same steps in both Sandbox and Production environments.

### What Happens After Submission

Once you submit a dispute, Lithic's system begins processing:

**0-5 days**: The dispute decision engine reviews the submission and determines:

* Chargeback eligibility based on network rules and timeframes
* Write-off decision based on configured thresholds
* Whether automated recovery is possible
* If manual review by Lithic investigators is required

**Provisional Credit**: Based on your program's configuration and regulatory requirements (Reg E or Reg Z), Lithic will grant provisional credit if appropriate. You'll see this reflected in the dispute events.

**Filing with Network**: If the dispute is eligible based on card network requirements, Lithic files the chargeback with the network.

**Denial**: If the dispute doesn't satisfy network requirements for eligibility, Lithic denies it.

## Lithic Staffing

If you prefer not to manage dispute intake yourself, Lithic can provide dedicated agents to handle this process on your behalf.

### What Lithic Staffing Provides

Our agents will:

* Field incoming cardholder calls or emails reporting disputes
* Ask necessary questions to understand the issue
* Request and collect required supporting documentation
* Submit complete disputes through the dashboard
* Communicate initial status back to cardholders

### When to Consider Lithic Staffing

This option is ideal if:

* You want to minimize training requirements for your customer service team
* Your dispute volume doesn't justify dedicated internal resources
* You want to ensure consistent, high-quality dispute intake
* You prefer to focus your team on other aspects of the cardholder relationship

Contact your Lithic customer success manager to discuss staffing options and pricing.

## Testing in Sandbox

Before going live with disputes, test the full flow in your Sandbox environment to ensure your systems properly consume webhooks and handle dispute events.

Lithic will notify you when dispute intake is available for testing in Sandbox after you complete the configuration form for dispute setup.

**Warning:** Always verify you're in Sandbox before submitting test disputes. Accidentally submitting disputes in Production may result in processing fees.

### Simulate a Transaction

1. Log into the Lithic Dashboard and toggle to **Sandbox** environment (bottom left of screen)
2. Navigate to **Accountholder → Cards**
3. Click **Create Cards**
4. Fill out required parameters for card creation (refer to [Create Card](https://docs.lithic.com/reference/postcards))
5. Click **Create Card**
6. Double-click the newly created card from the card list
7. Click **Simulate → Authorization**
8. Fill out authorization parameters (refer to [Simulate Authorization](https://docs.lithic.com/reference/postsimulateauthorization))
9. Click **Submit**
10. Navigate to **Transactions** - your simulated transaction will appear at the top
11. Click **Simulate → Clearing**
12. Fill out clearing parameters (refer to [Simulate Clearing](https://docs.lithic.com/reference/postsimulateclearing))
13. Click **Submit**

### Simulate a Dispute

Once you have a simulated cleared transaction:

1. Click on the **Accountholder's name** to access their account page
2. Navigate to **Disputes → Initiate Dispute**
3. Answer questions based on your testing scenario (fraud, consumer dispute, etc.)
4. Click **Continue**
5. Search for and select the simulated transaction. If you are disputing multiple transactions on the card, it is recommended to search within a timeframe.
6. Complete the intake questions
7. Optionally upload test documents as evidence
8. Submit the dispute

### What to Validate

After submitting a test dispute:

* **Webhook delivery**: Verify your system receives `dispute_transaction.created` and `dispute_transaction.updated` webhooks
* **API access**: Confirm you can retrieve disputes from the [API](https://docs.lithic.com/reference/managed-disputes).
* **Ledger integration**: If using Lithic Ledger, verify that your accounts update as expected. If using your own ledger, verify you can post the correct accounting entries
* **Dashboard visibility**: Confirm you can view dispute status and events in the dashboard
# Example: Automatic Reconciliation at ToyCo

### Learn more about Reconciliation Rules

<Callout icon="📘" theme="info">
  Reconciliation Rules is the set of conditions used to decide if a Transaction should be reconciled to an Expected Payment. Learn more about [Defining your Reconciliation Rules](https://docs.moderntreasury.com/payments/docs/defining-reconciliation-rules).
</Callout>

Your company is an auction platform that lets sellers list rare toys for sale, and buyers bid to buy the toys.

* Receiving wire payments from buyers for pay-in
* Originating ACH payments to sellers for pay-outs
  * You use a legacy payment processor to process ACH payments. It seems to send payments reasonably reliably but reconciliation is currently an operational process.

To automate reconciliation, you create Expected Payments for each buyer and seller payment, and add three Reconciliation Rules.

#### Example Expected Payment for buyer wire payments

```json
{
	"description": "Pay-in id_1234 for jen.dough@modernemail.com", /* for dashboard refernce */
	"reconciliation_rule_variables":[
		{
			"direction": "credit",
			"type": "wire",
			"amount_lower_bound": 100000,
			"amount_upper_bound": 100000,
			"date_lower_bound": "2024-05-15",
			"date_upper_bound": "2024-05-15",
			"custom_identifiers":{
				"buyer_email_address": "jen.dough@modernemail.com",
				"buyer_full_name": "Jennifer Dough",
				"pay_in_id": "1234"
      }
		}
	] 
}
```

#### Rule #1: Pay-in wires with Pay-In ID number

You provide specific instructions to Buyers when sending in their Pay-Ins via wire payment. So you know that when these criteria are met, you can confidently reconcile the payments:

* The amount of one Transaction must equal to one Expected Payment
* The Transaction statement description (i.e., remittance info) must contain both:
  * Buyer’s email address
  * Pay-in ID number that was provided to the Buyer

This is only for Pay-Ins that are wire payments in the credit direction though, you wouldn’t want this to accidentally apply to other money you receive.

<Image align="center" border={false} src="https://files.readme.io/e9a03be-image.png" />

#### Rule #2: Fallback Pay-in Rule with buyer info

Based on historical payment behavior, you know that sometimes customers forget to input their both their email and Pay-In ID number. But looking at past data you are confident you can use a fallback rule to reconcile payments as long as they have included some identifying information, and the payment is during the 1-week window provided to the Buyer.

You add a second fallback rule that applies to any Pay-in whether it’s a wire or check payment.

<Image align="center" border={false} src="https://files.readme.io/c1cb236-image.png" />

#### Expected Payment for seller ACH payments (example)

```json JSON
{
	"description": "Pay-out id_4321 for sales@retrotoys.com", /* for dashboard refernce */
	"reconciliation_rule_variables":[
		{
			"direction": "debit",
			"type": "ach",
			"amount_lower_bound": 5000,
			"amount_upper_bound": 5000,
			"date_lower_bound": "2024-05-15",
			"date_upper_bound": "2024-05-15",
			"custom_identifiers":{
				"batch_id": "xK2f9",
      }
		}
	] 
}
```

#### Rule #3: Seller Pay-out ACH Rule

On the seller-side, you have more control since you are originating the payments so the rule is more straightforward.

The trickiness here is around the batch-based behavior of ACH payments. But you have worked with your payment processor to include a specific short ID in the batch description.

<Image border={false} src="https://files.readme.io/d608411-image.png" />
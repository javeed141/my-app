# Ledger Use Cases and Funds Flows

Combine Financial Accounts and Payments to move money at scale

Lithic's Ledger works seamlessly with our best-in-class card issuing to create complete solutions in a single integration. With Lithic's Ledger Solutions + Money Movement product suite, you can build an end-to-end payments solution. We'll enable you to:

* Programmatically create financial accounts to track balances
* Transfer funds in/out of financial accounts via any family of Transaction (ACH, Wires, Book Transfers)
* Instantly issue and load virtual and physical cards for business or individual end-users

## Supported Use Cases

Current customers are using Lithic Ledger to build programs such as:

* **Commercial and Consumer Digital Banking**: Launch modern banking platforms using Lithic's ledger for checking, savings, or prepaid accounts
* **Commercial and Consumer Credit**: Extend lines of credit to businesses and individuals. Lithic calculates interest, processes repayment, and produces Reg Z-compliant statements and loan tape
* **Corporate Incentives**: Send rewards and rebates to drive customer and employee loyalty
* **Disbursements and Platform Disbursements**: Distribute payments to class members as an individual disburser, or as a platform that facilitates disbursements from multiple sources.
* **Bill Pay**: Facilitate hassle-free bill payment in sectors like utilities and healthcare

## Funds Flows

At Lithic, we'll work hard to see your product vision come to life. That starts by agreeing on a funds flow. See an example funds flow below for Platform Disbursements

<Image align="center" border={true} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/2e692da43e8a3738_55fdf85d903fa9f31e1d95e9d9f6342f2f066f4e283e6530155c8073a602df9b-image.png" className="border" />

### Example Flow

The diagram above and sequence below demonstrates an example use case on Lithic's Ledger for a Platform Disbursements Funds Flow

1. Program [creates Business Account Holder + Financial Account](https://docs.lithic.com/reference/postaccountholders) on Lithic Ledger for business that will be disbursing funds
2. Business loads funds into Business Financial Account via [ACH or Wire payment](https://docs.lithic.com/reference/post_payment-transaction-created)
3. Program [creates Individual Account Holder + Financial Account](https://docs.lithic.com/reference/postaccountholders) on Lithic Ledger for end user that will be receiving funds
4. Program disburses Funds into End User Financial Account via [Book Transfer](https://docs.lithic.com/reference/postbooktransfers)

If end user selects prepaid card as their disbursement method:

* 5a. Program [creates a card](https://docs.lithic.com/reference/postcards) for the end user
* 6a. End user swipes card at merchant to spend their disbursement

If end user selects direct payment as their disbursement method:

* 5b. Program [originates payment](https://docs.lithic.com/reference/createpayment) to the end user's [External Bank Account](https://docs.lithic.com/reference/getexternalbankaccountbytoken)

Program can complete the same setup for Company B, all from within the same Lithic Ledger Solution, allowing them to scale their Platform Disbursements offering.

### Additional Funds Flows

Lithic Implementation has standard funds flows for all use cases we currently support on our ledger. However, we understand that each program is unique and may have nuances that may be slightly different than our standard setup.

Our solutions and implementation team work with you and our bank partners to ensure we find a funds flow that works. If you're looking for a ledgering service to track balances and move money, reach out to us at [https://www.lithic.com/about/contact](https://www.lithic.com/about/contact)
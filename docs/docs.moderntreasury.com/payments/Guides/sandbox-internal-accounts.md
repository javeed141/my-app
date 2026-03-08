# Internal Accounts

In order to begin building in your Modern Treasury Sandbox, you will need an Internal Account. Start by following the "**Open an Account**" steps in the [Payments Quickstart](quickstart#2-open-an-account)  to create your first Internal Account in your Sandbox. Once this is complete, you will have an Internal Account that supports receiving and sending funds.

To retrieve the `id` for the Internal Account you created, you can query the [Internal Accounts endpoint](/platform/reference/internal-account-object).  This `id` will be necessary for Payment Order creation.

# Simulating Payment Orders

The Payment Order [lifecycle](https://docs.moderntreasury.com/platform/reference/payment-order-object#payment-order-statuses) is simulated in the Sandbox to behave like Production, but on a faster timeline. The Sandbox automatically advances your Payment Orders through key lifecycle states and generates a corresponding Transaction object to represent the bank activity, giving you a realistic way to test end-to-end behaviors.

Currently, the following payment types are simulated in Sandbox:

* ACH
* wire
* RTP
* book transfers

# Funding Your Account

Accounts must have sufficient funds to process `credit` Payment Orders. Please refer to the steps in the [Payments Quickstart](https://docs.moderntreasury.com/paymentsdocs/quickstart#3-create-a-counterparty) on how to create a Counterparty and fund the Internal Account.

Transactions generated for Payment Order activity will impact your account balances. Refer to [Tracking Account Balances](tracking-account-balances) for more information on the Balance Reports and Balance Types Modern Treasury provides.
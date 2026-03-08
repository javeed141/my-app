# Book Transfers

Learn how to move funds between your financial accounts for various purposes

Funds can be near-instantly moved between certain financial accounts via API. Any movement of funds between accounts that are ledgered by the Lithic platform are referred to as a "book transfer".

Examples of why a program may choose to execute book transfers include:

* Disbursing funds from the program's issuing financial account to an end-user's issuing financial account or card
* Disbursing funds from the program's operating financial account to an end-user's operating financial account
* Withdrawing funds from an end-user's issuing financial account or card back to the program's issuing financial account
* Withdrawing funds from an end-user's operating financial account back to the program's operating financial account
* Moving funds between the program's issuing and operating financial accounts

While the Lithic platform supports a wide range of book transfer types, you will work with your implementation specialist to determine the specific types that are relevant for your program. This is important in order for Lithic to facilitate accurate reporting and so that your sponsoring bank can provide proper oversight of money movement.

### API Endpoints

There are four dedicated endpoints to support book transfer workflows:

* [Create Book Transfer](https://docs.lithic.com/reference/postbooktransfers)
* [Reverse Book Transfer](https://docs.lithic.com/reference/reversebooktransfer)
* [List Book Transfers](https://docs.lithic.com/reference/getbooktransfers)
* [Get Book Transfer by Token](https://docs.lithic.com/reference/getbooktransfer)

When creating a book transfer, as long as a supported book transfer type and subtype are provided, the only case where a failure may occur is because of insufficient funds.

### Events API and Webhooks

You can receive notification of events relating to book transfers by subscribing to the following event types in the [Events API](https://docs.lithic.com/docs/events-api).

* `book_transfer_transaction.created`: Receive notification when a book transfer between your financial accounts has occurred.
* `book_transfer_transaction.updated`: Receive notification when a reversal of a book transfer between your financial accounts has occurred.

### Book Transfer Types

During your program's implementation, you will work with your implementation specialist to determine the book transfer types that are appropriate for your program. Note that the use of any book transfer types will typically require approval from your sponsor bank in accordance with your cardholder agreement.

**Book Transfer Categories**

All book transfer types belong to one of six categories that describe the high-level purpose for why the book transfer is being executed:

* **Adjustment**: Used in cases where a program needs to make a manual adjustment such as a billing error or writing off a loss
* **Balance or funding**: Used in cases where a program wants to load a financial account's balance (e.g., disbursing funds from the program to an end-user), move funds from an account to another account, or move funds from a card to another card; the reverse of each of these is also supported
* **Derecognition**: Used in cases where a program wants to withdraw funds from an end-user's account or card (e.g., card has expired and preloaded funds can be pulled back by the program)
* **Dispute**: Used in cases where a program wants to credit funds to an end-user's account or card in the case of a card transaction dispute (e.g., dispute has been initiated and the program is providing a provisional credit)
* **Fee**: Used in cases where a program wants to apply a fee to an end-user's account or card in line with their cardholder agreement (e.g., $2 international ATM withdrawal fee)
* **Reward**: Used in cases where a program wants to disburse a reward to an end-user's account or card, most typically to offer a credit for the cardholder taking a certain action (e.g., $5 reward for spending at a list of qualifying merchants)

**Book Transfer Types**

Once you have worked with your implementation specialist to determine which categories of book transfers are relevant for your program, you will also need to determine which specific type best describes the reason for why you are moving funds between financial accounts.

| Book Transfer Category | Book Transfer Type           | Description                                                                                                                                                          |
| :--------------------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Adjustment             | Billing Error                | Correcting a billing error otherwise not categorized under fees                                                                                                      |
| Adjustment             | Loss Write Off               | Writing off a loss by zeroing out a negative financial account balance                                                                                               |
| Balance or Funding     | Account to Account           | Moving funds from one account to another account within the same program (e.g., book transfer from checking account to savings account that belong to the same user) |
| Balance or Funding     | Card to Card                 | Moving funds from one card to another card within the same program (e.g., transfer from one pre-loaded card balance to another)                                      |
| Balance or Funding     | Collection                   | Moving funds from an cash-funded account to a credit account, to collect on a credit statement                                                                       |
| Balance or Funding     | Disburse                     | Disbursing funds to end-user for non-rewards use cases (e.g., loading a prepaid card, depositing pay into a contract worker's account)                               |
| Derecognition          | Early Derecognition          | Program pulls back funds prior to the card's expiration date                                                                                                         |
| Derecognition          | Escheatment                  | Funds are pulled back by program for payment to government entities per relevant regulations                                                                         |
| Derecognition          | Expired Card                 | Program pulls back funds because the card has expired                                                                                                                |
| Derecognition          | Inactivity Fee Down          | Programs pulls funds from end-user balance due to inactivity (i.e., by applying inactivity fees)                                                                     |
| Dispute                | Dispute Won                  | Crediting an end-user for a dispute that was won                                                                                                                     |
| Dispute                | Provisional Credit           | Providing a provisional credit to an end-user while a card transaction is being disputed with the card network                                                       |
| Fee                    | ATM Withdrawal               | Fee assessed for an ATM withdrawal                                                                                                                                   |
| Fee                    | ATM Decline                  | Fee assessed for an ATM decline                                                                                                                                      |
| Fee                    | ATM Balance Inquiry          | Fee Assessed for account balance inquiry at an ATM                                                                                                                   |
| Fee                    | International ATM Withdrawal | International ATM withdrawal fee                                                                                                                                     |
| Fee                    | Cash Back                    | Cash back at point of sale transaction fee                                                                                                                           |
| Fee                    | Inactivity                   | Inactivity fee (e.g., assessment of $X after Y days of no customer-initiated activity)                                                                               |
| Fee                    | Statement                    | Statement generation fee                                                                                                                                             |
| Fee                    | Monthly                      | Monthly service fee (e.g., subscription, membership)                                                                                                                 |
| Fee                    | Quarterly                    | Quarterly service fee (e.g., subscription, membership)                                                                                                               |
| Fee                    | Annual                       | Annual service (e.g., subscription, membership)                                                                                                                      |
| Fee                    | Customer Service             | Customer service fees (e.g., fee per live call with customer service representative)                                                                                 |
| Fee                    | Account Maintenance          | Account maintenance fee                                                                                                                                              |
| Fee                    | Account Activation           | Account activation fee                                                                                                                                               |
| Fee                    | Account Closure              | Account closure fee                                                                                                                                                  |
| Fee                    | Card Replacement             | Card replacement fee                                                                                                                                                 |
| Fee                    | Card Delivery                | Fee for card shipped with standard delivery                                                                                                                          |
| Fee                    | Card Delivery Expedited      | Fee for card shipped with expedited delivery                                                                                                                         |
| Fee                    | Card Create                  | Fee for creating a card                                                                                                                                              |
| Fee                    | Currency Conversion          | Foreign currency conversion fee                                                                                                                                      |
| Fee                    | Interest                     | Interest charge (e.g., in case of credit programs)                                                                                                                   |
| Fee                    | Late Payment                 | Late payment fee                                                                                                                                                     |
| Fee                    | Bill Payment                 | Bill payment fee                                                                                                                                                     |
| Reward                 | Cash Back                    | Disbursement of cash rewards to end-users                                                                                                                            |

Each of the above book transfer types can be reversed through the [Reverse Book Transfer](https://docs.lithic.com/reference/reversebooktransfer) endpoint. For example, if an incorrect fee was assessed on an end-user's balance, the reverse endpoint should be used to correct the error.

**Book Transfer Subtypes**

When a book transfer type (detailed in above section) is enabled for your program, your implementation specialist will also provide you with a subtype that you will use each time you create a book transfer. The purpose of the subtype is to distinguish between multiple reasons that a program may have to execute a similar book transfer. For example, at launch, a program may have a cash back promotion of $5 once a cardholder spends $1000 on their card. The book transfer `type` of `CASH_BACK` will be enabled, along with a `subtype` of `001`. Six months after launch, the same program may add a second promotion of $10 once a cardholder spends $5000 on their card. A second cash back `subtype` will be created on your program, this time labeled `002`. This way, when the program creates cash back book transfers, they (and their bank, via reporting) will have a way to distinguish fund movements to facilitate the first type of cash back promotion vs. the second.
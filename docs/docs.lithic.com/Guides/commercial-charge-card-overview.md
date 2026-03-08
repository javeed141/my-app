# Charge Card

The flexibility of credit-based spend with the discipline of periodic full payment

A charge card program is a type of credit program that enables businesses to borrow funds to make purchases on their card and repay the program for those purchases at a later date. However, unlike other credit programs, a charge card requires that the full balance of a statement is paid when the bill is due.

Traditionally offered by financial institutions like American Express, charge cards are increasingly offered by software companies who can leverage existing financial data on their customers to do smart underwriting (i.e., determine how much a business can borrow). By extending credit to their customers, companies are able to help their customers grow while also adding another source of revenue (e.g., fees, interchange).

# Charge Card Flow

In general, a charge card program has the following flow:

* The program underwrites or approves the borrower to spend up to a certain amount known as the **credit limit**. The borrower can spend using virtual, digital, and physical cards.
* After a number of days, the program will invoice the borrower for the amount they have spent by generating a statement. The time between statements is known as the **billing period**. For example, a billing period of 30 days that starts on June 1st means the program will generate the invoice on June 31st for all spend between June 1 - June 30.
* The borrower then has a certain number of days after receiving the statement to repay the program. This is known as the **payment period**. Continuing our example, a payment period of 5 days means the payment is due on July 5th. Most programs offer borrowers the option to set-up automatic billing. This gives programs authorization to automatically debit a borrower's bank account for the total amount owed.

A charge card is different from other credit programs in the following ways:

* The borrower must pay off the full balance owed when payment is due. The balance cannot "carry-over" to the next billing period. This is in contrast to a revolving credit card where the balance can be carried over as long as a minimum payment is met; in exchange, the revolving credit card program charges interest on the amount that is carried over.
* If a cardholder does not pay off their full balance, the program can only charge the customer a late fee or some other penalty. The program cannot charge interest on the unpaid balance.
* Typically, programs must maintain some kind of **Security Account** in order to unlock spend on their cards. The setup and funding of the **Security Account** depends on the program, and Lithic provides multiple options.

# Key Parties in Commercial Charge

There are generally three to four key parties involved in running a charge card program:

* **Card Program:** Cardholder brand, and orchestrates the experience
* **Technology Platform:** Lithic offers the direct connections to Visa and MasterCard, along with the infrastructure to issue cards, track transactions, and pay account balances
* **BIN Sponsor:** Bank partner and principal member of the card networks
* **Debt Providers:** Provide the capital needed to pay into the card networks. The Debt Provider can be the BIN Sponsor, the Card Program, or a third party

These parties work together to build the five pillars of a charge card program:

* **Balance Sheet**: source of capital for the program
* **Lender of Record** : entity that holds the lending licenses that permit the offering of a charge card and ensures compliance with applicable federal and state lending regulations
* **Underwriting**: process of onboarding and screening businesses and their employees through KYB/KYC and determining how much they can borrow
* **Card Issuing & Processing**: process of issuing virtual/digital/physical cards and tracking spend against the credit limit
* **Loan Servicing**: process of collecting repayment and managing late payments or delinquencies

# Charge Programs at Lithic

Lithic supports key pillars of a charge card program while still offering programs the flexibility to chose which pillars to bring in-house or bring to another third-party provider. For example, you can use Lithic's native [know-your-business (KYB)](https://docs.lithic.com/docs/account-holders-kyb) and [know-your-customer](https://docs.lithic.com/docs/account-holders-kyc) (KYC) platforms or use your own providers. Depending on what you’re building, you can secure your own lending licenses or partner with one of Lithic's partner banks.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/e75a500d6c97924d_7a344ae-image.png)

The same approach to ease and flexibility applies to Lithic's API-based charge card infrastructure, built on top of our native Card, Accounts, and ACH platforms. With Lithic, you can:

* Create virtual, digital, and physical cards. Use one of Lithic's templates for physical cards or create your own custom physical card.
* Decide your program's billing period and payment period, and set custom credit limits for each of your business clients.
* Automatically track spend and collect repayment via ACH on due date. Lithic also supports early repayment, automatically adjusting the amount owed and collected at the end of the billing period.
* Simplify reconciliation by having Lithic track and manage your business clients' spend and collections all in one place.
* Generate statements. Retrieve data such as amount due, remaining credit limit, etc. from Lithic’s new Statements API to generate statements for your business clients.

# Secured Charge and Commercial Charge

Lithic offers 2 primary program setups, depending on whether your offering charge cards for SMBs to spend, or individuals.

### Commercial Charge

This setup is ideal for partners looking to extend credit to SMBs needing flexible cash flow options for their spend.

### Secured Charge

This setup is ideal for partners offering responsible credit products to individuals, charge cards for youth, or embedded finance programs looking to mimic credit without risk.

<br />

Secured Charge is a program setup to issue Charge Cards to individuals, where spend is backed by a Security Account they fund themselves. Funds are pulled in via individuals' [External Bank Accounts](https://docs.lithic.com/docs/external-accounts-api), and every transactions is balance-checked against the Security Account. In this way, Secured Charge has a pre-funded feel while still functioning as a Charge Card program.

The balance on the card will be paid back at the end of the billing cycle from the Security Account, and the user must top up the Security Account to unlock more spend.

Secured Charge programs are ideal for partners offering responsible credit products, charge cards for youth or small business customers, or embedded finance programs looking to mimic credit without risk.
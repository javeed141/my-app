# ACH at Lithic

How Lithic offers ACH to our customers

Lithic enables our customers to receive and initiate ACH originations with the following features:

* **Next-Day ACH**: Lithic has access to all six ACH windows, enabling us to process next-day ACH on non-holiday weekdays

* **Same Day ACH support**: Lithic also supports same-day ACH transactions on non-holiday weekdays.

* **Frequent ACH uploads**: Lithic uploads ACH files to the ACH network every hour; we are not limited to upload schedules of partner banks or other intermediaries who may only upload once or twice a day

* **Fast ACH postings**: Lithic receives ACH receipts directly from the ACH network six times a day instead of through an intermediary bank or third party. We process these receipts immediately and update balances based on the instructions in the file. In some cases, the ACH network or the sender may forward date a receipt, in which case Lithic will post the ACH transaction as pending before clearing it as settled on the settlement date specified by the file. This often happens when a same-day ACH misses a bank's cutoff and is sent to Lithic as a next-day ACH

* **Customizable ACH files**: Lithic directly generates ACH files, enabling us to customize certain ACH fields such as transaction description and company id

To get started on ACH, customers can provide their Financial Account's routing number and bank account number to receive ACH transactions or use the Payments API to originate ACH transactions. ACH receipts and credit originations are immediately posted to the available balance of Financial Accounts. ACH debit originations are posted to the pending balance of Financial Accounts and are then released to the available balance. See more on balance updates in [ACH Payment Lifecycle](https://docs.lithic.com/docs/ach-payments-lifecycle)

Customers can work with their implementation manager to set a 1-4 day hold on ACH debits to control when funds are released. By default, funds are held for 2 days.

*Please note that currently, Lithic does not support cancelling an ACH payment after it's been originated.*

# ACH Settlement Times

ACH Originations/Receipts at Lithic will follow the FedACH processing schedule for any ACH with Lithic Accounts. This means:

### Same Day Originations

| Processed By Time  | Settlement Time   | Release Time (Debits only) |
| :----------------- | :---------------- | :------------------------- |
| 10:30 AM ET (on T) | 1:00 PM ET (on T) | 1:00 PM ET (on T+2)        |
| 2:45 PM ET (on T)  | 5:00 PM ET (on T) | 5:00 PM ET (on T+2)        |
| 4:45 PM ET (on T)  | 6:00 PM ET (on T) | 6:00 PM ET (on T+2)        |

*Note: Same Day Originations must be received by 4:15 PM ET in order to be processed by the 4:45 PM ET window.*

### Next Day Originations

| Processed By Time        | Settlement Time     | Release Time (Debits only) |
| :----------------------- | :------------------ | :------------------------- |
| Before 2:15 AM ET (on T) | 8:30 AM ET (on T)   | 8:30 AM ET (on T+2)        |
| After 2:15 AM ET (on T)  | 8:30 AM ET (on T+1) | 8:30 AM ET (on T+3)        |

*Note: Next Day Originations must be received by 1:45 AM ET in order to be processed by the 2:15 AM ET window.*

### Receipts

Receipts will follow the same schedule as above, but the timing will be dependent on when the Originating Depository Financial Institution submitted the ACH for processing and Lithic has received the ACH entry.

# SEC Codes

The Standard Entry Class (SEC) code is a three-letter code that identifies the type of ACH entry being made. It’s a required field used to classify transfers by their purpose or intended use. The full list of codes is maintained by [NACHA](https://achdevguide.nacha.org/ach-file-details), but at Lithic we offer the following:

| Code | Description                     | RDFI Bank Account Type                |
| :--- | :------------------------------ | :------------------------------------ |
| PPD  | Prearranged Payment and Deposit | Consumer                              |
| CCD  | Corporate Credit or Debit Entry | Non-Consumer                          |
| WEB  | Internet Initiated/Mobile Entry | Consumer (Debit Origination **Only**) |

It's important to use the correct SEC code, as ACH payments can be returned if the improper SEC code is used. Consumer vs Non-Consumer payments also impact how the RDFI can process a return.

# ACH Return Reasons

When an ACH origination is returned by either the receiving bank or the receiver, Lithic also receives a reason return code that describes the reason for the return. These codes are also maintained by NACHA.

The table below lists the most common return reason codes, a description of each code, the types of bank accounts that can submit this return, and how many days the receiving bank / the receiver has to submit the return.

In addition, its lists the effect that receiving the return code will have on status of the Lithic External Bank Account object. Lithic automatically updates these statuses to adhere to NACHA guidelines. See [External Bank Accounts](https://docs.lithic.com/docs/external-accounts-api) to learn more.

| Return Reason Code | Description                                                                                                                                                                                                                                                                                                              | RDFI Bank Account Type                                        | Time Frame                                                                                           | Effect on EBA status                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| R01                | Insufficient funds. The receiver does not have sufficient available balance to cover the ACH debit origination                                                                                                                                                                                                           | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | None                                                            |
| R02                | Account closed. A previously active account has been closed by either the receiver or the receiving bank                                                                                                                                                                                                                 | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | `CLOSED`                                                        |
| R03                | No account / unable to locate account. The account number provided is valid but the account number does not correspond to the individual identified in the ACH transaction or the account number is not an existing account                                                                                              | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | `CLOSED` or `FAILED_VERIFICATION` (if micro deposit or prenote) |
| R04                | Invalid Account Number Structure. The account number is not valid                                                                                                                                                                                                                                                        | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | `PAUSED`                                                        |
| R05                | Unauthorized debit to consumer account using corporate SEC code. CCD or CTX debit origination was transmitted to a consumer account or was not authorized by the receiver                                                                                                                                                | Consumer                                                      | 60 Calendar Days                                                                                     | `PAUSED`                                                        |
| R06                | Returned per originating bank request (i.e., Lithic's bank partners). This generally happens due to an error in the origination file                                                                                                                                                                                     | Consumer or Non-Consumer                                      | Determined by originating and receiving bank                                                         | `PAUSED`                                                        |
| R07                | Authorization revoked by customer. The receiving customer revoked a previous authorization for their account to be debited by you                                                                                                                                                                                        | Consumer                                                      | 60 Calendar Days                                                                                     | `PAUSED`                                                        |
| R08                | Payment Stopped. The receiving bank has placed a stop payment order on an ACH debit origination                                                                                                                                                                                                                          | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | `PAUSED`                                                        |
| R09                | Uncollected Funds. The total balance (also known as the ledger balance) of the bank account is enough to cover the ACH debit origination but not the available balance                                                                                                                                                   | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | None                                                            |
| R10                | Customer Advises Originator is Not Known To and/or Authorized by Receiver. This occurs when the receiver indicates they do not know you or has not given you authorization to debit their account. This is different from R07 which is when an existing authorization is revoked                                         | Consumer; Non-Consumer for ARC, BOC, IAT, or POP transactions | 60 Calendar days                                                                                     | `PAUSED`                                                        |
| R11                | Customer Advises Entry not in Accordance with the Terms of the Authorization. This occurs when the receiver has authorized you to debit their account but a specific ACH debit origination does not comply with the terms of your authorization agreement. For example, the amount debited was not the authorized amount | Consumer. Non-Consumer for ARC, BOC, IAT, or POP transactions | 60 Calendar days                                                                                     | `PAUSED`                                                        |
| R13                | Invalid Routing Number                                                                                                                                                                                                                                                                                                   |                                                               |                                                                                                      | `PAUSED`                                                        |
| R14                | Representative Payee Deceased.                                                                                                                                                                                                                                                                                           | Non-Consumer or Consumer                                      | 2 Banking Days                                                                                       | `PAUSED`                                                        |
| R15                | Beneficiary or Account Holder Deceased                                                                                                                                                                                                                                                                                   | Consumer                                                      | 2 Banking Days                                                                                       | `PAUSED`                                                        |
| R16                | Account Frozen / Entry Returned per OFAC.                                                                                                                                                                                                                                                                                | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | `PAUSED`                                                        |
| R20                | Non-Transaction Account                                                                                                                                                                                                                                                                                                  | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | `PAUSED`                                                        |
| R23                | Credit Entry Refused by Receiver                                                                                                                                                                                                                                                                                         | Consumer or Non-Consumer                                      | Receiving bank must submit return within 1 banking day after receiving the refusal from the receiver | `PAUSED`                                                        |
| R24                | Duplicate Entry, indicating the same transaction has been processed already                                                                                                                                                                                                                                              | Consumer or Non-Consumer                                      | 2 Banking Days                                                                                       | `PAUSED`                                                        |
| R29                | Corporate Customer Advises Not Authorized. A non-consumer receiver advised the receiving bank that a specific ACH origination was not authorized                                                                                                                                                                         | Non-Consumer                                                  | 2 Banking Days                                                                                       | `PAUSED`                                                        |

<br />

# [ACH Auth Rules](https://docs.lithic.com/docs/ach-auth-rules)

ACH Auth Rules brings the power of Lithic's card authorization rules engine to our ACH processing, enabling you to:

* Decide whether or not you want to accept an ACH receipt on the basis of:
  1. Company name
  2. Company ID
  3. Amount
  4. Date range
* Automatically return the payment if it fits outside your defined criteria
* Automatically enable Stop Payments

[ACH Auth Rules](https://docs.lithic.com/docs/ach-auth-rules) can be configured for qualifying customers during the onboarding process.

<br />
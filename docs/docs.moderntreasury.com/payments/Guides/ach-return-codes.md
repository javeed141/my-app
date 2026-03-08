# ACH Return Codes

Banks can send a number of notifications along with the success or failure confirmations of a payment. Below we walk through the various types of Returns and Notification of Changes you may experience with a bank.

# ACH Return Codes

When an ACH transfer fails, a return code is attached to the return notice from the bank.  Below you will find a table of those codes, a short description, the maximum number of days the particular code can be issued, and the external account type for which the return is possible.

| Code | Short Description                                                                         | Time Frame                                        | Account Types                                     |
| :--- | :---------------------------------------------------------------------------------------- | :------------------------------------------------ | :------------------------------------------------ |
| R01  | Insufficient Funds                                                                        | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R02  | Account Closed                                                                            | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R03  | No Account/Unable to Locate Account                                                       | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R04  | Invalid Account Number Structure                                                          | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R05  | Unauthorized Debit to Consumer Account Using Corporate SEC Code                           | 60 Calendar Days                                  | Consumer                                          |
| R06  | Returned per ODFI's Request                                                               | Undefined                                         | Consumer or Non-Consumer                          |
| R07  | Authorization Revoked by Customer                                                         | 60 Calendar Days                                  | Consumer                                          |
| R08  | Payment Stopped                                                                           | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R09  | Uncollected Funds                                                                         | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R10  | Customer Advises Unauthorized, Improper, Ineligible, or Part of an Incomplete Transaction | 60 Calendar Days                                  | Consumer; Non-Consumer for ARC, BOC, IAT, or POP  |
| R11  | Check Truncation Early Return                                                             | 60 Calendar Days                                  | Consumer; Non-Consumer for ARC, BOC, POP, and IAT |
| R12  | Account Sold to Another DFI                                                               | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R13  | Invalid ACH Routing Number                                                                | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R14  | Representative Payee Deceased or Unable to Continue in That Capacity                      | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R15  | Beneficiary or Account Holder (Other Than a Representative Payee) Deceased                | 2 Banking Days                                    | Consumer                                          |
| R16  | Account Frozen/Entry Returned per OFAC Instruction                                        | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R17  | File Record Edit Criteria                                                                 | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R18  | Improper Effective Entry Date                                                             | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R19  | Amount Field Error                                                                        | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R20  | Non-Transaction Account                                                                   | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R21  | Invalid Company Identification                                                            | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R22  | Invalid Individual ID Number                                                              | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R23  | Credit Entry Refused by Receiver                                                          | RDFI must transmit Return upon receipt of Refusal | Consumer or Non-Consumer                          |
| R24  | Duplicate Entry                                                                           | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R25  | Addenda Error                                                                             | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R26  | Mandatory Field Error                                                                     | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R27  | Trace Number Error                                                                        | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R28  | Routing Number Check Digit Error                                                          | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R29  | Corporate Customer Advises Not Authorized                                                 | 2 Banking Days                                    | Non-Consumer                                      |
| R30  | RDFI Not Participant in Check Truncation Program                                          | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R31  | Permissible Return Entry (CCD and CTX Only)                                               | Undefined                                         | Non-Consumer                                      |
| R32  | RDFI Non-Settlement                                                                       | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R33  | Return of XCK Entry                                                                       | 60 Calendar Days                                  | Consumer or Non-Consumer                          |
| R34  | Limited Participation DFI                                                                 | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R35  | Return of Improper Debit Entry                                                            | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R36  | Return of Improper Credit Entry                                                           | Next File Delivery Time Following Processing      | Consumer or Non-Consumer                          |
| R37  | Source Document Presented for Payment                                                     | 60 Calendar Days                                  | Consumer or Non-Consumer                          |
| R38  | Stop Payment on Source Document                                                           | 60 Calendar Days                                  | Consumer or Non-Consumer                          |
| R39  | Improper Source Document/Source Document Presented for Payment                            | 2 Banking Days                                    | Consumer or Non-Consumer                          |
| R45  | Invalid Individual / Company Name                                                         | N/A                                               | N/A                                               |

# Notification of Change (NOC) Codes

Banks may inform you that something on the external account or payment instruction has changed using a Notification of Change. Often the payment will succeed, and this notice is to ensure you change future payments accordingly.

> 📘 Automated NOC Updates
>
> When you receive a NOC, Modern Treasury will automatically update the [External Accounts](https://docs.moderntreasury.com/payments/reference/external-account-object) accordingly. You will be able to continue making future payments as expected. External Account changes will also be logged and emitted over Webhook Events.

| Code | Short Description                                                                       |
| :--- | :-------------------------------------------------------------------------------------- |
| C01  | Incorrect DFI Account Number                                                            |
| C02  | Incorrect Routing Number                                                                |
| C03  | Incorrect Routing Number and Incorrect DFI Account Number                               |
| C05  | Incorrect Transaction Code                                                              |
| C06  | Incorrect DFI Account Number and Incorrect Transaction Code                             |
| C07  | Incorrect Routing Number, Incorrect DFI Account Number, and Incorrect Transaction Code. |
| C08  | Incorrect Receiving DFI Identification (IAT Only)                                       |
| C09  | Incorrect Individual Identification Number/Incorrect Receiver Identification Number     |
| C13  | Addenda Format Error                                                                    |
| C14  | Incorrect SEC Code for Outbound International Payment                                   |
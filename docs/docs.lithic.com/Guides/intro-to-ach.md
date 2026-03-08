# Intro to ACH

ACH 101

# Basic ACH terms and flow

### ACH (Automated Clearing House)

ACH is a batch-based electronic payment network in the United States that enables consumers and businesses to transfer funds between participating bank accounts. **ACH can be used to push or pull funds**, and is used to collect payment for bills and invoices, pay employees and contractors, and more. If you've set ever set up an autopay for an electricity bill, or received a direct deposit from an employer, you've most likely used ACH.

### ODFI/RDFI

Originating Depository Financial Institution (ODFI) refers to the ACH participant that sends the initial push or pull payment. Receiving Depository Financial Institution (RDFI) refers to the ACH participant that receives the initial push or pull from the ODFI. Lithic can be the ODFI or RDFI, depending on the type of payment being sent.

### NACHA

The National Automated Clearing House Association (NACHA) sets the standards and procedures by which network participants must adhere to. These rules are specific to ODFI and RDFI.

## ACH Flow

<Image border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/922f6b8cadb528a9_7606f443f7debae2bc4bd64692c7689da8fc3227b89c185bff8f5593c7025083-image.png" />

<br />

### ACH Initiation

ACH Payments must be initiated with the requisite details, including the account number, routing number, amount, pull vs push, SEC Code (see [ACH at Lithic](https://docs.lithic.com/docs/ach-overview)), and more.

ACH Payments must also be initiated as Same Day or Next Day, which determines the payment's clearing and settlement time. Note that there is a $1M limit on Same Day ACH payments.

### ACH Batching

ACH payments do not settle as soon as they are initiated. Instead, ODFIs take the information submitted for each ACH Initiation and batch them into a file according to NACHA specifications. Each initiated payment becomes an entry in the ACH file.

### ACH Submission (Processing)

These NACHA files are submitted to the Federal Reserve for clearing and settlement. If a file is successfully processed, the Federal Reserve will respond with an acknowledgment. Different ODFIs batch and process their NACHA files on different schedules, but the Federal Reserve clears and settles between banks only at specific times. See [ACH at Lithic](https://docs.lithic.com/docs/ach-overview) for ACH detailed timing on ACH payments.

### ACH Clearing and Settlement

During Clearing, the Federal Reserve aggregates all transactions from participating financial institutions, nets them out, and calculates the final amount owed by and to each participating financial institution.

During Settlement, the Federal Reserve debits and credits those final amounts from each participating Financial Institutions's master account.

The times at which Clearing and Settlement happens are also called "Settlement Windows" There are 2 relevant timestamps for each window, and different windows for Same Day ACH vs Next Day ACH:

* The Processed By Time (Submission Deadline)
* Settlement Time (when the funds are moved in the master accounts)

**Same Day ACH Windows**

| Window   | Processed By Time  | Settlement Time   |
| :------- | :----------------- | :---------------- |
| Window 1 | 10:30 AM ET (on T) | 1:00 PM ET (on T) |
| Window 2 | 2:45 PM ET (on T)  | 5:00 PM ET (on T) |
| Window 3 | 4:45 PM ET (on T)  | 6:00 PM ET (on T) |

<br />

**Next Day ACH Windows**

| Window   | Processed By Time        | Settlement Time     |
| :------- | :----------------------- | :------------------ |
| Window 1 | Before 2:15 AM ET (on T) | 8:30 AM ET (on T)   |
| Window 2 | After 2:15 AM ET (on T)  | 8:30 AM ET (on T+1) |

<br />

*T refers to the day that the ACH payment was originated, and T+1 is the next banking day after*

### Funds Debited or Credited

For both the ODFI and RDFI, funds are debited or credited depending on both the payment type, and the specific policies of the participating Financial Institution. For instance, funds credited to the ODFI on an Origination Debit Funds may be delayed due to risk management and fraud prevention. See [ACH Payment Lifecycle](https://docs.lithic.com/docs/ach-payments-lifecycle) to learn exactly when we credit/debit funds for different payment types, and [ACH at Lithic](https://docs.lithic.com/docs/ach-overview) to learn how we offer customizable holds for our customers.

*Details on Returns are listed below Types of ACH Payments.*

<br />

# Types of ACH Payments

### ACH Originations

There are four types of ACH Originations used to send or receive money:

|             | Originations                          | Receipts                              |
| :---------- | :------------------------------------ | :------------------------------------ |
| **Debits**  | Funds added to your account **(+)**   | Funds taken from your account **(-)** |
| **Credits** | Funds taken from your account **(-)** | Funds added to your account **(+)**   |

<br />

#### ACH Debit Originations

Lithic Financial Account **pulls funds in** from an external bank account

#### ACH Credit Originations

Lithic Financial Account **pushes funds to** an external bank account

#### ACH Credit Receipts

Lithic Financial Account **gets funds pushed in from** an external bank account

#### ACH Debit Receipts

Lithic Financial Account **gets funds pulled out by** an external bank account

*It's important to remember that Debit Originations and Debit Receipts **do not use real-time authorization**. Funds are pulled directly from accounts without first asking the account holder.*

### ACH Returns

RDFIs can return ACH payments for a variety of reasons as outlined by NACHA with specific return timelines. Returns can be effective "rejections" (return due to insufficient funds) or after-the-fact returns (return because customer advises unauthorized).

See [ACH at Lithic](https://docs.lithic.com/docs/ach-overview) for more details on return codes and the specific timelines they must adhere to. Note that an RDFI returning an Origination Debit means they will be pulling the funds back from the ODFI.

ACH Returns go through the same batching and submission process, and are entered in the same NACHA files with other ACH originations.

<br />

# Example Flow

Now that we've explained the process flow, let's go through an real-world example of an ACH Debit Origination and ACH Credit Origination.

This example shows an ACH origination debit which is returned due to insufficient funds at the RDFI. The error is then corrected and an ACH origination credit is used to complete the payment.

<Image border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/394976e33e99fe12_2a51df7f6b32d7bfc98fb142ad8793bad932438ae1dcea0a172d5c7471ebb4bf-image.png" />

<br />

1. Hardwood Windows needs to collect money from ABC LLC. On Monday (day T) they initiate a Same Day ACH Debit Origination for $100 through their bank or financial institution (the ODFI). The ODFI batches that payment with others received around the same time that day, and uploads the file to the ACH network. The ODFI will then add $100 to Hardwood Windows' bank account, but mark it as pending since there is a risk that the ACH Debit Origination is returned.

2. At the next scheduled ACH window on Monday, the ACH network distributes these ACH transactions to RDFIs as ACH receipts. ABC LLC's bank will receive a $100 ACH debit receipt from Hardwood Windows

3. Unfortunately, ABC LLC only has $50 in their bank account. The $100 cannot be pulled, so later that Monday their bank or financial institution initiates an ACH return with the return reason code R01 (Insufficient Funds)

4. At the next scheduled ACH window on Tuesday morning (T+1), Hardwood Windows' bank receives the ACH return and reverses the $100 credit to their bank account. The $100 could not have been spent as it was held in pending

5. Later on Tuesday (T+1), ABC LLC deposits a check in their account at the RDFI, and now has enough balance to pay the $100 invoice to Hardwood Windows. They initiates a Next Day ACH Credit Origination for $100 to Hardwood Windows. With this new payment, ABC LLC's bank is the ODFI.

6. On Wednesday morning (T+2), Hardwood Windows receives an ACH credit receipt from ABC. Their bank (now the RDFI) then adds $100 to Hardwood Window's bank account as available funds (not pending) since ABC LLC cannot reverse an ACH that they originated.
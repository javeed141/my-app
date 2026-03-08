# ACH Payments Lifecycle

Learn about the ACH payment event lifecycle permutations you can expect to see on the Lithic platform.

This page documents the possible lifecycle permutations of an ACH payment that you can expect to see with code examples. Lithic supports all four types of ACH payments - ACH debit originations, ACH credit originations, ACH credit receipts, and ACH debit receipts. Each type has different lifecycles the payment goes through.

After you learn about the lifecycle of each payment, you can try for yourself by [simulating the events in Sandbox](https://docs.lithic.com/docs/quick-start-ach-funding-in-sandbox)

Typically, the `type`, `result`, and `detailed_results` fields within the `event` object are most important in understanding what has occurred to a given ACH payment.

**Possible enum values for`event.type`:**

* `ACH_ORIGINATION_INITIATED`: Event indicates that the debit or credit origination was initiated via the API
* `ACH_ORIGINATION_REVIEWED`: Event indicates that the debit or credit origination has completed all reviews by Lithic (currently only transaction limits); refer to the `event.result` field to know whether any of the checks caused a decline
* `ACH_ORIGINATION_PROCESSED`: Event indicates that the ACH network has acknowledged receipt of the debit or credit origination
* `ACH_ORIGINATION_REJECTED`: Event indicates that the ACH network has rejected the payment
* `ACH_ORIGINATION_SETTLED`: Event indicates that Lithic has received or sent the funds from or to the financial institution to which the ACH debit or credit origination was created; timing of this event depends on if the ACH is same day or next day
* `ACH_ORIGINATION_RELEASED`: Event indicates that the hold period has passed, and the funds are now settled and available for use (applies to debit only)
* `ACH_RETURN_INITIATED`: Event indicates that a return was initiated by Lithic
* `ACH_RETURN_PROCESSED`: In the case of an origination, event indicates that a return was received for the ACH debit or credit; in the case of a receipt, event indicates that the Federal Reserve has acknowledged receipt of a return that Lithic generated
* `ACH_RETURN_REJECTED`: In the case of a receipt, event indicates that the ACH network has rejected a return that Lithic generated
* `ACH_RECEIPT_PROCESSED`: Event indicates that an ACH debit or credit receipt was received
* `ACH_RECEIPT_SETTLED`: Event indicates that Lithic has received or sent the funds per the receipt instructions
* `ACH_RETURN_SETTLED`: Event indicates that ACH return has been settled. This is the same event for all payment types

**Possible enum values for`event.result`:**

* `APPROVED`: The event occurred with a successful outcome; note that in the case of a return event, a successful outcome indicates that it occurred as expected
* `DECLINED`: The event occurred with an unsuccessful outcome

**Possible enum values for`detailed_results`:**

* `FUNDS_INSUFFICIENT`: Indicates that in the case of an ACH credit origination, there were insufficient funds in the financial account to complete the payment
* `ACCOUNT_INVALID`: Indicates that one of the accounts from or to which the debit or credit origination was initiated is invalid (currently will only be used if the external bank account is not in a transactable state)
* `PROGRAM_TRANSACTION_LIMIT_EXCEEDED`: Indicates that the ACH debit or credit origination initiated exceeds your program’s configured transaction-level limit
* `PROGRAM_DAILY_LIMIT_EXCEEDED`: Indicates that the ACH debit or credit origination initiated exceeds your program’s configured daily limit
* `PROGRAM_MONTHLY_LIMIT_EXCEEDED`: Indicates that the ACH debit or credit origination initiated exceeds your program’s configured monthly limit

# ACH Debit Originations

**Possible`event.type` sequences:**

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/8bcc10fa9b696f63_e7504281b4aee6ba66f17772313445a9d312caa09bf2766bba3ac0c798b5df86-image.png)

<br />

*Note that all ACH debit originations that are returned with reason codes R01 or R09 (see descriptions[here](https://docs.lithic.com/docs/ach-overview#ach-return-reasons)) can be retried up to 2 times by calling the [Retry Payment endpoint](https://docs.lithic.com/reference/retrypayment). Additional events are added to the original payment object, beginning with an `ACH_ORIGINATION_INITIATED` event, and can follow any of the above-described flows.*

## Sequence 1: Successful payment ("Happy Path")

A successful ACH debit origination contains five events at the end of its lifecycle: initiated, reviewed, processed, settled, and released. For successful debit originations, you will see the funds appear in the associated financial account after the settled event (with a pending status), then made available after the released event.

```json
{
  "category": "ACH",
  "status": "SETTLED",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_DEBIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_RELEASED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-21T08:30:40Z",
      "token": "5f1b4d88-c883-4852-ae4a-ad699aa46ec1"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 2: Unsuccessful payment due to an issue with the accounts involved

While an ACH debit origination can fail at the point of the API request (e.g., the `financial_account_token` passed in is not a recognized account), it can also fail after the payment object is created. In this case, there will be a single initiated event, with a declined result. This can occur if the external bank account to which the debit origination is being created is not in a valid, transactable state (e.g., it has a state other than `ENABLED`). The declined initiated event causes the overall payment object result to be declined, indicating that no future events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "DECLINED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_DEBIT",
  "settled_amount": 0,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "DECLINED",
      "detailed_results": ["ACCOUNT_INVALID"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 3: Unsuccessful payment due to a failed transaction limit check

An ACH debit origination that fails due to a transaction limit check will have two events: an approved initiated event, followed by a declined reviewed event. The reviewed event will contain an explanation in the detailed results array indicating which transaction limit check caused the payment to fail. The declined reviewed event causes the overall payment object result to be declined, indicating that no further events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "DECLINED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_DEBIT",
  "settled_amount": 0,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "DECLINED",
      "detailed_results": ["PROGRAM_MONTHLY_LIMIT_EXCEEDED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

<br />

## Sequence 4: Unsuccessful debit origination due to rejection by the ACH network.

An ACH debit origination that fails because it was rejected by the ACH network will have four events: initiated, reviewed, processed, and rejected. The rejected event causes the overall payment object result to be declined and status to be declined, indicating that no further events are expected for the payment.

<br />

```json
{
  "category": "ACH",
  "status": "DECLINED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": "R02",
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_DEBIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REJECTED",
      "result": "DECLINED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:30:40Z",
      "token": "6fd208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

<br />

## Sequence 5: Unsuccessful debit origination due to a return after the origination was processed

An ACH debit origination that fails because a return was generated by the receiving financial institution *after the payment has been processed but before they have settled* will have four events: initiated, reviewed, processed, and returned. The returned event causes the overall payment object result to be declined and status to be returned, indicating that no further events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": "R02",
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_DEBIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 6: Unsuccessful debit origination due to a return after the origination was settled

An ACH debit origination that fails because a return was generated by the receiving financial institution after the payment has settled will have five events: initiated, reviewed, processed, settled, and returned. The returned event causes the overall payment object result to be declined and status to be returned, indicating that no further events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": "R02",
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_DEBIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 7: Unsuccessful debit origination due to a return after the origination was released

An ACH debit origination that fails because a return was generated by the receiving financial institution after the payment has been released will have six events: initiated, reviewed, processed, settled, released, and returned. The returned event causes the overall payment object result to be declined and status to be returned, indicating that no further events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": "R02",
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_DEBIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_RELEASED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-21T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-22T10:02:05Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## ACH Debit Origination Balance Impacts

The below table shows if/how balances are impacted per transaction event for debit originations to **debit** and **prepaid** accounts. The impacts are reversed for **credit** accounts.

| `event.type`                | Pending Balance          | Available Balance        |
| :-------------------------- | :----------------------- | :----------------------- |
| `ACH_ORIGINATION_INITIATED` | None                     | None                     |
| `ACH_ORIGINATION_REVIEWED`  | None                     | None                     |
| `ACH_ORIGINATION_PROCESSED` | None                     | None                     |
| `ACH_ORIGINATION_SETTLED`   | Increased                | None                     |
| `ACH_ORIGINATION_RELEASED`  | Decreased                | Increased                |
| `ACH_RETURN_PROCESSED`      | All postings rolled back | All postings rolled back |
| `ACH_ORIGINATION_REJECTED`  | All postings rolled back | All postings rolled back |

# ACH Credit Originations

**Possible`event.type` sequences:**

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/f56dddb810e23f70_70f72fc43708f602711eaaa62fb5c83fb4016f8fa9db8edc757666e66065b278-image.png)

<br />

For credit originations, Lithic will move funds to a pending state immediately; once you receive a settled event, the funds will clear out of pending.

## Sequence 1: Successful payment ("Happy Path")

A successful ACH credit origination contains four events at the end of its lifecycle: initiated, reviewed, processed, and settled.

```json
{
  "category": "ACH",
  "status": "SETTLED",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_CREDIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 2: Unsuccessful payment due to an issue with the accounts involved

While an ACH credit origination can fail at the point of the API request (e.g., the `financial_account_token` passed in is not a recognized account), it can also fail after the payment object is created. In this case, there will be a single initiated event, with a declined result. This can occur if the external bank account to which the credit origination is being created is not in a valid, transactable state (e.g., it has a state other than `ENABLED`). The declined initiated event causes the overall payment object result to be declined, indicating that no future events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "DECLINED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_CREDIT",
  "settled_amount": 0,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "DECLINED",
      "detailed_results": ["ACCOUNT_INVALID"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

<br />

<br />

## Sequence 3: Unsuccessful payment due to a failed transaction limit check

An ACH credit origination that fails due to a transaction limit check will have two events: an approved initiated event, followed by a declined reviewed event. The reviewed event will contain an explanation in the detailed results array indicating which transaction limit check caused the payment to fail. The declined reviewed event causes the overall payment object result to be declined, indicating that no further events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "DECLINED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_CREDIT",
  "settled_amount": 0,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "DECLINED",
      "detailed_results": ["PROGRAM_MONTHLY_LIMIT_EXCEEDED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

<br />

## Sequence 4: Unsuccessful credit origination due to rejection by the ACH network.

An ACH debit origination that fails because it was rejected by the ACH network will have four events: initiated, reviewed, processed, and rejected. The rejected event causes the overall payment object result to be declined and status to be declined, indicating that no further events are expected for the payment.

<br />

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": "R02",
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_CREDIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REJECTED",
      "result": "DECLINED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:30:40Z",
      "token": "6fd208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

<br />

## Sequence 5: Unsuccessful payment due to a return after the origination was processed

An ACH credit origination that fails because a return was generated by the receiving financial institution *after the payment has been processed but before they have settled* will have four events: initiated, reviewed, processed, and returned. The returned event causes the overall payment object result to be declined and status to be returned, indicating that no further events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": "R02",
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_CREDIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 6: Unsuccessful payment due to a return after the origination was settled

An ACH credit origination that fails because a return was generated by the receiving financial institution after the payment has settled will have five events: initiated, reviewed, processed, settled, and returned. The returned event causes the overall payment object result to be declined and status to be returned, indicating that no further events are expected for the payment.

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "ORIGINATION_CREDIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_REVIEWED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "7eec03f2-2fac-4485-bc4b-0526d8bff3ba"
    },
    {
      "amount": 10000,
      "type": "ACH_ORIGINATION_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-19T08:30:40Z",
      "token": "f7d208bc-1227-445d-a7c5-03e7e9cc15f9"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## ACH Credit Origination Balance Impacts

The below table shows if/how balances are impacted per transaction event for credit originations to **prepaid** accounts. The impacts are reversed for **credit** accounts.

| `event.type`                | Pending Balance          | Available Balance        |
| :-------------------------- | :----------------------- | :----------------------- |
| `ACH_ORIGINATION_INITIATED` | Increased                | Decreased                |
| `ACH_ORIGINATION_REVIEWED`  | None                     | None                     |
| `ACH_ORIGINATION_PROCESSED` | None                     | None                     |
| `ACH_ORIGINATION_SETTLED`   | Decreased                | None                     |
| `ACH_RETURN_PROCESSED`      | All postings rolled back | All postings rolled back |
| `ACH_ORIGINATION_REJECTED`  | All postings rolled back | All postings rolled back |

# ACH Credit Receipts

**Possible`event.type` sequences:**

For credit receipts, you will see the funds appear in the associated financial account after the settled event.

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/2b6702189a39e2f0_379b168b8c05d023d9f8e02d53d7f31011aa4adbdc04bf77d7b6183b03fd5268-image.png)

<br />

## Sequence 1: Successful payment ("Happy Path")

While Lithic may receive ACH credit receipts for invalid account numbers and issue returns, those payments will not be attributed to any particular customer's program, and so you will not be notified when those incidents occur. A successful ACH credit receipt contains two events at the end of its lifecycle: processed and settled.

```json
{
  "category": "ACH",
  "status": "SETTLED",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": "07e15e42-0f74-469b-9150-0e2e748d1d7d",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "RECEIPT_CREDIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_RECEIPT_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_RECEIPT_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

<br />

## Sequence 2: Successful payment which is then returned

If after a successful ACH Credit Receipt, you request to return the funds within the NACHA approved time frame, Lithic will proceed with the following sequence of events:

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": "8264681992",
    "receipt_routing_number": "101019644",
    "trace_numbers": ["091000018872131", "101019642618045"],
    "addenda": null
  },
  "financial_account_token": "ffeac2b3-2016-5781-b865-4165adce20a6",
  "external_bank_account_token": null,
  "direction": "DEBIT",
  "source": "LITHIC",
  "method": "ACH_NEXT_DAY",
  "token": "6adfbb26-4bdf-59fa-bad8-3b8bbf6382de",
  "type": "RECEIPT_CREDIT",
  "settled_amount": 0,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": -18,
      "type": "ACH_RECEIPT_PROCESSED",
      "result": "APPROVED",
      "created": "2025-07-15T20:20:41Z",
      "token": "109aaf2c-2c21-58b1-bd21-611c9dddbc28",
      "detailed_results": ["APPROVED"]
    },
    {
      "amount": -18,
      "type": "ACH_RECEIPT_SETTLED",
      "result": "APPROVED",
      "created": "2025-07-15T20:20:49Z",
      "token": "b7f87b47-6550-5336-bee2-f63ea67010fd",
      "detailed_results": ["APPROVED"]
    },
    {
      "amount": 18,
      "type": "ACH_RETURN_INITIATED",
      "result": "APPROVED",
      "created": "2025-07-15T20:20:52Z",
      "token": "f0913821-cd59-5bc3-95fd-59317182f835",
      "detailed_results": ["DECLINED"]
    },
    {
      "amount": 18,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "created": "2025-07-15T22:20:57Z",
      "token": "513ca04f-adde-50e3-9375-d401bc8ff297",
      "detailed_results": ["APPROVED"]
    },
    {
      "amount": -18,
      "type": "ACH_RETURN_SETTLED",
      "result": "APPROVED",
      "created": "2025-07-16T12:33:32Z",
      "token": "6126ac66-e28b-5b85-b38a-695cf6657786",
      "detailed_results": ["APPROVED"]
    }
  ],
  "descriptor": "ACCTVERIFY",
  "user_defined_id": null,
  "created": "2025-07-15T20:20:41Z",
  "updated": "2025-07-23T16:38:25Z",
  "expected_release_date": null
}
```

<br />

<br />

## Sequence 3: Successful payment which is unsuccessfully returned

If after a successful ACH Credit Receipt, you request to return the funds within the NACHA approved time frame, but the return cannot be processed, Lithic will proceed with the following sequence of events:

```json
{
  "category": "ACH",
  "status": "RETURNED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": "8264681992",
    "receipt_routing_number": "101019644",
    "trace_numbers": ["091000018872131", "101019642618045"],
    "addenda": null
  },
  "financial_account_token": "ffeac2b3-2016-5781-b865-4165adce20a6",
  "external_bank_account_token": null,
  "direction": "DEBIT",
  "source": "LITHIC",
  "method": "ACH_NEXT_DAY",
  "token": "6adfbb26-4bdf-59fa-bad8-3b8bbf6382de",
  "type": "RECEIPT_CREDIT",
  "settled_amount": 0,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": -18,
      "type": "ACH_RECEIPT_PROCESSED",
      "result": "APPROVED",
      "created": "2025-07-15T20:20:41Z",
      "token": "109aaf2c-2c21-58b1-bd21-611c9dddbc28",
      "detailed_results": ["APPROVED"]
    },
    {
      "amount": -18,
      "type": "ACH_RECEIPT_SETTLED",
      "result": "APPROVED",
      "created": "2025-07-15T20:20:49Z",
      "token": "b7f87b47-6550-5336-bee2-f63ea67010fd",
      "detailed_results": ["APPROVED"]
    },
    {
      "amount": 18,
      "type": "ACH_RETURN_INITIATED",
      "result": "APPROVED",
      "created": "2025-07-15T20:20:52Z",
      "token": "f0913821-cd59-5bc3-95fd-59317182f835",
      "detailed_results": ["DECLINED"]
    },
    {
      "amount": 18,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "created": "2025-07-15T22:20:57Z",
      "token": "513ca04f-adde-50e3-9375-d401bc8ff297",
      "detailed_results": ["APPROVED"]
    },
    {
      "amount": -18,
      "type": "ACH_RETURN_SETTLED",
      "result": "APPROVED",
      "created": "2025-07-16T12:33:32Z",
      "token": "6126ac66-e28b-5b85-b38a-695cf6657786",
      "detailed_results": ["APPROVED"]
    },
    {
      "amount": -18,
      "type": "ACH_RETURN_REJECTED",
      "result": "APPROVED",
      "created": "2025-07-23T16:38:25Z",
      "token": "abffd31a-a1a1-5226-bb0b-58be3ec17d84",
      "detailed_results": ["APPROVED"]
    }
  ],
  "descriptor": "ACCTVERIFY",
  "user_defined_id": null,
  "created": "2025-07-15T20:20:41Z",
  "updated": "2025-07-23T16:38:25Z",
  "expected_release_date": null
}
```

<br />

## ACH Credit Receipts Balance Impacts

The below table shows if/how balances are impacted per transaction event for credit receipts to **debit** and **prepaid** accounts. The impacts are reversed for **credit** accounts.

| `event.type`            | Pending Balance                                | Available Balance                              |
| :---------------------- | :--------------------------------------------- | :--------------------------------------------- |
| `ACH_RECEIPT_PROCESSED` | None                                           | None                                           |
| `ACH_RECEIPT_SETTLED`   | Increased                                      | None                                           |
| `ACH_RECEIPT_RELEASED`  | Decreased                                      | Increased                                      |
| `ACH_RETURN_INITIATED`  | Increased                                      | Decreased                                      |
| `ACH_RETURN_PROCESSED`  | None                                           | None                                           |
| `ACH_RETURN_SETTLED`    | Decreased                                      | None                                           |
| `ACH_RETURN_REJECTED`   | Postings rolled back to `ACH_RECEIPT_RELEASED` | Postings rolled back to `ACH_RECEIPT_RELEASED` |

# ACH Debit Receipts

**Possible`event.type` sequences:**

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/cf9924c5492c3955_8cf4b8a076658355af5b005d02ffdb791756ec99f7386810bab884daf41e938e-image.png)

*Note that ACH\_RECEIPT\_SETTLED and ACH\_RETURN\_PROCESSED events are asynchronous - it is possible these events happen in alternate order.*

## Sequence 1: Successful payment

A successful ACH Debit Receipt where funds are pulled out of the account contains just two events: processed and settled.

```json
{
    "category": "ACH",
    "status": "SETTLED",
    "result": "APPROVED",
    "method_attributes": {
        "sec_code": "WEB",
        "return_reason_code": null,
        "retries": 0,
        "company_id": null,
        "receipt_routing_number": null
    },
    "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
    "external_bank_account_token": null,
    "direction": "CREDIT",
    "source": "LITHIC",
    "method": "ACH_SAME_DAY",
    "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
    "type": "RECEIPT_DEBIT",
    "settled_amount": 10000,
    "pending_amount": 0,
    "currency": "USD",
    "events": [
        {
            "amount": 10000,
            "type": "ACH_RECEIPT_PROCESSED",
            "result": "APPROVED",
            "detailed_results": ["APPROVED"],
            "created": "2024-04-18T18:16:09Z",
            "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
        },
        {
            "amount": 10000,
            "type": "ACH_RECEIPT_SETTLED",
            "result": "APPROVED",
            "detailed_results": ["APPROVED"],
            "created": "2024-04-18T18:17:40Z",
            "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
        },
    "descriptor": "Test Technologies",
    "user_defined_id": "1234",
    "created": "2024-04-18T18:16:09Z",
    "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 2: Unsuccessful payment with immediate return

If your account is not set up for/authorized to receive the inbound debit, we will immediate return the payment in order to "pull" the funds right back.

```json
{
  "category": "ACH",
  "status": "SETTLED",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": null,
  "direction": "CREDIT",
  "source": "LITHIC",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "RECEIPT_DEBIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_RECEIPT_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_RECEIPT_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "b7a6bacd-de6f-4c00-a900-74db7a765c49"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## Sequence 3: Successful payment which is later returned

If after a successful ACH Debit Receipt, you request a return within the NACHA approved time frame, Lithic will proceed with the following sequence of events:

```json
{
  "category": "ACH",
  "status": "SETTLED",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "WEB",
    "return_reason_code": null,
    "retries": 0,
    "company_id": null,
    "receipt_routing_number": null
  },
  "financial_account_token": "6127238d-cb85-50bc-86aa-264654a11be9",
  "external_bank_account_token": null,
  "direction": "CREDIT",
  "source": "LITHIC",
  "method": "ACH_SAME_DAY",
  "token": "6d5a2718-9b79-4473-aa1e-6bbf7433ea6f",
  "type": "RECEIPT_DEBIT",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "type": "ACH_RECEIPT_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:16:09Z",
      "token": "34c5b9d2-2d6a-540b-90fe-fa202b418242"
    },
    {
      "amount": 10000,
      "type": "ACH_RECEIPT_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_INITIATED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_PROCESSED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T18:17:40Z",
      "token": "5f6255f8-4016-5e66-aedf-2e3c76027e04"
    },
    {
      "amount": 10000,
      "type": "ACH_RETURN_SETTLED",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "created": "2024-04-18T19:17:40Z",
      "token": "b7a6bacd-de6f-4c00-a900-74db7a765c49"
    }
  ],
  "descriptor": "Test Technologies",
  "user_defined_id": "1234",
  "created": "2024-04-18T18:16:09Z",
  "updated": "2024-04-19T16:38:22Z"
}
```

## ACH Debit Receipts Balance Impacts

The below table shows if/how balances are impacted per transaction event for debit receipts to **debit** and **prepaid** accounts. The impacts are reversed for **credit** accounts.

| `event.type`            | Pending Balance | Available Balance |
| :---------------------- | :-------------- | :---------------- |
| `ACH_RECEIPT_PROCESSED` | Increased       | Decreased         |
| `ACH_RECEIPT_SETTLED`   | Decreased       | None              |
| `ACH_RETURN_INITIATED`  | None            | None              |
| `ACH_RETURN_PROCESSED`  | None            | None              |
| `ACH_RETURN_SETTLED`    | None            | Increased         |
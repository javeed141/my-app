# Financial Account Closures [BETA]

Account closures are important in financial systems for several reasons:

1. **Risk Management**: When an account is closed, it helps mitigate potential fraud or unauthorized transactions. If a credit or charge account remains open, there’s a risk that someone could continue to use it without the account holder’s knowledge, especially if there’s a high balance or extended line of credit.
2. **Credit Exposure**: Closing accounts reduces the lender's exposure to risk. A closed account means there’s no possibility of further credit issuance, which is crucial for managing overall credit limits and outstanding balances. It helps the financial institution keep their risk within acceptable boundaries.
3. **Credit Score Impact**: For consumers, closing an account can affect their credit score. If the account had a significant credit limit, closing it could increase their credit utilization ratio (credit used vs. available credit), which can impact their score negatively. Understanding when and why accounts are closed can help both lenders and consumers manage their credit health effectively.
4. **Compliance**: Financial institutions must comply with regulatory requirements, including closing accounts that are inactive for a certain period or that involve suspicious activity. This helps with reporting and meeting legal obligations in areas like money laundering and consumer protection.
5. **Account Maintenance and Costs**: Keeping an account open that is no longer in use can incur costs for both the account holder and the financial institution. Closing accounts helps streamline operations and reduce administrative burdens.
6. **Consumer Rights and Transparency**: Account closures ensure that consumers can track and manage their credit/charge activity properly. When an account is closed, it marks the finality of the relationship, which can help consumers resolve outstanding balances and prevent unexpected charges.

## Financial Account Lifecycle

The financial account serves as the backbone for a credit or charge product tied to a given entity. The account progresses through a series of stages in its lifecycle, as detailed below:

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/8cd14b3d9922cc1a_227abcbf22c8641e1c5cda9c96db1e7a5b93d0660c79a75d6514996367f061e4-image.png)

### Status Definitions:

* **PENDING:** This status indicates that the financial account is linked to a credit or charge product but has not yet been fully configured. The account is in the process of setup and cannot be used for transactions until it moves to the next stage.
* **OPEN:** The account is fully set up and operational. It can now be used for financial transactions, and all features of the associated product are accessible to the entity.
* **SUSPENDED:** The account remains active, but certain restrictions or limitations are imposed. These restrictions may be temporary, such as for a specific investigation, or part of an ongoing issue that needs resolution. Transactions may be limited or suspended until the issue is resolved or the suspension is lifted.
* **CLOSED:** This is a terminal state for the financial account. No further transactions can be processed, and the account is effectively deactivated. Any associated product or credit line is no longer active, and the account is closed to any future use.

## Changing the Status of a Financial Account

To change the status of a financial account, one must use the update\_status endpoint ([here](https://docs.lithic.com/reference/updatefinancialaccountstatus)). Certain conditions must be met for an account to transition to the `CLOSED` status. Specifically, the following requirements must be satisfied:

1. **No outstanding balance:** The account must have a zero balance in both the pending and available categories.
2. **No pending payments:** There must be no pending payments, including External Payments or ACH transactions, that have not been processed.

Based on the status the account is being moved to, the following transaction types will be permitted:

| **Activity**                  | **Allowed For**                       |
| ----------------------------- | ------------------------------------- |
| Book transfer                 | `OPEN`,`SUSPENDED`                    |
| ACH Debit Origination         | `OPEN`,`SUSPENDED`                    |
| ACH Credit Origination        | `OPEN`                                |
| ACH Credit Receipt            | `OPEN`, `SUSPENDED`                   |
| Management Operation          | `OPEN`, `SUSPENDED`                   |
| External Payment - Deposit    | `OPEN`, `SUSPENDED`                   |
| External Payment - Withdrawal | `OPEN`                                |
| Card Authorizations           | `OPEN`, `SUSPENDED`(force posts only) |
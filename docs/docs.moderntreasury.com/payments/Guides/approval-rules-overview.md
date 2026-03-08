# Approval Rules Overview

Approval Rules can help you improve financial controls and reduce errors. Administrators can create rules to specify [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object) or [External Accounts](https://docs.moderntreasury.com/platform/reference/external-account-object) that require human review based on certain conditions, and require users in Specific Groups to review. Multiple rules can trigger, resulting in sequential approval chains. For example, you can configure two rules such that a user in the Finance Analyst Group and then a user in the Finance Manager Group are required to review large outgoing payments or bank accounts that were created manually in the dashboard. The rule engine will run when objects are created or updated. Reviewers are notified via email and can review in the dashboard. Reviewers can approve or deny objects, resulting in:

* **Payments**: If all reviewers approve a Payment Order, its status will transition to Approved and be sent to the bank for processing. If any reviewer denies a Payment Order, its status will transition to Denied and not be sent.
* **External Accounts**: If all reviewers approve an External Account, its status will transition to Approved, and Payment Orders can successfully occur. If any reviewer denies an External Account, its status will transition to Denied, and Payment Orders with this External Account will not be successful.

The rest of this guide describes the behavior of the approvals system in more detail. There are guides for [Administrators](https://docs.moderntreasury.com/payments/docs/approval-rules-for-administrators) and [Reviewers](https://docs.moderntreasury.com/payments/docs/approval-rules-for-reviewers).

# Definition of an Approval Rule

A single approval rule consists of conditions and reviewers.

Conditions describe what needs to be true for a review to be required. You can create one or more conditions, grouped into condition blocks. Within a condition block, conditions are AND'd together. Between condition blocks, conditions are OR'd together. See the [Create an Approval Rule](https://docs.moderntreasury.com/payments/docs/create-an-approval-rule) guide for information about specific conditions that can be created for Payment Order and External Account approval rules.

Reviewers describe which Groups, and therefore which users, have permission to review. You can specify the number of reviewers, as well as the Groups that can review. For example, you can specify that you want two users with the Finance Group, or one user with the Finance or Administrators Groups, to review.

# Multiple Approval Rules and Sequence

Multiple approval rules can trigger for a specific Payment Order or External Account. The system will notify reviewers based on the priority of the rules. By creating multiple rules with different reviewers, you can configure reviews to be done in sequence. For example, one rule could contain the conditions for a user in the Finance Analyst Group to review and a second rule could contain the conditions for a user in the Finance Manager Group to review.

By default, users can only see what objects they need to review right now. However, the system does not prevent a user from performing a review before it is their turn if they wish to do so.

See the [Change Approval Rule Sequence](https://docs.moderntreasury.com/payments/docs/change-approval-rule-sequence) guide for more information on adjusting rule priority and the [Approval Reviews](https://docs.moderntreasury.com/payments/docs/approval-reviews) guide for more information about how a user can review.

# Controls

Modern Treasury has designed the approval rule system to help you implement strong controls.

## Rule Changes

Only users with Roles with Administrator Permission Set OR Payment Approval Rules permissions are allowed to modify approval rules. Modern Treasury can be configured to require multiple users to review approval rule changes; if you are interested in this feature, please contact Support.

If a rule modification occurs, notifications will sent to other Administrators to alert them of the change. Additionally, all rule modifications are logged in the [Audit Trail](https://app.moderntreasury.com/settings/audit_records).

Note that only objects created after a rule modification will be evaluated by the modified rule. Previously created objects will not be affected.

## Reviews

**Multiple Reviewers**

A user can review once per rule. Below are a few examples.

* If Rule 1 requires two users with the Finance Group to review, then a single user cannot approve by himself.
* If Rule 1 requires one user with the Finance group to review, and Rule 2 requires one user with the Finance Group to review, then a single user can approve by himself.

**Users in Multiple Groups**

A user must review while acting in a specific Group. Below are a few examples that show how this intersects with the behavior described previously.

* If Rule 1 requires one user with the Finance Group and one user with the Operations Group to review, and a User is in both roles, then a single user cannot approve by himself.
* If Rule 1 requires one user with the Finance Group to review and Rule 2 requires one user with the Operations Group to review, and a user is in both roles, then a single user can approve by himself.

**Object Updates**

The rule engine will typically runs when an object are created. If an object is updated, the rule engine will run again; all reviewers are required to review again, even if they previously reviewed, in case critical details changed.

**Manually Created or Updated Objects**

The system prevents the latest user from reviewing an object that they created or updated. This choice was made to balance proper controls while limiting instances where no users can review. Here are a couple of examples. Rule 1 requires one user with the Finance Role to review a payment, and Jack and Jill are part of the Finance Role.

* If Jack created a payment, then he cannot review it; however, Jill can review it.
* If Jack created the payment and then Jill edited the payment, then Jill cannot review; however, Jack can review it.

**Audit Trail**

All review activity is logged in the [Audit Trail](https://app.moderntreasury.com/settings/audit_records).
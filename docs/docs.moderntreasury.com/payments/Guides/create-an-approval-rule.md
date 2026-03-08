# Creating an Approval Rule for Payment Orders

Users in roles with Organization Manage and Review permissions are allowed to modify approval rules. You can configure approvals rules for payment orders from the [Settings page](https://app.moderntreasury.com/settings/payments/rules).

All rule modifications (e.g. rule creation, edit, and delete actions) are logged in the Audit Trail. If you modify a rule, only new payments and bank accounts will be affected.

You can set up an approval rule to specify [Payment Orders](https://docs.moderntreasury.com/payments/reference/payment-orders) that require human review. For example, you can set up a rule to review large outgoing payments or payments that were created manually in the dashboard. A single approval rule consists of conditions and reviewers.

<Image align="center" border={false} src="https://files.readme.io/136ee68-image.png" />

<br />

## Conditions

Conditions describe what needs to be true for a review to be required.

You can create one or more conditions, grouped into condition blocks. Within a condition block, conditions are AND'd together. Between condition blocks, conditions are OR'd together.

Each condition is expressed as a field, operator, and value combination. Below are the conditions that can be specified for Payment Order approvals:

| Field                  | Operators                                                                        | Values                                                                    |
| :--------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| Amount                 | \<, ≤, >, ≥, =, ≠                                                                | Number (e.g. 1000)                                                        |
| Created By             | is in any, is not in any                                                         | A list of Users                                                           |
| Creation Source        | is equal to, is not equal to, is in any, is not in any                           | API, Counterparty invitation form, by a User manually, bulk import, sweep |
| Direction              | is equal to, is not equal to, is in any, is not in any                           | `credit`, `debit`                                                         |
| Metadata               | is equal to, is not equal to, contains, does not contain, is missing, is present | Key and value                                                             |
| Payment Type           | is equal to, is not equal to, is in any, is not in any                           | List of payment rails (e.g. `ach`, `wire`)                                |
| Receiving Account Type | is equal to, is not equal to, is in any, is not in any                           | `internal_account`, `external_account`                                    |
| Currency               | is equal to, is not equal to, is in any, is not in any                           | List of currencies (e.g. `usd`, `gbp`)                                    |

## Reviewers

Reviewers describe which Roles, and therefore which user, can take actions. You can specify one or more reviewers. For example, you can specify that you want two users with the Finance role to review. You can even specify conditional logic for reviewers, for example, that you want one user with either the Finance or Administrators Role to review.

Roles must have Payment Orders View and Edit access in order to review Payment Orders.
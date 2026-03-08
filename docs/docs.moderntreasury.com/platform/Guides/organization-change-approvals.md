# Organization Change Approvals

# Overview

Organizations have a number of settings and configurations that allow you to implement proper controls and ensure secure behavior across the platform. Organization administrators have the ability to manage controls and organization-wide settings.

In order to provide organizations greater control of organization changes, you can enable Organization Change Approvals which will require additional approvals from other organization administrators before changes go into effect.

> 📘 Do you want to enable Organization Change Approvals?
>
> Contact your Customer Success Manager or reach out to [support@moderntreasury.com](mailto:support@moderntreasury.com).

# Governed Changes

Currently this control governs the following:

* [Payment Approval Rules](/payments/docs/approval-rules-overview)
* [Roles and Permissions](https://docs.moderntreasury.com/platform/docs/roles-and-permissions)  (User Management)
  * Groups
  * Roles
  * Permission Sets
* [Transaction Categorization Rules](https://docs.moderntreasury.com/platform/docs/transaction-categorization-rule-changes)

# Setup

## Prerequisites

1. [SCIM](https://docs.moderntreasury.com/platform/docs/user-lifecycle-management-with-scim) must be enabled and set up for your organization.
2. You must have a Group labeled "Administrators". Users from this Group will be responsible for approving changes.
3. The "Administrators" Group must have the "Administrator" Role.
4. There must be at least 2 members in the "Administrators" Group.

## Enable Organization Change Approvals

To enable Organization Change Approvals, ensure that you meet the prerequisites outlined above. Once you meet the prerequisites, please contact your Customer Success Manager or reach out to [support@moderntreasury.com](mailto:support@moderntreasury.com).

# How it works

When a change is made to an object governed by this control, all other users that are part of the "Administrators" Group will be alerted to the change via email. They can then approve or deny the change.

Until the change is approved or denied, the following applies:

* All pre-change configurations will remain in place until the pending change is approved.
* No additional modifications can be made to the object.

# FAQs

## When are approvals required?

For the objects governed by this control, any attempt to create, modify, or delete an object will require an approval from another Administrator.

## Can I approve my own change?

When this control is enabled, the user who made the change cannot approve or reject the change. The additional approval must come from another user in the "Administrators" Group.

## Who can approve changes?

Users in the "Administrators" Group are able to approve or reject changes made by others.

## Can others make changes while one is pending?

Once a change has been made, no further modifications can be made to the object until the change is either accepted or denied.

## When do approved changes take effect?

Upon approval, changes will be immediately applied. Alternatively, if the change is rejected, there will be no modifications.

## How do I disable Organization Change Approvals?

To disable Organization Change Approvals, please contact your Customer Success Manager or reach out to [support@moderntreasury.com](mailto:support@moderntreasury.com).
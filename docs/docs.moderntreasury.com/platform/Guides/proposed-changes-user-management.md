# Roles and Permissions (User Management) Changes

# Overview

For roles and permissions (user management) settings, the following kinds of changes will require approval:

* Groups
  * Update a Group's Role
* Roles
  * Update a Role's Permission Sets, name, and description
  * Delete a Role
* Permission Sets
  * Update a Permission Set's Permissions, name, and description
  * Delete a Permission Set

# Groups

You can change the Role assigned to a Group in your organization.

Since SCIM is a requirement for organization change approvals, you cannot change the name, description, or user membership of groups. Those are managed by SCIM with directory sync. You also cannot delete SCIM-managed groups in the app. If you want to make those changes, you will need to make them in your identity provider and sync the changes.

See our [SCIM guide](https://docs.moderntreasury.com/platform/docs/user-lifecycle-management-with-scim) for more information.

# Roles

You can change the Permission Sets, name, and description assigned to a Role in your organization.

You can create new Roles, modify existing ones, and delete existing ones. A Role can have more than one Permission Set assigned to it.

*Note: Role creation does not require admin approval since creation does not affect users' permissions (until it is assigned to a Group).*

# Permission Sets

You can change the Permissions, name, and description assigned to a Permission Set in your organization.

You can create new Permission Sets, modify existing ones, and delete existing ones. A Permission Set can have more than one Permission assigned to it.

*Note: Permission Set creation does not require admin approval since creation does not affect users' permissions (until it is assigned to a Role).*
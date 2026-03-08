# Dashboard Overview

## Managing API Keys

In Lithic Dashboard, you can add, disable, and delete your production and sandbox API keys. Please note that only Program Admins and Organization Admins have access to and control of API keys.

In the event that you need to cycle an API key that is currently in use:

* Create a new production API key and enable it
* Replace your existing key with the newly created key in your service
* When ready, delete your old key

<div align="center">
  <img src="https://files.readme.io/288d85d239c0b0cfe8a5948590e9adbb6e3fed6f541a7fd6c5a2598407f00679-managing-api-keys.png" alt="Managing API Keys" />
</div>

## Verifying Webhooks with Multiple API Keys

<Callout icon="📘" theme="info">
  Please note that customers receiving webhooks via Privacy will not receive the signature required to verify multiple API keys.
</Callout>

Lithic webhooks will contain an `x-lithic-signature` header with a list of space delimited signatures and their corresponding version identifiers. For example:

```json
v1,Y3bj/aHS1kUtyCXKYs94OiHdV4c2l8LtMKqyW/nU7P4= v1,8eG1l/ruP5jORHq3P9fCdwoLKsJXRpZq+SG7GhVKScs=
```

Make sure to remove the version prefix and delimiter (e.g. v1,) before verifying the signature. For code examples for multi-API key webhook verification, see [Transaction Webhook Verification](https://docs.lithic.com/docs/transaction-webhooks#webhook-verification).

# Managing Lithic Organizations and Programs

## Managing Organizations

At Lithic, each customer has a single organization. Each organization can have one or more programs.  Your organization can be configured in your [Organization's settings](https://app.lithic.com/organization-settings) page in the following ways:

1. Set up and update your Control Person
2. Designate Support contacts for Lithic to reach out to for technical, risk/fraud, and compliance matters.
3. Manage Organization-wide members.  See Inviting Team Members below for more.

## Managing Individual Programs

Each program has its own set of API keys and can be configured individually in the [Program Settings](https://app.lithic.com/programs/default/dashboard) page.

*Note that the above link will take you to your most recent program's settings - if you have multiple programs, ensure you are on the correct program or switch to it via the dropdown in the top left*

<div align="center">
  <img src="https://files.readme.io/ab1961be2c5f6a65c6a63073a19ac0da0c36d1c18b54f21eb50ad67f52ed8875-managing-individual-program.png" alt="Managing Individual Program" />
</div>

On this page, you'll be able to:

1. Edit the name of the Program
2. Manage production and sandbox API keys
3. View [ASA](https://docs.lithic.com/docs/auth-stream-access-asa) HMAC secrets
4. View card program details
5. View digital card art details
6. View your program's limits
7. Manage Team-specific members.  See Inviting Team Members below for more.

## Inviting Team Members

You can invite team members at either the organization level or the program level.

Organization-wide team members have their respective permissions for every program within the organization - as opposed to program-level roles, which only have permissions for a specific program.

You can invite members via the "Invite Organization/Program Members" button in the Members section of either page.

<div align="center">
  <img src="https://files.readme.io/8f31f0a2826f0e7b2de03c21a7ea84143ed44e17768b058299be23a8e96a340f-inviting-team-members.png" alt="Inviting Team Members" />
</div>

You can invite team members by email by clicking on the Invite Organization Members button. **Please note that each email/user can only be a part of one Lithic Organization at a time.**, though they can have different permissions at the organization level and at each program level. When you send an invite, there are a few different scenarios that can happen depending on the state of the invitee:

1. If the invitee has not used their email to sign up for Lithic before, they will receive an email to sign up to join your team with the specified permissions.
2. If the invitee already has a Lithic account, they will receive a similar email but be asked to leave their organization to join your organization.
3. If the invitee is already part of your organization (whether they have an organization-level role or a team-level role), they will be given the additional permissions without any action on their part.  They will receive an email notifying them of their new permissions.  Example:
   1. Your organization has Program A and Program B.
   2. `person@company.com` has an organization-wide Read-Only role.
   3. You "invite" `person@company.com` to be a Card Admin for Program A.  This person will receive an email informing them of their new permissions, but they do not need to click a link or accept anything.
   4. `person@company.com` now has Read-Only permissions for Program B, and Card Admin permissions for Program A.

When a team member has multiple roles across programs and the organization, the permissions they have for any specific program will be the union of their permissions for the specific program and their organization-level permissions.

### Roles and Permissions

Once registered on Lithic Dashboard, you can view which permissions are allowable by which roles here:

[https://app.lithic.com/permissions-matrix/customer](https://app.lithic.com/permissions-matrix/customer)

In Dashboard's Sandbox environment, any user, regardless of their role, have elevated privileges when interacting with cards, disputes, and auth rules.  This allows your developers to test more quickly without needing escalated privileges in an environment with real financial assets.

# Managing Multiple Lithic Programs

For customers with more than one Lithic program, you can switch between your programs in Lithic Dashboard.

To navigate between your programs, use the dropdown at the top of the sidebar.  This dropdown will only appear on pages that are specific to a program (Cards/Transactions/Program Settings/etc).

<div align="center">
  <img src="https://files.readme.io/3d20aa8ffccd859558dad03a69cdfca59669b57b53a2f7ae948eb9bc5143292a-managing-multiple-lithic-programs.png" alt="Managing Multiple Lithic Programs" />
</div>

## Adding a New Lithic Program

To add a new Lithic program, click on the `New Program` button in the aforementioned dropdown. You'll be prompted to name your new program to proceed. Once you've created your new program, speak to your Customer Success or Implementation manager to configure it.

<div align="center">
  <img src="https://files.readme.io/7d6d70cc55e85bfbaf378cd0c72fbd7c858ba06087537fa5ac6ff07c8f54bd53-adding-a-new-lithic-program.png" alt="Adding a New Lithic Program" />
</div>
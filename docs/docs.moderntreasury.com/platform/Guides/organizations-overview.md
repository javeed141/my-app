# Managing Your Environments

An Organization in Modern Treasury centralizes all your accounts, operations, and team management. An organization can have many accounts and enables you to define granular permissions and controls using role-based access controls streamlining your operations and reporting.

You can register for Modern Treasury and gain access to a sandbox for the newly created organization. To do so, head over to [https://app.moderntreasury.com/sign\_up](https://app.moderntreasury.com/sign_up). You will be able to sign up, verify your email address, and create a new organization.

# Environments

Every organization is initially provisioned two environments, one live and one sandbox environment.

## Live

The live (or sometimes referred to as "production") environment is used to isolate actual money movement or tracking. Some or all functionality may not be available to you in your live environment based on your enabled products or based on your onboarding progress.

## Sandbox

Every organization is provisioned a sandbox which can be used for testing and integration. The sandbox is fully functional, with feature parity to a production environment. We also provide sandbox-only functionality to help you simulate realistic workflows without risk. For example, you can simulate payment returns or specific reconciliation scenarios without moving any money.

# Resetting your Sandbox

<Callout icon="🚧" theme="warn">
  ## Sandbox resets affect all users.

  If your sandbox is shared or being used by other users within your organization, a sandbox reset will also affect any related objects they may have created or create during the reset processs.
</Callout>

## 1. Navigate to Sandbox settings

> 📘 Only those with Manage Organization permissions can reset the sandbox.
>
> You must belong to at least one role assigned the "Manage Organization" permission in order to reset the sandbox.

To reset your sandbox, navigate to Settings > [Sandbox](https://app.moderntreasury.com/settings/organization?section=Sandbox) and click the `Reset Sandbox Data` button.

## 2. Select objects to reset

In the modal, select from the dropdown which group of objects you want to reset:

* All Sandbox Data
* Transactional Data
* Advanced

Data objects have dependencies; we delete them in groups to reduce the risk of dependent data not being deleted together.

### All Sandbox Data

If you select 'All Sandbox Data' you will delete the following object types from your Sandbox:

* Transactions
* Sweep Rules
* Payment Orders
* Expected Payments
* Counterparties
* Incoming Payment Details
* Balances
* Returns
* Ledgers
* Account Groups
* Virtual Accounts
* All Accounts Data
* Invoices
* Connections

<Image border={false} src="https://files.readme.io/4788026-image.png" />

### Reestablish Connections after deletion

<Callout icon="🚧" theme="warn">
  #### Need to add Connections back in after deleting them?

  Set $org\_id and $api\_key environment variables or replace authentication to replicate default connections into your Sandbox.

  ```
  curl --request POST \
       --url 'https://app.moderntreasury.com/api/connections' \
       --header 'accept: application/json' \
       --user $org_id:$api_key \
       --header 'content-type: application/json' \
       --data '{"entity_id":"example1","nickname":"GWB"}'

  curl --request POST \
       --url 'https://app.moderntreasury.com/api/connections' \
       --header 'accept: application/json' \
       --user $org_id:$api_key \
       --header 'content-type: application/json' \
       --data '{"entity_id":"example2","nickname":"IBB"}'
  ```
</Callout>

### Transactional Data

If you select 'Transactional Data' you will delete the following object types from your Sandbox:

* Transactions
* Payment Orders
* Expected Payments
* Counterparties
* Incoming Payment Details
* Balances
* Returns
* Ledgers
* Virtual Accounts
* Invoices

<Image border={false} src="https://files.readme.io/f7abccc-image.png" />

#### Advanced

This is recommended only for advanced users. You can select individual data objects for deletion. Deleting data objects without deleting dependent data objects can result in a broken sandbox data model.

In the modal, select the objects you want to reset. Use the Toggle All button to conveniently select or deselect all options.

<Image border={false} src="https://files.readme.io/d918273-image.png" />

## 3. Submit & confirm

Once you have selected the desired option, click the `Delete` button. You will be prompted to confirm your decision. Upon confirmation, a message will be displayed informing you that an email will be sent once the reset has been completed.

<Callout icon="🚧" theme="warn">
  #### Do not create objects while reset is in progress.

  While the reset is in progress, do not create any new objects as you may experience inconsistent results.
</Callout>

## 4. Email confirmation

You will receive an email confirmation once the reset is complete.
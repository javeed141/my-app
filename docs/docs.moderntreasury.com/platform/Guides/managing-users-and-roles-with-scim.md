# Manage users with SCIM

Provision, update, and deprovision users using SCIM

# Adding users to your organization

To add users to your organization, create and provision them in your identity provider. Users are uniquely identified by their associated email.

## Provisioning new users

If you provision a new user with an email that does not already exist in Modern Treasury, directory sync will create a new user in your organization.

## Provisioning existing users

If you provision a user with an email that already exists in your organization, directory sync will find the local user with the matching email and turn it into a directory synced user. No duplicate users will be created.

# Updating user details

Once SCIM and directory sync is configured for your organization, updates to users must be done in your identity provider. You will not be able to edit user details through Modern Treasury's settings.

Changes made in your identity provider will be automatically synced to Modern Treasury.

# Deleting users from your organization

If you want to remove directory synced users from your organization, de-provision them in your identity provider.

## Cleaning up local users

Once you have set up directory sync, we recommend deleting local users that are not managed by your identity provider.

To delete a local user, go into the user's edit view and click on the `Delete User` button at the bottom of the page. Confirm the deletion in the modal.
# Manage groups with SCIM

Add, update, and delete roles using SCIM

# Adding groups to your organization

If your organization has a local group with the same name as the group you're pushing from your identity provider, a new, separate group with the same name will be created in your Modern Treasury organization. The newly created directory synced groupwill have a lock symbol.

Directory synced role names are unique - this is enforced by your identity provider.

<Image alt="The top Hellenist role is directory synced and the bottom Hellenist role is local." align="center" border={true} src="https://files.readme.io/2a7b0e7-Screenshot_2023-05-24_at_12.36.47_AM.png">
  The top Hellenist role is directory synced and the bottom Hellenist role is local.
</Image>

# Updating group details

Once SCIM and directory sync is configured for Modern Treasury, updates to group must be done in your identity provider. You will not be able to edit group name, description, or users for any groups (directory synced or local).

# Deleting groups from your organization

> 🚧 Delete groups with caution
>
> Deleting groups will also affect the groups's associated approval rules and notification groups. This applies to both directory synced and local groups.

## Effect on approval rules

Approval rules for Payments, External Accounts, and Cases require review from assigned groups. Deleting or de-provisioning a group will have the following effect:

* For approval rules requiring approval from only the deleted group, the rule will be automatically deleted.
* For approval rules requiring approval from more than just the deleted group, the rule will not be deleted but the deleted group will be removed from the approvers list.

## Effect on notification groups

Deleted groups will be automatically removed from notification groups.

## Cleaning up local groups

Once you have set up directory sync, we recommend deleting local groups that are not managed by your identity provider.

Before deleting local groups with a directory synced copy, add the directory synced group to the local group's approval rules and notification groups.

To delete a local group, go into the group's edit view and click on the `Delete group` button at the bottom of the page. Confirm the deletion in the modal.
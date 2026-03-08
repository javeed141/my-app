# Connect Your Identity Provider

## Before starting

Confirm that SCIM is enabled for your Modern Treasury organization. You can check this by going to your organization settings and looking for the `Directory Sync` section.

If SCIM is not enabled, reach out to customer support ([support@moderntreasury.com](mailto:support@moderntreasury.com)).

## Go to the directory sync setup portal

First, visit your organization’s [general settings](https://app.moderntreasury.com/settings/organization) in the Modern Treasury app and click on `Configure` in the Directory Sync section:

<Image align="center" className="border" border={true} src="https://files.readme.io/2243cdd-small-Screenshot_2023-05-16_at_4.07.59_PM.png" />

This will open a new page to a directory sync setup portal:

<Image align="center" className="border" border={true} src="https://files.readme.io/7a8d7f1-small-Screenshot_2023-05-16_at_3.02.31_PM.png" />

## Follow the setup guide for your identity provider

Next, select your identity provider from the list to open the setup guide for your identity provider.

The two main steps the guide will walk you through are:

1. How to add Modern Treasury as a new managed application for your identity provider, and
2. How to provision users and groups for your Modern Treasury organization.

> 📘
>
> If you already have an existing integration in your identity provider for Modern Treasury, you can add SCIM to it instead of creating a new app integration. For example, Okta's docs for how to do that are [here](https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SCIM.htm).

For example, the first page of the Okta setup guide looks like the following:

<Image align="center" className="border" border={true} src="https://files.readme.io/18fc9db-small-Screenshot_2023-05-16_at_3.02.34_PM.png" />

> 🚧 Complete all directory sync setup steps
>
> Skipping steps in the guide may lead to incomplete SCIM configuration or unexpected directory sync behavior.

## Review your directory sync setup

Once you are finished configuring your identity provider, return to the Modern Treasury app and confirm the users and groups you provisioned have synced in the \[[User Management](https://app.moderntreasury.com/settings/user_management/groups)]Settings page.

Users and groups managed by directory sync will have a new lock icon. These synced users and groups can only be updated or deleted through your identity provider.

You can also click on the `Configure` button again in the organization settings' directory sync section to view a hosted directory sync status page:

<Image align="center" className="border" border={true} src="https://files.readme.io/5c8e9fa-small-Screenshot_2023-05-16_at_4.10.11_PM.png" />
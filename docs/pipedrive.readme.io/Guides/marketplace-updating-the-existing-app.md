# Updating approved apps

> 🚧
>
> Heads up! Due to a surge in demand and ongoing vacations, public app reviews may take up to 21 business days. Thank you for your patience!

> 📘
>
> **Disclaimer**\
> The Marketplace team reserves the right to make small changes to text fields and images uploaded to the app's listing in order to give the best possible user experience. You'll be notified when something is edited.

To update your approved app, head to *[Settings > (company name) Developer Hub](https://app.pipedrive.com/developer-hub)* and click on the name of the approved app.

<Image alt="Developer Hub dashboard" align="center" width="75% " src="https://files.readme.io/2651664-Developer_Hub_dashboard_-_apps_list.png">
  Click on the name of your approved app in Developer Hub
</Image>

From here, you can make changes to your app and its Marketplace listing page. For example, you can update scopes, add app extensions, change the app listing’s images, video (YouTube) link, descriptions and more.

Depending on the fields you change/edit, your app **may have to go through** the [app approval process](https://pipedrive.readme.io/docs/marketplace-app-approval-process) again.

<hr />

## Critical and non-critical fields

<hr />

A critical field in your app registration form is an aspect of your app that can affect how it works for users, for example, the callback URL, scopes and app extensions. Editing these fields will **require you to go through** the [app approval process](https://pipedrive.readme.io/docs/marketplace-app-approval-process) again to apply the changes.

A non-critical field is an aspect that doesn’t affect how your app works, for example, your app listing’s images, YouTube video link and support and legal information.

Here is the list of critical and non-critical fields in the app registration form for approved apps:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Critical fields
      </th>

      <th>
        Non-critical fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Basic info
        – Callback URL

        OAuth & access scopes
        – Access scopes
        – Installation URL

        App extensions
        – Link actions
        – JSON modals
        – JSON panels
        – Custom modals
        – Custom panels
        – Custom floating window
        – App settings page

        General info
        – App category
      </td>

      <td>
        Basic info\
        – App name

        General info\
        – Short summary\
        – App icon\
        – App listing images\
        – Full description\
        – YouTube video link

        Setup and installation\
        – Instructions for users

        Support and legal info\
        – Website URL\
        – Terms of Service URL\
        – Privacy Policy URL\
        – Pricing page URL\
        – Support URL\
        – Support email\
        – Documentation URL\
        – Issue tracker URL

        App review info\
        – Main contact email
      </td>
    </tr>
  </tbody>
</Table>

### Editing critical fields

When you edit a critical field in your app and click “Save”, you will be prompted with a confirmation dialog.

<Image alt="Developer Hub - approved app - editing a critical field" align="center" width="75% " src="https://files.readme.io/9d664e8-Developer_Hub_-_approved_app_-_editing_a_critical_field.png" />

Should you wish to continue editing your app, click “Continue”. You will be returned to your Developer Hub dashboard, where a private copy of your app with [pending changes](https://pipedrive.readme.io/docs/marketplace-updating-the-existing-app#pending-changes) will be created.

### Editing non-critical fields

The changes will be live immediately when you edit a non-critical field and save your app. This action will also send an automatic notification to the Pipedrive Marketplace team so that we can keep an eye on all changes made to approved apps.

<hr />

## Changing app scopes

<hr />

As a user can either accept or deny **all scopes**; therefore, remember to **only request absolutely necessary scopes** for your app’s use case.

You can edit your app’s [access scopes](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations) in Developer Hub. As it’s a critical field, here’s what happens when you change your app’s scopes:

1. A private copy of your app with pending changes will be created
2. You can now add/remove scopes in the OAuth & access scopes tab
3. Your app, with its pending scope changes, will be sent for review
4. Once the changes are approved, you can merge them into your original app
5. The changes will be live immediately after the merge and applied to your app’s users
6. Your private app copy with pending changes will be deleted after the merge

All new installations will have your new scopes. The scopes displayed in the installation screen of the app listing will also be automatically updated to reflect the new scopes.

Note that adding new scopes will not halt the app’s functionality – the features built with previous scopes will continue working – while removing scopes may disrupt your app’s functionality.

### If you added scopes

After your app’s changes are merged, user reauthorization is required:

* All existing users who have your app installed will receive an email from Pipedrive informing them about the change in scopes. The email will state what information your app requests access to and **ask the user to reauthorize the app**.
* The old access tokens will be invalidated and can be refreshed with the old refresh tokens. The refresh tokens will remain valid for the old scopes until the user reauthorizes the app.
* The new scopes will only be accessible after the user reauthorizes the app. **Users should also be guided from the app’s side to reauthorize the app**.

### If you removed scopes

If you **only removed scopes**, you will only need to **refresh the tokens**.

<hr />

## Changing your app name

<hr />

<Image title="Screenshot 2020-09-07 at 14.27.15.png" alt={2336} align="center" width="smart" src="https://files.readme.io/b262da1-Screenshot_2020-09-07_at_14.27.15.png" />

The app name is a non-critical field in Developer Hub. If you need to change your app name, there’ll be no additional reviews from the Marketplace Team. The only change will be your app’s URL in the Marketplace, which may affect your Marketplace app listing’s Search Engine Optimization (SEO).

<hr />

## Pending changes

<hr />

<Image alt="Developer Hub - approved app - editing a critical field" align="center" width="75% " src="https://files.readme.io/a0695d2-Developer_Hub_-_approved_app_-_editing_a_critical_field.png" />

When you edit critical fields in your app, save it and click "Continue" in the confirmation dialog, a private copy of your app with pending changes will be created.

You will be returned to your Developer Hub dashboard, where you’ll see your private app copy underneath your approved app. Click on your private app copy’s name to continue making any changes to your app.

<Image alt="Developer Hub - approved app - apps list with app copy" align="center" width="75% " src="https://files.readme.io/21fb734-Developer_Hub_-_approved_app_-_apps_list_with_app_copy.png" />

To publish your pending changes, you need to send your app for review again. Click “Save” and confirm your email address to send your app copy with its pending changes for approval.

<Image alt="Developer Hub - approved app - send app for review" align="center" width="75% " src="https://files.readme.io/2115bce-Developer_Hub_-_approved_app_-_send_app_for_review.png" />

<hr />

## Merging pending changes to your app

<hr />

> 📘
>
> NB: Your app's `client_id` and `client_secret` **will not change** after you merge its pending changes. Your app will retain the same `client_id` and `client_secret` that it originally had.

When your app’s pending changes are approved, you can merge and publish them to your original app via the “Merge changes” button or the “Merge changes” option in the three-dot menu. The changes will then be applied to all users.

<Image alt="The “Merge changes” button will be enabled once your app’s pending changes are approved" align="center" width="75% " src="https://files.readme.io/9409c3e-Developer_Hub_-_approved_app_-_merge_changes_button.png">
  The “Merge changes” button will be enabled when your app’s pending changes are approved
</Image>

<Image alt="Developer Hub - approved app - merge changes - three-dot menu" align="center" width="75% " src="https://files.readme.io/dca6901-small-Developer_Hub_-_approved_app_-_merge_changes_-_three-dot_menu.png">
  The “Merge changes” option will be enabled in the three-dot menu\
  when your app’s pending changes are approved
</Image>

When you click “Merge changes”, you will be prompted to confirm your action. Once confirmed, the changes will be merged into your original app, and your private app copy with pending changes will be deleted.

<Image alt="Merge changes confirmation dialog box" align="center" width="75% " src="https://files.readme.io/7e75328-small-Developer_Hub_-_approved_app_-_merge_changes_confirmation.png" />

<br />

<hr />

## Hiding an app from the public listing

<hr />

### Hidden by the app owner

Your app has to be approved and public for you to unpublish it. To unpublish your app, go to three-dot next to your approved app’s name and click “Unpublish”.

<Image alt="Hiding an app from the public listing" align="center" width="75% " src="https://files.readme.io/48c3030-Developer_Hub_dashboard_-_published_apps.png" />

​​When you unpublish your app, it will be hidden from the Marketplace without uninstalling it for existing users. Your app’s Marketplace listing page will remain available for anyone with its direct link.

The app will be visible only in the Marketplace Catalog list view for the app owner’s Pipedrive company and the Marketplace team. Remember that anyone with the link to your app can still view and install it.

[Why can’t I see "Publish" or "Unpublish" button?](https://pipedrive.readme.io/docs/faq#why-cant-i-see-the-green-publish-button-in-marketplace-manager)

### Hidden by the Marketplace team

If the Marketplace team decides to unpublish your app, it will be hidden from the Marketplace but remain installed for existing users. Similarly, anyone with the link to your app can still view and install it.

The Marketplace team will contact and inform you of the issues you must resolve before the app can be published again.
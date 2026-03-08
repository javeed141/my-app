# FAQ

### Where can I find my `client_id`?

To find your `client_id,` you will have to

1. Sign up for a [developer sandbox account](https://developers.pipedrive.com/)
2. Go to [*Settings > (company name) Developer Hub*](https://app.pipedrive.com/developer-hub) in your developer sandbox account
3. Click on “Create an app” or “+ Create an app” if you have existing apps
4. Choose whether you would like to create a public or private app
5. In the Basic Info tab of Developer Hub, fill in the required fields – App name and OAuth Callback URL

<Callout icon="📘" theme="info">
  You can insert a non-functioning OAuth Callback URL for the time being
</Callout>

6. Click the green “Save” button to save the form
7. You’ll automatically be brought to the second tab, “OAuth & access scopes”, where you’ll get your `client_id` and `client_secret`

<hr />

### How can I add additional users to a sandbox account?

You can add users to your account by going to *Settings > (company) > Manage users* in the Pipedrive web app. For additional information or special requests, please contact [marketplace.devs@pipedrive.com](mailto:marketplace.devs@pipedrive.com).

<hr />

### What should I consider when adding visuals to the Marketplace listing of your app?

When adding visuals for your app listing in the Marketplace, we advise you to consider adding multiple images with explanatory texts to showcase

* How your app works with Pipedrive
* What users can do with your app
* How app extensions work for your users
* The most common use cases so it increases users’ interest

You can also add one Youtube video link to demonstrate and market your app.

<hr />

### When installing the app, the user gets an error containing the message → `{"error": "Invalid redirect URL"}`? How can I fix that?

The `redirect URL` is the same as the `callback URL`. You can see how the `redirect URL` is defined for your app in the Developer Hub. The error can occur when the `redirect URL`, defined in Developer Hub doesn't exactly match the `redirect URL` given to the user.

<hr />

### Why do I get an error message stating "*App not found*" when I try to access my app?

This error message most likely appears because you were using another Pipedrive account from which the app was added (even if Developer Hub is enabled on both accounts, you would still get this error). Just switch back to the correct company which the app was first created on by clicking onto your profile > *Change company* and choosing the company.

Additionally, we recommend clearing your cookies to help resolve the issue. When accessing your app from the correct Pipedrive account, the OAuth authentication process should work even if your app is in draft mode. For more information see the [OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization).

<hr />

### Why do I get the following error message `{"success":false,"error":"Scope and URL mismatch"}`?

This error message appears because you might not have requested access to the correct scopes. For more information about which scopes to use and when to use them, see [scopes and permissions explained](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations).

<hr />

### Can apps be installed for the whole company or does each user need to install the app for themselves?

No, each user must individually install and allow access to the app for their account.

<hr />

### Can the data in my live/production account be replicated in my developer sandbox account?

No, the data in developer sandbox accounts are completely separate and are in no way synced with live/production accounts.

<hr />

### Why does it show `deleted: "true"` for deals but organizations (and other items) have an `active_flag: "false"` to display the status of the item?

A deal is shown as active or not with the combination of `deleted` and `active` parameters which both show boolean values. These parameters correspond directly with `active_flag` parameter values as follows:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th />

      <th>
        Example of a Deal Status
      </th>

      <th>
        Example of an Organization Status
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Item is deleted
      </td>

      <td>
        ```
        active: "false",
        deleted: "true"
        ```
      </td>

      <td>
        `active_flag: "false"`
      </td>
    </tr>

    <tr>
      <td>
        Item is active
      </td>

      <td>
        ```
        active: "true",
        deleted: "false"
        ```
      </td>

      <td>
        `active_flag: "true"`
      </td>
    </tr>
  </tbody>
</Table>

<hr />

### Why can’t I see the green "Publish" button in Developer Hub?

Apps that are [private](https://pipedrive.readme.io/docs/marketplace-creating-a-proper-app#private-apps) will not be published in the Pipedrive Marketplace.

To be able to publish your app and make it publicly available in our Marketplace), you’d need to submit it for  [the app approval process](https://pipedrive.readme.io/docs/marketplace-app-approval-process). When the app is approved and works as expected (e.g., app listing is technically, logically and grammatically correct; all installation flows work flawlessly, etc.), you’ll be able to use the “Publish” button.
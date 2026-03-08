# App sharing: Adding apps to multiple users

By default, Marketplace apps and their extensions are available to the user who installed them. However, it’s possible to enable app-sharing functionality for apps, allowing an admin user to add apps to other users within their company. Our apps support two modes of app sharing:

1. **Add app to an account** – This is the default app-sharing mode and is suitable for most types of apps since it requires minimum effort from the app creator. The users added to the app will receive notifications through multiple channels and will need to authorize and install the app to start using it.
2. **Add app to an account with shared app extensions** – This mode is similar to the above one, but users added to the app can also use its link actions and JSON panels without the need to authorize the app\
   ⚠️ Note that due to security reasons, this is the **legacy** app-sharing mode. As a general rule, we won’t enable this for new apps. However, if your app has a strong use case and you’re prepared to implement adequate access controls, [contact us](mailto:marketplace.devs@pipedrive.com) to discuss potential enablement.

> 📘
>
> Currently, enabling either of the app-sharing modes needs to be requested by writing to [marketplace.devs@pipedrive.com](mailto:marketplace.devs@pipedrive.com).

<hr />

# Why enable app sharing for your app?

<hr />

> 👍 Enabling app sharing offers benefits to multiple parties and user segments

1. **For app creators:** Your apps will achieve significantly greater visibility if admins add them to multiple users. Based on our data, up to **30%** of app installations are being shared, and **70%** of these shared installations are added to all users in the company. This adoption rate results in a considerably higher number of app installations per customer company, impacting the number of licenses and reducing churn probability.
2. **For admin users:** In many companies, due to the lack of a centralized system for sharing information, admins often rely on communication channels like Slack or email to push an app or integration forward, which may result in lower adoption rates and data silos. Allowing admins to add apps to multiple users in one go saves time while encouraging app adoption.
3. **For users:** Seamless access to information about added apps from a trustworthy source, along with entry points that take users directly to the authorization page, reduces barriers to installation and boosts confidence in authorizing the app, resulting in a significantly streamlined process.

<hr />

# Adding apps to other users within a company - user flows

<hr />

## Admin users’ experience

### App installation flow

Upon installing a Marketplace app that can be added to the company account, admins encounter a two-step installation flow.

<Image alt="Adding an app within a company" align="center" width="75% " src="https://files.readme.io/9e5ae2a-Adding_an_app_within_a_company.png" />

**Step 1.** Choosing between the following access options:

* **Only me**: The app and its extensions will be visible only to the admin user.
* **Specific users**: Adding the app to selected users within the company.
* **All users**: Adding the app to all users within the company.

The admin can email users about adding an app. Otherwise, users will receive in-app notifications by default to authorize it.

The admin can also make changes in app sharing by clicking the “Manage users” icon in Tools and integrations > Marketplace Apps.

<Image align="center" src="https://files.readme.io/7d93c82-Shared_app_install_-_step_2.png" />

**Step 2.** Admins need to accept app permissions for themselves.

Other users they are adding the app to will need to accept permissions for themselves through their own accounts, **as authorization is user-based, not company-based**. Users will be prompted to do so via several channels and locations.

> 📘
>
> An exception to the above is when an app has “Add app to account with shared app extensions” mode enabled and has Link actions or JSON panels. In this case, these extensions (i.e., interactive features) will be shared with the selected users.

Once a company adds new users, the apps won’t be automatically added to their accounts unless the admin had selected “all users” during installation.

The admin who added the app is the only one who can add/remove it from the company account and its users. However, other admins can view who added the app to the company account as long as they were added by the admin as well.

### Marketplace apps page in the web app

<Image align="center" width="500px" src="https://files.readme.io/7ea5fc9-Manage_users_view.png" />

On the Marketplace apps page, admin users can add the app to other users by clicking “**Manage users**” next to the app name or from the “...” menu.

A modal window opens where the admin can:

* View the list of users added to the app.
* View who added the app to the company account.\
  Search for a specific user and add or remove the app for them. ⚠️ Please note that once a user has authorized and, installed the app, removing it from a user’s account won’t uninstall it.
* Identify the app’s interactive features that are visible to other users (only if the “Add app to account with shared app extensions” mode is enabled for the app).

<hr />

## Experience for users the app was shared with

> 📘
>
> Note that user experience and content may vary depending on the mode of app sharing enabled for an app.

When an admin adds an app to a user, the user will be notified via different channels and the app’s extensions:

### Email

<Image align="center" width="400px" src="https://files.readme.io/6498738-Shared_app_email.png" />

If the admin chooses the emailing option upon app installation, the user will receive an email notification prompting them to authorize the app and start using it.

### Apps dock (or “My apps panel”)

A blue notification bubble will appear the next time the user opens or refreshes Pipedrive next to the “My apps” icon on the top menu bar:

<Image align="center" width="400px" src="https://files.readme.io/b02c00c-Shared_app_in_apps_dock.png" />

Additionally, a separate section for apps added by the admin will be visible to the user until they authorize the app. Once authorized, the app will appear either under **Apps with quick access** or in **Other apps**:

<Image align="center" src="https://files.readme.io/646b234-Shared_app_in_apps_dock_2.png" />

### Marketplace apps list in "Tools and apps"

<Image align="center" src="https://files.readme.io/650b434-Marketplace_apps_list.png" />

The app will be labeled **Added by Admin** beside an **Authorize app** button.\
Apps have 3 potential statuses:

* Authorize app: The app has been added by an admin. To use it, the user now needs to authorize it.
* Re-authorize: The app has updated its scopes, or the authorization has expired. The user needs to re-authorize it to start using it on their account again.
* Authorized: the app is authorized and ready to use.

### App extensions

If an app offers extensions or interactive features, users will receive prompts to authorize the app in areas where the extensions are available. While the information and call-to-action may vary slightly depending on the location and type of sharing for different apps, users will receive similar prompts and information.

<Image align="center" src="https://files.readme.io/e5754e8-Shared_app_in_app_panel.png" />

For a comprehensive overview of all app extensions and their behavior for both modes of app sharing, please refer to the table below.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        App extension
      </th>

      <th>
        Add app to account
      </th>

      <th>
        Add app to account with shared app extensions (legacy)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Link action
      </td>

      <td>
        🔒 App authorization is needed to use the app.

        ![](https://files.readme.io/e48553d-Shared_link_action_1.png)
      </td>

      <td>
        ✅ Usable without app authorization.

        ![](https://files.readme.io/6d77a5f-Shared_link_action_2.png)
      </td>
    </tr>

    <tr>
      <td>
        JSON Panel
      </td>

      <td>
        🔒 App authorization is needed to view any data or actions.

        ![](https://files.readme.io/cb15543-Shared_JSON_panel_1.png)
      </td>

      <td>
        ✅ Data is visible without app authorization.

        ❗️ Data security risk: Access control has to be implemented on the app’s side to prevent unauthorized access to data.

        ![](https://files.readme.io/aa4813c-Shared_JSON_panel_2.png)
      </td>
    </tr>

    <tr>
      <td>
        JSON Modal
      </td>

      <td>
        🔒 App authorization is needed to use the app.

        ![](https://files.readme.io/52d1897-Shared_JSON_modal_1.png)
      </td>

      <td>
        🔒 App authorization is needed to use the app.

        ![](https://files.readme.io/c743c80-Shared_JSON_modal_2.png)
      </td>
    </tr>

    <tr>
      <td>
        Custom UI panel
      </td>

      <td>
        🔒 App authorization is needed to use the app\
        .\
        ![](https://files.readme.io/6ea42a4-Shared_Custom_UI_panel_2.png)
      </td>

      <td>
        🔒 App authorization is needed to use the app.

        ![](https://files.readme.io/9db4189-Shared_Custom_UI_panel_1.png)
      </td>
    </tr>

    <tr>
      <td>
        Custom UI action
      </td>

      <td>
        🔒 App authorization is needed to access/use the app.

        ![](https://files.readme.io/34c299a-Shared_Custom_UI_action_1.png)
      </td>

      <td>
        🔒 App authorization is needed to access/use the app.

        ![](https://files.readme.io/39748e6-Shared_Custom_UI_action_2.png)
      </td>
    </tr>

    <tr>
      <td>
        Floating window opened by clicking on a phone number
      </td>

      <td>
        🔒 App authorization is needed to access/use the app

        ![](https://files.readme.io/63b3d7a-Shared_Floating_window.png)
      </td>

      <td>
        The same experience as on the left.
      </td>
    </tr>

    <tr>
      <td>
        Floating window opened by clicking on it in Apps dock
      </td>

      <td>
        App details modal window in web app Marketplace is opened.

        🔒 App authorization is needed to access/use the app
      </td>

      <td>
        The same experience as on the left.
      </td>
    </tr>

    <tr>
      <td>
        Messaging extension
      </td>

      <td>
        🔒 App authorization is needed to access/use the app

        ![](https://files.readme.io/5675a4d-Shared_Messaging_extension.png)
      </td>

      <td>
        The same experience as on the left.
      </td>
    </tr>
  </tbody>
</Table>

<hr />

# Considerations before enabling app sharing

<hr />

## Authorization flow when using “Installation URL”

If your app makes use of the “Installation URL” field in DevHub, users wanting to authorize/install the app are directed to that URL (instead of Pipedrive OAuth page). You have to make sure that users who want to authorize the shared app (and might not have much context compared to the user who initiated the sharing) have a smooth experience logging in or signing up to your tool.

## Chrome extensions

If your app requires a Chrome extension to function, the installation process must be tailored to support app installation process starting from the app’s OAuth page. Users must have clear instructions on what to do after authorizing the app to ensure a seamless installation experience.

## Multi-user support

If your app doesn’t support multiple user accounts within a company, it may not be a suitable candidate for the “add app to account” sharing mode. In this mode, each user must authorize the app individually. However, your app could still benefit from the "add app to account with shared app extensions" mode, which allows users to access app features without individual authorization.

# Considerations when developing an app with shared extensions

<hr />

When your app has “add app to account with shared app extensions” legacy mode enabled, it’s important to consider how the shared extensions behave because all API communications will occur on behalf of the user who installed the app. When planning and developing app extensions, it’s important to consider the use cases they can cover and how information is displayed. Here are the key considerations to keep in mind:

## Use case planning

Consider whether your app’s functionality depends on user authorization or account creation. Map out use cases for all scenarios. Note that users who haven’t authorized the app can only use link actions on the panel. Other action types require authorization, meaning the user must have an account on your side.

## Data security

Determine which data should be visible in Pipedrive for users without the app installed or an account on your side. Should all company users see everything, or should visibility depend on the user’s role in Pipedrive or their role on your side?\
The [isShared](https://pipedrive.readme.io/docs/app-extensions-json-panels#how-does-a-json-panel-work) parameter’s value in JSON panel requests indicates whether the user viewing the JSON panel has installed the app themselves or if it’s been shared with them.

> 🚧 You need to adjust your application’s logic according to this parameter
>
> If the app is installed by a user with access to all data, it may make data visible to all Pipedrive users. Therefore, **it’s essential to implement appropriate access controls to ensure data security.**

## The state of sharing for an installed app

To help you understand whether the app was installed for private use or added to other company users (making its extensions available to them as well), we’ll send a `POST` request to the `Callback URL`, which is set in your app listing page in Developer Hub. The body of the request consists of the company ID, user ID and the [`isShared`](https://pipedrive.readme.io/docs/app-extensions-json-panels#how-does-a-json-panel-work) parameter.

```json Sample of the request body
{ 
    "company_id": 001,
    "user_id": 007,
    "isShared": false
}
```

This request will be sent if:

* A user installs the app.
* The admin user removes the app from other users in the company, making it a private installation.

### Ensuring proper behavior when an app is removed from other users

Admin users can add the app to other users’ accounts and also remove it from them. Your app’s functionality should appropriately consider this action. If you use app sharing in Pipedrive as an indicator of whether users on your side can interact with Pipedrive on behalf of the user who installed the app, ensure that when an app is removed from a user’s account, they can’t access Pipedrive data or perform actions on behalf of the primary user.

In order to maintain proper security measures, return an error for [JSON panel requests](https://pipedrive.readme.io/docs/app-extensions-json-panels#how-does-a-json-panel-work) from users who haven’t installed the app and no longer have it added by a Pipedrive admin. You can receive notifications of any changes in the status of app sharing by using the information from the `isShared` parameter in the `POST` request we send to your `Callback URL`.

### Using Pipedrive as the identity provider

If you allow your users to log in to your app via Pipedrive (using us as the identity provider), it’s important to ensure that adding/removing the app to/from other users works properly.
# Registering a private app

Private apps, aka internal apps, enable you to share your integration with any user/company in Pipedrive via a direct, unlisted installation link. To do so, you must fill out the parts of the app registration form that cover app creation and [make your private app live](https://pipedrive.readme.io/docs/marketplace-registering-a-private-app#how-to-share-your-private-app).

<hr />

## How to find Developer Hub

<hr />

First, go to *Settings* by clicking on your profile name in the upper right corner of the top navigation bar. Find the company name of your sandbox account and choose *Developer Hub* from the drop-down menu:

<Image title="How to find Developer Hub.png" alt={2576} align="center" width="80%" src="https://files.readme.io/6647eb9-How_to_find_Developer_Hub.png" />

You must have a developer sandbox account for app creation to see Developer Hub.

<hr />

## Register a new private app

<hr />

> 🚧
>
> NB: Do pick your app type carefully, as it cannot be changed later on Developer Hub.

To register a new app, click on the green “Create an app” button (or “+ Create an app” if you have existing apps) followed by “Create private app”. This is also where you’d see a list of your public and private apps if you have any.

<Image title="Developer Hub - create an app.png" alt={2560} align="center" width="80%" src="https://files.readme.io/47ae3f1-Developer_Hub_-_create_an_app.png" />

<hr />

## App registration form

<hr />

The app registration form for private apps contains three different tabs.

You can save your app anytime by clicking the green “Save” button and exiting the form by clicking the white “Close app settings” button. This will take you back to your Developer Hub dashboard.

Read on to find out how and what to fill in each tab.

### Basic info

<Image alt="Developer Hub > private apps - basic info" align="center" width="75% " src="https://files.readme.io/0417bd8-Developer_Hub_-_Private_app_-_Basic_info.png" />

This tab has two required fields – App name and OAuth Callback URL. Once you’ve filled this in, click the green “Save” button to save the form. You’ll then be brought to the second tab, “OAuth & access scopes”, where you’ll get your `client_id` and `client_secret` and the option to make your app live via the “Change to live” button.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        App name (required)
      </td>

      <td>
        Insert your app’s name by what it’s going to be recognized by in the Marketplace.

        *Example: Car Services App*
      </td>
    </tr>

    <tr>
      <td>
        Callback URL (required, one URL per app)
      </td>

      <td>
        Insert a link where an authorization code will be sent if the user approves or declines the installation of your app. This link is also where we return the user after successful authentication. Technically, a callback URL is the same thing as an OAuth `redirect_uri`.

        It’s okay to insert a non-functioning URL when creating a new app as long as you can update this field with a proper URL after implementing the logic needed to accept user authorization in your code. Please keep in mind that we allow only one callback URL per app.

        *Example: [https://www.carservicesapp.com/API/v2/callback](https://www.carservicesapp.com/API/v2/callback)*
      </td>
    </tr>
  </tbody>
</Table>

### OAuth & Access scopes

<Image alt="Developer Hub > private apps - OAuth & access scopes" align="center" width="75% " src="https://files.readme.io/a08a6fd-Developer_Hub_-_Private_app_-_OAuth__access_scopes.png" />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Access scopes (required)
      </td>

      <td>
        Using [scopes](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations), you can specify precisely what data access your application needs. Your selection will depend significantly on the endpoints you use in your app. You can also select the respective scope in this section if you are building a [manifest-based app extension](https://pipedrive.readme.io/docs/app-extensions#manifest-based-app-extensions).

        *Example:*\
        :white\_check\_mark: *Read users data*\
        :white\_check\_mark: *See recent account activity*
      </td>
    </tr>

    <tr>
      <td>
        Installation URL
      </td>

      <td>
        This is where you can add an optional URL to which users will be redirected when using your direct [installation link](https://pipedrive.readme.io/docs/marketplace-registering-a-private-app#get-your-installation-link).

        Use it when you need to start [app authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-1-requesting-authorization)  outside of Pipedrive, redirect users to a custom landing page, or implement the [state parameter](https://pipedrive.readme.io/docs/marketplace-oauth-authorization-state-parameter)   for additional security.
      </td>
    </tr>

    <tr>
      <td>
        Client ID
      </td>

      <td>
        This is where you will get your app’s unique `client_id` and `client_secret` for [OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization).
      </td>
    </tr>
  </tbody>
</Table>

> 👍
>
> Once you’ve completed filling up the Basic info and OAuth & access scopes, we advise you to **start installing your app and testing it** to see how it works. You can do so by clicking on the green “Install & test” button in the bottom left of the tab.

### App extensions

<Image alt="Developer Hub - private apps > app extensions" align="center" width="75% " src="https://files.readme.io/d82718a-Developer_Hub_-_Private_app_-_App_extensions.png" />

App extensions let you extend Pipedrive’s user interface with your app’s functionality and content to let users do more in one place. Find out more about them [here](https://pipedrive.readme.io/docs/app-extensions).

Within Developer Hub, the App extensions tab is where you can add new app extensions and manage the ones you’ve added before. A modal with an app extension creation form will open when you click the button to add the respective app extension.

You can also make your app live via this tab's “Change to live” button.

#### Link actions

Learn more [here](https://pipedrive.readme.io/docs/app-extensions-actions).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Action name (required)
      </td>

      <td>
        Insert your app action’s name that will be displayed in the Pipedrive UI. The name should be short, descriptive of the app action, and be in a sentence case format.

        *Example: Send quote - Car Services*
      </td>
    </tr>

    <tr>
      <td>
        Action description
      </td>

      <td>
        To showcase the interactive features of your app, your action’s name and description will appear in the Features section of your Marketplace app listing.

        Use the description field to let users know what they can do with this action.

        Optional; max 150 characters.
      </td>
    </tr>

    <tr>
      <td>
        URL link (required)
      </td>

      <td>
        Add the URL that will redirect the user to the correct app page when an action is clicked. The URL must handle both scenarios of the user being logged into your app and not being logged in.

        *Example: [https://www.carservicesapp.com/handle\_action](https://www.carservicesapp.com/handle_action)*
      </td>
    </tr>

    <tr>
      <td>
        [JWT](https://jwt.io/) secret
      </td>

      <td>
        If left empty, `client_secret` will be used by default.
      </td>
    </tr>

    <tr>
      <td>
        Locations (one required)
      </td>

      <td>
        Specify in which views the app action will be displayed. There can be a maximum of [3 app actions per app](https://pipedrive.readme.io/docs/app-extensions-actions#visibility-in-the-ui) or [custom modals](https://pipedrive.readme.io/docs/custom-ui-extensions-modals) in one view, altogether 21 (7 different views x 3 actions per view).

        * Example\_:\
          :white\_check\_mark: Activities list\
          :white\_check\_mark: Person details
      </td>
    </tr>
  </tbody>
</Table>

#### JSON modals

Learn more [here](https://pipedrive.readme.io/docs/app-extensions-json-modals).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Action name (required)
      </td>

      <td>
        The name of the JSON modal. The name should be short (max 30 characters), actionable, and sentence-cased (only capitalize the first word).

        *Example: + Prod. details - Car Services*
      </td>
    </tr>

    <tr>
      <td>
        Action description
      </td>

      <td>
        To showcase the interactive features of your app, your action’s name and description will appear in the Features section of your Marketplace app listing.

        Use the description field to let users know what they can do with this action.

        Optional; max 150 characters.
      </td>
    </tr>

    <tr>
      <td>
        API endpoint (required)
      </td>

      <td>
        All API requests related to this action will be sent to this URL.

        *Example: [https://www.carservicesapp.com/handle\_action](https://www.carservicesapp.com/handle_action)*
      </td>
    </tr>

    <tr>
      <td>
        [JWT](https://jwt.io/) secret
      </td>

      <td>
        If left empty, `client_secret` will be used by default.
      </td>
    </tr>

    <tr>
      <td>
        JSON schema (required)
      </td>

      <td>
        The [JSON schema](https://pipedrive.readme.io/docs/app-extensions-json-modals#schema) for your JSON modal.
      </td>
    </tr>

    <tr>
      <td>
        Locations (one required)
      </td>

      <td>
        There can be a maximum of 3 app actions or custom modals per location. Each app can have a total of 21 app actions. See more about available locations in [app actions' visibility](https://pipedrive.readme.io/docs/app-extensions-actions#visibility-in-the-ui).

        *Example: Deal details*
      </td>
    </tr>
  </tbody>
</Table>

#### JSON panels

Learn more [here](https://pipedrive.readme.io/docs/app-extensions-json-panels).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Panel name (required)
      </td>

      <td>
        Insert your JSON panel’s name that will be displayed in the Pipedrive UI. The JSON panel’s name should be descriptive and have a maximum of 30 characters.

        *Example: Car PM – Car Services*
      </td>
    </tr>

    <tr>
      <td>
        Panel description
      </td>

      <td>
        To showcase the interactive features of your app, your panel’s name and description will appear in the Features section of your Marketplace app listing.

        Use the description field to let users know what they can do within this panel.

        Optional; max 150 characters.
      </td>
    </tr>

    <tr>
      <td>
        API Endpoint (required)
      </td>

      <td>
        The URL of the endpoint which we'll use to fetch the data of the object properties

        *Example: [www.api.pipedrive.com/deal-view/visits](http://www.api.pipedrive.com/deal-view/visits)*
      </td>
    </tr>

    <tr>
      <td>
        HTTP Auth username (required) and HTTP Auth password (required)
      </td>

      <td>
        Our service will send the HTTP request with these credentials as the Basic Authentication header to protect your data. To protect your data, we strongly recommend using authenticated HTTPS requests. Note that we do not support self-signed certificates.
      </td>
    </tr>

    <tr>
      <td>
        [JWT](https://jwt.io) secret
      </td>

      <td>
        JWT is required **if** HTTP Auth is not provided.
      </td>
    </tr>

    <tr>
      <td>
        JSON data structure (required)
      </td>

      <td>
        A JSON file that describes the structure of your JSON panel as seen in the Pipedrive UI. See [here](https://pipedrive.readme.io/docs/json-panels-adding-a-panel#json-data-structure) for more information.
      </td>
    </tr>

    <tr>
      <td>
        Panel locations (one required)
      </td>

      <td>
        Choose where the panel will be displayed:\
        – Deal details\
        – Person details\
        – Organization details

        Each app can have one JSON or custom panel in each location.
      </td>
    </tr>
  </tbody>
</Table>

#### Custom modals

Learn more [here](https://pipedrive.readme.io/docs/custom-ui-extensions-modals).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Modal name (required)
      </td>

      <td>
        The name of your custom modal. Descriptive, max 30 characters and should be sentence-cased (only capitalize the first word).
      </td>
    </tr>

    <tr>
      <td>
        Modal description
      </td>

      <td>
        To showcase the interactive features of your app, your modal’s name and description will appear in the Features section of your Marketplace app listing.

        Use the description field to let users know what they can do within this modal.

        Optional; max 150 characters.
      </td>
    </tr>

    <tr>
      <td>
        Iframe URL (required)
      </td>

      <td>
        URL of the web content to be shown within the iframe\
        – Please ensure your iframe URL uses **HTTPS**
      </td>
    </tr>

    <tr>
      <td>
        [JWT](https://jwt.io) secret
      </td>

      <td>
        Optional. Defaults to `client secret`
      </td>
    </tr>

    <tr>
      <td>
        Entry points
      </td>

      <td>
        The custom modal will be shown as a link in the actions menu of the chosen entry point(s).

        Choose the location(s) your custom modal can be triggered from:\
        – Activities list\
        – Deal details\
        – Deals list\
        – Person details\
        – People list\
        – Organization details\
        – Organizations list

        If no entry points are selected, the only way to open a modal is via the [SDK](https://github.com/pipedrive/app-extensions-sdk). Maximum 3 app extensions per location.

        Each app can have a total of 21 custom modals or app actions.
      </td>
    </tr>
  </tbody>
</Table>

#### Custom panels

Learn more [here](https://pipedrive.readme.io/docs/custom-ui-extensions-panels).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Panel name (required)
      </td>

      <td>
        The name of your custom panel. Descriptive, max 30 characters and should be sentence-cased (only capitalize the first word).
      </td>
    </tr>

    <tr>
      <td>
        Panel description
      </td>

      <td>
        To showcase the interactive features of your app, your modal’s name and description will appear in the Features section of your Marketplace app listing.

        Use the description field to let users know what they can do within this panl.

        Optional; max 150 characters.
      </td>
    </tr>

    <tr>
      <td>
        Iframe URL (required)
      </td>

      <td>
        URL of the web content to be shown within the iframe\
        – Please ensure your iframe URL uses **HTTPS**
      </td>
    </tr>

    <tr>
      <td>
        [JWT](https://jwt.io) secret
      </td>

      <td>
        Optional. Defaults to `client secret`
      </td>
    </tr>

    <tr>
      <td>
        Panel locations (one required)
      </td>

      <td>
        Choose where the custom panel will be displayed:\
        – Deals details view\
        – People details view\
        – Organizations details view

        Each app can have one custom or JSON panel in each location.
      </td>
    </tr>
  </tbody>
</Table>

#### Custom floating window

Learn more [here](https://pipedrive.readme.io/docs/custom-ui-extensions-floating-window).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Floating window name (required)
      </td>

      <td>
        The name of your custom floating window.

        Short and precise, max 30 characters.

        The name will appear in the window header and Interactive Features section of your Marketplace app listing.
      </td>
    </tr>

    <tr>
      <td>
        Floating window description (required)
      </td>

      <td>
        Clearly state what users can do within the window so they know how this feature benefits them (max 150 chars).

        It will appear in the Interactive Features section of your Marketplace app listing.

        Max 150 characters.
      </td>
    </tr>

    <tr>
      <td>
        Iframe URL (required)
      </td>

      <td>
        URL of the web content to be shown within the iframe\
        – Please ensure your iframe URL uses **HTTPS**
      </td>
    </tr>

    <tr>
      <td>
        [JWT](https://jwt.io) secret
      </td>

      <td>
        Optional. Defaults to `client secret`
      </td>
    </tr>

    <tr>
      <td>
        Entry points
      </td>

      <td>
        A custom floating window has two entry points:\
        – Top bar (apps dock) – default\
        – Phone number and Calls tab – for communication apps

        Limited to 1 floating window per app regardless of the entry point.
      </td>
    </tr>
  </tbody>
</Table>

#### App settings page

Learn more [here](https://pipedrive.readme.io/docs/custom-ui-extensions-app-settings).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Type
      </td>

      <td>
        Choose how you want your app’s user to access their app settings\
        – External link\
        – Custom UI
      </td>
    </tr>

    <tr>
      <td>
        URL (required) – for external link
      </td>

      <td>
        Add the URL that will redirect the user to your app settings page
      </td>
    </tr>

    <tr>
      <td>
        Iframe URL (required) – for ustom UI
      </td>

      <td>
        URL of the web content to be shown within the iframe\
        – Please ensure your iframe URL uses **HTTPS**
      </td>
    </tr>

    <tr>
      <td>
        [JWT](https://jwt.io/) Secret – for Custom UI
      </td>

      <td>
        Optional. Defaults to`client secret`.
      </td>
    </tr>
  </tbody>
</Table>

> 👍
>
> Do **install and test** your app after you add app extensions to see how it works for your users.

<hr />

## Install and test your draft app

<hr />

Installing and testing your draft app is an important step before making your private app live. It enables you to ensure everything in your app runs smoothly and identify and address potential issues early on.

NB: app testing only works for users in your sandbox account and cannot be shared with external users.

To install and test your app, click the “Install and test” notification above your app’s name or the “Install & test” option from the three-dot menu.

<Image alt="Developer Hub > private app - install & test" align="center" width="75% " src="https://files.readme.io/d219bae-Developer_Hub_-_Private_app_-_install_and_test.png" />

You can also click the green “Install & test” button at the bottom left of the OAuth & access scopes and App extensions tabs.

<Image alt="Developer Hub > private app - install & test from the OAuth & access scopes tab" align="center" width="75% " src="https://files.readme.io/441903e-Developer_Hub_-_Private_app_-_Install__test_-_OAuth__access_scopes.png" />

You will then be brought to the OAuth confirmation dialog where you can allow and install your app to begin testing it.

<hr />

## How to share your private app

<hr />

There are two steps to sharing your private app with any user/company in Pipedrive:

1. Make your private app live
2. Get your installation link

### Make your private app live

You have to make your private app live before you can share it. You can do this by clicking the “Change to live” button in the app registration form or the “Change to live” option in the three-dot menu next to your private app’s name.

As we will validate your callback URL when you click “Change to live”, please **ensure your OAuth callback URL is a functioning one**.

Note that live private apps cannot be reverted to draft status. Any changes you make to your live private app will be immediately available for all users once you click ‘Save’.

**Change to live – app registration form**

*For new private apps*

<Image alt="Developer Hub > private app - new app &#x22;change to live&#x22;" align="center" width="75% " src="https://files.readme.io/bc39c67-Developer_Hub_-_Private_app_-_OAuth__access_scopes.png" />

After you fill in your app name and callback URL in the Basic info tab and click “Save”, you will be brought to the OAuth & access scopes with the “Change to live” button enabled. Once the “Change to live” button is enabled, you can make your private app live anytime by clicking on it in any tab.

*For draft private apps*

<Image alt="Developer Hub > private app - draft app &#x22;change to live&#x22;" align="center" width="75% " src="https://files.readme.io/17ca8c3-Developer_Hub_-_Private_app_-_draft_app_change_to_live.png" />

The “Change to live” button will be enabled once you open your draft private app, as you’ve previously filled in and saved your app name and callback URL. You can make your private app live anytime by clicking “Change to live” in any tab of the app registration form.

**Change to live – three-dot menu**

<Image alt="Private app - three-dot menu" align="center" width="75% " src="https://files.readme.io/cb939b5-Developer_Hub_-_Private_app_-_three-dot_menu.png" />

When you click on the three-dot menu next to your private app’s name, you will find the “Change to live” option. Clicking on this will take you to the Basic info tab of your private app, where you must click “Change to live” again to share your app.

### Get your installation link

Once your private app is live, you can share it via its installation link. The installation link can be found in the three-dot menu next to your private app’s name in your Developer Hub dashboard.

<Image alt="Developer Hub > private app - share install link" align="center" width="75% " src="https://files.readme.io/bdd07b8-Developer_Hub_-_Private_app_-_share_private_app.png" />

You can also find the installation link through the “Share app” button at the bottom left of your app’s OAuth & access scopes tab.

<Image alt="Developer Hub > private app - share install link from OAuth & access scopes tab" align="center" width="75% " src="https://files.readme.io/4dac119-Developer_Hub_-_Private_app_-_Install__test_-_OAuth__access_scopes.png" />

<hr />

## App status

<hr />

<Image alt="Developer Hub - apps list" align="center" width="75% " src="https://files.readme.io/f18a664-Developer_Hub_dashboard_-_apps_list.png" />

Private apps can have two statuses:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        App status
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <img src="https://files.readme.io/919b4df-Developer_Hub_-_app_status_-_draft.png" width="70%" alt="App status - draft" />
      </td>

      <td>
        Your app is in a draft state. It can be shared with users in the same Pipedrive company.
      </td>
    </tr>

    <tr>
      <td>
        <img src="https://files.readme.io/fd32e40-Developer_Hub_-_private_app_status_-_live.png" width="50%" alt="App status - draft" />
      </td>

      <td>
        Your app is live and can be shared with any company in Pipedrive via its direct, unlisted installation link.
      </td>
    </tr>
  </tbody>
</Table>
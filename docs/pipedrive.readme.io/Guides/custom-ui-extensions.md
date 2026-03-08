# Custom UI extensions

> 📘
>
> NB: Please ensure you test your custom UI extensions on a **draft app**, not an approved/public one.

## What are custom user interface extensions?

<hr />

A custom user interface (UI) extension is an area in Pipedrive’s UI that extends an app’s functionality by loading any contextual web content within an embedded iframe. This allows apps to display their content directly inside different Pipedrive views.

We have four custom UI extension points:

### Custom floating window

<Image align="center" width="60% " src="https://files.readme.io/4614557-Custom_floating_window_in_Pipedrives_user_interface.png" />

A [custom floating window](https://pipedrive.readme.io/docs/custom-ui-extensions-floating-window) is an iframe embedded inside a **resizable and draggable window** that **persists while a user navigates** around Pipedrive.

### Custom panel

<HTMLBlock>
  {`
  <img src="https://files.readme.io/20bdb0d-Custom_UI_extensions_-_custom_panel.png" align="center" width="50%" alt="Custom panel"></img>
  `}
</HTMLBlock>

A [custom panel](https://pipedrive.readme.io/docs/custom-ui-extensions-panels) is an iframe embedded inside a **sidebar panel in the detail view** of deals, people, and organizations.

### Custom modal

<HTMLBlock>
  {`
  <img src="https://files.readme.io/efa3b83-Custom_UI_extensions_-_custom_modal.png" align="center" width="50%" alt="Custom modal"></img>
  `}
</HTMLBlock>

A [custom modal](https://pipedrive.readme.io/docs/custom-ui-extensions-modals) is an iframe embedded in a **modal** that **opens when triggered** by the user from various menus and links inside Pipedrive.

### Custom UI for app settings

<HTMLBlock>
  {`
  <img src="https://files.readme.io/f037658-Custom_UI_extensions_-_custom_UI_for_app_settings.png" align="center" width="50%" alt="Custom UI for app settings"></img>
  `}
</HTMLBlock>

[Custom UI for app settings](https://pipedrive.readme.io/docs/custom-ui-extensions-app-settings) is an iframe embedded in a **surface** that gives users easy access to **user settings** for your app.

<hr />

## How can custom UI extensions be used?

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/57ef7e4-Custom_UI_extension_example.png" align="center" width="60%" alt="Custom UI for app settings"></img>
  <figcaption align="center"><i><p>An example of a custom panel displaying related information to a Pipedrive deal</p></i></figcaption>
  `}
</HTMLBlock>

Custom UI extensions can be used in a multitude of ways. You now have near-complete freedom to showcase any content you want, as you can load any contextual web content within the iframe solution for your Pipedrive use case.

Some examples include displaying related information to Pipedrive entities like documents/invoices/proposals, multimedia, email marketing data, text messages, data visualization, customer support cases, contact management, multi-step forms, etc.

Custom UI extensions could also extend Pipedrive’s functionality, such as calculating data based on Pipedrive information and detecting duplicate deals.

<hr />

## How do custom UI extensions work?

<hr />

A custom UI extension is an embedded iframe within Pipedrive’s UI that showcases your app’s content as a contextual, external webpage.

The embedded webpage must be hosted externally on the app service’s side. It has to have its own publicly accessible URL along with frontend and backend capabilities. Any JS framework and language can be used to build the custom UI extension's front and back end.

<Image title="Custom UI extensions flow.png" alt={1165} align="center" width="smart" src="https://files.readme.io/af63d51-Custom_UI_extensions_flow.png">
  Data flow for custom UI extensions
</Image>

When a custom UI extension gets loaded or reloaded, an iframe request with query parameters will be sent. This should be validated in the app’s backend using the provided JWT. The webpage from the URL you provide in Developer Hub should render while the [SDK](https://github.com/pipedrive/app-extensions-sdk) initializes with `id`. Pipedrive will now load the iframe with your external webpage.

The iframe request will contain the following query parameters:

| Parameter     | Explanation/value(s)                                                                                | Examples                  |
| :------------ | :-------------------------------------------------------------------------------------------------- | :------------------------ |
| `userId`      |                                                                                                     | `userId=12345`            |
| `companyId`   |                                                                                                     | `companyId=54321`         |
| `token`       | [JWT](https://jwt.io/) that identifies which user and which Pipedrive company is loading the iframe | `token=xxxxx.yyyyy.zzzzz` |
| `id`          | Unique ID/runtime token for the iframe that has to be passed to the  SDK                            | `id=56789`                |
| `resource`    | deal/person/organization                                                                            | `resource=deal`           |
| `view`        | details                                                                                             | `view=details`            |
| `selectedIds` | Entity ID that shows the ID of the selected entity                                                  | `selectedIds=3`           |

If the iframe takes more than 10 seconds to initialize via our SDK, the iframe won’t be displayed to the user.

The [JWT](https://jwt.io/) (`token`) has to be validated server-side. You will have to initialize the [SDK](https://github.com/pipedrive/app-extensions-sdk) with the provided `id`.

* The `JWT secret` can be specified in Developer Hub when adding your custom UI extension. If no value is added to Developer Hub, we will use the `client secret` as the `JWT secret` value by default.

Note: The [SDK](https://github.com/pipedrive/app-extensions-sdk) will try to read the `id` from the URL itself. In most cases, the `id` will not have to be passed manually. It has to be manually passed only if you modify the iframe URL, e.g., with redirects.

<hr />

## SDK

<hr />

> 📘
>
> Want to see what the code for custom UI extensions looks like? Check out our [example apps on GitHub](https://github.com/pipedrive/example-apps/) and run them yourself.

To add a custom UI extension, it is **mandatory to use** our [SDK](https://github.com/pipedrive/app-extensions-sdk) to initialize your webpage and communicate with the main Pipedrive window.

### SDK contents

Our [SDK](https://github.com/pipedrive/app-extensions-sdk) contains the following features, of which you’ll find the code examples in our Github SDK readme.

**Verification**
Our SDK verifies the iframe using the unique extension `id`.

**User settings**
Object with data, such as theme interface preference, which can be used to customize the custom UI extension contents.

**Commands**
*Snackbar*
A small “popup” in a snack bar displays a message and link (optional) to the user and disappears after some time.

*Confirmation dialog*
A popup dialog that enables the user to verify an item. All contents can be customized, with the result being passed back to the SDK.

*Resize*

Resizes a custom UI extension

* Custom panel – only the height can be changed and the value must be between 100px and 750px
* Custom modal – both height and width can be changed. The minimum height is 120px and the minimum width is 320px. The maximum height and width are limited to the user’s browser dimensions.
* Custom floating window – both height and width can be changed. The minimum height is 70px and the maximum height is 700px. The minimum width is 200px and the maximum width is 800px.

When initializing the SDK, the sizes can be provided to display the extension with your defined sizes.

*Get signed token*
A new [JSON Web Token](https://jwt.io/) (JWT) that is valid for 5 minutes will be generated.

*Open modal*
Opens a JSON modal, custom modal or a new Pipedrive deal, organization, person or activity modal

* *JSON modal*
  A popup modal that allows a JSON modal action. At the moment, this cannot be prefilled.

* *Custom modal*
  A popup modal with an iframe embedded in it. You can open a custom modal with prefilled data, use the `CLOSE_MODAL` command to close the custom modal and subsequently receive an update with the `CLOSE_CUSTOM_MODAL` event. [View our example app](https://github.com/pipedrive/example-apps/tree/cars-service-example/apps/remix-cars-service) to see how this works.

* *New deal/organization/person/activity modal*
  A popup modal that enables the user to create a deal, organization, person or activity where fields, such as names, can be prefilled.

*Close modal*
Closes an active modal window (only applicable for custom modals)

*Redirect to*
Redirects a user to a specified view, e.g., deal, lead, organization, person, campaign, project, and settings

*Show floating window*
Opens a floating window and triggers the VISIBILITY event with an optional context parameter dependent on your app’s use case

*Hide floating window*
Closes a floating window and triggers the VISIBILITY event with an optional context parameter dependent on your app’s use case

*Set notification*
Enables apps with a floating window to display or remove notifications badge in the apps dock.

*Set focus mode*
Allows apps with a floating window to enable focus mode to hide the close button or disable it to make the close button visible.

*Get metadata*
Retrieves metadata information about the main window.

**Events**
*Visibility*
Apps can subscribe to VISIBILITY changes triggered by the user or an SDK command.

* *Custom panel*
  Apps can subscribe to custom panel visibility events to discover when a user collapses or expands the custom panel.
* *Custom floating window*
  Apps can subscribe to custom floating window visibility events to determine when the floating window is displayed or hidden.  The event can have an optional `context` parameter describing whether the user or an SDK command triggered the action.

*Close custom modal*
Apps can subscribe to `CLOSE_CUSTOM_MODAL `events to discover when the modal was closed and who triggered the action – the SDK’s `CLOSE_MODAL` command or the user.

*Page visibility state*
Apps can subscribe to the `PAGE_VISIBILITY_STATE` event to find out if the page their app extension will be loaded in is visible/in the background or hidden.

For more details on commands and events, check out our [SDK readme](https://github.com/pipedrive/app-extensions-sdk).

<hr />

## What to consider when building custom UI extensions?

<hr />

**You have to host your own web content**
The web content to be displayed within the iframe for all custom UI extensions must be hosted externally on your side, along with all front and backend capabilities.

**Design of your web content**
Please consider the design of your web page and how it would look within the Pipedrive web app. Check out [Pipedrive’s design assets](https://www.figma.com/@pipedrive) and use any components from there.

**Height and width**
When defining the height and/or width of a custom UI extension, please consider the actual size of the page to be rendered in the iframe and avoid `overflow: auto` in CSS.

**Name and icon (custom panel and custom floating window)**

<HTMLBlock>
  {`
  <img src="https://files.readme.io/dbabae2-App_panel_name__icon_-_Pipedrive.png" align="center" width="30%" alt="App panel"></img>
  `}
</HTMLBlock>

The extension’s name and your app’s icon will be displayed in the custom panel’s/floating window’s header. As your app’s icon will be minimized, please consider how recognizable your icon is when displayed in the custom panel.

* The icon can be added via the [General info tab in Developer Hub](https://pipedrive.readme.io/docs/marketplace-registering-the-app#general-info)
* The name can be added via the [App extensions](https://pipedrive.readme.io/docs/custom-ui-extensions-panels#how-can-i-add-a-custom-panel-in-developer-hub) tab

NB: Only public apps can add app icons for custom panels and custom floating windows

**Dark theme**
Pipedrive supports light and dark theme. Users can switch themes in [Interface Preferences](https://app.pipedrive.com/settings/interface-preferences).

The theme preference is accessible to your app through the `userSettings` property. Check out the [SDK documentation](https://github.com/pipedrive/app-extensions-sdk#user-settings) for an example of usage.

<hr />

## Custom UI extensions in app approval process

<hr />

**What if my app has already been approved?**
If you already have an app or an integration available in the Pipedrive Marketplace, please create a new test app to develop custom UI extensions to ensure they work properly.

Remember that any changes saved when updating a public app in Developer Hub will be immediately visible to your app users.
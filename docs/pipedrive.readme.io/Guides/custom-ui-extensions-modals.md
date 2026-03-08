# Custom modals

> 📘
>
> NB: Please ensure you test your custom UI extensions on a **draft app**, not an approved/public one.

## What is a custom modal?

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/7d43a91-Custom_modal.png" alt="Custom modal"></img>
  `}
</HTMLBlock>

A custom modal is an iframe embedded in a modal. The modal opens when a user triggers it from various menus and links inside Pipedrive.

Custom modals allow your app’s users to complete more complex and distinct actions, for example, creating new proposals/invoices.

**Custom modals VS custom panels**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th />

      <th>
        Custom modal
      </th>

      <th>
        Custom panel
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Iframe
      </td>

      <td>
        Yes
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        Size
      </td>

      <td>
        – Height and width are adjustable as a modal can have a bigger area
      </td>

      <td>
        – Limited to the sidebar panel in deal/person/organization detail view\
        – Adjustable height
      </td>
    </tr>

    <tr>
      <td>
        Inside Pipedrive’s UI
      </td>

      <td>
        – Multiple entry points, including list and detail views as well as via the SDK\
        – Take note that it will block content that’s beneath it
      </td>

      <td>
        – Deal/person/organization detail view\
        – Appears as a panel within the detail view
      </td>
    </tr>
  </tbody>
</Table>

### Custom modal dimensions

Both the height and width of custom modals can be customized. The minimum height is 120px, and the minimum width is 320px. The maximum height and width are limited to the user’s browser dimensions.

<hr />

## Custom modals in Pipedrive’s UI

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/efa3b83-Custom_UI_extensions_-_custom_modal.png" align="center" width="60%" alt="Custom modal"></img>
  `}
</HTMLBlock>

Here are the possible entry points in Pipedrive’s UI where a custom modal can be triggered from:

## Custom modals in actions menus

<HTMLBlock>
  {`
  <img src="https://files.readme.io/f043668-App_actions.png" align="center" width="40%" alt="Custom modal"></img>
  <figcaption align="center"><p><i>A custom modal from the actions menu</p></i></figcaption>
  `}
</HTMLBlock>

Similar to [links](https://pipedrive.readme.io/docs/app-extensions-actions) and [JSON modals](https://pipedrive.readme.io/docs/app-extensions-json-modals#what-are-json-modals), entry points to custom modals can be added to the three-dot actions menu in the upper right area of both the detail and list views.

Custom modals in list views will only appear when an item(s) is selected. Custom modals will pop up when the user clicks on its name in the actions menu in the detail and list views.

Each app can have **three custom/JSON modals or link actions per view**. This means an app can have a total of 21 app extensions from menus (7 possible views x 3 extensions).

| Item         | List view | Detail view |
| :----------- | :-------- | :---------- |
| Deals        | ✅         | ✅           |
| People       | ✅         | ✅           |
| Organization | ✅         | ✅           |
| Activities   | ✅         | ⛔           |

## Custom modals in custom panels

Custom modals can be triggered from [custom panels](https://pipedrive.readme.io/docs/custom-ui-extensions-panels) using the [SDK](https://github.com/pipedrive/app-extensions-sdk).

## Custom modals in app settings

Custom modals can be triggered from app settings with a custom UI via the [SDK](https://github.com/pipedrive/app-extensions-sdk). App settings can be found in the Pipedrive web app via *Tools and apps > Marketplace apps*.

If you want to add a custom UI for your app’s settings, please click [here](https://pipedrive.readme.io/docs/custom-ui-extensions-app-settings).

## Custom modals via SDK

Custom modals can be triggered with the [SDK’s](https://github.com/pipedrive/app-extensions-sdk)'s open modal command by providing the modal `id` or `name`. Using the [SDK](https://github.com/pipedrive/app-extensions-sdk), you can also pass any data to the modal that can be read from the URL parameters.

<hr />

## How can I add a custom modal in Developer Hub?

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/f38466bae57527fa03f08bc29631ea052e8cfea140401ff5c77eafb814f156db-custom-modal.png" align="center" width="60%" alt="Custom modal"></img>
  `}
</HTMLBlock>

## Adding a custom modal for actions menus

In [Developer Hub](https://app.pipedrive.com/developer-hub), click on your app’s name and go to the App extensions tab.

In the App extensions tab, click “Add custom modal” in the Custom modal section to access the form. Fill in the custom modal’s name and the rest of the relevant fields. Once you’re done, click “Save”.

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

## Adding a custom modal - custom panels, settings & via SDK

To add a custom modal via the SDK and for custom panels and app settings, you will have to:

1. Add a modal to Developer Hub using the [same steps listed above](https://pipedrive.readme.io/docs/custom-ui-extensions-modals#adding-a-custom-modal-for-actions-menus).
2. Leave the Entry point field blank
3. Copy the ID
4. Use the ID as the `action_id` parameter for custom modal in the [SDK](https://github.com/pipedrive/app-extensions-sdk)

> 📘
>
> It is **mandatory to use** [our SDK](https://github.com/pipedrive/app-extensions-sdk) to initialize the webpage within your custom modal and communicate with the main Pipedrive window.

<hr />

## How to troubleshoot a custom modal

<hr />

**Note: The app has to be installed by the user for them to be able to use custom UI extensions.**

A custom modal is dependent on the iframe URL provided in Developer Hub. If users can’t trigger the modal and/or see the modal’s content, this could mean:

* The web content failed to load
* The runtime `id` provided was wrong
* The [SDK](https://github.com/pipedrive/app-extensions-sdk) wasn’t initialized > if the iframe takes more than 10 seconds to initialize via our SDK, the iframe won't be displayed to the user.

Please check the iframe URL you provided, its frontend and backend capabilities, and the runtime `id` provided to the [SDK](https://github.com/pipedrive/app-extensions-sdk).

<hr />

## How to troubleshoot SDK errors

<hr />

Should you encounter any [SDK](https://github.com/pipedrive/app-extensions-sdk) errors, please read the **developer tools console** to find out what went wrong.
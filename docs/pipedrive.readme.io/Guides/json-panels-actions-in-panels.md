# Actions in JSON panels

> 📘 JSON panels were previously called app panels.

## Terminology

<hr />

**JSON panels** – An entrance point for an app’s data and interactivity inside Pipedrive in a panel format

**Object** – A JSON panel object is a data entry point with multiple descriptive fields displayed inside a panel. A panel can contain multiple objects.

**Object actions menu** – A white “actions” button with an arrow pointing downwards at the object’s top right. It features a dropdown menu that gives access to [link(s)](https://pipedrive.readme.io/docs/app-extensions-actions) or [JSON modal(s)](https://pipedrive.readme.io/docs/app-extensions-json-modals). Object actions are specific to the object itself and **only available for multiple object panels**.

**Field** – Descriptive data field in a particular format within the object

**Field action** – A link or JSON modal that allows the user to interact with the data inside the field. The action is specific to the field itself.

**Global actions** – A green action button at the bottom of the JSON panel. It features one main [link action](https://pipedrive.readme.io/docs/app-extensions-actions) and a dropdown menu if there are multiple app actions and/or an external link.

**Actions menu** – A dropdown menu accessible from the three dots symbol on the top of the panel. The menu allows the user to manage the left sidebar, adjust panel and app settings, and access the same app action(s) as the one(s) defined in global actions.

<hr />

## What are actions in panels?

<hr />

Actions in panels allow you to add interactivity to different aspects of your app panel.

## Global actions

<Image title="7fda530-App_extensions_-_footer_of_the_app_panel_-_Pipedrive.png" alt={1202} src="https://files.readme.io/c37bae7-7fda530-App_extensions_-_footer_of_the_app_panel_-_Pipedrive.png">
  Global actions in the JSON panel
</Image>

Global actions are app actions for the entire JSON panel that is **specific to the detail view** that the user is in (deal, people, organization). As your JSON panel can be in [three detail views altogether](https://pipedrive.readme.io/docs/app-extensions-json-panels#visibility-in-the-ui), you can customize global actions for each app panel in each of the detail view.

Represented by a green action button unique to app panels, global actions can be found at the bottom left of the app panel. This is where you can add one main app action to be featured and two additional actions to be included in the global actions dropdown menu. You can have a **maximum of 3 actions** within global actions.

The actions within global actions can be a [link](https://pipedrive.readme.io/docs/app-extensions-actions) or a [JSON modal](https://pipedrive.readme.io/docs/app-extensions-json-modals). This means you can use

* Links to reroute users from Pipedrive to an external page hosted by your app to complete an action
* JSON modals to allow users to complete full actions in Pipedrive using an interactive component (a modal)

You can also add an additional external link to global actions by extending the API response with an [external link](https://pipedrive.readme.io/docs/json-panels-adding-a-panel#external-links) object.

## Object actions

<Image title="669a43e-App_extensions_-_object_actions_app_panel_-_Pipedrive.png" alt={1202} src="https://files.readme.io/c1d5525-669a43e-App_extensions_-_object_actions_app_panel_-_Pipedrive.png">
  Object actions
</Image>

Object actions are available at the top right of each object through a white “actions” button with an arrow pointing downwards that features a dropdown menu. You can add a **maximum of 3** link or JSON modal actions specific to the object itself.  Object actions are universal for every object and **only available for multiple object panels**.

## Field actions

<Image title="8e50fac-App_extensions_-_field_actions_app_panel_-_Pipedrive.png" alt={1202} src="https://files.readme.io/d8badf2-8e50fac-App_extensions_-_field_actions_app_panel_-_Pipedrive.png">
  Field actions
</Image>

Within each object are fields that display descriptive data in a certain format. You can add **one** link or JSON modal action to a field to allow users to interact with the data. Each panel object can have a **maximum of 3 fields with actions**.

<hr />

## Steps for adding an action

<hr />

Actions in panels can be added in the same section of Developer Hub where you add your JSON panels inside *Developer Hub > App extensions*.

* Global actions are added via *links* or *JSON modal*
* Object and field actions are added via *App extensions > My added extensions > + Actions to this panel*

## How to add global actions

Adding global actions to your panel is the same as adding a [link](https://pipedrive.readme.io/docs/app-extensions-actions) or a [JSON modal](https://pipedrive.readme.io/docs/app-extensions-json-modals). You can have a **maximum of 3 actions** within global actions.

### Link – global action

A link action will reroute users from Pipedrive to your app to complete the relevant action. Learn how to add a link [here](https://pipedrive.readme.io/docs/app-extensions-actions).

| Field                         | Description                                                     |
| :---------------------------- | :-------------------------------------------------------------- |
| Action name (required)        | Max 30 characters, in sentence-case                             |
| URL (required)                | The URL that handles the action in your app                     |
| [JWT](https://jwt.io/) secret | If left empty, `client_secret` will be used by default          |
| Locations                     | The location where the action will be displayed in Pipedrive UI |

### JSON modal - global action

A JSON modal allows users to complete actions with Pipedrive using an interactive component – modal. Learn how to add a JSON modal [here](https://pipedrive.readme.io/docs/app-extensions-json-modals).

| Field                         | Description                                                                                                                                                                                                                                                            |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Action name (required)        | Max 30 characters, in sentence-case                                                                                                                                                                                                                                    |
| Action description            | To showcase the interactive features of your app, your action’s name and description will appear in the Features section of your Marketplace app listing.Use the description field to let users know what they can do within this action.Optional; max 150 characters. |
| API endpoint (required)       | All API requests related to this action will be sent to this URL                                                                                                                                                                                                       |
| [JWT](https://jwt.io/) secret | If left empty, `client secret` will be used by default                                                                                                                                                                                                                 |
| JSON schema(required)         | The JSON schema for your JSON modal                                                                                                                                                                                                                                    |
| Locations                     | The location where the action will be displayed in Pipedrive UI                                                                                                                                                                                                        |

### How to customize the order of global actions

By default, global actions are ordered by their creation timestamp. The newest one will be shown as the main action. This means that the last action saved (newest) will be the main action within the green global actions button, while the subsequent two actions you added before will be included in the dropdown menu.

<Image title="App extensions - global actions - Pipedrive.png" alt={962} width="80%" src="https://files.readme.io/d10ac6a-App_extensions_-_global_actions_-_Pipedrive.png">
  Global actions at the bottom left of the app panel
</Image>

In the picture example above, “Add an order” was the latest action saved, while “View all orders” and “Account settings” were saved earlier.

**Selecting the main action for global actions**

* Go to *App extensions > My added extensions* in Developer Hub
* Find the JSON panel you want to customize global actions for
* Click on the pencil icon to open the JSON panel form
* Scroll to the bottom of the form to the “main action” field with a dropdown menu that enables you to select the main action for global actions

<Image title="App extensions - JSON panel - main action dropdown menus.png" alt={1200} width="80%" src="https://files.readme.io/e9a8885-App_extensions_-_JSON_panel_-_main_action_dropdown_menus.png">
  The main action fields with a dropdown menu
</Image>

Note that actions will **only appear** in the main action dropdown menu if both the link/JSON modal **and** the JSON panel you are customizing global actions for have  the **same detail view** selected in *Locations*.

* For example, suppose you want the “Add new order” link action to be the main action for global actions in your JSON panel within *deal details*. To do so, ensure *deal details* is selected as a location for the “Add new order” link action **and** the JSON panel. Only then will you be able to find “Add new order” link action in the main action dropdown menu in the JSON panel's form.

<HTMLBlock>
  {`
  <style>
  * {
    box-sizing: border-box;
  }

  .column {
    float: left;
    width: 50%;
    padding: 0.5px;
  }
    .column2 {
    float: none;
      width: 100%
        
    }


  .row::after {
    content: "";
    clear: both;
    display: table;
  }
  </style>
  <div class="row">
    <div class="column">
       <figure>
        <span class="lightbox" role="dialog" tabindex="0">
          <span class="lightbox-inner">
            <img src="https://files.readme.io/91464a3-App_extensions_-_main_link_action_for_global_actions.png" title="Click to close..." class="lightbox-img" width="80%" align="" caption="" height="auto" alt="Ensure your action's Location is the same as your JSON panel" loading="lazy">
          </span></span></span><figcaption><p>Ensure your action's Location is the same as your JSON panel</p></figcaption></figure> 
    </div>
    <div class="column">
      <figure>
        <span class="lightbox" role="dialog" tabindex="0">
          <span class="lightbox-inner">
            <img src="https://files.readme.io/6b12e04-App_extensions_-_JSON_panel_main_action_selection.png" title="Click to close..." class="lightbox-img" width="80%" align="" caption="" height="auto" alt="The action will then appear in the main action dropdown menu in the JSON panel's form" loading="lazy">
          </span></span></span><figcaption><p>The action will then appear in the main action dropdown menu in the JSON panel's form</p></figcaption></figure>
    </div>
  </div>
  `}
</HTMLBlock>

Should you want to use the same action as the main action for all global action, ensure that all three details views (deal, person, organization) are selected in Locations.

## How to add object actions and field actions

You can add object and field actions after you’ve saved your JSON panel.  Both object and field actions can be a [link](https://pipedrive.readme.io/docs/app-extensions-actions) or a [JSON modal](https://pipedrive.readme.io/docs/app-extensions-json-modals).

* Object actions are only available for multiple object panels, with **a maximum of 3** link or JSON modal actions
* Field actions are available for single object and multiple object panels, with one link or JSON modal action added to a field to allow users to interact with the data. Each panel object can have a **maximum of 3 fields with actions**.

<HTMLBlock>
  {`
  <img src="https://files.readme.io/519db72-App_extensions_-_JSON_panel_-_link_and_object_action.png" alt="Adding a link and object action" width="30%" align="center"></img>
  `}
</HTMLBlock>

### Link – objects and fields

A link object action and a link field action will reroute users fro Pipedrive to your app to complete the relevant action. Adding a link for objects and fields is the same.

* Scroll down to the “My added extensions” section
* Find the relevant JSON panel and click the “+ Actions to this panel” button below it
* Select “Add link”

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        <p>Field</p>
      </th>

      <th>
        <p>Description</p>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <p>Action name (required)</p>
      </td>

      <td>
        <p>Max 30 characters, in sentence-case</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Action type</p>
      </td>

      <td>
        <p>Link</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>URL (required)</p>
      </td>

      <td>
        <p>The URL that handles the action in your app</p>
      </td>
    </tr>

    <tr>
      <td>
        <p><a href="https://jwt.io/">JWT</a> secret</p>
      </td>

      <td>
        <p>If left empty, <code>client\_secret</code> will be used by default</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Panel action target</p>
      </td>

      <td>
        <p>The location where the link will be displayed:</p><ul><li>Object – the action is universal for every object in your panel</li><li>Field –  the action is specific to the selected field</li></ul>
      </td>
    </tr>
  </tbody>
</Table>

### JSON modal - objects and fields

A JSON modal object action and a JSON modal field action allow users to complete full actions in Pipedrive using an interactive component - modal. Adding a JSON modal for objects and fields is the same.

* Scroll down to the “My added extensions” section
* Find the relevant JSON panel and click the “+ Actions to this panel” button below it
* Select “Add JSON modal”

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        <p>Field</p>
      </th>

      <th>
        <p>Description</p>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <p>Action name (required)</p>
      </td>

      <td>
        <p>Max 30 characters, in sentence-case</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Action type</p>
      </td>

      <td>
        <p>JSON modal</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>API endpoint (required)</p>
      </td>

      <td>
        <p>All API requests related to this action will be sent to this URL</p>
      </td>
    </tr>

    <tr>
      <td>
        <p><a href="https://jwt.io/">JWT</a> secret</p>
      </td>

      <td>
        <p>If left empty, <code>client secret</code> will be used by default</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>JSON data structure (required)</p>
      </td>

      <td>
        <p>The JSON schema for your JSON modal</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Panel action target</p>
      </td>

      <td>
        <p>The location where the JSON modal will be displayed:</p><ul><li>Object – the action is universal for every object in your panel</li><li>Field –  the action is specific to the selected field</li></ul>
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Troubleshooting

<hr />

As there are only two types of actions – [link](https://pipedrive.readme.io/docs/app-extensions-actions) and [JSON modal](https://pipedrive.readme.io/docs/app-extensions-json-modals), troubleshooting for actions in panels is the same as troubleshooting for these actions.

* For links, please check within your app as link actions reroute users from Pipedrive to your app to complete the relevant action.
* For JSON modals, please see [schema structure validation](https://pipedrive.readme.io/docs/app-extensions-json-modals#schema-structure-validation) and [schema data exchange on modal form submit](https://pipedrive.readme.io/docs/app-extensions-json-modals#schema-data-exchange-on-modal-form-submit).
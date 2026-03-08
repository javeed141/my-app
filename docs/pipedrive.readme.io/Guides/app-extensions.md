# App extensions overview

## What are app extensions?

<hr />

**App extensions** allow apps to add interactive features that extend their app’s functionality in Pipedrive’s user interface. The extensions can help users to keep an eye on all of their everyday processes, share context about deals and contacts, and, above all, interact with different data provided by apps without switching between different tools.

Across Pipedrive’s UI, there are different extension points where apps can add interactive features, for example, sidebar panels, modals, actions menu and app settings.

Apps with app extensions bring extra value to their users as your app’s functionality is available directly inside Pipedrive’s UI, which helps to increase its visibility. App extensions increase the app's brand awareness as the app icon will be displayed inside Pipedrive after installation.

Furthermore, your app will have more visibility in [the Pipedrive Marketplace](https://www.pipedrive.com/en/marketplace) as it will be labeled with "Interactive features" filtering option, allowing it to be highlighted in the chosen app categories’ sections.

<hr />

## Types of app extensions

<hr />

We offer several app types extensions: **app actions**, **JSON panels**, **custom UI extensions** and **manifest-based app extensions**.

## App actions

App actions let users perform your app’s related actions in Pipedrive’s list and detail views. We have **two** types of app actions: **links** and **JSON modals**.

### Links

<HTMLBlock>
  {`
  <img src="https://files.readme.io/f18a910-Link_action.png" alt="Link app action"</img>
  `}
</HTMLBlock>

[Links](https://pipedrive.readme.io/docs/app-extensions-actions) are app actions that reroute users from Pipedrive to an external page hosted by your app to complete an action.

### JSON modals

<HTMLBlock>
  {`
  <img src="https://files.readme.io/7180077-JSON_modal.png" alt="JSON modal"</img>
  `}
</HTMLBlock>

[JSON modals](https://pipedrive.readme.io/docs/app-extensions-json-modals) are modals with predefined components that enable users to complete full actions inside Pipedrive, with the data being consistent between both platforms.

## JSON panels

<HTMLBlock>
  {`
  <img src="https://files.readme.io/1b7e0f1-JSON_panel.png" alt="JSON panel"</img>
  `}
</HTMLBlock>

[JSON panels](https://pipedrive.readme.io/docs/app-extensions-json-panels)  allow users to see and use the data from your app through a panel with predefined components in Pipedrive’s detail views. They provide a visual representation of existing data from your app inside the Pipedrive web app.

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
            <figure><span aria-label="JSON panel gives an overview of multiple data fields" class="img" role="button" tabindex="0">
        <span class="lightbox" role="dialog" tabindex="0">
          <span class="lightbox-inner">
            <img src="https://files.readme.io/25c7bc3-panelsample.gif" title="Click to close..." class="lightbox-img" width="80%" align="" caption="" height="auto" alt="JSON panel gives an overview of multiple data fields" loading="lazy">
          </span></span></span><figcaption><p>JSON panel gives an overview of multiple data fields</p></figcaption></figure>
      
       
      </div>
      <div class="column">
      <div class="magic-block-image">
         <figure><span aria-label="JSON modal is triggered from the JSON panel" class="img" role="button" tabindex="0">
        <span class="lightbox" role="dialog" tabindex="0">
          <span class="lightbox-inner">
            <img src="https://files.readme.io/0e79e1f-Frame_149_1.png" title="Click to close..." class="lightbox-img" width="80%" align="" caption="" height="auto" alt="JSON modal is triggered from the JSON panel" loading="lazy">
          </span></span></span><figcaption><p>JSON modal is triggered from the JSON panel</p></figcaption></figure>
       
    </div> 
    </div>
  </div>
  `}
</HTMLBlock>

Having your app's data inside the panel with multiple customization methods will make using Pipedrive more contextual, as all information is centralized and easily accessible across different tools.

## Custom UI extensions

[Custom UI extensions](https://pipedrive.readme.io/docs/custom-ui-extensions) allow an app to extend its functionality by loading any contextual web content in an embedded iframe directly inside different Pipedrive views. It is **mandatory to use** our [SDK](https://github.com/pipedrive/custom-app-surfaces-sdk) for all custom UI extensions.

We have **four** types of custom UI extensions: **custom floating window**, **custom panels**, **custom modals** and **custom UI for app settings**.

### Custom floating window

<HTMLBlock>
  {`
  <img src="https://files.readme.io/7685eb9-Custom_floating_window.png" alt="Custom floating window"></img>
  `}
</HTMLBlock>

A [custom floating window](https://pipedrive.readme.io/docs/custom-ui-extensions-floating-window) is an iframe embedded inside a resizable and draggable window that persists while a user navigates around Pipedrive.

### Custom panels

<HTMLBlock>
  {`
  <img src="https://files.readme.io/5180f4a-Custom_panel.png" alt="Custom panel"</img>
  `}
</HTMLBlock>

A [custom panel](https://pipedrive.readme.io/docs/custom-ui-extensions-panels) is an iframe embedded inside a sidebar panel in the detail view of deals, people, and organizations.

### Custom modals

<HTMLBlock>
  {`
  <img src="https://files.readme.io/f5ab078-Custom_modal.png" alt="Custom modal"</img>
  `}
</HTMLBlock>

A [custom modal](https://pipedrive.readme.io/docs/custom-ui-extensions-modals)  is an iframe embedded in a modal that opens when triggered by the user from various menus and links inside Pipedrive.

### Custom UI for app settings

[Custom UI for app settings](https://pipedrive.readme.io/docs/custom-ui-extensions-app-settings) is a fully customizable iframe surface within the Pipedrive Settings area. The surface can be found when users click on the Settings icon for your app in *Tools and apps > Marketplace apps*.

## Manifest-based app extensions

Manifest-based app extensions allow an app to create an even tighter data flow with Pipedrive users. These apps can embed themselves into a designated area inside the Pipedrive product and offer alternative sources to complete an action such as messaging and video calling.

We offer **two** types of manifest-based extensions: **video calling app extension** and **messaging app extension**.

### Video calling app extension

<HTMLBlock>
  {`
  <img src="https://files.readme.io/2d9d45c-Video_calling_app_extension.png" alt="Video calling app extension" width="50%"</img>
  `}
</HTMLBlock>

The [video calling app extension](https://pipedrive.readme.io/docs/video-calling-app-extension) is an entry point into Pipedrive’s Activities modal. It enables app users to generate and start a video call when setting up an Activity.

### Messaging app extension

<HTMLBlock>
  {`
  <img src="https://files.readme.io/477f11d-Messaging_app_extension.png" alt="Messaging app extension" width="50%"</img>
  `}
</HTMLBlock>

The [messaging app extension](https://pipedrive.readme.io/docs/messaging-app-extension) is an entry point into the Messaging inbox inside Pipedrive’s Leads Inbox. This allows apps to integrate a messaging service directly into Pipedrive and create a seamless flow of receiving and sending messages through a third-party tool.

<hr />

## App extensions comparison

<hr />

|                                         | <p>JSON extensions</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | <p>Custom UI extensions</p>                                                                                                                                                                                                                                                                                                                                   | <p>Manifest-based extensions</p>                                                                                                                                                                                                                                                                                                             |
| :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>What is it</p>                       | <p>Enables users to see structured data from your app and complete simpler actions inside Pipedrive through a panel or modal with predefined components</p><ul><li>Supports simpler business logic via predefined layout and customizable fields, objects and form elements</li><li>Faster to build as you only need to compose the JSON file and handle the requests we send you - the UI is rendered based on JSON definition </li><li>Panel and modal components are predefined by Pipedrive</li></ul> | <p>Freedom to show data in any format and provide custom/complex interactions that are accessible  within different embedded iframes across Pipedrive’s UI</p><ul><li>Endless opportunities for building custom business logic and UI</li><li>Needs more resources to build</li><li>Easier to debug as you host the web content yourself</li></ul>            | <p>Offering of alternative entry points related to video calling or messaging in Pipedrive</p><ul><li>Provides a deeper, seamless user experience in specialized locations within Pipedrive</li><li>Potentially faster to build as you only need to implement specific API endpoints</li><li>All flows are predefined by Pipedrive</li></ul> |
| <p>Type of extension</p>                | <p>JSON schema</p><ul><li>You have to plan your use case with Pipedrive’s predefined components</li><li>You have to create the JSON schema and validate it within Developer Hub</li><li>The UX is entirely defined by Pipedrive</li></ul>                                                                                                                                                                                                                                                                 | <p>Iframe</p><ul><li>You have to develop and host the web content to be displayed within the iframe, along with all  frontend and backend capabilities</li><li>You have to design your own flows/UI that will be shown inside the iframe</li><li>You have to adhere to basic Pipedrive design guidelines for a cohesive UX</li></ul>                          | <p>Manifest</p><ul><li>You only have to develop the backend and map your API endpoints against specific actions Pipedrive provides in our UI using the manifest file</li><li>The UX is entirely defined by Pipedrive</li></ul>                                                                                                               |
| <p>Locations</p>                        | <p>Detail views (Deals, Persons, Organizations)</p><ul><li>JSON panels</li><li>JSON modals</li></ul><p>List views (Deals, Persons, Organizations, Activities)</p><ul><li>JSON modals</li></ul>                                                                                                                                                                                                                                                                                                            | <p>Detail views (Deals, Persons, Organizations)</p><ul><li>Custom panels</li><li>Custom modals</li></ul><p>List views (Deals, Persons, Organizations, Activities)</p><ul><li>Custom modals</li></ul><p>App settings (in “Tools and apps -> Marketplace apps” section of Pipedrive’s UI)</p><ul><li>Custom UI for app settings</li><li>Custom modals</li></ul> | <p>Activities modal in deal and lead detail views</p><ul><li>Video calling app extension</li></ul><p>Messaging inbox inside Leads inbox</p><ul><li>Messaging app extension</li></ul>                                                                                                                                                         |
| <p>Security (for outgoing requests)</p> | <p>JSON panels</p><ul><li>Basic <a href="doc:json-panels-adding-a-panel#how-can-i-add-a-json-panel-in-developer-hub">HTTP authentication</a></li></ul><p>JSON modals</p><ul><li><a href="https://jwt.io/">JWT</a></li></ul>                                                                                                                                                                                                                                                                               | [JWT](https://jwt.io/)                                                                                                                                                                                                                                                                                                                                        | [Authentication header](https://pipedrive.readme.io/docs/implementing-messaging-app-extension#authentication-of-the-request-from-pipedrive) that uses the same `client_id` and the `client_secret` as the OAuth token exchange in OAuth authorization.                                                                                                                    |
| SDK                                     | No                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Yes                                                                                                                                                                                                                                                                                                                                                           | No                                                                                                                                                                                                                                                                                                                                           |
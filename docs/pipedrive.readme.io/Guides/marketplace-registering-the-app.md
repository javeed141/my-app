# Registering a public app

Requested a [developer sandbox account](https://developers.pipedrive.com/)? Ready with your app? Find out how to register your app and send it off for the [app approval process](https://pipedrive.readme.io/docs/marketplace-app-approval-process).

* [How do I find Developer Hub to register my app?](https://pipedrive.readme.io/docs/marketplace-registering-the-app#how-to-find-developer-hub)
* [What do I write in each tab of the app registration form in Developer Hub?](https://pipedrive.readme.io/docs/marketplace-registering-the-app#app-registration-form)
* [Install and test your app before sending it for review](https://pipedrive.readme.io/docs/marketplace-registering-the-app#install-and-test-your-draft-app)
* [Save your app to send it for review](https://pipedrive.readme.io/docs/marketplace-registering-the-app#save-your-app-and-send-it-for-review)

<hr />

## How to find Developer Hub

<hr />

First, go to *Settings* by clicking on your profile name in the upper right corner of the top navigation bar. Find the company name of your sandbox account and choose *[Developer Hub](https://app.pipedrive.com/developer-hub)* from the drop-down menu.

<Image align="center" alt={2576} border={false} width="80%" src="https://files.readme.io/a4b7881-How_to_find_Developer_Hub.png" title="How to find Developer Hub.png" />

You must have a developer sandbox account for app creation to see Developer Hub. [Sign up here](https://developers.pipedrive.com/) if you don’t have one.

<hr />

## Register a new public app

<hr />

<Callout icon="🚧" theme="warn">
  NB: Do pick your app type carefully, as it cannot be changed later on Developer Hub.
</Callout>

To register a new app, click on the green “Create an app” button (or “+ Create an app” if you have existing apps) followed by “Create public app”. This is also where you’d see a list of your registered public and private apps if you have any.

<Image align="center" alt="Developer Hub - create a new app" border={false} width="75% " src="https://files.readme.io/b54de13-Developer_Hub_-_create_an_app.png" />

<hr />

## App registration form

<hr />

The app registration form for public apps is divided into two categories containing seven different tabs.

You can save your app anytime by clicking the green “Save” button. To exit the form and return to your Developer Hub dashboard, click the left-pointing arrow next to your app's name.

Read on to find out how and what to fill in each tab.

<Callout icon="📘" theme="info">
  **Disclaimer:** The Marketplace team reserves the right to make small changes to text fields and images uploaded to the app's listing to give the best possible user experience and make the page discoverable in search. You'll be notified when something is edited.
</Callout>

### Basic info

<Image align="center" alt="Developer Hub > public app - basic info" border={false} width="75% " src="https://files.readme.io/8f6169e-Developer_Hub_-_public_app_-_Basic_info.png" />

This tab has two required fields – App name and OAuth Callback URL. Once you’ve filled this in, click the green “Save” button to save the form. You’ll then automatically be brought to the second tab – “OAuth & access scopes”, where you’ll get your `client_id` and `client_secret`.

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
        Insert your app’s name by how it will be recognized in the Marketplace.

        *Example: Car Services App*
      </td>
    </tr>

    <tr>
      <td>
        Callback URL (required, one URL per app)
      </td>

      <td>
        Insert a link where an authorization code will be sent if the user approves or declines the installation of your app. This link is also where we return the user after successful authentication. Technically, a callback URL is the same thing as an OAuth `redirect_uri`.

        It’s okay to insert a non-functioning URL when creating a new app if you can update this field with a proper URL after implementing the logic needed to accept user authorization in your code. Please keep in mind that we allow only one callback URL per app.

        *Example: [https://www.carservicesapp.com/API/v2/callback](https://www.carservicesapp.com/API/v2/callback)*
      </td>
    </tr>
  </tbody>
</Table>

### OAuth & access scopes

<Image align="center" alt="Developer Hub > public app - OAuth & access scopes" border={false} width="75% " src="https://files.readme.io/8086d43-Developer_Hub_-_public_app_-_OAuth__access_scopes.png" />

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
        This is where you can add an optional URL to which users will be redirected when clicking the “Proceed to Install” button in the marketplace listing page.

        Use it when you need to start [app authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-1-requesting-authorization) **outside** of the Marketplace, redirect users to a custom landing page, or implement the [state parameter](https://pipedrive.readme.io/docs/marketplace-oauth-authorization-state-parameter)  for additional security.
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

<Callout icon="🚧" theme="warn">
  The user has the option to either **accept or deny all scopes**. Because of this, it’s a good idea to **build apps that only request necessary scopes** for your particular use case.
</Callout>

<Callout icon="👍" theme="okay">
  Once you’ve completed filling up the Basic info and OAuth & access scopes, we advise you to **start installing your app and testing it** to see how it works. You can do so by clicking on the green “Install & test” button in the bottom left of the tab.
</Callout>

### App extensions

<Image align="center" alt="Developer Hub - public apps > app extensions" border={false} width="75% " src="https://files.readme.io/b3a7480-Developer_Hub_-_public_app_-_App_extensions.png" />

App extensions let you extend Pipedrive’s user interface with your app’s functionality and content to let users do more in one place. Find out more about them [here](https://pipedrive.readme.io/docs/app-extensions).

Within Developer Hub, the app extensions tab is where you can add new app extensions and manage the ones you’ve added before. A modal with an app extension creation form will open when you click the button to add the respective app extension.

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
        Insert your app action’s name that will be displayed in the Pipedrive UI. The name should be short, descriptive of the app action, and be in a sentence-case format.

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

        *Example:*\
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
        There can be a maximum of 3 app actions or custom modals per location. Each app can have a total of 21 app actions. See more available locations in [app actions’ visibility](https://pipedrive.readme.io/docs/app-extensions-actions#visibility-in-the-ui).

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
        The URL of the endpoint which we’ll use to fetch the data of the object properties

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

        If no entry points are selected, the only way to open a modal is via the [SDK](https://github.com/pipedrive/app-extensions-sdk). You can have a maximum of three app extensions per location.

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

        Use the description field to let users know what they can do within this panel.

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
        Iframe URL (required) – for custom UI
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
        Optional. Defaults to `client secret`.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="👍" theme="okay">
  Do **install and test** your app after you add app extensions to see how it works for your users.
</Callout>

### Onboarding for users

With the user onboarding guide, you can onboard users to your app with step-by-step instructions or a feature review to improve app adoption and drive more customers. The guide will appear once users install the app and return to Pipedrive (web app reload is required). Users can access the guide at any time from the app page (Settings → Tools and apps → Marketplace apps).

<Callout icon="🚧" theme="warn">
  To publish the onboarding guide, your app needs to pass our [app approval process](https://pipedrive.readme.io/docs/marketplace-app-approval-process). Once it's approved, you can edit it any time without approval process.
</Callout>

The guide is a separate step in the app creation flow in Developer Hub (App Settings → Onboarding for users).

<Image align="center" border={false} src="https://files.readme.io/9883b7e-Navigation.png" />

#### Content blocks

Use content blocks to break your guide into individual segments, either to introduce separate individual features or to guide the user through sequential steps.

##### Tips for content blocks:

* Make sure the guide is simple to follow.
* If your app has multiple features or steps, select the crucial ones and add a link to an in-depth guide.
* If your guide lists instructions in a specific order, pay attention to the chronological sequence.
* Use arrows to indicate a series of actions. *Example: Click “Start” → Select your plan → Check the checkbox to continue.*
* Update the onboarding guide when making changes to your app’s flow.

Open the content block and fill out the necessary information.

<Image align="center" border={false} src="https://files.readme.io/c9961fe-Content_block.png" />

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
        Title
      </td>

      <td>
        Write a short title that summarizes the functionality or onboarding step (max 70 characters). The title will appear as the text block header.

        *Example: Manage car orders straight from the deal view*
      </td>
    </tr>

    <tr>
      <td>
        Description
      </td>

      <td>
        Provide a clear and concise overview of the feature and its location or instructions for this step (max 200 characters). The text block description will appear on the modal’s main text block under the title.

        *Example: Navigate to a deal detail view and head to the side panel. You can add new orders, see all linked car orders and manage their details*
      </td>
    </tr>

    <tr>
      <td>
        Learn more link (optional)
      </td>

      <td>
        Here, you can add any additional info about this step with a link to an external page related to it. The page will open in a new tab.

        *Example: [https://support.carprojectmanagerapp.com/en/article/pipedrive-integration-setup](https://support.carprojectmanagerapp.com/en/article/pipedrive-integration-setup)*
      </td>
    </tr>

    <tr>
      <td>
        Image
      </td>

      <td>
        Add an image to illustrate this feature or onboarding step and indicate its location on the screen.

        **Image requirements:**\
        Format: PNG, JPG\
        Max size: 100KB\
        Aspect ratio: 9:5\
        Width and height: 720 x 400\
        Have purple borders (20px)
      </td>
    </tr>
  </tbody>
</Table>

##### Tips for image content:

* The image should contain as little text as possible. Replace text elements with gray blocks wherever possible.
* Prioritize important information so as not to overwhelm users and keep them focused.
* Highlight crucial information with a bright color, different font weight or your own highlighting style.
* Avoid red and yellow color palettes whenever possible. These are associated with error and warning states and may disrupt and confuse users.
* Optimize image size for web content. The smaller the image size, the quicker it will load for the user.

<hr />

To add an additional content block, click the “+ Add a content block” button below the list. You can include up to four blocks and change their position by dragging them up or down. You can delete any of your blocks by clicking the recycle bin icon.

<Image align="center" border={false} src="https://files.readme.io/8a5e662-New_drag_delete.png" />

<hr />

#### Additional info

##### Video link and info

<Callout icon="👍" theme="okay">
  **Tip:** To improve your guide and increase app adoption, consider including an onboarding tutorial video link that will show your app’s features and functionality. The video will open within Pipedrive.
</Callout>

<Image align="center" border={false} src="https://files.readme.io/f6bed97-Add_video_link.png" />

<Image align="center" border={false} src="https://files.readme.io/cf630e0-Video_modal.png" />

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
        Video link
      </td>

      <td>
        The video should demonstrate your onboarding process or the most important features of your solution, helping new users get started using your tool.

        We currently support links to the following video hosting platforms: YouTube, Vimeo, Vidyard and Wistia.

        **General guidelines:**\
        The video should be 1 to 3 minutes long. This duration allows you to demonstrate key features and guide users through the initial steps without overwhelming them with excessive information. Keeping the video short and focused will help maintain user engagement and ensure they absorb the most important bits quickly and effectively.

        If your app integrates Pipedrive with another tool, your video should clearly explain your solution’s benefits and unique features.

        *Example: [https://youtu.be/5a7OzJBG3kk?si=eN2c5W](https://youtu.be/5a7OzJBG3kk?si=eN2c5W)*
      </td>
    </tr>

    <tr>
      <td>
        Video title (optional)
      </td>

      <td>
        The video title should be short (max 80 characters) and descriptive. It will be displayed as the text block’s title at the bottom of the video player overlay.

        *Example: Get started with Car Project Managers app in Pipedrive*
      </td>
    </tr>

    <tr>
      <td>
        Video description (optional)
      </td>

      <td>
        The video description should clearly describe the video’s content and what the viewer can gain from watching it (max 120 characters).

        It will be displayed as the body text block at the bottom of the video player overlay.

        *Example: Watch this explanatory video on how to get started with this app and where to find the key functionalities.*
      </td>
    </tr>
  </tbody>
</Table>

<hr />

##### Learn article link

Optional: Add an onboarding article link. The article will open in a new tab.

<Image align="center" border={false} src="https://files.readme.io/50e5e0b-Add_Learn_link.png" />

<Image align="center" border={false} src="https://files.readme.io/b39d063-Learn_modal.png" />

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th />
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Learn article link
      </td>

      <td>
        Add a link to an article about your onboarding flow or features overview. The article should explain either the first steps users need to take to experience the benefits of your tool or delve into your app’s key features.

        *Example: [https://support.carprojectmanagerapp.com/en/article/pipedrive-integration-winbridge](https://support.carprojectmanagerapp.com/en/article/pipedrive-integration-winbridge)*
      </td>

      <td />
    </tr>

    <tr>
      <td />

      <td />

      <td />
    </tr>
  </tbody>
</Table>

<Callout icon="👍" theme="okay">
  Once you've filled in your relevant information, click on the green "Preview" button at the bottom to preview your app onboarding guide and make sure everything is like it should.
</Callout>

The onboarding guide preview displays how your app will look after filling out the required fields.

<Image align="center" border={false} src="https://files.readme.io/0648561-Modal_Details.png" />

### General info

<Image align="center" alt="Developer Hub > public app - general info" border={false} width="60% " src="https://files.readme.io/632bd0b-Developer_Hub_-_public_app_-_General_info.png" />

**Basic info**

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
        Built by
      </td>

      <td>
        This will be the name of the company responsible for developing the app. It will appear publicly on the Pipedrive Marketplace.

        To change the company name, click “edit” under the company name, and you’ll be taken to Company settings.

        *Example: Car Services Inc*
      </td>
    </tr>

    <tr>
      <td>
        App category (required)
      </td>

      <td>
        Choose categories from the drop-down menu that best represent your app’s use case.

        *Example: Task and workflow management*
      </td>
    </tr>

    <tr>
      <td>
        Short summary (required)
      </td>

      <td>
        Summarize the essence of what your app does. It will be shown in the list views and other places where the full description cannot be shown in the Marketplace. Max 150 characters.

        Please include your app’s name and “Pipedrive” in the description if possible.

        *Example: Car Services app helps you better manage your orders and workflows in Pipedrive and automatically syncs it across both platforms.*
      </td>
    </tr>
  </tbody>
</Table>

**App images**

<Callout icon="⚠️" theme="warn">
  Pipedrive supports **light and dark theme**! Please make sure all content is visible from light and dark backgrounds. You can switch themes in [Interface preferences](https://app.pipedrive.com/settings/interface-preferences).If your images are not well visible on both, we recommend uploading images with a white background.
</Callout>

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
        App icon (required)
      </td>

      <td>
        Upload an icon that best represents your app (be aware of the file type and sizing requirements).

        Icon criteria:\
        – PNG, JPG\
        – 1:1 aspect ratio\
        – min 256x256 px\
        – max 10 MB

        We recommend uploading an icon-only version as your logo is sometimes presented in a minimal size of 20x20px alongside your app name.

        *Tip: To make your app listing more SEO-friendly, name your app icon file “app-pipedrive-integration”. For example, “carservices-pipedrive-integration” - all lowercase with dashes.*
      </td>
    </tr>

    <tr>
      <td>
        App listing images (1 required, max 5)
      </td>

      <td>
        Upload max five images that should be helpful to users by illustrating how the app works, highlighting key areas and demonstrating the general flow process.

        **Image criteria:**\
        – PNG, JPG\
        – 16:10 aspect ratio\
        – max 10 MB\
        – 1280x800, 1440x900, 2560x1600 or 2880x1800 pixels – the bigger, the better!

        *Tip: To make your app listing more SEO-friendly, add numbers to the end of your image file's name. For example:\
        – “carservices-pipedrive-integration-1”\
        – “carservices-pipedrive-integration-2”, etc.*
      </td>
    </tr>
  </tbody>
</Table>

**App description**

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
        Full description (required)
      </td>

      <td>
        Clearly state what your app does and why the integration with Pipedrive is useful. It needs unique text tailored explicitly for the Pipedrive Marketplace to avoid being marked as double content by search engines. Max 1500 characters.

        If you have done your keyword research, please use SEO keywords throughout this section. If not, here are some SEO keyword recommendations that you can use:\
        – “(Your app’s name) app”\
        – “(Your app’s name) CRM”\
        – “(Your app’s name) integration”\
        – “(Your app’s name) Marketplace”\
        – “(Your app’s name)-Pipedrive integration” (*e.g. “Car Services-Pipedrive integration”*)\
        – “Pipedrive (your app’s category) integration” (*e.g. “Pipedrive task and workflow management integration”*)

        Please [reach out to the Marketplace team](mailto:marketplace.devs@pipedrive.com) if you need some SEO assistance.

        *Example: Discover the Car Services-Pipedrive integration that helps you manage your orders and workflows! The Car Services app has received many excellent user reviews, among them Quinn Smith’s feedback:\
        "It feels so empowering to be able to easily access my orders and sales reports and have them automatically synced between Pipedrive and Car Services!"*
      </td>
    </tr>

    <tr>
      <td>
        YouTube video link (one link)
      </td>

      <td>
        Add a link to a video that depicts the capabilities of your app with a specific demonstration of how it works together with Pipedrive. We recommend you use the video for marketing your app.

        We currently support only Youtube video links.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="👍" theme="okay">
  Once you’ve filled in your relevant app information, click on the green “Preview” button at the bottom to **preview your app listing page and make sure the information is accurate**. The draft app listing will open in a hovering window.
</Callout>

### Setup and installation

<Image align="center" alt="Developer Hub > public app - setup and installation" border={false} width="75% " src="https://files.readme.io/1eb506b-Developer_Hub_-_public_app_-_Setup_and_installation.png" />

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
        Instructions for users (max 1500 characters)
      </td>

      <td>
        What should users do after they click “Install now”? What should they expect to see, and where should they navigate to next?

        List step-by-step instructions so existing users can quickly get started with your app and new users can understand the required level of effort.

        If you have done your keyword research, please use SEO keywords throughout this section. If not, here are some SEO keyword recommendations that you can use:\
        – “(Your app’s name) app”\
        – “(Your app’s name) CRM”\
        – “(Your app’s name) integration”\
        – “(Your app’s name) Marketplace”\
        – “(Your app’s name)-Pipedrive integration” (*e.g. “Car Services-Pipedrive integration”*)\
        – “Pipedrive (your app’s category) integration” (*e.g. “Pipedrive task and workflow management integration”*)

        In case a one-on-one set up is required, define in this section who should be contacted and how.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="👍" theme="okay">
  Once you’ve filled in your relevant app information, click on the green “Preview” button at the bottom to **preview your app listing page and make sure the information is accurate**. The draft app listing will open in a hovering window.
</Callout>

### Support and legal info

<Image align="center" alt="Developer Hub > public app - support and legal info" border={false} width="75% " src="https://files.readme.io/d6f34d5-Developer_Hub_-_public_app_-_Support_and_legal_info.png" />

**Main resources**

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
        Website URL (required)
      </td>

      <td>
        Insert a link to your app’s website.

        *Example: [https://www.carservicesapp.com](https://www.carservicesapp.com)*
      </td>
    </tr>

    <tr>
      <td>
        Terms of Service URL (required)
      </td>

      <td>
        Insert a link to your app’s Terms of Service webpage with rules that users must agree to abide by to use your service/app.

        *Example: [https://www.carservicesapp.com/termsofservice](https://www.carservicesapp.com/termsofservice)*
      </td>
    </tr>

    <tr>
      <td>
        Privacy Policy URL (required)
      </td>

      <td>
        Insert a link to your app’s Privacy Policy webpage of a legal document that has most or all the information of how users’ data is gathered, used, communicated and managed.

        *Example: [https://www.carservicesapp.com/help/privacypolicy](https://www.carservicesapp.com/help/privacypolicy)*
      </td>
    </tr>
  </tbody>
</Table>

**Additional resources**

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
        Pricing page URL
      </td>

      <td>
        Insert a link to your app’s pricing page.

        *Example: [https://www.carservicesapp.com/pricing](https://www.carservicesapp.com/pricing)*
      </td>
    </tr>

    <tr>
      <td>
        Support URL
      </td>

      <td>
        Insert a link to your app’s support website’s main page, where a user with questions/problems can find answers about different support channels and their [SLA](https://cybernews.com/resources/web-hosting-glossary/#sla)s, FAQs, self-service support resources, and maybe even discover tips and tricks about your app, or get general help.

        *Example: [https://www.carservicesapp.com/support](https://www.carservicesapp.com/support)*
      </td>
    </tr>

    <tr>
      <td>
        Support email
      </td>

      <td>
        Insert an email address for your app’s Support contact if the user needs direct help.

        *Example: [support@carservicesapp.com](mailto:support@carservicesapp.com)*
      </td>
    </tr>

    <tr>
      <td>
        Documentation URL
      </td>

      <td>
        Insert a link to your app’s documentation website from where the user can familiarize themselves with your app’s features: a detailed description of what your app can do and how, tutorials/articles for getting started or specific use cases, etc.

        *Example: [https://www.carservicesapp.com/help](https://www.carservicesapp.com/help)*
      </td>
    </tr>

    <tr>
      <td>
        Issue tracker URL
      </td>

      <td>
        Insert a link to your issue tracker website, where users can report bugs or any other issues noticed when using your app.

        *Example: [https://gitzhubz.com/carservicesapp/issues](https://gitzhubz.com/carservicesapp/issues)*
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="👍" theme="okay">
  Once you’ve filled in your relevant app information, click on the green “Preview” button at the bottom to **preview your app listing page and make sure the information is accurate**. The draft app listing will open in a hovering window.
</Callout>

### App review info

<Image align="center" alt="Developer Hub > public apps - app review info" border={false} width="75% " src="https://files.readme.io/b0d3202-Developer_Hub_-_public_app_-_App_review_info.png" />

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
        Main contact email (required)
      </td>

      <td>
        The main point of contact to receive\
        – Results and comments of the app review\
        – Notifications about user reviews\
        – Technical updates and notifications from Pipedrive
      </td>
    </tr>

    <tr>
      <td>
        Use case
      </td>

      <td>
        Please clearly state what problem(s) your app solves and how. This info is not public and will only be displayed to the app reviewer. Max 350 characters.
      </td>
    </tr>

    <tr>
      <td>
        Installation flow recording URL
      </td>

      <td>
        Optional. If possible, please include a recording link to show how your app has covered the **mandatory** installation flows:\
        – A user does not have an account with you and installs the app *(Installation runs through the process of creating an account and finishes the app install)*\
        – A user does have an account with you but isn’t logged in and installs the app *(Installation runs through login on your side and finished the app install)*\
        – A user has an account with you, is logged in, and installs the app *(Installation recognizes the user is logged in and finishes the app install)*

        Find out more about [app installation flows](https://pipedrive.readme.io/docs/app-installation-flows)
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="🚧" theme="warn">
  To be published on the Marketplace, your app needs to pass our [app approval process](https://pipedrive.readme.io/docs/marketplace-app-approval-process).
</Callout>

<hr />

## Install and test your draft app

<hr />

Installing and testing your draft app is a **crucial step** before sending your app for review. It enables you to

* Ensure everything in your app runs smoothly
* Check that you've implemented the [**mandatory** installation flows](https://pipedrive.readme.io/docs/app-installation-flows)
* Identify and address potential issues early on
* Pass our app approval process faster

NB: app testing only works for users in your sandbox account and cannot be shared with external users.

To install and test your app, click the “Install and test” notification above your app’s name or the “Install & test” option from the three-dot menu.

<Image align="center" alt="Developer Hub > public app - install & test" border={false} width="75% " src="https://files.readme.io/02b82c9-Developer_Hub_-_Public_app_-_install_and_test.png" />

You can also click the green “Install & test” button at the bottom left of the OAuth & access scopes and App extensions tabs.

<Image align="center" alt="Developer Hub > public app - install & test from the OAuth & access scopes tab" border={false} width="75% " src="https://files.readme.io/ed7ea90-Developer_Hub_-_Public_app_-_Install__test_-_OAuth__access_scopes.png" />

You will then be brought to the OAuth confirmation dialog where you can allow and install your app to begin testing it.

<hr />

## App listing in the Marketplace

<hr />

This is how your app’s info from General info, Setup and installation and Support and legal info tabs in Developer Hub will be converted to the app listing page in the Marketplace.

<Image align="center" border={false} width="75%" src="https://files.readme.io/c394389-App_Details.png" title="App listing page - Marketplace Manager.png" />

<hr />

## Save your app and send it for review

<hr />

Ready with your app? Send it for review by agreeing to the terms and conditions of the [Pipedrive Developer Partner Agreement](https://pipedrive.readme.io/docs/marketplace-vendor-agreement) and clicking on the green “Send to review” button.

You will then be asked to provide us with any test account information or details that the Marketplace team should know to properly install and test your app during approval.

<Image align="center" alt="Developer Hub > public app - provide test account info" border={false} width="75% " src="https://files.readme.io/d26e090-Developer_Hub_-_public_app_-_test_account_info.png" />

The final step involves confirming your email address – a requirement for all public apps. You will receive the confirmation email in the main contact email you specified. Once you’ve confirmed your email address, your app will be sent to the Marketplace team for review, and its status in the Developer Hub dashboard will be changed to “In review”.

<Image align="center" alt="Developer Hub > public app - confirm your email" border={false} width="75% " src="https://files.readme.io/5d8d45e-Developer_Hub_-_public_app_-_email_confirmation_modal.png" />

<hr />

## App status

<hr />

The status of your app is displayed in a pill next to your app’s name in Developer Hub.

<Image align="center" alt="Developer Hub - apps list" border={false} width="75% " src="https://files.readme.io/814016e-Developer_Hub_dashboard_-_apps_list.png" />

Public apps can have four different statuses:

| App status                                                                                                                                    | Description                                                                                              |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| <img src="https://files.readme.io/919b4df-Developer_Hub_-_app_status_-_draft.png" width="40%" alt="App status - draft" />                     | Your app is in a draft state. Please start installing and testing it before sending it for review.       |
| <img src="https://files.readme.io/0bc4153-Developer_Hub_-_app_status_-_review.png" width="50%" alt="App status - review" />                   | Your app has been sent for review and is being reviewed by the Marketplace team.                         |
| <img src="https://files.readme.io/4aef7c6-Developer_Hub_-_app_status_-_unpublished.png" width="65%" alt="App status - unpublished" />         | Your app is approved by the Marketplace team. It remains unpublished as you have to publish it yourself. |
| <img src="https://files.readme.io/cd5e758-Developer_Hub_-_app_status_-_published_-_live.png" width="55%" alt="App status - published/live" /> | Your app is published and publicly visible in the Pipedrive Marketplace.                                 |

<hr />

## What happens after my app is approved?

<hr />

After your app is approved, its status will be changed to “Unpublished” as you have to publish it yourself. To publish your app, go to the three-dot menu next to your approved app’s name and click “Publish”.

<Image align="center" alt="Developer Hub > public apps - publish approved app" border={false} width="75% " src="https://files.readme.io/3178c50-Developer_Hub_-_public_app_-_Unpublished_app_dropdown.png" />

Congratulations, your app is now publicly available in the Pipedrive Marketplace!
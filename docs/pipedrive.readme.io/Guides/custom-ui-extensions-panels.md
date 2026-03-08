# Custom panels

<Callout icon="📘" theme="info">
  NB: Please ensure you test your custom UI extensions on a **draft app**, not an approved/public one.
</Callout>

## What is a custom panel?

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/34e2227-Custom_panel.png" alt="Custom panel"></img>
  `}
</HTMLBlock>

A custom panel is an iframe that’s embedded inside a sidebar panel.

### Custom panel dimensions

The width is fixed for custom panels, while the height can be customized. The panel's height must be between 100px and 750px.

<hr />

## Visibility in Pipedrive’s UI

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/20bdb0d-Custom_UI_extensions_-_custom_panel.png" align="center" width="60%" alt="Custom panel"></img>
  `}
</HTMLBlock>

Just like [JSON panels](https://pipedrive.readme.io/docs/app-extensions-json-panels), custom panels are found as a panel in the left sidebar section **inside the detail view** of deals, people, and organizations.

Each app can have **one custom or JSON panel per detail view**. This means each app can have **3 different panels** (custom or JSON) altogether – 1 for each detail view (deal, people, and organization).

The custom panel will appear at the top of the left sidebar section. Users can change, hide, and reorder their location with other sections in the sidebar.

<hr />

## How can I add a custom panel in Developer Hub?

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/f4aa3c550e311cc9da26957d0a8f24fb9b807c3756dc4ec91a7edda59b627787-custom-panel.png" align="center" width="60%" alt="Custom panel"></img>
  `}
</HTMLBlock>

In [Developer Hub](https://app.pipedrive.com/developer-hub), click on your app’s name and go to the App extensions tab.

In the App extensions tab, click “Add custom panel” in the Custom panel section to access the form. Fill in the custom panel’s name and the rest of the relevant fields. Once you’re done, click “Save”.

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

If your app already has a JSON panel for a specific detail view, that particular detail view will be disabled from Panel locations in Developer Hub.

<Callout icon="📘" theme="info">
  It is **mandatory to use** [our SDK](https://github.com/pipedrive/app-extensions-sdk) to initialize the webpage within your custom panel and communicate with the main Pipedrive window.
</Callout>

<hr />

## How to troubleshoot a custom panel

<hr />

**Note: The app has to be installed by the user for them to be able to use custom UI extensions.**

A custom panel is dependent on the iframe URL provided in Developer Hub. If users can’t see the panel’s content, this could mean:

* The web content failed to load
* The runtime `id` provided was wrong
* The [SDK](https://github.com/pipedrive/app-extensions-sdk) wasn’t initialized > if the iframe takes more than 10 seconds to initialize via our SDK, the iframe won’t be displayed to the user.

Please check the iframe URL you provided, its frontend and backend capabilities, and the runtime `id` provided to the [SDK](https://github.com/pipedrive/app-extensions-sdk).
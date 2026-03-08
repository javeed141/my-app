# Custom UI for app settings

<Callout icon="📘" theme="info">
  NB: Please ensure you test your custom UI extensions on a **draft app**, not an approved/public one.
</Callout>

Apps can define how they want their users to access their app’s settings in the Pipedrive UI. We offer two options:

* An external link with your app’s settings interface that opens in a new browser tab
* A fully customizable iframe surface within the Pipedrive Settings area
  * For smooth installation, you can redirect users here so they can configure their usage after successfully installing your app with this URL: `https://{COMPANY_DOMAIN}.pipedrive.com/settings/marketplace/app/CLIENT_ID/app-settings`.

<hr />

## Visibility in Pipedrive’s UI

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/f037658-Custom_UI_extensions_-_custom_UI_for_app_settings.png" alt="Custom UI for app settings" width="60%" align="center"></img>
  `}
</HTMLBlock>

App settings are represented by the actions icon that can be found in the Pipedrive web app via *Tools and apps > Marketplace apps*.

When a user clicks on the actions icon, a dropdown menu appears that contains either an external link to your app settings or an entry point to a custom UI with your app’s settings.

<hr />

## How can I add a custom UI for settings?

<hr />

<HTMLBlock>
  {`
  <img src="https://files.readme.io/8af20cb6ccf733f28869aa708143072e5f99598d5ed41892a600dd829ba592dc-app-settings-page.png" align="center" width="60%" alt="Custom UI for app settings"></img>
  `}
</HTMLBlock>

In [Developer Hub](https://app.pipedrive.com/developer-hub), click on your app’s name and go to the App extensions tab.

In the App extensions tab, click “Add app settings page” in the App settings page section to access the form. Select “Custom UI” and fill in the iframe URL and JWT secret.

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
        Optional. Defaults to`client secret`.
      </td>
    </tr>
  </tbody>
</Table>

You can use HTML, CSS or Javascript to create the custom user interface for your app’s settings. You can also redirect users to your app’s settings so that they can configure their usage after successfully installing your app by sending them to `https://{COMPANY_DOMAIN}.pipedrive.com/settings/marketplace/app/CLIENT_ID/app-settings`.

<Callout icon="📘" theme="info">
  It is **mandatory to use** [our SDK](https://github.com/pipedrive/app-extensions-sdk) to initialize the webpage and communicate with the main Pipedrive window if you are using custom UI for app settings.
</Callout>

<hr />

## How to troubleshoot a custom UI for app settings

<hr />

**Note: The app has to be installed by the user for them to be able to use custom UI extensions.**

A custom UI for app settings depends on the iframe URL provided in Developer Hub. If users can’t see the custom UI for app settings, this could mean:

* The web content failed to load
* The runtime `id` provided was wrong
* The [SDK](https://github.com/pipedrive/app-extensions-sdk) wasn’t initialized > if the iframe takes more than 10 seconds to initialize via our SDK, the iframe won't be displayed to the user.

Please check the iframe URL you provided, its frontend and backend capabilities, and the runtime `id` provided to the [SDK](https://github.com/pipedrive/app-extensions-sdk).
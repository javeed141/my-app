# Messaging app extension

## Messaging app extension overview

<hr />

The messaging app extension provides a way to integrate a messaging service directly into Pipedrive. For that, we have created a deep integration point with our Messaging inbox inside the Leads Inbox of Pipedrive.

<Image title="app_inbox (2).png" alt={1752} align="center" src="https://files.readme.io/f8bcb92-app_inbox_2.png">
  Messaging inbox - active conversation details
</Image>

An app with messaging capability can take advantage of our public API endpoints (Channels API) and manifest mapping to create a seamless flow of receiving and sending messages through a third-party tool right inside Pipedrive.

<Image title="app_frames.png" alt={1503} align="center" src="https://files.readme.io/d8b963d-app_frames.png">
  Messaging inbox with messages from Facebook and WhatsApp
</Image>

By using our messaging app extension, your app user can send and receive messages from an external service (such as Facebook Messenger for Business, WhatsApp for Business, etc.) without leaving Pipedrive, as well as quickly link conversations to **contacts**, **leads** and/or **deals**.\
The **chat window** allows you to easily **display conversations** from all of your channels, as well as to **filter conversations** from a specific channel when you need them.

The Channels API has public endpoints to create and delete channels and receive incoming messages. The API can also request your app’s endpoints to **retrieve previous conversations** and **messages**, **senders/participants’ info**, and **send new messages**.

<Image title="inbox_channels.png" alt={460} align="center" src="https://files.readme.io/c11a100-inbox_channels.png">
  Selection of messaging apps and their channels
</Image>

It’s possible to enable [company-wide visibility](https://pipedrive.readme.io/docs/messaging-app-extension-overview#sharing-the-app) for the app, which allows the integration’s channels and conversations to be used by everyone in the Pipedrive company.

<Image title="settings (1).png" alt={1752} align="center" src="https://files.readme.io/0d92899-settings_1.png">
  Messaging app in Pipedrive Settings
</Image>

<hr />

## Development process

<hr />

## First steps to take

* To begin, you’ll need access to the [Developer Hub](https://app.pipedrive.com/developer-hub), where your app is maintained
* In Developer Hub, click on your app’s name and go to the OAuth & access scopes tab
* Select the **messaging integration** scope to access the Channels API and integrate with the messaging app extension
* Upload the manifest for messaging app extension. You can find a template of the manifest and all information about the endpoints needed for the integration on the [implementing Messaging app extension](https://pipedrive.readme.io/docs/implementing-messaging-app-extension) page.

## Connecting the app

When establishing the connection, your app must first use [OAuth2.0](https://pipedrive.readme.io/docs/marketplace-oauth-api).  When you have stored the access and refresh tokens ([step 4 and 5 of OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-4-and-step-5-getting-the-tokens)) after the app user has accepted the scopes ([step 3 of OAuth authorization](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-3-callback-to-your-app)), your app can make the first call on behalf of the user to create a new channel through the Channels API’s `POST /channels` endpoint in Pipedrive's public API.

```text URL
https://{COMPANYDOMAIN}.pipedrive.com/api/v1/channels
```

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Required/Optional
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `name`
      </td>

      <td>
        string
      </td>

      <td>
        Required
      </td>

      <td>
        A unique channel name
      </td>
    </tr>

    <tr>
      <td>
        `provider_channel_id`
      </td>

      <td>
        string
      </td>

      <td>
        Required
      </td>

      <td>
        A unique `provider_channel_id` string that represents the channel ID. Pipedrive will use this ID in requests to ask your integration for data about the channel.

        See [template for messaging manifest](https://pipedrive.readme.io/docs/implementing-messaging-app-extension#template-for-messaging-manifest) for an example of how the `providerChannelId` is used.
      </td>
    </tr>

    <tr>
      <td>
        `avatar_url`
      </td>

      <td>
        string, URL
      </td>

      <td>
        Optional
      </td>

      <td>
        The URL for the image to be displayed as the channel’s icon in the chat window.

        The avatar must be compatible with the HTML IMG tag.

        The recommended icon size is 48x48px, in a square format png or jpg.
      </td>
    </tr>

    <tr>
      <td>
        `provider_type`
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        It controls the icons (next to the conversation). In the future, the messaging app extension may handle some features differently according to the `provider_type`, such as templates and text editors (WYSIWYG).

        Possible values `facebook`, `whatsapp` or `other`.
      </td>
    </tr>

    <tr>
      <td>
        `template_support`
      </td>

      <td>
        boolean
      </td>

      <td>
        Optional (defaults to `false`)
      </td>

      <td>
        By setting `true`, if your provider type supports template, our API will retrieve the information needed (currently only supported for `whatsapp`\
        type providers).
      </td>
    </tr>
  </tbody>
</Table>

```json Sample response for POST /Channels
{
   "success":true,
   "data":{
      "id":"e283f878-7ef9-4294-8e5c-04a7d003fd92",
      "name":"My Channel",
      "avatar_url":"http://my-domain.com/images/test.png",
      "provider_channel_id":"4645c2e3-b5df-4acd-8299-76864c22a4ac",
      "marketplace_client_id":"57da5c3c55a82bb4",
      "pd_company_id":123,
      "pd_user_id":321,
      "created_at":"2022-03-01 00:00:00",
      "provider_type":"other",
      "template_support":false
   }
}
```

After Pipedrive registers the channel, manifest endpoints will start to be called.

First, Pipedrive will request from the[`getConversations`](https://pipedrive.readme.io/docs/implementing-messaging-app-extension#get-getconversations-endpoint) endpoint mapped in the manifest to the service's endpoint, providing information in a [paginated format](https://pipedrive.readme.io/docs/implementing-messaging-app-extension#pagination-cursors) around messages and conversations happening in the channel. Like all requests done to manifest endpoints by Pipedrive, this will follow basic authentication rules.

If the service provides values in the correct format, next requests will be made to various endpoints([`getSenderByID`](https://pipedrive.readme.io/docs/implementing-messaging-app-extension#get-getsenderbyid-endpoint) and [`getTemplates`](https://pipedrive.readme.io/docs/implementing-messaging-app-extension#get-gettemplates-endpoint)) to finalize the connection depending on the setup and criteria of the integration.

<Image title="Installation flow - messaging app extension.png" alt={818} align="center" src="https://files.readme.io/3ac46d8-Installation_flow_-_messaging_app_extension.png">
  Installation flow of app with messaging app extension
</Image>

## Sharing the app

This app extension allows sharing an installation with all Pipedrive company users. To enable this option for your app, please [get in touch with the Marketplace team](mailto:marketplace.devs@pipedrive.com).

Once the team enables it, an extra step is shown during the installation for the user right after giving access to the OAuth scopes.

<Image title="sample of company wide sharing.png" alt={1330} align="center" width="75% " src="https://files.readme.io/c4a1be9-Facebook_Messenger_app_-_Pipedrive_-_Messaging_app_extension.png">
  The user has the option to share the app company-wide.
</Image>

Once shared, the channels registered by the app will be available to **everyone in the company**. All users can use most of what the extension has to offer, with a few exceptions:

* Only the installation owner can delete conversations.
* Only the installation owner can change the visibility (share/unshare the app installation).
* Only the installation owner can uninstall the app.
* If the app has more than one channel, only the installation owner can remove a channel.

<Image title="setting_sharing (1).png" alt={911} align="center" src="https://files.readme.io/d6542a9-setting_sharing_1.png">
  The messaging app can be shared in between account users
</Image>
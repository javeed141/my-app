# Link actions

## What are Link app actions?

<hr />

Links are **actions** that reroute users from Pipedrive to an external page hosted by your app to complete an action. It allows users to use and send the data from their Pipedrive accounts to your app. In this way, the data will gain value as it is displayed in context with the functionality of your app.

Link actions can give users the option to, for example, add contacts to email lists, create documents/proposals, send messages, and more with just a click of a button.

See how link actions can work for **a proposals and contacts app**. In this example, the app displays the name of the deal, the value of the deal, and the contact person's information in the app.

<HTMLBlock>
  {`
  <div class="magic-block-image">
  	<figure>
      <a href="https://i.imgur.com/oA3XqOD.gif" class="block-display-image-parent block-display-image-size-80 ">
        <img src="https://i.imgur.com/oA3XqOD.gif"></a>
  	</figure>
  </div>
  `}
</HTMLBlock>

See how link actions can work for **a bots and messaging app**. In this example, the app displays the contact person's name, info, and phone number.

<HTMLBlock>
  {`
  <div class="magic-block-image">
  	<figure>
      <a href="https://i.imgur.com/XmUafXk.gif" class="block-display-image-parent block-display-image-size-80 ">
        <img src="https://i.imgur.com/XmUafXk.gif"></a>
  	</figure>
  </div>
  `}
</HTMLBlock>

<hr />

## Where are link actions found and how do they work?

<hr />

### Visibility in the UI

Link actions can be added to the actions menu in the upper right area of the detail view and the list view.  Link actions in the list view will appear when an item(s) is selected. Link actions are visible when the user clicks on the three-dot actions menu in detail and list views.

Each app is allowed to have **3 link actions or[JSON](https://pipedrive.readme.io/docs/app-extensions-json-modals)/[custom modals](https://pipedrive.readme.io/docs/custom-ui-extensions-modals) per view**. This means an app can have a total of **21** app extensions (link actions or JSON/custom modals) from menus (7 possible views x 3 extensions).

| Item         | List view | Detail view |
| :----------- | :-------- | :---------- |
| Deals        | ✅         | ✅           |
| People       | ✅         | ✅           |
| Organization | ✅         | ✅           |
| Activities   | ✅         | ⛔           |

> 🚧 If the user hasn't selected any items in the list view, the link actions aren't available.

### How do the link actions work?

When a user selects a link action from the menu, a new browser tab will be opened. Next, in the same browser tab, the user will be redirected to an app’s page if the user has an active app installation status. The redirection will be done to a URL consisting of the app’s URL (supplied by the app owner in the Developer Hub) and parameters that Pipedrive adds relating to the selected item(s). The added parameters enable the app to make requests to Pipedrive’s API and fetch data to allow the user to complete a link action.

Note that because the items selected by a user will directly relate back to the URL, you can run into a situation where several hundreds of items will be populated directly to the URL. In these scenarios, please be ready to encounter URL length limitation errors.

The new tab opened right after the user clicks the action has the following URL structure. The `:actionId` parameter in the URL is the unique identifier of the link action that Pipedrive will replace with a value.

```text New tab's URL structure
https://{COMPANYDOMAIN}.pipedrive.com/app-extensions/actions/:actionId?resource=...&view=...
```

These are the parameters that are added to the URLs:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        <p>Parameter</p>
      </th>

      <th>
        <p>Explanation or value(s)</p>
      </th>

      <th>
        <p>Examples</p>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <p><code>resource</code></p>
      </td>

      <td>
        <p>deal/person/organization/activity/product</p>
      </td>

      <td>
        <p><code>resource=deal</code></p>
      </td>
    </tr>

    <tr>
      <td>
        <p><code>view</code></p>
      </td>

      <td>
        <p>details or list</p>
      </td>

      <td>
        <p><code>view=details</code></p>
      </td>
    </tr>

    <tr>
      <td>
        <p><code>userId</code></p>
      </td>

      <td />

      <td>
        <p><code>userId=12345</code></p>
      </td>
    </tr>

    <tr>
      <td>
        <p><code>companyId</code></p>
      </td>

      <td />

      <td>
        <p><code>companyId=12345</code></p>
      </td>
    </tr>

    <tr>
      <td>
        <p><code>selectedIds</code></p>
      </td>

      <td>
        <p>Entity IDs that show all the selected IDs in an array form</p>
      </td>

      <td>
        <ul><li>If a user selects all the IDs through the select-all checkbox, then empty - <code>selectedIds=</code></li><li>If a user selects an item in the detail view, the selectedIds will contain only that specific item's ID - <code>selectedIds=3</code></li><li>If a user manually selects deals with <code>dealId=1</code> and <code>dealId=9</code> - <code>selectedIds=1,9</code></li><li>If a user decides to manually select all IDs in the list view, be ready to handle a very long URL with all the IDs in an array</li></ul>
      </td>
    </tr>

    <tr>
      <td>
        <p><code>excludedIds</code></p>
      </td>

      <td>
        <p>Entity IDs that show all the excluded IDs in an array form (only in the list view)</p>
      </td>

      <td>
        <ul><li>If a user selects all the IDs through the select-all checkbox, then empty- <code>excludedIds=</code></li><li>If a user selects all deals from the select-all checkbox and then removes manually some deals with <code>dealId=1</code> and <code>dealId=7</code> - <code>excludedIds=1,7</code></li><li>If a user decides to manually unselect all IDs in the list view, be ready to handle a very long URL with all the IDs in an array</li></ul>
      </td>
    </tr>

    <tr>
      <td>
        <p><code>filter</code></p>
      </td>

      <td>
        <p>Stringified JSON object of filter type (filter or owner) and its ID (or "everyone") (only in the list view). In the activity list view, the object will include activity type and depending on user's choice Activity start date and end date.</p>
      </td>

      <td>
        <ul><li><p>A user has applied a custom filter from the "Filters" tab - <code>filter=\{"filter\_id":42}</code></p></li><li><p>A user has applied a user filter from "Owners" tab - <code>filter=\{"user\_id":42}</code></p></li><li><p>When "Everyone" is selected in the "Owners" tab -  <code>filter=\{"everyone":1}</code></p></li><li><p>When app action is triggered from<strong> the activities list view</strong> then extra parameters are applied to filter object. <code>activity\_type</code> will list the selected activity types, for example:</p><ul><li><code>activity\_type=””</code> all activity types are selected</li><li><code>activity\_type=”lunch,call”</code> specific activity types are selected</li><li><code>activity\_start\_date</code> parameter is added when user selects activity start date, displayed in <code>YYYY-MM-DD</code> format</li><li><code>activity\_end\_date</code> parameter is added when user selects activity end date, displayed in <code>YYYY-MM-DD</code> format</li></ul></li></ul>
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note that in the **list view**, ` selectedIds` and ` excludedIds` will appear empty when all items are selected with the select-all checkbox.
>
> `excludedIds` will also appear empty when just some items are manually selected.

### Example URLs

Sample URL that is added to Developer Hub: [https://www.randomawesomeapp.com/action/handle](https://www.randomawesomeapp.com/action/handle)

**In the list view\...**

The parameters that Pipedrive sends: ?resource=deal\&view=list\&userId=12345\&companyId=12345&**selectedIds=1%2C9\&excludedIds=\&filter=%7B%22everyone%22%3A1%7D\&#xA;**\
The whole list view URL: `https://www.randomawesomeapp.com/action/handle?resource=deal&view=list&userId=12345&companyId=12345&selectedIds=1%2C9&excludedIds=&filter=%7B%22everyone%22%3A1%7D`

In **the activities list view** when the activity start and end date are selected: `https://www.randomawesomeapp.com/action/handle?resource=activity&view=list&userId=12345&companyId=12345&selectedIds=1%2C9&excludedIds=&filter=%7B%22user_id%22%3A%2211%22%2C%22
activity_type%22%3A%22call%2Cmeeting%2Ctask%2Cdeadline%2Clunch%22%2C%22activity_start_date%22%3A%222020-12-08%22%2C%22activity_end_date%22%3A%222021-01-14%22%7D`

**In the detail view\...**

The parameters that Pipedrive sends: ?resource=deal\&view=details\&userId=12345\&companyId=12345&**selectedIds=9**

The whole detail view URL: `https://www.randomawesomeapp.com/action/handle?resource=deal&view=details&userId=12345&companyId=12345&selectedIds=9`

<hr />

## How can I add a link action to Pipedrive?

<hr />

You can add the link action when [registering an app](https://pipedrive.readme.io/docs/marketplace-registering-the-app) or when [updating an app](https://pipedrive.readme.io/docs/marketplace-updating-the-existing-app).

In [Developer Hub](https://app.pipedrive.com/developer-hub), click on your app’s name and go to the App extensions tab.

In the App extensions tab, click “Add link” in the Links section to access the form. Fill in the link action’s name and the rest of the relevant fields. Once you’re done, click “Save”.

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
        <p>The name of the link action. Descriptive, max 30 characters.</p><p>The name will appear in the Features section of your Marketplace app listing.</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Action description</p>
      </td>

      <td>
        <p>To showcase the interactive features of your app, your action’s name and description will appear in the Features section of your Marketplace app listing.</p><p>Use the description field to let users know what they can do with this action.</p><p>Optional; max 150 characters.</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>URL (required)</p>
      </td>

      <td>
        <p>URL that the user will be redirected to when they click on the Link</p>
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
        <p>Locations (one required)</p>
      </td>

      <td>
        <p>Choose the view where the app action would be displayed:</p><ul><li>Activities list</li><li>Deal details</li><li>Deals list</li><li>Person details</li><li>People list</li><li>Organization details</li><li>Organizations list</li></ul><p>Maximum three app extensions per location. Each app can have 21 link actions or JSON/custom modals in total.</p>
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Link actions in app approval process

<hr />

### What if my app has already been approved?

If you already have an app or an integration available in the Pipedrive Marketplace, please use your [sandbox account](https://pipedrive.readme.io/docs/developer-sandbox-account) (request one if you don't have a sandbox account) for testing the new app actions. Remember that any changes saved when updating a public app in Developer Hub will immediately be visible to your app users.

### What to consider when I submit my app actions to review?

When app actions are submitted for review, we will thoroughly test them before approval. We strongly advise testing your app actions on a test app before submitting it for reviewal. Here are some things to consider while developing the actions:

* App actions must provide contextual information. This means that when the user has clicked an app action from inside the Pipedrive web app and they have been redirected to your app’s page, related data from the user’s Pipedrive account is displayed inside your app.
* Your app must be able to handle app actions performed both when a user has logged in to your app as well as when the user is not logged into your app:
  * If the user is logged in to your app, the actions initiated by a user from Pipedrive must be fulfilled from your app’s end.
  * If the user isn't logged in to your app, the URL must redirect to your app’s login or register an account page. After the user has logged in from the app's page, your app must be able to continue to fulfill the action initiated by the user in Pipedrive.
* If the app is uninstalled from the vendors’ side, ensure that the app actions won’t appear in Pipedrive UI anymore. For more information, read about [handling user’s app uninstallation](https://pipedrive.readme.io/docs/app-uninstallation).
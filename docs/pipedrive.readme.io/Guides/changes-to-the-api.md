# Changes to the API

Pipedrive’s API together with our Developer Platform is constantly evolving to cover additional product functionality. By introducing changes to the API, we aim to enhance your API experience by adding new features and functionality.

Do take note that from time to time, we may introduce breaking changes in order to improve the API. Read on to find out how we communicate changes and what types of changes we introduce.

<Callout icon="📘" theme="info">
  All changes to the Pipedrive API are announced via our [Changelog](https://developers.pipedrive.com/changelog). Make sure to subscribe to stay up to date!
</Callout>

<Callout icon="🚧" theme="warn">
  Occasionally, we announce new API endpoints in the **Beta version** with the goal of gathering customer feedback. Please note that Beta endpoints may be subject to breaking changes.
</Callout>

<hr />

## Types of changes

<hr />

Changes to the Pipedrive API can be divided into breaking and non-breaking changes.

A **breaking change** is a backward incompatible change that may require updating your app.\
A **non-breaking change** is typically a new addition to the API that can be implemented at your own pace and choosing.

<Callout icon="🚧" theme="warn">
  We aim to announce **breaking changes** via our [Changelog](https://developers.pipedrive.com/changelog) at least **60 days** in advance to give you adequate time to adopt the changes.
</Callout>

| Breaking changes                                         | Non-breaking changes                  |
| :------------------------------------------------------- | :------------------------------------ |
| Removing a resource                                      | Adding a new endpoint                 |
| Removing an endpoint                                     | Adding a new optional parameter       |
| Removing a parameter                                     | Adding a new response field           |
| Removing a response field                                | Changing the order of response fields |
| Modifying an endpoint’s URI                              | Changing an error message             |
| Modifying the name of a parameter or field               | Fixing an HTTP response code          |
| Modifying required parameters                            |                                       |
| Adding a required parameter                              |                                       |
| Changing the data type of an existing field or parameter |                                       |
| Reducing API limits                                      |                                       |
| Restricting OAuth scopes                                 |                                       |
| Introducing a new validation                             |                                       |
# App installation flows

As part of our [app approval process](https://pipedrive.readme.io/docs/marketplace-app-approval-process), we ensure that users have a unified experience while authorizing the app to access their data and account. This is why we have pre-defined installation and [uninstallation flows](https://pipedrive.readme.io/docs/app-uninstallation).

From the app’s side, it is **mandatory** to have proper installation flows as a **prerequisite** for being listed on the Marketplace as a public app. This page goes more in-depth on [steps 1 to 5 of the OAuth authorization flow](https://pipedrive.readme.io/docs/marketplace-oauth-authorization) to show you how to handle different scenarios in the user’s journey.

<hr />

When a user goes to the Pipedrive Marketplace, sees your app and wants to install it, they’ll have to click on the “Install now” or “Proceed to install” button. This will open an OAuth confirmation dialog in a new tab that displays [the scopes](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations) your app will require access to.

The user then has two choices:

* To “Allow and Install” the app
* To “Cancel” the app installation

<Callout icon="📘" theme="info">
  **Use`state` parameter for additional security**\
  As it’s your responsibility to protect the security of your app’s users, we highly recommend using a `state` parameter provided by OAuth 2.0. Read more about it [here](https://pipedrive.readme.io/docs/marketplace-oauth-authorization-state-parameter).
</Callout>

<hr />

## Allow and Install

<hr />

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
      <div class="magic-block-textarea"><p>The user needs to agree to the required permissions (i.e., scopes) in order to use your app. When they click on “Allow and Install”, your app needs to ensure a smooth flow by covering the main scenarios that can happen:</p>
  <ul>
  <li>A new user to your app who doesn’t have an account on your service and will need to register</li>
    <li>The user has an account on your service, but the user is not logged into it</li>
    <li>The user is logged in to your service</li></ul>
  <h2 class="heading heading-2 header-scroll" align=""><div class="heading-anchor anchor waypoint" id="a-new-user-to-your-app"></div><div class="heading-text"><div id="section-a-new-user-to-your-app" class="heading-anchor_backwardsCompatibility"></div>A new user to your app</div><a aria-label="Skip link to Allow and install" class="heading-anchor-icon fa fa-anchor" href="#a-new-user-to-your-app"></a></h2>
        <ul>
  <li>Store the <code>authentication code</code> (e.g., within the session)</li>
    <li>Direct them to create an account and log in to your service</li>
    <li>Exchange the <code>authentication code</code> for the <code>access token</code> and <code>refresh token</code></li>
    <li>Redirect them to a page where they can resume the installation/setup</li></ul>
  <h2 class="heading heading-2 header-scroll" align=""><div class="heading-anchor anchor waypoint" id="the-user-isnt-logged-into-your-app"></div><div class="heading-text"><div id="section-the-user-isnt-logged-into-your-app" class="heading-anchor_backwardsCompatibility"></div>The user isn’t logged into your app</div><a aria-label="Skip link to Allow and install" class="heading-anchor-icon fa fa-anchor" href="#the-user-isnt-logged-into-your-app"></a></h2>
        <p>When the user clicks “Agree &amp; Install”, has an account on your service and isn’t logged in, you will have to:</p>
  <ul>
  <li>Store the <code>authentication code</code> (e.g., within the session)</li>
    <li>Direct them to log in to your service</li>
    <li>Exchange the <code>authentication code</code> for the <code>access token</code> and <code>refresh token</code></li>
    <li>Redirect them to a page where they can resume the installation/setup</li></ul>
  <h2 class="heading heading-2 header-scroll" align=""><div class="heading-anchor anchor waypoint" id="the-user-is-logged-into-your-app"></div><div class="heading-text"><div id="section-the-user-is-logged-into-your-app" class="heading-anchor_backwardsCompatibility"></div>The user is logged into your app</div><a aria-label="Skip link to Allow and install" class="heading-anchor-icon fa fa-anchor" href="#the-user-is-logged-into-your-app"></a></h2>
        <p>When the user clicks “Agree &amp; Install”, has an account on your service and is logged in, you will have to:</p>
  <ul>
  <li>Exchange the <code>authentication code</code> for the <code>access token</code> and <code>refresh token</code></li>
    <li>Direct them to a page where they can resume the installation/setup</li></ul>
  <p>The end result should be a <strong>successful</strong> app installation and setup for all the flow scenarios described above.</p>

  </div>
    </div>
    <div class="column">
      <div class="magic-block-image">
  	<figure><a href="https://files.readme.io/9bcedf9-Auth_code_user_flow_3.0.png" class="block-display-image-parent block-display-image-size-original "><img src="https://files.readme.io/9bcedf9-Auth_code_user_flow_3.0.png" alt="Installation flow"style="width:100%" ></a>
  	</figure>
  </div>
    </div>
  </div>


       </div>
  </div></div>
  `}
</HTMLBlock>

<hr />

## Cancel

<hr />

If the user clicks “Cancel”, you’ll be notified that the installation didn’t happen as we will send a `GET` request to your `callback URL` with the additional parameter of `error=user_denied` (see also [OAuth authorization flow Step 3](https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-3-callback-to-your-app)).

The user will then be returned to the previously opened tab and can restart the installation process if they wish.
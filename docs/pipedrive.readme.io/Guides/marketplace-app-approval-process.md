# App approval process

> 🚧
>
> Heads up! Due to a surge in demand and ongoing vacations, public app reviews may take up to 21 business days. Thank you for your patience!

> 📘
>
> Throughout the process, if you encounter difficulties, you can contact us via [marketplace.devs@pipedrive.com](mailto:marketplace.devs@pipedrive.com) to ask for assistance.

Apps allow developers like you to add value to the lives of salespeople using Pipedrive. It doesn’t matter if you’re new to developing or have been doing it for years; we’re happy you’ve decided to join our forces.

To enable your app to get through our approval process quickly without any obstacles, it’s important that you fully understand the process. This way, you’ll have the utmost confidence when you submit your app to the Pipedrive Marketplace.

Jump to [the checklist](https://pipedrive.readme.io/docs/marketplace-app-approval-process#before-you-submit--a-checklist)!

<hr />

## Introduction

<hr />

> 🚧
>
> Submitting the app is unnecessary if it’s only used internally. You can instead [create a Private app](https://pipedrive.readme.io/docs/marketplace-registering-a-private-app) and share it with any Pipedrive company using a direct installation link

After you have built and tested your app, submit your app to start the approval process. Each new public app submitted to the Pipedrive Marketplace has to pass our approval process to ensure the standards of quality and reliability that our customers (the salespeople) expect.

Here’s a high-level graph of the approval process:   

<Image title="approval_process.png" alt={1000} align="center" width="80%" src="https://files.readme.io/8d81ddd-approval_process.png" />

<hr />

## Approval process overview

<hr />

**Steps before starting the approval process**

* Request [a developer sandbox account](https://developers.pipedrive.com/) to get access to the Developer Hub
* Review and understand the requirements of [the Pipedrive Developer Partner Agreement](https://pipedrive.readme.io/docs/marketplace-vendor-agreement)

**Steps to start the approval process**

* Log into your Pipedrive account and go to *[Settings > (company name) Developer Hub](https://app.pipedrive.com/developer-hub)*
* Create the app listing by filling out the form for [registering a new app](https://pipedrive.readme.io/docs/marketplace-registering-the-app#app-registration-form)
* Install and test your app to see how it works
* Preview your app listing and check that the information is accurate
* Click on “Send to review”

**What happens next?**

Your app will be tested thoroughly, from the [app installation flows](https://pipedrive.readme.io/docs/app-installation-flows) to its actual functionality (and everything else in between). Ensure your app sticks to **the following checklist** to speed up the process and avoid resubmissions.  You can also check out [this article](https://medium.com/pipedrive-engineering/getting-your-marketplace-app-approved-on-the-first-review-is-it-even-possible-628b7e5eca47) for tips and tricks on how to get your app approved on the first review.

<hr />

## Before you submit – a checklist

<hr />

> 🚧
>
> These requirements may change as we continuously enhance our marketplace and developer platform

To ensure that the apps submitted to our marketplace meet the highest standards and provide value to our customers, we have compiled a list of mandatory guidelines for you to follow.

Following these guidelines will reduce the need for resubmissions, speed up the review process and ultimately increase the likelihood of successful app approval in the first review.

### Marketplace listing

<hr />

#### General

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> Your selected app categories reflect the main <b>use cases</b> of the app</li>
      <li><input type="checkbox"> Your app name is unique and isn’t similar to another app in the Marketplace</li>
      <li><input type="checkbox"> Your app name does not convey false information, such as leading customers to believe that Pipedrive developed the app</li>
      <li><input type="checkbox"> The app <b>short summary</b> contains a value proposition for the customer and <b>clearly conveys</b> what your app does</li>
      <li><input type="checkbox"> The app <b>full description</b> is <b>specific to your integration</b>, well-written and has a comprehensive overview of what the app does and how it works with Pipedrive</li>
      <li><input type="checkbox"> The app listing uses white space, bullet points, rich text functionality and clear paragraphs in a logical order</li>
      <li><input type="checkbox"> If your app focuses on non-English speaking markets, your app listing page includes a disclaimer at the top stating that the app works only in specific markets or in a particular language</li>
      <li><input type="checkbox"> No advertisements of other apps, products or services in your listing or app extensions</li>
  </ul>
  `}
</HTMLBlock>

#### Setup and Installation

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> The app provides helpful and accurate <b>step-by-step installation instructions</b> to existing customers and newcomers, with a clear understanding of the effort and flows required to use the app</li>
  </ul>
  `}
</HTMLBlock>

#### Support

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> Your team is ready to provide <b>customer support</b> and your app includes the necessary contact details and links in the listing</li>
      <li><input type="checkbox"> Your team has the necessary processes in place for monitoring, replying to <a href="https://pipedrive.readme.io/docs/about-the-marketplace#ratings-and-reviews-in-the-pipedrive-marketplace">reviews and ratings</a>, and addressing any concerns, questions, or feedback</li>
  </ul>
  `}
</HTMLBlock>

#### Pricing

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> Your app listing includes a link to a separate pricing page that includes information about available plans or rates for your tool </li>
  </ul>
  `}
</HTMLBlock>

#### Media content

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> Your app has a distinctive icon that does not resemble Pipedrive’s or any other on the Marketplace</li>
      <li><input type="checkbox"> Your media content does not include sensitive information, such as personal contact details or access tokens</li>
      <li><input type="checkbox">	The app icon should be of high quality and suitable for display on a <a href="https://www.pipedrive.com/en/blog/dark-theme">dark background</a></li>
      <li><input type="checkbox"> Your app listing includes <b>3-5 high-quality images</b> that are easily readable and include assistive cues, such as annotations and highlights, illustrating how the app works in conjunction with Pipedrive</li>
      <li><input type="checkbox"> If your app listing includes a demonstration video, it needs to visualize and communicate the experience of using your tool and educate prospective customers about the value it brings</li>
  </ul>
  `}
</HTMLBlock>

### User experience

<hr />

#### Registration

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> If your app does not allow <b>self-service registration</b> and one-on-one setup is required, mention who should be contacted and how</li>
  </ul>
  `}
</HTMLBlock>

#### Installation

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
    	<li><input type="checkbox"> No other public or private apps will be installed for the user, except the one listed</li>
      <li><input type="checkbox"> When starting the <a href="https://pipedrive.readme.io/docs/marketplace-oauth-authorization">authorization process</a>, the user experiences a seamless and uninterrupted flow from beginning to end</li>
      <li><input type="checkbox"> Once installation is complete, the customer is redirected back to Pipedrive or an appropriate onboarding page in your app</li>
  </ul>
  `}
</HTMLBlock>

#### Onboarding for users

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
    	<li><input type="checkbox"> The app should be easy and <b>convenient for all new users</b>, offering an <a href="https://pipedrive.readme.io/docs/marketplace-registering-the-app#onboarding-for-users">onboarding guide</a> after installation</li>
  </ul>
  `}
</HTMLBlock>

#### Distribution

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> In case your app requires a separate extension, add-on or desktop app to function, ensure that they are approved and distributed through a trusted marketplace</li>
  </ul>
  `}
</HTMLBlock>

### Technical requirements

<hr />

#### General

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
  		<li><input type="checkbox"> Your app implements and primarily uses <a href="https://pipedrive.readme.io/docs/marketplace-oauth-api">OAuth 2.0</a> for both authentication and <a href="https://pipedrive.readme.io/docs/marketplace-oauth-authorization">request authorization</a></li>
  		<li><input type="checkbox"> Your app does not collect, store, or unnecessarily use the <a href="https://pipedrive.readme.io/docs/how-to-find-the-api-token">API token</a> of a user</li>
      <li><input type="checkbox"> Your app <a href="https://pipedrive.readme.io/docs/marketplace-oauth-authorization#step-7-refreshing-the-tokens">refreshes the access token</a> once its 60-minute lifetime expires</li>
      <li><input type="checkbox"> Your app only requests necessary <a href="https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations">scopes and permissions</a> for your particular use case and functionality</li>
      <li><input type="checkbox"> Your app has polished and properly tested <a href="https://pipedrive.readme.io/docs/app-installation-flows">installation</a> and <a href="https://pipedrive.readme.io/docs/app-uninstallation">uninstallation</a> flows</li>
      <li><input type="checkbox"> Your app correctly handles different <a href="https://support.pipedrive.com/en/article/types-of-users-in-pipedrive">user types</a> and <a href="https://support.pipedrive.com/en/article/permission-sets">permissions sets</a></li>
  </ul>
  `}
</HTMLBlock>

#### Performance

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> Your app respects and adheres to <a href="https://pipedrive.readme.io/docs/core-api-concepts-rate-limiting">rate limiting</a> and does not abuse our public API</li>
      <li><input type="checkbox"> When possible, your app uses <a href="https://pipedrive.readme.io/docs/guide-for-webhooks-v2">v2 webhooks</a> for efficient and nearly real-time data synchronization</li>
      <li><input type="checkbox"> Your app doesn’t cause significant performance issues for the user’s Pipedrive account</li>
      <li><input type="checkbox"> Your app is ready to support a large number of users after it is listed in the Marketplace</li>
      <li><input type="checkbox"> Your app has resources allocated for further maintenance and prompt updates in case of <a href="https://pipedrive.readme.io/docs/changes-to-the-api">breaking changes to our API</a></li>
  </ul>
  `}
</HTMLBlock>

#### App extensions

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> The content of <a href="https://pipedrive.readme.io/docs/app-extensions">app extensions</a> correctly loads and does not fail with a global “Something went wrong” error message</li>
      <li><input type="checkbox"> All action buttons within app extensions are responsive, trigger other elements and correctly redirect to specified URLs</li>
      <li><input type="checkbox"> App extensions correctly handle different <a href="https://pipedrive.readme.io/docs/json-modals-user-interaction-handling">user interactions</a> and display appropriate error messages when requests cannot be fulfilled</li>
      <li><input type="checkbox"> App extensions support different <a href="https://support.pipedrive.com/en/article/quick-actions-in-pipedrive#customizing-pipedrive">interface preferences</a>, such as dark or light themes</li>
  </ul>
  `}
</HTMLBlock>

#### App sharing

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> If <a href="https://pipedrive.readme.io/docs/app-sharing-adding-apps-to-multiple-users">requested</a> to be enabled for your app, ensure that multiple users can authorize the app within the same company</li>
  </ul>
  `}
</HTMLBlock>

### Legal

<hr />

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> You agree with <a href="https://pipedrive.readme.io/docs/marketplace-vendor-agreement">the Pipedrive Developer Partner Agreement</a></li>
      <li><input type="checkbox"> Your app has a Terms of Service webpage with clearly stated rules that users must agree to abide by to use your service</li>
      <li><input type="checkbox"> Your app has a Privacy Policy webpage of a legal document with most or all the information on how users’ data is gathered, used, communicated and managed</li>
      <li><input type="checkbox"> Your app does not infringe on trademarks or copyrights of Pipedrive or any other product</li>
      <li><input type="checkbox"> No spam is sent to the emails retrieved from the connected Pipedrive account</li>
  </ul>
  `}
</HTMLBlock>

### App review

<hr />

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
      <li><input type="checkbox"> Provide our team with a demo video in which you explain the usage of permissions and scopes, as well as demonstrate the key functionality of your app</li>
      <li><input type="checkbox"> Provide our team with fully functional and up-to-date test accounts that we will use to properly asses your app and its functionality with Pipedrive</li>
    	<li><input type="checkbox"> Provide our team with a contact that is available for communications regarding questions during the approval process, future co-marketing initiatives and updates to our developer-facing platforms</li>
  </ul>
  `}
</HTMLBlock>

### Other

<hr />

<HTMLBlock>
  {`
  <ul class="checkbox-clickable">
  		<li><input type="checkbox"> Become a member of our <a href="https://devcommunity.pipedrive.com">Developers’ Community</a> for future correspondence</li>
  </ul>
  `}
</HTMLBlock>

<hr />

## Preview your listing

<hr />

<Image alt="An example of an app listing preview in Developer Hub" align="center" width="80% " src="https://files.readme.io/c24c0c6-cd22524-Developer_Hub_-_app_listing_preview.png">
  An example of an app listing preview in Developer Hub
</Image>

Before submitting, you can preview your app’s listing page in Pipedrive’s Marketplace via [Developer Hub](https://app.pipedrive.com/developer-hub). To do so, go to Developer Hub, click on your app’s name and head to the General info, Setup and Installation or Support and legal info tab. You’ll find a green “Preview” button towards the bottom left of the page that allows you to preview your app listing.

<Image align="center" width="80% " src="https://files.readme.io/03ee6ce-d68c8db-Developer_Hub_-_public_app_-_preview_Marketplace_app_listing.png" />

<hr />

## After you submit – what to expect?

<hr />

**Status update:**

* Your app’s status will change in Developer Hub
* You’ll receive an email confirming that we’ll start reviewing it
* If there are any questions from our side, your main contact person should be reachable via email

**Approval:**

* You’ll be notified via email when the app is approved
* The status will also change in the Developer Hub

**Rejection:**

* You’ll be notified via email if the app is rejected
* The status will also change in the Developer Hub
* The reason(s) for rejection will be made clear in the notification email
* Before the app can be submitted again, you’ll need to resolve the reason(s) for the rejection

**Release Date:**

* The app is unlisted from the Marketplace by default after approval. If you wish to have it published, you will need to go to “...” next to your approved app’s name in Developer Hub and click on “Publish”.\
  [What if you can't see the 'Publish' button?](https://pipedrive.readme.io/docs/faq#why-cant-i-see-the-green-publish-button-in-marketplace-manager)

We’re looking forward to seeing what you’ve built for Pipedrive!
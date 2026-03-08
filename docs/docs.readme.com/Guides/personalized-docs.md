# Personalized API Docs Overview

Inject your users' API keys, server variables, and more!

Given the choice between a run-of-the-mill experience that’s the same for everyone and a personalized experience tailored just for you, which would you choose? It’s safe to say that most people would prefer the personalized experience that meets their unique needs, especially if it doesn’t come at the cost of time or resources. Similarly, this idea is important when it comes to introducing and onboarding new users to your API.

That’s why ReadMe’s **Personalized Docs** functionality allows you to surface custom data for your logged-in users (e.g., API keys, server variables, and more), so they can be successful with your API even faster.

<Image align="center" alt="An API reference endpoint in ReadMe. Note the dropdown on the right-hand side. It contains the logged-in user’s list of API keys, which are automatically surfaced so the user can immediately start making authenticated API requests 🚀" caption="An API reference endpoint in ReadMe. Note the dropdown on the right-hand side. It contains the logged-in user’s list of API keys, which are automatically surfaced so the user can immediately start making authenticated API requests" src="https://files.readme.io/533cec7-Screen_Shot_2022-09-28_at_12.59.14_PM.png" />

ReadMe has several tools available to help you personalize your users’ documentation experience for every step of their journey. There are two key steps to achieve this: getting your users **logged in** to your hub, and then **showing custom user data** like API keys or server variables to each user. We’ll walk through both below.

# Getting Your Users Logged In

In order for a user to have a personalized docs experience, we’ll first need to know… who that user is! So the first step is to log your users in to your developer hub. There are several different kinds of login options available:

## Option 1: ReadMe-Powered Login

This is the *awesome-by-default* login method for your users when you set up a developer hub with us. Take an example company, like [the Acme Corporation](https://en.wikipedia.org/wiki/Acme_Corporation). This is what the login page for the Acme’s ReadMe-powered developer hub would look like, with zero configuration:

<Image align="center" alt="The login page for the Acme developer hub (powered by ReadMe)! 🦉" caption="The login page for the Acme developer hub (powered by ReadMe)!" src="https://files.readme.io/4010a5e-asdf.png" />

As you can see, it prominently features the Acme logo at the top, and has a simple form where users of the Acme API docs can log in with an easy **login link** (which will be sent to their email) or via a **password**. The password is for the user’s **ReadMe account**, not their Acme account. There are some helpful tooltips to explain this, and by default we encourage the login link approach since it’s unlikely that users of the Acme API will have an account with ReadMe.

We’re big believers in “awesome-by-default” here at ReadMe — which is why you’ll find that this approach is accessible, minimalist, and easy to set up. If you’re looking to build your own custom login page that more closely adheres to your brand, check out the following login option.

## Option 2: Custom Login

This option requires a bit more work to set up, but is a great option if you wish to use your own login service and branding.

Behind the scenes, the login process is driven by a redirect URL that contains a special [JSON Web Token (JWT)](https://jwt.io/) for that user. The encoded token should include a few basic pieces of data about the user, such as their name and email address. You can read more about Custom Login and JWT on [its dedicated docs page](https://docs.readme.com/docs/custom-login-page).

If you wish to pass more user data into your documentation, such as API keys and other custom variables for the user (which we strongly encourage for a personalized docs experience!), you will need to set up a Personalized Docs Webhook, which we go over in the next section.

## Option 3: Single Sign-On

This is spiritually similar to above, but if you’re looking for login options for project administrators, we also have support for [many different SAML 2.0-based SSO providers](https://docs.readme.com/ent/docs/setting-up-sso)! This feature is only available for our [Enterprise](https://readme.com/enterprise) customers, so contact your PXM (if you’re a current Enterprise customer) or [our Sales team](https://readme.com/enterprise) for help on getting this set up.

# Surfacing Custom User Data

So your user is now logged in — amazing! Now that we know who the user is, let’s level up their docs experience by personalizing it using **custom user data**.

## The Personalization Possibilities Are Endless

But what does personalization look like in practice? Here are a few examples:

* **API Keys** When your users are attempting to make their first call to your API, authentication is often one of the biggest headaches. What if you were able to save your users the trouble and have their API keys automatically pre-filled for every endpoint? By including their API keys in the user data payload, your users can select their API key from a dropdown list and get to that successful first call even faster.

  ![A logged-in user’s list of API keys, which are automatically surfaced in the API reference so the user can immediately start making authenticated API requests 🚀](https://files.readme.io/0770150-Screen_Shot_2022-09-19_at_5.51.05_PM.png)

  Plus, with some upcoming improvements (stay tuned 👀), your users will be able to see all of their API keys at a glance when they enter your API reference:

<Image align="center" border={true} src="https://files.readme.io/21196ed-api_keys_list.png" className="border" />

* **Server Variables** 🔗 Say your API uses [server variables](https://swagger.io/docs/specification/api-host-and-base-path/) for regional endpoints that vary depending on the user’s geographic area. Your templated server URL might look like this:

  ```
  https://{region}.api.example.com
  ```

  Thankfully, ReadMe [already has great server variable support](https://docs.readme.com/docs/openapi-compatibility-chart#server-variable-object) and your users can select their region from a dropdown:

<Image align="center" border={true} src="https://files.readme.io/a236e58-Untitled.png" className="border" />

But what if your docs were able to go above and beyond by automatically pre-filling the `southeastasia` option for any users that lived in Southeast Asia? By including a `region` value in the user data payload, you’ll be able to save your users yet another click and get them even closer to that successful first call.

* **And so much more!** Email addresses (like user@example.com, which is an actual example of a Personalized Docs-powered variable with a default value of user\@example for logged-out users), API versions, body parameter values, important dates… the possible use cases for custom user data in the docs are endless. If there’s any piece of data that’s required to use your product, you can pass it into the user data payload and subsequently render that data in your documentation, like so:

![](https://files.readme.io/e1b8fb6-variables-name.gif)

Your onboarding experience will feel much more magical, and your users and your support staff will thank you.

## Hooking It All Up

Now you’re probably asking yourself: “this whole personalized docs thing sounds all good and fun, but how do I actually populate my users’ data into my docs”? The answer: **webhooks!**

[Webhooks](https://en.wikipedia.org/wiki/Webhook) are “user-defined [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) callbacks”. They are triggered by some event in a web application (in this case, when a user logs into your docs) and can facilitate integrating different applications or third-party APIs (like ReadMe!).

When you set up a **Personalized Docs Webhook** in the ReadMe dashboard, we’ll send you secure API calls any time a user logs into your docs. Configure your webhook to validate our requests and respond with the corresponding data for that user and they’ll immediately see their data appear in the docs.

You can read more about setting up the **Personalized Docs Webhook** on [its dedicated docs page](https://docs.readme.com/docs/personalized-docs-webhook). We also have a walkthrough of the setup process available on YouTube:

<Embed url="https://www.youtube.com/watch?v=QGGhJVeBQmg" href="https://www.youtube.com/watch?v=QGGhJVeBQmg" typeOfEmbed="youtube" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FQGGhJVeBQmg%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DQGGhJVeBQmg%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FQGGhJVeBQmg%252Fhqdefault.jpg%26key%3D7788cb384c9f4d5dbbdbeffd9fe4b92f%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

*This video was recorded in September, 2022. Please note that the setup location has changed in your ReadMe project dashboard, however, all of the instructions and steps that Kanad walks you through are up-to-date!*

# Further Reading

* For more information on setting up the **Personalized Docs Webhook**, check out [this page](https://docs.readme.com/docs/personalized-docs-webhook).
* If you're an Enterprise customer looking to set up the **Personalized Docs Webhook**, check out [this page](https://docs.readme.com/ent/docs/personalized-docs-webhook).
* For more information on setting up a **custom login page**, check out [this page](https://docs.readme.com/docs/custom-login-page).
* For more information on the structuring your **custom user data** in your webhook payloads and how it renders in your documentation, check out [this page](https://docs.readme.com/docs/user-data-options).
* For more information of using **Amazon API Gateway** to set up the Personalized Docs Webhook, check out [this page](https://docs.readme.com/main/docs/amazon-api-gateway-webhook).
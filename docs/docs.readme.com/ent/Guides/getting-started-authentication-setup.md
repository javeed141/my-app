# Getting Started & Authentication Pages

Power a more personalized API onboarding experience with the Personalized Docs Webhook and these pages for your API Reference!

> 👍 Keep Reading if You’re an Enterprise Customer
>
> If you’re looking to set up the Getting Started and Authentication pages for child projects in your Enterprise Group, you’re in the right place! If you’re on a self-serve plan and not on Enterprise, head over to [this doc](https://docs.readme.com/main/docs/reference-core-pages) 😉

## Overview 🌎

When it comes to building a developer hub that developers love, providing them with a solid on-ramp for your APIs goes a long way. One way to do this is by surfacing their actual user data like API keys, server variables, etc. to them in real time, so they can start making requests faster.

The Getting Started and Authentication pages in your API Reference section help you do just that to create a more interactive, personalized experience for your API users. Once configured, these pages allow you to easily surface API keys to your logged in users, so they don’t have to consult a separate settings page on your website before getting started.

<Image align="center" alt="In these pages your logged-in developers will find their API keys, a snapshot of their recent activity (for each API key), and be able to immediately make an authenticated API request using any of the available API keys 🚀" border={true} caption="In these pages your logged-in developers will find their API keys, a snapshot of their recent activity (for each API key), and be able to immediately make an authenticated API request using any of the available API keys 🚀" src="https://files.readme.io/f4c588d-GSA_Pages_in_Hub.gif" />

Read on to learn more about how to configure these pages in your project’s dashboard so that your developers can easily locate their API keys and get started even faster with your API!

## Why Use These Pages ✅

### Show vs. Tell 🪄

Rather than telling your developers how to authenticate and make a request from your API reference, give them the API key(s) directly so that they can do it instantly, and make their first call faster! With their API keys listed front and center, your end developers can easily use the API playground to send an authenticated request. They just need to be logged in to your docs 😉

Similar to the functionality available in your API endpoint pages, there is a Try It playground in the Getting Started and Authentication pages. Logged-in users can click the input in the Authenticate section on each page to see to see the authentication credentials for all of their available API keys. Using the Try It playground, they’re able to make an authenticated request, and instantly see a response, with their real API keys.

<Image align="center" className="border" border={true} src="https://files.readme.io/12ba276-Authentication_Page_use_API_key_in_Try_It_Playground.gif" />

### Even More Customization ✨

Thanks to the [Personalized Docs Webhook](https://docs.readme.com/ent/docs/personalized-docs-webhook) configured in your Enterprise Group dashboard, Group Admins can safely share user data with ReadMe to provide users with their custom data when they log into the hub. Once a user logs in, variables will be automatically populated with custom information tied to that specific user. In addition to getting a list of their API keys in the Your API Keys section, they’ll also be able to see server variables, API versions, their names, email addresses, and more — lots of possibilities!

### Enhanced Insights :mag:

On the Getting Started page, users can also see a snapshot of their recent activity for each of their API keys, including details on their Top Endpoints, Requests, and Recent Requests. If you have Metrics enabled, the counts in each section will reflect total calls made to your endpoints, within and outside of your developer hub. If Metrics isn’t enabled, developers will just see counts that correspond to calls made via the Try It playgrounds.

> 📘 Interested in Setting Up Metrics For Your Project?
>
> Learn how to send your API request data to ReadMe and choose the setup option that works best for you [here](https://docs.readme.com/main/docs/sending-api-logs).

## Configuration Details 🔗

<Image align="center" alt="The Getting Started page in the API Reference section of your child project dashboard" border={true} caption="The Getting Started page in the API Reference section of your child project dashboard" src="https://files.readme.io/8234fa4-Getting_Started_Setup_Page_in_Child_Proj.png" />

Each project in your Enterprise Group will have its own set of Getting Started & Authentication pages within its API Reference, so you’ll need to complete this setup flow for each of your projects. The first time you arrive at the Getting Started or Authentication page in your child project dashboard, you’ll see a setup flow that will prompt you through a series of actions. You’ll only need to complete the setup process once in each project, and both pages will automatically update once you’ve completed the flow:

1. **Deploy the server which enables the[Personalized Docs Webhook](https://docs.readme.com/ent/docs/personalized-docs-webhook) 🪝**

If you haven’t configured the Personalized Docs Webhook and have Group Admin privileges, you’ll be able to click the **Start Setup** button and jump to the Personalized Docs page in your Group dashboard. If you only have Project Admin privileges, there’ll be a prompt to reach out to your Group Admin to set up webhooks.

If you’ve already configured the webhook in your Enterprise Group dashboard, this portion of the setup flow will reflect that the server is already deployed and will automatically jump to the next step — no need to set it up twice!

2. **Choose an API endpoint for developers to use in the Try It playground on the Getting Started and Authentication pages 🔑**

Select an endpoint for developers to use when making their first call in Try It. We recommend GET endpoints in your API definition that do not have any required parameters, so the developer’s first call is as minimal as possible. A `ping` or a “Hello World” type of endpoint works great here! If you have not [added an API definition](https://docs.readme.com/main/docs/openapi) to your project’s API Reference, you’ll be prompted to do that first.

3. **The setup is complete! 🥇**

Once you’ve completed the setup flow, you’ll see previews of the 3-step Getting Started widget on the left and the Recent Activity widget on the right. These widgets will be shown on your Getting Started page automatically, and you can add custom Markdown below them as you like.

<Image align="center" alt="⚠️ Note: the Getting Started and Recent Activity widgets cannot be edited." border={true} caption="⚠️ Note: the Getting Started and Recent Activity widgets cannot be edited." src="https://files.readme.io/9b9dfd1-GSA_Adding_Markdown_in_Getting_Started_page_HiRes.gif" />

Once the setup flow has been completed, the Authentication page will reflect how it will appear in the hub. You can add more details below the API Key Table, Authentication, and Code Example widgets using the new Markdown editor:

<Image align="center" alt="⚠️ Note: the API Key Table, Authentication, and Code Example widgets cannot be edited." border={true} caption="⚠️ Note: the API Key Table, Authentication, and Code Example widgets cannot be edited." src="https://files.readme.io/30be7d1-GSA_Adding_Markdown.gif" />

4. **Final Step! Set the pages live 💡**

In order for these pages to appear on your developer hub, you’ll need to ensure that you’ve clicked the top button from **Private** to **Public** and have also clicked **Save**.

> 🚧 Your Developers Need to Be Logged in to See a Personalized Experience!
>
> Just a reminder that you developers need to be logged in to your hub in order to see their API keys and other personalized info in the Getting Started and Authentication pages. To learn more about ReadMe’s various login options, [head to this doc](https://docs.readme.com/main/docs/personalized-docs#getting-your-users-logged-in-).
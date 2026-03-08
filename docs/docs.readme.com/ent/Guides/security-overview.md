# Security Overview

> 📘 This is an evolving document!
>
> This is a growing document answering common security questions! If you have a questions that you can't find an answer to on this page, please send a message to [support@readme.io](mailto:support@readme.io) and we'll try to get your question answered—and add it to this page—very soon!

## 🔎 Data Access

**Who at my company can view API data?**

Everyone that is listed as an Admin in your ReadMe project(s) will be able to view all of the Metrics data for that project(s). In certain cases, this API data will also be shown to viewers of your public-facing <Glossary>hub</Glossary>.

**When is API data visible to viewers of my ReadMe hub(s)?**

ReadMe shows users their API calls in the API reference section of your developer hub, enabling their ability to quickly troubleshoot issues. For data privacy reasons, there are different behaviors depending on if you've implemented custom login for your ReadMe projects and whether/not the end user acessing your hub is logged in.

* **No custom login (ReadMe login only):** A user's "Try It" API calls are visible in your project's hub until they close the tab or refresh the page. They won't be able to see their previous API calls on future sessions
* **Logged out users with custom login setup:** Same as above
* **Logged in users with custom login setup:** Once the user is authenticated and we can link their API usage directly to their identity, the logged in user will be able to see all of their past API calls from both the "Try It" functionality and any Metrics integration

## 📦 Data Storage

**For how long does ReadMe retain data?**

ReadMe retains all data indefinitely.

**Where will this data be stored?**

API request and key data is stored indefinitely in an Amazon Web Services (AWS) facility in Virginia (USA). Our managed data provider is Altinity for our Clickhouse database hosted on these servers.

**Does ReadMe store any Personally Identifiable Information (PII), including Clearbit data?**

Clearbit data is stored in the same AWS facility in Virginia (USA), in a MongoDB database.

**Is any sensitive data encrypted and/or hashed?**

Data is encrypted at rest by our database providers (Clickhouse and MongoDB). ReadMe does not additionally encrypt or hash any data. To be safe, any sensitive data should be excluded from the requests sent to ReadMe.

**Is it possible to obtain an export of all Try It requests stored on readme.io servers in a secure format and over a secured channel?**

Currently ReadMe does not provide a way to export all Metrics data outside of your project's dashboard, however this is a feature that we are exploring!

**Can a customer remove specific API calls or API keys from ReadMe?**

A customer can not automatically do this, but if the need comes up, please send us a message to let us know. We will do what we can to accommodate the request!

## 🔌 Integrations

**What data is sent by default from an integration?**

By default all data included in the API request and response is sent to Metrics. However, this can be customized in all of our code-based SDKs (Node, Ruby, Python, etc) during setup.

Note that with the Cloudflare and Proxy integrations, you aren't able to allow or deny specific items in the request. If this is a requirement we'd recommend using an SDK.

**How do I prevent sensitive data from being sent to ReadMe?**

In all of the code-based SDKs, you can pass a configuration option either to remove specific items in the request or to allow specific elements (denylist or allowlist). This is useful if there is sensitive data in the request that you don't want ReadMe to receive, as this configuration will prevent that data from being sent to ReadMe.

You can read more about this in the documentation for each SDK, for example: [https://docs.readme.com/main/docs/sending-logs-to-readme-with-nodejs#additional-express-options](https://docs.readme.com/main/docs/sending-logs-to-readme-with-nodejs#additional-express-options)

**What data is sent by default from the Try It functionality (zero config metrics)?**

By default we send all data included in the API request and response, as well as information about how the API call was made. Currently it's not possible to customize what data is sent to ReadMe via Try It, so if you're concerned about sensitive data, the best path would be to disable this feature by turning off the Try It proxy. This would prevent the API call from going through ReadMe in any capacity. Custom configuration is available in the full SDK integration with Metrics if you're interested in exploring that!

**How can I disable Try It request history?**

To disable the Request History section in your API reference section, go to your **Project Settings > Appearance > Reference Styling > Metrics Visibility.**

> 👍 Interested in Learning More About our Security Measures?
>
> Head to [https://security.readme.com/](https://security.readme.com/) to review our security and compliance measures and to request access to view security documents such as our SOC2 report.
# Show API Request History To Users

ReadMe hubs go beyond static docs sites — they're interactive, so users can try your API in real time. On top of the default Try It playground, one of the best ways to make your developer experience stand out is by surfacing a user's real API request history to them directly in your hub. As long as they're logged in, they can view full logs of their past API calls and responses to debug issues and learn through trial and error.

This includes all interactions that the user made with your API, not just the ones made inside ReadMe. In other words, if a user made a failed API call via cURL, then went to read your API reference to understand why the call failed, they would see that failed cURL request in your hub! It's a pretty cool experience 🙂

> 👍 API Request Data Required
>
> Showing request history to users in your hub is only possible if you send your API request data to ReadMe. [Here's how to set it up!](/main/docs/personalized-docs)

# Where can users see their past API requests?

Once you're sending API request data to ReadMe, authenticated (logged in) users will see their request history in a My Requests page in the Reference Section.

<Image align="center" src="https://files.readme.io/f4ad4d3-Capture-2023-11-21-120406.png" />

When you click an individual request, you're taken directly to the endpoint the request was made to in your API Reference — with the complete history of that specific request in the Try It playground, so developers can see exactly what happened.

If they need more help, they can use the Share This Request toggle to generate a unique link for that request that can be shared directly with your developer support team, so everyone's on the same page, looking at the same information.

![](https://files.readme.io/5b25819-screencapture-docs-readme-reference-getproject-2021-11-01-22_59_35.png "screencapture-docs-readme-reference-getproject-2021-11-01-22_59_35.png")

Users will also see past API Requests next to each endpoint in the API Reference. Like in the logs section, clicking on an individual request will populate all of its actual metadata in the Try It playground for visibility and easy debugging.

![](https://files.readme.io/d4d51e5-Screen_Shot_2021-11-01_at_11.11.42_PM.png "Screen Shot 2021-11-01 at 11.11.42 PM.png")

Note: this requires an [OpenAPI spec](https://docs.readme.com/docs/openapi) — so if you don't have one, consider this one more reason to invest the time in building one out!

# How to set this up

Follow these steps to enable users to see their own API requests in the docs:

1. **(Highly Recommended!) Upload an OpenAPI document to ReadMe** — [learn more](https://docs.readme.com/main/docs/openapi).
2. **Send your API request data to ReadMe** — [get started here](https://docs.readme.com/main/docs/sending-api-logs).

> ❗️ Scrub your API logs of confidential information before sending to ReadMe
>
> API logs are viewable by anyone with ReadMe admin privileges. You can find out how to remove secure information from your request data [here](https://docs.readme.com/main/docs/sending-api-logs).

3. **Set Up Authentication In Docs** — To protect your data privacy, all hub users must be authenticated in order to see real API request history data. ReadMe supports logging in with JWT, which you can set up [with this guide](https://docs.readme.com/main/docs/custom-login-page). All you need to do is pass in an `id`  in the user's JWT object that matches the  `apiKey` parameter passed into the API Metrics middleware's grouping function. The user will then be able to view all of the API requests matching that value.

Need help getting this setup? Send us an email at [support@readme.io](mailto:support@readme.io).
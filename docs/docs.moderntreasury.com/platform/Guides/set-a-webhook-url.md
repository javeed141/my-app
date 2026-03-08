# Add a webhook endpoint

This guide details how to configure webhooks for local development or live usage.

> 📘 Testing Webhooks Locally
>
> You can set your Webhook URL on your sandbox account to a local URL (e.g. `http://localhost`, `127.0.0.1`, etc.).  We recommend using a tool such as [ngrok](https://ngrok.com/).

# 1. Navigate to webhooks

In the dashboard, navigate to Developers > [Webhooks](https://app.moderntreasury.com/developers/webhooks). Click "Create Webhook Endpoint" or view the details of existing ones.

# 2. Add a webhook URL

> 📘 Check your environment.
>
> You are only able to add webhooks for your current environment.

Add a webhook URL, which is a URL that points to the webhook consumer (likely your server). We recommend obfuscated, hard-to-guess URLs so as to reduce the chance of a bad-actor attempting to send false events.

> 🚧 HTTPS required for production endpoints.
>
> Note that production URLs must be over HTTPS (start with `https://`).

> 🚧 Sandbox Limitations
>
> You may configure up to 3 webhook endpoints in Sandbox.

# 3. \[Optional] Configure authentication

Using the dropdown, you can add credentials if your endpoint requires authentication.

# 4. Choose event types

You can select to receive all events or choose specific events to receive. You may want to receive only specific events to reduce the load on your endpoint.

# 5. Save

Save the new endpoint, which will be immediately enabled.
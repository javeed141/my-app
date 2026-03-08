# Live vs. Test Mode

For ease of development, Modern Treasury provides both live and test environments for end-users.

When using the API, you will pick an API key from either your live or test environment. Most resources have a `live_mode` field which will confirm which environment the resource is in.

When using the web application, most pages will display a Sandbox toggle that allows you to switch between both environments in the same session. There are some resources that exist across environments to make it easier to configure your organization and to use our dashboard. Today, those are Organizations and Users.
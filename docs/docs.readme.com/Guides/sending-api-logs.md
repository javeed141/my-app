# Real-Time API Logs Overview

ReadMe’s API Logs enables:

* API creators to track API usage and identify errors when developers encounter them
* API consumers to see full logs of their past API calls and responses to debug issues

In order to report on how developers are using your API, you need to integrate with ReadMe by sending your API request data to ReadMe. ReadMe receives your raw request/response data, processes them, and displays them in relevant Metrics charts like API Calls, API Errors, and Endpoints in your project dashboard. Authenticated users of your docs will also be able to access their [API request history directly from your API reference](https://docs.readme.com/main/docs/showing-api-logs-to-users) for quick debugging.

<Image align="center" alt="ReadMe Admins have an overview of who is using their API, track endpoint adoption, and create user segments." caption="ReadMe Admins have an overview of who is using their API, track endpoint adoption, and create user segments." src="https://files.readme.io/6266cd0c49d737b15b39b173db90192fbadf66233f9737b8fff78da708b31e22-mydevs.png" />

## Available SDKs

Here’s a list of supported [SDKs](https://dash.readme.com/project/developers/v2.0/docs/sdks) below. If the language or framework you use is not yet supported, [let us know](https://docs.readme.com/main/docs/need-more-support) what you’re using!

You can also send API logs directly to ReadMe [via our API](https://docs.readme.com/main/reference/post_request).

[Node.js](https://docs.readme.com/main/docs/sending-logs-to-readme-with-nodejs)\
[PHP (Laravel)](https://docs.readme.com/main/docs/sending-logs-to-readme-with-php-laravel)\
[Python (Django)](https://docs.readme.com/main/docs/python-django-api-metrics)\
[Python (Flask)](https://docs.readme.com/main/docs/python-flask-api-metrics)\
[Ruby (Rails/Rack)](https://docs.readme.com/main/docs/ruby-api-metrics-set-up)\
[.NET](https://docs.readme.com/main/docs/net-setup)

## Security

API requests sent to ReadMe show up in your dashboard, so anyone with administrative access to your ReadMe project can view them. API users can also see past requests in the history widget of your API reference, if you implemented a [custom login](https://docs.readme.com/guides/docs/custom-login-with-readme).

Therefore, it's a good idea to omit sensitive or confidential information when you send request data to ReadMe. You can configure this as follows:

* If you send request data to ReadMe via one of our language-based SDKs, you can allow or disallow certain parts of the API request.

* If you're sending data to us via our Try-It-Now functionality in your reference section, we don't currently support a way to allow/disallow information. This functionality is coming soon!

* If you're sending request data via the Metrics API, clean your data before sending it to the API, so confidential data never gets to ReadMe.
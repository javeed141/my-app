# SDKs

This section explains the prerequisites to consider when setting up a ReadMe SDK for the first time.

You must create a ReadMe account before you set up a SDK. A ReadMe account is required to configure any ReadMe SDK. You can [create an account here](https://dash.readme.com/signup).

# Getting Started with ReadMe SDKs

With the ReadMe SDK, you can:

* Simplify authentication by providing API keys directly in your docs and creating a unique API onboarding experience with [Personalized Docs](https://docs.readme.com/main/docs/personalized-docs)
* See where developers get stuck as they’re trying to make their first API call and surface API insights to help them debug with [API Logs](https://docs.readme.com/main/docs/sending-api-logs)

Here's an overview of how to set up ReadMe:

## For Personalized Docs:

* You create a webhook, which is an endpoint that will need to be set up within an application that has secure access to user data, that ReadMe will make a POST request to when an API consumer logs in to your documentation.
* This endpoint will receive POST requests from ReadMe any time a user logs in, and will need to return a JSON object with information about the user, which will then be surfaced in the documentation.

## For API Logs:

* You add ReadMe middleware to your application.
* The middleware will send to ReadMe the request and response objects that your server generates each time a user makes a request to your API. The entire objects are sent, unless you deny or allow specific keys from the request. We’ll send a HAR representation to the ReadMe service.
* ReadMe uses these request and response details to create an API Metrics Dashboard which can be used to analyze specific API calls, monitor aggregate usage data, or identify error messages. If a user logs into your documentation, ReadMe will show them logs of the requests they made in My Requests so they can troubleshoot.

# Available SDKs

Here’s a list of supported SDKs below. If the language or framework you use is not yet supported, [let us know](https://docs.readme.com/main/docs/need-more-support) what you’re using!

You can also send API logs directly to ReadMe [via our API](https://docs.readme.com/main/reference/post_request).

[Node.js](https://docs.readme.com/main/docs/sending-logs-to-readme-with-nodejs)\
[PHP (Laravel)](https://docs.readme.com/main/docs/sending-logs-to-readme-with-php-laravel)\
[Python (Django)](https://docs.readme.com/main/docs/python-django-api-metrics)\
[Python (Flask)](https://docs.readme.com/main/docs/python-flask-api-metrics)\
[Ruby (Rails/Rack)](https://docs.readme.com/main/docs/ruby-api-metrics-set-up)\
[.NET](https://docs.readme.com/main/docs/net-setup)

# Additional Resources

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Language / Framework
      </th>

      <th>
        GitHub Repo
      </th>

      <th>
        Package Manager
      </th>

      <th>
        Sample Apps for Personalized Docs
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [NodeJS](https://docs.readme.com/main/docs/sending-logs-to-readme-with-nodejs)
      </td>

      <td>
        [readmeio](https://github.com/readmeio/metrics-sdks/tree/main/packages/node)
      </td>

      <td>
        [https://www.npmjs.com/package/readmeio](https://www.npmjs.com/package/readmeio)
      </td>

      <td>
        [Express ](https://github.com/readmeio/metrics-sdks/tree/main/packages/node/examples/express)\
        [Fastify ](https://github.com/readmeio/metrics-sdks/tree/main/packages/node/examples/fastify)\
        [Hapi](https://github.com/readmeio/metrics-sdks/tree/main/packages/node/examples/hapi)
      </td>
    </tr>

    <tr>
      <td>
        [PHP (Laravel)](https://docs.readme.com/main/docs/sending-logs-to-readme-with-php-laravel)
      </td>

      <td>
        [readme/metrics](https://github.com/readmeio/metrics-sdks/tree/main/packages/php)
      </td>

      <td>
        [https://packagist.org/packages/readme/metrics](https://packagist.org/packages/readme/metrics)
      </td>

      <td>
        [Laravel](https://github.com/readmeio/metrics-sdks/tree/main/packages/php/examples/laravel)
      </td>
    </tr>

    <tr>
      <td>
        [Python (Django)](https://docs.readme.com/main/docs/python-django-api-metrics) [Python (Flask)](https://docs.readme.com/main/docs/python-flask-api-metrics)
      </td>

      <td>
        [readme-metrics](https://github.com/readmeio/metrics-sdks/tree/main/packages/python)
      </td>

      <td>
        [https://pypi.org/project/readme-metrics/](https://pypi.org/project/readme-metrics/)
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Ruby (Rails/Rack)](https://docs.readme.com/main/docs/ruby-api-metrics-set-up)
      </td>

      <td>
        [readme-metrics](https://github.com/readmeio/metrics-sdks/tree/main/packages/ruby)
      </td>

      <td>
        [https://rubygems.org/gems/readme-metrics](https://rubygems.org/gems/readme-metrics)
      </td>

      <td>
        [Rails](https://github.com/readmeio/metrics-sdks/tree/main/packages/ruby/examples/metrics-rails)
      </td>
    </tr>

    <tr>
      <td>
        [.NET](https://docs.readme.com/main/docs/net-setup)
      </td>

      <td>
        [ReadMe.Metrics](https://github.com/readmeio/metrics-sdks/tree/main/packages/dotnet)
      </td>

      <td>
        [https://www.nuget.org/packages/ReadMe.Metrics](https://www.nuget.org/packages/ReadMe.Metrics)
      </td>

      <td>
        [.NET 6.0](https://github.com/readmeio/metrics-sdks/tree/main/packages/dotnet/examples/net6.0)
      </td>
    </tr>
  </tbody>
</Table>
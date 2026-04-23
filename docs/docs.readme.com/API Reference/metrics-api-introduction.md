# Metrics API Introduction

See how people use your docs and how developers use your API

> 🚧 Metrics API is an Enterprise Feature
>
> Getting metrics data via our API is only available on our Enterprise Plan. Contact [growth@readme.io](mailto:growth@readme.io) if you are interested!

The Metrics API gives you access to usage data for your API and documentation site, so you can make more data-driven decisions around your platform and API roadmap. Many of the metrics that you can get using this API are also available as visualizations directly in ReadMe via the Metrics tab in your project.

## Authentication

You can use the same ReadMe project API key in the Metrics API. For more information about using this key, learn more [authentication](https://docs.readme.com/main/reference/intro/authentication).

## Endpoints overview

**API Logs**

Use this endpoint to integrate your API with [Developer Dashboard in ReadMe](https://docs.readme.com/main/docs/developer-dashboard).

**Page Views**

Use these endpoints to see metrics about your most frequently viewed documentation. You can see a more in-depth view on the Metrics dashboard at [https://dash.readme.com/project/`${yourProject}`/`${yourVersion}`/metrics/v2/page-views](https://dash.readme.com/project/`$\{yourProject}`/`$\{yourVersion}`/metrics/v2/page-views).

**Search**

Use these endpoints to see the top terms your users are searching for in your docs.  You can see a more in-depth view on the Metrics dashboard at [https://dash.readme.com/project/`${yourProject}`/`${yourVersion}`/metrics/v2/search](https://dash.readme.com/project/`$\{yourProject}`/`$\{yourVersion}`/metrics/v2/search).

**Page Quality**

Use these endpoints to see which documentation pages your users voted as helpful or not.  You can see a more in-depth view on the Metrics dashboard at [https://dash.readme.com/project/`${yourProject}`/`${yourVersion}`/metrics/v2/page-quality](https://dash.readme.com/project/`$\{yourProject}`/`$\{yourVersion}`/metrics/v2/page-quality).
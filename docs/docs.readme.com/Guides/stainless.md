# Stainless

Automatically update your API reference when publishing an SDK with Stainless

If you sync an OpenAPI file to your ReadMe API reference and use [Stainless](https://www.stainlessapi.com/) to generate SDKs for your API, add the following to your Stainless config:

```yaml openapi.stainless.yml
openapi:
  code_samples: readme
```

Then configure your GitHub action to upload the Stainless-enhanced OpenAPI spec to ReadMe:

```yaml
name: Upload OpenAPI spec to Stainless and ReadMe

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  stainless:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: stainless-api/upload-openapi-spec-action@main
        with:
          stainless_api_key: ${{ secrets.STAINLESS_API_KEY }}
          input_path: 'path/to/my-company-openapi.json'
          output_path: 'path/to/my-company-openapi.documented.json'
          project_name: 'my-stainless-project'
          commit_message: 'feat(api): my cool feature'
      - uses: readmeio/rdme@v8
        with:
          rdme: openapi "path/to/my-company-openapi.documented.json" --key=${{ secrets.README_TOKEN }} --id=${{ secrets.README_DEFINITION_ID }}
```

This assumes the following secrets have been [uploaded to your GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):

* `secrets.STAINLESS_API_KEY`: Your Stainless API key.
* `secrets.README_TOKEN`: Your [ReadMe API key](https://docs.readme.com/main/reference/intro/authentication#api-key-quick-start). Only sent to ReadMe's servers.
* `secrets.README_DEFINITION_ID`: Per our docs on [re-syncing an OpenAPI definition](https://docs.readme.com/main/docs/openapi-resyncing#api-definition-ids),\
  this can be obtained within the API Reference settings of your dashboard. This is not sent to Stainless's servers.

Remember to set the `readmeio/rdme` ref version to the latest stable available (`v8`, as of this writing). You can verify the latest version of ReadMe's GitHub Action [here](https://github.com/marketplace/actions/rdme-sync-to-readme).
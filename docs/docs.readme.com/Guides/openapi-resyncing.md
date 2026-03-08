# Re-syncing Your OpenAPI Document

## API Definition IDs

Once you've uploaded an OpenAPI file to ReadMe, you'll see the following in the API Reference settings of your dashboard (the red outline is where you'll find your API definition ID):

![](https://files.readme.io/d57b7c8-Screen_Shot_2022-02-23_at_11.54.21_AM.png)

Alternatively, you can obtain the API definition ID by running the following `rdme` CLI command on your local machine:

```shell
rdme openapi [url-or-local-path-to-file]
```

Once you follow the prompts and upload your OpenAPI definition, you'll receive a confirmation message that looks something like this:

```
You've successfully updated an OpenAPI file on your ReadMe project!

        http://dash.readme.com/project/{your_project}/v1.0/refs/pet

To update your OpenAPI definition, run the following:

        rdme openapi [url-or-local-path-to-file] --key=<key> --id=API_DEFINITION_ID
```

The `API_DEFINITION_ID` is the API definition ID within ReadMe.

## Operation IDs

On re-sync of your OpenAPI file, pages are merged with existing pages if they are present. We use `operationId` of the [Operation Object](https://docs.readme.com/docs/openapi-compatibility-chart#operation-object) to determine what pages are considered to be the same.

If on re-sync there is a new `operationId`, then a new page is created. If on re-sync an `operationId` is removed, then the page is removed.

If you do not have an `operationId`, we create one for you using the following algorithm.

With an endpoint like this:

```json no operationId
{
  "/pet": {
    "post": {
    }
  }
}
```

We take the path `/pet`, remove any non-alphanumeric characters, lowercase it and concatenate it onto the end of the method. So the above would become `post_pet`.

> ❗️
>
> **We recommend you always provide an`operationId` for each of your endpoints to reduce the risk of data loss associated with us creating a unique ID for you.**
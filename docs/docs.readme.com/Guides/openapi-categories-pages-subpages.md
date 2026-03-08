# Categories, Pages, and Subpages

When you import an OpenAPI document, we will automatically create Categories, Pages and Subpages which will accurately represent your API.

# Category

For each OpenAPI document you import, we create a top level category for it. The title for this category will be whatever you have set in `title` in the [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-1).

> 📘
>
> For the purpose of creating categories, a single OpenAPI document made of multiple `$ref`-linked files counts as one document.

# Page

## Tags

If you have tags in your OpenAPI document, we use the first item in the `tags` list in the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-8) as the page title.

> 📘
>
> The categories in your reference section will match the `tags` order that is found in your OpenAPI document. Within a given tag, the operations will be sorted based on the order they were defined in your OpenAPI document. You can reorder them in the dashboard or via the API, and any subsequent updates to your OpenAPI document will respect that ordering.

So if your path object looked like this:

```json tags
{
  "/pet": {
    "post": {
      "tags": [
        "pet"
      ],
      "summary": "Add a new pet to the store",
      "operationId": "addPet"
    }
  }
}
```

Each path that has a first tag of `pet` would be grouped together under an empty parent page with the title of `pet`.

## Without Tags

If you do not have tags in your OpenAPI document, then endpoints will be grouped under the URL.

So given the following path object:

```json without tags
{
  "/pet": {
    "post": {
      "summary": "Add a new pet to the store",
      "operationId": "addPet"
    }
  }
}
```

Each method would be grouped together under a page with the title of `/pet`.

# Subpages

A new subpage is created for each of the endpoints in your OpenAPI document.

If present, we use the `summary` of the [Path Item object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-7) as the page title. If you do not have a summary but you are using tags, then we use the URL. We fallback to using method if nothing else is available.

This allows you to have 4 different possible naming systems for your pages:

## Tags and summaries

* Tag name
  * Endpoint summary 1
  * Endpoint summary 2

## Tags and no summaries

* Tag name
  * /url1
  * /url2

## No tags and summaries

* /url-without-tag
  * Endpoint summary 1
  * Endpoint summary 2

## No tags and no summaries

* /url-without-tag
  * get
  * post

You can also create subpages by selecting the three dashes icon and dragging the desired subpage underneath the parent page and directly to the right. To take a page out of the subpage level, simply drag it to the left above its parent page.

# Customizing Subheaders on Endpoints

You can customize the subheader using the `description` of the [Path Item object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-7). This also accepts Markdown.
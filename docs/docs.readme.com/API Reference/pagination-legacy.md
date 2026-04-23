# Limiting API Results

The ReadMe API uses pagination on those endpoints that return lists. The following endpoints return paginated lists:

* [Get API specification metadata](https://docs.readme.com/main/reference/api-specification#get_api-specification)
* [Get all categories](https://docs.readme.com/main/reference/getcategories)
* [Get changelogs](https://docs.readme.com/main/reference/getchangelogs)
* [Get custom pages](https://docs.readme.com/main/reference/getcustompages)

Requests that return multiple items will be paginated to 10 items by default. If you want to return multiple pages, you can use the `page` query parameter. You can also set a custom page size up to 100 with the `perPage` query parameter.

Like the [GitHub API](https://docs.github.com/en/rest/guides/traversing-with-pagination), the [`Link` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) also includes pagination information:

```
Link: </api/v1/changelogs?perPage=10&page=3>; rel="next",
  </api/v1/changelogs?perPage=10&page=1>; rel="prev",
  </api/v1/changelogs?perPage=10&page=8>; rel="last"
```

*The above example includes line breaks for readability.*

The possible `rel` values are:

| Name   | Description                                                   |
| :----- | :------------------------------------------------------------ |
| `next` | The link relation for the immediate next page of results.     |
| `prev` | The link relation for the immediate previous page of results. |
| `last` | The link relation for the very last page of results.          |

Additionally, the `x-total-count` header provides the total number of items, ignoring pagination. See below for an example:

```
x-total-count: 84
```
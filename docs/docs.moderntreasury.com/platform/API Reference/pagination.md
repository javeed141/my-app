# Pagination

By default all "List" endpoints return paginated results. You may use the query params `after_cursor` and `per_page` to control the number of results you see. For `per_page` the default will be 25 but can optionally be increased to a maximum of 100.

When reading paginated responses from the API, the following response headers will also be sent:

| Header           | Description                                                                                                                         |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `X-After-Cursor` | The next cursor value to retrieve more results. When there are no more pages of results to retrieve, this header will be missing.\* |
| `X-Per-Page`     | The current `per_page`                                                                                                              |

\*We make a best effort to respect the `X-Per-Page` parameter, the actual number of records returned may be less than, equal to, or more than the requested amount. You may also receive blank pages while paginating. Always continue pagination until there is no `X-After-Cursor` header to ensure records are not missed.
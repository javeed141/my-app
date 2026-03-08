# Limiting API Results

The ReadMe API uses pagination on endpoints that return collections of data.

* [Get your API keys](https://docs.readme.com/main/reference/getapikeys)
* [Get all changelog entries](https://docs.readme.com/main/reference/getchangelogs-1)
* [Get uploaded images](https://docs.readme.com/main/reference/getimages)

All pagination data will be returned within a `paging` object in your response:

```json
{
  "total": 5,
  "page": 2,
  "per_page": 2,
  "paging": {
    "next": "/images?page=3&per_page=2",
    "previous": "/images?page=1&per_page=2",
    "first": "/images?page=1&per_page=2",
    "last": "/images?page=3&per_page=2"
  },
  "data": [
    {
      /* image object */
    },
    {
      /* image object */
    }
  ]
}
```

* `next` is the page of content immediately following the current page. If the current page is the last page, this will be `null`.
* `previous` is the page of content immediately before the current page. If the current page is the first page, this will be `null`.
* `first` is the very first page of content. This will always have a value.
* `last` is the very last page of content. This will always have a value.

Requests that return multiple resources will be paginated to 10 items by default. If you would like to different pages you can utilize the `page` query parameter. You can also customize your page size, up to 100, with the `per_page` query parameter.
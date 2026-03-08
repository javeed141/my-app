# How Business Records Are Merged

For each record we collect, we generate 1 or more `keys` for the record.  Each key value is based on different unique identifiers that are available from the record's data.  If we see a different record with 1 or more of the same `keys` values, we will merge these two records.

For example, we may generate a business record like this when crawling a web page:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"name\": \"Joe's Sloppy Joes\",\n  \"address\": \"123 Anywhere St\",\n  \"city\": \"Austin\",\n  \"province\": \"TX\",\n  \"country\": \"US\",\n  \"twitter\": \"joessloppyjoes\"\n}",
      "language": "json"
    }
  ]
}
[/block]

This record will generate the following `keys`:

```
"keys": [
  "US/TX/Austin/123-Anywhere-St/8833444"
]
```

Let's say we then crawl another web page for the same business and generate this data:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"name\": \"Joe's Sloppy Joes\",\n  \"address\": \"123 Anywhere St\",\n  \"city\": \"Austin\",\n  \"province\": \"TX\",\n  \"country\": \"US\",\n  \"websites\": [\n    \"https://joessloppyjoes.com\"\n  ]\n}",
      "language": "json"
    }
  ]
}
[/block]

This will generate the same `keys` value, so the two records will be merged:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"name\": \"Joe's Sloppy Joes\",\n  \"address\": \"123 Anywhere St\",\n  \"city\": \"Austin\",\n  \"province\": \"TX\",\n  \"country\": \"US\",\n  \"keys\": [\n  \t\"US/TX/Austin/123-Anywhere-St/8833444\"\n  ],\n  \"twitter\": \"joessloppyjoes\",\n  \"websites\": [\n    \"https://joessloppyjoes.com\"\n  ]\n}",
      "language": "json"
    }
  ]
}
[/block]

Business records use the following fields to generate keys:

* `address`
* `city`
* `province`
* `country`
* `name`

`name` is used to disambiguate between two businesses located at the same address (e.g., business located at a mall).
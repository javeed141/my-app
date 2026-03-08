# Search and Downloads

Our data is accessed through a `/search` endpoint for each of our data types.

[block:callout]
{
  "type": "info",
  "title": "Search Endpoints",
  "body": "* `/products/search`\n* `/businesses/search`\n* `/properties/search`"
}
[/block]

These endpoints can be used to retrieve up to 10 records at a time, unless you request a download by including `download: true` in the request body. This allows you to limit the number of credits you spend refining your search parameters. Once you set `download: true`, we will create a bulk data download for you that includes all of the matching records for your search, up to a maximum of `num_records`.
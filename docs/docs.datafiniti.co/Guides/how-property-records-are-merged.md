# How Property Records Are Merged

For each record we collect, we generate 1 or more `keys` for the record.  Each key value is based on different unique identifiers that are available from the record's data.  If we see a different record with 1 or more of the same `keys` values, we will merge these two records.

For example, we may generate a property record like this when crawling a web page:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"address\": \"123 Anywhere St\",\n  \"city\": \"Austin\",\n  \"province\": \"TX\",\n  \"country\": \"US\",\n  \"numBedroom\": 3,\n  \"numBathroom\": 3\n}",
      "language": "json"
    }
  ]
}
[/block]

This record will generate the following `keys`:

```
"keys": [
  "US/TX/Austin/123AnywhereSt"
]
```

Let's say we then crawl another web page for the same product and generate this data:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"address\": \"123 Anywhere St\",\n  \"city\": \"Austin\",\n  \"province\": \"TX\",\n  \"country\": \"US\",\n  \"neighborhoods\": [\n    \"Rolling Hills\",\n  ]\n}",
      "language": "json"
    }
  ]
}
[/block]

This record will generate the same `keys` value as the previous record, so the two records will be merged together.  The resulting record will be:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"address\": \"123 Anywhere St\",\n  \"city\": \"Austin\",\n  \"province\": \"TX\",\n  \"country\": \"US\",\n  \"neighborhoods\": [\n    \"Rolling Hills\",\n  ],\n  \"numBathroom\": 3,\n  \"numBedroom\": 3\n}",
      "language": "json"
    }
  ]
}
[/block]

Property records use the following fields to generate keys:

* `address`
* `city`
* `country`
* `province`
* `taxID`
* `mlsNumber`

`taxID` and `mlsNumber` are used in conjunction with `province`.

## What Happens When Datafiniti Finds Conflicting Data

Datafiniti is always looking for the most up to date property data. In doing so, we might find new or updated data from the source of a property list. Sometimes this data could vary from the existing data record in Datafiniti's database. In this case we have a data validator that will determine what data gets appended or overwritten. This process is usually determined by the nature of the top level schema field.

## Appended Fields

Appended Fields are meant to serve as a history of data about the property itself. When a Datafiniti finds a conflict that shows the source of the data has updated information about the property, we will append this data to the following schema fields as an array.

* `brokers`
* `deposits`
* `descriptions`
* `domains`
* `features`
* `fees`
* `imageURLs`
* `languagesSpoken`
* `leasingTerms`
* `managedBy`
* `parking`
* `paymentTypes`
* `people`
* `phones`
* `prices`
* `propertyTaxes`
* `reviews`
* `statuses`

**Example:**

When the Datafiniti's Scraper detects a change in the price of the record of 123 Anywhere St, Datafiniti will have the new price and isSold sale status to the prices array.

[block:code]
{
  "codes": [
    {
      "code": " \"address\": \"123 Anywhere St\",\n \"country\": \"US\",\n \"dateAdded\": \"2022-04-26T05:45:22Z\",\n \"dateUpdated\": \"2022-06-25T23:59:53Z\",\n \"prices\": [\n                {\n                    \"amountMax\": 389000,\n                    \"amountMin\": 389000,\n                    \"availability\": \"true\",\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2022-04-26T05:45:22Z\"\n                    ],\n                    \"isSold\": \"false\"\n                }\n   ]\n\t ",
      "language": "json",
      "name": "Before Record"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": " \"address\": \"123 Anywhere St\",\n \"country\": \"US\",\n \"dateAdded\": \"2022-04-26T05:45:22Z\",\n \"dateUpdated\": \"2022-07-30T05:45:22Z\",\n \"prices\": [\n                {\n                    \"amountMax\": 389000,\n                    \"amountMin\": 389000,\n                    \"availability\": \"true\",\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2022-07-30T05:45:22Z\"\n                    ],\n                    \"isSold\": \"false\"\n                },\n                {\n                    \"amountMax\": 500000,\n                    \"amountMin\": 500000,\n                    \"availability\": \"true\",\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2022-07-30T05:45:22Z\"\n                    ],\n                    \"isSold\": \"false\"\n                }\n   ]",
      "language": "text",
      "name": "After Price Change Is Found"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "DateUpdated",
  "body": "Please note that any change (appended or Overwritten) will update the dataUpdated field in the record to signify when the change took place."
}
[/block]

## Overwritten Fields

Overwritten Fields are used as a quick source of convenient data that serves as a fluid all ways changing field. This is determined upon the most recent scrape of the data record source. In cases where Datafiniti has determine the source of the data is correct we will update the following fields where possible:

* `dateUpdated`
* `floorSizeValue`
* `listingName`
* `lotSizeValue`
* `mostRecentStatus`
* `mostRecentStatusDate`
* `mostRecentStatusFirstDateSeen`
* `numBathroom`
* `numBedroom`
* `numFloor`
* `numPeople`
* `numUnit`
* `mostRecentStatusFirstDateSeen`
* `numBathroom`
* `numBedroom`
* `numFloor`
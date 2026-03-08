# Property Data Enrichment with JSON

For this guide, we're going to assume the following you're interested in using Datafiniti's property data enrichment to enrich an existing line separated json file of commercial addresses in Texas, US. There are 5 steps to run a property data enrichment using a json:

1. Select your enrichment file
2. Set your field\_parameter(s)
3. Configure your query
4. Configure your format & view
5. Start your download

## select your enrichment file

Shown here is an example of an acceptable line separated json file with the correct header to match *address* & *postalCode*. We will be using this file for the example in this guide.

[block:code]
{
  "codes": [
    {
      "code": "{\"address\":\"9920 WESTPARK DR\",\"postalCode\":77063}\n{\"address\":\"W BAY AREA BLVD\",\"postalCode\":77546}\n{\"address\":\"16310 State Highway 249\",\"postalCode\":77064}\n{\"address\":\"13355 Noel Rd\",\"postalCode\":\"75240-0000\"}\n{\"address\":\"300 Crescent Ct\",\"postalCode\":\"75201-1876\"}\n{\"address\":\"2340 E TRINITY MILLS RD\",\"postalCode\":\"75006-1942\"}\n{\"address\":\"1901 Milam St\",\"postalCode\":77002}\n{\"address\":\"23201 ALDINE WESTFIELD RD\",\"postalCode\":77373}\n{\"address\":\"2351 W Northwest Hwy\",\"postalCode\":\"75220-0000\"}\n{\"address\":\"1425 W PIONEER DR\",\"postalCode\":\"75061-7146\"}\n{\"address\":\"8204 Elmbrook Dr\",\"postalCode\":\"75247-4067\"}\n{\"address\":\"10935 Estate Ln\",\"postalCode\":\"75238-0000\"}\n{\"address\":\"1201 MAIN ST\",\"postalCode\":\"75202-3908\"}\n{\"address\":\"2616 MANOR Way\",\"postalCode\":\"75235-0000\"}\n{\"address\":\"1800 West Loop S\",\"postalCode\":77027}\n{\"address\":\"5949 Sherry Ln\",\"postalCode\":\"75225-6532\"}\n{\"address\":\"17300 Preston Rd\",\"postalCode\":\"75252-5618\"}\n{\"address\":\"3460 W WALNUT ST\",\"postalCode\":\"75042-7151\"}\n{\"address\":\"888 S GREENVILLE AVE\",\"postalCode\":\"75081-5058\"}\n{\"address\":\"2815 Valley View Ln\",\"postalCode\":\"75234-4956\"}",
      "language": "json",
      "name": "PropertyEnrichAddresses.txt"
    }
  ]
}
[/block]

Set your enrichment file as the field\_parameter file.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1fcfd13-fileJSONselect.png",
        "fileJSONselect.png",
        1431,
        586,
        "#000000"
      ],
      "caption": "Note that *address* AND *postalCode* are common separated."
    }
  ]
}
[/block]

## Set Your field\_parameter

For the field parameter, we want to make sure that the Datafiniti schema field is selected and matches inside the txt file. This will allow the enrichment API to target submitted addresses plus postalCodes in our case here.
You can read more about other property schema fields [here](https://developer.datafiniti.co/docs/property-data-schema).

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3c8131c-PropertyEnrichParamsJson.gif",
        "PropertyEnrichParamsJson.gif",
        880,
        415,
        "#000000"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "JSON format",
  "body": "Our enrichment search API will not allow any JSON object with keys that do not match your field parameters. Be sure to match the field parameter in our property schema [here](https://developer.datafiniti.co/docs/property-data-schema). A common error you may see in this case: \n\n        \"Invalid file type, must be csv or text file.\""
}
[/block]

## Configure your query

The query is essential to target the specific group of data you are trying to enrich from. Datafiniti has a very large dataset, and in most cases, you will not need to search through the entire database. Your query can be built using the same logic from our search API [here](https://developer.datafiniti.co/docs/constructing-property-queries).

There are some things you must have in your query. You must include a wildcard for each of the field\_parameter you search off of. In this case, we will add the following:

For our example here, we will add logic to our query to search for properties in the Texas, US, with an *address*, with a *postalcode*, and have the *propertyType* equal to commercial.

[block:code]
{
  "codes": [
    {
      "code": "address:* AND postalCode:* AND country:US AND province:(TX) AND propertyType:\\\"commercial\\\"",
      "language": "json",
      "name": "query"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7000e4e-enrichpropertiesjsonQuery.png",
        "enrichpropertiesjsonQuery.png",
        874,
        361,
        "#000000"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "We strongly advise against generalized ***field_parameter*** values. This will create a search through a larger pool of properties. Therefore the more specific your query is, the faster your enrichment job will be.",
  "title": "Query - download time"
}
[/block]

## Configure your format & view

Your format will determine the output file type of the enrichment download you wish to start. This can be set to either of *csv* or *json*. For this example, we will set it to *json*.

Finally, the view is used to specify which fields you want to be added to your data. If no view is provided, we will add all fields from matching records as we do for our ***default*** view for the [Available Views for Property Data](https://docs.datafiniti.co/docs/available-views-for-property-data)

Your final parameter should be set up as the following.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4d2bb9a-JsonEnrichment.png",
        "JsonEnrichment.png",
        872,
        415,
        "#000000"
      ]
    }
  ]
}
[/block]

Listed below is a cURL POST to import this example into Postman.

[block:code]
{
  "codes": [
    {
      "code": "curl --location 'https://api.datafiniti.co/v4/properties/search/enrichment' \\\n--header 'Authorization: Bearer insert_your_key_here' \\\n--form 'address,postalCode=@\"/C:/Users/Leonard/Downloads/PropertyEnrichAddresses.txt\"' \\\n--form 'format=\"json\"' \\\n--form 'num_records=\"20\"' \\\n--form 'query=\"address:* AND postalCode:* AND country:US AND province:(TX) AND propertyType:\\\\\\\"commercial\\\\\\\"\"' \\\n--form 'view=\"default\"'",
      "language": "curl"
    }
  ]
}
[/block]

## Start your download

Once you send your Postman request for the enrichment download you will not be charged credits immediately. It will create a download response. We recommend holding on to the download ID for that will allow your to access the data once the status is complete. For more on how to manage your downloads, you can visit [here](https://developer.datafiniti.co/docs/postman-downloading-result-files).

An example enrichment download response:

[block:code]
{
  "codes": [
    {
      "code": "{\n    \"status\": \"queued\",\n    \"num_downloaded\": 0,\n    \"num_records_suppressed\": 0,\n    \"total_cost\": 0,\n    \"fields\": [\n        {\n            \"name\": \"address\"\n        },\n        {\n            \"name\": \"apiURLs\",\n            \"flatten\": false\n        }\n    ],\n    \"sort\": true,\n    \"format\": \"json\",\n    \"suppressed_fields\": [],\n    \"enriched_fields\": [\n        {\n            \"field\": \"address,postalCode\",\n            \"s3Key\": \"production/126609/1678125819862-PropertyEnrichAddresses.txt\"\n        }\n    ],\n    \"user\": 111609,\n    \"query\": \"address:* AND postalCode:* AND country:US AND province:(TX) AND propertyType:\\\\\\\"commercial\\\\\\\"\",\n    \"num_records\": 20,\n    \"data_type\": \"property\",\n    \"results\": [],\n    \"date_started\": \"2023-03-06T18:03:40.383Z\",\n    \"date_updated\": \"2023-03-06T18:03:40.383Z\",\n    \"_id\": 186861,\n    \"is_suppression_job\": false,\n    \"is_enrichment_job\": true,\n    \"id\": \"186861\"\n}",
      "language": "json"
    }
  ]
}
[/block]
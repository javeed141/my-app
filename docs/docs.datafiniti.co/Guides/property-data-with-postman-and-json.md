# Product Data Enrichment with Postman and JSON

For this guide, we're going to assume the following you're interested in using Datafiniti's product data enrichment to enrich an existing line-separated json file of gtin values. There are 5 steps to run a product data enrichment using json:

1. Select your enrichment file
2. Set your field\_parameter(s)
3. Configure your query
4. Configure your format & view
5. Start your download

## Select your enrichment file

Shown here is an example of an acceptable line separate json file with the correct keys to match *gtins*. We will be using this file for the example.

[block:code]
{
  "codes": [
    {
      "code": "{\"id\":\"ByfmlncBccoD1xujZi_h\",\"brand\":\"DELL\",\"gtins\":884116385257}\n{\"id\":\"NSvlJ3gBUbef_7uTmrZ0\",\"brand\":\"iVIEW\",\"gtins\":880010018154}\n{\"id\":\"AW5IbZIW0Rejpz6vwAXt\",\"brand\":\"DELL\",\"gtins\":884116316909}\n{\"id\":\"dgiPbXIBvxj1aRneT4Do\",\"brand\":\"Lenovo\",\"gtins\":194552049454}\n{\"id\":\"AVwjfl5Pnnc1JgDc5uVT\",\"brand\":\"Microsoft\",\"gtins\":\"0889842170634\"}\n{\"id\":\"b1HdPnIBo6SyyXo05RFA\",\"brand\":\"HP\",\"gtins\":195122090630}\n{\"id\":\"ufzNCHUBo6SyyXo0Cbhh\",\"brand\":\"HP\",\"gtins\":880118668855}\n{\"id\":\"V3Lmn3IBo6SyyXo08van\",\"brand\":\"Lenovo\",\"gtins\":194778022286}\n{\"id\":\"hiblJ3gBPkqI1fUQnVR3\",\"brand\":\"iVIEW\",\"gtins\":880010018116}\n{\"id\":\"DYxQZXEBPkqI1fUQQmtB\",\"brand\":\"Microsoft\",\"gtins\":889842294590}\n{\"id\":\"F-ej_3EBvxj1aRneqIxF\",\"brand\":\"Microsoft\",\"gtins\":889842594003}\n{\"id\":\"5u9xbHYBUbef_7uTUCwb\",\"brand\":\"ASUS\",\"gtins\":192876840085}\n{\"id\":\"cQrmQHcBPkqI1fUQlT3h\",\"brand\":\"HP\",\"gtins\":196068441692}\n{\"id\":\"AV13Ck1nglJLPUi8O7f5\",\"brand\":\"HP\",\"gtins\":\"0825633419421\"}\n{\"id\":\"HBCgGXcBvxj1aRneekAa\",\"brand\":\"Lenovo\",\"gtins\":195477750357}\n{\"id\":\"wYybZHEBPkqI1fUQJCDZ\",\"brand\":\"Microsoft\",\"gtins\":889842388244}\n{\"id\":\"kiw2NXMBPkqI1fUQQYJW\",\"brand\":\"Microsoft\",\"gtins\":889842265903}\n{\"id\":\"l_E3AngBYEtaI8J07_Y-\",\"brand\":\"ASUS\",\"gtins\":192876803684}\n{\"id\":\"AW-1PyF-0Rejpz6vIIv6\",\"brand\":\"Microsoft\",\"gtins\":889842784145}\n{\"id\":\"AVpe8Qmu1cnluZ0-aV3y\",\"brand\":\"HP\",\"gtins\":680596404057}",
      "language": "text",
      "name": "productEnrichment20.txt"
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
        "https://files.readme.io/5d81381-fileJSONselect.png",
        "fileJSONselect.png",
        1431,
        586,
        "#000000"
      ]
    }
  ]
}
[/block]

## Set your field\_parameter

For the field parameter, we want to make sure that the Datafiniti schema field is selected and matches inside the txt file. This will allow the enrichment API to target submitted gtins in our case here.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9fd4125-gtinsfieldparam.gif",
        "gtinsfieldparam.gif",
        1615,
        559,
        "#000000"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "Our enrichment search API will not allow a regular json file as submittable comparison file. Please be sure to convert you json to a line separated file before submission. Common error you may see in this case: \n\n        \"Invalid file type, must be csv or text file.\"",
  "title": "Line separate json file"
}
[/block]

## Configure your query

The query is essential to target the specific group of data you are trying to enrich from. Datafiniti has a very large dataset, and in most cases, you will not need to search through the entire database. Your query can be built using the same logic from our search API [here](https://developer.datafiniti.co/docs/constructing-property-queries).

There are some things you must have in your query. You must include a wildcard for each of the field\_parameter you are search off of. In this case, we will add the following:

For our example here, we will add logic to our query to search for categories equal to cosmetics and only for products updated since September 31st

[block:code]
{
  "codes": [
    {
      "code": "gtins:* AND categories:cosmetics AND dateUpdated:[2022-09-31 TO *]",
      "language": "text",
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
        "https://files.readme.io/002cb19-5d63a65-postmanProductEnrich.png",
        "5d63a65-postmanProductEnrich.png",
        1599,
        571,
        "#000000"
      ],
      "caption": ""
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "We strongly advise against generalized ***field_parameter*** values. This will create a search through a larger pool of products. Therefore the more specific your query is, the faster your enrichment job will be.",
  "title": "Query - download time"
}
[/block]

## Configure your format & view

Your format will determine the output file type of the enrichment download you wish to start. This can be set to either of *csv* or *json*. For this example we will set it to *csv*.

Finally the view is used to specify which fields you want added to your data. If no view is provided, we will add all fields from matching records as we do for our ***default*** view for the [product search API](https://developer.datafiniti.co/docs/available-views-for-product-data).

Your finally parameter should be setup as the following.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5d63a65-postmanProductEnrich.png",
        "postmanProductEnrich.png",
        1599,
        571,
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
      "code": "curl --location --request POST 'https://api.datafiniti.co/v4/product/search/enrichment' \\\n--header 'Authorization: Bearer replace_with_your_APIkey' \\\n--form 'gtins=@\"/C:/Users/Leonard/Downloads/productEnrichment20.txt\"' \\\n--form 'format=\"csv\"' \\\n--form 'num_records=\"20\"' \\\n--form 'query=\"gtins:* AND categories:comestics AND dateUpdated[2022-09-31 TO *]\"' \\\n--form 'view=\"\"'",
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
      "code": "\"status\": \"completed\",\n    \"num_downloaded\": 19,\n    \"num_records_suppressed\": 0,\n    \"total_cost\": 19,\n    \"sort\": true,\n    \"format\": \"json\",\n    \"suppressed_fields\": [],\n    \"enriched_fields\": [\n        {\n            \"field\": \"gtins\",\n            \"s3Key\": \"production/126609/1665067765258-productEnrichment20.txt\"\n        }\n    ],\n    \"_id\": 185115,\n    \"user\": 126609,\n    \"query\": \"name:(laptop) AND taxonomy:* AND gtins:* AND taxonomyLevel3:\\\"computers & tablets\\\"\",\n    \"num_records\": 20,\n    \"data_type\": \"product\",\n    \"results\": [\n        \"https://datafiniti-downloads.s3.amazonaws.com/126609/185115_1.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221006T151736Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=AKIAZSCI425AD5EKHVNH%2F20221006%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e35aaeaf9e192a7e6009ef83c18502da154b61e546cef7540528b6ce12af1d81\"\n    ],\n    \"date_started\": \"2022-10-06T14:49:25.857Z\",\n    \"date_updated\": \"2022-10-06T15:17:36.726Z\",\n    \"is_suppression_job\": false,\n    \"is_enrichment_job\": true,\n    \"id\": \"185115\"",
      "language": "json"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "Please note the number of num_record will not be charged to your account upon submitting this request. You will only be charged credits per record matched. Since enrichment charges credits per the batch file you are enriching data from, you may be overcharged credits to your account upon submitting an enrichment request. If you do not know if overcharging is enabled / disabled on your account you may contact support@datafiniti.co to find this info out.",
  "title": "Credit usage"
}
[/block]
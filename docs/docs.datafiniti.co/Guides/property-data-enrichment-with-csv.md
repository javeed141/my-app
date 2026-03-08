# Property Data Enrichment with CSV

For this guide, we're going to assume the following you're interested in using Datafiniti's property data enrichment to enrich an existing csv file of commercial addresses in Texas, US. There are 5 steps to run a property data enrichment using a csv:

1. Select your enrichment file
2. Set your field\_parameter(s)
3. Configure your query
4. Configure your format & view
5. Start your download

## select your enrichment file

Shown here is an example of an acceptable csv file with the correct header to match *address* & *postalCode*. We will be using this file for the example in this guide.

```text PropertyEnrichAddresses.csv
address,postalCode
9920 WESTPARK DR,77063
W BAY AREA BLVD,77546
16310 State Highway 249,77064
13355 Noel Rd,75240-0000
300 Crescent Ct,75201-1876
2340 E TRINITY MILLS RD,75006-1942
1901 Milam St,77002
23201 ALDINE WESTFIELD RD,77373
2351 W Northwest Hwy,75220-0000
1425 W PIONEER DR,75061-7146
8204 Elmbrook Dr,75247-4067
10935 Estate Ln,75238-0000
1201 MAIN ST,75202-3908
2616 MANOR Way,75235-0000
1800 West Loop S,77027
5949 Sherry Ln,75225-6532
17300 Preston Rd,75252-5618
3460 W WALNUT ST,75042-7151
888 S GREENVILLE AVE,75081-5058
2815 Valley View Ln,75234-4956
```

Set your enrichment file as the field\_parameter file.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/29275a3-enrichpropertiescsv.png",
        "enrichpropertiescsv.png",
        883
      ],
      "align": "center",
      "caption": "Note that _address_ AND _postalCode_ are common separated."
    }
  ]
}
[/block]

## Set Your field\_parameter

For the field parameter, we want to make sure that the Datafiniti schema field is selected and matches inside the txt file. This will allow the enrichment API to target submitted addresses plus postalCodes in our case here.\
You can read more about other property schema fields [here](https://developer.datafiniti.co/docs/property-data-schema).

![](https://files.readme.io/bdc1f80-enrichmentcsvFieldParams.gif "enrichmentcsvFieldParams.gif")

> 🚧 CSV format
>
> Our enrichment search API will not allow any csv without headers. Please be sure to double-check the format of your csv file before submission. A common error you may see in this case:
>
> ```
>     "Invalid file type, must be csv or text file."
> ```

> ❗️ Num\_records
>
> Please note that the minimum request you can make is 20 records per enrichment request.\
> If you query does not find 20 records your account will only be charged per record found.

## Configure your query

The query is essential to target the specific group of data you are trying to enrich from. Datafiniti has a very large dataset, and in most cases, you will not need to search through the entire database. Your query can be built using the same logic from our search API [here](https://developer.datafiniti.co/docs/constructing-property-queries).

There are some things you must have in your query. You must include a wildcard for each of the field\_parameter you are search off of. In this case, we will add the following:

For our example here, we will add logic to our query to search for properties in the Texas, US, with an *address*, with a *postalcode*, and have the *propertyType* equal to commercial.

```json query
address:* AND postalCode:* AND country:US AND province:(TX) AND propertyType:\"commercial\"
```

![](https://files.readme.io/292c6b1-enrichpropertiesquery.png "enrichpropertiesquery.png")

> 🚧 Query - download time
>
> We strongly advise against generalized ***field\_parameter*** values. This will create a search through a larger pool of properties. Therefore the more specific your query is, the faster your enrichment job will be.

## Configure your format & view

Your format will determine the output file type of the enrichment download you wish to start. This can be set to either of *csv* or *json*. For this example we will set it to *csv*.

Finally the view is used to specify which fields you want added to your data. If no view is provided, we will add all fields from matching records as we do for our ***default*** view for the [Available Views for Property Data](https://docs.datafiniti.co/docs/available-views-for-property-data)

Your finally parameter should be setup as the following.

![](https://files.readme.io/0ac0eaf-enrichpropertiesformat.png "enrichpropertiesformat.png")

Listed below is a cURL POST to import this example into Postman.

```curl
curl --location 'https://api.datafiniti.co/v4/properties/search/enrichment' \
--header 'Authorization: Bearer insert_your_key_here' \
--form 'address,postalCode=@"/C:/Users/Leonard/Downloads/PropertyEnrichAddresses.csv"' \
--form 'format="csv"' \
--form 'num_records="20"' \
--form 'query="address:* AND postalCode:* AND country:US AND province:(TX) AND propertyType:\\\"commercial\\\""' \
--form 'view="default"'
```

## Start your download

Once you send your Postman request for the enrichment download you will not be charged credits immediately. It will create a download response. We recommend holding on to the download ID for that will allow your to access the data once the status is complete. For more on how to manage your downloads, you can visit [here](https://developer.datafiniti.co/docs/postman-downloading-result-files).

An example enrichment download response:

```json
{
    "status": "queued",
    "num_downloaded": 0,
    "num_records_suppressed": 0,
    "total_cost": 0,
    "fields": [
        {
            "name": "address"
        },
        {
            "name": "apiURLs",
            "flatten": false
        }
    ],
    "sort": true,
    "format": "csv",
    "suppressed_fields": [],
    "enriched_fields": [
        {
            "field": "address,postalCode",
            "s3Key": "production/126609/1678125819862-PropertyEnrichAddresses.csv"
        }
    ],
    "user": 111609,
    "query": "address:* AND postalCode:* AND country:US AND province:(TX) AND propertyType:\\\"commercial\\\"",
    "num_records": 20,
    "data_type": "property",
    "results": [],
    "date_started": "2023-03-06T18:03:40.383Z",
    "date_updated": "2023-03-06T18:03:40.383Z",
    "_id": 186861,
    "is_suppression_job": false,
    "is_enrichment_job": true,
    "id": "186861"
}
```
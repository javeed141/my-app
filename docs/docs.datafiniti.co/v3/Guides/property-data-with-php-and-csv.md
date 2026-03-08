# Property Data with PHP and CSV

For this guide, we're going to assume you're interested in using Datafiniti's property data to do some marketing analysis on residential home inventory.  Let's say you're a data scientist that's been tasked with the following:

1. Collect data on homes.
2. Sort the data by state.
3. Find which states have the most properties for sale.

Your environment and data needs:

1. You're working with PHP.
2. You want to work with CSV data.

Here are the steps we'll take:

[block:api-header]
{
  "type": "basic",
  "title": "1. Open a code editor"
}
[/block]

If you want to use PHP to access the Datafiniti API, we're assuming you'll be using a standard code editor to write your PHP code.  Open your code editor to get started.

[block:api-header]
{
  "type": "basic",
  "title": "2. Get your API token"
}
[/block]

The next thing you'll need is your API token.  The API token lets you authenticate with Datafiniti API and tells it who you are, what you have access to, and so on.  Without it, you can't use the API.

To get your API token, go the [Datafiniti Web Portal (https://portal.datafiniti.co)](https://portal.datafiniti.co), login, and click on your account name and the top-right.  From there, you'll see a link to the "My Account" page, which will take you to a page showing your token.  Your API token will be a long string of letters and numbers.  Copy the API token or store it somewhere you can easily reference.

[block:callout]
{
  "type": "info",
  "body": "For the rest of this document, we'll use `AAAXXXXXXXXXXXX` as a substitute example for your actual API token when showing example API calls."
}
[/block]

.

[block:api-header]
{
  "type": "basic",
  "title": "3. Run your first search"
}
[/block]

The first thing we'll do is do write some code that will run a test search.  This test search will give us a sense for what sort of data might be available.  Eventually we'll refine our search so that we get back the most relevant data.

Since we want homes in the US, let's try a simple search that will just give us online listings for properties in the US.

Write the following code in your code editor (replace the dummy API token with your real API token):

[block:code]
{
  "codes": [
    {
      "code": "<?php\n/*\n  Illustrates an API call to Datafiniti's Business Database for hotels.\n*/\n\n// Set your API parameters here.\n$APIToken = 'AAAXXXXXXXXXXXX';\n$view = 'properties_all';\n$format = 'JSON';\n$query = urlencode('country:US');\n$records = '1';\n$download = 'false';\n\n// Construct the API call.\n$APICall = 'https://' . $APIToken . ':@api.datafiniti.co/v3/data/properties?'\n\t\t\t. 'view=' . $view \n\t\t\t. '&format=' . $format\n\t\t\t. '&q=' . $query\n\t\t\t. '&records=' . $records \n\t\t\t. '&download=' . $download;\n\n// Make the API call.\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);\ncurl_setopt($ch, CURLOPT_URL, $APICall);\n$response = curl_exec($ch);\n\n// Do something with the response.\nif (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {\n\t$response = json_decode($response, true);\n\n\tprint_r($response);\n} else {\n\techo \"Request failed.\";\n}\n\n?>",
      "language": "php"
    }
  ]
}
[/block]

You should get a response similar to this:

[block:code]
{
  "codes": [
    {
      "code": "Array\n(\n    [estimated total] => 4810218\n    [records] => Array\n        (\n            [0] => Array\n                (\n                    [address] => 13824 Londonderry Ct\n                    [city] => Woodbridge\n                    [country] => US\n                    [dateAdded] => 2017-03-04T15:04:31Z\n                    [features] => Array\n                        (\n                            [0] => Array\n                                (\n                                    [key] => Year Built\n                                    [value] => Array\n                                        (\n                                            [0] => 1976\n                                        )\n                                )\n                            [1] => Array\n                                (\n                                    [key] => Days on site\n                                    [value] => Array\n                                        (\n                                            [0] => 55\n                                        )\n                                )\n                        )\n                    [keys] => Array\n                        (\n                            [0] => us/va/woodbridge/13824londonderryct\n                            [1] => http://www.homefinder.com/VA/Woodbridge/13824-Londonderry-Ct-143129780d/homefinder.com-143129780\n                        )\n                    [latitude] => 38.65391\n                    [listingName] => 13824 Londonderry Ct., Woodbridge, Va 22193\n                    [longitude] => -77.35623\n                    [numBathroom] => 2\n                    [numBedroom] => 4\n                    [postalCode] => 22193\n                    [propertyTaxes] => Array\n                        (\n                            [0] => Array\n                                (\n                                    [amount] => 2793.37\n                                    [currency] => USD\n                                    [dateSeen] => Array\n                                        (\n                                            [0] => 2017-03-04T15:04:31Z\n                                        )\n                                    [sourceURLs] => Array\n                                        (\n                                            [0] => http://www.homefinder.com/VA/Woodbridge/13824-Londonderry-Ct-143129780d\n                                        )\n                                )\n                        )\n                    [propertyType] => Single Family Dwelling\n                    [province] => VA\n                    [sourceURLs] => Array\n                        (\n                            [0] => http://www.homefinder.com/VA/Woodbridge/13824-Londonderry-Ct-143129780d\n                        )\n                    [statuses] => Array\n                        (\n                            [0] => Array\n                                (\n                                    [dateSeen] => Array\n                                        (\n                                            [0] => 2017-03-04T15:04:31Z\n                                        )\n                                    [isUnderContract] => false\n                                    [sourceURLs] => Array\n                                        (\n                                            [0] => http://www.homefinder.com/VA/Woodbridge/13824-Londonderry-Ct-143129780d\n                                        )\n                                    [type] => For Sale\n                                )\n                        )\n                    [websiteIDs] => Array\n                        (\n                            [0] => homefinder.com-143129780\n                        )\n                    [id] => AV-SfQ1UjCNrmMAsuhnv\n                )\n        )\n)",
      "language": "json"
    }
  ]
}
[/block]

Let's break down what the API call is all about:

[block:parameters]
{
  "data": {
    "0-0": "`https://`",
    "h-0": "API Call Component",
    "h-1": "Description",
    "1-0": "`AAAXXXXXXXXXXXX:@`",
    "2-0": "`api.datafiniti.co`",
    "3-0": "`/v3`",
    "4-0": "`/data`",
    "5-0": "`/properties`",
    "6-0": "`view=properties_all`",
    "8-0": "`q=country:US`",
    "0-1": "This is the communication protocol used by the API.  It's the same one used when you visit a secure website.",
    "1-1": "Your API token.  You're telling the API who you are so it can respond to your request.",
    "2-1": "The location of the API.",
    "3-1": "You're telling the API which version to use.  `v3` is our most recent and current API version.",
    "4-1": "You're telling the API you're interested in querying data.",
    "5-1": "Specifically, you're interested in proeprty data.",
    "6-1": "The `view` tells the API in which fields you want your response.  `properties_all` will show all available fields in a record.",
    "8-1": "The `q` tells the API what query you want to use.  In this case, you're telling the API you want to search by `country`.  Any property that is in the US will be returned.",
    "9-0": "`records=1`",
    "9-1": "The `records` tells the API how many records to return in the its response.  In this case, you just want to see 1 matching record.",
    "10-0": "`download=false`",
    "10-1": "The `download` tells the API if you want to initiate a download request or not. Setting it to `false` means you don't, so it will show the matching records immediately in the response.",
    "7-0": "`format=JSON`",
    "7-1": "The `format` tells the API which data format you want to see.  You can set it to `JSON` or `CSV`."
  },
  "cols": 2,
  "rows": 11
}
[/block]

Now let's dive through the response the API returned:

[block:parameters]
{
  "data": {
    "0-0": "`\"estimated_total\"`",
    "1-0": "`\"records\"`",
    "h-0": "Response Field",
    "h-1": "Description",
    "0-1": "The total number of available records in the database that match your query.  If you end up downloading the entire data set, this is how many records you'll use.",
    "1-1": "The first available matches to your query.  For most queries, you'll see 1 to 10 example records.  If there are no matches, this field will be empty.\n\nWithin each record returned, you'll see multiple fields shown.  This is the data for each record."
  },
  "cols": 2,
  "rows": 2
}
[/block]

Within the `records` field, you'll see a single property returned with multiple fields and their values associated with that business.  The JSON response will show all fields that have a value.  It won't show any fields that don't have a value.

Each property record will have multiple fields associated with it.  You can see a full list of available fields in our [Property Data Schema](https://docs.datafiniti.co/docs/property-data-schema).

[block:api-header]
{
  "type": "basic",
  "title": "4. Refine your search"
}
[/block]

If you think about the original query we made, you'll realize we didn't really specify we only wanted homes for sale.  There are several other types of properties (e.g., commercial, rentals) that may also be in the data.  Since we only want homes for sale, we should narrow our search appropriately.

We'll need to refine our search to make sure we're only getting US homes for sale.  To do that, we can add additional filters to the `q` parameter to narrow down the results.  For example:

[block:code]
{
  "codes": [
    {
      "code": "<?php\n\n// Set your API parameters here.\n$APIToken = 'AAAXXXXXXXXXXXX';\n$view = 'properties_all';\n$format = 'JSON';\n$query = urlencode('q=country:US AND propertyType:\"Single Family Dwelling\");\n$records = '10';\n$download = 'false';\n\n// Construct the API call.\n$APICall = 'https://' . $APIToken . ':@api.datafiniti.co/v3/data/properties'\n\t\t\t. '?view=' . $view \n\t\t\t. '&format=' . $format\n\t\t\t. '&q=' . $query\n\t\t\t. '&records=' . $records \n\t\t\t. '&download=' . $download;\n\n// Make the API call.\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);\ncurl_setopt($ch, CURLOPT_URL, $APICall);\n$response = curl_exec($ch);\n\n// Do something with the response.\nif (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {\n\t$response = json_decode($response, true);\n\n\tprint_r($response);\n} else {\n\techo \"Request failed.\";\n}\n\n?>",
      "language": "php"
    }
  ]
}
[/block]

This API call is different in a couple ways:

1. It adds ` AND propertyType:"Single Family Dwelling"` to narrow down results to just US hotels.
2. It changes `records=1` to `records=10` so we can look at more sample matches.

Datafiniti lets you construct very refined boolean queries.  If you wanted to do more complicated searches, you could OR operations, negation, and more.

You can run the PHP code above to see the difference in the results.

[block:api-header]
{
  "type": "basic",
  "title": "5. Initiate a full download of the data"
}
[/block]

Once we like what we see from the sample matches, it's time to download the entire data set!  To do this, we're going to update our code a fair bit (an explanation follows):

[block:code]
{
  "codes": [
    {
      "code": "<?php\n\n// Set your API parameters here.\n$APIToken = 'AAAXXXXXXXXXXXX';\n$view = 'properties_all_nested';\n$format = 'csv';\n$query = urlencode('q=country:US AND propertyType:\"Single Family Dwelling');\n$records = '10';\n$download = 'true';\n\n// Construct the API call.\n$APICall = 'https://' . $APIToken . ':@api.datafiniti.co/v3/data/properties?'\n\t\t\t. 'view=' . $view \n\t\t\t. '&format=' . $format\n\t\t\t. '&q=' . $query\n//\t\t\t. '&records=' . $records \n\t\t\t. '&download=' . $download;\n\n// A generic curl to an API endpoint.\nfunction curlAPICall($call) {\n\t$ch = curl_init();\n\tcurl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);\n\tcurl_setopt($ch, CURLOPT_URL, $call);\n\n\t$response = curl_exec($ch);\n\t$responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);\n\t$headers = curl_getinfo($ch);\n\n\t$responseArray['response'] = $response;\n\t$responseArray['code'] = $headers['http_code'];\n\t$responseArray['redirectURL'] = $headers['redirect_url'];\n\n\treturn $responseArray;\n}\n\n// Make the initial API call.\necho \"Making initial API call: \" . $APICall . \"\\n\";\n$responseArray = curlAPICall($APICall);\n\nif ($responseArray['code'] == 303) { // A download request redirects to a different URL\n\n\t// Get the request ID for the download\n\t$requestAPICall = $responseArray['redirectURL'];\n\t\n\t// Keep checking request status until the download has completed\n\t$requestResponseCode = 200;\n\t$requestResponseStatus = 'STARTED';\n\twhile ($requestResponseCode == 200 && $requestResponseStatus != 'COMPLETED') {\n\t\tsleep(10);\n\t\t\n\t\techo \"Checking on status: \" . $requestAPICall . \"\\n\";\n\t\t$requestResponseArray = curlAPICall($requestAPICall);\n\t\t$requestResponse = json_decode($requestResponseArray['response'], true);\n\t\t$requestResponseStatus = $requestResponse[0]['status'];\n\t\t$requestResponseNumDownloaded = $requestResponse[0]['numDownloaded'];\n\t\t$requestResponseCode = $requestResponseArray['code'];\n\n\t\techo \"Records downloaded: \" . $requestResponseNumDownloaded . \"\\n\";\n\t}\n\n\t// Once the download has completed, get the list of links to the result files and download each file\n\tif ($requestResponseStatus == 'COMPLETED') {\n\t\t$requestURLTokens = explode('/',$requestAPICall);\n\t\t$requestID = $requestURLTokens[sizeof($requestURLTokens)-1];\n\t\t$resultAPICall = 'http://' . $APIToken . ':@api.datafiniti.co/v3/results/' . $requestID;\t\t\n\n\t\techo \"Downloading result files: \" . $resultAPICall . \"\\n\";\n\t\t$resultResponseArray = curlAPICall($resultAPICall);\n\t\tif ($resultResponseArray['code'] == 200) {\n\t\t\t$resultList = json_decode($resultResponseArray['response'], true);\n\t\t\tfor ($i = 0; $i < count($resultList); $i++) {\n\t\t\t\t$resultLink = $resultList[$i]['url'];\n\t\t\t\techo $resultLink . \"\\n\";\n\n\t\t\t\t$filename = $requestID . \"_\" . $i . \".\" . $format;\n\t\t\t\tfile_put_contents($filename, fopen($resultLink, 'r'));\n\t\t\t\techo \"File saved: \" . $filename . \"\\n\";\n\t\t\t}\n\t\t} else {\n\t\t\techo \"Request failed.\";\n\t\t}\n\t} else {\n\t\techo \"Request failed.\";\n\t}\n} else {\n\techo \"Request failed.\";\n}\n?>",
      "language": "php"
    }
  ]
}
[/block]

A few things to pay attention to in the above code:

1. Change `format=JSON` to `format=CSV`.  We'll want to view the files in CSV format, so it will be easier to look at.
2. Remove `&records=10`.
3. Change `properties_all` to `properties_all_nested`.  This will nest fields like categories and features into a single cell (instead splitting them across multiple rows and columns).
4. Change `download=false` to `download=true`.

Since we've handled multiple steps of the download process in this code, we won't go into the details here, but we do recommend you familiarize yourself with those steps.  Checking them out in our [Property Data with Web Browser and CSV](https://docs.datafiniti.co/docs/property-data-with-web-browser-and-csv)  will be helpful.

[block:api-header]
{
  "type": "basic",
  "title": "6. Open the result file(s) in Excel"
}
[/block]

The download code will save one or more result files to your project folder.  Open one of those files in Excel.  It will look something like:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a46dd30-property_sample.jpg",
        "property_sample.jpg",
        2736,
        1641,
        "#e6e8e6"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "7. Analyze the results"
}
[/block]

Using Excel, we can easily do some analysis on the number of properties for each state.  The `province` column gives us where each property is located, so we can use it to tally up the numbers.
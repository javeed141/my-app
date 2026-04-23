# Business Data with PHP and JSON

For this guide, we're going to assume you're interested in using Datafiniti's business data to do some marketing analysis on hotels.  Let's say you're a data scientist that's been tasked with the following:

1. Collect data on hotels.
2. Sort the data by state.
3. Find which states have the most hotels.

Your environment and data needs:

1. You're working with PHP.
2. You want to work with JSON data.

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

Since we want hotels, let's try a simple search that will just give us online listings for hotels.

Write the following code in your code editor (replace the dummy API token with your real API token):

[block:code]
{
  "codes": [
    {
      "code": "<?php\n/*\n  Illustrates an API call to Datafiniti's Business Database for hotels.\n*/\n\n// Set your API parameters here.\n$APIToken = 'AAAXXXXXXXXXXXX';\n$view = 'businesses_all';\n$format = 'JSON';\n$query = urlencode('categories:hotels');\n$records = '1';\n$download = 'false';\n\n// Construct the API call.\n$APICall = 'https://' . $APIToken . ':@api.datafiniti.co/v3/data/businesses?'\n\t\t\t. 'view=' . $view \n\t\t\t. '&format=' . $format\n\t\t\t. '&q=' . $query\n\t\t\t. '&records=' . $records \n\t\t\t. '&download=' . $download;\n\n// Make the API call.\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);\ncurl_setopt($ch, CURLOPT_URL, $APICall);\n$response = curl_exec($ch);\n\n// Do something with the response.\nif (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {\n\t$response = json_decode($response, true);\n\n\tprint_r($response);\n} else {\n\techo \"Request failed.\";\n}\n\n?>",
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
      "code": "Array\n(\n    [estimated total] => 139666\n    [records] => Array\n        (\n            [0] => Array\n                (\n                    [address] => 7030 Amin Dr\n                    [categories] => Array\n                        (\n                            [0] => Hotels\n                        )\n\n                    [city] => Chattanooga\n                    [country] => US\n                    [dateAdded] => 2016-11-04T23:50:14Z\n                    [dateUpdated] => 2016-11-04T23:50:14Z\n                    [descriptions] => Array\n                        (\n                            [0] => Array\n                                (\n                                    [dateSeen] => Array\n                                        (\n                                            [0] => 2016-11-09T19:26:53Z\n                                        )\n\n                                    [sourceURLs] => Array\n                                        (\n                                            [0] => http://www.hotels.com/ho141351/?locale=en_US&pos=HCOM_US\n                                        )\n\n                                    [value] => No-frills hotel in Hamilton Place with health club\n                                )\n\n                        )\n\n                    [features] => Array\n                        (\n                            [0] => Array\n                                (\n                                    [key] => Services\n                                    [value] => Array\n                                        (\n                                            [0] => 24-hour front desk, Dry cleaning/laundry service, Laundry facilities, Free newspapers in lobby\n                                        )\n\n                                )\n\n                            [1] => Array\n                                (\n                                    [key] => Nearby Attractions\n                                    [value] => Array\n                                        (\n                                            [0] => [In Hamilton Place, Hamilton Place Mall (1.1 mi / 1.7 km), Dragon Dreams Museum (2.7 mi / 4.4 km), Tennessee Valley Railroad Museum (3.6 mi / 5.8 km), Concord Golf Club (3.8 mi / 6 km), Brown Acres Golf Course (4 mi / 6.5 km)]\n                                        )\n\n                                )\n\n                        )\n\n                    [imageURLs] => Array\n                        (\n                            [0] => https://exp.cdn-hotels.com/hotels/1000000/120000/117400/117332/117332_95_n.jpg\n                            [1] => https://exp.cdn-hotels.com/hotels/1000000/120000/117400/117332/117332_107_n.jpg\n                        )\n\n                    [keys] => Array\n                        (\n                            [0] => us/tn/chattanooga/7030amindr/1104338646\n                        )\n\n                    [latitude] => 35.04281\n                    [longitude] => -85.158\n                    [name] => Mainstay Suites Chattanooga\n                    [numRoom] => 77\n                    [phones] => Array\n                        (\n                            [0] => 8004916126\n                        )\n\n                    [postalCode] => 37421\n                    [province] => TN\n                    [reviews] => Array\n                        (\n                            [0] => Array\n                                (\n                                    [date] => 2013-11-11T00:00:00Z\n                                    [dateAdded] => 2016-11-04T23:50:14Z\n                                    [dateSeen] => Array\n                                        (\n                                            [0] => 2016-11-06T00:00:00Z\n                                            [1] => 2016-08-12T00:00:00Z\n                                        )\n\n                                    [rating] => 2\n                                    [sourceURLs] => Array\n                                        (\n                                            [0] => https://www.hotels.com/hotel/141351/reviews%20/\n                                        )\n\n                                    [text] => Hotel was ok. Room not as up to date as I expected.\n                                    [title] => Was ok\n                                    [username] => A Traveler\n                                )\n\n                            [1] => Array\n                                (\n                                    [date] => 2014-11-03T00:00:00Z\n                                    [dateAdded] => 2016-11-04T23:50:14Z\n                                    [dateSeen] => Array\n                                        (\n                                            [0] => 2016-08-09T00:00:00Z\n                                            [1] => 2016-08-27T00:00:00Z\n                                        )\n\n                                    [rating] => 3\n                                    [sourceURLs] => Array\n                                        (\n                                            [0] => https://www.hotels.com/hotel/141351/reviews%20/\n                                        )\n\n                                    [text] => It was adequate for our one night stay there. Staff was very friendly and the room was clean but not very big. I would recommend to someone for a very short stay.\n                                    [username] => scott\n                                )\n\n                        )\n\n                    [sourceURLs] => Array\n                        (\n                            [0] => http://www.hotels.com/ho141351/?locale=en_US&pos=HCOM_US\n                            [1] => https://www.hotels.com/hotel/141351/reviews%20/\n                        )\n\n                    [id] => AVwcsllU_7pvs4fzx-yW\n                )\n\n        )\n\n)",
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
    "5-0": "`/businesses`",
    "6-0": "`view=businesses_all`",
    "8-0": "`q=categories:hotels`",
    "0-1": "This is the communication protocol used by the API.  It's the same one used when you visit a secure website.",
    "1-1": "Your API token.  You're telling the API who you are so it can respond to your request.",
    "2-1": "The location of the API.",
    "3-1": "You're telling the API which version to use.  `v3` is our most recent and current API version.",
    "4-1": "You're telling the API you're interested in querying data.",
    "5-1": "Specifically, you're interested in business data.",
    "6-1": "The `view` tells the API in which fields you want your response.  `businesses_all` will show all available fields in a record.",
    "8-1": "The `q` tells the API what query you want to use.  In this case, you're telling the API you want to search by `categories`.  Any product that has `hotels` listed in its `categories` field will be returned.",
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

Within the `records` field, you'll see a single business returned with multiple fields and their values associated with that product.  The JSON response will show all fields that have a value.  It won't show any fields that don't have a value.

Each business record will have multiple fields associated with it.  You can see a full list of available fields in our [Business Data Schema](https://docs.datafiniti.co/docs/business-data-schema).

[block:api-header]
{
  "type": "basic",
  "title": "4. Refine your search"
}
[/block]

If you think about the original query we made, you'll realize we didn't really specify which geography we're interested in.  Since we only want US hotels, we should narrow our search appropriately.

We'll need to refine our search to make sure we're only getting hotels.  To do that, we can add additional filters to the `q` parameter to narrow down the results.  For example:

[block:code]
{
  "codes": [
    {
      "code": "<?php\n/*\n  Illustrates an API call to Datafiniti's Business Database for hotels,\n  with some refinements to the query to get more relevant results.\n*/\n\n// Set your API parameters here.\n$APIToken = 'AAAXXXXXXXXXXXX';\n$view = 'businesses_all';\n$format = 'JSON';\n$query = urlencode('q=categories:hotels AND country:US);\n$records = '10';\n$download = 'false';\n\n// Construct the API call.\n$APICall = 'https://' . $APIToken . ':@api.datafiniti.co/v3/data/businesses'\n\t\t\t. '?view=' . $view \n\t\t\t. '&format=' . $format\n\t\t\t. '&q=' . $query\n\t\t\t. '&records=' . $records \n\t\t\t. '&download=' . $download;\n\n// Make the API call.\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);\ncurl_setopt($ch, CURLOPT_URL, $APICall);\n$response = curl_exec($ch);\n\n// Do something with the response.\nif (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {\n\t$response = json_decode($response, true);\n\n\tprint_r($response);\n} else {\n\techo \"Request failed.\";\n}\n\n?>",
      "language": "php"
    }
  ]
}
[/block]

This query is different in a couple ways:

1. It adds ` AND country:US` to narrow down results to just US hotels.
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
      "code": "<?php\n/*\n  Illustrates how to download a full data set from Datafiniti's Business Database.\n*/\n\n// Set your API parameters here.\n$APIToken = 'AAAXXXXXXXXXXXX';\n$view = 'businesses_all';\n$format = 'json';\n$query = urlencode('q=categories:hotels AND country:US);\n$records = '10';\n$download = 'true';\n\n// Construct the API call.\n$APICall = 'https://' . $APIToken . ':@api.datafiniti.co/v3/data/businesses?'\n\t\t\t. 'view=' . $view \n\t\t\t. '&format=' . $format\n\t\t\t. '&q=' . $query\n//\t\t. '&records=' . $records \n\t\t\t. '&download=' . $download;\n\n// A generic curl to an API endpoint.\nfunction curlAPICall($call) {\n\t$ch = curl_init();\n\tcurl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);\n\tcurl_setopt($ch, CURLOPT_URL, $call);\n\n\t$response = curl_exec($ch);\n\t$responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);\n\t$headers = curl_getinfo($ch);\n\n\t$responseArray['response'] = $response;\n\t$responseArray['code'] = $headers['http_code'];\n\t$responseArray['redirectURL'] = $headers['redirect_url'];\n\n\treturn $responseArray;\n}\n\n// Make the initial API call.\necho \"Making initial API call: \" . $APICall . \"\\n\";\n$responseArray = curlAPICall($APICall);\n\nif ($responseArray['code'] == 303) { // A download request redirects to a different URL\n\n\t// Get the request ID for the download\n\t$requestAPICall = $responseArray['redirectURL'];\n\t\n\t// Keep checking request status until the download has completed\n\t$requestResponseCode = 200;\n\t$requestResponseStatus = 'STARTED';\n\twhile ($requestResponseCode == 200 && $requestResponseStatus != 'COMPLETED') {\n\t\tsleep(10);\n\t\t\n\t\techo \"Checking on status: \" . $requestAPICall . \"\\n\";\n\t\t$requestResponseArray = curlAPICall($requestAPICall);\n\t\t$requestResponse = json_decode($requestResponseArray['response'], true);\n\t\t$requestResponseStatus = $requestResponse[0]['status'];\n\t\t$requestResponseNumDownloaded = $requestResponse[0]['numDownloaded'];\n\t\t$requestResponseCode = $requestResponseArray['code'];\n\n\t\techo \"Records downloaded: \" . $requestResponseNumDownloaded . \"\\n\";\n\t}\n\n\t// Once the download has completed, get the list of links to the result files and download each file\n\tif ($requestResponseStatus == 'COMPLETED') {\n\t\t$requestURLTokens = explode('/',$requestAPICall);\n\t\t$requestID = $requestURLTokens[sizeof($requestURLTokens)-1];\n\t\t$resultAPICall = 'http://' . $APIToken . ':@api.datafiniti.co/v3/results/' . $requestID;\t\t\n\n\t\techo \"Downloading result files: \" . $resultAPICall . \"\\n\";\n\t\t$resultResponseArray = curlAPICall($resultAPICall);\n\t\tif ($resultResponseArray['code'] == 200) {\n\t\t\t$resultList = json_decode($resultResponseArray['response'], true);\n\t\t\tfor ($i = 0; $i < count($resultList); $i++) {\n\t\t\t\t$resultLink = $resultList[$i]['url'];\n\t\t\t\techo $resultLink . \"\\n\";\n\n\t\t\t\t$filename = $requestID . \"_\" . $i . \".\" . $format;\n\t\t\t\tfile_put_contents($filename, fopen($resultLink, 'r'));\n\t\t\t\techo \"File saved: \" . $filename . \"\\n\";\n\t\t\t}\n\t\t} else {\n\t\t\techo \"Request failed.\";\n\t\t}\n\t} else {\n\t\techo \"Request failed.\";\n\t}\n} else {\n\techo \"Request failed.\";\n}\n?>",
      "language": "php"
    }
  ]
}
[/block]

A couple things to pay attention to in the above code:

1. We removed `&records=10`.
2. We changed `download=false` to `download=true`.

Since we've handled multiple steps of the download process in this code, we won't go into the details here, but we do recommend you familiarize yourself with those steps.  Checking them out in our [Business Data with Web Browser and JSON Guide](https://datafiniti-api.readme.io/docs/business-data-with-web-browser-json) will be helpful.

[block:api-header]
{
  "type": "basic",
  "title": "6. Parse the JSON data"
}
[/block]

The download code will save one or more result files to your project folder.

[block:callout]
{
  "type": "info",
  "body": "The JSON data will actually be a text file, instead of a single JSON object.  Each line in the text file is a JSON object.  We format the data this way because most programming languages won't handle parsing the entire data set as a JSON object with their standard system calls very well."
}
[/block]

We'll need to parse the file into an array of JSON objects.  We can use code similar to this to handle the parsing:

[block:code]
{
  "codes": [
    {
      "code": "<?php\n\n// Set the location of your file here\n$file = \"xxxx_x.txt\";\n\n$records = array();\n\n$handle = fopen($file, \"r\");\nif ($handle) {\n\twhile (($line = fgets($handle)) !== false) {\n\t\t$records[] = json_decode(($line));\n\t}\n} else {\n\techo \"Error opening file.\";\n}\n\nforeach($records as $record) {\n\t// Edit these lines to do more with the data.\n\tprint_r($record);\n}\n\n?>",
      "language": "php"
    }
  ]
}
[/block]

You can edit the code in the `foreach` loop above to do whatever you'd like with the data, such as store the data in a database, write it out to your console, etc.
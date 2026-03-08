# Property Data with Python and JSON

For this guide, we're going to assume you're interested in using Datafiniti's property data to do some marketing analysis on residential home inventory.  Let's say you're a data scientist that's been tasked with the following:

1. Collect data on homes.
2. Sort the data by state.
3. Find which states have the most properties for sale.

Your environment and data needs:

1. You're working with Python.
2. You want to work with JSON data.

Here are the steps we'll take:

[block:callout]
{
  "type": "warning",
  "body": "Note that we are using Python 3 for the examples below."
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "1. Install the requests module for Python"
}
[/block]

In your terminal, run the following to install the `requests` module for Python:

[block:code]
{
  "codes": [
    {
      "code": "pip3 install requests",
      "language": "shell"
    }
  ]
}
[/block]

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
      "code": "import requests\nimport urllib.parse\nimport json\n\n# Set your API parameters here.\nAPIToken = 'AAAXXXXXXXXXXXX'\nview = 'properties_all'\nformat = 'JSON'\nquery = urllib.parse.quote_plus('country:US')\nrecords = '1'\ndownload = 'false'\n\n# Construct the API call.\nAPICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/data/properties?' \\\n\t\t\t+ 'view=' + view \\\n\t\t\t+ '&format=' + format \\\n\t\t\t+ '&q=' + query \\\n\t\t\t+ '&records=' + records \\\n\t\t\t+ '&download=' + download\n\n# Make the API call.\nr = requests.get(APICall);\n\n# Do something with the response.\nif r.status_code == 200:\n\tprint(json.loads(r.content))\nelse:\n\tprint('Request failed')",
      "language": "python"
    }
  ]
}
[/block]

You should get a response similar to this:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"estimated total\": 7983205,\n  \"records\": [\n    {\n      \"address\": \"711 Kent Ave\",\n      \"brokers\": [\n        {\n          \"agent\": \"Raj Singh\",\n          \"company\": \"YOUR REALTY INC.\",\n          \"dateSeen\": [\n            \"2016-06-06T18:09:28Z\"\n          ],\n          \"sourceURLs\": [\n            \"https://www.homepath.com/listing/711-kent-ave-catonsville-md-21228-46273970\"\n          ]\n        }\n      ],\n      \"city\": \"Catonsville\",\n      \"country\": \"US\",\n      \"dateAdded\": \"2016-06-06T18:09:28Z\",\n      \"features\": [\n        {\n          \"key\": \"Air Conditioning\",\n          \"value\": [\n            \"Heat Pumps\"\n          ]\n        },\n        {\n          \"key\": \"Sewer Type\",\n          \"value\": [\n            \"Public\"\n          ]\n        }\n      ],\n      \"keys\": [\n        \"us/md/catonsville/711kentave\",\n        \"mlsnumber/us/md/bc9677283\",\n        \"https://www.homepath.com/listing/711-kent-ave-catonsville-md-21228-46273970/homepath.com-46273970\"\n      ],\n      \"latitude\": \"39.284462\",\n      \"listingName\": \"711 Kent Ave, Catonsville, Md 21228\",\n      \"longitude\": \"-76.734069\",\n      \"lotSizeValue\": 0.16,\n      \"lotSizeUnit\": \"Acres\",\n      \"mlsNumber\": \"BC9677283\",\n      \"numBathroom\": 2,\n      \"numBedroom\": 4,\n      \"postalCode\": \"21228\",\n      \"prices\": [\n        {\n          \"amountMax\": 199900,\n          \"amountMin\": 199900,\n          \"currency\": \"USD\",\n          \"dateSeen\": [\n            \"2016-08-08T00:00:00Z\",\n            \"2016-08-03T00:00:00Z\"\n          ],\n          \"isSale\": \"false\",\n          \"sourceURLs\": [\n            \"https://www.homepath.com/listing/711-kent-ave-catonsville-md-21228-46273970\"\n          ]\n        },\n        {\n          \"amountMax\": 212000,\n          \"amountMin\": 212000,\n          \"currency\": \"USD\",\n          \"dateSeen\": [\n            \"2016-06-06T00:00:00Z\"\n          ],\n          \"isSale\": \"false\",\n          \"sourceURLs\": [\n            \"https://www.homepath.com/listing/711-kent-ave-catonsville-md-21228-46273970\"\n          ]\n        }\n      ],\n      \"propertyTaxes\": [\n        {\n          \"amount\": 3195,\n          \"currency\": \"USD\",\n          \"dateSeen\": [\n            \"2016-06-06T18:09:28Z\"\n          ],\n          \"sourceURLs\": [\n            \"https://www.homepath.com/listing/711-kent-ave-catonsville-md-21228-46273970\"\n          ]\n        }\n      ],\n      \"propertyType\": \"Single Family Dwelling\",\n      \"province\": \"MD\",\n      \"sourceURLs\": [\n        \"https://www.homepath.com/listing/711-kent-ave-catonsville-md-21228-46273970\"\n      ],\n      \"statuses\": [\n        {\n          \"dateSeen\": [\n            \"2016-08-09T09:16:10Z\"\n          ],\n          \"isUnderContract\": \"false\",\n          \"sourceURLs\": [\n            \"https://www.homepath.com/listing/711-kent-ave-catonsville-md-21228-46273970\"\n          ],\n          \"type\": \"For Sale\"\n        }\n      ],\n      \"websiteIDs\": [\n        \"homepath.com-46273970\"\n      ],\n      \"id\": \"AV9WzHyO_RWkykBuv11F\"\n    }\n  ]\n]",
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
    "5-1": "Specifically, you're interested in property data.",
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
      "code": "import requests\nimport urllib.parse\nimport json\n\n# Set your API parameters here.\nAPIToken = 'AAAXXXXXXXXXXXX'\nview = 'properties_all'\nformat = 'JSON'\nquery = urllib.parse.quote_plus('country:US AND propertyType:\"Single Family Dwelling\"')\nrecords = '1'\ndownload = 'false'\n\n# Construct the API call.\nAPICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/data/properties?' \\\n\t\t\t+ 'view=' + view \\\n\t\t\t+ '&format=' + format \\\n\t\t\t+ '&q=' + query \\\n\t\t\t+ '&records=' + records \\\n\t\t\t+ '&download=' + download\n\n# Make the API call.\nr = requests.get(APICall);\n\n# Do something with the response.\nif r.status_code == 200:\n\tprint(json.loads(r.content))\nelse:\n\tprint('Request failed')",
      "language": "javascript"
    }
  ]
}
[/block]

This query is different in a couple ways:

1. It adds ` AND country:US` to narrow down results to just US hotels.
2. It changes `records=1` to `records=10` so we can look at more sample matches.

Datafiniti lets you construct very refined boolean queries.  If you wanted to do more complicated searches, you could OR operations, negation, and more.

You can run the Python code above to see the difference in the results.

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
      "code": "import requests\nimport json\nimport urllib.parse\nimport time\n\n# Set your API parameters here.\nAPIToken = 'AAAXXXXXXXXXXXX'\nview = 'properties_all'\nformat = 'json'\nquery = urllib.parse.quote_plus('country:US AND propertyType:\"Single Family Dwelling\"')\nrecords = '1'\ndownload = 'true'\n\n# Construct the API call.\nAPICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/data/properties?' \\\n\t\t\t+ 'view=' + view \\\n\t\t\t+ '&format=' + format \\\n\t\t\t+ '&q=' + query \\\n\t\t\t+ '&download=' + download\n\n# Make the initial API call.\nr = requests.get(APICall);\nif r.status_code == 200:\n\t# Get the request ID for the download\n\trequestAPICall = r.url\n\n\t# Keep checking the request status until the download has completed\n\trequestID = '';\n\trequestResponseCode = 200\n\trequestResponseStatus = 'STARTED';\n\twhile (requestResponseCode == 200 and requestResponseStatus != 'COMPLETED'):\n\t\ttime.sleep(5)\n\t\tprint('Checking on status: ' + requestAPICall)\n\t\trequest = requests.get(requestAPICall)\n\t\trequestResponse = json.loads(request.text)\n\t\trequestID = requestResponse[0]['id']\n\t\trequestResponseStatus = requestResponse[0]['status']\n\t\tprint('Records downloaded: ' + str(requestResponse[0]['numDownloaded']))\n\n\t# Once the download has completed, get the list of links to the result files and download each file\n\tif requestResponseStatus == 'COMPLETED':\n\t\tresult = requests.get('https://' + APIToken + ':@api.datafiniti.co/v3/results/' + str(requestID))\n\t\tresultResponse = json.loads(result.text)\n\t\ti = 1;\n\t\tfor resultObj in resultResponse:\n\t\t\tfilename = str(requestID) + '_' + str(i) + '.' + format\n\t\t\turllib.request.urlretrieve(resultObj['url'],filename)\n\t\t\tprint('Downloaded file: ' + filename)\n\t\t\ti += 1\n\nelse:\n\tprint('Request failed')",
      "language": "python"
    }
  ]
}
[/block]

A few things to pay attention to in the above code:

1. We removed `&records=10`.
2. We changed `download=false` to `download=true`.

Since we've handled multiple steps of the download process in this code, we won't go into the details here, but we do recommend you familiarize yourself with those steps.  Checking them out in our [Property Data with Web Browser and JSON](https://docs.datafiniti.co/docs/property-data-with-web-browser-and-json) guide.

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
  "body": "The JSON data will actually be a text file, instead of a single JSON object. Each line in the text file is a JSON object. We format the data this way because most programming languages won't handle parsing the entire data set as a JSON object with their standard system calls very well."
}
[/block]

We'll need to parse the file into an array of JSON objects. We can use code similar to this to handle the parsing:

[block:code]
{
  "codes": [
    {
      "code": "import json\n\n# Set the location of your file here\nfilename = 'xxxx_x.txt'\n\nrecords = []\n\nwith open(filename) as myFile:\n\tfor line in myFile:\n\t\trecords.append(json.loads(line))\n\nfor record in records:\n\t# Edit these lines to do more with the data\n\tprint json.dumps(record, indent=4, sort_keys=True)",
      "language": "python"
    }
  ]
}
[/block]

You can edit the code in the `for` loop above to do whatever you'd like with the data, such as store the data in a database, write it out to your console, etc.
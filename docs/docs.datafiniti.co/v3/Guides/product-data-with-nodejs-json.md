# Product Data with Node.js and JSON

For this guide, we're going to assume the following:

**Your goal:**
You're interested in using Datafiniti's product data to analyze trends in the women's luxury shoe market.  You're a data scientist that's been tasked with the following:

1. Collect pricing data on women's luxury shoes from multiple online retailers.
2. Sort the data by brand.
3. Determine the average price of each brand.

**Your environment and data needs:**

1. You're working with node.js.
2. You want to work with JSON data.

Here are the steps we'll take:

[block:api-header]
{
  "type": "basic",
  "title": "1. Install the request module for Node"
}
[/block]

In your terminal, run the following to install the `request` module for Node:

[block:code]
{
  "codes": [
    {
      "code": "npm install request",
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

[block:api-header]
{
  "type": "basic",
  "title": "3. Run your first search"
}
[/block]

The first thing we'll do is do write some code that will run a test search.  This test search will give us a sense for what sort of data might be available.  Eventually we'll refine our search so that we get back the most relevant data.  Since we want women's luxury shoes, let's try a simple search that will just give us listings for shoes sold online.

Write the following code in your code editor (replace the dummy API token with your real API token):

[block:code]
{
  "codes": [
    {
      "code": "/*\n  Illustrates an API call to Datafiniti's Product Database for shoes.\n*/\nvar request = require('request');\n\n// Set your API parameters here.\nvar APIToken = 'AAAXXXXXXXXXXXX';\nvar view = 'products_all';\nvar format = 'JSON';\nvar query = encodeURIComponent('categories:shoes');\nvar records = '1';\nvar download = 'false';\n\n// Construct the API call.\nvar APICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/data/products?'\n\t\t\t\t+ 'view=' + view\n\t\t\t\t+ '&q=' + query\n\t\t\t\t+ '&format=' + format\n\t\t\t\t+ '&records=' + records\n\t\t\t\t+ '&download=' + download;\n\n// Make the API call.\nrequest(\n  {\n    url : APICall\n  },\n  // Do something with the response.\n  function (error, response, body) {\n  \tconsole.log(body);\n  }\n);",
      "language": "javascript"
    }
  ]
}
[/block]

You should get a response similar to this (although it may not be as pretty in your terminal):

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"estimated total\": 884885,\n  \"records\": [\n    {\n      \"asins\": [\n        \"B010XYTFM6\"\n      ],\n      \"brand\": \"inktastic\",\n      \"categories\": [\n        \"Novelty\",\n        \"Tops & Tees\",\n        \"Novelty & More\",\n        \"Women\",\n        \"Clothing, Shoes & Jewelry\",\n        \"T-Shirts\",\n        \"Clothing\"\n      ],\n      \"dateAdded\": \"2015-11-09T01:55:09Z\",\n      \"dateUpdated\": \"2016-04-12T16:19:26Z\",\n      \"imageURLs\": [\n        \"http://ecx.images-amazon.com/images/I/41W6xSgsBbL._SX342_QL70_.jpg\",\n        \"http://ecx.images-amazon.com/images/I/41StiamgorL._SR38,50_.jpg\",\n        \"http://ecx.images-amazon.com/images/I/41StiamgorL._SX342_QL70_.jpg\",\n        \"http://ecx.images-amazon.com/images/I/41W6xSgsBbL._SR38,50_.jpg\"\n      ],\n      \"keys\": [\n        \"inktasticwomensbutterflybanjochickjuniorvnecktshirts/b010xytfm6\"\n      ],\n      \"name\": \"Inktastic Women's Butterfly Banjo Chick Junior V-neck T-shirts\",\n      \"sourceURLs\": [\n        \"http://www.amazon.com/Inktastic-Womens-Butterfly-Junior-T-Shirts/dp/B010XYTK1W\",\n        \"http://www.amazon.com/Inktastic-Womens-Butterfly-Junior-T-Shirts/dp/B016HKYYN0\",\n        \"http://www.amazon.com/Inktastic-Butterfly-T-Shirts-Athletic-Heather/dp/B016HKYPYS\"\n      ],\n      \"id\": \"AVkzMzokUmTPEltRlaJ_\"\n    }\n  ]\n}",
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
    "5-0": "`/products`",
    "6-0": "`view=products_all`",
    "8-0": "`q=categories:shoes`",
    "0-1": "This is the communication protocol used by the API.  It's the same one used when you visit a secure website.",
    "1-1": "Your API token.  You're telling the API who you are so it can respond to your request.",
    "2-1": "The location of the API.",
    "3-1": "You're telling the API which version to use.  `v3` is our most recent and current API version.",
    "4-1": "You're telling the API you're interested in querying data.",
    "5-1": "Specifically, you're interested in product data.",
    "6-1": "The `view` tells the API in which fields you want your response.  `products_all` will show all available fields in a record.",
    "8-1": "The `q` tells the API what query you want to use.  In this case, you're telling the API you want to search by `categories`.  Any product that has `shoe` listed in its `categories` field will be returned.",
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

Within the `records` field, you'll see a single product returned with multiple fields and their values associated with that product.  The record shows all fields that have a value.  It won't show any fields that don't have a value.  E.g., the example product shown has no `prices` field showing, so that means the database doesn't have any pricing information for it (we can update our request later to make sure we only get products that do have prices).

Each product record will have multiple fields associated with it.  You can see a full list of available fields in our [Product Data Schema](https://docs.datafiniti.co/docs/product-data-schema).

[block:api-header]
{
  "type": "basic",
  "title": "4. Refine your search"
}
[/block]

If you take a look at the sample record shown above, you'll notice that it's not actually a pair of shoes.  It's actually a shirt.  It was returned as a match because its category keywords included `Clothing, Shoes & Jewelry`.  If we downloaded all matching records, we would find several products that really are shoes, but we'd also find other products like this one, which aren't.

We'll need to refine our search to make sure we're only getting shoes.  To do that, we can add additional filters to the `q` parameter to narrow down the results.  For example, we could change our `query` value to the following:

[block:code]
{
  "codes": [
    {
      "code": "/*\n  Illustrates an API call to Datafiniti's Product Database for shoes,\n  with some refinements to the query to get more relevant results.\n*/\nvar request = require('request');\n\n// Set your API parameters here.\nvar APIToken = 'AAAXXXXXXXXXXXX';\nvar view = 'products_all';\nvar format = 'JSON';\nvar query = encodeURIComponent('categories:shoes AND -categories:shirts AND categories:women AND (brand:* OR manufacturer:*) AND prices:*');\nvar records = '10';\nvar download = 'false';\n\n// Construct the API call.\nvar APICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/data/products?'\n\t\t\t\t+ 'view=' + view\n\t\t\t\t+ '&q=' + query\n\t\t\t\t+ '&format=' + format\n\t\t\t\t+ '&records=' + records\n\t\t\t\t+ '&download=' + download;\n\n// Make the API call.\nrequest(\n  {\n    url : APICall\n  },\n  // Do something with the response.\n  function (error, response, body) {\n  \tconsole.log(body);\n  }\n);",
      "language": "javascript"
    }
  ]
}
[/block]

This query is different in a few ways:

1. It uses ` AND -categories:shirts` to filter out any products that might be shirts. Note the `-` in front of `categories`.
2. It adds ` AND categories:women` to narrow down results to just products for women. (We were interested in just women's shoes.)
3. It adds `  AND (brand:* OR manufacturer:*)`.  This ensures the `brand` or `manufacturer` field is filled out in all the records I request.  We call the `*` a "wildcard" value.  Matching against a wildcard is a useful way to ensure the fields you're searching aren't empty.
4. It adds ` AND prices:*`.  Again, matching against a wildcard here means we're sure to only get products that have pricing information.
5. It changes `records=1` to `records=10` so we can look at more sample matches.

Notice how Datafiniti lets you construct very refined boolean queries.  In the query above, we're using a mix of `AND` and `OR` to get exactly what we want.

You can run the code above to see the difference in the results.

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
      "code": "var request = require('request');\nvar fs = require('fs');\n\n// Set your API parameters here.\nvar APIToken = 'AAAXXXXXXXXXXXX';\nvar view = 'products_all';\nvar format = 'json';\nvar query = encodeURIComponent('categories:shoes AND -categories:shirts AND categories:women AND (brand:* OR manufacturer:*) AND prices:*');\nvar records = '10';\nvar download = 'true';\n\n// Construct the API call.\nvar APICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/data/products?'\n\t\t\t\t+ 'view=' + view\n\t\t\t\t+ '&q=' + query\n\t\t\t\t+ '&format=' + format\n//\t\t\t+ '&records=' + records\n\t\t\t\t+ '&download=' + download;\n\n// A function to check if a download request has completed\nfunction checkDownloadUntilComplete(options, callback) {\n\tvar downloadRequestAPICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/requests/' + options.requestID;\n\n\trequest({url : downloadRequestAPICall}, function(error, response, body) {\n\t\tvar downloadRequestResponse = JSON.parse(body);\n\t\tif (downloadRequestResponse[0].status !== 'COMPLETED') {\n\t\t\t// NEED A SLEEP FUNCTION HERE!\n\t\t\tconsole.log('Checking on status: ' + downloadRequestAPICall);\n\t\t\tcheckDownloadUntilComplete(options, callback);\n\t\t} else {\n\t\t\tcallback(null, downloadRequestResponse);\n\t\t}\n\t});\n}\n\n// Initiate the download request.\nrequest({url : APICall}, function (error, response, body) {\n  \tvar downloadResponse = JSON.parse(body);\n  \tvar requestID = downloadResponse[0].id;\n\n  \t// Check on status of the download request.\n  \tcheckDownloadUntilComplete ({requestID : requestID}, function (error, response) {\n  \t\tvar resultsAPICall = 'https://' + APIToken + ':@api.datafiniti.co/v3/results/' + requestID;\n\n  \t\t// Once the download is complete, get all the links to result files and write those to local files.\n  \t\trequest({url : resultsAPICall}, function(error, response, body) {\n\t\t\tvar resultsResponse = JSON.parse(body);\n\t\t\tfor (var i = 0; i < resultsResponse.length; i++) {\n\t\t\t\tvar file = fs.createWriteStream(requestID + '_' + i + '.' + format);\n\t\t\t\trequest(resultsResponse[i].url).pipe(file);\n\t\t\t}\n\t\t});\n  \t});\n  }\n);",
      "language": "javascript"
    }
  ]
}
[/block]

A few things to pay attention to in the above code:

1. Remove `&records=10`.  This tells the API to request all matching data.
2. Change `download=false` to `download=true`.
3. We've added code to (a) make the initial request, (b) check the status of the download, and (c) download the result files once they're ready.

Since we've handled multiple steps of the download process in this code, we won't go into the details here, but we do recommend you familiarize yourself with those steps.  Checking them out in our [Getting Started Guide for Product via a Web Browser](https://datafiniti-api.readme.io/docs/product-data-via-a-web-browser-json#section-5-initiate-a-full-download-of-the-data) will be helpful.

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
      "code": "var fs = require('fs');\n\n// Set the location of your file here.\nvar file = 'xxxx_x.txt';\n\n// A function to read in each line of the file and pass that line to func\nfunction readLines(input, func) {\n\tvar records = [];\n\tvar remaining = '';\n\n\tinput.on('data', function(data) {\n \t\tremaining += data;\n\t\tvar index = remaining.indexOf('\\n');\n\t\tvar last  = 0;\n\t\twhile (index > -1) {\n \t\t\tvar line = remaining.substring(last, index);\n \t\t\tlast = index + 1;\n \t\t\tfunc(line, records);\n\t\t\tindex = remaining.indexOf('\\n', last);\n \t\t}\n\n \t\tremaining = remaining.substring(last);\n\t});\n\n\tinput.on('end', function() {\n \t\tif (remaining.length > 0) {\n \t\t\tfunc(remaining, records);\n \t\t}\n\t\tprocessData(records);\n\t});\n}\n\n// A function that converts a line from the file, parses it to JSON, and stores it an array\nfunction func(data, records) {\n\tvar json = JSON.parse(data);\n\trecords.push(json);\n}\n\n// This function is called once all the data has been read from the file.\nfunction processData(records) {\n\t// Edit these lines to do more with the data.\n\tconsole.log(records);\n}\n\nvar records = [];\nvar input = fs.createReadStream(file);\nreadLines(input, func);",
      "language": "javascript"
    }
  ]
}
[/block]

You can edit the code in `processData` above to do whatever you'd like with the data, such as store the data in a database, write it out to your console, etc.
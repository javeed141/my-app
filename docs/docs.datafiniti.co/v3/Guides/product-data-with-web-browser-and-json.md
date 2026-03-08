# Product Data with Web Browser and JSON

For this guide, we're going to assume the following:

**Your goal:**
You're interested in using Datafiniti's product data to analyze trends in the women's luxury shoe market.  You're a data scientist that's been tasked with the following:

1. Collect pricing data on women's luxury shoes from multiple online retailers.
2. Sort the data by brand.
3. Determine the average price of each brand.

**Your environment and data needs:**

1. You're working with your web browser
2. You want to work with JSON data.

Here are the steps we'll take:

[block:api-header]
{
  "type": "basic",
  "title": "1. Use Chrome and add the JSONView extension"
}
[/block]

If you want to use your web browser to access the Datafiniti API, we recommend using Chrome.  In our experience, Chrome is the most stable browser.  It does a good job of displaying results from the Datafiniti API, particularly when coupled with the JSONView extension, which you can [install here](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc).  This extension will make responses from the Datafiniti API look pretty and more readable!

[block:api-header]
{
  "type": "basic",
  "title": "2. Get your API token"
}
[/block]

The first thing you'll need is your API token.  The API token lets you authenticate with Datafiniti API and tells it who you are, what you have access to, and so on.  Without it, you can't use the API.

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

Open a new window in your browser.  The first thing we'll do is do a test search that will give us a sense for what sort of data might be available.  Eventually we'll refine our search so that we get back the most relevant data.

Since we want women's luxury shoes, let's try a simple search that will just give us listings for shoes sold online.

Copy and paste the following URL into your browser (replace the dummy API token with your real API token):

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/data/products?view=products_all&format=JSON&q=categories:shoes&records=1&download=false`

You should get a response similar to this:

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

Within the `records` field, you'll see a single product returned with multiple fields and their values associated with that product.  The JSON response will show all fields that have a value.  It won't show any fields that don't have a value.  E.g., the example product shown has no `prices` field showing, so that means the database doesn't have any pricing information for it (we can update our request later to make sure we only get products that do have prices).

Each product record will have multiple fields associated with it.  You can see a full list of available fields in our [Product Data Schema](https://docs.datafiniti.co/docs/product-data-schema).

[block:api-header]
{
  "type": "basic",
  "title": "4. Refine your search"
}
[/block]

If you take a look at the sample record shown above, you'll notice that it's not actually a pair of shoes.  It's actually a shirt.  It was returned as a match because its category keywords included `Clothing, Shoes & Jewelry`.  If we downloaded all matching records, we would find several products that really are shoes, but we'd also find other products like this one, which aren't.

We'll need to refine our search to make sure we're only getting shoes.  To do that, we can add additional filters to the `q` parameter to narrow down the results.  For example:

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/data/products?view=products_all&format=JSON&q=categories:shoes AND -categories:shirts AND categories:women AND (brand:* OR manufacturer:*) AND prices:*&records=10&download=false`

This API call is different in a few ways:

1. It uses ` AND -categories:shirts` to filter out any products that might be shirts. Note the `-` in front of `categories`.
2. It adds ` AND categories:women` to narrow down results to just products for women. (We were interested in just women's shoes.)
3. It adds `  AND (brand:* OR manufacturer:*)`.  This ensures the `brand` or `manufacturer` field is filled out in all the records I request.  We call the `*` a "wildcard" value.  Matching against a wildcard is a useful way to ensure the fields you're searching aren't empty.
4. It adds ` AND prices:*`.  Again, matching against a wildcard here means we're sure to only get products that have pricing information.
5. It changes `records=1` to `records=10` so we can look at more sample matches.

Notice how Datafiniti lets you construct very refined boolean queries.  In the API call above, we're using a mix of `AND` and `OR` to get exactly what we want.

Update your API call in Chrome and hit enter to see the updated results.

[block:api-header]
{
  "type": "basic",
  "title": "5. Initiate a full download of the data"
}
[/block]

Once we like what we see from the sample matches, it's time to download the entire data set!  To do this, we're going to make three changes to our API call:

1. Remove `&records=10`.
2. Change `download=false` to `download=true`.

After those changes, the API call looks like:

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/data/products?view=products_all&format=JSON&q=categories:shoes AND -categories:shirts AND categories:women AND (brand:* OR manufacturer:*) AND prices:*&download=true`

When you make this API call, you'll see a response similar to:

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"id\": 6073,\n    \"records\": \"\",\n    \"query\": \"categories:shoes AND -categories:shirts AND categories:women AND (brand:* OR manufacturer:*) AND prices:*\",\n    \"dataType\": \"products\",\n    \"dataFormat\": \"json\",\n    \"accountId\": \"AAAXXXXXXXXXXXX\",\n    \"planId\": \"free\",\n    \"view\": \"products_all\",\n    \"async\": 1,\n    \"status\": \"STARTED\",\n    \"error\": \"\",\n    \"numDownloaded\": 0,\n    \"numFound\": 7537,\n    \"numRequested\": 7537,\n    \"date_started\": \"2017-1-11 15:52:42\",\n    \"date_completed\": \"2017-1-11 15:52:43\"\n  }\n]",
      "language": "json"
    }
  ]
}
[/block]

Here's what these fields mean:

[block:parameters]
{
  "data": {
    "h-0": "Response Field",
    "h-1": "Description",
    "0-0": "`id`",
    "1-0": "`records`",
    "2-0": "`query`",
    "3-0": "`dataType`",
    "4-0": "`dataFormat`",
    "5-0": "`accountId`",
    "6-0": "`planId`",
    "7-0": "`view`",
    "8-0": "`async`",
    "9-0": "`status`",
    "10-0": "`error`",
    "11-0": "`numDownloaded`",
    "12-0": "`numFound`",
    "13-0": "`numRequested`",
    "14-0": "`date_started`",
    "15-0": "`date_completed`",
    "0-1": "This is a unique identifier for the request.",
    "2-1": "The query you ran.",
    "3-1": "The data type you queried.",
    "4-1": "The data format you requested.",
    "5-1": "Your API token.",
    "6-1": "The Datafiniti plan level you're using.",
    "7-1": "The view you chose.  This determines which fields are shown in the data.",
    "8-1": "Should always be set to `1`.  This is an alias for the `download` parameter.",
    "9-1": "The current progress of the request.  As the download request is running, this will be set to `STARTED`. When it's done, it will be set to `COMPLETED`.",
    "11-1": "The number of records that have been downloaded so far.",
    "12-1": "The number of total records in Datafiniti that matched your query.",
    "13-1": "The number of records you requested to download.",
    "14-1": "The date and time the download started.",
    "15-1": "The date and time the download finished.",
    "10-1": "An error message in case anything went wrong with the download.  Hopefully this is blank!"
  },
  "cols": 2,
  "rows": 16
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "6. Monitor the status of the download"
}
[/block]

As the download request runs, you can check on its status by using this API call:

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/requests/XXXX`

You'll want to replace `XXXX` with the `id` value for your request.  If you keep making the above API call, you'll see `numDownloaded` gradually increase.

[block:api-header]
{
  "type": "basic",
  "title": "7. Download the result file(s)"
}
[/block]

Once the download finishes, the `/requests/` call will show `COMPLETED` for `status`.  You can then get links to the data files by making this API call:

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/results/XXXX`

(Again, replace `XXXX` with the actual request id.)  The response will look similar to:

[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    \"id\": 120138,\n    \"url\": \"http://datafiniti-downloads-qa.s3.amazonaws.com/AAAXXXXXXXXXXXX/6073_1.txt?AWSAccessKeyId=AKIAIXQMCWHOZB3O35SA&Signature=2YtBsW9xY8CZrWDECcdLzyx4Jlk%3D&Expires=1484754763\",\n    \"request_id\": 6073,\n    \"downloaded\": 0,\n    \"imported\": 0,\n    \"date_created\": \"2017-1-11\"\n  }\n]",
      "language": "json"
    }
  ]
}
[/block]

If you've requested a lot of records (i.e., over 10,000), you may see more than 1 result object shown.

To download the result files, copy each `url` value and paste it into your browser.  Your browser will initiate a download to your computer.

[block:api-header]
{
  "type": "basic",
  "title": "8. Open the result file(s)"
}
[/block]

Navigate to the file you downloaded and open it.

[block:callout]
{
  "type": "info",
  "body": "The JSON data will actually be a text file, instead of a single JSON object.  Each line in the text file is a JSON object.  We format the data this way because most programming languages won't handle parsing the entire data set as a JSON object with their standard system calls very well."
}
[/block]

From here, you'll most likely want to process the data using the programming language of your choice.  Our other [JSON guides](https://docs.datafiniti.co/docs/getting-started-with-product-data) provide instructions on how to process this data.
# Business Data with Postman and CSV

For this guide, we're going to assume you're interested in using Datafiniti's business data to do some marketing analysis on hotels.  Let's say you're a data scientist that's been tasked with the following:

1. Collect data on hotels.
2. Sort the data by state.
3. Find which states have the most hotels.

Your environment and data needs:

1. You're working with Postman.
2. You want to work with CSV data.

Here are the steps we'll take:

[block:api-header]
{
  "type": "basic",
  "title": "1. Download Postman"
}
[/block]

We recommend using Postman when accessing the Datafiniti API.  It's a great client for using any sort of RESTful API and works particularly well with Datafiniti.  You can download Postman [here](https://www.getpostman.com/).

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

The first thing we'll do is do a test search that will give us a sense for what sort of data might be available.  Eventually we'll refine our search so that we get back the most relevant data.

Since we want hotels, let's try a simple search that will just give us online listings for hotels.

Open Postman.  You should see a new tab open.

Copy and paste the following URL into where it says "Enter request URL".  (replace the dummy API token with your real API token):

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/data/businesses?view=businesses_all&format=JSON&q=categories:hotels&records=1&download=false`

Click the blue "Send" button.  You should get a response similar to this:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"estimated total\": 139666,\n  \"records\": [\n    {\n      \"address\": \"7030 Amin Dr\",\n      \"categories\": [\n        \"Hotels\"\n      ],\n      \"city\": \"Chattanooga\",\n      \"country\": \"US\",\n      \"dateAdded\": \"2016-11-04T23:50:14Z\",\n      \"dateUpdated\": \"2016-11-04T23:50:14Z\",\n      \"descriptions\": [\n        {\n          \"dateSeen\": [\n            \"2016-11-09T19:26:53Z\"\n          ],\n          \"sourceURLs\": [\n            \"http://www.hotels.com/ho141351/?locale=en_US&pos=HCOM_US\"\n          ],\n          \"value\": \"No-frills hotel in Hamilton Place with health club\"\n        }\n      ],\n      \"features\": [\n        {\n          \"key\": \"Services\",\n          \"value\": [\n            \"24-hour front desk, Dry cleaning/laundry service, Laundry facilities, Free newspapers in lobby\"\n          ]\n        },\n        {\n          \"key\": \"Nearby Attractions\",\n          \"value\": [\n            \"[In Hamilton Place, Hamilton Place Mall (1.1 mi / 1.7 km), Dragon Dreams Museum (2.7 mi / 4.4 km), Tennessee Valley Railroad Museum (3.6 mi / 5.8 km), Concord Golf Club (3.8 mi / 6 km), Brown Acres Golf Course (4 mi / 6.5 km)]\"\n          ]\n        }\n      ],\n      \"imageURLs\": [\n        \"https://exp.cdn-hotels.com/hotels/1000000/120000/117400/117332/117332_95_n.jpg\",\n        \"https://exp.cdn-hotels.com/hotels/1000000/120000/117400/117332/117332_107_n.jpg\"\n      ],\n      \"keys\": [\n        \"us/tn/chattanooga/7030amindr/1104338646\"\n      ],\n      \"latitude\": \"35.04281\",\n      \"longitude\": \"-85.158\",\n      \"name\": \"Mainstay Suites Chattanooga\",\n      \"numRoom\": 77,\n      \"phones\": [\n        \"8004916126\"\n      ],\n      \"postalCode\": \"37421\",\n      \"province\": \"TN\",\n      \"reviews\": [\n        {\n          \"date\": \"2013-11-11T00:00:00Z\",\n          \"dateAdded\": \"2016-11-04T23:50:14Z\",\n          \"dateSeen\": [\n            \"2016-11-06T00:00:00Z\",\n            \"2016-08-12T00:00:00Z\"\n          ],\n          \"rating\": 2,\n          \"sourceURLs\": [\n            \"https://www.hotels.com/hotel/141351/reviews%20/\"\n          ],\n          \"text\": \"Hotel was ok. Room not as up to date as I expected.\",\n          \"title\": \"Was ok\",\n          \"username\": \"A Traveler\"\n        },\n        {\n          \"date\": \"2014-11-03T00:00:00Z\",\n          \"dateAdded\": \"2016-11-04T23:50:14Z\",\n          \"dateSeen\": [\n            \"2016-08-09T00:00:00Z\",\n            \"2016-08-27T00:00:00Z\",\n            \"2016-07-18T00:00:00Z\"\n          ],\n          \"rating\": 3,\n          \"sourceURLs\": [\n            \"https://www.hotels.com/hotel/141351/reviews%20/\"\n          ],\n          \"text\": \"It was adequate for our one night stay there. Staff was very friendly and the room was clean but not very big. I would recommend to someone for a very short stay.\",\n          \"username\": \"scott\"\n        }\n      ],\n      \"sourceURLs\": [\n        \"http://www.hotels.com/ho141351/?locale=en_US&pos=HCOM_US\",\n        \"https://www.hotels.com/hotel/141351/reviews%20/\"\n      ],\n      \"id\": \"AVwcsllU_7pvs4fzx-yW\"\n    }\n  ]",
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
    "8-1": "The `q` tells the API what query you want to use.  In this case, you're telling the API you want to search by `categories`.  Any business that has `hotels` listed in its `categories` field will be returned.",
    "9-0": "`records=1`",
    "9-1": "The `records` tells the API how many records to return in its response.  In this case, you just want to see 1 matching record.",
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

Within the `records` field, you'll see a single business returned with multiple fields and their values associated with that business.  The JSON response will show all fields that have a value.  It won't show any fields that don't have a value.

Each business record will have multiple fields associated with it.  You can see a full list of available fields in our [Business Data Schema](https://docs.datafiniti.co/docs/business-data-schema).

[block:api-header]
{
  "type": "basic",
  "title": "4. Refine your search"
}
[/block]

If you think about the original query we made, you'll realize we didn't really specify which geography we're interested in.  Since we only want US hotels, we should narrow our search appropriately.

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/data/businesses?view=businesses_all&format=JSON&q=categories:hotels AND country:US&records=10&download=false`

This API call is different in a couple ways:

1. It adds ` AND country:US` to narrow down results to just US hotels.
2. It changes `records=1` to `records=10` so we can look at more sample matches.

Datafiniti lets you construct very refined boolean queries.  If you wanted to do more complicated searches, you could OR operations, negation, and more.

Update your API call in Postman and hit "Send" to see the updated results.

[block:api-header]
{
  "type": "basic",
  "title": "5. Initiate a full download of the data"
}
[/block]

Once we like what we see from the sample matches, it's time to download the entire data set!  To do this, we're going to make three changes to our API call:

1. Change `format=JSON` to `format=CSV`.  We'll want to view the files in CSV format, so it will be easier to look at.
2. Remove `&records=10`.
3. Change `businesses_all` to `businesses_all_nested`.  This will nest fields like categories and features into a single cell (instead splitting them across multiple rows and columns).
4. Change `download=false` to `download=true`.

After those changes, the API call looks like:

`https://AAAXXXXXXXXXXXX:@api.datafiniti.co/v3/data/businesses?view=businesses_all_nested&format=CSV&q=categories:hotels AND country:US&download=true`

When you make this API call, you'll see a response similar to:

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"id\": 6073,\n  \"records\": \"\",\n  \"query\": \"categories:hotels AND country:US\",\n  \"dataType\": \"businesses\",\n  \"dataFormat\": \"csv\",\n  \"accountId\": \"AAAXXXXXXXXXXXX\",\n  \"planId\": \"free\",\n  \"view\": \"businesses_all_nested\",\n  \"async\": 1,\n  \"status\": \"STARTED\",\n  \"error\": \"\",\n  \"numDownloaded\": 0,\n  \"numFound\": 95378,\n  \"numRequested\": 95378,\n  \"date_started\": \"2017-1-11 15:52:42\",\n  \"date_completed\": \"2017-1-11 15:52:43\"\n}",
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
      "code": "[\n  {\n    \"id\": 120138,\n    \"url\": \"http://datafiniti-downloads-qa.s3.amazonaws.com/AAAXXXXXXXXXXXX/6073_1.csv?AWSAccessKeyId=AKIAIXQMCWHOZB3O35SA&Signature=2YtBsW9xY8CZrWDECcdLzyx4Jlk%3D&Expires=1484754763\",\n    \"request_id\": 6073,\n    \"downloaded\": 0,\n    \"imported\": 0,\n    \"date_created\": \"2017-1-11\"\n  }\n]",
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
  "title": "8. Open the result file(s) in Excel"
}
[/block]

Navigate to the file you downloaded and open it.  Since it's a CSV file, it should open in Excel automatically.  It will look something like:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a7b5fae-hotel_sample.jpg",
        "hotel_sample.jpg",
        1600,
        822,
        "#214768"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "9. Analyze the results"
}
[/block]

Using Excel, we can easily count the total number of hotels on a state-by-state basis.  The `province` column gives us where each hotel is located, so we can use it to tally up the numbers.
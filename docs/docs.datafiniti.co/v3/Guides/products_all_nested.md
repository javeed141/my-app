# products_all_nested

The `products_all_nested` view will display all available fields in our [product schema](https://datafiniti-api.readme.io/v3/docs/product-data-schema).

If using the `csv` format, it will keep all elements in multi-valued field lists in a single cell.  This means a field like `prices` will show up as a nested JSON object within the CSV.

[block:api-header]
{
  "type": "basic",
  "title": "Included Fields"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "0-0": "`asins`",
    "1-0": "`brand`",
    "2-0": "`categories`",
    "3-0": "`colors`",
    "4-0": "`count`",
    "5-0": "`dateAdded`",
    "6-0": "`dateUpdated`",
    "7-0": "`descriptions`",
    "8-0": "`dimension`",
    "9-0": "`ean`",
    "10-0": "`features`",
    "11-0": "`flavors`",
    "12-0": "`imageURLs`",
    "13-0": "`isbn`",
    "14-0": "`keys`",
    "15-0": "`manufacturer`",
    "16-0": "`manufacturerNumber`",
    "17-0": "`merchants`",
    "18-0": "`name`",
    "19-0": "`prices`",
    "20-0": "`reviews`",
    "21-0": "`sizes`",
    "22-0": "`skus`",
    "23-0": "`sourceURLs`",
    "24-0": "`upc`",
    "25-0": "`vin`",
    "26-0": "`websiteID`",
    "27-0": "`weight`",
    "h-1": "Included Sub-fields",
    "7-1": "`dateSeen`\n`sourceURLs`\n`value`",
    "10-1": "`key`\n`value`",
    "17-1": "`address`\n`availability`\n`city`\n`country`\n`dateSeen`\n`name`\n`phone`\n`postalCode`\n`province`",
    "19-1": "`amountMin`\n`amountMax`\n`availability`\n`color`\n`condition`\n`count`\n`currency`\n`dateAdded`\n`dateSeen`\n`flavor`\n`isSale`\n`merchant`\n`offer`\n`returnPolicy`\n`shipping`\n`size`\n`source`\n`sourceURLs`\n`warranty`",
    "20-1": "`date`\n`dateAdded`\n`dateSeen`\n`didPurchase`\n`doRecommend`\n`numHelpful`\n`rating`\n`sourceURLs`\n`text`\n`title`\n`userCity`\n`username`\n`userProvince`",
    "22-1": "`sourceURLs`\n`value`",
    "0-1": "N/A",
    "1-1": "N/A",
    "2-1": "N/A",
    "3-1": "N/A",
    "4-1": "N/A",
    "5-1": "N/A",
    "6-1": "N/A",
    "8-1": "N/A",
    "9-1": "N/A",
    "11-1": "N/A",
    "12-1": "N/A",
    "13-1": "N/A",
    "14-1": "N/A",
    "15-1": "N/A",
    "16-1": "N/A",
    "18-1": "N/A",
    "21-1": "N/A",
    "23-1": "N/A",
    "24-1": "N/A",
    "25-1": "N/A",
    "26-1": "N/A",
    "27-1": "N/A"
  },
  "cols": 2,
  "rows": 28
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Sample CSV Output"
}
[/block]

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [products\_multiValuedFieldsNested-CSV-example.csv](https://raw.githubusercontent.com/datafiniti/SampleData/master/6210_1.csv)

[block:embed]
{
  "html": "<pre><code>id,asins,brand,categories,colors,count,dateAdded,dateUpdated,descriptions.dateSeen,descriptions.sourceURLs,descriptions.value,dimension,ean,features.key,features.value,flavors,websiteID,imageURLs,isbn,keys,manufacturer,manufacturerNumber,merchants.address,merchants.availability,merchants.city,merchants.country,merchants.dateSeen,merchants.name,merchants.phone,merchants.postalCode,merchants.province,name,prices.amountMin,prices.amountMax,prices.availability,prices.color,prices.condition,prices.count,prices.currency,prices.dateAdded,prices.dateSeen,prices.flavor,prices.isSale,prices.merchant,prices.offer,prices.returnPolicy,prices.shipping,prices.size,prices.source,prices.sourceURLs,prices.warranty,reviews.date,reviews.dateAdded,reviews.dateSeen,reviews.didPurchase,reviews.doRecommend,reviews.numHelpful,reviews.rating,reviews.sourceURLs,reviews.text,reviews.title,reviews.userCity,reviews.username,reviews.userProvince,sizes,skus.sourceURLs,skus.value,sourceURLs,upc,vin,weight\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,\"2015-08-17T18:43:00Z\",\"2016-05-05T17:20:05Z\",,,,,,,,,,,,,\"sunville\",,,,,,,,,,,\"Brand New Women's Fashion Rubber Rain Boots / Bottes De Pluie\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"227 g\"\n\"AVnjo8-lD1GB75FR6uL3\",\"B00MKHSLP2\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Women\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Shoes\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Shoes &amp; Handbags\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Boots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Beige Plaid\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Fuchsia\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Black Polka Dots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Black\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Houndstooth\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Navy Stripe\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Dk Green\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Leopard\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Camo\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Green\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Zebra\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Multi-Color Polka Dots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,\"Date first available at Amazon.ca\",\"Jan. 15 2014\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41-V0orNJkL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/31CXHHQarXL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411huD5UrRL._SY395_QL70_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411HlTw2geL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41ge8ewa3TL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._SY395_QL70_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411huD5UrRL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41%2BIJyHAy9L._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,\"brandnewwomensfashionrubberrainbootsbottesdepluie/b00mkhslp2\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,\"2016-04-29T00:00:00Z\",\"Amazon.ca\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,26.950000762939453,26.950000762939453,,,\"new\",,\"CAD\",\"2015-08-17T18:43:00Z\",\"2015-08-10T00:00:00Z\",,,\"Amazon.ca\",,,\"free\",,,\"http://www.amazon.ca/Brand-Womens-Rubber-Bottes-Dotted/dp/B00OMB8O7E\",,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,4.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"These fit fine, made for people with skinny legs. My thicker legs/ muscular have a squishy time.\",\"Four Stars\",,\"PLAINJANE\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,1.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"A cheap boot that lasted only a few weeks on our property. Mild use and these have already split the seems. Not recommended for anyone. Spend more money and get a good pair.\",\"Cheaply made boot that doesnt last.\",,\"Brandon\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Excellent quality and very very cute rain boots. Very comfortable - come on rain!!!\",\"Quality and comfort and cute too!\",,\"Bonnie Hallman\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,1.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Cracked within a few months where it bends for your toes. I've owned a couple of these. the same happened for both as well as the buckle breaking. I'm finally done with it. Will just spend a hit more for hunter boots.\",\"Cracked within a few months.\",,\"Chiqui Mancini\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Nice boots. A bit loose for my girl friends skinny legs.\",\"Five Stars\",,\"Etienne\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"very fashionable as well as comfortable\",\"Five Stars\",,\"jahoody\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"These arrived very fast and are great.\",\"Five Stars\",,\"Linda Findlay-Palmer\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,3.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Decent boots but one of the buckles broke a day after I received them.\",\"Three Stars\",,\"Sheena Cormier\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Really like them! Great grips for working on the farm and tall enough too! Found their sizing a little bit smaller than I expected, but still fits good because it has a wide toe area. Now I can farm in style and with any color!\",\"really like them\",,\"Marie\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Fits perfectly. Love the colour.\",\"Love the colour\",,\"N.K.\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"https://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"http://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",,,</code></pre>",
  "url": "https://gist.github.com/shiondev/48a397113db65166b29e8aab24c4f564.js",
  "title": null,
  "favicon": "https://gist.github.com/favicon.ico"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Sample JSON Output"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"asins\": [\n    \"B00MKHSLP2\"\n  ],\n  \"categories\": [\n    \"Women\",\n    \"Shoes\",\n    \"Shoes & Handbags\",\n    \"Boots\"\n  ],\n  \"colors\": [\n    \"Beige Plaid\",\n    \"Fuchsia\",\n    \"Black Polka Dots\",\n    \"Black\",\n    \"Houndstooth\",\n    \"Navy Stripe\",\n    \"Dk Green\",\n    \"Leopard\",\n    \"Camo\",\n    \"Green\",\n    \"Zebra\",\n    \"Multi-Color Polka Dots\"\n  ],\n  \"dateAdded\": \"2015-08-17T18:43:00Z\",\n  \"dateUpdated\": \"2016-05-05T17:20:05Z\",\n  \"features\": [\n    {\n      \"key\": \"Date first available at Amazon.ca\",\n      \"value\": [\n        \"Jan. 15 2014\"\n      ]\n    }\n  ],\n  \"imageURLs\": [\n    \"http://ecx.images-amazon.com/images/I/41-V0orNJkL._US40_.jpg\",\n    \"http://ecx.images-amazon.com/images/I/31CXHHQarXL._US40_.jpg\",\n    \"http://ecx.images-amazon.com/images/I/411huD5UrRL._SY395_QL70_.jpg\",\n    \"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._US40_.jpg\",\n    \"http://ecx.images-amazon.com/images/I/411HlTw2geL._US40_.jpg\",\n    \"http://ecx.images-amazon.com/images/I/41ge8ewa3TL._US40_.jpg\",\n    \"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._SY395_QL70_.jpg\",\n    \"http://ecx.images-amazon.com/images/I/411huD5UrRL._US40_.jpg\",\n    \"http://ecx.images-amazon.com/images/I/41%2BIJyHAy9L._US40_.jpg\"\n  ],\n  \"keys\": [\n    \"brandnewwomensfashionrubberrainbootsbottesdepluie/b00mkhslp2\"\n  ],\n  \"manufacturer\": \"sunville\",\n  \"merchants\": [\n    {\n      \"dateSeen\": [\n        \"2016-04-29T00:00:00Z\"\n      ],\n      \"name\": \"Amazon.ca\"\n    }\n  ],\n  \"name\": \"Brand New Women's Fashion Rubber Rain Boots / Bottes De Pluie\",\n  \"prices\": [\n    {\n      \"amountMin\": 26.950000762939453,\n      \"amountMax\": 26.950000762939453,\n      \"condition\": \"new\",\n      \"currency\": \"CAD\",\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-10T00:00:00Z\"\n      ],\n      \"merchant\": \"Amazon.ca\",\n      \"shipping\": \"free\",\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/Brand-Womens-Rubber-Bottes-Dotted/dp/B00OMB8O7E\"\n      ]\n    }\n  ],\n  \"reviews\": [\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 4,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"These fit fine, made for people with skinny legs. My thicker legs/ muscular have a squishy time.\",\n      \"title\": \"Four Stars\",\n      \"username\": \"PLAINJANE\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 1,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"A cheap boot that lasted only a few weeks on our property. Mild use and these have already split the seems. Not recommended for anyone. Spend more money and get a good pair.\",\n      \"title\": \"Cheaply made boot that doesnt last.\",\n      \"username\": \"Brandon\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 5,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"Excellent quality and very very cute rain boots. Very comfortable - come on rain!!!\",\n      \"title\": \"Quality and comfort and cute too!\",\n      \"username\": \"Bonnie Hallman\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 1,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"Cracked within a few months where it bends for your toes. I've owned a couple of these. the same happened for both as well as the buckle breaking. I'm finally done with it. Will just spend a hit more for hunter boots.\",\n      \"title\": \"Cracked within a few months.\",\n      \"username\": \"Chiqui Mancini\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 5,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"Nice boots. A bit loose for my girl friends skinny legs.\",\n      \"title\": \"Five Stars\",\n      \"username\": \"Etienne\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 5,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"very fashionable as well as comfortable\",\n      \"title\": \"Five Stars\",\n      \"username\": \"jahoody\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 5,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"These arrived very fast and are great.\",\n      \"title\": \"Five Stars\",\n      \"username\": \"Linda Findlay-Palmer\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 3,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"Decent boots but one of the buckles broke a day after I received them.\",\n      \"title\": \"Three Stars\",\n      \"username\": \"Sheena Cormier\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 5,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"Really like them! Great grips for working on the farm and tall enough too! Found their sizing a little bit smaller than I expected, but still fits good because it has a wide toe area. Now I can farm in style and with any color!\",\n      \"title\": \"really like them\",\n      \"username\": \"Marie\"\n    },\n    {\n      \"dateAdded\": \"2015-08-17T18:43:00Z\",\n      \"dateSeen\": [\n        \"2015-08-15T00:00:00Z\"\n      ],\n      \"rating\": 5,\n      \"sourceURLs\": [\n        \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n      ],\n      \"text\": \"Fits perfectly. Love the colour.\",\n      \"title\": \"Love the colour\",\n      \"username\": \"N.K.\"\n    }\n  ],\n  \"sourceURLs\": [\n    \"https://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",\n    \"http://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",\n    \"http://www.amazon.ca/product-reviews/B00MKHSLP2\"\n  ],\n  \"weight\": \"227 g\",\n  \"id\": \"AVnjo8-lD1GB75FR6uL3\"\n}",
      "language": "json"
    }
  ]
}
[/block]
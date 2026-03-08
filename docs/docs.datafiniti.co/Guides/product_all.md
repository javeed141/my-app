# Available Views for Product Data

## Default view

The default view will display all available fields in the [Product Data Schema](https://docs.datafiniti.co/docs/product-data-schema).  This view will be used if you don't set the `view`.

If using the `csv` format, it will split out elements in multi-valued field lists into separate rows.  This means a single product will show up in multiple, contiguous rows while its `categories`, `prices`, etc fields will have one entry per row for each element in their lists.

### Included Fields

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Included Sub-fields",
    "0-0": "`asins`",
    "0-1": "N/A",
    "1-0": "`brand`",
    "1-1": "N/A",
    "2-0": "`categories`",
    "2-1": "N/A",
    "3-0": "`colors`",
    "3-1": "N/A",
    "4-0": "`count`",
    "4-1": "N/A",
    "5-0": "`dateAdded`",
    "5-1": "N/A",
    "6-0": "`dateUpdated`",
    "6-1": "N/A",
    "7-0": "`descriptions`",
    "7-1": "`dateSeen`  \n`sourceURLs`  \n`value`",
    "8-0": "`dimension`",
    "8-1": "N/A",
    "9-0": "`domains`",
    "9-1": "N/A",
    "10-0": "`ean`",
    "10-1": "N/A",
    "11-0": "`ean13`",
    "11-1": "N/A",
    "12-0": "`ean8`",
    "12-1": "N/A",
    "13-0": "`features`",
    "13-1": "`key`  \n`replace`  \n`value`",
    "14-0": "`financingAndLeasing`",
    "14-1": "`additionalDetails`  \n`apr`  \n`currency`  \n`dateSeen`  \n`description`  \ndisclaimers`\n`dueAtSigningMax`\n`dueAtSigningMin`\n`milesPerYear`\n`monthlyPaymentMax`\n`monthlyPaymentMin`\n`name`\n`offerStartDate`\n`offerEndDate`\n`term`\n`type`\n`securityDepositMax`\n`securityDepositMin`\n`sourceURLs\\`",
    "15-0": "`flavors`",
    "15-1": "N/A",
    "16-0": "`gtins`",
    "16-1": "N/A",
    "17-0": "`imageURLs`",
    "17-1": "N/A",
    "18-0": "`isbn`",
    "18-1": "N/A",
    "19-0": "`keys`",
    "19-1": "N/A",
    "20-0": "`manufacturer`",
    "20-1": "N/A",
    "21-0": "`manufacturerNumber`",
    "21-1": "N/A",
    "22-0": "`merchants`",
    "22-1": "`address`  \n`availability`  \n`city`  \n`country`  \n`dateSeen`  \n`name`  \n`phone`  \n`postalCode`  \n`province`",
    "23-0": "`name`",
    "23-1": "N/A",
    "24-0": "`prices`",
    "24-1": "`amountMin`  \n`amountMax`  \n`availability`  \n`color`  \n`condition`  \n`count`  \n`currency`  \n`dateSeen`  \n`flavor`  \n`isSale`  \n`merchant`  \n`offer`  \n`returnPolicy`  \n`shipping`  \n`size`  \n`sourceURLs`  \n`warranty`",
    "25-0": "`reviews`",
    "25-1": "`date`  \n`dateSeen`  \n`didPurchase`  \n`doRecommend`  \n`numHelpful`  \n`rating`  \n`sourceURLs`  \n`text`  \n`title`  \n`userCity`  \n`username`  \n`userProvince`",
    "26-0": "`sdsURLs`",
    "26-1": "N/A",
    "27-0": "`secondaryCategories`",
    "27-1": "N/A",
    "28-0": "`sizes`",
    "28-1": "N/A",
    "29-0": "`skus`",
    "29-1": "`sourceURLs`  \n`value`",
    "30-0": "`sourceURLs`",
    "30-1": "N/A",
    "31-0": "`taxonomy`",
    "31-1": "N/A",
    "32-0": "`taxonomyLevel1`",
    "32-1": "N/A",
    "33-0": "`taxonomyLevel2`",
    "33-1": "N/A",
    "34-0": "`taxonomyLevel3`",
    "34-1": "N/A",
    "35-0": "`taxonomyLevel4`",
    "35-1": "N/A",
    "36-0": "`taxonomyLevel5`",
    "36-1": "N/A",
    "37-0": "`taxonomyLevel6`",
    "37-1": "N/A",
    "38-0": "`taxonomyLevel7`",
    "38-1": "N/A",
    "39-0": "`taxonomyLevel8`",
    "39-1": "N/A",
    "40-0": "`taxonomyLevel9`",
    "40-1": "N/A",
    "41-0": "`upc`",
    "41-1": "N/A",
    "42-0": "`upca`",
    "42-1": "N/A",
    "43-0": "`upce`",
    "43-1": "N/A",
    "44-0": "`vin`",
    "44-1": "N/A",
    "45-0": "`websiteID`",
    "45-1": "N/A",
    "46-0": "`weight`",
    "46-1": "N/A"
  },
  "cols": 2,
  "rows": 47,
  "align": [
    "left",
    "left"
  ]
}
[/block]

### Sample CSV Output

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [products\_all-CSV-example.csv](https://raw.githubusercontent.com/datafiniti/SampleData/master/6210_1.csv)

[block:embed]
{
  "html": "<pre><code>id,asins,brand,categories,colors,count,dateAdded,dateUpdated,descriptions.dateSeen,descriptions.sourceURLs,descriptions.value,dimension,ean,features.key,features.value,flavors,websiteID,imageURLs,isbn,keys,manufacturer,manufacturerNumber,merchants.address,merchants.availability,merchants.city,merchants.country,merchants.dateSeen,merchants.name,merchants.phone,merchants.postalCode,merchants.province,name,prices.amountMin,prices.amountMax,prices.availability,prices.color,prices.condition,prices.count,prices.currency,prices.dateAdded,prices.dateSeen,prices.flavor,prices.isSale,prices.merchant,prices.offer,prices.returnPolicy,prices.shipping,prices.size,prices.source,prices.sourceURLs,prices.warranty,reviews.date,reviews.dateAdded,reviews.dateSeen,reviews.didPurchase,reviews.doRecommend,reviews.numHelpful,reviews.rating,reviews.sourceURLs,reviews.text,reviews.title,reviews.userCity,reviews.username,reviews.userProvince,sizes,skus.sourceURLs,skus.value,sourceURLs,upc,vin,weight\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,\"2015-08-17T18:43:00Z\",\"2016-05-05T17:20:05Z\",,,,,,,,,,,,,\"sunville\",,,,,,,,,,,\"Brand New Women's Fashion Rubber Rain Boots / Bottes De Pluie\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"227 g\"\n\"AVnjo8-lD1GB75FR6uL3\",\"B00MKHSLP2\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Women\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Shoes\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Shoes &amp; Handbags\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Boots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Beige Plaid\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Fuchsia\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Black Polka Dots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Black\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Houndstooth\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Navy Stripe\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Dk Green\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Leopard\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Camo\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Green\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Zebra\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Multi-Color Polka Dots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,\"Date first available at Amazon.ca\",\"Jan. 15 2014\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41-V0orNJkL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/31CXHHQarXL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411huD5UrRL._SY395_QL70_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411HlTw2geL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41ge8ewa3TL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._SY395_QL70_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411huD5UrRL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41%2BIJyHAy9L._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,\"brandnewwomensfashionrubberrainbootsbottesdepluie/b00mkhslp2\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,\"2016-04-29T00:00:00Z\",\"Amazon.ca\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,26.950000762939453,26.950000762939453,,,\"new\",,\"CAD\",\"2015-08-17T18:43:00Z\",\"2015-08-10T00:00:00Z\",,,\"Amazon.ca\",,,\"free\",,,\"http://www.amazon.ca/Brand-Womens-Rubber-Bottes-Dotted/dp/B00OMB8O7E\",,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,4.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"These fit fine, made for people with skinny legs. My thicker legs/ muscular have a squishy time.\",\"Four Stars\",,\"PLAINJANE\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,1.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"A cheap boot that lasted only a few weeks on our property. Mild use and these have already split the seems. Not recommended for anyone. Spend more money and get a good pair.\",\"Cheaply made boot that doesnt last.\",,\"Brandon\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Excellent quality and very very cute rain boots. Very comfortable - come on rain!!!\",\"Quality and comfort and cute too!\",,\"Bonnie Hallman\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,1.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Cracked within a few months where it bends for your toes. I've owned a couple of these. the same happened for both as well as the buckle breaking. I'm finally done with it. Will just spend a hit more for hunter boots.\",\"Cracked within a few months.\",,\"Chiqui Mancini\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Nice boots. A bit loose for my girl friends skinny legs.\",\"Five Stars\",,\"Etienne\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"very fashionable as well as comfortable\",\"Five Stars\",,\"jahoody\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"These arrived very fast and are great.\",\"Five Stars\",,\"Linda Findlay-Palmer\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,3.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Decent boots but one of the buckles broke a day after I received them.\",\"Three Stars\",,\"Sheena Cormier\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Really like them! Great grips for working on the farm and tall enough too! Found their sizing a little bit smaller than I expected, but still fits good because it has a wide toe area. Now I can farm in style and with any color!\",\"really like them\",,\"Marie\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Fits perfectly. Love the colour.\",\"Love the colour\",,\"N.K.\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"https://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"http://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",,,</code></pre>",
  "url": "https://gist.github.com/shiondev/48a397113db65166b29e8aab24c4f564.js",
  "title": null,
  "favicon": "https://gist.github.com/favicon.ico",
  "provider": "gist.github.com",
  "href": "https://gist.github.com/shiondev/48a397113db65166b29e8aab24c4f564.js"
}
[/block]

### Sample JSON Output

```json
{
  "asins": [
    "B00MKHSLP2"
  ],
  "categories": [
    "Women",
    "Shoes",
    "Shoes & Handbags",
    "Boots"
  ],
  "colors": [
    "Beige Plaid",
    "Fuchsia",
    "Black Polka Dots",
    "Black",
    "Houndstooth",
    "Navy Stripe",
    "Dk Green",
    "Leopard",
    "Camo",
    "Green",
    "Zebra",
    "Multi-Color Polka Dots"
  ],
  "dateAdded": "2015-08-17T18:43:00Z",
  "dateUpdated": "2016-05-05T17:20:05Z",
  "features": [
    {
      "key": "Date first available at Amazon.ca",
      "value": [
        "Jan. 15 2014"
      ]
    }
  ],
  "imageURLs": [
    "http://ecx.images-amazon.com/images/I/41-V0orNJkL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/31CXHHQarXL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/411huD5UrRL._SY395_QL70_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/411HlTw2geL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/41ge8ewa3TL._US40_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._SY395_QL70_.jpg",
    "http://ecx.images-amazon.com/images/I/411huD5UrRL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/41%2BIJyHAy9L._US40_.jpg"
  ],
  "keys": [
    "brandnewwomensfashionrubberrainbootsbottesdepluie/b00mkhslp2"
  ],
  "manufacturer": "sunville",
  "merchants": [
    {
      "dateSeen": [
        "2016-04-29T00:00:00Z"
      ],
      "name": "Amazon.ca"
    }
  ],
  "name": "Brand New Women's Fashion Rubber Rain Boots / Bottes De Pluie",
  "prices": [
    {
      "amountMin": 26.950000762939453,
      "amountMax": 26.950000762939453,
      "condition": "new",
      "currency": "CAD",
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-10T00:00:00Z"
      ],
      "merchant": "Amazon.ca",
      "shipping": "free",
      "sourceURLs": [
        "http://www.amazon.ca/Brand-Womens-Rubber-Bottes-Dotted/dp/B00OMB8O7E"
      ]
    }
  ],
  "reviews": [
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 4,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "These fit fine, made for people with skinny legs. My thicker legs/ muscular have a squishy time.",
      "title": "Four Stars",
      "username": "PLAINJANE"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 1,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "A cheap boot that lasted only a few weeks on our property. Mild use and these have already split the seems. Not recommended for anyone. Spend more money and get a good pair.",
      "title": "Cheaply made boot that doesnt last.",
      "username": "Brandon"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Excellent quality and very very cute rain boots. Very comfortable - come on rain!!!",
      "title": "Quality and comfort and cute too!",
      "username": "Bonnie Hallman"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 1,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Cracked within a few months where it bends for your toes. I've owned a couple of these. the same happened for both as well as the buckle breaking. I'm finally done with it. Will just spend a hit more for hunter boots.",
      "title": "Cracked within a few months.",
      "username": "Chiqui Mancini"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Nice boots. A bit loose for my girl friends skinny legs.",
      "title": "Five Stars",
      "username": "Etienne"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "very fashionable as well as comfortable",
      "title": "Five Stars",
      "username": "jahoody"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "These arrived very fast and are great.",
      "title": "Five Stars",
      "username": "Linda Findlay-Palmer"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 3,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Decent boots but one of the buckles broke a day after I received them.",
      "title": "Three Stars",
      "username": "Sheena Cormier"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Really like them! Great grips for working on the farm and tall enough too! Found their sizing a little bit smaller than I expected, but still fits good because it has a wide toe area. Now I can farm in style and with any color!",
      "title": "really like them",
      "username": "Marie"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Fits perfectly. Love the colour.",
      "title": "Love the colour",
      "username": "N.K."
    }
  ],
  "sourceURLs": [
    "https://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K",
    "http://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K",
    "http://www.amazon.ca/product-reviews/B00MKHSLP2"
  ],
  "weight": "227 g",
  "id": "AVnjo8-lD1GB75FR6uL3"
}
```

## product\_all\_nested

The product\_all\_nested view will display all available fields in the [Product Data Schema](https://docs.datafiniti.co/docs/product-data-schema).  This view will be used if you don't set the `view`.

If using the `csv` format, it will group elements in multi-valued field lists into single cells.

### Included Fields

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Included Sub-fields",
    "0-0": "`asins`",
    "0-1": "N/A",
    "1-0": "`brand`",
    "1-1": "N/A",
    "2-0": "`categories`",
    "2-1": "N/A",
    "3-0": "`colors`",
    "3-1": "N/A",
    "4-0": "`count`",
    "4-1": "N/A",
    "5-0": "`dateAdded`",
    "5-1": "N/A",
    "6-0": "`dateUpdated`",
    "6-1": "N/A",
    "7-0": "`descriptions`",
    "7-1": "`dateSeen`  \n`sourceURLs`  \n`value`",
    "8-0": "`dimension`",
    "8-1": "N/A",
    "9-0": "`domains`",
    "9-1": "N/A",
    "10-0": "`ean`",
    "10-1": "N/A",
    "11-0": "`ean13`",
    "11-1": "N/A",
    "12-0": "`ean8`",
    "12-1": "N/A",
    "13-0": "`features`",
    "13-1": "`key`  \n`replace`  \n`value`",
    "14-0": "`flavors`",
    "14-1": "N/A",
    "15-0": "`gtins`",
    "15-1": "N/A",
    "16-0": "`imageURLs`",
    "16-1": "N/A",
    "17-0": "`isbn`",
    "17-1": "N/A",
    "18-0": "`keys`",
    "18-1": "N/A",
    "19-0": "`manufacturer`",
    "19-1": "N/A",
    "20-0": "`manufacturerNumber`",
    "20-1": "N/A",
    "21-0": "`merchants`",
    "21-1": "`address`  \n`availability`  \n`city`  \n`country`  \n`dateSeen`  \n`name`  \n`phone`  \n`postalCode`  \n`province`",
    "22-0": "`name`",
    "22-1": "N/A",
    "23-0": "`prices`",
    "23-1": "`amountMin`  \n`amountMax`  \n`availability`  \n`color`  \n`condition`  \n`count`  \n`currency`  \n`dateSeen`  \n`flavor`  \n`isSale`  \n`merchant`  \n`offer`  \n`returnPolicy`  \n`shipping`  \n`size`  \n`source`  \n`sourceURLs`  \n`warranty`",
    "24-0": "`reviews`",
    "24-1": "`date`  \n`dateSeen`  \n`didPurchase`  \n`doRecommend`  \n`numHelpful`  \n`rating`  \n`sourceURLs`  \n`text`  \n`title`  \n`userCity`  \n`username`  \n`userProvince`",
    "25-0": "`sdsURLs`",
    "25-1": "N/A",
    "26-0": "`secondaryCategories`",
    "26-1": "N/A",
    "27-0": "`sizes`",
    "27-1": "N/A",
    "28-0": "`skus`",
    "28-1": "`sourceURLs`  \n`value`",
    "29-0": "`sourceURLs`",
    "29-1": "N/A",
    "30-0": "`stockNum`",
    "30-1": "N/A",
    "31-0": "`taxonomy`",
    "31-1": "N/A",
    "32-0": "`taxonomyLevel1`",
    "32-1": "N/A",
    "33-0": "`taxonomyLevel2`",
    "33-1": "N/A",
    "34-0": "`taxonomyLevel3`",
    "34-1": "N/A",
    "35-0": "`taxonomyLevel4`",
    "35-1": "N/A",
    "36-0": "`taxonomyLevel5`",
    "36-1": "N/A",
    "37-0": "`taxonomyLevel6`",
    "37-1": "N/A",
    "38-0": "`taxonomyLevel7`",
    "38-1": "N/A",
    "39-0": "`taxonomyLevel8`",
    "39-1": "N/A",
    "40-0": "`taxonomyLevel9`",
    "40-1": "N/A",
    "41-0": "`upc`",
    "41-1": "N/A",
    "42-0": "`upca`",
    "42-1": "N/A",
    "43-0": "`upce`",
    "43-1": "N/A",
    "44-0": "`vin`",
    "44-1": "N/A",
    "45-0": "`websiteID`",
    "45-1": "N/A",
    "46-0": "`weight`",
    "46-1": "N/A"
  },
  "cols": 2,
  "rows": 47,
  "align": [
    "left",
    "left"
  ]
}
[/block]

### Sample CSV Output

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [products\_all-CSV-example.csv](https://raw.githubusercontent.com/datafiniti/SampleData/master/6210_1.csv)

[block:embed]
{
  "html": "<pre><code>id,asins,brand,categories,colors,count,dateAdded,dateUpdated,descriptions.dateSeen,descriptions.sourceURLs,descriptions.value,dimension,ean,features.key,features.value,flavors,websiteID,imageURLs,isbn,keys,manufacturer,manufacturerNumber,merchants.address,merchants.availability,merchants.city,merchants.country,merchants.dateSeen,merchants.name,merchants.phone,merchants.postalCode,merchants.province,name,prices.amountMin,prices.amountMax,prices.availability,prices.color,prices.condition,prices.count,prices.currency,prices.dateAdded,prices.dateSeen,prices.flavor,prices.isSale,prices.merchant,prices.offer,prices.returnPolicy,prices.shipping,prices.size,prices.source,prices.sourceURLs,prices.warranty,reviews.date,reviews.dateAdded,reviews.dateSeen,reviews.didPurchase,reviews.doRecommend,reviews.numHelpful,reviews.rating,reviews.sourceURLs,reviews.text,reviews.title,reviews.userCity,reviews.username,reviews.userProvince,sizes,skus.sourceURLs,skus.value,sourceURLs,upc,vin,weight\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,\"2015-08-17T18:43:00Z\",\"2016-05-05T17:20:05Z\",,,,,,,,,,,,,\"sunville\",,,,,,,,,,,\"Brand New Women's Fashion Rubber Rain Boots / Bottes De Pluie\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"227 g\"\n\"AVnjo8-lD1GB75FR6uL3\",\"B00MKHSLP2\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Women\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Shoes\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Shoes &amp; Handbags\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,\"Boots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Beige Plaid\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Fuchsia\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Black Polka Dots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Black\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Houndstooth\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Navy Stripe\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Dk Green\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Leopard\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Camo\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Green\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Zebra\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,\"Multi-Color Polka Dots\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,\"Date first available at Amazon.ca\",\"Jan. 15 2014\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41-V0orNJkL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/31CXHHQarXL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411huD5UrRL._SY395_QL70_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411HlTw2geL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41ge8ewa3TL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._SY395_QL70_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/411huD5UrRL._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,\"http://ecx.images-amazon.com/images/I/41%2BIJyHAy9L._US40_.jpg\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,\"brandnewwomensfashionrubberrainbootsbottesdepluie/b00mkhslp2\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,\"2016-04-29T00:00:00Z\",\"Amazon.ca\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,26.950000762939453,26.950000762939453,,,\"new\",,\"CAD\",\"2015-08-17T18:43:00Z\",\"2015-08-10T00:00:00Z\",,,\"Amazon.ca\",,,\"free\",,,\"http://www.amazon.ca/Brand-Womens-Rubber-Bottes-Dotted/dp/B00OMB8O7E\",,,,,,,,,,,,,,,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,4.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"These fit fine, made for people with skinny legs. My thicker legs/ muscular have a squishy time.\",\"Four Stars\",,\"PLAINJANE\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,1.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"A cheap boot that lasted only a few weeks on our property. Mild use and these have already split the seems. Not recommended for anyone. Spend more money and get a good pair.\",\"Cheaply made boot that doesnt last.\",,\"Brandon\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Excellent quality and very very cute rain boots. Very comfortable - come on rain!!!\",\"Quality and comfort and cute too!\",,\"Bonnie Hallman\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,1.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Cracked within a few months where it bends for your toes. I've owned a couple of these. the same happened for both as well as the buckle breaking. I'm finally done with it. Will just spend a hit more for hunter boots.\",\"Cracked within a few months.\",,\"Chiqui Mancini\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Nice boots. A bit loose for my girl friends skinny legs.\",\"Five Stars\",,\"Etienne\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"very fashionable as well as comfortable\",\"Five Stars\",,\"jahoody\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"These arrived very fast and are great.\",\"Five Stars\",,\"Linda Findlay-Palmer\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,3.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Decent boots but one of the buckles broke a day after I received them.\",\"Three Stars\",,\"Sheena Cormier\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Really like them! Great grips for working on the farm and tall enough too! Found their sizing a little bit smaller than I expected, but still fits good because it has a wide toe area. Now I can farm in style and with any color!\",\"really like them\",,\"Marie\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"2015-08-17T18:43:00Z\",\"2015-08-15T00:00:00Z\",,,,5.0,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",\"Fits perfectly. Love the colour.\",\"Love the colour\",,\"N.K.\",,,,,,,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"https://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"http://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K\",,,\n\"AVnjo8-lD1GB75FR6uL3\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\"http://www.amazon.ca/product-reviews/B00MKHSLP2\",,,</code></pre>",
  "url": "https://gist.github.com/shiondev/48a397113db65166b29e8aab24c4f564.js",
  "title": null,
  "favicon": "https://gist.github.com/favicon.ico",
  "provider": "gist.github.com",
  "href": "https://gist.github.com/shiondev/48a397113db65166b29e8aab24c4f564.js"
}
[/block]

### Sample JSON Output

```json
{
  "asins": [
    "B00MKHSLP2"
  ],
  "categories": [
    "Women",
    "Shoes",
    "Shoes & Handbags",
    "Boots"
  ],
  "colors": [
    "Beige Plaid",
    "Fuchsia",
    "Black Polka Dots",
    "Black",
    "Houndstooth",
    "Navy Stripe",
    "Dk Green",
    "Leopard",
    "Camo",
    "Green",
    "Zebra",
    "Multi-Color Polka Dots"
  ],
  "dateAdded": "2015-08-17T18:43:00Z",
  "dateUpdated": "2016-05-05T17:20:05Z",
  "features": [
    {
      "key": "Date first available at Amazon.ca",
      "value": [
        "Jan. 15 2014"
      ]
    }
  ],
  "imageURLs": [
    "http://ecx.images-amazon.com/images/I/41-V0orNJkL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/31CXHHQarXL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/411huD5UrRL._SY395_QL70_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/411HlTw2geL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/41ge8ewa3TL._US40_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/51UcNOuZSUL._SY395_QL70_.jpg",
    "http://ecx.images-amazon.com/images/I/411huD5UrRL._US40_.jpg",
    "http://ecx.images-amazon.com/images/I/41%2BIJyHAy9L._US40_.jpg"
  ],
  "keys": [
    "brandnewwomensfashionrubberrainbootsbottesdepluie/b00mkhslp2"
  ],
  "manufacturer": "sunville",
  "merchants": [
    {
      "dateSeen": [
        "2016-04-29T00:00:00Z"
      ],
      "name": "Amazon.ca"
    }
  ],
  "name": "Brand New Women's Fashion Rubber Rain Boots / Bottes De Pluie",
  "prices": [
    {
      "amountMin": 26.950000762939453,
      "amountMax": 26.950000762939453,
      "condition": "new",
      "currency": "CAD",
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-10T00:00:00Z"
      ],
      "merchant": "Amazon.ca",
      "shipping": "free",
      "sourceURLs": [
        "http://www.amazon.ca/Brand-Womens-Rubber-Bottes-Dotted/dp/B00OMB8O7E"
      ]
    }
  ],
  "reviews": [
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 4,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "These fit fine, made for people with skinny legs. My thicker legs/ muscular have a squishy time.",
      "title": "Four Stars",
      "username": "PLAINJANE"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 1,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "A cheap boot that lasted only a few weeks on our property. Mild use and these have already split the seems. Not recommended for anyone. Spend more money and get a good pair.",
      "title": "Cheaply made boot that doesnt last.",
      "username": "Brandon"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Excellent quality and very very cute rain boots. Very comfortable - come on rain!!!",
      "title": "Quality and comfort and cute too!",
      "username": "Bonnie Hallman"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 1,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Cracked within a few months where it bends for your toes. I've owned a couple of these. the same happened for both as well as the buckle breaking. I'm finally done with it. Will just spend a hit more for hunter boots.",
      "title": "Cracked within a few months.",
      "username": "Chiqui Mancini"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Nice boots. A bit loose for my girl friends skinny legs.",
      "title": "Five Stars",
      "username": "Etienne"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "very fashionable as well as comfortable",
      "title": "Five Stars",
      "username": "jahoody"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "These arrived very fast and are great.",
      "title": "Five Stars",
      "username": "Linda Findlay-Palmer"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 3,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Decent boots but one of the buckles broke a day after I received them.",
      "title": "Three Stars",
      "username": "Sheena Cormier"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Really like them! Great grips for working on the farm and tall enough too! Found their sizing a little bit smaller than I expected, but still fits good because it has a wide toe area. Now I can farm in style and with any color!",
      "title": "really like them",
      "username": "Marie"
    },
    {
      "dateAdded": "2015-08-17T18:43:00Z",
      "dateSeen": [
        "2015-08-15T00:00:00Z"
      ],
      "rating": 5,
      "sourceURLs": [
        "http://www.amazon.ca/product-reviews/B00MKHSLP2"
      ],
      "text": "Fits perfectly. Love the colour.",
      "title": "Love the colour",
      "username": "N.K."
    }
  ],
  "sourceURLs": [
    "https://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K",
    "http://www.amazon.ca/Brand-Womens-Rubber-Boots-Bottes/dp/B00OL26D4K",
    "http://www.amazon.ca/product-reviews/B00MKHSLP2"
  ],
  "weight": "227 g",
  "id": "AVnjo8-lD1GB75FR6uL3"
}
```

## product\_flat\_prices

The `product_flat_prices` view should be used when you want to look at individual prices for each product in your data set in a CSV format.

If using the CSV format, it will split each price for a product into its own row.  All other fields will repeat in each row.

### Included Fields

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Included Sub-fields",
    "0-0": "`asins`",
    "0-1": "N/A",
    "1-0": "`brand`",
    "1-1": "N/A",
    "2-0": "`categories`",
    "2-1": "N/A",
    "3-0": "`colors`",
    "3-1": "N/A",
    "4-0": "`count`",
    "4-1": "N/A",
    "5-0": "`dateAdded`",
    "5-1": "N/A",
    "6-0": "`dateUpdated`",
    "6-1": "N/A",
    "7-0": "`descriptions`",
    "7-1": "`dateSeen`  \n`sourceURLs`  \n`value`",
    "8-0": "`dimension`",
    "8-1": "N/A",
    "9-0": "`domains`",
    "9-1": "N/A",
    "10-0": "`ean`",
    "10-1": "N/A",
    "11-0": "`ean13`",
    "11-1": "N/A",
    "12-0": "`ean8`",
    "12-1": "N/A",
    "13-0": "`features`",
    "13-1": "`key`  \n`value`",
    "14-0": "`flavors`",
    "14-1": "N/A",
    "15-0": "`gtins`",
    "15-1": "N/A",
    "16-0": "`imageURLs`",
    "16-1": "N/A",
    "17-0": "`isbn`",
    "17-1": "N/A",
    "18-0": "`keys`",
    "18-1": "N/A",
    "19-0": "`manufacturer`",
    "19-1": "N/A",
    "20-0": "`manufacturerNumber`",
    "20-1": "N/A",
    "21-0": "`merchants`",
    "21-1": "`address`  \n`availability`  \n`city`  \n`country`  \n`dateSeen`  \n`name`  \n`phone`  \n`postalCode`  \n`province`",
    "22-0": "`name`",
    "22-1": "N/A",
    "23-0": "`prices`",
    "23-1": "`amountMin`  \n`amountMax`  \n`availability`  \n`color`  \n`condition`  \n`count`  \n`currency`  \n`dateSeen`  \n`flavor`  \n`isSale`  \n`merchant`  \n`offer`  \n`returnPolicy`  \n`shipping`  \n`size`  \n`source`  \n`sourceURLs`  \n`warranty`",
    "24-0": "`reviews`",
    "24-1": "`date`  \n`dateSeen`  \n`didPurchase`  \n`doRecommend`  \n`numHelpful`  \n`rating`  \n`sourceURLs`  \n`text`  \n`title`  \n`userCity`  \n`username`  \n`userProvince`",
    "25-0": "`sdsURLs`",
    "25-1": "N/A",
    "26-0": "`secondaryCategories`",
    "26-1": "N/A",
    "27-0": "`sizes`",
    "27-1": "N/A",
    "28-0": "`skus`",
    "28-1": "`sourceURLs`  \n`value`",
    "29-0": "`sourceURLs`",
    "29-1": "N/A",
    "30-0": "`stockNum`",
    "30-1": "N/A",
    "31-0": "`upc`",
    "31-1": "N/A",
    "32-0": "`upca`",
    "32-1": "N/A",
    "33-0": "`upce`",
    "33-1": "N/A",
    "34-0": "`vin`",
    "34-1": "N/A",
    "35-0": "`websiteID`",
    "35-1": "N/A",
    "36-0": "`weight`",
    "36-1": "N/A"
  },
  "cols": 2,
  "rows": 37,
  "align": [
    "left",
    "left"
  ]
}
[/block]

### Sample CSV Output

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [products\_pricesFlat-CSV-example.csv](https://gist.githubusercontent.com/shiondev/20d51145a7c0eb684221daa1450eed87/raw/b842a3191dfcccec012bbb50bf40e4b2fcd0fa2f/products_pricesflat-CSV-example.csv)

## product\_flat\_reviews

The `product_flat_reviews` view should be used when you want to look at individual reviews for each product in your data set in a CSV format.  It will split each review for a product into its own row.  All other fields will repeat in each row.

### Included Fields

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Included Sub-fields",
    "0-0": "`asins`",
    "0-1": "N/A",
    "1-0": "`brand`",
    "1-1": "N/A",
    "2-0": "`categories`",
    "2-1": "N/A",
    "3-0": "`colors`",
    "3-1": "N/A",
    "4-0": "`count`",
    "4-1": "N/A",
    "5-0": "`dateAdded`",
    "5-1": "N/A",
    "6-0": "`dateUpdated`",
    "6-1": "N/A",
    "7-0": "`descriptions`",
    "7-1": "`dateSeen`  \n`sourceURLs`  \n`value`",
    "8-0": "`dimension`",
    "8-1": "N/A",
    "9-0": "`domains`",
    "9-1": "N/A",
    "10-0": "`ean`",
    "10-1": "N/A",
    "11-0": "\\`ean13",
    "11-1": "N/A",
    "12-0": "`ean8`",
    "12-1": "N/A",
    "13-0": "`features`",
    "13-1": "`key`  \n`value`",
    "14-0": "`flavors`",
    "14-1": "N/A",
    "15-0": "`gtins`",
    "15-1": "N/A",
    "16-0": "`imageURLs`",
    "16-1": "N/A",
    "17-0": "`isbn`",
    "17-1": "N/A",
    "18-0": "`keys`",
    "18-1": "N/A",
    "19-0": "`manufacturer`",
    "19-1": "N/A",
    "20-0": "`manufacturerNumber`",
    "20-1": "N/A",
    "21-0": "`merchants`",
    "21-1": "`address`  \n`availability`  \n`city`  \n`country`  \n`dateSeen`  \n`name`  \n`phone`  \n`postalCode`  \n`province`",
    "22-0": "`name`",
    "22-1": "N/A",
    "23-0": "`prices`",
    "23-1": "`amountMin`  \n`amountMax`  \n`availability`  \n`color`  \n`condition`  \n`count`  \n`currency`  \n`dateSeen`  \n`flavor`  \n`isSale`  \n`merchant`  \n`offer`  \n`returnPolicy`  \n`shipping`  \n`size`  \n`source`  \n`sourceURLs`  \n`warranty`",
    "24-0": "`reviews`",
    "24-1": "`date`  \n`dateSeen`  \n`didPurchase`  \n`doRecommend`  \n`numHelpful`  \n`rating`  \n`sourceURLs`  \n`text`  \n`title`  \n`userCity`  \n`username`  \n`userProvince`",
    "25-0": "`sdsURLs`",
    "25-1": "N/A",
    "26-0": "`secondaryCategories`",
    "26-1": "N/A",
    "27-0": "`sizes`",
    "27-1": "N/A",
    "28-0": "`skus`",
    "28-1": "`sourceURLs`  \n`value`",
    "29-0": "`sourceURLs`",
    "29-1": "N/A",
    "30-0": "`stockNum`",
    "30-1": "N/A",
    "31-0": "`upc`",
    "31-1": "N/A",
    "32-0": "`upca`",
    "32-1": "N/A",
    "33-0": "`upce`",
    "33-1": "N/A",
    "34-0": "`vin`",
    "34-1": "N/A",
    "35-0": "`websiteID`",
    "35-1": "N/A",
    "36-0": "`weight`",
    "36-1": "N/A"
  },
  "cols": 2,
  "rows": 37,
  "align": [
    "left",
    "left"
  ]
}
[/block]

### Sample CSV Output

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [products\_reviewsFlat-CSV-example.csv](https://gist.githubusercontent.com/shiondev/bf31dc3474844b7a40a9ca1cdd50c915/raw/05fe7d27ca8a2d4b6c42af80bccad9bbd560b6b8/products_reviewsFlat-CSV-example.csv)
# products_pricesFlat

The `products_pricesFlat` view should be used when you want to look at individual prices for each product in your data set in a CSV format.  It will split each price for a product into its own row.  All other fields will repeat in each row.

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

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [products\_pricesFlat-CSV-example.csv](https://gist.githubusercontent.com/shiondev/20d51145a7c0eb684221daa1450eed87/raw/b842a3191dfcccec012bbb50bf40e4b2fcd0fa2f/products_pricesflat-CSV-example.csv)

[block:embed]
{
  "html": "<pre><code>id,asins,brand,categories,colors,count,dateAdded,dateUpdated,descriptions,dimension,ean,features,flavors,imageURLs,isbn,keys,manufacturer,manufacturerNumber,merchants,name,prices.amountMin,prices.amountMax,prices.availability,prices.color,prices.condition,prices.count,prices.currency,prices.dateAdded,prices.dateSeen,prices.flavor,prices.isSale,prices.merchant,prices.offer,prices.returnPolicy,prices.shipping,prices.size,prices.source,prices.sourceURLs,prices.warranty,quantities,reviews,sizes,skus,sourceURLs,upc,vin,websiteIDs,weight\n\"AVpfBXYtLJeJML430pLJ\",,\"Hansa\",\"Toys &amp; Hobbies,Stuffed Animals,Hansa\",,,\"2015-11-01T04:15:04Z\",\"2015-11-01T04:15:04Z\",,,,\"[{\"\"key\"\":\"\"Year\"\",\"\"value\"\":[\"\"2004\"\"]},{\"\"key\"\":\"\"Condition\"\",\"\"value\"\":[\"\"New\"\"]}]\",,\"http://i.ebayimg.com/images/g/EBUAAOSwWnFWBHIe/s-l300.jpg\",,\"stuffedhansaowl9tallnewwithtag2004/231727014821\",,,\"[{\"\"dateSeen\"\":[\"\"2015-10-31T00:00:00Z\"\"],\"\"name\"\":\"\"Modprims - Ebay.com\"\"}]\",\"Stuffed Hansa Owl 9\" Tall New With Tag 2004\",12.99,12.99,,,\"New\",,\"USD\",\"2015-11-01T04:15:04Z\",\"2015-10-31T00:00:00Z\",,\"false\",,\"winning bid\",,\"USD 7.95\",,,\"http://www.ebay.com/itm/Stuffed-Hansa-Owl-9-tall-new-with-tag-2004-/231727014821?hash=item35f401a3a5:g:EBUAAOSwWnFWBHIe\",,,,\"9\",\"[{\"\"sourceURLs\"\":[\"\"http://www.ebay.com/itm/Stuffed-Hansa-Owl-9-tall-new-with-tag-2004-/231727014821?hash=item35f401a3a5:g:EBUAAOSwWnFWBHIe\"\"],\"\"value\"\":\"\"231727014821\"\"}]\",\"http://www.ebay.com/itm/Stuffed-Hansa-Owl-9-tall-new-with-tag-2004-/231727014821?hash=item35f401a3a5:g:EBUAAOSwWnFWBHIe\",,,,\n\"AVpe8YoN1cnluZ0-aYn7\",\"B00NW4LUMI\",,\"Kitchen &amp; Bath Fixtures\",,,\"2015-08-22T00:20:16Z\",\"2015-08-22T00:20:16Z\",,,,\"[{\"\"key\"\":\"\"Weight\"\",\"\"value\"\":[\"\"41 Grams\"\"]},{\"\"key\"\":\"\"Item Package Quantity\"\",\"\"value\"\":[\"\"1\"\"]}]\",,\"http://ecx.images-amazon.com/images/I/31kWQk9vqdL._SX300_QL70_.jpg,http://ecx.images-amazon.com/images/I/31kWQk9vqdL._SS40_.jpg\",,\"macdee114plasticdomeurinalwaste/b00nw4lumi\",\"Macdee\",,\"[{\"\"dateSeen\"\":[\"\"2015-08-20T00:00:00Z\"\"],\"\"name\"\":\"\"Esda Ltd\"\"}]\",\"Macdee 1 1/4\" Plastic Dome Urinal Waste\",1.81,1.81,,,\"new\",,\"EUR\",\"2015-08-22T00:20:16Z\",\"2015-08-20T00:00:00Z\",,\"false\",\"ESDA Ltd\",,,\"EUR 2.99\",,,\"http://www.amazon.co.uk/Macdee-Plastic-Dome-Urinal-waste/dp/B00NW4LUMI\",,,,,,\"http://www.amazon.co.uk/Macdee-Plastic-Dome-Urinal-waste/dp/B00NW4LUMI\",,,,\"41 g\"\n\"AVpfFEWH1cnluZ0-dcuF\",,\"We R Memory Keepers\",\"Party &amp; Occasions,Crafts,Albums\",\"Neon Yellow,Black,Greige,Coral,Neon Purple,Neon Pink\",,\"2016-02-19T21:15:05Z\",\"2016-02-19T21:15:05Z\",,\"6.3 in x 5.6 in x 1.8 in\",\"0633356601081\",\"[{\"\"key\"\":\"\"Battery Type\"\",\"\"value\"\":[\"\"Does Not Contain a Battery\"\"]},{\"\"key\"\":\"\"Primary Color\"\",\"\"value\"\":[\"\"Pink\"\"]},{\"\"key\"\":\"\"Product in Inches (L x W x H)\"\",\"\"value\"\":[\"\"6.3 x 5.6 x 1.8\"\"]},{\"\"key\"\":\"\"Model No.\"\",\"\"value\"\":[\"\"WRI4X4-60108\"\"]},{\"\"key\"\":\"\"Multi Pack Indicator\"\",\"\"value\"\":[\"\"No\"\"]},{\"\"key\"\":\"\"Shipping Weight (in pounds)\"\",\"\"value\"\":[\"\"0.55\"\"]},{\"\"key\"\":\"\"Walmart No.\"\",\"\"value\"\":[\"\"555207494\"\"]}]\",,\"http://i5.walmartimages.com/dfw/dce07b8c-66e6/k2-_f0329218-fda6-4af6-8c20-526bc8657c98.v1.jpg\",,\"wermemorykeepers/wri4x460108,633356601081,0633356601081\",\"We R Memory Keepers\",\"WRI4X4-60108\",\"[{\"\"dateSeen\"\":[\"\"2016-02-19T21:15:05Z\"\"],\"\"name\"\":\"\"Walmart.com\"\"}]\",\"We R Instagram Ring Album, 4\" X 4\"\",8.54,8.54,,,\"new\",,\"USD\",\"2016-02-19T21:15:05Z\",\"2016-02-18T00:00:00Z\",,\"false\",,,,\"FREE shipping on orders 50 +\",,,\"http://www.walmart.com/ip/We-R-Instagram-Ring-Album-4-X4-Coral/48555247\",,,,,,\"http://www.walmart.com/ip/We-R-Instagram-Ring-Album-4-X4-Coral/48555247\",\"633356601081\",,,\"0.55 lbs\"\n\"AVpe8YooLJeJML43y3CV\",\"B008EBXNOC\",\"Nabeel Perfume\",,,,\"2015-11-06T01:58:45Z\",\"2016-07-21T06:09:13Z\",,,,,,,,\"nabeelperfume/touchme,bakhoortouchmeincense40gmbynabeelperfumes/b008ebxnoc\",,\"Touch Me\",,\"Bakhoor Touch Me Incense 40 Gm By Nabeel Perfumes\",6.50,6.50,,,,,\"USD\",\"2015-11-06T01:58:45Z\",\"2015-11-03T00:00:00Z\",,\"false\",,,,\"USD 2.20 shipping\",,,\"http://www.amazon.com/Bakhoor-Touch-Me-Nabeel-Perfumes/dp/B008EBXNOC\",,,,,,\"http://www.amazon.com/Bakhoor-Touch-Me-Nabeel-Perfumes/dp/B008EBXNOC\",,,,\n\"AVpfBXYJ1cnluZ0-cKn3\",,\"Dell\",\"Computers/Tablets &amp; Networking,Keyboards, Mice &amp; Pointing,Mice, Trackballs &amp; Touchpads\",,,\"2015-10-19T11:57:16Z\",\"2015-10-19T11:57:16Z\",,,,\"[{\"\"key\"\":\"\"Connectivity\"\",\"\"value\"\":[\"\"Wireless\"\"]}]\",,\"http://i.ebayimg.com/images/g/GxsAAOSwWnFWCqXD/s-l300.jpg\",,\"newdellwirelessmousewm123/321885949955\",,,\"[{\"\"dateSeen\"\":[\"\"2015-10-14T00:00:00Z\"\"],\"\"name\"\":\"\"Uffdaracing - Ebay.com\"\"}]\",\"New Dell Wireless Mouse Wm123\",14.99,14.99,,,\"New\",,\"USD\",\"2015-10-19T11:57:16Z\",\"2015-10-14T00:00:00Z\",,\"false\",,\"winning bid\",,\"USD 4.95\",,,\"http://www.ebay.com/itm/NEW-DELL-Wireless-Mouse-WM123-/321885949955?hash=item4af1e5d003\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.ebay.com/itm/NEW-DELL-Wireless-Mouse-WM123-/321885949955?hash=item4af1e5d003\"\"],\"\"value\"\":\"\"321885949955\"\"}]\",\"http://www.ebay.com/itm/NEW-DELL-Wireless-Mouse-WM123-/321885949955?hash=item4af1e5d003\",,,,\n\"AVpe8YozLJeJML43y3Cb\",,,\"Test Auctions,Seller Category 4,Everything Else\",,,\"2016-03-29T23:56:36Z\",\"2016-04-20T03:00:43Z\",,,,,,\"http://i.ebayimg.com/images/g/F~0AAOSwrklU-o7o/s-l64.jpg,http://i.ebayimg.com/images/g/ZsMAAOSwBLlU-o7m/s-l300.jpg,http://i.ebayimg.com/images/g/ZsMAAOSwBLlU-o7m/s-l64.jpg\",,\"testlisting010notbuy/121933843062\",,,\"[{\"\"dateSeen\"\":[\"\"2016-04-19T00:00:00Z\"\"],\"\"name\"\":\"\"Working.man - Ebay.com\"\"}]\",\"Test Listing #010 -- Do Not Buy\",9.95,9.95,,,,,\"USD\",\"2016-03-29T23:56:36Z\",\"2016-04-19T00:00:00Z\",,\"false\",,,,\"USD 3.00\",,,\"http://www.ebay.com/itm/TEST-LISTING-010-DO-NOT-BUY-/121933843062?hash=item1c63d2ca76:g:ZsMAAOSwBLlU-o7m\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.ebay.com/itm/TEST-LISTING-010-DO-NOT-BUY-/121933843062?hash=item1c63d2ca76:g:ZsMAAOSwBLlU-o7m\"\"],\"\"value\"\":\"\"121933843062\"\"}]\",\"http://www.ebay.com/itm/TEST-LISTING-010-DO-NOT-BUY-/121933843062?hash=item1c63d2ca76:g:ZsMAAOSwBLlU-o7m\",,,,\n\"AVpfBXYyilAPnD_xTNXz\",,,\"Appliances,Small Kitchen Appliances,Skillets &amp; Woks,Skillets\",,,\"2015-10-17T03:47:41Z\",\"2015-10-17T03:47:41Z\",,,,,,\"http://pisces.bbystatic.com/image2/BestBuy_US/images/mp/products/1309/1309712/1309712113/1309712113_500x500_sa.jpg;canvasHeight=105;canvasWidth=105\",,\"berndessignocastskillet85inch/1309712113\",,\"697220\",,\"Berndes - Signocast Skillet, 8.5-inch\",49.09,49.09,,,\"New\",,\"USD\",\"2015-10-17T03:47:41Z\",\"2015-10-15T00:00:00Z\",,\"false\",\"Wayfair - Bestbuy.com\",,,,,,\"http://www.bestbuy.com/site/berndes-signocast-skillet-8-5-inch/1309712113.p?id=mp1309712113&amp;skuId=1309712113\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.bestbuy.com/site/berndes-signocast-skillet-8-5-inch/1309712113.p?id=mp1309712113&amp;skuId=1309712113\"\"],\"\"value\"\":\"\"1309712113\"\"}]\",\"http://www.bestbuy.com/site/berndes-signocast-skillet-8-5-inch/1309712113.p?id=mp1309712113&amp;skuId=1309712113\",,,,\n\"AVpfBXYyilAPnD_xTNXz\",,,\"Appliances,Small Kitchen Appliances,Skillets &amp; Woks,Skillets\",,,\"2015-10-17T03:47:41Z\",\"2015-10-17T03:47:41Z\",,,,,,\"http://pisces.bbystatic.com/image2/BestBuy_US/images/mp/products/1309/1309712/1309712113/1309712113_500x500_sa.jpg;canvasHeight=105;canvasWidth=105\",,\"berndessignocastskillet85inch/1309712113\",,\"697220\",,\"Berndes - Signocast Skillet, 8.5-inch\",50.08,50.08,,,\"New\",,\"USD\",\"2015-10-17T03:47:41Z\",\"2015-09-08T00:00:00Z\",,\"false\",\"Wayfair - Bestbuy.com\",,,\"Free Shipping\",,,\"http://www.bestbuy.com/site/berndes-signocast-skillet-8-5-inch/1309712113.p?id=mp1309712113&amp;skuId=1309712113\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.bestbuy.com/site/berndes-signocast-skillet-8-5-inch/1309712113.p?id=mp1309712113&amp;skuId=1309712113\"\"],\"\"value\"\":\"\"1309712113\"\"}]\",\"http://www.bestbuy.com/site/berndes-signocast-skillet-8-5-inch/1309712113.p?id=mp1309712113&amp;skuId=1309712113\",,,,\n\"AVpfAw0ailAPnD_xS_mP\",,,\"Jewelry &amp; Watches,Jewelry,Stainless Steel Jewelry,Rings,Stainless Steel Rings\",,,\"2015-09-21T13:31:22Z\",\"2016-03-03T05:01:32Z\",,,,\"[{\"\"key\"\":\"\"Gender\"\",\"\"value\"\":[\"\"Female\"\"]},{\"\"key\"\":\"\"Metal\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]},{\"\"key\"\":\"\"Gemstone Color\"\",\"\"value\"\":[\"\"Silver\"\"]},{\"\"key\"\":\"\"Country of Origin\"\",\"\"value\"\":[\"\"China\"\"]},{\"\"key\"\":\"\"Model Number\"\",\"\"value\"\":[\"\"WCJ-SS479\"\"]},{\"\"key\"\":\"\"Band Width\"\",\"\"value\"\":[\"\"2-3 mm\"\"]},{\"\"key\"\":\"\"Stone Shape\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Diamond Cut\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Ring Style\"\",\"\"value\"\":[\"\"Cocktail-Cluster, Fashion, Heart\"\",\"\"Cocktail-Cluster Fashion Heart\"\"]},{\"\"key\"\":\"\"Metal Color\"\",\"\"value\"\":[\"\"White\"\"]},{\"\"key\"\":\"\"material\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]}]\",,\"http://ak1.ostkcdn.com/images/products/8323493/Stainless-Steel-Heart-Center-Ring-d38a4c47-691d-421b-952f-07caf7bb2e74_80.jpg\",,\"stainlesssteelheartcenterring/15637248\",,,,\"Stainless Steel Heart Center Ring\",47.99,47.99,,,,,\"USD\",\"2015-09-21T13:31:22Z\",\"2016-03-01T00:00:00Z\",,\"true\",\"Overstock.com\",,,,,,\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848\"\"],\"\"value\"\":\"\"15637248\"\"}]\",\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848,http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=TYKIV7LQPBPYG62F3IOUKLOQ2U&amp;searchidx=4912\",,,,\n\"AVpfAw0ailAPnD_xS_mP\",,,\"Jewelry &amp; Watches,Jewelry,Stainless Steel Jewelry,Rings,Stainless Steel Rings\",,,\"2015-09-21T13:31:22Z\",\"2016-03-03T05:01:32Z\",,,,\"[{\"\"key\"\":\"\"Gender\"\",\"\"value\"\":[\"\"Female\"\"]},{\"\"key\"\":\"\"Metal\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]},{\"\"key\"\":\"\"Gemstone Color\"\",\"\"value\"\":[\"\"Silver\"\"]},{\"\"key\"\":\"\"Country of Origin\"\",\"\"value\"\":[\"\"China\"\"]},{\"\"key\"\":\"\"Model Number\"\",\"\"value\"\":[\"\"WCJ-SS479\"\"]},{\"\"key\"\":\"\"Band Width\"\",\"\"value\"\":[\"\"2-3 mm\"\"]},{\"\"key\"\":\"\"Stone Shape\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Diamond Cut\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Ring Style\"\",\"\"value\"\":[\"\"Cocktail-Cluster, Fashion, Heart\"\",\"\"Cocktail-Cluster Fashion Heart\"\"]},{\"\"key\"\":\"\"Metal Color\"\",\"\"value\"\":[\"\"White\"\"]},{\"\"key\"\":\"\"material\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]}]\",,\"http://ak1.ostkcdn.com/images/products/8323493/Stainless-Steel-Heart-Center-Ring-d38a4c47-691d-421b-952f-07caf7bb2e74_80.jpg\",,\"stainlesssteelheartcenterring/15637248\",,,,\"Stainless Steel Heart Center Ring\",15.12,15.12,,,,,\"USD\",\"2015-09-21T13:31:22Z\",\"2016-03-01T00:00:00Z\",,\"false\",\"Overstock.com\",,,,,,\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848\"\"],\"\"value\"\":\"\"15637248\"\"}]\",\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848,http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=TYKIV7LQPBPYG62F3IOUKLOQ2U&amp;searchidx=4912\",,,,\n\"AVpfAw0ailAPnD_xS_mP\",,,\"Jewelry &amp; Watches,Jewelry,Stainless Steel Jewelry,Rings,Stainless Steel Rings\",,,\"2015-09-21T13:31:22Z\",\"2016-03-03T05:01:32Z\",,,,\"[{\"\"key\"\":\"\"Gender\"\",\"\"value\"\":[\"\"Female\"\"]},{\"\"key\"\":\"\"Metal\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]},{\"\"key\"\":\"\"Gemstone Color\"\",\"\"value\"\":[\"\"Silver\"\"]},{\"\"key\"\":\"\"Country of Origin\"\",\"\"value\"\":[\"\"China\"\"]},{\"\"key\"\":\"\"Model Number\"\",\"\"value\"\":[\"\"WCJ-SS479\"\"]},{\"\"key\"\":\"\"Band Width\"\",\"\"value\"\":[\"\"2-3 mm\"\"]},{\"\"key\"\":\"\"Stone Shape\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Diamond Cut\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Ring Style\"\",\"\"value\"\":[\"\"Cocktail-Cluster, Fashion, Heart\"\",\"\"Cocktail-Cluster Fashion Heart\"\"]},{\"\"key\"\":\"\"Metal Color\"\",\"\"value\"\":[\"\"White\"\"]},{\"\"key\"\":\"\"material\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]}]\",,\"http://ak1.ostkcdn.com/images/products/8323493/Stainless-Steel-Heart-Center-Ring-d38a4c47-691d-421b-952f-07caf7bb2e74_80.jpg\",,\"stainlesssteelheartcenterring/15637248\",,,,\"Stainless Steel Heart Center Ring\",16.80,16.80,,,,,\"USD\",\"2015-09-21T13:31:22Z\",\"2015-09-15T00:00:00Z\",,\"false\",\"Overstock.com\",,,,,,\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=TYKIV7LQPBPYG62F3IOUKLOQ2U&amp;searchidx=4912\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848\"\"],\"\"value\"\":\"\"15637248\"\"}]\",\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848,http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=TYKIV7LQPBPYG62F3IOUKLOQ2U&amp;searchidx=4912\",,,,\n\"AVpfAw0ailAPnD_xS_mP\",,,\"Jewelry &amp; Watches,Jewelry,Stainless Steel Jewelry,Rings,Stainless Steel Rings\",,,\"2015-09-21T13:31:22Z\",\"2016-03-03T05:01:32Z\",,,,\"[{\"\"key\"\":\"\"Gender\"\",\"\"value\"\":[\"\"Female\"\"]},{\"\"key\"\":\"\"Metal\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]},{\"\"key\"\":\"\"Gemstone Color\"\",\"\"value\"\":[\"\"Silver\"\"]},{\"\"key\"\":\"\"Country of Origin\"\",\"\"value\"\":[\"\"China\"\"]},{\"\"key\"\":\"\"Model Number\"\",\"\"value\"\":[\"\"WCJ-SS479\"\"]},{\"\"key\"\":\"\"Band Width\"\",\"\"value\"\":[\"\"2-3 mm\"\"]},{\"\"key\"\":\"\"Stone Shape\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Diamond Cut\"\",\"\"value\"\":[\"\"Heart\"\"]},{\"\"key\"\":\"\"Ring Style\"\",\"\"value\"\":[\"\"Cocktail-Cluster, Fashion, Heart\"\",\"\"Cocktail-Cluster Fashion Heart\"\"]},{\"\"key\"\":\"\"Metal Color\"\",\"\"value\"\":[\"\"White\"\"]},{\"\"key\"\":\"\"material\"\",\"\"value\"\":[\"\"Stainless Steel\"\"]}]\",,\"http://ak1.ostkcdn.com/images/products/8323493/Stainless-Steel-Heart-Center-Ring-d38a4c47-691d-421b-952f-07caf7bb2e74_80.jpg\",,\"stainlesssteelheartcenterring/15637248\",,,,\"Stainless Steel Heart Center Ring\",55.99,55.99,,,,,\"USD\",\"2015-09-21T13:31:22Z\",\"2015-09-15T00:00:00Z\",,\"true\",\"Overstock.com\",,,,,,\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=TYKIV7LQPBPYG62F3IOUKLOQ2U&amp;searchidx=4912\",,,,,\"[{\"\"sourceURLs\"\":[\"\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848\"\"],\"\"value\"\":\"\"15637248\"\"}]\",\"http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=QRZBDQ4MQUA22JSONV3GYLWKXQ&amp;searchidx=1848,http://www.overstock.com/Jewelry-Watches/Stainless-Steel-Heart-Center-Ring/8323493/product.html?refccid=TYKIV7LQPBPYG62F3IOUKLOQ2U&amp;searchidx=4912\",,,,</code></pre>",
  "url": "https://gist.github.com/shiondev/20d51145a7c0eb684221daa1450eed87",
  "title": "products_pricesFlat-CSV-example.csv",
  "favicon": "https://assets-cdn.github.com/favicon.ico",
  "image": "https://avatars2.githubusercontent.com/u/1823648?v=3&s=400"
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
      "code": "{\n  \"asins\": [\n    \"B00NW4LUMI\"\n  ],\n  \"categories\": [\n    \"Kitchen & Bath Fixtures\"\n  ],\n  \"dateAdded\": \"2015-08-22T00:20:16Z\",\n  \"dateUpdated\": \"2015-08-22T00:20:16Z\",\n  \"features\": [\n    {\n      \"key\": \"Weight\",\n      \"value\": [\n        \"41 Grams\"\n      ]\n    },\n    {\n      \"key\": \"Item Package Quantity\",\n      \"value\": [\n        \"1\"\n      ]\n    }\n  ],\n  \"imageURLs\": [\n    \"http://ecx.images-amazon.com/images/I/31kWQk9vqdL._SX300_QL70_.jpg\",\n    \"http://ecx.images-amazon.com/images/I/31kWQk9vqdL._SS40_.jpg\"\n  ],\n  \"keys\": [\n    \"macdee114plasticdomeurinalwaste/b00nw4lumi\"\n  ],\n  \"manufacturer\": \"Macdee\",\n  \"merchants\": [\n    {\n      \"dateSeen\": [\n        \"2015-08-20T00:00:00Z\"\n      ],\n      \"name\": \"Esda Ltd\"\n    }\n  ],\n  \"name\": \"Macdee 1 1/4\\\" Plastic Dome Urinal Waste\",\n  \"prices\": [\n    {\n      \"amountMin\": 1.81,\n      \"amountMax\": 1.81,\n      \"condition\": \"new\",\n      \"currency\": \"EUR\",\n      \"dateAdded\": \"2015-08-22T00:20:16Z\",\n      \"dateSeen\": [\n        \"2015-08-20T00:00:00Z\"\n      ],\n      \"isSale\": \"false\",\n      \"merchant\": \"ESDA Ltd\",\n      \"shipping\": \"EUR 2.99\",\n      \"sourceURLs\": [\n        \"http://www.amazon.co.uk/Macdee-Plastic-Dome-Urinal-waste/dp/B00NW4LUMI\"\n      ]\n    }\n  ],\n  \"sourceURLs\": [\n    \"http://www.amazon.co.uk/Macdee-Plastic-Dome-Urinal-waste/dp/B00NW4LUMI\"\n  ],\n  \"weight\": \"41 g\",\n  \"id\": \"AVpe8YoN1cnluZ0-aYn7\"\n}",
      "language": "json"
    }
  ]
}
[/block]
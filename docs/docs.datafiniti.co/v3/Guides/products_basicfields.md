# products_basicFields

The `products_basicFields` view displays a limited number of fields from our [product schema](https://datafiniti-api.readme.io/v3/docs/product-data-schema).  This is view is helpful when you need less information to do your analysis.

If using the `csv` format, the `categories` field will be nested into a single cell, but the `sourceURLs` field will be split into multiple rows.

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
    "0-0": "`brand`",
    "1-0": "`categories`",
    "2-0": "`manufacturer`",
    "3-0": "`name`",
    "4-0": "`sourceURLs`",
    "h-1": "Included Sub-fields",
    "0-1": "N/A",
    "1-1": "N/A",
    "2-1": "N/A",
    "3-1": "N/A",
    "4-1": "N/A"
  },
  "cols": 2,
  "rows": 5
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Sample CSV Output"
}
[/block]

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [products\_basicFields-CSV-example.csv](https://gist.githubusercontent.com/shiondev/dc1c8327cf29cfba4954d808ae29b7e8/raw/1177ca765f1aca0c176c4d7b52cb23f418130b45/product_basicFields-CSV-example.csv)

[block:embed]
{
  "html": "<pre><code>id,brand,categories,manufacturer,name,sourceURLs\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),https://www.overstock.com/Office-Supplies/Sparco-Economy-7-inch-Thermal-Fax-Paper-Box-of-6/9519127/product.html\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),http://www.walmart.com/ip/Sparco-Products-Fax-Paper-1-2-Core-H-Sensitivity-8-1-2-x98-White/22856854?action=product_interest&amp;action_type=title&amp;item_id=22856854&amp;placement_id=irs-2-m3&amp;strategy=PWBAB&amp;visitor_id&amp;category=&amp;customer_id_enc&amp;config_id=2&amp;parent_item_id=15140199&amp;parent_anchor_item_id=15140199&amp;bucket_id=irsbucketdefault&amp;beacon_version=1.0.1&amp;findingMethod=p13n\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),http://www.walmart.com/ip/Sparco-Products-Fax-Paper-1-2-Core-H-Sensitivity-8-1-2-x98-White/22856854?action=product_interest&amp;action_type=title&amp;item_id=22856854&amp;placement_id=irs-2-m3&amp;strategy=PWBAB&amp;visitor_id&amp;category=&amp;customer_id_enc&amp;config_id=2&amp;parent_item_id=15140199&amp;parent_anchor_item_id=15140199&amp;bucket_id=irsbucketdefault&amp;beacon_version=1.0.1&amp;findingMethod=p13n#reviews\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),http://www.walmart.com/ip/Sparco-Products-Fax-Paper-1-2-Core-H-Sensitivity-8-1-2-x98-White/22856854\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),http://www.overstock.com/Office-Supplies/Sparco-Economy-7-inch-Thermal-Fax-Paper-Box-of-6/9519127/product.html?refccid=NO6IA2AIQFDLBVKBGKDLDSUM2Q&amp;searchidx=20\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),http://www.overstock.com/Office-Supplies/Sparco-Economy-7-inch-Thermal-Fax-Paper-Box-of-6/9519127/product.html?refccid=BVGD6PX5TEJJ22KHORB4JAVNAM&amp;searchidx=205\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),http://www.overstock.com/Office-Supplies/Sparco-Economy-7-inch-Thermal-Fax-Paper-Box-of-6/9519127/product.html?refccid=H4N627FOI4J2L5CJAEKDFXBHJA&amp;searchidx=195\nAVpgRL7qLJeJML43LfPj,Sparco,\"Envelopes,Fax Paper,Forms,Paper,Stationery,All Paper &amp; Printable Media,Office,Paper &amp; Printable Media,Office Supplies,Paper, Forms &amp; Envelopes,Sparco,Paper &amp; Stationery\",Sparco Products,Sparco Economy 7-inch Thermal Fax Paper (box of 6),http://www.overstock.com/Office-Supplies/Sparco-Economy-7-inch-Thermal-Fax-Paper-Box-of-6/9519127/product.html?refccid=YUOJ5EM775OYSPKIR3J64TWWSY&amp;searchidx=99\nAVpgfD46LJeJML43Oi86,National Tree Company,\"Garden,Garden Accents,Outdoor Decor,Patio,Home &amp; Garden,Garden &amp; Patio,Fencing,Lumber &amp; Composites,Garden Fencing\",,93 In. Garden Accents Gated Archway,https://www.overstock.com/Home-Garden/National-Tree-Company-93-inch-Metal-Arch-with-Gate/9999462/product.html\nAVpgfD46LJeJML43Oi86,National Tree Company,\"Garden,Garden Accents,Outdoor Decor,Patio,Home &amp; Garden,Garden &amp; Patio,Fencing,Lumber &amp; Composites,Garden Fencing\",,93 In. Garden Accents Gated Archway,http://www.overstock.com/Home-Garden/National-Tree-Company-93-inch-Metal-Arch-with-Gate/9999462/product.html?refccid=ONMAJEHZM3YLFKKGNKO6O6T6BQ&amp;searchidx=4391\nAVpgfD46LJeJML43Oi86,National Tree Company,\"Garden,Garden Accents,Outdoor Decor,Patio,Home &amp; Garden,Garden &amp; Patio,Fencing,Lumber &amp; Composites,Garden Fencing\",,93 In. Garden Accents Gated Archway,http://www.overstock.com/Home-Garden/National-Tree-Company-93-inch-Metal-Arch-with-Gate/9999462/product.html?refccid=SB4VJNC44COZUT2KQSIKBDHGOE&amp;searchidx=1830\nAVpgfD46LJeJML43Oi86,National Tree Company,\"Garden,Garden Accents,Outdoor Decor,Patio,Home &amp; Garden,Garden &amp; Patio,Fencing,Lumber &amp; Composites,Garden Fencing\",,93 In. Garden Accents Gated Archway,http://reviews.homedepot.com/1999m/206270200/reviews.htm?format=embedded\nAVpgfD46LJeJML43Oi86,National Tree Company,\"Garden,Garden Accents,Outdoor Decor,Patio,Home &amp; Garden,Garden &amp; Patio,Fencing,Lumber &amp; Composites,Garden Fencing\",,93 In. Garden Accents Gated Archway,http://www.homedepot.com/p/National-Tree-Company-93-in-Garden-Accents-Gated-Archway-GAMC30-93RB/206270200\nAVpe_xo3LJeJML430Ex9,NEW,\"Mobile Accessories,Cases, Covers, Skins\",,Shockproof Dual Color Frame Pc+tpu Phone Case Back Cover For Iphone 6 4.7 6 Plus,http://www.ebay.com.au/itm/Shockproof-Dual-Color-Frame-PC-TPU-Phone-Case-Back-Cover-For-iPhone-6-4-7-6-Plus-/181988243122?var=&amp;hash=item2a5f5836b2:m:mAvQVbsUMDmPILVDkLMMj4g\nAVpe_xprLJeJML430Eya,ARB 4x4 Accessories,\"Automotive,Body Styling,Bumpers,Exterior Accessories\",,Arb 4x4 Accessories 4x4 Accessories 3420210 Front Deluxe Bull Bar Winch Mount Bumper,http://www.sears.com/content/pdp/config/products/v1/products/SPM9593083932?site=sears\nAVpe_xprLJeJML430Eya,ARB 4x4 Accessories,\"Automotive,Body Styling,Bumpers,Exterior Accessories\",,Arb 4x4 Accessories 4x4 Accessories 3420210 Front Deluxe Bull Bar Winch Mount Bumper,http://www.sears.com/content/pdp/products/pricing/v1/get/price/display/json?pid=SPM9593083932&amp;pidType=0&amp;priceMatch=Y&amp;memberStatus=G&amp;storeId=10153\nAVpe_xqUilAPnD_xSpEI,Hugo Boss,\"Fragrances,Women\",,Boss Woman By Hugo Boss 3.0 Oz Eau De Parfum Spray Nib Sealed For Women,http://www.ebay.com/itm/Boss-Woman-By-Hugo-Boss-3-0-Oz-Eau-de-Parfum-Spray-NIB-Sealed-For-Women-/331712278775?hash=item4d3b97b0f7:g:3S0AAOSwIwhWTfWl\nAVph9Rkv1cnluZ0-IR1Q,Wildkin,\"Bags,Lunch Bags,luggage &amp; bags,Wildkin,Home,Kitchen &amp; Dining,Kitchen Storage &amp; Organization,Food Storage,#35181 in,#5578 in,#1464 in\",Wildkin,Wildkin Peace Signs Munch 'n Lunch Bag,https://www.overstock.com/Luggage-Bags/Wildkin-Munch-n-Lunch-Bag-Peace-Signs-Purple/8100331/product.html\nAVph9Rkv1cnluZ0-IR1Q,Wildkin,\"Bags,Lunch Bags,luggage &amp; bags,Wildkin,Home,Kitchen &amp; Dining,Kitchen Storage &amp; Organization,Food Storage,#35181 in,#5578 in,#1464 in\",Wildkin,Wildkin Peace Signs Munch 'n Lunch Bag,http://www.overstock.com/Luggage-Bags/Wildkin-Munch-n-Lunch-Bag-Peace-Signs-Purple/8100331/product.html?refccid=RMP5I6SOZVT3REKB6VHZNU4JGQ&amp;searchidx=152\nAVph9Rkv1cnluZ0-IR1Q,Wildkin,\"Bags,Lunch Bags,luggage &amp; bags,Wildkin,Home,Kitchen &amp; Dining,Kitchen Storage &amp; Organization,Food Storage,#35181 in,#5578 in,#1464 in\",Wildkin,Wildkin Peace Signs Munch 'n Lunch Bag,http://www.overstock.com/Luggage-Bags/Wildkin-Munch-n-Lunch-Bag-Peace-Signs-Purple/8100331/product.html?refccid=QDX2KBDHXA6J4CKKL3HD2HUSZE&amp;searchidx=232\nAVph9Rkv1cnluZ0-IR1Q,Wildkin,\"Bags,Lunch Bags,luggage &amp; bags,Wildkin,Home,Kitchen &amp; Dining,Kitchen Storage &amp; Organization,Food Storage,#35181 in,#5578 in,#1464 in\",Wildkin,Wildkin Peace Signs Munch 'n Lunch Bag,http://www.overstock.com/Luggage-Bags/Wildkin-Munch-n-Lunch-Bag-Peace-Signs-Purple/8100331/product.html?refccid=GGFYAAGTSK7ZHAKOH462PNTN6I&amp;searchidx=244\nAVph9Rkv1cnluZ0-IR1Q,Wildkin,\"Bags,Lunch Bags,luggage &amp; bags,Wildkin,Home,Kitchen &amp; Dining,Kitchen Storage &amp; Organization,Food Storage,#35181 in,#5578 in,#1464 in\",Wildkin,Wildkin Peace Signs Munch 'n Lunch Bag,http://www.overstock.com/Luggage-Bags/Wildkin-Munch-n-Lunch-Bag-Peace-Signs-Purple/8100331/product.html?refccid=LDE3TEG7PLGIENCLP6XUB5OJAY&amp;searchidx=206\nAVph9Rkv1cnluZ0-IR1Q,Wildkin,\"Bags,Lunch Bags,luggage &amp; bags,Wildkin,Home,Kitchen &amp; Dining,Kitchen Storage &amp; Organization,Food Storage,#35181 in,#5578 in,#1464 in\",Wildkin,Wildkin Peace Signs Munch 'n Lunch Bag,http://www.amazon.com/Wildkin-Peace-Signs-Munch-Lunch/dp/B0084DZ7RG\nAVph9Rkv1cnluZ0-IR1Q,Wildkin,\"Bags,Lunch Bags,luggage &amp; bags,Wildkin,Home,Kitchen &amp; Dining,Kitchen Storage &amp; Organization,Food Storage,#35181 in,#5578 in,#1464 in\",Wildkin,Wildkin Peace Signs Munch 'n Lunch Bag,http://www.walmart.com/ip/Wildkin-Peace-Signs-Purple-Munch-n-Lunch-Bag/20731723</code></pre>",
  "url": "https://gist.github.com/shiondev/dc1c8327cf29cfba4954d808ae29b7e8",
  "title": "product_basicFields-CSV-example.csv",
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
      "code": "{\n  \"estimated total\": 2539564,\n  \"records\": [\n    {\n      \"brand\": \"International Caravan\",\n      \"categories\": [\n        \"Garden\",\n        \"Outdoor Dining Sets\",\n        \"Patio\",\n        \"Patio Furniture\",\n        \"Patio & Garden\",\n        \"Patio Dining Sets\",\n        \"Dining Sets\",\n        \"home\",\n        \"International Caravan\",\n        \"Home & Garden\",\n        \"Garden & Patio\"\n      ],\n      \"manufacturer\": \"International Caravan\",\n      \"name\": \"International Caravan Royal Tahiti Badalona 7-piece Outdoor Dining Set\",\n      \"sourceURLs\": [\n        \"https://www.overstock.com/Home-Garden/International-Caravan-Royal-Tahiti-Badalona-7-Piece-Outdoor-Dining-Set/7157245/product.html\",\n        \"https://www.walmart.com/ip/International-Caravan-Barcelona-Balau-7-Piece-Dining-Set/24402467\",\n        \"http://www.walmart.com/ip/International-Caravan-Barcelona-Balau-7-Piece-Dining-Set/24402467\",\n        \"http://www.walmart.com/ip/7-Pc-Modern-Patio-Dining-Set/44365228\",\n        \"http://www.overstock.com/Home-Garden/International-Caravan-Royal-Tahiti-Badalona-7-Piece-Outdoor-Dining-Set/7157245/product.html?refccid=7NEV4NLR5J5KDVCHGKVHMWNDEY&searchidx=676\",\n        \"http://www.overstock.com/Home-Garden/International-Caravan-Royal-Tahiti-Badalona-7-Piece-Outdoor-Dining-Set/7157245/product.html?refccid=HM4YQ2LSNA3YUK2ILYBEYOGA2I&searchidx=212\",\n        \"http://www.overstock.com/Home-Garden/International-Caravan-Royal-Tahiti-Badalona-7-Piece-Outdoor-Dining-Set/7157245/product.html?refccid=HXVTRPL6GXR2MUCBBR63KXT44A&searchidx=137\"\n      ],\n      \"id\": \"AVpfNbowilAPnD_xXRD3\"\n    }\n  ]\n}",
      "language": "json"
    }
  ]
}
[/block]
# Product Brand Normalization

Datafiniti uses a validation process that checks scraped data upon importing it into the database. We have logic in place to change the brand name to the recognized brand names you know. This was done to allow for more ease in querying the product database for the brands you want to see.

Previously if you wanted to search for *Samsung* via the *brands* field you would find the following brand names back:

* Samsung
* Samsung Electronics
* Samsung Electronics L\&T
* Samsung Televisions
* Samsung Appliances

After the Normalization logic is in place the only brand name you will see is ***Samsung***.

Below is a list of product brand names that our normalization filters process and set to a designated brand name.

[block:callout]
{
  "type": "info",
  "title": "Suggested Brand Name Normalization",
  "body": "If there are any brand names you feel should be normalized or made easier to search, feel free to open a discussion suggestion [here](https://developer.datafiniti.co/discuss)."
}
[/block]

## CanonicalBrand Names

[block:parameters]
{
  "data": {
    "h-0": "CanonicalBrand",
    "h-1": "Scraped Source Brand Name",
    "0-0": "'47",
    "1-0": "3m",
    "2-0": "delphi",
    "3-0": "dents",
    "4-0": "desert",
    "5-0": "diesel",
    "6-0": "dion",
    "7-0": "dior",
    "8-0": "divided",
    "9-0": "divine",
    "10-0": "dixon",
    "11-0": "dk",
    "12-0": "dl",
    "13-0": "dnd",
    "14-0": "dove",
    "15-0": "ds",
    "16-0": "dunhill",
    "17-0": "dunlop",
    "18-0": "duo",
    "19-0": "egg",
    "20-0": "eko",
    "21-0": "element",
    "22-0": "elf",
    "23-0": "elite",
    "24-0": "elle",
    "25-0": "emu",
    "26-0": "enduro",
    "27-0": "enve",
    "28-0": "envy",
    "29-0": "eos",
    "30-0": "hill's",
    "31-0": "hp",
    "32-0": "husky",
    "33-0": "hustler",
    "34-0": "independent",
    "35-0": "inspire",
    "36-0": "iris",
    "37-0": "jeep",
    "38-0": "junior",
    "39-0": "lottie",
    "40-0": "lulu",
    "41-0": "lush",
    "42-0": "neo",
    "43-0": "nhl",
    "44-0": "nununu",
    "45-0": "odi",
    "46-0": "ooshie",
    "47-0": "osprey",
    "48-0": "oxo",
    "49-0": "penn",
    "50-0": "perrin",
    "51-0": "prx",
    "52-0": "quest",
    "53-0": "rene",
    "54-0": "róen",
    "55-0": "vero",
    "56-0": "volvo",
    "57-0": "winden",
    "58-0": "wine",
    "59-0": "yru",
    "60-0": "ziip",
    "0-1": "'47 brand",
    "1-1": "3m espe\n3m healthcare\n3m thinsulate",
    "2-1": "delphi classics (parts edition)",
    "3-1": "dents thinsulate",
    "4-1": "desert decadence,\ndesert essence,\ndesert forager,\ndesert harvest,\ndesert pepper trading,\ndesert sun coffee roasters,\ndesert tortoise botanicals",
    "5-1": "diesel x foscarini, \ndiesel | men",
    "9-1": "\"divine noise\",\n\"divine specialties\",\n\"divine xpressions\",\n\"divine xpressions collection\"",
    "6-1": "dion lee",
    "7-1": "dior jadore,\ndior sauvage",
    "8-1": "divided style",
    "10-1": "dixon apparel, \ndixon ticonderoga co - pacon",
    "11-1": "dk industries, \ndk knowledge, \ndk tools",
    "12-1": "dl & co., \ndl jeans, \ndl medical & health, \ndl signs",
    "13-1": "\"dnd - daisy nail design\"",
    "14-1": "\"dove and dovelet\",\n\"dove beauty\",\n\"dove men+care\",\n\"dove purely pampering\"",
    "15-1": "ds babyland",
    "16-1": "dunhill canada",
    "17-1": "dunlop volleys",
    "18-1": "duo brush\nduo distilleries",
    "19-1": "egg press\negg weights",
    "20-1": "eko brewery",
    "21-1": "element fitness",
    "22-1": "elf creek games",
    "23-1": "\"elite flight tees\",\n\"elite hockey\",\n\"elite modern\",\n\"elite sport\",\n\"elite srl\"",
    "24-1": "elle jae merch, \nelle zeitoune",
    "25-1": "emu australia",
    "26-1": "enduro bearings",
    "27-1": "enve composites",
    "28-1": "\"envy us beauty supply\",\n\"envy us clothing\",\n\"envy us luxe hair\"",
    "29-1": "eos publishing",
    "30-1": "hill's science diet, \nhills prescription diet",
    "31-1": "hp reed diffuser, \nhp tackle",
    "32-1": "husky liners",
    "33-1": "hustler toys",
    "34-1": "\"independent distillers canada\",\n\"independent liquor group\",\n\"independent liquor ltd\"",
    "35-1": "inspire fitness",
    "36-1": "\"iris basic\", \"iris hantverk\"",
    "37-1": "jeep world",
    "38-1": "junior learning",
    "39-1": "lottie london",
    "40-1": "lulu bebe, \nlulu guinness, \nlulu lashes",
    "41-1": "lush clothing",
    "42-1": "neo craft",
    "43-1": "nhl merchandise",
    "44-1": "nununu world",
    "45-1": "odi lynch",
    "46-1": "ooshie resort wear",
    "47-1": "osprey custom tackle,\nosprey packs",
    "48-1": "\"oxo good grips bake\",\n\"oxo good grips bath\",\n\"oxo international, ltd.\"",
    "49-1": "\"penn fishing tackle\",\n\"penn plax\",\n\"penn reels\"",
    "50-1": "perrin performance",
    "51-1": "prx & simpsons fitness supply, \nprx performance",
    "52-1": "quest impact",
    "53-1": "\"rene o. villanueva, illustrated by daniel tayona\",\n\"rene ruiz collection\",\n\"rene villanueva, illustrated by joel jason o. chua\"",
    "54-1": "róen beauty",
    "55-1": "vero moda",
    "56-1": "volvo penta,\nvolvo polestar",
    "57-1": "winden x anomie",
    "58-1": "winn grips",
    "59-1": "yru (strange cvlt)",
    "60-1": "ziip compatible pods"
  },
  "cols": 2,
  "rows": 61
}
[/block]
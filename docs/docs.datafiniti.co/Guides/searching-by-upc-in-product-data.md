# Searching by UPC in Product Data

## How to Search for a Product With UPC

One of the more common use cases we see is customers **searching for products by `UPC`**. You can do this in the Portal or with our API. Let's review both use cases.

> 📘 What if my value is not for sure a UPC?
>
> No worries! We have the GTINs field for any value that you think is a UPC, but could be an EAN, ISBN, UPC, UPCa, or UPCe. You can replace `upc` in the above query with `gtins`  and still get the same result. [Learn more about GTINs.](https://en.wikipedia.org/wiki/Global_Trade_Item_Number)

## 1. Searching by UPC via Filter Builder

Let's take this UPC `190403225817`, which is for an iPhone X, as our example.

If you know that what you're using is a UPC, you can just use the UPC field and plug in this value, like this:

```json
upc:190403225817
```

## 2. Searching by UPC via API Tab

You can copy and paste the query from the `JSON` tab above into a new browser window or tab and it'll show you the same product.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ecbee46-image.png",
        null,
        "Here we can see the \"Records Preview\" returning your product"
      ],
      "align": "center",
      "caption": "Here we can see the \"Records Preview\" returning your UPC matched product"
    }
  ]
}
[/block]
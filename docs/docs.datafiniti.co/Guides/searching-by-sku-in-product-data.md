# Searching by SKU in Product Data

## How to Search for a Product With SKU

One of the more common use cases we see is customers **searching for products by `SKU`**. You can do this in the Portal or with our API. Let's review both use cases.

> 📘 What if my value is not for sure a SKU?
>
> No worries! We have the GTINs field for any value that you think is a SKU, but could be an EAN, ISBN, UPC, UPCa, or UPCe. You can replace `SKU` in the above query with `gtins`  and still get the same result. [Learn more about GTINs.](https://en.wikipedia.org/wiki/Global_Trade_Item_Number)

## 1. Searching by SKU via Filter Builder

Let's take this SKU`190403225817`, which is for an Samsung Galaxy Fold, as our example.

If you know that what you're using is a SKU, you can just use the SKU field and plug in this value, like this:

```json
skus:6390468 
```

## 2. Searching by SKU via API Tab

You can copy and paste the query from the `JSON` tab above into a new browser window or tab and it'll show you the same product.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b39eb07-image.png",
        null,
        null
      ],
      "caption": "Here we can see the \"Records Preview\" returning your SKU matched product"
    }
  ]
}
[/block]
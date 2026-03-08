# Available Views for Product Data

The `view` parameter in the API determines which fields are returned by your data request and the order in which they're shown.  It also determines if multi-valued fields will flatten or expand their individual elements into multiple entries.

Note that each `view` is available in either `json` or `csv` format.  The `format` parameter you use will determine which one is used.

Available views for product data:

* [products\_all](https://docs.datafiniti.co/docs/products_all)
* [products\_keysSourceURLs](https://docs.datafiniti.co/docs/products_keyssourceurls)
* [products\_multiValuedFieldsNested](https://docs.datafiniti.co/docs/products_multivaluedfieldsnested)
* [products\_pricesFlat](https://docs.datafiniti.co/docs/products_pricesflat)
* [products\_reviewsFlat](https://docs.datafiniti.co/docs/products_reviewsflat)
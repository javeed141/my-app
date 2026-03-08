# Search sites for commercial development

# Introduction

Many customers use Datafiniti Property Data to provide commercial real estate insight and analysis. In many of these cases, they're trying to help their own customers find appropriate sites for developing or investing in commercial properties.

## Search for commercial properties

Here's how to run a broad search for commercial properties:

![](https://files.readme.io/db4b1a0-image.png)

You may want to expand what you consider "commercial" spaces to include industrial and retail properties. To do so, we will need to add a filter in the "all filters" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/417083a-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "7000px"
    }
  ]
}
[/block]

Lastly by adding the `mostRecentStatus` field, selecting For Sale, we can match properties that were recently put up for sale. We can adjust the *most recent status date* range each time we run this query.

![](https://files.readme.io/831b250-image.png)

With this you now have the baseline amount of commercial properties currently for sale in the US.

> 📘 Modifying the query
>
> From here you can filter based on your city, postal code, or province.

## Adding a require to view who the property is managed by

Let say now you have a query where you are using the base line query above plus looking in Nashville, TN. But you want to know who the property is managed by. You can set the `manageBy` field to be required in all records search. So that you only return records with that field populated.

![](https://files.readme.io/c3c071a-image.png)

Now you can view this date in your json view to see who the property is managed by.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5b8af93-managedby1.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

## Example files

Here are example bulk download files of our previous query:

* [Commercial Property CSV](https://drive.google.com/file/d/17WRTXyFSsOQpkySGo4Oi4dEXOlg-zQ1T/view)
* [Commercial Property JSON](https://drive.google.com/file/d/17WRTXyFSsOQpkySGo4Oi4dEXOlg-zQ1T/view)

# Conclusion

With the knowledge of how to pull records with new commercial property, you can use this data to build comparison reports, analyze trends, or predict commercial property value.
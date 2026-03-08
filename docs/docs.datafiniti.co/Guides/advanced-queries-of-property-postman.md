# Advanced Queries of Property Data in Postman

This will walk you through querying the Property Database using Postman!

## 1. Select the Property Database

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3d5a5f8-1.jpg",
        "1.jpg",
        2560
      ],
      "align": "center",
      "caption": "Click on \"Search Property Data\" to get started."
    }
  ]
}
[/block]

## 2. Setting the Stage

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1ffc2eb-2.jpg",
        "2.jpg",
        2560
      ],
      "align": "center",
      "caption": "Click on the \"Body\" tab and make sure you have \"Raw\" selected and that your text is set to \"JSON(application/JSON)\"."
    }
  ]
}
[/block]

## 3. Running a Query

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/cf2aaa5-3.jpg",
        "3.jpg",
        2560
      ],
      "align": "center",
      "caption": "The \"Body\" window will have 2 fields in it already. Hitting \"Send\" will query the Property Database for all records with a `key`."
    }
  ]
}
[/block]

> 📘 The "Wild Card"
>
> Using **\*** in your query will search for any possible value that could fill that spot. In the above case, it is essentially saying "Find all records that have a key value set to anything"

You can query the database using most of the fields in the [Property Data Schema](https://docs.datafiniti.co/docs/property-data-schema).

## 4. Narrowing The Search

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/58eaeeb-4.jpg",
        "4.jpg",
        2560
      ],
      "align": "center",
      "caption": "You can search with different fields together inside the `\" \"` of your query string using `AND` or `OR`. The `( )` tells the API to process both values--trulia.com and movoto.com--as the `sourceURLs` of the record. Because they are connected with `OR`, we will see records that have one or the other. Had we used `AND`, only records with both `sourceURLs` would be shown."
    }
  ]
}
[/block]

## 5. Using "" Inside the Query String

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/52de5e9-5.jpg",
        "5.jpg",
        2560
      ],
      "align": "center",
      "caption": "To refine your query more, you may want to search for a specific word and not allow for any variations on it. To do that, you put it inside quotes. However, because you are already inside the main quotes of your string, you need to escape the new quotes by adding `\\` in front of each `\"` inside the main quotation marks. See the treatment of `\\\"For Sale\\\"` value in the above example for clarification."
    }
  ]
}
[/block]

## 6. Additional Specifications

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/da92c3f-6.jpg",
        "6.jpg",
        2560
      ],
      "align": "center",
      "caption": "In addition to the `\"query\"` and `\"num_records\"`, there are other values you can specify in the body text. You can set `\"download\"` to either be `true` or `false`, `\"format\"` to either be `\"CSV\"` or `\"JSON\"`, and you can call any `\"view\"` you have saved to your account."
    }
  ]
}
[/block]

> 📘 View
>
> Setting your `"view"` not only changes the layout of your result file, but also changes how you see the records in Postman.

## 7. Custom Views on the Fly

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/496ee3c-7.jpg",
        "7.jpg",
        2560
      ],
      "align": "center",
      "caption": "If you'd like to create a custom view that you don't want to save, you can customize it inside the `\"view\"` field before running your query!"
    }
  ]
}
[/block]

> 📘 Custom View Formatting
>
> When creating the `"view"` object, put the entire thing inside of `[ ]`, with each field being called inside of `{ }`. If you are listing multiple fields, put a comma after each one except for the last one. See the screenshot above for an example.

## 8. Getting Your Download ID

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dd71f9c-8.jpg",
        "8.jpg",
        2560
      ],
      "align": "center",
      "caption": "When you send the request with a `\"download\": true` it will start downloading your files. You will need your `download ID to access` them, which you can find here."
    }
  ]
}
[/block]
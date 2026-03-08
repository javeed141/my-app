# Searching by Address in Property

## Searching by Address in the Portal

Using the techniques discussed in the [Property Data Features](https://docs.datafiniti.co/docs/property-data-features) tutorial, we can take the above query and translate it into a URL request on the portal.

```json
{
    "query": "address:\"9611 Hamadryas Dr\" AND province:TX AND (city:Austin OR postalCode:78744)",
    "num_records":10
}
```

<br>

You can copy and paste the address from the `Json` tab above into a new browser window or tab and it'll autocomplete to the same property. In order for the browser to understand it, it'll convert the query into HTML, like on the HTML tab.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/205266f-yuccaauto.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

> 📘 Property and Business Data
>
> While this walkthrough has been using the Property database, you can do the exact same things with the Business database as well.

<br>

## Searching by postal code

Using the same example address lets search using the postal code. You can type `78744` in the basic Address search bar on the property data page:

![](https://files.readme.io/f5f6944-image.png)

## Searching by city

Using the same example city lets search using the city as a search target. You can type `Austin` in the basic Address search bar on the property data page:

![](https://files.readme.io/e0be95e-image.png)
# People Data

## People Data from the Portal

Here you'll find a step-by-step walkthroughs for maximizing Datafiniti's People Data and API to fulfill your data needs. Let's get started!

## Navigating to People Data

Once you log into your account, this will bring you to the Datafiniti Dashboard. From there you can use the left Navigation Bar to select searching different data types. In this case select "People Data"

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4c6453a8c35987143b46fd1de63948f8677080b83755c69ded8b381352c2f9c1-Datafiniti-Portal-People-10-31-2024_12_00_PM.png",
        "DFPPeopleDash.png",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

Once you click "People Data" you will be brought to Datafiniti's People Data "Filter Builder"

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a0c922c46e12dc9e5863e999ceab33ae295493b37589cdb121240f6a8f18281f-Datafiniti-Portal-People-10-31-2024_12_00_PM.png",
        "PeoplePage.png",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

## People Data Filter Builder

The Datafiniti Filter Builder is a GUI that allow you to compose API queries will relative ease. These filter fields are based off of our Datafiniti People schema. For more information on what each filter field you can refer [here](https://developer.datafiniti.co/docs/people-data-schema). You can use the following steps to add a filter to your query.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e07326ccd29ea9a5ae2070d7df9c6a6b7e007bd9c7900437ca3526ec5b64049e-peopleDataFilter.png",
        null,
        "You can add a filter by clicking 1) `add filter` 2) selecting the field you would like to add."
      ],
      "align": "center",
      "caption": "You can add a filter by clicking 1) `all filters` 2) selecting the fields you would like to add."
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8cac392c1341523936cd82e9eff999b2282fa60776cfa38f5beaec64f462c38f-peopleDataFilterSelected.png",
        "PeopleDropdown.png",
        2223
      ],
      "align": "center",
      "caption": "3. Once the filters are selected you may need to either select a value from a auto-correct list, select a date, or fill in the blank"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/cbb504ebd48c1514dd21f41727603a4c5a96418f2cffb0cfc04e51062e4520c1-Peopleselected.gif",
        "peopleFilterFill.png",
        2256
      ],
      "align": "center",
      "caption": "4. Lastly if the filter does not automatically get added to the query, then simply click the \"Apply Filter\"."
    }
  ]
}
[/block]

> 🚧 Credits spent on a search
>
> Please note that people data search consume credits upon the search via the filter builder. The credits spent is equal to the "Total available matches" number found.

## Starting a Download

You can download your people data in two different formats. (csv OR json). By clicking the `download` button, this will display a download panel. You can select the amount of records you wish to download in the `Records to download` box. Be sure to select either CSV or JSON as your format file. Once ready, you can click the `Start download` button in the top right. You will be shown your `download complete` once the download is done.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/630750920cee71a3cc70822576c399609e202b09b3f0e9923b00c688e611d130-PeoplesDownload.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

## People Data API Builder

You can also select the `View API Call` tab to build a People search query similar to the our API reference guide would allow you to build. You can reference the [API reference guide](https://developer.datafiniti.co/docs/constructing-people-queries) on how to build a query. In most cases you can copy and paste your API search query into the People Data API Builder and click `Search`

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fa6771eca30da634c825ec267da37f530d0c497c94fc6a452280b645f9c5b478-PeopleAPIcode.gif",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

For help and tip on more complex querying techniques, you can find out more [here](https://support.datafiniti.co/docs/portal-advanced-querying).
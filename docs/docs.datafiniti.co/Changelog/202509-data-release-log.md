# 2025.09 - Data Release Log

# Summary

We’re excited to bring you several new updates this month that make your commercial property data more transparent, structured, and easier to use.

<br />

# Property Data

## 34 New Commercial Top Level Fields

We’ve upgraded how commercial property listings are structured by moving several key fields from the features array to top-level schema fields. This means easier filtering, querying, and analysis across a wide range of investment and leasing metrics.

New property fields include:

[block:parameters]
{
  "data": {
    "h-0": "Features keys converted to new Fields",
    "0-0": "brandTenant  \nbrokerCoop  \nbuildingClass  \ndateOnMarket  \ndaysOnMarket  \neffectiveGrossIncome  \ngrossRentalIncome  \ngroundLease  \ninvestmentSubtype  \ninvestmentType  \nleaseType  \nmajorTenants  \nnetRentable  \nnetOperatingIncome  \nnumBuildings  \nnumProperties  \nnumTenants  \noccupancy  \noperatingExpenses  \notherIncome  \nownership  \nproFormaNOI  \nrentableSquareFeet  \nrentBumps  \nsaleCondition  \nsaleType  \nsourceURLsPerField  \nsubtype  \ntenancy  \ntenantCredit  \ntotalExpenses  \nvacancyLoss  \nvirtualTour  \nyearRenovated"
  },
  "cols": 1,
  "rows": 1,
  "align": [
    "left"
  ]
}
[/block]

<br />

## Source URLs Per Field

We’re introducing a new **sourceURLsPerField** array to the top-level schema.\
This addition lets you see exactly which URLs were used to populate individual fields within a record.\
This new field will have the following sub-fields:

* field – the field name (e.g., capRate)
* sourceURLs – an array of URLs where that field’s data came from

### Example:

```json
{  
  "sourceURLsPerField": \[  
    {  
      "field": "capRate",  
      "sourceURLs": [  
        "crexi.com/1234",  
        "loopnet.com/jdjkdf"  
      ]  
    },  
    {  
      "field": "netOperatingIncome",  
      "sourceURLs": [  
        "crexi.com/1234",  
        "loopnet.com/jdjkdf"  
      ]  
    }  
  ]  
}
```

How this works:\
Our process will populate sourceURLsPerField only when the record has more than a single sourceURL for the entire record, ensuring reliable attribution.

# Business Data: New State Source Added

We’ve added a new state-level data source to improve business coverage in the following area:

* Alabama - arc-sos.state.al.us
* Arizona - ecorp.azcc.gov
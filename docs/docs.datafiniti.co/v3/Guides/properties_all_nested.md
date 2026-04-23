# properties_all_nested

The `properties_all_nested` view will display all available fields in our [Property Data Schema](https://docs.datafiniti.co/docs/property-data-schema).

If using the `csv` format, it will keep all elements in multi-valued field lists in a single cell.  This means a field like `reviews` will show up as a nested JSON object within the CSV.

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
    "0-0": "`address`",
    "1-0": "`availableDates`",
    "2-0": "`brokers`",
    "3-0": "`buildingName`",
    "4-0": "`city`",
    "5-0": "`country`",
    "6-0": "`dateAdded`",
    "7-0": "`dateUpdated`",
    "8-0": "`deposits`",
    "9-0": "`descriptions`",
    "10-0": "`features`",
    "11-0": "`fees`",
    "12-0": "`floorSizeValue`",
    "13-0": "`floorSizeUnit`",
    "14-0": "`hours`",
    "15-0": "`imageURLs`",
    "16-0": "`keys`",
    "17-0": "`languagesSpoken`",
    "18-0": "`latitude`",
    "19-0": "`leasingTerms`",
    "20-0": "`listingName`",
    "21-0": "`longitude`",
    "22-0": "`lotSizeValue`",
    "23-0": "`lotSizeUnit`",
    "24-0": "`managedBy`",
    "25-0": "`mlsNumber`",
    "26-0": "`nearbySchools`",
    "27-0": "`neighborhoods`",
    "h-1": "Included Sub-fields",
    "7-1": "N/A",
    "10-1": "`key`\n`value`",
    "17-1": "N/A",
    "19-1": "`dateSeen`\n`sourceURLs`\n`value`",
    "20-1": "N/A",
    "22-1": "N/A",
    "0-1": "N/A",
    "1-1": "`dateSeen`\n`endDate`\n`sourceURLs`\n`startDate`",
    "2-1": "`agent`\n`company`\n`dateSeen`\n`emails`\n`phones`\n`websites`",
    "3-1": "N/A",
    "4-1": "N/A",
    "5-1": "N/A",
    "6-1": "N/A",
    "8-1": "`amount`\n`currency`\n`dateSeen`\n`sourceURLs`",
    "9-1": "`dateSeen`\n`sourceURLs`\n`value`",
    "11-1": "`amountMax`\n`amountMin`\n`currency`\n`dateSeen`\n`sourceURLs`\n`type`",
    "12-1": "N/A",
    "13-1": "N/A",
    "14-1": "`day`\n`hour`",
    "15-1": "N/A",
    "16-1": "N/A",
    "18-1": "N/A",
    "21-1": "N/A",
    "23-1": "N/A",
    "24-1": "`dateSeen`\n`sourceURLs`\n`value`",
    "25-1": "N/A",
    "26-1": "`assigned`\n`address`\n`city`\n`country`\n`dateSeen`\n`distanceValue`\n`distanceUnit`\n`faxes`\n`gradeLevels`\n`name`\n`phones`\n`postalCode`\n`province`\n`sourceURLs`",
    "27-1": "N/A",
    "28-0": "`numBathroom`",
    "29-0": "`numBedroom`",
    "30-0": "`numFloor`",
    "31-0": "`numPeople`",
    "32-0": "`numRoom`",
    "33-0": "`numUnit`",
    "34-0": "`parking`",
    "35-0": "`paymentTypes`",
    "36-0": "`people`",
    "37-0": "`petPolicy`",
    "38-0": "`phones`",
    "39-0": "`postalCode`",
    "40-0": "`prices`",
    "41-0": "`propertyTaxes`",
    "42-0": "`propertyType`",
    "43-0": "`province`",
    "44-0": "`reviews`",
    "45-0": "`rules`",
    "46-0": "`sourceURLs`",
    "47-0": "`statuses`",
    "48-0": "`taxID`",
    "49-0": "`unavailableDates`",
    "50-0": "`websiteIDs`",
    "28-1": "N/A",
    "29-1": "N/A",
    "30-1": "N/A",
    "31-1": "N/A",
    "32-1": "N/A",
    "33-1": "N/A",
    "34-1": "N/A",
    "35-1": "N/A",
    "36-1": "`dateSeen`\n`email`\n`name`\n`phone`\n`title`",
    "37-1": "N/A",
    "38-1": "N/A",
    "39-1": "N/A",
    "40-1": "`amountMin`\n`amountMax`\n`availability`\n`comment`\n`currency`\n`date`\n`dateAdded`\n`dateSeen`\n`dateValidStart`\n`dateValidEnd`\n`isSale`\n`minStay`\n`period`\n`pricePerSquareFoot`\n`sourceURLs`",
    "41-1": "`amount`\n`currency`\n`dateSeen`\n`sourceURLs`",
    "42-1": "N/A",
    "43-1": "N/A",
    "44-1": "`date`\n`dateAdded`\n`dateSeen`\n`doRecommend`\n`rating`\n`sourceURLs`\n`text`\n`title`\n`userCity`\n`username`\n`userProvince`",
    "45-1": "N/A",
    "46-1": "N/A",
    "47-1": "`dateSeen`\n`isUnderContract`\n`sourceURLs`\n`type`",
    "48-1": "N/A",
    "49-1": "`dateSeen`\n`endDate`\n`sourceURLs`\n`startDate`",
    "50-1": "N/A"
  },
  "cols": 2,
  "rows": 51
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Sample CSV Output"
}
[/block]

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [properties\_all-CSV-example.csv]()

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
      "code": "",
      "language": "json"
    }
  ]
}
[/block]
# Default view

The default view will display all available fields in the [People Data Schema](https://docs.datafiniti.co/docs/people-data-schema).  This view will be used if you don't set the `view`.

## Included Fields

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "0-0": "`address`",
    "4-0": "`businessName`",
    "5-0": "`city`",
    "6-0": "`country`",
    "7-0": "`dateAdded`",
    "8-0": "`dateUpdated`",
    "10-0": "`emails`",
    "11-0": "`firstName`",
    "18-0": "`keys`",
    "20-0": "`lastName`",
    "21-0": "`numEmployeesMin`",
    "22-0": "`numEmployeesMax`",
    "23-0": "`phones`",
    "28-0": "`province`",
    "29-0": "`sourceURLs`",
    "h-1": "Included Sub-fields",
    "10-1": "N/A",
    "20-1": "N/A",
    "28-1": "N/A",
    "29-1": "N/A",
    "0-1": "N/A",
    "4-1": "N/A",
    "5-1": "N/A",
    "6-1": "N/A",
    "7-1": "N/A",
    "8-1": "N/A",
    "11-1": "N/A",
    "18-1": "N/A",
    "21-1": "N/A",
    "22-1": "N/A",
    "23-1": "N/A",
    "14-0": "`jobFunction`",
    "15-0": "`jobLevel`",
    "14-1": "N/A",
    "15-1": "N/A",
    "17-0": "`jobTitle`",
    "17-1": "N/A",
    "19-0": "`linkedinURL`",
    "19-1": "N/A",
    "3-0": "`businessCategories`",
    "3-1": "N/A",
    "9-0": "`domains`",
    "9-1": "N/A",
    "1-0": "`birthDate`",
    "2-0": "`birthYear`",
    "1-1": "N/A",
    "2-1": "N/A",
    "12-0": "`gender`",
    "12-1": "N/A",
    "16-0": "`jobSkills`",
    "16-1": "N/A",
    "25-0": "`personalEmails`",
    "25-1": "N/A",
    "26-0": "`primaryEmail`",
    "26-1": "N/A",
    "27-0": "`professionalEmails`",
    "27-1": "N/A",
    "24-0": "`postalCode`",
    "24-1": "N/A",
    "13-0": "`interests`",
    "13-1": "N/A"
  },
  "cols": 2,
  "rows": 30
}
[/block]

## Sample CSV Output

Right-click and choose "Save link as..." to download this sample so you can see it in Excel: [people\_all-CSV-example.csv](https://raw.githubusercontent.com/datafiniti/SampleData/master/300_1.csv)

## Sample JSON Output

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"address\": \"9855 Melbourne Ave\",\n  \"businessName\": \"MICHIGAN MARKETING EXTREME LLC\",\n  \"city\": \"Allen Park\",\n  \"country\": \"US\",\n  \"dateAdded\": \"2018-02-20T00:33:45Z\",\n  \"dateUpdated\": \"2018-02-20T00:33:45Z\",\n  \"emails\": [\n    \"billmey@michiganmarketingextreme.com\"\n  ],\n  \"firstName\": \"Bill\",\n  \"keys\": [\n    \"billmeymichiganmarketingextremecom\"\n  ],\n  \"lastName\": \"Mey\",\n  \"jobFunction\": \"Business Management\",\n  \"jobLevel\": \"C-Team\",\n  \"jobTitle\": \"CEO\",\n  \"numEmployeesMin\": 1,\n  \"numEmployeesMax\": 19,\n  \"phones\": [\n    \"7346190715\"\n  ],\n  \"postalCode\": \"48101\",\n  \"province\": \"MI\",\n  \"sourceURLs\": [\n    \"https://datafiniti.co\"\n  ],\n  \"id\": \"AWG2azB1QH9dEUBnfEki\"\n}",
      "language": "json"
    }
  ]
}
[/block]
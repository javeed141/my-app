# businesses_basic

The `businesses_basic` view returns a reduced set of fields from our [business schema](https://datafiniti-api.readme.io/v3/docs/business-data-schema).

If using the `csv` format, it will keep all elements in multi-valued field lists in a single cell.  This means a field like `websites` will show up as a nested JSON object within the CSV.

[block:parameters]
{
  "data": {
    "h-0": "Field Name",
    "h-1": "Included Sub-Fields",
    "h-2": "Description",
    "0-0": "`address`",
    "0-1": "N/A",
    "0-2": "The physical street address for this business location.",
    "1-0": "`city`",
    "1-1": "N/A",
    "5-0": "`longitude`",
    "5-1": "N/A",
    "6-0": "`name`",
    "6-1": "N/A",
    "9-0": "`sourceURLs`",
    "9-1": "N/A",
    "1-2": "The city of this business location.",
    "5-2": "The longitude coordinates for this business location.",
    "6-2": "The business location's name.",
    "10-0": "`websites`",
    "10-1": "N/A",
    "9-2": "A list of URLs used to generate data for this business location.",
    "10-2": "A list of websites for the business.",
    "2-0": "`country`",
    "2-1": "N/A",
    "4-0": "`latitude`",
    "4-1": "N/A",
    "3-0": "`keys`",
    "3-1": "N/A",
    "3-2": "A list of internal Datafiniti identifiers for this business.  The `keys` field is used to merge raw data from individual sources into the master Datafiniti record.  [Learn more about how this works](https://datafiniti.co).",
    "7-0": "`postalCode`",
    "7-1": "N/A",
    "4-2": "The latitude coordinates for this business location.",
    "2-2": "The two-letter country code for the business location's country.",
    "7-2": "The postal or zip code of the business' location.",
    "8-0": "`province`",
    "8-1": "N/A",
    "8-2": "The province or state for this business location."
  },
  "cols": 2,
  "rows": 11
}
[/block]
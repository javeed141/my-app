# People Field Type Breakdown

[block:parameters]
{
  "data": {
    "h-0": "Type",
    "0-0": "`boolean`",
    "h-1": "Search & Database Handling",
    "0-1": "Field is representation of true or false.  Queries only respond to `true` or `false`.",
    "2-0": "`domain`",
    "2-1": "Field's format is broken up into various combinations of domains and subdomains, in lowercase.  Queries are performed as-is.",
    "4-0": "`geo_shape`",
    "5-0": "`integer`",
    "7-0": "`nested`",
    "8-0": "`taxonomy`",
    "9-0": "`text`",
    "9-1": "Field is broken up into unique important words.  Unless specified otherwise, queries are handled in the same way. Queries are NOT case-sensitive",
    "1-0": "`date`",
    "8-1": "Field is broken into values separated `>` and stored as lowercase.  Queries are NOT case-sensitive and are broken into unique important words unless otherwise specified.",
    "3-0": "`float` or `double`",
    "6-0": "`keyword`",
    "6-1": "Field is preserved as-is.  Queries are handled in the same way.  Queries are case-sensitive.",
    "10-0": "`url` [deprecated]",
    "10-1": "Field is saved as an entire URL and also broken into domain and subdomain.  Queries are NOT case-sensitive and is preserved as-is.",
    "1-1": "Field is stored as a date in a specific format.  Queries must be performed in range format `[value1 TO value2]`.",
    "3-1": "Field is a number representation with decimals.  Queries can only be on specific number values.",
    "4-1": "Field is represented as geo location.  Queries are performed in geo formatting.",
    "5-1": "Field is a whole number representation.  Queries can only be on specific number values.",
    "7-1": "Field is an array of nested objects.  Queries can only be done for existence or on nested fields which correspond to their respected type."
  },
  "cols": 2,
  "rows": 11
}
[/block]
# Schemas

Validate your specifications.

Schemas are used to determine structure and validation of [Specs](https://autocode.readme.io/docs/specs).

They are written in YAML and uses JSON Schema Draft 4.

## Export a Schema

To create a Schema, go to **Exports** and click **Add Export**:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9tLINqSQ5KDmDtuTdEbW_Screen%20Shot%202015-12-15%20at%2012.40.28%20AM.png",
        "Screen Shot 2015-12-15 at 12.40.28 AM.png",
        "2560",
        "1600",
        "#8a4630",
        ""
      ]
    }
  ]
}
[/block]

Enter a **Name** and **Description** and choose "Schema" as the **Type**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/YCGuVkTpWEEWceFe7eAQ_Screen%20Shot%202015-12-15%20at%2012.43.08%20AM.png",
        "Screen Shot 2015-12-15 at 12.43.08 AM.png",
        "2560",
        "1600",
        "#5275bf",
        ""
      ]
    }
  ]
}
[/block]

Then enter a schema you'd like to use. Here is an example for a blog:

[block:code]
{
  "codes": [
    {
      "code": "type: object\nproperties:\n  models:\n    posts:\n      attributes:\n        publishedAt:\n          type: date\n    users:\n      attributes:\n        email:\n          required: true\n          type: string\n        username:\n          required: true\n          type: string",
      "language": "yaml"
    }
  ]
}
[/block]

## Example

Here is what a schema looks like:

[block:code]
{
  "codes": [
    {
      "code": "type: object\nproperties:\n  name:\n    required: true\n  \ttype: string",
      "language": "yaml"
    }
  ]
}
[/block]
# Processors

Prepares specifications for schematics.

[block:callout]
{
  "type": "info",
  "body": "Since Processors interact directly with Crystal, they must be written in JavaScript and/or CoffeeScript."
}
[/block]

Processors update Specifications to meet the requirements of Schematics.

This allows more control and flexibility of your input. Some examples include:

* manipulating data to add/remove data from a Specification
* adding contents from a file to a Specification

[block:api-header]
{
  "type": "basic",
  "title": "Examples"
}
[/block]

In this example, a Schematic for routes expects an object of objects. Each object has a key which is used as the filename of each route. If an object doesn't have a URI value, it uses the key/name as the URI:

[block:code]
{
  "codes": [
    {
      "code": "module.exports = function(val) {\n  for (var name in val) {\n    if (!val[name].uri) {\n      val[name].uri = '/' + name;\n    }\n  }\n  return val;\n};",
      "language": "javascript",
      "name": "processor.js"
    }
  ]
}
[/block]
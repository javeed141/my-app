# Helpers

Helpers help Engines do more.

[block:callout]
{
  "type": "info",
  "body": "Since Helpers interact directly with Crystal, they must be written in JavaScript and/or CoffeeScript."
}
[/block]

Helpers add logic to Engines such as:

* capitalizing, pluralizing and singularizing text
* adding conditions for showing/hiding blocks of text

Many template engines already use helpers, so this concept might be familiar to you.

[block:api-header]
{
  "type": "basic",
  "title": "Examples"
}
[/block]

Here is a simple example of changing the case of text:

[block:code]
{
  "codes": [
    {
      "code": "var changechase = require('change-case');\n\nmodule.exports = function(value, args) {\n  return changechase[args[0]](value);\n};",
      "language": "javascript",
      "name": "helper.js"
    }
  ]
}
[/block]
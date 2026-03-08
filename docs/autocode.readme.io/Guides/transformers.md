# Transformers

Transforms output before rendering.

[block:callout]
{
  "type": "info",
  "body": "Since Transformers interact directly with Crystal, they must be written in JavaScript and/or CoffeeScript."
}
[/block]

Transformers take the output from Generators and transforms it.

Some use cases include:

* converting from one format to another (i.e CoffeeScript to JavaScript, JSON to XML, etc.)
* beautifying output

[block:api-header]
{
  "type": "basic",
  "title": "Examples"
}
[/block]

Here is a simple example of a Transformer that transforms CoffeeScript to JavaScript:

[block:code]
{
  "codes": [
    {
      "code": "var coffeescript = require('coffee-script');\n\nmodule.exports = function(cs) {\n  var js = coffeescript.compile(cs, { bare: true });\n  return js;\n};",
      "language": "javascript",
      "name": "transformer.js"
    }
  ]
}
[/block]
# Engines

Template + Data = Engines

[block:callout]
{
  "type": "info",
  "body": "Since Engines interact directly with Crystal, they must be written in JavaScript and/or CoffeeScript."
}
[/block]

Engines (or "template engines") apply data to templates.

[block:api-header]
{
  "type": "basic",
  "title": "Examples"
}
[/block]

Here is a simple example using [Mustache](https://mustache.github.io):

[block:code]
{
  "codes": [
    {
      "code": "var handlebars = require('handlebars');\n\nmodule.exports = function(data, template) {\n  var output = handlebars.compile(template)(data);\n  return output;\n};",
      "language": "javascript",
      "name": "engine.js"
    },
    {
      "code": "# {{{name}}} v{{{version}}}\n\n{{{description}}}",
      "language": "handlebars",
      "name": "template.m"
    }
  ]
}
[/block]

Here is a simple example using [Jade](http://jade-lang.com):

[block:code]
{
  "codes": [
    {
      "code": "var jade = require('jade');\n\nmodule.exports = function(data, template) {\n  var fn = jade.compile(template);\n  var output = fn(data);\n  return output;\n};",
      "language": "javascript",
      "name": "engine.js"
    },
    {
      "code": "h1\n  | Maintainer:\n  = ' ' + maintainer.name\ntable\n  tr\n    td Twitter\n    td= maintainer.twitter\n  tr\n    td Blog\n    td= maintainer.blog",
      "language": "haxe",
      "name": "template.jade"
    }
  ]
}
[/block]
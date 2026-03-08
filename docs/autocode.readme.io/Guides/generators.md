# Generators

Generators generate code.

[block:api-header]
{
  "type": "basic",
  "title": "Examples"
}
[/block]

This generator is static, meaning it does not accept any input. The output file `README.md` will always be the same as the template `template.hbs`:

[block:code]
{
  "codes": [
    {
      "code": "outputs:\n  - generator:\n      filename: README.md\n      template: template.hbs",
      "language": "yaml",
      "name": "config.yml"
    },
    {
      "code": "# Hello, world!\n\nHow are you today?",
      "language": "text",
      "name": "template.hbs"
    },
    {
      "code": "# Hello, world!\n\nHow are you today?",
      "language": "markdown",
      "name": "Output: README.md"
    }
  ]
}
[/block]

In order to accept input, add a [Schema](https://autocode.readme.io/docs/schematics) and [Engine](https://autocode.readme.io/docs/engines) to your Generator:

[block:code]
{
  "codes": [
    {
      "code": "name: My Application\ndescription: My Application is an application.\noutputs:\n  - generator:\n  \t\tengine: handlebars.js\n      filename: README.md\n      schema:\n      \ttype: object\n        properties:\n          name:\n            required: true\n            type: string\n          description:\n          \trequired: true\n            type: string\n          version:\n          \trequired: true\n            type:\n              - number\n              - string\n      template: template.hbs",
      "language": "yaml",
      "name": "config.yml"
    },
    {
      "code": "# {{{name}}} v{{{version}}}\n\n{{{description}}}",
      "language": "text",
      "name": "template.hbs"
    },
    {
      "code": "module.exports = function(data, template) {\n  template = template.replace('{{{name}}}', data.name);\n  template = template.replace('{{{version}}}', data.version);\n  template = template.replace('{{{description}}}', data.description);\n  return template;\n};",
      "language": "javascript",
      "name": "handlebars.js"
    },
    {
      "code": "# My Application v1.0.0\n\nMy Application is an application.",
      "language": "text",
      "name": "Output: README.md"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "The `handlebars.js` file in this example is meant to be a psuedo-[Handlebars.js](http://handlebarsjs.com) engine. Check out [handlebars.template](https://hub.crystal.sh/handlebars/template) for a real working Engine for Handlebars.js."
}
[/block]
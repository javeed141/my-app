# Specs

Your project's input.

Specs define how your application should work.

They are written in YAML. Their structure and validate are determined by [Schemas](https://autocode.readme.io/docs/schemas).

## Export a Spec

To create a Spec, go to **Exports** and click **Create Export**:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/HNslu2DISES396l355rd_Screen%20Shot%202015-12-15%20at%2012.03.04%20AM.png",
        "Screen Shot 2015-12-15 at 12.03.04 AM.png",
        "2560",
        "1600",
        "#8a4630",
        ""
      ]
    }
  ]
}
[/block]

Enter a **Name** and **Description** and select "Spec" as the **Type**.

## Examples

Here is an example spec for the [php.config](https://hub.crystal.sh/php/config) module which generates a `php.ini` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/php: ~0.2.1\noutputs:\n  - generator: php.ConfigGenerator\n    spec:\n      include_path: .:/usr/local/lib/php\n      register_globals: false\n      track_errors: yes",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "include_path = .:/usr/local/lib/php\nregister_globals = false\ntrack_errors = yes",
      "language": "text",
      "name": "OUTPUT: php.ini"
    }
  ]
}
[/block]

Here is an example spec for the [npm.package](https://hub.crystal.sh/npm/package) module which generates a `package.json` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/npm: ~0.2.5\noutputs:\n  - generator: npm.PackageGenerator\n    spec:\n      name: my-module\n      version: 0.1.0\n      dependencies:\n        bluebird: latest",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "{\n  \"name\": \"my-module\",\n  \"version\": \"0.1.0\",\n  \"dependencies\": {\n    \"bluebird\": \"latest\"\n  }\n}",
      "language": "json",
      "name": "OUTPUT: package.json"
    }
  ]
}
[/block]

Here is an example spec for the [bower.package](https://hub.crystal.sh/bower/package) module which generates a `bower.json` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/bower: ~0.3.5\noutputs:\n  - generator: bower.PackageGenerator\n    spec:\n      name: my-module\n      version: 0.1.0\n      dependencies:\n        jquery: latest",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "{\n  \"name\": \"my-module\",\n  \"version\": \"0.1.0\",\n  \"dependencies\": {\n    \"jquery\": \"latest\"\n  }\n}",
      "language": "json",
      "name": "OUTPUT: bower.json"
    }
  ]
}
[/block]
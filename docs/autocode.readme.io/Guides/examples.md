# Examples

Below are some examples of using Autocode:

* [JSON Stringify](#json-stringify)
* [JSON Parse](#json-parse)
* [Express.js App](#expressjs-app)
* [Bower Config: .bowerrc](#bower-config-bowerrc)
* [Bower Package: bower.json](#bower-package-bowerjson)
* [Composer Package - composer.json](#composer-package-composerjson)
* [Gruntfile](#gruntfile)
* [Laravel Models](#laravel-models)
* [PHP Config](#php-config)
* [PIP Package](#pip-package-requirementstxt)
* [README.md](#readmemd)
* [Redis Config - redis.conf](#redis-config-redisconf)
* [Sequelize Model](#sequelize-model)

[block:api-header]
{
  "type": "basic",
  "title": "JSON Stringify"
}
[/block]

Uses [json.stringify.Engine](https://hub.crystal.sh/json/stringify) to load spec as a JSON string:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/json: latest\noutputs:\n  - filename: albums.json\n    engine: json.StringifyEngine\n    spec:\n      albums:\n        - artist: Anniversary, The\n          title: Designing a Nervous Breakdown\n        - artist: Cursive\n          title: Burst and Bloom\n        - artist: Thrice\n          title: The Illusion of Safety",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "{\n\t\"albums\": [\n\t\t{\n\t\t\t\"artist\": \"Anniversary, The\",\n\t\t\t\"title\": \"Designing a Nervous Breakdown\"\n\t\t},\n\t\t{\n\t\t\t\"artist\": \"Cursive\",\n\t\t\t\"title\": \"Burst and Bloom\"\n\t\t},\n\t\t{\n\t\t\t\"artist\": \"Thrice\",\n\t\t\t\"title\": \"The Illusion of Safety\"\n\t\t}\n\t]\n}",
      "language": "json",
      "name": "OUTPUT: albums.json"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "JSON Parse"
}
[/block]

Uses [json.parse.Processor](https://hub.crystal.sh/json/parse) to process a spec as a JSON object:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/json: latest\noutputs:\n  - filename: albums.json\n    engine: json.StringifyEngine\n    processor: json.ParseProcessor\n    spec:\n      albums:\n        $processor: json\n        $value: [{\"artist\":\"Anniversary, The\",\"title\":\"Designing a Nervous Breakdown\"},{\"artist\":\"Cursive\",\"title\":\"Burst and Bloom\"},{\"artist\":\"Thrice\",\"title\":\"The Illusion of Safety\"}]",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "{\n\t\"albums\": [\n\t\t{\n\t\t\t\"artist\": \"Anniversary, The\",\n\t\t\t\"title\": \"Designing a Nervous Breakdown\"\n\t\t},\n\t\t{\n\t\t\t\"artist\": \"Cursive\",\n\t\t\t\"title\": \"Burst and Bloom\"\n\t\t},\n\t\t{\n\t\t\t\"artist\": \"Thrice\",\n\t\t\t\"title\": \"The Illusion of Safety\"\n\t\t}\n\t]\n}",
      "language": "json",
      "name": "OUTPUT: albums.json"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Express.js App"
}
[/block]

Uses [express.app.Generator](https://hub.crystal.sh/express/app) to generate an Express.js app:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/express: latest\noutputs:\n  - generator: express.AppGenerator\n    spec:\n      port: 8080",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "# load modules\nexpress       = require 'express'\npath          = require 'path'\n\n# create app\napp = express()\n\n# serve app\nconsole.log 'Serving...'\napp.listen 8080",
      "language": "coffeescript",
      "name": "OUTPUT: app.coffee"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Bower Config: .bowerrc"
}
[/block]

Uses [bower.config.Generator](https://hub.crystal.sh/bower/config) to generate a `.bowerrc` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/bower: latest\noutputs:\n  - generator: bower.ConfigGenerator\n    spec:\n      directory: app/components/\n      analytics: false\n      timeout: 120000\n      registry:\n        search:\n          - http://localhost:8000\n          - https://bower.herokuapp.com",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "{\n\t\"analytics\": false,\n\t\"directory\": \"app/components/\",\n\t\"registry\": {\n\t\t\"search\": [\n\t\t\t\"http://localhost:8000\",\n\t\t\t\"https://bower.herokuapp.com\"\n\t\t]\n\t},\n\t\"timeout\": 120000\n}",
      "language": "json",
      "name": "OUTPUT: .bowerrc"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Bower Package: bower.json"
}
[/block]

Uses [bower.package.Generator](https://hub.crystal.sh/bower/package) to generate a `bower.json` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/bower: latest\noutputs:\n  - generator: bower.PackageGenerator\n    spec:\n      name: blue-leaf\n      version: 1.2.3\n      description: Physics-like animations for pretty particles\n      main:\n        - js/motion.js\n        - sass/motion.scss\n      dependencies:\n        get-size: ~1.2.2\n        eventEmitter: ~4.2.11\n      devDependencies:\n        qunit: ~1.16.0\n      moduleType:\n        - amd\n        - globals\n        - node\n      keywords:\n        - motion\n        - physics\n        - particles\n      authors:\n        - Betty Beta <bbeta@example.com>\n      license: MIT\n      ignore:\n        - '**/.*'\n        - node_modules\n        - bower_components\n        - test\n        - tests",
      "language": "yaml",
      "name": "OUTPUT: config.yml"
    },
    {
      "code": "{\n\t\"authors\": [\n\t\t\"Betty Beta <bbeta@example.com>\"\n\t],\n\t\"dependencies\": {\n\t\t\"get-size\": \"~1.2.2\",\n\t\t\"eventEmitter\": \"~4.2.11\"\n\t},\n\t\"description\": \"Physics-like animations for pretty particles\",\n\t\"devDependencies\": {\n\t\t\"qunit\": \"~1.16.0\"\n\t},\n\t\"ignore\": [\n\t\t\"**/.*\",\n\t\t\"node_modules\",\n\t\t\"bower_components\",\n\t\t\"test\",\n\t\t\"tests\"\n\t],\n\t\"keywords\": [\n\t\t\"motion\",\n\t\t\"physics\",\n\t\t\"particles\"\n\t],\n\t\"license\": \"MIT\",\n\t\"main\": [\n\t\t\"js/motion.js\",\n\t\t\"sass/motion.scss\"\n\t],\n\t\"moduleType\": [\n\t\t\"amd\",\n\t\t\"globals\",\n\t\t\"node\"\n\t],\n\t\"name\": \"blue-leaf\",\n\t\"version\": \"1.2.3\"\n}",
      "language": "json",
      "name": "INPUT: bower.json"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Composer Package - composer.json"
}
[/block]

Uses [composer.package.Generator](https://hub.crystal.sh/composer/package) to generate a `composer.json` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/composer: latest\noutputs:\n  - generator: composer.PackageGenerator\n    spec:\n      name: test\n      description: test\n      require:\n        monolog/monolog: 1.0.*",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "{\n\t\"description\": \"test\",\n\t\"name\": \"test\",\n\t\"require\": {\n\t\t\"monolog/monolog\": \"1.0.*\"\n\t}\n}",
      "language": "json",
      "name": "OUTPUT: composer.json"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Gruntfile"
}
[/block]

Uses [grunt.file.Generator](https://hub.crystal.sh/grunt/file) to generate a `Gruntfile.js` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/git: latest\n  crystal/grunt: latest\n  crystal/npm: latest\noutputs:\n  - generator: git.GitignoreGenerator\n    spec:\n      items:\n        - node_modules/\n  - generator: grunt.GruntfileGenerator\n    spec:\n      loadNpmTasks:\n        - grunt-contrib-sass\n        - grunt-contrib-watch\n      registerTask:\n        default:\n          - sass\n      config:\n        pkg: package.json\n        sass:\n          dist:\n            files:\n              - expand: true\n                cwd: src/sass\n                src:\n                  - '**/*.scss'\n                dest: src/public/css\n                ext: .css\n            options:\n              sourcemap: none\n              style: compressed\n        watch:\n          files: src/sass/**/*.scss\n          tasks: sass\n  - generator: npm.PackageGenerator\n    spec:\n      dependencies:\n        grunt-contrib-sass: latest\n        grunt-contrib-watch: latest",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "module.exports = function(grunt) {\n\n    grunt.initConfig({\n        \"pkg\": \"package.json\",\n        \"sass\": {\n            \"dist\": {\n                \"files\": [{\n                    \"expand\": true,\n                    \"cwd\": \"src/sass\",\n                    \"src\": [\n                        \"**/*.scss\"\n                    ],\n                    \"dest\": \"src/public/css\",\n                    \"ext\": \".css\"\n                }],\n                \"options\": {\n                    \"sourcemap\": \"none\",\n                    \"style\": \"compressed\"\n                }\n            }\n        },\n        \"watch\": {\n            \"files\": \"src/sass/**/*.scss\",\n            \"tasks\": \"sass\"\n        }\n    });\n\n    grunt.loadNpmTasks('grunt-contrib-sass');\n    grunt.loadNpmTasks('grunt-contrib-watch');\n\n    grunt.registerTask('default', ['sass']);\n\n};",
      "language": "javascript",
      "name": "OUTPUT: Gruntfile.js"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Laravel Models"
}
[/block]

Uses [laravel.model.Generator](https://hub.crystal.sh/laravel/model) to generate models for Laravel:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/laravel: latest\noutputs:\n  - generator: laravel.ModelGenerator\n    path: model\n    spec:\n      models:\n        - name: post\n          attributes:\n            - name: content\n              required: true\n              type: string\n        - name: user\n          attributes:\n            - name: username\n              required: true\n              type: string",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "<?php\nclass Post extends Eloquent {\n}\n?>",
      "language": "php",
      "name": "OUTPUT: model/post.php"
    },
    {
      "code": "<?php\nclass User extends Eloquent {\n}\n?>",
      "language": "php",
      "name": "OUTPUT: model/user.php"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "PHP Config"
}
[/block]

Uses [php.config.Generator](https://hub.crystal.sh/php/config) to generate a `php.ini` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/php: latest\noutputs:\n  - generator: php.ConfigGenerator\n    spec:\n      register_globals: false\n      include_path: /usr/local",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "register_globals=false\ninclude_path=/usr/local",
      "language": "java",
      "name": "OUTPUT: php.ini"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "PIP Package - requirements.txt"
}
[/block]

Uses [pip.requirements.Generator](https://hub.crystal.sh/pip/requirements) to generate a `requirements.txt` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/pip: latest\noutputs:\n  - generator: pip.RequirementsGenerator\n    spec:\n      requirements:\n        Flask: 0.8\n        Jinja2: 2.6\n        Werkzeug: 0.8.3\n        certifi: 0.0.8\n        chardet: 1.0.1\n        distribute: 0.6.24\n        gunicorn: 0.14.2\n        requests: 0.11.1",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "Flask==0.8\nJinja2==2.6\nWerkzeug==0.8.3\ncertifi==0.0.8\nchardet==1.0.1\ndistribute==0.6.24\ngunicorn==0.14.2\nrequests==0.11.1",
      "language": "text",
      "name": "OUTPUT: requirements.txt"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "README.md"
}
[/block]

Uses [readme.md.Generator](https://hub.crystal.sh/readme/md) to generate a `README.md` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/readme: latest\noutputs:\n  - generator: readme.ReadmeGenerator\n    spec:\n      name: readme\n      version: 1.2.3\n      description: a readme test",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "# readme 1.2.3\n\na readme test",
      "language": "markdown",
      "name": "OUTPUT: README.md"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Redis Config - redis.conf"
}
[/block]

Uses [redis.config.Generator](https://hub.crystal.sh/redis/config) to generate a `redis.conf` file:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/redis: latest\noutputs:\n  - generator: redis.ConfigGenerator\n    spec:\n      daemonize: true\n      port: 6379\n      timeout: 0",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "daemonize yes\nport 6379",
      "language": "text",
      "name": "OUTPUT: redis.conf"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Sequelize Model"
}
[/block]

Uses [sequels.model.Generator](https://hub.crystal.sh/sequelize/model) to generate models for Sequelize:

[block:code]
{
  "codes": [
    {
      "code": "imports:\n  crystal/sequelize: latest\noutputs:\n  - generator: sequelize.ModelGenerator\n    path: model\n    spec:\n      models:\n        post:\n          attributes:\n            content:\n              required: true\n              type: string\n        user:\n          attributes:\n            username:\n              required: true\n              unique: true\n              type: string\n            birthday:\n              type: date",
      "language": "yaml",
      "name": "INPUT: config.yml"
    },
    {
      "code": "var Post = sequelize.define('post', {\n  content: {\n    type: mysql.STRING\n  }\n});",
      "language": "javascript",
      "name": "OUTPUT: model/post.js"
    },
    {
      "code": "var User = sequelize.define('user', {\n  username: {\n    type: mysql.STRING\n    unique: true\n  }\n  birthday: {\n    type: mysql.DATE\n  }\n});",
      "language": "javascript",
      "name": "OUTPUT: model/user.js"
    }
  ]
}
[/block]
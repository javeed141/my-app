# Get all categories

Get all categories within a section of your ReadMe project.

The sorting of this data is dependent upon the order of the categories in your sidebar.

>📘
> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "description": "Create beautiful product and API documentation with our developer friendly platform.",
    "version": "2.0.0",
    "title": "ReadMe API",
    "x-readme-deploy": "5.549.0",
    "termsOfService": "https://readme.com/tos",
    "contact": {
      "name": "API Support",
      "url": "https://docs.readme.com/main/docs/need-more-support",
      "email": "support@readme.io"
    }
  },
  "components": {
    "securitySchemes": {
      "bearer": {
        "type": "http",
        "scheme": "bearer",
        "description": "A bearer token that will be supplied within an `Authentication` header as `bearer <token>`."
      }
    }
  },
  "paths": {
    "/branches/{branch}/categories/{section}": {
      "get": {
        "operationId": "getCategories",
        "summary": "Get all categories",
        "tags": [
          "Categories"
        ],
        "description": "Get all categories within a section of your ReadMe project.\n\nThe sorting of this data is dependent upon the order of the categories in your sidebar.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "guides",
                "reference"
              ]
            },
            "in": "path",
            "name": "section",
            "required": true,
            "description": "The section of your documentation to get categories from."
          },
          {
            "schema": {
              "type": "string",
              "pattern": "(v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?"
            },
            "in": "path",
            "name": "branch",
            "required": true,
            "description": "Project version number, `stable` for your project's stable version, or a valid branch name."
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "total": {
                      "type": "number"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "type": "string",
                            "description": "The category's name."
                          },
                          "section": {
                            "type": "string",
                            "enum": [
                              "guide",
                              "reference"
                            ],
                            "default": "guide",
                            "description": "The section of your documentation where the category resides."
                          },
                          "links": {
                            "type": "object",
                            "properties": {
                              "project": {
                                "type": "string",
                                "pattern": "\\/projects\\/(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)",
                                "description": "A URI to the project that this category belongs to."
                              }
                            },
                            "required": [
                              "project"
                            ],
                            "additionalProperties": false
                          },
                          "uri": {
                            "type": "string",
                            "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/categories\\/(guides|reference)\\/((.*))",
                            "description": "A URI to the category resource."
                          }
                        },
                        "required": [
                          "title",
                          "links",
                          "uri"
                        ],
                        "additionalProperties": false
                      }
                    }
                  },
                  "required": [
                    "total",
                    "data"
                  ],
                  "additionalProperties": false
                }
              }
            }
          }
        }
      }
    }
  },
  "servers": [
    {
      "url": "https://api.readme.com/v2",
      "description": "The ReadMe API"
    }
  ],
  "security": [
    {
      "bearer": []
    }
  ],
  "x-readme": {
    "proxy-enabled": true
  },
  "tags": [
    {
      "name": "Categories"
    }
  ]
}
```
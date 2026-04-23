# Get the pages within a category

Get a pages that exist within a category in your ReadMe project.

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
    "/branches/{branch}/categories/{section}/{title}/pages": {
      "get": {
        "operationId": "getCategoryPages",
        "summary": "Get the pages within a category",
        "tags": [
          "Categories"
        ],
        "description": "Get a pages that exist within a category in your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "guides",
                "reference"
              ],
              "default": "guides"
            },
            "in": "path",
            "name": "section",
            "required": true,
            "description": "The section of your documentation where the category resides."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "title",
            "required": true,
            "description": "The category's name."
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
                          "category": {
                            "type": "object",
                            "properties": {
                              "uri": {
                                "type": "string",
                                "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/categories\\/(guides|reference)\\/((.*))",
                                "description": "A URI to the category resource."
                              }
                            },
                            "required": [
                              "uri"
                            ],
                            "additionalProperties": false
                          },
                          "parent": {
                            "type": "object",
                            "properties": {
                              "uri": {
                                "type": "string",
                                "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/(guides|reference)\\/(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)",
                                "nullable": true,
                                "description": "A URI to the parent page resource including the page ID or slug."
                              }
                            },
                            "required": [
                              "uri"
                            ],
                            "additionalProperties": false
                          },
                          "slug": {
                            "allOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "string",
                                "minLength": 1
                              }
                            ],
                            "description": "The accessible URL slug for the page."
                          },
                          "title": {
                            "type": "string"
                          },
                          "updated_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "An ISO 8601 formatted date for when the page was updated."
                          },
                          "uri": {
                            "type": "string",
                            "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/(guides|reference)\\/(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)",
                            "description": "A URI to the page resource."
                          }
                        },
                        "required": [
                          "category",
                          "parent",
                          "slug",
                          "title",
                          "updated_at",
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
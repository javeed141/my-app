# Get a recipe

Get a recipe from your ReadMe project.

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
    "/branches/{branch}/recipes/{slug}": {
      "get": {
        "operationId": "getRecipe",
        "summary": "Get a recipe",
        "tags": [
          "Recipes"
        ],
        "description": "Get a recipe from your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "pattern": "(v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?"
            },
            "in": "path",
            "name": "branch",
            "required": true,
            "description": "Project version number, `stable` for your project's stable version, or a valid branch name."
          },
          {
            "schema": {
              "type": "string",
              "pattern": "([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+"
            },
            "in": "path",
            "name": "slug",
            "required": true,
            "description": "A URL-safe representation of the resource."
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
                    "data": {
                      "type": "object",
                      "properties": {
                        "appearance": {
                          "type": "object",
                          "properties": {
                            "background_color": {
                              "type": "string",
                              "pattern": "^(?:#[0-9a-fA-F]{3}|#[0-9a-fA-F]{4}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8})$",
                              "default": "#000000",
                              "description": "The color of the recipe card."
                            },
                            "emoji": {
                              "type": "string",
                              "nullable": true,
                              "description": "The Unicode emoji to be displayed within the recipe card."
                            }
                          },
                          "required": [
                            "emoji"
                          ],
                          "additionalProperties": false
                        },
                        "connections": {
                          "type": "object",
                          "properties": {
                            "references": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "uri": {
                                    "type": "string",
                                    "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/(guides|reference)\\/(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)",
                                    "description": "URI of the API reference page that this recipe will be connected to. The API reference and recipe must exist within the same version."
                                  }
                                },
                                "required": [
                                  "uri"
                                ],
                                "additionalProperties": false
                              },
                              "nullable": true,
                              "description": "A collection of API reference pages that this recipe will be displayed on."
                            }
                          },
                          "required": [
                            "references"
                          ],
                          "additionalProperties": false
                        },
                        "content": {
                          "type": "object",
                          "properties": {
                            "steps": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "title": {
                                    "type": "string",
                                    "description": "Title of the step."
                                  },
                                  "body": {
                                    "type": "string",
                                    "nullable": true,
                                    "description": "Content of the step."
                                  },
                                  "line_numbers": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Line numbers to highlight in the code snippet. (e.g. `[\"1-5\", \"10\"])."
                                  }
                                },
                                "required": [
                                  "title",
                                  "body",
                                  "line_numbers"
                                ],
                                "additionalProperties": false
                              }
                            },
                            "snippet": {
                              "type": "object",
                              "properties": {
                                "code_options": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "code": {
                                        "type": "string",
                                        "nullable": true,
                                        "description": "Code to display for the specific language."
                                      },
                                      "language": {
                                        "type": "string",
                                        "description": "Language of the code snippet."
                                      },
                                      "name": {
                                        "type": "string",
                                        "nullable": true,
                                        "description": "Name of the code snippet."
                                      },
                                      "highlighted_syntax": {
                                        "type": "string",
                                        "description": "Actual syntax highlighter to use on the code snippet."
                                      }
                                    },
                                    "required": [
                                      "code",
                                      "language"
                                    ],
                                    "additionalProperties": false
                                  },
                                  "description": "Array of code snippets to display in the recipe."
                                }
                              },
                              "required": [
                                "code_options"
                              ],
                              "additionalProperties": false
                            },
                            "response": {
                              "type": "string",
                              "nullable": true,
                              "description": "Example response to display in the recipe."
                            }
                          },
                          "required": [
                            "steps",
                            "snippet",
                            "response"
                          ],
                          "additionalProperties": false
                        },
                        "description": {
                          "type": "string",
                          "nullable": true
                        },
                        "privacy": {
                          "type": "object",
                          "properties": {
                            "view": {
                              "type": "string",
                              "enum": [
                                "public",
                                "anyone_with_link"
                              ],
                              "description": "Who can view the recipe."
                            }
                          },
                          "required": [
                            "view"
                          ],
                          "additionalProperties": false
                        },
                        "title": {
                          "type": "string"
                        },
                        "links": {
                          "type": "object",
                          "properties": {
                            "project": {
                              "type": "string",
                              "pattern": "\\/projects\\/(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)",
                              "description": "A URI to the project resource."
                            }
                          },
                          "required": [
                            "project"
                          ],
                          "additionalProperties": false
                        },
                        "slug": {
                          "type": "string"
                        },
                        "uri": {
                          "type": "string",
                          "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/recipes\\/(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)"
                        }
                      },
                      "required": [
                        "appearance",
                        "connections",
                        "content",
                        "description",
                        "privacy",
                        "title",
                        "links",
                        "slug",
                        "uri"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "required": [
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
      "name": "Recipes"
    }
  ]
}
```
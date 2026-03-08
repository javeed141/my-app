# Get a custom page

Get a custom page from your ReadMe project.

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
    "/branches/{branch}/custom_pages/{slug}": {
      "get": {
        "operationId": "getCustomPage",
        "summary": "Get a custom page",
        "tags": [
          "Custom Pages"
        ],
        "description": "Get a custom page from your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
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
                            "fullscreen": {
                              "type": "boolean",
                              "default": false,
                              "description": "Whether a html custom page is fullscreen or not."
                            }
                          },
                          "additionalProperties": false
                        },
                        "content": {
                          "type": "object",
                          "properties": {
                            "body": {
                              "type": "string",
                              "nullable": true
                            },
                            "type": {
                              "type": "string",
                              "enum": [
                                "markdown",
                                "html"
                              ],
                              "default": "markdown",
                              "description": "The type of content contained in this custom page."
                            }
                          },
                          "required": [
                            "body"
                          ],
                          "additionalProperties": false
                        },
                        "metadata": {
                          "type": "object",
                          "properties": {
                            "description": {
                              "type": "string",
                              "nullable": true
                            },
                            "image": {
                              "type": "object",
                              "properties": {
                                "uri": {
                                  "type": "string",
                                  "pattern": "\\/images\\/([a-f\\d]{24})",
                                  "nullable": true,
                                  "description": "A URI to the `getImages` endpoint for this image. If the is a legacy image then this `uri` will be `null`. And if you wish to delete this image then you should set this to `null`."
                                },
                                "url": {
                                  "type": "string",
                                  "format": "uri",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "uri",
                                "url"
                              ],
                              "additionalProperties": false
                            },
                            "keywords": {
                              "type": "string",
                              "nullable": true,
                              "description": "A comma-separated list of keywords to place into your custom page metadata."
                            },
                            "title": {
                              "type": "string",
                              "nullable": true
                            }
                          },
                          "required": [
                            "description",
                            "image",
                            "keywords",
                            "title"
                          ],
                          "additionalProperties": false
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
                              "default": "anyone_with_link",
                              "description": "The visibility of this custom page."
                            }
                          },
                          "additionalProperties": false
                        },
                        "slug": {
                          "type": "string",
                          "pattern": "([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+"
                        },
                        "title": {
                          "type": "string",
                          "nullable": true
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
                        "renderable": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "boolean",
                              "default": true,
                              "description": "A flag for if the resource is renderable or not."
                            },
                            "error": {
                              "type": "string",
                              "nullable": true,
                              "description": "The rendering error."
                            },
                            "message": {
                              "type": "string",
                              "nullable": true,
                              "description": "Additional details about the rendering error."
                            }
                          },
                          "additionalProperties": false
                        },
                        "updated_at": {
                          "type": "string",
                          "format": "date-time",
                          "description": "An ISO 8601 formatted date for when the custom page was updated.",
                          "nullable": true
                        },
                        "uri": {
                          "type": "string",
                          "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/custom_pages\\/([a-f\\d]{24}|([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)"
                        }
                      },
                      "required": [
                        "appearance",
                        "content",
                        "metadata",
                        "privacy",
                        "slug",
                        "title",
                        "links",
                        "renderable",
                        "updated_at",
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
      "name": "Custom Pages"
    }
  ]
}
```
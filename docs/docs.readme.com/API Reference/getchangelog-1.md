# Get a changelog entry

Get a changelog entry from your ReadMe project.

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
    "/changelogs/{identifier}": {
      "get": {
        "operationId": "getChangelog",
        "summary": "Get a changelog entry",
        "tags": [
          "Changelog"
        ],
        "description": "Get a changelog entry from your ReadMe project.",
        "parameters": [
          {
            "schema": {
              "anyOf": [
                {
                  "type": "string",
                  "pattern": "[a-f\\d]{24}",
                  "description": "A unique identifier for the resource."
                },
                {
                  "type": "string",
                  "pattern": "([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+",
                  "description": "A URL-safe representation of the resource."
                }
              ]
            },
            "in": "path",
            "name": "identifier",
            "required": true,
            "description": "The unique identifier for the resource."
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
                        "author": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string",
                              "nullable": true,
                              "description": "User ID of the changelog author."
                            },
                            "name": {
                              "type": "string",
                              "nullable": true,
                              "description": "Full name of the user who created the changelog."
                            }
                          },
                          "required": [
                            "id",
                            "name"
                          ],
                          "additionalProperties": false
                        },
                        "content": {
                          "type": "object",
                          "properties": {
                            "body": {
                              "type": "string",
                              "nullable": true
                            }
                          },
                          "required": [
                            "body"
                          ],
                          "additionalProperties": false
                        },
                        "created_at": {
                          "type": "string",
                          "format": "date-time",
                          "description": "An ISO 8601 formatted date for when the changelog was created."
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
                              "description": "A comma-separated list of keywords to place into your changelog metadata."
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
                              "description": "The visibility of this changelog."
                            }
                          },
                          "additionalProperties": false
                        },
                        "slug": {
                          "type": "string"
                        },
                        "title": {
                          "type": "string"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "none",
                            "added",
                            "fixed",
                            "improved",
                            "deprecated",
                            "removed"
                          ],
                          "default": "none",
                          "description": "The type of changelog that this is."
                        },
                        "links": {
                          "type": "object",
                          "properties": {
                            "project": {
                              "type": "string",
                              "pattern": "\\/projects\\/(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)",
                              "description": "A URI to the project that this changelog belongs to."
                            }
                          },
                          "required": [
                            "project"
                          ],
                          "additionalProperties": false
                        },
                        "updated_at": {
                          "type": "string",
                          "format": "date-time",
                          "description": "An ISO 8601 formatted date for when the changelog was updated."
                        },
                        "uri": {
                          "type": "string",
                          "pattern": "\\/changelogs\\/([a-f\\d]{24}|([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)"
                        }
                      },
                      "required": [
                        "author",
                        "content",
                        "created_at",
                        "metadata",
                        "privacy",
                        "slug",
                        "title",
                        "links",
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
      "name": "Changelog"
    }
  ]
}
```
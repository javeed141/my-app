# Get all changelog entries

Get all changelog entries from your ReadMe project.

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
    "/changelogs": {
      "get": {
        "operationId": "getChangelogs",
        "summary": "Get all changelog entries",
        "tags": [
          "Changelog"
        ],
        "description": "Get all changelog entries from your ReadMe project.",
        "parameters": [
          {
            "schema": {
              "type": "number",
              "minimum": 1,
              "default": 1
            },
            "in": "query",
            "name": "page",
            "required": false,
            "description": "Used to specify further pages (starts at 1)."
          },
          {
            "schema": {
              "type": "number",
              "minimum": 1,
              "maximum": 100,
              "default": 10
            },
            "in": "query",
            "name": "per_page",
            "required": false,
            "description": "Number of items to include in pagination (up to 100, defaults to 10)."
          },
          {
            "schema": {
              "type": "string",
              "enum": [
                "public",
                "anyone_with_link",
                "all"
              ],
              "default": "all"
            },
            "in": "query",
            "name": "visibility",
            "required": false,
            "description": "The visibility setting (`privacy.view`) for the changelog entries you wish to retrieve. Defaults to `all`."
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
                    "page": {
                      "type": "number"
                    },
                    "per_page": {
                      "type": "number"
                    },
                    "paging": {
                      "type": "object",
                      "properties": {
                        "next": {
                          "type": "string",
                          "nullable": true
                        },
                        "previous": {
                          "type": "string",
                          "nullable": true
                        },
                        "first": {
                          "type": "string",
                          "nullable": true
                        },
                        "last": {
                          "type": "string",
                          "nullable": true
                        }
                      },
                      "required": [
                        "next",
                        "previous",
                        "first",
                        "last"
                      ],
                      "additionalProperties": false
                    },
                    "data": {
                      "type": "array",
                      "items": {
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
                    }
                  },
                  "required": [
                    "total",
                    "page",
                    "per_page",
                    "paging",
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
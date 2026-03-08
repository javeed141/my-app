# Perform a search query

Searches the ReadMe project.

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
    "/search": {
      "get": {
        "operationId": "search",
        "summary": "Perform a search query",
        "tags": [
          "Search"
        ],
        "description": "Searches the ReadMe project.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "query",
            "required": true,
            "description": "The plain text search query used to search across the project."
          },
          {
            "schema": {
              "type": "string",
              "enum": [
                "guides",
                "reference",
                "recipes",
                "custom_pages",
                "discuss",
                "changelog"
              ]
            },
            "in": "query",
            "name": "section",
            "required": false,
            "description": "The section of your ReadMe project to search within. If omitted, all enabled sections are searched."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "version",
            "required": false,
            "description": "The version to search within. For enterprise, this only applies to the current project."
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "in": "query",
            "name": "projects",
            "required": false,
            "description": "Limit search to only these projects in an Enterprise group. If omitted, all child projects with the appropriate permissions are searched. This parameter is only applicable to Enterprise projects."
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
                          "url": {
                            "type": "object",
                            "properties": {
                              "full": {
                                "type": "string",
                                "description": "The full URL of the page."
                              },
                              "relative": {
                                "type": "string",
                                "description": "The relative URL of the page without the version or base URL."
                              }
                            },
                            "required": [
                              "full",
                              "relative"
                            ],
                            "additionalProperties": false
                          },
                          "title": {
                            "type": "string"
                          },
                          "excerpt": {
                            "type": "string"
                          },
                          "highlights": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "value": {
                                  "type": "string"
                                },
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "hit",
                                    "text"
                                  ]
                                }
                              },
                              "required": [
                                "value",
                                "type"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "slug": {
                            "type": "string"
                          },
                          "section": {
                            "type": "string",
                            "enum": [
                              "guides",
                              "reference",
                              "recipes",
                              "custom_pages",
                              "discuss",
                              "changelog"
                            ]
                          },
                          "version": {
                            "type": "string",
                            "nullable": true,
                            "description": "The semver version number this search is scoped to."
                          },
                          "project": {
                            "type": "object",
                            "properties": {
                              "subdomain": {
                                "type": "string"
                              },
                              "name": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "subdomain",
                              "name"
                            ],
                            "additionalProperties": false
                          },
                          "api": {
                            "type": "object",
                            "properties": {
                              "method": {
                                "type": "string",
                                "nullable": true
                              }
                            },
                            "required": [
                              "method"
                            ],
                            "additionalProperties": false
                          },
                          "uri": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "url",
                          "title",
                          "excerpt",
                          "highlights",
                          "slug",
                          "section",
                          "version",
                          "project",
                          "api",
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
      "name": "Search"
    }
  ]
}
```
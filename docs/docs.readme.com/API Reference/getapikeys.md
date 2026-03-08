# Get your API keys

Get the API keys for your ReadMe project.

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
    "/projects/{subdomain}/apikeys": {
      "get": {
        "operationId": "getAPIKeys",
        "summary": "Get your API keys",
        "tags": [
          "API Keys"
        ],
        "description": "Get the API keys for your ReadMe project.",
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
              "pattern": "(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)",
              "maxLength": 30
            },
            "in": "path",
            "name": "subdomain",
            "required": true,
            "description": "The subdomain of your project."
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
                          "token": {
                            "type": "string",
                            "pattern": "rdme_\\w+"
                          },
                          "label": {
                            "type": "string",
                            "nullable": true
                          },
                          "last_accessed_on": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "An ISO 8601 formatted date for when the API key was last accessed."
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "An ISO 8601 formatted date for when the API key was created."
                          },
                          "uri": {
                            "type": "string",
                            "pattern": "\\/projects\\/(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)\\/apikeys\\/[a-f\\d]{24}"
                          }
                        },
                        "required": [
                          "token",
                          "label",
                          "last_accessed_on",
                          "created_at",
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
      "name": "API Keys"
    }
  ]
}
```
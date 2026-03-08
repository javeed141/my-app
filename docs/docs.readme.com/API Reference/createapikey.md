# Create an API key

Create an API key for your ReadMe project.

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
      "post": {
        "operationId": "createAPIKey",
        "summary": "Create an API key",
        "tags": [
          "API Keys"
        ],
        "description": "Create an API key for your ReadMe project.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "label": {
                    "allOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "string",
                        "minLength": 1
                      }
                    ]
                  }
                },
                "required": [
                  "label"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": true
        },
        "parameters": [
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
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
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
      "name": "API Keys"
    }
  ]
}
```
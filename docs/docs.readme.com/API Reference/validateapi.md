# Validate an API

Validates an API definition for uploading to your ReadMe project.

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
    "/validate/api": {
      "post": {
        "operationId": "validateAPI",
        "summary": "Validate an API",
        "tags": [
          "APIs"
        ],
        "description": "Validates an API definition for uploading to your ReadMe project.",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "schema": {
                    "description": "The API definition."
                  },
                  "upload_source": {
                    "default": "form",
                    "description": "The source that the API definition is being uploaded through."
                  },
                  "url": {
                    "description": "The URL where the API definition is hosted."
                  }
                },
                "additionalProperties": false,
                "description": "The API definition to upload. We provide full support for OpenAPI 3.x and Swagger 2.0 and experimental support for Postman collections."
              }
            }
          },
          "description": "The API definition to upload. We provide full support for OpenAPI 3.x and Swagger 2.0 and experimental support for Postman collections."
        },
        "security": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "schema": {
                      "type": "object",
                      "additionalProperties": {},
                      "description": "The API schema."
                    }
                  },
                  "required": [
                    "schema"
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
      "name": "APIs"
    }
  ]
}
```
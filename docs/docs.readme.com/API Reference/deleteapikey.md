# Delete an API key

Delete an API key from your ReadMe project.

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
    "/projects/{subdomain}/apikeys/{api_key_id}": {
      "delete": {
        "operationId": "deleteAPIKey",
        "summary": "Delete an API key",
        "tags": [
          "API Keys"
        ],
        "description": "Delete an API key from your ReadMe project.",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "pattern": "[a-f\\d]{24}"
            },
            "in": "path",
            "name": "api_key_id",
            "required": true,
            "description": "The unique identifier for your API key."
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
          "204": {
            "description": "No Content"
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
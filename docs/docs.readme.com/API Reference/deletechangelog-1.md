# Delete a changelog entry

Delete a changelog entry from your ReadMe project.

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
      "delete": {
        "operationId": "deleteChangelog",
        "summary": "Delete a changelog entry",
        "tags": [
          "Changelog"
        ],
        "description": "Delete a changelog entry from your ReadMe project.",
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
      "name": "Changelog"
    }
  ]
}
```
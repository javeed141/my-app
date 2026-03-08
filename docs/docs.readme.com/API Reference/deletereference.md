# Delete a reference page

Delete a page from the API Reference section of your ReadMe project.

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
    "/branches/{branch}/reference/{slug}": {
      "delete": {
        "operationId": "deleteReference",
        "summary": "Delete a reference page",
        "tags": [
          "API Reference"
        ],
        "description": "Delete a page from the API Reference section of your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "parameters": [
          {
            "schema": {
              "type": "boolean",
              "default": false
            },
            "in": "query",
            "name": "cleanup_definition",
            "required": false,
            "description": "For a reference page that is documenting an endpoint and has an underlying API definition file, setting this parameter to `true` will remove the endpoint from the underlying API definition if that page is the only one rendering out that endpoint."
          },
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
      "name": "API Reference"
    }
  ]
}
```
# Update changelog

Update a changelog with this slug.

>❗
> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.

# OpenAPI definition

```json
{
  "openapi": "3.0.2",
  "info": {
    "description": "Create beautiful product and API documentation with our developer friendly platform.",
    "version": "5.549.0",
    "title": "Legacy API",
    "contact": {
      "name": "API Support",
      "url": "https://docs.readme.com/main/docs/need-more-support",
      "email": "support@readme.io"
    }
  },
  "servers": [
    {
      "url": "https://dash.readme.com/api/v1"
    }
  ],
  "tags": [
    {
      "name": "Changelog"
    }
  ],
  "paths": {
    "/changelogs/{slug}": {
      "put": {
        "operationId": "updateChangelog",
        "summary": "Update changelog",
        "description": "Update a changelog with this slug.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "Changelog"
        ],
        "parameters": [
          {
            "name": "slug",
            "in": "path",
            "description": "A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the changelog \"Owlet Weekly Update\", enter the slug \"owlet-weekly-update\".",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/changelog"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The changelog was successfully updated."
          },
          "400": {
            "description": "There was a validation error during update."
          },
          "404": {
            "description": "There is no changelog with that slug."
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKey": {
        "type": "http",
        "scheme": "basic"
      }
    },
    "schemas": {
      "changelog": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the changelog."
          },
          "type": {
            "type": "string",
            "default": "",
            "enum": [
              "",
              "added",
              "fixed",
              "improved",
              "deprecated",
              "removed"
            ]
          },
          "body": {
            "type": "string",
            "description": "Body content of the changelog."
          },
          "hidden": {
            "type": "boolean",
            "description": "Visibility of the changelog.",
            "default": true
          }
        },
        "required": [
          "title",
          "body"
        ]
      }
    }
  }
}
```
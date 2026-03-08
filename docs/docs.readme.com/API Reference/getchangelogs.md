# Get changelogs

Returns a list of changelogs.

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
    "/changelogs": {
      "get": {
        "operationId": "getChangelogs",
        "summary": "Get changelogs",
        "description": "Returns a list of changelogs.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "Changelog"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/perPage"
          },
          {
            "$ref": "#/components/parameters/page"
          }
        ],
        "responses": {
          "200": {
            "description": "The list of changelogs.",
            "headers": {
              "Link": {
                "$ref": "#/components/headers/link"
              },
              "x-total-count": {
                "$ref": "#/components/headers/x-total-count"
              }
            }
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
    "headers": {
      "link": {
        "description": "Pagination information. See https://docs.readme.com/main/reference/pagination for more information.",
        "schema": {
          "type": "string"
        }
      },
      "x-total-count": {
        "description": "The total amount of results, ignoring pagination. See https://docs.readme.com/main/reference/pagination for more information about pagination.",
        "schema": {
          "type": "string"
        }
      }
    },
    "parameters": {
      "page": {
        "name": "page",
        "in": "query",
        "description": "Used to specify further pages (starts at 1).",
        "schema": {
          "type": "integer",
          "default": 1,
          "minimum": 1
        }
      },
      "perPage": {
        "name": "perPage",
        "in": "query",
        "description": "Number of items to include in pagination (up to 100, defaults to 10).",
        "schema": {
          "type": "integer",
          "default": 10,
          "minimum": 1,
          "maximum": 100
        }
      }
    }
  }
}
```
# Get all categories

Returns all the categories for a specified version.

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
      "name": "Categories"
    }
  ],
  "paths": {
    "/categories": {
      "get": {
        "operationId": "getCategories",
        "summary": "Get all categories",
        "description": "Returns all the categories for a specified version.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "Categories"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/x-readme-version"
          },
          {
            "$ref": "#/components/parameters/perPage"
          },
          {
            "$ref": "#/components/parameters/page"
          }
        ],
        "responses": {
          "200": {
            "description": "The list of categories.",
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
      },
      "x-readme-version": {
        "in": "header",
        "name": "x-readme-version",
        "description": "Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/main/reference/version#getversions.",
        "example": "v3.0",
        "required": false,
        "schema": {
          "type": "string"
        }
      }
    }
  }
}
```
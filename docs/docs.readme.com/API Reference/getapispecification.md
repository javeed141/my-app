# Get metadata

Get API specification metadata.

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
      "name": "API Specification"
    }
  ],
  "paths": {
    "/api-specification": {
      "get": {
        "operationId": "getAPISpecification",
        "summary": "Get metadata",
        "description": "Get API specification metadata.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "API Specification"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/perPage"
          },
          {
            "$ref": "#/components/parameters/page"
          },
          {
            "$ref": "#/components/parameters/x-readme-version"
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved API specification metadata.",
            "headers": {
              "Link": {
                "$ref": "#/components/headers/link"
              },
              "x-total-count": {
                "$ref": "#/components/headers/x-total-count"
              }
            }
          },
          "400": {
            "$ref": "#/components/responses/error_VERSION_EMPTY"
          },
          "401": {
            "$ref": "#/components/responses/authUnauthorized"
          },
          "403": {
            "$ref": "#/components/responses/authForbidden"
          },
          "404": {
            "$ref": "#/components/responses/error_VERSION_NOTFOUND"
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
    },
    "responses": {
      "authForbidden": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "oneOf": [
                {
                  "$ref": "#/components/schemas/error_APIKEY_MISMATCH"
                }
              ]
            }
          }
        }
      },
      "authUnauthorized": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "oneOf": [
                {
                  "$ref": "#/components/schemas/error_APIKEY_EMPTY"
                },
                {
                  "$ref": "#/components/schemas/error_APIKEY_NOTFOUND"
                }
              ]
            }
          }
        }
      },
      "error_VERSION_EMPTY": {
        "description": "No version was supplied.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_VERSION_EMPTY"
            }
          }
        }
      },
      "error_VERSION_NOTFOUND": {
        "description": "The version couldn't be found.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_VERSION_NOTFOUND"
            }
          }
        }
      }
    },
    "schemas": {
      "baseError": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string",
            "description": "An error code unique to the error received."
          },
          "message": {
            "type": "string",
            "description": "The reason why the error occured."
          },
          "suggestion": {
            "type": "string",
            "description": "A helpful suggestion for how to alleviate the error."
          },
          "docs": {
            "type": "string",
            "format": "url",
            "description": "A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.",
            "example": "https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f"
          },
          "help": {
            "type": "string",
            "description": "Information on where you can receive additional assistance from our wonderful support team.",
            "example": "If you need help, email support@readme.io"
          },
          "poem": {
            "type": "array",
            "description": "A short poem we wrote you about your error.",
            "items": {
              "type": "string"
            },
            "example": [
              "If you're seeing this error,",
              "Things didn't quite go the way we hoped.",
              "When we tried to process your request,",
              "Maybe trying again it'll work—who knows!"
            ]
          }
        }
      },
      "error_APIKEY_EMPTY": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "APIKEY_EMPTY"
              }
            }
          }
        ]
      },
      "error_APIKEY_MISMATCH": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "APIKEY_MISMATCH"
              }
            }
          }
        ]
      },
      "error_APIKEY_NOTFOUND": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "APIKEY_NOTFOUND"
              }
            }
          }
        ]
      },
      "error_VERSION_EMPTY": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "VERSION_EMPTY"
              }
            }
          }
        ]
      },
      "error_VERSION_NOTFOUND": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "VERSION_NOTFOUND"
              }
            }
          }
        ]
      }
    }
  }
}
```
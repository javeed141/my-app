# Delete specification

Delete an API specification in ReadMe.

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
    "/api-specification/{id}": {
      "delete": {
        "operationId": "deleteAPISpecification",
        "summary": "Delete specification",
        "description": "Delete an API specification in ReadMe.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "API Specification"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "The API specification was deleted."
          },
          "400": {
            "$ref": "#/components/responses/error_SPEC_ID_INVALID"
          },
          "401": {
            "$ref": "#/components/responses/authUnauthorized"
          },
          "403": {
            "$ref": "#/components/responses/authForbidden"
          },
          "404": {
            "$ref": "#/components/responses/error_SPEC_NOTFOUND"
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
      "error_SPEC_ID_INVALID": {
        "description": "The spec ID isn't valid.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_SPEC_ID_INVALID"
            }
          }
        }
      },
      "error_SPEC_NOTFOUND": {
        "description": "The spec couldn't be found.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_SPEC_NOTFOUND"
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
      "error_SPEC_ID_INVALID": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_ID_INVALID"
              }
            }
          }
        ]
      },
      "error_SPEC_NOTFOUND": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_NOTFOUND"
              }
            }
          }
        ]
      }
    }
  }
}
```
# Retrieve an entry from the API Registry

Get an API definition file that's been uploaded to ReadMe.

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
      "name": "API Registry"
    }
  ],
  "paths": {
    "/api-registry/{uuid}": {
      "get": {
        "operationId": "getAPIRegistry",
        "summary": "Retrieve an entry from the API Registry",
        "description": "Get an API definition file that's been uploaded to ReadMe.",
        "tags": [
          "API Registry"
        ],
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "An API Registry UUID. This can be found by navigating to your API Reference page and viewing code snippets for Node with the `api` library.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved API registry entry.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "404": {
            "$ref": "#/components/responses/error_REGISTRY_NOTFOUND"
          }
        }
      }
    }
  },
  "components": {
    "responses": {
      "error_REGISTRY_NOTFOUND": {
        "description": "The registry entry couldn't be found.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_REGISTRY_NOTFOUND"
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
      "error_REGISTRY_NOTFOUND": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "REGISTRY_NOTFOUND"
              }
            }
          }
        ]
      }
    }
  }
}
```
# Update specification

Update an API specification in ReadMe.

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
      "put": {
        "operationId": "updateAPISpecification",
        "summary": "Update specification",
        "description": "Update an API specification in ReadMe.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
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
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "spec": {
                    "description": "An OpenAPI/Swagger file. We accept JSON or YAML.",
                    "type": "string",
                    "format": "binary"
                  },
                  "url": {
                    "description": "A public URL to an OpenAPI/Swagger definition. We accept JSON or YAML.",
                    "type": "string",
                    "format": "url"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The API specification was updated."
          },
          "400": {
            "description": "There was a validation error during upload.",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/error_SPEC_FILE_EMPTY"
                    },
                    {
                      "$ref": "#/components/schemas/error_SPEC_ID_DUPLICATE"
                    },
                    {
                      "$ref": "#/components/schemas/error_SPEC_ID_INVALID"
                    },
                    {
                      "$ref": "#/components/schemas/error_SPEC_INVALID"
                    },
                    {
                      "$ref": "#/components/schemas/error_SPEC_INVALID_SCHEMA"
                    },
                    {
                      "$ref": "#/components/schemas/error_SPEC_VERSION_NOTFOUND"
                    }
                  ]
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/authUnauthorized"
          },
          "403": {
            "$ref": "#/components/responses/authForbidden"
          },
          "404": {
            "description": "There is no API specification with that ID."
          },
          "408": {
            "$ref": "#/components/responses/error_SPEC_TIMEOUT"
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
      "error_SPEC_TIMEOUT": {
        "description": "The spec upload timed out.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_SPEC_TIMEOUT"
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
      "error_SPEC_FILE_EMPTY": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_FILE_EMPTY"
              }
            }
          }
        ]
      },
      "error_SPEC_ID_DUPLICATE": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_ID_DUPLICATE"
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
      "error_SPEC_INVALID": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_INVALID"
              }
            }
          }
        ]
      },
      "error_SPEC_INVALID_SCHEMA": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_INVALID_SCHEMA"
              }
            }
          }
        ]
      },
      "error_SPEC_TIMEOUT": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_TIMEOUT"
              }
            }
          }
        ]
      },
      "error_SPEC_VERSION_NOTFOUND": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "SPEC_VERSION_NOTFOUND"
              }
            }
          }
        ]
      }
    }
  }
}
```
# Update custom page

Update a custom page with this slug.

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
      "name": "Custom Pages"
    }
  ],
  "paths": {
    "/custompages/{slug}": {
      "put": {
        "operationId": "updateCustomPage",
        "summary": "Update custom page",
        "description": "Update a custom page with this slug.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "Custom Pages"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/slug"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/customPage"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The custom page was successfully updated."
          },
          "400": {
            "$ref": "#/components/responses/error_CUSTOMPAGE_INVALID"
          },
          "401": {
            "$ref": "#/components/responses/authUnauthorized"
          },
          "403": {
            "$ref": "#/components/responses/authForbidden"
          },
          "404": {
            "$ref": "#/components/responses/error_CUSTOMPAGE_NOTFOUND"
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
    "parameters": {
      "slug": {
        "name": "slug",
        "in": "path",
        "description": "A URL-safe representation of the page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the title \"Getting Started\", enter the slug \"getting-started\".",
        "required": true,
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
      "error_CUSTOMPAGE_INVALID": {
        "description": "The page couldn't be saved.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_CUSTOMPAGE_INVALID"
            }
          }
        }
      },
      "error_CUSTOMPAGE_NOTFOUND": {
        "description": "The custom page couldn't be found.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_CUSTOMPAGE_NOTFOUND"
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
      "customPage": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the custom page."
          },
          "body": {
            "type": "string",
            "description": "Body formatted in Markdown (displayed by default)."
          },
          "html": {
            "type": "string",
            "description": "Body formatted in HTML (sanitized, only displayed if `htmlmode` is **true**)."
          },
          "htmlmode": {
            "type": "boolean",
            "description": "**true** if `html` should be displayed, **false** if `body` should be displayed.",
            "default": false
          },
          "hidden": {
            "type": "boolean",
            "description": "Visibility of the custom page.",
            "default": true
          }
        },
        "required": [
          "title"
        ]
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
      "error_CUSTOMPAGE_INVALID": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "CUSTOMPAGE_INVALID"
              }
            }
          }
        ]
      },
      "error_CUSTOMPAGE_NOTFOUND": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "CUSTOMPAGE_NOTFOUND"
              }
            }
          }
        ]
      }
    }
  }
}
```
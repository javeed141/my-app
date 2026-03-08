# Create doc

Create a new doc inside of this project.

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
      "name": "Docs"
    }
  ],
  "paths": {
    "/docs": {
      "post": {
        "operationId": "createDoc",
        "summary": "Create doc",
        "description": "Create a new doc inside of this project.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "Docs"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/x-readme-version"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/docSchemaPost"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "The doc was successfully created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/docSchemaResponse"
                }
              }
            }
          },
          "400": {
            "$ref": "#/components/responses/error_DOC_INVALID"
          },
          "401": {
            "$ref": "#/components/responses/authUnauthorized"
          },
          "403": {
            "$ref": "#/components/responses/authForbidden"
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
      "error_DOC_INVALID": {
        "description": "The doc couldn't be saved.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error_DOC_INVALID"
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
      "docSchemaPost": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the page."
          },
          "type": {
            "type": "string",
            "description": "Type of the page. This can be one of the following:\n- `basic` (most common)\n- `link` (page that redirects to an external link)\n- `error` (page describing an API error) [DEPRECATED]",
            "enum": [
              "basic",
              "error",
              "link"
            ]
          },
          "body": {
            "type": "string",
            "description": "Body content of the page, formatted in [ReadMe-flavored Markdown](https://docs.readme.com/rdmd/docs)."
          },
          "category": {
            "type": "string",
            "description": "Category ID of the page, which you can get through [the **Get all categories** endpoint](https://docs.readme.com/main/reference/getcategories)."
          },
          "hidden": {
            "type": "boolean",
            "description": "Visibility of the page."
          },
          "order": {
            "type": "integer",
            "description": "The position of the page in your project sidebar.",
            "example": 999
          },
          "parentDoc": {
            "type": "string",
            "description": "The parent doc's ID, if the page is a subpage."
          },
          "error": {
            "type": "object",
            "deprecated": true,
            "description": "This is used for docs with the `type` set to `error`. The `error` page type and this `error` object have been deprecated.",
            "properties": {
              "code": {
                "type": "string",
                "description": "The error code for docs with the `error` type [DEPRECATED]."
              }
            }
          },
          "categorySlug": {
            "type": "string",
            "description": "The slug of the category this page is associated with. You can get this through [the **Get all categories** endpoint](https://docs.readme.com/main/reference/getcategories). This field is an alternative to the `category` field."
          },
          "parentDocSlug": {
            "type": "string",
            "description": "If this page is a subpage, this field will be the slug of the parent document. You can get this through https://docs.readme.com/main/reference/docs#getdoc. This field is an alternative to the `parentDoc` field."
          }
        },
        "oneOf": [
          {
            "required": [
              "title",
              "category"
            ],
            "title": "`category` Parameter"
          },
          {
            "required": [
              "title",
              "categorySlug"
            ],
            "title": "`categorySlug` Parameter"
          }
        ],
        "additionalProperties": true
      },
      "docSchemaResponse": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the page."
          },
          "type": {
            "type": "string",
            "description": "Type of the page. This can be one of the following:\n- `basic` (most common)\n- `link` (page that redirects to an external link)\n- `error` (page describing an API error) [DEPRECATED]",
            "enum": [
              "basic",
              "error",
              "link"
            ]
          },
          "body": {
            "type": "string",
            "description": "Body content of the page, formatted in [ReadMe-flavored Markdown](https://docs.readme.com/rdmd/docs)."
          },
          "category": {
            "type": "string",
            "description": "Category ID of the page, which you can get through [the **Get all categories** endpoint](https://docs.readme.com/main/reference/getcategories)."
          },
          "hidden": {
            "type": "boolean",
            "description": "Visibility of the page."
          },
          "order": {
            "type": "integer",
            "description": "The position of the page in your project sidebar.",
            "example": 999
          },
          "parentDoc": {
            "type": "string",
            "description": "The parent doc's ID, if the page is a subpage."
          },
          "error": {
            "type": "object",
            "deprecated": true,
            "description": "This is used for docs with the `type` set to `error`. The `error` page type and this `error` object have been deprecated.",
            "properties": {
              "code": {
                "type": "string",
                "description": "The error code for docs with the `error` type [DEPRECATED]."
              }
            }
          }
        },
        "additionalProperties": true
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
      "error_DOC_INVALID": {
        "allOf": [
          {
            "$ref": "#/components/schemas/baseError"
          },
          {
            "type": "object",
            "properties": {
              "error": {
                "type": "string",
                "default": "DOC_INVALID"
              }
            }
          }
        ]
      }
    }
  }
}
```
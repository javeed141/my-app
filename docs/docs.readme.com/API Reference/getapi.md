# Get an API definition

Get an API definition from your ReadMe project.

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
    "/branches/{branch}/apis/{filename}": {
      "get": {
        "operationId": "getAPI",
        "summary": "Get an API definition",
        "tags": [
          "APIs"
        ],
        "description": "Get an API definition from your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "pattern": "(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+.(json|yaml|yml))"
            },
            "in": "path",
            "name": "filename",
            "required": true,
            "description": "The filename of the API definition to retrieve."
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
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "created_at": {
                          "type": "string",
                          "format": "date-time",
                          "description": "An ISO 8601 formatted date for when the API definition was created."
                        },
                        "filename": {
                          "type": "string",
                          "description": "This is the unique identifier, its filename, for the API definition."
                        },
                        "legacy_id": {
                          "type": "string",
                          "pattern": "[a-f\\d]{24}",
                          "nullable": true,
                          "description": "The legacy ID of your API definition. This is only used for legacy rdme CLI workflows and only applies if your project, and this API definition, predates ReadMe Refactored. We consider this value to be deprecated and recommend against relying on it going forward."
                        },
                        "source": {
                          "type": "object",
                          "properties": {
                            "current": {
                              "type": "string",
                              "enum": [
                                "api",
                                "apidesigner",
                                "apieditor",
                                "bidi",
                                "form",
                                "postman",
                                "rdme",
                                "rdme_github",
                                "url"
                              ]
                            },
                            "original": {
                              "type": "string",
                              "enum": [
                                "api",
                                "apidesigner",
                                "apieditor",
                                "bidi",
                                "form",
                                "postman",
                                "rdme",
                                "rdme_github",
                                "url"
                              ]
                            },
                            "sync_url": {
                              "type": "string",
                              "nullable": true,
                              "description": "The source URL for API definitions ingested via URL."
                            }
                          },
                          "required": [
                            "current",
                            "original",
                            "sync_url"
                          ],
                          "additionalProperties": false,
                          "description": "The sources by which this API definition was ingested."
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "openapi",
                            "postman",
                            "swagger",
                            "unknown"
                          ],
                          "description": "The type of API definition. This will be `unknown` if the API definition has either not yet been processed or failed with validation errors."
                        },
                        "updated_at": {
                          "type": "string",
                          "format": "date-time",
                          "description": "An ISO 8601 formatted date for when the API definition was last updated."
                        },
                        "upload": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string",
                              "enum": [
                                "pending",
                                "failed",
                                "done",
                                "pending_update",
                                "failed_update"
                              ],
                              "description": "The status of the API definition upload."
                            },
                            "reason": {
                              "type": "string",
                              "nullable": true,
                              "description": "The reason for the upload failure if it failed."
                            },
                            "warnings": {
                              "type": "string",
                              "nullable": true,
                              "description": "Any fixable warnings that may exist within the API definition if the upload was ingested without errors."
                            }
                          },
                          "required": [
                            "status",
                            "reason",
                            "warnings"
                          ],
                          "additionalProperties": false
                        },
                        "uri": {
                          "type": "string",
                          "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/apis\\/((([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+.(json|yaml|yml)))",
                          "description": "A URI to the API definition resource."
                        },
                        "schema": {
                          "nullable": true,
                          "description": "The API schema."
                        }
                      },
                      "required": [
                        "created_at",
                        "filename",
                        "legacy_id",
                        "source",
                        "type",
                        "updated_at",
                        "upload",
                        "uri"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "required": [
                    "data"
                  ],
                  "additionalProperties": false
                }
              }
            }
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
      "name": "APIs"
    }
  ]
}
```
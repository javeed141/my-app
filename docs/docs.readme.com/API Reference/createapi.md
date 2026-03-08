# Create an API definition

Create an API definition in the API Reference section of your ReadMe project.

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
    "/branches/{branch}/apis": {
      "post": {
        "operationId": "createAPI",
        "summary": "Create an API definition",
        "tags": [
          "APIs"
        ],
        "description": "Create an API definition in the API Reference section of your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "schema": {
                    "description": "The API definition."
                  },
                  "upload_source": {
                    "default": "form",
                    "description": "The source that the API definition is being uploaded through."
                  },
                  "url": {
                    "description": "The URL where the API definition is hosted."
                  }
                },
                "additionalProperties": false,
                "description": "The API definition to upload. We provide full support for OpenAPI 3.x and Swagger 2.0 and experimental support for Postman collections."
              }
            }
          },
          "description": "The API definition to upload. We provide full support for OpenAPI 3.x and Swagger 2.0 and experimental support for Postman collections."
        },
        "parameters": [
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
          "202": {
            "description": "Accepted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
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
                            }
                          },
                          "required": [
                            "status"
                          ],
                          "additionalProperties": false
                        },
                        "uri": {
                          "type": "string",
                          "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/apis\\/((([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+.(json|yaml|yml)))",
                          "description": "A URI to the API definition resource."
                        }
                      },
                      "required": [
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
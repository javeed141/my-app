# /papersign/documents

This endpoint returns a list of documents.
Please note that this feature is exclusively available as part of the [Papersign API](https://paperform.co/products/papersign/#pricing).

# OpenAPI definition

```json
{
  "openapi": "3.0.2",
  "info": {
    "version": "1.0.0",
    "title": "Paperform API",
    "contact": {
      "name": "Paperform API Support",
      "url": "https://paperform.co",
      "email": "support@paperform.co"
    }
  },
  "servers": [
    {
      "url": "https://api.paperform.co/v1"
    }
  ],
  "components": {
    "schemas": {
      "Document": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "readOnly": true,
            "description": "The unique identifier of the document.",
            "example": "5d40fdaf174b4c0007043072"
          },
          "name": {
            "type": "string",
            "description": "The name of the document.",
            "example": "My Document"
          },
          "status": {
            "type": "string",
            "enum": [
              "draft",
              "archived",
              "in_progress",
              "canceled",
              "completed",
              "expired",
              "rejected"
            ],
            "description": "The status of the document.",
            "example": "completed"
          },
          "folder": {
            "$ref": "#/components/schemas/PapersignFolder"
          },
          "space": {
            "$ref": "#/components/schemas/PapersignSpace"
          },
          "signers": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Signer"
            }
          },
          "variables": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PapersignVariable"
            }
          },
          "created_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC indicating the time the document was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "updated_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC indicating the time the document was last updated.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "sent_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC indicating the time the document was sent.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "completed_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC indicating the time the document was completed.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          }
        }
      },
      "PapersignFolder": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "format": "int32",
            "readOnly": true,
            "description": "The unique identifier of the folder.",
            "example": 9999
          },
          "name": {
            "type": "string",
            "description": "The name of the document.",
            "example": "My Document"
          },
          "parent_id": {
            "type": "number",
            "format": "int32",
            "description": "The unique identifier of the parent folder.",
            "example": 9999,
            "nullable": true
          },
          "space_id": {
            "type": "number",
            "format": "int32",
            "description": "The unique identifier of the space.",
            "example": 8888
          }
        },
        "required": [
          "name"
        ]
      },
      "PapersignSpace": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "format": "int32",
            "readOnly": true,
            "description": "The unique identifier of the folder.",
            "example": 9999
          },
          "name": {
            "type": "string",
            "description": "The name of the space.",
            "example": "My Space"
          },
          "root_folder_id": {
            "type": "number",
            "format": "int32",
            "description": "The unique identifier of the root folder.",
            "example": 9999
          },
          "allow_team_access": {
            "type": "boolean",
            "description": "Whether to allow team access to this space.",
            "example": true
          }
        }
      },
      "Signer": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "description": "The key for the signer.",
            "example": "akdj17"
          },
          "name": {
            "type": "string",
            "description": "The name of the signer.",
            "example": "Jack Test"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "The signer's email address.",
            "example": "signer@example.com"
          },
          "phone": {
            "type": "string",
            "description": "The signer's phone number.",
            "example": "123 456 7899",
            "nullable": true
          },
          "job_title": {
            "type": "string",
            "description": "The signer's job title.",
            "example": "Account Manager",
            "nullable": true
          },
          "company": {
            "type": "string",
            "description": "The signer's company.",
            "example": "Explosive Startup",
            "nullable": true
          },
          "custom_attributes": {
            "type": "array",
            "description": "Custom attributes for the signer.",
            "items": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "example": "Relationship"
                },
                "label": {
                  "type": "string",
                  "example": "Relationship to the company",
                  "nullable": true
                },
                "value": {
                  "type": "string",
                  "example": "CEO",
                  "nullable": true
                }
              }
            },
            "required": [
              "key",
              "label",
              "value"
            ]
          }
        },
        "required": [
          "key",
          "name",
          "email"
        ]
      },
      "PapersignVariable": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "readOnly": true,
            "description": "The key for the variable. Must be unique for the document.",
            "example": "adk123"
          },
          "name": {
            "type": "string",
            "description": "The name of the signer.",
            "example": "Variable 1"
          },
          "value": {
            "type": "string",
            "description": "The value of the variable.",
            "example": "value 1"
          }
        },
        "required": [
          "key"
        ]
      },
      "Pagination": {
        "type": "object",
        "properties": {
          "total": {
            "type": "integer",
            "description": "The total number of items.",
            "readOnly": true,
            "example": 57
          },
          "has_more": {
            "description": "Whether there are more items.",
            "type": "boolean",
            "example": true,
            "readOnly": true
          },
          "limit": {
            "description": "The limit of items per page.",
            "type": "integer",
            "example": 20,
            "default": 20
          },
          "skip": {
            "description": "The number of items to skip.",
            "type": "integer",
            "default": 0,
            "example": 0
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "error"
            ],
            "example": "error"
          },
          "message": {
            "type": "string",
            "description": "An error message.",
            "example": "Invalid request"
          },
          "details": {
            "type": "array",
            "description": "Suggested actions to resolve the error.",
            "items": {
              "type": "string"
            }
          }
        }
      }
    },
    "parameters": {
      "afterId": {
        "in": "query",
        "name": "after_id",
        "schema": {
          "type": "string"
        },
        "description": "Return results after the provided ID.",
        "example": "5d40fdaf174b4c0007043072"
      },
      "beforeId": {
        "in": "query",
        "name": "before_id",
        "schema": {
          "type": "string"
        },
        "description": "Return results before the provided ID.",
        "example": "5d40fdaf174b4c0007043072"
      },
      "skip": {
        "in": "query",
        "name": "skip",
        "schema": {
          "type": "integer",
          "default": 0
        },
        "description": "Number of results to skip in the result set."
      },
      "limit": {
        "in": "query",
        "name": "limit",
        "schema": {
          "type": "integer",
          "maximum": 100,
          "default": 20
        },
        "description": "The number or results to return."
      },
      "sort": {
        "in": "query",
        "name": "sort",
        "schema": {
          "type": "string",
          "enum": [
            "ASC",
            "DESC"
          ],
          "default": "DESC"
        },
        "description": "The direction to sort in. Results are sorted by `created_at`, and defaults to `\"DESC\"`.",
        "example": "ASC"
      },
      "beforeDate": {
        "in": "query",
        "name": "before_date",
        "schema": {
          "type": "string",
          "format": "date-time"
        },
        "description": "Return results created on or after this date-time (UTC). Overwritten by `before_id`.",
        "example": "2019-06-11T20:36:29.000Z"
      },
      "afterDate": {
        "in": "query",
        "name": "after_date",
        "schema": {
          "type": "string",
          "format": "date-time"
        },
        "description": "Return results created before this date (UTC). Overwritten by `after_id`.",
        "example": "2019-06-11T20:36:29.000Z"
      },
      "papersignDescendantOfFolderId": {
        "in": "query",
        "name": "folder_id",
        "schema": {
          "type": "string"
        },
        "description": "Search folders that are descendants of folder id.",
        "example": "9999"
      },
      "papersignDocumentSearch": {
        "in": "query",
        "name": "search",
        "schema": {
          "type": "string"
        },
        "description": "Search documents by name.",
        "example": "John Doe"
      },
      "papersignDocumentStatus": {
        "in": "query",
        "name": "status",
        "schema": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "draft",
              "inProgress",
              "archived",
              "canceled",
              "expired",
              "rejected",
              "completed"
            ]
          }
        },
        "style": "form",
        "explode": true,
        "description": "Search documents by status.",
        "example": "draft,inProgress"
      }
    },
    "responses": {
      "NotFound": {
        "description": "Not Found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "not_found"
                      ],
                      "description": "The requested resource was not found."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Unauthorized": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "authentication"
                      ],
                      "description": "Token not provided for not valid."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "BadRequest": {
        "description": "Invalid Request",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "validation"
                      ],
                      "description": "Invalid parameters provided."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Forbidden": {
        "description": "Not Permitted",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "permission"
                      ],
                      "description": "Not permitted to access requested resource."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Unexpected": {
        "description": "Unexpected Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "server_error"
                      ],
                      "description": "An unexpected error."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Validation": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "validation"
                      ],
                      "description": "Invalid parameters provided."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Throttled": {
        "description": "Too Many Requests",
        "content": {
          "text/html": {
            "schema": {
              "type": "string",
              "enum": [
                "Too many requests."
              ]
            }
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/papersign/documents": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/papersignDocumentSearch"
          },
          {
            "$ref": "#/components/parameters/papersignDescendantOfFolderId"
          },
          {
            "$ref": "#/components/parameters/papersignDocumentStatus"
          },
          {
            "$ref": "#/components/parameters/limit"
          },
          {
            "$ref": "#/components/parameters/skip"
          },
          {
            "$ref": "#/components/parameters/afterId"
          },
          {
            "$ref": "#/components/parameters/beforeId"
          },
          {
            "$ref": "#/components/parameters/beforeDate"
          },
          {
            "$ref": "#/components/parameters/afterDate"
          },
          {
            "$ref": "#/components/parameters/sort"
          }
        ],
        "description": "This endpoint returns a list of documents.\nPlease note that this feature is exclusively available as part of the [Papersign API](https://paperform.co/products/papersign/#pricing).\n",
        "operationId": "listPapersignDocuments",
        "tags": [
          "Papersign Documents"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned a list of documents\n",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "allOf": [
                    {
                      "properties": {
                        "status": {
                          "type": "string",
                          "enum": [
                            "ok"
                          ]
                        },
                        "results": {
                          "type": "object",
                          "properties": {
                            "documents": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/Document"
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "$ref": "#/components/schemas/Pagination"
                    }
                  ]
                }
              }
            }
          },
          "400": {
            "$ref": "#/components/responses/BadRequest"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          },
          "422": {
            "$ref": "#/components/responses/Validation"
          },
          "429": {
            "$ref": "#/components/responses/Throttled"
          },
          "5XX": {
            "$ref": "#/components/responses/Unexpected"
          }
        }
      }
    }
  },
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "_id": {
    "buffer": {
      "0": 98,
      "1": 143,
      "2": 16,
      "3": 66,
      "4": 9,
      "5": 226,
      "6": 33,
      "7": 0,
      "8": 110,
      "9": 108,
      "10": 82,
      "11": 252
    }
  }
}
```
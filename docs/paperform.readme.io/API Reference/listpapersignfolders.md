# /papersign/folders

This endpoint returns a list of Papersign folders.
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
      "papersignDescendantOfFolderId": {
        "in": "query",
        "name": "folder_id",
        "schema": {
          "type": "string"
        },
        "description": "Search folders that are descendants of folder id.",
        "example": "9999"
      },
      "papersignSpaceId": {
        "in": "query",
        "name": "space_id",
        "schema": {
          "type": "string"
        },
        "description": "Search folders by space id.",
        "example": "9999"
      },
      "folderSearch": {
        "in": "query",
        "name": "search",
        "schema": {
          "type": "string"
        },
        "description": "Search folders by name.",
        "example": "John Doe"
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
    "/papersign/folders": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/papersignSpaceId"
          },
          {
            "$ref": "#/components/parameters/papersignDescendantOfFolderId"
          },
          {
            "$ref": "#/components/parameters/folderSearch"
          }
        ],
        "description": "This endpoint returns a list of Papersign folders.\nPlease note that this feature is exclusively available as part of the [Papersign API](https://paperform.co/products/papersign/#pricing).\n",
        "operationId": "listPapersignFolders",
        "tags": [
          "Papersign Folders"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned a list of Papersign folders\n",
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
                            "folders": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/PapersignFolder"
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
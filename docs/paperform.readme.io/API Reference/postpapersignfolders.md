# /papersign/folders

This endpoint returns a creates a new Papersign folder.
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
      "PapersignFolderCreate": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The new name of the folder.",
            "example": "My new folder"
          },
          "space_id": {
            "type": "number",
            "format": "int32",
            "description": "The unique identifier of the space to create the folder in.",
            "example": 8888
          },
          "path": {
            "type": "string",
            "maxLength": 100,
            "description": "The path to create the folder in. Maximum depth is 4 levels. Any missing folders will also be created.",
            "example": "/path/to/folder"
          },
          "folder_id": {
            "type": "number",
            "format": "int32",
            "description": "The unique identifier of the folder to create the folder in. Required when space_id and path are not present.",
            "example": 9999
          }
        },
        "required": [
          "name"
        ]
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
      "post": {
        "description": "This endpoint returns a creates a new Papersign folder.\nPlease note that this feature is exclusively available as part of the [Papersign API](https://paperform.co/products/papersign/#pricing).\n",
        "operationId": "postPapersignFolders",
        "tags": [
          "Papersign Folders"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PapersignFolderCreate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully created a new Papersign Folder\n",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
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
                        "folder": {
                          "$ref": "#/components/schemas/PapersignFolder"
                        }
                      }
                    }
                  }
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
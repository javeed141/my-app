# /spaces/{id}/forms

This endpoint returns a list of forms for a space that are accessible by the authorized user.
Please note that this feature is exclusively available as part of the [Business API](https://paperform.co/pricing/).

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
      "FormFieldCollectionItem": {
        "type": "object",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "properties": {
              "type": {
                "$ref": "#/components/schemas/FieldType"
              }
            }
          }
        ]
      },
      "FieldType": {
        "type": "string",
        "example": "text",
        "description": "The type of field.",
        "readOnly": true,
        "enum": [
          "text",
          "email",
          "url",
          "yesNo",
          "color",
          "number",
          "phone",
          "address",
          "country",
          "appointment",
          "date",
          "time",
          "scale",
          "slider",
          "choices",
          "dropdown",
          "image",
          "file",
          "signature",
          "price",
          "products",
          "subscriptions",
          "calculations",
          "hidden",
          "rank",
          "rating",
          "matrix"
        ]
      },
      "FormFieldStandardProperties": {
        "type": "object",
        "description": "Other type of form field.",
        "properties": {
          "key": {
            "type": "string",
            "example": "3jbh8",
            "readOnly": true,
            "description": "The unique key for this field."
          },
          "title": {
            "type": "string",
            "nullable": true,
            "description": "The title of this field."
          },
          "description": {
            "type": "string",
            "nullable": true,
            "description": "The description of this field."
          },
          "required": {
            "type": "boolean",
            "example": true,
            "nullable": true,
            "description": "Whether this field is required."
          },
          "custom_key": {
            "type": "string",
            "nullable": true,
            "description": "The custom key of this field."
          },
          "placeholder": {
            "type": "string",
            "nullable": true,
            "description": "The placeholder for this field."
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
      "spaceID": {
        "in": "path",
        "required": true,
        "name": "id",
        "schema": {
          "type": "string"
        },
        "description": "The ID of the space to get results for.",
        "example": "5d40fdaf174b4c0007043072"
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
    "/spaces/{id}/forms": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/spaceID"
          }
        ],
        "description": "This endpoint returns a list of forms for a space that are accessible by the authorized user.\nPlease note that this feature is exclusively available as part of the [Business API](https://paperform.co/pricing/).\n",
        "operationId": "getSpaceForms",
        "tags": [
          "Spaces"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned forms for a space",
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
                            "forms": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/FormFieldCollectionItem"
                              }
                            }
                          }
                        }
                      }
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
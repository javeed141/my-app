# Create View

While you can dynamically filter your search results, many times it will be more convenient to configure a view, and save it for later use. This endpoint allows you to do this, and then simply include `view: <view_name>` in your future search requests.

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Datafiniti API v4",
    "version": "4"
  },
  "servers": [
    {
      "url": "https://api.datafiniti.co/v4"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "apiKey",
        "in": "query",
        "name": "api_key"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/views": {
      "post": {
        "summary": "Create View",
        "description": "",
        "operationId": "create-view",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer <token>"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "data_type",
                  "fields"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "What you want to name your view. This must be unique within your account. This name is how you will reference your view in search requests."
                  },
                  "data_type": {
                    "type": "string",
                    "description": "This is the kind of data you are preparing a view for. This must be \"product\", \"business\", or \"property\"."
                  },
                  "fields": {
                    "type": "array",
                    "description": "This is an array of objects that describe all the fields and subfields you want returned in your searches and downloads.  <ul><li><p>`name` specifies the name of the field.</p></li><li><p>`flatten` specifies whether or not to separate out multiple values for the field into separate rows when using csv format.</p></li></ul>"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"data_type\": \"product\",\n  \"date_created\": \"2017-08-23 20:47:46.0\",\n  \"id\": 1,\n  \"name\": \"prices_only\",\n  \"user_id\": 1,\n  \"fields\": [\n    {\n      \"name\": \"prices\",\n      \"flatten\": true,\n      \"sub_fields\": [\n        {\n          \"name\": \"amountMax\",\n          \"flatten\": true\n        }\n      ]\n    }\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data_type": {
                      "type": "string",
                      "example": "product"
                    },
                    "date_created": {
                      "type": "string",
                      "example": "2017-08-23 20:47:46.0"
                    },
                    "id": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "name": {
                      "type": "string",
                      "example": "prices_only"
                    },
                    "user_id": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "fields": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string",
                            "example": "prices"
                          },
                          "flatten": {
                            "type": "boolean",
                            "example": true,
                            "default": true
                          },
                          "sub_fields": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "amountMax"
                                },
                                "flatten": {
                                  "type": "boolean",
                                  "example": true,
                                  "default": true
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"please provide a request body containing an object with the following fields: name, data_type, fields\",\n    \"request body is invalid json\",\n    \"An invalid user token was provided.\",\n    \"An inactive user token was provided.\"\n\t]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "please provide a request body containing an object with the following fields: name, data_type, fields"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "401",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"Please provide your token in the Authorization header using the following format: Bearer << replace all of this with your token >>\",\n    \"Invalid token.\"\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "Please provide your token in the Authorization header using the following format: Bearer << replace all of this with your token >>"
                      }
                    }
                  }
                }
              }
            }
          },
          "403": {
            "description": "403",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"There was a problem with this customer's payment information.\"\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "There was a problem with this customer's payment information."
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "404",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\".... is not a valid data-type\"]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": ".... is not a valid data-type"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true,
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c29"
}
```
# Get all Views

This allows you to retrieve all of the views you've created.

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
    "/views/": {
      "get": {
        "summary": "Get all Views",
        "description": "",
        "operationId": "get-all-views",
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
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"num_found\": 2,\n  \"records\": [\n    {\n      \"data_type\": \"product\",\n      \"date_created\": \"2017-08-23 20:47:46.0\",\n      \"id\": 1,\n      \"name\": \"prices_only\",\n      \"user_id\": 1,\n      \"fields\": [\n        {\n          \"name\": \"prices\",\n          \"flatten\": true,\n          \"sub_fields\": [\n            {\n              \"name\": \"amountMax\",\n              \"flatten\": true\n            }\n          ]\n        }\n      ]\n    },\n    {\n      \"data_type\": \"business\",\n      \"date_created\": \"2017-08-23 20:54:46.0\",\n      \"id\": 2,\n      \"name\": \"address_only\",\n      \"user_id\": 1,\n      \"fields\": [\n        {\n          \"name\": \"address\",\n          \"flatten\": true\n        }\n      ]\n    }\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "num_found": {
                      "type": "integer",
                      "example": 2,
                      "default": 0
                    },
                    "records": {
                      "type": "array",
                      "items": {
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
                    "value": "{\n  \"errors\": [\n    \"An invalid user token was provided.\",\n    \"An inactive user token was provided.\"\n\t]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "An invalid user token was provided."
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c2b"
}
```
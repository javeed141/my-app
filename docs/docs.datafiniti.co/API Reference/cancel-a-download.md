# Cancel a Download

This will cancel a download

[block:callout]
{
  "type": "danger",
  "title": "Cancellation",
  "body": "Cancelling a download will stop the download, but not delete it. It will still include all records that were added to the download before it was cancelled, and you will be able to retrieve these records still, through `GET /downloads/{id}`. Your account will still have credits deducted for the number of records that were added before the download was cancelled."
}
[/block]

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
    "/downloads/{id}": {
      "delete": {
        "summary": "Cancel a Download",
        "description": "",
        "operationId": "cancel-a-download",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer <token>"
            }
          },
          {
            "name": "id",
            "in": "path",
            "description": "This is the ID of the download you want to cancel.",
            "schema": {
              "type": "integer",
              "format": "int32"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": 1,\n  \"results\": [],\n  \"user_id\": 1,\n  \"status\": \"cancelled\",\n  \"date_started\": \"2017-08-24 18:54:07.0\",\n  \"date_updated\": \"2017-08-24 19:09:06.0\",\n  \"num_downloaded\": 0,\n  \"data_type\": \"product\",\n  \"query\": \"keys:*\",\n  \"format\": \"json\",\n  \"num_records\": 200,\n  \"total_cost\": 0\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {}
                      }
                    },
                    "user_id": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "status": {
                      "type": "string",
                      "example": "cancelled"
                    },
                    "date_started": {
                      "type": "string",
                      "example": "2017-08-24 18:54:07.0"
                    },
                    "date_updated": {
                      "type": "string",
                      "example": "2017-08-24 19:09:06.0"
                    },
                    "num_downloaded": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    },
                    "data_type": {
                      "type": "string",
                      "example": "product"
                    },
                    "query": {
                      "type": "string",
                      "example": "keys:*"
                    },
                    "format": {
                      "type": "string",
                      "example": "json"
                    },
                    "num_records": {
                      "type": "integer",
                      "example": 200,
                      "default": 0
                    },
                    "total_cost": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
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
                    "value": "{\n  \"errors\": [\n    \"An invalid user token was provided.\",\n    \"An inactive user token was provided.\",\n    \"ID must be a number.\"\n\t]\n}"
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
                    "value": "{\n  \"errors\": [\"Download not found.\"]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "Download not found."
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c30"
}
```
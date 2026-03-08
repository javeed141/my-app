# Get a Download

This will retrieve information about one download.

[block:callout]
{
  "type": "warning",
  "title": "Downloads",
  "body": "Requesting a download from this endpoint will not actually start downloading the data to your computer. It will simply return a JSON object describing the download. Links to the actual files which make up your download can be found in the `results` field."
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
      "get": {
        "summary": "Get a Download",
        "description": "",
        "operationId": "get-a-download",
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
            "description": "This is the ID of the download you want to retrieve.",
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
                    "value": "{\n  \"id\": 2,\n  \"results\": [],\n  \"user_id\": 1,\n  \"status\": \"running\",\n  \"date_started\": \"2017-08-24 19:04:53.0\",\n  \"num_downloaded\": 0,\n  \"data_type\": \"business\",\n  \"query\": \"address:*\",\n  \"format\": \"json\",\n  \"num_records\": 200,\n  \"total_cost\": 200\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 2,
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
                      "example": "running"
                    },
                    "date_started": {
                      "type": "string",
                      "example": "2017-08-24 19:04:53.0"
                    },
                    "num_downloaded": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    },
                    "data_type": {
                      "type": "string",
                      "example": "business"
                    },
                    "query": {
                      "type": "string",
                      "example": "address:*"
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
                      "example": 200,
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c2f"
}
```
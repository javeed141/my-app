# Get a Specific Record

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
    "/{data_type}/{id}": {
      "get": {
        "summary": "Get a Specific Record",
        "description": "",
        "operationId": "get-a-specific-record",
        "parameters": [
          {
            "name": "data_type",
            "in": "path",
            "description": "The data type of the record you want: businesses, products, or properties",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "id",
            "in": "path",
            "description": "This is the ID of the record you want to retrieve.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
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
                    "value": "// /products/AV13DtWNvKc47QAVnis-\n{\n    \"keys\": [\n        \"191706386090\"\n    ],\n    \"dataType\": \"product\",\n    \"upc\": [\n        \"191706386090\"\n    ],\n    \"dateAdded\": \"2017-07-25T00:04:07Z\",\n    \"dateUpdated\": \"2018-01-04T16:04:24Z\",\n    \"imageURLs\": [\n        \"https://i5.walmartimages.com/asr/3844cd5e-5c1d-4065-a735-7e316565124e_1.86909e4f677d108b49b1e68b766deb8a.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF\"\n    ],\n    \"name\": \"Harriet Bee Cheri Round Small Toy Bag\",\n    \"primaryCategories\": [\n        \"Furniture\",\n    ],\n    \"categories\": [\n        \"Kids' Rooms\",\n        \"Kids' Furniture\",\n        \"Kids' Storage & Organization\",\n        \"Toy Chests & Storage\"\n    ],\n    \"prices\": [\n        {\n            \"dateSeen\": [\n                \"2017-12-08T01:07:00.000Z\"\n            ],\n            \"availability\": \"In Stock\",\n            \"amountMin\": 26.99,\n            \"currency\": \"USD\",\n            \"amountMax\": 26.99,\n            \"condition\": \"New\",\n            \"shipping\": \"Standard\",\n            \"merchant\": \"Wayfair\",\n            \"dateAdded\": \"2018-01-04T16:04:24Z\",\n            \"isSale\": \"false\"\n        }\n    ],\n    \"brand\": \"Harriet Bee\",\n    \"id\": \"AV13DtWNvKc47QAVnis-\"\n}"
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
                    "value": "{\n    \"errors\": []\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {}
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c75"
}
```
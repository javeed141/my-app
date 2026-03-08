# Product Data

Search over 75 million product records.

Search millions of product records.

Example Request Body:

```json
{
	"query": "keys:*",
	"num_records": 1
}
```

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
    "/products/search": {
      "post": {
        "summary": "Product Data",
        "description": "Search over 75 million product records.",
        "operationId": "products",
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
                  "query"
                ],
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "This is the search query",
                    "default": "keys:*"
                  },
                  "format": {
                    "type": "string",
                    "description": "Must be either `json` or `csv`. Defaults to `json`.",
                    "default": "json"
                  },
                  "download": {
                    "type": "boolean",
                    "description": "Whether or not to start a download for this search.",
                    "default": false
                  },
                  "view": {
                    "type": "string",
                    "description": "Specify a view you have created, or use a [pre-made view](https://developer.datafiniti.co/v4/docs/available-views-for-product-data).  The view filters what data is displayed in your search results. This allows you dynamically specify a view to filter the data you get back from your search.",
                    "default": "default"
                  },
                  "num_records": {
                    "type": "integer",
                    "description": "This is the number of records your request will return, and the number of credits that will be deducted from your account. For non-downloads, the maximum is 10 records.",
                    "default": 10,
                    "format": "int32"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "202": {
            "description": "202",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "// {\"query\": \"brand:Dell AND prices:* AND reviews:*\", \"num_records\": 1}\n\n{\n  \"estimated total\": 3423,\n  \"total_cost\": 1,\n  \"records\": [\n    {\n      \"asins\": [\n        \"B003A8SK42\",\n        \"B00KRYH97Q\"\n      ],\n      \"brand\": \"Dell\",\n      \"categories\": [\n        \"Motherboards\"\n      ],\n      \"dateAdded\": \"2016-02-01T02:51:52Z\",\n      \"dateUpdated\": \"2016-09-11T01:50:22Z\",\n      \"imageURLs\": [\n        \"http://i.ebayimg.com/images/g/V~kAAOSw1DtXJ8D~/s-l300.jpg\"\n      ],\n      \"keys\": [\n        \"dell/wf887\",\n        \"delldimension11007100motherboardwf887wcpusl8hk253ghz1gbioplate/b00kryh97q\",\n        \"delldimension11007100motherboardwf887wcpusl8hk253ghz1gbioplate/b003a8sk42\",\n        \"delldimension11007100motherboardwf887wcpusl8hk253ghz1gbioplate/282060431923\"\n      ],\n      \"manufacturerNumber\": \"WF887\",\n      \"name\": \"Dell Dimension 1100/7100 Motherboard Wf887\",\n      \"prices\": [\n        {\n          \"amountMax\": 19.95,\n          \"amountMin\": 19.95,\n          \"condition\": \"Used\",\n          \"currency\": \"USD\",\n          \"dateAdded\": \"2016-02-01T02:51:52Z\",\n          \"dateSeen\": [\n            \"2016-09-10T00:00:00Z\"\n          ],\n          \"isSale\": \"false\",\n          \"offer\": \"winning bid\",\n          \"shipping\": \"USD 6.99\",\n        }\n      ],\n      \"reviews\": [\n        {\n          \"date\": \"2012-11-22T00:00:00Z\",\n          \"dateAdded\": \"2016-02-01T02:51:52Z\",\n          \"dateSeen\": [\n            \"2016-01-24T00:00:00Z\"\n          ],\n          \"text\": \"Product arrived promptly and safely in a well padded carton.\",\n          \"title\": \"Made the old computer run like new!\",\n          \"username\": \"gboat\"\n        }\n      ],\n      \"id\": \"AVpg3V0QilAPnD_xyOQl\"\n    }\n}"
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
                    "value": "{\n  \"errors\": [\n    \"please provide a request body containing an object with the following fields: query\",\n    \"invalid value for num_records. Valid values are any number between 1 - 10\",\n    \"request body is invalid json\",\n    \"An invalid user token was provided.\",\n    \"An inactive user token was provided.\"\n\t]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "please provide a request body containing an object with the following fields: query"
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c25"
}
```
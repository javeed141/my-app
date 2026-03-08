# Business Data

Search over 35 million business records.

Search millions of business records.

Example request body:

```json
{
  "query": "keys:*",
	"format":"JSON",
	"num_records": 1
}
```

For more example please visit our [Business Use Cases](https://docs.datafiniti.co/docs/business-use-cases)

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
    "/businesses/search": {
      "post": {
        "summary": "Business Data",
        "description": "Search over 35 million business records.",
        "operationId": "businesses",
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
                    "type": "string"
                  },
                  "format": {
                    "type": "string",
                    "description": "Must be either \"json\" or \"csv\""
                  },
                  "download": {
                    "type": "boolean",
                    "description": "Whether or not to start a download for this search."
                  },
                  "view": {
                    "type": "string",
                    "description": "Specify a view you have created, or use a [pre-made view](https://developer.datafiniti.co/v4/docs/available-views-for-business-data).  The view filters what data is displayed in your search results. This allows you dynamically specify a view to filter the data you get back from your search.",
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
                    "value": "// {\"query\": \"country:US AND categories:restaurant* AND reviews:*\", \"num_records\": 1}\n\n{\n  \"num_found\": 1467035,\n  \"total_cost\": 1,\n  \"records\": [\n    {\n      \"address\": \"1221 Honoapiilani Hwy\",\n      \"categories\": [\n        \"Vietnamese Restaurant\",\n        \"Sandwich Place\"\n      ],\n      \"city\": \"Lahaina\",\n      \"country\": \"US\",\n      \"dateAdded\": \"2016-05-05T00:56:21Z\",\n      \"dateUpdated\": \"2016-08-18T04:17:54Z\",\n      \"keys\": [\n        \"us/hi/lahaina/1221honoapiilanihwy/-416361451\"\n      ],\n      \"latitude\": \"20.886342905\",\n      \"longitude\": \"-156.684429822\",\n      \"name\": \"Ba-le Vietnamese Food\",\n      \"phones\": [\n        \"8086615566\"\n      ],\n      \"postalCode\": \"96761\",\n      \"province\": \"HI\",\n      \"reviews\": [\n        {\n          \"date\": \"2010-09-25T00:00:00Z\",\n          \"dateAdded\": \"2016-05-05T00:56:21Z\",\n          \"dateSeen\": [\n            \"2015-10-19T00:00:00Z\"\n          ],\n          \"text\": \"LOVE THE FOOD HERE!  OMG!!!\",\n          \"username\": \"Terence Tang\"\n        }\n      ],\n      \"id\": \"AVwcw5TckufWRAb5yw_r\"\n    }\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "num_found": {
                      "type": "integer",
                      "example": 1467035,
                      "default": 0
                    },
                    "total_cost": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "records": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "address": {
                            "type": "string",
                            "example": "1221 Honoapiilani Hwy"
                          },
                          "categories": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "Vietnamese Restaurant"
                            }
                          },
                          "city": {
                            "type": "string",
                            "example": "Lahaina"
                          },
                          "country": {
                            "type": "string",
                            "example": "US"
                          },
                          "dateAdded": {
                            "type": "string",
                            "example": "2016-05-05T00:56:21Z"
                          },
                          "dateUpdated": {
                            "type": "string",
                            "example": "2016-08-18T04:17:54Z"
                          },
                          "keys": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "us/hi/lahaina/1221honoapiilanihwy/-416361451"
                            }
                          },
                          "latitude": {
                            "type": "string",
                            "example": "20.886342905"
                          },
                          "longitude": {
                            "type": "string",
                            "example": "-156.684429822"
                          },
                          "name": {
                            "type": "string",
                            "example": "Ba-le Vietnamese Food"
                          },
                          "phones": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "8086615566"
                            }
                          },
                          "postalCode": {
                            "type": "string",
                            "example": "96761"
                          },
                          "province": {
                            "type": "string",
                            "example": "HI"
                          },
                          "reviews": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "date": {
                                  "type": "string",
                                  "example": "2010-09-25T00:00:00Z"
                                },
                                "dateAdded": {
                                  "type": "string",
                                  "example": "2016-05-05T00:56:21Z"
                                },
                                "dateSeen": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "2015-10-19T00:00:00Z"
                                  }
                                },
                                "text": {
                                  "type": "string",
                                  "example": "LOVE THE FOOD HERE!  OMG!!!"
                                },
                                "username": {
                                  "type": "string",
                                  "example": "Terence Tang"
                                }
                              }
                            }
                          },
                          "id": {
                            "type": "string",
                            "example": "AVwcw5TckufWRAb5yw_r"
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c26"
}
```
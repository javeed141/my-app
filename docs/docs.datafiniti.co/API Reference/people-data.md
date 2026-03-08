# People Data

Search over 35 million business records.

Search millions of people records.

Example request body:

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
    "/people/search": {
      "post": {
        "summary": "People Data",
        "description": "Search over 35 million business records.",
        "operationId": "people-data",
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
                    "value": "{\n    \"num_found\": 357,\n    \"total_cost\": 1,\n    \"records\": [\n        {\n            \"address\": \"9855 Melbourne Ave\",\n            \"businessName\": \"MICHIGAN MARKETING EXTREME LLC\",\n            \"city\": \"Allen Park\",\n            \"country\": \"US\",\n            \"dateAdded\": \"2018-02-20T00:33:45Z\",\n            \"dateUpdated\": \"2018-02-20T00:33:45Z\",\n            \"emails\": [\n                \"billmey@michiganmarketingextreme.com\"\n            ],\n            \"firstName\": \"Bill\",\n            \"keys\": [\n                \"billmeymichiganmarketingextremecom\"\n            ],\n            \"lastName\": \"Mey\",\n            \"jobFunction\": \"Business Management\",\n            \"jobLevel\": \"C-Team\",\n            \"jobTitle\": \"CEO\",\n            \"numEmployeesMin\": 1,\n            \"numEmployeesMax\": 19,\n            \"phones\": [\n                \"7346190715\"\n            ],\n            \"postalCode\": \"48101\",\n            \"province\": \"MI\",\n            \"id\": \"AWG2azB1QH9dEUBnfEki\"\n        }\n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "num_found": {
                      "type": "integer",
                      "example": 357,
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
                            "example": "9855 Melbourne Ave"
                          },
                          "businessName": {
                            "type": "string",
                            "example": "MICHIGAN MARKETING EXTREME LLC"
                          },
                          "city": {
                            "type": "string",
                            "example": "Allen Park"
                          },
                          "country": {
                            "type": "string",
                            "example": "US"
                          },
                          "dateAdded": {
                            "type": "string",
                            "example": "2018-02-20T00:33:45Z"
                          },
                          "dateUpdated": {
                            "type": "string",
                            "example": "2018-02-20T00:33:45Z"
                          },
                          "emails": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "billmey@michiganmarketingextreme.com"
                            }
                          },
                          "firstName": {
                            "type": "string",
                            "example": "Bill"
                          },
                          "keys": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "billmeymichiganmarketingextremecom"
                            }
                          },
                          "lastName": {
                            "type": "string",
                            "example": "Mey"
                          },
                          "jobFunction": {
                            "type": "string",
                            "example": "Business Management"
                          },
                          "jobLevel": {
                            "type": "string",
                            "example": "C-Team"
                          },
                          "jobTitle": {
                            "type": "string",
                            "example": "CEO"
                          },
                          "numEmployeesMin": {
                            "type": "integer",
                            "example": 1,
                            "default": 0
                          },
                          "numEmployeesMax": {
                            "type": "integer",
                            "example": 19,
                            "default": 0
                          },
                          "phones": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "7346190715"
                            }
                          },
                          "postalCode": {
                            "type": "string",
                            "example": "48101"
                          },
                          "province": {
                            "type": "string",
                            "example": "MI"
                          },
                          "id": {
                            "type": "string",
                            "example": "AWG2azB1QH9dEUBnfEki"
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c84"
}
```
# Validate Routing Number

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "modern-treasury-api",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://app.moderntreasury.com/api"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "http",
        "scheme": "basic"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/validations/routing_numbers": {
      "get": {
        "summary": "Validate Routing Number",
        "description": "",
        "operationId": "validate-routing-number",
        "parameters": [
          {
            "name": "routing_number",
            "in": "query",
            "description": "The routing number that is being validated.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "routing_number_type",
            "in": "query",
            "description": "The type of the routing number. Routing number types are listed at [Routing Details](https://docs.moderntreasury.com/platform/reference/routing-detail-object)",
            "schema": {
              "type": "string"
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
                    "value": "{\n  \"routing_number\": \"021000021\",\n  \"routing_number_type\": \"aba\",\n  \"supported_payment_types\": [\"ach\", \"wire\", \"rtp\"],\n  \"bank_name\": \"Varo Bank, National Association\",\n  \"bank_address\": { \n    \"object\": \"address\",\n    \"line1\": \"6000 Universal Boulevard\",\n    \"line2\": null,\n    \"locality\": \"Orlando\",\n    \"region\": \"FL\",\n    \"postal_code\": \"32819\",\n    \"country\": \"US\"\n  }, \n  \"sanctions\": {}\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "routing_number": {
                      "type": "string",
                      "example": "021000021"
                    },
                    "routing_number_type": {
                      "type": "string",
                      "example": "aba"
                    },
                    "supported_payment_types": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "ach"
                      }
                    },
                    "bank_name": {
                      "type": "string",
                      "example": "Varo Bank, National Association"
                    },
                    "bank_address": {
                      "type": "object",
                      "properties": {
                        "object": {
                          "type": "string",
                          "example": "address"
                        },
                        "line1": {
                          "type": "string",
                          "example": "6000 Universal Boulevard"
                        },
                        "line2": {},
                        "locality": {
                          "type": "string",
                          "example": "Orlando"
                        },
                        "region": {
                          "type": "string",
                          "example": "FL"
                        },
                        "postal_code": {
                          "type": "string",
                          "example": "32819"
                        },
                        "country": {
                          "type": "string",
                          "example": "US"
                        }
                      }
                    },
                    "sanctions": {
                      "type": "object",
                      "properties": {}
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
                  "Routing number not found": {
                    "value": "{\n  \"errors\": {\n        \"code\": \"not_found\",\n        \"message\": \"Routing number was not found.\",\n        \"parameter\": \"routing_number\"\n    }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "string",
                          "example": "not_found"
                        },
                        "message": {
                          "type": "string",
                          "example": "Routing number was not found."
                        },
                        "parameter": {
                          "type": "string",
                          "example": "routing_number"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Invalid routing number": {
                    "value": "{\n  \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Routing number is invalid\",\n        \"parameter\": \"routing_number\"\n    }\n}"
                  },
                  "Not a customer": {
                    "value": "{\n  \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Feature is only available to customers.\",\n        \"parameter\": \"context\"\n    }\n}"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "Invalid routing number",
                      "type": "object",
                      "properties": {
                        "errors": {
                          "type": "object",
                          "properties": {
                            "code": {
                              "type": "string",
                              "example": "parameter_invalid"
                            },
                            "message": {
                              "type": "string",
                              "example": "Routing number is invalid"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "routing_number"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Not a customer",
                      "type": "object",
                      "properties": {
                        "errors": {
                          "type": "object",
                          "properties": {
                            "code": {
                              "type": "string",
                              "example": "parameter_invalid"
                            },
                            "message": {
                              "type": "string",
                              "example": "Feature is only available to customers."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "context"
                            }
                          }
                        }
                      }
                    }
                  ]
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
  "x-readme-fauxas": true
}
```
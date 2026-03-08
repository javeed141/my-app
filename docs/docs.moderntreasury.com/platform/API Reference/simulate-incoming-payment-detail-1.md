# Simulate Incoming Payment Detail

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
    "/simulations/incoming_payment_details/create_async": {
      "post": {
        "summary": "Simulate Incoming Payment Detail",
        "description": "",
        "operationId": "simulate-incoming-payment-detail-1",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "type",
                  "direction",
                  "amount",
                  "internal_account_id"
                ],
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "See possible types at [Incoming Payment Details](https://docs.moderntreasury.com/platform/reference/incoming-payment-detail-object)"
                  },
                  "direction": {
                    "type": "string",
                    "description": "One of `credit`, `debit`"
                  },
                  "amount": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "data": {
                    "type": "string",
                    "description": "Defaults to a generated representation of a possible payment pre-notification from a bank.",
                    "format": "json"
                  },
                  "currency": {
                    "type": "string",
                    "description": "Defaults to the currency of the originating account"
                  },
                  "internal_account_id": {
                    "type": "string",
                    "description": "The ID of one of your internal accounts"
                  },
                  "virtual_account_id": {
                    "type": "string",
                    "description": "An optional parameter to associate the incoming payment detail to a virtual account"
                  },
                  "as_of_date": {
                    "type": "string",
                    "description": "Defaults to today",
                    "format": "date"
                  },
                  "description": {
                    "type": "string",
                    "description": "Defaults to a random description string"
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
                    "value": "{\n  \"object\": \"incoming_payment_detail\",\n  \"id\": \"c5f4009c-bdd6-4cc1-84b2-17974ac9e77a\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "object": {
                      "type": "string",
                      "example": "incoming_payment_detail"
                    },
                    "id": {
                      "type": "string",
                      "example": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a"
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
  "x-readme-fauxas": true
}
```
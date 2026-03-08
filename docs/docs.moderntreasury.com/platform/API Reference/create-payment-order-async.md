# Async Create Payment Order

Create a new payment order asynchronously

Takes all the same arguments as [Create Payment Order](https://docs.moderntreasury.com/platform/reference/create-payment-order) except `documents`.

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
    "/payment_orders/create_async": {
      "post": {
        "summary": "Async Create Payment Order",
        "description": "Create a new payment order asynchronously",
        "operationId": "create-payment-order-async",
        "parameters": [
          {
            "name": "content-type",
            "in": "header",
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          }
        ],
        "responses": {
          "202": {
            "description": "202",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"object\": \"payment_order\",\n  \"id\": \"c5f4009c-bdd6-4cc1-84b2-17974ac9e77a\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "object": {
                      "type": "string",
                      "example": "payment_order"
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
# Get Reversal

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
    "/payment_orders/{payment_order_id}/reversals/{reversal_id}": {
      "get": {
        "summary": "Get Reversal",
        "description": "",
        "operationId": "get-reversal",
        "parameters": [
          {
            "name": "payment_order_id",
            "in": "path",
            "description": "The id of the payment order being reversed.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "reversal_id",
            "in": "path",
            "description": "The ID of the reversal.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
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
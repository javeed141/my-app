# Add Payment Order to Invoice

Add a Payment Order to an Invoice. The invoice must be in the `unpaid` state and the payment order must have matching `originating_account_id`, `amount`, `currency` to the invoice and must be in the direction of a `debit`.

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
    "/invoices/{id}/payment_orders/{payment_order_id}": {
      "put": {
        "summary": "Add Payment Order to Invoice",
        "description": "Add a Payment Order to an Invoice. The invoice must be in the `unpaid` state and the payment order must have matching `originating_account_id`, `amount`, `currency` to the invoice and must be in the direction of a `debit`.",
        "operationId": "add_payment_order_to_invoice",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the invoice.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "payment_order_id",
            "in": "path",
            "description": "The ID of the payment order.",
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
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
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
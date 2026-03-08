# Create Transaction Line Items

Creates a transaction line item in Modern Treasury to represent reconciliation between a Transaction and Expected Payment.

Creating a transaction line item will change the reconciliation states of the input objects - the transaction and expected payment.

> 🚧 Only for transaction -> expected payment line items
>
> Only transaction line items between transactions and expected payments can be created. Transaction line items between transactions and other objects - such as payment orders and incoming payment details - cannot be created.

> 🚧 Reconciliation Groups
>
> Single transaction line items cannot be created with a `reconciliation_group_id`. To create two or more line items tied to a reconciliation group use the Bulk Requests API.

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
    "/transaction_line_items": {
      "post": {
        "summary": "Create Transaction Line Items",
        "description": "Creates a transaction line item in Modern Treasury to represent reconciliation between a Transaction and Expected Payment.",
        "operationId": "create-transaction-line-items",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "amount",
                  "transaction_id",
                  "expected_payment_id"
                ],
                "properties": {
                  "amount": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "transaction_id": {
                    "type": "string",
                    "description": "The ID of the Transaction you wish to reconcile"
                  },
                  "expected_payment_id": {
                    "type": "string",
                    "description": "The ID of the Expected Payment you wish to reconcile"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "201",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": ""
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
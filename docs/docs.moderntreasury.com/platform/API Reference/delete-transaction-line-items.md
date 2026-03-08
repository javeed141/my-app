# Delete Transaction Line Items

Deletes a transaction line item in Modern Treasury to represent unreconciliation between a Transaction and Expected Payment.

Deleting a transaction line item will change the reconciliation states of the reconciled objects - the transaction and expected payment.

> 🚧 Only for transaction -> expected payment line items
>
> Only transaction line items between transactions and expected payments can be deleted. Transaction line items between transactions and other objects - such as payment orders and incoming payment details - cannot be deleted.

> 🚧 Reconciliation Groups
>
> A transaction line item that belongs to a reconciliation group can only be deleted using the Bulk Requests API.

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
    "/transaction_line_items/{id}": {
      "delete": {
        "summary": "Delete Transaction Line Items",
        "description": "Deletes a transaction line item in Modern Treasury to represent unreconciliation between a Transaction and Expected Payment.",
        "operationId": "delete-transaction-line-items",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the transaction line item",
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
                    "value": "{\n  \"id\": \"641e15b7-a326-44b1-9ed2-536cd327101b\",\n  \"object\": \"transaction_line_item\",\n  \"transactable_type\": null,\n  \"transactable_id\": null,\n  \"transaction_id\": \"30dd4826-732f-4fe5-ab15-fc903f85ffdd\",\n  \"amount\": 100,\n  \"description\": \"Payment from XYZ Co\",\n  \"counterparty_id\": null,\n  \"expected_payment_id\": \"903e15b7-a176-44b1-9ed2-536cd327h7r7\",\n  \"reconcilable\": true,\n  \"created_at\": \"2022-11-01T20:50:56Z\",\n  \"updated_at\": \"2022-11-01T20:50:56Z\",\n  \"discarded_at\": \"2022-11-01T20:50:56Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "641e15b7-a326-44b1-9ed2-536cd327101b"
                    },
                    "object": {
                      "type": "string",
                      "example": "transaction_line_item"
                    },
                    "transactable_type": {},
                    "transactable_id": {},
                    "transaction_id": {
                      "type": "string",
                      "example": "30dd4826-732f-4fe5-ab15-fc903f85ffdd"
                    },
                    "amount": {
                      "type": "integer",
                      "example": 100,
                      "default": 0
                    },
                    "description": {
                      "type": "string",
                      "example": "Payment from XYZ Co"
                    },
                    "counterparty_id": {},
                    "expected_payment_id": {
                      "type": "string",
                      "example": "903e15b7-a176-44b1-9ed2-536cd327h7r7"
                    },
                    "reconcilable": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T20:50:56Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T20:50:56Z"
                    },
                    "discarded_at": {
                      "type": "string",
                      "example": "2022-11-01T20:50:56Z"
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
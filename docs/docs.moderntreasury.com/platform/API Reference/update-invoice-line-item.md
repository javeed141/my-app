# Update Invoice Line Item

Update an invoice line item

Invoice line items can only be added to an invoice in the `draft` state.\
`amount` is computed as `unit_amount * quantity`.

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
    "/invoices/{invoice_id}/invoice_line_items/{invoice_line_item_id}": {
      "patch": {
        "summary": "Update Invoice Line Item",
        "description": "Update an invoice line item",
        "operationId": "update-invoice-line-item",
        "parameters": [
          {
            "name": "invoice_id",
            "in": "path",
            "description": "The ID of the invoice the line item belongs to.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "invoice_line_item_id",
            "in": "path",
            "description": "The ID of the invoice line item.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "unit_amount": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "unit_amount_decimal": {
                    "type": "string",
                    "description": "The cost per unit of the product or service that this line item is for, specified in the invoice currency's smallest unit. Accepts decimal strings with up to 12 decimals."
                  },
                  "direction": {
                    "type": "string",
                    "default": "debit",
                    "enum": [
                      "credit",
                      "debit"
                    ]
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).",
                    "format": "json"
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
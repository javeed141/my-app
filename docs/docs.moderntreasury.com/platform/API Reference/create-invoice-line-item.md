# Create Invoice Line Item

Create a new invoice line item

Invoice line items can only be added to an invoice in the `draft` state.\
`unit_amount` is a required attribute. `quantity` is optional and defaults to 1 when not provided. `amount` is computed as `unit_amount * quantity`.

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
    "/invoices/{invoice_id}/invoice_line_items": {
      "post": {
        "summary": "Create Invoice Line Item",
        "description": "Create a new invoice line item",
        "operationId": "create-invoice-line-item",
        "parameters": [
          {
            "name": "invoice_id",
            "in": "path",
            "description": "The ID of the invoice the line item belongs to.",
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
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Name of the line item, typically a product or SKU name."
                  },
                  "description": {
                    "type": "string",
                    "description": "An optional free-form description of the line item."
                  },
                  "quantity": {
                    "type": "integer",
                    "description": "The number of units of a product or service that this line item is for. Must be a whole number. Defaults to 1 if not provided.",
                    "format": "int32"
                  },
                  "unit_amount": {
                    "type": "integer",
                    "description": "The cost per unit of the product or service that this line item is for, specified in the invoice currency's smallest unit.",
                    "format": "int32"
                  },
                  "unit_amount_decimal": {
                    "type": "string",
                    "description": "The cost per unit of the product or service that this line item is for, specified in the invoice currency's smallest unit. Accepts decimal strings with up to 12 decimals."
                  },
                  "direction": {
                    "type": "string",
                    "description": "`debit` indicates that the counterparty owes the business money and increases the invoice's `total_amount` due. `credit` has the opposite intention and effect.",
                    "default": "debit",
                    "enum": [
                      "debit",
                      "credit"
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
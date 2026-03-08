# Get InvoiceLineItem

Get one invoice line item

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
    "/invoices/{id}/invoice_line_items/{invoice_line_item_id}": {
      "get": {
        "summary": "Get InvoiceLineItem",
        "description": "Get one invoice line item",
        "operationId": "get-invoice-line-item",
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
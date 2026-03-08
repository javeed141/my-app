# List Invoices

Get a list of all invoices

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
    "/invoices": {
      "get": {
        "summary": "List Invoices",
        "description": "Get a list of all invoices",
        "operationId": "list-invoices",
        "parameters": [
          {
            "name": "after_cursor",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "per_page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 25
            }
          },
          {
            "name": "counterparty_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "originating_account_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "payment_order_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "expected_payment_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "draft",
                "paid",
                "partially_paid",
                "payment_pending",
                "unpaid",
                "voided"
              ]
            }
          },
          {
            "name": "number",
            "in": "query",
            "description": "A unique record number assigned to each invoice that is issued.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "due_date_start",
            "in": "query",
            "description": "An inclusive lower bound for searching due_date",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "due_date_end",
            "in": "query",
            "description": "An inclusive upper bound for searching due_date",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "metadata",
            "in": "query",
            "description": "For example, if you want to query for records with metadata key `Type` and value `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query parameters.",
            "schema": {
              "type": "string"
            }
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
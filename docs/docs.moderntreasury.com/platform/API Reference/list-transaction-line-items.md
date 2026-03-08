# List Transaction Line Items

Get a list of transaction line items

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
      "get": {
        "summary": "List Transaction Line Items",
        "description": "Get a list of transaction line items",
        "operationId": "list-transaction-line-items",
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
            "name": "id[]",
            "in": "query",
            "description": "If you have specific IDs to retrieve in bulk, you can pass them as query parameters delimited with `id[]=`, for example `?id[]=123&id[]=abc`.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "transaction_id",
            "in": "query",
            "description": "To query transaction line items by the parent transaction, use this query parameter.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "type",
            "in": "query",
            "description": "One of `originating` or `receiving`",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "expected_payment_id",
            "in": "query",
            "description": "To query transaction line items by their reconciled expected payment",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "reconciliation_group_id",
            "in": "query",
            "description": "To query transaction line items within a specific reconciliation group",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "created_at_lower_bound",
            "in": "query",
            "description": "Used to return transaction line items created after some datetime",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "created_at_upper_bound",
            "in": "query",
            "description": "Used to return transaction line items created before some datetime",
            "schema": {
              "type": "string",
              "format": "date"
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
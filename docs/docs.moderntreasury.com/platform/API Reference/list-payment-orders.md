# List Payment Orders

Get a list of all payment orders

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
    "/payment_orders": {
      "get": {
        "summary": "List Payment Orders",
        "description": "Get a list of all payment orders",
        "operationId": "list-payment-orders",
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
            "name": "type",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "effective_date_start",
            "in": "query",
            "description": "An inclusive lower bound for searching effective_date",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "effective_date_end",
            "in": "query",
            "description": "An inclusive upper bound for searching effective_date",
            "schema": {
              "type": "string",
              "format": "date"
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
            "name": "metadata",
            "in": "query",
            "description": "For example, if you want to query for records with metadata key `Type` and value `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query parameters.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "direction",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "transaction_id",
            "in": "query",
            "description": "The ID of a transaction that the payment order has been reconciled to",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "reference_number",
            "in": "query",
            "description": "Query for records with the provided reference number",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "priority",
            "in": "query",
            "description": "Either `normal` or `high`. For ACH and EFT payments, `high` represents a same-day ACH or EFT transfer, respectively. For check payments, `high` can mean an overnight check rather than standard mail.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "created_at_start",
            "in": "query",
            "description": "An inclusive lower bound for searching `created_at`",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "created_at_end",
            "in": "query",
            "description": "An inclusive upper bound for searching `created_at`",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "process_after_start",
            "in": "query",
            "description": "An inclusive lower bound for searching `process_after`",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "process_after_end",
            "in": "query",
            "description": "An inclusive upper bound for searching `process_after`",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "in": "query",
            "name": "external_id",
            "schema": {
              "type": "string"
            },
            "required": false,
            "description": "An external ID to filter Payment Orders on"
          },
          {
            "in": "query",
            "name": "amount",
            "schema": {
              "type": "object",
              "properties": {
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "lt": {
                  "type": "integer",
                  "format": "int32"
                },
                "lte": {
                  "type": "integer",
                  "format": "int32"
                },
                "eq": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              }
            },
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), `eq` (=), or `not_eq` (!=) to filter by balance amount."
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
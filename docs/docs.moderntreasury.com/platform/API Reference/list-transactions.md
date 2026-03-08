# List Transactions

Get a list of all transactions

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
    "/transactions": {
      "get": {
        "summary": "List Transactions",
        "description": "Get a list of all transactions",
        "operationId": "list-transactions",
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
            "name": "internal_account_id",
            "in": "query",
            "description": "Specify `internal_account_id` if you wish to see transactions to/from a specific account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "virtual_account_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "posted",
            "in": "query",
            "description": "Either `true` or `false`",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "as_of_date_start",
            "in": "query",
            "description": "Filters transactions with a `as_of_date` starting on or after the specified date (YYYY-MM-DD).",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "as_of_date_end",
            "in": "query",
            "description": "Filters transactions with a `as_of_date` starting on or before the specified date (YYYY-MM-DD).",
            "schema": {
              "type": "string",
              "format": "date"
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
            "name": "counterparty_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "metadata",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "payment_type",
            "in": "query",
            "description": "See [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object) for a list of possible types.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "transactable_type",
            "in": "query",
            "description": "Filters for transactions that have transaction_line_items for the specified transactable_type. This can be one of `payment_order`, `incoming_payment_detail`, `paper_item`, `reversal`, or `return`.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "description",
            "in": "query",
            "description": "Filters for transactions including the queried string in the description",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "vendor_id",
            "in": "query",
            "description": "Filters for transactions including the queried vendor id (an identifier given to transactions by the bank).",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "expected_payment_id",
            "in": "query",
            "description": "To query transactions by their reconciled expected payment",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "reconciled",
            "in": "query",
            "description": "Filters for reconciled (`true`) or unreconciled (`false`) transactions",
            "schema": {
              "type": "boolean"
            }
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
                "le": {
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
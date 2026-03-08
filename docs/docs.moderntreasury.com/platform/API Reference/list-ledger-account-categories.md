# List Ledger Account Categories

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
    "/ledger_account_categories": {
      "get": {
        "summary": "List Ledger Account Categories",
        "description": "",
        "operationId": "list-ledger-account-categories",
        "parameters": [
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
            "name": "name",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "name",
            "in": "query",
            "description": "If you have specific names to retrieve in bulk, you can pass them as query parameters delimited with `name[]=`, for example `?name[]=my-category&name[]=your-category`. Partial match here is enabled.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "ledger_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "currency",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "parent_ledger_account_category_id",
            "in": "query",
            "description": "Query categories that are nested underneath a parent category",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_account_id",
            "in": "query",
            "description": "Query categories which contain a Ledger Account or contain other categories which contain the Ledger Account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "balances",
            "in": "query",
            "description": "For example, if you want the balances as of a particular time (ISO8601), the encoded query string would be `balances%5Beffective_at%5D=2000-12-31T12:00:00Z`. The balances as of a time are inclusive of entries with that exact time, but with respect to the ledger accounts that are currently present in the category.",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "pending_balance_amount",
            "schema": {
              "type": "object",
              "properties": {
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
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              }
            },
            "description": "Use gt (>), gte (>=), lt (<), lte (<=), eq (=), or not_eq (!=) to filter by the current balance amount.\n\nNote: The balances utilized for filtering are eventually consistent, and there may be a delay in reflecting the most recent Ledger Entries written to a Ledger Account Category."
          },
          {
            "in": "query",
            "name": "posted_balance_amount",
            "schema": {
              "type": "object",
              "properties": {
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
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              }
            },
            "description": "Use gt (>), gte (>=), lt (<), lte (<=), eq (=), or not_eq (!=) to filter by the current balance amount.\n\nNote: The balances utilized for filtering are eventually consistent, and there may be a delay in reflecting the most recent Ledger Entries written to a Ledger Account Category."
          },
          {
            "in": "query",
            "name": "available_balance_amount",
            "schema": {
              "type": "object",
              "properties": {
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
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              }
            },
            "description": "Use gt (>), gte (>=), lt (<), lte (<=), eq (=), or not_eq (!=) to filter by the current balance amount.\n\nNote: The balances utilized for filtering are eventually consistent, and there may be a delay in reflecting the most recent Ledger Entries written to a Ledger Account Category."
          },
          {
            "name": "external_id",
            "in": "query",
            "description": "To query ledger account categories by the external_id, use this query parameter.",
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
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "text/plain": {
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
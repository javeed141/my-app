# List Ledger Entries

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
    "/ledger_entries": {
      "get": {
        "summary": "List Ledger Entries",
        "description": "",
        "operationId": "list-ledger-entries",
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
            "name": "ledger_account_id",
            "in": "query",
            "description": "Shows all ledger entries on an account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_transaction_id",
            "in": "query",
            "description": "Shows all ledger entries on a transaction.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_account_settlement_id",
            "in": "query",
            "description": "To retrieve the itemized Ledger Entries of an associated settlement, use this query parameter.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "effective_at",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), or `eq` (=) to filter by the transaction's effective at. Format ISO8601.",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "updated_at",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), or `eq` (=) to filter by the posted at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use `updated_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "created_at",
            "in": "query",
            "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to filter by the created at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use created_at%5Bgt%5D=2000-01-01T12:00:00Z.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "as_of_lock_version",
            "in": "query",
            "description": "Shows all ledger entries that were present on a ledger account at a particular `lock_version`. You must also specify `ledger_account_id`.",
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          },
          {
            "name": "ledger_account_category_id",
            "in": "query",
            "description": "Shows all ledger entries for ledger accounts in a particular ledger account category.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_account_statement_id",
            "in": "query",
            "description": "Shows all ledger entries for a particular ledger account statement.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "show_deleted",
            "in": "query",
            "description": "If `true`, response will include ledger entries that were deleted. When you update a ledger transaction to specify a new set of entries, the previous entries are deleted.",
            "schema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "name": "direction",
            "in": "query",
            "description": "Get all ledger entries that match the direction specified.",
            "schema": {
              "type": "string",
              "enum": [
                "credit",
                "debit"
              ]
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "To query ledger entries by status, use this query parameter.  Can be `pending`, `posted`, or `archived`.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status[]",
            "in": "query",
            "description": "To query ledger entries by status, use this query parameter.  Can be `pending`, `posted`, or `archived`. For multiple statuses, use `status[]=pending&status[]=posted`.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
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
          },
          {
            "name": "order_by",
            "in": "query",
            "description": "Order by `created_at` or `effective_at` in `asc` or `desc` order. For example, to order by `effective_at asc`, use `order_by%5Beffective_at%5D=asc`. Ordering by only one field at a time is supported.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "show_balances",
            "in": "query",
            "description": "If true, response will include the balances attached to the ledger entry. If there is no balance available, null will be returned instead.",
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
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              }
            },
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), `eq` (=), or `not_eq` (!=) to filter by the ledger entry amount."
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[\n  {\n    \"id\": \"a3c45984-aa05-4554-8c7d-eee9a8053fac\",\n    \"object\": \"ledger_entry\",\n    \"live_mode\": false,\n    \"amount\": 100,\n    \"direction\": \"credit\",\n    \"status\": \"pending\",\n    \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n    \"ledger_account_currency\": \"USD\",\n    \"ledger_account_currency_exponent\": 2,\n    \"ledger_account_lock_version\": 3,\n    \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n    \"resulting_ledger_account_balances\": null,\n    \"discarded_at\": null,\n    \"created_at\": \"2022-11-01T21:29:56Z\",\n    \"updated_at\": \"2022-11-01T21:29:56Z\"\n  },\n  {\n    \"id\": \"6f285fc2-7259-40e8-bfa9-3be8ae802f1f\",\n    \"object\": \"ledger_entry\",\n    \"live_mode\": false,\n    \"amount\": 100,\n    \"direction\": \"debit\",\n    \"status\": \"pending\",\n    \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n    \"ledger_account_currency\": \"USD\",\n    \"ledger_account_currency_exponent\": 2,\n    \"ledger_account_lock_version\": 3,\n    \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n    \"resulting_ledger_account_balances\": null,\n    \"discarded_at\": null,\n    \"created_at\": \"2022-11-01T21:29:56Z\",\n    \"updated_at\": \"2022-11-01T21:29:56Z\"\n  }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "a3c45984-aa05-4554-8c7d-eee9a8053fac"
                      },
                      "object": {
                        "type": "string",
                        "example": "ledger_entry"
                      },
                      "live_mode": {
                        "type": "boolean",
                        "example": false,
                        "default": true
                      },
                      "amount": {
                        "type": "integer",
                        "example": 100,
                        "default": 0
                      },
                      "direction": {
                        "type": "string",
                        "example": "credit"
                      },
                      "status": {
                        "type": "string",
                        "example": "pending"
                      },
                      "ledger_account_id": {
                        "type": "string",
                        "example": "641e4d45-7fff-4e7e-ae05-1db2614b4a1e"
                      },
                      "ledger_account_currency": {
                        "type": "string",
                        "example": "USD"
                      },
                      "ledger_account_currency_exponent": {
                        "type": "integer",
                        "example": 2,
                        "default": 0
                      },
                      "ledger_account_lock_version": {
                        "type": "integer",
                        "example": 3,
                        "default": 0
                      },
                      "ledger_transaction_id": {
                        "type": "string",
                        "example": "7f973ee9-597c-46e3-bcf1-359e0115d560"
                      },
                      "resulting_ledger_account_balances": {},
                      "discarded_at": {},
                      "created_at": {
                        "type": "string",
                        "example": "2022-11-01T21:29:56Z"
                      },
                      "updated_at": {
                        "type": "string",
                        "example": "2022-11-01T21:29:56Z"
                      }
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
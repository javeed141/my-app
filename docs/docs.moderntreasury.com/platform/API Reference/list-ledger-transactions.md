# List Ledger Transactions

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
    "/ledger_transactions": {
      "get": {
        "summary": "List Ledger Transactions",
        "description": "",
        "operationId": "list-ledger-transactions",
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
            "name": "ledger_id",
            "in": "query",
            "description": "To query ledger transactions by their ledger_id, use this query parameter.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_account_id",
            "in": "query",
            "description": "To query ledger transactions by the presence of a ledger account on either side of the transaction, use this query parameter.",
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
            "name": "effective_at",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), or `eq` (=) to filter by `effective_at`. For example, for all dates after Jan 1 2000, use `effective_at%5Bgt%5D=2000-01-01T00:00:00.000`.",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "posted_at",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), or `eq` (=) to filter by the posted at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use `posted_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
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
              "format": "date"
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
            "name": "order_by",
            "in": "query",
            "description": "Order by `created_at`or `effective_at` in `asc` or `desc` order. For example, to order by `effective_at asc`, use `order_by%5Beffective_at%5D=asc`. Ordering by only one field at a time is supported.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "To query ledger transactions by status, use this query parameter.  Can be `pending`, `posted`, or `archived`.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status[]",
            "in": "query",
            "description": "To query ledger transactions by multiple statuses, use this query parameter delimited with `status[]=`.  Can be `pending`, `posted`, or `archived`.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "external_id",
            "in": "query",
            "description": "To query ledger transactions by the external_id, use this query parameter.  Ledger transactions are uniquely specified with external_id and ledger_id. Only one pending or posted ledger transaction will have this external ID in the ledger.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_account_category_id",
            "in": "query",
            "description": "To query ledger transactions by the presence of an account in a specific ledger account category on either side of the transaction, use this query parameter.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_account_settlement_id",
            "in": "query",
            "description": "To retrieve the itemized Ledger Transactions of an associated settlement, use this query parameter.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "reverses_ledger_transaction_id",
            "in": "query",
            "description": "To find reversal ledger transactions that reverses a ledger transaction, use this parameter.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "archived_reason",
            "in": "query",
            "description": "To query ledger transactions that were auto-archived; currently only 'balance_lock_failure' for transactions that violated balance constraints.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledgerable_id",
            "in": "query",
            "description": "If the ledger transaction can be reconciled to another object in Modern Treasury, the ID of the ledgerable can be used to query the ledger transactions.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledgerable_type",
            "in": "query",
            "description": "If the ledger transaction can be reconciled to another object in Modern Treasury, the type of the ledgerable can be used to query the ledger transactions.",
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
            "description": "Use gt (>), gte (>=), lt (<), lte (<=), eq (=), or not_eq (!=) to filter by the ledger transaction amount. Only supported for single currency transactions."
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[\n  {\n    \"id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n    \"object\": \"ledger_transaction\",\n    \"live_mode\": false,\n    \"external_id\": \"1590aa8d-24e0-491b-bc06-d4e5843a212c\",\n    \"ledgerable_type\": null,\n    \"ledgerable_id\": null,\n    \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n    \"description\": null,\n    \"status\": \"posted\",\n    \"archived_reason\": null,\n    \"ledger_entries\": [\n      {\n        \"id\": \"afd72914-6014-46a8-997b-3a862aed6375\",\n        \"object\": \"ledger_entry\",\n        \"live_mode\": false,\n        \"amount\": 100,\n        \"direction\": \"debit\",\n        \"status\": \"posted\",\n        \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n        \"ledger_account_currency\": \"USD\",\n        \"ledger_account_currency_exponent\": 2,\n        \"ledger_account_lock_version\": 1,\n        \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n        \"resulting_ledger_account_balances\": null,\n        \"discarded_at\": null,\n        \"created_at\": \"2022-11-01T21:24:45Z\",\n        \"updated_at\": \"2022-11-01T21:24:45Z\"\n      },\n      {\n        \"id\": \"1db5e286-a845-4cee-8a0f-366ff56e175c\",\n        \"object\": \"ledger_entry\",\n        \"live_mode\": false,\n        \"amount\": 100,\n        \"direction\": \"credit\",\n        \"status\": \"posted,\n        \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n        \"ledger_account_currency\": \"USD\",\n        \"ledger_account_currency_exponent\": 2,\n        \"ledger_account_lock_version\": 1,\n        \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n        \"resulting_ledger_account_balances\": null,\n        \"discarded_at\": null,\n        \"created_at\": \"2022-11-01T21:24:45Z\",\n        \"updated_at\": \"2022-11-01T21:24:45Z\"\n      }\n    ],\n    \"posted_at\": \"2022-11-01T21:24:45Z\",\n    \"effective_at\": \"2022-11-01T00:00:00.000000Z\",\n    \"effective_date\": \"2022-11-01\",\n    \"metadata\": {},\n    \"created_at\": \"2022-11-01T21:24:45Z\",\n    \"updated_at\": \"2022-11-01T21:24:45Z\"\n  }\n]"
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
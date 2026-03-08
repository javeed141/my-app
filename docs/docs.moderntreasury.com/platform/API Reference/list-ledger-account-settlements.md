# List Ledger Account Settlements

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
    "/ledger_account_settlements": {
      "get": {
        "summary": "List Ledger Account Settlements",
        "description": "",
        "operationId": "list-ledger-account-settlements",
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
            "name": "settled_ledger_account_id",
            "in": "query",
            "description": "Filter ledger account settlements by the settled ledger account id",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_transaction_id",
            "in": "query",
            "description": "ID of the settlement ledger transaction",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ledger_id",
            "in": "query",
            "description": "ID of the ledger the settlement is in",
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
            "name": "created_at",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), or `eq` (=) to filter by the created at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use `created_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "updated_at",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), or `eq` (=) to filter by the created at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use `created_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
            "schema": {
              "type": "string",
              "format": "date-time"
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
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[\n  {\n    \"id\": \"dbdbbfe5-da56-4aaf-be36-3fbc415622dd\",\n    \"object\": \"ledger_account_payout\",\n    \"live_mode\": true,\n    \"description\": \"Alice's January payout\",\n    \"payout_ledger_account_id\": \"d44ad0d0-b3ea-4698-867d-09fe961e52a6\",\n    \"funding_ledger_account_id\": \"3824af4d-4151-48f6-8e8b-bf859cbddbcd\",\n    \"effective_at_upper_bound\": \"2023-01-01T00:00:00.000Z\",\n    \"status\": \"pending\",\n    \"amount\": 1000,\n    \"currency\": \"USD\",\n    \"ledger_transaction_id\": \"b47ce462-806b-4d5d-9476-9add11a42529\",\n    \"metadata\": {\n        \"foo\": \"bar\"\n    },\n    \"created_at\": \"2023-01-11T20:35:36Z\",\n    \"updated_at\": \"2023-01-11T20:36:02Z\"\n}\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "dbdbbfe5-da56-4aaf-be36-3fbc415622dd"
                      },
                      "object": {
                        "type": "string",
                        "example": "ledger_account_payout"
                      },
                      "live_mode": {
                        "type": "boolean",
                        "example": true,
                        "default": true
                      },
                      "description": {
                        "type": "string",
                        "example": "Alice's January payout"
                      },
                      "payout_ledger_account_id": {
                        "type": "string",
                        "example": "d44ad0d0-b3ea-4698-867d-09fe961e52a6"
                      },
                      "funding_ledger_account_id": {
                        "type": "string",
                        "example": "3824af4d-4151-48f6-8e8b-bf859cbddbcd"
                      },
                      "effective_at_upper_bound": {
                        "type": "string",
                        "example": "2023-01-01T00:00:00.000Z"
                      },
                      "status": {
                        "type": "string",
                        "example": "pending"
                      },
                      "amount": {
                        "type": "integer",
                        "example": 1000,
                        "default": 0
                      },
                      "currency": {
                        "type": "string",
                        "example": "USD"
                      },
                      "ledger_transaction_id": {
                        "type": "string",
                        "example": "b47ce462-806b-4d5d-9476-9add11a42529"
                      },
                      "metadata": {
                        "type": "object",
                        "properties": {
                          "foo": {
                            "type": "string",
                            "example": "bar"
                          }
                        }
                      },
                      "created_at": {
                        "type": "string",
                        "example": "2023-01-11T20:35:36Z"
                      },
                      "updated_at": {
                        "type": "string",
                        "example": "2023-01-11T20:36:02Z"
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
# Get Ledger Entry

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
    "/ledger_entries/{id}": {
      "get": {
        "summary": "Get Ledger Entry",
        "description": "",
        "operationId": "get-ledger-entry",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger entry.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "show_balances",
            "in": "query",
            "description": "If true, response will include the balances attached to the ledger entry. If there is no balance available, null will be returned instead.",
            "schema": {
              "type": "boolean"
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
                    "value": "{\n  \"id\": \"a3c45984-aa05-4554-8c7d-eee9a8053fac\",\n  \"object\": \"ledger_entry\",\n  \"live_mode\": false,\n  \"amount\": 100,\n  \"direction\": \"credit\",\n  \"status\": \"pending\",\n  \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n  \"ledger_account_currency\": \"USD\",\n  \"ledger_account_currency_exponent\": 2,\n  \"ledger_account_lock_version\": 3,\n  \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n  \"resulting_ledger_account_balances\": null,\n  \"discarded_at\": null,\n  \"created_at\": \"2022-11-01T21:29:56Z\",\n  \"updated_at\": \"2022-11-01T21:29:56Z\"\n}"
                  }
                },
                "schema": {
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
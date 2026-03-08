# Get Ledger Transaction

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
    "/ledger_transactions/{id}": {
      "get": {
        "summary": "Get Ledger Transaction",
        "description": "",
        "operationId": "get-ledger-transaction",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger transaction. Modern Treasury provided IDs or External IDs are accepted. For External IDs, only non-archived transactions are returned.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n  \"object\": \"ledger_transaction\",\n  \"live_mode\": false,\n  \"external_id\": \"1590aa8d-24e0-491b-bc06-d4e5843a212c\",\n  \"ledgerable_type\": null,\n  \"ledgerable_id\": null,\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"status\": \"posted\",\n  \"reverses_ledger_transaction_id\": null,\n   \"reversed_by_ledger_transaction_id\": null,\n  \"archived_reason\": null,\n  \"ledger_entries\": [\n    {\n      \"id\": \"afd72914-6014-46a8-997b-3a862aed6375\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"debit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": null,\n      \"metadata\": {},\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    },\n    {\n      \"id\": \"1db5e286-a845-4cee-8a0f-366ff56e175c\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"credit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": null,\n      \"metadata\": {},\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    }\n  ],\n  \"posted_at\": \"2022-11-01T21:24:45Z\",\n  \"effective_at\": \"2022-11-01T00:00:00.000Z\",\n  \"effective_date\": \"2022-11-01\",\n  \"metadata\": {},\n  \"created_at\": \"2022-11-01T21:24:45Z\",\n  \"updated_at\": \"2022-11-01T21:24:45Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "53769ada-5ae4-4184-bb39-a3632daa88f9"
                    },
                    "object": {
                      "type": "string",
                      "example": "ledger_transaction"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "external_id": {
                      "type": "string",
                      "example": "1590aa8d-24e0-491b-bc06-d4e5843a212c"
                    },
                    "ledgerable_type": {},
                    "ledgerable_id": {},
                    "ledger_id": {
                      "type": "string",
                      "example": "fe96565f-4b9c-4871-8fb0-e6f02683458e"
                    },
                    "description": {},
                    "status": {
                      "type": "string",
                      "example": "posted"
                    },
                    "reverses_ledger_transaction_id": {},
                    "reversed_by_ledger_transaction_id": {},
                    "archived_reason": {},
                    "ledger_entries": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "afd72914-6014-46a8-997b-3a862aed6375"
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
                            "example": "debit"
                          },
                          "status": {
                            "type": "string",
                            "example": "posted"
                          },
                          "ledger_account_id": {
                            "type": "string",
                            "example": "6168628a-05a6-4d30-80ca-4080ea699179"
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
                            "example": 1,
                            "default": 0
                          },
                          "ledger_transaction_id": {
                            "type": "string",
                            "example": "53769ada-5ae4-4184-bb39-a3632daa88f9"
                          },
                          "resulting_ledger_account_balances": {},
                          "metadata": {
                            "type": "object",
                            "properties": {}
                          },
                          "discarded_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2022-11-01T21:24:45Z"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-11-01T21:24:45Z"
                          }
                        }
                      }
                    },
                    "posted_at": {
                      "type": "string",
                      "example": "2022-11-01T21:24:45Z"
                    },
                    "effective_at": {
                      "type": "string",
                      "example": "2022-11-01T00:00:00.000Z"
                    },
                    "effective_date": {
                      "type": "string",
                      "example": "2022-11-01"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T21:24:45Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T21:24:45Z"
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
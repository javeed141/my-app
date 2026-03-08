# List Ledger Transaction Versions

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
    "/ledger_transactions/{id}/versions": {
      "get": {
        "summary": "List Ledger Transaction Versions",
        "description": "",
        "operationId": "list-ledger-transaction-versions",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger transaction.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "ledger_account_statement_id",
            "in": "query",
            "description": "The ID of the ledger account statement.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "created_at",
            "in": "query",
            "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to filter by the created at timestamp of the version. For example, for all times after Jan 1 2000 12:00 UTC, use `created_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "version",
            "in": "query",
            "description": "Use \"gt\" (>), \"gte\" (>=), \"lt\" (<), \"lte\" (<=), or \"eq\" (=) to filter by the version. For example, for all versions after 2, use version%5Bgt%5D=2",
            "schema": {
              "type": "integer",
              "format": "int64"
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
                    "value": "[\n  {\n    \"id\": \"08a8f85e-5e51-465d-abda-338c3392ec04\",\n    \"object\": \"ledger_transaction_version\",\n    \"live_mode\": false,\n    \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n    \"external_id\": \"ecfbad72-c438-49f7-8198-d4bdf1e169bf\",\n    \"ledgerable_type\": null,\n    \"ledgerable_id\": null,\n    \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n    \"description\": null,\n    \"status\": \"posted\",\n    \"archived_reason\": null,\n    \"ledger_entries\": [\n      {\n        \"id\": \"6f285fc2-7259-40e8-bfa9-3be8ae802f1f\",\n        \"object\": \"ledger_entry\",\n        \"live_mode\": false,\n        \"amount\": 100,\n        \"direction\": \"debit\",\n        \"status\": \"posted\",\n        \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n        \"ledger_account_currency\": \"USD\",\n        \"ledger_account_currency_exponent\": 2,\n        \"ledger_account_lock_version\": 3,\n        \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n        \"resulting_ledger_account_balances\": null,\n        \"created_at\": \"2022-11-01T21:29:56Z\"\n      },\n      {\n        \"id\": \"a3c45984-aa05-4554-8c7d-eee9a8053fac\",\n        \"object\": \"ledger_entry\",\n        \"live_mode\": false,\n        \"amount\": 100,\n        \"direction\": \"credit\",\n        \"status\": \"posted\",\n        \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n        \"ledger_account_currency\": \"USD\",\n        \"ledger_account_currency_exponent\": 2,\n        \"ledger_account_lock_version\": 3,\n        \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n        \"resulting_ledger_account_balances\": null,\n        \"created_at\": \"2022-11-01T21:29:56Z\"\n      }\n    ],\n    \"posted_at\": \"2022-11-01T21:29:56Z\",\n    \"effective_date\": \"2022-11-01\",\n    \"effective_at\": \"2022-11-01T00:00:00.000000Z\",\n    \"metadata\": {},\n    \"version\": 1,\n    \"created_at\": \"2022-11-01T21:29:56Z\"\n  },\n  {\n    \"id\": \"bbab27d0-0664-4252-927c-227027784ff5\",\n    \"object\": \"ledger_transaction_version\",\n    \"live_mode\": false,\n    \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n    \"external_id\": \"ecfbad72-c438-49f7-8198-d4bdf1e169bf\",\n    \"ledgerable_type\": null,\n    \"ledgerable_id\": null,\n    \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n    \"description\": null,\n    \"status\": \"pending\",\n    \"archived_reason\": null,\n    \"ledger_entries\": [\n      {\n        \"id\": \"ad6ae05a-2b47-4af1-9fb1-6c93a533c17d\",\n        \"object\": \"ledger_entry\",\n        \"live_mode\": false,\n        \"amount\": 100,\n        \"direction\": \"debit\",\n        \"status\": \"pending\",\n        \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n        \"ledger_account_currency\": \"USD\",\n        \"ledger_account_currency_exponent\": 2,\n        \"ledger_account_lock_version\": 2,\n        \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n        \"resulting_ledger_account_balances\": null,\n        \"created_at\": \"2022-11-01T21:29:32Z\"\n      },\n      {\n        \"id\": \"de6e82c4-4bff-4e85-9a43-74d354212704\",\n        \"object\": \"ledger_entry\",\n        \"live_mode\": false,\n        \"amount\": 100,\n        \"direction\": \"credit\",\n        \"status\": \"pending\",\n        \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n        \"ledger_account_currency\": \"USD\",\n        \"ledger_account_currency_exponent\": 2,\n        \"ledger_account_lock_version\": 2,\n        \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n        \"resulting_ledger_account_balances\": null,\n        \"created_at\": \"2022-11-01T21:29:32Z\"\n      }\n    ],\n    \"posted_at\": null,\n    \"effective_date\": \"2022-11-01\",\n    \"effective_at\": \"2022-11-01T00:00:00.000000Z\",\n    \"metadata\": {},\n    \"version\": 0,\n    \"created_at\": \"2022-11-01T21:29:32Z\"\n  }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "08a8f85e-5e51-465d-abda-338c3392ec04"
                      },
                      "object": {
                        "type": "string",
                        "example": "ledger_transaction_version"
                      },
                      "live_mode": {
                        "type": "boolean",
                        "example": false,
                        "default": true
                      },
                      "ledger_transaction_id": {
                        "type": "string",
                        "example": "7f973ee9-597c-46e3-bcf1-359e0115d560"
                      },
                      "external_id": {
                        "type": "string",
                        "example": "ecfbad72-c438-49f7-8198-d4bdf1e169bf"
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
                      "archived_reason": {},
                      "ledger_entries": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string",
                              "example": "6f285fc2-7259-40e8-bfa9-3be8ae802f1f"
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
                              "example": 3,
                              "default": 0
                            },
                            "ledger_transaction_id": {
                              "type": "string",
                              "example": "7f973ee9-597c-46e3-bcf1-359e0115d560"
                            },
                            "resulting_ledger_account_balances": {},
                            "created_at": {
                              "type": "string",
                              "example": "2022-11-01T21:29:56Z"
                            }
                          }
                        }
                      },
                      "posted_at": {
                        "type": "string",
                        "example": "2022-11-01T21:29:56Z"
                      },
                      "effective_date": {
                        "type": "string",
                        "example": "2022-11-01"
                      },
                      "effective_at": {
                        "type": "string",
                        "example": "2022-11-01T00:00:00.000000Z"
                      },
                      "metadata": {
                        "type": "object",
                        "properties": {}
                      },
                      "version": {
                        "type": "integer",
                        "example": 1,
                        "default": 0
                      },
                      "created_at": {
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
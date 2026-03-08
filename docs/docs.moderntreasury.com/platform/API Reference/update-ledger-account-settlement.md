# Update Ledger Account Settlement

> 🚧
>
> For pending or drafting ledger account settlements, any of the above attributes can be updated. For posted or archived ledger account settlements, only the metadata attribute can be updated. Processing or archiving ledger account settlements cannot be updated.

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
    "/ledger_account_settlements/{id}": {
      "patch": {
        "summary": "Update Ledger Account Settlement",
        "description": "",
        "operationId": "update-ledger-account-settlement",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger account settlement.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "description": {
                    "type": "string",
                    "description": "Maximum of 1000 characters allowed."
                  },
                  "status": {
                    "type": "string",
                    "description": "To post a pending ledger account settlement, use `posted`. To archive a pending ledger account settlement, use `archived`."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data in the form of key-value pairs. Pairs can be removed by passing an empty string or null as the value.",
                    "format": "json"
                  }
                }
              },
              "examples": {
                "Request Example": {
                  "value": {
                    "description": "Updated description",
                    "status": "posted",
                    "metadata": {
                      "foo": null
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"id\": \"dbdbbfe5-da56-4aaf-be36-3fbc415622dd\",\n    \"object\": \"ledger_account_payout\",\n    \"live_mode\": true,\n    \"description\": \"Updated description\",\n    \"payout_ledger_account_id\": \"d44ad0d0-b3ea-4698-867d-09fe961e52a6\",\n    \"funding_ledger_account_id\": \"3824af4d-4151-48f6-8e8b-bf859cbddbcd\",\n    \"effective_at_upper_bound\": \"2023-01-01T00:00:00.000Z\",\n    \"status\": \"posted\",\n    \"amount\": 1000,\n    \"currency\": \"USD\",\n    \"ledger_transaction_id\": \"b47ce462-806b-4d5d-9476-9add11a42529\",\n    \"metadata\": {},\n    \"created_at\": \"2023-01-11T20:35:36Z\",\n    \"updated_at\": \"2023-01-11T21:55:33Z\"\n}"
                  }
                },
                "schema": {
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
                      "example": "Updated description"
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
                      "example": "posted"
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
                      "properties": {}
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2023-01-11T20:35:36Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2023-01-11T21:55:33Z"
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
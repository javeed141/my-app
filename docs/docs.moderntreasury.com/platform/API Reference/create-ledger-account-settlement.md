# Create Ledger Account Settlement

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
      "post": {
        "summary": "Create Ledger Account Settlement",
        "description": "",
        "operationId": "create-ledger-account-settlement",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "settled_ledger_account_id",
                  "contra_ledger_account_id"
                ],
                "properties": {
                  "description": {
                    "type": "string"
                  },
                  "status": {
                    "type": "string",
                    "description": "It is set to `pending` by default. To post a ledger account settlement at creation, use `posted`. To have the ability to manually attach ledger entries to the settlement use `drafting`."
                  },
                  "settled_ledger_account_id": {
                    "type": "string",
                    "description": "The ledger account whose ledger entries are queried against, and its balance is reduced as a result."
                  },
                  "contra_ledger_account_id": {
                    "type": "string",
                    "description": "The ledger account that sends to or receives funds from the settled ledger account."
                  },
                  "effective_at_upper_bound": {
                    "type": "string",
                    "description": "The maximum effective_at timestamp of the ledger entries to be included in the ledger account settlement. The default value is the created_at timestamp of the ledger account settlement.",
                    "format": "date"
                  },
                  "allow_either_direction": {
                    "type": "boolean",
                    "description": "If true, the settlement amount and settlement_entry_direction will bring the settled ledger account’s balance closer to zero, even if the balance is negative.",
                    "default": false
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Metadata to be added to the ledger account settlement. Must be a JSON object.",
                    "format": "json"
                  },
                  "skip_settlement_ledger_transaction": {
                    "type": "boolean",
                    "description": "It is set to `false` by default. It should be set to `true` when migrating existing settlements.",
                    "default": false
                  }
                }
              },
              "examples": {
                "Request Example": {
                  "value": {
                    "description": "Alice's January payout",
                    "payout_ledger_account_id": "d44ad0d0-b3ea-4698-867d-09fe961e52a6",
                    "funding_ledger_account_id": "3824af4d-4151-48f6-8e8b-bf859cbddbcd",
                    "effective_at_upper_bound": "2023-01-01T00:00:00Z",
                    "metadata": {
                      "foo": "bar"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "201",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"id\": \"dbdbbfe5-da56-4aaf-be36-3fbc415622dd\",\n    \"object\": \"ledger_account_settlement\",\n    \"live_mode\": true,\n    \"description\": \"Alice's January settlement\",\n    \"settled_ledger_account_id\": \"d44ad0d0-b3ea-4698-867d-09fe961e52a6\",\n    \"contra_ledger_account_id\": \"3824af4d-4151-48f6-8e8b-bf859cbddbcd\",\n    \"effective_at_upper_bound\": \"2023-01-01T00:00:00.000Z\",\n    \"status\": \"processing\",\n    \"amount\": null,\n    \"currency\": \"USD\",\n    \"ledger_transaction_id\": null,\n    \"metadata\": {\n        \"foo\": \"bar\"\n    },\n    \"created_at\": \"2023-01-11T20:35:36Z\",\n    \"updated_at\": \"2023-01-11T20:35:36Z\"\n}"
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
                      "example": "ledger_account_settlement"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "description": {
                      "type": "string",
                      "example": "Alice's January settlement"
                    },
                    "settled_ledger_account_id": {
                      "type": "string",
                      "example": "d44ad0d0-b3ea-4698-867d-09fe961e52a6"
                    },
                    "contra_ledger_account_id": {
                      "type": "string",
                      "example": "3824af4d-4151-48f6-8e8b-bf859cbddbcd"
                    },
                    "effective_at_upper_bound": {
                      "type": "string",
                      "example": "2023-01-01T00:00:00.000Z"
                    },
                    "status": {
                      "type": "string",
                      "example": "processing"
                    },
                    "amount": {},
                    "currency": {
                      "type": "string",
                      "example": "USD"
                    },
                    "ledger_transaction_id": {},
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
                      "example": "2023-01-11T20:35:36Z"
                    }
                  }
                }
              }
            }
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Inactive ledger accounts": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"All of the ledger accounts in the ledger entries must be active\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "string",
                          "example": "parameter_invalid"
                        },
                        "message": {
                          "type": "string",
                          "example": "All of the ledger accounts in the ledger entries must be active"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "ledger_entries"
                        }
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
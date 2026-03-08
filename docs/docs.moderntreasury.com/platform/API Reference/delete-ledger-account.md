# Delete Ledger Account

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
    "/ledger_accounts/{id}": {
      "delete": {
        "summary": "Delete Ledger Account",
        "description": "",
        "operationId": "delete-ledger-account",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID or external_id of the ledger account",
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
                    "value": "{\n  \"id\": \"690eed62-5b6c-45ee-a474-f54905133866\",\n  \"object\": \"ledger_account\",\n  \"live_mode\": false,\n  \"name\": \"Operating Bank Account\",\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"lock_version\": 0,\n  \"normal_balance\": \"debit\",\n  \"balances\": {\n    \"effective_at_lower_bound\": null,\n    \"effective_at_upper_bound\": null,\n    \"pending_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"posted_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"available_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    }\n  },\n  \"metadata\": {},\n  \"discarded_at\": \"2022-11-01T21:01:15Z\",\n  \"created_at\": \"2022-11-01T20:57:31Z\",\n  \"updated_at\": \"2022-11-01T21:01:15Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "690eed62-5b6c-45ee-a474-f54905133866"
                    },
                    "object": {
                      "type": "string",
                      "example": "ledger_account"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "name": {
                      "type": "string",
                      "example": "Operating Bank Account"
                    },
                    "ledger_id": {
                      "type": "string",
                      "example": "fe96565f-4b9c-4871-8fb0-e6f02683458e"
                    },
                    "description": {},
                    "lock_version": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    },
                    "normal_balance": {
                      "type": "string",
                      "example": "debit"
                    },
                    "balances": {
                      "type": "object",
                      "properties": {
                        "effective_at_lower_bound": {},
                        "effective_at_upper_bound": {},
                        "pending_balance": {
                          "type": "object",
                          "properties": {
                            "credits": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "debits": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "amount": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "currency": {
                              "type": "string",
                              "example": "USD"
                            },
                            "currency_exponent": {
                              "type": "integer",
                              "example": 2,
                              "default": 0
                            }
                          }
                        },
                        "posted_balance": {
                          "type": "object",
                          "properties": {
                            "credits": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "debits": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "amount": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "currency": {
                              "type": "string",
                              "example": "USD"
                            },
                            "currency_exponent": {
                              "type": "integer",
                              "example": 2,
                              "default": 0
                            }
                          }
                        },
                        "available_balance": {
                          "type": "object",
                          "properties": {
                            "credits": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "debits": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "amount": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "currency": {
                              "type": "string",
                              "example": "USD"
                            },
                            "currency_exponent": {
                              "type": "integer",
                              "example": 2,
                              "default": 0
                            }
                          }
                        }
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "discarded_at": {
                      "type": "string",
                      "example": "2022-11-01T21:01:15Z"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T20:57:31Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T21:01:15Z"
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
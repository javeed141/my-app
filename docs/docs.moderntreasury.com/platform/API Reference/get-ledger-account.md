# Get Ledger Account

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
      "get": {
        "summary": "Get Ledger Account",
        "description": "",
        "operationId": "get-ledger-account",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger account. Modern Treasury provided IDs or External IDs are accepted.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "balances[effective_at_lower_bound]",
            "in": "query",
            "description": "Use balances[effective_at_lower_bound] to set the lower bound timestamp for which the retrieved balance is set. The returned balance will be inclusive of the provided timestamp.",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "balances[effective_at_upper_bound]",
            "in": "query",
            "description": "Use balances[effective_at_upper_bound] to set the upper bound timestamp for which the retrieved balance is set. The returned balance will be exclusive of the provided timestamp. Any balances[as_of_date] or balances[effective_at] will be translated into balances[effective_at_upper_bound].",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "balances[as_of_lock_version]",
            "in": "query",
            "description": "Use balances[as_of_lock_version] to retrieve the balance of the ledger account at the specified lock version. If there is no balance associated with the provided lock version a 422 is returned. Note: You cannot query as of a lock version and with effective_at timestamps.",
            "schema": {
              "type": "integer",
              "format": "int32"
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
                    "value": "{\n  \"id\": \"690eed62-5b6c-45ee-a474-f54905133866\",\n  \"object\": \"ledger_account\",\n  \"live_mode\": false,\n  \"name\": \"Operating Bank Account\",\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"lock_version\": 0,\n  \"normal_balance\": \"debit\",\n  \"balances\": {\n    \"effective_at_lower_bound\": \"2020-08-04T16:54:32Z\",\n    \"effective_at_upper_bound\": \"2021-08-04T16:54:32Z\",\n    \"pending_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"posted_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"available_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    }\n  },\n  \"metadata\": {},\n  \"discarded_at\": null,\n  \"created_at\": \"2022-11-01T20:57:31Z\",\n  \"updated_at\": \"2022-11-01T20:57:31Z\"\n}"
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
                        "effective_at_lower_bound": {
                          "type": "string",
                          "example": "2020-08-04T16:54:32Z"
                        },
                        "effective_at_upper_bound": {
                          "type": "string",
                          "example": "2021-08-04T16:54:32Z"
                        },
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
                    "discarded_at": {},
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T20:57:31Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T20:57:31Z"
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
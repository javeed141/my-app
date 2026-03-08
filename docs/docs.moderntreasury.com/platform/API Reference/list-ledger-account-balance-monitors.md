# List Ledger Account Balance Monitors

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
    "/ledger_account_balance_monitors": {
      "get": {
        "summary": "List Ledger Account Balance Monitors",
        "description": "",
        "operationId": "list-ledger-account-balance-monitors",
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
            "description": "Query the balance monitors for a single ledger account.",
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
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[\n  {\n    \"id\": \"36f99587-e551-4836-bab5-62250338ef70\",\n    \"object\": \"ledger_account_balance_monitor\",\n    \"live_mode\": true,\n    \"ledger_account_id\": \"895cf384-3d37-48bf-b04d-ea34bf358079\",\n    \"description\": \"alert when balance changes\",\n    \"alert_condition\": {\n      \"field\": \"available_amount\",\n      \"operator\": \"greater_than\",\n      \"value\": 0\n    },\n    \"current_ledger_account_balance_state\": {\n      \"balances\": {\n        \"pending_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"posted_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"available_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        }\n      },\n      \"ledger_account_lock_version\": 0,\n      \"triggered\": false\n    },\n    \"metadata\": {},\n    \"discarded_at\": null,\n    \"created_at\": \"2023-08-14T17:22:37Z\",\n    \"updated_at\": \"2023-08-14T17:22:37Z\"\n  }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "36f99587-e551-4836-bab5-62250338ef70"
                      },
                      "object": {
                        "type": "string",
                        "example": "ledger_account_balance_monitor"
                      },
                      "live_mode": {
                        "type": "boolean",
                        "example": true,
                        "default": true
                      },
                      "ledger_account_id": {
                        "type": "string",
                        "example": "895cf384-3d37-48bf-b04d-ea34bf358079"
                      },
                      "description": {
                        "type": "string",
                        "example": "alert when balance changes"
                      },
                      "alert_condition": {
                        "type": "object",
                        "properties": {
                          "field": {
                            "type": "string",
                            "example": "available_amount"
                          },
                          "operator": {
                            "type": "string",
                            "example": "greater_than"
                          },
                          "value": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          }
                        }
                      },
                      "current_ledger_account_balance_state": {
                        "type": "object",
                        "properties": {
                          "balances": {
                            "type": "object",
                            "properties": {
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
                          "ledger_account_lock_version": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "triggered": {
                            "type": "boolean",
                            "example": false,
                            "default": true
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
                        "example": "2023-08-14T17:22:37Z"
                      },
                      "updated_at": {
                        "type": "string",
                        "example": "2023-08-14T17:22:37Z"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": ""
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
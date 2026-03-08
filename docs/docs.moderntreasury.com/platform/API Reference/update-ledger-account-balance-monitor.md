# Update Ledger Account Balance Monitor

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
    "/ledger_account_balance_monitors/{id}": {
      "patch": {
        "summary": "Update Ledger Account Balance Monitor",
        "description": "",
        "operationId": "update-ledger-account-balance-monitor",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger account balance monitor.",
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
                    "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data in the form of key-value pairs. Pairs can be removed by passing an empty string or null as the value.",
                    "format": "json"
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
                    "value": "{\n  \"id\": \"36f99587-e551-4836-bab5-62250338ef70\",\n  \"object\": \"ledger_account_balance_monitor\",\n  \"live_mode\": true,\n  \"ledger_account_id\": \"895cf384-3d37-48bf-b04d-ea34bf358079\",\n  \"description\": \"Alert when balance changes\",\n  \"alert_condition\": {\n    \"field\": \"available_amount\",\n    \"operator\": \"greater_than\",\n    \"value\": 0\n  },\n  \"current_ledger_account_balance_state\": {\n    \"balances\": {\n      \"pending_balance\": {\n        \"credits\": 0,\n        \"debits\": 0,\n        \"amount\": 0,\n        \"currency\": \"USD\",\n        \"currency_exponent\": 2\n      },\n      \"posted_balance\": {\n        \"credits\": 0,\n        \"debits\": 0,\n        \"amount\": 0,\n        \"currency\": \"USD\",\n        \"currency_exponent\": 2\n      },\n      \"available_balance\": {\n        \"credits\": 0,\n        \"debits\": 0,\n        \"amount\": 0,\n        \"currency\": \"USD\",\n        \"currency_exponent\": 2\n      }\n    },\n    \"ledger_account_lock_version\": 0,\n    \"triggered\": false\n  },\n  \"metadata\": {},\n  \"discarded_at\": null,\n  \"created_at\": \"2023-08-14T17:22:37Z\",\n  \"updated_at\": \"2023-08-14T17:22:37Z\"\n}"
                  }
                },
                "schema": {
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
                      "example": "Alert when balance changes"
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
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
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
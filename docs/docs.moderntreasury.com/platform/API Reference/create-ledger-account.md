# Create Ledger Account

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
    "/ledger_accounts": {
      "post": {
        "summary": "Create Ledger Account",
        "description": "",
        "operationId": "create-ledger-account",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "currency",
                  "normal_balance",
                  "ledger_id"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the ledger account. Maximum of 1000 characters allowed."
                  },
                  "description": {
                    "type": "string",
                    "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                  },
                  "currency": {
                    "type": "string"
                  },
                  "currency_exponent": {
                    "type": "integer",
                    "description": "Must be included if currency is a [custom currency](https://docs.moderntreasury.com/platform/docs/currencies). The currency_exponent cannot exceed 30.",
                    "format": "int32"
                  },
                  "normal_balance": {
                    "type": "string",
                    "description": "One of `credit`, `debit`"
                  },
                  "ledger_id": {
                    "type": "string"
                  },
                  "ledgerable_id": {
                    "type": "string",
                    "description": "The id of linked ledgerable"
                  },
                  "ledgerable_type": {
                    "type": "string",
                    "description": "The type of linked ledgerable. See [Ledger Accounts](https://docs.moderntreasury.com/platform/reference/ledger-account-object) for list of types"
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Metadata to be added to the ledger account. Must be a JSON object.",
                    "format": "json"
                  },
                  "ledger_account_category_ids": {
                    "type": "array",
                    "description": "The array of parent ledger account category IDs to which this ledger account will be associated on creation. This is performed atomically, and all associations must be valid and succeed for the ledger account to be successfully created.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "external_id": {
                    "type": "string",
                    "description": "An optional user-defined 180 character unique identifier"
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
                    "value": "{\n  \"id\": \"690eed62-5b6c-45ee-a474-f54905133866\",\n  \"object\": \"ledger_account\",\n  \"live_mode\": false,\n  \"name\": \"Operating Bank Account\",\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"lock_version\": 0,\n  \"normal_balance\": \"debit\",\n  \"balances\": {\n    \"effective_at_lower_bound\": null,\n    \"effective_at_upper_bound\": null,\n    \"pending_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"posted_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"available_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    }\n  },\n  \"metadata\": {},\n  \"discarded_at\": null,\n  \"created_at\": \"2022-11-01T20:57:31Z\",\n  \"updated_at\": \"2022-11-01T20:57:31Z\"\n}"
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
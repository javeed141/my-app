# Create Ledger Account Category

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
    "/ledger_account_categories": {
      "post": {
        "summary": "Create Ledger Account Category",
        "description": "",
        "operationId": "create-ledger-account-category",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "normal_balance",
                  "currency",
                  "ledger_id"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the ledger account category. Maximum of 1000 characters allowed."
                  },
                  "description": {
                    "type": "string",
                    "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                  },
                  "normal_balance": {
                    "type": "string"
                  },
                  "currency": {
                    "type": "string",
                    "description": "All accounts in the category must have this currency."
                  },
                  "currency_exponent": {
                    "type": "integer",
                    "description": "If a non-ISO `currency` is provided, `currency_exponent` denotes how many decimal places should be displayed for this currency. The currency_exponent cannot exceed 30.",
                    "format": "int32"
                  },
                  "ledger_id": {
                    "type": "string"
                  },
                  "metadata": {
                    "type": "string",
                    "format": "json"
                  },
                  "ledger_account_category_ids": {
                    "type": "array",
                    "description": "The array of parent ledger account category IDs to which this ledger account category will be added on creation. This is performed atomically, and all associations must be valid and succeed for the ledger account to be successfully created.",
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
                    "value": "{\n  \"id\": \"ac665222-02ef-47da-a7bd-376ba0e882ed\",\n  \"object\": \"ledger_account_category\",\n  \"live_mode\": false,\n  \"name\": \"Customer Accounts\",\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"normal_balance\": \"credit\",\n  \"balances\": {\n    \"pending_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"posted_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    },\n    \"available_balance\": {\n      \"credits\": 0,\n      \"debits\": 0,\n      \"amount\": 0,\n      \"currency\": \"USD\",\n      \"currency_exponent\": 2\n    }\n  },\n  \"metadata\": {},\n  \"discarded_at\": null,\n  \"created_at\": \"2022-11-01T21:34:13Z\",\n  \"updated_at\": \"2022-11-01T21:34:13Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "ac665222-02ef-47da-a7bd-376ba0e882ed"
                    },
                    "object": {
                      "type": "string",
                      "example": "ledger_account_category"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "name": {
                      "type": "string",
                      "example": "Customer Accounts"
                    },
                    "ledger_id": {
                      "type": "string",
                      "example": "fe96565f-4b9c-4871-8fb0-e6f02683458e"
                    },
                    "description": {},
                    "normal_balance": {
                      "type": "string",
                      "example": "credit"
                    },
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
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "discarded_at": {},
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T21:34:13Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T21:34:13Z"
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
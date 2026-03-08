# Get Ledger Account Category

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
    "/ledger_account_categories/{id}": {
      "get": {
        "summary": "Get Ledger Account Category",
        "description": "",
        "operationId": "get-ledger-account-category",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger account category",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "balances",
            "in": "query",
            "description": "For example, if you want the balances as of a particular time (ISO8601), the encoded query string would be `balances%5Beffective_at%5D=2000-12-31T12:00:00Z`. The balances as of a time are inclusive of entries with that exact time, but with respect to the ledger accounts that are currently present in the category.",
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
          },
          "404": {
            "description": "404",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"resource_not_found\",\n    \"message\": \"Resource not found\",\n    \"parameter\": \"id\"\n  }\n}"
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
                          "example": "resource_not_found"
                        },
                        "message": {
                          "type": "string",
                          "example": "Resource not found"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "id"
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
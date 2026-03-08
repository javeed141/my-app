# List Ledger Accounts

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
      "get": {
        "summary": "List Ledger Accounts",
        "description": "",
        "operationId": "list-ledger-accounts",
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
            "name": "name",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "name",
            "in": "query",
            "description": "If you have specific names to retrieve in bulk, you can pass them as query parameters delimited with `name[]=`, for example `?name[]=my-account&name[]=your-account`. Partial match here is enabled.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "ledger_id",
            "in": "query",
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
          },
          {
            "name": "currency",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "normal_balance",
            "in": "query",
            "description": "Can be `credit` or `debit` to return only Ledger Accounts that were created with the specified default normality.",
            "schema": {
              "type": "string"
            }
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
            "name": "pending_balance_amount",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), `eq` (=), or `not_eq` (!=) to filter by the balance amount.",
            "schema": {
              "properties": {
                "lt": {
                  "type": "integer",
                  "format": "int32"
                },
                "lte": {
                  "type": "integer",
                  "format": "int32"
                },
                "eq": {
                  "type": "integer",
                  "format": "int32"
                },
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              },
              "type": "object"
            }
          },
          {
            "name": "posted_balance_amount",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), `eq` (=), or `not_eq` (!=) to filter by balance amount.",
            "schema": {
              "properties": {
                "lt": {
                  "type": "integer",
                  "format": "int32"
                },
                "lte": {
                  "type": "integer",
                  "format": "int32"
                },
                "eq": {
                  "type": "integer",
                  "format": "int32"
                },
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              },
              "type": "object"
            }
          },
          {
            "name": "available_balance_amount",
            "in": "query",
            "description": "Use `gt` (>), `gte` (>=), `lt` (<), `lte` (<=), `eq` (=), or `not_eq` (!=) to filter by balance amount.",
            "schema": {
              "properties": {
                "lt": {
                  "type": "integer",
                  "format": "int32"
                },
                "lte": {
                  "type": "integer",
                  "format": "int32"
                },
                "eq": {
                  "type": "integer",
                  "format": "int32"
                },
                "gte": {
                  "type": "integer",
                  "format": "int32"
                },
                "gt": {
                  "type": "integer",
                  "format": "int32"
                },
                "not_eq": {
                  "type": "integer",
                  "format": "int32"
                }
              },
              "type": "object"
            }
          },
          {
            "name": "external_id",
            "in": "query",
            "description": "To query ledger accounts by the external_id, use this query parameter.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "created_at",
            "in": "query",
            "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to filter by the created at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use `created_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "updated_at",
            "in": "query",
            "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to filter by the updated at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use `updated_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "ledger_account_category_id",
            "in": "query",
            "description": "Query for accounts in a ledger account category.",
            "schema": {
              "type": "string"
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
                    "value": "[\n  {\n    \"id\": \"690eed62-5b6c-45ee-a474-f54905133866\",\n    \"object\": \"ledger_account\",\n    \"live_mode\": false,\n    \"name\": \"Operating Bank Account\",\n    \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n    \"description\": null,\n    \"lock_version\": 0,\n    \"normal_balance\": \"debit\",\n    \"balances\": {\n      \"effective_at_lower_bound\": \"2020-08-04T16:54:32Z\",\n      \"effective_at_upper_bound\": \"2021-08-04T16:54:32Z\",\n      \"pending_balance\": {\n        \"credits\": 0,\n        \"debits\": 0,\n        \"amount\": 0,\n        \"currency\": \"USD\",\n        \"currency_exponent\": 2\n      },\n      \"posted_balance\": {\n        \"credits\": 0,\n        \"debits\": 0,\n        \"amount\": 0,\n        \"currency\": \"USD\",\n        \"currency_exponent\": 2\n      },\n      \"available_balance\": {\n        \"credits\": 0,\n        \"debits\": 0,\n        \"amount\": 0,\n        \"currency\": \"USD\",\n        \"currency_exponent\": 2\n      }\n    },\n    \"metadata\": {},\n    \"discarded_at\": null,\n    \"created_at\": \"2022-11-01T20:57:31Z\",\n    \"updated_at\": \"2022-11-01T20:57:31Z\"\n  }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
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
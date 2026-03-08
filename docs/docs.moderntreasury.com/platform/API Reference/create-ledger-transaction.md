# Create Ledger Transaction

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
    "/ledger_transactions": {
      "post": {
        "summary": "Create Ledger Transaction",
        "description": "",
        "operationId": "create-ledger-transaction",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "ledger_entries"
                ],
                "properties": {
                  "status": {
                    "type": "string",
                    "description": "To post a ledger transaction at creation, use `posted`"
                  },
                  "description": {
                    "type": "string",
                    "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                  },
                  "ledger_entries": {
                    "type": "array",
                    "description": "Array of ledger entries. The API supports a maximum of 1000 ledger entries per transaction.",
                    "items": {
                      "properties": {
                        "amount": {
                          "type": "integer",
                          "description": "Supports any int value up to 10³⁶.",
                          "format": "int64"
                        },
                        "direction": {
                          "type": "string",
                          "description": "One of `credit` or `debit`."
                        },
                        "ledger_account_id": {
                          "type": "string"
                        },
                        "lock_version": {
                          "type": "integer",
                          "description": "Lock version of the ledger account. This can be passed when creating a ledger transaction to only succeed if no ledger transactions have posted since the given version. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#using-the-lock_version-field) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
                          "format": "int64"
                        },
                        "pending_balance_amount": {
                          "type": "object",
                          "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the account’s pending balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
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
                          }
                        },
                        "posted_balance_amount": {
                          "type": "object",
                          "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the account’s posted balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
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
                          }
                        },
                        "available_balance_amount": {
                          "type": "object",
                          "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the account’s available balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
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
                          }
                        },
                        "show_resulting_ledger_account_balances": {
                          "type": "boolean",
                          "description": "If true, response will include the balance of the associated ledger account for the entry and will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details."
                        },
                        "metadata": {
                          "type": "string",
                          "format": "json"
                        }
                      },
                      "required": [
                        "amount",
                        "direction",
                        "ledger_account_id"
                      ],
                      "type": "object"
                    }
                  },
                  "effective_at": {
                    "type": "string",
                    "description": "Format: ISO8601 to 6 decimal places. Defaults to time of insertion in the DB if not provided",
                    "format": "date"
                  },
                  "external_id": {
                    "type": "string",
                    "description": "An optional user-defined unique identifier. Only one pending or posted ledger transaction may have this ID in the ledger."
                  },
                  "ledger_account_category_balance_locks": {
                    "type": "array",
                    "description": "An array of one or more ledger account category balance locks. Use this to lock on a ledger account category's balance.",
                    "items": {
                      "properties": {
                        "ledger_account_category_id": {
                          "type": "string"
                        },
                        "available_balance_amount": {
                          "type": "object",
                          "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the category's available balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details. This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
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
                          }
                        },
                        "pending_balance_amount": {
                          "type": "object",
                          "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the category's pending balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details. This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
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
                          }
                        },
                        "posted_balance_amount": {
                          "type": "object",
                          "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the category's posted balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422.See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details. This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
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
                          }
                        }
                      },
                      "type": "object"
                    }
                  },
                  "ledgerable_type": {
                    "type": "string",
                    "description": "If the ledger transaction can be reconciled to another object in Modern Treasury, add the ledgerable type here, otherwise null. See possible types at [Ledger Transactions](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object)"
                  },
                  "ledgerable_id": {
                    "type": "string",
                    "description": "If the ledger transaction can be reconciled to another object in Modern Treasury, add the id of that object here, otherwise null."
                  },
                  "archive_on_balance_lock_failure": {
                    "type": "boolean",
                    "description": "When true, creates an archived ledger transaction with archived_reason 'balance_lock_failure' instead of returning a 422 error if balance lock constraints are violated."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Metadata to be added to the ledger transaction. Must be a JSON object.",
                    "format": "json"
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
                    "value": "{\n  \"id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n  \"object\": \"ledger_transaction\",\n  \"live_mode\": false,\n  \"external_id\": \"1590aa8d-24e0-491b-bc06-d4e5843a212c\",\n  \"ledgerable_type\": null,\n  \"ledgerable_id\": null,\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"status\": \"posted\", \n  \"archived_reason\": null,\n  \"ledger_entries\": [\n    {\n      \"id\": \"afd72914-6014-46a8-997b-3a862aed6375\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"debit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": {\n        \"pending_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"posted_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"available_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        }\n    },\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    },\n    {\n      \"id\": \"1db5e286-a845-4cee-8a0f-366ff56e175c\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"credit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": null,\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    }\n  ],\n  \"posted_at\": \"2022-11-01T21:24:45Z\",\n  \"effective_at\": \"2022-11-01T00:00:00.000000Z\",\n  \"effective_date\": \"2022-11-01\",\n  \"metadata\": {},\n  \"created_at\": \"2022-11-01T21:24:45Z\",\n  \"updated_at\": \"2022-11-01T21:24:45Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "53769ada-5ae4-4184-bb39-a3632daa88f9"
                    },
                    "object": {
                      "type": "string",
                      "example": "ledger_transaction"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "external_id": {
                      "type": "string",
                      "example": "1590aa8d-24e0-491b-bc06-d4e5843a212c"
                    },
                    "ledgerable_type": {},
                    "ledgerable_id": {},
                    "ledger_id": {
                      "type": "string",
                      "example": "fe96565f-4b9c-4871-8fb0-e6f02683458e"
                    },
                    "description": {},
                    "status": {
                      "type": "string",
                      "example": "posted"
                    },
                    "archived_reason": {},
                    "ledger_entries": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "afd72914-6014-46a8-997b-3a862aed6375"
                          },
                          "object": {
                            "type": "string",
                            "example": "ledger_entry"
                          },
                          "live_mode": {
                            "type": "boolean",
                            "example": false,
                            "default": true
                          },
                          "amount": {
                            "type": "integer",
                            "example": 100,
                            "default": 0
                          },
                          "direction": {
                            "type": "string",
                            "example": "debit"
                          },
                          "status": {
                            "type": "string",
                            "example": "posted"
                          },
                          "ledger_account_id": {
                            "type": "string",
                            "example": "6168628a-05a6-4d30-80ca-4080ea699179"
                          },
                          "ledger_account_currency": {
                            "type": "string",
                            "example": "USD"
                          },
                          "ledger_account_currency_exponent": {
                            "type": "integer",
                            "example": 2,
                            "default": 0
                          },
                          "ledger_account_lock_version": {
                            "type": "integer",
                            "example": 1,
                            "default": 0
                          },
                          "ledger_transaction_id": {
                            "type": "string",
                            "example": "53769ada-5ae4-4184-bb39-a3632daa88f9"
                          },
                          "resulting_ledger_account_balances": {
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
                          "discarded_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2022-11-01T21:24:45Z"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-11-01T21:24:45Z"
                          }
                        }
                      }
                    },
                    "posted_at": {
                      "type": "string",
                      "example": "2022-11-01T21:24:45Z"
                    },
                    "effective_at": {
                      "type": "string",
                      "example": "2022-11-01T00:00:00.000000Z"
                    },
                    "effective_date": {
                      "type": "string",
                      "example": "2022-11-01"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T21:24:45Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T21:24:45Z"
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
                  "Invalid amounts": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The credit ledger entries must sum to the debit ledger entries\",\n        \"parameter\": \"ledger_entries\"\n    }\n}\n"
                  },
                  "Invalid ledger entry amounts": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Ledger entries must have nonnegative amounts\",\n        \"parameter\": \"ledger_entries\"\n    }\n}\n"
                  },
                  "Invalid ledgerable amount": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The ledgerable amount does not sum to the credit ledger entries\",\n        \"parameter\": \"ledgerable\"\n    }\n}\n"
                  },
                  "Invalid ledgerable status": {
                    "value": "{\n    \"errors\": {{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The ledgerable cannot be attached with its current status.\",\n        \"parameter\": \"ledgerable\"\n    }\n}"
                  },
                  "Too many ledger entries": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The ledger transaction can have at most 1000 ledger entries\",\n        \"parameter\": \"ledger_entries\"\n    }\n}\n"
                  },
                  "Insufficient ledger entries": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The ledger transaction must have at least one credit and one debit ledger entry\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  },
                  "Inactive ledger accounts": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"All of the ledger accounts in the ledger entries must be active\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  },
                  "External ID already used": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Another ledger transaction within the same ledger exists using the external ID you provided\",\n        \"parameter\": \"external_id\"\n    }\n}"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "Invalid amounts",
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
                              "example": "The credit ledger entries must sum to the debit ledger entries"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Invalid ledger entry amounts",
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
                              "example": "Ledger entries must have nonnegative amounts"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Invalid ledgerable amount",
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
                              "example": "The ledgerable amount does not sum to the credit ledger entries"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledgerable"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Too many ledger entries",
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
                              "example": "The ledger transaction can have at most 1000 ledger entries"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Insufficient ledger entries",
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
                              "example": "The ledger transaction must have at least one credit and one debit ledger entry"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Inactive ledger accounts",
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
                    },
                    {
                      "title": "External ID already used",
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
                              "example": "Another ledger transaction within the same ledger exists using the external ID you provided"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "external_id"
                            }
                          }
                        }
                      }
                    }
                  ]
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
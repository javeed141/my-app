# Update Ledger Transaction

<Callout icon="🚧" theme="warn">
  For pending ledger transactions, any of the below attributes can be updated. For posted ledger transactions, only the metadata or external\_id attributes can be updated.
</Callout>

Ledger Entries are immutable, meaning that for any updates on a Ledger Transaction that could affect the account balances, the existing Ledger Entries are discarded and new Ledger Entries are created. This allows you to look up which Ledger Entry contributed to a certain Ledger Account lock\_version. See [Verifying Prior Ledger States](https://docs.moderntreasury.com/docs/verifying-prior-ledger-states#ledger-account-balance-history) for more details.

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
    "/ledger_transactions/{id}": {
      "patch": {
        "summary": "Update Ledger Transaction",
        "description": "",
        "operationId": "update-ledger-transaction",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID or external_id of the ledger transaction.",
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
                  "status": {
                    "type": "string",
                    "description": "To post the ledger transaction, use `posted`. To archive a pending ledger transaction, use `archived`."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data in the form of key-value pairs. Pairs can be removed by passing an empty string or null as the value.",
                    "format": "json"
                  },
                  "effective_at": {
                    "type": "string",
                    "description": "Format: ISO8601 to 6 decimal places.",
                    "format": "date-time"
                  },
                  "ledger_entries": {
                    "type": "array",
                    "description": "Note that updating entries will overwrite any prior entries on the ledger transaction. The metadata will not be copied over from the previous entries so any attached metadata must be sent in the payload.",
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
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n  \"object\": \"ledger_transaction\",\n  \"live_mode\": false,\n  \"external_id\": \"ecfbad72-c438-49f7-8198-d4bdf1e169bf\",\n  \"ledgerable_type\": null,\n  \"ledgerable_id\": null,\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"status\": \"posted\",\n  \"archived_reason\": null,\n  \"ledger_entries\": [\n    {\n      \"id\": \"6f285fc2-7259-40e8-bfa9-3be8ae802f1f\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"debit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 3,\n      \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n      \"resulting_ledger_account_balances\": {\n        \"pending_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"posted_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"available_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        }\n  \t},\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:29:56Z\",\n      \"updated_at\": \"2022-11-01T21:29:56Z\"\n    },\n    {\n      \"id\": \"a3c45984-aa05-4554-8c7d-eee9a8053fac\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"credit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 3,\n      \"ledger_transaction_id\": \"7f973ee9-597c-46e3-bcf1-359e0115d560\",\n      \"resulting_ledger_account_balances\": null,\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:29:56Z\",\n      \"updated_at\": \"2022-11-01T21:29:56Z\"\n    }\n  ],\n  \"posted_at\": \"2022-11-01T21:29:56Z\",\n  \"effective_at\": \"2022-11-01T00:00:00.000000Z\",\n  \"effective_date\": \"2022-11-01\",\n  \"metadata\": {},\n  \"created_at\": \"2022-11-01T21:29:32Z\",\n  \"updated_at\": \"2022-11-01T21:29:56Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "7f973ee9-597c-46e3-bcf1-359e0115d560"
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
                      "example": "ecfbad72-c438-49f7-8198-d4bdf1e169bf"
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
                            "example": "6f285fc2-7259-40e8-bfa9-3be8ae802f1f"
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
                            "example": 3,
                            "default": 0
                          },
                          "ledger_transaction_id": {
                            "type": "string",
                            "example": "7f973ee9-597c-46e3-bcf1-359e0115d560"
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
                            "example": "2022-11-01T21:29:56Z"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-11-01T21:29:56Z"
                          }
                        }
                      }
                    },
                    "posted_at": {
                      "type": "string",
                      "example": "2022-11-01T21:29:56Z"
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
                      "example": "2022-11-01T21:29:32Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T21:29:56Z"
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
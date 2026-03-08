# Create Return

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
    "/returns": {
      "post": {
        "summary": "Create Return",
        "description": "",
        "operationId": "create-return",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "returnable_id",
                  "returnable_type"
                ],
                "properties": {
                  "returnable_id": {
                    "type": "string",
                    "description": "The ID of the object being returned."
                  },
                  "returnable_type": {
                    "type": "string",
                    "description": "The type of object being returned. Currently, this may only be `incoming_payment_detail`."
                  },
                  "code": {
                    "type": "string",
                    "description": "For ACH returns, this is the required ACH return code. Refer to [the guide](https://docs.moderntreasury.com/platform/docs/originating-an-ach-return) on originating ACH returns for a full list of acceptable codes."
                  },
                  "reason": {
                    "type": "string",
                    "description": "An optional description of the reason for the return. This is for internal usage and will not be transmitted to the bank."
                  },
                  "date_of_death": {
                    "type": "string",
                    "description": "If the return code is R14 or R15, a date of death must be provided.",
                    "format": "date"
                  },
                  "additional_information": {
                    "type": "string",
                    "description": "If provided, this string will populate the addenda information field of the ACH addenda record. Only the first 44 characters of this string will be used. Any additional characters will be truncated."
                  },
                  "ledger_transaction": {
                    "type": "object",
                    "description": "Specifies a [ledger transaction](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object) object that will be created with the return. If the ledger transaction cannot be created, then the return creation will fail. The resulting ledger transaction will mirror the status of the return. See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects).",
                    "properties": {
                      "description": {
                        "type": "string",
                        "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                      },
                      "metadata": {
                        "type": "string",
                        "description": "Metadata to be added to the ledger transaction. Must be a JSON object.",
                        "format": "json"
                      },
                      "effective_at": {
                        "type": "string",
                        "description": "Format: ISO8601 to 6 decimal places. Defaults to time of insertion in the DB if not provided",
                        "format": "date-time"
                      },
                      "ledger_entries": {
                        "type": "array",
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
# Create Expected Payment

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
    "/expected_payments": {
      "post": {
        "summary": "Create Expected Payment",
        "description": "",
        "operationId": "create-expected-payment",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "reconciliation_rule_variables"
                ],
                "properties": {
                  "reconciliation_rule_variables": {
                    "type": "array",
                    "description": "Matching data used in Reconciliation Rules to automatically reconcile this Expected Payment. See [Defining your Reconciliation Rules](https://docs.moderntreasury.com/payments/docs/defining-reconciliation-rules).",
                    "items": {
                      "properties": {
                        "internal_account_id": {
                          "type": "string",
                          "description": "All reconciliation rule variables must have the same `internal_account_id`."
                        },
                        "direction": {
                          "type": "string",
                          "description": "`credit` or `debit`. All reconciliation rule variables must all have the same `direction`."
                        },
                        "amount_lower_bound": {
                          "type": "integer",
                          "description": "Amount is specified in the currency's smallest unit. For example, $10 would be represented as `1000` (cents), and ¥10 would be represented as `10`. All reconciliation rule variables must have the same `amount_lower_bound`.",
                          "format": "int32"
                        },
                        "amount_upper_bound": {
                          "type": "integer",
                          "description": "Amount is specified in the currency's smallest unit. For example, $10 would be represented as `1000` (cents), and ¥10 would be represented as `10`. All reconciliation rule variables must have the same `amount_upper_bound`.",
                          "format": "int32"
                        },
                        "currency": {
                          "type": "string",
                          "description": "ISO 4217 Currency Code. If not provided, falls back to Internal Account currency. All reconciliation rule variables must have the same `currency`."
                        },
                        "type": {
                          "type": "string",
                          "description": "Supported values: `ach`, `au_becs`, `bacs`, `book`, `card`, `check`,`cross_border`, `eft`, `interac`, `provexchange`, `rtp`, `sen`, `sepa`, `signet`, `wire`."
                        },
                        "date_lower_bound": {
                          "type": "string",
                          "description": "Format is YYYY-MM-DD. Default will fallback to `date_upper_bound`. All reconciliation rule variables must have the same `date_lower_bound`."
                        },
                        "date_upper_bound": {
                          "type": "string",
                          "description": "Format is YYYY-MM-DD. Default will fallback to `date_lower_bound`. All reconciliation rule variables must have the same `date_upper_bound`."
                        },
                        "counterparty_id": {
                          "type": "string",
                          "description": "All reconciliation rule variables must have the same `counterparty_id`."
                        },
                        "custom_identifiers": {
                          "type": "string",
                          "description": "Additional matching data used in reconciliation rules represented as key-value pairs. Specify up to 50 custom identifier per reconciliation rule variable, and up to 250 unique custom identifiers across all reconciliation rule variables. Keys and values can only contain alphanumeric characters and underscores. Example: {\"key\":\"value\",\"foo\":\"bar\"}",
                          "format": "json"
                        }
                      },
                      "required": [
                        "internal_account_id",
                        "direction",
                        "amount_lower_bound",
                        "amount_upper_bound"
                      ],
                      "type": "object"
                    }
                  },
                  "ledger_transaction": {
                    "type": "object",
                    "description": "Specifies a [ledger transaction](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object) object that will be created with the expected payment. If the ledger transaction cannot be created, then the expected payment creation will fail. The resulting ledger transaction will mirror the status of the expected payment. See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects).",
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
                  },
                  "ledger_transaction_id": {
                    "type": "string",
                    "description": "Specifies the ID of a [ledger transaction](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object) that will be linked to the expected payment. If the expected payment status and ledger transaction status do not match, the expected payment creation will fail. The resulting ledger transaction will mirror the status of the expected payment. See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects)."
                  },
                  "external_id": {
                    "type": "string",
                    "description": "An optional user-defined unique identifier"
                  },
                  "line_items": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "amount": {
                          "type": "integer",
                          "format": "int32"
                        },
                        "metadata": {
                          "type": "string",
                          "format": "json"
                        },
                        "description": {
                          "type": "string"
                        },
                        "accounting_category_id": {
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "description": {
                    "type": "string"
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data represented as key-value pairs. Both the key and value must be strings. See Metadata.",
                    "format": "json"
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
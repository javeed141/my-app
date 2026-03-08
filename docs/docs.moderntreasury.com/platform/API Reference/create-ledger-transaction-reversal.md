# Create Ledger Transaction Reversal

This API creates a new Ledger Transaction that reverses the original Ledger Transaction.

Note that only posted Ledger Transactions can be reversed. For pending Ledger Transactions, please archive them instead of creating reversals.

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
    "/ledger_transactions/{id}/reversal": {
      "post": {
        "summary": "Create Ledger Transaction Reversal",
        "description": "",
        "operationId": "create-ledger-transaction-reversal",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger transaction.",
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
                    "description": "An optional free-form description for the reversal ledger transaction. Maximum of 1000 characters allowed."
                  },
                  "status": {
                    "type": "string",
                    "description": "Status of the reversal ledger transaction. It defaults to `posted` if not provided.",
                    "default": "posted"
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Metadata to be added to the reversal ledger transaction. Must be a JSON object.",
                    "format": "json"
                  },
                  "effective_at": {
                    "type": "string",
                    "description": "The timestamp (ISO8601 format) at which the reversal ledger transaction happened for reporting purposes. It defaults to the `effective_at` of the original ledger transaction if not provided.",
                    "format": "date-time"
                  },
                  "ledgerable_type": {
                    "type": "string",
                    "description": "Specify this if you'd like to link the reversal ledger transaction to a Payment object like Return or Reversal."
                  },
                  "ledgerable_id": {
                    "type": "string",
                    "description": "Specify this if you'd like to link the reversal ledger transaction to a Payment object like Return or Reversal."
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
                    "value": "{\n  \"id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n  \"object\": \"ledger_transaction\",\n  \"live_mode\": false,\n  \"external_id\": \"1590aa8d-24e0-491b-bc06-d4e5843a212c\",\n  \"ledgerable_type\": null,\n  \"ledgerable_id\": null,\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"status\": \"posted\",\n  \"reverses_ledger_transaction_id\": \"b3ea66d8-ffa9-44e6-96d2-591cdb998a5e\",\n  \"ledger_entries\": [\n    {\n      \"id\": \"afd72914-6014-46a8-997b-3a862aed6375\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"debit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": {\n        \"pending_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"posted_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"available_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        }\n    },\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    },\n    {\n      \"id\": \"1db5e286-a845-4cee-8a0f-366ff56e175c\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"credit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": null,\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    }\n  ],\n  \"posted_at\": \"2022-11-01T21:24:45Z\",\n  \"effective_at\": \"2022-11-01T00:00:00.000000Z\",\n  \"effective_date\": \"2022-11-01\",\n  \"metadata\": {},\n  \"created_at\": \"2022-11-01T21:24:45Z\",\n  \"updated_at\": \"2022-11-01T21:24:45Z\"\n}"
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
                    "reverses_ledger_transaction_id": {
                      "type": "string",
                      "example": "b3ea66d8-ffa9-44e6-96d2-591cdb998a5e"
                    },
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
                  "External ID already used": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Another ledger transaction within the same ledger exists using the external ID you provided\",\n        \"parameter\": \"external_id\"\n    }\n}\n"
                  },
                  "Invalid ledger transaction status": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The ledger transaction may not be reversed before it is posted. Please archive the ledger transaction instead.\",\n        \"parameter\": \"ledger_transaction\"\n    }\n}\n"
                  },
                  "Inactive ledger accounts": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"All of the ledger accounts in the ledger entries must be active\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  },
                  "Non-archived reversal exists": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The ledger transaction already has a reversal ledger transaction 4b0e7d5b-b9bd-4217-bcd4-0d2a93c59170 that is not archived.\",\n        \"parameter\": \"ledger_transaction\"\n    }\n}"
                  }
                },
                "schema": {
                  "oneOf": [
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
                    },
                    {
                      "title": "Invalid ledger transaction status",
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
                              "example": "The ledger transaction may not be reversed before it is posted. Please archive the ledger transaction instead."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_transaction"
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
                      "title": "Non-archived reversal exists",
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
                              "example": "The ledger transaction already has a reversal ledger transaction 4b0e7d5b-b9bd-4217-bcd4-0d2a93c59170 that is not archived."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_transaction"
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
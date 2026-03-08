# Create Ledger Transaction Partial Post

Partially post an existing `pending` Ledger Transaction by reducing its entry amounts and creating a new `posted` Ledger Transaction in one request. If either operation fails, the entire request will fail.

The Ledger Entries in the `posted` Ledger Transaction must cover each existing entry by Ledger Account and `direction`, and each must have a lesser `amount` than its respective existing entry. The Ledger Entries in the existing Ledger Transaction will be updated to reflect the difference between their original amounts and the amounts to be posted.

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
    "/ledger_transactions/{id}/partial_post": {
      "post": {
        "summary": "Create Ledger Transaction Partial Post",
        "description": "",
        "operationId": "create-ledger-transaction-partial-post",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger transaction to partially post.",
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
                "required": [
                  "posted_ledger_entries"
                ],
                "properties": {
                  "posted_ledger_entries": {
                    "type": "array",
                    "description": "An array of ledger entry objects to be set on the posted ledger transaction. There must be one entry for each of the existing entries with a lesser amount than the existing entry.",
                    "items": {
                      "properties": {
                        "amount": {
                          "type": "integer",
                          "description": "Value in specified currency's smallest unit. e.g. $10 would be represented as 1000. Can be any integer up to 36 digits.",
                          "format": "int32"
                        },
                        "direction": {
                          "type": "string",
                          "description": "One of `credit` or `debit`."
                        },
                        "ledger_account_id": {
                          "type": "string",
                          "description": "The ledger account that this ledger entry is associated with."
                        },
                        "metadata": {
                          "type": "string",
                          "description": "Additional data represented as key-value pairs. Both the key and value must be strings.",
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
                  "description": {
                    "type": "string",
                    "description": "An optional free-form description for the posted ledger transaction. Maximum of 1000 characters allowed."
                  },
                  "effective_at": {
                    "type": "string",
                    "description": "The timestamp (IS08601 format) at which the posted ledger transaction happened for reporting purposes.",
                    "format": "date"
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Metadata to be added to the posted ledger transaction. Must be a JSON object.",
                    "format": "json"
                  }
                }
              },
              "examples": {
                "Request Example": {
                  "value": {
                    "posted_ledger_entries": [
                      {
                        "direction": "credit",
                        "amount": 1000,
                        "ledger_account_id": "d40dc881-423e-4844-87e8-978341e40b2c",
                        "metadata": {
                          "vendor_id": "d40dc881-423e-4844-87e8-978341e40b2c"
                        }
                      },
                      {
                        "direction": "debit",
                        "amount": 1000,
                        "ledger_account_id": "d40dc881-423e-4844-87e8-978341e40b2c",
                        "metadata": null
                      }
                    ],
                    "description": "partial post ledger transaction",
                    "effective_at": "2023-04-28T16:32:19.896+00:00",
                    "metadata": {
                      "charge_id": "d40dc881-423e-4844-87e8-978341e40b2c"
                    }
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
                    "value": "{\n  \"id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n  \"object\": \"ledger_transaction\",\n  \"live_mode\": false,\n  \"external_id\": \"1590aa8d-24e0-491b-bc06-d4e5843a212c\",\n  \"ledgerable_type\": null,\n  \"ledgerable_id\": null,\n  \"ledger_id\": \"fe96565f-4b9c-4871-8fb0-e6f02683458e\",\n  \"description\": null,\n  \"status\": \"posted\",\n  \"reverses_ledger_transaction_id\": \"b3ea66d8-ffa9-44e6-96d2-591cdb998a5e\",\n  \"revered_by_ledger_transaction_id\": null,\n  \"partially_posts_ledger_transaction_id\": \"b3ea66d8-ffa9-44e6-96d2-591cdb998a5e\",\n  \"ledger_entries\": [\n    {\n      \"id\": \"afd72914-6014-46a8-997b-3a862aed6375\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"debit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"6168628a-05a6-4d30-80ca-4080ea699179\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": {\n        \"pending_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"posted_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        },\n        \"available_balance\": {\n          \"credits\": 0,\n          \"debits\": 0,\n          \"amount\": 0,\n          \"currency\": \"USD\",\n          \"currency_exponent\": 2\n        }\n    },\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    },\n    {\n      \"id\": \"1db5e286-a845-4cee-8a0f-366ff56e175c\",\n      \"object\": \"ledger_entry\",\n      \"live_mode\": false,\n      \"amount\": 100,\n      \"direction\": \"credit\",\n      \"status\": \"posted\",\n      \"ledger_account_id\": \"641e4d45-7fff-4e7e-ae05-1db2614b4a1e\",\n      \"ledger_account_currency\": \"USD\",\n      \"ledger_account_currency_exponent\": 2,\n      \"ledger_account_lock_version\": 1,\n      \"ledger_transaction_id\": \"53769ada-5ae4-4184-bb39-a3632daa88f9\",\n      \"resulting_ledger_account_balances\": null,\n      \"discarded_at\": null,\n      \"created_at\": \"2022-11-01T21:24:45Z\",\n      \"updated_at\": \"2022-11-01T21:24:45Z\"\n    }\n  ],\n  \"posted_at\": \"2022-11-01T21:24:45Z\",\n  \"effective_at\": \"2022-11-01T00:00:00.000000Z\",\n  \"effective_date\": \"2022-11-01\",\n  \"metadata\": {},\n  \"created_at\": \"2022-11-01T21:24:45Z\",\n  \"updated_at\": \"2022-11-01T21:24:45Z\"\n}"
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
                    "revered_by_ledger_transaction_id": {},
                    "partially_posts_ledger_transaction_id": {
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
                  "Posted Ledger Entries Amounts Greater Than Existing": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Posted ledger entry amounts must be less than existing ledger entries.\",\n        \"parameter\": \"posted_ledger_entries\"\n    }\n}"
                  },
                  "Posted Ledger Entries Mismatched": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\"\n    \"message\": \"Posted ledger entries must match existing ledger entries' accounts and directions.\",\n    \"parameter\": \"posted_ledger_entries\"\n  }\n}"
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
                          "example": "parameter_invalid"
                        },
                        "message": {
                          "type": "string",
                          "example": "Posted ledger entry amounts must be less than existing ledger entries."
                        },
                        "parameter": {
                          "type": "string",
                          "example": "posted_ledger_entries"
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
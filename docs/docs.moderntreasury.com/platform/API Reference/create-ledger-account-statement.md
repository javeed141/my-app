# Create Ledger Account Statement

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
    "/ledger_account_statements": {
      "post": {
        "summary": "Create Ledger Account Statement",
        "description": "",
        "operationId": "create-ledger-account-statement",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "ledger_account_id",
                  "effective_at_lower_bound",
                  "effective_at_upper_bound"
                ],
                "properties": {
                  "description": {
                    "type": "string",
                    "description": "The description of the ledger account statement."
                  },
                  "ledger_account_id": {
                    "type": "string",
                    "description": "The id of the ledger account whose ledger entries are queried against, and its balances are computed as a result."
                  },
                  "effective_at_lower_bound": {
                    "type": "string",
                    "description": "The inclusive lower bound of the effective_at timestamp of the ledger entries to be included in the ledger account statement."
                  },
                  "effective_at_upper_bound": {
                    "type": "string",
                    "description": "The exclusive upper bound of the effective_at timestamp of the ledger entries to be included in the ledger account statement."
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
                    "value": "{\n    \"id\": \"0542a9bc-0d11-43cb-912a-b61440172735\",\n    \"object\": \"ledger_account_statement\",\n    \"live_mode\": true,\n    \"ledger_id\": \"18f19042-2dz6-453e-9453-41d830590165\",\n    \"description\": \"March 2023 Statement\",\n    \"ledger_account_id\": \"cffdb329-3469-4845-88c2-af1554a83e70\",\n    \"ledger_account_lock_version\": 93,\n    \"ledger_account_normal_balance\": \"debit\",\n    \"effective_at_lower_bound\": \"2023-03-01T00:00:00.000000Z\",\n    \"effective_at_upper_bound\": \"2023-04-01T00:00:00.000000Z\",\n    \"starting_balance\": {\n        \"pending_balance\": {\n            \"credits\": 0,\n            \"debits\": 33218,\n            \"amount\": 33218,\n            \"currency\": \"USD\",\n            \"currency_exponent\": 2\n        },\n        \"posted_balance\": {\n            \"credits\": 0,\n            \"debits\": 0,\n            \"amount\": 0,\n            \"currency\": \"USD\",\n            \"currency_exponent\": 2\n        },\n        \"available_balance\": {\n            \"credits\": 0,\n            \"debits\": 0,\n            \"amount\": 0,\n            \"currency\": \"USD\",\n            \"currency_exponent\": 2\n        }\n    },\n    \"ending_balance\": {\n        \"pending_balance\": {\n            \"credits\": 0,\n            \"debits\": 52851,\n            \"amount\": 52851,\n            \"currency\": \"USD\",\n            \"currency_exponent\": 2\n        },\n        \"posted_balance\": {\n            \"credits\": 0,\n            \"debits\": 0,\n            \"amount\": 0,\n            \"currency\": \"USD\",\n            \"currency_exponent\": 2\n        },\n        \"available_balance\": {\n            \"credits\": 0,\n            \"debits\": 0,\n            \"amount\": 0,\n            \"currency\": \"USD\",\n            \"currency_exponent\": 2\n        }\n    },\n    \"metadata\": {},\n    \"created_at\": \"2023-06-01T15:43:24Z\",\n    \"updated_at\": \"2023-06-01T15:43:24Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "0542a9bc-0d11-43cb-912a-b61440172735"
                    },
                    "object": {
                      "type": "string",
                      "example": "ledger_account_statement"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "ledger_id": {
                      "type": "string",
                      "example": "18f19042-2dz6-453e-9453-41d830590165"
                    },
                    "description": {
                      "type": "string",
                      "example": "March 2023 Statement"
                    },
                    "ledger_account_id": {
                      "type": "string",
                      "example": "cffdb329-3469-4845-88c2-af1554a83e70"
                    },
                    "ledger_account_lock_version": {
                      "type": "integer",
                      "example": 93,
                      "default": 0
                    },
                    "ledger_account_normal_balance": {
                      "type": "string",
                      "example": "debit"
                    },
                    "effective_at_lower_bound": {
                      "type": "string",
                      "example": "2023-03-01T00:00:00.000000Z"
                    },
                    "effective_at_upper_bound": {
                      "type": "string",
                      "example": "2023-04-01T00:00:00.000000Z"
                    },
                    "starting_balance": {
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
                              "example": 33218,
                              "default": 0
                            },
                            "amount": {
                              "type": "integer",
                              "example": 33218,
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
                    "ending_balance": {
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
                              "example": 52851,
                              "default": 0
                            },
                            "amount": {
                              "type": "integer",
                              "example": 52851,
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
                    "created_at": {
                      "type": "string",
                      "example": "2023-06-01T15:43:24Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2023-06-01T15:43:24Z"
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
                  "Invalid effective_at range": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"effective_at_lower_bound must be less than the effective_at_upper_bound.\",\n        \"parameter\": \"effective_at_lower_bound\"\n    }\n}"
                  },
                  "Invalid ledger_account_id": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Invalid parameter\",\n        \"parameter\": \"ledger_account_id\"\n    }\n}"
                  },
                  "Missing parameter": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Invalid parameter\",\n        \"parameter\": \"effective_at_upper_bound\"\n    }\n}"
                  },
                  "Description greater than 1000 chars": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Description is too long, maximum of 1000 characters allowed.\",\n        \"parameter\": \"description\"\n    }\n}"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "Invalid effective_at range",
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
                              "example": "effective_at_lower_bound must be less than the effective_at_upper_bound."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "effective_at_lower_bound"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Invalid ledger_account_id",
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
                              "example": "Invalid parameter"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_account_id"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Missing parameter",
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
                              "example": "Invalid parameter"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "effective_at_upper_bound"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Description greater than 1000 chars",
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
                              "example": "Description is too long, maximum of 1000 characters allowed."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "description"
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
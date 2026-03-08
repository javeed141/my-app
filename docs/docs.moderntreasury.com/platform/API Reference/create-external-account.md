# Create External Account

Create a new external account

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
    "/external_accounts": {
      "post": {
        "summary": "Create External Account",
        "description": "Create a new external account",
        "operationId": "create-external-account",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "counterparty_id"
                ],
                "properties": {
                  "party_name": {
                    "type": "string",
                    "description": "If this value isn't provided, it will be inherited from the counterparty's name"
                  },
                  "account_type": {
                    "type": "string",
                    "default": "other"
                  },
                  "counterparty_id": {
                    "type": "string"
                  },
                  "party_type": {
                    "type": "string"
                  },
                  "party_identifier": {
                    "type": "string"
                  },
                  "party_address": {
                    "type": "object",
                    "description": "Required if receiving wire payments",
                    "properties": {
                      "line1": {
                        "type": "string"
                      },
                      "line2": {
                        "type": "string"
                      },
                      "locality": {
                        "type": "string"
                      },
                      "region": {
                        "type": "string"
                      },
                      "postal_code": {
                        "type": "string"
                      },
                      "country": {
                        "type": "string"
                      }
                    }
                  },
                  "routing_details": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "routing_number": {
                          "type": "string"
                        },
                        "routing_number_type": {
                          "type": "string"
                        },
                        "payment_type": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "routing_number",
                        "routing_number_type"
                      ],
                      "type": "object"
                    }
                  },
                  "account_details": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "account_number": {
                          "type": "string"
                        },
                        "account_number_type": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "account_number"
                      ],
                      "type": "object"
                    }
                  },
                  "plaid_processor_token": {
                    "type": "string",
                    "description": "If you've enabled the Modern Treasury + Plaid integration in your Plaid account, you can pass the processor token in this field."
                  },
                  "name": {
                    "type": "string",
                    "description": "A nickname for the external account. This is only for internal usage and won't affect any payments"
                  },
                  "ledger_account": {
                    "type": "object",
                    "required": [
                      "name",
                      "currency",
                      "normal_balance",
                      "ledger_id"
                    ],
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the ledger account. Maximum of 1000 characters allowed."
                      },
                      "description": {
                        "type": "string",
                        "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                      },
                      "currency": {
                        "type": "string"
                      },
                      "currency_exponent": {
                        "type": "integer",
                        "description": "Must be included if currency is a custom currency. The currency_exponent cannot exceed 30.",
                        "format": "int32"
                      },
                      "normal_balance": {
                        "type": "string",
                        "description": "One of `credit`, `debit`"
                      },
                      "ledger_id": {
                        "type": "string"
                      },
                      "metadata": {
                        "type": "string",
                        "description": "Metadata to be added to the ledger account. Must be a JSON object.",
                        "format": "json"
                      }
                    }
                  },
                  "external_id": {
                    "type": "string",
                    "description": "An optional user-defined 180 character unique identifier"
                  },
                  "metadata": {
                    "type": "string",
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
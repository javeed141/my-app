# Update Expected Payment

> 🚧 Updating reconciled Expected Payments
>
> For reconciled Expected Payment, most fields are not mutable. Only fields don't affect the matching logic can be updated, such as `description` and `metadata`. Attempting to update `reconciliation_rule_variables` on a reconciled expected payment will result in an error.

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
    "/expected_payments/{id}": {
      "patch": {
        "summary": "Update Expected Payment",
        "description": "",
        "operationId": "update-expected-payment",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Expected Payment id",
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
                  "reconciliation_rule_variables": {
                    "type": "array",
                    "description": "Matching data used in Reconciliation Rules to automatically reconcile this Expected Payment. See [Defining your Reconciliation Rules](https://docs.moderntreasury.com/reconciliation/docs/defining-your-reconciliation-rules).",
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
                  "description": {
                    "type": "string"
                  },
                  "metadata": {
                    "type": "string",
                    "format": "json"
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
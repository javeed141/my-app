# Create Balance Report

Available in Sandbox and as an Early Access feature in Production

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
    "/internal_accounts/{internal_account_id}/balance_reports": {
      "post": {
        "summary": "Create Balance Report",
        "description": "Available in Sandbox and as an Early Access feature in Production",
        "operationId": "create-balance-report",
        "parameters": [
          {
            "name": "internal_account_id",
            "in": "path",
            "description": "The ID of one of your internal accounts.",
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
                  "as_of_date",
                  "as_of_time",
                  "balance_report_type",
                  "balances"
                ],
                "properties": {
                  "as_of_date": {
                    "type": "string",
                    "description": "The date of the balance report in YYYY-MM-DD format.",
                    "format": "date"
                  },
                  "as_of_time": {
                    "type": "string",
                    "description": "The time of the balance report in HH:MM format."
                  },
                  "balance_report_type": {
                    "type": "string",
                    "description": "See possible types at [Balance Reports](https://docs.moderntreasury.com/platform/reference/balance-report-object)"
                  },
                  "balances": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "amount": {
                          "type": "integer",
                          "description": "The amount of the balance.",
                          "format": "int32"
                        },
                        "vendor_code": {
                          "type": "string",
                          "description": "The code used by the bank when reporting this specific balance. This field is required if balance_type is not provided, defaults to user when left empty"
                        },
                        "vendor_code_type": {
                          "type": "string",
                          "description": "The type of `vendor_code` being reported. Can be one of `bai2`, `bankprov`, `bnk_dev`, `cleartouch`, `currencycloud`, `cross_river`, `dc_bank`, `dwolla`, `evolve`, `goldman_sachs`, `iso20022`, `jpmc`, `mx`, `signet`, `silvergate`, `swift`, `us_bank` or other values depending on your bank. This field is required if balance_type is not provided, defaults to user when left empty."
                        },
                        "balance_type": {
                          "type": "string",
                          "description": "The specific type of balance reported. One of `opening_ledger`, `closing_ledger`, `current_ledger`, `opening_available`, `opening_available_next_business_day`, `closing_available, current_available`, or `other`. This field is required when vendor_code and vendor_code_type is not provided, defaults to `other` when left empty."
                        }
                      },
                      "required": [
                        "amount"
                      ],
                      "type": "object"
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
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
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
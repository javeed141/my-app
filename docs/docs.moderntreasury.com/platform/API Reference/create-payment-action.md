# Create Payment Action

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
    "/payment_actions": {
      "post": {
        "summary": "Create Payment Action",
        "description": "",
        "operationId": "create-payment-action",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "type"
                ],
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "The action decision for this specific payment action. The possible actions are determined based on the actionable. For a payment type of check, supported actions are `stop` and `issue`."
                  },
                  "actionable_id": {
                    "type": "string",
                    "description": "The id of the payment to action on. If the `actionable_id` is present, the `actionable_type` must also be included. Data passed into the details will overwrite the information inferred from the actionable."
                  },
                  "actionable_type": {
                    "type": "string",
                    "description": "The type of the payment being actioned on. Supported values: `payment_order`, `expected_payment`"
                  },
                  "internal_account_id": {
                    "type": "string",
                    "description": "The ID of one of your organization's internal accounts"
                  },
                  "details": {
                    "type": "object",
                    "description": "The `action` specific attributes of the off platform payment.",
                    "properties": {
                      "amount": {
                        "type": "integer",
                        "description": "`amount` is required to create a payment action for `check` payment types.",
                        "format": "int32"
                      },
                      "check_number": {
                        "type": "string",
                        "description": "`check_number` is required to initiate an action of `stop` or `issue` for `check` payment types."
                      },
                      "currency": {
                        "type": "string",
                        "description": "`currency` is required to create a payment action for `check` payment types."
                      },
                      "issue_date": {
                        "type": "string",
                        "description": "`issue_date` is required to create a payment action for `check` payment types. (YYYY-MM-DD)",
                        "format": "date"
                      },
                      "originating_account_number": {
                        "type": "string",
                        "description": "`originating_account_number` is required to create a payment action for `check` payment types."
                      },
                      "payee_name": {
                        "type": "string",
                        "description": "`payee_name` is required to create a payment action for `check` payment types."
                      },
                      "payee_name_2": {
                        "type": "string",
                        "description": "Optional field to support a second `payee_name` line when initiating a positive pay action."
                      }
                    }
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
                    "value": "{\n    \"id\": \"12345678-abcd-efgh-ijkl-123456789012\",\n    \"object\": \"payment_action\",\n    \"live_mode\": false,\n    \"type\": \"stop\",\n    \"status\": \"pending\",\n    \"actionable_id\": \"12345678-abcd-efgh-ijkl-123456789012\",\n    \"actionable_type\": \"payment_order\",\n    \"internal_account_id\": \"12345678-abcd-efgh-ijkl-123456789012\",\n    \"details\": {\n        \"amount\": 2000,\n        \"currency\": \"USD\",\n        \"check_number\": \"12323423\",\n        \"issue_date\": \"2026-01-01\",\n        \"payee_name\": \"Harry Potter\",\n        \"originating_account_number\": \"123213\"\n    },\n    \"created_at\": \"2025-05-27T20:48:14Z\",\n    \"updated_at\": \"2025-05-27T20:48:14Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "12345678-abcd-efgh-ijkl-123456789012"
                    },
                    "object": {
                      "type": "string",
                      "example": "payment_action"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "type": {
                      "type": "string",
                      "example": "stop"
                    },
                    "status": {
                      "type": "string",
                      "example": "pending"
                    },
                    "actionable_id": {
                      "type": "string",
                      "example": "12345678-abcd-efgh-ijkl-123456789012"
                    },
                    "actionable_type": {
                      "type": "string",
                      "example": "payment_order"
                    },
                    "internal_account_id": {
                      "type": "string",
                      "example": "12345678-abcd-efgh-ijkl-123456789012"
                    },
                    "details": {
                      "type": "object",
                      "properties": {
                        "amount": {
                          "type": "integer",
                          "example": 2000,
                          "default": 0
                        },
                        "currency": {
                          "type": "string",
                          "example": "USD"
                        },
                        "check_number": {
                          "type": "string",
                          "example": "12323423"
                        },
                        "issue_date": {
                          "type": "string",
                          "example": "2026-01-01"
                        },
                        "payee_name": {
                          "type": "string",
                          "example": "Harry Potter"
                        },
                        "originating_account_number": {
                          "type": "string",
                          "example": "123213"
                        }
                      }
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2025-05-27T20:48:14Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2025-05-27T20:48:14Z"
                    }
                  }
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
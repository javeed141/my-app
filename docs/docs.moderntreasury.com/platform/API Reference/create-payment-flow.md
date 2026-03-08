# Create Payment Flow

Create a payment flow

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
    "/payment_flows": {
      "post": {
        "summary": "Create Payment Flow",
        "description": "Create a payment flow",
        "operationId": "create-payment-flow",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "amount",
                  "currency",
                  "direction",
                  "counterparty_id",
                  "originating_account_id"
                ],
                "properties": {
                  "amount": {
                    "type": "integer",
                    "description": "Value in specified currency's smallest unit. e.g. $10 would be represented as 1000. Can be any integer up to 36 digits.",
                    "format": "int32"
                  },
                  "currency": {
                    "type": "string",
                    "description": "The currency of the payment."
                  },
                  "direction": {
                    "type": "string",
                    "description": "Describes the direction money is flowing in the transaction. Can only be `debit`. A `debit` pulls money from someone else's account to your own."
                  },
                  "counterparty_id": {
                    "type": "string",
                    "description": "The ID of a [counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object) associated with the payment. An external account created with this flow will be associated with this counterparty."
                  },
                  "originating_account_id": {
                    "type": "string",
                    "description": "The ID of one of your organization's internal accounts."
                  },
                  "effective_date_selection_enabled": {
                    "type": "boolean",
                    "description": "Enables the end user to select an effective date for the payment (e.g. the date transactions are to be posted to the participants' account)."
                  },
                  "due_date": {
                    "type": "string",
                    "description": "The date that the payment is due. The end user can view this date when selecting an effective date.",
                    "format": "date"
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
                    "value": "{\n  \"id\": \"d93b8ae4-b30e-42ce-bc5d-e1ca5785f863\",\n  \"object\": \"payment_flow\",\n  \"live_mode\": true,\n  \"client_token\": \"pay-live-fmsXHyYikKHstYHeSB6Co5AjezMqKoFKFhKmwnY2tvJMUFmndkarJY7GcwYkcBvr\",\n  \"status\": \"pending\",\n  \"amount\": 10000,\n  \"currency\": \"USD\",\n  \"direction\": \"debit\",\n  \"counterparty_id\": \"34b33f71-daaa-4ce3-b9f3-a275e7b9a6f7\",\n  \"receiving_account_id\": null,\n  \"originating_account_id\": \"ceab8d17-1312-44fe-94e2-a858370c3f10\",\n  \"payment_order_id\": null,\n  \"created_at\": \"2023-02-18T03:50:54Z\",\n  \"updated_at\": \"2023-02-18T03:50:54Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "d93b8ae4-b30e-42ce-bc5d-e1ca5785f863"
                    },
                    "object": {
                      "type": "string",
                      "example": "payment_flow"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "client_token": {
                      "type": "string",
                      "example": "pay-live-fmsXHyYikKHstYHeSB6Co5AjezMqKoFKFhKmwnY2tvJMUFmndkarJY7GcwYkcBvr"
                    },
                    "status": {
                      "type": "string",
                      "example": "pending"
                    },
                    "amount": {
                      "type": "integer",
                      "example": 10000,
                      "default": 0
                    },
                    "currency": {
                      "type": "string",
                      "example": "USD"
                    },
                    "direction": {
                      "type": "string",
                      "example": "debit"
                    },
                    "counterparty_id": {
                      "type": "string",
                      "example": "34b33f71-daaa-4ce3-b9f3-a275e7b9a6f7"
                    },
                    "receiving_account_id": {},
                    "originating_account_id": {
                      "type": "string",
                      "example": "ceab8d17-1312-44fe-94e2-a858370c3f10"
                    },
                    "payment_order_id": {},
                    "created_at": {
                      "type": "string",
                      "example": "2023-02-18T03:50:54Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2023-02-18T03:50:54Z"
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
                  "Result": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\",\n    \"message\": \"Counterparty is not a valid record\",\n    \"parameter\": \"counterparty\"\n  }\n}"
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
                          "example": "Counterparty is not a valid record"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "counterparty"
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
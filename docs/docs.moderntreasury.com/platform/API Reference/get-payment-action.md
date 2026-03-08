# Get Payment Action

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
    "/payment_actions/{id}": {
      "get": {
        "summary": "Get Payment Action",
        "description": "",
        "operationId": "get-payment-action",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
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
        "deprecated": false,
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {},
              "examples": {
                "Request Example": {
                  "value": {
                    "id": "<example-payment-action-id>",
                    "object": "payment_action",
                    "live_mode": false,
                    "type": "stop",
                    "status": "pending",
                    "actionable_id": "12345678-abcd-efgh-ijkl-123456789012",
                    "actionable_type": "payment_order",
                    "internal_account_id": "12345678-abcd-efgh-ijkl-123456789012",
                    "details": {
                      "amount": 2000,
                      "currency": "USD",
                      "check_number": "12323423",
                      "issue_date": "2026-01-01",
                      "payee_name": "Harry Potter",
                      "originating_account_number": "123213"
                    },
                    "created_at": "2025-05-27T20:48:14Z",
                    "updated_at": "2025-05-27T20:48:14Z"
                  }
                }
              }
            }
          }
        }
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
# Get Payment Flow

Get details on a single payment flow

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
    "/payment_flows/{id}": {
      "get": {
        "summary": "Get Payment Flow",
        "description": "Get details on a single payment flow",
        "operationId": "get-payment-flow",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the payment flow.",
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
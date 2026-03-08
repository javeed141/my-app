# List Payment Actions

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
      "get": {
        "summary": "List Payment Actions",
        "description": "",
        "operationId": "list-payment-actions",
        "parameters": [
          {
            "name": "id[]",
            "in": "query",
            "description": "If you have specific IDs to retrieve in bulk, you can pass them as query parameters delimited with `id[]=`, for example `?id[]=123&id[]=abc`.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "metadata",
            "in": "query",
            "description": "For example, if you want to query for records with metadata key `Type` and value `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query parameters.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "actionable_id",
            "in": "query",
            "description": "The id of the `payment_order `  or `expected_payment` to use to query the payment actions",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "actionable_type",
            "in": "query",
            "description": "The type of the actionable being queried. One of `payment_order`, `expected_payment`.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "type",
            "in": "query",
            "description": "To query payment actions by the `action` use this field",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "To query payment actions by a specific `status`, use this parameter. Can be `pending`, `processable`, `processing`, `sent`, `acknowledged`, `failed`, `cancelled`",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "after_cursor",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "per_page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 25
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "\t\t[\n      {\n        \"id\": \"c5f4009c-bdd6-4cc1-84b2-17974ac9e77a\",\n        \"live_mode\": true,\n        \"action\": \"stop\",\n        \"actionable_id\": \"0f8e3719-3dfd-4613-9bbf-c0333781b59f\",\n        \"actionable_type\": \"off_platform_payment\",\n        \"status\": \"sent\",\n        \"details\": {},\n        \"created_at\": \"2019-11-09T00:11:07Z\",\n        \"updated_at\": \"2019-11-09T00:11:07Z\",\n      },\n      {\n        \"id\": \"3244009c-a676-4cc1-84b2-245b4ac9322b\",\n        \"live_mode\": true,\n        \"action\": \"stop\",\n        \"actionable_id\": \"01961c74-472d-74be-8fee-3ae4106b51ab\",\n        \"actionable_type\": \"off_platform_payment\",\n        \"status\": \"pending\",\n        \"details\": {},\n        \"created_at\": \"2019-11-09T00:12:07Z\",\n        \"updated_at\": \"2019-11-09T00:12:07Z\",\n      }\n    ]\n  "
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
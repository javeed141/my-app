# List Account Collection Flows

Get a list of all Account Collection Flows

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
    "/account_collection_flows": {
      "get": {
        "summary": "List Account Collection Flows",
        "description": "Get a list of all Account Collection Flows",
        "operationId": "list-account-collection-flows",
        "parameters": [
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
          },
          {
            "name": "client_token",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "One of `pending`, `completed`, `expired`, or `cancelled`.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "counterparty_id",
            "in": "query",
            "description": "Specify `counterparty_id` to view `account_collection_flows` for a specific counterparty.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "external_account_id",
            "in": "query",
            "description": "Specify `external_account_id` to view `account_collection_flows` that created a specific external account.",
            "schema": {
              "type": "string"
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
                    "value": "[\n  {\n    \"id\": \"454e874b-ff1d-46e8-9d22-0464615cf1e0\",\n    \"object\": \"account_collection_flow\",\n    \"live_mode\": true,\n    \"client_token\": \"ac-live-QVj2yTSt6qRNAzXQGKLHS9qfLF7Gs5JcCYHT5xztgjucGRbS6VfrJBpaNo5SrmfZ\",\n    \"status\": \"pending\",\n    \"payment_types\": [\"ach\"],\n    \"counterparty_id\": \"c03581a8-c948-41a9-889a-e5228390fd80\",\n    \"external_account_id\": null,\n    \"created_at\": \"2023-02-18T03:23:48Z\",\n    \"updated_at\": \"2023-02-18T03:23:48Z\"\n  }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "454e874b-ff1d-46e8-9d22-0464615cf1e0"
                      },
                      "object": {
                        "type": "string",
                        "example": "account_collection_flow"
                      },
                      "live_mode": {
                        "type": "boolean",
                        "example": true,
                        "default": true
                      },
                      "client_token": {
                        "type": "string",
                        "example": "ac-live-QVj2yTSt6qRNAzXQGKLHS9qfLF7Gs5JcCYHT5xztgjucGRbS6VfrJBpaNo5SrmfZ"
                      },
                      "status": {
                        "type": "string",
                        "example": "pending"
                      },
                      "payment_types": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "ach"
                        }
                      },
                      "counterparty_id": {
                        "type": "string",
                        "example": "c03581a8-c948-41a9-889a-e5228390fd80"
                      },
                      "external_account_id": {},
                      "created_at": {
                        "type": "string",
                        "example": "2023-02-18T03:23:48Z"
                      },
                      "updated_at": {
                        "type": "string",
                        "example": "2023-02-18T03:23:48Z"
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
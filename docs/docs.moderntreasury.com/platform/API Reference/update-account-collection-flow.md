# Update Account Collection Flow

Update an account collection flow

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
    "/account_collection_flows/{id}": {
      "patch": {
        "summary": "Update Account Collection Flow",
        "description": "Update an account collection flow",
        "operationId": "update-account-collection-flow",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of an account collection flow.",
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
                  "status"
                ],
                "properties": {
                  "status": {
                    "type": "string",
                    "description": "The status of the account collection flow. You may only transition a flow from `pending` to `cancelled`."
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
                    "value": "{\n  \"id\": \"454e874b-ff1d-46e8-9d22-0464615cf1e0\",\n  \"object\": \"account_collection_flow\",\n  \"live_mode\": true,\n  \"client_token\": \"ac-live-QVj2yTSt6qRNAzXQGKLHS9qfLF7Gs5JcCYHT5xztgjucGRbS6VfrJBpaNo5SrmfZ\",\n  \"status\": \"cancelled\",\n  \"payment_types\": [\"ach\"],\n  \"counterparty_id\": \"c03581a8-c948-41a9-889a-e5228390fd80\",\n  \"external_account_id\": null,\n  \"created_at\": \"2023-02-18T03:23:48Z\",\n  \"updated_at\": \"2023-02-18T03:23:48Z\"\n}"
                  }
                },
                "schema": {
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
                      "example": "cancelled"
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
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\",\n    \"message\": \"This flow can only be updated to status `cancelled`\",\n    \"parameter\": \"status\"\n  }\n}"
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
                          "example": "This flow can only be updated to status `cancelled`"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "status"
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
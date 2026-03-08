# Delete Webhook Endpoint

delete an exisiting webhook endpoint

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
    "/webhook_endpoints/{id}": {
      "delete": {
        "summary": "Delete Webhook Endpoint",
        "description": "delete an exisiting webhook endpoint",
        "operationId": "delete-webhook-endpoint",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "An ID of a webhook endpoint to be deleted",
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
                    "value": "{\n    \"id\": \"4c2cf019-584d-40dc-9745-4e3f1c9ac4b9\",\n    \"object\": \"webhook_endpoint\",\n    \"live_mode\": false,\n    \"url\": \"https://<your-domain.com>\",\n    \"configured_events\": {\n        \"paper_item\": [\n            \"created\"\n        ],\n        \"incoming_payment_detail\": [\n            \"tentatively_reconciled\"\n        ]\n    },\n    \"enabled\": true,\n    \"discarded_at\": \"2022-02-16T02:29:56Z\",\n    \"created_at\": \"2022-02-16T02:23:40Z\",\n    \"updated_at\": \"2022-02-16T02:29:56Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "4c2cf019-584d-40dc-9745-4e3f1c9ac4b9"
                    },
                    "object": {
                      "type": "string",
                      "example": "webhook_endpoint"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "url": {
                      "type": "string",
                      "example": "https://<your-domain.com>"
                    },
                    "configured_events": {
                      "type": "object",
                      "properties": {
                        "paper_item": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "created"
                          }
                        },
                        "incoming_payment_detail": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "tentatively_reconciled"
                          }
                        }
                      }
                    },
                    "enabled": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "discarded_at": {
                      "type": "string",
                      "example": "2022-02-16T02:29:56Z"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-02-16T02:23:40Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-02-16T02:29:56Z"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "404",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"resource_not_found\",\n        \"message\": \"Resource not found\",\n        \"parameter\": \"id\"\n    }\n}"
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
                          "example": "resource_not_found"
                        },
                        "message": {
                          "type": "string",
                          "example": "Resource not found"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "id"
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
# Update Webhook Endpoint

update an exisiting webhook endpoint

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
      "patch": {
        "summary": "Update Webhook Endpoint",
        "description": "update an exisiting webhook endpoint",
        "operationId": "update-webhook-endpoint",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "An ID for a webhook endpoint to be updated",
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
                  "url": {
                    "type": "string",
                    "description": "new url must start with https"
                  },
                  "configured_events": {
                    "type": "object",
                    "description": "hash of events and event names, empty for all events. list of events found here: https://app.moderntreasury.com/developers/webhooks/new",
                    "properties": {}
                  },
                  "enabled": {
                    "type": "boolean",
                    "description": "true if enabled, false if paused"
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
                    "value": "{\n    \"id\": \"4c2cf019-584d-40dc-9745-4e3f1c9ac4b9\",\n    \"object\": \"webhook_endpoint\",\n    \"live_mode\": false,\n    \"url\": \"https://<your-domain.com>\",\n    \"configured_events\": {\n        \"paper_item\": [\n            \"created\"\n        ],\n        \"incoming_payment_detail\": [\n            \"tentatively_reconciled\"\n        ]\n    },\n    \"enabled\": true,\n    \"discarded_at\": null,\n    \"created_at\": \"2022-02-16T02:23:40Z\",\n    \"updated_at\": \"2022-02-16T02:27:38Z\"\n}"
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
                    "discarded_at": {},
                    "created_at": {
                      "type": "string",
                      "example": "2022-02-16T02:23:40Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-02-16T02:27:38Z"
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
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Configured events is invalid\",\n        \"parameter\": \"configured_events\"\n    }\n}"
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
                          "example": "Configured events is invalid"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "configured_events"
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
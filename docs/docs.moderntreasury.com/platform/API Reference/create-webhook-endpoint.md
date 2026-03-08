# Create Webhook Endpoint

Create a new webhook endpoint

```json configured_events object example
"configured_events": {
  "expected_payment": [
    "created",
    "reconciled"
  ]
}
```

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
    "/webhook_endpoints": {
      "post": {
        "summary": "Create Webhook Endpoint",
        "description": "Create a new webhook endpoint",
        "operationId": "create-webhook-endpoint",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "url": {
                    "type": "string",
                    "description": "url must be configured like: https://<your-domain.com>"
                  },
                  "configured_events": {
                    "type": "object",
                    "description": "A json object in the form of `{ topic => [event, …] }`. When not specified, all events are sent to the Webhooks Endpoint. Refer to [Webhooks](https://docs.moderntreasury.com/reference#webhooks) for a list of topics and events.",
                    "properties": {}
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
                    "value": "{\n    \"id\": \"281686a8-359c-451a-b43c-76e2eec0037a\",\n    \"object\": \"webhook_endpoint\",\n    \"live_mode\": false,\n    \"url\": \"https://<your-domain.com>\",\n    \"configured_events\": {},\n    \"webhook_key\": \"<webhook key>\",\n    \"enabled\": true,\n    \"discarded_at\": null,\n    \"created_at\": \"2022-02-16T02:22:31Z\",\n    \"updated_at\": \"2022-02-16T02:22:31Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "281686a8-359c-451a-b43c-76e2eec0037a"
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
                      "properties": {}
                    },
                    "webhook_key": {
                      "type": "string",
                      "example": "<webhook key>"
                    },
                    "enabled": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "discarded_at": {},
                    "created_at": {
                      "type": "string",
                      "example": "2022-02-16T02:22:31Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-02-16T02:22:31Z"
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
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Webhook URLs must be HTTPS\",\n        \"parameter\": \"url\"\n    }\n}"
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
                          "example": "Webhook URLs must be HTTPS"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "url"
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
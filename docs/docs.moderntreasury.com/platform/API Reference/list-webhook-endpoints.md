# List Webhook Endpoints

Get all webhook endpoint objects

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
      "get": {
        "summary": "List Webhook Endpoints",
        "description": "Get all webhook endpoint objects",
        "operationId": "list-webhook-endpoints",
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
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[\n    {\n        \"id\": \"5bcbec62-69df-46dd-9849-e89f42f9dc31\",\n        \"object\": \"webhook_endpoint\",\n        \"live_mode\": false,\n        \"url\": \"https://<your-domain.com>\",\n        \"configured_events\": {},\n        \"enabled\": true,\n        \"discarded_at\": null,\n        \"created_at\": \"2022-02-16T02:09:08Z\",\n        \"updated_at\": \"2022-02-16T02:09:08Z\"\n    }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "5bcbec62-69df-46dd-9849-e89f42f9dc31"
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
                      "enabled": {
                        "type": "boolean",
                        "example": true,
                        "default": true
                      },
                      "discarded_at": {},
                      "created_at": {
                        "type": "string",
                        "example": "2022-02-16T02:09:08Z"
                      },
                      "updated_at": {
                        "type": "string",
                        "example": "2022-02-16T02:09:08Z"
                      }
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
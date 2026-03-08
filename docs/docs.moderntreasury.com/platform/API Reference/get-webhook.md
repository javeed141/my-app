# Get Webhook Event

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
    "/webhook_events/{id}": {
      "get": {
        "summary": "Get Webhook Event",
        "description": "",
        "operationId": "get-webhook",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the Webhook Event",
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
                    "value": "{\n  \"id\": \"d785c973-68b1-49c7-81b8-cb35ae08539c\",\n  \"object\": \"webhook_event\",\n  \"live_mode\": true,\n  \"event_id\": \"f945f814-06f4-45fa-9ccc-7344da475d6b\",\n  \"webhook_endpoint_id\": \"d6c1e77f-f75e-4ef4-9447-0af510073c55\",\n  \"created_at\": \"2022-02-15T01:42:33Z\",\n  \"updated_at\": \"2022-02-15T01:42:33Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "d785c973-68b1-49c7-81b8-cb35ae08539c"
                    },
                    "object": {
                      "type": "string",
                      "example": "webhook_event"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "event_id": {
                      "type": "string",
                      "example": "f945f814-06f4-45fa-9ccc-7344da475d6b"
                    },
                    "webhook_endpoint_id": {
                      "type": "string",
                      "example": "d6c1e77f-f75e-4ef4-9447-0af510073c55"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-02-15T01:42:33Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-02-15T01:42:33Z"
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
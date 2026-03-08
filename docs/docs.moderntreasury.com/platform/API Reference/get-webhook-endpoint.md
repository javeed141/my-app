# Get Webhook Endpoint

Get details about an exisiting webhook endpoint

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
      "get": {
        "summary": "Get Webhook Endpoint",
        "description": "Get details about an exisiting webhook endpoint",
        "operationId": "get-webhook-endpoint",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID for a webhook endpoint",
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
                    "value": "{\n    \"id\": \"5bcbec62-69df-46dd-9849-e89f42f9dc31\",\n    \"object\": \"webhook_endpoint\",\n    \"live_mode\": false,\n    \"url\": \"https://<your-domain.com>\",\n    \"configured_events\": {},\n    \"enabled\": true,\n    \"discarded_at\": null,\n    \"created_at\": \"2022-02-16T02:09:08Z\",\n    \"updated_at\": \"2022-02-16T02:09:08Z\"\n}"
                  }
                },
                "schema": {
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
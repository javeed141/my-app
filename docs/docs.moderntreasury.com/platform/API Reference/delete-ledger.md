# Delete Ledger

> 🚧 Deleting a ledger will delete all of its associated ledger accounts.

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
    "/ledgers/{id}": {
      "delete": {
        "summary": "Delete Ledger",
        "description": "",
        "operationId": "delete-ledger",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger.",
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
                    "value": "{\n  \"id\": \"641e15b7-a326-44b1-9ed2-536cd327101b\",\n  \"object\": \"ledger\",\n  \"live_mode\": false,\n  \"name\": \"Customer Ledger\",\n  \"description\": null,\n  \"metadata\": {},\n  \"discarded_at\": \"2022-11-01T20:55:21Z\",\n  \"created_at\": \"2022-11-01T20:50:56Z\",\n  \"updated_at\": \"2022-11-01T20:55:21Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "641e15b7-a326-44b1-9ed2-536cd327101b"
                    },
                    "object": {
                      "type": "string",
                      "example": "ledger"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "name": {
                      "type": "string",
                      "example": "Customer Ledger"
                    },
                    "description": {},
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "discarded_at": {
                      "type": "string",
                      "example": "2022-11-01T20:55:21Z"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T20:50:56Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T20:55:21Z"
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
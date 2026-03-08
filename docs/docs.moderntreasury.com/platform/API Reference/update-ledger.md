# Update Ledger

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
      "patch": {
        "summary": "Update Ledger",
        "description": "",
        "operationId": "update-ledger",
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
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the ledger. Maximum of 1000 characters allowed."
                  },
                  "description": {
                    "type": "string",
                    "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                  },
                  "metadata": {
                    "type": "string",
                    "format": "json"
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
                    "value": "{\n  \"id\": \"641e15b7-a326-44b1-9ed2-536cd327101b\",\n  \"object\": \"ledger\",\n  \"live_mode\": false,\n  \"name\": \"Customer Ledger\",\n  \"description\": null,\n  \"metadata\": {},\n  \"discarded_at\": null,\n  \"created_at\": \"2022-11-01T20:50:56Z\",\n  \"updated_at\": \"2022-11-01T20:54:22Z\"\n}"
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
                    "discarded_at": {},
                    "created_at": {
                      "type": "string",
                      "example": "2022-11-01T20:50:56Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-11-01T20:54:22Z"
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
# Update Ledger Entry

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
    "/ledger_entries/{id}": {
      "patch": {
        "summary": "Update Ledger Entry",
        "description": "",
        "operationId": "update-ledger-entry",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger entry.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "metadata",
            "in": "query",
            "description": "Additional data in the form of key-value pairs. Pairs can be removed by passing an empty string or null as the value.",
            "schema": {
              "type": "string",
              "format": "json"
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
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
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
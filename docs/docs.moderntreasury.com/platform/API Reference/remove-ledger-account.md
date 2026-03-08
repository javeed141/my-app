# Remove Ledger Account from Category

Remove a Ledger Account from a Ledger Account Category

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
    "/ledger_account_categories/{id}/ledger_accounts/{ledger_account_id}": {
      "delete": {
        "summary": "Remove Ledger Account from Category",
        "description": "Remove a Ledger Account from a Ledger Account Category",
        "operationId": "remove-ledger-account",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger account category.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "ledger_account_id",
            "in": "path",
            "description": "The ID of the ledger account to remove from the category.",
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
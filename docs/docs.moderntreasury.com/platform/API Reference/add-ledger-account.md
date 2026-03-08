# Add Ledger Account to Category

Add a Ledger Account to a Ledger Account Category. Categories can be nested up to level 4, where a root category without any nested category is considered level 0. Up to 1 million Ledger Accounts can be added to a single Ledger Account Category graph.

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
      "put": {
        "summary": "Add Ledger Account to Category",
        "description": "Add a Ledger Account to a Ledger Account Category. Categories can be nested up to level 4, where a root category without any nested category is considered level 0. Up to 1 million Ledger Accounts can be added to a single Ledger Account Category graph.",
        "operationId": "add-ledger-account",
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
            "description": "The ID of the ledger account to add to the category.",
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
# Add Ledger Account Category to Category

Nest a Ledger Account Category within a higher-level Ledger Account Category

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
    "/ledger_account_categories/{id}/ledger_account_categories/{sub_category_id}": {
      "put": {
        "summary": "Add Ledger Account Category to Category",
        "description": "Nest a Ledger Account Category within a higher-level Ledger Account Category",
        "operationId": "add-ledger-account-category",
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
            "name": "sub_category_id",
            "in": "path",
            "description": "The ID of the ledger account category to add to the parent category.",
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
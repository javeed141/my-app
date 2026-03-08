# Update Virtual Account

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
    "/virtual_accounts/{id}": {
      "patch": {
        "summary": "Update Virtual Account",
        "description": "",
        "operationId": "update-virtual-account",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the virtual account",
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
                    "type": "string"
                  },
                  "counterparty_id": {
                    "type": "string"
                  },
                  "ledger_account_id": {
                    "type": "string",
                    "description": "The Ledger Account you would like to link to the virtual account."
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
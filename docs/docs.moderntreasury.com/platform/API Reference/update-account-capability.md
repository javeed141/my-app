# Update Account Capability

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
    "/internal_accounts/{internal_account_id}/account_capabilities/{id}": {
      "patch": {
        "summary": "Update Account Capability",
        "description": "",
        "operationId": "update-account-capability",
        "parameters": [
          {
            "name": "internal_account_id",
            "in": "path",
            "description": "The unique identifier of the internal account the account capability belongs to.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "id",
            "in": "path",
            "description": "The unique identifier of the account capability.",
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
                  "identifier": {
                    "type": "string",
                    "description": "The unique reference assigned by your bank for tracking and recognizing payment files."
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
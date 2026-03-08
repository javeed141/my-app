# Create Account Detail

Create an account detail for an external account

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
    "/external_accounts/{external_account_id}/account_details": {
      "post": {
        "summary": "Create Account Detail",
        "description": "Create an account detail for an external account",
        "operationId": "create-account-detail",
        "parameters": [
          {
            "name": "external_account_id",
            "in": "path",
            "description": "The ID of the external account.",
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
                "required": [
                  "account_number"
                ],
                "properties": {
                  "account_number": {
                    "type": "string"
                  },
                  "account_number_type": {
                    "type": "string"
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
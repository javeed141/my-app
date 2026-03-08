# Get Contact Detail

Get a single account detail for an external account

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
    "/external_accounts/{external_account_id}/contact_details/{id}": {
      "get": {
        "summary": "Get Contact Detail",
        "description": "Get a single account detail for an external account",
        "operationId": "get-contact-detail",
        "parameters": [
          {
            "name": "external_account_id",
            "in": "path",
            "description": "The ID of the external account.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "id",
            "in": "path",
            "description": "the ID of the account detail.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
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
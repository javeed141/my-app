# Get Balance Report

Get a single balance report for a given internal account

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
    "/internal_accounts/{internal_account_id}/balance_reports/{id}": {
      "get": {
        "summary": "Get Balance Report",
        "description": "Get a single balance report for a given internal account",
        "operationId": "get-balance-report",
        "parameters": [
          {
            "name": "internal_account_id",
            "in": "path",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "id",
            "in": "path",
            "description": "Either the unique identifier of the balance report or `latest` for the latest balance report.",
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
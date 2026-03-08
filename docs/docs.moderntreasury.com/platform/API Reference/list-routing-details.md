# List Routing Details

Get a list of routing details for a single external account

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
    "/external_accounts/{external_account_id}/routing_details": {
      "get": {
        "summary": "List Routing Details",
        "description": "Get a list of routing details for a single external account",
        "operationId": "list-routing-details",
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
            "name": "after_cursor",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "per_page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 25
            }
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
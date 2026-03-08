# Get Routing Detail

Get a single routing detail

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
    "/external_accounts/{external_account_id}/routing_details/{id}": {
      "get": {
        "summary": "Get Routing Detail",
        "description": "Get a single routing detail",
        "operationId": "get-routing-detail",
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
            "description": "The ID of the routing detail.",
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